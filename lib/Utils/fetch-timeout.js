// Vanz@Add 2.0.5: fetch() with a hard timeout. Native fetch has none, so a slow or stalled
// server (thumbnail host, profile-picture CDN) could keep a send call pending forever.
export const DEFAULT_FETCH_TIMEOUT_MS = 15_000;
/**
 * @param {string | URL} url
 * @param {RequestInit & { dispatcher?: any }} [init] Same as fetch(); an `init.signal` you pass is honoured too.
 * @param {number} [timeoutMs] Defaults to 15s.
 */
export const fetchWithTimeout = (url, init = {}, timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) => {
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    // AbortSignal.any needs Node >= 20.3; engines says >= 20.0.0, so fall back to the timeout alone.
    const signal = init.signal && typeof AbortSignal.any === 'function'
        ? AbortSignal.any([init.signal, timeoutSignal])
        : (init.signal ?? timeoutSignal);
    return fetch(url, { ...init, signal });
};
