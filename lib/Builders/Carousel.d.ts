/** Carousel of interactive cards (each with its own header media + optional buttons), scrollable horizontally in-chat. */
export class Carousel extends BaseBuilder {
    static MAX_CARDS: number;
    /** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket. */
    constructor(client: any);
    _cards: any[];
    /**
     * Reconstruct this builder's state from an already-built/sent carousel interactiveMessage.
     * @param {object} msg A raw message object containing `interactiveMessage` (e.g. `oldMsg.message`).
     */
    loadFrom(msg: object): this;
    /**
     * Add one card, or an array of cards, to the carousel.
     * @param {Record<string, any>|Record<string, any>[]} card A card (or array of cards) with `header.hasMediaAttachment: true`
     *   — typically built via `new Button(client).setImage(...).addUrl(...).toCard()`.
     */
    addCard(card: Record<string, any> | Record<string, any>[]): this;
    /** Remove every card added so far. Vanz@Add (v2.1.13, ported from betton). */
    clearCards(): this;
    /** Number of cards currently in the carousel. Vanz@Add (v2.1.13, ported from betton). */
    get cardCount(): number;
    /**
     * Build one card straight from an image/video url or Buffer (media uploaded here) -- no `Button` instance needed.
     * Vanz@Add (v2.1.13, ported from betton Carousel.makeCard). Pass the result to `addCard()`.
     * @param {{image?: string|Buffer, video?: string|Buffer, gifPlayback?: boolean, body?: string, footer?: string, title?: string, subtitle?: string,
     *   buttons?: Array<{name: string, params?: any, buttonParamsJson?: string}>, params?: string|object}} card
     */
    makeCard(opts3?: { [key: string]: any; 
        image?: string | Buffer;
        video?: string | Buffer;
        gifPlayback?: boolean;
        body?: string;
        footer?: string;
        title?: string;
        subtitle?: string;
        buttons?: Array<{
            name: string;
            params?: any;
            buttonParamsJson?: string;
        }>;
        params?: string | object;
    }): Promise<{
        header: {
            hasMediaAttachment: boolean;
            title: string;
            subtitle: string;
        };
        body: {
            text: string;
        };
        footer: {
            text: string;
        };
        nativeFlowMessage: {
            buttons: {
                name: string;
                buttonParamsJson: string;
            }[];
            messageParamsJson?: string;
        };
    }>;
    /** @returns {Record<string, any>} The generated WAMessage (without sending). */
    build(jid: any, opts1?: { [key: string]: any; }): Record<string, any>;
    /** Build and send this carousel. @param {string} jid Destination chat/group jid. */
    send(jid: string, opts2?: { [key: string]: any; }): Promise<Record<string, any>>;
    #private;
}
import { BaseBuilder } from './shared.js';
