// Vanz@Port (2.0.3) --- from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/text-tools.js. See NOTICE.md.
// sendBroadcast is NOT ported (bulk-send helper; pacing/anti-spam policy belongs in the bot, not the library).
// Fix vs donor: parseMentions ignored context, so an e-mail such as "foo@123456.com" yielded a bogus mention. A mention must
// now start the string or follow whitespace/punctuation, and must not be followed by more word characters or a domain dot.
const MENTION_RE = /(?<![\w.])@(\d{5,20})(?![\w]|\.\w)/g;
const INVITE_RE = /(?:https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{16,32})/;
/** '@62812… halo @62813…' -> ['62812…@s.whatsapp.net', …] (de-duplicated, order of first appearance). */
export const parseMentions = (text) => {
    if (typeof text !== 'string' || !text) {
        return [];
    }
    const seen = new Set();
    const out = [];
    for (const m of text.matchAll(MENTION_RE)) {
        const jid = `${m[1]}@s.whatsapp.net`;
        if (!seen.has(jid)) {
            seen.add(jid);
            out.push(jid);
        }
    }
    return out;
};
/** Pull the invite code out of a chat.whatsapp.com link (or text containing one). Returns null when absent. */
export const extractGroupInviteCode = (link) => {
    if (typeof link !== 'string' || !link) {
        return null;
    }
    const m = link.match(INVITE_RE);
    return m ? m[1] : null;
};
/** Join a group from an invite link or bare code via sock.groupAcceptInvite. Throws when no code can be found. */
export const joinGroupViaLink = async (sock, linkOrCode) => {
    const code = extractGroupInviteCode(linkOrCode) ?? (/^[0-9A-Za-z]{16,32}$/.test(String(linkOrCode ?? '')) ? String(linkOrCode) : null);
    if (!code) {
        throw new Error(`joinGroupViaLink: no invite code found in ${JSON.stringify(linkOrCode)}`);
    }
    return sock.groupAcceptInvite(code);
};
