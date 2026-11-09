/**
 * Aggregates all poll updates in a poll.
 * @param msg the poll creation message
 * @param meId your jid
 * @returns A list of options & their voters
 */
export function getAggregateVotesInPollMessage(opts1: { [key: string]: any; 
    message: any;
    pollUpdates: any;
}, meId: any): any[];
/**
 * Aggregates all event responses in an event message.
 * @param msg the event creation message
 * @param meId your jid
 * @returns A list of response types & their responders
 */
export function getAggregateResponsesInEventMessage(opts2: { [key: string]: any; 
    eventResponses: any;
}, meId: any): any[];
export function extractUrlFromText(text: any): any;
export function generateLinkPreviewIfRequired(text: any, getUrlInfo: any, logger: any): Promise<any>;
export function prepareWAMessageMedia(message: any, options: any): Promise<proto.Message>;
export function prepareDisappearingMessageSettingContent(ephemeralExpiration: any): proto.Message;
export function generateForwardMessageContent(message: any, forceForward: any): any;
export function hasNonNullishProperty(message: any, key: any): boolean;
export function hasOptionalProperty(obj: any, key: any): boolean;
export function hasValidAlbumMedia(message: any): boolean;
export function hasValidInteractiveHeader(message: any): boolean;
export function hasValidCarouselHeader(message: any): boolean;
export function generateWAMessageContent(message: any, options: any): Promise<any>;
export function generateWAMessageFromContent(jid: any, message: any, options: any): proto.WebMessageInfo;
export function prepareMessageFromContent(jid: any, message: any, options: any): proto.WebMessageInfo;
export function generateWAMessage(jid: any, content: any, options: any): Promise<proto.WebMessageInfo>;
export function getContentType(content: any): string;
export function normalizeMessageContent(content: any): any;
export function extractMessageContent(content: any): any;
export function getDevice(id: any): "unknown" | "ios" | "web" | "android" | "desktop";
export function updateMessageWithReceipt(msg: any, receipt: any): void;
export function updateMessageWithReaction(msg: any, reaction: any): void;
export function updateMessageWithPollUpdate(msg: any, update: any): void;
export function updateMessageWithEventResponse(msg: any, update: any): void;
export function aggregateMessageKeysNotFromMe(keys: any): any[];
export function downloadMediaMessage(message: any, type: any, options: any, ctx: any): Promise<any>;
export function assertMediaContent(content: any): any;
export function shouldIncludeBizBinaryNode(message: any): boolean;
export function getPollOptionHash(optionName: any, fileSha256: any): any;
export function nativeFlowButtonsViolateConstraints(buttons?: any[]): boolean;
export function buildInteractiveAdditionalNodes(_jid: any, _message: any, options?: {}): {
    tag: string;
    attrs: {};
    content: {
        tag: string;
        attrs: {
            type: string;
            v: string;
        };
        content: {
            tag: string;
            attrs: {
                v: any;
                name: any;
            };
        }[];
    }[];
}[];
import { proto } from '../../WAProto/index.js';
