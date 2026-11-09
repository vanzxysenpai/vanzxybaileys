// Vanz@Port (from @queenanya/baileys Framework, originally Baileys PR #2710
// by LuferOS) --- generic key-value store backed by better-sqlite3. Used by
// SessionManager to persist per-JID session state to disk instead of RAM.
//
// Vanz@Fix vs upstream: `better-sqlite3` was a hard top-level `import`, which
// would crash the whole Framework import at module-load time for anyone who
// hasn't installed it (it's an optional peer dep in this fork, same as
// use-sqlite-auth-state). Switched to the lazy `loadBetterSqlite3()` loader
// already used by Utils/use-sqlite-auth-state.js, and moved construction
// behind an async `SQLiteStore.create()` factory since the loader is async.
async function loadBetterSqlite3() {
    try {
        const mod = (await import('better-sqlite3'));
        return mod.default ?? mod;
    }
    catch (err) {
        const helpful = new Error('`better-sqlite3` is required for the Framework SQLiteStore. Install it as a peer dependency: `npm install better-sqlite3` (or `yarn add better-sqlite3`).');
        helpful.cause = err;
        throw helpful;
    }
}

export class SQLiteStore {
    constructor(db) {
        this.db = db;
        this.db.exec(`
			CREATE TABLE IF NOT EXISTS kv_store (
				key   TEXT PRIMARY KEY,
				value TEXT NOT NULL
			)
		`);
        this.getStmt = this.db.prepare('SELECT value FROM kv_store WHERE key = ?');
        this.setStmt = this.db.prepare('INSERT INTO kv_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
        this.delStmt = this.db.prepare('DELETE FROM kv_store WHERE key = ?');
    }

    /** Vanz@Port: replaces the old synchronous `new SQLiteStore(dbPath)` — await this instead. */
    static async create(dbPath) {
        const Database = await loadBetterSqlite3();
        return new SQLiteStore(new Database(dbPath));
    }

    get(key) {
        const row = this.getStmt.get(key);
        if (!row)
            return undefined;
        try {
            return JSON.parse(row.value);
        }
        catch {
            // Fallback for legacy non-JSON rows (migration safety)
            return row.value;
        }
    }

    set(key, value) {
        // guard undefined/null — delegate to del so callers don't need to check
        if (value === undefined || value === null) {
            this.del(key);
            return;
        }
        // always JSON.stringify — raw string storage breaks round-trip for
        // values that are valid JSON (numbers, booleans, JSON objects serialized as strings)
        this.setStmt.run(key, JSON.stringify(value));
    }

    del(key) {
        this.delStmt.run(key);
    }

    close() {
        this.db.close();
    }
}
