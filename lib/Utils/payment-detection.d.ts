/** Verifica se a webMessage contém uma mensagem de pagamento — visível ou stealth. */
export function hasPaymentMessage(webMessage: any): boolean;
/**
 * Lê a marcação (quoted) de uma mensagem de pagamento — inclusive as enviadas
 * de forma oculta para admins — e devolve o autor original e o id da
 * mensagem citada. Ignora citações aninhadas para não atribuir o pagamento errado.
 */
export function getQuotedPaymentContext(webMessage: any): any;
/**
 * Registra o envelope de uma mensagem de grupo. `isPayment` é calculado pelo
 * chamador (que já roda a detecção de pagamento) para evitar import cíclico.
 */
export function recordMessageEnvelope(webMessage: any, isPayment: any): void;
/**
 * Decide se uma marcação de pagamento é confiável o bastante para punir o autor.
 *
 * - corroborated: o bot recebeu a mensagem original, do MESMO autor, e ela era
 *   pagamento OU foi indecifrável (consistente com o truque stealth). Pode punir.
 * - contradicted: o bot recebeu a mensagem, mas de OUTRO autor, ou ela era
 *   conteúdo legível que não era pagamento. É forja. Nunca punir.
 * - nenhum dos dois: o bot não viu a mensagem original. Sem corroboração, não pune.
 */
export function verifyQuotedAuthor(opts1: { [key: string]: any; 
    groupJid: any;
    stanzaId: any;
    participant: any;
}): {
    corroborated: boolean;
    contradicted: boolean;
};
/** Apenas para testes: limpa o registro. */
export function __clearEnvelopeRegistry(): void;
/**
 * Extrai o valor monetário de um requestPaymentMessage / sendPaymentMessage.
 * Retorna { value, currencyCode } ou null se não encontrar.
 */
export function extractPaymentAmount(webMessage: any): {
    value: number;
    currencyCode: any;
};
