export function getNewsletterStatusMediaType(message: any): "image" | "video" | "audio" | "gif";
export function withNewsletterStatusAttribution(content: any): any;
export function parseNewsletterStatusAck(node: any, opts1?: { [key: string]: any; }): {
    class: any;
    from: any;
    id: any;
    t: number;
    serverId: number;
    edit: any;
    error: string;
    applicationError: number;
    backoff: number;
    node: any;
};
export function waitForNewsletterStatusServerId(sock: any, opts2: { [key: string]: any; 
    jid: any;
    messageId: any;
    timeoutMs?: number;
}): Promise<any>;
export function buildNewsletterAdminProfileStatusMessage(message: any): proto.Message;
export function buildNewsletterStatusNode(opts3: { [key: string]: any; 
    jid: any;
    message: any;
    payload: any;
    messageId: any;
    mediaType: any;
    mediaId: any;
    mediaHandle: any;
    parentServerId: any;
    responseServerId: any;
    interactionType: any;
    aiContent: any;
}): {
    tag: string;
    attrs: {
        to: any;
        id: any;
        type: string;
    };
    content: {
        tag: string;
        attrs: {
            mediatype: any;
        } | {
            mediatype?: undefined;
        };
        content: any;
    }[];
};
export function buildNewsletterStatusReactionNode(opts4: { [key: string]: any; 
    jid: any;
    messageId: any;
    parentServerId: any;
    reaction: any;
}): {
    tag: string;
    attrs: {
        to: any;
        id: any;
        server_id: string;
        type: string;
    };
    content: {
        tag: string;
        attrs: {
            code?: undefined;
        } | {
            code: any;
        };
        content: any;
    }[];
};
export function buildNewsletterStatusRevokeNode(opts5: { [key: string]: any; 
    jid: any;
    statusId: any;
}): {
    tag: string;
    attrs: {
        to: any;
        id: any;
        type: string;
        edit: string;
    };
    content: {
        tag: string;
        attrs: {};
        content: any;
    }[];
};
export function makeNewsletterStatusSender(sock: any, config: any): (jid: any, content: any, options?: {}) => Promise<proto.WebMessageInfo>;
export function makeNewsletterStatusReactionSender(sock: any): (jid: any, parentServerId: any, reaction: any, options?: {}) => Promise<{
    key: {
        remoteJid: any;
        fromMe: boolean;
        id: any;
    };
    status: proto.WebMessageInfo.Status;
    newsletterStatusServerId: number;
    newsletterStatusAck: {
        class: any;
        from: any;
        id: any;
        t: number;
        serverId: number;
        edit: any;
        error: string;
        applicationError: number;
        backoff: number;
        node: any;
    };
    newsletterStatusResponse: any;
}>;
export function makeNewsletterStatusRevokeSender(sock: any): (jid: any, statusId: any, options?: {}) => Promise<{
    key: {
        remoteJid: any;
        fromMe: boolean;
        id: any;
    };
    status: proto.WebMessageInfo.Status;
    newsletterStatusAck: {
        class: any;
        from: any;
        id: any;
        t: number;
        serverId: number;
        edit: any;
        error: string;
        applicationError: number;
        backoff: number;
        node: any;
    };
    newsletterStatusResponse: any;
}>;
export function parseNewsletterStatusUpdatesResponse(node: any): {
    jid: any;
    t: number;
    statuses: any;
};
export function makeNewsletterStatusUpdatesFetcher(sock: any): (jid: any, options?: {}) => Promise<{
    jid: any;
    t: number;
    statuses: any;
}>;
export function parseNewsletterStatusesResponse(node: any): {
    jid: any;
    t: number;
    statuses: any;
};
export function makeNewsletterStatusFetcher(sock: any): (jid: any, options?: {}) => Promise<{
    jid: any;
    t: number;
    statuses: any;
}>;
import { proto } from '../../WAProto/index.js';
export const NEWSLETTER_STATUS_CONTENT_TYPES: Set<string>;
export const NEWSLETTER_STATUS_MEDIA_TYPES: Set<string>;
export const NEWSLETTER_STATUS_WEB_MEDIA_TYPES: Set<string>;
