export function makeStickerPack(opts1?: { [key: string]: any; 
    name: string;
    publisher?: string;
    description?: string;
    packId?: string;
    stickers: Array<Buffer | {
        url: string;
    } | {
        sticker: Buffer | {
            url: string;
        };
        emojis?: string[];
    }>;
    cover?: Buffer | {
        url: string;
    };
    contextInfo?: object;
}): {
    stickerPack: object;
};
