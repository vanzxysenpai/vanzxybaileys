// Evernight AI — lib/Utils/button-sender.js / Creator : Vanzxy🍃
// Ported from @queenanya/baileys (Bail-master fork) src/addons/button-sender.ts
// Original credit inside that file: "Ported from @ryuu-reinzz/button-helper v2.2.5"
// Converted TS -> JS ESM for @vanzxy/baileys.
//
// Provides runtime helpers to send WhatsApp interactive / native-flow button
// messages via relayMessage directly, bypassing sendMessage's validation path
// that does not recognise interactiveMessage payloads.
//
// Visibility guarantee — all button types (quick_reply, cta_url, cta_copy,
// cta_call, list, template, carousel/cards, combined, single_select) render
// correctly on WhatsApp Messenger & WhatsApp Business, Android & iOS.
//
// What this file provides:
//  1. buildInteractiveButtons()               — legacy → native_flow normaliser
//  2. validateAuthoringButtons()               — permissive pre-send validation
//  3. validateSendButtonsPayload()             — strict sendButtons payload check
//  4. validateSendInteractiveMessagePayload()  — strict interactive payload check
//  5. validateInteractiveMessageContent()      — post-convert check
//  6. convertToInteractiveMessage()            — high-level authoring → proto shape
//  7. sendInteractiveMessage()                 — low-level power function
//  8. sendInteractiveMessageV2()               — extended (thumbnail / externalAdReply)
//  9. sendButtons()                            — convenience quick-reply wrapper
// 10. InteractiveValidationError               — structured error class
//
// Usage:
//   import { sendButtons, sendInteractiveMessage } from '@vanzxy/baileys'
//
//   await sendButtons(sock, jid, {
//     text: 'Choose an option',
//     footer: 'Bot footer',
//     buttons: [
//       { id: 'yes', text: 'Yes' },
//       { id: 'no',  text: 'No'  },
//     ],
//   })

import { generateMessageIDV2 } from './generics.js';
import { generateWAMessageFromContent, normalizeMessageContent } from './messages.js';
import { isJidGroup } from '../WABinary/index.js';
import { getButtonArgs, getButtonType } from './button-helper-utils.js';

// ─────────────────────────────────────────────────────────────────────────────
// Custom Error
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Thrown when button payload authoring validation fails.
 * Provides structured errors/warnings + a canonical example so callers can
 * surface actionable feedback to end-users or logs.
 */
export class InteractiveValidationError extends Error {
	constructor(message, { context, errors = [], warnings = [], example } = {}) {
		super(message);
		this.name = 'InteractiveValidationError';
		this.context = context;
		this.errors = errors;
		this.warnings = warnings;
		this.example = example;
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			context: this.context,
			errors: this.errors,
			warnings: this.warnings,
			example: this.example
		};
	}

	formatDetailed() {
		const lines = [`[${this.name}] ${this.message}${this.context ? ' (' + this.context + ')' : ''}`];
		if (this.errors.length) {
			lines.push('Errors:');
			this.errors.forEach((e) => lines.push('  - ' + e));
		}

		if (this.warnings.length) {
			lines.push('Warnings:');
			this.warnings.forEach((w) => lines.push('  - ' + w));
		}

		if (this.example) {
			lines.push('Example payload:', JSON.stringify(this.example, null, 2));
		}

		return lines.join('\n');
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Example payloads (embedded inside thrown errors for developer guidance)
// ─────────────────────────────────────────────────────────────────────────────

const EXAMPLE_PAYLOADS = {
	sendButtons: {
		text: 'Choose an option',
		buttons: [
			{ id: 'opt1', text: 'Option 1' },
			{ id: 'opt2', text: 'Option 2' },
			{
				name: 'cta_url',
				buttonParamsJson: JSON.stringify({
					display_text: 'Visit Site',
					url: 'https://example.com'
				})
			}
		],
		footer: 'Footer text'
	},
	sendInteractiveMessage: {
		text: 'Pick an action',
		interactiveButtons: [
			{
				name: 'quick_reply',
				buttonParamsJson: JSON.stringify({ display_text: 'Hello', id: 'hello' })
			},
			{
				name: 'cta_copy',
				buttonParamsJson: JSON.stringify({ display_text: 'Copy Code', copy_code: 'ABC123' })
			}
		],
		footer: 'Footer'
	}
};

// ─────────────────────────────────────────────────────────────────────────────
// Allowed button name sets
// ─────────────────────────────────────────────────────────────────────────────

/** Allowed complex button names in sendButtons */
const SEND_BUTTONS_ALLOWED_COMPLEX = new Set(['cta_url', 'cta_copy', 'cta_call']);

/** Full set of button names allowed in sendInteractiveMessage */
const INTERACTIVE_ALLOWED_NAMES = new Set([
	'quick_reply',
	'cta_url',
	'cta_copy',
	'cta_call',
	'cta_catalog',
	'cta_reminder',
	'cta_cancel_reminder',
	'address_message',
	'send_location',
	'open_webview',
	'mpm',
	'wa_payment_transaction_details',
	'automated_greeting_message_view_catalog',
	'galaxy_message',
	'single_select'
]);

/** Minimum required fields per button name */
const REQUIRED_FIELDS_MAP = {
	cta_url: ['display_text', 'url'],
	cta_copy: ['display_text', 'copy_code'],
	cta_call: ['display_text', 'phone_number'],
	cta_catalog: ['business_phone_number'],
	cta_reminder: ['display_text'],
	cta_cancel_reminder: ['display_text'],
	address_message: ['display_text'],
	send_location: ['display_text'],
	open_webview: ['title', 'link'],
	mpm: ['product_id'],
	wa_payment_transaction_details: ['transaction_id'],
	automated_greeting_message_view_catalog: ['business_phone_number', 'catalog_product_id'],
	galaxy_message: ['flow_token', 'flow_id'],
	single_select: ['title', 'sections'],
	quick_reply: ['display_text', 'id']
};

// ─────────────────────────────────────────────────────────────────────────────
// Internal helper
// ─────────────────────────────────────────────────────────────────────────────

function parseButtonParamsInternal(name, buttonParamsJson, errors, _warnings, index) {
	let parsed;
	try {
		parsed = JSON.parse(buttonParamsJson);
	} catch (e) {
		errors.push(`button[${index}] (${name}) invalid JSON: ${e.message}`);
		return null;
	}

	const required = REQUIRED_FIELDS_MAP[name] ?? [];
	for (const field of required) {
		if (!(field in parsed)) {
			errors.push(`button[${index}] (${name}) missing required field '${field}'`);
		}
	}

	if (name === 'open_webview' && parsed.link) {
		const link = parsed.link;
		if (typeof link !== 'object' || !link.url) {
			errors.push(`button[${index}] (open_webview) link.url required`);
		}
	}

	if (name === 'single_select') {
		if (!Array.isArray(parsed.sections) || parsed.sections.length === 0) {
			errors.push(`button[${index}] (single_select) sections must be a non-empty array`);
		}
	}

	return parsed;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public: normalise + validate
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise various legacy / upstream button shapes into the native-flow format
 * { name, buttonParamsJson }.
 *
 * Accepted input shapes:
 *  1. Already native_flow : { name: string, buttonParamsJson: string }
 *  2. Simple legacy       : { id?: string, text?: string, displayText?: string }
 *  3. Old Baileys         : { buttonId: string, buttonText: { displayText: string } }
 *  4. Unknown             : passed through verbatim
 */
export function buildInteractiveButtons(buttons = []) {
	return buttons.map((btn, i) => {
		// 1. Already native shape
		if (btn.name && btn.buttonParamsJson) return btn;

		// 2. Legacy quick-reply
		if (btn.id || btn.text || btn.displayText) {
			return {
				name: 'quick_reply',
				buttonParamsJson: JSON.stringify({
					display_text: btn.text ?? btn.displayText ?? `Button ${i + 1}`,
					id: btn.id ?? `quick_${i + 1}`
				})
			};
		}

		// 3. Old Baileys shape
		if (btn.buttonId && btn.buttonText?.displayText) {
			return {
				name: 'quick_reply',
				buttonParamsJson: JSON.stringify({
					display_text: btn.buttonText.displayText,
					id: btn.buttonId
				})
			};
		}

		// 4. Unknown — pass through
		return btn;
	});
}

/**
 * Validate raw button objects before conversion.
 * Permissive: only blocks clearly malformed input.
 */
export function validateAuthoringButtons(buttons) {
	const errors = [];
	const warnings = [];

	if (buttons === null) return { errors: [], warnings: [], valid: true, cleaned: [] };
	if (!Array.isArray(buttons)) {
		errors.push('buttons must be an array');
		return { errors, warnings, valid: false, cleaned: [] };
	}

	const SOFT_CAP = 25;
	if (buttons.length === 0) {
		warnings.push('buttons array is empty');
	} else if (buttons.length > SOFT_CAP) {
		warnings.push(`buttons count (${buttons.length}) exceeds soft cap of ${SOFT_CAP}; may be rejected by client`);
	}

	const cleaned = buttons.map((btn, idx) => {
		if (btn === null || typeof btn !== 'object') {
			errors.push(`button[${idx}] is not an object`);
			return btn;
		}

		if (btn.name && btn.buttonParamsJson) {
			if (typeof btn.buttonParamsJson !== 'string') {
				errors.push(`button[${idx}] buttonParamsJson must be string`);
			} else {
				try {
					JSON.parse(btn.buttonParamsJson);
				} catch (e) {
					errors.push(`button[${idx}] buttonParamsJson is not valid JSON: ${e.message}`);
				}
			}

			return btn;
		}

		if (btn.id || btn.text || btn.displayText) return btn;
		if (btn.buttonId && btn.buttonText?.displayText) return btn;
		warnings.push(`button[${idx}] unrecognized shape; passing through unchanged`);
		return btn;
	});

	return { errors, warnings, valid: errors.length === 0, cleaned };
}

/**
 * Strict validator for sendButtons() payload.
 */
export function validateSendButtonsPayload(data) {
	const errors = [];
	const warnings = [];

	if (!data || typeof data !== 'object') {
		return { valid: false, errors: ['payload must be an object'], warnings };
	}

	if (!data.text || typeof data.text !== 'string') {
		errors.push('text is mandatory and must be a string');
	}

	if (!Array.isArray(data.buttons) || data.buttons.length === 0) {
		errors.push('buttons is mandatory and must be a non-empty array');
	} else {
		data.buttons.forEach((btn, i) => {
			if (!btn || typeof btn !== 'object') {
				errors.push(`button[${i}] must be an object`);
				return;
			}

			if (btn.id && btn.text) {
				if (typeof btn.id !== 'string' || typeof btn.text !== 'string') {
					errors.push(`button[${i}] legacy quick reply id/text must be strings`);
				}

				return;
			}

			if (btn.name && btn.buttonParamsJson) {
				if (!SEND_BUTTONS_ALLOWED_COMPLEX.has(btn.name)) {
					errors.push(
						`button[${i}] name '${btn.name}' not allowed in sendButtons (allowed: ${[...SEND_BUTTONS_ALLOWED_COMPLEX].join(', ')})`
					);
					return;
				}

				if (typeof btn.buttonParamsJson !== 'string') {
					errors.push(`button[${i}] buttonParamsJson must be string`);
					return;
				}

				parseButtonParamsInternal(btn.name, btn.buttonParamsJson, errors, warnings, i);
				return;
			}

			errors.push(
				`button[${i}] invalid shape — expected {id, text} or {name, buttonParamsJson} with name in [${[...SEND_BUTTONS_ALLOWED_COMPLEX].join(', ')}]`
			);
		});
	}

	return { valid: errors.length === 0, errors, warnings };
}

/**
 * Strict validator for sendInteractiveMessage() authoring payload.
 */
export function validateSendInteractiveMessagePayload(data) {
	const errors = [];
	const warnings = [];

	if (!data || typeof data !== 'object') {
		return { valid: false, errors: ['payload must be an object'], warnings };
	}

	if (!data.text || typeof data.text !== 'string') {
		errors.push('text is mandatory and must be a string');
	}

	if (!Array.isArray(data.interactiveButtons) || data.interactiveButtons.length === 0) {
		errors.push('interactiveButtons is mandatory and must be a non-empty array');
	} else {
		data.interactiveButtons.forEach((btn, i) => {
			if (!btn || typeof btn !== 'object') {
				errors.push(`interactiveButtons[${i}] must be an object`);
				return;
			}

			if (!btn.name || typeof btn.name !== 'string') {
				errors.push(`interactiveButtons[${i}] missing name`);
				return;
			}

			if (!INTERACTIVE_ALLOWED_NAMES.has(btn.name)) {
				errors.push(`interactiveButtons[${i}] name '${btn.name}' not allowed`);
				return;
			}

			if (!btn.buttonParamsJson || typeof btn.buttonParamsJson !== 'string') {
				errors.push(`interactiveButtons[${i}] buttonParamsJson must be a non-empty string`);
				return;
			}

			parseButtonParamsInternal(btn.name, btn.buttonParamsJson, errors, warnings, i);
		});
	}

	return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate already-converted interactiveMessage content (just before WAMessage creation).
 */
export function validateInteractiveMessageContent(content) {
	const errors = [];
	const warnings = [];

	if (!content || typeof content !== 'object') {
		return { errors: ['content must be an object'], warnings, valid: false };
	}

	const interactive = content.interactiveMessage;

	// Non-interactive messages are fine — nothing to validate
	if (!interactive) return { errors, warnings, valid: true };

	const nativeFlow = interactive.nativeFlowMessage;
	if (!nativeFlow) {
		errors.push('interactiveMessage.nativeFlowMessage missing');
		return { errors, warnings, valid: false };
	}

	if (!Array.isArray(nativeFlow.buttons)) {
		errors.push('nativeFlowMessage.buttons must be an array');
		return { errors, warnings, valid: false };
	}

	if (nativeFlow.buttons.length === 0) {
		warnings.push('nativeFlowMessage.buttons is empty');
	}

	nativeFlow.buttons.forEach((btn, i) => {
		if (!btn || typeof btn !== 'object') {
			errors.push(`buttons[${i}] is not an object`);
			return;
		}

		if (!btn.buttonParamsJson) {
			warnings.push(`buttons[${i}] missing buttonParamsJson (may fail to render)`);
		} else if (typeof btn.buttonParamsJson !== 'string') {
			errors.push(`buttons[${i}] buttonParamsJson must be string`);
		} else {
			try {
				JSON.parse(btn.buttonParamsJson);
			} catch (e) {
				warnings.push(`buttons[${i}] buttonParamsJson invalid JSON (${e.message})`);
			}
		}

		if (!btn.name) {
			warnings.push(`buttons[${i}] missing name; defaulting to quick_reply`);
			btn.name = 'quick_reply';
		}
	});

	return { errors, warnings, valid: errors.length === 0 };
}

// ─────────────────────────────────────────────────────────────────────────────
// Content converter
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert the high-level authoring shape:
 *   { text, footer?, title?, subtitle?, interactiveButtons: [...] }
 * into the exact structure Baileys / WAProto expects:
 *   { interactiveMessage: { nativeFlowMessage: { buttons: [...] }, body?, header?, footer? } }
 *
 * Authoring-only fields are stripped so they don't leak into
 * generateWAMessageFromContent.
 */
export function convertToInteractiveMessage(content) {
	const btns = content.interactiveButtons;
	if (btns && btns.length > 0) {
		const interactiveMessage = {
			nativeFlowMessage: {
				buttons: btns.map((btn) => ({
					name: btn.name ?? 'quick_reply',
					buttonParamsJson: btn.buttonParamsJson
				})),
				messageParamsJson: ''
			}
		};

		// Vanz@Fix 30-08-26 --- subtitle was being used only as a fallback for a missing
		// title, then discarded — if BOTH title and subtitle were provided, subtitle never
		// made it into the header at all (silently dropped, despite header.subtitle being a
		// real proto field per MessageBuilder.js's toCard()). Write both independently.
		if (content.title || content.subtitle) {
			interactiveMessage.header = {
				title: content.title ?? content.subtitle ?? '',
				...(content.title && content.subtitle ? { subtitle: content.subtitle } : {})
			};
		}

		if (content.text) {
			interactiveMessage.body = { text: content.text };
		}

		if (content.footer) {
			interactiveMessage.footer = { text: content.footer };
		}

		// Strip authoring-only keys to avoid leaking into proto serialisation
		const newContent = { ...content };
		delete newContent.interactiveButtons;
		delete newContent.title;
		delete newContent.subtitle;
		delete newContent.text;
		delete newContent.footer;

		return { ...newContent, interactiveMessage };
	}

	return content;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core send helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Low-level power function — sends any interactive message by:
 *
 *  1. Validate authoring payload (when interactiveButtons is provided).
 *  2. Convert to interactiveMessage / nativeFlowMessage proto shape.
 *  3. Build WAMessage via generateWAMessageFromContent (skips sendMessage
 *     validation that rejects interactiveMessage).
 *  4. Derive & inject required binary nodes so buttons render on all platforms:
 *       - biz node  { tag:'biz', attrs:{} }
 *       - interactive child  { type:'native_flow', v:'1' }
 *       - native_flow child  { v:'9', name:'mixed' }
 *       - bot node  { tag:'bot', attrs:{ biz_bot:'1' } }  (private chats only)
 *  5. Relay via sock.relayMessage.
 *
 * @param {import('../Types/Socket.js').WASocket} sock Active @vanzxy/baileys socket instance.
 * @param {string} jid Destination chat JID.
 * @param {Record<string, unknown>} content Authoring payload (may include interactiveButtons).
 * @param {object} [options] Pass-through relay options (additionalNodes, etc.).
 */
export async function sendInteractiveMessage(sock, jid, content, options = {}) {
	if (!sock) {
		throw new InteractiveValidationError('Socket is required', { context: 'sendInteractiveMessage' });
	}

	// Step 1 — authoring validation
	if (Array.isArray(content.interactiveButtons)) {
		const strict = validateSendInteractiveMessagePayload(content);
		if (!strict.valid) {
			throw new InteractiveValidationError('Interactive authoring payload invalid', {
				context: 'sendInteractiveMessage.validateSendInteractiveMessagePayload',
				errors: strict.errors,
				warnings: strict.warnings,
				example: EXAMPLE_PAYLOADS.sendInteractiveMessage
			});
		}

		if (strict.warnings.length) {
			sock.logger?.warn?.(strict.warnings, '[button-sender] sendInteractiveMessage warnings');
		}
	}

	// Step 2 — convert to proto shape
	const convertedContent = convertToInteractiveMessage(content);
	const { errors: cErr, warnings: cWarn, valid: cValid } = validateInteractiveMessageContent(convertedContent);
	if (!cValid) {
		throw new InteractiveValidationError('Converted interactive content invalid', {
			context: 'sendInteractiveMessage.validateInteractiveMessageContent',
			errors: cErr,
			warnings: cWarn,
			example: convertToInteractiveMessage(EXAMPLE_PAYLOADS.sendInteractiveMessage)
		});
	}

	if (cWarn.length) sock.logger?.warn?.(cWarn, '[button-sender] Interactive content warnings');

	// Step 3 — build WAMessage
	const userJid = sock.authState?.creds?.me?.id ?? sock.user?.id ?? '';
	const fullMsg = generateWAMessageFromContent(jid, convertedContent, {
		userJid,
		messageId: generateMessageIDV2(userJid),
		timestamp: new Date()
	});

	// Step 4 — derive binary nodes
	// normalizeMessageContent unwraps view-once/ephemerals so getButtonType
	// inspects the real inner message type correctly.
	const normalizedContent = normalizeMessageContent(fullMsg.message);
	const buttonType = normalizedContent ? getButtonType(normalizedContent) : undefined;

	const additionalNodes = [...(options.additionalNodes ?? [])];

	if (buttonType && normalizedContent) {
		// biz > interactive > native_flow(v:9, mixed) — exact sendButton node structure
		// Works on: Android, iOS, WA Messenger, WA Business
		const bizNode = getButtonArgs(normalizedContent);
		additionalNodes.push(bizNode);

		// Private chats also need the bot node
		if (!isJidGroup(jid)) {
			additionalNodes.push({ tag: 'bot', attrs: { biz_bot: '1' } });
		}
	}

	// Step 5 — relay
	await sock.relayMessage(jid, fullMsg.message, {
		messageId: fullMsg.key.id,
		useCachedGroupMetadata: options.useCachedGroupMetadata,
		additionalAttributes: options.additionalAttributes ?? {},
		statusJidList: options.statusJidList,
		additionalNodes
	});

	// Step 6 (optional) — emit to local event stream
	// Only for private chats to avoid duplicate processing in groups.
	if (sock.config?.emitOwnEvents && !isJidGroup(jid)) {
		process.nextTick(() => {
			if (sock.processingMutex?.mutex && sock.upsertMessage) {
				void sock.processingMutex.mutex(() => sock.upsertMessage(fullMsg, 'append'));
			}
		});
	}

	return fullMsg;
}

/**
 * Extended send variant with thumbnail / externalAdReply patching.
 *
 * Dummy document priority:
 *  1. content.filePath  — load file from local disk path
 *  2. content.fileUrl   — fetch file buffer from a URL
 *  3. content.thumbnailUrl — fetch jpegThumbnail buffer AND use as dummy
 *  4. fallback          — plain text dummy buffer
 *  mimetype is taken from content.mimetype if provided, else auto-detected.
 *
 * externalAdReply fields:
 *  - containsAutoReply : true
 *  - mediaUrl / thumbnailUrl
 *  - renderLargerThumbnail : true
 *  - jpegThumbnail buffer (WA trusts this most)
 *
 * axios is a soft peer dependency — errors are non-fatal (logged only).
 *
 * @example — thumbnail from URL
 * await sendInteractiveMessageV2(sock, jid, {
 *   text: 'Hello',
 *   thumbnailUrl: 'https://example.com/thumb.jpg',
 *   interactiveButtons: [{ name: 'quick_reply', buttonParamsJson: '{"display_text":"Hi","id":"hi"}' }],
 * })
 *
 * @example — dummy file from local path
 * await sendInteractiveMessageV2(sock, jid, {
 *   text: 'Hello',
 *   filePath: '/tmp/myfile.pdf',
 *   mimetype: 'application/pdf',
 *   interactiveButtons: [...],
 * })
 */
export async function sendInteractiveMessageV2(sock, jid, content, options = {}) {
	if (!sock) {
		throw new InteractiveValidationError('Socket is required', { context: 'sendInteractiveMessageV2' });
	}

	const hasThumb = !!content.thumbnailUrl;
	const hasFilePath = !!content.filePath;
	const hasFileUrl = !!content.fileUrl;
	const shouldForce = options.forceExternalAdReply === true;

	// ── Helper: fetch buffer from any URL (axios soft peer dep) ───────────────
	async function bufferFromUrl(url) {
		try {
			// axios is an optional peer dependency
			const { default: axios } = await import('axios');
			const res = await axios.get(url, { responseType: 'arraybuffer' });
			return Buffer.from(res.data);
		} catch (e) {
			sock.logger?.warn?.({ err: e }, '[button-sender] Failed to fetch buffer from URL');
			return null;
		}
	}

	// ── Patch 1 — build dummy document so externalAdReply renders thumbnail ───
	// Only inject when no media already present in the payload.
	if ((hasThumb || hasFilePath || hasFileUrl || shouldForce) && !content.document && !content.image && !content.video) {
		try {
			let fileBuffer;
			let fileName = 'file.pdf';
			let mimeType = 'application/pdf';

			if (hasFilePath) {
				const { readFileSync } = await import('fs');
				fileBuffer = readFileSync(content.filePath);
				fileName = content.filePath.split('/').pop() ?? fileName;
				mimeType = content.mimetype ?? 'application/octet-stream';
			} else if (hasFileUrl) {
				const buf = await bufferFromUrl(content.fileUrl);
				fileBuffer = buf ?? Buffer.from('dummy', 'utf-8');
				fileName = content.fileUrl.split('/').pop() ?? fileName;
				mimeType = content.mimetype ?? 'application/octet-stream';
			} else {
				fileBuffer = Buffer.from('dummy', 'utf-8');
			}

			content.document = fileBuffer;
			content.fileName = content.fileName ?? fileName;
			content.mimetype = content.mimetype ?? mimeType;
		} catch (e) {
			sock.logger?.warn?.({ err: e }, '[button-sender] Failed to build dummy document');
		}
	}

	// ── Fetch jpegThumbnail buffer from thumbnailUrl ─────────────────
	// WA trusts jpegThumbnail buffer more than a bare URL string.
	let jpegThumb = null;
	if (hasThumb) jpegThumb = await bufferFromUrl(content.thumbnailUrl);

	// ── Patch 2 — build externalAdReply contextInfo ─
	if (hasThumb || hasFilePath || hasFileUrl || shouldForce) {
		const thumbUrl = content.thumbnailUrl ?? options.thumbnailUrl ?? '';
		const existingCtx = content.contextInfo ?? {};
		const existingEar = existingCtx.externalAdReply ?? {};

		content.contextInfo = {
			...existingCtx,
			externalAdReply: {
				...existingEar,
				mediaType: 1,
				containsAutoReply: true,
				title: existingEar.title ?? `© ${globalThis.ownername ?? 'Evernight AI'}`,
				body: existingEar.body ?? 'Virtual Assistant',
				sourceUrl: existingEar.sourceUrl ?? 'https://example.com',
				mediaUrl: thumbUrl,
				thumbnailUrl: thumbUrl,
				renderLargerThumbnail: true,
				...(jpegThumb ? { jpegThumbnail: jpegThumb } : {})
			}
		};
	}

	return sendInteractiveMessage(sock, jid, content, options);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public convenience wrapper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convenience wrapper for the most common quick-reply / CTA button use case.
 *
 * @example — quick-reply
 * await sendButtons(sock, jid, {
 *   text: 'Are you sure?',
 *   footer: 'Bot v1',
 *   buttons: [
 *     { id: 'yes', text: 'Yes' },
 *     { id: 'no',  text: 'No'  },
 *   ],
 * })
 *
 * @example — mixed quick-reply + CTA URL
 * await sendButtons(sock, jid, {
 *   text: 'Check our site',
 *   buttons: [
 *     { id: 'info', text: 'More Info' },
 *     { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Open', url: 'https://example.com' }) },
 *   ],
 * })
 */
export async function sendButtons(sock, jid, data = { text: '', buttons: [] }, options = {}) {
	if (!sock) {
		throw new InteractiveValidationError('Socket is required', { context: 'sendButtons' });
	}

	const { text = '', footer = '', title, subtitle, buttons = [] } = data;

	// Strict payload validation
	const strict = validateSendButtonsPayload({ text, buttons, title, subtitle, footer });
	if (!strict.valid) {
		throw new InteractiveValidationError('Buttons payload invalid', {
			context: 'sendButtons.validateSendButtonsPayload',
			errors: strict.errors,
			warnings: strict.warnings,
			example: EXAMPLE_PAYLOADS.sendButtons
		});
	}

	if (strict.warnings.length) {
		sock.logger?.warn?.(strict.warnings, '[button-sender] sendButtons warnings');
	}

	// Validate authoring buttons
	const { errors, warnings, cleaned } = validateAuthoringButtons(buttons);
	if (errors.length) {
		throw new InteractiveValidationError('Authoring button objects invalid', {
			context: 'sendButtons.validateAuthoringButtons',
			errors,
			warnings,
			example: EXAMPLE_PAYLOADS.sendButtons.buttons
		});
	}

	if (warnings.length) {
		sock.logger?.warn?.(warnings, '[button-sender] Button validation warnings');
	}

	// Normalise to native_flow format
	const interactiveButtons = buildInteractiveButtons(cleaned);

	const payload = { text, footer, interactiveButtons };
	if (title) payload.title = title;
	if (subtitle) payload.subtitle = subtitle;

	return sendInteractiveMessage(sock, jid, payload, options);
}
