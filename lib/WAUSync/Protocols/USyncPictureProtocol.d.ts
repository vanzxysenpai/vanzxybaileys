export class USyncPictureProtocol {
    constructor(type?: string);
    name: string;
    type: string;
    getQueryElement(): {
        tag: string;
        attrs: {
            type: string;
        };
    };
    getUserElement(user: any): {
        tag: string;
        attrs: {
            id: string;
        };
    };
    parser(node: any): {
        id: any;
        directPath: any;
        hash: any;
    };
}
