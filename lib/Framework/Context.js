import { MediaManager } from './MediaManager.js';

// Vanz@Port (from @queenanya/baileys Framework, originally Baileys PR #2710
// by LuferOS) --- message context helper: wraps a WAMessage with reply,
// react, session, and media helpers so command handlers don't have to touch
// the raw socket API.
//
// Kept from upstream's fix pass:
//  - text getter also reads imageMessage/videoMessage/documentMessage
//    captions, so a command sent as an image caption still matches
//  - reply()/react()/replySticker()/replyVoiceNote() throw when remoteJid is
//    missing instead of silently no-op'ing, so a handler can't believe a
//    reply went out when it never did
export class Context {
    constructor(bot, message) {
        this.bot = bot;
        this.message = message;
    }

    get remoteJid() {
        return this.message.key.remoteJid;
    }

    /** Text content, including image/video/document captions so caption-only commands still match. */
    get text() {
        return (this.message.message?.conversation ||
            this.message.message?.extendedTextMessage?.text ||
            this.message.message?.imageMessage?.caption ||
            this.message.message?.videoMessage?.caption ||
            this.message.message?.documentMessage?.caption ||
            undefined);
    }

    get quoted() {
        return this.message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    }

    session() {
        return this.bot.sessions?.get(this.remoteJid || '');
    }

    setSession(data) {
        this.bot.sessions?.set(this.remoteJid || '', data);
    }

    updateSession(updater) {
        this.bot.sessions?.update(this.remoteJid || '', updater);
    }

    clearSession() {
        this.bot.sessions?.delete(this.remoteJid || '');
    }

    async reply(content, options) {
        if (!this.remoteJid)
            throw new Error('Cannot reply: remoteJid is undefined');
        await this.bot.sendMessage(this.remoteJid, {
            ...content
        }, {
            quoted: this.message,
            ...options
        });
    }

    async react(emoji) {
        if (!this.remoteJid)
            throw new Error('Cannot react: remoteJid is undefined');
        await this.bot.sendMessage(this.remoteJid, {
            react: { text: emoji, key: this.message.key }
        });
    }

    async replySticker(inputPathOrBuffer, metadata) {
        if (!this.remoteJid)
            throw new Error('Cannot reply: remoteJid is undefined');
        const buffer = await MediaManager.convertToSticker(inputPathOrBuffer, metadata);
        await this.reply({ sticker: buffer });
    }

    async replyVoiceNote(inputPathOrBuffer) {
        if (!this.remoteJid)
            throw new Error('Cannot reply: remoteJid is undefined');
        const buffer = await MediaManager.convertToVoiceNote(inputPathOrBuffer);
        await this.reply({
            audio: buffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        });
    }
}
