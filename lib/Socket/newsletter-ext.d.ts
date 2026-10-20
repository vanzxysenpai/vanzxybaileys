export const EXT_QUERY_IDS: Readonly<{
    UPDATE_USER_SETTING: "31938993655691868";
    ADMIN_CAPABILITIES: "9801384413216421";
    ENFORCEMENTS: "27835373536068060";
    CHANNEL_REPORTS: "35936238352686172";
    CREATE_REPORT_APPEAL: "27103316329328467";
    POLL_VOTERS: "9407762219322536";
    REACTION_SENDER_LIST: "29575462448733991";
    PIN_MESSAGES: "27165709459706559";
    UNPIN_MESSAGES: "28007176042216937";
    LABEL_AI_CONTENT: "27909718265289596";
    PAID_PARTNERSHIP_LABEL: "26102375079404865";
    CREATE_ADMIN_INVITE: "9387141988078609";
    REVOKE_ADMIN_INVITE: "9656078347839416";
    ACCEPT_ADMIN_INVITE: "9580828702035549";
    DIRECTORY_LIST: "26125047313831973";
    DIRECTORY_SEARCH: "26301059626252132";
    DIRECTORY_CATEGORIES: "35266481849605779";
    INSIGHTS: "9853618868050977";
    FOLLOWERS: "27472091235714801";
    QUESTION_RESPONSE_STATE: "24636260219323456";
    RECOMMENDED: "25806748772361516";
    SIMILAR: "26217043484590756";
    UPDATE_TEXT_STATUS: "9152604461510864";
    TEXT_STATUS_LIST: "24072923595647473";
    ABOUT_STATUS: "24535500086059408";
}>;
export const NEWSLETTER_SERVER_ID_MIN: 99;
export const NEWSLETTER_SERVER_ID_MAX: 2147476647;
export function toNewsletterServerId(value: any, label: any): string;
export function toNewsletterServerIds(serverIds: any): string[];
export function extractNewsletterMessageMeta(stanza: any): {
    adminProfile: {
        id: any;
        name: any;
        pictureId: any;
        pictureDirectPath: any;
    };
    paidPartnership: boolean;
    aiContent: boolean;
    editTimestamp: number;
    originalTimestamp: number;
};
export function makeNewsletterExtMethods(sock: {
    query: Function;
    generateMessageTag: Function;
}): Record<string, Function>;
