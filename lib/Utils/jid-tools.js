// Vanz@Port (2.0.3) --- from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/jid-tools.js. See NOTICE.md.
/**
 * JAP@Add --- JID helpers: LID ↔ phone-number resolution.
 *
 * Since WhatsApp's LID migration, events (call offers, group updates, ...) often
 * carry only an opaque `@lid` JID. These helpers resolve it to a phone number
 * through the socket's signal-repository mapping (cached + USYNC-backed).
 *
 * ```js
 * await getPhoneNumber(sock, '123456@lid') // → '62812xxxx' | null
 * await getLidForPhone(sock, '62812xxxx')  // → '123456@lid' | null
 * // or: sock.getPhoneNumber(jid), sock.getLidForPhone(phone)
 * ```
 */
import { Boom } from '@hapi/boom';
import { jidDecode } from '../WABinary/index.js';
/** Resolve any JID to a phone-number string. Returns `null` when unresolvable (never throws for that). */
export const getPhoneNumber = async (sock, jid) => {
    if (typeof jid !== 'string' || !jid.includes('@')) {
        throw new Boom('getPhoneNumber(jid) requires a JID string', { statusCode: 400 });
    }
    let decoded;
    try {
        decoded = jidDecode(jid);
    }
    catch {
        throw new Boom(`getPhoneNumber: invalid JID ${jid}`, { statusCode: 400 });
    }
    const { user, server } = decoded;
    if (server === 's.whatsapp.net') {
        return user;
    }
    if (server === 'lid') {
        const store = sock?.signalRepository?.lidMapping;
        if (!store || typeof store.getPNForLID !== 'function') {
            throw new Boom('getPhoneNumber: LID resolution needs an active socket', { statusCode: 400 });
        }
        try {
            const pn = await store.getPNForLID(`${user}@lid`);
            return typeof pn === 'string' && pn.includes('@') ? pn.split('@')[0] : null;
        }
        catch {
            return null; // best-effort: offline/USYNC failure → unknown, not fatal
        }
    }
    return null; // groups, channels, status, bots have no phone number
};
/**
 * Resolve an incoming message's sender to a phone number.
 * One-liner fix for LID-only events (e.g. call offers without `caller_pn`):
 * `await sock.resolveSenderPn(msg)` → `'62812…'` | `null`.
 */
export const resolveSenderPn = async (sock, webMessage) => {
    const sender = webMessage?.key?.participant || webMessage?.key?.remoteJid;
    if (!sender || typeof sender !== 'string') {
        throw new Boom('resolveSenderPn(msg) needs a message with key.participant/remoteJid', { statusCode: 400 });
    }
    return getPhoneNumber(sock, sender);
};
/** Reverse lookup: phone number (or PN JID) → `@lid` JID. Returns `null` when unknown. */
export const getLidForPhone = async (sock, phone) => {
    const store = sock?.signalRepository?.lidMapping;
    if (!store || typeof store.getLIDForPN !== 'function') {
        throw new Boom('getLidForPhone(sock, ...) requires an active socket', { statusCode: 400 });
    }
    const pn = typeof phone === 'string' && phone.includes('@')
        ? phone
        : `${String(phone || '').replace(/\D/g, '')}@s.whatsapp.net`;
    if (!pn.split('@')[0]) {
        throw new Boom('getLidForPhone(phone) requires a phone number', { statusCode: 400 });
    }
    try {
        return (await store.getLIDForPN(pn)) || null;
    }
    catch {
        return null;
    }
};
