export function buildTagContent(participants: any, text?: string, opts1?: { [key: string]: any; 
    hide?: boolean;
}): {
    text: string;
    mentions: any;
};
export function tagAll(sock: any, jid: any, text?: string, options?: {}): Promise<any>;
export function hideTag(sock: any, jid: any, text?: string, options?: {}): Promise<any>;
