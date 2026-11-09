// Vanz@Port (v2.1.14) --- ported from @lpzeravk/baileys 1.0.0 (lib/Utils/reconnect-backoff.js, MIT), comments translated,
// plus the stateful `createReconnectBackoff()` wrapper (own code).
//
// Full-jitter reconnect backoff, like the official app: doubles on every failure, draws a random delay from
// [base/2, base*1.5), and clamps at a ceiling with +-30s slack so many instances don't reconnect in the same second.
const DEFAULT_BASE_MS = 2000;
const DEFAULT_CAP_MS = 15 * 60 * 1000;
const MIN_DELAY_MS = 500;
/**
 * @param {number} attempts Consecutive failures so far (0 = first retry).
 * @param {{ baseMs?: number, capMs?: number }} [opts]
 * @returns {number} Delay in ms before the next reconnect attempt.
 */
export function computeReconnectDelay(attempts, { baseMs = DEFAULT_BASE_MS, capMs = DEFAULT_CAP_MS } = {}) {
    const n = Math.min(Math.max(Number(attempts) || 0, 0), 20);
    const raw = Math.min(baseMs * Math.pow(2, n), capMs);
    let delay = raw / 2 + Math.random() * raw;
    if (delay > capMs) {
        delay = capMs + (Math.random() * 60000 - 30000);
    }
    return Math.max(MIN_DELAY_MS, Math.round(delay));
}
/**
 * Small stateful helper around `computeReconnectDelay()`.
 *
 *   const backoff = createReconnectBackoff();
 *   sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
 *     if (connection === 'open') backoff.reset();
 *     if (connection === 'close' && shouldReconnect) setTimeout(start, backoff.next());
 *   });
 */
export function createReconnectBackoff(opts = {}) {
    let attempts = 0;
    return {
        /** Delay (ms) for the next attempt; increments the failure counter. */
        next() {
            return computeReconnectDelay(attempts++, opts);
        },
        /** Call once the connection is open again. */
        reset() {
            attempts = 0;
        },
        get attempts() {
            return attempts;
        }
    };
}
