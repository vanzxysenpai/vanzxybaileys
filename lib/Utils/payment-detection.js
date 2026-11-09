// Vanz@Port --- ported from @lpzeravk/baileys 1.0.0 (payment-detection.js). Creator credits untouched. See NOTICE.md.
/**
 * Detecção de mensagens de pagamento — incluindo cobranças STEALTH
 * (ocultas para admins, indecifráveis pelo bot).
 *
 * Integrado na @lpzeravk/baileys.
 */

const MAX_PAYMENT_SCAN_DEPTH = 8;

const PAYMENT_MESSAGE_KEYS = new Set([
    'paymentInviteMessage',
    'requestPaymentMessage',
    'sendPaymentMessage',
    'cancelPaymentRequestMessage',
    'declinePaymentRequestMessage',
]);

function canScanObject(value) {
    return value && typeof value === 'object' && !(value instanceof ArrayBuffer) && !ArrayBuffer.isView(value);
}

function hasPaymentMessageKey(value, depth = 0, seenObjects = new WeakSet()) {
    if (!canScanObject(value) || depth > MAX_PAYMENT_SCAN_DEPTH || seenObjects.has(value)) {
        return false;
    }

    seenObjects.add(value);

    for (const [key, childValue] of Object.entries(value)) {
        if (key === 'quotedMessage') continue;

        if (PAYMENT_MESSAGE_KEYS.has(key) && canScanObject(childValue)) {
            return true;
        }

        if (hasPaymentMessageKey(childValue, depth + 1, seenObjects)) {
            return true;
        }
    }

    return false;
}

/** Verifica se a webMessage contém uma mensagem de pagamento — visível ou stealth. */
export function hasPaymentMessage(webMessage) {
    return hasPaymentMessageKey(webMessage?.message);
}

function findQuotedPaymentContext(value, depth = 0, seenObjects = new WeakSet()) {
    if (!canScanObject(value) || depth > MAX_PAYMENT_SCAN_DEPTH || seenObjects.has(value)) {
        return null;
    }

    seenObjects.add(value);

    const contextInfo = value.contextInfo;

    if (
        canScanObject(contextInfo) &&
        typeof contextInfo.participant === 'string' &&
        canScanObject(contextInfo.quotedMessage) &&
        hasPaymentMessageKey(contextInfo.quotedMessage)
    ) {
        return {
            participant: contextInfo.participant,
            stanzaId: typeof contextInfo.stanzaId === 'string' ? contextInfo.stanzaId : undefined,
        };
    }

    for (const [key, childValue] of Object.entries(value)) {
        if (key === 'quotedMessage') continue;
        const found = findQuotedPaymentContext(childValue, depth + 1, seenObjects);
        if (found) return found;
    }

    return null;
}

/**
 * Lê a marcação (quoted) de uma mensagem de pagamento — inclusive as enviadas
 * de forma oculta para admins — e devolve o autor original e o id da
 * mensagem citada. Ignora citações aninhadas para não atribuir o pagamento errado.
 */
export function getQuotedPaymentContext(webMessage) {
    return findQuotedPaymentContext(webMessage?.message);
}

// ─── Registro de envelopes (corroboração anti-forja) ──────────────────────

const ENVELOPE_TTL_MS = 60 * 60 * 1000; // 1 hora
const MAX_ENTRIES_PER_GROUP = 1000;

// registry: Map<groupJid, Map<msgId, {participant, contentState, stealth, ts}>>
const registry = new Map();

const NON_CONTENT_KEYS = new Set(['messageContextInfo', 'senderKeyDistributionMessage']);

function hasReadableContent(message) {
    if (!message || typeof message !== 'object') return false;
    return Object.keys(message).some((key) => !NON_CONTENT_KEYS.has(key));
}

function pruneGroup(groupMap) {
    const now = Date.now();

    for (const [id, entry] of groupMap) {
        if (now - entry.ts > ENVELOPE_TTL_MS) {
            groupMap.delete(id);
        }
    }

    while (groupMap.size > MAX_ENTRIES_PER_GROUP) {
        const oldestKey = groupMap.keys().next().value;
        if (oldestKey === undefined) break;
        groupMap.delete(oldestKey);
    }
}

/**
 * Registra o envelope de uma mensagem de grupo. `isPayment` é calculado pelo
 * chamador (que já roda a detecção de pagamento) para evitar import cíclico.
 */
export function recordMessageEnvelope(webMessage, isPayment) {
    const remoteJid = webMessage?.key?.remoteJid;
    const id = webMessage?.key?.id;
    const participant = webMessage?.key?.participant;

    if (!remoteJid?.endsWith('@g.us') || !id || !participant) return;

    let groupMap = registry.get(remoteJid);
    if (!groupMap) {
        groupMap = new Map();
        registry.set(remoteJid, groupMap);
    }

    const contentState = isPayment ? 'payment' : hasReadableContent(webMessage?.message) ? 'other' : 'unreadable';

    groupMap.set(id, {
        participant,
        contentState,
        stealth: Boolean(webMessage?.stealthMeta),
        ts: Date.now(),
    });

    pruneGroup(groupMap);
}

/**
 * Decide se uma marcação de pagamento é confiável o bastante para punir o autor.
 *
 * - corroborated: o bot recebeu a mensagem original, do MESMO autor, e ela era
 *   pagamento OU foi indecifrável (consistente com o truque stealth). Pode punir.
 * - contradicted: o bot recebeu a mensagem, mas de OUTRO autor, ou ela era
 *   conteúdo legível que não era pagamento. É forja. Nunca punir.
 * - nenhum dos dois: o bot não viu a mensagem original. Sem corroboração, não pune.
 */
export function verifyQuotedAuthor({ groupJid, stanzaId, participant }) {
    if (!stanzaId) return { corroborated: false, contradicted: false };

    const entry = registry.get(groupJid)?.get(stanzaId);
    if (!entry) return { corroborated: false, contradicted: false };

    if (entry.participant !== participant) {
        return { corroborated: false, contradicted: true };
    }

    if (entry.contentState === 'other') {
        return { corroborated: false, contradicted: true };
    }

    return { corroborated: true, contradicted: false };
}

/** Apenas para testes: limpa o registro. */
export function __clearEnvelopeRegistry() {
    registry.clear();
}

// ─── Extração de valor monetário ───────────────────────────────────────────

/**
 * Extrai o valor monetário de um requestPaymentMessage / sendPaymentMessage.
 * Retorna { value, currencyCode } ou null se não encontrar.
 */
export function extractPaymentAmount(webMessage) {
    try {
        const msg =
            webMessage?.message?.requestPaymentMessage ||
            webMessage?.message?.sendPaymentMessage ||
            webMessage?.message?.paymentInviteMessage;

        if (!msg) return null;

        if (msg.amount && msg.amount.value !== undefined) {
            const raw = typeof msg.amount.value === 'object' ? msg.amount.value.low ?? 0 : Number(msg.amount.value);
            const offset = msg.amount.offset || 100;
            return {
                value: raw / offset,
                currencyCode: msg.amount.currencyCode || msg.currencyCodeIso4217 || '???',
            };
        }

        if (msg.amount1000 !== undefined) {
            const raw = typeof msg.amount1000 === 'object' ? msg.amount1000.low ?? 0 : Number(msg.amount1000);
            return { value: raw / 1000, currencyCode: msg.currencyCodeIso4217 || '???' };
        }

        return null;
    } catch {
        return null;
    }
}
