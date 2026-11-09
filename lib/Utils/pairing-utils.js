// Vanz@Port (2.0.3) --- from xbibzlibrary/whatsbibz 1.4.0 (BibzWhats/pairing.js: code + error classification) and
// @japofc/baileys 2.4.1 (qr-render.js: formatPairingCode). Pure helpers only; the donor PairingController (timers/refresh loop) is not ported.
/** Trim + upper-case a user-supplied custom pairing code. Returns '' unless it is exactly 8 chars of A-Z / 0-9. */
export const normalizePairingCode = (value) => {
    const normalized = String(value ?? '').trim().toUpperCase();
    return /^[A-Z0-9]{8}$/.test(normalized) ? normalized : '';
};
/** 'ABCDEFGH' -> 'ABCD-EFGH' for display; anything that is not 8 chars is returned untouched. */
export const formatPairingCode = (code) => {
    const c = String(code ?? '');
    return c.length === 8 ? `${c.slice(0, 4)}-${c.slice(4)}` : c;
};
/**
 * Server error code of a failed pairing request. assertNodeErrorFree Boom errors keep the WA stanza code in `error.data`
 * (e.g. 400 / 429) while Boom's own statusCode is a generic 500, so both are checked.
 */
export const pairingErrorCode = (error) => {
    const fromData = typeof error?.data === 'number' ? error.data : undefined;
    const status = error?.output?.statusCode ?? error?.statusCode ?? error?.status;
    return fromData ?? (status && status !== 500 ? status : undefined);
};
export const isRateLimitError = (error) => {
    const code = pairingErrorCode(error);
    return code === 428 || code === 429 || /rate[- ]?overlimit|rate.?limit|too many/i.test(String(error?.message || error));
};
export const isCustomPairingError = (error) => {
    const code = pairingErrorCode(error);
    return code === 422 || /custom pairing code|pairing code.*(invalid|reject|unsupported)|invalid.*pairing/i.test(String(error?.message || error));
};
