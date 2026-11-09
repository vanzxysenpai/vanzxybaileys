export function captureEventStream(ev: any, filename: any): void;
export function readAndEmitEventStream(filename: any, delayIntervalMs?: number): {
    ev: any;
    task: Promise<void>;
};
