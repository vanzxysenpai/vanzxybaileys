export class USyncDisappearingModeProtocol {
    name: string;
    getQueryElement(): {
        tag: string;
        attrs: {};
    };
    getUserElement(): any;
    parser(node: any): {
        duration: number;
        setAt: Date;
    };
}
