import { BaseBuilder } from './shared.js';

/**
 * Vanz@Add (v2.1.3) --- Chainable WhatsApp event builder. Wraps the socket's `sendMessage({ event })` path
 * (Utils/messages.js) so the wire shape matches what the official client sends:
 *
 *   eventMessage { name, description, location, joinLink, startTime, endTime, isCanceled,
 *                  extraGuestsAllowed, isScheduleCall, hasReminder, reminderOffsetSec }
 *   messageContextInfo { messageSecret, [threadId, botMetadata.botGroupMetadata.participantsMetadata[].botFbid] }
 *
 *   await new Event(sock).setName('Rapat').setStart(new Date('2026-10-01T09:00:00Z'))
 *     .setReminder(3600).setExtraGuestsAllowed(false).setBotFbid('867051314767696').send(jid);
 */
class Event extends BaseBuilder {
	#client;

	constructor(client) {
		super();
		if (!client || typeof client.sendMessage !== 'function') throw new Error('Socket is required');
		this.#client = client;
		this._name = '';
		this._description = undefined;
		this._start = undefined; // unix seconds
		this._end = undefined;
		this._location = undefined;
		this._call = undefined;
		this._cancelled = false;
		this._extraGuests = undefined;
		this._scheduleCall = false;
		this._reminderOffsetSec = undefined;
		this._botFbids = [];
	}

	static #toSec(v, label) {
		const sec = v instanceof Date ? Math.floor(v.getTime() / 1000) : Math.floor(Number(v));
		if (!Number.isFinite(sec) || sec <= 0) throw new TypeError(`${label} requires a Date or unix seconds`);
		return sec;
	}

	setName(name) {
		if (typeof name !== 'string' || !name) throw new TypeError('setName(name) requires a non-empty string');
		this._name = name;
		return this;
	}

	setDescription(text) {
		if (typeof text !== 'string') throw new TypeError('Description must be a string');
		this._description = text;
		return this;
	}

	/** @param {Date|number} when Date or unix seconds */
	setStart(when) { this._start = Event.#toSec(when, 'setStart()'); return this; }

	/** @param {Date|number} when Date or unix seconds */
	setEnd(when) { this._end = Event.#toSec(when, 'setEnd()'); return this; }

	/** @param {{ degreesLatitude?: number, degreesLongitude?: number, name?: string, address?: string }} location */
	setLocation(location) {
		if (!location || typeof location !== 'object') throw new TypeError('setLocation(location) requires an object');
		this._location = location;
		return this;
	}

	/** Attach a call link ('audio' | 'video'); needs the socket's getCallLink support. */
	setCall(kind) {
		if (!['audio', 'video'].includes(kind)) throw new TypeError("setCall(kind) must be 'audio' or 'video'");
		this._call = kind;
		return this;
	}

	setCancelled(v = true) { this._cancelled = !!v; return this; }
	setExtraGuestsAllowed(v = true) { this._extraGuests = !!v; return this; }
	setScheduleCall(v = true) { this._scheduleCall = !!v; return this; }

	/** Remind guests `seconds` before the start (3600 = 1 hour). Implies hasReminder. */
	setReminder(seconds) {
		if (!Number.isInteger(seconds) || seconds < 0) throw new TypeError('setReminder(seconds) requires a non-negative integer');
		this._reminderOffsetSec = seconds;
		return this;
	}

	clearReminder() { this._reminderOffsetSec = undefined; return this; }

	/** Meta AI participant fbid(s) to mark in messageContextInfo.botMetadata (what the official client does in groups with Meta AI). */
	setBotFbid(...fbids) {
		this._botFbids = fbids.flat().filter(Boolean).map(String);
		return this;
	}

	/** @returns {{ event: object }} the `sendMessage()`-shaped payload, without sending it. */
	build() {
		if (!this._name) throw new Error('Event requires a name (use setName())');
		if (this._start === undefined) throw new Error('Event requires a start (use setStart())');
		if (this._end !== undefined && this._end < this._start) throw new Error('Event end is before its start');
		return {
			event: {
				name: this._name,
				...(this._description !== undefined ? { description: this._description } : {}),
				startTime: this._start,
				...(this._end !== undefined ? { endTime: this._end } : {}),
				...(this._location ? { location: this._location } : {}),
				...(this._call ? { call: this._call } : {}),
				isCancelled: this._cancelled,
				...(this._extraGuests !== undefined ? { extraGuestsAllowed: this._extraGuests } : {}),
				isScheduleCall: this._scheduleCall,
				...(this._reminderOffsetSec !== undefined ? { reminderOffsetSec: this._reminderOffsetSec, hasReminder: true } : {}),
				...(this._botFbids.length ? { botFbid: this._botFbids } : {}),
			},
		};
	}

	async send(jid, options = {}) {
		return this.#client.sendMessage(jid, this.build(), options);
	}
}

export { Event };
