export class SignalingBridge {
    constructor(config: any);
    attachEngine: (voip: any) => void;
    init: () => Promise<void>;
    sendSignaling: (peerJid: any, callId: any, xmlPayload: any) => void;
    processIncomingCall: (node: any, voip: any, activeCallId: any) => void;
    processIncomingReceipt: (node: any, voip: any, activeCallId: any) => void;
    requestTcToken: (jid: any) => Promise<any>;
    ensureTcToken: (...jids: any[]) => Promise<any>;
    discoverPeerDevices: (peerLidJid: any) => Promise<any[]>;
    ensureSessionsForPeers: (jids: any) => Promise<void>;
    resolveLid: (pnJid: any) => Promise<any>;
    issueTcToken: (jid: any) => Promise<boolean>;
    getRemoteDeviceJid: (callId: any) => any;
    #private;
}
