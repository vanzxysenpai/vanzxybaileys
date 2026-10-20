import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';
/**
 * Vanz@Add (v4.8) --- Chainable poll builder, wrapping the socket's own well-tested
 * `sendMessage({ poll })` path (see messages.js) instead of hand-building
 * pollCreationMessageV3/V5 over relayMessage. Two things from the traffic you sent were
 * deliberately NOT implemented here because they can't be built with confidence:
 *   1. Per-option poll images (`values: [{ name, image }]`) — the proto this fork ships
 *      only has a plain `optionName` string per option; an image-poll option isn't a named
 *      field anywhere in it. The one place an image-poll concept even appears
 *      (`pollCreationOptionImageMessage`) is typed as an opaque `FutureProofMessage` (a
 *      forward-compat envelope with no documented inner layout) — there's no field list to
 *      target, so adding "support" for it would just be silently dropping the image and
 *      guessing at a shape. Flagging instead of faking it.
 *   2. Quiz-mode `correctAnswer.optionHash` built by hand — the one working example you
 *      captured had a 65-character hex string where a sha256 digest should be 64, and this
 *      builder's target `sendMessage({poll})` path (pollCreationMessageV5) already computes
 *      quiz mode correctly from a plain `correctAnswer` string, so `setQuiz()` below defers to
 *      that existing, already-tested logic rather than reimplementing the hash.
 */
class Poll extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket (must expose `sendMessage`). */
	constructor(client) {
		super();
		if (!client) throw new Error('Socket is required');
		this.#client = client;

		this._name = '';
		this._values = [];
		this._selectableCount = 1;
		this._hideVoter = false;
		this._canAddOption = false;
		this._toAnnouncementGroup = false;
		this._correctAnswer = null;
		this._endDate = null;
	}

	/** Set the poll question/title. */
	setName(name) {
		if (typeof name !== 'string' || !name) throw new TypeError('setName(name) requires a non-empty string');
		this._name = name;
		return this;
	}

	/** Append one option. Chainable — call repeatedly, or use `addOptions()` for an array. */
	addOption(name) {
		if (typeof name !== 'string' || !name) throw new TypeError('addOption(name) requires a non-empty string');
		this._values.push(name);
		return this;
	}

	/** Append several options at once. @param {string[]} names */
	addOptions(names) {
		if (!Array.isArray(names) || !names.length) throw new TypeError('addOptions(names) requires a non-empty array of strings');
		names.forEach((name) => this.addOption(name));
		return this;
	}

	/** How many options a voter can pick (default 1). Use `setMultiSelect()` for unlimited. */
	setSelectable(count) {
		if (typeof count !== 'number' || count < 0) throw new TypeError('setSelectable(count) requires a non-negative number');
		this._selectableCount = count;
		return this;
	}

	/** Shortcut for unlimited-choice polls (`selectableCount: 0`). Pass `false` to revert to single-select. */
	setMultiSelect(canSelectMultiple = true) {
		this._selectableCount = canSelectMultiple ? 0 : 1;
		return this;
	}

	/** Hide voter names from other participants (where the client supports it). */
	setHideVoter(hide = true) {
		this._hideVoter = hide;
		return this;
	}

	/** Allow voters to add their own options. */
	setCanAddOption(allow = true) {
		this._canAddOption = allow;
		return this;
	}

	/** Mark this a community-announcement-group poll (pollCreationMessageV2 path). */
	setAnnouncementGroup(isAnnouncement = true) {
		this._toAnnouncementGroup = isAnnouncement;
		return this;
	}

	/** Auto-close the poll at this date/time. */
	setEndDate(date) {
		this._endDate = date instanceof Date ? date : new Date(date);
		return this;
	}

	/**
	 * Turn this into a quiz: one option is marked correct. Delegates the actual hash/version
	 * wiring to the socket's own `sendMessage({poll:{...correctAnswer}})` handling — see class
	 * docblock for why this builder doesn't compute the hash itself.
	 * @param {string} correctOptionName Must exactly match one of the strings passed to `addOption()`/`addOptions()`.
	 */
	setQuiz(correctOptionName) {
		if (typeof correctOptionName !== 'string' || !correctOptionName) {
			throw new TypeError('setQuiz(correctOptionName) requires a non-empty string');
		}
		this._correctAnswer = correctOptionName;
		return this;
	}

	/** @returns {{poll: Record<string, any>}} The `sendMessage()`-shaped poll payload, without sending it. */
	build() {
		if (!this._name) throw new Error('Poll requires a name (use setName())');
		if (this._values.length < 2) throw new Error('Poll requires at least 2 options (use addOption()/addOptions())');
		if (this._correctAnswer && !this._values.includes(this._correctAnswer)) {
			throw new Error('setQuiz(correctOptionName) must match one of the added options exactly');
		}

		return {
			poll: {
				name: this._name,
				values: this._values,
				selectableCount: this._selectableCount,
				toAnnouncementGroup: this._toAnnouncementGroup,
				hideVoter: this._hideVoter,
				canAddOption: this._canAddOption,
				...(this._endDate && { endDate: this._endDate }),
				...(this._correctAnswer && { pollType: 1, correctAnswer: this._correctAnswer }),
			},
		};
	}

	/** Build and send via the socket's `sendMessage()`. */
	async send(jid, options = {}) {
		return this.#client.sendMessage(jid, this.build(), options);
	}
}

export { Poll };
