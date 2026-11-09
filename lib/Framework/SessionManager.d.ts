export class SessionManager {
    constructor(store: any);
    store: any;
    key(jid: any): string;
    get(jid: any): any;
    set(jid: any, data: any): void;
    update(jid: any, updater: any): void;
    delete(jid: any): void;
    has(jid: any): boolean;
}
