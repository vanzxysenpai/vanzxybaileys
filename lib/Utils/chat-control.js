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
// ─── Constants ─────────────────────────────────────────────────────────────────
/**
 * Standard disappearing-message duration constants (in seconds).
 * Pass to `sock.sendMessage(jid, { disappearingMessagesInChat: DISAPPEARING_DURATIONS.DAYS_7 })`.
 */
export const DISAPPEARING_DURATIONS = {
    /** Disable disappearing messages */
    OFF: 0,
    /** 24 hours */
    HOURS_24: 86400,
    /** 7 days */
    DAYS_7: 604800,
    /** 90 days */
    DAYS_90: 7776000
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
export class TypingIndicator {
    constructor(sendPresence) {
        this.sendPresence = sendPresence;
        this.timers = new Map();
    }
    /** Show the "typing..." (composing) indicator for a JID. */
    async startTyping(jid, options = {}) {
        this.clearTimer(jid);
        await this.sendPresence(jid, 'composing');
        if (options.autoPause !== false && options.duration) {
            const t = setTimeout(() => void this.stopTyping(jid), options.duration);
            this.timers.set(jid, t);
        }
    }
    /** Show the "recording..." (audio/video) indicator for a JID. */
    async startRecording(jid, options = {}) {
        this.clearTimer(jid);
        await this.sendPresence(jid, 'recording');
        if (options.autoPause !== false && options.duration) {
            const t = setTimeout(() => void this.stopTyping(jid), options.duration);
            this.timers.set(jid, t);
        }
    }
    /** Stop any active composing/recording indicator for a JID. */
    async stopTyping(jid) {
        this.clearTimer(jid);
        try {
            await this.sendPresence(jid, 'paused');
        }
        catch {
            // Ignore errors when stopping presence (connection may be closed)
        }
    }
    /** Stop all active indicators. */
    async stopAll() {
        const jids = Array.from(this.timers.keys());
        await Promise.all(jids.map(jid => this.stopTyping(jid)));
    }
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
    async simulateTyping(jid, durationMs, callback) {
        await this.startTyping(jid);
        await new Promise(resolve => setTimeout(resolve, durationMs));
        await this.stopTyping(jid);
        return callback();
    }
    clearTimer(jid) {
        const existing = this.timers.get(jid);
        if (existing) {
            clearTimeout(existing);
            this.timers.delete(jid);
        }
    }
}
/** Factory — create a TypingIndicator. */
export const createTypingIndicator = (sendPresence) => new TypingIndicator(sendPresence);
/**
 * Client-side tracker for pinned messages.
 * Listen to `messages.update` for `pinInChatMessage` protocol messages and call
 * `manager.pin(jid, msgId, pinnedBy)` / `manager.unpin(jid, msgId)` accordingly.
 */
export class PinnedMessagesManager {
    constructor() {
        this.store = new Map();
    }
    /**
     * Record a newly pinned message.
     * @returns The created pin entry
     */
    pin(jid, messageId, pinnedBy, expiresAt) {
        const entry = { messageId, jid, pinnedAt: new Date(), pinnedBy, expiresAt };
        const existing = this.store.get(jid) ?? [];
        // Remove any previous pin with the same message ID before re-adding
        const filtered = existing.filter(p => p.messageId !== messageId);
        filtered.push(entry);
        this.store.set(jid, filtered);
        return entry;
    }
    /**
     * Remove a pinned message.
     * @returns `true` if the pin was found and removed, `false` otherwise
     */
    unpin(jid, messageId) {
        const existing = this.store.get(jid);
        if (!existing)
            return false;
        const filtered = existing.filter(p => p.messageId !== messageId);
        if (filtered.length === existing.length)
            return false;
        this.store.set(jid, filtered);
        return true;
    }
    /** Get all pinned messages for a chat. */
    getPinned(jid) {
        return this.store.get(jid) ?? [];
    }
    /** Check if a message is pinned in a chat. */
    isPinned(jid, messageId) {
        return (this.store.get(jid) ?? []).some(p => p.messageId === messageId);
    }
    /** Remove all pins for a chat. */
    clearPins(jid) {
        this.store.delete(jid);
    }
    /**
     * Evict pins whose `expiresAt` is in the past.
     * @returns Number of expired pins removed
     */
    clearExpired() {
        let cleared = 0;
        const now = Date.now();
        for (const [jid, pins] of this.store) {
            const valid = pins.filter(p => !p.expiresAt || p.expiresAt.getTime() > now);
            cleared += pins.length - valid.length;
            this.store.set(jid, valid);
        }
        return cleared;
    }
    /** Total pin count across all chats. */
    get totalPins() {
        let total = 0;
        for (const pins of this.store.values())
            total += pins.length;
        return total;
    }
}
/** Factory — create a PinnedMessagesManager. */
export const createPinnedMessagesManager = () => new PinnedMessagesManager();
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
export const createReadReceiptController = (sendReadReceipt, config = {}) => {
    let currentConfig = {
        enabled: config.enabled ?? true,
        excludeJids: config.excludeJids ?? [],
        readDelay: config.readDelay ?? 0
    };
    return {
        setConfig(newConfig) {
            currentConfig = { ...currentConfig, ...newConfig };
        },
        getConfig() {
            return { ...currentConfig };
        },
        enable() {
            currentConfig.enabled = true;
        },
        disable() {
            currentConfig.enabled = false;
        },
        isEnabled() {
            return currentConfig.enabled;
        },
        async markRead(jid, participant, messageIds) {
            if (!currentConfig.enabled)
                return;
            if (currentConfig.excludeJids.includes(jid))
                return;
            if (currentConfig.readDelay > 0) {
                await new Promise(r => setTimeout(r, currentConfig.readDelay));
            }
            await sendReadReceipt(jid, participant, messageIds);
        },
        async forceMarkRead(jid, participant, messageIds) {
            await sendReadReceipt(jid, participant, messageIds);
        }
    };
};
//# sourceMappingURL=chat-control.js.map