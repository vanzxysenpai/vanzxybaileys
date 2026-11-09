/** Default part size. WhatsApp accepts far more, but long single bubbles render and quote badly; 4000 is a safe chunk. */
export const DEFAULT_TEXT_PART_LENGTH: 4000;
export function splitText(text: any, maxLen?: number): string[];
export function whatsappify(text: any): any;
export function sendLongText(sock: any, jid: any, text: any, opts1?: { [key: string]: any; 
    format?: boolean;
    maxLen?: number;
    delayMs?: number;
}): Promise<{
    ok: boolean;
    ids: string[];
    error?: unknown;
}>;
