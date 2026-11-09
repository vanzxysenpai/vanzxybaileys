// Vanz@Add (v2.1.0) --- ported from @rinv/baileys experimental.js (ExpiringButton), generalised:
// wraps ANY builder with a `send(jid, opts)` (Button, ButtonV2/V3, Carousel, AIRich, A2UI...) and
// deletes the sent message after `seconds`. (rinv's setViewOnce/ChipButton/Poll were NOT ported:
// `interactiveMessage.viewOnce` does not exist in WAProto so it is dropped on encode, ChipButton
// is a legacy listMessage with a hardcoded Arabic label, and Poll duplicates ./Poll.js.)
export class Expiring {
	/**
	 * @param {object} client socket (needs sendMessage)
	 * @param {{ send: Function }} builder configured builder instance
	 * @param {number} [seconds=30] delay before the message is deleted for everyone
	 */
	constructor(client, builder, seconds = 30) {
		if (!client?.sendMessage) throw new TypeError('Expiring: client with sendMessage() is required');
		if (!builder || typeof builder.send !== 'function') throw new TypeError('Expiring: builder must expose send()');
		this._client = client;
		this._builder = builder;
		this._seconds = Math.max(1, Number(seconds) || 30);
	}

	async send(jid, opts = {}) {
		const res = await this._builder.send(jid, opts);
		const key = res?.key ?? (res?.remoteJid ? res : null);
		if (key?.id) {
			const t = setTimeout(async () => {
				try { await this._client.sendMessage(key.remoteJid ?? jid, { delete: key }); } catch { /* already gone */ }
			}, this._seconds * 1000);
			t.unref?.();
		}
		return res;
	}
}
export { Expiring as ExpiringButton };
