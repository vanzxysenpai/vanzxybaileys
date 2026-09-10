import type { proto } from '../../WAProto/index.js';
export interface ProcessedPastParticipant {
    jid: string;
    leaveTs?: number;
    leaveReason?: 'left' | 'removed';
}
export interface ProcessedPastParticipants {
    groupJid: string;
    participants: ProcessedPastParticipant[];
}
/** Process proto.IPastParticipants[] from a history sync payload into a structured list per group. */
export declare const processPastParticipants: (pastParticipantsList: proto.IPastParticipants[]) => ProcessedPastParticipants[];
/** Check if a history sync event contains past participants data. */
export declare const hasPastParticipants: (event: { pastParticipants?: unknown[] }) => boolean;
