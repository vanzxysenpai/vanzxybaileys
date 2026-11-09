/**
 * `buttonsMessage` builder (nativeFlowInfo-based buttons under a media/location header, or
 * a raw pre-built header via `setMedia()`). Distinct from `Button` (interactiveMessage/nativeFlow)
 * and `ButtonV3` (legacy templateMessage) — see those classes for the other two button protocols.
 */
export class ButtonV2 extends BaseBuilder {
    /** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket. */
    constructor(client: any);
    _image: any;
    _data: any;
    _buttons: any[];
    /**
     * Reconstruct this builder's state from an already-built/sent buttonsMessage.
     * @param {object} msg A raw message object containing `buttonsMessage` (e.g. `oldMsg.message`).
     */
    loadFrom(msg: object): this;
    /** Add a simple quick-reply button. @param {string} displayText Label. @param {string} [buttonId] Defaults to a random uuid. */
    addButton(displayText?: string, buttonId?: string): this;
    /** Push a raw pre-built button object, bypassing the `addButton()` shorthand. */
    addRawButton(obj: any): this;
    /** Set the header thumbnail (used as a fallback location-header image when no `setMedia()` header is given). */
    setThumbnail(path: any): this;
    /** Set a raw pre-built header media object for the buttons message. */
    setMedia(obj: any): this;
    /** Alias for addButton() — shorthand parity with RowBuilder#button(). */
    button(displayText: any, buttonId: any): this;
    /**
     * Vanz@Add 29-08-26 --- Fluent row helper ported from the RowBuilder class (already
     * present but previously unwired into ButtonV2). Lets callers group buttons via a
     * callback instead of chaining addButton() calls one at a time.
     * @param {(row: RowBuilder) => void} cb
     */
    row(cb: (row: RowBuilder) => void): this;
    /** @returns {Promise<Record<string, any>>} The generated WAMessage (without sending). @param {boolean} [viewOnce] Default true — some clients require this for legacy buttonsMessage to render; pass false to send it as a normal (non-disappearing) message. */
    build(jid: any, opts1?: { [key: string]: any; 
        viewOnce?: boolean;
    }): Promise<Record<string, any>>;
    /** Build and send this buttons message. @param {string} jid Destination chat/group jid. */
    send(jid: string, opts2?: { [key: string]: any; }): Promise<Record<string, any>>;
    #private;
}
import { BaseBuilder } from './shared.js';
import { RowBuilder } from './shared.js';
