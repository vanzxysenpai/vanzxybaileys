export function extractMessageText(message: any): any;
export function calculateRelevance(query: any, text: any, position: any): number;
export function searchMessages(messages: any, query: any, options?: {}): {
    message: any;
    matchedText: any;
    matchPosition: any;
    relevanceScore: number;
}[];
export function searchMessagesRegex(messages: any, pattern: any, options?: {}): {
    message: any;
    matchedText: any;
    matchPosition: any;
    relevanceScore: number;
}[];
/** Standalone searchable index — feed it messages independently of the main Store. */
export class MessageSearchManager {
    messages: any[];
    messageIndex: Map<any, any>;
    addMessages(messages: any): void;
    removeMessages(messageIds: any): void;
    clear(): void;
    get count(): number;
    search(query: any, options: any): {
        message: any;
        matchedText: any;
        matchPosition: any;
        relevanceScore: number;
    }[];
    searchRegex(pattern: any, options: any): {
        message: any;
        matchedText: any;
        matchPosition: any;
        relevanceScore: number;
    }[];
    getByJid(jid: any): any[];
    getBySender(sender: any): any[];
    getByType(type: any): any[];
    getById(id: any): any;
}
export function createMessageSearch(): MessageSearchManager;
