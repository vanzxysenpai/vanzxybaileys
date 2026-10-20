export function createMockSocket(options?: {}): {
    sock: {
        ev: {
            on: (event: any, listener: any) => /*elided*/ any;
            off: (event: any, listener: any) => /*elided*/ any;
            once: (event: any, listener: any) => /*elided*/ any;
            removeAllListeners: (event: any) => /*elided*/ any;
            emit: (event: any, data: any) => any;
            process: (handler: any) => () => any;
            buffer: () => void;
            flush: () => boolean;
            isBuffering: () => boolean;
        };
        user: {
            id: any;
            name: any;
        };
        authState: {
            creds: {
                me: {
                    id: any;
                    name: any;
                };
                registered: boolean;
            };
        };
        type: string;
        ws: {
            readyState: number;
            close: () => void;
        };
        sendMessage: (jid: any, content: any, opts?: {}) => Promise<import("../index.js").proto.WebMessageInfo>;
        readMessages: (keys: any) => Promise<void>;
        sendPresenceUpdate: (type: any, toJid: any) => Promise<void>;
        presenceSubscribe: () => Promise<void>;
        groupMetadata: (jid: any) => Promise<{
            id: any;
            subject: string;
            owner: any;
            participants: {
                id: any;
                admin: string;
            }[];
            creation: number;
        }>;
        onWhatsApp: (...jids: any[]) => Promise<{
            jid: any;
            exists: boolean;
        }[]>;
        profilePictureUrl: () => Promise<any>;
        updateMediaMessage: (msg: any) => Promise<any>;
        relayMessage: (jid: any, content: any, opts?: {}) => Promise<any>;
        end: () => void;
        logout: () => Promise<void>;
    };
    outbox: any[];
    eventLog: any[];
    readReceipts: any[];
    presenceLog: any[];
    receiveText: (fromJid: any, text: any, opts?: {}) => Promise<any>;
    receiveMessage: (msg: any) => Promise<any>;
    waitForReply: (filter: any, timeoutMs?: number) => Promise<any>;
    connect: () => void;
    disconnect: (error: any) => void;
    reset: () => void;
    readonly connectionState: string;
};
