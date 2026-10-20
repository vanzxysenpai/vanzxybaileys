/**
 * @param {number} attempts Consecutive failures so far (0 = first retry).
 * @param {{ baseMs?: number, capMs?: number }} [opts]
 * @returns {number} Delay in ms before the next reconnect attempt.
 */
export function computeReconnectDelay(attempts: number, opts1?: { [key: string]: any; 
    baseMs?: number;
    capMs?: number;
}): number;
/**
 * Small stateful helper around `computeReconnectDelay()`.
 *
 *   const backoff = createReconnectBackoff();
 *   sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
 *     if (connection === 'open') backoff.reset();
 *     if (connection === 'close' && shouldReconnect) setTimeout(start, backoff.next());
 *   });
 */
export function createReconnectBackoff(opts?: {}): {
    /** Delay (ms) for the next attempt; increments the failure counter. */
    next(): number;
    /** Call once the connection is open again. */
    reset(): void;
    readonly attempts: number;
};
