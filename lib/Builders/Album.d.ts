/**
 * Vanz@Add (v2.1.2) --- Chainable album builder (2..10 images/videos sent as one WhatsApp album).
 * Wraps the socket's own `sendAlbumMessage()` (falls back to `sendMessage({ album })`), so the
 * upload / parent-child association logic lives in exactly one place (Socket/messages-send.js).
 *
 *   const res = await new Album(sock)
 *     .addImage({ url: 'https://…/a.jpg' }, 'caption 1')
 *     .addVideo(buffer, 'caption 2')
 *     .setCaption('whole-album caption')   // AlbumMessage.caption — client rendering unverified
 *     .setDelay(800)
 *     .send(jid, { quoted: m });
 *   res.albumItems   // the sent child messages
 */
export class Album extends BaseBuilder {
    static get MAX_ITEMS(): number;
    /** @param {object} client Active socket (needs `sendAlbumMessage` or `sendMessage`). */
    constructor(client: object);
    _items: any[];
    _caption: string;
    _delayMs: any;
    _continueOnError: boolean;
    /** @param {Buffer|{url:string}|{stream:any}} source @param {string} [caption] @param {object} [extra] e.g. { mimetype, mentions } */
    addImage(source: Buffer | {
        url: string;
    } | {
        stream: any;
    }, caption?: string, extra?: object): this;
    /** @param {Buffer|{url:string}|{stream:any}} source @param {string} [caption] @param {object} [extra] e.g. { gifPlayback, mimetype } */
    addVideo(source: Buffer | {
        url: string;
    } | {
        stream: any;
    }, caption?: string, extra?: object): this;
    /** Add several ready `{ image|video, caption? }` items at once. */
    addMany(items: any): this;
    /** Caption for the album as a whole (AlbumMessage.caption). */
    setCaption(caption: any): this;
    /** Delay between children in ms (default: socket `albumDelayMs`, 1500). */
    setDelay(ms: any): this;
    /** Keep sending the remaining items if one fails (failures land on `result.albumErrors`). */
    setContinueOnError(v?: boolean): this;
    /** @returns {{ album: object[], caption?: string }} the `sendMessage()`-shaped payload, without sending it. */
    build(): {
        album: object[];
        caption?: string;
    };
    /** Build and send. @returns {Promise<object>} parent album message (`.albumItems` = sent children) */
    send(jid: any, options?: {}): Promise<object>;
    #private;
}
import { BaseBuilder } from './shared.js';
