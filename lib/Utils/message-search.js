// Vanz@Add --- ported from Bail-master addons/message-search.ts (type-only
// annotations dropped; behavior unchanged).
// Vanz@Fix (bug 58): peel off ephemeral / view-once wrappers so search still
// indexes text from disappearing-message chats instead of always seeing '{}'.
const unwrapMessage = (content) => {
    let c = content;
    while (c && (c.ephemeralMessage || c.viewOnceMessage || c.viewOnceMessageV2 || c.viewOnceMessageV2Extension || c.documentWithCaptionMessage)) {
        c = c.ephemeralMessage?.message ||
            c.viewOnceMessage?.message ||
            c.viewOnceMessageV2?.message ||
            c.viewOnceMessageV2Extension?.message ||
            c.documentWithCaptionMessage?.message;
    }
    return c;
};
export const extractMessageText = (message) => {
    const c = unwrapMessage(message.message);
    if (!c)
        return '';
    if (c.conversation)
        return c.conversation;
    if (c.extendedTextMessage?.text)
        return c.extendedTextMessage.text;
    if (c.imageMessage?.caption)
        return c.imageMessage.caption;
    if (c.videoMessage?.caption)
        return c.videoMessage.caption;
    if (c.documentMessage?.caption)
        return c.documentMessage.caption;
    if (c.documentMessage?.fileName)
        return c.documentMessage.fileName;
    if (c.locationMessage?.name)
        return c.locationMessage.name;
    if (c.locationMessage?.address)
        return c.locationMessage.address;
    if (c.contactMessage?.displayName)
        return c.contactMessage.displayName;
    if (c.pollCreationMessage?.name)
        return c.pollCreationMessage.name;
    return '';
};
const getMessageType = (message) => {
    const c = unwrapMessage(message.message);
    if (!c)
        return 'other';
    if (c.conversation || c.extendedTextMessage)
        return 'text';
    if (c.imageMessage)
        return 'image';
    if (c.videoMessage)
        return 'video';
    if (c.documentMessage)
        return 'document';
    if (c.audioMessage)
        return 'audio';
    if (c.stickerMessage)
        return 'sticker';
    if (c.locationMessage || c.liveLocationMessage)
        return 'location';
    if (c.contactMessage || c.contactsArrayMessage)
        return 'contact';
    return 'other';
};
export const calculateRelevance = (query, text, position) => {
    let score = 100;
    if (text.toLowerCase() === query.toLowerCase())
        score += 50;
    score -= Math.min(position / 10, 20);
    const lt = text.toLowerCase(), lq = query.toLowerCase();
    if (position === 0 ||
        lt[position - 1] === ' ' ||
        lt[position + lq.length] === ' ' ||
        position + lq.length === text.length)
        score += 20;
    return Math.max(score, 0);
};
/** Plain-text substring search with relevance-sorted results. */
export const searchMessages = (messages, query, options = {}) => {
    const results = [];
    const sq = options.caseSensitive ? query : query.toLowerCase();
    for (const message of messages) {
        if (options.jid && message.key.remoteJid !== options.jid)
            continue;
        const ts = message.messageTimestamp;
        const mt = ts ? new Date((typeof ts === 'number' ? ts : Number(ts)) * 1000) : null;
        if (options.fromDate && mt && mt < options.fromDate)
            continue;
        if (options.toDate && mt && mt > options.toDate)
            continue;
        if (options.fromSender && message.key.participant !== options.fromSender)
            continue;
        if (options.fromMe !== undefined && message.key.fromMe !== options.fromMe)
            continue;
        if (options.messageTypes?.length) {
            if (!options.messageTypes.includes(getMessageType(message)))
                continue;
        }
        const text = extractMessageText(message);
        if (!text)
            continue;
        const st = options.caseSensitive ? text : text.toLowerCase();
        const pos = st.indexOf(sq);
        if (pos !== -1) {
            results.push({
                message,
                matchedText: text.substring(Math.max(0, pos - 20), Math.min(text.length, pos + query.length + 20)),
                matchPosition: pos,
                relevanceScore: calculateRelevance(query, text, pos)
            });
        }
        // Vanz@Fix (bug 59): limit used to break the scan loop *before* sorting,
        // so it kept the first N matches in document order and could drop
        // higher-relevance matches found later. Sort first, then slice.
    }
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return options.limit ? results.slice(0, options.limit) : results;
};
/** Regex-based search (e.g. for commands/patterns), unordered by relevance. */
export const searchMessagesRegex = (messages, pattern, options = {}) => {
    const results = [];
    for (const message of messages) {
        if (options.jid && message.key.remoteJid !== options.jid)
            continue;
        if (options.fromSender && message.key.participant !== options.fromSender)
            continue;
        if (options.fromMe !== undefined && message.key.fromMe !== options.fromMe)
            continue;
        if (options.messageTypes?.length) {
            if (!options.messageTypes.includes(getMessageType(message)))
                continue;
        }
        const text = extractMessageText(message);
        if (!text)
            continue;
        const match = text.match(pattern);
        if (match)
            results.push({ message, matchedText: match[0], matchPosition: match.index ?? 0, relevanceScore: 100 });
        if (options.limit && results.length >= options.limit)
            break;
    }
    return results;
};
/** Standalone searchable index — feed it messages independently of the main Store. */
export class MessageSearchManager {
    messages = [];
    messageIndex = new Map();
    addMessages(messages) {
        for (const msg of messages) {
            const id = msg.key.id;
            if (id && !this.messageIndex.has(id)) {
                this.messages.push(msg);
                this.messageIndex.set(id, msg);
            }
        }
    }
    removeMessages(messageIds) {
        const idSet = new Set(messageIds);
        this.messages = this.messages.filter((m) => !idSet.has(m.key.id || ''));
        for (const id of messageIds)
            this.messageIndex.delete(id);
    }
    clear() {
        this.messages = [];
        this.messageIndex.clear();
    }
    get count() {
        return this.messages.length;
    }
    search(query, options) {
        return searchMessages(this.messages, query, options);
    }
    searchRegex(pattern, options) {
        return searchMessagesRegex(this.messages, pattern, options);
    }
    getByJid(jid) {
        return this.messages.filter((m) => m.key.remoteJid === jid);
    }
    getBySender(sender) {
        return this.messages.filter((m) => m.key.participant === sender || m.key.remoteJid === sender);
    }
    getByType(type) {
        return this.messages.filter((m) => getMessageType(m) === type);
    }
    getById(id) {
        return this.messageIndex.get(id);
    }
}
export const createMessageSearch = () => new MessageSearchManager();
//# sourceMappingURL=message-search.js.map
