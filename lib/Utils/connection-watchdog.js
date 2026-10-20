// Vanz@Port (v2.1.14) --- adapted from @lpzeravk/baileys 1.0.0 (lib/Socket/connection-watchdog.js, MIT), rewritten:
//  - default probe is the same `w:p` ping iq the built-in keep-alive uses, NOT `sendPresenceUpdate('available')`
//    (that flips the linked device to "online" every time it fires, which is visible to contacts and can suppress
//    phone notifications). Pass `{ probe: 'presence' }` for the original behaviour;
//  - the timer is unref()'d and stops itself when the connection closes;
//  - `sock.end()` is always given an Error and awaited defensively.
//
// Zombie-socket detector: after `idleThresholdMs` with no incoming message it probes the socket, and ends it if the
// WebSocket is closed or the probe fails. That emits the normal `connection.update` close — your existing reconnect
// logic takes over; this does NOT recreate the socket.
//
// Note: Baileys' own keep-alive (`keepAliveIntervalMs`, 15s here) already ends the connection when the server goes
// silent, so this mostly matters if you raised that interval or disabled it. Opt-in, default off.
import { S_WHATSAPP_NET } from '../WABinary/index.js';
const DEFAULT_IDLE_THRESHOLD_MS = 600000;
const DEFAULT_CHECK_INTERVAL_MS = 120000;
/**
 * @param {import('../Types/index.js').WASocket} sock
 * @param {{ idleThresholdMs?: number, checkIntervalMs?: number, probe?: 'ping' | 'presence' }} [opts]
 * @returns {() => void} stop function
 */
export function setupConnectionWatchdog(sock, { idleThresholdMs = DEFAULT_IDLE_THRESHOLD_MS, checkIntervalMs = DEFAULT_CHECK_INTERVAL_MS, probe = 'ping' } = {}) {
    let lastActivity = Date.now();
    let checking = false;
    let stopped = false;
    const onActivity = () => {
        lastActivity = Date.now();
    };
    const stop = () => {
        if (stopped) return;
        stopped = true;
        clearInterval(timer);
        sock.ev.off('messages.upsert', onActivity);
        sock.ev.off('connection.update', onConnectionUpdate);
    };
    const onConnectionUpdate = ({ connection }) => {
        if (connection === 'open') onActivity();
        if (connection === 'close') stop();
    };
    const killSocket = (reason) => {
        sock.logger?.warn?.(`[watchdog] ${reason} — ending socket to force a reconnect`);
        Promise.resolve(sock.end(new Error(`connection-watchdog: ${reason}`))).catch(() => { });
    };
    const timer = setInterval(async () => {
        if (checking || stopped) return;
        const idleMs = Date.now() - lastActivity;
        if (idleMs < idleThresholdMs) return;
        checking = true;
        try {
            if (!sock.ws?.isOpen) {
                killSocket(`websocket not open after ${Math.floor(idleMs / 1000)}s idle`);
                return;
            }
            if (probe === 'presence') {
                await sock.sendPresenceUpdate('available');
            } else {
                await sock.query({
                    tag: 'iq',
                    attrs: { id: sock.generateMessageTag(), to: S_WHATSAPP_NET, type: 'get', xmlns: 'w:p' },
                    content: [{ tag: 'ping', attrs: {} }]
                });
            }
            lastActivity = Date.now();
        } catch (e) {
            killSocket(`${probe} probe failed (${e?.message ?? e})`);
        } finally {
            checking = false;
        }
    }, checkIntervalMs);
    timer.unref?.();
    sock.ev.on('messages.upsert', onActivity);
    sock.ev.on('connection.update', onConnectionUpdate);
    return stop;
}
