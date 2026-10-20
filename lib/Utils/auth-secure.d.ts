/** Derive a 32-byte key from a password (scrypt, per-file random salt). */
export function deriveKey(password: any, salt: any): any;
/**
 * Encrypt a JSON-serialisable value.
 * @returns {string} `JAPENC1.<saltB64>.<ivB64u>.<tagB64u>.<ctB64u>` (URL-safe parts)
 */
export function encryptJSON(value: any, password: any): string;
/**
 * Decrypt a payload produced by {@link encryptJSON}.
 * @throws when the password is wrong or the payload was tampered with.
 */
export function decryptJSON(payload: any, password: any): any;
export function isEncryptedPayload(value: any): boolean;
/**
 * Multi-file auth state with AES-256-GCM encrypted file contents.
 * Reads legacy plaintext files too (transparent migration on next save).
 *
 * @param {string} folder folder holding creds.json + `<type>-<id>.json`
 * @param {{ password: string, logger?: any }} opts password is REQUIRED
 */
export function useEncryptedFileAuthState(folder: string, opts: {
    password: string;
    logger?: any;
}): Promise<{
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<{}>;
            set: (data: any) => Promise<void>;
        };
    };
    saveCreds: () => any;
    clearState: () => Promise<void>;
}>;
/**
 * Single-file auth state with AES-256-GCM encrypted contents.
 * Reads legacy plaintext files too (transparent migration on next save).
 */
export function useEncryptedSingleFileAuthState(file: any, opts: any): Promise<{
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<{}>;
            set: (data: any) => Promise<void>;
        };
    };
    saveCreds: () => Promise<void>;
    flush: () => Promise<void>;
    clearState: () => Promise<void>;
}>;
/**
 * Back up an auth folder (multi-file) or single auth file into one
 * password-encrypted blob file. Password is REQUIRED.
 */
export function backupAuthState(src: any, outFile: any, opts1?: { [key: string]: any; }): Promise<{
    outFile: any;
    files: number;
    createdAt: string;
}>;
/**
 * Restore a blob created by {@link backupAuthState} into a folder
 * (multi-file; creates it) or a single file (when `dest` ends in .json and
 * the backup holds exactly one file — or pass `single: true`).
 */
export function restoreAuthState(backupFile: any, dest: any, opts2?: { [key: string]: any; }): Promise<{
    dest: any;
    files: number;
    createdAt: any;
}>;
/** Snapshot sha256 (or HMAC-sha256 with `secret`) of every *.json in folder. */
export function writeAuthIntegrity(folder: any, opts3?: { [key: string]: any; }): Promise<{
    createdAt: string;
    hmac: boolean;
    sums: {};
}>;
/** Verify folder against its integrity snapshot. */
export function verifyAuthIntegrity(folder: any, opts4?: { [key: string]: any; }): Promise<{
    ok: boolean;
    error: string;
    mismatched: any[];
    missing: any[];
    extra: any[];
} | {
    ok: boolean;
    mismatched: string[];
    missing: string[];
    extra: any[];
    error?: undefined;
}>;
/**
 * Scan an auth folder for corrupt files (unparseable JSON / undecryptable),
 * quarantine them to `.corrupt-<ts>-<name>`, and optionally restore creds
 * from an encrypted backup. Never deletes without quarantining.
 */
export function repairAuthState(folder: any, opts5?: { [key: string]: any; }): Promise<{
    ok: boolean;
    checked: number;
    quarantined: any[];
    credsRestored: boolean;
}>;
/**
 * Sliding-window rate limiter. `now` injectable for tests.
 * Returns `{ allowed, retryAfterMs }` — never throws.
 */
export function createRateLimiter(opts10?: { [key: string]: any; 
    max?: number;
    windowMs?: number;
    minIntervalMs?: number;
    now?: () => number;
}): {
    stats: {
        allowed: number;
        blocked: number;
    };
    check(key?: string): {
        allowed: boolean;
        retryAfterMs: number;
    };
    reset(key: any): void;
};
/**
 * Wrap `sock.requestPairingCode` with per-phone + global rate limits.
 * @returns {{ restore: () => void, limiter, global }} — call `restore()` to unwrap.
 */
export function withPairingGuard(sock: any, opts6?: { [key: string]: any; 
    maxPerHour?: number;
    globalMaxPerHour?: number;
    minIntervalMs?: number;
}): {
    restore: () => void;
    limiter: any;
    global: any;
};
/**
 * QR fist-guard: passes the FIRST qr per window, swallows repeats (they are
 * equivalent secrets — re-logging/re-rendering only widens exposure), and
 * expires the window after `ttlMs`. Feed it `ev.qr` values.
 */
export function createQRGuard(opts11?: { [key: string]: any; 
    ttlMs?: number;
    now?: () => number;
}): {
    stats: {
        passed: number;
        blocked: number;
    };
    /** @returns the qr if it should be handled, `null` if it must be swallowed */
    handle(qr: any): any;
    reset(): void;
    readonly active: boolean;
};
/**
 * Deep-clone `value`, replacing sensitive fields with `[REDACTED]`.
 * Handles circular refs, Buffers/Uint8Arrays (→ `[BINARY:<n>B]` when under a
 * sensitive key, else kept), Dates, and class instances (kept as-is).
 */
export function redactSecrets(value: any, opts7?: { [key: string]: any; 
    extraKeys?: any[];
    maxDepth?: number;
}): any;
/**
 * Wrap any pino-compatible logger so every object arg is redacted first.
 * Usage: `const sock = makeWASocket({ logger: secureLogger(pino(...)) })`.
 */
export function secureLogger(base: any, opts8?: { [key: string]: any; }): any;
/**
 * Log out AND wipe local secrets: sends logout, unlinks every *.json in the
 * auth folder (overwritten with random bytes first), scrubs the in-memory
 * creds object. Returns a report. SSD/note: overwrite is best-effort.
 */
export function secureLogout(sock: any, opts9?: { [key: string]: any; 
    passes?: number;
}): Promise<{
    loggedOut: boolean;
    wiped: any[];
    credsScrubbed: boolean;
}>;
/** Magic prefix for JAP encrypted JSON payloads. */
export const ENC_MAGIC: "JAPENC1";
export const BACKUP_MAGIC: "JAPBACKUP1";
