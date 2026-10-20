export const StatusLinkType: Readonly<{
    RASTERIZED_LINK_PREVIEW: 1;
    RASTERIZED_LINK_TRUNCATED: 2;
    RASTERIZED_LINK_FULL_URL: 3;
}>;
export const STICKER_DEFAULT_AREA: Readonly<{
    x: 0.25;
    y: 0.4;
    width: 0.5;
    height: 0.2;
}>;
export function stickerArea(opts1?: Readonly<{
    x: 0.25;
    y: 0.4;
    width: 0.5;
    height: 0.2;
}>): {
    x: number;
    y: number;
}[];
export function locationSticker(opts2?: { [key: string]: any; }): any;
export function channelSticker(opts3?: { [key: string]: any; 
    serverMessageId?: number;
}): any;
export function linkSticker(opts4?: { [key: string]: any; 
    linkType?: 1;
}): any;
export function musicSticker(opts5?: { [key: string]: any; 
    startTimeMs?: number;
}): any;
export function messageSticker(opts6?: { [key: string]: any; }): any;
export function normalizeStickers(stickers: any): proto.InteractiveAnnotation[];
export function readStickers(message: any): {
    kind: string;
    area: {
        x: any;
        y: any;
        width: number;
        height: number;
    };
    location: any;
    channel: any;
    link: {
        url: any;
        title: any;
        linkType: any;
    };
    music: {
        songId: any;
        title: any;
        author: any;
    };
    message: any;
    annotation: any;
}[];
export const MusicMessageStyle: Readonly<{
    UNKNOWN: 0;
    VINYL: 1;
}>;
export const MUSIC_ALLOWED_HOSTS: readonly string[];
export function isMusicHostAllowed(value: any): boolean;
export function buildMusicMessage(opts7?: { [key: string]: any; 
    style?: 1;
}): any;
export function readMusicMessage(msg: any): {
    songId: any;
    mediaId: any;
    title: any;
    author: any;
    artistAttribution: any;
    isExplicit: any;
    startTimeMs: any;
    durationMs: any;
    songUri: any;
    artworkUri: any;
    style: any;
    embeddedMusic: any;
};
import { proto } from '../../WAProto/index.js';
