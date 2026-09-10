import { mkdir, readFile, stat, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { proto } from '../../WAProto/index.js';
import { initAuthCreds } from './auth-utils.js';
import { BufferJSON } from './generics.js';
async function loadBetterSqlite3() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = (await import('better-sqlite3'));
        return mod.default ?? mod;
    }
    catch (err) {
        const helpful = new Error('`better-sqlite3` is required for `useSqliteAuthState`. Install it as a peer dependency: `npm install better-sqlite3` (or `yarn add better-sqlite3`).');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        helpful.cause = err;
        throw helpful;
    }
}
const CREDS_ROW_KEY = '__creds__';
const CREATE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS creds (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS signal_keys (
  type TEXT NOT NULL,
  id TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (type, id)
);
CREATE INDEX IF NOT EXISTS signal_keys_type_idx ON signal_keys(type);
`;
// Vanz@Add 29-08-26 --- Migration tracking, ported in spirit from zapo-js's
// wa_migrations pattern (packages/store-sqlite/src/migrations.ts). Each entry
// is `{ id, sql }`; applied migrations are recorded by id in `wa_migrations`
// so `db.exec(...)` schema changes are only ever run once per database file,
// letting future releases evolve the schema without a manual ALTER step from
// the user. Kept as an ordered array (not a folder of files) since the schema
// here is a single flat file, unlike zapo's per-domain migration modules.
const MIGRATIONS = [
    { id: '0001_init', sql: CREATE_SCHEMA_SQL }
];
function ensureMigrationsTable(db) {
    db.exec('CREATE TABLE IF NOT EXISTS wa_migrations (id TEXT PRIMARY KEY, applied_at INTEGER NOT NULL)');
}
function runMigrations(db) {
    ensureMigrationsTable(db);
    const applied = new Set(db.prepare('SELECT id FROM wa_migrations').all().map((r) => r.id));
    const insertMigration = db.prepare('INSERT INTO wa_migrations (id, applied_at) VALUES (?, ?)');
    for (const migration of MIGRATIONS) {
        if (applied.has(migration.id))
            continue;
        const tx = db.transaction(() => {
            db.exec(migration.sql);
            insertMigration.run(migration.id, Date.now());
        });
        tx();
    }
}
export async function useSqliteAuthState(opts) {
    let db;
    if (opts.database) {
        db = opts.database;
    }
    else {
        const Database = await loadBetterSqlite3();
        db = new Database(opts.dbPath);
    }
    // WAL mode allows concurrent reads alongside a single writer; matches
    // what SQLite recommends for read-heavy workloads with sporadic writes.
    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
    runMigrations(db);
    // Vanz@Fix (bug 8): periodic WAL checkpoint + cleanup old signal keys to prevent DB bloat.
    // Runs every 30 minutes. WAL checkpoint reclaims WAL file space; key cleanup removes stale session entries.
    const _walCleanupInterval = setInterval(() => {
        try {
            db.pragma('wal_checkpoint(PASSIVE)');
            // Remove signal keys older than 30 days (pre-keys, session keys that have expired)
            // Only removes types that are safe to prune (not creds or app-state-sync-key)
            const pruneTypes = ['pre-key', 'session'];
            for (const type of pruneTypes) {
                try {
                    // Keep last 500 per type to avoid breaking active sessions
                    db.prepare(`
                        DELETE FROM signal_keys WHERE type = ? AND id NOT IN (
                            SELECT id FROM signal_keys WHERE type = ? ORDER BY rowid DESC LIMIT 500
                        )
                    `).run(type, type);
                } catch { /* ignore per-type errors */ }
            }
        } catch { /* ignore checkpoint errors — non-fatal */ }
    }, 30 * 60 * 1000);
    // Allow Node process to exit even if interval is still running
    if (_walCleanupInterval.unref) _walCleanupInterval.unref();
    const stmts = {
        credsSelect: db.prepare('SELECT value FROM creds WHERE key = ?'),
        credsUpsert: db.prepare('INSERT INTO creds (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'),
        keySelect: db.prepare('SELECT value FROM signal_keys WHERE type = ? AND id = ?'),
        keyUpsert: db.prepare('INSERT INTO signal_keys (type, id, value) VALUES (?, ?, ?) ON CONFLICT(type, id) DO UPDATE SET value = excluded.value'),
        keyDelete: db.prepare('DELETE FROM signal_keys WHERE type = ? AND id = ?'),
        keyListIds: db.prepare('SELECT id FROM signal_keys WHERE type = ?'),
        keyList: db.prepare('SELECT id, value FROM signal_keys WHERE type = ?'),
        clearKeys: db.prepare('DELETE FROM signal_keys')
    };
    const loadCreds = () => {
        const row = stmts.credsSelect.get(CREDS_ROW_KEY);
        if (!row)
            return initAuthCreds();
        return JSON.parse(row.value, BufferJSON.reviver);
    };
    const persistCreds = (creds) => {
        stmts.credsUpsert.run(CREDS_ROW_KEY, JSON.stringify(creds, BufferJSON.replacer));
    };
    const creds = loadCreds();
    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    for (const id of ids) {
                        const row = stmts.keySelect.get(type, id);
                        if (row) {
                            let value = JSON.parse(row.value, BufferJSON.reviver);
                            if (type === 'app-state-sync-key' && value) {
                                value = proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            data[id] = value;
                        }
                    }
                    return data;
                },
                set: async (data) => {
                    const writeTx = db.transaction(() => {
                        for (const category in data) {
                            for (const id in data[category]) {
                                const value = data[category][id];
                                if (value) {
                                    const stringified = JSON.stringify(value, BufferJSON.replacer);
                                    stmts.keyUpsert.run(category, id, stringified);
                                }
                                else {
                                    stmts.keyDelete.run(category, id);
                                }
                            }
                        }
                    });
                    writeTx();
                }
            }
        },
        saveCreds: async () => {
            persistCreds(creds);
        },
        // Vanz@Fix: release the WAL cleanup interval and (if we opened it ourselves)
        // the underlying db handle. Without this, every useSqliteAuthState() call
        // (e.g. re-pairing / rotating sessions) leaked a timer + open sqlite fd forever.
        close: async () => {
            clearInterval(_walCleanupInterval);
            if (!opts.database) {
                try {
                    db.close();
                }
                catch { /* already closed */ }
            }
        }
    };
}
//# sourceMappingURL=use-sqlite-auth-state.js.map