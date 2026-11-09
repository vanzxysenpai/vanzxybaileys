/**
 * @param {{ dbPath?: string, database?: import('better-sqlite3').Database }} opts
 * @returns {Promise<StoreAdapter>}
 */
export function createSqliteStoreAdapter(opts?: {
    dbPath?: string;
    database?: any;
}): Promise<StoreAdapter>;
/**
 * @param {{ url?: string, dbName?: string, client?: import('mongodb').MongoClient, collectionName?: string }} opts
 * @returns {Promise<StoreAdapter>}
 */
export function createMongoStoreAdapter(opts?: {
    url?: string;
    dbName?: string;
    client?: any;
    collectionName?: string;
}): Promise<StoreAdapter>;
/**
 * @param {{ pool?: import('mysql2/promise').Pool } & import('mysql2/promise').PoolOptions} opts
 * @returns {Promise<StoreAdapter>}
 */
export function createMysqlStoreAdapter(opts?: {
    pool?: any;
} & any): Promise<StoreAdapter>;
/**
 * @param {{ pool?: import('pg').Pool } & import('pg').PoolConfig} opts
 * @returns {Promise<StoreAdapter>}
 */
export function createPostgresStoreAdapter(opts?: {
    pool?: any;
} & any): Promise<StoreAdapter>;
/**
 * @param {{ url?: string, client?: import('ioredis').Redis } & import('ioredis').RedisOptions} opts
 * @returns {Promise<StoreAdapter>}
 */
export function createRedisStoreAdapter(opts?: {
    url?: string;
    client?: any;
} & any): Promise<StoreAdapter>;
export function makePersistentStore(config: Parameters<typeof makeInMemoryStore>[0] & {
    adapter: StoreAdapter;
}): Promise<{
    bind: (ev: any) => void;
    fetchGroupMetadata: (jid: any, sock: any) => Promise<any>;
    adapter: StoreAdapter;
    close: () => any;
    chats: any;
    contacts: {};
    messages: {};
    groupMetadata: {};
    state: {
        connection: string;
    };
    presences: {};
    labels: import("../index.js").ObjectRepository;
    labelAssociations: any;
    loadMessages: (jid: any, count: any, cursor: any) => Promise<any>;
    getLabels: () => import("../index.js").ObjectRepository;
    getChatLabels: (chatId: any) => any;
    getMessageLabels: (messageId: any) => any;
    loadMessage: (jid: any, id: any) => Promise<any>;
    mostRecentMessage: (jid: any) => Promise<any>;
    fetchImageUrl: (jid: any, sock: any) => Promise<any>;
    fetchMessageReceipts: (opts1: {
        [key: string]: any;
        remoteJid: any;
        id: any;
    }) => Promise<any>;
    toJSON: () => {
        chats: any;
        contacts: {};
        messages: {};
        labels: import("../index.js").ObjectRepository;
        labelAssociations: any;
    };
    fromJSON: (json: any) => void;
    writeToFile: (path: any) => void;
    readFromFile: (path: any) => void;
}>;
import { makeInMemoryStore } from '../Store/make-in-memory-store.js';

export interface StoreAdapter { [key: string]: any }
