export function binaryNodeToString(node: any, i?: number): any;
export function getBinaryNodeChildren(node: any, childTag: any): any;
export function getBinaryNodeChild(node: any, childTag: any): any;
export function getAllBinaryNodeChildren(opts1: { [key: string]: any; 
    content: any;
}): any[];
export function getBinaryNodeChildBuffer(node: any, childTag: any): any;
export function getBinaryNodeChildString(node: any, childTag: any): any;
export function getBinaryFilteredButtons(nodeContent: any): boolean;
export function getBinaryNodeFilter(nodeContent: any): boolean;
export function getBinaryNodeChildUInt(node: any, childTag: any, length: any): number;
export function assertNodeErrorFree(node: any): void;
export function reduceBinaryNodeToDictionary(node: any, tag: any): any;
export function getBinaryNodeMessages(opts2: { [key: string]: any; 
    content: any;
}): {
    [k: string]: any;
}[];
export function getBizBinaryNode(message: any): {
    tag: string;
    attrs: {
        actual_actors: string;
        host_storage: string;
        privacy_mode_ts: string;
    };
    content: ({
        tag: string;
        attrs: {
            decision_id: any;
            source_type: string;
        };
        content: {
            tag: string;
            attrs: {
                value: string;
            };
        }[];
    } | {
        tag: string;
        attrs: {
            v: string;
            type: string;
        };
    })[];
};
