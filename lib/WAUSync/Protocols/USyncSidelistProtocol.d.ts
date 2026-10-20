export class USyncSidelistProtocol {
    constructor(useLidAddressing?: boolean);
    name: string;
    useLidAddressing: boolean;
    getQueryElement(): {
        tag: string;
        attrs: {
            addressing_mode: string;
        };
    };
    getUserElement(user: any): {
        tag: string;
        attrs: {
            type: string;
        };
    };
    parser(node: any): {
        type: any;
    };
}
