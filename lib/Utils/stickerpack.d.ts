import type { ILogger } from './logger.js';
import type { WAMediaUpload } from '../Types/index.js';
import { proto } from '../../WAProto/index.js';
export declare const isWebPBuffer: (buffer: Buffer) => boolean;
export declare const isAnimatedWebP: (buffer: Buffer) => boolean;
export declare const convertToWebP: (input: WAMediaUpload) => Promise<{
    buffer: Buffer;
    isAnimated: boolean;
}>;
export declare const generateStickerPackId: () => string;
export declare const buildStickerPackProto: (pack: {
    name: string;
    publisher: string;
    packId?: string;
    description?: string;
}) => {
    name: string;
    publisher: string;
    packId: string;
    description: string;
};
export declare const STICKER_PACK_MESSAGE_TYPE: 'sticker_pack';
export type ItsliaaaStickerInput = {
    data: WAMediaUpload;
    emojis?: string[];
    accessibilityLabel?: string;
};
export type ItsliaaaStickerPackInput = {
    cover: WAMediaUpload;
    stickers: ItsliaaaStickerInput[];
    name?: string;
    publisher?: string;
    description?: string;
};
export type ItsliaaaStickerPackOptions = {
    logger?: ILogger;
    upload: (filePath: string, opts: {
        fileEncSha256B64: string;
        mediaType: string;
        timeoutMs?: number;
    }) => Promise<{
        directPath: string;
    }>;
    options?: RequestInit;
    mediaUploadTimeoutMs?: number;
    mediaCache?: {
        get: (key: string) => Promise<Buffer | undefined>;
        set: (key: string, value: Buffer) => void;
    };
};
export declare const prepareStickerPackMessageItsliaaa: (message: ItsliaaaStickerPackInput, options: ItsliaaaStickerPackOptions) => Promise<proto.Message.IStickerPackMessage>;
