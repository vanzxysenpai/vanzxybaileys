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
export let LT_HASH_ANTI_TAMPERING: any;
