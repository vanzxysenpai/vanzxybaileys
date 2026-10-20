export function isBadMacError(error: any): any;
export function isSessionError(error: any): any;
export class BadMacHandler {
    /**
     * @param {object} [options]
     * @param {number} [options.maxRetries=5] Errors within one window before `hasReachedLimit()` turns true.
     * @param {number} [options.resetInterval=300000] Window length (ms); the counter resets once it has passed.
     * @param {string} [options.authFolder] Folder used by `useMultiFileAuthState()` — required for cleanup.
     * @param {{ warn?: Function, error?: Function }} [options.logger] pino-style logger (defaults to silent).
     * @param {(stats: object) => void} [options.onLimit] Called each time an error is handled while at/over the limit.
     */
    constructor(options?: {
        maxRetries?: number;
        resetInterval?: number;
        authFolder?: string;
        logger?: {
            warn?: Function;
            error?: Function;
        };
        onLimit?: (stats: object) => void;
    });
    errorCount: number;
    maxRetries: number;
    resetInterval: number;
    lastReset: number;
    authFolder: string;
    logger: {
        warn?: Function;
        error?: Function;
    };
    onLimit: (stats: object) => void;
    isBadMacError(error: any): any;
    isSessionError(error: any): any;
    /**
     * Delete per-peer Signal session files (`session-*`, `sender-key-*`) from `authFolder`. creds.json and
     * app-state-sync-* are always kept; peers renegotiate sessions on the next message. Call it when the bot is
     * idle or right before a restart — the running socket may still hold those sessions in memory.
     * @returns {Promise<string[]>} names of the removed files
     */
    clearProblematicSessionFiles(opts1?: { [key: string]: any; 
        dryRun?: boolean;
    }): Promise<string[]>;
    incrementErrorCount(): void;
    resetErrorCount(): void;
    hasReachedLimit(): boolean;
    /**
     * @returns {boolean} true when it was a Bad MAC error (handled/counted — caller may ignore it);
     *                    false when it was anything else (caller must rethrow).
     */
    handleError(error: any, context?: string): boolean;
    /** Wrap an async fn: Bad MAC is swallowed (returns null), every other error is rethrown. */
    createSafeWrapper(fn: any, context: any): (...args: any[]) => Promise<any>;
    getStats(): {
        errorCount: number;
        maxRetries: number;
        lastReset: string;
        timeUntilReset: number;
    };
}
