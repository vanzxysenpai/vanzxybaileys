/**
 * Generates a panoramic/wide profile picture buffer — landscape images are
 * scaled down to a 720px-wide target, portrait images to a 324px-wide
 * target, preserving aspect ratio throughout.
 */
export function generateProfilePictureFull(img: any): Promise<{
    img: any;
}>;
/**
 * Generates a panoramic/wide profile picture buffer — landscape images are
 * scaled down to a 720px-wide target, portrait images to a 324px-wide
 * target, preserving aspect ratio throughout.
 */
export function changeprofileFull(img: any): Promise<{
    img: any;
}>;
/**
 * Generates a square profile picture buffer (main image, scaled to fit
 * within 720x720) plus a normalized preview buffer.
 */
export function generateProfilePictureFP(buffer: any): Promise<{
    img: any;
    preview: any;
}>;
/**
 * Generates a square profile picture buffer (main image, scaled to fit
 * within 720x720) plus a normalized preview buffer.
 */
export function generatePP(buffer: any): Promise<{
    img: any;
    preview: any;
}>;
export function generateProfilePicturee(mediaUpload: any): Promise<{
    img: any;
}>;
