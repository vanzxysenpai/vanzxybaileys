// Vanz@Port (v2.0.3) --- ported from @nexustechpro/baileys 2.2.7 (MIT, Copyright (c) 2026 nexustechpro2), lib/WAUSync/Protocols/. See NOTICE.md.
import { assertNodeErrorFree } from '../../WABinary/index.js';
export class USyncPictureProtocol {
    constructor(type = 'image') {
        this.name = 'picture';
        this.type = type;
    }
    getQueryElement() {
        return { tag: 'picture', attrs: { type: this.type } };
    }
    getUserElement(user) {
        const attrs = {};
        if (user.pictureId != null)
            attrs.id = String(user.pictureId);
        return Object.keys(attrs).length > 0 ? { tag: 'picture', attrs } : null;
    }
    parser(node) {
        if (node.tag !== 'picture')
            return null;
        assertNodeErrorFree(node);
        const id = node.attrs?.id ?? null;
        const directPath = node.attrs?.direct_path ?? null;
        const hash = node.attrs?.hash ?? null;
        if (!id && !directPath)
            return null;
        return { id, directPath, hash };
    }
}
