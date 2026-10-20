export function pruneStaleAuthFiles(folder: any, opts1?: { [key: string]: any; 
    maxAgeDays?: number;
    categories?: string[];
    dryRun?: boolean;
}): Promise<{
    scanned: number;
    removed: number;
}>;
export function useMultiFileAuthState(folder: any): Promise<{
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<{}>;
            set: (data: any) => Promise<void>;
            list(type: any): AsyncGenerator<any[], void, unknown>;
            listIds(type: any): AsyncGenerator<any, void, unknown>;
        };
    };
    saveCreds: () => Promise<any>;
}>;
