export const NATIVE_FLOW_NAMES: readonly string[];
export const WEB_SUPPORTED_INTERACTIVE_FLOWS: readonly string[];
export const NATIVE_FLOW_BUTTON_LIMIT: Readonly<{
    quickReply: 10;
    other: 3;
}>;
export function getNativeFlowNameByButtonName(name: any): any;
export function isWebSupportedButtonName(name: any): boolean;
export function checkNativeFlowButtons(buttons: any): {
    ok: boolean;
    limit: 3;
    problems: any[];
    unsupported: any[];
} | {
    ok: boolean;
    limit: 10 | 3;
    problems: string[];
    unsupported: any[];
};
