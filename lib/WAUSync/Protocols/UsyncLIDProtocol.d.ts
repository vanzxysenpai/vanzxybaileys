export class USyncLIDProtocol {
    name: string;
    getQueryElement(): {
        tag: string;
        attrs: {};
    };
    getUserElement(user: any): {
        tag: string;
        attrs: {
            jid: any;
        };
    };
    parser(node: any): any;
}
