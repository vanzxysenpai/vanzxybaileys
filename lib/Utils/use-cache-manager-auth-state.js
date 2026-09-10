// Ported from @queenanya/baileys `addons/use-cache-manager-auth-state.ts`
// (that fork credits it to `@innovatorssoft/baileys` make-cache-manager-store.js).
// Adjustments for @vanzxy/baileys: import paths rewired to this fork's
// Utils layout (auth-utils.js / generics.js), otherwise logic-for-logic
// identical to the original — including the 2-year TTL on `creds` and the
// `sessionKey*` wildcard sweep in `clearState()`.
//
// Store interface required (matches any cache-manager v5-compatible store,
// e.g. Redis/Memcached/keyv, or this fork's own @cacheable/node-cache dep):
//   store.get(key)              -> string | undefined | null
//   store.set(key, value, ttl?) -> void
//   store.del(key)              -> void
//   store.keys(pattern?)        -> string[]   (used by clearState() for the wildcard sweep)
import { proto } from '../../WAProto/index.js';
import { initAuthCreds } from './auth-utils.js';
import { BufferJSON } from './generics.js';

export const useCacheManagerAuthState = async (store, sessionKey) => {
    const defaultKey = (file) => `${sessionKey}:${file}`;
    const writeData = async (file, data) => {
        const ttl = file === 'creds' ? 63115200 : undefined; // 2 years for creds
        await store.set(defaultKey(file), JSON.stringify(data, BufferJSON.replacer), ttl);
    };
    const readData = async (file) => {
        try {
            const data = await store.get(defaultKey(file));
            return data !== null && data !== undefined ? JSON.parse(data, BufferJSON.reviver) : null;
        }
        catch {
            return null;
        }
    };
    const removeData = async (file) => {
        try {
            await store.del(defaultKey(file));
        }
        catch {
            console.error(`[useCacheManagerAuthState] Error removing ${file} from session ${sessionKey}`);
        }
    };
    const clearState = async () => {
        try {
            const keys = await store.keys(`${sessionKey}*`);
            await Promise.all(keys.map((key) => store.del(key)));
        }
        catch {
            // best-effort — not every store backend supports pattern listing
        }
    };
    const creds = (await readData('creds')) || initAuthCreds();
    return {
        clearState,
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(ids.map(async (id) => {
                        let value = await readData(`${type}-${id}`);
                        if (type === 'app-state-sync-key' && value) {
                            value = proto.Message.AppStateSyncKeyData.fromObject(value);
                        }
                        data[id] = value;
                    }));
                    return data;
                },
                set: async (data) => {
                    const tasks = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const key = `${category}-${id}`;
                            tasks.push(value ? writeData(key, value) : removeData(key));
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: () => writeData('creds', creds)
    };
};
