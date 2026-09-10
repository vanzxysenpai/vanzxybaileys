// Ported from @queenanya/baileys `addons/past-participants.ts`.
// No logic changes — @vanzxy/baileys's own WAProto already has the
// `proto.PastParticipant.LeaveReason` enum and `HistorySync.pastParticipants`
// field this depends on (confirmed present), so this ports as-is.
//
// This reads WhatsApp's own server-provided participant-leave history from
// a history-sync payload (`proto.IPastParticipants[]`) — it's real protocol
// data, not something reconstructed by listening to live events, so it
// includes participants who left/were removed *before* this session ever
// connected (which a live `group-participants.update` listener can never
// see).
import { proto } from '../../WAProto/index.js';

/**
 * Process proto.IPastParticipants[] from a history sync payload.
 * Returns a structured list per group.
 */
export const processPastParticipants = (pastParticipantsList) => {
    return pastParticipantsList.map((pp) => {
        const groupJid = pp.groupJid ?? '';
        const participants = (pp.pastParticipants ?? []).map((p) => ({
            jid: p.userJid ?? '',
            leaveTs: p.leaveTs ? Number(p.leaveTs) : undefined,
            leaveReason: p.leaveReason === proto.PastParticipant.LeaveReason.LEFT
                ? 'left'
                : p.leaveReason === proto.PastParticipant.LeaveReason.REMOVED
                    ? 'removed'
                    : undefined
        }));
        return { groupJid, participants };
    });
};

/**
 * Check if a history sync event contains past participants data.
 * (pastParticipants field replaces chunkOrder in this patch)
 */
export const hasPastParticipants = (event) => {
    return Array.isArray(event.pastParticipants) && event.pastParticipants.length > 0;
};
