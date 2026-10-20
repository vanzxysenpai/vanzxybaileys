export function mapDisconnectReason(code: any): string;
export function isFatalDisconnect(reason: any): boolean;
export function isRateLimited(reason: any): boolean;
export function shouldClearAuth(reason: any): boolean;
export function shouldReconnect(reason: any): boolean;
export function getDisconnectInfo(input: any): {
    code: any;
    reason: string;
    fatal: boolean;
    clearAuth: boolean;
    reconnect: boolean;
    rateLimited: boolean;
};
