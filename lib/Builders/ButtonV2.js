import { BaseBuilder, Toolkit, RowBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, getBizBinaryNode, crypto } from './shared.js';
/**
 * `buttonsMessage` builder (nativeFlowInfo-based buttons under a media/location header, or
 * a raw pre-built header via `setMedia()`). Distinct from `Button` (interactiveMessage/nativeFlow)
 * and `ButtonV3` (legacy templateMessage) — see those classes for the other two button protocols.
 */
class ButtonV2 extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket. */
	constructor(client) {
		super();
		if (!client) {
			throw new Error('Socket is required');
		}

		this.#client = client;
		this._image = null;
		this._data = null;
		this._buttons = [];
	}

	// Vanz@Add (v4.9.6) --- ported from temen's MessageBuilderV4.7 (ButtonV2.loadFrom); fields match
	// 1:1 (_image/_data/_buttons). Dropped two no-op branches from the reference (reassigning
	// `undefined` to `this._image` in cases it was already falsy) — dead code, no behavior change.
	/**
	 * Reconstruct this builder's state from an already-built/sent buttonsMessage.
	 * @param {object} msg A raw message object containing `buttonsMessage` (e.g. `oldMsg.message`).
	 */
	loadFrom(msg) {
		if (!msg) throw new Error('loadFrom(msg): buttonsMessage needed');
		if (!msg.buttonsMessage) throw new Error('loadFrom(msg): buttonsMessage not found');

		const { buttonsMessage, ...extraPayload } = msg;
		const bM = buttonsMessage;
		const location = bM.locationMessage || {};

		this._title = location.name || '';
		this._subtitle = location.address || '';
		this._body = bM.contentText || '';
		this._footer = bM.footerText || '';
		this._contextInfo = bM.contextInfo || {};
		this._extraPayload = extraPayload;

		this._buttons = Array.isArray(bM.buttons)
			? bM.buttons.map((button) => ({
					...button,
					...(button.nativeFlowInfo
						? {
								nativeFlowInfo: {
									...button.nativeFlowInfo,
									paramsJson: typeof button.nativeFlowInfo.paramsJson === 'string' ? button.nativeFlowInfo.paramsJson : JSON.stringify(button.nativeFlowInfo.paramsJson || {}),
								},
							}
						: {}),
				}))
			: [];

		this._image = location.jpegThumbnail || null;

		this._data = Object.keys(bM).reduce((data, key) => {
			if (!['contentText', 'footerText', 'contextInfo', 'buttons', 'headerType', 'locationMessage', 'viewOnce'].includes(key)) {
				data[key] = bM[key];
			}
			return data;
		}, {});

		if (!Object.keys(this._data).length) {
			this._data = null;
		}

		return this;
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

	// Vanz@Fix (render audit round 5) --- same failure mode Button.send() was already fixed for
	// ("Vanz@Fix 27-08-26: delegate the <biz> node to the shared getBizBinaryNode() helper instead
	// of hand-rolling one here") and Carousel.send() was just fixed for too, but this file never
	// got the same treatment: the hardcoded node here had `attrs: {}` -- missing
	// actual_actors/host_storage/privacy_mode_ts, which shared.js's own getBizBinaryNode() import
	// comment says "real client traffic ... always carries [these] on every <biz> node" -- and no
	// quality_control content at all. Delegating instead of hand-rolling also means a buttonsMessage
	// automatically benefits from any future getBizBinaryNode() fix without needing a fourth
	// hand-rolled copy found later.
	/** Build and send this buttons message. @param {string} jid Destination chat/group jid. */
	async send(jid, { ...options } = {}) {
		if (this._buttons.length < 1) throw new Error('ButtonV2 requires at least one button');
		const msg = await this.build(jid, options);
		const bizNode = getBizBinaryNode(msg.message);

		await this.#client.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes: [bizNode],
			...options,
		});
		return msg;
	}
}

export { ButtonV2 };
