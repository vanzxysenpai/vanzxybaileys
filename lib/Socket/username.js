import { USyncQuery, USyncUser } from '../WAUSync/index.js';
import { makeCommunitiesSocket } from './communities.js';
import { executeWMexQuery } from './mex.js';

// Vanz@Port (from @queenanya/baileys, originally @innovatorssoft/baileys) ---
// WhatsApp Username socket layer: check, set, pin, find, and recommend usernames.
// Query IDs below are captured from live WA Web sessions and may rotate with
// WA updates — re-capture via the proto-extract tool if a call starts failing
// with an "unexpected response structure" Boom.
export const USERNAME_QUERY_IDS = {
    CHECK: '26124072630599520', // UsernameCheck
    CHECK_MULTI: '27134626522840290', // UsernameCheckMulti
    SET: '27108705368767936', // UsernameSet
    GET: '32618050064506056', // UsernameGet
    GET_RECOMMENDATIONS: '26077456248616956', // UsernameGetRecommendationsQuery
    PIN_SET: '25529696019976770' // UsernamePinSet
};

export const USERNAME_CHECK_RESULT = {
    SUCCESS: 'SUCCESS',
    INVALID: 'INVALID'
};

export const USERNAME_SOURCE = {
    FB: 'FB',
    IG: 'IG',
    USER_INPUT: 'USER_INPUT',
    SUGGESTION: 'SUGGESTION'
};

export const makeUsernameSocket = (config) => {
    const sock = makeCommunitiesSocket(config);
    const { query, generateMessageTag, executeUSyncQuery } = sock;

    /** Internal helper — wraps executeWMexQuery with this socket's query/tag */
    const mexQuery = (variables, queryId, dataPath) => executeWMexQuery(variables, queryId, dataPath, query, generateMessageTag);

    // 1. Check username availability
    const checkUsername = async (username, includeSuggestions = true) => {
        if (!USERNAME_QUERY_IDS.CHECK) {
            throw new Error('Username CHECK query_id not configured — capture a live WA session to obtain it');
        }
        const data = await mexQuery({ username, include_suggestions: includeSuggestions }, USERNAME_QUERY_IDS.CHECK, 'xwa2_username_check');
        if (data?.result === USERNAME_CHECK_RESULT.SUCCESS) {
            return { available: true, username };
        }
        return {
            available: false,
            username,
            suggestions: data?.suggestions ?? [],
            rejectionReasons: data?.rejection_reasons ?? [],
            suggestionsEligible: data?.suggestions_eligible ?? true
        };
    };

    // 2. Check multiple usernames at once
    const checkUsernameMulti = async (usernames) => {
        if (!USERNAME_QUERY_IDS.CHECK_MULTI) {
            throw new Error('Username CHECK_MULTI query_id not configured');
        }
        return mexQuery({ usernames }, USERNAME_QUERY_IDS.CHECK_MULTI, 'xwa2_username_check_multi');
    };

    // 3. Set username
    const setUsername = async (username, options = {}) => {
        if (!USERNAME_QUERY_IDS.SET) {
            throw new Error('Username SET query_id not configured — capture a live WA session to obtain it');
        }
        const { source = USERNAME_SOURCE.USER_INPUT, sessionId, pin } = options;
        const variables = {
            username,
            reserved: false,
            source,
            ...(sessionId ? { session_id: sessionId } : {}),
            ...(pin ? { pin } : {})
        };
        return mexQuery(variables, USERNAME_QUERY_IDS.SET, 'xwa2_username_set');
    };

    // 4. Delete / unset username
    const deleteUsername = async () => {
        if (!USERNAME_QUERY_IDS.SET) {
            throw new Error('Username SET query_id not configured — capture a live WA session to obtain it');
        }
        return mexQuery({ username: null }, USERNAME_QUERY_IDS.SET, 'xwa2_username_delete');
    };

    // 5. Get own username
    const getMyUsername = async () => {
        if (!USERNAME_QUERY_IDS.GET) {
            throw new Error('Username GET query_id not configured — capture a live WA session to obtain it');
        }
        const data = await mexQuery({}, USERNAME_QUERY_IDS.GET, 'xwa2_username_get');
        return data?.username ?? null;
    };

    // 6. Pin/unpin username (requires PIN)
    const setUsernamePin = async (pin) => {
        if (!USERNAME_QUERY_IDS.PIN_SET) {
            throw new Error('Username PIN_SET query_id not configured — capture a live WA session to obtain it');
        }
        return mexQuery({ pin }, USERNAME_QUERY_IDS.PIN_SET, 'xwa2_username_pin_set');
    };

    // 7. Find user by username (USync)
    const findUserByUsername = async (username, pin) => {
        const usyncQuery = new USyncQuery().withContactProtocol();
        const user = new USyncUser().withUsername(username);
        if (pin) user.withUsernameKey(pin);
        usyncQuery.withUser(user);
        const result = await executeUSyncQuery(usyncQuery);
        if (!result?.list?.length) return null;
        const entry = result.list[0];
        if (!entry) return null;
        return {
            jid: entry.id,
            contact: Boolean(entry.contact)
        };
    };

    // 8. Fetch usernames of known contacts (USync)
    const fetchContactUsernames = async (...jids) => {
        const usyncQuery = new USyncQuery().withUsernameProtocol();
        for (const jid of jids) {
            usyncQuery.withUser(new USyncUser().withId(jid));
        }
        const result = await executeUSyncQuery(usyncQuery);
        return result?.list ?? [];
    };

    // 9. Get username recommendations
    const getUsernameRecommendations = async (source = null) => {
        const variables = {};
        if (source) variables.source = source;
        return mexQuery(variables, USERNAME_QUERY_IDS.GET_RECOMMENDATIONS, 'xwa2_username_get_recommendations');
    };

    return {
        ...sock,
        checkUsername,
        checkUsernameMulti,
        setUsername,
        deleteUsername,
        getMyUsername,
        setUsernamePin,
        findUserByUsername,
        fetchContactUsernames,
        getUsernameRecommendations,
        USERNAME_QUERY_IDS,
        USERNAME_CHECK_RESULT,
        USERNAME_SOURCE
    };
};
