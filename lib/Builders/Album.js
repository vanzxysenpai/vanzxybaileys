import { BaseBuilder } from './shared.js';

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
class Album extends BaseBuilder {
	#client;

	/** @param {object} client Active socket (needs `sendAlbumMessage` or `sendMessage`). */
	constructor(client) {
		super();
		if (!client || (typeof client.sendAlbumMessage !== 'function' && typeof client.sendMessage !== 'function')) {
			throw new Error('Socket is required');
		}
		this.#client = client;
		this._items = [];
		this._caption = '';
		this._delayMs = undefined;
		this._continueOnError = false;
	}

	static get MAX_ITEMS() { return 10; }

	#push(kind, source, caption, extra) {
		if (!source) throw new TypeError(`add${kind === 'image' ? 'Image' : 'Video'}(source) requires a Buffer, { url } or { stream }`);
		if (this._items.length >= Album.MAX_ITEMS) throw new RangeError(`An album holds at most ${Album.MAX_ITEMS} media`);
		this._items.push({ [kind]: source, ...(caption ? { caption: String(caption) } : {}), ...extra });
		return this;
	}

	/** @param {Buffer|{url:string}|{stream:any}} source @param {string} [caption] @param {object} [extra] e.g. { mimetype, mentions } */
	addImage(source, caption, extra = {}) { return this.#push('image', source, caption, extra); }

	/** @param {Buffer|{url:string}|{stream:any}} source @param {string} [caption] @param {object} [extra] e.g. { gifPlayback, mimetype } */
	addVideo(source, caption, extra = {}) { return this.#push('video', source, caption, extra); }

	/** Add several ready `{ image|video, caption? }` items at once. */
	addMany(items) {
		if (!Array.isArray(items) || !items.length) throw new TypeError('addMany(items) requires a non-empty array');
		for (const it of items) {
			if (it?.image) this.#push('image', it.image, it.caption, Object.fromEntries(Object.entries(it).filter(([k]) => !['image', 'caption'].includes(k))));
			else if (it?.video) this.#push('video', it.video, it.caption, Object.fromEntries(Object.entries(it).filter(([k]) => !['video', 'caption'].includes(k))));
			else throw new TypeError('addMany(): every item needs an "image" or "video" property');
		}
		return this;
	}

	/** Caption for the album as a whole (AlbumMessage.caption). */
	setCaption(caption) {
		if (typeof caption !== 'string') throw new TypeError('Caption must be a string');
		this._caption = caption;
		return this;
	}

	/** Delay between children in ms (default: socket `albumDelayMs`, 1500). */
	setDelay(ms) {
		if (!Number.isFinite(ms) || ms < 0) throw new TypeError('setDelay(ms) requires a non-negative number');
		this._delayMs = ms;
		return this;
	}

	/** Keep sending the remaining items if one fails (failures land on `result.albumErrors`). */
	setContinueOnError(v = true) {
		this._continueOnError = !!v;
		return this;
	}

	/** @returns {{ album: object[], caption?: string }} the `sendMessage()`-shaped payload, without sending it. */
	build() {
		if (this._items.length < 2) throw new Error('An album needs at least 2 media (use addImage()/addVideo())');
		return { album: [...this._items], ...(this._caption ? { caption: this._caption } : {}) };
	}

	/** Build and send. @returns {Promise<object>} parent album message (`.albumItems` = sent children) */
	async send(jid, options = {}) {
		const payload = this.build();
		const opts = { ...(this._delayMs !== undefined ? { delayMs: this._delayMs } : {}), ...options };
		if (typeof this.#client.sendAlbumMessage === 'function') {
			return this.#client.sendAlbumMessage(jid, payload.album, {
				...(payload.caption ? { caption: payload.caption } : {}),
				...(this._continueOnError ? { continueOnError: true } : {}),
				...opts,
			});
		}
		return this.#client.sendMessage(jid, payload, { ...opts, ...(this._continueOnError ? { albumContinueOnError: true } : {}) });
	}
}

export { Album };
