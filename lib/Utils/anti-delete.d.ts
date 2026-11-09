/**
 * In-memory, TTL-bounded store of recently seen messages, used to recover the
 * original content of a message after WhatsApp delivers a REVOKE (delete-for-everyone)
 * protocol message, which itself carries no content — only a reference key.
 */
export class MessageStore {
    constructor(options?: {});
    store: Map<any, any>;
    deletedMessages: Map<any, any>;
    cleanupTimer: any;
    options: {
        maxMessagesPerChat: any;
        ttl: any;
        cleanupInterval: any;
    };
    startCleanup(): void;
    stopCleanup(): void;
    cleanup(): void;
    getKey(key: any): string;
    storeMessage(message: any): void;
    storeMessages(messages: any): void;
    getMessage(key: any): any;
    getOriginalMessage(key: any): any;
    markAsDeleted(key: any, deletedBy: any): {
        originalMessage: any;
        key: any;
        deletedAt: number;
        deletedBy: any;
        isRevokedBySender: boolean;
    };
    getDeletedMessage(key: any): any;
    getAllDeletedMessages(): any[];
    getDeletedMessagesByChat(chatId: any): any[];
    getChatMessages(chatId: any): any[];
    getChatIds(): any[];
    getStats(): {
        totalChats: number;
        totalMessages: number;
        totalDeleted: number;
    };
    clear(): void;
    clearChat(chatId: any): void;
    getAllMessages(): {};
}
export function isDeleteMessage(message: any): boolean;
export function getDeletedMessageKey(message: any): any;
export function createAntiDeleteHandler(store: any, onDelete: any): (updates: any) => any[];
export function createAntiDeleteUpsertHandler(store: any, onDelete: any): (opts1: { [key: string]: any; 
    messages: any;
}) => any[];
export function createMessageStoreHandler(store: any): (opts2: { [key: string]: any; 
    messages: any;
}) => void;
declare namespace _default {
    export { MessageStore };
    export { isDeleteMessage };
    export { getDeletedMessageKey };
    export { createAntiDeleteHandler };
    export { createAntiDeleteUpsertHandler };
    export { createMessageStoreHandler };
}
export default _default;
