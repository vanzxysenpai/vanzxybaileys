// Vanz@Port (v2.0.3) --- ported from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/meta-ai.js. See NOTICE.md.
/**
 * JAP@Add --- Meta AI chat helper (EXPERIMENTAL).
 *
 * Sends a prompt to Meta AI's official JID (`13135550002@c.us`, override via
 * `opts.jid` — e.g. the newer `11111111111@bot`) and waits for its reply.
 * This relies on Meta AI being available for the linked account/region —
 * expect timeouts where Meta AI is not rolled out.
 *
 * ```js
 * const { text } = await askMetaAI(sock, 'Jelaskan black hole!')
 * // or: await sock.askMetaAI('...')
 * ```
 */
import { Boom } from '@hapi/boom';
import { META_AI_JID } from '../WABinary/index.js';
import { normalizeMessageContent } from './messages.js';
const extractReplyText = (webMessage) => {
    if (!webMessage?.message) {
        return '';
    }
    const content = normalizeMessageContent(webMessage.message);
    return content?.conversation
        || content?.extendedTextMessage?.text
        || content?.imageMessage?.caption
        || content?.videoMessage?.caption
        || '';
};
/**
 * Ask Meta AI something. Resolves `{ sent, reply, text }`.
 * Rejects with 408 on timeout (default 60s).
 */
export const askMetaAI = async (sock, prompt, { timeoutMs = 60000, jid = META_AI_JID } = {}) => {
    if (!sock || typeof sock.sendMessage !== 'function' || typeof sock.ev?.on !== 'function') {
        throw new Boom('askMetaAI(sock, ...) requires an active Baileys socket', { statusCode: 400 });
    }
    if (!prompt || typeof prompt !== 'string') {
        throw new Boom('askMetaAI(prompt) requires a non-empty string', { statusCode: 400 });
    }
    const sent = await sock.sendMessage(jid, { text: prompt });
    const sentId = sent?.key?.id;
    const startedAt = Date.now();
    return new Promise((resolve, reject) => {
        const done = (fn) => (...args) => {
            clearTimeout(timer);
            try {
                sock.ev.off('messages.upsert', onUpsert);
            }
            catch { }
            fn(...args);
        };
        const timer = setTimeout(done(() => reject(new Boom('askMetaAI: timed out waiting for Meta AI reply', { statusCode: 408 }))), timeoutMs);
        const succeed = done(resolve);
        const onUpsert = ({ messages } = {}) => {
            for (const m of messages || []) {
                if (!m || m.key?.fromMe || m.key?.remoteJid !== jid || !m.message) {
                    continue;
                }
                // Ignore stale history replayed on (re)connect.
                const msgMs = Number(m.messageTimestamp || 0) * 1000;
                if (msgMs && msgMs < startedAt - 5000) {
                    continue;
                }
                // Prefer a reply that quotes our prompt; otherwise take the first fresh message.
                const quotedId = m.message?.extendedTextMessage?.contextInfo?.stanzaId;
                if (quotedId && sentId && quotedId !== sentId) {
                    continue;
                }
                succeed({ sent, reply: m, text: extractReplyText(m) });
                return;
            }
        };
        sock.ev.on('messages.upsert', onUpsert);
    });
};
