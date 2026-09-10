import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';

/**
 * Interactive/nativeFlow message builder — the modern replacement for the legacy
 * hydrated-template buttons in `ButtonV3`. Produces the `interactiveMessage` shape
 * (`cta_url`, `cta_copy`, `cta_call`, `quick_reply`, `single_select`) that
 * `generateWAMessageContent` already understands via the `message.nativeFlow`
 * shorthand (see Utils/messages.js, `hasNonNullishProperty(message, 'nativeFlow')`).
 */
class NativeFlow extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket (must expose `sendMessage`). */
	constructor(client) {
		super();
		if (!client) throw new Error('Socket is required');
		this.#client = client;

		this._buttons = [];
		this._text;
		this._caption;
		this._title;
		this._subtitle;
		this._footer;
		this._audioFooter;
		this._thumbnail;
		this._media;
		this._offer;
		this._optionTitle;
		this._optionText;
		this._bizJid;
		this._shopSurface;
	}

	/** Plain text body (no header). Mutually exclusive with `setCaption()`. */
	setText(text) {
		if (typeof text !== 'string' || !text) throw new TypeError('setText(text) requires a non-empty string');
		this._text = text;
		return this;
	}

	/** Body text shown together with a media/title header — pair with `setHeader()` and/or `setImage()/setVideo()/setDocument()`. */
	setCaption(caption) {
		if (typeof caption !== 'string' || !caption) throw new TypeError('setCaption(caption) requires a non-empty string');
		this._caption = caption;
		return this;
	}

	/** Header title/subtitle shown above the caption. Requires a media header (see `setImage()` etc.) or leave media unset for a text-only header. */
	setHeader(title = '', subtitle = '') {
		this._title = title;
		this._subtitle = subtitle;
		return this;
	}

	/** Footer text under the buttons. Mutually exclusive with `setAudioFooter()`. */
	setFooter(text) {
		this._footer = text;
		return this;
	}

	/** Voice-note footer instead of text. @param {string|Buffer} path Url or buffer. */
	setAudioFooter(path) {
		if (!path) throw new Error('Url or buffer needed');
		this._audioFooter = path;
		return this;
	}

	/** Raw jpeg thumbnail bytes for the header (used when the header media itself isn't re-uploaded). */
	setThumbnail(buffer) {
		this._thumbnail = buffer;
		return this;
	}

	/** Attach an image as the header. @param {string|Buffer} path Url or buffer. */
	setImage(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		this._media = Buffer.isBuffer(path) ? { image: path, ...options } : { image: { url: path }, ...options };
		return this;
	}

	/** Attach a video as the header. @param {string|Buffer} path Url or buffer. */
	setVideo(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		this._media = Buffer.isBuffer(path) ? { video: path, ...options } : { video: { url: path }, ...options };
		return this;
	}

	/** Attach a document as the header. @param {string|Buffer} path Url or buffer. */
	setDocument(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		this._media = Buffer.isBuffer(path) ? { document: path, ...options } : { document: { url: path }, ...options };
		return this;
	}

	/** Set a raw pre-built header media object (bypasses setImage/setVideo/setDocument shorthands). */
	setMedia(obj) {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) throw new TypeError('Media must be a plain object');
		this._media = obj;
		return this;
	}

	/** Remove every button added so far (keeps text/header/footer/media). */
	clearButtons() {
		this._buttons = [];
		return this;
	}

	/** `quick_reply` button — fires a regular button-response callback. */
	addQuickReply(displayText, id = crypto.randomUUID(), { icon } = {}) {
		if (typeof displayText !== 'string' || !displayText) throw new TypeError('addQuickReply(displayText, id) requires a non-empty displayText');
		this._buttons.push({ text: displayText, id, icon });
		return this;
	}

	/** `cta_url` button — opens a link, optionally inside WhatsApp's in-app webview. */
	addUrl(displayText, url, { useWebview = false, icon } = {}) {
		if (typeof url !== 'string' || !url) throw new TypeError('addUrl(displayText, url) requires a non-empty url');
		this._buttons.push({ text: displayText, url, useWebview, icon });
		return this;
	}

	/** `cta_copy` button — copies text/code to the recipient's clipboard. */
	addCopy(displayText, copyCode, { icon } = {}) {
		if (typeof copyCode !== 'string' || !copyCode) throw new TypeError('addCopy(displayText, copyCode) requires a non-empty copyCode');
		this._buttons.push({ text: displayText, copy: copyCode, icon });
		return this;
	}

	/** `cta_call` button — dials a phone number. */
	addCall(displayText, phoneNumber, { icon } = {}) {
		if (typeof phoneNumber !== 'string' || !phoneNumber) throw new TypeError('addCall(displayText, phoneNumber) requires a non-empty phoneNumber');
		this._buttons.push({ text: displayText, call: phoneNumber, icon });
		return this;
	}

	/**
	 * `single_select` button — opens a list picker.
	 * @param {string} title Text shown on the button that opens the list.
	 * @param {{title: string, rows: {title: string, description?: string, id: string}[]}[]} sections
	 */
	addSingleSelect(title, sections) {
		if (typeof title !== 'string' || !title) throw new TypeError('addSingleSelect(title, sections) requires a non-empty title');
		if (!Array.isArray(sections) || !sections.length) throw new TypeError('addSingleSelect(title, sections) requires a non-empty sections array');
		this._buttons.push({ text: title, sections });
		return this;
	}

	/** Append a raw pre-built button object (bypasses the add*() shorthands). */
	addRawButton(obj) {
		if (typeof obj !== 'object' || obj === null) throw new TypeError('addRawButton(obj) requires a plain object');
		this._buttons.push(obj);
		return this;
	}

	/** Attach the "limited time offer" banner above the buttons. */
	setOffer({ text, url, code, expiration } = {}) {
		this._offer = { text, url, code, expiration };
		return this;
	}

	/** Collapse buttons beyond the in-thread limit into a "..." bottom-sheet menu. */
	setOptionsMenu(buttonText, title = '📄 Select Options') {
		if (typeof buttonText !== 'string' || !buttonText) throw new TypeError('setOptionsMenu(buttonText) requires a non-empty string');
		this._optionText = buttonText;
		this._optionTitle = title;
		return this;
	}

	/** Mark this as a catalog/collection-backed message tied to a business JID. */
	setBizJid(jid) {
		this._bizJid = jid;
		return this;
	}

	/** Mark this as a shop-storefront-backed message. */
	setShopSurface(surface) {
		this._shopSurface = surface;
		return this;
	}

	/** @returns {Record<string, any>} The `sendMessage()`-shaped payload, without sending it. */
	build() {
		if (!this._text && !this._caption) throw new Error('NativeFlow requires setText() or setCaption()');
		if (!this._buttons.length) throw new Error('NativeFlow requires at least one button (addUrl()/addCopy()/addCall()/addQuickReply()/addSingleSelect())');
		if (this._caption && this._media === undefined && !this._title && !this._subtitle) {
			throw new Error('setCaption() requires setHeader() and/or a media header (setImage()/setVideo()/setDocument())');
		}

		return {
			...(this._media || {}),
			...(this._text ? { text: this._text } : { caption: this._caption, title: this._title, subtitle: this._subtitle }),
			...(this._footer !== undefined && { footer: this._footer }),
			...(this._audioFooter !== undefined && { audioFooter: this._audioFooter }),
			...(this._thumbnail !== undefined && { thumbnail: this._thumbnail }),
			...(this._offer && { offerText: this._offer.text, offerUrl: this._offer.url, offerCode: this._offer.code, offerExpiration: this._offer.expiration }),
			...(this._optionText !== undefined && { optionText: this._optionText, optionTitle: this._optionTitle }),
			...(this._bizJid !== undefined && { bizJid: this._bizJid }),
			...(this._shopSurface !== undefined && { shopSurface: this._shopSurface }),
			nativeFlow: this._buttons,
		};
	}

	/** Build and send via the socket's `sendMessage()`. */
	async send(jid, options = {}) {
		return this.#client.sendMessage(jid, this.build(), options);
	}
}

export { NativeFlow };
