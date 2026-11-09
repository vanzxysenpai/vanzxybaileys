export const SCHEDULED_MSG_META_TYPE: "scheduled_message";
export const SCHEDULED_MSG_MAX_PER_CHAT: 30;
export const SCHEDULED_MSG_MAX_MEDIA: 1;
export const SCHEDULED_MSG_RESOURCE_LIMIT_NACK_CODE: 419;
export const SCHEDULED_MSG_REVEAL_KEY_BYTES: 32;
export const SCHEDULED_MSG_REVEAL_KEY_IV_BYTES: 12;
export const SCHEDULED_MSG_REVEAL_KEY_RETENTION_DAYS: 30;
export const SCHEDULED_MSG_TAG_BYTES: 16;
export const SCHEDULED_MSG_WINDOW: Readonly<{
    chat: {
        minSeconds: number;
        maxSeconds: number;
    };
    newsletter: {
        minSeconds: number;
        maxSeconds: number;
    };
}>;
export function generateRevealKey(): any;
export function generateRevealKeyId(): any;
export function encryptWithRevealKey(plaintext: any, revealKey: any): {
    encIv: any;
    encPayload: any;
};
export function decryptWithRevealKey(encPayload: any, encIv: any, revealKey: any): any;
export function buildConditionalRevealMessage(opts1: { [key: string]: any; 
    encPayload: any;
    encIv: any;
    revealKeyId: any;
}): {
    conditionalRevealMessage: {
        conditionalRevealMessageType: proto.Message.ConditionalRevealMessage.ConditionalRevealMessageType;
        encPayload: any;
        encIv: any;
        revealKeyId: any;
    };
};
export function encodeScheduledMessage(message: any, revealKey?: any): {
    revealKey: any;
    revealKeyId: any;
    encIv: any;
    encPayload: any;
    message: {
        conditionalRevealMessage: {
            conditionalRevealMessageType: proto.Message.ConditionalRevealMessage.ConditionalRevealMessageType;
            encPayload: any;
            encIv: any;
            revealKeyId: any;
        };
    };
};
export function decodeScheduledMessage(conditionalRevealMessage: any, revealKey: any): proto.Message;
export function buildScheduledMsgMetaNode(opts2: { [key: string]: any; 
    kind?: string;
    scheduledTimestampS: any;
    revealKeyId: any;
    revealKey: any;
}): {
    tag: string;
    attrs: {
        type: string;
    };
    content: {
        tag: string;
        attrs: {
            rkid: any;
        };
        content: any;
    }[];
};
export function buildUnscheduleProtocolMessage(key: any): {
    protocolMessage: {
        key: any;
        type: proto.Message.ProtocolMessage.Type;
    };
};
export function isScheduledTimeValid(scheduledTimestampS: any, nowSeconds?: number, window?: {
    minSeconds: number;
    maxSeconds: number;
}): boolean;
import { proto } from '../../WAProto/index.js';
