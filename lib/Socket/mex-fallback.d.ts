/** op name -> { alternates, readOnly, extraVariables (added only when an alternate id is used) } */
export const NEWSLETTER_ID_ALTERNATES: Readonly<{
    METADATA: {
        alternates: string[];
        readOnly: boolean;
        extraVariables: {
            fetch_pinned_messages: boolean;
            fetch_status_metadata: boolean;
            fetch_wamo_sub: boolean;
        };
    };
    SUBSCRIBED: {
        alternates: string[];
        readOnly: boolean;
    };
    ADMIN_COUNT: {
        alternates: string[];
        readOnly: boolean;
    };
    CREATE: {
        alternates: string[];
        readOnly: boolean;
    };
    CHANGE_OWNER: {
        alternates: string[];
        readOnly: boolean;
    };
    DEMOTE: {
        alternates: string[];
        readOnly: boolean;
    };
    FOLLOW: {
        alternates: string[];
        readOnly: boolean;
    };
    UNFOLLOW: {
        alternates: string[];
        readOnly: boolean;
    };
}>;
export function isStaleQueryError(e: any): boolean;
export function makeMexWithFallback(opts1: { [key: string]: any; 
    query: Function;
    generateMessageTag: Function;
    logger?: any;
    overrides?: Record<string, string>;
}): {
    executeWMexQuery: Function;
    probeQueryIds: Function;
    preferred: Map<string, string>;
};
