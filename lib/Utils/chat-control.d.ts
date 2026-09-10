/**
 * Chat Control Utilities
 *
 * Source: @innovatorssoft/baileys (chat-control.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Three components:
 *  - TypingIndicator  — composing / recording presence helpers
 *  - PinnedMessagesManager — client-side pin tracking
 *  - ReadReceiptController — configurable automatic read receipts
 */
/**
 * Standard disappearing-message duration constants (in seconds).
 * Pass to `sock.sendMessage(jid, { disappearingMessagesInChat: DISAPPEARING_DURATIONS.DAYS_7 })`.
 */
export declare const DISAPPEARING_DURATIONS: {
    /** Disable disappearing messages */
    readonly OFF: 0;
    /** 24 hours */
    readonly HOURS_24: 86400;
    /** 7 days */
    readonly DAYS_7: 604800;
    /** 90 days */
    readonly DAYS_90: 7776000;
};
export type DisappearingDuration = (typeof DISAPPEARING_DURATIONS)[keyof typeof DISAPPEARING_DURATIONS];
type PresenceType = 'composing' | 'recording' | 'paused' | 'available' | 'unavailable';
type SendPresence = (jid: string, presence: PresenceType) => Promise<void>;
type TypingOptions = {
    /** Auto-stop after this many ms (default: no auto-stop) */
    duration?: number;
    /** Whether to auto-pause on timeout — default `true` */
    autoPause?: boolean;
};
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
export declare class TypingIndicator {
    private readonly sendPresence;
    private readonly timers;
    constructor(sendPresence: SendPresence);
    /** Show the "typing..." (composing) indicator for a JID. */
    startTyping(jid: string, options?: TypingOptions): Promise<void>;
    /** Show the "recording..." (audio/video) indicator for a JID. */
    startRecording(jid: string, options?: TypingOptions): Promise<void>;
    /** Stop any active composing/recording indicator for a JID. */
    stopTyping(jid: string): Promise<void>;
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
    simulateTyping<T>(jid: string, durationMs: number, callback: () => Promise<T> | T): Promise<T>;
    private clearTimer;
}
/** Factory — create a TypingIndicator. */
export declare const createTypingIndicator: (sendPresence: SendPresence) => TypingIndicator;
export type PinnedMessage = {
    messageId: string;
    jid: string;
    pinnedAt: Date;
    pinnedBy?: string;
    expiresAt?: Date;
};
/**
 * Client-side tracker for pinned messages.
 * Listen to `messages.update` for `pinInChatMessage` protocol messages and call
 * `manager.pin(jid, msgId, pinnedBy)` / `manager.unpin(jid, msgId)` accordingly.
 */
export declare class PinnedMessagesManager {
    private readonly store;
    /**
     * Record a newly pinned message.
     * @returns The created pin entry
     */
    pin(jid: string, messageId: string, pinnedBy?: string, expiresAt?: Date): PinnedMessage;
    /**
     * Remove a pinned message.
     * @returns `true` if the pin was found and removed, `false` otherwise
     */
    unpin(jid: string, messageId: string): boolean;
    /** Get all pinned messages for a chat. */
    getPinned(jid: string): PinnedMessage[];
    /** Check if a message is pinned in a chat. */
    isPinned(jid: string, messageId: string): boolean;
    /** Remove all pins for a chat. */
    clearPins(jid: string): void;
    /**
     * Evict pins whose `expiresAt` is in the past.
     * @returns Number of expired pins removed
     */
    clearExpired(): number;
    /** Total pin count across all chats. */
    get totalPins(): number;
}
/** Factory — create a PinnedMessagesManager. */
export declare const createPinnedMessagesManager: () => PinnedMessagesManager;
export type ReadReceiptConfig = {
    /** Whether to send read receipts at all (default: `true`) */
    enabled?: boolean;
    /** JIDs to never send receipts for */
    excludeJids?: string[];
    /** Delay before marking as read in ms (default: `0`) */
    readDelay?: number;
};
export type ReadReceiptController = {
    setConfig(config: Partial<ReadReceiptConfig>): void;
    getConfig(): Required<ReadReceiptConfig>;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    /**
     * Mark messages as read, respecting the current config.
     * No-op if disabled or JID is excluded.
     */
    markRead(jid: string, participant: string | null | undefined, messageIds: string[]): Promise<void>;
    /** Mark messages as read regardless of config. */
    forceMarkRead(jid: string, participant: string | null | undefined, messageIds: string[]): Promise<void>;
};
type SendReadReceipt = (jid: string, participant: string | null | undefined, messageIds: string[]) => Promise<void>;
/**
 * Create a read-receipt controller with optional auto-delay and per-JID exclusions.
 *
 * @example
 * const readCtrl = createReadReceiptController(
 *     (jid, participant, ids) => sock.readMessages(ids.map(id => ({ remoteJid: jid, id, participant }))),
 *     { enabled: true, readDelay: 500, excludeJids: [spamJid] }
 * )
 *
 * sock.ev.on('messages.upsert', ({ messages }) => {
 *     for (const msg of messages) {
 *         const { key } = msg
 *         if (!key.fromMe)
 *             readCtrl.markRead(key.remoteJid!, key.participant, [key.id!])
 *     }
 * })
 */
export declare const createReadReceiptController: (sendReadReceipt: SendReadReceipt, config?: ReadReceiptConfig) => ReadReceiptController;
export {};
//# sourceMappingURL=chat-control.d.ts.map