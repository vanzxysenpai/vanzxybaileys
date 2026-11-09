export function updateProfilePictureFull(jid: any, content: any, sock: any): Promise<any>;
export function updateProfilePictureFull2(jid: any, content: any, sock: any): Promise<any>;
export function groupStatus(jid: any, content: any, sock: any): Promise<import("../index.js").proto.WebMessageInfo>;
export function groupStatusV2(jids: any, content: any, sock: any): Promise<import("../index.js").proto.WebMessageInfo[]>;
export function groupSetMemberLabel(jid: any, memberLabel: any, sock: any): Promise<any>;
export function groupLabel(jid: any, text: any, sock: any): Promise<void>;
