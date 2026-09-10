/**
 * Evernight AI — lib/Utils/message-kind.js / Creator : Vanzxy🍃
 *
 * Addon-kind resolution logic adapted from zapo-js (MIT, © vinikjkkj)
 * <https://github.com/vinikjkkj/zapo>, ported to this Baileys fork's
 * message-content shape. The normalized reply parser below is original,
 * written to cover this fork's own buttonsResponseMessage /
 * listResponseMessage / interactiveResponseMessage / templateButtonReplyMessage
 * send-side shapes (see messages.js).
 */

/**
 * Unwraps ephemeral/viewOnce/edited wrappers to get at the real content.
 * Mirrors the wrapper set already handled by normalizeMessageContent()
 * in messages.js, kept local here to avoid a circular import.
 */
const unwrapMessage = (message) => {
    let content = message;
    for (let i = 0; i < 5; i++) {
        const inner = content?.ephemeralMessage?.message ||
            content?.viewOnceMessage?.message ||
            content?.viewOnceMessageV2?.message ||
            content?.viewOnceMessageV2Extension?.message ||
            content?.documentWithCaptionMessage?.message ||
            content?.editedMessage?.message;
        if (!inner) {
            break;
        }
        content = inner;
    }
    return content;
};

/**
 * Companion "addon kind" for list / native-flow style messages.
 * Ported from zapo-js's resolveButtonAddonKind (src/message/encode/content.ts).
 * @typedef {'list' | 'interactive' | 'payment_info' | 'order_details'} WaButtonAddonKind
 */

const resolveNativeFlowAddonKind = (nativeFlow) => {
    const firstButtonName = nativeFlow?.buttons?.[0]?.name;
    if (firstButtonName === 'payment_info')
        return 'payment_info';
    if (firstButtonName === 'review_and_pay')
        return 'order_details';
    return 'interactive';
};

/**
 * Resolves which kind of button/list addon an outgoing message carries.
 * Returns null if the message has no button/list/native-flow content.
 * @param {import('../../WAProto').proto.IMessage} message
 * @returns {WaButtonAddonKind | null}
 */
export const resolveButtonAddonKind = (message) => {
    const msg = unwrapMessage(message);
    if (!msg)
        return null;
    if (msg.listMessage)
        return 'list';
    if (msg.buttonsMessage)
        return 'interactive';
    const nativeFlow = msg.interactiveMessage?.nativeFlowMessage;
    if (nativeFlow)
        return resolveNativeFlowAddonKind(nativeFlow);
    return null;
};

/**
 * Normalized shape returned by parseInteractiveReply, regardless of which
 * underlying WhatsApp reply type produced it.
 * @typedef {Object} NormalizedInteractiveReply
 * @property {'buttons_response'|'list_response'|'native_flow_response'|'template_button_reply'|null} kind
 * @property {string|null} id - the button/row/native-flow id the user selected
 * @property {string|null} displayText - visible text of the selection, if present
 * @property {Object|null} params - parsed paramsJson for native-flow responses, or null
 */

/**
 * Reads whatever a user tapped (button, list row, or native-flow reply) and
 * returns one consistent shape, so plugin authors don't need a different
 * branch per response type. Safe against malformed paramsJson (returns null
 * instead of throwing).
 * @param {import('../../WAProto').proto.IMessage} message
 * @returns {NormalizedInteractiveReply}
 */
export const parseInteractiveReply = (message) => {
    const msg = unwrapMessage(message);
    const empty = { kind: null, id: null, displayText: null, params: null };
    if (!msg)
        return empty;
    if (msg.buttonsResponseMessage) {
        const r = msg.buttonsResponseMessage;
        return {
            kind: 'buttons_response',
            id: r.selectedButtonId || null,
            displayText: r.selectedDisplayText || null,
            params: null
        };
    }
    if (msg.listResponseMessage) {
        const r = msg.listResponseMessage;
        return {
            kind: 'list_response',
            id: r.singleSelectReply?.selectedRowId || null,
            displayText: r.title || r.description || null,
            params: null
        };
    }
    if (msg.interactiveResponseMessage) {
        const r = msg.interactiveResponseMessage;
        let params = null;
        if (r.nativeFlowResponseMessage?.paramsJson) {
            try {
                params = JSON.parse(r.nativeFlowResponseMessage.paramsJson);
            }
            catch {
                params = null;
            }
        }
        return {
            kind: 'native_flow_response',
            id: params?.id ?? r.nativeFlowResponseMessage?.name ?? null,
            displayText: r.body?.text || null,
            params
        };
    }
    if (msg.templateButtonReplyMessage) {
        const r = msg.templateButtonReplyMessage;
        return {
            kind: 'template_button_reply',
            id: r.selectedId || null,
            displayText: r.selectedDisplayText || null,
            params: null
        };
    }
    return empty;
};
//# sourceMappingURL=message-kind.js.map
