// Evernight AI — lib/Utils/button-helper-utils.js / Creator : Vanzxy🍃
// Ported from @queenanya/baileys (Bail-master fork) src/addons/message-utils.ts
// Original credit inside that file: "Ported from @ryuu-reinzz/button-helper v2.2.5"
// Converted TS -> JS ESM to match @vanzxy/baileys compiled-lib conventions.

import { randomBytes } from 'crypto';
import { generateWAMessage, generateWAMessageFromContent, normalizeMessageContent } from './messages.js';
import { getUrlFromDirectPath } from './messages-media.js';
import { getBinaryNodeChild, getBizBinaryNode, isJidGroup, isJidNewsletter, jidNormalizedUser, S_WHATSAPP_NET } from '../WABinary/index.js';
import { QueryIds, XWAPaths } from '../Types/Mex.js';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — Message Type Detection
// ─────────────────────────────────────────────────────────────────────────────

/** @param {import('../../WAProto/index.js').proto.IMessage} message */
export function getMediaType(message) {
	if (message.imageMessage) return 'image';
	if (message.videoMessage) return message.videoMessage.gifPlayback ? 'gif' : 'video';
	if (message.audioMessage) return message.audioMessage.ptt ? 'ptt' : 'audio';
	if (message.contactMessage) return 'vcard';
	if (message.documentMessage) return 'document';
	if (message.contactsArrayMessage) return 'contact_array';
	if (message.liveLocationMessage) return 'livelocation';
	if (message.stickerMessage) return 'sticker';
	if (message.listMessage) return 'list';
	if (message.listResponseMessage) return 'list_response';
	if (message.buttonsResponseMessage) return 'buttons_response';
	if (message.orderMessage) return 'order';
	if (message.productMessage) return 'product';
	if (message.interactiveResponseMessage) return 'native_flow_response';
	if (message.groupInviteMessage) return 'url';
	return '';
}

/** @param {import('../../WAProto/index.js').proto.IMessage} message */
export function getMessageType(message) {
	const normalizedMessage = normalizeMessageContent(message);
	if (!normalizedMessage) return 'text';
	if (normalizedMessage.reactionMessage || normalizedMessage.encReactionMessage) return 'reaction';
	if (
		normalizedMessage.pollCreationMessage ||
		normalizedMessage.pollCreationMessageV2 ||
		normalizedMessage.pollCreationMessageV3 ||
		normalizedMessage.pollUpdateMessage
	)
		return 'poll';
	if (normalizedMessage.eventMessage) return 'event';
	if (getMediaType(normalizedMessage) !== '') return 'media';
	return 'text';
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — Button / Biz Node Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** @param {import('../../WAProto/index.js').proto.IMessage} message */
export function getButtonType(message) {
	const inner = message.viewOnceMessageV2Extension?.message || message;
	if (inner.listMessage) return 'list';
	if (inner.buttonsMessage) return 'buttons';
	if (inner.interactiveMessage?.nativeFlowMessage) return 'native_flow';
	if (inner.interactiveMessage?.carouselMessage) return 'native_flow';
	if (message.viewOnceMessage?.message?.interactiveMessage?.carouselMessage) return 'native_flow';
	if (message.viewOnceMessageV2?.message?.interactiveMessage?.carouselMessage) return 'native_flow';
	if (message.viewOnceMessage?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow';
	if (message.viewOnceMessageV2?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow';
	if (message.viewOnceMessageV2Extension?.message?.interactiveMessage?.nativeFlowMessage) return 'native_flow';
	if (message.viewOnceMessageV2Extension?.message?.interactiveMessage?.carouselMessage) return 'native_flow';
	return undefined;
}

// Vanz@Fix (Carousel-per-card-flow / 3-table drift) --- this used to hand-roll its own copy of
// the special-flow routing table (a `nativeFlowSpecials` array covering only 6 of FLOWS_MAP's
// ~25+ entries in generic-utils.js, plus a separate review_and_pay/payment_info branch missing
// the actual_actors/host_storage/privacy_mode_ts/quality_control attrs that Button.send()'s
// "Vanz@Fix 27-08-26" already fixed on that path). Two independently hand-maintained biz-node
// builders is exactly the failure mode already called out on Button.js's own #SPECIAL_FLOW
// comment ("keep those two tables in sync if a new special-cased button name is ever added") --
// except here it had drifted into a *third* table nobody was keeping in sync at all, so
// sendButtons()/sendInteractiveMessage() (the callers of this function, via button-sender.js)
// silently fell back to generic wire behavior for any button name added to FLOWS_MAP after this
// file was written (payment_key_info/booking_confirmation among them), and never carried the
// full attrs real traffic expects. Now delegates entirely to the shared, carousel-aware
// getBizBinaryNode() -- same one Button.js/Carousel.js/messages-send.js/A2UI.js already use --
// so there is exactly one place left that decides biz-node shape for every send path.
/**
 * Derive the binary node(s) that must accompany a button/interactive/list
 * message so it renders correctly across WA Messenger + WA Business,
 * Android + iOS.
 * @param {import('../../WAProto/index.js').proto.IMessage} message
 * @returns {import('../WABinary/index.js').BinaryNode}
 */
export function getButtonArgs(message) {
	const inner = message.viewOnceMessageV2Extension?.message || message;
	const interactiveMessage =
		inner.interactiveMessage ||
		message.viewOnceMessage?.message?.interactiveMessage ||
		message.viewOnceMessageV2?.message?.interactiveMessage;
	const buttonsMessage = inner.buttonsMessage;
	const templateMessage = inner.templateMessage;
	const listMessage = inner.listMessage;

	if (interactiveMessage || buttonsMessage || templateMessage || listMessage) {
		return getBizBinaryNode({ interactiveMessage, buttonsMessage, templateMessage, listMessage });
	}

	return { tag: 'biz', attrs: {} };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — WS Extras (mentions, media, MD patch, album, socket extras)
// ─────────────────────────────────────────────────────────────────────────────

/** Build contextInfo for @mention or @all. */
export const buildMentionContextInfo = (message) => {
	if (message.mentionAll) return { contextInfo: { nonJidMentions: 1 } };
	if (message.mentions?.length) return { contextInfo: { mentionedJid: message.mentions } };
	return { contextInfo: {} };
};

/** Extract embedded media from buttons/interactive message (top-level or header-nested). */
export const extractFromButtonsMessage = (msg) => {
	const header = typeof msg.header === 'object' && msg.header !== null;
	if (header ? msg.header?.imageMessage : msg.imageMessage)
		return { imageMessage: header ? msg.header.imageMessage : msg.imageMessage };
	if (header ? msg.header?.videoMessage : msg.videoMessage)
		return { videoMessage: header ? msg.header.videoMessage : msg.videoMessage };
	if (header ? msg.header?.documentMessage : msg.documentMessage)
		return { documentMessage: header ? msg.header.documentMessage : msg.documentMessage };
	return null;
};

/** Normalise media input: string → { url }, Buffer → as-is, others → as-is. */
export const normalizeMediaInput = (media) => {
	if (!media) return media;
	if (Buffer.isBuffer(media)) return media;
	if (typeof media === 'string') return { url: media };
	return media;
};

/** Wrap buttons/template/list/interactive in viewOnceMessageV2Extension for MD clients. */
export const patchMessageForMdIfRequired = (message) => {
	if (
		message?.buttonsMessage ||
		message?.templateMessage ||
		message?.listMessage ||
		message?.interactiveMessage?.nativeFlowMessage
	) {
		return {
			viewOnceMessageV2Extension: {
				message: {
					messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} },
					...message
				}
			}
		};
	}

	return message;
};

/**
 * Build and relay an album (multi-image/video) message.
 * @deprecated (v2.1.4) Legacy helper: it relays only the parent album message and returns the child messages
 * WITHOUT sending them, despite the summary above. Use `sock.sendAlbumMessage()` or the `Album` builder instead.
 * @param {string} jid
 * @param {Array<object>} albums
 * @param {{ userJid: string, suki: { relayMessage: Function, waUploadToServer: Function } }} options
 * @returns {Promise<Array<object>>} Array of individual media WAMessage objects
 * @example
 * const items = await prepareAlbumMessageContent(jid, [
 *     { image: { url: 'https://...' }, caption: 'Photo 1' },
 *     { video: { url: 'https://...' }, caption: 'Video 1' }
 * ], { userJid: sock.user.id, suki: sock })
 */
export const prepareAlbumMessageContent = async (jid, albums, options) => {
	const messages = [];

	const albumMsg = generateWAMessageFromContent(
		jid,
		{
			albumMessage: {
				expectedImageCount: albums.filter((item) => 'image' in item).length,
				expectedVideoCount: albums.filter((item) => 'video' in item).length
			}
		},
		{ userJid: options.userJid }
	);

	await options.suki.relayMessage(jid, albumMsg.message, { messageId: albumMsg.key.id });

	for (const media of albums) {
		let mediaMsg;
		const uploadFn = async (encFilePath, opts) => {
			const res = await options.suki.waUploadToServer(encFilePath, {
				...opts,
				newsletter: isJidNewsletter(jid)
			});
			return {
				mediaUrl: res.url ?? '',
				directPath: res.directPath ?? '',
				handle: res.handle,
				mediaKey: res.mediaKey,
				fileEncSha256: res.fileEncSha256,
				fileSha256: res.fileSha256,
				fileLength: res.fileLength
			};
		};

		const sharedOpts = { userJid: options.userJid, upload: uploadFn };

		if ('image' in media && media.image) mediaMsg = await generateWAMessage(jid, media, sharedOpts);
		else if ('video' in media && media.video) mediaMsg = await generateWAMessage(jid, media, sharedOpts);

		if (mediaMsg) {
			mediaMsg.message.messageContextInfo = {
				messageSecret: randomBytes(32),
				messageAssociation: { associationType: 1, parentMessageKey: albumMsg.key }
			};
			messages.push(mediaMsg);
		}
	}

	return messages;
};

/**
 * Addon factory for socket-level message extras (profilePictureUrl, getEphemeralGroup).
 * @param {{ query: Function, newsletterWMexQuery?: Function }} ctx
 */
export const makeMessageExtrasAddon = (ctx) => {
	const { query, newsletterWMexQuery } = ctx;

	/**
	 * Fetch profile picture URL for any JID, including newsletters.
	 * @example
	 * const url = await sock.profilePictureUrl('1234567890@s.whatsapp.net')
	 */
	const profilePictureUrl = async (jid) => {
		if (isJidNewsletter(jid) && newsletterWMexQuery) {
			const node = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
				input: { key: jid, type: 'JID', view_role: 'GUEST' },
				fetch_viewer_metadata: true,
				fetch_full_image: true,
				fetch_creation_time: true
			});
			const resultStr = getBinaryNodeChild(node, 'result')?.content?.toString();
			if (!resultStr) return null;

			const metadata = JSON.parse(resultStr).data[XWAPaths.xwa2_newsletter_metadata];
			return getUrlFromDirectPath(metadata?.thread_metadata?.picture?.direct_path || '');
		}

		const result = await query({
			tag: 'iq',
			attrs: { target: jidNormalizedUser(jid), to: S_WHATSAPP_NET, type: 'get', xmlns: 'w:profile:picture' },
			content: [{ tag: 'picture', attrs: { type: 'image', query: 'url' }, content: undefined }]
		});
		return getBinaryNodeChild(result, 'picture')?.attrs?.url || null;
	};

	/**
	 * Query the ephemeral (disappearing messages) timer for a group.
	 * @returns {Promise<number|string>} timer in seconds, or 0 if not set
	 * @example
	 * const timer = await sock.getEphemeralGroup('120363xxx@g.us')
	 */
	const getEphemeralGroup = async (jid) => {
		if (!isJidGroup(jid)) throw new TypeError('Jid should originate from a group!');
		const result = await query({
			tag: 'iq',
			attrs: { id: `ephemeral-${Date.now()}`, to: jid, type: 'get', xmlns: 'w:g2' },
			content: [{ tag: 'query', attrs: { request: 'interactive' }, content: undefined }]
		});
		return getBinaryNodeChild(getBinaryNodeChild(result, 'group'), 'ephemeral')?.attrs?.expiration || 0;
	};

	return { profilePictureUrl, getEphemeralGroup };
};
