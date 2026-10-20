// Vanz@Port (v2.0.3) --- ported from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/auto-reconnect.js. See NOTICE.md.
/**
 * JAP@Add --- drop-in auto-reconnect for direct makeWASocket users.
 *
 * The Framework Bot has always had exponential-backoff reconnect built in;
 * plain-socket users had to hand-roll the same connection.update dance every
 * project (the #1 beginner Baileys question). This wraps it once, correctly:
 *
 *   const manager = autoReconnect(() => makeWASocketAuto({ auth: state }), {
 *       onSocket: (sock) => sock.ev.on('messages.upsert', handler),
 *   });
 *   await manager.start();
 *
 * - exponential backoff with jitter (1s base -> 30s cap)
 * - never reconnects on DisconnectReason.loggedOut (session is dead; caller
 *   gets onLoggedOut to clean up creds)
 * - restartRequired (post-pairing) reconnects immediately, not backed off
 * - stop() cancels timers and closes the live socket
 * - factory may be async (works with makeWASocketAuto) or sync
 *
 * @author J.AP
 */
import { DisconnectReason } from '../Types/index.js';
import { isFatalDisconnect, mapDisconnectReason } from './disconnect-reason.js';
import defaultLogger from './logger.js';

export const autoReconnect = (socketFactory, options = {}) => {
    const {
        onSocket,
        onOpen,
        onLoggedOut,
        onFatal,
        maxAttempts = Infinity,
        baseDelayMs = 1000,
        maxDelayMs = 30000,
        jitter = 0.25,
        logger = defaultLogger.child({ module: 'auto-reconnect' }),
    } = options;

    let sock = null;
    let attempts = 0;
    let timer = null;
    let stopped = false;
    let started = false;

    const delayFor = (attempt) => {
        const exp = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt - 1));
        const wiggle = exp * jitter * (Math.random() * 2 - 1);
        return Math.max(0, Math.round(exp + wiggle));
    };

    const scheduleRestart = (delay) => {
        if (stopped || timer) {
            return; // never two pending reconnects at once
        }
        timer = setTimeout(() => {
            timer = null;
            connect().catch((err) => logger.error({ err }, 'reconnect attempt failed'));
        }, delay);
    };

    const connect = async () => {
        if (stopped) {
            return null;
        }
        // JAP@Fix (lifecycle): best-effort cleanup of the previous socket so a
        // half-open ws never lingers next to its replacement.
        const previous = sock;
        if (previous) {
            try {
                await previous.end?.();
            }
            catch { /* already dead */ }
        }
        let current;
        try {
            current = await socketFactory();
        }
        catch (err) {
            // JAP@Fix (lifecycle): a throwing factory (e.g. makeWASocketAuto's
            // version fetch while offline) used to kill the chain permanently.
            // Treat it like a failed connection: back off and try again.
            attempts += 1;
            if (attempts > maxAttempts) {
                logger.error({ err, attempts: attempts - 1 }, 'socket factory failed and max attempts reached — giving up');
                return null;
            }
            const delay = delayFor(attempts);
            logger.warn({ err, attempt: attempts, delay }, 'socket factory failed — retrying');
            scheduleRestart(delay);
            return null;
        }
        sock = current;
        // JAP@Fix (race): a 'close' may be emitted more than once by the same
        // socket, and a stale (already-replaced) socket can emit late events.
        // Without these guards a double-close schedules two parallel reconnect
        // chains, and every stale close spawns a ghost socket.
        let closeHandled = false;
        try {
            onSocket?.(current);
        }
        catch (err) {
            logger.warn({ err }, 'onSocket handler threw');
        }
        current.ev.on('connection.update', (update) => {
            if (sock !== current) {
                return; // stale socket — a newer one has replaced it
            }
            const { connection, lastDisconnect } = update;
            if (connection === 'open') {
                attempts = 0;
                try {
                    onOpen?.(current);
                }
                catch (err) {
                    logger.warn({ err }, 'onOpen handler threw');
                }
                return;
            }
            if (connection !== 'close' || stopped || closeHandled) {
                return;
            }
            closeHandled = true;
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            if (statusCode === DisconnectReason.loggedOut) {
                logger.info('session logged out — not reconnecting');
                try {
                    onLoggedOut?.(lastDisconnect?.error);
                }
                catch (err) {
                    logger.warn({ err }, 'onLoggedOut handler threw');
                }
                return;
            }
            // Vanz@Fix (2.0.3): forbidden (403) and multideviceMismatch (411) can never succeed on retry;
            // the old loop hammered the server forever (and a restricted account with it). Stop and report.
            if (isFatalDisconnect(mapDisconnectReason(statusCode))) {
                logger.warn({ statusCode }, 'fatal disconnect — not reconnecting');
                try {
                    onFatal?.(lastDisconnect?.error, statusCode);
                }
                catch (err) {
                    logger.warn({ err }, 'onFatal handler threw');
                }
                return;
            }
            attempts += 1;
            if (attempts > maxAttempts) {
                logger.warn({ attempts: attempts - 1 }, 'max reconnect attempts reached — giving up');
                return;
            }
            // JAP@Fix (lifecycle): restartRequired always reconnected with
            // delay 0. Correct after pairing (single event), but when the
            // server answers restartRequired on EVERY connect it becomes a
            // tight spin loop (repro: 165 sockets in 200ms). Only the FIRST
            // consecutive restartRequired is immediate; repeats back off.
            const immediate = statusCode === DisconnectReason.restartRequired && attempts === 1;
            const delay = immediate ? 0 : delayFor(attempts);
            logger.info({ attempt: attempts, delay, statusCode }, 'scheduling reconnect');
            scheduleRestart(delay);
        });
        return current;
    };

    // JAP@Fix (lifecycle): start() twice used to run two parallel reconnect
    // chains forever (repro: 2 sockets immediately, 3 after one close storm).
    // The public start() is now idempotent; connect() is the internal step.
    const start = async () => {
        if (started && !stopped) {
            logger.warn('start() called while already running — returning the live socket');
            return sock;
        }
        // JAP@Fix (lifecycle): start() after stop() used to return the dead
        // socket silently (started stayed true, stopped stayed true, connect()
        // no-oped). A stopped manager can now be restarted cleanly.
        stopped = false;
        started = true;
        attempts = 0;
        return connect();
    };

    const stop = async () => {
        stopped = true;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        try {
            await sock?.end?.();
        }
        catch { /* socket may already be dead */ }
    };

    return {
        start,
        stop,
        /** The live socket (replaced on every reconnect); null before start(). */
        get socket() {
            return sock;
        },
        /** Consecutive failed attempts since the last successful open. */
        get attempts() {
            return attempts;
        },
    };
};
