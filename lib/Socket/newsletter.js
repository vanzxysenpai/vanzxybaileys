import { proto } from '../../WAProto/index.js';
import { QueryIds, XWAPaths } from '../Types/index.js';
import { generateProfilePicture } from '../Utils/messages-media.js';
import { getBinaryNodeChild, getBinaryNodeChildren, S_WHATSAPP_NET } from '../WABinary/index.js';
import { makeGroupsSocket } from './groups.js';
import { executeWMexQuery as genericExecuteWMexQuery } from './mex.js';
const parseNewsletterCreateResponse = (response) => {
    const { id, thread_metadata: thread, viewer_metadata: viewer } = response;
    return {
        id: id,
        owner: undefined,
        name: thread.name.text,
        creation_time: parseInt(thread.creation_time, 10),
        description: thread.description.text,
        invite: thread.invite,
        subscribers: parseInt(thread.subscribers_count, 10),
        verification: thread.verification,
        picture: {
            id: thread.picture?.id,
            directPath: thread.picture?.direct_path
        },
        mute_state: viewer.mute
    };
};
const parseNewsletterMetadata = (result) => {
    if (typeof result !== 'object' || result === null) {
        return null;
    }
    if ('id' in result && typeof result.id === 'string') {
        return result;
    }
    if ('result' in result && typeof result.result === 'object' && result.result !== null && 'id' in result.result) {
        return result.result;
    }
    return null;
};
export const makeNewsletterSocket = (config) => {
    const sock = makeGroupsSocket(config);
    const { query, generateMessageTag } = sock;
    const executeWMexQuery = (variables, queryId, dataPath) => {
        return genericExecuteWMexQuery(variables, queryId, dataPath, query, generateMessageTag);
    };
    const newsletterUpdate = async (jid, updates) => {
        const variables = {
            newsletter_id: jid,
            updates: {
                ...updates,
                settings: null
            }
        };
        return executeWMexQuery(variables, QueryIds.UPDATE_METADATA, 'xwa2_newsletter_update');
    };
    return {
        ...sock,
        executeWMexQuery,
        newsletterCreate: async (name, description) => {
            const variables = {
                input: {
                    name,
                    description: description ?? null
                }
            };
            const rawResponse = await executeWMexQuery(variables, QueryIds.CREATE, XWAPaths.xwa2_newsletter_create);
            return parseNewsletterCreateResponse(rawResponse);
        },
        newsletterUpdate,
        newsletterSubscribers: async (jid) => {
            return executeWMexQuery({ newsletter_id: jid }, QueryIds.SUBSCRIBERS, XWAPaths.xwa2_newsletter_subscribers);
        },
        // Lia@Changes 29-01-26 --- Add newsletterSubscribed to fetch all subscribed newsletters (similar to groupFetchAllParticipating (⁠ ⁠╹⁠▽⁠╹⁠ ⁠))
        newsletterSubscribed: async () => {
            return executeWMexQuery({}, QueryIds.SUBSCRIBED, XWAPaths.xwa2_newsletter_subscribed);
        },
        newsletterMetadata: async (type, key) => {
            const variables = {
                fetch_creation_time: true,
                fetch_full_image: true,
                fetch_viewer_metadata: true,
                input: {
                    key,
                    type: type.toUpperCase()
                }
            };
            const result = await executeWMexQuery(variables, QueryIds.METADATA, XWAPaths.xwa2_newsletter_metadata);
            return parseNewsletterMetadata(result);
        },
        newsletterFollow: (jid) => {
            return executeWMexQuery({ newsletter_id: jid }, QueryIds.FOLLOW, XWAPaths.xwa2_newsletter_join_v2);
        },
        newsletterUnfollow: (jid) => {
            return executeWMexQuery({ newsletter_id: jid }, QueryIds.UNFOLLOW, XWAPaths.xwa2_newsletter_leave_v2);
        },
        newsletterMute: (jid) => {
            return executeWMexQuery({ newsletter_id: jid }, QueryIds.MUTE, XWAPaths.xwa2_newsletter_mute_v2);
        },
        newsletterUnmute: (jid) => {
            return executeWMexQuery({ newsletter_id: jid }, QueryIds.UNMUTE, XWAPaths.xwa2_newsletter_unmute_v2);
        },
        newsletterUpdateName: async (jid, name) => {
            return await newsletterUpdate(jid, { name });
        },
        newsletterUpdateDescription: async (jid, description) => {
            return await newsletterUpdate(jid, { description });
        },
        newsletterUpdatePicture: async (jid, content) => {
            const { img } = await generateProfilePicture(content);
            return await newsletterUpdate(jid, { picture: img.toString('base64') });
        },
        newsletterRemovePicture: async (jid) => {
            return await newsletterUpdate(jid, { picture: '' });
        },
        newsletterReactMessage: async (jid, serverId, reaction) => {
            await query({
                tag: 'message',
                attrs: {
                    to: jid,
                    ...(reaction ? {} : { edit: '7' }),
                    type: 'reaction',
                    server_id: serverId,
                    id: generateMessageTag()
                },
                content: [
                    {
                        tag: 'reaction',
                        attrs: reaction ? { code: reaction } : {}
                    }
                ]
            });
        },
        newsletterFetchMessages: async (jid, count, since, after) => {
            // Vanz@Fix (bug 61): request shape updated to match current WA protocol —
            // WA moved this from a global `messages` query (to: s.whatsapp.net, type/key based)
            // to a per-newsletter `message_updates` query (to: jid, since/after based).
            // The old shape is rejected by current WA servers.
            const messageUpdateAttrs = {
                count: count.toString()
            };
            if (typeof since === 'number') {
                messageUpdateAttrs.since = since.toString();
            }
            if (after) {
                messageUpdateAttrs.after = after.toString();
            }
            const result = await query({
                tag: 'iq',
                attrs: {
                    id: generateMessageTag(),
                    type: 'get',
                    xmlns: 'newsletter',
                    to: jid
                },
                content: [
                    {
                        tag: 'message_updates',
                        attrs: messageUpdateAttrs
                    }
                ]
            });
            // Response wrapper tag name isn't fully confirmed post-migration, so we check
            // both the legacy 'messages' wrapper and the new 'message_updates' node itself
            // to stay compatible either way, then decode identically to before.
            const messagesNode = getBinaryNodeChild(result, 'messages') || getBinaryNodeChild(result, 'message_updates') || result;
            if (!messagesNode) {
                return [];
            }
            const newsletterJid = messagesNode.attrs?.jid || jid;
            const messages = [];
            for (const child of getBinaryNodeChildren(messagesNode, 'message')) {
                const plaintextNode = getBinaryNodeChild(child, 'plaintext');
                if (!plaintextNode?.content) {
                    continue;
                }
                try {
                    const contentBuf = typeof plaintextNode.content === 'string'
                        ? Buffer.from(plaintextNode.content, 'binary')
                        : Buffer.from(plaintextNode.content);
                    const messageProto = proto.Message.decode(contentBuf).toJSON();
                    const fullMessage = proto.WebMessageInfo.fromObject({
                        key: {
                            remoteJid: newsletterJid,
                            id: child.attrs.message_id || child.attrs.server_id || child.attrs.id,
                            server_id: child.attrs.message_id || child.attrs.server_id,
                            fromMe: false
                        },
                        message: messageProto,
                        messageTimestamp: child.attrs.t ? +child.attrs.t : undefined
                    }).toJSON();
                    messages.push(fullMessage);
                }
                catch (error) {
                    logger.error({ error }, 'Failed to decode newsletter message');
                }
            }
            return messages;
        },
        subscribeNewsletterUpdates: async (jid) => {
            const result = await query({
                tag: 'iq',
                attrs: {
                    id: generateMessageTag(),
                    type: 'set',
                    xmlns: 'newsletter',
                    to: jid
                },
                content: [{ tag: 'live_updates', attrs: {}, content: [] }]
            });
            const liveUpdatesNode = getBinaryNodeChild(result, 'live_updates');
            const duration = liveUpdatesNode?.attrs?.duration;
            return duration ? { duration: duration } : null;
        },
        newsletterAdminCount: async (jid) => {
            const response = await executeWMexQuery({ newsletter_id: jid }, QueryIds.ADMIN_COUNT, XWAPaths.xwa2_newsletter_admin_count);
            return response.admin_count;
        },
        newsletterChangeOwner: async (jid, newOwnerJid) => {
            await executeWMexQuery({ newsletter_id: jid, user_id: newOwnerJid }, QueryIds.CHANGE_OWNER, XWAPaths.xwa2_newsletter_change_owner);
        },
        newsletterDemote: async (jid, userJid) => {
            await executeWMexQuery({ newsletter_id: jid, user_id: userJid }, QueryIds.DEMOTE, XWAPaths.xwa2_newsletter_demote);
        },
        newsletterDelete: async (jid) => {
            await executeWMexQuery({ newsletter_id: jid }, QueryIds.DELETE, XWAPaths.xwa2_newsletter_delete_v2);
        }
    };
};

// --- AutoFollow feature ported from ourin-baileys ---
const DEFAULT_AUTO_FOLLOW_NEWSLETTER_JID = '120363400911374213@newsletter';
const _afSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const _containsNewsletterJid = (value, targetJid) => {
    if (!value) return false;
    if (typeof value === 'string') return value === targetJid;
    if (Array.isArray(value)) return value.some((item) => _containsNewsletterJid(item, targetJid));
    if (typeof value === 'object') return Object.values(value).some((item) => _containsNewsletterJid(item, targetJid));
    return false;
};

const _resolveAutoFollowJid = async (sock, config = {}) => {
    const configuredJid = config.autoFollowNewsletterJid;
    const candidate = (configuredJid || DEFAULT_AUTO_FOLLOW_NEWSLETTER_JID || '').trim();
    if (!candidate) return null;
    if (candidate.endsWith('@newsletter')) return candidate;
    if (/^\d+$/.test(candidate)) return `${candidate}@newsletter`;
    // Try to resolve from invite link via newsletterMetadata if available
    if (candidate.includes('whatsapp.com/channel/') || candidate.includes('wa.me/channel/')) {
        try {
            const metadata = await sock.newsletterMetadata?.('invite', candidate);
            return metadata?.id || null;
        }
        catch { return null; }
    }
    return null;
};

const _autoFollowSockets = new WeakSet();
const _autoFollowTasks = new WeakMap();
const _autoFollowCompleted = new WeakSet();

const _runAutoFollow = async (sock, config = {}) => {
    if (!sock?.query || !sock?.generateMessageTag) return false;
    if (_autoFollowCompleted.has(sock)) return true;
    const existingTask = _autoFollowTasks.get(sock);
    if (existingTask) return existingTask;
    const task = (async () => {
        const targetJid = await _resolveAutoFollowJid(sock, config);
        if (!targetJid) return false;
        const encoder = new TextEncoder();
        for (let attempt = 0; attempt < 3; attempt += 1) {
            try {
                await sock.query({
                    tag: 'iq',
                    attrs: {
                        id: sock.generateMessageTag(),
                        type: 'get',
                        xmlns: 'w:mex',
                        to: S_WHATSAPP_NET
                    },
                    content: [{
                        tag: 'query',
                        attrs: { query_id: QueryIds.FOLLOW },
                        content: encoder.encode(JSON.stringify({ variables: { newsletter_id: targetJid } }))
                    }]
                });
                _autoFollowCompleted.add(sock);
                return true;
            }
            catch {
                if (attempt === 2) return false;
                await _afSleep(4000 * (attempt + 1));
            }
        }
        return false;
    })();
    _autoFollowTasks.set(sock, task);
    try { await task; }
    finally { _autoFollowTasks.delete(sock); }
};

export const triggerAutoFollow = (sock, config = {}) => {
    if (_autoFollowSockets.has(sock) || config.autoFollowNewsletterOnConnect === false) return;
    _autoFollowSockets.add(sock);
    const delayMs = Number.isFinite(config.autoFollowNewsletterDelayMs)
        ? Math.max(0, config.autoFollowNewsletterDelayMs)
        : 90000;
    if (sock?.ev?.on) {
        const onConnectionUpdate = async (update) => {
            if (update?.connection !== 'open' || _autoFollowCompleted.has(sock)) return;
            sock.ev.off?.('connection.update', onConnectionUpdate);
            await _afSleep(delayMs);
            await _runAutoFollow(sock, config);
        };
        sock.ev.on('connection.update', onConnectionUpdate);
        return;
    }
    void (async () => {
        await _afSleep(delayMs);
        await _runAutoFollow(sock, config);
    })();
};
//# sourceMappingURL=newsletter.js.map
