export function useCacheManagerAuthState(store: any, sessionKey: any): Promise<{
    clearState: () => Promise<void>;
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<{}>;
            set: (data: any) => Promise<void>;
        };
    };
    saveCreds: () => Promise<void>;
}>;
export function makeCacheManagerAuthState(store: any, sessionKey: any): Promise<{
    clearState: () => Promise<void>;
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<{}>;
            set: (data: any) => Promise<void>;
        };
    };
    saveCreds: () => Promise<void>;
}>;
