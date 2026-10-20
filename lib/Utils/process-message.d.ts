/**
 * Decrypt a poll vote
 * @param vote encrypted vote
 * @param ctx additional info about the poll required for decryption
 * @returns list of SHA256 options
 */
export function decryptPollVote(opts6: { [key: string]: any; 
    encPayload: any;
    encIv: any;
}, opts1: { [key: string]: any; 
    pollCreatorJid: any;
    pollMsgId: any;
    pollEncKey: any;
    voterJid: any;
}): proto.Message.PollVoteMessage;
/**
 * Decrypt an event response
 * @param response encrypted event response
 * @param ctx additional info about the event required for decryption
 * @returns event response message
 */
export function decryptEventResponse(opts7: { [key: string]: any; 
    encPayload: any;
    encIv: any;
}, opts2: { [key: string]: any; 
    eventCreatorJid: any;
    eventMsgId: any;
    eventEncKey: any;
    responderJid: any;
}): proto.Message.EventResponseMessage;
/**
 * Vanz@Add (v2.1.5) --- decrypt an `encReactionMessage` (encrypted reaction).
 *
 * Same key-derivation family as Poll Vote / Event Response, use-case string "Enc Reaction" (the constant whatsmeow
 * uses for EncSecretReaction). EXPERIMENTAL: derived from that sibling scheme, not yet validated against a captured
 * encrypted reaction from a live account -- a wrong constant just makes this throw (processMessage catches it and
 * emits `messages.reaction-encrypted` instead).
 *   info = targetMsgId || targetSenderJid || reactorJid || "Enc Reaction" || 0x01 ; key = HMAC chain over messageSecret
 *   aad  = targetMsgId \0 reactorJid
 * @returns {proto.Message.ReactionMessage}
 */
export function decryptEncReaction(opts8: { [key: string]: any; 
    encPayload: any;
    encIv: any;
}, opts3: { [key: string]: any; 
    targetSenderJid: any;
    targetMsgId: any;
    targetEncKey: any;
    reactorJid: any;
}): proto.Message.ReactionMessage;
/**
 * Decrypt a `secretEncryptedMessage` carrying a `MESSAGE_EDIT` payload.
 *
 * WhatsApp started wrapping message edits in an E2EE envelope (May 2026).
 * The new content is encrypted with a key derived from the original
 * message's `messageContextInfo.messageSecret` using HKDF-SHA256
 * + AES-256-GCM, same family as polls and event responses but with
 * different constants (validated against live WhatsApp Android traffic):
 *
 *   info = msgId || origSenderJid || editorJid || "Message Edit"
 *   aad  = (empty)              <-- differs from Poll Vote / Event Response
 *   key  = HKDF-SHA256(salt=zeros, ikm=messageSecret, info, L=32)
 *
 * The decrypted plaintext is a regular `proto.Message` whose
 * `protocolMessage.editedMessage` field holds the new content — same
 * shape as the legacy `protocolMessage.editedMessage` edit path, so
 * consumers can treat the result identically.
 *
 * @param edit encrypted edit payload (encPayload + encIv from SecretEncryptedMessage)
 * @param ctx info about the original message required for decryption
 * @returns decoded outer `Message` whose `protocolMessage.editedMessage`
 *   carries the new content (extendedTextMessage / conversation / etc.)
 */
export function decryptMessageEdit(opts9: { [key: string]: any; 
    encPayload: any;
    encIv: any;
}, opts4: { [key: string]: any; 
    originalSenderJid: any;
    originalMsgId: any;
    editEncKey: any;
    editorJid: any;
}): proto.Message;
export function cleanMessage(message: any, meId: any, meLid: any): void;
export function isRealMessage(message: any): boolean;
export function shouldIncrementChatUnread(message: any): boolean;
export function getChatId(opts10: { [key: string]: any; 
    remoteJid: any;
    participant: any;
    fromMe: any;
}): any;
export default processMessage;
import { proto } from '../../WAProto/index.js';
declare function processMessage(message: any, opts5: { [key: string]: any; 
    shouldProcessHistoryMsg: any;
    placeholderResendCache: any;
    ev: any;
    creds: any;
    signalRepository: any;
    keyStore: any;
    logger: any;
    options: any;
    getMessage: any;
}): Promise<void>;
