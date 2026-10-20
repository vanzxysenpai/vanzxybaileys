export class USyncBusinessProtocol {
    constructor(profileVersion?: string);
    name: string;
    profileVersion: string;
    getQueryElement(): {
        tag: string;
        attrs: {};
        content: ({
            tag: string;
            attrs: {
                v?: undefined;
            };
        } | {
            tag: string;
            attrs: {
                v: string;
            };
        })[];
    };
    getUserElement(user: any): {
        tag: string;
        attrs: {};
        content: ({
            tag: string;
            attrs: {
                serial: any;
                tag?: undefined;
            };
        } | {
            tag: string;
            attrs: {
                tag: any;
                serial?: undefined;
            };
        })[];
    };
    parser(node: any): {
        verifiedName: any;
        verifiedLevel: any;
        profileTag: any;
        pnJid: any;
    };
}
