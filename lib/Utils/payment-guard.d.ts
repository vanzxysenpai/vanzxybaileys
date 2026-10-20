export function bindPaymentGuard(sock: any, hooks: PaymentGuardHooks): () => void;
export type PaymentGuardHooks = {
    /**
     *   Função que decide se um webMessage (ou webMessage sintético de edição)
     *   é uma mensagem de pagamento. Normalmente seu `hasPaymentMessage`.
     */
    isPaymentMessage: (webMessage: any) => boolean;
    /**
     * Chamado para TODA mensagem de grupo vista (payment ou não), inclusive
     * falhas de decrypt (com `webMessage.message === null`). Normalmente seu
     * `recordMessageEnvelope`.
     */
    recordEnvelope?: (webMessage: any, isPayment: boolean) => void;
    /**
     *   Chamado sempre que uma detecção (direta, editada ou indecifrável
     *   suspeita) acontece.
     */
    onDetect: (detection: PaymentDetection) => void;
    treatDecryptFailureAsSuspicious?: boolean;
};
export type PaymentDetection = {
    type: "direct" | "edited" | "undecryptable";
    remoteJid: string;
    participant: string | undefined;
    messageId: string | undefined;
    isPreKeyError?: boolean;
    errorMessage?: string;
};
