/**
 * Vanz@Add --- ported from Bail-master addons/media-set.ts.
 * Profile-picture setters (full/panoramic variants) and group-status /
 * member-label senders. Depends on this fork's own media-messages.js
 * (also ported this batch) and its existing generateWAMessageContent /
 * generateWAMessageFromContent / unixTimestampSeconds / S_WHATSAPP_NET.
 *
 * NOTE ON DUPLICATE-LOOKING SETTERS: `updateProfilePictureFull` and
 * `updateProfilePictureFull2` are genuinely different, not duplicates —
 * the first sends the `img` buffer from `generateProfilePictureFP`
 * (scaled-to-fit 720x720 main image), the second sends the `preview`
 * buffer from `generatePP` (normalized preview). Both are kept.
 */
import { randomBytes } from 'node:crypto';
// Vanz@Fix: unixTimestampSeconds is not re-exported by messages.js (it only imports
// it internally from generics.js for its own use) — pull it from generics.js directly.
import { generateWAMessageContent, generateWAMessageFromContent } from './messages.js';
import { unixTimestampSeconds } from './generics.js';
import { S_WHATSAPP_NET } from '../WABinary/index.js';
import { generatePP, generateProfilePictureFP } from './media-messages.js';
/** Update the profile picture for yourself or a group — sends the main (scaled-to-fit) image. */
export const updateProfilePictureFull = async (jid, content, sock) => {
    const { query } = sock;
    const { img } = await generateProfilePictureFP(content);
    const media = await query({
        tag: 'iq',
        attrs: {
            target: jid,
            to: S_WHATSAPP_NET,
            type: 'set',
            xmlns: 'w:profile:picture'
        },
        content: [
            {
                tag: 'picture',
                attrs: { type: 'image' },
                content: img
            }
        ]
    });
    return media;
};
/** Update the profile picture for yourself or a group — sends the normalized preview image. */
export const updateProfilePictureFull2 = async (jid, content, sock) => {
    const { query } = sock;
    const { preview } = await generatePP(content);
    const media = await query({
        tag: 'iq',
        attrs: {
            target: jid,
            to: S_WHATSAPP_NET,
            type: 'set',
            xmlns: 'w:profile:picture'
        },
        content: [
            {
                tag: 'picture',
                attrs: { type: 'image' },
                content: preview
            }
        ]
    });
    return media;
};
/** Send a group status (status update visible only within a group's members). */
export const groupStatus = async (jid, content, sock) => {
    const { backgroundColor, ...rest } = content;
    const inside = await generateWAMessageContent(rest, {
        upload: sock.waUploadToServer,
        backgroundColor
    });
    const messageSecret = randomBytes(32);
    const m = generateWAMessageFromContent(jid, {
        messageContextInfo: { messageSecret },
        groupStatusMessageV2: {
            message: {
                ...inside,
                messageContextInfo: { messageSecret }
            }
        }
    }, {});
    await sock.relayMessage(jid, m.message, { messageId: m.key.id });
    return m;
};
/** Send the same group status to multiple groups at once. */
export const groupStatusV2 = async (jids, content, sock) => {
    const { backgroundColor, ...rest } = content;
    const inside = await generateWAMessageContent(rest, {
        upload: sock.waUploadToServer,
        backgroundColor
    });
    const messageSecret = randomBytes(32);
    const results = [];
    for (const id of jids) {
        const m = generateWAMessageFromContent(id, {
            messageContextInfo: { messageSecret },
            groupStatusMessageV2: {
                message: {
                    ...inside,
                    messageContextInfo: { messageSecret }
                }
            }
        }, {});
        await sock.relayMessage(id, m.message, { messageId: m.key.id });
        results.push(m);
    }
    return results;
};
/**
 * Set/update a member's label in a group (awaits the relay and returns the result).
 * Label is truncated to 30 characters (WA's limit).
 */
export const groupSetMemberLabel = async (jid, memberLabel, sock) => {
    const result = await sock.relayMessage(jid, {
        protocolMessage: {
            type: 30,
            memberLabel: {
                label: memberLabel.slice(0, 30),
                labelTimestamp: unixTimestampSeconds() || Date.now()
            }
        }
    }, {
        additionalNodes: [
            {
                tag: 'meta',
                attrs: {
                    tag_reason: 'user_update',
                    appdata: 'member_tag'
                },
                content: undefined
            }
        ]
    });
    return result;
};
/**
 * Set/update a member's label in a group — fire-and-forget variant (errors
 * are swallowed, matching the source's behavior; prefer
 * `groupSetMemberLabel` if you need to await/observe failures).
 */
export const groupLabel = async (jid, text, sock) => {
    try {
        void sock.relayMessage(jid, {
            protocolMessage: {
                type: 30,
                memberLabel: {
                    label: text.slice(0, 30),
                    // Vanz@Fix (bug 67): this used Date.now() (milliseconds) while the
                    // sibling groupSetMemberLabel() correctly uses unixTimestampSeconds()
                    // for the same proto field — WA's *Timestamp fields are unix-seconds,
                    // so this was sending a timestamp ~1000x too large.
                    labelTimestamp: unixTimestampSeconds() || Date.now()
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: 'meta',
                    attrs: {
                        tag_reason: 'user_update',
                        appdata: 'member_tag'
                    },
                    content: undefined
                }
            ]
        });
    }
    catch {
        // intentionally swallowed — matches source behavior
    }
};
//# sourceMappingURL=media-set.js.map
