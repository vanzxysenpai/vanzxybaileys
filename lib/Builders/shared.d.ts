/** Static grab-bag of media/text helpers shared by the builder classes above. */
export class Toolkit {
    static #latexDimCache: Map<any, any>;
    /** Parse `[label](url)` hyperlinks, `[]()` citations, and `[expr]<img-url>` latex tags out of `text`. */
    static extractIE(text: any, opts1?: { [key: string]: any; 
        extract?: boolean;
        hyperlink?: boolean;
        citation?: boolean;
        latex?: boolean;
        deeplink?: boolean;
    }): {
        text: any;
        ie: any[];
        inline_entities: any[];
    } | {
        text: string;
        ie: ({
            type: string;
            ie: {
                key: string;
                text: any;
                url: any;
                width: any;
                height: any;
                font_height: any;
                padding: any;
                is_trusted?: undefined;
                reference_id?: undefined;
            };
        } | {
            type: string;
            ie: {
                key: string;
                text: any;
                url: any;
                width?: undefined;
                height?: undefined;
                font_height?: undefined;
                padding?: undefined;
                is_trusted?: undefined;
                reference_id?: undefined;
            };
        } | {
            type: string;
            ie: {
                key: string;
                text: any;
                url: any;
                is_trusted: boolean;
                width?: undefined;
                height?: undefined;
                font_height?: undefined;
                padding?: undefined;
                reference_id?: undefined;
            };
        } | {
            type: string;
            ie: {
                reference_id: number;
                key: string;
                text: string;
                url: any;
                width?: undefined;
                height?: undefined;
                font_height?: undefined;
                padding?: undefined;
                is_trusted?: undefined;
            };
        })[];
        inline_entities: ({
            key: any;
            metadata: {
                display_name: any;
                is_trusted: any;
                url: any;
                __typename: string;
                deeplink_url?: undefined;
                text?: undefined;
                reference_id?: undefined;
                reference_url?: undefined;
                reference_title?: undefined;
                reference_display_name?: undefined;
                sources?: undefined;
                latex_expression?: undefined;
                latex_image?: undefined;
                font_height?: undefined;
                padding?: undefined;
            };
        } | {
            key: any;
            metadata: {
                deeplink_url: any;
                text: any;
                __typename: string;
                display_name?: undefined;
                is_trusted?: undefined;
                url?: undefined;
                reference_id?: undefined;
                reference_url?: undefined;
                reference_title?: undefined;
                reference_display_name?: undefined;
                sources?: undefined;
                latex_expression?: undefined;
                latex_image?: undefined;
                font_height?: undefined;
                padding?: undefined;
            };
        } | {
            key: any;
            metadata: {
                reference_id: any;
                reference_url: any;
                reference_title: any;
                reference_display_name: any;
                sources: any[];
                __typename: string;
                display_name?: undefined;
                is_trusted?: undefined;
                url?: undefined;
                deeplink_url?: undefined;
                text?: undefined;
                latex_expression?: undefined;
                latex_image?: undefined;
                font_height?: undefined;
                padding?: undefined;
            };
        } | {
            key: any;
            metadata: {
                latex_expression: any;
                latex_image: {
                    url: any;
                    width: number;
                    height: number;
                };
                font_height: number;
                padding: number;
                __typename: string;
                display_name?: undefined;
                is_trusted?: undefined;
                url?: undefined;
                deeplink_url?: undefined;
                text?: undefined;
                reference_id?: undefined;
                reference_url?: undefined;
                reference_title?: undefined;
                reference_display_name?: undefined;
                sources?: undefined;
            };
        })[];
    };
    /** Resize an image buffer to `x`×`y` via sharp (lazy-loaded; throws with an install hint if sharp isn't present). */
    static resize(buffer: any, x: any, y: any, fit?: string): Promise<any>;
    /** Deeply await every Promise nested in `input` (objects/arrays), resolving it into plain values. */
    /** JSON.stringify that escapes every non-ASCII char as \\uXXXX (safe for transports that mangle UTF-8). */
    static stringifyEscaped(obj: any): string;
    static waitAllPromises(input: any): Promise<any>;
    /** Fetch `url` into a Buffer. @param {boolean} [silent] Return an empty Buffer instead of throwing on failure. @param {number} [timeout] Abort after this many ms (default 15s) instead of hanging indefinitely on a dead/slow host. */
    static fetchBuffer(url: any, options?: {}, opts2?: { [key: string]: any; 
        silent?: boolean;
        timeout?: number;
    }): Promise<any>;
    /** Upload media to WhatsApp's media server and return its `url`/`directPath` descriptor. */
    static toUrl(_client: any, path: any, mediaType?: string): Promise<any>;
    /** Normalize a url/buffer/array of either into the requested `result` shape ('url' | 'buffer' | 'base64'), optionally resizing and/or uploading to WA's media server first. */
    static resolveMedia(_client: any, media: any, mediaType?: string, opts3?: { [key: string]: any; 
        resolveUrl?: boolean;
        resolveWAUrl?: boolean;
        result?: string;
        resize?: boolean;
        width?: number;
        height?: number;
    }): any;
    /** Read an mp4 buffer's duration (seconds) straight from its moov atom, no ffprobe needed. */
    static getMp4Duration(buffer: any, opts4?: { [key: string]: any; 
        silent?: boolean;
    }): number;
    /** Extract a single frame from an mp4 buffer as a thumbnail (ffmpeg lazy-loaded; throws with an install hint if missing). */
    static getMp4Preview(videoBuffer: any, opts5?: { [key: string]: any; 
        result?: string;
        resize?: boolean;
        width?: number;
        height?: number;
        silent?: boolean;
    }): Promise<any>;
    /** Vanz@Add (v2.1.6) --- Read a raster image buffer's pixel width/height straight from its header
     *  (PNG/JPEG/GIF/WEBP), no image-processing lib needed (same "parse the header bytes" approach as
     *  `getMp4Duration()` above). Returns `null` if the format isn't recognized or the buffer is too short. */
    static getImageSize(buffer: any): {
        width: any;
        height: any;
    };
    /** Vanz@Add (v2.1.6) --- Fetch a rendered LaTeX/formula image and resolve the `{ url, width, height }`
     *  shape `addLatexPro()`'s per-expression `latex_image` needs, scaling proportionally to `fontHeight`
     *  (default 45, matching the client's own default) instead of requiring the caller to hardcode
     *  dimensions. Cached per `url+fontHeight` so re-sending the same card doesn't re-fetch. Header-parsing
     *  only (`getImageSize()` above) — no code copied from any fork. Silent on failure: falls back to a
     *  `fontHeight`×`fontHeight` square so an unreachable/bad url never throws or blocks `.build()`. */
    static resolveLatexDimensions(url: any, fontHeight?: number): Promise<any>;
}
/**
 * Shared chaining base for Button/ButtonV2/Carousel/AIRich: title/subtitle/body/footer,
 * contextInfo (quoted/mentions/etc.), and an escape-hatch payload merged verbatim
 * into the generated message content.
 * @abstract
 */
export class BaseBuilder {
    _title: string;
    _subtitle: string;
    _body: string;
    _footer: string;
    _contextInfo: {};
    _extraPayload: {};
    /** @param {string} title */
    setTitle(title: string): this;
    /** @param {string} subtitle */
    setSubtitle(subtitle: string): this;
    /** @param {string} body Main message text. */
    setBody(body: string): this;
    /**
     * Vanz@Add (v2.1.3) --- mark Meta AI participant fbid(s) in `messageContextInfo.botMetadata.botGroupMetadata`
     * (+ `threadId: []`), as the official client does in groups that contain Meta AI. Optional; merges into any
     * messageContextInfo already placed in the extra payload. Pass nothing to clear.
     * @param {...string} fbids
     */
    setBotGroupParticipants(...fbids: string[]): this;
    /** @param {string} footer */
    setFooter(footer: string): this;
    /** @param {Record<string, any>} obj Raw `contextInfo` (quotedMessage, mentionedJid, etc.), merged verbatim. */
    setContextInfo(obj: Record<string, any>): this;
    /** Escape hatch: shallow-merge arbitrary keys into the generated message content, alongside whatever this builder produces. */
    addPayload(obj: any): this;
}
/** Tiny fluent helper for building a single quickReply button row (type 1). Standalone — not tied to Button/ButtonV2. */
export class RowBuilder {
    buttons: any[];
    button(displayText: any, buttonId: any): this;
}
export function extractIE(text: any, opts6?: { [key: string]: any; 
    extract?: boolean;
    hyperlink?: boolean;
    citation?: boolean;
    latex?: boolean;
    deeplink?: boolean;
}): {
    text: any;
    ie: any[];
    inline_entities: any[];
} | {
    text: string;
    ie: ({
        type: string;
        ie: {
            key: string;
            text: any;
            url: any;
            width: any;
            height: any;
            font_height: any;
            padding: any;
            is_trusted?: undefined;
            reference_id?: undefined;
        };
    } | {
        type: string;
        ie: {
            key: string;
            text: any;
            url: any;
            width?: undefined;
            height?: undefined;
            font_height?: undefined;
            padding?: undefined;
            is_trusted?: undefined;
            reference_id?: undefined;
        };
    } | {
        type: string;
        ie: {
            key: string;
            text: any;
            url: any;
            is_trusted: boolean;
            width?: undefined;
            height?: undefined;
            font_height?: undefined;
            padding?: undefined;
            reference_id?: undefined;
        };
    } | {
        type: string;
        ie: {
            reference_id: number;
            key: string;
            text: string;
            url: any;
            width?: undefined;
            height?: undefined;
            font_height?: undefined;
            padding?: undefined;
            is_trusted?: undefined;
        };
    })[];
    inline_entities: ({
        key: any;
        metadata: {
            display_name: any;
            is_trusted: any;
            url: any;
            __typename: string;
            deeplink_url?: undefined;
            text?: undefined;
            reference_id?: undefined;
            reference_url?: undefined;
            reference_title?: undefined;
            reference_display_name?: undefined;
            sources?: undefined;
            latex_expression?: undefined;
            latex_image?: undefined;
            font_height?: undefined;
            padding?: undefined;
        };
    } | {
        key: any;
        metadata: {
            deeplink_url: any;
            text: any;
            __typename: string;
            display_name?: undefined;
            is_trusted?: undefined;
            url?: undefined;
            reference_id?: undefined;
            reference_url?: undefined;
            reference_title?: undefined;
            reference_display_name?: undefined;
            sources?: undefined;
            latex_expression?: undefined;
            latex_image?: undefined;
            font_height?: undefined;
            padding?: undefined;
        };
    } | {
        key: any;
        metadata: {
            reference_id: any;
            reference_url: any;
            reference_title: any;
            reference_display_name: any;
            sources: any[];
            __typename: string;
            display_name?: undefined;
            is_trusted?: undefined;
            url?: undefined;
            deeplink_url?: undefined;
            text?: undefined;
            latex_expression?: undefined;
            latex_image?: undefined;
            font_height?: undefined;
            padding?: undefined;
        };
    } | {
        key: any;
        metadata: {
            latex_expression: any;
            latex_image: {
                url: any;
                width: number;
                height: number;
            };
            font_height: number;
            padding: number;
            __typename: string;
            display_name?: undefined;
            is_trusted?: undefined;
            url?: undefined;
            deeplink_url?: undefined;
            text?: undefined;
            reference_id?: undefined;
            reference_url?: undefined;
            reference_title?: undefined;
            reference_display_name?: undefined;
            sources?: undefined;
        };
    })[];
};
export function waitAllPromises(input: any): Promise<any>;
export function getSharp(): Promise<any>;
export function getFfmpeg(): Promise<any>;
import { generateWAMessageFromContent } from '../Utils/messages.js';
import { prepareWAMessageMedia } from '../Utils/messages.js';
import { generateMessageIDV2 } from '../Utils/generics.js';
import { botMetadataSignature } from '../Utils/rich-message-utils.js';
import { botMetadataCertificate } from '../Utils/rich-message-utils.js';
import { getBizBinaryNode } from '../WABinary/index.js';
export { generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, botMetadataSignature, botMetadataCertificate, getBizBinaryNode };
