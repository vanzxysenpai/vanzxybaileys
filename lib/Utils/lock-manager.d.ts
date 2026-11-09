export function makeLockManager(): {
    withLock: (ref: any, work: any) => Promise<any>;
    withLocks(refs: any, work: any): Promise<any>;
    isLocked(ref: any): boolean;
};
