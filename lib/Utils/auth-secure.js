// Vanz@Port (v2.0.3) --- ported from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/auth-secure.js. See NOTICE.md.
/**
 * JAP Baileys — Security Pack (auth at-rest encryption, backup, integrity, guards)
 *
 * Covers: encrypted auth-state variants, encrypted backup/restore, integrity
 * checksums, corruption repair, pairing-code rate limiting, QR secret
 * protection, secret-redacting logger, and secure logout wiping.
 *
 * Item map:
 *  (1) auth-state encryption   → useEncryptedFileAuthState / useEncryptedSingleFileAuthState
 *  (2) pairing rate limit      → createRateLimiter / withPairingGuard
 *  (3) QR protection           → createQRGuard / redactSecrets
 *  (4) secure logout           → secureLogout
 *  (5) auth/Signal regression  → tests/security.test.js
 *  (6) encrypted backup        → backupAuthState / restoreAuthState
 *  (7) secret redaction        → redactSecrets / secureLogger
 *  (8) session integrity       → writeAuthIntegrity / verifyAuthIntegrity
 *  (9) corruption recovery     → repairAuthState
 * (10) security + fuzz tests   → tests/security.test.js
 */
import { randomBytes, scryptSync, createCipheriv, createDecipheriv, createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { Mutex } from 'async-mutex';
import { BufferJSON } from './generics.js';
import { initAuthCreds } from './auth-utils.js';
import { proto } from '../../WAProto/index.js';

/** Magic prefix for JAP encrypted JSON payloads. */
export const ENC_MAGIC = 'JAPENC1';
const ENC_ALGO = 'aes-256-gcm';
const SCRYPT_KEYLEN = 32;
const SALT_LEN = 16;
const IV_LEN = 12;

/** Derive a 32-byte key from a password (scrypt, per-file random salt). */
export function deriveKey(password, salt) {
    if (!password || typeof password !== 'string') {
        throw new Error('auth-secure: password must be a non-empty string');
    }
    return scryptSync(password, salt, SCRYPT_KEYLEN, { N: 16384, r: 8, p: 1 });
}

/**
 * Encrypt a JSON-serialisable value.
 * @returns {string} `JAPENC1.<saltB64>.<ivB64u>.<tagB64u>.<ctB64u>` (URL-safe parts)
 */
export function encryptJSON(value, password) {
    const salt = randomBytes(SALT_LEN);
    const iv = randomBytes(IV_LEN);
    const key = deriveKey(password, salt);
    const cipher = createCipheriv(ENC_ALGO, key, iv);
    const plain = Buffer.from(JSON.stringify(value, BufferJSON.replacer));
    const ct = Buffer.concat([cipher.update(plain), cipher.final()]);
    const tag = cipher.getAuthTag();
    const b64u = (b) => b.toString('base64url');
    const out = [ENC_MAGIC, b64u(salt), b64u(iv), b64u(tag), b64u(ct)].join('.');
    key.fill(0);
    return out;
}

/**
 * Decrypt a payload produced by {@link encryptJSON}.
 * @throws when the password is wrong or the payload was tampered with.
 */
export function decryptJSON(payload, password) {
    if (typeof payload !== 'string' || !payload.startsWith(ENC_MAGIC + '.')) {
        throw new Error('auth-secure: not a JAP encrypted payload');
    }
    const parts = payload.split('.');
    if (parts.length !== 5) {
        throw new Error('auth-secure: malformed encrypted payload');
    }
    const [, saltB64, ivB64, tagB64, ctB64] = parts;
    let salt;
    let iv;
    let tag;
    let ct;
    try {
        salt = Buffer.from(saltB64, 'base64url');
        iv = Buffer.from(ivB64, 'base64url');
        tag = Buffer.from(tagB64, 'base64url');
        ct = Buffer.from(ctB64, 'base64url');
    } catch {
        throw new Error('auth-secure: malformed encrypted payload encoding');
    }
    if (salt.length !== SALT_LEN || iv.length !== IV_LEN || tag.length !== 16 || !ct.length) {
        throw new Error('auth-secure: malformed encrypted payload fields');
    }
    const key = deriveKey(password, salt);
    try {
        const decipher = createDecipheriv(ENC_ALGO, key, iv);
        decipher.setAuthTag(tag);
        const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
        return JSON.parse(plain.toString('utf8'), BufferJSON.reviver);
    } catch (err) {
        throw new Error('auth-secure: decryption failed (wrong password or tampered data)', { cause: err });
    } finally {
        key.fill(0);
    }
}

export function isEncryptedPayload(value) {
    return typeof value === 'string' && value.startsWith(ENC_MAGIC + '.');
}

const fileLocks = new Map();
function lockFor(path) {
    let m = fileLocks.get(path);
    if (!m) {
        m = new Mutex();
        fileLocks.set(path, m);
    }
    return m;
}

/**
 * Multi-file auth state with AES-256-GCM encrypted file contents.
 * Reads legacy plaintext files too (transparent migration on next save).
 *
 * @param {string} folder folder holding creds.json + `<type>-<id>.json`
 * @param {{ password: string, logger?: any }} opts password is REQUIRED
 */
export async function useEncryptedFileAuthState(folder, opts) {
    const { password, logger } = opts || {};
    if (!password)
        throw new Error('useEncryptedFileAuthState: opts.password is required');
    await fs.mkdir(folder, { recursive: true });

    const writeData = (data, file) => {
        const filePath = join(folder, fixFileName(file));
        // JAP@Fix (atomic writes): temp-file + rename so a crash mid-write can
        // never truncate an encrypted auth file; 0600 keeps it owner-only.
        return lockFor(filePath).runExclusive(async () => {
            const tmpPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
            await fs.writeFile(tmpPath, encryptJSON(data, password), { encoding: 'utf-8', mode: 0o600 });
            await fs.rename(tmpPath, filePath);
        });
    };
    // JAP@Fix (wrong-password behavior): decrypt failures used to be swallowed
    // into `null` for EVERY file — including creds.json. A wrong password then
    // looked like "no session": initAuthCreds() minted a fresh identity and the
    // next saveCreds() OVERWROTE the real session, encrypted with the typo'd
    // password. One typo = session permanently destroyed. Now a decrypt failure
    // on a critical file throws immediately; non-critical signal keys still
    // degrade to null (a missing key is re-negotiable, an identity is not).
    const readData = async (file, { critical = false } = {}) => {
        const filePath = join(folder, fixFileName(file));
        return lockFor(filePath).runExclusive(async () => {
            let raw;
            try {
                raw = await fs.readFile(filePath, { encoding: 'utf-8' });
            } catch {
                return null; // genuinely missing — fine for creds (fresh install) and keys
            }
            const trimmed = raw.trim();
            // transparent migration: legacy plaintext still readable
            if (!isEncryptedPayload(trimmed)) {
                try {
                    return JSON.parse(trimmed, BufferJSON.reviver);
                } catch {
                    return null;
                }
            }
            try {
                return decryptJSON(trimmed, password);
            } catch (err) {
                if (critical) {
                    throw new Error(`useEncryptedFileAuthState: cannot decrypt ${file} — wrong password or tampered data. ` +
                        'Refusing to start a fresh session over the existing one. ' +
                        'Fix the password, or delete the auth folder to intentionally reset.', { cause: err });
                }
                logger?.warn?.({ file, err: String(err) }, 'auth-secure: failed to decrypt auth file (wrong password?)');
                return null;
            }
        });
    };
    const removeData = (file) => {
        const filePath = join(folder, fixFileName(file));
        return lockFor(filePath)
            .runExclusive(() => fs.unlink(filePath))
            .catch(() => {});
    };

    const folderInfo = await fs.stat(folder).catch(() => {});
    if (folderInfo) {
        if (!folderInfo.isDirectory()) {
            throw new Error(`found "${folder}" which is not a directory`);
        }
    } else {
        await fs.mkdir(folder, { recursive: true });
    }

    const creds = (await readData('creds.json', { critical: true })) || initAuthCreds();
    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(ids.map(async (id) => {
                        let value = await readData(`${type}-${id}.json`);
                        if (type === 'app-state-sync-key' && value) {
                            value = proto.Message.AppStateSyncKeyData.fromObject(value);
                        }
                        data[id] = value;
                    }));
                    return data;
                },
                set: async (data) => {
                    const tasks = [];
                    for (const category of Object.keys(data)) {
                        for (const id of Object.keys(data[category])) {
                            const value = data[category][id];
                            const file = `${category}-${id}.json`;
                            tasks.push(value ? writeData(value, file) : removeData(file));
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: () => writeData(creds, 'creds.json'),
        clearState: async () => {
            try {
                const files = await fs.readdir(folder);
                await Promise.all(files
                    .filter((f) => f.endsWith('.json'))
                    .map((f) => fs.unlink(join(folder, f)).catch(() => {})));
            } catch { /* ignore */ }
        }
    };
}

function fixFileName(file) {
    return file?.replace(/\//g, '__')?.replace(/:/g, '-');
}

/**
 * Single-file auth state with AES-256-GCM encrypted contents.
 * Reads legacy plaintext files too (transparent migration on next save).
 */
export async function useEncryptedSingleFileAuthState(file, opts) {
    const { password, logger } = opts || {};
    if (!password)
        throw new Error('useEncryptedSingleFileAuthState: opts.password is required');
    const keyMap = {};
    const saveState = async (data) => {
        // JAP@Fix (atomic writes): temp-file + rename, owner-only permissions.
        const tmpPath = `${file}.tmp-${process.pid}-${Date.now()}`;
        await fs.writeFile(tmpPath, encryptJSON(data, password), { encoding: 'utf-8', mode: 0o600 });
        await fs.rename(tmpPath, file);
    };
    let creds;
    let saveCreds;
    if (await existsAsync(file)) {
        const raw = (await fs.readFile(file, { encoding: 'utf-8' })).trim();
        const data = isEncryptedPayload(raw)
            ? decryptJSON(raw, password)
            : JSON.parse(raw, BufferJSON.reviver);
        creds = data.creds;
        saveCreds = async () => saveState({ creds, keys: keyMap });
        const { keys } = data;
        for (const type of Object.keys(keys || {})) {
            keyMap[type] = {};
            for (const id of Object.keys(keys[type])) {
                let value = keys[type][id];
                if (type === 'app-state-sync-key' && value) {
                    value = proto.Message.AppStateSyncKeyData.fromObject(value);
                }
                keyMap[type][id] = value;
            }
        }
    } else {
        creds = initAuthCreds();
        saveCreds = async () => saveState({ creds, keys: keyMap });
        await saveCreds();
    }
    // minimal debounce (single flush 300ms after last key write)
    let flushTimer = null;
    const scheduleFlush = () => {
        if (flushTimer)
            clearTimeout(flushTimer);
        flushTimer = setTimeout(() => {
            flushTimer = null;
            saveCreds().catch((e) => logger?.warn?.({ err: String(e) }, 'auth-secure: scheduled flush failed'));
        }, 300);
    };
    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    for (const id of ids)
                        data[id] = keyMap?.[type]?.[id];
                    return data;
                },
                set: async (data) => {
                    for (const category of Object.keys(data)) {
                        keyMap[category] = keyMap[category] || {};
                        for (const id of Object.keys(data[category])) {
                            const value = data[category][id];
                            if (value)
                                keyMap[category][id] = value;
                            else
                                delete keyMap[category][id];
                        }
                    }
                    scheduleFlush();
                }
            }
        },
        saveCreds,
        flush: () => {
            if (flushTimer) {
                clearTimeout(flushTimer);
                flushTimer = null;
            }
            return saveCreds();
        },
        clearState: async () => {
            for (const k of Object.keys(keyMap))
                delete keyMap[k];
            await saveState({ creds: initAuthCreds(), keys: {} });
        }
    };
}

async function existsAsync(path) {
    try {
        await fs.stat(path);
        return true;
    } catch {
        return false;
    }
}

// ---------------------------------------------------------------------------
// (6) Encrypted backup / restore
// ---------------------------------------------------------------------------
export const BACKUP_MAGIC = 'JAPBACKUP1';

/**
 * Back up an auth folder (multi-file) or single auth file into one
 * password-encrypted blob file. Password is REQUIRED.
 */
export async function backupAuthState(src, outFile, { password } = {}) {
    if (!password)
        throw new Error('backupAuthState: opts.password is required');
    const st = await fs.stat(src);
    const files = {};
    if (st.isDirectory()) {
        const names = (await fs.readdir(src)).filter((n) => n.endsWith('.json'));
        for (const n of names) {
            files[n] = (await fs.readFile(join(src, n), { encoding: 'utf-8' })).toString();
        }
    } else {
        files['auth.json'] = (await fs.readFile(src, { encoding: 'utf-8' })).toString();
    }
    const blob = {
        magic: BACKUP_MAGIC,
        createdAt: new Date().toISOString(),
        files: encryptJSON(files, password)
    };
    await fs.writeFile(outFile, JSON.stringify(blob), { encoding: 'utf-8' });
    return { outFile, files: Object.keys(files).length, createdAt: blob.createdAt };
}

/**
 * Restore a blob created by {@link backupAuthState} into a folder
 * (multi-file; creates it) or a single file (when `dest` ends in .json and
 * the backup holds exactly one file — or pass `single: true`).
 */
export async function restoreAuthState(backupFile, dest, { password, single } = {}) {
    if (!password)
        throw new Error('restoreAuthState: opts.password is required');
    const blob = JSON.parse(await fs.readFile(backupFile, { encoding: 'utf-8' }));
    if (blob?.magic !== BACKUP_MAGIC)
        throw new Error('restoreAuthState: not a JAP auth backup');
    const files = decryptJSON(blob.files, password); // throws on wrong password
    const names = Object.keys(files);
    const toSingle = single || (names.length === 1 && dest.endsWith('.json') && names[0] === 'auth.json');
    if (toSingle) {
        await fs.mkdir(join(dest, '..').replace(/\\/g, '/'), { recursive: true }).catch(() => {});
        await fs.writeFile(dest, files[names[0]], { encoding: 'utf-8' });
    } else {
        await fs.mkdir(dest, { recursive: true });
        await Promise.all(names.map((n) => fs.writeFile(join(dest, n), files[n], { encoding: 'utf-8' })));
    }
    return { dest, files: names.length, createdAt: blob.createdAt };
}

// ---------------------------------------------------------------------------
// (8) Session integrity (checksums)
// ---------------------------------------------------------------------------
const INTEGRITY_FILE = 'integrity.json';

function sha256Hex(buf) {
    return createHash('sha256').update(buf).digest('hex');
}

/** Snapshot sha256 (or HMAC-sha256 with `secret`) of every *.json in folder. */
export async function writeAuthIntegrity(folder, { secret } = {}) {
    const names = (await fs.readdir(folder)).filter((n) => n.endsWith('.json') && n !== INTEGRITY_FILE);
    const sums = {};
    for (const n of names) {
        const raw = await fs.readFile(join(folder, n));
        sums[n] = secret ? createHmac('sha256', secret).update(raw).digest('hex') : sha256Hex(raw);
    }
    const snap = { createdAt: new Date().toISOString(), hmac: Boolean(secret), sums };
    await fs.writeFile(join(folder, INTEGRITY_FILE), JSON.stringify(snap, null, 2), { encoding: 'utf-8' });
    return snap;
}

/** Verify folder against its integrity snapshot. */
export async function verifyAuthIntegrity(folder, { secret } = {}) {
    const snapRaw = await fs.readFile(join(folder, INTEGRITY_FILE), { encoding: 'utf-8' }).catch(() => null);
    if (!snapRaw)
        return { ok: false, error: 'no integrity snapshot', mismatched: [], missing: [], extra: [] };
    let snap;
    try {
        snap = JSON.parse(snapRaw);
    } catch {
        return { ok: false, error: 'integrity snapshot corrupt', mismatched: [], missing: [], extra: [] };
    }
    if (snap.hmac && !secret)
        return { ok: false, error: 'snapshot requires secret', mismatched: [], missing: [], extra: [] };
    if (!snap.hmac && secret)
        return { ok: false, error: 'snapshot has no HMAC but secret given', mismatched: [], missing: [], extra: [] };
    const mismatched = [];
    const missing = [];
    for (const [name, want] of Object.entries(snap.sums || {})) {
        const raw = await fs.readFile(join(folder, name)).catch(() => null);
        if (raw === null) {
            missing.push(name);
            continue;
        }
        const got = snap.hmac ? createHmac('sha256', secret).update(raw).digest('hex') : sha256Hex(raw);
        let equal = false;
        try {
            equal = timingSafeEqual(Buffer.from(got, 'hex'), Buffer.from(want, 'hex'));
        } catch { /* length mismatch → unequal */ }
        if (!equal)
            mismatched.push(name);
    }
    const current = new Set((await fs.readdir(folder).catch(() => [])).filter((n) => n.endsWith('.json') && n !== INTEGRITY_FILE));
    const extra = [...current].filter((n) => !(n in (snap.sums || {})));
    const ok = mismatched.length === 0 && missing.length === 0;
    return { ok, mismatched, missing, extra };
}

// ---------------------------------------------------------------------------
// (9) Corruption recovery
// ---------------------------------------------------------------------------
/**
 * Scan an auth folder for corrupt files (unparseable JSON / undecryptable),
 * quarantine them to `.corrupt-<ts>-<name>`, and optionally restore creds
 * from an encrypted backup. Never deletes without quarantining.
 */
export async function repairAuthState(folder, { password, backupFile, backupPassword, logger } = {}) {
    const report = { ok: true, checked: 0, quarantined: [], credsRestored: false };
    let names;
    try {
        names = (await fs.readdir(folder)).filter((n) => n.endsWith('.json') && n !== INTEGRITY_FILE);
    } catch (err) {
        return { ok: false, checked: 0, quarantined: [], credsRestored: false, error: String(err) };
    }
    const ts = Date.now();
    for (const n of names) {
        report.checked++;
        const p = join(folder, n);
        let valid = false;
        try {
            const raw = (await fs.readFile(p, { encoding: 'utf-8' })).trim();
            if (isEncryptedPayload(raw)) {
                if (password) {
                    decryptJSON(raw, password);
                    valid = true;
                } else {
                    // can't verify without password → treat as OK (not our call)
                    valid = true;
                }
            } else {
                JSON.parse(raw, BufferJSON.reviver);
                valid = true;
            }
        } catch (err) {
            logger?.warn?.({ file: n, err: String(err) }, 'auth-secure: quarantining corrupt auth file');
        }
        if (!valid) {
            const q = join(folder, `.corrupt-${ts}-${n}`);
            try {
                await fs.rename(p, q);
                report.quarantined.push(n);
            } catch (err) {
                report.ok = false;
                report.error = `failed to quarantine ${n}: ${String(err)}`;
            }
        }
    }
    const credsGone = report.quarantined.includes('creds.json') || !(await existsAsync(join(folder, 'creds.json')));
    if (credsGone && backupFile) {
        try {
            const blob = JSON.parse(await fs.readFile(backupFile, { encoding: 'utf-8' }));
            const files = decryptJSON(blob.files, backupPassword || password);
            const credsRaw = files['creds.json'] || files['auth.json'];
            if (!credsRaw)
                throw new Error('backup has no creds');
            await fs.writeFile(join(folder, 'creds.json'), credsRaw, { encoding: 'utf-8' });
            report.credsRestored = true;
        } catch (err) {
            report.ok = false;
            report.error = `creds restore failed: ${String(err)}`;
        }
    } else if (credsGone) {
        report.ok = false;
        report.error = 'creds.json missing/corrupt and no backup provided (re-pair required)';
    }
    return report;
}

// ---------------------------------------------------------------------------
// (2) Pairing-code rate limiting + anti-abuse
// ---------------------------------------------------------------------------
/**
 * Sliding-window rate limiter. `now` injectable for tests.
 * Returns `{ allowed, retryAfterMs }` — never throws.
 */
export function createRateLimiter({ max = 5, windowMs = 60 * 60 * 1000, minIntervalMs = 0, now = () => Date.now() } = {}) {
    const hits = new Map(); // key -> number[] timestamps
    const stats = { allowed: 0, blocked: 0 };
    function prune(arr, t) {
        while (arr.length && t - arr[0] >= windowMs)
            arr.shift();
        return arr;
    }
    return {
        stats,
        check(key = 'global') {
            const t = now();
            const arr = prune(hits.get(key) || [], t);
            if (minIntervalMs && arr.length && t - arr[arr.length - 1] < minIntervalMs) {
                stats.blocked++;
                return { allowed: false, retryAfterMs: minIntervalMs - (t - arr[arr.length - 1]) };
            }
            if (arr.length >= max) {
                stats.blocked++;
                return { allowed: false, retryAfterMs: windowMs - (t - arr[0]) };
            }
            arr.push(t);
            hits.set(key, arr);
            stats.allowed++;
            return { allowed: true, retryAfterMs: 0 };
        },
        reset(key) {
            if (key)
                hits.delete(key);
            else
                hits.clear();
        }
    };
}

/**
 * Wrap `sock.requestPairingCode` with per-phone + global rate limits.
 * @returns {{ restore: () => void, limiter, global }} — call `restore()` to unwrap.
 */
export function withPairingGuard(sock, { maxPerHour = 5, globalMaxPerHour = 20, minIntervalMs = 30_000, logger, now } = {}) {
    if (!sock || typeof sock.requestPairingCode !== 'function') {
        throw new Error('withPairingGuard: sock.requestPairingCode not found');
    }
    const limiter = createRateLimiter({ max: maxPerHour, windowMs: 3_600_000, minIntervalMs, now });
    const global = createRateLimiter({ max: globalMaxPerHour, windowMs: 3_600_000, now });
    const original = sock.requestPairingCode.bind(sock);
    // JAP@Fix: the wrapper dropped every argument after phoneNumber, silently
    // breaking custom pairing codes (`requestPairingCode(phone, 'JAPJAP12')`
    // behaved like the random-code variant once the guard was installed).
    // Forward ALL arguments so the guard is behavior-transparent.
    sock.requestPairingCode = async (phoneNumber, ...args) => {
        const perPhone = limiter.check(String(phoneNumber));
        const g = global.check('global');
        if (!perPhone.allowed || !g.allowed) {
            const retryAfterMs = Math.max(perPhone.retryAfterMs, g.retryAfterMs);
            logger?.warn?.({ phoneNumber: String(phoneNumber).slice(0, 4) + '****', retryAfterMs }, 'auth-secure: pairing-code request rate-limited');
            const err = new Error(`pairing-code rate limited, retry in ${Math.ceil(retryAfterMs / 1000)}s`);
            err.retryAfterMs = retryAfterMs;
            throw err;
        }
        return original(phoneNumber, ...args);
    };
    return { restore: () => { sock.requestPairingCode = original; }, limiter, global };
}

// ---------------------------------------------------------------------------
// (3) QR secret protection
// ---------------------------------------------------------------------------
/**
 * QR fist-guard: passes the FIRST qr per window, swallows repeats (they are
 * equivalent secrets — re-logging/re-rendering only widens exposure), and
 * expires the window after `ttlMs`. Feed it `ev.qr` values.
 */
export function createQRGuard({ ttlMs = 60_000, now = () => Date.now(), onFirst, onBlocked } = {}) {
    let seenAt = 0;
    let current = null;
    const stats = { passed: 0, blocked: 0 };
    return {
        stats,
        /** @returns the qr if it should be handled, `null` if it must be swallowed */
        handle(qr) {
            if (!qr)
                return null;
            const t = now();
            if (current !== null && t - seenAt < ttlMs) {
                stats.blocked++;
                onBlocked?.(stats.blocked);
                return null;
            }
            current = qr;
            seenAt = t;
            stats.passed++;
            onFirst?.(qr);
            return qr;
        },
        reset() {
            current = null;
            seenAt = 0;
        },
        get active() {
            return current !== null && now() - seenAt < ttlMs;
        }
    };
}

// ---------------------------------------------------------------------------
// (7) Secret-redacting logger
// ---------------------------------------------------------------------------
const SENSITIVE_EXACT = new Set([
    'qr', 'qrcode', 'pairingcode', 'pin', 'otp', 'seed', 'mnemonic', 'passphrase',
    'noisekey', 'privatekey', 'advsecretkey', 'mediakey', 'fileencsha256', 'mediakeytimestamp'
]);
const SENSITIVE_SUFFIX = ['key', 'token', 'secret', 'password', 'passwd', 'pwd', 'credential', 'cred', 'auth', 'noise', 'salt', 'iv', 'signature', 'ciphertext'];
const REDACTED = '[REDACTED]';

function isSensitiveKey(key) {
    if (typeof key !== 'string' || !key)
        return false;
    const norm = key.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!norm)
        return false;
    if (SENSITIVE_EXACT.has(norm))
        return true;
    return SENSITIVE_SUFFIX.some((s) => norm === s || norm.endsWith(s));
}

/**
 * Deep-clone `value`, replacing sensitive fields with `[REDACTED]`.
 * Handles circular refs, Buffers/Uint8Arrays (→ `[BINARY:<n>B]` when under a
 * sensitive key, else kept), Dates, and class instances (kept as-is).
 */
export function redactSecrets(value, { extraKeys = [], maxDepth = 12 } = {}) {
    const extra = new Set(extraKeys);
    const seen = new Map();
    const walk = (val, depth) => {
        if (val === null || typeof val !== 'object') {
            // bare strings that ARE encrypted payloads / tokens passed directly
            if (typeof val === 'string' && depth > 0 && (isEncryptedPayload(val) || /^[A-Za-z0-9+/=]{64,}$/.test(val) && val.length > 96)) {
                return REDACTED;
            }
            return val;
        }
        if (seen.has(val))
            return seen.get(val);
        if (val instanceof Date || val instanceof RegExp)
            return val;
        if (Buffer.isBuffer(val) || val instanceof Uint8Array)
            return val; // binary kept unless under sensitive key (handled by parent)
        if (depth >= maxDepth)
            return '[MAXDEPTH]';
        if (Array.isArray(val)) {
            const out = [];
            seen.set(val, out);
            for (const item of val)
                out.push(walk(item, depth + 1));
            return out;
        }
        const protoOf = Object.getPrototypeOf(val);
        if (protoOf !== null && protoOf !== Object.prototype) {
            return val; // class instances (KeyPair etc.) — never serialised anyway
        }
        const out = {};
        seen.set(val, out);
        for (const [k, v] of Object.entries(val)) {
            if (extra.has(k) || isSensitiveKey(k)) {
                out[k] = REDACTED;
            } else if ((Buffer.isBuffer(v) || v instanceof Uint8Array) && v.length > 0 && isSensitiveKey(k)) {
                out[k] = REDACTED;
            } else {
                out[k] = walk(v, depth + 1);
            }
        }
        return out;
    };
    return walk(value, 0);
}

/**
 * Wrap any pino-compatible logger so every object arg is redacted first.
 * Usage: `const sock = makeWASocket({ logger: secureLogger(pino(...)) })`.
 */
export function secureLogger(base, { extraKeys } = {}) {
    if (!base || typeof base !== 'object')
        throw new Error('secureLogger: base logger required');
    const wrap = (fn) => (...args) => fn(...args.map((a) => (a && typeof a === 'object' ? redactSecrets(a, { extraKeys }) : a)));
    const out = Object.create(Object.getPrototypeOf(base) || null);
    for (const k of ['trace', 'debug', 'info', 'warn', 'error', 'fatal']) {
        if (typeof base[k] === 'function')
            out[k] = wrap(base[k].bind(base));
    }
    if (typeof base.child === 'function') {
        out.child = (bindings) => secureLogger(base.child(redactSecrets(bindings || {}, { extraKeys })), { extraKeys });
    }
    // passthrough level + misc props
    for (const k of ['level', 'silent']) {
        if (k in base) {
            try {
                out[k] = base[k];
            } catch { /* readonly — ignore */ }
        }
    }
    return out;
}

// ---------------------------------------------------------------------------
// (4) Secure logout / session revocation
// ---------------------------------------------------------------------------
const CREDS_SECRET_FIELDS = [
    'noiseKey', 'pairingEphemeralKeyPair', 'signedIdentityKey', 'signedPreKey',
    'advSecretKey', 'pairingCode', 'accountSyncCounter', 'lastPropHash',
    'routingInfo', 'additionalData', 'me', 'account'
];

/**
 * Log out AND wipe local secrets: sends logout, unlinks every *.json in the
 * auth folder (overwritten with random bytes first), scrubs the in-memory
 * creds object. Returns a report. SSD/note: overwrite is best-effort.
 */
export async function secureLogout(sock, { authFolder, authFile, passes = 1, logger } = {}) {
    const report = { loggedOut: false, wiped: [], credsScrubbed: false };
    if (sock && typeof sock.logout === 'function') {
        try {
            await sock.logout('secure logout — revoking session');
            report.loggedOut = true;
        } catch (err) {
            logger?.warn?.({ err: String(err) }, 'auth-secure: remote logout failed, continuing with local wipe');
        }
    }
    const targets = [];
    if (authFolder) {
        const names = await fs.readdir(authFolder).catch(() => []);
        for (const n of names.filter((n) => n.endsWith('.json') || n.startsWith('.corrupt-')))
            targets.push(join(authFolder, n));
    }
    if (authFile)
        targets.push(authFile);
    for (const p of targets) {
        try {
            const st = await fs.stat(p);
            for (let i = 0; i < passes; i++) {
                const fh = await fs.open(p, 'r+');
                try {
                    await fh.write(randomBytes(Math.min(st.size, 1 << 20)), 0, Math.min(st.size, 1 << 20), 0);
                } finally {
                    await fh.close();
                }
            }
            await fs.unlink(p);
            report.wiped.push(p);
        } catch { /* already gone — fine */ }
    }
    const creds = sock?.authState?.creds || sock?.creds;
    if (creds && typeof creds === 'object') {
        for (const f of CREDS_SECRET_FIELDS) {
            try {
                delete creds[f];
            } catch { /* ignore */ }
        }
        report.credsScrubbed = true;
    }
    return report;
}
