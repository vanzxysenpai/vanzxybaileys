import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';

/**
 * Contact-card message builder — one contact sends as `contactMessage`, two or
 * more as `contactsArrayMessage` (both handled by the existing `message.contacts`
 * shorthand in Utils/messages.js). Accepts either a raw vCard string via
 * `addRawVcard()` or plain fields via `addContact()`, which builds a minimal
 * VCARD 3.0 block itself.
 */
class Contact extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket (must expose `sendMessage`). */
	constructor(client) {
		super();
		if (!client) throw new Error('Socket is required');
		this.#client = client;

		this._contacts = [];
		this._displayName;
	}

	/** Name shown on the card when sending more than one contact (`contactsArrayMessage.displayName`). Ignored for a single contact. */
	setDisplayName(name) {
		this._displayName = name;
		return this;
	}

	/**
	 * Add a contact from plain fields — builds a minimal VCARD 3.0 block.
	 * @param {{name: string, phone?: string|string[], org?: string, email?: string, waid?: string}} fields
	 * `waid` (digits-only, no `+`) makes the number tappable to chat/call on WhatsApp; without it the number is still shown but may not be tappable on every client.
	 */
	addContact({ name, phone, org, email, waid } = {}) {
		if (typeof name !== 'string' || !name) throw new TypeError('addContact({name, ...}) requires a non-empty name');

		const phones = phone === undefined ? [] : Array.isArray(phone) ? phone : [phone];
		const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${name}`, `N:${name};;;;`];
		phones.forEach((number, i) => {
			const type = waid && i === 0 ? `TYPE=CELL,WAID=${waid}` : 'TYPE=CELL';
			lines.push(`TEL;${type}:${number}`);
		});
		if (org) lines.push(`ORG:${org}`);
		if (email) lines.push(`EMAIL:${email}`);
		lines.push('END:VCARD');

		this._contacts.push({ displayName: name, vcard: lines.join('\n') });
		return this;
	}

	/** Add a contact from a pre-built vCard string (bypasses `addContact()`'s auto-generation). */
	addRawVcard(displayName, vcard) {
		if (typeof displayName !== 'string' || !displayName) throw new TypeError('addRawVcard(displayName, vcard) requires a non-empty displayName');
		if (typeof vcard !== 'string' || !vcard) throw new TypeError('addRawVcard(displayName, vcard) requires a non-empty vcard string');
		this._contacts.push({ displayName, vcard });
		return this;
	}

	/** Remove every contact added so far. */
	clearContacts() {
		this._contacts = [];
		return this;
	}

	/** @returns {{contacts: Record<string, any>}} The `sendMessage()`-shaped payload, without sending it. */
	build() {
		if (!this._contacts.length) throw new Error('Contact requires at least one contact (use addContact()/addRawVcard())');

		return {
			contacts: {
				...(this._displayName !== undefined && { displayName: this._displayName }),
				contacts: this._contacts,
			},
		};
	}

	/** Build and send via the socket's `sendMessage()`. */
	async send(jid, options = {}) {
		return this.#client.sendMessage(jid, this.build(), options);
	}
}

export { Contact };
