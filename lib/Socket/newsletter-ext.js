// Vanz@Add (v2.1.0) --- extra newsletter / profile MEX operations ported from
// @rexxhayanasi/elaina-baileys 1.3.10 (Socket/newsletter.js + Socket/chats.js).
//
// CAVEAT (read this): WhatsApp rotates GraphQL doc ids. The ids below come from that fork and could
// NOT be verified offline. They are kept in EXT_QUERY_IDS (not in Types/Mex.js) so you can patch one
// value if an op starts returning "unexpected response structure". Ops whose donor ids collided with
// another op (newsletterAdminInfo / newsletterCanPostStatus / newsletterPendingAdminInvites) were
// intentionally NOT ported. Existing ops in ./newsletter.js keep this fork's own ids.
import { Boom } from '@hapi/boom';
import { createHash } from 'crypto';
import { proto } from '../../WAProto/index.js';
import { S_WHATSAPP_NET, getBinaryNodeChild, getBinaryNodeChildren, jidDecode, jidNormalizedUser } from '../WABinary/index.js';
import { executeWMexQuery as genericExecuteWMexQuery } from './mex.js';

export const EXT_QUERY_IDS = Object.freeze({
    UPDATE_USER_SETTING: '31938993655691868',
    ADMIN_CAPABILITIES: '9801384413216421',
    ENFORCEMENTS: '27835373536068060',
    CHANNEL_REPORTS: '35936238352686172',
    CREATE_REPORT_APPEAL: '27103316329328467',
    POLL_VOTERS: '9407762219322536',
    REACTION_SENDER_LIST: '29575462448733991',
    PIN_MESSAGES: '27165709459706559',
    UNPIN_MESSAGES: '28007176042216937',
    LABEL_AI_CONTENT: '27909718265289596',
    PAID_PARTNERSHIP_LABEL: '26102375079404865',
    CREATE_ADMIN_INVITE: '9387141988078609',
    REVOKE_ADMIN_INVITE: '9656078347839416',
    ACCEPT_ADMIN_INVITE: '9580828702035549',
    DIRECTORY_LIST: '26125047313831973',
    DIRECTORY_SEARCH: '26301059626252132',
    DIRECTORY_CATEGORIES: '35266481849605779',
    INSIGHTS: '9853618868050977',
    FOLLOWERS: '27472091235714801',
    QUESTION_RESPONSE_STATE: '24636260219323456',
    RECOMMENDED: '25806748772361516',
    SIMILAR: '26217043484590756',
    UPDATE_TEXT_STATUS: '9152604461510864',
    TEXT_STATUS_LIST: '24072923595647473',
    ABOUT_STATUS: '24535500086059408',
});

export const NEWSLETTER_SERVER_ID_MIN = 99;
export const NEWSLETTER_SERVER_ID_MAX = 2147476647;

/** Validate + stringify a newsletter server id (the server accepts 99..2147476647). */
export const toNewsletterServerId = (value, label) => {
    const parsed = typeof value === 'number' ? value : Number(String(value).trim());
    if (!Number.isInteger(parsed) || parsed < NEWSLETTER_SERVER_ID_MIN || parsed > NEWSLETTER_SERVER_ID_MAX) {
        throw new TypeError(`${JSON.stringify(value)} is not a newsletter server id${label ? ` for ${label}` : ''}; expected an integer in ${NEWSLETTER_SERVER_ID_MIN}..${NEWSLETTER_SERVER_ID_MAX} (get one from newsletterFetchMessages or a sent message)`);
    }
    return String(parsed);
};
export const toNewsletterServerIds = (serverIds) => {
    const list = Array.isArray(serverIds) ? serverIds : [serverIds];
    if (!list.length) throw new TypeError('a newsletter server id is required');
    return list.map((id) => toNewsletterServerId(id));
};
const assertNewsletterJid = (jid) => {
    if (typeof jid !== 'string' || !jid.endsWith('@newsletter')) throw new TypeError(`${JSON.stringify(jid)} is not a newsletter jid`);
    return jid;
};
const REACTION_SETTINGS = new Set(['ALL', 'BASIC', 'NONE', 'BLOCKLIST']);


// ── binary (non-MEX) helpers, ported from elaina-baileys ─────────────────────────────────────
const readInt = (attrs, key) => {
    const raw = attrs?.[key];
    if (raw === undefined || raw === null || raw === '') return undefined;
    const n = Number.parseInt(String(raw), 10);
    return Number.isFinite(n) ? n : undefined;
};
/** Parse the <meta> child of a newsletter <message> stanza (admin profile, AI / paid-partnership labels, edit times). */
export const extractNewsletterMessageMeta = (stanza) => {
    const meta = getBinaryNodeChild(stanza, 'meta');
    if (!meta) return undefined;
    const result = {};
    const adminProfile = getBinaryNodeChild(meta, 'admin_profile');
    if (adminProfile) {
        const name = getBinaryNodeChild(adminProfile, 'name');
        const picture = getBinaryNodeChild(adminProfile, 'picture');
        const content = name?.content;
        result.adminProfile = {
            id: adminProfile.attrs?.id,
            name: typeof content === 'string' ? content : content instanceof Uint8Array ? Buffer.from(content).toString('utf-8') : undefined,
            pictureId: picture?.attrs?.id,
            pictureDirectPath: picture?.attrs?.direct_path,
        };
    }
    if (getBinaryNodeChild(meta, 'paid_partnership')) result.paidPartnership = true;
    if (getBinaryNodeChild(meta, 'ai_content')) result.aiContent = true;
    const editTimestamp = readInt(meta.attrs, 'msg_edit_t');
    if (editTimestamp !== undefined) result.editTimestamp = editTimestamp;
    const originalTimestamp = readInt(meta.attrs, 'original_msg_t');
    if (originalTimestamp !== undefined) result.originalTimestamp = originalTimestamp;
    return Object.keys(result).length ? result : undefined;
};
const decodePlaintext = (node) => {
    if (!node?.content) return undefined;
    const buf = typeof node.content === 'string' ? Buffer.from(node.content, 'binary') : Buffer.from(node.content);
    return proto.Message.decode(buf).toJSON();
};
const decodeMessageNodes = (parent, newsletterJid, logger) => {
    const out = [];
    for (const child of getBinaryNodeChildren(parent, 'message')) {
        const plaintext = getBinaryNodeChild(child, 'plaintext');
        if (!plaintext?.content) continue;
        try {
            const full = proto.WebMessageInfo.fromObject({
                key: { remoteJid: newsletterJid, id: child.attrs.id || child.attrs.server_id, fromMe: child.attrs.is_sender === 'true' },
                message: decodePlaintext(plaintext),
                messageTimestamp: child.attrs.t ? +child.attrs.t : undefined,
            }).toJSON();
            if (child.attrs.server_id) full.key.server_id = child.attrs.server_id;
            const meta = extractNewsletterMessageMeta(child);
            if (meta) {
                full.newsletterMeta = meta;
                if (meta.adminProfile?.name) full.pushName = meta.adminProfile.name;
            }
            out.push(full);
        } catch (error) {
            logger?.error?.({ error }, 'Failed to decode newsletter message');
        }
    }
    return out;
};

/**
 * @param {{ query: Function, generateMessageTag: Function }} sock
 * @returns {Record<string, Function>} methods to spread into the socket
 */
export const makeNewsletterExtMethods = (sock) => {
    const { query, generateMessageTag, logger } = sock;
    const nl = (to, type, content) => query({ tag: 'iq', attrs: { id: generateMessageTag(), type, xmlns: 'newsletter', to }, content });
    const fetchMyAddOns = async (options, type) => {
        const attrs = { limit: String(options.limit ?? 100) };
        if (type) attrs.type = type;
        if (options.jid) attrs.jid = options.jid;
        const result = await nl(S_WHATSAPP_NET, 'get', [{ tag: 'my_addons', attrs, content: undefined }]);
        const addOns = getBinaryNodeChild(result, 'my_addons');
        if (!addOns) return [];
        return getBinaryNodeChildren(addOns, 'messages').map((group) => ({
            jid: group.attrs?.jid,
            messages: getBinaryNodeChildren(group, 'message').map((entry) => {
                const reaction = getBinaryNodeChild(entry, 'reaction');
                const votes = getBinaryNodeChild(entry, 'votes');
                return {
                    serverId: entry.attrs?.server_id ? Number(entry.attrs.server_id) : undefined,
                    reaction: reaction ? { code: reaction.attrs?.code, t: reaction.attrs?.t ? Number(reaction.attrs.t) : undefined } : undefined,
                    pollVote: votes ? { t: votes.attrs?.t ? Number(votes.attrs.t) : undefined, hashes: getBinaryNodeChildren(votes, 'vote').map((v) => Buffer.from(v.content ?? []).toString('hex')) } : undefined,
                };
            }),
        }));
    };
    const mex = (variables, id, path) => genericExecuteWMexQuery(variables, id, path, query, generateMessageTag);
    const Q = EXT_QUERY_IDS;
    const base = (jid, extra = {}) => ({ newsletter_id: assertNewsletterJid(jid), ...extra });
    const labelOp = (id, path) => (jid, serverId, messageType = 'MESSAGE') =>
        mex(base(jid, { server_id: toNewsletterServerId(serverId), message_type: messageType }), id, path);

    return {
        newsletterUpdateUserSetting: async (jid, type, muted) => {
            const input = { newsletter_id: assertNewsletterJid(jid), type: type === 'FOLLOWER_NOTIFICATIONS' ? 'MUTE_FOLLOWER_ACTIVITY' : 'MUTE_ADMIN_ACTIVITY', value: muted ? 'ON' : 'OFF' };
            const r = await mex({ input }, Q.UPDATE_USER_SETTING, 'xwa2_newsletter_update_user_setting');
            return r;
        },
        newsletterAdminCapabilities: async (jid) => (await mex(base(jid), Q.ADMIN_CAPABILITIES, 'xwa2_newsletter_admin_capabilities'))?.capabilities ?? [],
        newsletterEnforcements: (jid, locale = 'en_US') => mex(base(jid, { locale }), Q.ENFORCEMENTS, 'xwa2_channel_enforcements'),
        newsletterReports: async (locale = 'en_US') => (await mex({ locale }, Q.CHANNEL_REPORTS, 'xwa2_channels_reports'))?.channels_reports ?? [],
        newsletterAppealReport: (reportId, reason) => mex({ report_id: String(reportId), reason }, Q.CREATE_REPORT_APPEAL, 'xwa2_create_channel_report_appeal_v2'),
        newsletterPollVoters: (jid, serverId, options = {}) => mex({ input: { newsletter_id: assertNewsletterJid(jid), server_id: toNewsletterServerId(serverId), limit: options.limit ?? 100, vote_hash: options.voteHash } }, Q.POLL_VOTERS, 'voter_list'),
        newsletterReactionSenders: (jid, serverId) => mex({ input: { id: assertNewsletterJid(jid), server_id: toNewsletterServerId(serverId) } }, Q.REACTION_SENDER_LIST, 'xwa2_newsletters_reaction_sender_list'),
        newsletterPinMessages: (jid, serverIds) => mex(base(jid, { input: { message_ids: toNewsletterServerIds(serverIds) } }), Q.PIN_MESSAGES, 'xwa2_newsletter_pin_messages'),
        newsletterUnpinMessages: (jid, serverIds) => mex(base(jid, { input: { message_ids: toNewsletterServerIds(serverIds) } }), Q.UNPIN_MESSAGES, 'xwa2_newsletter_unpin_messages'),
        newsletterLabelAiContent: labelOp(Q.LABEL_AI_CONTENT, 'xwa2_newsletter_label_ai_content'),
        newsletterLabelPaidPartnership: labelOp(Q.PAID_PARTNERSHIP_LABEL, 'xwa2_newsletter_label_paid_partnership'),
        newsletterCreateAdminInvite: (jid, userJid) => mex(base(jid, { user_id: userJid }), Q.CREATE_ADMIN_INVITE, 'xwa2_newsletter_admin_invite_create'),
        newsletterRevokeAdminInvite: (jid, userJid) => mex(base(jid, { user_id: userJid }), Q.REVOKE_ADMIN_INVITE, 'xwa2_newsletter_admin_invite_revoke'),
        newsletterAcceptAdminInvite: (jid) => mex(base(jid), Q.ACCEPT_ADMIN_INVITE, 'xwa2_newsletter_admin_invite_accept'),
        newsletterDirectoryList: (o = {}) => mex({ fetch_status_metadata: o.fetchStatusMetadata ?? false, input: { view: o.view ?? 'RECOMMENDED', filters: { country_codes: o.countryCodes ?? [], categories: o.categories ?? [] }, limit: o.limit ?? 20, start_cursor: o.cursorToken } }, Q.DIRECTORY_LIST, 'xwa2_newsletters_directory_list'),
        newsletterDirectorySearch: (text, o = {}) => mex({ fetch_status_metadata: o.fetchStatusMetadata ?? false, input: { search_text: text, categories: o.categories ?? [], limit: o.limit ?? 20, start_cursor: o.cursorToken } }, Q.DIRECTORY_SEARCH, 'xwa2_newsletters_directory_search'),
        newsletterDirectoryCategories: (o = {}) => mex({ fetch_status_metadata: o.fetchStatusMetadata ?? false, input: { categories: o.categories ?? [], country_code: o.countryCode || undefined, per_category_limit: o.perCategoryLimit ?? 10 } }, Q.DIRECTORY_CATEGORIES, 'xwa2_newsletters_directory_category_preview'),
        newsletterInsights: (jid, o = {}) => mex({ input: { newsletter_id: assertNewsletterJid(jid), metrics: o.metrics ?? ['NET_FOLLOWS', 'UNFOLLOWS'] } }, Q.INSIGHTS, 'xwa2_newsletter_admin_insights'),
        newsletterFollowers: (jid, o = {}) => mex({ input: { newsletter_id: assertNewsletterJid(jid), count: o.count ?? 100 } }, Q.FOLLOWERS, 'xwa2_newsletter_followers'),
        newsletterQuestionResponseState: (jid, serverId, responseServerId, state) => mex(base(jid, { server_id: toNewsletterServerId(serverId), response_server_id: toNewsletterServerId(responseServerId), state }), Q.QUESTION_RESPONSE_STATE, 'xwa2_newsletter_question_response_state_update'),
        newsletterRecommended: (o = {}) => mex({ fetch_status_metadata: o.fetchStatusMetadata ?? false, input: { limit: o.limit ?? 20, country_codes: o.countryCodes ?? [] } }, Q.RECOMMENDED, 'xwa2_newsletters_recommended'),
        newsletterSimilar: (jid, o = {}) => mex({ fetch_status_metadata: o.fetchStatusMetadata ?? false, input: { newsletter_id: assertNewsletterJid(jid), limit: o.limit ?? 20, country_codes: o.countryCodes ?? [] } }, Q.SIMILAR, 'xwa2_newsletters_similar'),
        // ── binary newsletter ops (iq xmlns=newsletter) ──────────────────────────────
        /** Messages edited/updated since a timestamp or before/after a server id. */
        newsletterFetchMessageUpdates: async (jid, options = {}) => {
            assertNewsletterJid(jid);
            const { count = 20, since, before, after } = options;
            const attrs = { count: String(count) };
            if (since !== undefined) attrs.since = String(since);
            if (before !== undefined) attrs.before = String(before);
            else if (after !== undefined) attrs.after = String(after);
            const result = await nl(jid, 'get', [{ tag: 'message_updates', attrs, content: undefined }]);
            const updates = getBinaryNodeChild(result, 'message_updates');
            const messages = updates && getBinaryNodeChild(updates, 'messages');
            return { jid: messages?.attrs?.jid ?? jid, messages: messages ? decodeMessageNodes(messages, messages.attrs?.jid ?? jid, logger) : [] };
        },
        /** Responses to a channel "question" message. `filter`: e.g. 'replied' | 'starred' (server-defined). */
        newsletterQuestionResponses: async (jid, serverId, options = {}) => {
            assertNewsletterJid(jid);
            const id = toNewsletterServerId(serverId);
            const { count = 20, before, filter, searchText } = options;
            const attrs = { server_id: id, count: String(count) };
            if (before !== undefined) attrs.before = String(before);
            const content = [];
            if (filter) content.push({ tag: 'filters', attrs: {}, content: [{ tag: filter, attrs: {}, content: undefined }] });
            if (searchText) content.push({ tag: 'search', attrs: { text: searchText }, content: undefined });
            const result = await nl(jid, 'get', [{ tag: 'question_responses', attrs, content: content.length ? content : undefined }]);
            const responses = getBinaryNodeChild(result, 'question_responses');
            if (!responses) return { jid, serverId: Number(id), responses: [] };
            return {
                jid: result.attrs?.from ?? jid,
                serverId: responses.attrs?.server_id ? Number(responses.attrs.server_id) : Number(id),
                responses: getBinaryNodeChildren(responses, 'question_response').map((entry) => {
                    const messageNode = getBinaryNodeChild(entry, 'message');
                    const sender = getBinaryNodeChild(entry, 'sender');
                    const picture = sender && getBinaryNodeChild(sender, 'picture');
                    const flags = getBinaryNodeChild(entry, 'flags');
                    const plaintext = messageNode && getBinaryNodeChild(messageNode, 'plaintext');
                    return {
                        id: messageNode?.attrs?.id,
                        t: messageNode?.attrs?.t ? Number(messageNode.attrs.t) : undefined,
                        isSender: messageNode?.attrs?.is_sender === 'true',
                        responseServerId: messageNode?.attrs?.response_server_id,
                        sender: { lid: sender?.attrs?.lid, notifyName: sender?.attrs?.notify_name, pictureDirectPath: picture?.attrs?.direct_path },
                        replied: flags ? !!getBinaryNodeChild(flags, 'replied') : false,
                        starred: flags ? !!getBinaryNodeChild(flags, 'starred') : false,
                        message: decodePlaintext(plaintext),
                    };
                }),
            };
        },
        /** My own reactions / poll votes across channels ({ limit, jid }). */
        newsletterMyAddOns: (options = {}) => fetchMyAddOns(options, undefined),
        /** Same, restricted to channel status updates. */
        newsletterStatusMyAddOns: (options = {}) => fetchMyAddOns(options, 'status'),
        /** Vote on a channel poll: `options` = option name(s); each is sent as its sha256 hash. */
        newsletterSendPollVote: async (jid, parentServerId, options) => {
            const names = Array.isArray(options) ? options : [options];
            const votes = names.map((name) => ({ tag: 'vote', attrs: {}, content: createHash('sha256').update(String(name), 'utf-8').digest() }));
            const id = generateMessageTag();
            await query({ tag: 'message', attrs: { to: assertNewsletterJid(jid), id, type: 'poll', server_id: toNewsletterServerId(parentServerId) }, content: [{ tag: 'meta', attrs: { polltype: 'vote' } }, { tag: 'votes', attrs: {}, content: votes }] });
            return { id };
        },
        newsletterUpdateReactions: async (jid, setting) => {
            const s = String(setting || '').toUpperCase();
            if (!REACTION_SETTINGS.has(s)) throw new TypeError(`reaction setting must be one of ${[...REACTION_SETTINGS].join(', ')}`);
            return mex({ newsletter_id: assertNewsletterJid(jid), updates: { settings: { reaction_codes: { value: s } } } }, '24250201037901610', 'xwa2_newsletter_update');
        },

        // ── profile: text status / about ─────────────────────────────────────────────
        updateTextStatus: (text, o = {}) => {
            const input = { text: text === '' ? null : text ?? null, ephemeral_duration_sec: o.ephemeralDurationSec ?? 0 };
            if (o.emoji) input.emoji = { content: o.emoji };
            return mex({ input }, Q.UPDATE_TEXT_STATUS, 'xwa2_update_text_status');
        },
        fetchTextStatus: (jids) => mex({ input: (Array.isArray(jids) ? jids : [jids]).map((jid) => ({ jid: jidNormalizedUser(jid) })) }, Q.TEXT_STATUS_LIST, 'xwa2_text_status_list'),
        fetchAbout: async (jid) => {
            const { user } = jidDecode(jidNormalizedUser(jid)) || {};
            if (!user) throw new Boom('Invalid user jid', { statusCode: 400 });
            const response = await mex({ user: { user_id: user } }, Q.ABOUT_STATUS, 'xwa2_users_updates_since');
            const updates = Array.isArray(response) ? response[0]?.updates : undefined;
            return { jid: jidNormalizedUser(jid), status: updates?.[0]?.text ?? null, response };
        },
    };
};
