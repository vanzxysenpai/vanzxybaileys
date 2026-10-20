export class Expiring {
    /**
     * @param {object} client socket (needs sendMessage)
     * @param {{ send: Function }} builder configured builder instance
     * @param {number} [seconds=30] delay before the message is deleted for everyone
     */
    constructor(client: object, builder: {
        send: Function;
    }, seconds?: number);
    _client: any;
    _builder: {
        send: Function;
    };
    _seconds: number;
    send(jid: any, opts?: {}): Promise<any>;
}
export { Expiring as ExpiringButton };
