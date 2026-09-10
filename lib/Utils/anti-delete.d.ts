import type { WAMessage, WAMessageKey } from '../Types/index.js';
export interface MessageStoreOptions {
    maxMessagesPerChat?: number;
    ttl?: number;
    cleanupInterval?: number;
}
export interface StoredMessage {
    message: WAMessage;
    storedAt: number;
    isDeleted: boolean;
    deletedAt?: number;
    deletedBy?: string;
}
export interface DeletedMessageInfo {
    originalMessage: WAMessage;
    key: WAMessageKey;
    deletedAt: number;
    deletedBy?: string;
    isRevokedBySender: boolean;
}
export declare class MessageStore {
    private store;
    private deletedMessages;
    private cleanupTimer;
    private options;
    constructor(options?: MessageStoreOptions);
    stopCleanup(): void;
    storeMessage(message: WAMessage): void;
    storeMessages(messages: WAMessage[]): void;
    getMessage(key: WAMessageKey): StoredMessage | undefined;
    getOriginalMessage(key: WAMessageKey): WAMessage | undefined;
    markAsDeleted(key: WAMessageKey, deletedBy?: string): DeletedMessageInfo | null;
    getDeletedMessage(key: WAMessageKey): DeletedMessageInfo | undefined;
    getAllDeletedMessages(): DeletedMessageInfo[];
    getDeletedMessagesByChat(chatId: string): DeletedMessageInfo[];
    getChatMessages(chatId: string): WAMessage[];
    getChatIds(): string[];
    getStats(): {
        totalChats: number;
        totalMessages: number;
        totalDeleted: number;
    };
    clear(): void;
    clearChat(chatId: string): void;
    getAllMessages(): Record<string, WAMessage[]>;
}
export declare const isDeleteMessage: (message: WAMessage) => boolean;
export declare const getDeletedMessageKey: (message: WAMessage) => WAMessageKey | null;
export declare const createAntiDeleteHandler: (store: MessageStore, onDelete?: (info: DeletedMessageInfo) => void) => (updates: Array<{
    key: WAMessageKey;
    update: Partial<WAMessage>;
}>) => DeletedMessageInfo[];
export declare const createAntiDeleteUpsertHandler: (store: MessageStore, onDelete?: (info: DeletedMessageInfo) => void) => ({ messages }: {
    messages: WAMessage[];
}) => DeletedMessageInfo[];
export declare const createMessageStoreHandler: (store: MessageStore) => ({ messages }: {
    messages: WAMessage[];
}) => void;
declare const _default: {
    MessageStore: typeof MessageStore;
    isDeleteMessage: (message: WAMessage) => boolean;
    getDeletedMessageKey: (message: WAMessage) => WAMessageKey | null;
    createAntiDeleteHandler: (store: MessageStore, onDelete?: (info: DeletedMessageInfo) => void) => (updates: Array<{
        key: WAMessageKey;
        update: Partial<WAMessage>;
    }>) => DeletedMessageInfo[];
    createAntiDeleteUpsertHandler: (store: MessageStore, onDelete?: (info: DeletedMessageInfo) => void) => ({ messages }: {
        messages: WAMessage[];
    }) => DeletedMessageInfo[];
    createMessageStoreHandler: (store: MessageStore) => ({ messages }: {
        messages: WAMessage[];
    }) => void;
};
export default _default;
