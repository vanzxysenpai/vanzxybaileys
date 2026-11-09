export const STATUS_BROADCAST_JID: "status@broadcast";
export namespace STATUS_BACKGROUNDS {
    namespace solid {
        let green: string;
        let blue: string;
        let purple: string;
        let red: string;
        let orange: string;
        let yellow: string;
        let pink: string;
        let teal: string;
        let gray: string;
        let black: string;
        let white: string;
    }
    namespace gradient {
        export let sunset: string[];
        export let ocean: string[];
        export let forest: string[];
        let purple_1: string[];
        export { purple_1 as purple };
        export let midnight: string[];
        export let aurora: string[];
    }
}
export namespace STATUS_FONTS {
    let SANS_SERIF: number;
    let SERIF: number;
    let NORICAN: number;
    let BRYNDAN: number;
    let BEBASNEUE: number;
    let OSWALD: number;
    let DAMION: number;
    let DANCING: number;
    let COMFORTAA: number;
    let EXOTWO: number;
}
export function generateStatusMessageId(): string;
export function createTextStatus(options: any): {
    text: any;
    backgroundColor: any;
    font: any;
    textColor: any;
    contextInfo: {
        mentionedJid: any;
        isForwarded: boolean;
    };
};
export function createImageStatus(media: any, options: any): {
    image: any;
    caption: any;
};
export function createVideoStatus(media: any, options: any): {
    video: any;
    caption: any;
    gifPlayback: any;
};
export function createAudioStatus(media: any, options: any): {
    audio: any;
    ptt: boolean;
    mimetype: string;
    waveform: any;
};
export function getStatusJid(): string;
export namespace StatusHelper {
    function text(text: any, backgroundColor: any, font: any): {
        text: any;
        backgroundColor: any;
        font: any;
        textColor: any;
        contextInfo: {
            mentionedJid: any;
            isForwarded: boolean;
        };
    };
    function image(buffer: any, caption: any): {
        image: any;
        caption: any;
    };
    function imageUrl(url: any, caption: any): {
        image: any;
        caption: any;
    };
    function video(buffer: any, caption: any): {
        video: any;
        caption: any;
        gifPlayback: any;
    };
    function videoUrl(url: any, caption: any): {
        video: any;
        caption: any;
        gifPlayback: any;
    };
    function gif(buffer: any, caption: any): {
        video: any;
        caption: any;
        gifPlayback: any;
    };
    function voiceNote(buffer: any): {
        audio: any;
        ptt: boolean;
        mimetype: string;
        waveform: any;
    };
    function send(sock: any, content: any, jidList?: any[]): Promise<any>;
}
export function withMusicAttribution(content: any, music?: {}): any;
