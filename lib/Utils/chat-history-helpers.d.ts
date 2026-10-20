export function getLastMessageInChat(store: any, jid: any): any;
export function getOldestMessageInChat(store: any, jid: any): any;
export function copyNForward(sock: any, jid: any, message: any, forceForward?: boolean): Promise<any>;
export function uploadMediaToWhatsApp(sock: any, message: any, opts: any): Promise<import("../index.js").proto.Message>;
