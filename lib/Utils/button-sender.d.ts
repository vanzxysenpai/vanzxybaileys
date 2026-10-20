/**
 * Normalise various legacy / upstream button shapes into the native-flow format
 * { name, buttonParamsJson }.
 *
 * Accepted input shapes:
 *  1. Already native_flow : { name: string, buttonParamsJson: string }
 *  2. Simple legacy       : { id?: string, text?: string, displayText?: string }
 *  3. Old Baileys         : { buttonId: string, buttonText: { displayText: string } }
 *  4. Unknown             : passed through verbatim
 */
export function buildInteractiveButtons(buttons?: any[]): any[];
/**
 * Validate raw button objects before conversion.
 * Permissive: only blocks clearly malformed input.
 */
export function validateAuthoringButtons(buttons: any): {
    errors: string[];
    warnings: any[];
    valid: boolean;
    cleaned: any[];
} | {
    errors: any[];
    warnings: string[];
    valid: boolean;
    cleaned: any[];
};
/**
 * Strict validator for sendButtons() payload.
 */
export function validateSendButtonsPayload(data: any): {
    valid: boolean;
    errors: string[];
    warnings: any[];
};
/**
 * Strict validator for sendInteractiveMessage() authoring payload.
 */
export function validateSendInteractiveMessagePayload(data: any): {
    valid: boolean;
    errors: string[];
    warnings: any[];
};
/**
 * Validate already-converted interactiveMessage content (just before WAMessage creation).
 */
export function validateInteractiveMessageContent(content: any): {
    errors: any[];
    warnings: any[];
    valid: boolean;
};
/**
 * Convert the high-level authoring shape:
 *   { text, footer?, title?, subtitle?, interactiveButtons: [...] }
 * into the exact structure Baileys / WAProto expects:
 *   { interactiveMessage: { nativeFlowMessage: { buttons: [...] }, body?, header?, footer? } }
 *
 * Authoring-only fields are stripped so they don't leak into
 * generateWAMessageFromContent.
 */
export function convertToInteractiveMessage(content: any): any;
/**
 * Low-level power function — sends any interactive message by:
 *
 *  1. Validate authoring payload (when interactiveButtons is provided).
 *  2. Convert to interactiveMessage / nativeFlowMessage proto shape.
 *  3. Build WAMessage via generateWAMessageFromContent (skips sendMessage
 *     validation that rejects interactiveMessage).
 *  4. Derive & inject required binary nodes so buttons render on all platforms:
 *       - biz node  { tag:'biz', attrs:{} }
 *       - interactive child  { type:'native_flow', v:'1' }
 *       - native_flow child  { v:'9', name:'mixed' }
 *       - bot node  { tag:'bot', attrs:{ biz_bot:'1' } }  (private chats only)
 *  5. Relay via sock.relayMessage.
 *
 * @param {import('../Types/Socket.js').WASocket} sock Active @vanzxy/baileys socket instance.
 * @param {string} jid Destination chat JID.
 * @param {Record<string, unknown>} content Authoring payload (may include interactiveButtons).
 * @param {object} [options] Pass-through relay options (additionalNodes, etc.).
 */
export function sendInteractiveMessage(sock: any, jid: string, content: Record<string, unknown>, options?: object): Promise<import("../index.js").proto.WebMessageInfo>;
/**
 * Extended send variant with thumbnail / externalAdReply patching.
 *
 * Dummy document priority:
 *  1. content.filePath  — load file from local disk path
 *  2. content.fileUrl   — fetch file buffer from a URL
 *  3. content.thumbnailUrl — fetch jpegThumbnail buffer AND use as dummy
 *  4. fallback          — plain text dummy buffer
 *  mimetype is taken from content.mimetype if provided, else auto-detected.
 *
 * externalAdReply fields:
 *  - containsAutoReply : true
 *  - mediaUrl / thumbnailUrl
 *  - renderLargerThumbnail : true
 *  - jpegThumbnail buffer (WA trusts this most)
 *
 * axios is a soft peer dependency — errors are non-fatal (logged only).
 *
 * @example — thumbnail from URL
 * await sendInteractiveMessageV2(sock, jid, {
 *   text: 'Hello',
 *   thumbnailUrl: 'https://example.com/thumb.jpg',
 *   interactiveButtons: [{ name: 'quick_reply', buttonParamsJson: '{"display_text":"Hi","id":"hi"}' }],
 * })
 *
 * @example — dummy file from local path
 * await sendInteractiveMessageV2(sock, jid, {
 *   text: 'Hello',
 *   filePath: '/tmp/myfile.pdf',
 *   mimetype: 'application/pdf',
 *   interactiveButtons: [...],
 * })
 */
export function sendInteractiveMessageV2(sock: any, jid: any, content: any, options?: {}): Promise<import("../index.js").proto.WebMessageInfo>;
/**
 * Convenience wrapper for the most common quick-reply / CTA button use case.
 *
 * @example — quick-reply
 * await sendButtons(sock, jid, {
 *   text: 'Are you sure?',
 *   footer: 'Bot v1',
 *   buttons: [
 *     { id: 'yes', text: 'Yes' },
 *     { id: 'no',  text: 'No'  },
 *   ],
 * })
 *
 * @example — mixed quick-reply + CTA URL
 * await sendButtons(sock, jid, {
 *   text: 'Check our site',
 *   buttons: [
 *     { id: 'info', text: 'More Info' },
 *     { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Open', url: 'https://example.com' }) },
 *   ],
 * })
 */
export function sendButtons(sock: any, jid: any, data?: {
    text: string;
    buttons: any[];
}, options?: {}): Promise<import("../index.js").proto.WebMessageInfo>;
/**
 * Thrown when button payload authoring validation fails.
 * Provides structured errors/warnings + a canonical example so callers can
 * surface actionable feedback to end-users or logs.
 */
export class InteractiveValidationError extends Error {
    constructor(message: any, opts1?: { [key: string]: any; 
        errors?: any[];
        warnings?: any[];
    });
    context: any;
    errors: any[];
    warnings: any[];
    example: any;
    toJSON(): {
        name: string;
        message: string;
        context: any;
        errors: any[];
        warnings: any[];
        example: any;
    };
    formatDetailed(): string;
}
