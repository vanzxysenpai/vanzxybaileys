export class StatsManager {
    /** Vanz@Port: replaces the old synchronous `new StatsManager(dbPath, groupMetaFn)`. */
    static create(dbPath: any, groupMetaFn: any): Promise<StatsManager>;
    constructor(db: any, groupMetaFn: any);
    db: any;
    groupMetaFn: any;
    insertStmt: any;
    getStatsStmt: any;
    getTopMsgStmt: (limit: any) => any;
    getTopStickerStmt: (limit: any) => any;
    /** Record a message observation for stats. Normalizes both JIDs before storing. */
    observeMessage(groupJid: any, userJid: any, isSticker: any): void;
    /** Top message senders for a group. */
    getTopUsers(groupJid: any, limit?: number): any;
    /** Top sticker senders for a group. */
    getTopStickers(groupJid: any, limit?: number): any;
    /** Detect inactive members ("ghosts") in a group. */
    getGhosts(groupJid: any, socketConnected: any, inactiveDays?: number): Promise<any>;
    close(): void;
}
