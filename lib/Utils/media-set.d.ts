import type { AnyMessageContent } from '../Types/index.js';
import type makeWASocket from '../Socket/index.js';
type WASocket = ReturnType<typeof makeWASocket>;
export declare const updateProfilePictureFull: (jid: string, content: Buffer | string, sock: WASocket) => Promise<any>;
export declare const updateProfilePictureFull2: (jid: string, content: Buffer | string, sock: WASocket) => Promise<any>;
type GroupStatusContent = AnyMessageContent & {
    backgroundColor?: string;
};
export declare const groupStatus: (jid: string, content: GroupStatusContent, sock: WASocket) => Promise<any>;
export declare const groupStatusV2: (jids: string[], content: GroupStatusContent, sock: WASocket) => Promise<any[]>;
export declare const groupSetMemberLabel: (jid: string, memberLabel: string, sock: WASocket) => Promise<any>;
export declare const groupLabel: (jid: string, text: string, sock: WASocket) => Promise<void>;
export {};
