/**
 * LT Hash is a summation based hash algorithm that maintains the integrity of a piece of data
 * over a series of mutations. You can add/remove mutations and it'll return a hash equal to
 * if the same series of mutations was made sequentially.
 *
 * Vanz@Fix (bug 36 follow-up): whatsapp-rust-bridge is a native module and was previously
 * statically imported here, which crashed the *entire* library at import time on platforms
 * without a prebuilt binary (ARM musl/Alpine/Termux/some Pterodactyl nodes) — even for bots
 * that never touch app-state sync. Same top-level-await try/catch pattern as crypto.js:
 * only throws (with a clear message) if app-state sync (LT hash) is actually used.
 */
let LT_HASH_ANTI_TAMPERING;
try {
    const { LTHashAntiTampering } = await import('whatsapp-rust-bridge');
    LT_HASH_ANTI_TAMPERING = new LTHashAntiTampering();
}
catch (err) {
    const message = '`whatsapp-rust-bridge` failed to load (no prebuilt binary for this platform/arch). ' +
        'App-state sync (LT hash) is unavailable here. Original error: ' + (err?.message || err);
    LT_HASH_ANTI_TAMPERING = new Proxy({}, {
        get() {
            throw new Error(message);
        }
    });
}
export { LT_HASH_ANTI_TAMPERING };
//# sourceMappingURL=lt-hash.js.map