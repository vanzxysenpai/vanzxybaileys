export class Context {
    constructor(bot: any, message: any);
    bot: any;
    message: any;
    get remoteJid(): any;
    /** Text content, including image/video/document captions so caption-only commands still match. */
    get text(): any;
    get quoted(): any;
    session(): any;
    setSession(data: any): void;
    updateSession(updater: any): void;
    clearSession(): void;
    reply(content: any, options: any): Promise<void>;
    react(emoji: any): Promise<void>;
    replySticker(inputPathOrBuffer: any, metadata: any): Promise<void>;
    replyVoiceNote(inputPathOrBuffer: any): Promise<void>;
}
