import { Mutex } from 'async-mutex';
import { mkdir, readFile, readdir, stat, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { proto } from '../../WAProto/index.js';
import { initAuthCreds } from './auth-utils.js';
import { BufferJSON } from './generics.js';
// We need to lock files due to the fact that we are using async functions to read and write files
// https://github.com/WhiskeySockets/Baileys/issues/794
// https://github.com/nodejs/node/issues/26338
// Use a Map to store mutexes for each file path
const fileLocks = new Map();
// Get or create a mutex for a specific file path
const getFileLock = (path) => {
    let mutex = fileLocks.get(path);
    if (!mutex) {
        mutex = new Mutex();
        fileLocks.set(path, mutex);
    }
    return mutex;
};
// Vanz@Fix 25-08-26 (ENOSPC guard) --- useMultiFileAuthState writes one small file PER key id
// (session-*, sender-key-*, sender-key-memory-*, pre-key-*, app-state-sync-key-*, ...) and never
// prunes any of them on its own. Over months of uptime — especially in busy groups, where a
// sender-key-memory file is created per (group, participant) pair — this silently accumulates into
// hundreds of thousands of tiny files. That can hit the filesystem's inode/file-count ceiling and
// start throwing ENOSPC on writes long before disk *space* usage looks anywhere near full (a
// classic symptom: panel shows plenty of free MiB/GiB, but writes still fail with ENOSPC). When
// that happens mid-session, auth writes (including the app-state-sync key from the "App state key
// not present!" issue) fail silently and never actually persist.
//
// `sender-key-memory-*` entries are pure dedup/anti-replay cache — safe to delete anytime; Baileys
// regenerates them on demand with zero functional loss (worst case: one redundant re-decrypt). They
// also tend to be the single biggest contributor to file count in active groups, so they're the
// safest and highest-impact thing to prune automatically. Everything else (creds, real sessions,
// pre-keys, app-state-sync-keys) is left completely untouched — this never touches those.
export const pruneStaleAuthFiles = async (folder, { maxAgeDays = 14, categories = ['sender-key-memory'], dryRun = false } = {}) => {
    let entries;
    try {
        entries = await readdir(folder);
    }
    catch {
        return { scanned: 0, removed: 0 };
    }
    const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;
    let scanned = 0;
    let removed = 0;
    await Promise.all(entries.map(async (name) => {
        if (!categories.some((cat) => name.startsWith(`${cat}-`) && name.endsWith('.json'))) return;
        scanned++;
        const filePath = join(folder, name);
        try {
            const info = await stat(filePath);
            if (info.mtimeMs < cutoff) {
                if (!dryRun) await unlink(filePath).catch(() => { });
                removed++;
            }
        }
        catch {
            // file vanished between readdir and stat — fine, nothing to prune
        }
    }));
    return { scanned, removed };
};
/**
 * stores the full authentication state in a single folder.
 * Far more efficient than singlefileauthstate
 *
 * Again, I wouldn't endorse this for any production level use other than perhaps a bot.
 * Would recommend writing an auth state for use with a proper SQL or No-SQL DB
 * */
export const useMultiFileAuthState = async (folder) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const writeData = async (data, file) => {
        const filePath = join(folder, fixFileName(file));
        const mutex = getFileLock(filePath);
        return mutex.acquire().then(async (release) => {
            try {
                await writeFile(filePath, JSON.stringify(data, BufferJSON.replacer));
            }
            finally {
                release();
            }
        });
    };
    const readData = async (file) => {
        try {
            const filePath = join(folder, fixFileName(file));
            const mutex = getFileLock(filePath);
            return await mutex.acquire().then(async (release) => {
                try {
                    const data = await readFile(filePath, { encoding: 'utf-8' });
                    return JSON.parse(data, BufferJSON.reviver);
                }
                finally {
                    release();
                }
            });
        }
        catch (error) {
            return null;
        }
    };
    const removeData = async (file) => {
        try {
            const filePath = join(folder, fixFileName(file));
            const mutex = getFileLock(filePath);
            return mutex.acquire().then(async (release) => {
                try {
                    await unlink(filePath);
                }
                catch {
                }
                finally {
                    release();
                }
            });
        }
        catch { }
    };
    const folderInfo = await stat(folder).catch(() => { });
    if (folderInfo) {
        if (!folderInfo.isDirectory()) {
            throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`);
        }
    }
    else {
        await mkdir(folder, { recursive: true });
    }
    // Vanz@Fix 25-08-26 (ENOSPC guard) --- best-effort prune on every startup. Failures here must
    // never block auth from loading, so this is intentionally fire-and-forget with its own catch.
    pruneStaleAuthFiles(folder).catch(() => { });
    const fixFileName = (file) => file?.replace(/\//g, '__')?.replace(/:/g, '-');
    const creds = (await readData('creds.json')) || initAuthCreds();
    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(ids.map(async (id) => {
                        let value = await readData(`${type}-${id}.json`);
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
                            const file = `${category}-${id}.json`;
                            tasks.push(value ? writeData(value, file) : removeData(file));
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: async () => {
            return writeData(creds, 'creds.json');
        }
    };
};
//# sourceMappingURL=use-multi-file-auth-state.js.map