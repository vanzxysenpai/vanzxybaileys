// Vanz@Add --- ported from Bail-master addons/anti-delete.ts (adapted to lib/ CJS-free ESM
// runtime style used throughout this fork; type-only annotations dropped, behavior unchanged).
import { proto } from '../../WAProto/index.js';
// ── MessageStore ───────────────────────────────────────────────────────────
/**
 * In-memory, TTL-bounded store of recently seen messages, used to recover the
 * original content of a message after WhatsApp delivers a REVOKE (delete-for-everyone)
 * protocol message, which itself carries no content — only a reference key.
 */
export class MessageStore {
    store = new Map();
    deletedMessages = new Map();
    cleanupTimer = null;
    options;
    constructor(options = {}) {
        this.options = {
            maxMessagesPerChat: options.maxMessagesPerChat ?? 1000,
            ttl: options.ttl ?? 24 * 60 * 60 * 1000,
            cleanupInterval: options.cleanupInterval ?? 60 * 60 * 1000
        };
        this.startCleanup();
    }
    startCleanup() {
        this.cleanupTimer = setInterval(() => this.cleanup(), this.options.cleanupInterval);
        this.cleanupTimer?.unref?.();
    }
    stopCleanup() {
        if (this.cleanupTimer)
            clearInterval(this.cleanupTimer);
    }
    cleanup() {
        const cutoff = Date.now() - this.options.ttl;
        for (const [chatId, messages] of this.store) {
            for (const [msgId, stored] of messages) {
                if (stored.storedAt < cutoff)
                    messages.delete(msgId);
            }
            if (messages.size === 0)
                this.store.delete(chatId);
        }
        for (const [key, info] of this.deletedMessages) {
            if (info.deletedAt < cutoff)
                this.deletedMessages.delete(key);
        }
    }
    getKey(key) {
        return `${key.remoteJid}:${key.id}`;
    }
    storeMessage(message) {
        const chatId = message.key.remoteJid;
        if (!chatId || !message.key.id)
            return;
        let chatMessages = this.store.get(chatId);
        if (!chatMessages) {
            chatMessages = new Map();
            this.store.set(chatId, chatMessages);
        }
        if (chatMessages.size >= this.options.maxMessagesPerChat) {
            const oldestKey = chatMessages.keys().next().value;
            if (oldestKey)
                chatMessages.delete(oldestKey);
        }
        chatMessages.set(message.key.id, { message, storedAt: Date.now(), isDeleted: false });
    }
    storeMessages(messages) {
        for (const msg of messages)
            this.storeMessage(msg);
    }
    getMessage(key) {
        return this.store.get(key.remoteJid)?.get(key.id);
    }
    getOriginalMessage(key) {
        return this.getMessage(key)?.message;
    }
    markAsDeleted(key, deletedBy) {
        const stored = this.getMessage(key);
        if (!stored)
            return null;
        const now = Date.now();
        stored.isDeleted = true;
        stored.deletedAt = now;
        stored.deletedBy = deletedBy;
        // Vanz@Fix (bug 66): the old check (`deletedBy === stored.message.key.participant`)
        // only works in groups, where `participant` identifies who sent/revoked a message.
        // In a private chat `key.participant` is always undefined (it's a group-only field),
        // while `deletedBy` there falls back to `remoteJid` — so the comparison could never
        // match and isRevokedBySender was always false for every DM, even though
        // delete-for-everyone in a DM can only be done by the original sender. Treat a
        // missing `participant` (i.e. not a group message) as "revoked by sender" by definition.
        const isGroupMessage = !!stored.message.key.participant;
        const info = {
            originalMessage: stored.message,
            key,
            deletedAt: now,
            deletedBy,
            isRevokedBySender: !deletedBy || !isGroupMessage || deletedBy === stored.message.key.participant
        };
        this.deletedMessages.set(this.getKey(key), info);
        return info;
    }
    getDeletedMessage(key) {
        return this.deletedMessages.get(this.getKey(key));
    }
    getAllDeletedMessages() {
        return Array.from(this.deletedMessages.values());
    }
    getDeletedMessagesByChat(chatId) {
        return Array.from(this.deletedMessages.values()).filter((i) => i.key.remoteJid === chatId);
    }
    getChatMessages(chatId) {
        return Array.from(this.store.get(chatId)?.values() ?? []).map((s) => s.message);
    }
    getChatIds() {
        return Array.from(this.store.keys());
    }
    getStats() {
        let totalMessages = 0;
        for (const messages of this.store.values())
            totalMessages += messages.size;
        return { totalChats: this.store.size, totalMessages, totalDeleted: this.deletedMessages.size };
    }
    clear() {
        this.store.clear();
        this.deletedMessages.clear();
    }
    clearChat(chatId) {
        this.store.delete(chatId);
    }
    getAllMessages() {
        const all = {};
        for (const [chatId, messages] of this.store) {
            all[chatId] = Array.from(messages.values()).map((s) => s.message);
        }
        return all;
    }
}
// ── Helpers ────────────────────────────────────────────────────────────────
export const isDeleteMessage = (message) => {
    return message.message?.protocolMessage?.type === proto.Message.ProtocolMessage.Type.REVOKE;
};
export const getDeletedMessageKey = (message) => {
    const protoMsg = message.message?.protocolMessage;
    if (protoMsg?.type !== proto.Message.ProtocolMessage.Type.REVOKE)
        return null;
    return protoMsg.key ?? null;
};
/**
 * Wire this into `sock.ev.on('messages.update', ...)`. Fires `onDelete` for
 * every update in the batch whose stub type is REVOKE, using `store` to look
 * up the original content that WhatsApp's own update payload omits.
 */
export const createAntiDeleteHandler = (store, onDelete) => {
    return (updates) => {
        const deletedMessages = [];
        for (const { key, update } of updates) {
            if (update.messageStubType === proto.WebMessageInfo.StubType.REVOKE) {
                const info = store.markAsDeleted(key, update.messageStubParameters?.[0]);
                if (info) {
                    deletedMessages.push(info);
                    onDelete?.(info);
                }
            }
        }
        return deletedMessages;
    };
};
/**
 * Vanz@Fix (bug 58): `createAntiDeleteHandler` above only listens on
 * `messages.update` with `messageStubType === REVOKE`. In practice, most
 * delete-for-everyone events actually arrive as a *new* message on
 * `messages.upsert` carrying a `protocolMessage` of type REVOKE (the
 * `isDeleteMessage`/`getDeletedMessageKey` helpers above existed for this but
 * were never wired to anything). Wire this into `sock.ev.on('messages.upsert', ...)`
 * alongside `createMessageStoreHandler` to actually catch those.
 */
export const createAntiDeleteUpsertHandler = (store, onDelete) => {
    return ({ messages }) => {
        const deletedMessages = [];
        for (const message of messages) {
            if (!isDeleteMessage(message))
                continue;
            const key = getDeletedMessageKey(message);
            if (!key)
                continue;
            const deletedBy = message.key.participant || message.key.remoteJid;
            const info = store.markAsDeleted(key, deletedBy);
            if (info) {
                deletedMessages.push(info);
                onDelete?.(info);
            }
        }
        return deletedMessages;
    };
};
/**
 * Wire this into `sock.ev.on('messages.upsert', ...)` to keep `store` populated.
 * Skips protocol/sender-key-distribution messages, which carry no user content.
 */
export const createMessageStoreHandler = (store) => {
    return ({ messages }) => {
        const regular = messages.filter((msg) => {
            const c = msg.message;
            if (!c)
                return false;
            if (c.protocolMessage)
                return false;
            if (c.senderKeyDistributionMessage)
                return false;
            return true;
        });
        store.storeMessages(regular);
    };
};
export default {
    MessageStore,
    isDeleteMessage,
    getDeletedMessageKey,
    createAntiDeleteHandler,
    createAntiDeleteUpsertHandler,
    createMessageStoreHandler
};
//# sourceMappingURL=anti-delete.js.map
