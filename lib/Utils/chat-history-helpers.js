/**
 * Vanz@Add --- ported from Bail-master addons/chat-history-helpers.ts.
 *
 * NOTE: Bail-master's original version was written against ITS OWN
 * `in-memory-store.ts` addon (a plain `Map<jid, WAMessage[]>`), which this fork
 * does not have. `@vanzxy/baileys` already ships a full `makeInMemoryStore`
 * (see lib/Store/make-in-memory-store.js), whose `store.messages[jid]` is a
 * KeyedDB-backed ordered dictionary exposing `.array` — NOT a plain array or
 * Map. getLastMessageInChat / getOldestMessageInChat below are rewritten
 * against that shape so they work with this fork's real store out of the box.
 * copyNForward and uploadMediaToWhatsApp are store-independent and ported as-is.
 */
import { generateForwardMessageContent, prepareWAMessageMedia } from './messages.js';
/**
 * Get the most recently stored message in a chat.
 * `store` is the object returned by `makeInMemoryStore()`, kept in sync via
 * `store.bind(sock.ev)`.
 */
export const getLastMessageInChat = (store, jid) => {
    const list = store.messages?.[jid];
    const arr = list?.array;
    if (!arr || arr.length === 0)
        return undefined;
    return arr[arr.length - 1];
};
/**
 * Get the oldest stored message in a chat (useful as the `oldestMsgKey`
 * cursor for `sock.fetchMessageHistory(...)`, which pages backwards from it).
 */
export const getOldestMessageInChat = (store, jid) => {
    const list = store.messages?.[jid];
    const arr = list?.array;
    if (!arr || arr.length === 0)
        return undefined;
    return arr[0];
};
/**
 * Re-send ("copy-forward") an existing message to a (possibly different) jid.
 * Thin wrapper around generateForwardMessageContent + sock.sendMessage —
 * strips the original sender's quoting/context the same way WhatsApp's own
 * "Forward" action does, and marks the copy as forwarded.
 *
 * Usage: await copyNForward(sock, targetJid, originalMessage)
 */
export const copyNForward = async (sock, jid, message, forceForward = false) => {
    const content = generateForwardMessageContent(message, forceForward);
    return sock.sendMessage(jid, content);
};
/**
 * Upload media directly to WhatsApp's own encrypted media CDN and get back
 * a ready-to-send message-content object (with mediaKey, url/directPath,
 * fileEncSha256, etc).
 *
 * IMPORTANT: WhatsApp clients only accept media that lives on WhatsApp's own
 * CDN, encrypted with a mediaKey the recipient can derive — there is no way
 * to point a WAMessage at an arbitrary third-party URL and have it render.
 * This wrapper does the real, official upload (same path prepareWAMessageMedia
 * / sock.waUploadToServer use internally) — it does not accept or return an
 * arbitrary external URL.
 *
 * Usage: const media = await uploadMediaToWhatsApp(sock, { image: buffer })
 *        await sock.sendMessage(jid, media)
 */
export const uploadMediaToWhatsApp = async (sock, message, opts) => {
    return prepareWAMessageMedia(message, {
        upload: sock.waUploadToServer,
        logger: opts?.logger,
        mediaTypeOverride: opts?.mediaTypeOverride
    });
};
//# sourceMappingURL=chat-history-helpers.js.map
