// Vanz@Port (v2.1.14) --- adapted from @lpzeravk/baileys 1.0.0 (lib/Utils/bad-mac-handler.js, MIT), rewritten:
//  - comments/log text translated to English; logger is injectable (this fork's Utils/logger.js is a bare pino
//    instance, not the errorLog/warningLog helpers the source imported);
//  - `authFolder` has NO hardcoded default path (the source assumed ./assets/auth/baileys) — cleanup is a no-op
//    with a warning until you pass it;
//  - `decryption failed` no longer counts as Bad MAC (it also matches unrelated media-decrypt errors);
//  - cleanup is async, supports `dryRun`, and returns the removed file names.
//
// "Bad MAC" happens when a peer's Signal session goes out of sync (they reinstalled WhatsApp, changed device, or a
// key exchange was lost). It is expected now and then and is not a bot bug — this helper detects/counts it so your own
// try/catch can ignore it, and can drop the per-peer session files (creds are never touched).
import fs from 'node:fs/promises';
import path from 'node:path';
const noop = () => { };
const PRESERVE = ['creds.json', 'app-state-sync-key', 'app-state-sync-version'];
export const isBadMacError = (error) => {
    const msg = error?.message || String(error ?? '');
    return msg.includes('Bad MAC') || msg.includes('MAC verification failed');
};
export const isSessionError = (error) => {
    const msg = error?.message || String(error ?? '');
    return msg.includes('Session') || msg.includes('signal protocol') || msg.includes('decrypt') || isBadMacError(error);
};
export class BadMacHandler {
    /**
     * @param {object} [options]
     * @param {number} [options.maxRetries=5] Errors within one window before `hasReachedLimit()` turns true.
     * @param {number} [options.resetInterval=300000] Window length (ms); the counter resets once it has passed.
     * @param {string} [options.authFolder] Folder used by `useMultiFileAuthState()` — required for cleanup.
     * @param {{ warn?: Function, error?: Function }} [options.logger] pino-style logger (defaults to silent).
     * @param {(stats: object) => void} [options.onLimit] Called each time an error is handled while at/over the limit.
     */
    constructor(options = {}) {
        this.errorCount = 0;
        this.maxRetries = options.maxRetries ?? 5;
        this.resetInterval = options.resetInterval ?? 300000;
        this.lastReset = Date.now();
        this.authFolder = options.authFolder;
        this.logger = options.logger ?? {};
        this.onLimit = options.onLimit;
    }
    isBadMacError(error) {
        return isBadMacError(error);
    }
    isSessionError(error) {
        return isSessionError(error);
    }
    /**
     * Delete per-peer Signal session files (`session-*`, `sender-key-*`) from `authFolder`. creds.json and
     * app-state-sync-* are always kept; peers renegotiate sessions on the next message. Call it when the bot is
     * idle or right before a restart — the running socket may still hold those sessions in memory.
     * @returns {Promise<string[]>} names of the removed files
     */
    async clearProblematicSessionFiles({ dryRun = false } = {}) {
        if (!this.authFolder) {
            (this.logger.warn ?? noop).call(this.logger, '[bad-mac] authFolder not configured — nothing cleared');
            return [];
        }
        const removed = [];
        try {
            for (const file of await fs.readdir(this.authFolder)) {
                if (PRESERVE.some((p) => file.includes(p))) continue;
                if (!(file.startsWith('session-') || file.includes('sender-key'))) continue;
                const full = path.join(this.authFolder, file);
                if (!(await fs.stat(full)).isFile()) continue;
                if (!dryRun) await fs.unlink(full);
                removed.push(file);
            }
        } catch (err) {
            (this.logger.error ?? noop).call(this.logger, { err }, '[bad-mac] failed to clear session files');
            return removed;
        }
        if (removed.length) (this.logger.warn ?? noop).call(this.logger, `[bad-mac] ${dryRun ? 'would remove' : 'removed'} ${removed.length} session file(s); creds preserved`);
        return removed;
    }
    incrementErrorCount() {
        if (Date.now() - this.lastReset > this.resetInterval) {
            this.resetErrorCount();
        }
        this.errorCount++;
    }
    resetErrorCount() {
        this.errorCount = 0;
        this.lastReset = Date.now();
    }
    hasReachedLimit() {
        return this.errorCount >= this.maxRetries;
    }
    /**
     * @returns {boolean} true when it was a Bad MAC error (handled/counted — caller may ignore it);
     *                    false when it was anything else (caller must rethrow).
     */
    handleError(error, context = 'unknown') {
        if (!isBadMacError(error)) return false;
        this.incrementErrorCount();
        (this.logger.warn ?? noop).call(this.logger, `[bad-mac] ${context}: ${error.message} (${this.errorCount}/${this.maxRetries})`);
        if (this.hasReachedLimit()) this.onLimit?.(this.getStats());
        return true;
    }
    /** Wrap an async fn: Bad MAC is swallowed (returns null), every other error is rethrown. */
    createSafeWrapper(fn, context) {
        return async (...args) => {
            try {
                return await fn(...args);
            } catch (error) {
                if (this.handleError(error, context)) return null;
                throw error;
            }
        };
    }
    getStats() {
        return {
            errorCount: this.errorCount,
            maxRetries: this.maxRetries,
            lastReset: new Date(this.lastReset).toISOString(),
            timeUntilReset: Math.max(0, this.resetInterval - (Date.now() - this.lastReset))
        };
    }
}
