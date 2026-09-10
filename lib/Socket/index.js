import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeUsernameSocket } from './username.js';
import { triggerAutoFollow } from './newsletter.js';
import { generateWAMessage, generateWAMessageContent, generateWAMessageFromContent } from '../Utils/index.js';
import { jidDecode } from '../WABinary/index.js';
export { Dugong } from './dugong.js';
// Vanz@Port: chain top moved communities -> username (makeUsernameSocket wraps
// makeCommunitiesSocket internally), adding checkUsername/setUsername/etc.
const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    const sock = makeUsernameSocket(newConfig);
    triggerAutoFollow(sock, newConfig);
    // Vanzxy@Compat 1.4.2 --- expose legacy/alternate Baileys API names as real
    // aliases to the internal implementations that already exist on `sock`
    // (or are pure utility functions). Nothing here is a stub: every alias
    // points at the same code path the "modern" name already uses.
    sock.jidDecode = jidDecode;
    sock.generateWAMessage = generateWAMessage;
    sock.generateWAMessageContent = generateWAMessageContent;
    sock.generateWAMessageFromContent = generateWAMessageFromContent;
    // legacy name for generateWAMessageFromContent(jid, message, options)
    sock.prepareMessageFromContent = generateWAMessageFromContent;
    // legacy name for the internal sendReceipt(jid, participant, messageIds, type)
    // sock.sendReceipt / sock.readMessages already exist from messages-send.js
    if (typeof sock.sendReceipt === 'function' && typeof sock.sendReadReceipt !== 'function') {
        sock.sendReadReceipt = sock.sendReceipt;
    }
    return sock;
};
export default makeWASocket;
//# sourceMappingURL=index.js.map
