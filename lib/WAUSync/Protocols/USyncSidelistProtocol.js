// Vanz@Port (v2.0.3) --- ported from @nexustechpro/baileys 2.2.7 (MIT, Copyright (c) 2026 nexustechpro2), lib/WAUSync/Protocols/. See NOTICE.md.
import { assertNodeErrorFree } from '../../WABinary/index.js';
export class USyncSidelistProtocol {
    constructor(useLidAddressing = true) {
        this.name = 'sidelist';
        this.useLidAddressing = useLidAddressing;
    }
    getQueryElement() {
        const attrs = {};
        if (this.useLidAddressing)
            attrs.addressing_mode = 'lid';
        return { tag: 'sidelist', attrs };
    }
    getUserElement(user) {
        return user.sidelistDelete ? { tag: 'sidelist', attrs: { type: 'delete' } } : null;
    }
    parser(node) {
        if (node.tag !== 'sidelist' && node.tag !== 'side_list')
            return null;
        assertNodeErrorFree(node);
        return { type: node.attrs?.type ?? null };
    }
}
