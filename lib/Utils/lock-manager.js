import { makeKeyedMutex } from './make-mutex.js';

/**
 * Deterministic multi-key locking built on the existing keyed mutex.
 * Locks are sorted before acquisition so overlapping multi-lock operations
 * cannot deadlock because callers supplied keys in different orders.
 */
const refKey = ({ namespace, id }) => `${String(namespace)}\0${String(id)}`;
const compareRefs = (a, b) => refKey(a).localeCompare(refKey(b));

export const makeLockManager = () => {
    const keyed = makeKeyedMutex();
    const held = new Map();
    const mark = (key, delta) => {
        const next = (held.get(key) || 0) + delta;
        if (next > 0) held.set(key, next);
        else held.delete(key);
    };
    const withOne = async (ref, work) => {
        if (!ref || ref.namespace == null || ref.id == null) throw new TypeError('lock ref requires namespace and id');
        if (typeof work !== 'function') throw new TypeError('lock work must be a function');
        const key = refKey(ref);
        return keyed.mutex(key, async () => {
            mark(key, 1);
            try { return await work(); }
            finally { mark(key, -1); }
        });
    };
    return {
        withLock: withOne,
        withLocks(refs, work) {
            if (!Array.isArray(refs)) throw new TypeError('refs must be an array');
            if (typeof work !== 'function') throw new TypeError('lock work must be a function');
            const unique = new Map();
            for (const ref of refs) {
                if (!ref || ref.namespace == null || ref.id == null) throw new TypeError('lock ref requires namespace and id');
                unique.set(refKey(ref), ref);
            }
            const sorted = [...unique.values()].sort(compareRefs);
            const acquire = (i) => i >= sorted.length
                ? Promise.resolve().then(work)
                : withOne(sorted[i], () => acquire(i + 1));
            return acquire(0);
        },
        isLocked(ref) {
            if (!ref || ref.namespace == null || ref.id == null) return false;
            return held.has(refKey(ref));
        }
    };
};
