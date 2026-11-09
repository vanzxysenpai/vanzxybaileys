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
export function buildPaymentAccount(accountType: "bank_account" | "digital_wallet", identifierType: "id_account_number" | "phone_number", identifier: string, institution: string, beneficiaryName: string): {
    type: string;
    payment_account: {
        account_type: "bank_account" | "digital_wallet";
        identifier_type: "id_account_number" | "phone_number";
        identifier_value: string;
        institution_name: string;
        beneficiary_name: string;
    };
};
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
export function buildPaymentParams(opts3?: { [key: string]: any; 
    amount: number;
    item: string;
    note?: string;
    done?: boolean;
    accounts?: object[];
}): string;
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
export function sendPayment(client: any, jid: string, spec: object, opts1?: { [key: string]: any; 
    title?: string;
    body?: string;
    footer?: string;
    image?: string;
}): Promise<any>;
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
export function Pay(client: any, jid: string, spec: object, opts2?: { [key: string]: any; 
    title?: string;
    body?: string;
    footer?: string;
    image?: string;
}): Promise<any>;
