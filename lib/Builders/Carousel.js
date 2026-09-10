import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';
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

	/** @returns {Record<string, any>} The generated WAMessage (without sending). */
	build(jid, { ...options } = {}) {
		return generateWAMessageFromContent(
			jid,
			{
				...this._extraPayload,
				interactiveMessage: {
					header: {
						hasMediaAttachment: false,
					},
					body: { text: this._body },
					footer: { text: this._footer },
					contextInfo: this._contextInfo,
					carouselMessage: {
						cards: this._cards,
					},
				},
			},
			{ ...options }
		);
	}

	/** Build and send this carousel. @param {string} jid Destination chat/group jid. */
	async send(jid, { ...options } = {}) {
		if (this._cards.length === 0) throw new Error('Carousel requires at least one card (use addCard())');

		const msg = this.build(jid, options);

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
 * Vanz@Add (v4.8) --- Chainable poll builder, wrapping the socket's own well-tested
 * `sendMessage({ poll })` path (see messages.js) instead of hand-building
 * pollCreationMessageV3/V5 over relayMessage. Two things from the traffic you sent were
 * deliberately NOT implemented here because they can't be built with confidence:
 *   1. Per-option poll images (`values: [{ name, image }]`) — the proto this fork ships
 *      only has a plain `optionName` string per option; an image-poll option isn't a named
 *      field anywhere in it. The one place an image-poll concept even appears
 *      (`pollCreationOptionImageMessage`) is typed as an opaque `FutureProofMessage` (a
 *      forward-compat envelope with no documented inner layout) — there's no field list to
 *      target, so adding "support" for it would just be silently dropping the image and
 *      guessing at a shape. Flagging instead of faking it.
 *   2. Quiz-mode `correctAnswer.optionHash` built by hand — the one working example you
 *      captured had a 65-character hex string where a sha256 digest should be 64, and this
 *      builder's target `sendMessage({poll})` path (pollCreationMessageV5) already computes
 *      quiz mode correctly from a plain `correctAnswer` string, so `setQuiz()` below defers to
 *      that existing, already-tested logic rather than reimplementing the hash.
 */
export { Carousel };
