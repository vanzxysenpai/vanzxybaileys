export const MINI_APP_DEFAULT_BUTTON_TEXT: "\uD83D\uDE80 Open App";
export function buildMiniAppContent(opts4?: { [key: string]: any; 
    buttons?: any[];
    useWebview?: boolean;
}): Promise<{
    text: string;
    footer: any;
    nativeFlow: any[];
}>;
export function sendMiniApp(sock: any, jid: any, miniApp: any, options?: {}): Promise<any>;
export function createMiniAppLink(baseUrl: any, params?: {}, opts1?: { [key: string]: any; }): string;
export function parseMiniAppParams(link: any, opts2?: { [key: string]: any; }): {};
export function buildFlowDataExchange(action: any, data?: {}, opts3?: { [key: string]: any; 
    version?: string;
}): {
    token?: any;
    version: string;
    action: string;
    data: {};
};
