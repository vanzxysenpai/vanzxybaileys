export function resolveButtonAddonKind(message: any): WaButtonAddonKind | null;
export function parseInteractiveReply(message: any): NormalizedInteractiveReply;
/**
 * Companion "addon kind" for list / native-flow style messages.
 * Ported from zapo-js's resolveButtonAddonKind (src/message/encode/content.ts).
 */
export type WaButtonAddonKind = "list" | "interactive" | "payment_info" | "order_details";
/**
 * Normalized shape returned by parseInteractiveReply, regardless of which
 * underlying WhatsApp reply type produced it.
 */
export type NormalizedInteractiveReply = {
    kind: "buttons_response" | "list_response" | "native_flow_response" | "template_button_reply" | null;
    /**
     * - the button/row/native-flow id the user selected
     */
    id: string | null;
    /**
     * - visible text of the selection, if present
     */
    displayText: string | null;
    /**
     * - parsed paramsJson for native-flow responses, or null
     */
    params: any | null;
};
