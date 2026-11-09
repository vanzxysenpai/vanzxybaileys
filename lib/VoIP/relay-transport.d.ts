export class RelayRtcTransport {
    constructor(config: any);
    config: any;
    updateRelayList: (update: any) => void;
    send: (packet: any, ip: any, port: any) => any;
    getStats: () => {
        openConnections: number;
        sentPackets: number;
        receivedPackets: number;
        sentBytes: number;
        receivedBytes: number;
        droppedPackets: number;
    };
    closeAll: () => Promise<void>;
    #private;
}
