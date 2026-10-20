// Vanz@Port (2.0.3) --- idea from kangwifi72/baileys 1.4.9 (connection/disconnect-reason). Re-keyed to THIS fork's
// DisconnectReason enum: the donor mapped 428 to "restart-required", but here 428 is connectionClosed and 515 is restartRequired.
import { DisconnectReason } from '../Types/index.js';
const REASON_BY_CODE = new Map([
    [DisconnectReason.loggedOut, 'logged-out'],
    [DisconnectReason.forbidden, 'forbidden'],
    [DisconnectReason.multideviceMismatch, 'multi-device-mismatch'],
    [DisconnectReason.connectionClosed, 'connection-closed'],
    [DisconnectReason.connectionReplaced, 'connection-replaced'],
    [DisconnectReason.timedOut, 'timed-out'],
    [DisconnectReason.badSession, 'bad-session'],
    [DisconnectReason.restartRequired, 'restart-required'],
    [DisconnectReason.unavailableService, 'unavailable-service'],
    [429, 'rate-limited']
]);
/** Map a numeric disconnect status code to a stable string reason. Nullish -> 'connection-lost'; unknown code -> 'unknown'. */
export const mapDisconnectReason = (code) => {
    if (code === undefined || code === null) {
        return 'connection-lost';
    }
    return REASON_BY_CODE.get(code) ?? 'unknown';
};
/** Reasons where retrying can never succeed (dead session, banned/restricted account, multi-device mismatch). */
export const isFatalDisconnect = (reason) => reason === 'logged-out' || reason === 'forbidden' || reason === 'multi-device-mismatch';
export const isRateLimited = (reason) => reason === 'rate-limited';
/** Advisory only: whether stored credentials are invalid for this reason. Nothing is deleted by this helper. */
export const shouldClearAuth = (reason) => isFatalDisconnect(reason) || reason === 'bad-session';
export const shouldReconnect = (reason) => !isFatalDisconnect(reason);
/** Convenience: accepts a status code, a Boom/Error carrying output.statusCode, or a connection.update `lastDisconnect`. */
export const getDisconnectInfo = (input) => {
    const code = typeof input === 'number'
        ? input
        : input?.error?.output?.statusCode ?? input?.output?.statusCode ?? input?.statusCode;
    const reason = mapDisconnectReason(code);
    return { code, reason, fatal: isFatalDisconnect(reason), clearAuth: shouldClearAuth(reason), reconnect: shouldReconnect(reason), rateLimited: isRateLimited(reason) };
};
