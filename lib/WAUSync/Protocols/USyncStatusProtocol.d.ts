export class USyncStatusProtocol {
    name: string;
    getQueryElement(): {
        tag: string;
        attrs: {};
    };
    getUserElement(): any;
    parser(node: any): {
        status: any;
        setAt: Date;
    };
}
