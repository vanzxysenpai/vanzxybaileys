import { BaseBuilder, Toolkit, extractIE, waitAllPromises, botMetadataSignature, botMetadataCertificate, crypto, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2 } from './shared.js';
import { DEFAULT_AI_BOT_JID } from '../Defaults/bot-jid.js';

// --- error classes (self-contained: only AIRich.js uses these three) --------------------------

class AIRichError extends Error {
	constructor(message, code = 'AIRICH_ERROR', meta = {}) {
		super(message);
		this.name = 'AIRichError';
		this.code = code;
		Object.assign(this, meta);
	}
}
class ItemNotFoundError extends AIRichError {
	constructor(message, meta = {}) { super(message, 'ITEM_NOT_FOUND', meta); this.name = 'ItemNotFoundError'; }
}
class DuplicateIdError extends AIRichError {
	constructor(message, meta = {}) { super(message, 'DUPLICATE_ID', meta); this.name = 'DuplicateIdError'; }
}
class ContentValidationError extends AIRichError {
	constructor(message, meta = {}) { super(message, 'CONTENT_VALIDATION', meta); this.name = 'ContentValidationError'; }
}

// --- { id, insertAt, replace } bookkeeping for every add*()/set*() call ------------------------
// Wraps a builder instance in a Proxy that tracks two parallel arrays (a flat "sub" list and a
// grouped "sections" list) in a `_blocks` Map (id -> { subItems, secItems }), so add*/set* calls
// can be addressed, replaced, or inserted-after by id. Inlined here — AIRich.js is its only user.
// setters whose arguments can legitimately carry an `id`/`replace` key (a quoted message, a raw payload) —
// these must NOT be read as { id, insertAt, replace } block options by the proxy below.
const NON_BLOCK_SETTERS = new Set(['setQuoted', 'setUnifiedResponseData', 'setMentions']);

function withBlockTracking(target, { subField = '_submessages', secField = '_sections' } = {}) {
	target._blocks = new Map();
	target._lastBlock = null;

	return new Proxy(target, {
		get(target, prop, receiver) {
			const orig = Reflect.get(target, prop, receiver);
			if (typeof orig !== 'function') return orig;

			if (!/^(add|set)/.test(String(prop)) || NON_BLOCK_SETTERS.has(String(prop))) {
				return (...args) => {
					const result = orig.apply(target, args);
					return result === target ? receiver : result;
				};
			}

			return (...args) => {
				// Vanz@Add (v2.1.14) --- opts()/optsAt() pending options (Go `Opts`/`OptsAt`): consumed by the NEXT add*/set* call; inline options win.
				const pending = target._pendingOpts ?? null;
				target._pendingOpts = null;
				const opts = args.find((a) => a && typeof a === 'object' && !Array.isArray(a) && !Buffer.isBuffer(a) && ('id' in a || 'insertAt' in a || 'replace' in a)) ?? pending;
				const id = opts?.id;
				const insertAt = opts?.insertAt;
				const replace = opts?.replace;

				if (id && target._blocks.has(id) && replace !== id) {
					throw new DuplicateIdError(`add*/set*: id "${id}" is already registered — each id must be unique (pass { replace: "${id}" } to update that block instead, or use a different id)`);
				}

				const subBefore = target[subField].length;
				const secBefore = target[secField].length;

				const result = orig.apply(target, args);

				const subItems = target[subField].splice(subBefore);
				const secItems = target[secField].splice(secBefore);

				if (insertAt) {
					const anchor = target._blocks.get(insertAt);
					if (!anchor) throw new ItemNotFoundError(`insertAt: no block registered with id "${insertAt}" (register it by passing { id: "${insertAt}" } on an earlier add*() call)`);

					// insertAtOffset (via optsAt): 0 = right after the anchor block, -1 = right before it, -2 = one block earlier, ...
					const offset = Number.isInteger(opts?.insertAtOffset) ? opts.insertAtOffset : 0;
					const place = (field, items, anchorItems) => {
						const arr = target[field];
						let idx;
						if (offset < 0) {
							const first = anchorItems[0];
							idx = first ? arr.indexOf(first) + offset + 1 : arr.length;
						} else {
							const last = anchorItems[anchorItems.length - 1];
							idx = last ? arr.indexOf(last) + 1 : arr.length;
						}
						arr.splice(Math.max(0, Math.min(idx, arr.length)), 0, ...items);
					};
					place(subField, subItems, anchor.subItems);
					place(secField, secItems, anchor.secItems);
				} else if (replace) {
					const old = target._blocks.get(replace);
					if (!old) throw new ItemNotFoundError(`replace: no block registered with id "${replace}" (register it first with { id: "${replace}" })`);

					let subIdx = old.subItems.length > 0 ? target[subField].indexOf(old.subItems[0]) : target[subField].length;
					if (subIdx === -1) subIdx = target[subField].length;
					for (const item of old.subItems) {
						const i = target[subField].indexOf(item);
						if (i !== -1) target[subField].splice(i, 1);
					}
					target[subField].splice(subIdx, 0, ...subItems);

					let secIdx = old.secItems.length > 0 ? target[secField].indexOf(old.secItems[0]) : target[secField].length;
					if (secIdx === -1) secIdx = target[secField].length;
					for (const item of old.secItems) {
						const i = target[secField].indexOf(item);
						if (i !== -1) target[secField].splice(i, 1);
					}
					target[secField].splice(secIdx, 0, ...secItems);

					target._blocks.delete(replace);
					if (id) target._blocks.set(id, { subItems, secItems });
					else target._blocks.set(replace, { subItems, secItems });
				} else {
					target[subField].push(...subItems);
					target[secField].push(...secItems);
				}

				if (id) target._blocks.set(id, { subItems, secItems });

				target._lastBlock = !id && !replace && (subItems.length || secItems.length) ? { subItems, secItems } : null;

				return result === target ? receiver : result;
			};
		},
	});
}

// --- syntax-highlight tokenizer for addCode() ---------------------------------------------------
// Tokenizes `code` into `{ type, value }` spans covering JS/TS/Python/Java/Go/C/C++/PHP/Rust/HTML/
// Bash/Markdown; unsupported languages fall back to a single plain-text token.
export function tokenizeCodeForRich(code, lang = 'javascript') {
	const keywordsMap = {
		javascript: new Set(['break', 'case', 'catch', 'continue', 'debugger', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'true', 'false', 'null', 'undefined', 'class', 'const', 'let', 'super', 'extends', 'export', 'import', 'yield', 'static', 'constructor', 'async', 'await', 'get', 'set']),
		typescript: new Set(['abstract', 'any', 'as', 'asserts', 'bigint', 'boolean', 'declare', 'enum', 'implements', 'infer', 'interface', 'is', 'keyof', 'module', 'namespace', 'never', 'readonly', 'require', 'number', 'object', 'override', 'private', 'protected', 'public', 'satisfies', 'string', 'symbol', 'type', 'unknown', 'using', 'from', 'break', 'case', 'catch', 'continue', 'do', 'else', 'finally', 'for', 'function', 'if', 'new', 'return', 'switch', 'this', 'throw', 'try', 'var', 'void', 'while', 'class', 'const', 'let', 'extends', 'import', 'export', 'async', 'await']),
		python: new Set(['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']),
		java: new Set(['abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while']),
		golang: new Set(['break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else', 'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface', 'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type', 'var']),
		c: new Set(['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while']),
		cpp: new Set(['alignas', 'alignof', 'and', 'auto', 'bool', 'break', 'case', 'catch', 'class', 'const', 'constexpr', 'continue', 'delete', 'do', 'double', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'private', 'protected', 'public', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'template', 'this', 'throw', 'true', 'try', 'typedef', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'while']),
		php: new Set(['abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class', 'clone', 'const', 'continue', 'declare', 'default', 'do', 'echo', 'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'extends', 'final', 'finally', 'fn', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements', 'include', 'include_once', 'instanceof', 'interface', 'match', 'namespace', 'new', 'null', 'or', 'private', 'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'trait', 'try', 'use', 'var', 'while', 'yield']),
		rust: new Set(['as', 'break', 'const', 'continue', 'crate', 'else', 'enum', 'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self', 'Self', 'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while']),
		html: new Set(['html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'video', 'audio', 'script', 'style', 'link', 'meta', 'form', 'input', 'button', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li', 'section', 'article', 'header', 'footer', 'nav', 'main']),
		bash: new Set(['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'in', 'select', 'until', 'break', 'continue', 'return', 'export', 'readonly', 'local', 'declare']),
		markdown: new Set(['#', '##', '###', '####', '#####', '######']),
	};

	if (!lang || lang === 'txt' || lang === 'text' || lang === 'plaintext') {
		return {
			codeBlock: [{ codeContent: code, highlightType: 0 }],
			unified_codeBlock: [{ content: code, type: 'DEFAULT' }],
		};
	}

	const TYPE_MAP = { 0: 'DEFAULT', 1: 'KEYWORD', 2: 'METHOD', 3: 'STR', 4: 'NUMBER', 5: 'COMMENT' };

	const keywords = keywordsMap[lang.toLowerCase()] || new Set();
	const tokens = [];

	let i = 0;

	const push = (content, type) => {
		if (!content) return;
		const last = tokens[tokens.length - 1];
		if (last && last.highlightType === type) {
			last.codeContent += content;
		} else {
			tokens.push({ codeContent: content, highlightType: type });
		}
	};

	const isIdentifier = (char) => {
		switch (lang.toLowerCase()) {
			case 'css':
				return /[a-zA-Z0-9_$-]/.test(char);
			case 'html':
				return /[a-zA-Z0-9_$:-]/.test(char);
			default:
				return /[a-zA-Z0-9_$]/.test(char);
		}
	};

	while (i < code.length) {
		const c = code[i];

		if (/\s/.test(c)) {
			let s = i;
			while (i < code.length && /\s/.test(code[i])) i++;
			push(code.slice(s, i), 0);
			continue;
		}

		if ((c === '/' && code[i + 1] === '/') || (c === '#' && ['python', 'bash'].includes(lang))) {
			let s = i;
			while (i < code.length && code[i] !== '\n') i++;
			push(code.slice(s, i), 5);
			continue;
		}

		if (c === '"' || c === "'" || c === '`') {
			let s = i;
			const q = c;
			i++;
			while (i < code.length) {
				if (code[i] === '\\' && i + 1 < code.length) {
					i += 2;
				} else if (code[i] === q) {
					i++;
					break;
				} else {
					i++;
				}
			}
			push(code.slice(s, i), 3);
			continue;
		}

		if (/[0-9]/.test(c)) {
			let s = i;
			while (i < code.length && /[0-9._]/.test(code[i])) i++;
			push(code.slice(s, i), 4);
			continue;
		}

		if (/[a-zA-Z_$]/.test(c)) {
			let s = i;
			while (i < code.length && isIdentifier(code[i])) i++;

			const word = code.slice(s, i);
			let type = 0;

			if (keywords.has(word)) {
				type = 1;
			} else if (lang === 'css') {
				let j = i;
				while (j < code.length && /\s/.test(code[j])) j++;
				if (code[j] === ':') type = 1;
			} else if (lang === 'html') {
				let p = s - 1;
				while (p >= 0 && /\s/.test(code[p])) p--;
				if (code[p] === '<' || (code[p] === '/' && code[p - 1] === '<')) type = 1;
			}

			if (type === 0) {
				let j = i;
				while (j < code.length && /\s/.test(code[j])) j++;
				if (code[j] === '(') type = 2;
			}

			push(word, type);
			continue;
		}

		push(c, 0);
		i++;
	}

	return {
		codeBlock: tokens,
		unified_codeBlock: tokens.map((t) => ({ content: t.codeContent, type: TYPE_MAP[t.highlightType] })),
	};
}

/**
 * "Rich AI-response" style message builder: text with hyperlink/citation/latex
 * inline entities, code blocks, tables, sources, image/video attachments,
 * inline product/post cards, tip banners and quick-reply suggestions —
 * everything ChatGPT/Gemini-in-WhatsApp-style bots typically render.
 *
 * Rewritten from MessageBuilder v4.7's `AIRich` reference implementation:
 * same public API and message-building logic as v4.7, wired into this fork's
 * `BaseBuilder` (title/footer/contextInfo/extraPayload) and the `withBlockTracking()` proxy
 * defined at the top of this file (the `{ id, insertAt, replace }` mechanism on every add*()/set*() call) in
 * place of v4.7's own `_nodes`/`_idIndex` bookkeeping.
 */
class AIRich extends BaseBuilder {
	#client;

	/**
	 * @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket.
	 * @param {object} [options]
	 * @param {boolean} [options.dynamic=true] When true, `build()` mints a fresh `response_id`/
	 *   `botResponseId` on every call instead of reusing the pinned ones.
	 * @param {boolean} [options.unsupportedTypeAlert=true] Gates `createAlert()` — see that method.
	 */
	constructor(client, { dynamic = true, unsupportedTypeAlert = true } = {}) {
		if (!client) {
			throw new Error('Socket is required');
		}

		super();
		this.#client = client;
		this._contextInfo = {};
		this._sections = [];
		this._submessages = [];
		this._unsupportedTypeAlert = !!unsupportedTypeAlert;
		this._dynamic = !!dynamic;
		this._responseId = crypto.randomUUID();
		this._botResponseId = crypto.randomUUID();
		this._lastMessageKey = null;
		this._inlineImages = [];
		this._title = '';
		this._botMetadataExtra = {};
		this._forwardBotJid = DEFAULT_AI_BOT_JID;
		this._embeddedScreens = [];
		this._verification = false; // Vanz@Fix 2.0.5: opt-in; the proof is random bytes, not a real Meta signature
		this._notification = false;
		this._notificationText = undefined;
		this._mentions = [];
		this._quoted = undefined;
		this._quotedParticipant = undefined;
		this._noContextInfo = false;
		this._unifiedResponseData = undefined;
		this._messageSecret = false;
		this._bypassDownload = true;
		// Vanz@Add (v2.1.14, from the Go reference's SetForwarded/SetIncludes* setters) --- builder-level defaults for build()/send().
		this._forwarded = true;
		this._includesUnifiedResponse = true;
		this._includesSubmessages = true;
		this._rawEnvelope = false;
		this._deferred = [];

		// { id, insertAt, replace } support for every add*()/set*() call — see withBlockTracking() at the top of this file.
		return withBlockTracking(this, { subField: '_submessages', secField: '_sections' });
	}

	/**
	 * Reconstruct this builder's state from an already-built/sent AIRich message (e.g. one fetched
	 * back from your own message store), so it can be edited and re-sent via `sendEdit()`.
	 * @param {object} msg A raw WA message object — either `{ key, message }` (as stored/fetched) or
	 *   just the `message` object itself. Must contain a `richResponseMessage` (nested under
	 *   `botForwardedMessage.message`, `botForwardedMessage`, or at the top level).
	 */
	loadFrom(msg) {
		if (!msg) throw new Error('AI Rich message needed');

		const message = msg.message ?? msg;

		let richResponseMessage = message?.botForwardedMessage?.message?.richResponseMessage;
		if (!richResponseMessage) richResponseMessage = message?.botForwardedMessage?.richResponseMessage;
		if (!richResponseMessage) richResponseMessage = message?.richResponseMessage;
		if (!richResponseMessage) throw new Error('richResponseMessage not found');

		const messageContextInfo = message?.messageContextInfo ?? {};
		const botMetadata = messageContextInfo?.botMetadata ?? {};

		this._title = botMetadata?.messageDisclaimerText ?? '';
		this._contextInfo = structuredClone(richResponseMessage?.contextInfo ?? {});
		this._submessages = Array.isArray(richResponseMessage?.submessages) ? structuredClone(richResponseMessage.submessages) : [];
		this._sections = [];

		const unifiedData = richResponseMessage?.unifiedResponse?.data;
		if (unifiedData) {
			try {
				const decoded = Buffer.from(unifiedData, 'base64').toString('utf8');
				const unifiedResponse = JSON.parse(decoded);
				if (Array.isArray(unifiedResponse?.sections)) this._sections = structuredClone(unifiedResponse.sections);
			} catch {
				// malformed/foreign unifiedResponse.data — fall back to empty sections rather than
				// throw; submessages (already loaded above) still render on their own.
			}
		}

		// ids aren't recoverable from the serialized payload (they only ever existed in the sending
		// builder's in-memory `_blocks` Map) — start with an empty tracking map, same as a freshly
		// constructed instance.
		this._blocks = new Map();
		this._lastBlock = null;

		this._extraPayload = {};
		for (const [key, value] of Object.entries(message ?? {})) {
			if (key !== 'messageContextInfo' && key !== 'botForwardedMessage' && key !== 'richResponseMessage') {
				this._extraPayload[key] = structuredClone(value);
			}
		}

		// lets sendEdit() be called immediately with no jid/id args if `msg` came with a `.key`.
		if (msg?.key?.remoteJid && msg?.key?.id) {
			this._lastMessageKey = { remoteJid: msg.key.remoteJid, fromMe: !!msg.key.fromMe, id: msg.key.id };
		}

		return this;
	}

	/** Pin `unifiedResponse.response_id` to a specific value instead of a fresh random one each build() — needed to re-send an edited version of an already-sent message in place. */
	setResponseId(id) {
		if (typeof id !== 'string') throw new TypeError('ID must be a string');
		this._responseId = id;
		return this;
	}

	/** Force a fresh random `response_id` on the next build(), discarding any pinned value. */
	refreshResponseId() {
		this._responseId = crypto.randomUUID();
		return this;
	}

	/** Pin `botMetadata.botResponseId` to a specific value (see setResponseId()). */
	setBotResponseId(id) {
		if (typeof id !== 'string') throw new TypeError('ID must be a string');
		this._botResponseId = id;
		return this;
	}

	/** Force a fresh random `botResponseId` on the next build(), discarding any pinned value. */
	refreshBotResponseId() {
		this._botResponseId = crypto.randomUUID();
		return this;
	}

	/** Set `botMetadata.messageDisclaimerText` — shown as the small title line above the response. */
	setTitle(title) {
		if (typeof title !== 'string') {
			throw new TypeError('setTitle(title) requires a string');
		}
		this._title = title;
		return this;
	}

	/**
	 * Merge extra fields into `messageContextInfo.botMetadata` at build time (e.g.
	 * `{ unifiedResponseMutation: { mediaDetailsMetadataList: [...] } }`, needed for a file/media
	 * artifact whose preview comes from an uploaded media entry rather than a plain URL).
	 * @param {object} extra
	 */
	setBotMetadata(extra) {
		if (!extra || typeof extra !== 'object' || Array.isArray(extra)) {
			throw new TypeError('setBotMetadata(extra) requires a plain object');
		}
		this._botMetadataExtra = { ...this._botMetadataExtra, ...extra };
		return this;
	}

	/**
	 * Override the `forwardedAiBotMessageInfo.botJid` stamped on forwarded builds (default: the
	 * Meta AI bot jid). Only used when `forwarded` is true (the default in send()/build()).
	 * @param {string} jid A `...@bot` jid.
	 */
	setForwardBotJid(jid) {
		if (typeof jid !== 'string' || !jid.endsWith('@bot')) {
			throw new TypeError("setForwardBotJid(jid) requires a string ending in '@bot'");
		}
		this._forwardBotJid = jid;
		return this;
	}

	/** Alias of `setForwardBotJid()` (README casing). */
	setForwardBotJID(jid) {
		return this.setForwardBotJid(jid);
	}

	/**
	 * Toggle the `botMetadata.verificationMetadata` block that `build()` attaches. Default `false`. NOTE: the proof is
	 * random bytes, not a real Meta signature, so it is opt-in (the Go reference `MessageBuilderv2` also ships OFF).
	 * Call `setVerificationMetadata(true)` only if you explicitly want the placeholder proof attached.
	 * @param {boolean} [enabled=true]
	 */
	setVerificationMetadata(enabled = true) {
		this._verification = !!enabled;
		return this;
	}

	/**
	 * Default for `build({ notification })` / `send({ notification })`: attach `sessionTransparencyMetadata`.
	 * @param {boolean} [enabled=true]
	 * @param {string} [text] Disclaimer text shown to the recipient. Defaults to the `setTitle()` text; omitted if neither is set.
	 */
	setNotification(enabled = true, text) {
		this._notification = !!enabled;
		if (text !== undefined) {
			if (typeof text !== 'string') throw new TypeError('setNotification(enabled, text): text must be a string');
			this._notificationText = text;
		}
		return this;
	}

	/**
	 * Tag JIDs on the card (`contextInfo.mentionedJid`). Keep the `@<lid>` tokens in your text as-is —
	 * WhatsApp renders them as the contact's name. Use LID jids so they match the token.
	 * @param {...(string|string[])} jids
	 */
	setMentions(...jids) {
		const list = jids.flat();
		if (!list.every((j) => typeof j === 'string' && j)) throw new TypeError('setMentions(...jids) requires non-empty strings');
		this._mentions = list;
		return this;
	}

	/**
	 * Default quoted message for `build()`/`send()` (same shapes `build({ quoted })` accepts).
	 * @param {object} quoted A WAMessage (`{ key, message }`) or `{ id, participant }`.
	 * @param {string} [participant]
	 */
	setQuoted(quoted, participant) {
		if (quoted != null && (typeof quoted !== 'object' || Array.isArray(quoted))) throw new TypeError('setQuoted(quoted) requires a message object');
		this._quoted = quoted ?? undefined;
		this._quotedParticipant = participant;
		return this;
	}

	/** Drop `contextInfo` from the rich response entirely (bare rich, as in captured native edits). */
	setNoContextInfo(enabled = true) {
		this._noContextInfo = !!enabled;
		return this;
	}

	/** Mint a fresh `response_id`/`botResponseId` on every `build()` (same as the constructor's `dynamic` option). */
	setDynamicIDs(enabled = true) {
		this._dynamic = !!enabled;
		return this;
	}

	/**
	 * Force `unifiedResponse.data` from a raw payload instead of the sections model.
	 * @param {object|string|Buffer|null} data Plain object (JSON-stringified), JSON string, or Buffer. `null` clears the override.
	 */
	setUnifiedResponseData(data) {
		if (data == null) {
			this._unifiedResponseData = undefined;
			return this;
		}
		if (!(typeof data === 'string' || Buffer.isBuffer(data) || typeof data === 'object')) throw new TypeError('setUnifiedResponseData(data) requires an object, string or Buffer');
		this._unifiedResponseData = data;
		return this;
	}

	/** Stamp a random 32-byte `messageContextInfo.messageSecret` on every `build()`. */
	setMessageSecret(enabled = true) {
		this._messageSecret = !!enabled;
		return this;
	}

	/** Runtime toggle for the constructor's `unsupportedTypeAlert` option (gates `createAlert()`). */
	setUnsupportedTypeAlert(enabled = true) {
		this._unsupportedTypeAlert = !!enabled;
		return this;
	}

	/** Default for `send({ bypassDownload })` — auto `sendEdit()` after `send()`. Default `true`. */
	setByPassDownload(enabled = true) {
		this._bypassDownload = !!enabled;
		return this;
	}

	/**
	 * Shortcut for `botMetadata.capabilityMetadata.capabilities`. Accepts `BotCapabilityType` enum
	 * names or numbers, e.g. `setCapabilities(['RICH_RESPONSE_UR_BLOKS_ENABLED'])`.
	 * @param {Array<string|number>} capabilities
	 */
	setCapabilities(capabilities) {
		if (!Array.isArray(capabilities)) throw new TypeError('setCapabilities(capabilities) requires an array');
		return this.setBotMetadata({ capabilityMetadata: { capabilities } });
	}

	/**
	 * Shortcut for `botMetadata.botRenderingConfigMetadata`.
	 * @param {string} bloksVersioningId
	 * @param {number} [pixelDensity=1]
	 */
	setBotRenderingConfig(bloksVersioningId, pixelDensity = 1) {
		if (typeof bloksVersioningId !== 'string' || !bloksVersioningId) {
			throw new TypeError('setBotRenderingConfig(bloksVersioningId) requires a non-empty string');
		}
		if (typeof pixelDensity !== 'number') throw new TypeError('pixelDensity must be a number');
		return this.setBotMetadata({ botRenderingConfigMetadata: { bloksVersioningId, pixelDensity } });
	}

	/** Shortcut for `botMetadata.botThreadInfo.clientInfo.type` (`AIThreadType`: UNKNOWN / DEFAULT / INCOGNITO / SIDE_CHAT). */
	setThreadType(type) {
		if (!(typeof type === 'string' || typeof type === 'number')) throw new TypeError('setThreadType(type) requires an enum name or number');
		return this.setBotMetadata({ botThreadInfo: { clientInfo: { type } } });
	}

	/** Shortcut for `botMetadata.imagineMetadata.imagineType`. */
	setImagineType(type) {
		if (!(typeof type === 'string' || typeof type === 'number')) throw new TypeError('setImagineType(type) requires an enum name or number');
		return this.setBotMetadata({ imagineMetadata: { imagineType: type } });
	}

	/** Shortcut for `botMetadata.subscriptionUpsellMetadata.requestType` (`AISubscriptionRequestType`: UNSPECIFIED / THINK_HARD / IMAGE_GEN / VIDEO_GEN). */
	setSubscriptionUpsell(requestType) {
		if (!(typeof requestType === 'string' || typeof requestType === 'number')) throw new TypeError('setSubscriptionUpsell(requestType) requires an enum name or number');
		return this.setBotMetadata({ subscriptionUpsellMetadata: { requestType } });
	}

	/**
	 * Add a full-screen/bottom-sheet "embedded screen" — a tabbed view opened by tapping into the
	 * response, as opposed to a section rendered inline. Confirmed shape (`embedded_screens` array
	 * inside `unifiedResponse.data`, alongside `sections`) from yudzxml 7.6.6 / elaina 1.3.10's core
	 * `index.js`. Used by `addHTMLCard()` below; pass a raw screen object directly for anything
	 * beyond that.
	 * @param {{id?: string, title?: string, content?: object[], tabs?: object[]}} screen
	 */
	addEmbeddedScreen(screen) {
		if (!screen || typeof screen !== 'object' || Array.isArray(screen)) {
			throw new TypeError('addEmbeddedScreen(screen) requires a plain object');
		}
		this._embeddedScreens.push(screen);
		return this;
	}

	/**
	 * Build a generic `[ UNSUPPORTED_TYPE - <type> ]` submessage fallback, or `undefined` if
	 * `unsupportedTypeAlert` was set to `false` in the constructor.
	 * @param {string} type The primitive's `__typename` (or any label), shown in the banner text.
	 */
	createAlert(type) {
		if (this._unsupportedTypeAlert) {
			return {
				messageType: 2,
				messageText: `[ UNSUPPORTED_TYPE - ${type}]`,
			};
		}

		return undefined;
	}

	// --- block id lookup/removal, backed by withBlockTracking()'s `_blocks` Map -----------------

	/** Check whether a block id was registered by an earlier `add*()`/`set*()` call passing `{id}`. */
	hasId(id) {
		return typeof id === 'string' && this._blocks.has(id);
	}

	/** List every block id registered so far, in no particular order. */
	getIds() {
		return [...this._blocks.keys()];
	}

	/** Inspect a registered block without modifying it. Returns `null` if `id` isn't registered. */
	peek(id) {
		const block = this._blocks.get(id);
		if (!block) return null;

		return { id, sections: [...block.secItems], submessages: [...block.subItems] };
	}

	/** Remove a previously-added block (by the `id` passed to its `add*()`/`set*()` call) from the message. Throws if `id` isn't registered. */
	delete(id) {
		const block = this._blocks.get(id);
		if (!block) throw new Error(`delete(id): no block registered with id "${id}"`);

		for (const item of block.subItems) {
			const idx = this._submessages.indexOf(item);
			if (idx !== -1) this._submessages.splice(idx, 1);
		}
		for (const item of block.secItems) {
			const idx = this._sections.indexOf(item);
			if (idx !== -1) this._sections.splice(idx, 1);
		}

		this._blocks.delete(id);
		return this;
	}

	/**
	 * Retroactively assign an id to the block most recently added by an add*()/set*() call that
	 * didn't pass its own `{id}`.
	 * @param {string} id
	 */
	assignId(id) {
		if (typeof id !== 'string' || !id) throw new TypeError('assignId(id) requires a non-empty string');
		if (this._blocks.has(id)) throw new Error(`assignId: id "${id}" is already registered`);
		if (!this._lastBlock) throw new Error('assignId: no untracked block to assign — call it immediately after an add*()/set*() that was passed no {id}');

		this._blocks.set(id, this._lastBlock);
		this._lastBlock = null;
		return this;
	}

	// --- content -------------------------------------------------------------------------------

	/** Push validated section(s)/submessage(s) onto the tracked arrays. `{ id, insertAt, replace }` bookkeeping is handled by the constructor's withBlockTracking() proxy — this only needs to append. */
	_addContent(section, submessage) {
		const sections = section === undefined || section === null ? [] : Array.isArray(section) ? section : [section];
		const submessages = submessage === undefined || submessage === null ? [] : Array.isArray(submessage) ? submessage : [submessage];

		if (!sections.length) {
			throw new ContentValidationError('At least one section is required');
		}

		for (const item of sections) {
			if (!item || typeof item !== 'object' || Array.isArray(item)) {
				throw new ContentValidationError('Sections must be plain objects');
			}
		}

		for (const item of submessages) {
			if (!item || typeof item !== 'object' || Array.isArray(item)) {
				throw new ContentValidationError('Submessages must be plain objects');
			}
		}

		this._sections.push(...sections);
		this._submessages.push(...submessages);

		return this;
	}

	/** Push a raw pre-built section wrapper (escape hatch for shapes not covered by the add*() helpers). */
	addSection(section, options = {}) {
		return this._addContent(section, undefined, options);
	}

	/** Push a raw pre-built submessage block (escape hatch for shapes not covered by the add*() helpers). */
	addSubmessage(submessage, options = {}) {
		if (submessage === undefined || submessage === null) {
			throw new ContentValidationError('At least one submessage is required');
		}
		return this._addContent(undefined, submessage, options);
	}

	addText(text, { hyperlink = true, citation = true, latex = true, id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const { text: extractedText, inline_entities } = extractIE(text, { hyperlink, citation, latex });

		const section = AIRich.newLayout('Single', {
			text: extractedText,
			...(inline_entities.length && { inline_entities }),
			__typename: 'GenAIMarkdownTextUXPrimitive',
		});

		const submessages = [{ messageType: 2, messageText: text }];

		return this._addContent(section, submessages, { id, replace, insertAt });
	}

	addFOAText(text, { id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const section = AIRich.newLayout('Single', { text, __typename: 'FOATextPrimitive' });
		const submessages = [{ messageType: 2, messageText: text }];

		return this._addContent(section, submessages, { id, replace, insertAt });
	}

	addCode(language, code, { id, replace, insertAt } = {}) {
		if (typeof language !== 'string' || typeof code !== 'string') {
			throw new TypeError('Language and code must be a string');
		}

		const meta = tokenizeCodeForRich(code, language);

		const section = AIRich.newLayout('Single', {
			language,
			code_blocks: meta.unified_codeBlock,
			__typename: 'GenAICodeUXPrimitive',
		});

		const submessages = [
			{
				messageType: 5,
				codeMetadata: { codeLanguage: language, codeBlocks: meta.codeBlock },
			},
		];

		return this._addContent(section, submessages, { id, replace, insertAt });
	}

	addTable(table, { hyperlink = true, citation = true, latex = true, id, replace, insertAt } = {}) {
		if (!Array.isArray(table)) {
			throw new TypeError('Table must be an array');
		}

		const meta = AIRich.toTableMetadata(table, { hyperlink, citation, latex });

		const section = AIRich.newLayout('Single', { rows: meta.unified_rows, __typename: 'GenATableUXPrimitive' });

		const submessages = [
			{
				messageType: 4,
				tableMetadata: { title: meta.title, rows: meta.rows },
			},
		];

		return this._addContent(section, submessages, { id, replace, insertAt });
	}

	addSource(sources = [], { id, replace, insertAt } = {}) {
		if (!Array.isArray(sources)) {
			throw new TypeError('Sources must be an array of strings, arrays, or objects');
		}

		const isStringArray = sources.every((item) => typeof item === 'string');
		const isArrayFormat = sources.every((item) => Array.isArray(item) && item.every((value) => typeof value === 'string'));
		const isObjectFormat = sources.every((item) => item && typeof item === 'object' && !Array.isArray(item));

		if (!isStringArray && !isArrayFormat && !isObjectFormat) {
			throw new TypeError('Sources must be a string array, array of string arrays, or array of objects');
		}

		if (isStringArray) sources = [sources];

		const normalizedSources = sources.map((source) => {
			if (Array.isArray(source)) {
				const [icon, url, title, subtitle] = source;
				return { icon, url, title, subtitle };
			}

			return {
				icon: source.favicon ?? source.icon ?? '',
				url: source.url ?? '',
				title: source.title ?? '',
				subtitle: source.subtitle ?? '',
			};
		});

		const source = normalizedSources.map(({ icon, url, title, subtitle }) => ({
			source_type: 'THIRD_PARTY',
			source_display_name: title,
			source_subtitle: subtitle,
			source_url: url,
			favicon: {
				url: Toolkit.resolveMedia(this.#client, icon, 'image'),
				mime_type: 'image/jpeg',
				width: 16,
				height: 16,
			},
		}));

		const submessage = this.createAlert('GenAISearchResultPrimitive');

		const section = AIRich.newLayout('Single', { sources: source, __typename: 'GenAISearchResultPrimitive' });

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	addReels(reelsItems = [], { id, replace, insertAt } = {}) {
		if (
			!(
				(reelsItems && typeof reelsItems === 'object' && !Array.isArray(reelsItems)) ||
				(Array.isArray(reelsItems) && reelsItems.every((item) => item && typeof item === 'object' && !Array.isArray(item)))
			)
		) {
			throw new TypeError('Reels items must be an object or an array of objects');
		}

		const items = Array.isArray(reelsItems) ? reelsItems : [reelsItems];

		const reels = items.map((item) => ({
			...item,
			_avatar: Toolkit.resolveMedia(this.#client, item.profileIconUrl ?? item.profile_url ?? item.profile ?? '', 'image'),
			_thumbnail: Toolkit.resolveMedia(this.#client, item.thumbnailUrl ?? item.thumbnail ?? '', 'image'),
		}));

		const section = AIRich.newLayout(
			'HScroll',
			reels.map((item) => ({
				reels_url: item.videoUrl ?? item.url ?? '',
				thumbnail_url: item._thumbnail,
				creator: item.username ?? item.title ?? '',
				avatar_url: item._avatar,
				reels_title: item.reels_title ?? item.title ?? '',
				likes_count: item.likes_count ?? item.like ?? 0,
				shares_count: item.shares_count ?? item.share ?? 0,
				view_count: item.view_count ?? item.view ?? 0,
				reel_source: item.reel_source ?? item.source ?? 'IG',
				is_verified: !!(item.is_verified || item.verified),
				__typename: 'GenAIReelPrimitive',
			}))
		);

		const submessages = [
			{
				messageType: 9,
				contentItemsMetadata: {
					contentType: 1,
					itemsMetadata: reels.map((item) => ({
						reelItem: {
							title: item.username ?? '',
							profileIconUrl: item._avatar,
							thumbnailUrl: item._thumbnail,
							videoUrl: item.videoUrl ?? item.url ?? '',
						},
					})),
				},
			},
		];

		return this._addContent(section, submessages, { id, replace, insertAt });
	}

	addImage(imageUrl, { width, height, status = 'READY', update_text, resolveUrl = false, id, replace, insertAt } = {}) {
		if (!(typeof imageUrl === 'string' || Buffer.isBuffer(imageUrl) || (Array.isArray(imageUrl) && imageUrl.every((v) => typeof v === 'string' || Buffer.isBuffer(v))))) {
			throw new TypeError('imageUrl must be string | buffer | array of string/buffer');
		}

		const list = Array.isArray(imageUrl)
			? imageUrl.map((v) => {
					const url = Toolkit.resolveMedia(this.#client, v, 'image', { resolveUrl });
					return { imagePreviewUrl: url, imageHighResUrl: url, sourceUrl: url };
				})
			: (() => {
					const url = Toolkit.resolveMedia(this.#client, imageUrl, 'image', { resolveUrl });
					return [{ imagePreviewUrl: url, imageHighResUrl: url, sourceUrl: url }];
				})();

		const sections = list.map(({ imagePreviewUrl }) =>
			AIRich.newLayout('Single', {
				media: { url: imagePreviewUrl, mime_type: 'image/png', width, height },
				imagine_type: 'IMAGE',
				status: { status, update_text },
				__typename: 'GenAIImaginePrimitive',
			})
		);

		const submessage = {
			messageType: 1,
			gridImageMetadata: {
				gridImageUrl: { imagePreviewUrl: list[0]?.imagePreviewUrl },
				imageUrls: list,
			},
		};

		return this._addContent(sections, submessage, { id, replace, insertAt });
	}

	addVideo(videoUrl, { autoFill = true, status = 'READY', estimatedTime, id, replace, insertAt } = {}) {
		const isObjectVideo = (v) => v && typeof v === 'object' && !Array.isArray(v) && v.url;

		const isValidPrimitive =
			typeof videoUrl === 'string' ||
			Buffer.isBuffer(videoUrl) ||
			isObjectVideo(videoUrl) ||
			(Array.isArray(videoUrl) && videoUrl.every((v) => typeof v === 'string' || Buffer.isBuffer(v) || isObjectVideo(v)));

		if (!isValidPrimitive) {
			throw new TypeError('videoUrl must be string | buffer | object | array');
		}

		const items = Array.isArray(videoUrl) ? videoUrl : [videoUrl];

		const alert = this.createAlert('GenAIImaginePrimitive (ANIMATE)');

		const sections = [];
		const submessages = [];

		for (const item of items) {
			const isObject = isObjectVideo(item);

			const url = isObject ? Toolkit.resolveMedia(this.#client, item.url ?? '', 'video') : Toolkit.resolveMedia(this.#client, item, 'video');

			const bufferPromise = autoFill ? Promise.resolve(url).then((u) => Toolkit.fetchBuffer(u)) : null;

			const file_length = isObject && item.file_length != null ? item.file_length : autoFill ? bufferPromise.then((b) => b?.length ?? 0) : 0;

			const duration =
				isObject && item.duration != null
					? item.duration
					: autoFill
						? bufferPromise.then((b) => Toolkit.getMp4Duration(b, { silent: true }))
						: 0;

			const thumbnail =
				isObject && item.thumbnail
					? Toolkit.resolveMedia(this.#client, item.thumbnail, 'image', { result: 'base64', resize: true, width: 300, height: 300 })
					: autoFill
						? bufferPromise?.then((b) => Toolkit.getMp4Preview(b, { time: 0, result: 'base64' }))
						: null;

			sections.push(
				AIRich.newLayout('Single', {
					media: {
						url,
						mime_type: isObject ? (item.mime_type ?? 'video/mp4') : 'video/mp4',
						file_length,
						duration,
					},
					imagine_type: 'ANIMATE',
					status: {
						status,
						estimated_completion_time: estimatedTime != null ? Math.floor((Date.now() + estimatedTime) / 1000) : undefined,
					},
					thumbnail: { raw_media: thumbnail },
					__typename: 'GenAIImaginePrimitive',
				})
			);
		}

		if (alert !== undefined) submessages.push(alert);

		if (submessages.length > 1) {
			throw new Error('Video content can only have one submessage');
		}

		return this._addContent(sections, submessages[0], { id, replace, insertAt });
	}

	addProduct(data = {}, { id, replace, insertAt } = {}) {
		if (!((data && typeof data === 'object' && !Array.isArray(data)) || (Array.isArray(data) && data.every((item) => item && typeof item === 'object' && !Array.isArray(item))))) {
			throw new TypeError('Product items must be an object or an array of objects');
		}

		const items = Array.isArray(data) ? data : [data];

		const product = items.map((item) => ({
			title: item.title,
			brand: item.brand,
			price: item.price,
			sale_price: item.sale_price,
			product_url: item.product_url ?? item.url,
			image: { url: Toolkit.resolveMedia(this.#client, item.image_url ?? item.image, 'image') },
			additional_images: [{ url: Toolkit.resolveMedia(this.#client, item.icon_url ?? item.icon, 'image') }],
			__typename: 'GenAIProductItemCardPrimitive',
		}));

		const section = AIRich.newLayout(Array.isArray(data) ? 'HScroll' : 'Single', Array.isArray(data) ? product : product[0]);

		const submessage = this.createAlert('GenAIProductItemCardPrimitive');

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	addPost(data = {}, { id, replace, insertAt } = {}) {
		if (!((data && typeof data === 'object' && !Array.isArray(data)) || (Array.isArray(data) && data.every((item) => item && typeof item === 'object' && !Array.isArray(item))))) {
			throw new TypeError('Post items must be an object or an array of objects');
		}

		const posts = Array.isArray(data) ? data : [data];

		const primitives = posts.map((p) => ({
			title: p.title ?? '',
			subtitle: p.subtitle ?? '',
			username: p.username ?? '',
			profile_picture_url: Toolkit.resolveMedia(this.#client, p.profile_picture_url ?? p.profile_url ?? p.profile ?? '', 'image'),
			is_verified: !!(p.is_verified || p.verified),
			thumbnail_url: Toolkit.resolveMedia(this.#client, p.thumbnail_url ?? p.thumbnail ?? '', 'image'),
			post_caption: p.post_caption ?? p.caption ?? '',
			likes_count: p.likes_count ?? p.like ?? 0,
			comments_count: p.comments_count ?? p.comment ?? 0,
			shares_count: p.shares_count ?? p.share ?? 0,
			post_url: p.post_url ?? p.url ?? '',
			post_deeplink: p.post_deeplink ?? p.deeplink ?? '',
			source_app: p.source_app || p.source || 'INSTAGRAM',
			footer_label: p.footer_label ?? p.footer ?? '',
			footer_icon: Toolkit.resolveMedia(this.#client, p.footer_icon ?? p.icon ?? '', 'image'),
			is_carousel: posts.length > 1,
			orientation: p.orientation ?? 'LANDSCAPE',
			post_type: p.post_type ?? 'VIDEO',
			__typename: 'GenAIPostPrimitive',
		}));

		const section = AIRich.newLayout('HScroll', primitives);

		const submessage = this.createAlert('GenAIPostPrimitive');

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	addMetadata(text, { id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const section = AIRich.newLayout('Single', { text, __typename: 'GenAIMetadataTextPrimitive' });
		const submessage = { messageType: 2, messageText: text };

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	addTip(text, { id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const section = AIRich.newLayout('Single', { text: 'ⓘ ' + text, __typename: 'GenAIMetadataTextPrimitive' });
		const submessage = { messageType: 2, messageText: text };

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	addWidget(data, { layout, id, replace, insertAt, ...options } = {}) {
		if (!((data && typeof data === 'object' && !Array.isArray(data)) || (Array.isArray(data) && data.every((item) => item && typeof item === 'object' && !Array.isArray(item))))) {
			throw new TypeError('Widget must be an object or an array of objects');
		}

		const isArray = Array.isArray(data);
		const items = isArray ? data : [data];

		const widgets = items.map((item) => ({
			__typename: 'GenAI3PExtWidgetPrimitive',
			header: { __typename: 'GenAI3PExtWidgetStandardHeader', title: item.title ?? '', ...(item.header ?? {}) },
			body: {
				__typename: 'GenAI3PExtCalendarEventList',
				sections: item.sections ?? [],
				ctas: (item.actions ?? []).map((action) => ({
					__typename: 'GenAI3PExtWidgetCTA',
					label: action.label ?? '',
					state: action.state ?? 'PENDING',
					kind: action.kind ?? 'OTHER',
					tool_call_id: action.tool_call_id ?? action.id ?? '',
					...(action.toast && { toast: { __typename: 'GenAI3PExtWidgetToast', label: action.toast.label ?? action.label ?? '' } }),
				})),
				...(item.body ?? {}),
			},
		}));

		const section = AIRich.newLayout(layout ?? (isArray ? 'HScroll' : 'Single'), isArray ? widgets : widgets[0], options);

		const submessage = this.createAlert('GenAI3PExtWidgetStandardHeader');

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	addFooterAction(data, { layout, id, replace, insertAt, ...options } = {}) {
		if (!((data && typeof data === 'object' && !Array.isArray(data)) || (Array.isArray(data) && data.every((item) => item && typeof item === 'object' && !Array.isArray(item))))) {
			throw new TypeError('Footer action must be an object or an array of objects');
		}

		const isArray = Array.isArray(data);
		const items = isArray ? data : [data];

		const actions = items.map((item) => ({
			__typename: 'GenAIFooterActionPrimitive',
			cta_text: item.text ?? item.cta_text ?? '',
			cta_type: item.type ?? item.cta_type ?? 'OPEN_URL',
			cta_url: item.url ?? item.cta_url ?? '',
		}));

		const section = AIRich.newLayout(layout ?? (isArray ? 'HScroll' : 'Single'), isArray ? actions : actions[0], options);

		const submessage = this.createAlert('GenAIFooterActionPrimitive');

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	addSuggest(suggestion, { scroll = true, layout, id, replace, insertAt } = {}) {
		if (!(typeof suggestion === 'string' || (Array.isArray(suggestion) && suggestion.every((v) => typeof v === 'string')))) {
			throw new TypeError('Suggestion must be a string or array of strings');
		}

		const suggest = Array.isArray(suggestion)
			? suggestion.map((text) => ({ prompt_text: text, prompt_type: 'SUGGESTED_PROMPT', __typename: 'GenAIFollowUpSuggestionPillPrimitive' }))
			: [{ prompt_text: suggestion, prompt_type: 'SUGGESTED_PROMPT', __typename: 'GenAIFollowUpSuggestionPillPrimitive' }];

		const type = layout ?? (suggest.length === 1 ? 'Single' : scroll ? 'HScroll' : 'ActionRow');

		const section = AIRich.newLayout(type, type === 'Single' ? suggest[0] : suggest, { __typename: 'GenAIUnifiedResponseSection' });

		const submessage = this.createAlert('GenAIFollowUpSuggestionPillPrimitive');

		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	// --- v2.1.13: reinstated / ported from the Go reference (MessageBuilderv2) ----------------------

	/**
	 * Image card with independent preview and full-resolution urls (`gridImageMetadata` + `GenAIImaginePrimitive`,
	 * the same layout `addImage()` uses). Reinstated in 2.1.13 — it was documented in the README but missing from source.
	 * @param {string|Buffer} previewUrl Thumbnail shown in the card.
	 * @param {string|Buffer} [fullUrl] Full-resolution image (defaults to `previewUrl`).
	 */
	addImageCard(previewUrl, fullUrl, { width, height, status = 'READY', update_text, resolveUrl = false, id, replace, insertAt } = {}) {
		const ok = (v) => typeof v === 'string' || Buffer.isBuffer(v);
		if (!ok(previewUrl)) throw new TypeError('addImageCard(previewUrl, fullUrl) requires previewUrl as string | Buffer');
		if (fullUrl != null && !ok(fullUrl)) throw new TypeError('addImageCard(previewUrl, fullUrl): fullUrl must be string | Buffer');

		const resolveImage = (value) => {
			if (!resolveUrl && typeof value === 'string' && /^https?:\/\//i.test(value)) {
				return value;
			}
			return Toolkit.resolveMedia(this.#client, value, 'image', { resolveUrl });
		};

		const preview = resolveImage(previewUrl);
		const full = fullUrl == null ? preview : resolveImage(fullUrl);

		const section = AIRich.newLayout('Single', {
			media: { url: preview, mime_type: 'image/png', width, height },
			imagine_type: 'IMAGE',
			status: { status, update_text },
			__typename: 'GenAIImaginePrimitive',
		});

		const submessage = {
			messageType: 1,
			gridImageMetadata: {
				gridImageUrl: { imagePreviewUrl: preview },
				imageUrls: [{ imagePreviewUrl: preview, imageHighResUrl: full, sourceUrl: full }],
			},
		};

		return this._addContent([section], submessage, { id, replace, insertAt });
	}

	/**
	 * Single comment line. Text-only rendering (markdown), same as the Go reference.
	 * @param {{actorName?: string, actor_name?: string, commentText?: string, comment_text?: string, subtitle?: string}} comment
	 */
	addComment(comment = {}, { id, replace, insertAt } = {}) {
		const actor = comment.actorName ?? comment.actor_name ?? '';
		const body = comment.commentText ?? comment.comment_text ?? '';
		if (!actor && !body) throw new TypeError('addComment({ actorName?, commentText? }) requires at least one of them');
		let text = `💬 ${actor ? `${actor}: ` : ''}${body}`;
		if (comment.subtitle) text += `\n_${comment.subtitle}_`;
		return this.addText(text, { id, replace, insertAt });
	}

	/**
	 * List of actions/links. Text-only rendering (`▸ title — subtitle` lines), same as the Go reference — the
	 * native `GenAIActionListPrimitive` wire shape has never been captured for this fork.
	 * @param {{title: string, subtitle?: string}[]} rows
	 */
	addActionList(rows, { id, replace, insertAt } = {}) {
		if (!Array.isArray(rows) || !rows.length || !rows.every((r) => r && typeof r.title === 'string' && r.title)) {
			throw new TypeError('addActionList(rows) requires a non-empty array of { title, subtitle? }');
		}
		return this.addText(rows.map((r) => `▸ ${r.title}${r.subtitle ? ` — ${r.subtitle}` : ''}`).join('\n'), { id, replace, insertAt });
	}

	/** One reasoning step (bold title + body), text-only rendering like the Go reference. */
	addChainOfThoughtStep(title, body, { id, replace, insertAt } = {}) {
		if (typeof title !== 'string' || !title) throw new TypeError('addChainOfThoughtStep(title, body?) requires a non-empty title');
		return this.addText(body ? `**${title}**\n${body}` : title, { id, replace, insertAt });
	}

	/**
	 * "Thinking" banner using the `GenAIBotProgressStatusPrimitive` shape (icon `THINKING`) — the same primitive
	 * `addProgressStatus()` uses (confirmed rendering), unlike `addThinkingStatus()`'s own typename which stock
	 * WA clients render blank. Matches the Go reference's `AddThinking`.
	 */
	addThinking(title = 'Thinking', { icon = 'THINKING', is_in_progress = true, id, replace, insertAt } = {}) {
		if (typeof title !== 'string' || !title) throw new TypeError('addThinking(title) requires a non-empty string');
		return this.addProgressStatus(title, { icon, is_in_progress, id, replace, insertAt });
	}

	/**
	 * Generic escape hatch: push any `GenAI*` primitive as a `Single` layout (empty/null fields are dropped so
	 * they can't crash the client). Use for captured shapes that don't have a dedicated method yet, e.g.
	 * `addPrimitive('GenAISearchPlannerStepsPrimitive', {...})`.
	 * @param {string} typeName The primitive's `__typename`.
	 * @param {object} payload
	 */
	addPrimitive(typeName, payload, { id, replace, insertAt } = {}) {
		if (typeof typeName !== 'string' || !typeName) throw new TypeError('addPrimitive(typeName, payload) requires a non-empty typeName');
		if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new TypeError('addPrimitive(typeName, payload) requires a plain-object payload');
		return this._addSinglePrimitive(typeName, payload, { id, replace, insertAt });
	}

	/** Public door to `_addContent()` — insert a raw section (or sections) plus optional submessage(s), as-is. */
	addContentRaw(section, submessage, { id, replace, insertAt } = {}) {
		if (!section) throw new TypeError('addContentRaw(section, submessage?) requires a section');
		return this._addContent(section, submessage, { id, replace, insertAt });
	}

	// --- experimental primitives (v2.1.12) --------------------------------------------------------
	// Original implementations of wire shapes observed in captured Meta-AI traffic. As with the other
	// captured-traffic primitives (see the batch-render notes), the WA client/account decides whether
	// each one actually renders — test them one at a time on a real device, not in a 120-method batch.

	/** @private Push one `GenAI*` primitive as a `Single` layout, with the usual unsupported-type alert submessage. */
	_addSinglePrimitive(typeName, payload, { id, replace, insertAt } = {}) {
		const clean = AIRich._omitEmpty(payload);
		const section = AIRich.newLayout('Single', { ...clean, __typename: typeName }, { __typename: 'GenAIUnifiedResponseSection' });
		return this._addContent(section, this.createAlert(typeName), { id, replace, insertAt });
	}

	/** @private Drop undefined/null/'' recursively so we never send explicit nulls (they can crash the WA renderer). */
	static _omitEmpty(value) {
		if (Array.isArray(value)) return value.map((v) => AIRich._omitEmpty(v));
		if (value && typeof value === 'object') {
			const out = {};
			for (const [k, v] of Object.entries(value)) {
				if (v === undefined || v === null || v === '') continue;
				const c = AIRich._omitEmpty(v);
				if (c && typeof c === 'object' && !Array.isArray(c) && !Object.keys(c).length) continue;
				out[k] = c;
			}
			return out;
		}
		return value;
	}

	/**
	 * Follow-up suggestion card with a title/image (richer sibling of `addSuggest()`), `GenAIChainingSuggestionPrimitive`.
	 * @param {{promptText: string, title?: string, imageUri?: string, externalConversationId?: string, topic?: string, cardId?: string}} options
	 */
	addChainingSuggestionV2({ promptText, title, imageUri, externalConversationId, topic, cardId, id, replace, insertAt } = {}) {
		if (typeof promptText !== 'string' || !promptText) throw new TypeError('addChainingSuggestionV2({ promptText }) requires a non-empty string');
		return this._addSinglePrimitive(
			'GenAIChainingSuggestionPrimitive',
			{ prompt_text: promptText, title, image_uri: imageUri, external_conversation_id: externalConversationId, topic, card_id: cardId },
			{ id, replace, insertAt }
		);
	}

	/**
	 * Place card (`GenAIPlaceEntityItem`).
	 * @param {{placeId?: string, name: string, imageUrl?: string, motivation?: string, key?: string, latitude?: number|string, longitude?: number|string, itemType?: string, address?: {streetAddress?: string, region?: string, country?: string, postalCode?: string, locality?: string, street?: string}, category?: {displayName?: string, categoryId?: string}, rating?: number|string}} place
	 */
	addPlaceEntity({ placeId, name, imageUrl, motivation, key, latitude, longitude, itemType, address = {}, category = {}, rating, id, replace, insertAt } = {}) {
		if (typeof name !== 'string' || !name) throw new TypeError('addPlaceEntity({ name }) requires a non-empty string');
		return this._addSinglePrimitive(
			'GenAIPlaceEntityItem',
			{
				place_id: placeId,
				name,
				image_url: imageUrl,
				motivation,
				key,
				latitude: latitude === undefined ? undefined : String(latitude),
				longitude: longitude === undefined ? undefined : String(longitude),
				item_type: itemType,
				address: {
					street_address: address.streetAddress,
					region: address.region,
					country: address.country,
					postal_code: address.postalCode,
					locality: address.locality,
					street: address.street,
				},
				category: { display_name: category.displayName, category_id: category.categoryId },
				rating: rating === undefined ? undefined : { avg_rating: String(rating) },
			},
			{ id, replace, insertAt }
		);
	}

	/**
	 * Social-search result card (`GenAISearchResultV2Primitive`).
	 * @param {{searchQuery?: string, metadata?: string, postId?: string, reelsUrl?: string, reelsDeeplink?: string, reelsTitle?: string, thumbnailUrl?: string, avatarUrl?: string, creator?: string, isVerified?: boolean, sourceApp?: string, timestamp?: string, originalWidth?: number, originalHeight?: number, primitives?: object[]}} result
	 */
	addSearchResultV2({ searchQuery, metadata, postId, reelsUrl, reelsDeeplink, reelsTitle, thumbnailUrl, avatarUrl, creator, isVerified, sourceApp, timestamp, originalWidth, originalHeight, primitives, id, replace, insertAt } = {}) {
		if (!searchQuery && !reelsUrl && !postId && !(primitives && primitives.length)) {
			throw new TypeError('addSearchResultV2() needs at least one of: searchQuery, reelsUrl, postId, primitives');
		}
		return this._addSinglePrimitive(
			'GenAISearchResultV2Primitive',
			{
				metadata,
				search_query: searchQuery,
				primitives,
				post_id: postId,
				reels_url: reelsUrl,
				reels_deeplink: reelsDeeplink,
				thumbnail_url: thumbnailUrl,
				avatar_url: avatarUrl,
				creator,
				reels_title: reelsTitle,
				is_verified: isVerified,
				source_app: sourceApp,
				timestamp,
				original_width: originalWidth,
				original_height: originalHeight,
			},
			{ id, replace, insertAt }
		);
	}

	/**
	 * Compact "sources" chip row (`GenAIContextualSourcesViewModel`).
	 * @param {Array<{faviconUri?: string, displayName: string, uri: string}>} sources
	 * @param {string|object} [contextualSources] Optional primary-source payload (objects are JSON-stringified).
	 */
	addContextualSources(sources, contextualSources, { id, replace, insertAt } = {}) {
		if (!Array.isArray(sources) || !sources.length) throw new TypeError('addContextualSources(sources) requires a non-empty array');
		const list = sources.map((s, i) => {
			if (!s || typeof s.uri !== 'string' || typeof s.displayName !== 'string') {
				throw new TypeError(`addContextualSources: sources[${i}] needs { displayName, uri }`);
			}
			return { favicon_uri: s.faviconUri, display_name: s.displayName, uri: s.uri };
		});
		const contextual = contextualSources === undefined ? undefined : typeof contextualSources === 'string' ? contextualSources : JSON.stringify(contextualSources);
		return this._addSinglePrimitive('GenAIContextualSourcesViewModel', { sources: list, contextual_sources: contextual }, { id, replace, insertAt });
	}

	/**
	 * Raw media item (`GenAIMediaItem`) — for media you already uploaded/host, addressed by url and/or `media_id`.
	 * @param {{url?: string, mimeType?: string, urlFallback?: string, mediaId?: string, fileLength?: number, width?: number, height?: number, durationMs?: number, expirationTimestampMs?: number, thumbnail?: string, encryption?: {mediaKey: string, directPath: string, fileSha256: string, fileEncSha256: string, scansSidecar?: string, scanLengths?: number[], mediaKeyTimestamp?: number, fileLength?: number}}} media
	 */
	addMediaItem({ url, mimeType, urlFallback, mediaId, fileLength, width, height, durationMs, expirationTimestampMs, thumbnail, encryption, id, replace, insertAt } = {}) {
		if (!url && !mediaId) throw new TypeError('addMediaItem() requires url and/or mediaId');
		const media = {
			url,
			mime_type: mimeType,
			url_fallback: urlFallback,
			media_id: mediaId,
			file_length: fileLength,
			width,
			height,
			duration: durationMs,
			expiration_timestamp_ms: expirationTimestampMs,
			thumbnail: thumbnail ? { raw_media: thumbnail } : undefined,
			encryption_data: encryption
				? {
						media_key: encryption.mediaKey,
						direct_path: encryption.directPath,
						file_sha256: encryption.fileSha256,
						file_enc_sha256: encryption.fileEncSha256,
						scans_sidecar: encryption.scansSidecar,
						scan_lengths: encryption.scanLengths,
						media_key_timestamp: encryption.mediaKeyTimestamp,
						file_length: encryption.fileLength,
					}
				: undefined,
		};
		return this._addSinglePrimitive('GenAIMediaItem', { media }, { id, replace, insertAt });
	}

	// --- build / send ----------------------------------------------------------------------------

	/**
	 * Build (but don't send) the full AI-rich message content, wrapped and ready for `relayMessage()`.
	 * @param {string} jid Destination chat/group jid.
	 */
	async build(
		jid,
		{ forwarded = this._forwarded, notification = this._notification, notificationText, verificationMetadata = this._verification, includesUnifiedResponse = this._includesUnifiedResponse, includesSubmessages = this._includesSubmessages, quoted = this._quoted, quotedParticipant = this._quotedParticipant, noContextInfo = this._noContextInfo, messageId, ...options } = {}
	) {
		if (this._deferred.length) {
			const jobs = this._deferred.splice(0);
			await Promise.all(jobs.map((fn) => fn()));
		}

		const forward = forwarded
			? {
					forwardingScore: 1,
					isForwarded: true,
					forwardedAiBotMessageInfo: { botJid: this._forwardBotJid },
					forwardOrigin: 4,
				}
			: {};

		// disclaimerText is user-visible to the recipient: never hardcode a credit line here (credits live in NOTICE.md).
		const disclaimer = notificationText ?? this._notificationText ?? (this._title || undefined);
		const notif = notification
			? {
					sessionTransparencyMetadata: {
						...(disclaimer ? { disclaimerText: disclaimer } : {}),
						hcaId: `hca_${Date.now()}`,
						sessionTransparencyType: 1,
					},
				}
			: {};

		const qObj = quoted
			? {
					stanzaId: quoted?.key?.id || quoted?.id,
					participant: quotedParticipant || quoted?.key?.participant || quoted?.participant || quoted?.key?.remoteJid,
					quotedType: 0,
					quotedMessage: typeof quoted === 'object' && quoted !== null ? (quoted.message ?? quoted) : undefined,
				}
			: {};

		const sections = this._footer
			? [...(await waitAllPromises(this._sections)), AIRich.newLayout('Single', { text: this._footer, __typename: 'GenAIMetadataTextPrimitive' })]
			: [...(await waitAllPromises(this._sections))];

		const embeddedScreens = await waitAllPromises(this._embeddedScreens);

		if (this._dynamic) {
			this.refreshResponseId();
			this.refreshBotResponseId();
		}

		return generateWAMessageFromContent(
			jid,
			{
				messageContextInfo: {
					deviceListMetadata: {},
					deviceListMetadataVersion: 2,
					...(this._messageSecret ? { messageSecret: crypto.randomBytes(32) } : {}),
					botMetadata: {
						messageDisclaimerText: this._title,
						...(this._rawEnvelope ? {} : notif),
						...(verificationMetadata
							? {
									verificationMetadata: {
										proofs: [
											{
												certificateChain: [botMetadataCertificate(), botMetadataCertificate(892)],
												version: 1,
												useCase: 1,
												signature: botMetadataSignature(),
											},
										],
									},
								}
							: {}),
						botResponseId: this._botResponseId,
						...this._botMetadataExtra,
					},
				},
				...this._extraPayload,
				botForwardedMessage: {
					message: {
						richResponseMessage: {
							messageType: 1,
							submessages: includesSubmessages ? await waitAllPromises(this._submessages) : [],
							unifiedResponse: {
								data: includesUnifiedResponse
									? this._unifiedResponseData != null
										? Buffer.from(typeof this._unifiedResponseData === 'object' && !Buffer.isBuffer(this._unifiedResponseData) ? JSON.stringify(this._unifiedResponseData) : this._unifiedResponseData).toString('base64')
										: Buffer.from(
											Toolkit.stringifyEscaped({
												response_id: this._responseId,
												sections,
												...(embeddedScreens.length ? { embedded_screens: embeddedScreens } : {}),
											})
										).toString('base64')
									: '',
							},
							...(noContextInfo ? {} : { contextInfo: { ...forward, ...qObj, ...(this._mentions.length ? { mentionedJid: this._mentions } : {}), ...this._contextInfo } }),
						},
					},
				},
			},
			{ messageId: messageId || generateMessageIDV2(), ...options }
		);
	}

	/**
	 * Build a `protocolMessage` (type EDIT) that patches an already-sent AIRich message in place.
	 * @param {string} targetJid Chat the original message lives in.
	 * @param {string} targetId `key.id` of the original message.
	 * @param {object} [opts] Pass `{ msg }` to reuse an already-built message content instead of rebuilding via build().
	 */
	async buildEdit(targetJid, targetId, { msg, messageId, ...options } = {}) {
		if (!msg) {
			msg = (await this.build(targetJid, options)).message;
		}

		const editedMessage = msg;

		if (!editedMessage) {
			throw new Error('buildEdit: msg does not contain botForwardedMessage');
		}

		return generateWAMessageFromContent(
			targetJid,
			{
				botForwardedMessage: {
					message: {
						protocolMessage: {
							key: { remoteJid: targetJid, fromMe: true, id: targetId },
							type: 14, // MESSAGE_EDIT
							editedMessage,
						},
					},
				},
			},
			{ messageId: messageId || generateMessageIDV2(), ...options }
		);
	}

	/**
	 * Rebuild this AIRich message's current content and patch it into an already-sent message in
	 * place (WA edits the bubble instead of showing a new one). With no args, edits the message from
	 * the last send()/sendEdit() call.
	 * @param {string} [jid] Defaults to the jid from the last send()/sendEdit().
	 * @param {string} [id] Defaults to the message id from the last send()/sendEdit().
	 */
	async sendEdit(jid, id, { msg, messageId, additionalNodes = [], ...options } = {}) {
		jid = jid ?? this._lastMessageKey?.remoteJid;
		id = id ?? this._lastMessageKey?.id;

		if (!jid) throw new Error('JID is required');
		if (!id) throw new Error('Message id is required');

		const msgEdit = await this.buildEdit(jid, id, { msg, messageId: messageId || generateMessageIDV2(), ...options });

		await this.#client.relayMessage(jid, msgEdit.message, { messageId: msgEdit.key.id, additionalNodes });

		return msgEdit;
	}

	/**
	 * Build a *native-format* edit: a top-level `protocolMessage` (type EDIT) instead of the
	 * `botForwardedMessage`-wrapped edit that `buildEdit()` produces, with the bot-metadata
	 * (`botResponseId`, CLIPPY infrastructure backend) and non-E2EE account attestation a real Meta-AI
	 * edit carries. Use it when an edit made with `sendEdit()` doesn't re-render the bubble.
	 * @param {string} targetJid Chat the original message lives in.
	 * @param {string} targetId `key.id` of the original message.
	 * @param {object} [opts] Pass `{ msg }` to reuse an already-built message content instead of rebuilding via build().
	 */
	async buildEditNative(targetJid, targetId, { msg, messageId, ...options } = {}) {
		if (!msg) {
			msg = (await this.build(targetJid, options)).message;
		}

		if (!msg) {
			throw new Error('buildEditNative: could not build message content');
		}

		return generateWAMessageFromContent(
			targetJid,
			{
				protocolMessage: {
					key: { remoteJid: targetJid, fromMe: true, id: targetId },
					type: 14, // MESSAGE_EDIT
					editedMessage: msg,
					timestampMs: Date.now(),
				},
				messageContextInfo: {
					botMetadata: {
						botResponseId: this._botResponseId,
						botInfrastructureDiagnostics: { botBackend: 1 }, // CLIPPY
					},
					accountEncryptionAttestation: { accountType: 2 }, // NON_E2EE
				},
			},
			{ messageId: messageId || generateMessageIDV2(), ...options }
		);
	}

	/** Same as `sendEdit()` but sends the native-format edit from `buildEditNative()`. Defaults to the last send()'s jid/id. */
	async sendEditNative(jid, id, { msg, messageId, additionalNodes = [], ...options } = {}) {
		jid = jid ?? this._lastMessageKey?.remoteJid;
		id = id ?? this._lastMessageKey?.id;

		if (!jid) throw new Error('JID is required');
		if (!id) throw new Error('Message id is required');

		const msgEdit = await this.buildEditNative(jid, id, { msg, messageId: messageId || generateMessageIDV2(), ...options });

		await this.#client.relayMessage(jid, msgEdit.message, { messageId: msgEdit.key.id, additionalNodes });

		return msgEdit;
	}

	/** Build and send this AI-rich message. @param {string} jid Destination chat/group jid. */
	async send(jid, { bypassDownload = this._bypassDownload, forwarded = this._forwarded, notification = this._notification, includesUnifiedResponse = this._includesUnifiedResponse, includesSubmessages = this._includesSubmessages, messageId, additionalNodes = [], skipImageFallback = false, nativeEdit = false, ...options } = {}) {
		// Inline-image fallback (ported from japofc): WA does not render AIRichResponseInlineImageMetadata for
		// third-party bots, so every addInlineImage() call is also queued here and re-sent as a plain imageMessage.
		if (!skipImageFallback && this._inlineImages.length) {
			for (const { url, caption } of this._inlineImages) {
				try {
					await this.#client.sendMessage(jid, { image: { url }, caption }, options.quoted ? { quoted: options.quoted } : {});
				} catch (err) {
					this.#client.logger?.warn?.({ err, url }, 'inline image fallback failed, continuing with rich card');
				}
			}
		}

		const msg = await this.build(jid, { forwarded, notification, includesUnifiedResponse, includesSubmessages, messageId, ...options });

		await this.#client.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id, additionalNodes, ...options });

		if (includesUnifiedResponse && bypassDownload) {
			await (nativeEdit ? this.sendEditNative(jid, msg.key.id, { msg: msg.message }) : this.sendEdit(jid, msg.key.id, { msg: msg.message }));
		}

		this._lastMessageKey = msg.key;

		return msg;
	}

	// --- static helpers ----------------------------------------------------------------------------

	static toTableMetadata(arr, { hyperlink = true, citation = true, latex = true } = {}) {
		if (!Array.isArray(arr) || !arr.every((row) => Array.isArray(row) && row.every((cell) => typeof cell === 'string'))) {
			throw new TypeError('Table must be a nested array of strings');
		}

		const [header, ...rows] = arr;
		const maxLen = Math.max(header.length, ...rows.map((r) => r.length));
		const normalize = (r) => [...r, ...Array(maxLen - r.length).fill('')];

		const unified_rows = [{ is_header: true, cells: normalize(header) }, ...rows.map((r) => ({ is_header: false, cells: normalize(r) }))].map((row) => {
			const markdown_cells = row.cells.map((cell) => {
				const extracted = extractIE(cell, { hyperlink, citation, latex });
				return { text: extracted.text, ...(extracted.inline_entities.length ? { inline_entities: extracted.inline_entities } : {}) };
			});

			return { ...row, ...(markdown_cells.some((c) => c.inline_entities?.length) ? { markdown_cells } : {}) };
		});

		const rowsMeta = unified_rows.map((r) => ({ items: r.cells, ...(r.is_header ? { isHeading: true } : {}) }));

		return { title: '', rows: rowsMeta, unified_rows };
	}

	/** Build a raw submessage layout block by name — escape hatch for layouts not covered by the add*() helpers. */
	static newLayout(name, data, extra = {}) {
		return {
			...extra,
			view_model: {
				[Array.isArray(data) ? 'primitives' : 'primitive']: data,
				__typename: `GenAI${name}LayoutViewModel`,
			},
		};
	}

	/** Inline CSS+JS that pins an HTML app's body height and makes it internally scrollable — used by `addHTML()`'s `height` option. Ported alongside `addHTML()` (see that method's header comment for the source). */
	static lockHeight(height) {
		const px = Number(height);
		if (!Number.isFinite(px) || px <= 0) {
			throw new TypeError('height must be a positive number of pixels');
		}
		return (
			'<style>html,body{margin:0;padding:0;height:' + px + 'px;max-height:' + px + 'px;overflow:hidden}' +
			'#__wrap{height:' + px + 'px;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y}</style>' +
			'<script>document.addEventListener("DOMContentLoaded",function(){' +
			'var w=document.createElement("div");w.id="__wrap";' +
			'while(document.body.firstChild)w.appendChild(document.body.firstChild);' +
			'document.body.appendChild(w)});<' + '/script>'
		);
	}

	// --- misc getters --------------------------------------------------------------------------

	/** Flatten every primitive pushed into `_sections` so far into one array — lets you build a
	 * card set in one AIRich instance and re-embed it into another via addSection(AIRich.newLayout(...)). */
	get items() {
		return this._sections.flatMap((s) => {
			const vm = s?.view_model;
			if (!vm) return [];
			return vm.primitives ?? (vm.primitive !== undefined ? [vm.primitive] : []);
		});
	}

	/** The `{ remoteJid, fromMe, id }` of the last message this instance sent/edited, or `null`. */
	get lastMessageKey() {
		return this._lastMessageKey ? { ...this._lastMessageKey } : null;
	}

	// --- ported from japofc AIRich (extra primitives) ---------------------------------------------

	/**
	 * Add a raw Bloks payload (`FOABloksPrimitive`) — Meta's internal UI-description format.
	 * Escape hatch: field meaning beyond what's passed through is undocumented, so this is the
	 * most experimental primitive in this block; pass whatever your captured traffic shows.
	 * @param {{type: string, data: string, uuid?: string, initial_response?: any, versioning_id?: string}} data
	 */
	addBloks(data = {}) {
		if (!data?.type) {
			throw new TypeError('addBloks() requires a "type"');
		}
		this._submessages.push({ messageType: 2, messageText: 'Bloks' });
		const primitive = {
			type: data.type,
			data: data.data ?? '{}',
			uuid: data.uuid ?? '',
			versioning_id: data.versioning_id ?? '',
			__typename: 'FOABloksPrimitive',
		};
		// Omit initial_response entirely when unset — same null-field crash as addProgressStatus/addThinkingStatus.
		if (data.initial_response != null) primitive.initial_response = data.initial_response;
		this._sections.push(AIRich.newLayout('Single', primitive));
		// Safety net: FOABloksPrimitive needs a real, client-registered Bloks screen to render
		// anything — arbitrary/placeholder payloads show up blank. Append a plain text section
		// so the card isn't empty. Set data.textFallback = false to skip.
		if (data.textFallback !== false) {
			this._sections.push(AIRich.newLayout('Single', { text: `Bloks: ${data.type}`, __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/**
	 * Add an HTML mini-app card (`GenAIaeacdsnwHtmlPrimitive`, Android-only — see
	 * `AI_RICH_PRIMITIVES_ANDROID_ONLY` below). Confirmed independently in two forks'
	 * `MessageBuilder/extras.js` (yudzxml 7.6.6's `htmlSection()` and elaina 1.3.10's, both
	 * crediting the same original source) as the "proven wire shape": a `GenAIUnifiedResponseSection`
	 * wrapper around the html primitive. `options.url` sets the WebView's base origin (needed for
	 * WebSocket/fetch calls from inside the page to be allowed) — pass a real `https://` origin, not
	 * a data URI. `options.height` pins the page to a fixed height via `AIRich.lockHeight()`.
	 * @param {string} html
	 * @param {{trustedSources?: string[], height?: number, url?: string, textFallback?: boolean}} [options]
	 */
	addHTML(html, { trustedSources = [], height, url, textFallback = true } = {}) {
		if (typeof html !== 'string' || html.trim() === '') {
			throw new TypeError('addHTML(html) requires a non-empty HTML string');
		}
		if (!Array.isArray(trustedSources)) {
			throw new TypeError('addHTML() trustedSources must be an array of strings');
		}
		if (url !== undefined && (typeof url !== 'string' || url.trim() === '')) {
			throw new TypeError('addHTML() url must be a non-empty string (WebView base origin, e.g. https://example.com)');
		}
		const payload = height === undefined ? html : AIRich.lockHeight(height) + html;
		this._submessages.push({ messageType: 2, messageText: 'Aplikasi HTML' });
		this._sections.push({
			__typename: 'GenAIUnifiedResponseSection',
			...AIRich.newLayout('Single', {
				payload,
				...(url ? { url: String(url) } : {}),
				trusted_sources: trustedSources.map(String),
				__typename: 'GenAIaeacdsnwHtmlPrimitive',
			}),
		});
		// Safety net: this primitive is confirmed Android-only (see AI_RICH_PRIMITIVES_ANDROID_ONLY
		// below) — iOS/Web give no visible fallback of their own, so append plain text same as
		// addTask()/addBloks(). Set options.textFallback = false to skip.
		if (textFallback) {
			this._sections.push(AIRich.newLayout('Single', { text: '[ Aplikasi HTML — buka di Android untuk melihat ]', __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/**
	 * Add an HTML app inside a tappable bottom-sheet "card" (a title/teaser line in the main
	 * response that opens a tabbed embedded screen containing the HTML), instead of `addHTML()`'s
	 * inline-in-the-response form. Reproduces `sendHtmlApp()`'s `embedded: true` branch (yudzxml
	 * 7.6.6 / elaina 1.3.10's `MessageBuilder/extras.js`) using this class's own `setTitle()` /
	 * `addEmbeddedScreen()` / `addText()` instead of that helper's standalone-function form. Calling
	 * this sets the instance's title via `setTitle()` if `options.title` is given — don't call
	 * `setTitle()` again after this if you want a different top title than the sheet's.
	 * @param {string} html
	 * @param {{title?: string, label?: string, trustedSources?: string[], height?: number, url?: string, screenTitle?: string, tabHeader?: string, textFallback?: boolean}} [options]
	 */
	addHTMLCard(html, { title, label, trustedSources = [], height, url, screenTitle, tabHeader, textFallback = true } = {}) {
		if (typeof html !== 'string' || html.trim() === '') {
			throw new TypeError('addHTMLCard(html) requires a non-empty HTML string');
		}
		if (title) this.setTitle(title);
		const sheetTitle = screenTitle ?? title ?? 'Preview';
		const payload = height === undefined ? html : AIRich.lockHeight(height) + html;
		const htmlSection = {
			__typename: 'GenAIUnifiedResponseSection',
			...AIRich.newLayout('Single', {
				payload,
				...(url ? { url: String(url) } : {}),
				trusted_sources: trustedSources.map(String),
				__typename: 'GenAIaeacdsnwHtmlPrimitive',
			}),
		};
		this.addText(label ?? sheetTitle);
		this.addEmbeddedScreen({
			title: sheetTitle,
			content: [
				{
					// NOTE: `FOAIDNixelButtonSheets` is the typename as captured (inherited from the upstream fork lineage,
					// not a Vanzxy name). Keep it verbatim: the WA client matches on the exact string.
					__typename: 'FOAIDNixelButtonSheets',
					tabs: [{ id: 'tab_0', tab_header: tabHeader ?? sheetTitle, sections: [htmlSection], step_entries: [] }],
					step_entries: [],
				},
			],
		});
		// Same Android-only caveat as addHTML() — the teaser line from addText() above already
		// covers iOS/Web with visible text, so no separate fallback needed here.
		return this;
	}


	/**
	 * Add a downloadable-file card (`GenAIFilePrimitive`). Confirmed in the same two forks'
	 * `fileSection()`/`fileArtifact()` helpers. Takes a plain URL directly (no media upload) — for a
	 * file you're uploading through WhatsApp's own media servers first, use `sock.sendMessage(jid,
	 * { document: buffer, ... })` and attach the result separately; this primitive only points at an
	 * already-hosted URL.
	 * @param {string} url
	 * @param {{title?: string, fileExtension?: string, fileLength?: number, pageCount?: number, previewImage?: object, textFallback?: boolean}} [options]
	 */
	addFile(url, { title = '', fileExtension = 'html', fileLength = 0, pageCount, previewImage, textFallback = true } = {}) {
		if (typeof url !== 'string' || url.trim() === '') {
			throw new TypeError('addFile(url) requires a non-empty url string');
		}
		const primitive = {
			title: String(title),
			url,
			file_extension: String(fileExtension).replace(/^\./, ''),
			file_length: Number(fileLength) || 0,
			__typename: 'GenAIFilePrimitive',
		};
		if (pageCount !== undefined) primitive.page_count = Number(pageCount) || 0;
		if (previewImage !== undefined) primitive.preview_image = previewImage;
		this._submessages.push({ messageType: 2, messageText: title || 'File' });
		this._sections.push(AIRich.newLayout('Single', primitive));
		if (textFallback) {
			this._sections.push(AIRich.newLayout('Single', { text: `File: ${title || url}`, __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/**
	 * Upload local content through WhatsApp's own media servers and add it as a file card — the
	 * `prepareFileArtifact()`/`sendHtmlArtifact()` path from yudzxml 7.6.6 / elaina 1.3.10, folded
	 * into this class via `setBotMetadata()` instead of that helper's standalone-function form. Use
	 * this instead of `addFile()` when there's no hosted URL yet — e.g. an HTML app you built
	 * in-process and want to ship as a downloadable file rather than inline via `addHTML()`.
	 * @param {string|Buffer|Uint8Array} content File content (a string is encoded as UTF-8).
	 * @param {{mimetype?: string, fileName?: string, title?: string, id?: string, textFallback?: boolean}} [options]
	 * @returns {Promise<this>}
	 */
	async addUploadedFile(content, { mimetype = 'text/html', fileName = 'app.html', title, id, textFallback = true } = {}) {
		const body = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;
		if (!Buffer.isBuffer(body) && !(body instanceof Uint8Array)) {
			throw new TypeError('addUploadedFile(content) requires a string or a buffer');
		}
		const prepared = await prepareWAMessageMedia({ document: Buffer.from(body), mimetype, fileName }, { upload: this.#client.waUploadToServer });
		const documentMessage = prepared.documentMessage;
		const mediaId = id ?? crypto.randomUUID();
		const b64 = (v) => (v === undefined || v === null ? undefined : Buffer.isBuffer(v) || v instanceof Uint8Array ? Buffer.from(v).toString('base64') : String(v));
		const media = {
			fileSha256: b64(documentMessage.fileSha256),
			mediaKey: b64(documentMessage.mediaKey),
			fileEncSha256: b64(documentMessage.fileEncSha256),
			directPath: documentMessage.directPath,
			mediaKeyTimestamp: documentMessage.mediaKeyTimestamp ? Number(documentMessage.mediaKeyTimestamp) : undefined,
			mimetype: documentMessage.mimetype,
		};
		for (const k of Object.keys(media)) if (media[k] === undefined) delete media[k];
		this.setBotMetadata({ unifiedResponseMutation: { mediaDetailsMetadataList: [{ id: mediaId, previewMedia: media, highResMedia: media }] } });
		this._submessages.push({ messageType: 2, messageText: title || fileName });
		this._sections.push(
			AIRich.newLayout('Single', {
				title: String(title || fileName),
				url: documentMessage.url ?? '',
				file_extension: fileName.includes('.') ? fileName.split('.').pop() : '',
				file_length: Number(documentMessage.fileLength) || 0,
				preview_image: { media_id: mediaId, mime_type: mimetype, url: documentMessage.url ?? '', url_fallback: '' },
				__typename: 'GenAIFilePrimitive',
			})
		);
		if (textFallback) {
			this._sections.push(AIRich.newLayout('Single', { text: `File: ${title || fileName}`, __typename: 'FOATextPrimitive' }));
		}
		return this;
	}


	/**
	 * Wrap one or more already-built primitives (e.g. items from another `AIRich` instance's
	 * `.items` getter, or hand-built `{ ..., __typename }` objects) in an `AddonAction` layout —
	 * a row of action buttons/pills attached to the primitives rather than a primitive itself.
	 * Confirmed in elaina 1.3.10's `metaai.js` (`addonActionSection()` — its own layout name,
	 * `'AddonAction'`, is also listed in `AI_RICH_LAYOUTS` in both forks' `extras.js`).
	 * @param {object[]} primitives Typed primitive objects (each must carry its own `__typename`).
	 * @param {{actionType?: string, alignment?: 'START'|'END'}} [options]
	 */
	addAddonAction(primitives = [], { actionType, alignment = 'END' } = {}) {
		if (!Array.isArray(primitives) || !primitives.length) {
			throw new TypeError('addAddonAction(primitives) requires a non-empty array of typed primitive objects');
		}
		const layout = AIRich.newLayout('AddonAction', primitives);
		if (actionType !== undefined) layout.view_model.addon_action_type = actionType;
		layout.view_model.addon_action_alignment = alignment;
		this._submessages.push({ messageType: 2, messageText: 'Addon Action' });
		this._sections.push(layout);
		return this;
	}

	/** Add a raw rich-response content-items carousel, matching Baileys' `items` field. */
	addContentItems(items = []) {
		if (!Array.isArray(items)) throw new TypeError('items must be an array');
		this._submessages.push({
			messageType: 9,
			contentItemsMetadata: { itemsMetadata: items, contentType: 1 },
		});
		this._sections.push(AIRich.newLayout('Single', {
			items,
			content_type: 1,
			__typename: 'GenAIContentItemsUXPrimitive',
		}));
		return this;
	}

	/** Add a plain horizontal divider line (`GenAIDividerPrimitive`, no content). */
	addDivider() {
		this._submessages.push({ messageType: 2, messageText: '---' });
		this._sections.push(AIRich.newLayout('Single', { __typename: 'GenAIDividerPrimitive' }));
		return this;
	}

	/**
	 * Add an "AI is generating..." placeholder card (`GenAIImaginePrimitive` with status
	 * GENERATING) — distinct from addImage()/addVideo() which always send status READY.
	 * Use this to show a pending-generation state before the real media is ready.
	 * @param {{ imagine_type?: 'IMAGE'|'ANIMATE', estimated_completion_time?: number }} [options]
	 */
	addGenerating({ imagine_type = 'IMAGE', estimated_completion_time, textFallback = true } = {}) {
		this._submessages.push({ messageType: 2, messageText: '[ Processing... ]' });
		this._sections.push(
			AIRich.newLayout('Single', {
				media: { url: '', mime_type: imagine_type === 'ANIMATE' ? 'video/mp4' : 'image/png' },
				imagine_type,
				status: {
					status: 'GENERATING',
					estimated_completion_time: estimated_completion_time ?? Math.floor(Date.now() / 1000) + 30,
				},
				__typename: 'GenAIImaginePrimitive',
			})
		);
		// JAP@Fix 23-08-26 (v4.8) --- empty media.url + GENERATING status has no instant
		// visual renderer in the stock WA client; previously the card stayed blank until WA
		// timed out on its own and showed its built-in fallback ("I can't create that image right now...").
		// Same fix class as addTask/addBloks: append a FOATextPrimitive so there is an
		// instant fallback instead of waiting for WA's timeout. Set { textFallback: false } to skip.
		if (textFallback) {
			this._sections.push(AIRich.newLayout('Single', { text: '[ Processing... ]', __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/** Add a large heading-style text block (`FOATextPrimitive`) — visually distinct from `addText()`'s regular paragraph text. */
	addHeading(text) {
		if (typeof text !== 'string' || !text) {
			throw new TypeError('addHeading(text) requires a non-empty string');
		}

		this._submessages.push({
			messageType: 2,
			messageText: text,
		});

		this._sections.push(
			AIRich.newLayout('Single', {
				text,
				__typename: 'FOATextPrimitive',
			})
		);

		return this;
	}

	// JAP@Fix 15-08-26 (bug 41) --- addImage() only builds GRID_IMAGE (messageType 1).
	// There was no helper for standalone INLINE_IMAGE (messageType 3): callers were manually
	// pushing addSubmessage() (correct proto shape) + addSection() (WRONG shape — reused the
	// GRID_IMAGE/GenAIImaginePrimitive section schema instead of GenAIInlineImageUXPrimitive),
	// which broke client-side unifiedResponse rendering even though the submessage itself was fine.
	// Mirrors RichSubMessageType.INLINE_IMAGE handling in rich-message-utils.js's toUnified().
	/** Add an image inline with the surrounding text flow (falls back to a plain imageMessage on send() if the client can't render inline images — see skipImageFallback). */
	addInlineImage(imageUrl, { text = '', alignment = 'center', tapLinkUrl = '', resolveUrl = false } = {}) {
		if (!(typeof imageUrl === 'string' || Buffer.isBuffer(imageUrl) || (imageUrl && typeof imageUrl === 'object'))) {
			throw new TypeError('imageUrl must be string | buffer | { imagePreviewUrl, imageHighResUrl, sourceUrl }');
		}

		const ALIGNMENT_ENUM = { leading: 0, trailing: 1, center: 2 };
		const ALIGNMENT_NAME = ['AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED', 'AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED', 'AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED'];
		const alignmentNum = typeof alignment === 'number' ? alignment : (ALIGNMENT_ENUM[String(alignment).toLowerCase()] ?? ALIGNMENT_ENUM.center);

		const url =
			imageUrl && typeof imageUrl === 'object'
				? {
						imagePreviewUrl: imageUrl.imagePreviewUrl || imageUrl.url,
						imageHighResUrl: imageUrl.imageHighResUrl || imageUrl.url,
						sourceUrl: imageUrl.sourceUrl || imageUrl.url,
					}
				: (() => {
						const resolved = Toolkit.resolveMedia(this.#client, imageUrl, 'image', { resolveUrl });
						return { imagePreviewUrl: resolved, imageHighResUrl: resolved, sourceUrl: resolved };
					})();

		this._submessages.push({
			messageType: 3,
			imageMetadata: {
				imageUrl: url,
				imageText: text,
				alignment: alignmentNum,
				tapLinkUrl,
			},
		});

		this._sections.push(
			AIRich.newLayout('Single', {
				image_url: {
					image_preview_url: url.imagePreviewUrl || '',
					image_high_res_url: url.imageHighResUrl || '',
					source_url: url.sourceUrl || '',
				},
				image_text: text,
				alignment: ALIGNMENT_NAME[alignmentNum],
				tap_link_url: tapLinkUrl,
				__typename: 'GenAIInlineImageUXPrimitive',
			})
		);

		// JAP@Fix (bug 42): stash for the imageMessage fallback in send()
		this._inlineImages.push({
			url: url.sourceUrl || url.imageHighResUrl || url.imagePreviewUrl,
			caption: text || undefined,
		});

		return this;
	}

	/** Add Baileys-compatible inline-video marker. WhatsApp's current rich-response helper carries this as a text marker. */
	addInlineVideo() {
		this._submessages.push({ messageType: 2, messageText: 'INLINE_VIDEO' });
		this._sections.push(AIRich.newLayout('Single', {
			text: 'INLINE_VIDEO',
			__typename: 'GenAIMarkdownTextUXPrimitive',
		}));
		return this;
	}

	/**
	 * Add a rendered LaTeX expression (`GenAILatexUXPrimitive`), with a real `AI_RICH_RESPONSE_LATEX`
	 * submessage (unlike most primitives in this block, this one has a proper proto type).
	 * @param {string} expression LaTeX source, e.g. `'$$E = mc^2$$'`.
	 */
	addLatex(expression) {
		if (typeof expression !== 'string' || !expression) {
			throw new TypeError('addLatex(expression) requires a non-empty string');
		}
		this._submessages.push({
			messageType: 8,
			latexMetadata: { text: expression, expressions: [{ latexExpression: expression }] },
		});
		this._sections.push(AIRich.newLayout('Single', { latex_expression: expression, __typename: 'GenAILatexUXPrimitive' }));
		return this;
	}

	/**
	 * Add a pre-rendered LaTeX expression: `addLatex()` ships the raw expression string for the
	 * client to typeset itself; this ships an already-rendered image of it instead (real proto
	 * fields — `proto.AIRichResponseLatexMetadata.AIRichResponseLatexExpression`: url/width/height/
	 * fontHeight/padding — verified against WAProto/index.js, not guessed), for a caller that
	 * rendered the LaTeX server-side (e.g. via a LaTeX-to-PNG pipeline) and just wants the image shown.
	 * @param {string} expression Raw LaTeX source, still sent alongside the image as a fallback/caption.
	 * @param {{url: string, width?: number, height?: number, fontHeight?: number, topPadding?: number, leadingPadding?: number, bottomPadding?: number, trailingPadding?: number}} image
	 */
	addLatexPro(expression, image = {}) {
		if (typeof expression !== 'string' || !expression) {
			throw new TypeError('addLatexPro(expression, image) requires a non-empty expression string');
		}
		if (!image?.url) {
			throw new TypeError('addLatexPro(expression, image) requires image.url — use addLatex() for a text-only expression');
		}
		const rendered = {
			latexExpression: expression,
			url: image.url,
		};
		if (image.width != null) rendered.width = image.width;
		if (image.height != null) rendered.height = image.height;
		if (image.fontHeight != null) rendered.fontHeight = image.fontHeight;
		if (image.topPadding != null) rendered.imageTopPadding = image.topPadding;
		if (image.leadingPadding != null) rendered.imageLeadingPadding = image.leadingPadding;
		if (image.bottomPadding != null) rendered.imageBottomPadding = image.bottomPadding;
		if (image.trailingPadding != null) rendered.imageTrailingPadding = image.trailingPadding;
		this._submessages.push({
			messageType: 8,
			latexMetadata: { text: expression, expressions: [rendered] },
		});
		this._sections.push(
			AIRich.newLayout('Single', { latex_expression: expression, image_url: image.url, __typename: 'GenAILatexUXPrimitive' })
		);
		return this;
	}

	/**
	 * Add map annotations (real proto — `proto.AIRichResponseMapMetadata`: centerLatitude/
	 * centerLongitude/latitudeDelta/longitudeDelta/annotations[]/showInfoList — verified against
	 * WAProto/index.js, not guessed).
	 * @param {{number: number, latitude: number, longitude: number, title?: string, body?: string}[]} annotations
	 * @param {{centerLatitude?: number, centerLongitude?: number, latitudeDelta?: number, longitudeDelta?: number, showInfoList?: boolean}} [options]
	 */
	addMap(annotations = [], options = {}) {
		if (!Array.isArray(annotations) || !annotations.length) {
			throw new TypeError('addMap(annotations) requires a non-empty array');
		}
		const mapped = annotations.map((a, i) => {
			if (typeof a?.latitude !== 'number' || typeof a?.longitude !== 'number') {
				throw new TypeError(`addMap(): annotation ${i} requires numeric "latitude" and "longitude"`);
			}
			return {
				annotationNumber: a.number ?? i + 1,
				latitude: a.latitude,
				longitude: a.longitude,
				title: a.title ?? '',
				body: a.body ?? '',
			};
		});
		const mapMetadata = { annotations: mapped };
		if (options.centerLatitude != null) mapMetadata.centerLatitude = options.centerLatitude;
		if (options.centerLongitude != null) mapMetadata.centerLongitude = options.centerLongitude;
		if (options.latitudeDelta != null) mapMetadata.latitudeDelta = options.latitudeDelta;
		if (options.longitudeDelta != null) mapMetadata.longitudeDelta = options.longitudeDelta;
		if (options.showInfoList != null) mapMetadata.showInfoList = options.showInfoList;
		this._submessages.push({ messageType: 7, mapMetadata });
		// Safety net: GenAIMapUXPrimitive is a custom AI-only component (no confirmed stock-client
		// renderer for arbitrary bot traffic) — append a plain text fallback listing the pins, same
		// pattern as addTask()/addBloks(). Set options.textFallback = false to skip.
		this._sections.push(AIRich.newLayout('Single', { annotations: mapped, __typename: 'GenAIMapUXPrimitive' }));
		if (options.textFallback !== false) {
			const list = mapped.map((a) => `${a.title || `Pin ${a.annotationNumber}`}: ${a.latitude}, ${a.longitude}`).join('\n');
			this._sections.push(AIRich.newLayout('Single', { text: `Peta:\n${list}`, __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/**
	 * Add an animated GIF (real proto — `proto.AIRichResponseDynamicMetadata`, `type` = the GIF
	 * value of `AIRichResponseDynamicMetadataType` — verified against WAProto/index.js, not
	 * guessed; `AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF` = 2).
	 * @param {string} url
	 * @param {{loopCount?: number, version?: number|string}} [options]
	 */
	addGif(url, { loopCount, version, resolveUrl = false } = {}) {
		if (typeof url !== 'string' || !url) {
			throw new TypeError('addGif(url) requires a non-empty url string');
		}
		const resolved = Toolkit.resolveMedia(this.#client, url, 'video', { resolveUrl });
		const dynamicMetadata = { type: 2, url: resolved }; // 2 = AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF
		if (loopCount != null) dynamicMetadata.loopCount = loopCount;
		if (version != null) dynamicMetadata.version = version;
		this._submessages.push({ messageType: 6, dynamicMetadata });
		this._sections.push(AIRich.newLayout('Single', { url: resolved, __typename: 'GenAIDynamicUXPrimitive' }));
		return this;
	}

	/** Build rich-response citation/link submessages using the same shape as Baileys' `links` content shortcut. */
	addLinks(links = []) {
		if (!Array.isArray(links)) throw new TypeError('links must be an array');
		links.forEach((linkField, index) => {
			if (!linkField || typeof linkField !== 'object') throw new TypeError('Each link must be an object');
			const prefix = 'SS_' + index;
			const url = linkField.url || '';
			const text = String(linkField.text ?? '');
			const sources = Array.isArray(linkField.sources) ? linkField.sources.map((sourceField) => ({
				source_type: 'THIRD_PARTY',
				source_display_name: sourceField?.displayName || sourceField?.title || 'Source',
				source_subtitle: sourceField?.subtitle || '',
				source_url: sourceField?.url || url,
			})) : [];
			const entity = {
				key: prefix,
				metadata: {
					reference_id: index + 1,
					reference_url: url,
					reference_title: linkField.title || 'Source',
					reference_display_name: linkField.displayName || linkField.title || 'Source',
					sources,
					__typename: 'GenAISearchCitationItem',
				},
			};
			const section = AIRich.newLayout('Single', {
				text: `${text} {{${prefix}}}${url}{{/${prefix}}}`,
				inline_entities: [entity],
				__typename: 'GenAIMarkdownTextUXPrimitive',
			});
			this._sections.push(section);
			this._submessages.push({
				messageType: 2,
				messageText: `${text} {{${prefix}}}¹{{/${prefix}}} `,
				inlineEntities: [entity],
			});
		});
		return this;
	}

	/**
	 * Add a "searching/working" progress banner (`GenAIBotProgressStatusPrimitive`) — a one-shot
	 * status chip (unlike `addSuggest`, this isn't tappable). Distinct from `addThinkingStatus()`'s
	 * icon/typename.
	 * @param {string} title
	 * @param {{icon?: string, is_in_progress?: boolean}} [options]
	 */
	addProgressStatus(title, { icon = 'SEARCH', is_in_progress = true, target_secondary_screen_id, target_secondary_screen_tab_id } = {}) {
		if (typeof title !== 'string' || !title) {
			throw new TypeError('addProgressStatus(title) requires a non-empty string');
		}
		this._submessages.push({ messageType: 2, messageText: title });
		const primitive = {
			title,
			icon,
			is_in_progress,
			meta_search_apps: [],
			__typename: 'GenAIBotProgressStatusPrimitive',
		};
		// NOTE: these two fields must be OMITTED when unset, not sent as `null` —
		// an explicit null here was reproducibly crashing the WA client renderer
		// on group-open/media-download. Only include when the caller actually passes one.
		if (target_secondary_screen_id != null) primitive.target_secondary_screen_id = target_secondary_screen_id;
		if (target_secondary_screen_tab_id != null) primitive.target_secondary_screen_tab_id = target_secondary_screen_tab_id;
		this._sections.push(AIRich.newLayout('Single', primitive));
		return this;
	}

	/**
	 * Add a subscription-quota-limit upsell card (`GenAIMetaSubsQuotaUpsellPrimitive`).
	 * @param {{title: string, body?: string, body_line1?: string, body_line2?: string, buttons?: {label: string, action?: string, deeplink?: string}[]}} data
	 */
	addQuotaUpsell(data = {}) {
		if (!data?.title) {
			throw new TypeError('addQuotaUpsell() requires a "title"');
		}
		this._submessages.push({ messageType: 2, messageText: data.title });
		this._sections.push(
			AIRich.newLayout('Single', {
				title: data.title,
				body: data.body ?? '',
				body_line1: data.body_line1 ?? '',
				body_line2: data.body_line2 ?? '',
				// Vanz@Fix (Go-reference cross-check) --- a captured "elaina-baileys" renderer bundle
				// shows the button's target key depends on `action`: OPEN_URL reads `url`, everything
				// else (OPEN_DEEPLINK and friends) reads `deeplink`. This used to always write
				// `deeplink` regardless of `action`, so an OPEN_URL button silently had no working
				// target on the client. `b.deeplink ?? b.url` on the deeplink branch keeps old callers
				// that only ever passed `deeplink` working unchanged.
				buttons: (data.buttons ?? []).map((b) => {
					const action = b.action ?? 'OPEN_DEEPLINK';
					const out = { label: b.label ?? '', action };
					if (action === 'OPEN_URL') out.url = b.url ?? b.deeplink ?? '';
					else out.deeplink = b.deeplink ?? b.url ?? '';
					return out;
				}),
				__typename: 'GenAIMetaSubsQuotaUpsellPrimitive',
			})
		);
		return this;
	}

	/**
	 * Add several subscription-quota-limit upsell cards as one carousel-style block (each card is
	 * the same `GenAIMetaSubsQuotaUpsellPrimitive` shape `addQuotaUpsell()` uses — this just
	 * pushes them as one `primitives` array on a single layout instead of one `primitive` each, and
	 * applies the same OPEN_URL/`url` vs OPEN_DEEPLINK/`deeplink` fix per card).
	 * @param {{title: string, body?: string, body_line1?: string, body_line2?: string, buttons?: {label: string, action?: string, deeplink?: string, url?: string}[]}[]} cards
	 */
	addQuotaUpsellCards(cards = []) {
		if (!Array.isArray(cards) || !cards.length) {
			throw new TypeError('addQuotaUpsellCards(cards) requires a non-empty array');
		}
		const primitives = cards.map((data, i) => {
			if (!data?.title) throw new TypeError(`addQuotaUpsellCards(): card ${i} requires a "title"`);
			return {
				title: data.title,
				body: data.body ?? '',
				body_line1: data.body_line1 ?? '',
				body_line2: data.body_line2 ?? '',
				buttons: (data.buttons ?? []).map((b) => {
					const action = b.action ?? 'OPEN_DEEPLINK';
					const out = { label: b.label ?? '', action };
					if (action === 'OPEN_URL') out.url = b.url ?? b.deeplink ?? '';
					else out.deeplink = b.deeplink ?? b.url ?? '';
					return out;
				}),
				__typename: 'GenAIMetaSubsQuotaUpsellPrimitive',
			};
		});
		this._submessages.push({ messageType: 2, messageText: cards.map((c) => c.title).join(', ') });
		this._sections.push(AIRich.newLayout('Single', primitives));
		return this;
	}

	// --- v2.1.14: second pass over the Go reference (MessageBuilderv2) ------------------------------
	// Scope note: the Go reference degrades many of its "primitives" (VStack, FlexibleGrid, SportsWidget, P13N,
	// ClippyWidget, LocationPermission, ...) to plain markdown text, so only the ones that push a real `GenAI*`
	// primitive/layout are ported here. Like every captured-traffic primitive in this class, whether the WhatsApp
	// client actually renders them depends on the client/account -- eval-test one at a time on a real device.

	/** Builder-level default for `forwarded` (the "Forwarded" label + `forwardedAiBotMessageInfo`). `send({ forwarded })` still overrides per call. */
	setForwarded(enabled = true) {
		this._forwarded = !!enabled;
		return this;
	}

	/** Builder-level default for `includesUnifiedResponse` (the `unifiedResponse` payload + the follow-up edit that gets the card past "download"). */
	setIncludesUnifiedResponse(enabled = true) {
		this._includesUnifiedResponse = !!enabled;
		return this;
	}

	/** Builder-level default for `includesSubmessages` (the legacy `submessages[]` array). */
	setIncludesSubmessages(enabled = true) {
		this._includesSubmessages = !!enabled;
		return this;
	}

	/** Markdown text WITHOUT hyperlink/citation/LaTeX entity parsing -- for sending `_italic_` / `**bold**` / `code` exactly as typed. */
	addTextRaw(text, { id, replace, insertAt } = {}) {
		if (typeof text !== 'string' || !text) throw new TypeError('addTextRaw(text) requires a non-empty string');
		return this.addText(text, { hyperlink: false, citation: false, latex: false, id, replace, insertAt });
	}

	/** "In progress" status card (`GenAIBotProgressStatusPrimitive`); same as `addProgressStatus()` with the Go reference's defaults. */
	addProgress(title = 'Mencari sumber', icon = 'SEARCH', options = {}) {
		return this.addProgressStatus(title, { icon, ...options });
	}

	/** Quota-upsell card with text only (no button). */
	addQuotaUpsellPlain(title, line1 = '', line2 = '') {
		return this.addQuotaUpsell({ title, body_line1: line1, body_line2: line2, buttons: [] });
	}

	/**
	 * Quota-upsell card with one custom button. Unlike the Go reference there is no default target link -- pass `deeplink` or `url`.
	 * @param {{action?: 'OPEN_DEEPLINK'|'OPEN_URL', deeplink?: string, url?: string}} [target]
	 */
	addQuotaUpsellCustom(title, line1, line2, label, { action, deeplink, url } = {}) {
		if (!label) throw new TypeError('addQuotaUpsellCustom() requires a button label');
		if (!deeplink && !url) throw new TypeError('addQuotaUpsellCustom() requires a deeplink or url for the button');
		return this.addQuotaUpsell({ title, body_line1: line1, body_line2: line2, buttons: [{ label, action: action ?? (url && !deeplink ? 'OPEN_URL' : 'OPEN_DEEPLINK'), deeplink, url }] });
	}

	/** Quota-upsell card that is ONLY a button (no title/body). Requires `deeplink` or `url`. */
	addQuotaUpsellBtnOnly(label = 'Upgrade', { action, deeplink, url } = {}) {
		if (!deeplink && !url) throw new TypeError('addQuotaUpsellBtnOnly() requires a deeplink or url for the button');
		const act = action ?? (url && !deeplink ? 'OPEN_URL' : 'OPEN_DEEPLINK');
		const button = act === 'OPEN_URL' ? { label, action: act, url: url ?? deeplink } : { label, action: act, deeplink: deeplink ?? url };
		return this._addSinglePrimitive('GenAIMetaSubsQuotaUpsellPrimitive', { buttons: [button] });
	}

	/**
	 * "Strict" quota-upsell card: only the fields you pass are sent. `body` is the field the client renders as the card's
	 * content (confirmed in the Go reference's strict mode); title and button are optional.
	 */
	addQuotaUpsellStrict({ title, body, label, action, deeplink, url } = {}) {
		if (!title && !body && !label) throw new TypeError('addQuotaUpsellStrict() needs at least one of title/body/label');
		let buttons;
		if (label) {
			if (!deeplink && !url) throw new TypeError('addQuotaUpsellStrict() with a button label requires a deeplink or url');
			const act = action ?? (url && !deeplink ? 'OPEN_URL' : 'OPEN_DEEPLINK');
			buttons = [act === 'OPEN_URL' ? { label, action: act, url: url ?? deeplink } : { label, action: act, deeplink: deeplink ?? url }];
		}
		const section = AIRich.newLayout('Single', AIRich._omitEmpty({ title, body, buttons, __typename: 'GenAIMetaSubsQuotaUpsellPrimitive' }), { __typename: 'GenAIUnifiedResponseSection' });
		return this._addContent(section, title ? { messageType: 2, messageText: title } : this.createAlert('GenAIMetaSubsQuotaUpsellPrimitive'));
	}

	/** Sponsored-story card (`GenAISearchAdPrimitive`). */
	addSearchAd({ storyId, actorName, actorImageUrl, imageUrl, message } = {}, options = {}) {
		if (!message && !imageUrl && !actorName) throw new TypeError('addSearchAd() needs at least one of message/imageUrl/actorName');
		return this._addSinglePrimitive('GenAISearchAdPrimitive', { story_id: storyId, actor_name: actorName, actor_image_url: actorImageUrl, image_url: imageUrl, message }, options);
	}

	/** Recursive unified-response container (`GenAINestedUnifiedResponse`). Each field is an array of raw section / screen objects. */
	addNestedUnified({ sections, footerSections, embeddedScreens, nestedResponses } = {}, options = {}) {
		if (![sections, footerSections, embeddedScreens, nestedResponses].some((v) => Array.isArray(v) && v.length)) {
			throw new TypeError('addNestedUnified() needs at least one non-empty array');
		}
		return this._addSinglePrimitive('GenAINestedUnifiedResponse', { sections, footer_sections: footerSections, embedded_screens: embeddedScreens, nested_responses: nestedResponses }, options);
	}

	/** Third-party account-linking upsell (`GenAI3PAccountLinkingUpsellPrimitive`). */
	add3PAccountLinking({ title, subtitle, imageUrl, ctaLabel, ctaUrl, originalPrompt, integrationType, integrationStatus, bottomsheet, apps, label, integrationFbid, integrationSlug } = {}, options = {}) {
		if (!title && !ctaLabel) throw new TypeError('add3PAccountLinking() needs a title or ctaLabel');
		return this._addSinglePrimitive(
			'GenAI3PAccountLinkingUpsellPrimitive',
			{ title, subtitle, image_url: imageUrl, cta_label: ctaLabel, cta_url: ctaUrl, original_prompt: originalPrompt, integration_type: integrationType, integration_status: integrationStatus, bottomsheet, apps, label, integration_fbid: integrationFbid, integration_slug: integrationSlug },
			options
		);
	}

	/** Search-planner steps card (`GenAISearchPlannerStepsPrimitive`); `data` is the raw primitive body (step shapes vary). */
	addSearchPlannerSteps(data = {}, options = {}) {
		return this.addPrimitive('GenAISearchPlannerStepsPrimitive', data, options);
	}

	/** One search-planner step snippet (`GenAISearchPlannerStepSnippetPrimitive`). @param {string} status @param {string} [header] @param {object[]} [instructions] */
	addSearchPlannerStepSnippet(status, header, instructions = [], options = {}) {
		if (!status) throw new TypeError('addSearchPlannerStepSnippet(status) requires a status');
		return this._addSinglePrimitive('GenAISearchPlannerStepSnippetPrimitive', { status, header, instructions }, options);
	}

	/** Orchestrator search-engine primitive (`GenAIOrchestratorSearchEngine`); raw body. */
	addOrchestratorSearchEngine(data = {}, options = {}) {
		return this.addPrimitive('GenAIOrchestratorSearchEngine', data, options);
	}

	/** Professional-consent primitive (`GenAIProfessionalConsentPrimitive`); raw body (many label/url fields). */
	addProfessionalConsent(data = {}, options = {}) {
		return this.addPrimitive('GenAIProfessionalConsentPrimitive', data, options);
	}

	/** Embedded contextual screen (`GenAIEmbeddedContextualScreenContent`, the "bloks_attachment" payload). */
	addEmbeddedContextualScreen(type, data = {}, { uuid, versioningId, initialResponse } = {}, options = {}) {
		if (!type) throw new TypeError('addEmbeddedContextualScreen(type, data) requires a type');
		return this._addSinglePrimitive('GenAIEmbeddedContextualScreenContent', { type, data, uuid, versioning_id: versioningId, initial_response: initialResponse }, options);
	}

	/**
	 * Experimental real layout container: push several already-built `GenAI*` primitives as ONE layout section
	 * (`GenAI<name>LayoutViewModel`, `primitives[]`). `addMultipleResponse` / `addFlexibleGrid` / `addVStack` are named
	 * shortcuts. (The Go reference only flattens these to text; this sends the real layout -- eval-test before relying on it.)
	 * @param {string} name Layout name, e.g. 'HScroll', 'Grid', 'MultipleResponse', 'FlexibleCountGrid', 'VStack'.
	 * @param {object[]} primitives Primitive objects, each with its own `__typename`.
	 */
	addLayout(name, primitives, { text, id, replace, insertAt } = {}) {
		if (typeof name !== 'string' || !name) throw new TypeError('addLayout(name, primitives) requires a layout name');
		if (!Array.isArray(primitives) || !primitives.length) throw new TypeError('addLayout(name, primitives) requires a non-empty primitives array');
		const section = AIRich.newLayout(name, primitives, { __typename: 'GenAIUnifiedResponseSection' });
		const fallback = text ?? primitives.map((p) => p?.text ?? p?.title ?? p?.prompt_text ?? '').filter(Boolean).join('\n');
		return this._addContent(section, fallback ? { messageType: 2, messageText: fallback } : this.createAlert(primitives[0]?.__typename ?? 'GenAILayout'), { id, replace, insertAt });
	}

	/** `GenAIMultipleResponseLayoutViewModel`. */
	addMultipleResponse(primitives, options = {}) {
		return this.addLayout('MultipleResponse', primitives, options);
	}

	/** `GenAIFlexibleCountGridLayoutViewModel`. */
	addFlexibleGrid(primitives, options = {}) {
		return this.addLayout('FlexibleCountGrid', primitives, options);
	}

	/** `GenAIVStackLayoutViewModel` (experimental). */
	addVStack(primitives, options = {}) {
		return this.addLayout('VStack', primitives, options);
	}

	/**
	 * Pending options for the NEXT `add*()` / `set*()` call (Go `Opts`). Accepts `{ id, insertAt, replace }` or the positional
	 * `(id, insertAt, replace)` form. Inline options on that call take priority; the pending options are consumed either way.
	 */
	opts(idOrOpts, insertAt, replace) {
		const o = idOrOpts && typeof idOrOpts === 'object' ? { ...idOrOpts } : { id: idOrOpts || undefined, insertAt: insertAt || undefined, replace: replace || undefined };
		this._pendingOpts = Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== ''));
		return this;
	}

	/** Like `opts()` with an insert offset (Go `OptsAt`): `offset` 0 = after the `insertAtId` block, negative = before it (-1 = directly before). */
	optsAt(id, insertAtId, offset = 0, replace) {
		if (!insertAtId) throw new TypeError('optsAt(id, insertAtId, offset) requires insertAtId');
		this._pendingOpts = Object.fromEntries(Object.entries({ id, insertAt: insertAtId, insertAtOffset: offset, replace }).filter(([, v]) => v !== undefined && v !== ''));
		return this;
	}

	/** JSON snapshot for `JSON.stringify(rich)` (Go `MarshalJSON`): response id, title/footer, sections, submessages, embedded screens. */
	toJSON() {
		return { response_id: this._responseId, bot_response_id: this._botResponseId, title: this._title, footer: this._footer, sections: this._sections, submessages: this._submessages, embedded_screens: this._embeddedScreens };
	}

	// --- v2.1.14 (part 2): remaining helpers from the Go reference ---------------------------------
	// Ports of the Go helpers that were not covered in part 1. Several are thin aliases because this class
	// already had the capability under another name (noted per method); the text-card helpers reproduce what
	// the Go reference does for primitives it could not render natively (plain markdown cards).

	/** Minimal botMetadata envelope: drops the notification fields so only disclaimer / response id / verification / extras remain (Go `SetRawEnvelope`). */
	setRawEnvelope(enabled = true) {
		this._rawEnvelope = !!enabled;
		return this;
	}

	/** Register async work (fetch, resolve, ...) that runs concurrently at the start of `build()` (Go `Defer`). @param {() => any} fn */
	defer(fn) {
		if (typeof fn !== 'function') throw new TypeError('defer(fn) requires a function');
		this._deferred.push(fn);
		return this;
	}

	/** Remove a block by id; unlike `delete(id)` this is a silent no-op when the id is unknown (Go `DeleteSection`). */
	deleteSection(id) {
		return this.hasId(id) ? this.delete(id) : this;
	}

	/** Current unified-response id. */
	get responseId() {
		return this._responseId;
	}

	/** Current bot response id. */
	get botResponseId() {
		return this._botResponseId;
	}

	/** Key of the last message sent through `send()`, or `null`. */
	get lastMessageKey() {
		return this._lastMessageKey;
	}

	/** Shallow copies of the current sections and submessages (Go `Items`). */
	items() {
		return { sections: [...this._sections], submessages: [...this._submessages] };
	}

	/** Option-object form of `addImage()` (Go `AddImageOpts`). @param {{urls: string|Buffer|Array<string|Buffer>, width?: number, height?: number, status?: string, updateText?: string}} o */
	addImageOpts({ urls, width, height, status, updateText, ...rest } = {}) {
		if (!urls || (Array.isArray(urls) && !urls.length)) throw new TypeError('addImageOpts({ urls }) requires at least one url');
		return this.addImage(urls, { width, height, ...(status ? { status } : {}), update_text: updateText, ...rest });
	}

	/** Option-object form of `addVideo()` (Go `AddVideoOpts`). @param {string|Buffer|{url: string, file_length?: number, duration?: number, thumbnail?: any, mime_type?: string, status?: string, estimatedTime?: number}} v */
	addVideoOpts(v, extra = {}) {
		const { status, estimatedTime, ...video } = v && typeof v === 'object' && !Buffer.isBuffer(v) ? v : { url: v };
		return this.addVideo(video, { ...(status ? { status } : {}), ...(estimatedTime != null ? { estimatedTime } : {}), ...extra });
	}

	/** Several videos in ONE block with a single alert (Go `AddVideos`). Same as passing an array to `addVideo()`. */
	addVideos(videos, options = {}) {
		if (!Array.isArray(videos) || !videos.length) throw new TypeError('addVideos(videos) requires a non-empty array');
		return this.addVideo(videos, options);
	}

	/** Follow-up pills with an explicit layout (Go `AddSuggestLayout`). Same as `addSuggest(list, { scroll, layout })`. */
	addSuggestLayout(suggestions, scroll = true, layout) {
		if (!Array.isArray(suggestions) || !suggestions.length) throw new TypeError('addSuggestLayout(suggestions) requires a non-empty array of strings');
		return this.addSuggest(suggestions, { scroll, layout });
	}

	/** Single follow-up pill (Go `AddChainingSuggestion`; the Go prompt-id argument is unused there too). */
	addChainingSuggestion(prompt, options = {}) {
		if (typeof prompt !== 'string' || !prompt) throw new TypeError('addChainingSuggestion(prompt) requires a non-empty string');
		return this.addSuggest(prompt, { layout: 'Single', ...options });
	}

	/** Raw progress/thinking primitive: any extra fields pass through; `__typename` is forced to `GenAIBotProgressStatusPrimitive` (Go `AddThinkingFull`). */
	addThinkingFull(primitive = {}, { id, replace, insertAt } = {}) {
		if (!primitive || typeof primitive !== 'object' || Array.isArray(primitive)) throw new TypeError('addThinkingFull(primitive) requires a plain object');
		return this._addContent(AIRich.newLayout('Single', { ...primitive, __typename: 'GenAIBotProgressStatusPrimitive' }), undefined, { id, replace, insertAt });
	}

	/** AI "thinking" status line (Go `AddBotThinking`). `status` THINKING/GENERATING render as in-progress, anything else as done. */
	addBotThinking(status = 'COMPLETED', updateText = 'Berpikir', { id, replace, insertAt } = {}) {
		return this.addThinkingFull({ title: updateText, is_in_progress: status === 'THINKING' || status === 'GENERATING', icon: 'THINKING' }, { id, replace, insertAt });
	}

	/** Source list with per-source subtitle (Go `AddSourceFull`). @param {{title: string, subtitle?: string, url: string, icon?: string|Buffer}[]} sources */
	addSourceFull(sources = [], { id, replace, insertAt } = {}) {
		if (!Array.isArray(sources) || !sources.length) throw new TypeError('addSourceFull(sources) requires a non-empty array');
		const list = sources.map((src, i) => {
			if (!src?.title || !src?.url) throw new TypeError(`addSourceFull(): source ${i} requires a title and a url`);
			return {
				source_type: 'THIRD_PARTY',
				source_display_name: src.title,
				source_subtitle: src.subtitle ?? '',
				source_url: src.url,
				favicon: { url: src.icon ? Toolkit.resolveMedia(this.#client, src.icon, 'image') : '', mime_type: 'image/jpeg', width: 16, height: 16 },
			};
		});
		return this._addContent(AIRich.newLayout('Single', { sources: list, __typename: 'GenAISearchResultPrimitive' }), this.createAlert('GenAISearchResultPrimitive'), { id, replace, insertAt });
	}

	/**
	 * Compact entity card (`GenAICompactEntityPrimitive`: title / subtitle / secondary_subtitle / image / entity id+url+type / action type).
	 * Pass `{ asText: true }` for the Go reference's markdown fallback card instead (renders everywhere).
	 */
	addCompactEntity({ title, subtitle, secondarySubtitle, image, entityId, entityUrl, entityType, actionType, isVerified } = {}, { asText = false, id, replace, insertAt } = {}) {
		if (!title) throw new TypeError('addCompactEntity() requires a title');
		if (asText) {
			return this.addText(`🏷 **${title}**${subtitle ? `\n${subtitle}` : ''}${secondarySubtitle ? ` • ${secondarySubtitle}` : ''}`, { hyperlink: false, citation: false, latex: false, id, replace, insertAt });
		}
		return this._addSinglePrimitive(
			'GenAICompactEntityPrimitive',
			{ title, subtitle, secondary_subtitle: secondarySubtitle, image: image ? { url: Toolkit.resolveMedia(this.#client, image, 'image') } : undefined, entity_id: entityId, entity_url: entityUrl, entity_type: entityType, action_type: actionType, is_verified: isVerified },
			{ id, replace, insertAt }
		);
	}

	/** "Generating..." image placeholder (`GenAIImaginePrimitive`, imagine_type IMAGINE, status GENERATING; Go `AddGenerate`). Also sets `botMetadata.imagineMetadata`. */
	addGenerate(updateText = 'Generating...', { id, replace, insertAt } = {}) {
		this.setImagineType('IMAGINE');
		return this._addContent(AIRich.newLayout('Single', { media: {}, imagine_type: 'IMAGINE', status: { status: 'GENERATING', update_text: updateText }, __typename: 'GenAIImaginePrimitive' }), undefined, { id, replace, insertAt });
	}

	/**
	 * Video via `GenAIVideoPrimitive` (media + optional music clip + delivery urls + lip-sync flag) -- distinct from `addVideo()`,
	 * which uses `GenAIImaginePrimitive`/ANIMATE (Go `AddVideoPrimitive`). Experimental.
	 * @param {{url?: string|Buffer, mimeType?: string, fileLength?: number, durationMs?: number, width?: number, height?: number, thumbnail?: string|Buffer,
	 *   isLipSync?: boolean, musicClip?: {hasMusic?: boolean, songTitle?: string, artistName?: string, audioAssetId?: string, progressiveUri?: string, coverImageUri?: string},
	 *   delivery?: {progressiveUrls?: string[], dashManifests?: string[], manifestXml?: string}}} v
	 */
	addVideoPrimitive({ url, mimeType, fileLength, durationMs, width, height, thumbnail, isLipSync = false, musicClip, delivery } = {}, options = {}) {
		if (!url && !delivery) throw new TypeError('addVideoPrimitive() needs a url or delivery urls');
		const media = { url: url ? Toolkit.resolveMedia(this.#client, url, 'video') : undefined, mime_type: mimeType, file_length: fileLength, duration: durationMs, width, height, thumbnail: thumbnail ? { raw_media: Toolkit.resolveMedia(this.#client, thumbnail, 'image') } : undefined };
		const payload = { media, is_lip_sync: isLipSync };
		if (musicClip) payload.music_clip_info = { has_music: musicClip.hasMusic, song_title: musicClip.songTitle, artist_name: musicClip.artistName, audio_asset_id: musicClip.audioAssetId, progressive_uri: musicClip.progressiveUri, cover_image_uri: musicClip.coverImageUri };
		if (delivery) payload.video_delivery_response = { progressive_urls: delivery.progressiveUrls, dash_manifests: delivery.dashManifests, manifest_xml: delivery.manifestXml };
		return this._addSinglePrimitive('GenAIVideoPrimitive', payload, options);
	}

	/**
	 * Pure-primitive LaTeX run (`GenAILatexUXPrimitive`: media + latex_expression + font_height + padding; Go `AddLatexUX`). Experimental --
	 * needs a pre-rendered equation image `url`; for the inline-entity mechanism that is known to render, use `addLatex()`.
	 */
	addLatexUX({ expression, url, mimeType = 'image/png', fontHeight, padding } = {}, options = {}) {
		if (!expression || !url) throw new TypeError('addLatexUX() requires an expression and a pre-rendered image url');
		return this._addContent(
			AIRich.newLayout('Single', { latex_expression: expression, font_height: fontHeight, padding, media: { url: Toolkit.resolveMedia(this.#client, url, 'image'), mime_type: mimeType }, __typename: 'GenAILatexUXPrimitive' }),
			undefined,
			options
		);
	}

	// -- Text-card helpers: the Go reference renders these as plain markdown cards (no native primitive); same here. --

	/** Sports match card as formatted text (Go `AddSportsWidget`). */
	addSportsWidget({ name, abbreviation, league, status, venue } = {}, options = {}) {
		if (!name) throw new TypeError('addSportsWidget() requires a name');
		let text = `⚽ **${name}${abbreviation ? ` (${abbreviation})` : ''}**`;
		if (league) text += `\n${league}`;
		if (status) text += ` • ${status}`;
		if (venue) text += `\n🏟 ${venue}`;
		return this.addText(text, { hyperlink: false, citation: false, latex: false, ...options });
	}

	/** Follow-up prompt card as text (Go `AddClippyFollowUp`). */
	addClippyFollowUp({ promptText, intentCategory } = {}, options = {}) {
		if (!promptText) throw new TypeError('addClippyFollowUp() requires promptText');
		return this.addText(`📎 ${promptText}${intentCategory ? `\n_${intentCategory}_` : ''}`, { hyperlink: false, citation: false, latex: false, ...options });
	}

	/** Pinned header/subtitle card as text (Go `AddClippyWidget`). */
	addClippyWidget(header, subtitle = '', options = {}) {
		if (!header) throw new TypeError('addClippyWidget(header) requires a header');
		return this.addText(`📌 ${header}${subtitle ? `\n${subtitle}` : ''}`, { hyperlink: false, citation: false, latex: false, ...options });
	}

	/** Privacy/transparency note as text (Go `AddP13N`). */
	addP13N(text = 'Privasi dihormati', options = {}) {
		return this.addText(`🔒 ${text}`, { hyperlink: false, citation: false, latex: false, ...options });
	}

	/** Location-permission prompt line as text (Go `AddLocationPermission`). */
	addLocationPermission(placeholder = 'Untuk hasil terbaik, bagikan lokasi', options = {}) {
		return this.addText(`📍 ${placeholder}`, { hyperlink: false, citation: false, latex: false, ...options });
	}

	/** Timestamp placeholder line as text (Go `AddTimestampPlaceholder`). */
	addTimestampPlaceholder(placeholder = '…', options = {}) {
		return this.addText(`_⏱ ${placeholder}_`, { hyperlink: false, citation: false, latex: false, ...options });
	}

	/** Deep-link line as a markdown link (Go `AddDeeplinkItem`); falls back to the Android deeplink when `deepLinkUrl` is empty. */
	addDeeplinkItem(deepLinkUrl, androidDeeplinkUrl, { label = '🔗 Buka deep-link', ...options } = {}) {
		const target = deepLinkUrl || androidDeeplinkUrl;
		if (!target) throw new TypeError('addDeeplinkItem() requires a deep link url');
		return this.addText(`[${label}](${target})`, options);
	}

	/** Go-name alias of `loadFrom()`. */
	loadFromMessage(msg) {
		return this.loadFrom(msg);
	}

	/** Add blank vertical spacing (`GenAISpacerPrimitive`). @param {number} [spacing=1] Spacing unit, per observed traffic. */
	addSpacer(spacing = 1) {
		if (typeof spacing !== 'number' || spacing < 0) {
			throw new TypeError('addSpacer(spacing) requires a non-negative number');
		}
		this._submessages.push({ messageType: 2, messageText: `spasi ${spacing}` });
		this._sections.push(AIRich.newLayout('Single', { spacing, __typename: 'GenAISpacerPrimitive' }));
		return this;
	}

	/**
	 * Add a task/checklist card (`GenAITaskPrimitive`).
	 * @param {{task_id?: string, title: string, subtitle?: string, status?: string}} data
	 */
	addTask(data = {}) {
		if (!data?.title) {
			throw new TypeError('addTask() requires a "title"');
		}
		this._submessages.push({ messageType: 2, messageText: `Tugas: ${data.title}` });
		this._sections.push(
			AIRich.newLayout('Single', {
				task_id: data.task_id ?? '',
				title: data.title,
				subtitle: data.subtitle ?? '',
				status: data.status ?? 'IN_PROGRESS',
				__typename: 'GenAITaskPrimitive',
			})
		);
		// Safety net: GenAITaskPrimitive is a custom AI-only component the stock WA client
		// doesn't render visibly. Append a plain text section so the task is still visible.
		// Set data.textFallback = false to skip.
		if (data.textFallback !== false) {
			const fallbackText = data.subtitle ? `${data.title} — ${data.subtitle}` : data.title;
			this._sections.push(AIRich.newLayout('Single', { text: `Tugas: ${fallbackText}`, __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/**
	 * Batch version of `addTask()` — one or more task/checklist cards (`GenAITaskPrimitive`) pushed
	 * as a single `primitives` array on one layout, instead of one `addTask()` call (and one
	 * `_sections` entry) per task.
	 * @param {{task_id?: string, title: string, subtitle?: string, status?: string}[]} tasks
	 * @param {{textFallback?: boolean}} [options]
	 */
	addTasks(tasks = [], { textFallback = true } = {}) {
		if (!Array.isArray(tasks) || !tasks.length) {
			throw new TypeError('addTasks(tasks) requires a non-empty array');
		}
		const primitives = tasks.map((data, i) => {
			if (!data?.title) throw new TypeError(`addTasks(): task ${i} requires a "title"`);
			return {
				task_id: data.task_id ?? '',
				title: data.title,
				subtitle: data.subtitle ?? '',
				status: data.status ?? 'IN_PROGRESS',
				__typename: 'GenAITaskPrimitive',
			};
		});
		this._submessages.push({ messageType: 2, messageText: `Tugas: ${tasks.map((t) => t.title).join(', ')}` });
		this._sections.push(AIRich.newLayout('Single', primitives));
		// Same safety net as addTask(): stock client doesn't render GenAITaskPrimitive visibly.
		if (textFallback) {
			const fallbackText = tasks.map((t) => (t.subtitle ? `${t.title} — ${t.subtitle}` : t.title)).join('\n');
			this._sections.push(AIRich.newLayout('Single', { text: `Tugas:\n${fallbackText}`, __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/** Add a "thinking" status banner (`GenAIBotThinkingStatusPrimitive`). See `addProgressStatus()`. */
	addThinkingStatus(title, { icon = 'THINKING', is_in_progress = true, target_secondary_screen_id, target_secondary_screen_tab_id, textFallback = true } = {}) {
		if (typeof title !== 'string' || !title) {
			throw new TypeError('addThinkingStatus(title) requires a non-empty string');
		}
		this._submessages.push({ messageType: 2, messageText: title });
		const primitive = {
			title,
			icon,
			is_in_progress,
			meta_search_apps: [],
			__typename: 'GenAIBotThinkingStatusPrimitive',
		};
		// Same crash-avoidance rule as addProgressStatus(): omit, never null.
		if (target_secondary_screen_id != null) primitive.target_secondary_screen_id = target_secondary_screen_id;
		if (target_secondary_screen_tab_id != null) primitive.target_secondary_screen_tab_id = target_secondary_screen_tab_id;
		this._sections.push(AIRich.newLayout('Single', primitive));
		// Safety net: stock WA client doesn't render this primitive's own view (it's meant
		// as a transient spinner in the official app), so the card shows blank when forwarded.
		// Append a plain text section so the title is still visible. Set { textFallback: false } to skip.
		if (textFallback) {
			this._sections.push(AIRich.newLayout('Single', { text: title, __typename: 'FOATextPrimitive' }));
		}
		return this;
	}

	/**
	 * Send an image and video as one paired-media unit (image sent first, video linked to it via
	 * `messageAssociation`). Distinct from a plain album — the client treats them as a single group.
	 * @param {import('../../WAProto/index.js').WASocket} client
	 * @param {string} jid
	 * @param {{ image: string|Buffer, video: string|Buffer }} media
	 */
	static async sendPairedMedia(client, jid, { image, video } = {}) {
		if (!client) throw new Error('Socket is required');
		if (!image || !video) throw new TypeError('sendPairedMedia() requires both "image" and "video"');

		const imagePrepared = await prepareWAMessageMedia(
			{ image: typeof image === 'string' ? { url: image } : image },
			{ upload: client.waUploadToServer }
		);
		const videoPrepared = await prepareWAMessageMedia(
			{ video: typeof video === 'string' ? { url: video } : video },
			{ upload: client.waUploadToServer }
		);

		const imageMsg = generateWAMessageFromContent(
			jid,
			{
				imageMessage: {
					...imagePrepared.imageMessage,
					contextInfo: { pairedMediaType: 5, statusSourceType: 0 },
				},
			},
			{}
		);

		await client.relayMessage(jid, imageMsg.message, { messageId: imageMsg.key.id });

		await client.relayMessage(
			jid,
			{
				videoMessage: {
					...videoPrepared.videoMessage,
					contextInfo: { pairedMediaType: 6, statusSourceType: 0 },
				},
				messageContextInfo: {
					messageAssociation: { associationType: 12, parentMessageKey: imageMsg.key },
				},
			},
			{}
		);

		return imageMsg.key;
	}

	/**
	 * Send a support-ticket marker message (`messageContextInfo.supportPayload`) — a plain
	 * conversation message tagged as an AI/support-bot ticket, distinct from richResponseMessage.
	 * @param {import('../../WAProto/index.js').WASocket} client
	 * @param {string} jid
	 * @param {string} text
	 * @param {{ ticketId?: string, isAiMessage?: boolean, shouldShowSystemMessage?: boolean, version?: number }} [options]
	 */
	static async sendSupportPayload(client, jid, text, { ticketId = crypto.randomUUID(), isAiMessage = true, shouldShowSystemMessage = true, version = 1 } = {}) {
		if (!client) throw new Error('Socket is required');
		if (typeof text !== 'string' || !text) throw new TypeError('sendSupportPayload(client, jid, text) requires a non-empty string text');

		const msg = {
			conversation: text,
			messageContextInfo: {
				messageSecret: crypto.randomBytes(32),
				supportPayload: JSON.stringify({
					version,
					is_ai_message: isAiMessage,
					should_show_system_message: shouldShowSystemMessage,
					ticket_id: ticketId,
				}),
			},
		};

		return client.relayMessage(jid, msg, {
			additionalNodes: [
				{ tag: 'bot', attrs: { biz_bot: '1' } },
				{ tag: 'biz', attrs: {} },
			],
		});
	}

	/** The `unifiedResponse.response_id` this instance is currently pinned to. */
	get responseId() {
		return this._responseId;
	}
}

/** Thin no-op subclass of `AIRich` — kept for drop-in compatibility with code ported from ourin-baileys that references `ORich` by name. */
class ORich extends AIRich {}

export { AIRich, ORich };
