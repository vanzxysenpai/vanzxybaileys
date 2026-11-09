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
export class Event extends BaseBuilder {
    static #toSec(v: any, label: any): number;
    constructor(client: any);
    _name: string;
    _description: string;
    _start: number;
    _end: number;
    _location: {
        degreesLatitude?: number;
        degreesLongitude?: number;
        name?: string;
        address?: string;
    };
    _call: any;
    _cancelled: boolean;
    _extraGuests: boolean;
    _scheduleCall: boolean;
    _reminderOffsetSec: any;
    _botFbids: any[];
    setName(name: any): this;
    setDescription(text: any): this;
    /** @param {Date|number} when Date or unix seconds */
    setStart(when: Date | number): this;
    /** @param {Date|number} when Date or unix seconds */
    setEnd(when: Date | number): this;
    /** @param {{ degreesLatitude?: number, degreesLongitude?: number, name?: string, address?: string }} location */
    setLocation(location: {
        degreesLatitude?: number;
        degreesLongitude?: number;
        name?: string;
        address?: string;
    }): this;
    /** Attach a call link ('audio' | 'video'); needs the socket's getCallLink support. */
    setCall(kind: any): this;
    setCancelled(v?: boolean): this;
    setExtraGuestsAllowed(v?: boolean): this;
    setScheduleCall(v?: boolean): this;
    /** Remind guests `seconds` before the start (3600 = 1 hour). Implies hasReminder. */
    setReminder(seconds: any): this;
    clearReminder(): this;
    /** Meta AI participant fbid(s) to mark in messageContextInfo.botMetadata (what the official client does in groups with Meta AI). */
    setBotFbid(...fbids: any[]): this;
    /** @returns {{ event: object }} the `sendMessage()`-shaped payload, without sending it. */
    build(): {
        event: object;
    };
    send(jid: any, options?: {}): Promise<any>;
    #private;
}
import { BaseBuilder } from './shared.js';
