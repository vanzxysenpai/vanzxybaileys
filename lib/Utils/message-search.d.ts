import type { WAMessage } from '../Types/index.js';
export type SearchMessageType = 'text' | 'image' | 'video' | 'document' | 'audio' | 'sticker' | 'location' | 'contact' | 'other';
export interface SearchOptions {
    jid?: string;
    fromDate?: Date;
    toDate?: Date;
    fromSender?: string;
    fromMe?: boolean;
    messageTypes?: SearchMessageType[];
    limit?: number;
    caseSensitive?: boolean;
}
export interface SearchResult {
    message: WAMessage;
    matchedText: string;
    matchPosition: number;
    relevanceScore: number;
}
export interface RegexSearchOptions {
    jid?: string;
    fromSender?: string;
    fromMe?: boolean;
    messageTypes?: SearchMessageType[];
    limit?: number;
}
export declare const extractMessageText: (message: WAMessage) => string;
export declare const calculateRelevance: (query: string, text: string, position: number) => number;
export declare const searchMessages: (messages: WAMessage[], query: string, options?: SearchOptions) => SearchResult[];
export declare const searchMessagesRegex: (messages: WAMessage[], pattern: RegExp, options?: RegexSearchOptions) => SearchResult[];
export declare class MessageSearchManager {
    private messages;
    private messageIndex;
    addMessages(messages: WAMessage[]): void;
    removeMessages(messageIds: string[]): void;
    clear(): void;
    get count(): number;
    search(query: string, options?: SearchOptions): SearchResult[];
    searchRegex(pattern: RegExp, options?: RegexSearchOptions): SearchResult[];
    getByJid(jid: string): WAMessage[];
    getBySender(sender: string): WAMessage[];
    getByType(type: SearchMessageType): WAMessage[];
    getById(id: string): WAMessage | undefined;
}
export declare const createMessageSearch: () => MessageSearchManager;
