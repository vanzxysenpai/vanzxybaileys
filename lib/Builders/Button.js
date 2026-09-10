import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, getBizBinaryNode, crypto } from './shared.js';
class Button extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket (must expose `relayMessage`). */
	constructor(client) {
		super();
		if (!client) {
			throw new Error('Socket is required');
		}
		this.#client = client;

		this._buttons = [];
		this._data;
		this._currentSelectionIndex = -1;
		this._currentSectionIndex = -1;
		this._params = {};
	}

	/** Attach a video as the interactive header. @param {string|Buffer} path Url or buffer. */
	setVideo(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		Buffer.isBuffer(path) ? (this._data = { video: path, ...options }) : (this._data = { video: { url: path }, ...options });
		return this;
	}

	/** Attach an image as the interactive header. @param {string|Buffer} path Url or buffer. */
	setImage(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		Buffer.isBuffer(path) ? (this._data = { image: path, ...options }) : (this._data = { image: { url: path }, ...options });
		return this;
	}

	/** Attach a document as the interactive header. @param {string|Buffer} path Url or buffer. */
	setDocument(path, options = {}) {
		if (!path) throw new Error('Url or buffer needed');
		Buffer.isBuffer(path) ? (this._data = { document: path, ...options }) : (this._data = { document: { url: path }, ...options });
		return this;
	}

	/** Set a raw pre-built header media object (bypasses setVideo/setImage/setDocument shorthands). */
	setMedia(obj) {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			throw new TypeError('Media must be a plain object');
		}

		this._data = obj;
		return this;
	}

	/** Remove every button added so far (keeps title/body/footer/media). */
	clearButtons() {
		this._buttons = [];
		return this;
	}

	/** Overwrite the message-level `nativeFlowMessage.messageParamsJson` payload wholesale. */
	setParams(obj) {
		this._params = obj;
		return this;
	}

	// Vanz@Add 26-08-26 --- setBloksWidget(): Meta's Bloks/A2UI format, a sibling field to
	// nativeFlowMessage on interactiveMessage (NOT part of the AIRich rich-response system —
	// this is a real native interactive UI: checkboxes/text fields/buttons actually work).
	// Captured traffic gives the A2UI payload as a flat `components` array where every node has
	// an `id` and children/child reference OTHER nodes by id string. Authoring that by hand is
	// error-prone (dangling ids, ordering), so this accepts a plain nested tree instead —
	// { component, ...props, children: [...] } / { component, ...props, child: {...} } — and
	// flattens it into that array itself, auto-assigning ids.
	//
	// Vanz@Fix 26-08-26 (v2) --- Modal is a different shape: `trigger`/`content` point to a
	// SIBLING node by id (e.g. the Button that opens it), not a fresh child — captured traffic
	// confirmed `{ trigger: "<id of an existing Button node>", content: "<id of its body>" }`.
	// Nesting it as a plain `child`/`children` would duplicate the trigger node. So:
	//   - any prop whose value is `{ component: ..., ... }` is now auto-flattened as a nested
	//     node too (not just `child`/`children`) — covers Modal.content directly.
	//   - a node can carry a builder-only `ref: 'name'` tag; another prop can then point back
	//     at it with `{ $ref: 'name' }`, resolved to that node's real id after the whole tree
	//     is walked (order-independent). `ref` itself is stripped and never reaches the wire.
	//
	// Vanz@Add 01-09-26 --- JSDoc typedefs for the "basic" A2UI catalog below (component set +
	// props confirmed from captured traffic — see /areas/vanzxy-baileys.md). This is NOT the
	// official A2UI spec (there isn't a public one we have access to), just what's been observed
	// on the wire, so BloksNode ends with a permissive `AnyBloksNode` fallback: known components
	// get full editor autocomplete + prop hints, anything else still type-checks and still works
	// at runtime (setBloksWidget()'s own validation only ever requires a "component" string).
	/**
	 * @typedef {{ $ref: string }} BloksRef
	 * Points back at a sibling node tagged `ref: 'name'` elsewhere in the same tree (currently
	 * only needed for `Modal.trigger`/`Modal.content` — everything else nests directly).
	 */
	/**
	 * @typedef {Object} BloksNodeBase
	 * @property {string} [ref] Builder-only tag so another node can reference this one via `{ $ref: ref }`. Stripped before send.
	 */
	/**
	 * @typedef {BloksNodeBase & { component: 'Column'|'Row', weight?: number, justify?: string, children?: BloksNode[] }} ColumnRowNode
	 * @typedef {BloksNodeBase & { component: 'Text', text: string, variant?: string }} TextNode
	 * @typedef {BloksNodeBase & { component: 'Icon', name: string }} IconNode
	 * @typedef {BloksNodeBase & { component: 'Divider' }} DividerNode
	 * @typedef {BloksNodeBase & { component: 'Image', url: string, variant?: string, fit?: string }} ImageNode
	 * @typedef {BloksNodeBase & { component: 'Video', url: string }} VideoNode
	 * @typedef {BloksNodeBase & { component: 'List', children?: BloksNode[] }} ListNode
	 * @typedef {BloksNodeBase & { component: 'TextField', label?: string, value?: string, variant?: string }} TextFieldNode
	 * @typedef {BloksNodeBase & { component: 'DateTimeInput', label?: string, value?: string, enableDate?: boolean, enableTime?: boolean }} DateTimeInputNode
	 * @typedef {BloksNodeBase & { component: 'Slider', label?: string, min?: number, max?: number, value?: number }} SliderNode
	 * @typedef {BloksNodeBase & { component: 'CheckBox', label?: string, value?: boolean }} CheckBoxNode
	 * @typedef {BloksNodeBase & { component: 'ChoicePicker', label?: string, variant?: string, displayStyle?: string, options?: Array<{label: string, value: string}>, value?: string }} ChoicePickerNode
	 * @typedef {BloksNodeBase & { component: 'Button', child?: BloksNode, variant?: string, action?: { call: string, args?: Record<string, any> } }} BloksButtonNode
	 *   Note: unlike the CTA/native-flow `Button` class elsewhere in this file, an A2UI Button node
	 *   has no `label`/`type`+`name` — its label comes from a nested `child` (usually a `Text` node),
	 *   and tapping it fires `action.call` (with `action.args`), not a native-flow button name.
	 * @typedef {BloksNodeBase & { component: 'Modal', trigger: string|BloksRef, content: BloksNode|string|BloksRef }} ModalNode
	 * @typedef {BloksNodeBase & { component: 'Tabs', tabs: Array<{title: string, child: BloksNode}> }} TabsNode
	 * @typedef {BloksNodeBase & { component: 'Card', child?: BloksNode }} CardNode
	 * @typedef {BloksNodeBase & { component: 'AudioPlayer', url: string, description?: string }} AudioPlayerNode
	 * @typedef {BloksNodeBase & { component: string, [key: string]: any }} AnyBloksNode Fallback for components not yet confirmed on the wire — still works, just no prop-level autocomplete.
	 * @typedef {ColumnRowNode|TextNode|IconNode|DividerNode|ImageNode|VideoNode|ListNode|TextFieldNode|DateTimeInputNode|SliderNode|CheckBoxNode|ChoicePickerNode|BloksButtonNode|ModalNode|TabsNode|CardNode|AudioPlayerNode|AnyBloksNode} BloksNode
	 */
	#flattenBloks(tree, out, ctx = { n: 0, refs: new Map(), pending: [] }, id = 'root') {
		if (!tree || typeof tree !== 'object') throw new TypeError('setBloksWidget: every node needs a "component" type');
		const { component, children, child, ref, ...rest } = tree;
		if (typeof component !== 'string' || !component) throw new TypeError('setBloksWidget: every node needs a "component" type');

		const isTreeNode = (v) => v && typeof v === 'object' && !Array.isArray(v) && typeof v.component === 'string';
		const isRefMarker = (v) => v && typeof v === 'object' && !Array.isArray(v) && typeof v.$ref === 'string' && Object.keys(v).length === 1;

		const node = { id, component };
		for (const [k, v] of Object.entries(rest)) {
			if (isRefMarker(v)) {
				node[k] = null; // resolved once the full tree (and its `ref` tags) has been walked
				ctx.pending.push({ node, key: k, refName: v.$ref });
			} else if (isTreeNode(v)) {
				node[k] = this.#flattenBloks(v, out, ctx, `n${ctx.n++}`);
			} else {
				node[k] = v;
			}
		}

		if (Array.isArray(children)) {
			node.children = children.map((c) => this.#flattenBloks(c, out, ctx, `n${ctx.n++}`));
		} else if (child) {
			node.child = this.#flattenBloks(child, out, ctx, `n${ctx.n++}`);
		}

		if (ref) ctx.refs.set(ref, id);

		out.push(node);
		return id;
	}

	/**
	 * Set a Bloks/A2UI native widget (`bloksWidget`, `type: "im_a2ui"`) — a real interactive
	 * screen (images, video, checkboxes, text fields, buttons that fire an `action`), not a
	 * static card. Pass a nested tree; ids are assigned automatically.
	 *
	 * For components that reference a SIBLING node instead of nesting one — currently just
	 * `Modal.trigger` — tag the source node with `ref: 'someName'` and point at it with
	 * `{ $ref: 'someName' }`. Everything else (including `Modal.content`) can just be nested
	 * directly, no special key needed.
	 * @param {BloksNode} tree Root node, e.g. `{ component: 'Column', children: [...] }`.
	 * @param {{uuid?: string, catalogId?: string, surfaceId?: string, version?: string}} [options]
	 */
	setBloksWidget(tree, { uuid = crypto.randomUUID(), catalogId = 'https://a2ui.org/specification/v0_9/catalogs/basic/catalog.json', surfaceId, version = 'v0.9' } = {}) {
		const components = [];
		const ctx = { n: 0, refs: new Map(), pending: [] };
		this.#flattenBloks(tree, components, ctx);
		for (const { node, key, refName } of ctx.pending) {
			const resolved = ctx.refs.get(refName);
			if (!resolved) throw new Error(`setBloksWidget: ref "${refName}" (used on "${key}") was never declared with ref: "${refName}" on any node`);
			node[key] = resolved;
		}

		this._bloksWidget = {
			uuid,
			data: JSON.stringify({
				version,
				createSurface: {
					surfaceId: surfaceId ?? `starcore-widget=${uuid}`,
					catalogId,
					components,
				},
			}),
			type: 'im_a2ui',
		};

		return this;
	}

	/**
	 * Low-level escape hatch: push a raw native-flow button by name. Prefer the
	 * dedicated `add*()` helpers below when one exists — they validate the
	 * required keys for that button type.
	 * @param {string} name Native-flow button name, e.g. 'quick_reply', 'cta_url'.
	 * @param {string|Record<string, any>} params Either a pre-stringified JSON payload or a plain object.
	 */
	addButton(name, params) {
		if (typeof name !== 'string' || !name.trim()) {
			throw new TypeError('addButton(name, params) requires a non-empty string name');
		}

		this._buttons.push({
			name,
			buttonParamsJson: typeof params === 'string' ? params : JSON.stringify(params),
		});

		return this;
	}

	/** Append a row to the section currently open on the last `addSelection()` (call `makeSection()` first). */
	makeRow(header = '', title = '', description = '', id = '') {
		if (this._currentSelectionIndex === -1 || this._currentSectionIndex === -1) {
			throw new Error('You need to create a selection and a section first');
		}
		if (!title || !id) {
			throw new TypeError('makeRow() requires both a title and an id');
		}
		const buttonParams = JSON.parse(this._buttons[this._currentSelectionIndex].buttonParamsJson);
		buttonParams.sections[this._currentSectionIndex].rows.push({ header, title, description, id });
		this._buttons[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
		return this;
	}

	/** Open a new section on the `single_select` button added by the last `addSelection()` call. */
	makeSection(title = '', highlight_label = '') {
		if (this._currentSelectionIndex === -1) {
			throw new Error('You need to create a selection first');
		}
		const buttonParams = JSON.parse(this._buttons[this._currentSelectionIndex].buttonParamsJson);
		buttonParams.sections.push({ title, highlight_label, rows: [] });
		this._currentSectionIndex = buttonParams.sections.length - 1;
		this._buttons[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
		return this;
	}

	/** Start a `single_select` (in-button picker list) button. Follow with `makeSection()` + `makeRow()`. */
	addSelection(title, options = {}) {
		if (!title) throw new TypeError('addSelection(title) requires a non-empty title');
		this._buttons.push({ ...options, name: 'single_select', buttonParamsJson: JSON.stringify({ title, sections: [] }) });
		this._currentSelectionIndex = this._buttons.length - 1;
		this._currentSectionIndex = -1;
		return this;
	}

	/**
	 * Add a `quick_reply` button — sends `id` back as the interactive-response id when tapped.
	 * @param {string} display_text Button label.
	 * @param {string} id Unique id returned on tap; required, WA silently drops replies without one.
	 */
	addReply(display_text = '', id = '', options = {}) {
		if (!display_text || !id) {
			throw new TypeError('addReply(display_text, id) requires both a label and a unique id');
		}
		this._buttons.push({
			name: 'quick_reply',
			buttonParamsJson: JSON.stringify({
				display_text,
				id,
				...options,
			}),
		});
		return this;
	}

	/**
	 * Add a `cta_call` (tap-to-dial) button.
	 * @param {string} display_text Button label.
	 * @param {string} phone_number Phone number to dial, e.g. '+15551234567'.
	 */
	// Vanz@Fix 22-08-26 (v4.7) --- second arg used to be written into buttonParamsJson.id, but
	// the cta_call schema keys on `phone_number` (confirmed against @chatunity/baileys,
	// @neoxr/wb, and a WhiskeySockets/Baileys#2626 working example) — `id` is simply ignored
	// by WhatsApp for this button, so every button built with the old addCall() silently
	// rendered with no dial action. Kept the same 2nd-positional-arg call shape so existing
	// call sites keep working; only the wire key changed.
	addCall(display_text = '', phone_number = '', options = {}) {
		if (!display_text || !phone_number) {
			throw new TypeError('addCall(display_text, phone_number) requires both a label and a phone number');
		}
		this._buttons.push({
			name: 'cta_call',
			buttonParamsJson: JSON.stringify({
				display_text,
				phone_number,
				...options,
			}),
		});
		return this;
	}

	/** Add a `cta_reminder` button (schedules an in-chat reminder chip). */
	addReminder(display_text = '', id = '', options = {}) {
		if (!display_text || !id) {
			throw new TypeError('addReminder(display_text, id) requires both a label and a unique id');
		}
		this._buttons.push({
			name: 'cta_reminder',
			buttonParamsJson: JSON.stringify({
				display_text,
				id,
				...options,
			}),
		});
		return this;
	}

	/** Add a `cta_cancel_reminder` button, pairs with `addReminder()`. */
	addCancelReminder(display_text = '', id = '', options = {}) {
		if (!display_text || !id) {
			throw new TypeError('addCancelReminder(display_text, id) requires both a label and a unique id');
		}
		this._buttons.push({
			name: 'cta_cancel_reminder',
			buttonParamsJson: JSON.stringify({
				display_text,
				id,
				...options,
			}),
		});
		return this;
	}

	/** Add an `address_message` button (prompts the user's saved-address picker). */
	addAddress(display_text = '', id = '', options = {}) {
		if (!display_text || !id) {
			throw new TypeError('addAddress(display_text, id) requires both a label and a unique id');
		}
		this._buttons.push({
			name: 'address_message',
			buttonParamsJson: JSON.stringify({
				display_text,
				id,
				...options,
			}),
		});
		return this;
	}

	/** Add a `send_location` button (requests the user's live location). */
	addLocation(options = {}) {
		this._buttons.push({
			name: 'send_location',
			buttonParamsJson: JSON.stringify(options),
		});
		return this;
	}

	/**
	 * Add a `cta_url` button.
	 * @param {string} display_text Button label.
	 * @param {string} url Url opened on tap.
	 * @param {boolean} webview_interaction Open inside WhatsApp's in-app webview instead of the system browser.
	 */
	// Vanz@Add 22-08-26 (v4.7) --- `merchant_url` is present (and equal to `url`) on every
	// cta_url button seen in captured client traffic, alongside `url`. Defaulted here rather
	// than left for the caller to remember; still overridable via options if it should differ.
	addUrl(display_text = '', url = '', webview_interaction = false, options = {}) {
		if (!display_text || !url) {
			throw new TypeError('addUrl(display_text, url) requires both a label and a url');
		}
		this._buttons.push({
			...options,
			name: 'cta_url',
			buttonParamsJson: JSON.stringify({
				display_text,
				url,
				merchant_url: url,
				webview_interaction,
				...options,
			}),
		});
		return this;
	}

	/** Add a `cta_copy` button (copies `copy_code` to the user's clipboard on tap). */
	addCopy(display_text = '', copy_code = '', options = {}) {
		if (!display_text || !copy_code) {
			throw new TypeError('addCopy(display_text, copy_code) requires both a label and the text to copy');
		}
		this._buttons.push({
			name: 'cta_copy',
			buttonParamsJson: JSON.stringify({
				display_text,
				copy_code,
				...options,
			}),
		});
		return this;
	}

	/**
	 * Add an `open_webview` button — opens a titled in-app webview (distinct from
	 * `cta_url`'s `webview_interaction` flag: this is its own native-flow name).
	 * @param {string} title Webview title shown in the header bar.
	 * @param {string} url Url loaded inside the webview.
	 */
	addOpenWebview(title = '', url = '', options = {}) {
		if (!title || !url) {
			throw new TypeError('addOpenWebview(title, url) requires both a title and a url');
		}
		this._buttons.push({
			name: 'open_webview',
			buttonParamsJson: JSON.stringify({
				title,
				link: { url },
				...options,
			}),
		});
		return this;
	}

	/**
	 * Add a `cta_catalog` button (opens the sender's WhatsApp Business catalog).
	 * Vanz@Add 22-08-26 (v4.7) --- WA only shows the catalog action for accounts
	 * that actually have a catalog attached; on regular accounts the button may
	 * render inert. See Button.#SPECIAL_FLOW for the native-flow node this name requires.
	 */
	addCatalog(display_text = '', options = {}) {
		this._buttons.push({
			name: 'cta_catalog',
			buttonParamsJson: JSON.stringify({
				...(display_text ? { display_text } : {}),
				...options,
			}),
		});
		return this;
	}

	/**
	 * Add an `automated_greeting_message_view_catalog` button — the "View catalog"
	 * action WhatsApp Business shows on the automated greeting message.
	 * Vanz@Add 22-08-26 (v4.7). Business-account only; see Button.#SPECIAL_FLOW.
	 */
	addViewCatalog(options = {}) {
		this._buttons.push({
			name: 'automated_greeting_message_view_catalog',
			buttonParamsJson: JSON.stringify(options),
		});
		return this;
	}

	/**
	 * Add a `call_permission_request` button — asks the user to grant call
	 * permission before a voice/video call can be placed.
	 * Vanz@Add 22-08-26 (v4.7). See Button.#SPECIAL_FLOW.
	 */
	addCallPermission(display_text = '', options = {}) {
		this._buttons.push({
			name: 'call_permission_request',
			buttonParamsJson: JSON.stringify({
				...(display_text ? { display_text } : {}),
				...options,
			}),
		});
		return this;
	}

	/**
	 * Add a `payment_info` button carrying a structured payment-settings payload
	 * (e.g. a PIX static-code block). Payload shape is dictated by WhatsApp's
	 * payment flows and is passed through as given — validate it yourself.
	 * Vanz@Add 22-08-26 (v4.7). Business/payment-enabled accounts only.
	 * @param {Record<string, any>} payload e.g. `{ payment_settings: [{ type: 'pix_static_code', pix_static_code: {...} }] }`.
	 */
	addPaymentInfo(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
			throw new TypeError('addPaymentInfo(payload) requires a plain object');
		}
		this._buttons.push({
			name: 'payment_info',
			buttonParamsJson: JSON.stringify(payload),
		});
		return this;
	}

	/**
	 * Add a `review_and_pay` button (order/payment summary flow).
	 * Vanz@Add 22-08-26 (v4.7). Server-validated by WhatsApp; malformed or
	 * unauthorized payloads are typically ignored rather than erroring locally.
	 * @param {Record<string, any>} payload Order/payment summary payload.
	 */
	addReviewAndPay(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
			throw new TypeError('addReviewAndPay(payload) requires a plain object');
		}
		this._buttons.push({
			name: 'review_and_pay',
			buttonParamsJson: JSON.stringify(payload),
		});
		return this;
	}

	/**
	 * Add a `wa_payment_transaction_details` button referencing a prior transaction.
	 * Vanz@Add 22-08-26 (v4.7). See Button.#SPECIAL_FLOW.
	 */
	addTransactionDetails(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
			throw new TypeError('addTransactionDetails(payload) requires a plain object');
		}
		this._buttons.push({
			name: 'wa_payment_transaction_details',
			buttonParamsJson: JSON.stringify(payload),
		});
		return this;
	}

	/**
	 * Add an `mpm` (multi-product message) button referencing a set of catalog items.
	 * Vanz@Add 22-08-26 (v4.7). Business-catalog accounts only; see Button.#SPECIAL_FLOW.
	 */
	addMultiProduct(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
			throw new TypeError('addMultiProduct(payload) requires a plain object');
		}
		this._buttons.push({
			name: 'mpm',
			buttonParamsJson: JSON.stringify(payload),
		});
		return this;
	}


	/** Native-flow `payment_key_info` shortcut. Payload is passed through unchanged. */
	addPaymentKeyInfo(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new TypeError('addPaymentKeyInfo(payload) requires a plain object');
		this._buttons.push({ name: 'payment_key_info', buttonParamsJson: JSON.stringify(payload) });
		return this;
	}

	/** Native-flow `booking_confirmation` shortcut. Payload is passed through unchanged. */
	addBookingConfirmation(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new TypeError('addBookingConfirmation(payload) requires a plain object');
		this._buttons.push({ name: 'booking_confirmation', buttonParamsJson: JSON.stringify(payload) });
		return this;
	}

	/** Native-flow `card_message` shortcut, matching this fork's prepareNativeFlowButtons(). */
	addCardMessage(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new TypeError('addCardMessage(payload) requires a plain object');
		this._buttons.push({ name: 'card_message', buttonParamsJson: JSON.stringify(payload) });
		return this;
	}

	/** Native-flow `order_details` shortcut. */
	addOrderDetails(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new TypeError('addOrderDetails(payload) requires a plain object');
		this._buttons.push({ name: 'order_details', buttonParamsJson: JSON.stringify(payload) });
		return this;
	}

	/** Native-flow `order_status` shortcut. */
	addOrderStatus(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new TypeError('addOrderStatus(payload) requires a plain object');
		this._buttons.push({ name: 'order_status', buttonParamsJson: JSON.stringify(payload) });
		return this;
	}

	/** Native-flow `payment_status` shortcut. */
	addPaymentStatus(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new TypeError('addPaymentStatus(payload) requires a plain object');
		this._buttons.push({ name: 'payment_status', buttonParamsJson: JSON.stringify(payload) });
		return this;
	}

	/** Native-flow `payment_method` shortcut. */
	addPaymentMethod(payload = {}) {
		if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new TypeError('addPaymentMethod(payload) requires a plain object');
		this._buttons.push({ name: 'payment_method', buttonParamsJson: JSON.stringify(payload) });
		return this;
	}

	/** Native-flow `track_order` shortcut. */
	addTrackOrder(id, display_text = '🚚 Track order') {
		if (!id) throw new TypeError('addTrackOrder(id) requires a non-empty id');
		this._buttons.push({ name: 'track_order', buttonParamsJson: JSON.stringify({ id, display_text }) });
		return this;
	}

	/** Native-flow `reorder` shortcut. */
	addReorder(id, display_text = '🔁 Reorder') {
		if (!id) throw new TypeError('addReorder(id) requires a non-empty id');
		this._buttons.push({ name: 'reorder', buttonParamsJson: JSON.stringify({ id, display_text }) });
		return this;
	}

	/** Native-flow `cancel_order` shortcut. */
	addCancelOrder(id, display_text = '❌ Cancel order') {
		if (!id) throw new TypeError('addCancelOrder(id) requires a non-empty id');
		this._buttons.push({ name: 'cancel_order', buttonParamsJson: JSON.stringify({ id, display_text }) });
		return this;
	}

	/** Native-flow `clear_chat` shortcut. */
	addClearChat() {
		this._buttons.push({ name: 'clear_chat', buttonParamsJson: '{}' });
		return this;
	}

	/** Native-flow `navigateToScreen` shortcut. */
	addNavigateToScreen(screen, data = {}) {
		if (!screen) throw new TypeError('addNavigateToScreen(screen) requires a non-empty screen');
		this._buttons.push({ name: 'navigateToScreen', buttonParamsJson: JSON.stringify({ screen_name: screen, data }) });
		return this;
	}

	/** WhatsApp Flows shortcut. Requires a real registered Flow. */
	addFlow(flow = {}, display_text = '') {
		if (typeof flow !== 'object' || flow === null || Array.isArray(flow) || !flow.id) throw new TypeError('addFlow(flow) requires a plain object with flow.id');
		this._buttons.push({
			// Vanz@Fix 27-08-26: the button name was 'flow_action', which is actually
			// the *field name* inside buttonParamsJson (flow_action: 'navigate' | 'data_exchange'),
			// not a native_flow name WhatsApp recognises. The real native_flow name for
			// launching a registered WhatsApp Flow is 'flow' -- client silently ignored
			// the button because <native_flow name='flow_action'> isn't a thing it renders.
			name: 'flow',
			buttonParamsJson: JSON.stringify({
				flow_message_version: flow.version || '3',
				// flow_token: unique per-send session token WhatsApp Flows requires to
				// correlate a flow_action data-exchange callback with this specific
				// message. Was missing entirely -- without it the client can accept the
				// message but has nothing to key the flow session on.
				flow_token: flow.token || generateMessageIDV2(),
				flow_id: flow.id,
				flow_cta: display_text || flow.cta || 'Continue',
				flow_action: flow.action || 'navigate',
				flow_action_payload: flow.actionPayload || { screen: flow.screen || 'WELCOME', data: flow.data || {} },
			}),
		});
		return this;
	}

	/** Native-flow `voice_call` shortcut. */
	addVoiceCall(id, display_text = '📞 Voice call') {
		if (!id) throw new TypeError('addVoiceCall(id) requires a non-empty id');
		this._buttons.push({ name: 'voice_call', buttonParamsJson: JSON.stringify({ display_text, id }) });
		return this;
	}

	/** Native-flow `video_call_button` shortcut. */
	addVideoCall(id, display_text = '🎥 Video call') {
		if (!id) throw new TypeError('addVideoCall(id) requires a non-empty id');
		this._buttons.push({ name: 'video_call_button', buttonParamsJson: JSON.stringify({ display_text, id }) });
		return this;
	}

	// Vanz@Fix (bug 43) --- paramsList documented the schema for these 3 message-level native flow
	// params (limited_time_offer / bottom_sheet / tap_target_configuration) but no helper ever wrote
	// them into this._params — only manual setParams() could, with zero validation against the
	// documented schema. Added dedicated setters + a lightweight type check reusing paramsList.
	static #validateAgainstSchema(schema, data, label) {
		for (const [key, type] of Object.entries(schema)) {
			if (data[key] === undefined) continue;
			const expectsArray = Array.isArray(type);
			if (expectsArray) {
				if (!Array.isArray(data[key]) || !data[key].every((v) => typeof v === type[0])) {
					throw new TypeError(`${label}.${key} must be an array of ${type[0]}`);
				}
			} else if (typeof data[key] !== type) {
				throw new TypeError(`${label}.${key} must be a ${type}`);
			}
		}
	}

	/** Set the message-level "limited time offer" strip (countdown banner above the buttons). */
	setLimitedTimeOffer({ text = '', url = '', copy_code = '', expiration_time } = {}) {
		const data = { text, url, copy_code, expiration_time };
		Button.#validateAgainstSchema(Button.paramsList.limited_time_offer, data, 'limited_time_offer');
		this._params = { ...this._params, limited_time_offer: data };
		return this;
	}

	/** Configure how many buttons show inline before the rest collapse into a bottom sheet. */
	setBottomSheet({ in_thread_buttons_limit, divider_indices = [], list_title = '', button_title = '' } = {}) {
		const data = { in_thread_buttons_limit, divider_indices, list_title, button_title };
		Button.#validateAgainstSchema(Button.paramsList.bottom_sheet, data, 'bottom_sheet');
		this._params = { ...this._params, bottom_sheet: data };
		return this;
	}

	/** Configure the tap-target callout shown pointing at a specific button by index. */
	setTapTargetConfiguration({ title = '', description = '', canonical_url = '', domain = '', buttonIndex = 0 } = {}) {
		const data = { title, description, canonical_url, domain, buttonIndex };
		Button.#validateAgainstSchema(Button.paramsList.tap_target_configuration, data, 'tap_target_configuration');
		this._params = { ...this._params, tap_target_configuration: data };
		return this;
	}

	static paramsList = {
		limited_time_offer: {
			text: 'string',
			url: 'string',
			copy_code: 'string',
			expiration_time: 'number',
		},
		bottom_sheet: {
			in_thread_buttons_limit: 'number',
			divider_indices: ['number'],
			list_title: 'string',
			button_title: 'string',
		},
		tap_target_configuration: {
			title: 'string',
			description: 'string',
			canonical_url: 'string',
			domain: 'string',
			buttonIndex: 'number',
		},
	};

	// Vanz@Add 22-08-26 (v4.7) --- native-flow names WA treats specially: the client
	// only recognises these when the *first* button's name matches AND the wrapping
	// <native_flow> biz-node carries the right v/name for that name. Everything not
	// listed here (quick_reply, cta_url, cta_call, cta_copy, single_select mixed with
	// others, etc.) uses the generic v=9 name=mixed node, which is what send() emitted
	// unconditionally before this change. Table cross-checked against the observed
	// wire behaviour documented by zqdevelopers/zq_baileys_helper and @chatunity/baileys.
	static #SPECIAL_FLOW = {
		review_and_pay: { v: '1', name: 'order_details' },
		payment_info: { v: '1', name: 'payment_info' },
		mpm: { v: '2', name: 'mpm' },
		cta_catalog: { v: '2', name: 'cta_catalog' },
		send_location: { v: '2', name: 'send_location' },
		call_permission_request: { v: '2', name: 'call_permission_request' },
		wa_payment_transaction_details: { v: '2', name: 'wa_payment_transaction_details' },
		payment_key_info: { v: '1', name: 'payment_key_info' },
		booking_confirmation: { v: '1', name: 'booking_confirmation' },
		automated_greeting_message_view_catalog: { v: '2', name: 'automated_greeting_message_view_catalog' },
	};

	/** Render this builder's header/body/footer/media/buttons/params into an `interactiveMessage`-shaped card (without the outer `interactiveMessage` wrapper or contextInfo). */
	async toCard() {
		return {
			body: {
				text: this._body,
			},
			footer: {
				text: this._footer,
			},
			header: {
				title: this._title,
				subtitle: this._subtitle,
				hasMediaAttachment: !!this._data,
				...(this._data
					? await prepareWAMessageMedia(this._data, { upload: this.#client.waUploadToServer }).catch((e) => {
							if (String(e).includes('Invalid media type')) return this._data;
							throw e;
						})
					: {}),
			},
			nativeFlowMessage: {
				messageParamsJson: JSON.stringify(this._params),
				buttons: this._buttons,
			},
		};
	}

	// Vanz@Fix (bug: single_select alone doesn't render) --- WhatsApp only renders a
	// `single_select` native_flow button when it's mixed with other native_flow buttons
	// (biz node <native_flow v='9' name='mixed'>). 'single_select' is NOT in the set of
	// button names WA treats as a standalone native_flow type (confirmed against
	// itsliaaa/baileys WABinary/generic-utils.js getBizBinaryNode() — it special-cases
	// message.listMessage separately, with its own biz node <list v='2' type='product_list'>,
	// and never routes 'single_select' through the single-type native_flow path).
	// A lone single_select must be sent as a legacy `listMessage` instead.
	#isLoneSingleSelect() {
		return this._buttons.length === 1 && this._buttons[0].name === 'single_select';
	}

	#toListMessage() {
		const { title: buttonText, sections } = JSON.parse(this._buttons[0].buttonParamsJson);
		return {
			listMessage: {
				title: this._title || undefined,
				description: this._body || undefined,
				footerText: this._footer || undefined,
				buttonText: buttonText || undefined,
				listType: 1,
				sections: (sections || []).map((s) => ({
					title: s.title,
					rows: (s.rows || []).map((r) => ({
						title: r.title || r.header || '',
						description: r.description || '',
						rowId: r.id || '',
					})),
				})),
				contextInfo: this._contextInfo,
			},
		};
	}

	/** @returns {Record<string, any>} The final content object, without generating/wrapping a WAMessage. Useful when composing this interactive card into something else (e.g. Carousel). */
	async build(jid, { ...options } = {}) {
		if (this._buttons.length === 0 && !this._bloksWidget) {
			throw new Error('Button requires at least one button (use addReply/addUrl/addCall/addSelection/addButton/...) or a Bloks widget (setBloksWidget())');
		}

		if (this._buttons.length > 0 && this.#isLoneSingleSelect()) {
			return generateWAMessageFromContent(jid, { ...this._extraPayload, ...this.#toListMessage() }, { ...options });
		}

		const message = this._buttons.length > 0 ? await this.toCard() : {};

		return generateWAMessageFromContent(
			jid,
			{
				...(this._bloksWidget && {
					messageContextInfo: { messageSecret: crypto.randomBytes(32) },
				}),
				...this._extraPayload,
				interactiveMessage: {
					...message,
					...(this._bloksWidget && { bloksWidget: this._bloksWidget }),
					contextInfo: this._contextInfo,
				},
			},
			{ ...options }
		);
	}

	/** Build and send this interactive message. @param {string} jid Destination chat/group jid. */
	async send(jid, { ...options } = {}) {
		const msg = await this.build(jid, options);

		// Vanz@Fix 27-08-26: delegate the <biz> node to the shared getBizBinaryNode()
		// helper instead of hand-rolling one here. It already:
		//  - stamps actual_actors/host_storage/privacy_mode_ts (previously missing,
		//    the likely cause of single_select's wire being flagged for validation)
		//  - picks the correct wrapper per button name (FLOWS_MAP dedicated node,
		//    ORDER_RESPONSE_ALIAS native_flow_name, mixed native_flow, or the
		//    <list v='2' type='product_list'> node for a lone single_select via
		//    message.listMessage) using the exact same table messages-send.js uses
		//    for every non-Button send path, so Button.send() can't silently drift
		//    out of sync with it.
		// Button.#SPECIAL_FLOW is kept only as documentation for addFlow()/etc.
		// JSDoc now (see below); getBizBinaryNode()'s own ORDER_RESPONSE_ALIAS /
		// FLOWS_MAP tables are what actually pick the wire node -- keep those two
		// tables in sync if a new special-cased button name is ever added.
		const bizNode = getBizBinaryNode(msg.message);

		await this.#client.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes: [bizNode],
			...options,
		});
		return msg;
	}
}

/**
 * Legacy `buttonsMessage` builder (up to 3 simple quick-reply buttons under a
 * media/location header). Simpler and more universally supported than
 * `Button`'s native-flow messages, but capped to `type: 1` quick replies.
 */
class CardBuilder {
	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket. */
	constructor(client) {
		this._card = new Button(client);
	}

	image(url) {
		this._card.setImage(url);
		return this;
	}

	title(t) {
		this._card.setTitle(t);
		return this;
	}

	text(t) {
		this._card.setBody(t);
		return this;
	}

	button(displayText, id) {
		this._card.addReply(displayText, id);
		return this;
	}
}

export { Button, CardBuilder };
