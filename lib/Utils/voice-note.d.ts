/** Upper bound for a buffered voice note before conversion (WhatsApp voice notes are short; this only stops runaway inputs). */
export const MAX_VOICE_NOTE_BYTES: number;
export function isOggBuffer(buf: any): boolean;
export function buildVoiceNoteContent(audio: any, opts1?: { [key: string]: any; 
    convert?: boolean;
}): Promise<{
    audio: any;
    ptt: boolean;
    mimetype: string;
    waveform: any;
    seconds: any;
}>;
export function sendVoiceNote(sock: any, jid: any, audio: any, opts2?: { [key: string]: any; }): Promise<any>;
