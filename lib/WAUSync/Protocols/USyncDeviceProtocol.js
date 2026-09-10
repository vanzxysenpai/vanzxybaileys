import { assertNodeErrorFree, getBinaryNodeChild } from '../../WABinary/index.js';
export class USyncDeviceProtocol {
    constructor() {
        this.name = 'devices';
    }
    getQueryElement() {
        return {
            tag: 'devices',
            attrs: {
                version: '2'
            }
        };
    }
    getUserElement(user) {
        // Vanz@Fix (bug 51): Implement device phashing for sync
        // Include phash (participant hash) if devices exist to enable proper sync
        if (user?.devices?.deviceList && user.devices.deviceList.length > 0) {
            return {
                tag: 'devices',
                attrs: {
                    phash: user.devices.phash || '',
                    ts: user.devices.keyIndex?.timestamp?.toString() || '',
                    expectedTs: user.devices.keyIndex?.expectedTimestamp?.toString() || ''
                }
            };
        }
        return null;
    }
    parser(node) {
        const deviceList = [];
        let keyIndex = undefined;
        if (node.tag === 'devices') {
            assertNodeErrorFree(node);
            const deviceListNode = getBinaryNodeChild(node, 'device-list');
            const keyIndexNode = getBinaryNodeChild(node, 'key-index-list');
            if (Array.isArray(deviceListNode?.content)) {
                for (const { tag, attrs } of deviceListNode.content) {
                    const id = +attrs.id;
                    const keyIndex = +attrs['key-index'];
                    if (tag === 'device') {
                        deviceList.push({
                            id,
                            keyIndex,
                            isHosted: !!(attrs['is_hosted'] && attrs['is_hosted'] === 'true')
                        });
                    }
                }
            }
            if (keyIndexNode?.tag === 'key-index-list') {
                keyIndex = {
                    timestamp: +keyIndexNode.attrs['ts'],
                    signedKeyIndex: keyIndexNode?.content,
                    expectedTimestamp: keyIndexNode.attrs['expected_ts'] ? +keyIndexNode.attrs['expected_ts'] : undefined
                };
            }
        }
        return {
            deviceList,
            keyIndex
        };
    }
}
//# sourceMappingURL=USyncDeviceProtocol.js.map