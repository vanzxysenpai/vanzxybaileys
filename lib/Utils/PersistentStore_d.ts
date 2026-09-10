/**
 * Common contract every backend below implements. A flat (domain, id) -> value
 * KV store — the same shape useSqliteAuthState() uses for its `signal_keys`
 * table. Query semantics (ordering, pagination) stay owned by
 * makeInMemoryStore() in JS; adapters are pure storage.
 */
export interface StoreAdapter {
	/** Create tables/collections/indexes if missing. Idempotent. */
	init(): Promise<void>;
	get(domain: string, id: string): Promise<unknown | undefined>;
	set(domain: string, id: string, value: unknown): Promise<void>;
	delete(domain: string, id: string): Promise<void>;
	/** All (id, value) pairs currently stored under `domain`. */
	list(domain: string): Promise<Array<[string, unknown]>>;
	/** All distinct domain names, optionally filtered by prefix (e.g. `messages:`). */
	listDomains(prefix?: string): Promise<string[]>;
	/** Remove every row under `domain`. */
	clear(domain: string): Promise<void>;
	close(): Promise<void>;
}

export function createSqliteStoreAdapter(opts?: { dbPath?: string; database?: import('better-sqlite3').Database }): Promise<StoreAdapter>;

export function createMongoStoreAdapter(opts?: {
	url?: string;
	dbName?: string;
	client?: import('mongodb').MongoClient;
	collectionName?: string;
}): Promise<StoreAdapter>;

export function createMysqlStoreAdapter(
	opts?: { pool?: import('mysql2/promise').Pool } & import('mysql2/promise').PoolOptions
): Promise<StoreAdapter>;

export function createPostgresStoreAdapter(opts?: { pool?: import('pg').Pool } & import('pg').PoolConfig): Promise<StoreAdapter>;

export function createRedisStoreAdapter(
	opts?: { url?: string; client?: import('ioredis').Redis } & import('ioredis').RedisOptions
): Promise<StoreAdapter>;

export interface MakePersistentStoreConfig {
	adapter: StoreAdapter;
	socket?: any;
	logger?: any;
	chatKey?: any;
	labelAssociationKey?: any;
}

/**
 * Persisted counterpart to makeInMemoryStore(). Same return shape (chats,
 * contacts, messages, groupMetadata, labels, bind, loadMessages, ...) plus
 * `adapter` and an async `close()`. Hydrates from `adapter` on creation, then
 * write-throughs every mutating event alongside the normal in-memory update.
 */
export function makePersistentStore(config: MakePersistentStoreConfig): Promise<
	ReturnType<typeof import('../Store/make-in-memory-store.js').makeInMemoryStore> & {
		adapter: StoreAdapter;
		close(): Promise<void>;
	}
>;
