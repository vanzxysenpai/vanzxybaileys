// Vanz@Port (v2.0.3) --- ported from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/humanizer.js. See NOTICE.md.
/**
 * JAP@Add --- Humanized sender (anti-ban friendly).
 *
 * Sends like a human: shows `typing...` presence, waits proportionally to the
 * message length (words-per-minute + jitter), and serializes sends per chat so
 * bursts never fire at once. Presence failures never break the send.
 *
 * ```js
 * await sendHumanized(sock, jid, { text: 'Hello, how are you?' })
 * // or: await sock.sendHumanized(jid, { text: '...' })
 * ```
 */
import { Boom } from '@hapi/boom';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Per-chat promise chains (no dependency on makeKeyedMutex API shape).
const chains = new Map();
const enqueue = (jid, fn) => {
    const prev = chains.get(jid) || Promise.resolve();
    const next = prev.catch(() => { }).then(fn);
    chains.set(jid, next);
    next.finally(() => {
        if (chains.get(jid) === next) {
            chains.delete(jid);
        }
    });
    return next;
};
const extractText = (content) => {
    if (!content || typeof content !== 'object') {
        return '';
    }
    return content.text || content.caption || '';
};
const computeDelayMs = (text, { wpm, minDelayMs, maxDelayMs, jitter }) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const natural = words <= 0 ? minDelayMs : (words / Math.max(1, wpm)) * 60000;
    const clamped = Math.min(Math.max(natural, minDelayMs), maxDelayMs);
    const wobble = 1 + (Math.random() * 2 - 1) * Math.max(0, Math.min(1, jitter));
    return Math.round(clamped * wobble);
};
/**
 * Humanized send. `humanOpts`: wpm (default 200), minDelayMs (900),
 * maxDelayMs (12000), jitter (0.25), typing (true), queue (true).
 */
export const sendHumanized = async (sock, jid, content, { wpm = 200, minDelayMs = 900, maxDelayMs = 12000, jitter = 0.25, typing = true, queue = true } = {}, sendOptions = {}) => {
    if (!sock || typeof sock.sendMessage !== 'function') {
        throw new Boom('sendHumanized(sock, ...) requires an active Baileys socket', { statusCode: 400 });
    }
    const run = async () => {
        if (typing && typeof sock.sendPresenceUpdate === 'function') {
            try {
                if (typeof sock.presenceSubscribe === 'function') {
                    await sock.presenceSubscribe(jid).catch(() => { });
                }
                await sock.sendPresenceUpdate('composing', jid);
            }
            catch { }
        }
        await sleep(computeDelayMs(extractText(content), { wpm, minDelayMs, maxDelayMs, jitter }));
        try {
            return await sock.sendMessage(jid, content, sendOptions);
        }
        finally {
            if (typing && typeof sock.sendPresenceUpdate === 'function') {
                try {
                    await sock.sendPresenceUpdate('paused', jid);
                }
                catch { }
            }
        }
    };
    return queue ? enqueue(jid, run) : run();
};
