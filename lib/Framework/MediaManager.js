import { randomBytes } from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// Vanz@Port (from @queenanya/baileys Framework, originally Baileys PR #2710
// by LuferOS) --- media conversion helpers: image/video → WebP stickers
// (with optional packname/author EXIF), audio → OGG Opus voice notes.
//
// Vanz@Fix vs upstream: original hard-`require()`'d `node-webpmux` and
// pulled in `ffmpeg-static` (bundles a per-platform ffmpeg binary) alongside
// `fluent-ffmpeg`. `fluent-ffmpeg` is already an optional peer dep in this
// fork, lazy-loaded via the getFfmpeg() pattern established in
// Utils/MessageBuilder.js (15-08-26) — reused verbatim here instead of
// re-introducing a static import or a second ffmpeg-binary dependency.
// `node-webpmux` is lazy-loaded the same way, and only when packname/author
// metadata is actually requested.
let _ffmpeg;
const getFfmpeg = async () => {
    if (_ffmpeg === undefined) {
        _ffmpeg = await import('fluent-ffmpeg').then((m) => m.default ?? m).catch(() => null);
    }
    if (!_ffmpeg)
        throw new Error('fluent-ffmpeg is required for sticker/voice-note conversion. Install it with: npm i fluent-ffmpeg');
    return _ffmpeg;
};

let _webpmux;
const getWebpmux = async () => {
    if (_webpmux === undefined) {
        _webpmux = await import('node-webpmux').then((m) => m.default ?? m).catch(() => null);
    }
    if (!_webpmux)
        throw new Error('node-webpmux is required for sticker packname/author metadata. Install it with: npm i node-webpmux (conversion without metadata does not need this package)');
    return _webpmux;
};

export class MediaManager {
    /** Generate a temp file path with a given extension */
    static getTempFile(ext) {
        return path.join(os.tmpdir(), `baileys-fw-${randomBytes(8).toString('hex')}.${ext}`);
    }

    /**
     * Convert image or video to a WebP sticker buffer.
     * Applies packname/author EXIF metadata when provided (requires the
     * optional `node-webpmux` peer dependency — only loaded if metadata is given).
     */
    static async convertToSticker(inputPathOrBuffer, metadata) {
        const ffmpegLib = await getFfmpeg();
        const tempInput = MediaManager.getTempFile('in');
        const tempOutput = MediaManager.getTempFile('webp');
        try {
            if (Buffer.isBuffer(inputPathOrBuffer)) {
                await fs.promises.writeFile(tempInput, inputPathOrBuffer);
            }
            else {
                await fs.promises.copyFile(inputPathOrBuffer, tempInput);
            }
            await new Promise((resolve, reject) => {
                ffmpegLib(tempInput)
                    .outputOptions([
                    '-vcodec', 'libwebp',
                    '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=white@0',
                    '-loop', '0',
                    '-preset', 'default',
                    '-an', '-vsync', '0',
                    '-t', '00:00:05'
                ])
                    .output(tempOutput)
                    .on('end', () => resolve())
                    .on('error', (err) => reject(err))
                    .run();
            });
            const webpBuffer = await fs.promises.readFile(tempOutput);
            if (metadata?.packname || metadata?.author) {
                // EXIF header: fixed 22-byte TIFF/IFD preamble (magic + one IFD
                // entry pointing at the WhatsApp tag 0x0741) followed by a
                // little-endian payload length and a little-endian offset to
                // where the payload begins (always 22, the header's own size).
                const exifJson = JSON.stringify({
                    'sticker-pack-id': `com.vanzxy.sticker.${randomBytes(4).toString('hex')}`,
                    'sticker-pack-name': metadata.packname || '',
                    'sticker-pack-publisher': metadata.author || '',
                    emojis: ['🤖']
                });
                const exifBytes = Buffer.from(exifJson, 'utf8');
                const exifHeader = Buffer.from([
                    0x49, 0x49, 0x2a, 0x00, // TIFF byte order (little-endian) + magic number
                    0x08, 0x00, 0x00, 0x00, // offset to first IFD
                    0x01, 0x00, // number of IFD entries
                    0x41, 0x57, 0x07, 0x00, // tag 0x0741 (WhatsApp), type 0x0007 (undefined)
                    0x00, 0x00, 0x00, 0x00, // payload length placeholder — filled below
                    0x16, 0x00, 0x00, 0x00 // offset to payload data (fixed: 22 = header size)
                ]);
                exifHeader.writeUInt32LE(exifBytes.length, 14);
                const fullExif = Buffer.concat([exifHeader, exifBytes]);
                const webpmux = await getWebpmux();
                const img = new webpmux.Image();
                await img.load(webpBuffer);
                img.exif = fullExif;
                return await img.save(null);
            }
            return webpBuffer;
        }
        finally {
            await fs.promises.unlink(tempInput).catch(() => { });
            await fs.promises.unlink(tempOutput).catch(() => { });
        }
    }

    /**
     * Convert audio to OGG Opus voice note format.
     * Mono, 16kHz, VOIP application mode — required by WA for PTT playback.
     */
    static async convertToVoiceNote(inputPathOrBuffer) {
        const ffmpegLib = await getFfmpeg();
        const tempInput = MediaManager.getTempFile('in');
        const tempOutput = MediaManager.getTempFile('ogg');
        try {
            if (Buffer.isBuffer(inputPathOrBuffer)) {
                await fs.promises.writeFile(tempInput, inputPathOrBuffer);
            }
            else {
                await fs.promises.copyFile(inputPathOrBuffer, tempInput);
            }
            await new Promise((resolve, reject) => {
                ffmpegLib(tempInput)
                    .inputOptions(['-y'])
                    .outputOptions([
                    '-c:a', 'libopus',
                    '-ac', '1', // mono channel (required by WA)
                    '-ar', '16000', // 16kHz sample rate
                    '-application', 'voip',
                    '-b:a', '32k',
                    '-compression_level', '10',
                    '-vbr', 'on'
                ])
                    .format('ogg')
                    .output(tempOutput)
                    .on('end', () => resolve())
                    .on('error', (err) => reject(err))
                    .run();
            });
            return await fs.promises.readFile(tempOutput);
        }
        finally {
            await fs.promises.unlink(tempInput).catch(() => { });
            await fs.promises.unlink(tempOutput).catch(() => { });
        }
    }
}
