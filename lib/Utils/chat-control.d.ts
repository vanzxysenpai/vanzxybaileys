export namespace DISAPPEARING_DURATIONS {
    let OFF: number;
    let HOURS_24: number;
    let DAYS_7: number;
    let DAYS_90: number;
}
/**
 * Manages composing ("typing...") and recording ("recording...") presence
 * indicators with per-JID timer tracking.
 *
 * @example
 * const typing = createTypingIndicator(
 *     (jid, presence) => sock.sendPresenceUpdate(presence, jid)
 * )
 *
 * // Simulate typing then send a message
 * const result = await typing.simulateTyping(jid, 1500, () =>
 *     sock.sendMessage(jid, { text: 'Hello!' })
 * )
 */
export class TypingIndicator {
    constructor(sendPresence: any);
    sendPresence: any;
    timers: Map<any, any>;
    /** Show the "typing..." (composing) indicator for a JID. */
    startTyping(jid: any, options?: {}): Promise<void>;
    /** Show the "recording..." (audio/video) indicator for a JID. */
    startRecording(jid: any, options?: {}): Promise<void>;
    /** Stop any active composing/recording indicator for a JID. */
    stopTyping(jid: any): Promise<void>;
    /** Stop all active indicators. */
    stopAll(): Promise<void>;
    /**
     * Show typing for `durationMs`, run `callback`, then stop the indicator.
     *
     * @template T
     * @returns The return value of `callback`
     *
     * @example
     * await typing.simulateTyping(jid, 2000, async () => {
     *     await sock.sendMessage(jid, { text: 'Here is your answer' })
     * })
     */
    simulateTyping<T>(jid: any, durationMs: any, callback: any): Promise<any>;
    clearTimer(jid: any): void;
}
export function createTypingIndicator(sendPresence: any): TypingIndicator;
/**
 * Client-side tracker for pinned messages.
 * Listen to `messages.update` for `pinInChatMessage` protocol messages and call
 * `manager.pin(jid, msgId, pinnedBy)` / `manager.unpin(jid, msgId)` accordingly.
 */
export class PinnedMessagesManager {
    store: Map<any, any>;
    /**
     * Record a newly pinned message.
     * @returns The created pin entry
     */
    pin(jid: any, messageId: any, pinnedBy: any, expiresAt: any): {
        messageId: any;
        jid: any;
        pinnedAt: Date;
        pinnedBy: any;
        expiresAt: any;
    };
    /**
     * Remove a pinned message.
     * @returns `true` if the pin was found and removed, `false` otherwise
     */
    unpin(jid: any, messageId: any): boolean;
    /** Get all pinned messages for a chat. */
    getPinned(jid: any): any;
    /** Check if a message is pinned in a chat. */
    isPinned(jid: any, messageId: any): any;
    /** Remove all pins for a chat. */
    clearPins(jid: any): void;
    /**
     * Evict pins whose `expiresAt` is in the past.
     * @returns Number of expired pins removed
     */
    clearExpired(): number;
    /** Total pin count across all chats. */
    get totalPins(): number;
}
export function createPinnedMessagesManager(): PinnedMessagesManager;
export function createReadReceiptController(sendReadReceipt: any, config?: {}): {
    setConfig(newConfig: any): void;
    getConfig(): {
        enabled: any;
        excludeJids: any;
        readDelay: any;
    };
    enable(): void;
    disable(): void;
    isEnabled(): any;
    markRead(jid: any, participant: any, messageIds: any): Promise<void>;
    forceMarkRead(jid: any, participant: any, messageIds: any): Promise<void>;
};
