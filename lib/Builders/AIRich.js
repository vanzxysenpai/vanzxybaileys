import { BaseBuilder, Toolkit, extractIE, waitAllPromises, crypto, generateWAMessageFromContent, generateMessageIDV2 } from './shared.js';

const VERSION = '5.0';

class AIRich extends BaseBuilder {
	#client;

	constructor(client, { dynamic = true, unsupportedTypeAlert = true } = {}) {
		if (!client) {
			throw new Error('Socket is required');
		}

		super();
		this.#client = client;
		this._contextInfo = {};
		this._nodes = [];
		this._idIndex = new Map();
		this._unsupportedTypeAlert = !!unsupportedTypeAlert;
		this._dynamic = !!dynamic;
		this._responseId = crypto.randomUUID();
		this._botResponseId = crypto.randomUUID();
		this._lastMessageKey = null;
	}

	loadFrom(msg) {
		if (!msg) throw new Error('AI Rich message needed');

		const message = msg.message ?? msg;

		let richResponseMessage = message?.botForwardedMessage?.message?.richResponseMessage;

		if (!richResponseMessage) {
			richResponseMessage = message?.botForwardedMessage?.richResponseMessage;
		}

		if (!richResponseMessage) {
			richResponseMessage = message?.richResponseMessage;
		}

		if (!richResponseMessage) {
			throw new Error('richResponseMessage not found');
		}

		const messageContextInfo = message?.messageContextInfo ?? {};
		const botMetadata = messageContextInfo?.botMetadata ?? {};

		this._title = botMetadata?.messageDisclaimerText ?? '';

		this._contextInfo = structuredClone(richResponseMessage?.contextInfo ?? {});

		const loadedSubmessages = Array.isArray(richResponseMessage?.submessages) ? structuredClone(richResponseMessage.submessages) : [];

		let loadedSections = [];

		const unifiedData = richResponseMessage?.unifiedResponse?.data;

		if (unifiedData) {
			try {
				const decoded = Buffer.from(unifiedData, 'base64').toString('utf8');
				const unifiedResponse = JSON.parse(decoded);

				if (Array.isArray(unifiedResponse?.sections)) {
					loadedSections = structuredClone(unifiedResponse.sections);
				}
			} catch {}
		}

		this._nodes = [];
		this._idIndex = new Map();

		const maxLength = Math.max(loadedSections.length, loadedSubmessages.length);

		for (let i = 0; i < maxLength; i++) {
			this._nodes.push({
				id: null,
				section: loadedSections[i] ?? null,
				submessage: loadedSubmessages[i] ?? null,
			});
		}

		this._extraPayload = {};

		for (const [key, value] of Object.entries(message)) {
			if (key !== 'messageContextInfo' && key !== 'botForwardedMessage' && key !== 'richResponseMessage') {
				this._extraPayload[key] = structuredClone(value);
			}
		}

		return this;
	}

	setResponseId(id) {
		if (typeof id !== 'string') {
			throw new TypeError('ID must be a string');
		}
		this._responseId = id;

		return this;
	}

	refreshResponseId() {
		this._responseId = crypto.randomUUID();

		return this;
	}

	setBotResponseId(id) {
		if (typeof id !== 'string') {
			throw new TypeError('ID must be a string');
		}
		this._botResponseId = id;

		return this;
	}

	refreshBotResponseId() {
		this._botResponseId = crypto.randomUUID();

		return this;
	}

	createAlert(type) {
		if (this._unsupportedTypeAlert) {
			return {
				messageType: 2,
				messageText: `[ UNSUPPORTED_TYPE - ${type}]`,
			};
		}

		return undefined;
	}

	addText(text, { hyperlink = true, citation = true, latex = true, id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const { text: extractedText, inline_entities } = extractIE(text, {
			hyperlink,
			citation,
			latex,
		});

		const section = AIRich.newLayout('Single', {
			text: extractedText,
			...(inline_entities.length && { inline_entities }),
			__typename: 'GenAIMarkdownTextUXPrimitive',
		});

		const submessages = [
			{
				messageType: 2,
				messageText: text,
			},
		].filter(Boolean);

		return this._addContent(section, submessages, {
			id,
			replace,
			insertAt,
		});
	}

	/** Alias — .d.ts documents this as "addHeading" (FOATextPrimitive), source only ever exposed addFOAText(). */
	addHeading(text, options = {}) {
		return this.addFOAText(text, options);
	}

	addFOAText(text, { id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const section = AIRich.newLayout('Single', {
			text,
			__typename: 'FOATextPrimitive',
		});

		const submessages = [
			{
				messageType: 2,
				messageText: text,
			},
		];

		return this._addContent(section, submessages, {
			id,
			replace,
			insertAt,
		});
	}

	addCode(language, code, { id, replace, insertAt } = {}) {
		if (typeof language !== 'string' || typeof code !== 'string') {
			throw new TypeError('Language and code must be a string');
		}

		const meta = AIRich.tokenizer(code, language);

		const section = AIRich.newLayout('Single', {
			language,
			code_blocks: meta.unified_codeBlock,
			__typename: 'GenAICodeUXPrimitive',
		});

		const submessages = [
			{
				messageType: 5,
				codeMetadata: {
					codeLanguage: language,
					codeBlocks: meta.codeBlock,
				},
			},
		];

		return this._addContent(section, submessages, {
			id,
			replace,
			insertAt,
		});
	}

	addTable(table, { hyperlink = true, citation = true, latex = true, id, replace, insertAt } = {}) {
		if (!Array.isArray(table)) {
			throw new TypeError('Table must be an array');
		}

		const meta = AIRich.toTableMetadata(table, {
			hyperlink,
			citation,
			latex,
		});

		const section = AIRich.newLayout('Single', {
			rows: meta.unified_rows,
			__typename: 'GenATableUXPrimitive',
		});

		const submessages = [
			{
				messageType: 4,
				tableMetadata: {
					title: meta.title,
					rows: meta.rows,
				},
			},
		];

		return this._addContent(section, submessages, {
			id,
			replace,
			insertAt,
		});
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

		if (isStringArray) {
			sources = [sources];
		}

		const normalizedSources = sources.map((source) => {
			if (Array.isArray(source)) {
				const [icon, url, title, subtitle] = source;

				return {
					icon,
					url,
					title,
					subtitle,
				};
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

		const section = AIRich.newLayout('Single', {
			sources: source,
			__typename: 'GenAISearchResultPrimitive',
		});

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
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

		return this._addContent(section, submessages, {
			id,
			replace,
			insertAt,
		});
	}

	addImage(imageUrl, { width, height, status = 'READY', update_text, resolveUrl = false, id, replace, insertAt } = {}) {
		if (!(typeof imageUrl === 'string' || Buffer.isBuffer(imageUrl) || (Array.isArray(imageUrl) && imageUrl.every((v) => typeof v === 'string' || Buffer.isBuffer(v))))) {
			throw new TypeError('imageUrl must be string | buffer | array of string/buffer');
		}

		const list = Array.isArray(imageUrl)
			? imageUrl.map((v) => {
					const url = Toolkit.resolveMedia(this.#client, v, 'image', { resolveUrl });

					return {
						imagePreviewUrl: url,
						imageHighResUrl: url,
						sourceUrl: url,
					};
				})
			: (() => {
					const url = Toolkit.resolveMedia(this.#client, imageUrl, 'image', { resolveUrl });

					return [
						{
							imagePreviewUrl: url,
							imageHighResUrl: url,
							sourceUrl: url,
						},
					];
				})();

		const sections = list.map(({ imagePreviewUrl }) =>
			AIRich.newLayout('Single', {
				media: {
					url: imagePreviewUrl,
					mime_type: 'image/png',
					width,
					height,
				},
				imagine_type: 'IMAGE',
				status: {
					status,
					update_text,
				},
				__typename: 'GenAIImaginePrimitive',
			})
		);

		const submessage = {
			messageType: 1,
			gridImageMetadata: {
				gridImageUrl: {
					imagePreviewUrl: list[0]?.imagePreviewUrl,
				},
				imageUrls: list,
			},
		};

		if (id && sections.length !== 1) {
			throw new Error('Cannot assign one id to multiple image sections');
		}

		return this._addContent(sections, submessage, {
			id,
			replace,
			insertAt,
		});
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
						? bufferPromise.then((b) =>
								Toolkit.getMp4Duration(b, {
									silent: true,
								})
							)
						: 0;

			const thumbnail =
				isObject && item.thumbnail
					? Toolkit.resolveMedia(this.#client, item.thumbnail, 'image', {
							result: 'base64',
							resize: true,
							width: 300,
							height: 300,
						})
					: autoFill
						? bufferPromise?.then((b) =>
								Toolkit.getMp4Preview(b, {
									time: 0,
									result: 'base64',
								})
							)
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
					thumbnail: {
						raw_media: thumbnail,
					},
					__typename: 'GenAIImaginePrimitive',
				})
			);
		}

		if (alert !== undefined) {
			submessages.push(alert);
		}

		if (submessages.length > 1) {
			throw new Error('Video content can only have one submessage');
		}

		return this._addContent(sections, submessages[0], {
			id,
			replace,
			insertAt,
		});
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
			image: {
				url: Toolkit.resolveMedia(this.#client, item.image_url ?? item.image, 'image'),
			},
			additional_images: [
				{
					url: Toolkit.resolveMedia(this.#client, item.icon_url ?? item.icon, 'image'),
				},
			],
			__typename: 'GenAIProductItemCardPrimitive',
		}));

		const section = AIRich.newLayout(Array.isArray(data) ? 'HScroll' : 'Single', Array.isArray(data) ? product : product[0]);

		const submessage = this.createAlert('GenAIProductItemCardPrimitive');

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
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

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	addMetadata(text, { id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const section = AIRich.newLayout('Single', {
			text,
			__typename: 'GenAIMetadataTextPrimitive',
		});

		const submessage = {
			messageType: 2,
			messageText: text,
		};

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	addTip(text, { id, replace, insertAt } = {}) {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const section = AIRich.newLayout('Single', {
			text: 'ⓘ ' + text,
			__typename: 'GenAIMetadataTextPrimitive',
		});

		const submessage = {
			messageType: 2,
			messageText: text,
		};

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	addWidget(data, { layout, id, replace, insertAt, ...options } = {}) {
		if (!((data && typeof data === 'object' && !Array.isArray(data)) || (Array.isArray(data) && data.every((item) => item && typeof item === 'object' && !Array.isArray(item))))) {
			throw new TypeError('Widget must be an object or an array of objects');
		}

		const isArray = Array.isArray(data);

		const items = isArray ? data : [data];

		const widgets = items.map((item) => ({
			__typename: 'GenAI3PExtWidgetPrimitive',

			header: {
				__typename: 'GenAI3PExtWidgetStandardHeader',
				title: item.title ?? '',
				...(item.header ?? {}),
			},

			body: {
				__typename: 'GenAI3PExtCalendarEventList',
				sections: item.sections ?? [],

				ctas: (item.actions ?? []).map((action) => ({
					__typename: 'GenAI3PExtWidgetCTA',
					label: action.label ?? '',
					state: action.state ?? 'PENDING',
					kind: action.kind ?? 'OTHER',
					tool_call_id: action.tool_call_id ?? action.id ?? '',

					...(action.toast && {
						toast: {
							__typename: 'GenAI3PExtWidgetToast',
							label: action.toast.label ?? action.label ?? '',
						},
					}),
				})),

				...(item.body ?? {}),
			},
		}));

		const section = AIRich.newLayout(layout ?? (isArray ? 'HScroll' : 'Single'), isArray ? widgets : widgets[0], options);

		const submessage = this.createAlert('GenAI3PExtWidgetStandardHeader');

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
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

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	addTask(data, { id, replace, insertAt } = {}) {
		if (Array.isArray(data) && data.length === 0) {
			throw new TypeError('Task array must not be empty');
		}

		const isValidSingle = data && typeof data === 'object' && !Array.isArray(data);
		const isValidArray = Array.isArray(data) && data.every((item) => item && typeof item === 'object' && !Array.isArray(item));

		if (!isValidSingle && !isValidArray) {
			throw new TypeError('Task must be an object or a non-empty array of objects');
		}

		const isArray = Array.isArray(data);
		const items = isArray ? data : [data];

		const tasks = items.map((item) => {
			if (typeof item.title !== 'string' || !item.title) {
				throw new TypeError('addTask() requires a "title"');
			}

			return {
				task_id: item.task_id ?? '',
				title: item.title,
				subtitle: item.subtitle ?? '',
				status: item.status ?? 'PENDING',
				__typename: 'GenAITaskPrimitive',
			};
		});

		const section = AIRich.newLayout(isArray ? 'HScroll' : 'Single', isArray ? tasks : tasks[0]);

		const submessage = this.createAlert('GenAITaskPrimitive');

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	addQuotaUpsell(data, { id, replace, insertAt } = {}) {
		if (!data || typeof data !== 'object' || Array.isArray(data)) {
			throw new TypeError('Quota upsell must be an object');
		}

		if (typeof data.title !== 'string' || !data.title) {
			throw new TypeError('addQuotaUpsell() requires a "title"');
		}

		const buttons = Array.isArray(data.buttons) ? data.buttons : [];

		const primitive = {
			__typename: 'GenAIMetaSubsQuotaUpsellPrimitive',
			title: data.title,
			body_line1: data.body_line1 ?? data.body ?? '',
			body_line2: data.body_line2 ?? '',

			buttons: buttons.map((btn) => ({
				__typename: 'GenAIMetaSubsQuotaUpsellButton',
				label: btn.label ?? '',
				action: btn.action ?? 'OPEN_DEEPLINK',
				deeplink: btn.deeplink ?? '',
			})),
		};

		const section = AIRich.newLayout('Single', primitive);

		const submessage = this.createAlert('GenAIMetaSubsQuotaUpsellPrimitive');

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	/** GenAIDividerPrimitive — plain horizontal line, no content. */
	addDivider({ id, replace, insertAt } = {}) {
		const section = AIRich.newLayout('Single', {
			__typename: 'GenAIDividerPrimitive',
		});

		return this._addContent(section, undefined, {
			id,
			replace,
			insertAt,
		});
	}

	/** GenAISpacerPrimitive — blank vertical spacing. */
	addSpacer(spacing, { id, replace, insertAt } = {}) {
		const section = AIRich.newLayout('Single', {
			spacing,
			__typename: 'GenAISpacerPrimitive',
		});

		return this._addContent(section, undefined, {
			id,
			replace,
			insertAt,
		});
	}

	/**
	 * GenAILatexItem — corrected after cross-checking an older, actually-shipped build
	 * (MessageBuilder v4.7, pre-dates this primitive-card guess). LaTeX in this ecosystem
	 * is NOT a standalone card — the real, working mechanism is an inline entity inside
	 * addText()'s own extractIE() parser (`[expr|width|height|font_height|padding]<imageUrl>`
	 * syntax), and it requires a PRE-RENDERED image of the equation — WhatsApp does not
	 * render raw LaTeX text client-side. The previous addLatex() (standalone
	 * GenAILatexUXPrimitive card, text-only) was confirmed via eval to render blank because
	 * that primitive/approach never existed in the first place. This version is a thin
	 * wrapper around the real, already-working addText() inline syntax.
	 */
	addLatex(expression, { url, width, height, font_height, padding, id, replace, insertAt } = {}) {
		if (typeof expression !== 'string' || !expression) {
			throw new TypeError('addLatex(expression) requires a non-empty string');
		}

		if (!url) {
			throw new TypeError('addLatex() requires a pre-rendered equation image "url" — WhatsApp renders LaTeX as an inline image, not raw text');
		}

		const extras = [width, height, font_height, padding];

		while (extras.length && extras[extras.length - 1] == null) {
			extras.pop();
		}

		const raw = [expression, ...extras].join('|');

		return this.addText(`[${raw}]<${url}>`, {
			id,
			replace,
			insertAt,
		});
	}

	/**
	 * GenAIInlineImageUXPrimitive — messageType 3 (INLINE_IMAGE) submessage, field layout
	 * ported from rich-message-utils.js toUnified() INLINE_IMAGE case (same image-url-object
	 * fix as addImage()/bug 40 round 2), not guessed from the .d.ts alone.
	 */
	addInlineImage(imageUrl, { text = '', alignment = 'center', tapLinkUrl = '', resolveUrl = false, id, replace, insertAt } = {}) {
		if (!(typeof imageUrl === 'string' || Buffer.isBuffer(imageUrl))) {
			throw new TypeError('imageUrl must be string | buffer');
		}

		const url = Toolkit.resolveMedia(this.#client, imageUrl, 'image', { resolveUrl });

		const ALIGNMENT_INDEX = { leading: 0, trailing: 1, center: 2 };
		const ALIGNMENT_NAME = ['AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED', 'AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED', 'AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED'];
		const alignmentIndex = ALIGNMENT_INDEX[String(alignment).toLowerCase()] ?? ALIGNMENT_INDEX.center;

		const section = AIRich.newLayout('Single', {
			image_url: {
				image_preview_url: url,
				image_high_res_url: url,
				source_url: url,
			},
			image_text: text,
			alignment: ALIGNMENT_NAME[alignmentIndex],
			tap_link_url: tapLinkUrl,
			__typename: 'GenAIInlineImageUXPrimitive',
		});

		const submessage = {
			messageType: 3,
			imageMetadata: {
				imageUrl: { imagePreviewUrl: url, imageHighResUrl: url, sourceUrl: url },
				imageText: text,
				alignment: alignmentIndex,
				tapLinkUrl,
			},
		};

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	/**
	 * GenAIContentItemsUXPrimitive — messageType 9 (CONTENT_ITEMS) submessage, ported from
	 * rich-message-utils.js toUnified() CONTENT_ITEMS case (bug 40: was returning {}).
	 */
	addContentItems(items = [], { content_type = 1, id, replace, insertAt } = {}) {
		if (!Array.isArray(items)) {
			throw new TypeError('addContentItems() requires an array of items');
		}

		const section = AIRich.newLayout('Single', {
			items,
			content_type,
			__typename: 'GenAIContentItemsUXPrimitive',
		});

		const submessage = {
			messageType: 9,
			contentItemsMetadata: {
				itemsMetadata: items,
				contentType: content_type,
			},
		};

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	/** GenAIBotProgressStatusPrimitive — one-shot "searching/working" status chip. */
	addProgressStatus(title, { icon, is_in_progress = true, target_secondary_screen_id, target_secondary_screen_tab_id, id, replace, insertAt } = {}) {
		if (typeof title !== 'string' || !title) {
			throw new TypeError('addProgressStatus() requires a "title"');
		}

		const section = AIRich.newLayout('Single', {
			title,
			icon,
			is_in_progress,
			target_secondary_screen_id,
			target_secondary_screen_tab_id,
			__typename: 'GenAIBotProgressStatusPrimitive',
		});

		const submessage = this.createAlert('GenAIBotProgressStatusPrimitive');

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	/** GenAIBotThinkingStatusPrimitive — one-shot "thinking" status chip. */
	addThinkingStatus(title, { icon, is_in_progress = true, target_secondary_screen_id, target_secondary_screen_tab_id, textFallback = true, id, replace, insertAt } = {}) {
		if (typeof title !== 'string' || !title) {
			throw new TypeError('addThinkingStatus() requires a "title"');
		}

		const section = AIRich.newLayout('Single', {
			title,
			icon,
			is_in_progress,
			target_secondary_screen_id,
			target_secondary_screen_tab_id,
			__typename: 'GenAIBotThinkingStatusPrimitive',
		});

		const submessage = textFallback ? this.createAlert('GenAIBotThinkingStatusPrimitive') : undefined;

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	/** FOABloksPrimitive — raw Bloks payload; most experimental primitive, fields passed through as-is. */
	addBloks(data, { id, replace, insertAt } = {}) {
		if (!data || typeof data !== 'object' || Array.isArray(data)) {
			throw new TypeError('Bloks payload must be an object');
		}

		if (typeof data.type !== 'string' || !data.type) {
			throw new TypeError('addBloks() requires a "type"');
		}

		const { textFallback = true, ...rest } = data;

		const section = AIRich.newLayout('Single', {
			...rest,
			__typename: 'FOABloksPrimitive',
		});

		const submessage = textFallback ? this.createAlert('FOABloksPrimitive') : undefined;

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	/**
	 * GenAIImaginePrimitive with status GENERATING — pending-generation placeholder.
	 * Mirrors addVideo()'s ANIMATE/GENERATING branch but with no media yet.
	 */
	addGenerating({ imagine_type = 'IMAGE', estimated_completion_time, textFallback = true, id, replace, insertAt } = {}) {
		const section = AIRich.newLayout('Single', {
			imagine_type,
			status: {
				status: 'GENERATING',
				// Matches addVideo()'s convention: input is a ms-from-now duration, stored as a unix-seconds timestamp.
				estimated_completion_time: estimated_completion_time != null ? Math.floor((Date.now() + estimated_completion_time) / 1000) : undefined,
			},
			__typename: 'GenAIImaginePrimitive',
		});

		const submessage = textFallback ? this.createAlert(`GenAIImaginePrimitive (${imagine_type === 'ANIMATE' ? 'ANIMATE' : 'IMAGE'} GENERATING)`) : undefined;

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	addSuggest(suggestion, { scroll = true, layout, id, replace, insertAt } = {}) {
		if (!(typeof suggestion === 'string' || (Array.isArray(suggestion) && suggestion.every((v) => typeof v === 'string')))) {
			throw new TypeError('Suggestion must be a string or array of strings');
		}

		const suggest = Array.isArray(suggestion)
			? suggestion.map((text) => ({
					prompt_text: text,
					prompt_type: 'SUGGESTED_PROMPT',
					__typename: 'GenAIFollowUpSuggestionPillPrimitive',
				}))
			: [
					{
						prompt_text: suggestion,
						prompt_type: 'SUGGESTED_PROMPT',
						__typename: 'GenAIFollowUpSuggestionPillPrimitive',
					},
				];

		const type = layout ?? (suggest.length === 1 ? 'Single' : scroll ? 'HScroll' : 'ActionRow');

		const section = AIRich.newLayout(type, type === 'Single' ? suggest[0] : suggest, {
			__typename: 'GenAIUnifiedResponseSection',
		});

		const submessage = this.createAlert('GenAIFollowUpSuggestionPillPrimitive');

		return this._addContent(section, submessage, {
			id,
			replace,
			insertAt,
		});
	}

	async build(
		jid,
		{ bypassDownload = true, forwarded = true, notification = false, includesUnifiedResponse = true, includesSubmessages = true, quoted, quotedParticipant, messageId, ...options } = {}
	) {
		const forward = forwarded
			? {
					forwardingScore: 1,
					isForwarded: true,
					forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
					forwardOrigin: 4,
				}
			: {};

		const notif = notification
			? {
					sessionTransparencyMetadata: {
						disclaimerText: '~ Ahmad tumbuh kembang',
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
			? [
					...(await waitAllPromises(this._sections)),
					AIRich.newLayout('Single', {
						text: this._footer,
						__typename: 'GenAIMetadataTextPrimitive',
					}),
				]
			: [...(await waitAllPromises(this._sections))];

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
					botMetadata: {
						messageDisclaimerText: this._title,
						...notif,
						verificationMetadata: AIRich.generateVerificationMetadata(),
						botResponseId: this._botResponseId,
					},
				},
				...this._extraPayload,
				botForwardedMessage: {
					message: {
						richResponseMessage: {
							messageType: 1,
							submessages: includesSubmessages ? await waitAllPromises(this._submessages) : [],
							unifiedResponse: {
								data: includesUnifiedResponse ? Buffer.from(Toolkit.stringifyEscaped({ response_id: this._responseId, sections })).toString('base64') : '',
							},
							originalRecipientMetadata: {
								data: includesUnifiedResponse ? Buffer.from(Toolkit.stringifyEscaped({ response_id: this._responseId, sections })).toString('base64') : '',
							},
							contextInfo: {
								...forward,
								...qObj,
								...this._contextInfo,
							},
						},
					},
				},
			},
			{ messageId: messageId || generateMessageIDV2(), ...options }
		);
	}

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
							key: {
								remoteJid: targetJid,
								fromMe: true,
								id: targetId,
							},
							type: 14,
							editedMessage,
						},
					},
				},
			},
			{ messageId: messageId || generateMessageIDV2(), ...options }
		);
	}

	async sendEdit(jid, id, { msg, messageId, additionalNodes = [], ...options } = {}) {
		jid = jid ?? this._lastMessageKey?.remoteJid;
		id = id ?? this._lastMessageKey?.id;

		if (!jid) {
			throw new Error('JID is required');
		}

		if (!id) {
			throw new Error('Message id is required');
		}

		const msgEdit = await this.buildEdit(jid, id, {
			msg,
			messageId: messageId || generateMessageIDV2(),
			...options,
		});

		await this.#client.relayMessage(jid, msgEdit.message, {
			messageId: msgEdit.key.id,
			additionalNodes,
		});

		return msgEdit;
	}

	async send(jid, { bypassDownload = true, forwarded = true, notification = false, includesUnifiedResponse = true, includesSubmessages = true, messageId, additionalNodes = [], ...options } = {}) {
		const msg = await this.build(jid, {
			forwarded,
			notification,
			includesUnifiedResponse,
			includesSubmessages,
			messageId,
			...options,
		});

		await this.#client.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes,
			...options,
		});

		if (includesUnifiedResponse && bypassDownload) {
			await this.sendEdit(jid, msg.key.id, {
				msg: msg.message,
			});
		}

		this._lastMessageKey = msg.key;

		return msg;
	}

	static tokenizer(code, lang = 'javascript') {
		const keywordsMap = {
			javascript: new Set([
				'break',
				'case',
				'catch',
				'continue',
				'debugger',
				'delete',
				'do',
				'else',
				'finally',
				'for',
				'function',
				'if',
				'in',
				'instanceof',
				'new',
				'return',
				'switch',
				'this',
				'throw',
				'try',
				'typeof',
				'var',
				'void',
				'while',
				'with',
				'true',
				'false',
				'null',
				'undefined',
				'class',
				'const',
				'let',
				'super',
				'extends',
				'export',
				'import',
				'yield',
				'static',
				'constructor',
				'async',
				'await',
				'get',
				'set',
			]),

			typescript: new Set([
				'abstract',
				'any',
				'as',
				'asserts',
				'bigint',
				'boolean',
				'declare',
				'enum',
				'implements',
				'infer',
				'interface',
				'is',
				'keyof',
				'module',
				'namespace',
				'never',
				'readonly',
				'require',
				'number',
				'object',
				'override',
				'private',
				'protected',
				'public',
				'satisfies',
				'string',
				'symbol',
				'type',
				'unknown',
				'using',
				'from',
				'break',
				'case',
				'catch',
				'continue',
				'do',
				'else',
				'finally',
				'for',
				'function',
				'if',
				'new',
				'return',
				'switch',
				'this',
				'throw',
				'try',
				'var',
				'void',
				'while',
				'class',
				'const',
				'let',
				'extends',
				'import',
				'export',
				'async',
				'await',
			]),

			python: new Set([
				'False',
				'None',
				'True',
				'and',
				'as',
				'assert',
				'async',
				'await',
				'break',
				'class',
				'continue',
				'def',
				'del',
				'elif',
				'else',
				'except',
				'finally',
				'for',
				'from',
				'global',
				'if',
				'import',
				'in',
				'is',
				'lambda',
				'nonlocal',
				'not',
				'or',
				'pass',
				'raise',
				'return',
				'try',
				'while',
				'with',
				'yield',
			]),

			java: new Set([
				'abstract',
				'assert',
				'boolean',
				'break',
				'byte',
				'case',
				'catch',
				'char',
				'class',
				'const',
				'continue',
				'default',
				'do',
				'double',
				'else',
				'enum',
				'extends',
				'final',
				'finally',
				'float',
				'for',
				'goto',
				'if',
				'implements',
				'import',
				'instanceof',
				'int',
				'interface',
				'long',
				'native',
				'new',
				'package',
				'private',
				'protected',
				'public',
				'return',
				'short',
				'static',
				'strictfp',
				'super',
				'switch',
				'synchronized',
				'this',
				'throw',
				'throws',
				'transient',
				'try',
				'void',
				'volatile',
				'while',
			]),

			golang: new Set([
				'break',
				'case',
				'chan',
				'const',
				'continue',
				'default',
				'defer',
				'else',
				'fallthrough',
				'for',
				'func',
				'go',
				'goto',
				'if',
				'import',
				'interface',
				'map',
				'package',
				'range',
				'return',
				'select',
				'struct',
				'switch',
				'type',
				'var',
			]),

			c: new Set([
				'auto',
				'break',
				'case',
				'char',
				'const',
				'continue',
				'default',
				'do',
				'double',
				'else',
				'enum',
				'extern',
				'float',
				'for',
				'goto',
				'if',
				'int',
				'long',
				'register',
				'return',
				'short',
				'signed',
				'sizeof',
				'static',
				'struct',
				'switch',
				'typedef',
				'union',
				'unsigned',
				'void',
				'volatile',
				'while',
			]),

			cpp: new Set([
				'alignas',
				'alignof',
				'and',
				'auto',
				'bool',
				'break',
				'case',
				'catch',
				'class',
				'const',
				'constexpr',
				'continue',
				'delete',
				'do',
				'double',
				'else',
				'enum',
				'explicit',
				'export',
				'extern',
				'false',
				'float',
				'for',
				'friend',
				'if',
				'inline',
				'int',
				'long',
				'mutable',
				'namespace',
				'new',
				'noexcept',
				'nullptr',
				'operator',
				'private',
				'protected',
				'public',
				'return',
				'short',
				'signed',
				'sizeof',
				'static',
				'struct',
				'switch',
				'template',
				'this',
				'throw',
				'true',
				'try',
				'typedef',
				'typename',
				'union',
				'unsigned',
				'using',
				'virtual',
				'void',
				'while',
			]),

			php: new Set([
				'abstract',
				'and',
				'array',
				'as',
				'break',
				'callable',
				'case',
				'catch',
				'class',
				'clone',
				'const',
				'continue',
				'declare',
				'default',
				'do',
				'echo',
				'else',
				'elseif',
				'empty',
				'enddeclare',
				'endfor',
				'endforeach',
				'endif',
				'endswitch',
				'endwhile',
				'extends',
				'final',
				'finally',
				'fn',
				'for',
				'foreach',
				'function',
				'global',
				'goto',
				'if',
				'implements',
				'include',
				'include_once',
				'instanceof',
				'interface',
				'match',
				'namespace',
				'new',
				'null',
				'or',
				'private',
				'protected',
				'public',
				'require',
				'require_once',
				'return',
				'static',
				'switch',
				'throw',
				'trait',
				'try',
				'use',
				'var',
				'while',
				'yield',
			]),

			rust: new Set([
				'as',
				'break',
				'const',
				'continue',
				'crate',
				'else',
				'enum',
				'extern',
				'false',
				'fn',
				'for',
				'if',
				'impl',
				'in',
				'let',
				'loop',
				'match',
				'mod',
				'move',
				'mut',
				'pub',
				'ref',
				'return',
				'self',
				'Self',
				'static',
				'struct',
				'super',
				'trait',
				'true',
				'type',
				'unsafe',
				'use',
				'where',
				'while',
			]),

			html: new Set([
				'html',
				'head',
				'body',
				'div',
				'span',
				'p',
				'a',
				'img',
				'video',
				'audio',
				'script',
				'style',
				'link',
				'meta',
				'form',
				'input',
				'button',
				'table',
				'tr',
				'td',
				'th',
				'ul',
				'ol',
				'li',
				'section',
				'article',
				'header',
				'footer',
				'nav',
				'main',
			]),

			bash: new Set([
				'if',
				'then',
				'else',
				'elif',
				'fi',
				'for',
				'while',
				'do',
				'done',
				'case',
				'esac',
				'function',
				'in',
				'select',
				'until',
				'break',
				'continue',
				'return',
				'export',
				'readonly',
				'local',
				'declare',
			]),

			markdown: new Set(['#', '##', '###', '####', '#####', '######']),
		};

		if (!lang || lang === 'txt' || lang === 'text' || lang === 'plaintext') {
			return {
				codeBlock: [
					{
						codeContent: code,
						highlightType: 0,
					},
				],
				unified_codeBlock: [
					{
						content: code,
						type: 'DEFAULT',
					},
				],
			};
		}

		const TYPE_MAP = {
			0: 'DEFAULT',
			1: 'KEYWORD',
			2: 'METHOD',
			3: 'STR',
			4: 'NUMBER',
			5: 'COMMENT',
		};

		const keywords = keywordsMap[lang.toLowerCase()] || new Set();
		const tokens = [];

		let i = 0;

		const push = (content, type) => {
			if (!content) return;

			const last = tokens[tokens.length - 1];

			if (last && last.highlightType === type) {
				last.codeContent += content;
			} else {
				tokens.push({
					codeContent: content,
					highlightType: type,
				});
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

				while (i < code.length && /\s/.test(code[i])) {
					i++;
				}

				push(code.slice(s, i), 0);
				continue;
			}

			if ((c === '/' && code[i + 1] === '/') || (c === '#' && ['python', 'bash'].includes(lang))) {
				let s = i;

				while (i < code.length && code[i] !== '\n') {
					i++;
				}

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

				while (i < code.length && /[0-9._]/.test(code[i])) {
					i++;
				}

				push(code.slice(s, i), 4);
				continue;
			}

			if (/[a-zA-Z_$]/.test(c)) {
				let s = i;

				while (i < code.length && isIdentifier(code[i])) {
					i++;
				}

				const word = code.slice(s, i);

				let type = 0;

				if (keywords.has(word)) {
					type = 1;
				} else if (lang === 'css') {
					let j = i;

					while (j < code.length && /\s/.test(code[j])) {
						j++;
					}

					if (code[j] === ':') {
						type = 1;
					}
				} else if (lang === 'html') {
					let p = s - 1;

					while (p >= 0 && /\s/.test(code[p])) {
						p--;
					}

					if (code[p] === '<' || (code[p] === '/' && code[p - 1] === '<')) {
						type = 1;
					}
				}

				if (type === 0) {
					let j = i;

					while (j < code.length && /\s/.test(code[j])) {
						j++;
					}

					if (code[j] === '(') {
						type = 2;
					}
				}

				push(word, type);
				continue;
			}

			push(c, 0);
			i++;
		}

		return {
			codeBlock: tokens,
			unified_codeBlock: tokens.map((t) => ({
				content: t.codeContent,
				type: TYPE_MAP[t.highlightType],
			})),
		};
	}

	static toTableMetadata(arr, { hyperlink = true, citation = true, latex = true } = {}) {
		if (!Array.isArray(arr) || !arr.every((row) => Array.isArray(row) && row.every((cell) => typeof cell === 'string'))) {
			throw new TypeError('Table must be a nested array of strings');
		}

		const [header, ...rows] = arr;

		const maxLen = Math.max(header.length, ...rows.map((r) => r.length));

		const normalize = (r) => [...r, ...Array(maxLen - r.length).fill('')];

		const unified_rows = [
			{
				is_header: true,
				cells: normalize(header),
			},
			...rows.map((r) => ({
				is_header: false,
				cells: normalize(r),
			})),
		].map((row) => {
			const markdown_cells = row.cells.map((cell) => {
				const extracted = extractIE(cell, { hyperlink, citation, latex });

				return {
					text: extracted.text,
					...(extracted.inline_entities.length ? { inline_entities: extracted.inline_entities } : {}),
				};
			});

			return {
				...row,
				...(markdown_cells.some((c) => c.inline_entities?.length) ? { markdown_cells } : {}),
			};
		});

		const rowsMeta = unified_rows.map((r) => ({
			items: r.cells,
			...(r.is_header ? { isHeading: true } : {}),
		}));

		return {
			title: '',
			rows: rowsMeta,
			unified_rows,
		};
	}

	static generateVerificationMetadata() {
		const signatureMaterial = Buffer.from(
			`\u004E\u0049\u0058\u0045\u004C\u002E\u004D\u0065\u0073\u0073\u0061\u0067\u0065\u0042\u0075\u0069\u006C\u0064\u0065\u0072\u0056${VERSION}\u002D\u0056\u0065\u0072\u0069\u0066\u0069\u0063\u0061\u0074\u0069\u006F\u006E\u0053\u0069\u0067\u006E\u0061\u0074\u0075\u0072\u0065\u002E\u004D\u0065\u0074\u0061\u0064\u0061\u0074\u0061`
		);

		const certificateMaterial = Buffer.from(
			`\u004E\u0049\u0058\u0045\u004C\u002E\u004D\u0065\u0073\u0073\u0061\u0067\u0065\u0042\u0075\u0069\u006C\u0064\u0065\u0072\u0056${VERSION}\u002D\u0043\u0065\u0072\u0074\u0069\u0066\u0069\u0063\u0061\u0074\u0065\u0043\u0068\u0061\u0069\u006E\u002E\u004D\u0065\u0074\u0061\u0064\u0061\u0074\u0061`
		);

		const signature = Buffer.concat([signatureMaterial, crypto.randomBytes(64 - signatureMaterial.length)]).toString('base64');

		const certificateChain = [
			Buffer.concat([certificateMaterial, crypto.randomBytes(684 - certificateMaterial.length)]).toString('base64'),

			Buffer.concat([certificateMaterial, crypto.randomBytes(892 - certificateMaterial.length)]).toString('base64'),
		];

		return {
			proofs: [
				{
					version: 1,
					useCase: 1,
					signature,
					certificateChain,
				},
			],
		};
	}

	static newLayout(name, data, extra = {}) {
		return {
			...extra,
			view_model: {
				[Array.isArray(data) ? 'primitives' : 'primitive']: data,
				__typename: `GenAI${name}LayoutViewModel`,
			},
		};
	}

	_makeNode(id, section, submessage) {
		return { id: id ?? null, section: section ?? null, submessage: submessage ?? null };
	}

	_registerId(node, id) {
		if (id === undefined || id === null || id === '') return;

		if (typeof id !== 'string') {
			throw new ContentValidationError('Item id must be a string', { id });
		}

		if (this._idIndex.has(id)) {
			throw new DuplicateIdError(id);
		}

		node.id = id;
		this._idIndex.set(id, node);
	}

	_unregisterId(node) {
		if (node.id && this._idIndex.get(node.id) === node) {
			this._idIndex.delete(node.id);
		}
	}

	hasId(id) {
		return typeof id === 'string' && this._idIndex.has(id);
	}

	getIds() {
		return [...this._idIndex.keys()];
	}

	peek(id) {
		const node = this._idIndex.get(id);

		if (!node) return null;

		return {
			id: node.id,
			section: node.section,
			submessage: node.submessage,
		};
	}

	assignId(index, id) {
		if (!Number.isInteger(index) || index < 0 || index >= this._nodes.length) {
			throw new InvalidTargetError(`Node index ${index} is out of range (0-${this._nodes.length - 1})`, { index });
		}

		const node = this._nodes[index];

		if (node.id) {
			throw new AIRichError(`Node at index ${index} already has id "${node.id}"`, 'ALREADY_HAS_ID', { index, id: node.id });
		}

		this._registerId(node, id);

		return this;
	}

	_getNode(id) {
		if (typeof id !== 'string' || !id) {
			throw new ContentValidationError('Item id must be a non-empty string', { id });
		}

		const node = this._idIndex.get(id);

		if (!node) {
			throw new ItemNotFoundError(id, this.getIds());
		}

		return node;
	}

	_resolveTarget(target) {
		if (Array.isArray(target)) {
			if (target.length < 1 || target.length > 2) {
				throw new ContentValidationError('Target must be id or [id, offset]', { target });
			}

			const [id, offset = 0] = target;

			if (typeof id !== 'string' || !id) {
				throw new ContentValidationError('Target id must be a non-empty string', { target });
			}

			if (!Number.isInteger(offset)) {
				throw new ContentValidationError('Offset must be an integer', { target });
			}

			return { id, offset };
		}

		if (typeof target !== 'string' || !target) {
			throw new ContentValidationError('Target must be a non-empty id or [id, offset]', { target });
		}

		return { id: target, offset: 0 };
	}

	_resolveNodeIndex(target) {
		const { id, offset } = this._resolveTarget(target);
		const node = this._getNode(id);
		const baseIndex = this._nodes.indexOf(node);

		if (baseIndex === -1) {
			throw new InvalidTargetError(`Item id "${id}" is registered but not present in the node list (internal desync)`, { id });
		}

		const index = baseIndex + offset;

		if (index < 0 || index >= this._nodes.length) {
			throw new InvalidTargetError(`Target "${id}" with offset ${offset} resolves to index ${index}, which is out of range (0-${this._nodes.length - 1})`, { id, offset, index });
		}

		return { id, offset, baseIndex, index };
	}

	_validateSections(section) {
		const items = Array.isArray(section) ? section : [section];

		if (!items.length) {
			throw new ContentValidationError('At least one section is required');
		}

		for (const item of items) {
			if (!item || typeof item !== 'object' || Array.isArray(item)) {
				throw new ContentValidationError('Sections must be plain objects');
			}
		}

		return items;
	}

	_validateSubmessages(submessage) {
		if (submessage === undefined || submessage === null) {
			return [];
		}

		const items = Array.isArray(submessage) ? submessage : [submessage];

		for (const item of items) {
			if (!item || typeof item !== 'object' || Array.isArray(item)) {
				throw new ContentValidationError('Submessages must be plain objects');
			}
		}

		return items;
	}

	_pairSubmessages(sections, submessages) {
		const n = sections.length;
		const m = submessages.length;

		if (m === 0) return sections.map(() => null);
		if (m === 1) return sections.map((_, i) => (i === 0 ? submessages[0] : null));
		if (m === n) return submessages;

		throw new ContentValidationError(`Cannot pair ${m} submessage(s) with ${n} section(s): expected 0, 1, or ${n}`, { sectionCount: n, submessageCount: m });
	}

	_addContent(section, submessage, { id, replace, insertAt } = {}) {
		const hasReplace = replace !== undefined && replace !== null && replace !== '';

		const hasInsertAt = insertAt !== undefined && insertAt !== null && insertAt !== '';

		if (hasReplace && hasInsertAt) {
			throw new ContentValidationError('replace and insertAt cannot be used together');
		}

		const sections = this._validateSections(section);
		const submessages = this._validateSubmessages(submessage);

		if (!sections.length) {
			throw new ContentValidationError('At least one section is required');
		}

		if (id !== undefined && id !== null && id !== '' && sections.length !== 1) {
			throw new ContentValidationError('One id can only be assigned to one node', {
				id,
				sectionCount: sections.length,
			});
		}

		if (submessages.length && submessages.length !== sections.length && submessages.length !== 1) {
			throw new ContentValidationError('Section and submessage count must match');
		}

		const pairedSubmessages = sections.map((_, index) => {
			if (!submessages.length) return undefined;

			return submessages.length === 1 ? submessages[0] : submessages[index];
		});

		if (id && this._idIndex.has(id) && !(hasReplace && this._resolveTarget(replace)?.id === id)) {
			throw new DuplicateIdError(id);
		}

		const newNodes = sections.map((currentSection, index) => {
			return this._makeNode(index === 0 ? id : null, currentSection, pairedSubmessages[index]);
		});

		if (hasReplace) {
			if (newNodes.length !== 1) {
				throw new ContentValidationError('replace only supports adding exactly one node');
			}

			const target = this._resolveNodeIndex(replace);

			if (!target) {
				throw new ContentValidationError('Target node could not be resolved');
			}

			const oldNode = this._nodes[target.index];
			const newNode = newNodes[0];

			if (!newNode.id && oldNode?.id) {
				newNode.id = oldNode.id;
			}

			this._unregisterId(oldNode);

			this._nodes.splice(target.index, 1, newNode);

			if (newNode.id) {
				this._idIndex.set(newNode.id, newNode);
			}

			return this;
		}

		if (hasInsertAt) {
			const target = this._resolveNodeIndex(insertAt);

			if (!target) {
				throw new ContentValidationError('Target node could not be resolved');
			}

			const insertIndex = target.offset < 0 ? target.index : target.index + 1;

			this._nodes.splice(insertIndex, 0, ...newNodes);

			for (const node of newNodes) {
				if (node.id) {
					this._idIndex.set(node.id, node);
				}
			}

			return this;
		}

		this._nodes.push(...newNodes);

		for (const node of newNodes) {
			if (node.id) {
				this._idIndex.set(node.id, node);
			}
		}

		return this;
	}

	addSection(section, options = {}) {
		return this._addContent(section, undefined, options);
	}

	addSubmessage(submessage, options = {}) {
		const items = this._validateSubmessages(submessage);

		if (!items.length) {
			throw new ContentValidationError('At least one submessage is required');
		}

		return this._addContent(undefined, items, options);
	}

	delete(target) {
		const { index } = this._resolveNodeIndex(target);
		const [oldNode] = this._nodes.splice(index, 1);

		this._unregisterId(oldNode);

		return this;
	}

	get _sections() {
		return this._nodes.filter((n) => n.section !== null).map((n) => n.section);
	}

	get _submessages() {
		return this._nodes.filter((n) => n.submessage !== null).map((n) => n.submessage);
	}

	get sections() {
		return this._sections;
	}

	get items() {
		return this._sections.flatMap((section) => {
			const vm = section?.view_model;

			if (Array.isArray(vm?.primitives)) {
				return vm.primitives;
			}

			if (vm?.primitive) {
				return [vm.primitive];
			}

			return [];
		});
	}
}


/** Compatibility alias. */
class ORich extends AIRich {}

export { AIRich, ORich };
