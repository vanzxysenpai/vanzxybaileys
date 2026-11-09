export function autoReconnect(socketFactory: any, options?: {}): {
    start: () => Promise<any>;
    stop: () => Promise<void>;
    /** The live socket (replaced on every reconnect); null before start(). */
    readonly socket: any;
    /** Consecutive failed attempts since the last successful open. */
    readonly attempts: number;
};
