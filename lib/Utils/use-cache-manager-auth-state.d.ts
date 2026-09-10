import type { AuthenticationState } from '../Types/index.js';
/** Minimal interface compatible with any cache-manager v5 store (Redis, Memcached, keyv, @cacheable/node-cache, etc). */
export type CacheManagerStore = {
    set(key: string, value: string, ttl?: number): Promise<void>;
    get(key: string): Promise<string | undefined | null>;
    del(key: string): Promise<void>;
    keys(pattern?: string): Promise<string[]>;
};
export declare const useCacheManagerAuthState: (store: CacheManagerStore, sessionKey: string) => Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
    clearState: () => Promise<void>;
}>;
