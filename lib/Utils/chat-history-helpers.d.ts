import type { WAMessage } from '../Types/index.js';
import type { AnyMediaMessageContent, WAMediaUploadFunction } from '../Types/Message.js';
import type { ILogger } from './logger.js';
import type { MediaType } from '../Defaults/index.js';
/** The object returned by `makeInMemoryStore()` (see lib/Store/make-in-memory-store.js). */
export interface InMemoryStoreLike {
    messages?: Record<string, {
        array: WAMessage[];
    } | undefined>;
}
export declare const getLastMessageInChat: (store: InMemoryStoreLike, jid: string) => WAMessage | undefined;
export declare const getOldestMessageInChat: (store: InMemoryStoreLike, jid: string) => WAMessage | undefined;
export declare const copyNForward: (sock: {
    sendMessage: (jid: string, content: unknown) => Promise<WAMessage | undefined>;
}, jid: string, message: WAMessage, forceForward?: boolean) => Promise<WAMessage | undefined>;
export declare const uploadMediaToWhatsApp: (sock: {
    waUploadToServer: WAMediaUploadFunction;
}, message: AnyMediaMessageContent, opts?: {
    logger?: ILogger;
    mediaTypeOverride?: MediaType;
}) => Promise<any>;
