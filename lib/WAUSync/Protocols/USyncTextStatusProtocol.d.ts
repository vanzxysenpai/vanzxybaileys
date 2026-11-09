export class USyncTextStatusProtocol {
    name: string;
    getQueryElement(): {
        tag: string;
        attrs: {};
    };
    getUserElement(): any;
    parser(node: any): {
        text: any;
        emoji: any;
        setAt: Date;
        expiresAt: Date;
    };
}
