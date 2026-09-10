import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';
class ButtonV3 extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket. */
	constructor(client) {
		super();
		if (!client) {
			throw new Error('Socket is required');
		}

		this.#client = client;
		this._data;
		this._mediaHeaderType = null;
		this._buttons = [];
	}

	/** Load an existing templateMessage (e.g. from a fetched/quoted message) for editing. */
	loadFrom(msg) {
		if (!msg) throw new Error('templateMessage needed');
		if (!msg.templateMessage) throw new Error('templateMessage not found');

		const { templateMessage, ...extraPayload } = msg;
		const hft = templateMessage.hydratedFourRowTemplate || {};

		this._title = hft.hydratedTitleText || '';
		this._body = hft.hydratedContentText || '';
		this._footer = hft.hydratedFooterText || '';
		this._contextInfo = templateMessage.contextInfo || {};
		this._extraPayload = extraPayload;

		this._buttons = Array.isArray(hft.hydratedButtons)
			? hft.hydratedButtons.map((button) => ({ ...button }))
			: [];

		if (hft.imageMessage) {
			this._data = { imageMessage: hft.imageMessage };
			this._mediaHeaderType = 'imageMessage';
		} else if (hft.videoMessage) {
			this._data = { videoMessage: hft.videoMessage };
			this._mediaHeaderType = 'videoMessage';
		} else if (hft.documentMessage) {
			this._data = { documentMessage: hft.documentMessage };
			this._mediaHeaderType = 'documentMessage';
		} else if (hft.locationMessage) {
			this._data = { locationMessage: hft.locationMessage };
			this._mediaHeaderType = 'locationMessage';
		} else {
			this._data = undefined;
			this._mediaHeaderType = null;
		}

		return this;
	}

	setImage(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		this._data = Buffer.isBuffer(path)
			? { image: path, ...options }
			: { image: { url: path }, ...options };
		this._mediaHeaderType = 'imageMessage';
		return this;
	}

	setVideo(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		this._data = Buffer.isBuffer(path)
			? { video: path, ...options }
			: { video: { url: path }, ...options };
		this._mediaHeaderType = 'videoMessage';
		return this;
	}

	setDocument(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		this._data = Buffer.isBuffer(path)
			? { document: path, ...options }
			: { document: { url: path }, ...options };
		this._mediaHeaderType = 'documentMessage';
		return this;
	}

	setMedia(obj) {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			throw new TypeError('Media must be a plain object');
		}
		this._data = obj;
		this._mediaHeaderType = null; // caller is expected to pass an already-resolved shape
		return this;
	}

	clearButtons() {
		this._buttons = [];
		return this;
	}

	addButton(hydratedButton) {
		if (this._buttons.length >= 3) {
			throw new Error('ButtonV3 (TemplateMessage) supports a maximum of 3 buttons');
		}
		this._buttons.push({ index: this._buttons.length + 1, ...hydratedButton });
		return this;
	}

	addReply(display_text = '', id = '') {
		return this.addButton({
			quickReplyButton: { displayText: display_text, id },
		});
	}

	addUrl(display_text = '', url = '', options = {}) {
		return this.addButton({
			urlButton: { displayText: display_text, url, ...options },
		});
	}

	addCall(display_text = '', phone_number = '') {
		return this.addButton({
			callButton: { displayText: display_text, phoneNumber: phone_number },
		});
	}

	async toTemplate() {
		let mediaFields = {};

		if (this._data) {
			const alreadyResolved =
				this._data.imageMessage || this._data.videoMessage ||
				this._data.documentMessage || this._data.locationMessage;

			mediaFields = alreadyResolved
				? this._data
				: await prepareWAMessageMedia(this._data, {
						upload: this.#client.waUploadToServer,
					}).catch((e) => {
						if (String(e).includes('Invalid media type')) return this._data;
						throw e;
					});
		} else if (this._title) {
			mediaFields = { hydratedTitleText: this._title };
		}

		return {
			hydratedContentText: this._body,
			hydratedFooterText: this._footer,
			hydratedButtons: this._buttons,
			...mediaFields,
		};
	}

	async build(jid, { messageId, ...options } = {}) {
		const hydratedFourRowTemplate = await this.toTemplate();

		return generateWAMessageFromContent(
			jid,
			{
				...this._extraPayload,
				templateMessage: {
					hydratedFourRowTemplate,
					contextInfo: this._contextInfo,
				},
			},
			{ messageId: messageId || generateMessageIDV2(), ...options },
		);
	}

	async send(jid, { messageId, additionalNodes = [], ...options } = {}) {
		if (this._buttons.length < 1)
			throw new Error('ButtonV3 requires at least one button');
		const msg = await this.build(jid, { messageId, ...options });

		// TemplateMessage predates the nativeFlow protocol and does not need the
		// "biz"/"native_flow" additionalNodes hack that Button/ButtonV2 use.
		await this.#client.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes,
			...options,
		});
		return msg;
	}
}

/** Carousel of interactive cards (each with its own header media + optional buttons), scrollable horizontally in-chat. */
export { ButtonV3 };
