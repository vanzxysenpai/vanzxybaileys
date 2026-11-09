import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, getBizBinaryNode, crypto } from './shared.js';
/** Carousel of interactive cards (each with its own header media + optional buttons), scrollable horizontally in-chat. */
class Carousel extends BaseBuilder {
	#client;

	// Vanz@Add 22-08-26 (v4.7) --- WhatsApp caps carousels at 10 cards; anything beyond
	// that is silently truncated client-side, so failing fast here is more useful than
	// shipping a carousel that quietly loses cards.
	static MAX_CARDS = 10;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket. */
	constructor(client) {
		super();
		if (!client) {
			throw new Error('Socket is required');
		}

		this.#client = client;
		this._cards = [];
	}

	// Vanz@Add (v4.9.6) --- ported from temen's MessageBuilderV4.7 (Carousel.loadFrom); `_cards`
	// matches 1:1, straight port.
	/**
	 * Reconstruct this builder's state from an already-built/sent carousel interactiveMessage.
	 * @param {object} msg A raw message object containing `interactiveMessage` (e.g. `oldMsg.message`).
	 */
	loadFrom(msg) {
		if (!msg) throw new Error('loadFrom(msg): interactiveMessage needed');
		if (!msg.interactiveMessage) throw new Error('loadFrom(msg): interactiveMessage not found');

		const { interactiveMessage, ...extraPayload } = msg;
		const iM = interactiveMessage;
		const carousel = iM.carouselMessage || {};

		this._body = iM.body?.text || '';
		this._footer = iM.footer?.text || '';
		this._contextInfo = iM.contextInfo || {};
		this._extraPayload = extraPayload;

		this._cards = Array.isArray(carousel.cards)
			? carousel.cards.map((card) => ({
					...card,
					header: {
						...(card.header || {}),
						hasMediaAttachment: !!card.header?.hasMediaAttachment,
						...(card.header?.imageMessage ? { imageMessage: card.header.imageMessage } : {}),
						...(card.header?.videoMessage ? { videoMessage: card.header.videoMessage } : {}),
					},
					body: { text: card.body?.text || '' },
					footer: { text: card.footer?.text || '' },
					nativeFlowMessage: {
						...(card.nativeFlowMessage || {}),
						buttons: Array.isArray(card.nativeFlowMessage?.buttons)
							? card.nativeFlowMessage.buttons.map((button) => ({
									...button,
									buttonParamsJson: typeof button.buttonParamsJson === 'string' ? button.buttonParamsJson : JSON.stringify(button.buttonParamsJson || {}),
								}))
							: [],
						messageParamsJson:
							typeof card.nativeFlowMessage?.messageParamsJson === 'string' ? card.nativeFlowMessage.messageParamsJson : JSON.stringify(card.nativeFlowMessage?.messageParamsJson || {}),
					},
				}))
			: [];

		return this;
	}

	/**
	 * Add one card, or an array of cards, to the carousel.
	 * @param {Record<string, any>|Record<string, any>[]} card A card (or array of cards) with `header.hasMediaAttachment: true`
	 *   — typically built via `new Button(client).setImage(...).addUrl(...).toCard()`.
	 */
	addCard(card) {
		const cards = Array.isArray(card) ? card : [card];
		const baseIndex = this._cards.length;

		for (const [index, c] of cards.entries()) {
			if (!c?.header?.hasMediaAttachment) {
				throw new Error(`Card [${baseIndex + index}] must include an image or video in header`);
			}
		}

		if (this._cards.length + cards.length > Carousel.MAX_CARDS) {
			throw new Error(`Carousel supports at most ${Carousel.MAX_CARDS} cards (got ${this._cards.length + cards.length})`);
		}

		this._cards.push(...cards);
		return this;
	}

	/** Remove every card added so far. Vanz@Add (v2.1.13, ported from betton). */
	clearCards() {
		this._cards = [];
		return this;
	}

	/** Number of cards currently in the carousel. Vanz@Add (v2.1.13, ported from betton). */
	get cardCount() {
		return this._cards.length;
	}

	/**
	 * Build one card straight from an image/video url or Buffer (media uploaded here) -- no `Button` instance needed.
	 * Vanz@Add (v2.1.13, ported from betton Carousel.makeCard). Pass the result to `addCard()`.
	 * @param {{image?: string|Buffer, video?: string|Buffer, gifPlayback?: boolean, body?: string, footer?: string, title?: string, subtitle?: string,
	 *   buttons?: Array<{name: string, params?: any, buttonParamsJson?: string}>, params?: string|object}} card
	 */
	async makeCard({ image, video, gifPlayback = false, body = '', footer = '', title = '', subtitle = '', buttons = [], params } = {}) {
		if (!image && !video) throw new Error('makeCard needs an image or video');
		const source = image ? { image: Buffer.isBuffer(image) ? image : { url: image } } : { video: Buffer.isBuffer(video) ? video : { url: video } };
		let media = await prepareWAMessageMedia(source, { upload: this.#client.waUploadToServer });
		if (gifPlayback && media.videoMessage) media = { ...media, videoMessage: { ...media.videoMessage, gifPlayback: true } };
		return {
			header: { hasMediaAttachment: true, title, subtitle, ...media },
			body: { text: body },
			footer: { text: footer },
			nativeFlowMessage: {
				...(params ? { messageParamsJson: typeof params === 'string' ? params : JSON.stringify(params) } : {}),
				buttons: buttons.map((b) => ({ name: b.name, buttonParamsJson: b.buttonParamsJson ?? (typeof b.params === 'string' ? b.params : JSON.stringify(b.params ?? {})) })),
			},
		};
	}

	/** @returns {Record<string, any>} The generated WAMessage (without sending). */
	build(jid, { ...options } = {}) {
		return generateWAMessageFromContent(
			jid,
			{
				...this._extraPayload,
				interactiveMessage: {
					header: {
						hasMediaAttachment: false,
						...(this._title ? { title: this._title } : {}),
						...(this._subtitle ? { subtitle: this._subtitle } : {}),
					},
					body: { text: this._body },
					footer: { text: this._footer },
					contextInfo: this._contextInfo,
					carouselMessage: {
						...(this._params && Object.keys(this._params).length ? { messageParamsJson: JSON.stringify(this._params) } : {}),
						cards: this._cards,
					},
				},
			},
			{ ...options }
		);
	}

	// Vanz@Fix (Carousel-per-card-flow) --- this used to always hardcode a plain <biz><interactive
	// v='1'><native_flow v='9' name='mixed'/></interactive></biz> node regardless of what buttons
	// the cards actually contained -- unlike Button.send(), which already delegates to the shared
	// getBizBinaryNode() so a special native-flow button (cta_catalog, payment_key_info, ...) gets
	// its own dedicated node. That meant the exact same card content rendered differently (and
	// worse -- generic mixed, missing actual_actors/host_storage/privacy_mode_ts/quality_control)
	// depending on whether it was sent via Carousel.send() or wrapped some other way. Now delegates
	// to getBizBinaryNode() (extended to read carouselMessage.cards[0] -- see that function's own
	// comment), so this stays in sync with every other send path automatically instead of needing
	// its own copy of the routing table.
	/** Build and send this carousel. @param {string} jid Destination chat/group jid. */
	async send(jid, { ...options } = {}) {
		if (this._cards.length === 0) throw new Error('Carousel requires at least one card (use addCard())');

		const msg = this.build(jid, options);
		const bizNode = getBizBinaryNode(msg.message);

		await this.#client.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes: [bizNode],
			...options,
		});
		return msg;
	}
}

export { Carousel };
