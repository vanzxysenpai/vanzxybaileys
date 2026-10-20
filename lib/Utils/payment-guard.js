// Vanz@Port --- ported from @lpzeravk/baileys 1.0.0 (payment-guard.js). Creator credits untouched. See NOTICE.md.
// lib/Utils/payment-guard.js
//
// Encanamento genérico para detecção de mensagens de pagamento "stealth"
// (ocultas/editadas). A LIB não decide o que é payment — isso é lógica do
// seu bot. Aqui só garantimos que NENHUM caminho de entrada fica sem cobrir:
//
//   1) Mensagem direta normal      -> 'messages.upsert'
//   2) Mensagem EDITADA depois     -> 'messages.update' (protocolMessage MESSAGE_EDIT)
//   3) Mensagem que falhou decrypt -> 'messages.decrypt-failed' (emitido pela lib)
//
// Limite real (sem prometer o impossível): uma mensagem que falha no decrypt
// (PreKey/CIPHERTEXT) nunca foi lida pelo bot — não existe forma de "ver" que
// é payment. O que dá pra garantir é que isso nunca passe em silêncio: o
// evento é sempre emitido, e cabe ao seu detector decidir o que fazer com a
// falta de conteúdo (ex: tratar como suspeito, igual ao 'unreadable' que você
// já usa no seu messageEnvelopeRegistry).
//
// Você injeta sua própria lógica (paymentMessage.js, messageEnvelopeRegistry.js
// etc. do seu bot) via callbacks — a lib não importa nada do seu projeto.

/**
 * @typedef {Object} PaymentGuardHooks
 * @property {(webMessage: any) => boolean} isPaymentMessage
 *   Função que decide se um webMessage (ou webMessage sintético de edição)
 *   é uma mensagem de pagamento. Normalmente seu `hasPaymentMessage`.
 * @property {(webMessage: any, isPayment: boolean) => void} [recordEnvelope]
 *   Chamado para TODA mensagem de grupo vista (payment ou não), inclusive
 *   falhas de decrypt (com `webMessage.message === null`). Normalmente seu
 *   `recordMessageEnvelope`.
 * @property {(detection: PaymentDetection) => void} onDetect
 *   Chamado sempre que uma detecção (direta, editada ou indecifrável
 *   suspeita) acontece.
 * @property {boolean} [treatDecryptFailureAsSuspicious=true]
 */

/**
 * @typedef {Object} PaymentDetection
 * @property {'direct'|'edited'|'undecryptable'} type
 * @property {string} remoteJid
 * @property {string|undefined} participant
 * @property {string|undefined} messageId
 * @property {boolean} [isPreKeyError]
 * @property {string} [errorMessage]
 */

const extractEditedContent = (updateEntry) => updateEntry?.update?.message?.editedMessage?.message || null;

/**
 * Liga o guard completo num socket Baileys. Chame uma vez, logo após criar o sock.
 *
 * @param {import('../Socket/index.js').WASocket} sock
 * @param {PaymentGuardHooks} hooks
 * @returns {() => void} função de cleanup que remove todos os listeners
 */
export const bindPaymentGuard = (sock, hooks) => {
    const {
        isPaymentMessage,
        recordEnvelope = () => {},
        onDetect = () => {},
        treatDecryptFailureAsSuspicious = true,
    } = hooks || {};

    if (typeof isPaymentMessage !== 'function') {
        throw new Error('bindPaymentGuard: hooks.isPaymentMessage é obrigatório');
    }

    // ── 1) Mensagens diretas ────────────────────────────────────────────────
    const onUpsert = ({ messages }) => {
        for (const webMessage of messages || []) {
            const remoteJid = webMessage?.key?.remoteJid;
            if (!remoteJid?.endsWith('@g.us')) continue;

            const isPayment = isPaymentMessage(webMessage);
            recordEnvelope(webMessage, isPayment);

            if (isPayment) {
                onDetect({
                    type: 'direct',
                    remoteJid,
                    participant: webMessage.key?.participant,
                    messageId: webMessage.key?.id,
                });
            }
        }
    };

    // ── 2) Mensagens editadas (golpe de edição pós-envio) ───────────────────
    const onUpdate = (updates) => {
        for (const u of updates || []) {
            const editedContent = extractEditedContent(u);
            if (!editedContent) continue;

            const remoteJid = u.key?.remoteJid;
            if (!remoteJid?.endsWith('@g.us')) continue;

            const syntheticWebMessage = { message: editedContent, key: u.key };
            const isPayment = isPaymentMessage(syntheticWebMessage);
            recordEnvelope(syntheticWebMessage, isPayment);

            if (isPayment) {
                onDetect({
                    type: 'edited',
                    remoteJid,
                    participant: u.key?.participant,
                    messageId: u.key?.id,
                });
            }
        }
    };

    // ── 3) Falha de decrypt (PreKey / CIPHERTEXT) ───────────────────────────
    const onDecryptFailed = (failInfo) => {
        const remoteJid = failInfo?.remoteJid;
        if (!remoteJid?.endsWith('@g.us')) return;

        recordEnvelope(
            { key: { remoteJid, id: failInfo.messageId, participant: failInfo.participant }, message: null },
            false
        );

        if (treatDecryptFailureAsSuspicious) {
            onDetect({
                type: 'undecryptable',
                remoteJid,
                participant: failInfo.participant,
                messageId: failInfo.messageId,
                isPreKeyError: failInfo.isPreKeyError,
                errorMessage: failInfo.errorMessage,
            });
        }
    };

    sock.ev.on('messages.upsert', onUpsert);
    sock.ev.on('messages.update', onUpdate);
    sock.ev.on('messages.decrypt-failed', onDecryptFailed);

    return function unbindPaymentGuard() {
        sock.ev.off('messages.upsert', onUpsert);
        sock.ev.off('messages.update', onUpdate);
        sock.ev.off('messages.decrypt-failed', onDecryptFailed);
    };
};
