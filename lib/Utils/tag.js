// Vanz@Port (2.0.3) --- from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/tag.js. See NOTICE.md.
/**
 * JAP@Add --- tag-all / hide-tag senders for groups.
 *
 * ```js
 * await tagAll(sock, groupJid, 'Meeting at 10!') // text + @everyone list
 * await hideTag(sock, groupJid, 'Announcement 📢')  // mentions everyone, shows no tags
 * // or as socket methods: sock.tagAll(jid, ...), sock.hideTag(jid, ...)
 * ```
 */
import { Boom } from '@hapi/boom';
const participantJids = (participants) => (participants || [])
    .map((p) => (typeof p === 'string' ? p : p?.id))
    .filter((j) => typeof j === 'string' && j.includes('@'));
/** Build `sendMessage`-ready content mentioning every participant. */
export const buildTagContent = (participants, text = '', { hide = false } = {}) => {
    const mentions = participantJids(participants);
    if (!mentions.length) {
        throw new Boom('tagAll: no participants to mention', { statusCode: 400 });
    }
    const body = hide
        ? String(text || '')
        : `${String(text || '')}\n${mentions.map((j) => `@${j.split('@')[0]}`).join(' ')}`.trim();
    return { text: body, mentions };
};
const assertGroupSock = (sock, jid) => {
    if (!sock || typeof sock.sendMessage !== 'function' || typeof sock.groupMetadata !== 'function') {
        throw new Boom('tagAll(sock, ...) requires an active Baileys socket with groupMetadata', { statusCode: 400 });
    }
    if (typeof jid !== 'string' || !jid.endsWith('@g.us')) {
        throw new Boom('tagAll only works in groups (@g.us)', { statusCode: 400 });
    }
};
/** Mention all group members with a visible @list. */
export const tagAll = async (sock, jid, text = '', options = {}) => {
    assertGroupSock(sock, jid);
    const meta = await sock.groupMetadata(jid);
    return sock.sendMessage(jid, buildTagContent(meta.participants, text), options);
};
/** Mention all group members without showing any @tags. */
export const hideTag = async (sock, jid, text = '', options = {}) => {
    assertGroupSock(sock, jid);
    const meta = await sock.groupMetadata(jid);
    return sock.sendMessage(jid, buildTagContent(meta.participants, text, { hide: true }), options);
};
