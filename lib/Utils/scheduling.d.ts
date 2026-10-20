/**
 * Vanz@Add --- ported from Bail-master addons/scheduling.ts + message-scheduler.ts.
 * Bail-master shipped these as two separate, overlapping schedulers (one class-based
 * with polling, one function-based with setTimeout + repeat support). Merged here into
 * a single class-based scheduler so multiple independent instances can be bound to
 * different sendMessage functions (e.g. multi-session bots), while keeping the
 * repeat-interval/maxRepeats feature from the function-based version.
 */
export class MessageScheduler {
    constructor(sendMessage: any, options?: {});
    queue: Map<any, any>;
    timer: any;
    sendMessage: any;
    options: {
        maxQueue: any;
        checkInterval: any;
        onSent: any;
        onFailed: any;
    };
    generateId(): string;
    /**
     * Schedule a message for a specific Date. Pass `repeatIntervalMs` to
     * re-queue the job that many ms after each send (optionally capped by
     * `maxRepeats`).
     */
    schedule(jid: any, content: any, scheduledTime: any, repeatOptions: any): {
        id: string;
        jid: any;
        content: any;
        scheduledTime: any;
        createdAt: Date;
        status: string;
        repeatIntervalMs: any;
        maxRepeats: any;
        repeatCount: number;
    };
    scheduleDelay(jid: any, content: any, delayMs: any, repeatOptions: any): {
        id: string;
        jid: any;
        content: any;
        scheduledTime: any;
        createdAt: Date;
        status: string;
        repeatIntervalMs: any;
        maxRepeats: any;
        repeatCount: number;
    };
    cancel(id: any): boolean;
    cancelForJid(jid: any): number;
    getPending(): any[];
    get(id: any): any;
    clearAll(): number;
    processQueue(): Promise<void>;
    ensureTimerRunning(): void;
    stopTimer(): void;
    stop(): void;
    start(): void;
}
export function createMessageScheduler(sendMessage: any, options: any): MessageScheduler;
