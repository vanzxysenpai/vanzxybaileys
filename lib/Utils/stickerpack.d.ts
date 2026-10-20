export function isWebPBuffer(buffer: any): boolean;
export function isAnimatedWebP(buffer: any): any;
export function isLottieBuffer(buffer: any): any;
export function convertToWebP(input: any): Promise<{
    buffer: any;
    isAnimated: any;
}>;
export function generateStickerPackId(): string;
export function buildStickerPackProto(pack: any): {
    name: any;
    publisher: any;
    packId: any;
    description: any;
};
/** stickerPack message type marker — for use with getMediaType()-style dispatch. */
export const STICKER_PACK_MESSAGE_TYPE: "sticker_pack";
export function prepareStickerPackMessageItsliaaa(message: any, options: any): Promise<proto.Message.StickerPackMessage>;
import { proto } from '../../WAProto/index.js';
