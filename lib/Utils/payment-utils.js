// Vanz@Add --- ported from MessageBuilder.js (Go reference, v4.7-beta3)
// BuildPaymentParams/paymentAccounts/SendPaymentFlow. That reference hand-rolls the whole
// interactiveMessage + <biz native_flow_name="order_details"/> node by hand; this fork's
// Button class already builds interactiveMessage generically AND already special-cases
// 'review_and_pay' -> { v: '1', name: 'order_details' } in its own #SPECIAL_FLOW table
// (see Button.js), with the biz node picked automatically by getBizBinaryNode(). So this
// file only ports the parts Button.js has no equivalent for: the `review_and_pay`
// buttonParamsJson payload shape itself (BuildPaymentParams) — reusing Button for
// everything else instead of duplicating interactiveMessage/biz-node logic.
//
// Go's reference hardcodes ONE person's own bank accounts/phone number as package-level
// consts (`acct`, `phone`, `beneficiaryName`). That's intentionally NOT ported here —
// `accounts` is a required argument so every caller supplies their own payout details.

// Button is imported lazily inside sendPayment(): Button.js imports buildPaymentParams() from this file (Button#addPay), so a static import here would be circular.

/**
 * Build one `payment_account` entry for `payment_settings` (shown as a payout option on a
 * PENDING/request card). `institution` must exactly match WhatsApp's registry name for that
 * bank/e-wallet, or its logo won't render.
 * @param {'bank_account'|'digital_wallet'} accountType
 * @param {'id_account_number'|'phone_number'} identifierType
 * @param {string} identifier Account number or phone number.
 * @param {string} institution Exact registry name, e.g. "Bank Central Asia", "GoPay".
 * @param {string} beneficiaryName Payee name shown on every listed account.
 */
export function buildPaymentAccount(accountType, identifierType, identifier, institution, beneficiaryName) {
	return {
		type: 'payment_account',
		payment_account: {
			account_type: accountType,
			identifier_type: identifierType,
			identifier_value: identifier,
			institution_name: institution,
			beneficiary_name: beneficiaryName,
		},
	};
}

/**
 * Build the `review_and_pay` native-flow button's `buttonParamsJson` payload.
 * @param {object} spec
 * @param {number} spec.amount Nominal amount, in rupiah (whole units, not cents).
 * @param {string} spec.item Item/product name shown on the card.
 * @param {string} [spec.note] Additional note/description.
 * @param {boolean} [spec.done] `false` (default) = PENDING request card with a "Lihat opsi
 *   pembayaran" button listing `spec.accounts`. `true` = COMPLETED card (already paid).
 * @param {object[]} [spec.accounts] Payout options for the PENDING card — array of
 *   `buildPaymentAccount(...)` results. Required (and only used) when `done` is falsy.
 * @returns {string} The JSON-stringified payload, ready for `Button#addButton('review_and_pay', ...)`.
 */
export function buildPaymentParams({ amount, item, note = '', done = false, accounts = [] } = {}) {
	if (typeof amount !== 'number' || !Number.isFinite(amount)) {
		throw new TypeError('buildPaymentParams: spec.amount must be a finite number');
	}
	if (typeof item !== 'string' || !item) {
		throw new TypeError('buildPaymentParams: spec.item must be a non-empty string');
	}

	const value = amount * 100; // offset 100 -> value = rupiah * 100
	const money = { value, offset: 100 };

	if (done) {
		const refId = `CPAY-${Date.now()}`;
		const item_ = {
			retailer_id: `item-${Date.now()}${Math.floor(Math.random() * 1e6)}`,
			name: item,
			amount: money,
			quantity: 1,
		};

		return JSON.stringify({
			currency: 'IDR',
			total_amount: money,
			reference_id: refId,
			type: 'physical-goods',
			additional_note: note,
			native_payment_methods: [],
			share_payment_status: true,
			payment_type: '',
			payment_method: 'confirm',
			payment_status: 'captured',
			payment_timestamp: Date.now(),
			payment_configuration: '',
			order: {
				status: 'completed',
				order_type: 'PAYMENT_REQUEST',
				subtotal: money,
				items: [item_],
			},
		});
	}

	if (!accounts.length) {
		throw new TypeError('buildPaymentParams: spec.accounts is required (and non-empty) when spec.done is not true');
	}

	const refId = `PAY-${Date.now()}`;
	const item_ = {
		name: item,
		amount: money,
		quantity: 1,
		description: note,
	};

	return JSON.stringify({
		currency: 'IDR',
		total_amount: money,
		reference_id: refId,
		type: 'physical-goods',
		additional_note: note,
		native_payment_methods: [],
		share_payment_status: false,
		payment_configuration: '',
		payment_type: 'upr',
		payment_settings: accounts,
		order: {
			status: 'pending',
			description: note,
			order_type: 'PAYMENT_REQUEST',
			items: [item_],
			subtotal: money,
			tax: { value: 0, offset: 100 },
			shipping: { value: 0, offset: 100 },
			discount: { value: 0, offset: 100 },
		},
	});
}

/**
 * Build and send a `review_and_pay` order/payment card via the existing `Button` builder.
 * Thin convenience wrapper around `buildPaymentParams()` + `Button` — for anything beyond a
 * single header image/title/body/footer/button (e.g. extra buttons alongside the payment
 * one), build the `Button` yourself and call `.addButton('review_and_pay', buildPaymentParams(spec))`.
 * @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket.
 * @param {string} jid Destination chat/group jid.
 * @param {object} spec Same shape as `buildPaymentParams()`'s `spec`.
 * @param {object} [opts]
 * @param {string} [opts.title] Header title. @param {string} [opts.body] Body text.
 * @param {string} [opts.footer] Footer text. @param {string} [opts.image] Header image URL.
 */
export async function sendPayment(client, jid, spec, { title = '', body = '', footer = '', image } = {}) {
	const { Button } = await import('../Builders/index.js');
	const params = buildPaymentParams(spec);
	const btn = new Button(client);

	if (title) btn.setTitle(title);
	if (body) btn.setBody(body);
	if (footer) btn.setFooter(footer);
	if (image) btn.setImage(image);

	btn.addButton('review_and_pay', params);

	return btn.send(jid);
}

/** Go-name alias of `sendPayment()` (Go `MessageBuilder.Pay` + `Send`). */
export const Pay = sendPayment;
