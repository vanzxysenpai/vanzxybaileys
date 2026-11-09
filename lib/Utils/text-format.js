// Vanz@Port (2.0.3) --- from xbibzlibrary/whatsbibz 1.4.0 (BibzWhats/send.js: splitText, whatsappify). See NOTICE.md.
// Changed vs donor: whatsappify leaves fenced/inline code untouched (the donor rewrote `**x**` inside code blocks), splitText never cuts
// an emoji/surrogate pair in half, and sendLongText does NOT retry a failed send (a retry after a partial relay can post duplicates).
/** Default part size. WhatsApp accepts far more, but long single bubbles render and quote badly; 4000 is a safe chunk. */
export const DEFAULT_TEXT_PART_LENGTH = 4000;
/** Split long text into parts <= maxLen, preferring a newline, then a space, then a hard cut (never inside a surrogate pair). */
export const splitText = (text, maxLen = DEFAULT_TEXT_PART_LENGTH) => {
    const limit = Number.isFinite(maxLen) && maxLen >= 2 ? Math.floor(maxLen) : DEFAULT_TEXT_PART_LENGTH;
    const out = [];
    let rest = String(text ?? '');
    while (rest.length > limit) {
        let cut = rest.lastIndexOf('\n', limit);
        if (cut < limit * 0.5) {
            cut = rest.lastIndexOf(' ', limit);
        }
        if (cut < limit * 0.5) {
            cut = limit;
            const prev = rest.charCodeAt(cut - 1);
            if (prev >= 0xd800 && prev <= 0xdbff) {
                cut -= 1; // do not split a surrogate pair
            }
        }
        out.push(rest.slice(0, cut).trim());
        rest = rest.slice(cut).trim();
    }
    if (rest) {
        out.push(rest);
    }
    return out.filter(Boolean);
};
/**
 * Normalise ChatGPT-style markdown to WhatsApp formatting: **bold** / __bold__ -> *bold*, ~~strike~~ -> ~strike~,
 * "# heading" -> "heading", [text](url) -> "text (url)". Fenced (```...```) and inline (`...`) code is left exactly as written.
 */
export const whatsappify = (text) => {
    if (typeof text !== 'string' || !text) {
        return text;
    }
    const stash = [];
    const hold = (m) => `\u0000${stash.push(m) - 1}\u0000`;
    let t = text.replace(/```[\s\S]*?```/g, hold).replace(/`[^`\n]+`/g, hold);
    for (let i = 0; i < 3; i++) {
        t = t.replace(/\*\*\*([^*\n]+)\*\*\*/g, '*$1*');
        t = t.replace(/\*\*([^*\n]+)\*\*/g, '*$1*');
        t = t.replace(/__([^_\n]+)__/g, '*$1*');
    }
    t = t.replace(/_{2,}([^_\n]+)_{2,}/g, '_$1_');
    t = t.replace(/~~([^~\n]+)~~/g, '~$1~');
    t = t.replace(/^\s{0,3}#{1,6}\s+/gm, '');
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1 ($2)');
    t = t.replace(/\*{3,}/g, '*').replace(/_{3,}/g, '_');
    t = t.replace(/\u0000(\d+)\u0000/g, (_, i) => stash[Number(i)]);
    return t.trim();
};
/**
 * Send long text as several messages. Stops at the first failure (no automatic retry).
 * @returns {Promise<{ ok: boolean, ids: string[], error?: unknown }>}
 */
export const sendLongText = async (sock, jid, text, { quoted, format = true, maxLen = DEFAULT_TEXT_PART_LENGTH, delayMs = 250 } = {}) => {
    if (!sock || typeof sock.sendMessage !== 'function') {
        throw new TypeError('sendLongText(sock, ...) requires a socket with sendMessage');
    }
    const body = format ? whatsappify(String(text ?? '')) : String(text ?? '');
    const parts = splitText(body, maxLen);
    const ids = [];
    for (let i = 0; i < parts.length; i++) {
        try {
            const result = await sock.sendMessage(jid, { text: parts[i] }, quoted ? { quoted } : undefined);
            if (result?.key?.id) {
                ids.push(result.key.id);
            }
        }
        catch (error) {
            return { ok: false, ids, error };
        }
        if (delayMs > 0 && i < parts.length - 1) {
            await new Promise((r) => setTimeout(r, delayMs));
        }
    }
    return { ok: true, ids };
};
