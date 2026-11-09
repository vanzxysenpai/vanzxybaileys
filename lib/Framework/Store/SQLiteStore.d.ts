export class SQLiteStore {
    /** Vanz@Port: replaces the old synchronous `new SQLiteStore(dbPath)` — await this instead. */
    static create(dbPath: any): Promise<SQLiteStore>;
    constructor(db: any);
    db: any;
    getStmt: any;
    setStmt: any;
    delStmt: any;
    get(key: any): any;
    set(key: any, value: any): void;
    del(key: any): void;
    close(): void;
}
