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
export class Poll extends BaseBuilder {
    /** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket (must expose `sendMessage`). */
    constructor(client: any);
    _name: string;
    _values: any[];
    _selectableCount: number;
    _hideVoter: boolean;
    _canAddOption: boolean;
    _toAnnouncementGroup: boolean;
    _correctAnswer: string;
    _endDate: Date;
    /** Set the poll question/title. */
    setName(name: any): this;
    /** Append one option. Chainable — call repeatedly, or use `addOptions()` for an array. */
    addOption(name: any): this;
    /** Append several options at once. @param {string[]} names */
    addOptions(names: string[]): this;
    /** How many options a voter can pick (default 1). Use `setMultiSelect()` for unlimited. */
    setSelectable(count: any): this;
    /** Shortcut for unlimited-choice polls (`selectableCount: 0`). Pass `false` to revert to single-select. */
    setMultiSelect(canSelectMultiple?: boolean): this;
    /** Hide voter names from other participants (where the client supports it). */
    setHideVoter(hide?: boolean): this;
    /** Allow voters to add their own options. */
    setCanAddOption(allow?: boolean): this;
    /** Mark this a community-announcement-group poll (pollCreationMessageV2 path). */
    setAnnouncementGroup(isAnnouncement?: boolean): this;
    /** Auto-close the poll at this date/time. */
    setEndDate(date: any): this;
    /**
     * Turn this into a quiz: one option is marked correct. Delegates the actual hash/version
     * wiring to the socket's own `sendMessage({poll:{...correctAnswer}})` handling — see class
     * docblock for why this builder doesn't compute the hash itself.
     * @param {string} correctOptionName Must exactly match one of the strings passed to `addOption()`/`addOptions()`.
     */
    setQuiz(correctOptionName: string): this;
    /** @returns {{poll: Record<string, any>}} The `sendMessage()`-shaped poll payload, without sending it. */
    build(): {
        poll: Record<string, any>;
    };
    /** Build and send via the socket's `sendMessage()`. */
    send(jid: any, options?: {}): Promise<any>;
    #private;
}
import { BaseBuilder } from './shared.js';
