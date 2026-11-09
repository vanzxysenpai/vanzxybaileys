// Ported from @queenanya/baileys `addons/baileys-event-stream.ts`.
// Adjustments for @vanzxy/baileys: import paths rewired to this fork's own
// `generics.js` (delay) and `make-mutex.js` (makeMutex) — both already
// present, no logic changes otherwise.
import EventEmitter from 'events';
import { createReadStream } from 'fs';
import { writeFile } from 'fs/promises';
import { createInterface } from 'readline';
import { delay } from './generics.js';
import { makeMutex } from './make-mutex.js';

/**
 * Monkey-patches `ev.emit` to append every Baileys event as a JSON line
 * (NDJSON) to `filename`. Useful for debugging or replaying sessions.
 *
 * @example
 * captureEventStream(sock.ev, './events.ndjson')
 */
export const captureEventStream = (ev, filename) => {
    const originalEmit = ev.emit.bind(ev);
    const writeMutex = makeMutex();
    const patchedEmit = (event, ...rest) => {
        const line = JSON.stringify({ timestamp: Date.now(), event, data: rest[0] }) + '\n';
        const result = originalEmit(event, ...rest);
        void writeMutex.mutex(async () => {
            await writeFile(filename, line, { flag: 'a' });
        });
        return result;
    };
    ev.emit = patchedEmit;
};

/**
 * Reads an NDJSON file written by {@link captureEventStream} and replays
 * each event on a new EventEmitter.
 *
 * @param filename        Path to the NDJSON file.
 * @param delayIntervalMs Milliseconds to wait between events (default 0).
 * @returns `{ ev, task }` — ev is the emitter, task resolves when done.
 */
export const readAndEmitEventStream = (filename, delayIntervalMs = 0) => {
    const ev = new EventEmitter();
    const fireEvents = async () => {
        const fileStream = createReadStream(filename);
        const rl = createInterface({ input: fileStream, crlfDelay: Infinity });
        for await (const line of rl) {
            if (!line.trim())
                continue;
            try {
                const { event, data } = JSON.parse(line);
                ev.emit(event, data);
                if (delayIntervalMs)
                    await delay(delayIntervalMs);
            }
            catch {
                // skip malformed lines
            }
        }
        fileStream.destroy();
    };
    return { ev, task: fireEvents() };
};
