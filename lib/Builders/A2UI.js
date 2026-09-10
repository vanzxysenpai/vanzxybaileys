/**
 * lib/Builders/A2UI.js — A2UI (Bloks) widget builder + sender
 *
 * Part of @vanzxy/baileys. Builds the flat `components` array A2UI/Bloks
 * expects (id-referencing tree: Column/Row hold `children`, Card/Button hold
 * `child`, Modal holds `trigger`/`content`) and sends it as an
 * `interactiveMessage.bloksWidget` via the same `getBizBinaryNode()` path
 * Button/ButtonV2 use, so the wire-level <biz>/<native_flow> node always
 * matches the actual button names sent — no more hand-rolled duplicate of
 * that logic living outside the library.
 *
 * See MessageBuilder.js's `Button.setBloksWidget()` for the declarative
 * (nested-tree) alternative to this imperative (id-returning-factory) API;
 * both produce the same wire format and can be mixed freely.
 */
"use strict";

import crypto from "crypto";
import { generateWAMessageFromContent, prepareWAMessageMedia } from "../Utils/messages.js";
import { getBizBinaryNode } from "../WABinary/index.js";

class A2UI {
	constructor({ catalogId = "https://a2ui.org/specification/v0_9/catalogs/basic/catalog.json", version = "v0.9" } = {}) {
		this._version = version;
		this._catalogId = catalogId;
		this._components = new Map();
		this._counter = 0;
		this._rootChildren = [];
	}
	#nextId(prefix) {
		return `${prefix}_${(this._counter++).toString(36)}`;
	}
	#reg(id, component, extra = {}) {
		id ??= this.#nextId(component.toLowerCase());
		if (id === "root") throw new Error(`Component id "root" is reserved for the implicit root wrapper`);
		if (this._components.has(id)) throw new Error(`Component id "${id}" already used`);
		this._components.set(id, { id, component, ...extra });
		return id;
	}
	text(text, { id, variant = "body" } = {}) {
		return this.#reg(id, "Text", { text, variant });
	}
	image(url, { id, variant, fit = "cover" } = {}) {
		return this.#reg(id, "Image", { url, ...(variant ? { variant } : {}), fit });
	}
	video(url, { id } = {}) {
		return this.#reg(id, "Video", { url });
	}
	checkbox(label, { id, value = false } = {}) {
		return this.#reg(id, "CheckBox", { label, value });
	}
	textField(label, { id, variant = "text" } = {}) {
		return this.#reg(id, "TextField", { label, variant });
	}
	button(childId, { id, variant = "primary", action } = {}) {
		if (!childId) throw new TypeError("button(childId) requires the id of a child component (e.g. from .text())");
		return this.#reg(id, "Button", { child: childId, variant, ...(action ? { action } : {}) });
	}
	card(childId, { id } = {}) {
		return this.#reg(id, "Card", { child: childId });
	}
	// trigger: id of the component that opens the modal (e.g. a Button); content: id of the
	// component shown inside it. Both are ids of already-registered SIBLING components, not
	// nested children — that's how the wire format expects Modal to reference them.
	modal(triggerId, contentId, { id } = {}) {
		if (!triggerId) throw new TypeError("modal(triggerId, contentId) requires the id of the trigger component");
		if (!contentId) throw new TypeError("modal(triggerId, contentId) requires the id of the content component");
		return this.#reg(id, "Modal", { trigger: triggerId, content: contentId });
	}
	// Escape hatch for any catalog component without a dedicated method yet (Divider, Slider,
	// Switch, List, etc). props is merged as-is into the registered node.
	raw(component, props = {}, { id } = {}) {
		if (typeof component !== "string" || !component) throw new TypeError("raw(component, props) requires a non-empty component type string");
		return this.#reg(id, component, props);
	}
	column(children = [], { id } = {}) {
		if (!children.length) throw new TypeError("column(children) requires at least one child id");
		return this.#reg(id, "Column", { children });
	}
	row(children = [], { id } = {}) {
		if (!children.length) throw new TypeError("row(children) requires at least one child id");
		return this.#reg(id, "Row", { children });
	}
	divider({ id } = {}) {
		return this.#reg(id, "Divider", {});
	}
	choicePicker(label, options, { id, variant = "mutuallyExclusive", value, displayStyle = "checkbox", filterable = false } = {}) {
		if (!Array.isArray(options) || !options.length) {
			throw new TypeError("choicePicker(label, options) requires a non-empty options array of {label, value}");
		}
		return this.#reg(id, "ChoicePicker", {
			label,
			variant,
			...(value !== undefined ? { value } : {}),
			options,
			displayStyle,
			filterable
		});
	}
	root(children) {
		if (!Array.isArray(children) || !children.length) {
			throw new TypeError("root(children) requires a non-empty array of top-level component ids");
		}
		this._rootChildren = children;
		return this;
	}
	// Vanz@Add 29-08-26 --- Product/list carousel card. This is a DIFFERENT wire
	// payload shape from the Column/Row component-tree the rest of this class
	// builds (type: 'list_card', flat items array) — not a catalog component, so
	// it doesn't go through #reg()/root(). Call this instead of root()+build();
	// build() returns the list_card payload directly when this was set.
	listCard({ title, items, fallbackText, uuid = crypto.randomUUID() } = {}) {
		if (!title) throw new TypeError("listCard requires a title");
		if (!Array.isArray(items) || !items.length) {
			throw new TypeError("listCard requires a non-empty items array");
		}
		this._listCardPayload = {
			uuid,
			data: JSON.stringify({
				type: "list_card",
				title,
				fallback_text: fallbackText ?? "",
				items: items.map((it) => ({
					asset_id: it.assetId ?? crypto.randomUUID().replace(/-/g, "").slice(0, 17),
					asset_type: it.assetType ?? "PRODUCT_ITEM",
					title: it.title,
					trailing_label: it.price ?? it.trailingLabel ?? "",
					trailing_emphasis: it.emphasis ?? "strong"
				}))
			}),
			type: "im_a2ui",
			fallback: fallbackText ?? ""
		};
		return this;
	}
	// Vanz@Add 30-08-26 --- send(): terminal method so A2UI can be used as a one-liner like
	// the other builders (Button/ButtonV2/AIRich `.send()`), instead of always needing the
	// separate `sendA2UIWidget()` call. Thin wrapper only — root([...ids])/listCard() must
	// still be called first, same as before build(); this doesn't change the id-returning
	// factory API (child methods still return ids, not `this`, since sibling nodes need to
	// reference each other by id when wiring children/trigger/content).
	async send(client, jid, opts = {}) {
		return sendA2UIWidget(client, jid, { ...opts, a2ui: this });
	}
	// Vanz@Add 30-08-26 --- validates that every structural id-reference (child/children on
	// Button/Card/Column/Row, trigger/content on Modal) points at a component that was
	// actually registered. Without this, a typo'd id just gets written into the wire payload
	// as-is and the failure only surfaces as a broken/blank widget on the WA client, with no
	// error on this end. Only covers the dedicated methods' known reference keys — raw()'s
	// free-form props aren't inspected, since there's no way to know which of those are id
	// references vs plain data.
	#validateRefs(components) {
		const validIds = new Set(components.map((c) => c.id));
		for (const c of components) {
			for (const key of ["child", "trigger", "content"]) {
				if (c[key] !== undefined && !validIds.has(c[key])) {
					throw new Error(`A2UI: component "${c.id}" (${c.component}) references unknown id "${c[key]}" via "${key}"`);
				}
			}
			if (Array.isArray(c.children)) {
				for (const childId of c.children) {
					if (!validIds.has(childId)) {
						throw new Error(`A2UI: component "${c.id}" (${c.component}) references unknown id "${childId}" in "children"`);
					}
				}
			}
		}
	}
	build({ uuid = crypto.randomUUID(), surfaceId, type = "im_a2ui", wrapped = true } = {}) {
		if (this._listCardPayload) return this._listCardPayload;
		if (!this._rootChildren.length) throw new Error("Call root([...ids]) before build()");
		const root = { id: "root", component: "Column", children: this._rootChildren };
		const components = [root, ...this._components.values()];
		this.#validateRefs(components);
		const data = wrapped
			? {
					version: this._version,
					createSurface: {
						surfaceId: surfaceId ?? `starcore-widget=${uuid}`,
						catalogId: this._catalogId,
						components
					}
				}
			: { components };
		return {
			uuid,
			data: JSON.stringify(data),
			type
		};
	}
}

/**
 * Build + send an A2UI/Bloks widget as an interactiveMessage.
 * @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket.
 * @param {string} jid Destination chat/group jid.
 */
async function sendA2UIWidget(client, jid, {
	a2ui,
	bodyText = "",
	footer = "",
	buttons = [],
	contextInfo = {},
	expiration,
	quoted,
	type = "im_a2ui",
	wrapped = true,
	singleScreen = false,
	// Vanz@Add 30-08-26 --- optional header media, mirroring Button/ButtonV2's toCard()
	// pattern (prepareWAMessageMedia + client.waUploadToServer). { title, subtitle, image
	// | video | document: path/buffer/{url} } — media is mutually exclusive, image wins if
	// more than one is passed. Falls back to a title/subtitle-only header (no attachment)
	// when no media is given, same shape as before this change.
	header
} = {}) {
	if (!client) throw new Error("Socket is required");
	if (!(a2ui instanceof A2UI)) throw new TypeError("a2ui must be an A2UI instance");

	const nativeFlowMessage = buttons && buttons.length
		? {
				buttons: buttons.map((b) => ({
					name: b.name ?? "cta_url",
					buttonParamsJson: typeof b.params === "string" ? b.params : JSON.stringify(b.params ?? {}),
				})),
				messageParamsJson: "{}",
				messageVersion: 1
			}
		: { messageParamsJson: "" };

	const headerMediaData = header?.image
		? { image: header.image }
		: header?.video
			? { video: header.video }
			: header?.document
				? { document: header.document }
				: null;

	const headerBlock = {
		...(header?.title !== undefined ? { title: header.title } : {}),
		...(header?.subtitle !== undefined ? { subtitle: header.subtitle } : {}),
		hasMediaAttachment: !!headerMediaData,
		...(headerMediaData
			? await prepareWAMessageMedia(headerMediaData, { upload: client.waUploadToServer }).catch((e) => {
					if (String(e).includes("Invalid media type")) return headerMediaData;
					throw e;
				})
			: {})
	};

	const interactiveMessage = singleScreen
		? {
				nativeFlowMessage,
				bloksWidget: a2ui.build({ type, wrapped }),
				...(expiration || Object.keys(contextInfo).length ? { contextInfo: { ...(expiration ? { expiration } : {}), ...contextInfo } } : {})
			}
		: {
				header: headerBlock,
				body: { text: bodyText },
				...(footer ? { footer: { text: footer } } : {}),
				nativeFlowMessage,
				bloksWidget: a2ui.build({ type, wrapped }),
				...(expiration || Object.keys(contextInfo).length ? { contextInfo: { ...(expiration ? { expiration } : {}), ...contextInfo } } : {})
			};

	const msg = generateWAMessageFromContent(jid, {
		messageContextInfo: { messageSecret: crypto.randomBytes(32) },
		interactiveMessage
	}, { quoted });

	await client.relayMessage(msg.key.remoteJid, msg.message, {
		messageId: msg.key.id,
		additionalNodes: [getBizBinaryNode(msg.message)]
	});
	return msg;
}

export { A2UI, sendA2UIWidget };
