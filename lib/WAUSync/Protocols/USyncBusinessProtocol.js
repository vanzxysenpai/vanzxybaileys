// Vanz@Port (v2.0.3) --- ported from @nexustechpro/baileys 2.2.7 (MIT, Copyright (c) 2026 nexustechpro2), lib/WAUSync/Protocols/. See NOTICE.md.
import { assertNodeErrorFree, getBinaryNodeChild } from '../../WABinary/index.js';
export class USyncBusinessProtocol {
    constructor(profileVersion = '2') {
        this.name = 'business';
        this.profileVersion = profileVersion;
    }
    getQueryElement() {
        return { tag: 'business', attrs: {}, content: [{ tag: 'verified_name', attrs: {} }, { tag: 'profile', attrs: { v: this.profileVersion } }] };
    }
    getUserElement(user) {
        const children = [];
        if (user.verifiedNameSerial)
            children.push({ tag: 'verified_name', attrs: { serial: user.verifiedNameSerial } });
        if (user.businessProfileTag)
            children.push({ tag: 'profile', attrs: { tag: user.businessProfileTag } });
        return children.length > 0 ? { tag: 'business', attrs: {}, content: children } : null;
    }
    parser(node) {
        if (node.tag !== 'business')
            return null;
        assertNodeErrorFree(node);
        const verifiedNameNode = getBinaryNodeChild(node, 'verified_name');
        const profileNode = getBinaryNodeChild(node, 'profile');
        return {
            verifiedName: verifiedNameNode?.content ?? null,
            verifiedLevel: verifiedNameNode?.attrs?.verified_level ?? null,
            profileTag: profileNode?.attrs?.tag ?? null,
            pnJid: node.attrs?.pn_jid ?? null
        };
    }
}
