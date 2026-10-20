export const SplitPaymentStatus: Readonly<{
    PENDING: 0;
    PAID: 1;
}>;
export const ReminderFrequency: Readonly<{
    REMINDER_FREQUENCY_UNKNOWN: 0;
    WEEKLY: 1;
    BI_WEEKLY: 2;
    MONTHLY: 3;
    QUARTERLY: 4;
}>;
export const ReminderStatus: Readonly<{
    REMINDER_STATUS_UNKNOWN: 0;
    ACTIVE: 1;
    CANCELLED_BY_CREATOR: 2;
    STOPPED_BY_RECEIVER: 3;
    EXPIRED: 4;
    PAID: 5;
}>;
export const MONEY_OFFSET: 1000;
export function money(amount: any, currencyCode: any, offset?: number): {
    value: number;
    offset: number;
    currencyCode: string;
};
export function readMoney(value: any): {
    amount: number;
    currencyCode: any;
};
export function buildSplitPayment(opts1?: { [key: string]: any; 
    participants?: any[];
}): any;
export function buildSplitPaymentUpdate(opts2?: { [key: string]: any; }): {
    splitId: string;
    participantJid: any;
};
export function buildPaymentReminder(opts3?: { [key: string]: any; 
    frequency?: 3;
    status?: 1;
}): any;
export function readSplitPayment(msg: any): any;
export function readPaymentReminder(msg: any): any;
