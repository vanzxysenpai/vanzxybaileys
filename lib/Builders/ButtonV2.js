import { BaseBuilder, Toolkit, RowBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';
class ButtonV2 extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket. */
	constructor(client) {
		super();
		if (!client) {
			throw new Error('Socket is required');
		}

		this.#client = client;
		this._image;
		this._data;
		this._buttons = [];
	}

	/** Add a simple quick-reply button. @param {string} displayText Label. @param {string} [buttonId] Defaults to a random uuid. */
	addButton(displayText = '', buttonId = crypto.randomUUID()) {
		if (!displayText) throw new TypeError('addButton(displayText) requires a non-empty label');
		this._buttons.push({
			buttonId,
			buttonText: { displayText },
			type: 1,
		});
		return this;
	}

	/** Push a raw pre-built button object, bypassing the `addButton()` shorthand. */
	addRawButton(obj) {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			throw new TypeError('Buttons must be a plain object');
		}

		this._buttons.push(obj);
		return this;
	}

	/** Set the header thumbnail (used as a fallback location-header image when no `setMedia()` header is given). */
	setThumbnail(path) {
		if (!path) throw new Error('Url or buffer needed');
		this._image = path;
		return this;
	}

	/** Set a raw pre-built header media object for the buttons message. */
	setMedia(obj) {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			throw new TypeError('Media must be a plain object');
		}

		this._data = obj;
		return this;
	}

	/** Alias for addButton() — shorthand parity with RowBuilder#button(). */
	button(displayText, buttonId) {
		return this.addButton(displayText, buttonId);
	}

	/**
	 * Vanz@Add 29-08-26 --- Fluent row helper ported from the RowBuilder class (already
	 * present but previously unwired into ButtonV2). Lets callers group buttons via a
	 * callback instead of chaining addButton() calls one at a time.
	 * @param {(row: RowBuilder) => void} cb
	 */
	row(cb) {
		const r = new RowBuilder();
		cb(r);
		r.buttons.forEach((b) => this._buttons.push(b));
		return this;
	}

	// Vanz@Fix 22-08-26 (v4.7) --- _thumbnail was computed unconditionally (fetch + resize) even
	// when setMedia() is used, in which case the location-fallback header (the only place
	// _thumbnail is used) never runs at all — wasted network/CPU work on every build() call.
	// Now only computed when it'll actually be used. Also: `viewOnce` was hardcoded true with no
	// way to opt out (kept as the default — some clients need it to render legacy buttonsMessage
	// at all — but it's now a `{ viewOnce = true }` option instead of a hardcoded literal).
	/** @returns {Promise<Record<string, any>>} The generated WAMessage (without sending). @param {boolean} [viewOnce] Default true — some clients require this for legacy buttonsMessage to render; pass false to send it as a normal (non-disappearing) message. */
	async build(jid, { viewOnce = true, ...options } = {}) {
		const _thumbnail = !this._data && this._image ? await Toolkit.resize(Buffer.isBuffer(this._image) ? this._image : await Toolkit.fetchBuffer(this._image, {}, { silent: true }), 300, 300) : null;
		const msg = generateWAMessageFromContent(
			jid,
			{
				...this._extraPayload,
				buttonsMessage: {
					contentText: this._body,
					footerText: this._footer,
					...(this._data
						? this._data
						: {
								headerType: 6,
								locationMessage: {
									degreesLatitude: 0,
									degreesLongitude: 0,
									name: this._title,
									address: this._subtitle,
									jpegThumbnail: _thumbnail,
								},
							}),
					viewOnce,
					contextInfo: this._contextInfo,
					buttons: [...this._buttons],
				},
			},
			{ ...options }
		);
		return msg;
	}

	/** Build and send this buttons message. @param {string} jid Destination chat/group jid. */
	async send(jid, { ...options } = {}) {
		if (this._buttons.length < 1) throw new Error('ButtonV2 requires at least one button');
		const msg = await this.build(jid, options);

		await this.#client.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes: [
				{
					tag: 'biz',
					attrs: {},
					content: [
						{
							tag: 'interactive',
							attrs: { type: 'native_flow', v: '1' },
							content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }],
						},
					],
				},
			],
			...options,
		});
		return msg;
	}
}

/**
 * Legacy `templateMessage` / `hydratedFourRowTemplate` builder — WA's Generation-1
 * button protocol (predates the nativeFlow format that Button/ButtonV2 use).
 * Capped at 3 buttons (quickReply/url/call only), no interactive list/flow support.
 * Ported from MessageBuilderV4.7.
 */
export { ButtonV2 };
