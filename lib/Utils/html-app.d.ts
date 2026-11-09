export const HTML_APP_MESSAGE_CEILING: number;
export const HTML_APP_BYTE_BUDGET: number;
export const HTML_APP_BYTE_LIMIT: number;
export function wireBytes(html: any): any;
export function checkHtmlApp(html: any, opts1?: { [key: string]: any; 
    maxBytes?: number;
}): {
    ok: boolean;
    bytes: any;
    wireBytes: any;
    embeddedBytes: number;
    problems: string[];
    warnings: string[];
};
