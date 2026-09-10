import type { BaileysEventEmitter } from '../Types/index.js';
/** Monkey-patches ev.emit to append every event as an NDJSON line to `filename`. */
export declare const captureEventStream: (ev: BaileysEventEmitter, filename: string) => void;
/** Reads an NDJSON file written by captureEventStream and replays each event on a new EventEmitter. */
export declare const readAndEmitEventStream: (filename: string, delayIntervalMs?: number) => {
    ev: BaileysEventEmitter;
    task: Promise<void>;
};
