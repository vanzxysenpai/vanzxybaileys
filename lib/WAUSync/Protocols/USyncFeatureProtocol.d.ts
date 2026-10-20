export const USYNC_FEATURES: string[];
export class USyncFeatureProtocol {
    constructor(features: any);
    name: string;
    features: any;
    getQueryElement(): {
        tag: string;
        attrs: {};
        content: any;
    };
    getUserElement(): any;
    parser(node: any): {};
}
