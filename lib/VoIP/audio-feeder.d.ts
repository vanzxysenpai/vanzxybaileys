export class AudioFeeder {
    constructor(sampleRate: any, channels: any, framesPerChunk: any, onChunk: any, source?: string);
    sampleRate: any;
    channels: any;
    framesPerChunk: any;
    onChunk: any;
    source: string;
    droppedChunks: number;
    underflowChunks: number;
    bytesProduced: number;
    chunksEmitted: number;
    start: () => void;
    stop: () => void;
    #private;
}
