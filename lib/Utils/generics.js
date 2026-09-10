import { Boom } from '@hapi/boom';
import { createHash, randomBytes, randomFillSync } from 'crypto';
import { proto } from '../../WAProto/index.js';
const baileysVersion = [2, 3000, 1043857760];
import { DisconnectReason } from '../Types/index.js';
import { getAllBinaryNodeChildren, jidDecode } from '../WABinary/index.js';
import { sha256 } from './crypto.js';
export const BufferJSON = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replacer: (k, value) => {
        if (Buffer.isBuffer(value) || value instanceof Uint8Array || value?.type === 'Buffer') {
            return { type: 'Buffer', data: Buffer.from(value?.data || value).toString('base64') };
        }
        return value;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviver: (_, value) => {
        if (typeof value === 'object' && value !== null && value.type === 'Buffer' && typeof value.data === 'string') {
            return Buffer.from(value.data, 'base64');
        }
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const keys = Object.keys(value);
            if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k, 10)))) {
                const values = Object.values(value);
                if (values.every(v => typeof v === 'number')) {
                    return Buffer.from(values);
                }
            }
        }
        return value;
    }
};
export const getKeyAuthor = (key, meId = 'me') => (key?.fromMe ? meId : key?.participantAlt || key?.remoteJidAlt || key?.participant || key?.remoteJid) || '';
export const isStringNullOrEmpty = (value) => 
// eslint-disable-next-line eqeqeq
value == null || value === '';
export const writeRandomPadMax16 = (msg) => {
    const pad = randomBytes(1);
    const padLength = (pad[0] & 0x0f) + 1;
    return Buffer.concat([msg, Buffer.alloc(padLength, padLength)]);
};
export const unpadRandomMax16 = (e) => {
    const t = new Uint8Array(e);
    if (0 === t.length) {
        throw new Error('unpadPkcs7 given empty bytes');
    }
    var r = t[t.length - 1];
    if (r > t.length) {
        throw new Error(`unpad given ${t.length} bytes, but pad is ${r}`);
    }
    return new Uint8Array(t.buffer, t.byteOffset, t.length - r);
};
// code is inspired by whatsmeow
export const generateParticipantHashV2 = (participants) => {
    participants.sort();
    const sha256Hash = sha256(Buffer.from(participants.join(''))).toString('base64');
    return '2:' + sha256Hash.slice(0, 6);
};
export const encodeWAMessage = (message) => writeRandomPadMax16(proto.Message.encode(message).finish());
export const generateRegistrationId = () => {
    return Uint16Array.from(randomBytes(2))[0] & 16383;
};
export const encodeBigEndian = (e, t = 4) => {
    let r = e;
    const a = new Uint8Array(t);
    for (let i = t - 1; i >= 0; i--) {
        a[i] = 255 & r;
        r >>>= 8;
    }
    return a;
};
export const toNumber = (t) => typeof t === 'object' && t ? ('toNumber' in t ? t.toNumber() : t.low) : t || 0;
/** unix timestamp of a date in seconds */
// Vanz@Fix (bug 69): unixTimestampSeconds(date) assumed `date` is always a real Date
// instance and called date.getTime() unconditionally. Any caller that passed a raw
// number (Date.now(), or an already-converted unix timestamp) or an ISO string instead
// of a Date crashed here with "date.getTime is not a function" — this is a coercion
// bug in THIS function, not a proto/BloksWidget/InteractiveMessage issue (traced and
// confirmed: normalizeMessageContent/getContentType never touch nested message content,
// and this function is called before any encode/serialize step even starts). Coerce the
// common input shapes instead of assuming Date, but keep throwing on genuinely invalid
// input (NaN) so silent bad-timestamp bugs don't get hidden.
export const unixTimestampSeconds = (date) => {
    if (date == null) date = new Date(); // null AND undefined both mean "now" (default params only catch undefined)
    const d = date instanceof Date
        ? date
        : new Date(typeof date === 'number' && date < 1e12 ? date * 1000 : date); // treat sub-1e12 numbers as already-seconds
    if (Number.isNaN(d.getTime())) {
        throw new TypeError(`unixTimestampSeconds: invalid timestamp input (${typeof date}): ${date}`);
    }
    return d.getTime() / 1000 | 0;
};
export const debouncedTimeout = (intervalMs = 1000, task) => {
    let timeout;
    return {
        start: (newIntervalMs, newTask) => {
            task = newTask || task;
            intervalMs = newIntervalMs || intervalMs;
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => task?.(), intervalMs);
        },
        cancel: () => {
            timeout && clearTimeout(timeout);
            timeout = undefined;
        },
        setTask: (newTask) => (task = newTask),
        setInterval: (newInterval) => (intervalMs = newInterval)
    };
};
export const delay = (ms) => delayCancellable(ms).delay;
export const delayCancellable = (ms) => {
    const stack = new Error().stack;
    let timeout;
    let reject;
    const delay = new Promise((resolve, _reject) => {
        timeout = setTimeout(resolve, ms);
        reject = _reject;
    });
    const cancel = () => {
        clearTimeout(timeout);
        reject(new Boom('Cancelled', {
            statusCode: 500,
            data: {
                stack
            }
        }));
    };
    return { delay, cancel };
};
export async function promiseTimeout(ms, promise) {
    if (!ms) {
        return new Promise(promise);
    }
    const stack = new Error().stack;
    // Create a promise that rejects in <ms> milliseconds
    const { delay, cancel } = delayCancellable(ms);
    const p = new Promise((resolve, reject) => {
        delay
            .then(() => reject(new Boom('Timed Out', {
            statusCode: DisconnectReason.timedOut,
            data: {
                stack
            }
        })))
            .catch(err => reject(err));
        promise(resolve, reject);
    }).finally(cancel);
    return p;
}
// inspired from whatsmeow code
// https://github.com/tulir/whatsmeow/blob/64bc969fbe78d31ae0dd443b8d4c80a5d026d07a/send.go#L42
export const generateMessageIDV2 = (userId) => {
    const data = Buffer.allocUnsafe(44);
    data.writeBigUInt64BE(BigInt(Date.now() / 1000 | 0), 0);
    if (userId) {
        const userStr = userId.split('@')[0].split(':')[0];
        if (userStr) {
            const len = data.write(userStr, 8);
            data.write('@c.us', 8 + len);
        }
    }
    randomFillSync(data, 28, 16);
    const hash = createHash('sha256').update(data).digest();
    const hex = hash.toString('hex', 0, 9).toUpperCase();
    return '3EB0' + hex;
};
// generate a random ID to attach to a message
export const generateMessageID = () => '3EB0' + randomBytes(18).toString('hex').toUpperCase();
export function bindWaitForEvent(ev, event) {
    return async (check, timeoutMs) => {
        let listener;
        let closeListener;
        await promiseTimeout(timeoutMs, (resolve, reject) => {
            closeListener = ({ connection, lastDisconnect }) => {
                if (connection === 'close') {
                    reject(lastDisconnect?.error || new Boom('Connection Closed', { statusCode: DisconnectReason.connectionClosed }));
                }
            };
            ev.on('connection.update', closeListener);
            listener = async (update) => {
                if (await check(update)) {
                    resolve();
                }
            };
            ev.on(event, listener);
        }).finally(() => {
            ev.off(event, listener);
            ev.off('connection.update', closeListener);
        });
    };
}
export const bindWaitForConnectionUpdate = (ev) => bindWaitForEvent(ev, 'connection.update');
/**
 * utility that fetches latest baileys version from the master branch.
 * Use to ensure your WA connection is always on the latest version
 */
export const fetchLatestBaileysVersion = async (options = {}) => {
    // Balik ke repo sendiri — Vanzxy bakal update manual lib/Defaults/index.js
    // di GitHub tiap WA naikin versi minimum.
    const URL = 'https://raw.githubusercontent.com/vanzxy/baileys/main/lib/Defaults/index.js';
    try {
        const response = await fetch(URL, {
            dispatcher: options.dispatcher,
            method: 'GET',
            headers: options.headers
        });
        if (!response.ok) {
            throw new Boom(`Failed to fetch latest Baileys version: ${response.statusText}`, { statusCode: response.status });
        }
        const text = await response.text();
        // Vanz@Fix: sebelumnya ambil baris tertentu by index (lines[4]) —
        // rapuh banget, gampang salah baca kalau format file sumbernya
        // berubah dikit (nambah/kurang komentar/baris kosong di atasnya).
        // Sekarang cari pattern `const version = [...]` di SELURUH isi
        // file, gak peduli ada di baris keberapa.
        const versionMatch = text.match(/const version\s*=\s*\[(\d+),\s*(\d+),\s*(\d+)\]/);
        if (versionMatch) {
            const version = [parseInt(versionMatch[1]), parseInt(versionMatch[2]), parseInt(versionMatch[3])];
            return {
                version,
                isLatest: true
            };
        }
        else {
            throw new Error('Could not parse version from Defaults/index.ts');
        }
    }
    catch (error) {
        return {
            version: baileysVersion,
            isLatest: false,
            error
        };
    }
};
/**
 * A utility that fetches the latest web version of whatsapp.
 * Use to ensure your WA connection is always on the latest version
 */
export const fetchLatestWaWebVersion = async (options = {}) => {
    try {
        // Absolute minimal headers required to bypass anti-bot detection
        const defaultHeaders = {
            'sec-fetch-site': 'none',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        };
        const headers = { ...defaultHeaders, ...options.headers };
        const response = await fetch('https://web.whatsapp.com/sw.js', {
            ...options,
            method: 'GET',
            headers
        });
        if (!response.ok) {
            throw new Boom(`Failed to fetch sw.js: ${response.statusText}`, { statusCode: response.status });
        }
        const data = await response.text();
        const regex = /\\?"client_revision\\?":\s*(\d+)/;
        const match = data.match(regex);
        if (!match?.[1]) {
            return {
                version: baileysVersion,
                isLatest: false,
                error: {
                    message: 'Could not find client revision in the fetched content'
                }
            };
        }
        const clientRevision = match[1];
        return {
            version: [2, 3000, +clientRevision],
            isLatest: true
        };
    }
    catch (error) {
        return {
            version: baileysVersion,
            isLatest: false,
            error
        };
    }
};
/**
 * Vanz@Fix (bug 64): the comment on `version` in Defaults/index.js has long
 * recommended calling `fetchLatestWaWebVersion()` first (parses WA's own
 * sw.js — most accurate, and sidesteps the upstream `isLatest:true`-while-stale
 * bug, WhiskeySockets#2679), falling back to `fetchLatestBaileysVersion()`,
 * and only then the hardcoded constant — but nothing actually implemented
 * that chain, so it was on every consumer to hand-roll it (or, more likely,
 * skip it, which is how a bot ends up pinned to a stale `version` and starts
 * getting rejected with 405 during pairing once WA bumps its minimum — see
 * WhiskeySockets#2370 / #2485). This runs the documented chain for real.
 * Never throws: worst case it resolves to the hardcoded fallback with
 * isLatest:false, same as calling either function alone would.
 */
export const fetchBestWaVersion = async (options = {}) => {
    const webResult = await fetchLatestWaWebVersion(options);
    if (webResult.isLatest) {
        return { ...webResult, source: 'wa-web' };
    }
    const baileysResult = await fetchLatestBaileysVersion(options);
    if (baileysResult.isLatest) {
        return { ...baileysResult, source: 'baileys-fork' };
    }
    return { ...baileysResult, source: 'hardcoded-fallback' };
};
/** unique message tag prefix for MD clients */
export const generateMdTagPrefix = () => {
    const bytes = randomBytes(4);
    return `${bytes.readUInt16BE()}.${bytes.readUInt16BE(2)}-`;
};
const STATUS_MAP = {
    sender: proto.WebMessageInfo.Status.SERVER_ACK,
    played: proto.WebMessageInfo.Status.PLAYED,
    read: proto.WebMessageInfo.Status.READ,
    'read-self': proto.WebMessageInfo.Status.READ
};
/**
 * Given a type of receipt, returns what the new status of the message should be
 * @param type type from receipt
 */
export const getStatusFromReceiptType = (type) => {
    const status = STATUS_MAP[type];
    if (typeof type === 'undefined') {
        return proto.WebMessageInfo.Status.DELIVERY_ACK;
    }
    return status;
};
const CODE_MAP = {
    conflict: DisconnectReason.connectionReplaced
};
/**
 * Stream errors generally provide a reason, map that to a baileys DisconnectReason
 * @param reason the string reason given, eg. "conflict"
 */
export const getErrorCodeFromStreamError = (node) => {
    const [reasonNode] = getAllBinaryNodeChildren(node);
    let reason = reasonNode?.tag || 'unknown';
    const statusCode = +(node.attrs.code || CODE_MAP[reason] || DisconnectReason.badSession);
    if (statusCode === DisconnectReason.restartRequired) {
        reason = 'restart required';
    }
    return {
        reason,
        statusCode
    };
};
export const getCallStatusFromNode = ({ tag, attrs }) => {
    let status;
    switch (tag) {
        case 'offer':
        case 'offer_notice':
            status = 'offer';
            break;
        case 'terminate':
            if (attrs.reason === 'timeout') {
                status = 'timeout';
            }
            else {
                //fired when accepted/rejected/timeout/caller hangs up
                status = 'terminate';
            }
            break;
        case 'preaccept':
            status = 'preaccept';
            break;
        case 'transport':
            status = 'transport';
            break;
        case 'relaylatency':
            status = 'relaylatency';
            break;
        case 'reject':
            status = 'reject';
            break;
        case 'accept':
            status = 'accept';
            break;
        default:
            status = 'ringing';
            break;
    }
    return status;
};
const UNEXPECTED_SERVER_CODE_TEXT = 'Unexpected server response: ';
export const getCodeFromWSError = (error) => {
    let statusCode = 500;
    if (error?.message?.includes(UNEXPECTED_SERVER_CODE_TEXT)) {
        const code = +error?.message.slice(UNEXPECTED_SERVER_CODE_TEXT.length);
        if (!Number.isNaN(code) && code >= 400) {
            statusCode = code;
        }
    }
    else if (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?.code?.startsWith('E') ||
        error?.message?.includes('timed out')) {
        // handle ETIMEOUT, ENOTFOUND etc
        statusCode = 408;
    }
    return statusCode;
};
/**
 * Is the given platform WA business
 * @param platform AuthenticationCreds.platform
 */
export const isWABusinessPlatform = (platform) => {
    return platform === 'smbi' || platform === 'smba';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trimUndefined(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'undefined') {
            delete obj[key];
        }
    }
    return obj;
}
const CROCKFORD_CHARACTERS = '123456789ABCDEFGHJKLMNPQRSTVWXYZ';
export function bytesToCrockford(buffer) {
    let value = 0;
    let bitCount = 0;
    const crockford = [];
    for (const element of buffer) {
        value = (value << 8) | (element & 0xff);
        bitCount += 8;
        while (bitCount >= 5) {
            crockford.push(CROCKFORD_CHARACTERS.charAt((value >>> (bitCount - 5)) & 31));
            bitCount -= 5;
        }
    }
    if (bitCount > 0) {
        crockford.push(CROCKFORD_CHARACTERS.charAt((value << (5 - bitCount)) & 31));
    }
    return crockford.join('');
}
export function encodeNewsletterMessage(message) {
    return proto.Message.encode(message).finish();
}
//# sourceMappingURL=generics.js.map