import type { WAMediaUpload } from '../Types/index.js';
export declare const generateProfilePictureFull: (img: Buffer | string) => Promise<{
    img: Buffer;
}>;
export declare const changeprofileFull: (img: Buffer | string) => Promise<{
    img: Buffer;
}>;
export declare const generateProfilePictureFP: (buffer: Buffer | string) => Promise<{
    img: Buffer;
    preview: Buffer;
}>;
export declare const generatePP: (buffer: Buffer | string) => Promise<{
    img: Buffer;
    preview: Buffer;
}>;
export declare const generateProfilePicturee: (mediaUpload: WAMediaUpload) => Promise<{
    img: Buffer;
}>;
