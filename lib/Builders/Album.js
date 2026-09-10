import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';

/**
 * Album/media-group builder — bundles 2+ images/videos into one WhatsApp
 * album. Fully handled by the existing `content.album` shorthand at the
 * socket layer (see Socket/messages-send.js, `if ('album' in content)`):
 * it sends the `albumMessage` cover then each item as a linked follow-up
 * with a configurable delay, so this builder only needs to shape the array.
 */
class Album extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket (must expose `sendMessage`). */
	constructor(client) {
		super();
		if (!client) throw new Error('Socket is required');
		this.#client = client;

		this._items = [];
		this._delayMs;
	}

	/** Append an image. @param {string|Buffer} path Url or buffer. */
	addImage(path, { caption, ...options } = {}) {
		if (!path) throw new Error('Url or buffer needed');
		const image = Buffer.isBuffer(path) ? path : { url: path };
		this._items.push({ image, ...(caption !== undefined && { caption }), ...options });
		return this;
	}

	/** Append a video. @param {string|Buffer} path Url or buffer. */
	addVideo(path, { caption, ...options } = {}) {
		if (!path) throw new Error('Url or buffer needed');
		const video = Buffer.isBuffer(path) ? path : { url: path };
		this._items.push({ video, ...(caption !== undefined && { caption }), ...options });
		return this;
	}

	/** Append several images/videos at once, in `{image|video, caption?}` shape (bypasses addImage()/addVideo()'s shorthand). */
	addItems(items) {
		if (!Array.isArray(items) || !items.length) throw new TypeError('addItems(items) requires a non-empty array');
		items.forEach((item) => this._items.push(item));
		return this;
	}

	/** Remove every item added so far. */
	clearItems() {
		this._items = [];
		return this;
	}

	/** Delay in ms between each follow-up item after the album cover (default: `config.albumDelayMs` or 1500ms). */
	setDelay(ms) {
		if (typeof ms !== 'number' || ms < 0) throw new TypeError('setDelay(ms) requires a non-negative number');
		this._delayMs = ms;
		return this;
	}

	/** @returns {{album: Record<string, any>[]}} The `sendMessage()`-shaped payload, without sending it. */
	build() {
		if (this._items.length < 2) throw new Error('Album requires at least 2 items (use addImage()/addVideo(), images+videos combined)');
		return { album: this._items };
	}

	/** Build and send via the socket's `sendMessage()`. */
	async send(jid, options = {}) {
		return this.#client.sendMessage(jid, this.build(), { ...(this._delayMs !== undefined && { delayMs: this._delayMs }), ...options });
	}
}

export { Album };
