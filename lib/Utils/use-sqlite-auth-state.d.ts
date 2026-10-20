export function useSqliteAuthState(opts: any): Promise<{
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<{}>;
            set: (data: any) => Promise<void>;
            list(type: any): AsyncGenerator<any[], void, unknown>;
            listIds(type: any): AsyncGenerator<any, void, unknown>;
        };
    };
    saveCreds: () => Promise<void>;
    close: () => Promise<void>;
}>;
