// Vanz@Port (2.0.3) --- from @japofc/baileys 2.4.1 (MIT, author JAPofc / J.AP), lib/Utils/ffmpeg-path.js. See NOTICE.md.
/**
 * JAP@Add --- one central ffmpeg binary resolver for the whole package.
 *
 * Nothing is bundled (an ffmpeg binary is ~80MB per platform and does not
 * even exist for Termux/Android in ffmpeg-static) — instead the binary is
 * AUTO-DETECTED, in priority order:
 *
 *   1. explicit override        → setFfmpegPath('/path/to/ffmpeg') or
 *                                 the FFMPEG_PATH environment variable
 *   2. `ffmpeg-static`          → if the user installed it (optional peer)
 *   3. `@ffmpeg-installer/ffmpeg` → same, alternative provider
 *   4. system `ffmpeg` on PATH  → Termux (pkg install ffmpeg), apt, brew, ...
 *
 * Every ffmpeg consumer in this package (video thumbs, voice-note/sticker
 * conversion via fluent-ffmpeg, VoIP audio feeder) resolves through here, so
 * `npm i ffmpeg-static` — or nothing at all on systems with ffmpeg installed —
 * just works with zero configuration.
 *
 * @author J.AP
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

let overridePath = null;
let cached; // undefined = not probed yet; null = probed, nothing found

const moduleProvidedPath = async () => {
    // 2. ffmpeg-static: default export is the absolute binary path (or null
    //    on platforms it does not ship, e.g. android/Termux)
    try {
        const mod = await import('ffmpeg-static');
        const p = mod?.default ?? mod;
        if (typeof p === 'string' && existsSync(p)) {
            return p;
        }
    }
    catch { /* not installed */ }
    // 3. @ffmpeg-installer/ffmpeg: exports { path }
    try {
        const mod = await import('@ffmpeg-installer/ffmpeg');
        const p = (mod?.default ?? mod)?.path;
        if (typeof p === 'string' && existsSync(p)) {
            return p;
        }
    }
    catch { /* not installed */ }
    return null;
};

const systemHasFfmpeg = () => {
    try {
        const r = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
        return !r.error && r.status === 0;
    }
    catch {
        return false;
    }
};

/** Pin the ffmpeg binary explicitly (wins over every auto-detection step). */
export const setFfmpegPath = (path) => {
    overridePath = path || null;
    cached = undefined; // re-resolve on next use
};

/**
 * Resolve the ffmpeg binary to use. Returns an absolute path (module-provided
 * or override) or the bare string 'ffmpeg' when only the system binary is
 * available. Returns null when nothing was found. Result is cached.
 */
export const resolveFfmpegPath = async () => {
    if (overridePath) {
        return overridePath;
    }
    if (process.env.FFMPEG_PATH && existsSync(process.env.FFMPEG_PATH)) {
        return process.env.FFMPEG_PATH;
    }
    if (cached !== undefined) {
        return cached;
    }
    cached = (await moduleProvidedPath()) ?? (systemHasFfmpeg() ? 'ffmpeg' : null);
    return cached;
};

/**
 * Like resolveFfmpegPath() but throws a platform-aware install guide instead
 * of returning null — use at every "we need ffmpeg NOW" call site.
 */
export const requireFfmpegPath = async () => {
    const path = await resolveFfmpegPath();
    if (path) {
        return path;
    }
    throw new Error(ffmpegInstallHint());
};

/** Human install instructions for the current platform. */
export const ffmpegInstallHint = () => {
    const lines = ['ffmpeg not found. Install one of:'];
    const isAndroid = process.platform === 'android' ||
        !!process.env.TERMUX_VERSION || existsSync('/data/data/com.termux');
    if (isAndroid) {
        lines.push('  - Termux:  pkg install ffmpeg   (recommended — npm ffmpeg bundles have no Android binary)');
    }
    else if (process.platform === 'linux') {
        lines.push('  - npm:     npm i ffmpeg-static   (auto-detected, no config needed)');
        lines.push('  - Debian/Ubuntu:  sudo apt install ffmpeg');
    }
    else if (process.platform === 'darwin') {
        lines.push('  - npm:     npm i ffmpeg-static   (auto-detected, no config needed)');
        lines.push('  - Homebrew:  brew install ffmpeg');
    }
    else if (process.platform === 'win32') {
        lines.push('  - npm:     npm i ffmpeg-static   (auto-detected, no config needed)');
        lines.push('  - winget:  winget install ffmpeg   (or choco/scoop install ffmpeg)');
    }
    else {
        lines.push('  - npm:     npm i ffmpeg-static');
        lines.push('  - or your system package manager');
    }
    lines.push('  - or pin a binary yourself: setFfmpegPath(\'/path/to/ffmpeg\') / FFMPEG_PATH env var');
    return lines.join('\n');
};

/** Test hook: forget the cached probe result. */
export const _resetFfmpegCache = () => {
    cached = undefined;
    overridePath = null;
};
