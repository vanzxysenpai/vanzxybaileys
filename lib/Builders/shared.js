/**
 * lib/Utils/MessageBuilder.js — AIRich / Button / ButtonV2 / Carousel / Toolkit
 *
 * Part of @vanzxy/baileys 1.4.4. Third-party attribution for the base
 * implementation this file was adapted from is kept in /NOTICE.md
 * (not inline here) per the original author's license terms.
 *
 * Vanz@Merge 15-08-26 --- Ported into @vanzxy/baileys 1.3.9 from the
 * @blurose/baileys 1.1.13 fork (base, feature-complete) with perf defaults
 * and message-authenticity fields backported from arslan-baileys 1.1.0 and
 * this project's own rich-message-utils.js. See changes tagged "Vanz@" below.
 *
 * Vanz@Fix 23-08-26 --- v4.7 -> v4.8. addGenerating() now defaults to appending a
 *   FOATextPrimitive text fallback ('[ Sedang diproses... ]'), same pattern as
 *   addTask/addThinkingStatus/addBloks. Previously the card had no client-visible
 *   content until WA's own timeout swapped it for its built-in failed-generation
 *   text; this makes the fallback instant. Opt out with { textFallback: false }.
 *
 * Vanz@Merge 22-08-26 --- v4.6 -> v4.7. Button class hardened + extended:
 *   - Bug fix: addCall() wrote its second arg into buttonParamsJson.id, but
 *     the cta_call native-flow schema keys on `phone_number` (id is ignored
 *     by WhatsApp for this button type). Confirmed against 3 independent
 *     current Baileys-fork call sites before changing the wire shape.
 *   - Required-field validation added to the CTA helpers that silently
 *     produced a button WA would render but never route correctly
 *     (empty id/url/copy_code/phone_number).
 *   - New native-flow helpers for names WA recognises beyond the "mixed"
 *     set (cta_catalog, open_webview, call_permission_request,
 *     automated_greeting_message_view_catalog, payment_info,
 *     review_and_pay, wa_payment_transaction_details, mpm) — see the
 *     Button.#SPECIAL_FLOW map and each method's JSDoc for the
 *     business/official-client gating caveat.
 *   - send() now picks the correct <native_flow v=.. name=..> node per the
 *     first button's name instead of always emitting v=9 name=mixed, which
 *     is required for the special names above to have a chance of
 *     rendering at all (mirrors the same class of bug already fixed for
 *     lone single_select in 1.3.x).
 *   - JSDoc added across Toolkit/BaseBuilder/Button/ButtonV2/Carousel/AIRich
 *     for editor hover-docs; kept in sync with MessageBuilder.d.ts.
 * All additions above are original implementations written against public
 * Baileys-ecosystem documentation of the native-flow wire format, not
 * copied from any third-party fork.
 */

'use strict';

// Vanz@Fix 24-08-26: use the exported builder version everywhere; the old
// verification helper referenced an undeclared `VERSION`, making every AIRich.build() fail.


import { generateWAMessageFromContent, prepareWAMessageMedia } from '../Utils/messages.js';
import { generateMessageIDV2 } from '../Utils/generics.js';
import { botMetadataSignature, botMetadataCertificate } from '../Utils/rich-message-utils.js';
// Vanz@Fix 27-08-26: Button.send() was hand-rolling its own <biz> node with
// attrs: {} instead of reusing the canonical builder. Real client traffic
// (and the auto-attached biz node in Socket/messages-send.js) always carries
// actual_actors/host_storage/privacy_mode_ts on every <biz> node, including
// the one wrapping a lone single_select's <list> node. Missing them made the
// single_select wire payload diverge from what messages-send.js emits for
// every other message type -- import the shared helper instead of duplicating
// (and silently drifting from) its attrs.
import { getBizBinaryNode } from '../WABinary/index.js';
import crypto from 'crypto';
import { PassThrough, Readable } from 'stream';
// Vanz@Fix 15-08-26 --- sharp/fluent-ffmpeg were statically imported in the blurose source.
// Both are optional peer deps here (see package.json peerDependenciesMeta); a static import
// throws at module-load time when they're not installed, which would crash the entire
// lib/Utils barrel export (and therefore bot startup) even for users who never call
// AIRich.addImage()/addVideo()/Toolkit.*. Lazy-load them instead, matching the pattern
// already used in messages-media.js's getImageProcessingLibrary().
let _sharp;
const getSharp = async () => {
    if (_sharp === undefined) {
        _sharp = await import('sharp').then((m) => m.default ?? m).catch(() => null);
    }
    if (!_sharp)
        throw new Error('sharp is required for this operation. Install it with: npm i sharp');
    return _sharp;
};
let _ffmpeg;
const getFfmpeg = async () => {
    if (_ffmpeg === undefined) {
        _ffmpeg = await import('fluent-ffmpeg').then((m) => m.default ?? m).catch(() => null);
    }
    if (!_ffmpeg)
        throw new Error('fluent-ffmpeg is required for this operation. Install it with: npm i fluent-ffmpeg');
    return _ffmpeg;
};

function extractIE(text, { extract = true, hyperlink = true, citation = true, latex = true } = {}) {
	if (!extract) {
		return {
			text,
			ie: [],
			inline_entities: [],
		};
	}

	const createIE = (type, ie) => {
		if (type == 'hyperlink') {
			return {
				key: ie.key,
				metadata: {
					display_name: ie.text,
					is_trusted: ie.is_trusted,
					url: ie.url,
					__typename: 'GenAIInlineLinkItem',
				},
			};
		}

		if (type == 'citation') {
			return {
				key: ie.key,
				metadata: {
					reference_id: ie.reference_id,
					reference_url: ie.url,
					reference_title: ie.url,
					reference_display_name: ie.url,
					sources: [],
					__typename: 'GenAISearchCitationItem',
				},
			};
		}

		if (type == 'latex') {
			return {
				key: ie.key,
				metadata: {
					latex_expression: ie.text,
					latex_image: {
						url: ie.url,
						width: Number(ie.width) || 100,
						height: Number(ie.height) || 100,
					},
					font_height: Number(ie.font_height) || 83.333333333333,
					padding: Number(ie.padding) || 15,
					__typename: 'GenAILatexItem',
				},
			};
		}
	};

	let ie = [];
	let inline_entities = [];
	let result = '';
	let last = 0;
	let citation_index = 1;
	let hyperlink_index = 0;
	let latex_index = 0;
	let stack = [];

	for (let i = 0; i < text.length; i++) {
		if (text[i] == '[' && text[i - 1] != '\\') {
			stack.push(i);
		} else if (text[i] == ']' && (text[i + 1] == '(' || text[i + 1] == '<')) {
			let start = stack.pop();

			if (start == null) continue;

			let open = text[i + 1];
			let close = open == '(' ? ')' : '>';
			let type = open == '(' ? 'link' : 'latex';
			let end = i + 2;
			let depth = 1;

			while (end < text.length && depth) {
				if (text[end] == open && text[end - 1] != '\\') depth++;
				else if (text[end] == close && text[end - 1] != '\\') depth--;
				end++;
			}

			if (depth) continue;

			let raw = text.slice(start + 1, i).trim();
			let url = text.slice(i + 2, end - 1).trim();

			let key;
			let tag;
			let data;

			if (type == 'latex') {
				if (!latex) continue;

				let [txt = '', width = null, height = null, font_height = null, padding = null] = raw.split('|');

				key = `\u004E\u0049\u0058\u0045\u004C_LATEX_${latex_index++}`;
				tag = `{{${key}}}${txt || 'image'}{{/${key}}}`;

				data = {
					type: 'latex',
					ie: {
						key,
						text: txt,
						url,
						width,
						height,
						font_height,
						padding,
					},
				};
			} else if (raw) {
				if (!hyperlink) continue;

				const trusted = !url.startsWith('!');

				if (!trusted) {
					url = url.slice(1);
				}

				key = `\u004E\u0049\u0058\u0045\u004C_HYPERLINK_${hyperlink_index++}`;
				tag = `{{${key}}}${url}{{/${key}}}`;

				data = {
					type: 'hyperlink',
					ie: {
						key,
						text: raw,
						url,
						is_trusted: trusted,
					},
				};
			} else {
				if (!citation) continue;

				key = `\u004E\u0049\u0058\u0045\u004C_CITATION_${citation_index - 1}`;
				tag = `{{${key}}}${url}{{/${key}}}`;

				data = {
					type: 'citation',
					ie: {
						reference_id: citation_index++,
						key,
						text: '',
						url,
					},
				};
			}

			result += text.slice(last, start) + tag;
			last = end;

			ie.push(data);

			const entity = createIE(data.type, data.ie);

			if (entity) {
				inline_entities.push(entity);
			}

			i = end - 1;
		}
	}

	result += text.slice(last);

	return {
		text: result,
		ie,
		inline_entities,
	};
}

async function waitAllPromises(input) {
	const isPromise = (v) => v && typeof v.then === 'function';
	const isObject = (v) => v && typeof v === 'object';

	const deep = async (v) => {
		if (isPromise(v)) return deep(await v);
		if (Array.isArray(v)) return Promise.all(v.map(deep));
		if (isObject(v)) {
			const entries = await Promise.all(Object.entries(v).map(async ([k, val]) => [k, await deep(val)]));
			return Object.fromEntries(entries);
		}
		return v;
	};

	return deep(await input);
}

/** Static grab-bag of media/text helpers shared by the builder classes above. */
class Toolkit {
	constructor() {}

	/** Parse `[label](url)` hyperlinks, `[]()` citations, and `[expr]<img-url>` latex tags out of `text`. */
	static extractIE(text, { extract = true, hyperlink = true, citation = true, latex = true } = {}) {
		return extractIE(text, { extract, hyperlink, citation, latex });
	}

	/** Resize an image buffer to `x`×`y` via sharp (lazy-loaded; throws with an install hint if sharp isn't present). */
	static async resize(buffer, x, y, fit = 'cover') {
		const sharp = await getSharp();
		return await sharp(buffer)
			.resize(x, y, {
				fit,
				position: 'center',
				background: { r: 0, g: 0, b: 0, alpha: 0 },
			})
			.png()
			.toBuffer();
	}

	/** Deeply await every Promise nested in `input` (objects/arrays), resolving it into plain values. */
	static async waitAllPromises(input) {
		return await waitAllPromises(input);
	}

	/** Fetch `url` into a Buffer. @param {boolean} [silent] Return an empty Buffer instead of throwing on failure. @param {number} [timeout] Abort after this many ms (default 15s) instead of hanging indefinitely on a dead/slow host. */
	static async fetchBuffer(url, options = {}, { silent = true, timeout = 15000 } = {}) {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		try {
			let response = await fetch(url, { ...options, signal: options.signal ?? controller.signal });
			if (!response.ok) throw Error(`HTTP ${response.status}`);
			return Buffer.from(await response.arrayBuffer());
		} catch (error) {
			if (silent) return Buffer.alloc(0);
			throw error;
		} finally {
			clearTimeout(timer);
		}
	}

	/** Upload media to WhatsApp's media server and return its `url`/`directPath` descriptor. */
	static async toUrl(_client, path, mediaType = 'document') {
		if (!path) throw new Error('Url or buffer needed');

		const media = await prepareWAMessageMedia(
			{
				[mediaType]: Buffer.isBuffer(path) ? path : { url: path },
			},
			{
				upload: _client.waUploadToServer,
				jid: '\u0040\u006e\u0065\u0077\u0073\u006c\u0065\u0074\u0074\u0065\u0072',
			}
		);

		return Object.values(media)[0]?.url;
	}

	/** Normalize a url/buffer/array of either into the requested `result` shape ('url' | 'buffer' | 'base64'), optionally resizing and/or uploading to WA's media server first. */
	static async resolveMedia(_client, media, mediaType = 'image', { resolveUrl = false, resolveWAUrl = false, result = 'url', resize = false, width = 300, height = 300 } = {}) {
		const isUrl = (str) => /^https?:\/\/.+/i.test(str);

		const isWAUrl = (str) => /^https?:\/\/[^/]*\.whatsapp\.net\//i.test(str);

		// Vanz@Fix (crash guard) --- keep the original raw url around so that if the
		// resolveUrl=true upload-to-'@newsletter' round trip (Toolkit.toUrl -> prepareWAMessageMedia)
		// throws/rejects (blocked account, network hiccup, WA server refusal, etc.), we can
		// gracefully fall back to the raw url instead of letting the rejection bubble up
		// unhandled through waitAllPromises() and take the whole process down. Only applies
		// when the input was actually a url string; buffers/base64 have no such fallback.
		const rawUrlFallback = typeof media === 'string' && isUrl(media) ? media : undefined;

		if (Array.isArray(media)) {
			return Promise.all(
				media.map((item) =>
					Toolkit.resolveMedia(_client, item, mediaType, {
						resolveUrl,
						resolveWAUrl,
						result,
						resize,
						width,
						height,
					})
				)
			);
		}

		if (typeof media === 'string' && isUrl(media)) {
			if (isWAUrl(media)) {
				if (resolveWAUrl) {
					media = await Toolkit.fetchBuffer(media, {}, { silent: true });
				} else if (!resolveUrl) {
					if (result === 'url') return media;

					media = await Toolkit.fetchBuffer(media, {}, { silent: true });
				}
			} else {
				if (!resolveUrl) {
					if (result === 'url') return media;

					media = await Toolkit.fetchBuffer(media, {}, { silent: true });
				} else {
					media = await Toolkit.fetchBuffer(media, {}, { silent: true });
				}
			}
		}

		if (typeof media === 'string' && !isUrl(media)) {
			media = Buffer.from(media, 'base64');
		}

		if (!Buffer.isBuffer(media) || !media.length) {
			return;
		}

		if (resize && Buffer.isBuffer(media)) {
			media = await Toolkit.resize(media, width, height);
		}

		if (result === 'buffer') {
			return media;
		}

		if (result === 'base64') {
			return media.toString('base64');
		}

		// Vanz@Fix 22-08-26 (v4.7) --- both branches of the old if/else here returned the exact
		// same `Toolkit.toUrl(_client, media, mediaType)` call (dead branching left over from an
		// earlier version that must have treated buffer vs non-buffer input differently). Collapsed
		// to a single return; `originalIsBuffer` is now unused and removed below.
		//
		// Vanz@Fix (crash guard) --- toUrl() uploads to WA's media server under a spoofed
		// '@newsletter' jid; if that upload fails for any reason, fall back to the raw url
		// (when we have one) instead of letting the exception propagate and crash the caller.
		try {
			return await Toolkit.toUrl(_client, media, mediaType);
		} catch (err) {
			if (rawUrlFallback) return rawUrlFallback;
			throw err;
		}
	}

	/** Read an mp4 buffer's duration (seconds) straight from its moov atom, no ffprobe needed. */
	static getMp4Duration(buffer, { silent = true } = {}) {
		try {
			if (!Buffer.isBuffer(buffer) || buffer.length < 8) {
				if (silent) return 0;
				throw new Error('Invalid buffer');
			}

			let offset = 0;

			while (offset < buffer.length - 8) {
				const size = buffer.readUInt32BE(offset);

				if (size < 8 || offset + size > buffer.length) {
					if (silent) return 0;
					throw new Error('Invalid atom size');
				}

				const type = buffer.toString('ascii', offset + 4, offset + 8);

				if (type === 'moov') {
					let moovOffset = offset + 8;
					const moovEnd = offset + size;

					while (moovOffset < moovEnd - 8) {
						const childSize = buffer.readUInt32BE(moovOffset);

						if (childSize < 8 || moovOffset + childSize > moovEnd) {
							if (silent) return 0;
							throw new Error('Invalid child atom size');
						}

						const childType = buffer.toString('ascii', moovOffset + 4, moovOffset + 8);

						if (childType === 'mvhd') {
							const version = buffer.readUInt8(moovOffset + 8);

							if (version === 0) {
								const timescale = buffer.readUInt32BE(moovOffset + 20);
								const duration = buffer.readUInt32BE(moovOffset + 24);

								if (!timescale) {
									if (silent) return 0;
									throw new Error('Invalid timescale');
								}

								return duration / timescale;
							}

							if (version === 1) {
								const timescale = buffer.readUInt32BE(moovOffset + 32);
								const duration = Number(buffer.readBigUInt64BE(moovOffset + 36));

								if (!timescale) {
									if (silent) return 0;
									throw new Error('Invalid timescale');
								}

								return duration / timescale;
							}
						}

						moovOffset += childSize;
					}
				}

				offset += size;
			}

			if (silent) return 0;

			throw new Error('No mvhd found!');
		} catch (err) {
			if (silent) return 0;
			throw err;
		}
	}

	/** Extract a single frame from an mp4 buffer as a thumbnail (ffmpeg lazy-loaded; throws with an install hint if missing). */
	static getMp4Preview(videoBuffer, { time, result = 'buffer', resize = true, width = 300, height = 300, silent = true } = {}) {
		return new Promise((resolve, reject) => {
			const fail = (err) => {
				if (silent) {
					return resolve(result === 'base64' ? '' : Buffer.alloc(0));
				}
				return reject(err);
			};

			try {
				if (!Buffer.isBuffer(videoBuffer) || !videoBuffer.length) {
					return fail(new Error('videoBuffer tidak valid atau kosong'));
				}

				const inputStream = new Readable({ read() {} });
				inputStream.push(videoBuffer);
				inputStream.push(null);

				const outputStream = new PassThrough();
				const chunks = [];

				outputStream.on('data', (chunk) => chunks.push(chunk));

				outputStream.on('end', async () => {
					try {
						let output = Buffer.concat(chunks);

						if (!output.length) {
							return fail(new Error('Output kosong — cek format atau timestamp video'));
						}

						if (resize) {
							output = await Toolkit.resize(output, width, height);
						}

						return resolve(result === 'base64' ? output.toString('base64') : output);
					} catch (err) {
						return fail(err);
					}
				});

				outputStream.on('error', fail);

				time ??= Math.min(Toolkit.getMp4Duration(videoBuffer) * 0.2, 10);

				getFfmpeg()
					.then((ffmpeg) => {
						ffmpeg(inputStream)
							.outputOptions([`-ss ${time}`, '-vframes 1', '-vcodec png', '-f image2pipe'])
							.on('error', (err) => fail(new Error(`ffmpeg error: ${err.message}`)))
							.pipe(outputStream, { end: true });
					})
					.catch(fail);
			} catch (err) {
				return fail(err);
			}
		});
	}
}

/**
 * Shared chaining base for Button/ButtonV2/Carousel/AIRich: title/subtitle/body/footer,
 * contextInfo (quoted/mentions/etc.), and an escape-hatch payload merged verbatim
 * into the generated message content.
 * @abstract
 */
class BaseBuilder {
	constructor() {
		this._title = '';
		this._subtitle = '';
		this._body = '';
		this._footer = '';
		this._contextInfo = {};
		this._extraPayload = {};
	}

	/** @param {string} title */
	setTitle(title) {
		if (typeof title !== 'string') {
			throw new TypeError('Title must be a string');
		}
		this._title = title;
		return this;
	}

	/** @param {string} subtitle */
	setSubtitle(subtitle) {
		if (typeof subtitle !== 'string') {
			throw new TypeError('Subtitle must be a string');
		}
		this._subtitle = subtitle;
		return this;
	}

	/** @param {string} body Main message text. */
	setBody(body) {
		if (typeof body !== 'string') {
			throw new TypeError('Body must be a string');
		}
		this._body = body;
		return this;
	}

	/** @param {string} footer */
	setFooter(footer) {
		if (typeof footer !== 'string') {
			throw new TypeError('Footer must be a string');
		}
		this._footer = footer;
		return this;
	}

	/** @param {Record<string, any>} obj Raw `contextInfo` (quotedMessage, mentionedJid, etc.), merged verbatim. */
	setContextInfo(obj) {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			throw new TypeError('ContextInfo must be a plain object');
		}

		this._contextInfo = obj;
		return this;
	}

	/** Escape hatch: shallow-merge arbitrary keys into the generated message content, alongside whatever this builder produces. */
	addPayload(obj) {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			throw new TypeError('Payload must be a plain object');
		}

		Object.assign(this._extraPayload, obj);

		return this;
	}
}

/** Tiny fluent helper for building a single quickReply button row (type 1). Standalone — not tied to Button/ButtonV2. */
class RowBuilder {
	constructor() {
		this.buttons = [];
	}

	button(displayText, buttonId) {
		this.buttons.push({ buttonId, buttonText: { displayText }, type: 1 });
		return this;
	}
}


export { Toolkit, BaseBuilder, RowBuilder, extractIE, waitAllPromises, getSharp, getFfmpeg, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, botMetadataSignature, botMetadataCertificate, getBizBinaryNode, crypto, PassThrough, Readable };
