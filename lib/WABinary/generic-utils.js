import { Boom } from '@hapi/boom';
import { randomBytes } from 'crypto';
import { proto } from '../../WAProto/index.js';
// some extra useful utilities
const indexCache = new WeakMap();
export const getBinaryNodeChildren = (node, childTag) => {
    if (!node || !Array.isArray(node.content))
        return [];
    let index = indexCache.get(node);
    // Build the index once per node
    if (!index) {
        index = new Map();
        for (const child of node.content) {
            let arr = index.get(child.tag);
            if (!arr)
                index.set(child.tag, (arr = []));
            arr.push(child);
        }
        indexCache.set(node, index);
    }
    // Return first matching child
    return index.get(childTag) || [];
};
export const getBinaryNodeChild = (node, childTag) => {
    return getBinaryNodeChildren(node, childTag)[0];
};
export const getAllBinaryNodeChildren = ({ content }) => {
    if (Array.isArray(content)) {
        return content;
    }
    return [];
};
export const getBinaryNodeChildBuffer = (node, childTag) => {
    const child = getBinaryNodeChild(node, childTag)?.content;
    if (Buffer.isBuffer(child) || child instanceof Uint8Array) {
        return child;
    }
};
export const getBinaryNodeChildString = (node, childTag) => {
    const child = getBinaryNodeChild(node, childTag)?.content;
    if (Buffer.isBuffer(child) || child instanceof Uint8Array) {
        return Buffer.from(child).toString('utf-8');
    }
    else if (typeof child === 'string') {
        return child;
    }
};
// Vanz@Port (v2.1.6) --- from @nexustechpro/baileys: true when additionalNodes already carries a button/biz node.
export const getBinaryFilteredButtons = (nodeContent) => {
    if (!Array.isArray(nodeContent)) return false;
    return nodeContent.some(a => ['native_flow'].includes(a?.content?.[0]?.content?.[0]?.tag) ||
        ['interactive', 'buttons', 'list'].includes(a?.content?.[0]?.tag) ||
        ['hsm', 'biz'].includes(a?.tag));
};
// Vanz@Port (2.0.3) --- from @yemo-dev/yebail: getBinaryFilteredButtons plus the biz-bot case (<bot biz_bot='1'>).
export const getBinaryNodeFilter = (nodeContent) => {
    if (!Array.isArray(nodeContent)) return false;
    return getBinaryFilteredButtons(nodeContent) ||
        nodeContent.some(a => a?.tag === 'bot' && a?.attrs?.biz_bot === '1');
};
export const getBinaryNodeChildUInt = (node, childTag, length) => {
    const buff = getBinaryNodeChildBuffer(node, childTag);
    if (buff) {
        return bufferToUInt(buff, length);
    }
};
export const assertNodeErrorFree = (node) => {
    const errNode = getBinaryNodeChild(node, 'error');
    if (errNode) {
        throw new Boom(errNode.attrs.text || 'Unknown error', { data: +errNode.attrs.code });
    }
};
export const reduceBinaryNodeToDictionary = (node, tag) => {
    const nodes = getBinaryNodeChildren(node, tag);
    const dict = nodes.reduce((dict, { attrs }) => {
        if (typeof attrs.name === 'string') {
            dict[attrs.name] = attrs.value || attrs.config_value;
        }
        else {
            dict[attrs.config_code] = attrs.value || attrs.config_value;
        }
        return dict;
    }, {});
    return dict;
};
export const getBinaryNodeMessages = ({ content }) => {
    const msgs = [];
    if (Array.isArray(content)) {
        for (const item of content) {
            if (item.tag === 'message') {
                msgs.push(proto.WebMessageInfo.decode(item.content).toJSON());
            }
        }
    }
    return msgs;
};
function bufferToUInt(e, t) {
    let a = 0;
    for (let i = 0; i < t; i++) {
        a = 256 * a + e[i];
    }
    return a;
}
const tabs = (n) => '\t'.repeat(n);
export function binaryNodeToString(node, i = 0) {
    if (!node) {
        return node;
    }
    if (typeof node === 'string') {
        return tabs(i) + node;
    }
    if (node instanceof Uint8Array) {
        return tabs(i) + Buffer.from(node).toString('hex');
    }
    if (Array.isArray(node)) {
        return node.map(x => tabs(i + 1) + binaryNodeToString(x, i + 1)).join('\n');
    }
    const children = binaryNodeToString(node.content, i + 1);
    const tag = `<${node.tag} ${Object.entries(node.attrs || {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}='${v}'`)
        .join(' ')}`;
    const content = children ? `>\n${children}\n${tabs(i)}</${node.tag}>` : '/>';
    return tag + content;
}
/**
 * Lia@Changes 30-01-26
 * ---
 * Produce the binary node (WABinary-like JSON shape) required for the specific
 * interactive button / list type.
 * compatible with observed official client traffic.
 *
 * NOTE: Returning different "v" (version) and "name" values influences how
 * WhatsApp renders & validates flows. The constants here are empirically derived.
 *
 * @param {object} message Normalized message content (after Baileys normalization).
 * @returns {object} A node with shape { tag, attrs, [content] } to inject into additionalNodes.
 */
const FLOWS_MAP = {
    // Original flow types
    mpm: true,
    // Vanz@Fix (bug 44): the "catalog" nativeFlow shortcut generates a button
    // named 'catalog_message' (see prepareNativeFlowButtons in messages.js),
    // never 'cta_catalog' — the old key here never matched anything, so
    // catalog_message always fell through to the generic mixed-flow node
    // instead of getting its dedicated native_flow node.
    catalog_message: true,
    // Vanz@Fix (render audit) --- Button.js's addCatalog() generates a button named
    // 'cta_catalog' (its own JSDoc says "see Button.#SPECIAL_FLOW for the native-flow node
    // this name requires", which documents v='2'), but that name was never actually added
    // here — the two tables (this one and Button.js's #SPECIAL_FLOW) had drifted out of sync,
    // exactly the failure mode the comment on #SPECIAL_FLOW warns about. Without this entry
    // every addCatalog() button silently fell through to the generic mixed node instead of
    // its documented dedicated one. v='2' below (hardcoded further down for every FLOWS_MAP
    // entry) matches what #SPECIAL_FLOW already documented for this name, so this is a safe,
    // zero-guessing fix — not a new/unverified mapping.
    cta_catalog: true,
    send_location: true,
    call_permission_request: true,
    wa_payment_transaction_details: true,
    automated_greeting_message_view_catalog: true,
    // Vanzxy extended button types
    card_message: true,
    order_status: true,
    track_order: true,
    reorder: true,
    cancel_order: true,
    clear_chat: true,
    navigateToScreen: true,
    payment_status: true,
    payment_method: true,
    flow_action: true,
    voice_call: true,
    video_call_button: true,
    // Confirmed not a bug (see lib/Utils/messages.js "Vanzxy@Fix (bug 12)"): otp_button/
    // authentication_button are WhatsApp Business Platform (Cloud API) authentication-template
    // buttons gated behind Meta template approval — no MD-protocol client, this fork included,
    // can ever produce a button with these names, so no builder method exists for them and
    // these two entries can never actually route anything. Left in place only as a documented
    // no-op in case a caller ever hand-constructs a raw button object with one of these names;
    // harmless either way since nothing upstream ever creates one.
    otp_button: true,
    authentication_button: true,
    cta_reminder: true,
    cta_cancel_reminder: true,
    // Vanz@Fix 27-08-26: the real native_flow name for a WhatsApp Flows launch
    // button is 'flow' (matches Button.addFlow()'s button.name after the fix
    // in MessageBuilder.js). 'flow_action' was never a valid native_flow name --
    // it's the name of a *field inside* buttonParamsJson -- so it never actually
    // routed anything real; kept as a harmless alias in case any external caller
    // is still constructing a raw button object with the old (wrong) name.
    flow: true,
    // Vanz@Fix (bug 68): removed duplicate `flow_action: true` key — already declared
    // above (Vanzxy extended button types block); this was a leftover copy-paste dupe,
    // harmless (same value) but confusing on re-read.
    // Vanz@Fix (FLOWS_MAP/#SPECIAL_FLOW drift, round 2) --- same failure mode already fixed
    // once for cta_catalog above: Button.js's addPaymentKeyInfo()/addBookingConfirmation()
    // generate buttons named 'payment_key_info'/'booking_confirmation', and Button.#SPECIAL_FLOW
    // documents both with v='1' (that table's own header notes it's cross-checked against
    // zqdevelopers/zq_baileys_helper and @chatunity/baileys) — but neither name was ever added
    // here, so both silently fell through to the generic v='9' mixed node instead of their
    // documented dedicated node. Value is the string v to use (see getBizBinaryNode below),
    // not a plain boolean like the other entries, so this can carry #SPECIAL_FLOW's documented
    // '1' instead of the '2' every other entry here defaults to.
    payment_key_info: '1',
    booking_confirmation: '1',
    // Vanz@Fix (single_select never renders alone) --- single_select must NEVER get
    // its own dedicated native_flow node here. WhatsApp only renders a single_select
    // button through the generic <native_flow v='9' name='mixed'> node — the same one
    // used when it's combined with other buttons. Giving it a dedicated
    // <native_flow v='2' name='single_select'> node (like the other FLOWS_MAP entries)
    // silently fails to render client-side, whether single_select is alone or is simply
    // the first button in the array. Removed from this map on purpose so it always
    // falls through to the `flowMsg` mixed-flow branch below.
};
const DECISION_SOURCE_CONTENT = [
    {
        tag: 'decision_source',
        attrs: { value: 'df' }
    }
];
const LIST_TYPE_CONTENT = {
    tag: 'list',
    attrs: { v: '2', type: 'product_list' }
};
const NATIVE_FLOW_ATTRIBUTE = { type: 'native_flow', v: '1' };
const MIXED_NATIVE_FLOW = {
    tag: 'interactive',
    attrs: NATIVE_FLOW_ATTRIBUTE,
    content: [
        {
            tag: 'native_flow',
            attrs: { v: '9', name: 'mixed' }
        }
    ]
};
export const getBizBinaryNode = (message) => {
    const flowMsg = message.interactiveMessage?.nativeFlowMessage;
    // Vanz@Fix (Carousel-per-card-flow) --- this function never looked at carouselMessage at
    // all: firstButtonName came only from a top-level nativeFlowMessage, so any carousel
    // (whose buttons live at interactiveMessage.carouselMessage.cards[N].nativeFlowMessage
    // instead) always fell straight through every branch below to the bare default return
    // with no <interactive>/<native_flow> content at all -- not even the generic mixed node --
    // because the old `if (flowMsg || message.buttonsMessage || message.templateMessage)`
    // fallback check didn't know carousels existed either. Two-part fix: (1) firstButtonName
    // now also checks the first card's first button, so a carousel whose first card uses a
    // special flow (e.g. cta_catalog, payment_key_info) gets that flow's dedicated node exactly
    // like a plain Button message would; (2) the mixed-node fallback below now also fires for
    // a carousel with no special first button, instead of shipping a carousel with zero
    // native_flow node. Card index 0 is used because that's also what button-helper-utils.js's
    // getButtonArgs() (the other, independently-written carousel-aware biz-node picker) already
    // keys off of -- kept consistent with that instead of inventing a different rule here.
    const carouselMsg = message.interactiveMessage?.carouselMessage;
    // Vanz@Fix (ButtonV2/legacy buttonsMessage flow, round 6) --- messages.js's own general
    // `sendMessage({ buttons })` shortcut builds `buttonsMessage.buttons[N].nativeFlowInfo.name`
    // from ANY caller-given name (see its `else if (hasOptionalProperty(button, 'name'))` branch,
    // not just its dedicated single_select shortcut) -- proof this fork already treats
    // buttonsMessage as capable of carrying the same special flow names interactiveMessage does.
    // But firstButtonName here never looked at buttonsMessage.buttons at all, so a caller-named
    // flow like cta_catalog built via the buttons shortcut (or via ButtonV2, which documents
    // itself as "nativeFlowInfo-based") always got the generic mixed node instead of its
    // FLOWS_MAP-documented dedicated one -- same class of gap the carousel fix above closed for
    // carouselMessage. single_select needs no special exclusion here despite being buttonsMessage's
    // own shortcut name: FLOWS_MAP already deliberately omits 'single_select' as a key (see that
    // map's own comment on why), so it falls through to the mixed branch exactly as intended
    // whether it arrives via buttonsMessage or interactiveMessage.
    const buttonsMsg = message.buttonsMessage;
    const firstButtonName =
        flowMsg?.buttons?.[0]?.name ??
        carouselMsg?.cards?.[0]?.nativeFlowMessage?.buttons?.[0]?.name ??
        buttonsMsg?.buttons?.[0]?.nativeFlowInfo?.name;
    const qualityContent = {
        tag: 'quality_control',
        attrs: {
            decision_id: randomBytes(20).toString('hex'),
            source_type: 'third_party'
        },
        content: DECISION_SOURCE_CONTENT
    };
    const bizAttributes = {
        actual_actors: '2',
        host_storage: '2',
        privacy_mode_ts: `${Date.now() / 1_000 | 0}`
    };
    const ORDER_RESPONSE_ALIAS = {
        review_and_pay: 'order_details',
        review_order: 'order_status',
        payment_info: 'payment_info',
        payment_status: 'payment_status',
        payment_method: 'payment_method',
        order_details: 'order_details',
        order_status: 'order_status',
        track_order: 'track_order',
        reorder: 'reorder',
        cancel_order: 'cancel_order',
        // Vanz@Fix (2.0.3) --- observed wire shape for catalog_message is a bare
        // <biz native_flow_name='catalog_message'/> with NO <interactive> child.
        catalog_message: 'catalog_message',
    };
    if (firstButtonName && ORDER_RESPONSE_ALIAS[firstButtonName]) {
        bizAttributes.native_flow_name = ORDER_RESPONSE_ALIAS[firstButtonName];
        return {
            tag: 'biz',
            attrs: bizAttributes,
            content: [qualityContent]
        };
    }
    if (firstButtonName && FLOWS_MAP[firstButtonName]) {
        // Vanz@Fix (FLOWS_MAP/#SPECIAL_FLOW drift, round 2): v used to be hardcoded '2' for
        // every entry here. That was fine while every entry agreed with #SPECIAL_FLOW's '2',
        // but payment_key_info/booking_confirmation are documented there as v='1' — so an
        // entry can now carry its own v (a string value) instead of the plain boolean the
        // rest use, and that value wins when present.
        const flowVersion = typeof FLOWS_MAP[firstButtonName] === 'string' ? FLOWS_MAP[firstButtonName] : '2';
        // Vanz@Fix (2.0.3) --- observed payment_key_info native_flow carries `name` only (no `v`).
        const flowAttrs = firstButtonName === 'payment_key_info' ? { name: firstButtonName } : { v: flowVersion, name: firstButtonName };
        return {
            tag: 'biz',
            attrs: bizAttributes,
            content: [
                {
                    tag: 'interactive',
                    attrs: NATIVE_FLOW_ATTRIBUTE,
                    content: [
                        {
                            tag: 'native_flow',
                            attrs: flowAttrs
                        }
                    ]
                },
                qualityContent
            ]
        };
    }
    if (flowMsg || carouselMsg || message.buttonsMessage || message.templateMessage) {
        return {
            tag: 'biz',
            attrs: bizAttributes,
            content: [
                MIXED_NATIVE_FLOW,
                qualityContent
            ]
        };
    }
    if (message.listMessage) {
        return {
            tag: 'biz',
            attrs: bizAttributes,
            content: [
                LIST_TYPE_CONTENT,
                qualityContent
            ]
        };
    }
    return {
        tag: 'biz',
        attrs: bizAttributes,
        content: [qualityContent]
    };
};
