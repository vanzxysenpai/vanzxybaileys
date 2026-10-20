// Vanz@Port (v2.0.3) --- ported from @nexustechpro/baileys 2.2.7 (MIT, Copyright (c) 2026 nexustechpro2), lib/WAUSync/Protocols/. See NOTICE.md.
import { assertNodeErrorFree, getBinaryNodeChild } from '../../WABinary/index.js';
export class USyncTextStatusProtocol {
    constructor() {
        this.name = 'text_status';
    }
    getQueryElement() {
        return { tag: 'text_status', attrs: {} };
    }
    getUserElement() {
        return null;
    }
    parser(node) {
        if (node.tag !== 'text_status')
            return null;
        assertNodeErrorFree(node);
        const lastUpdateTimeSec = node.attrs?.last_update_time ? +node.attrs.last_update_time : 0;
        const ephemeralDurationSec = node.attrs?.ephemeral_duration_sec ? +node.attrs.ephemeral_duration_sec : 0;
        const text = node.attrs?.text ?? null;
        const emoji = getBinaryNodeChild(node, 'emoji')?.attrs?.content ?? null;
        const expiresAt = ephemeralDurationSec > 0 ? new Date((lastUpdateTimeSec + ephemeralDurationSec) * 1000) : null;
        return { text, emoji, setAt: new Date(lastUpdateTimeSec * 1000), expiresAt };
    }
}
