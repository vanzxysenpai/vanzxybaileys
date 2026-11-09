import { randomBytes } from 'node:crypto';

// Vanz@Add (v2.1.13) --- ported from betton androidId.js. Android-style stanza ids ("AC" + 19 hex chars).

/** @returns {string} A fresh Android-style message id. */
export const generateAndroidStanzaId = () => 'AC' + randomBytes(10).toString('hex').toUpperCase().slice(0, 19);

/**
 * Patch `sock.relayMessage` and `sock.sendMessage` so every message without an explicit `messageId`
 * gets an Android-style id. Idempotent per socket.
 * @param {object} sock Active socket. @param {{ success?: Function }} [logger] Optional logger.
 */
export const patchAndroidStanzaId = (sock, logger) => {
	if (!sock || sock._androidIdPatched) return sock;
	sock._androidIdPatched = true;
	const relay = sock.relayMessage.bind(sock);
	sock.relayMessage = (jid, message, options = {}) => relay(jid, message, options.messageId ? options : { ...options, messageId: generateAndroidStanzaId() });
	const send = sock.sendMessage.bind(sock);
	sock.sendMessage = (jid, content, options = {}) => send(jid, content, options.messageId ? options : { ...options, messageId: generateAndroidStanzaId() });
	logger?.success?.('[Android ID] sock.relayMessage + sock.sendMessage patched');
	return sock;
};
