import { prepareWAMessageMedia } from './shared.js';

/**
 * Binds `sendLinkPreview` onto a Baileys socket instance.
 *
 * Ported from MessageBuilder.js's `bind()` helper (present upstream in
 * MessageBuilderV4.7 / "mb"'s build, but missing from this fork).
 *
 * Usage:
 *   import { bindLinkPreview } from '@vanzxy/baileys';
 *   const sock = bindLinkPreview(makeWASocket({ ... }));
 *   await sock.sendLinkPreview(jid, 'check this out', 'https://example.com', 'Example Title');
 */
function bindLinkPreview(client) {
	if (!client) {
		throw new Error('Socket is required');
	}

	return Object.defineProperties(client, {
		sendLinkPreview: {
			configurable: true,
			writable: true,
			async value(jid, text, link, title, description, thumbnail, options = {}) {
				if (typeof jid !== 'string') {
					throw new TypeError('jid is not string');
				}
				if (typeof text !== 'string') {
					throw new TypeError('text is not string');
				}
				if (typeof link !== 'string') {
					throw new TypeError('link is not string');
				}
				if (typeof title !== 'string') {
					throw new TypeError('title is not string');
				}
				if (description && typeof description !== 'string') {
					throw new TypeError('description is not string');
				}
				if (thumbnail && !Buffer.isBuffer(thumbnail) && typeof thumbnail.url !== 'string') {
					throw new TypeError('thumbnail must be Buffer or object with url key');
				}

				const image = thumbnail
					? await prepareWAMessageMedia(
							{ image: thumbnail },
							{
								upload: client.waUploadToServer,
								mediaTypeOverride: 'thumbnail-link',
							}
						).then((v) => v.imageMessage)
					: undefined;

				text = text.includes(link) ? text : `${link}\n${text}`;

				return await client.sendMessage(
					jid,
					{
						text,
						linkPreview: {
							'matched-text': link,
							title,
							description,
							jpegThumbnail: image?.jpegThumbnail,
							highQualityThumbnail: image,
						},
					},
					options
				);
			},
		},
	});
}

export { bindLinkPreview };
