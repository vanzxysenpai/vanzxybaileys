// Vanz@Add (v2.1.1) --- GraphQL doc-id fallback for the newsletter MEX ops.
//
// WhatsApp rotates persisted-query doc ids. This fork's ids match 10 of the 13 reference forks, but
// @rexxhayanasi/elaina-baileys ships *different* ids for 7 core ops (and 4 older forks use different
// FOLLOW/UNFOLLOW ids). Nobody can tell offline which are current, so instead of guessing we try the
// primary id first and fall back to the known alternates ONLY when it is safe:
//   - read-only ops (metadata / subscribed / admin count): fall back on any non-auth failure
//   - write ops (create / follow / unfollow / demote / change owner): fall back ONLY when the primary
//     failed with an error that says the *query* was rejected (persisted-query not found, unknown doc, ...)
//     — never after an ambiguous "unexpected response", because the write may have gone through.
// If every candidate fails, the FIRST (primary) error is thrown, so error behaviour is unchanged.
// A successful alternate is remembered for the life of the process. Override any id from config:
//   makeWASocket({ newsletterQueryIds: { METADATA: '1234567890' } })
import { QueryIds } from '../Types/index.js';
import { executeWMexQuery as genericExecuteWMexQuery } from './mex.js';

/** op name -> { alternates, readOnly, extraVariables (added only when an alternate id is used) } */
export const NEWSLETTER_ID_ALTERNATES = Object.freeze({
    METADATA: { alternates: ['27456920720571478'], readOnly: true, extraVariables: { fetch_pinned_messages: false, fetch_status_metadata: false, fetch_wamo_sub: false } },
    SUBSCRIBED: { alternates: ['25399611239711790'], readOnly: true },
    ADMIN_COUNT: { alternates: ['26278439461859188'], readOnly: true },
    CREATE: { alternates: ['25149874324715067'], readOnly: false },
    CHANGE_OWNER: { alternates: ['9546742745432473'], readOnly: false },
    DEMOTE: { alternates: ['9880997548630971'], readOnly: false },
    FOLLOW: { alternates: ['7871414976211147'], readOnly: false },
    UNFOLLOW: { alternates: ['7238632346214362'], readOnly: false },
});

const STALE_QUERY_RE = /persisted|not[ _-]?found|unknown (query|doc|operation)|doc[_ -]?id|invalid (query|document|operation)|no such (query|operation)|unsupported (query|operation)|deprecated/i;
const AUTH_CODES = new Set([401, 403, 419]);

const errorText = (e) => [e?.message, e?.data?.message, e?.data?.extensions?.error_code, e?.data?.extensions?.severity, JSON.stringify(e?.data?.attrs ?? '')].filter(Boolean).join(' ');
export const isStaleQueryError = (e) => STALE_QUERY_RE.test(errorText(e));

/**
 * @param {{ query: Function, generateMessageTag: Function, logger?: any, overrides?: Record<string,string> }} o
 * @returns {{ executeWMexQuery: Function, probeQueryIds: Function, preferred: Map<string,string> }}
 */
export const makeMexWithFallback = ({ query, generateMessageTag, logger, overrides = {} }) => {
    const nameById = new Map(Object.entries(QueryIds).map(([name, id]) => [String(id), name]));
    const preferred = new Map(); // primary id -> id that last worked
    const raw = (variables, id, path) => genericExecuteWMexQuery(variables, id, path, query, generateMessageTag);

    const candidatesFor = (id) => {
        const name = nameById.get(String(id));
        const spec = name ? NEWSLETTER_ID_ALTERNATES[name] : undefined;
        const list = [];
        if (name && overrides[name]) list.push(String(overrides[name]));
        if (preferred.has(String(id))) list.push(preferred.get(String(id)));
        list.push(String(id));
        if (spec) list.push(...spec.alternates);
        return { name, spec, list: [...new Set(list)] };
    };

    const executeWMexQuery = async (variables, queryId, dataPath) => {
        const { name, spec, list } = candidatesFor(queryId);
        if (list.length === 1) return raw(variables, list[0], dataPath);
        let firstError;
        for (let i = 0; i < list.length; i++) {
            const id = list[i];
            const vars = spec?.extraVariables && id !== String(queryId) ? { ...spec.extraVariables, ...variables } : variables;
            try {
                const res = await raw(vars, id, dataPath);
                if (id !== String(queryId) && preferred.get(String(queryId)) !== id) {
                    preferred.set(String(queryId), id);
                    logger?.info?.({ op: name, primary: queryId, using: id }, 'newsletter mex: primary doc id failed, alternate id worked (remembered for this process)');
                }
                return res;
            } catch (e) {
                firstError ??= e;
                const status = e?.output?.statusCode ?? e?.data?.statusCode;
                const retry = i < list.length - 1 && !AUTH_CODES.has(status) && (spec?.readOnly || isStaleQueryError(e));
                if (!retry) throw firstError;
                logger?.debug?.({ op: name, id, err: e?.message }, 'newsletter mex: trying next candidate doc id');
            }
        }
        throw firstError;
    };

    /**
     * Diagnostic: run each READ-ONLY op against every candidate id and report which respond.
     * @param {string} [jid] a newsletter jid you can read (enables METADATA / ADMIN_COUNT)
     * @returns {Promise<Record<string, Array<{ id: string, primary: boolean, ok: boolean, error?: string }>>>}
     */
    const probeQueryIds = async (jid) => {
        const inputFor = {
            SUBSCRIBED: [{}, 'xwa2_newsletter_subscribed'],
            ADMIN_COUNT: jid ? [{ newsletter_id: jid }, 'xwa2_newsletter_admin_count'] : null,
            METADATA: jid ? [{ fetch_creation_time: true, fetch_full_image: true, fetch_viewer_metadata: true, input: { key: jid, type: 'JID' } }, 'xwa2_newsletter'] : null,
        };
        const report = {};
        for (const [name, spec] of Object.entries(NEWSLETTER_ID_ALTERNATES)) {
            if (!spec.readOnly || !inputFor[name]) continue;
            const [vars, path] = inputFor[name];
            report[name] = [];
            for (const id of [String(QueryIds[name]), ...spec.alternates]) {
                const isPrimary = id === String(QueryIds[name]);
                try {
                    await raw(spec.extraVariables && !isPrimary ? { ...spec.extraVariables, ...vars } : vars, id, path);
                    report[name].push({ id, primary: isPrimary, ok: true });
                } catch (e) {
                    report[name].push({ id, primary: isPrimary, ok: false, error: String(e?.message ?? e).slice(0, 160) });
                }
            }
        }
        return report;
    };

    return { executeWMexQuery, probeQueryIds, preferred };
};
