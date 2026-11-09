export const DEFAULT_FETCH_TIMEOUT_MS: 15000;
export function fetchWithTimeout(url: string | URL, init?: RequestInit & {
    dispatcher?: any;
}, timeoutMs?: number): Promise<Response>;
