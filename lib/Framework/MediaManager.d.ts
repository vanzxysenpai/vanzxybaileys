export class MediaManager {
    /** Generate a temp file path with a given extension */
    static getTempFile(ext: any): any;
    /**
     * Convert image or video to a WebP sticker buffer.
     * Applies packname/author EXIF metadata when provided (requires the
     * optional `node-webpmux` peer dependency — only loaded if metadata is given).
     */
    static convertToSticker(inputPathOrBuffer: any, metadata: any): Promise<any>;
    /**
     * Convert audio to OGG Opus voice note format.
     * Mono, 16kHz, VOIP application mode — required by WA for PTT playback.
     */
    static convertToVoiceNote(inputPathOrBuffer: any): Promise<any>;
}
