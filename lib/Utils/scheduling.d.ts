import type { WAMessage, AnyMessageContent } from '../Types/index.js';
export interface SchedulerOptions {
    maxQueue?: number;
    checkInterval?: number;
    onSent?: (scheduled: ScheduledMessage, message?: WAMessage) => void;
    onFailed?: (scheduled: ScheduledMessage, error: Error) => void;
}
export type ScheduledMessageStatus = 'pending' | 'sent' | 'failed' | 'cancelled';
export interface RepeatOptions {
    repeatIntervalMs?: number;
    maxRepeats?: number;
}
export interface ScheduledMessage {
    id: string;
    jid: string;
    content: AnyMessageContent;
    scheduledTime: Date;
    createdAt: Date;
    status: ScheduledMessageStatus;
    messageId?: string;
    error?: string;
    repeatIntervalMs?: number;
    maxRepeats?: number;
    repeatCount?: number;
}
export declare class MessageScheduler {
    private queue;
    private timer;
    private sendMessage;
    private options;
    constructor(sendMessage: (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>, options?: SchedulerOptions);
    schedule(jid: string, content: AnyMessageContent, scheduledTime: Date, repeatOptions?: RepeatOptions): ScheduledMessage;
    scheduleDelay(jid: string, content: AnyMessageContent, delayMs: number, repeatOptions?: RepeatOptions): ScheduledMessage;
    cancel(id: string): boolean;
    cancelForJid(jid: string): number;
    getPending(): ScheduledMessage[];
    get(id: string): ScheduledMessage | undefined;
    clearAll(): number;
    stop(): void;
    start(): void;
}
export declare const createMessageScheduler: (sendMessage: (jid: string, content: AnyMessageContent) => Promise<WAMessage | undefined>, options?: SchedulerOptions) => MessageScheduler;
