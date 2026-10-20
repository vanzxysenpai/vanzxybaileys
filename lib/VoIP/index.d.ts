export { CallState } from "./types.js";
export class ActiveCall {
    constructor(callId: any, engine: any, durationMs: any);
    _audioSource: string;
    callId: any;
    engine: any;
    get state(): number;
    end: () => void;
    mute: (muted: any) => void;
    waitForEnd: () => Promise<any>;
    _updateState: (state: any) => void;
    _emitAudio: (pcm: any) => void;
    _forceEnd: (reason: any) => void;
    #private;
}
export class VoipClient {
    constructor(config?: {});
    connectWithSocket: (existingSock: any) => Promise<void>;
    call: (phoneNumber: any, opts?: {}) => Promise<ActiveCall>;
    disconnect: () => void;
    #private;
}
