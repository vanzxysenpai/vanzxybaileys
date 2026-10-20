export function migrateAuthState(opts1: { [key: string]: any; 
    from: any;
    to: any;
    batchSize?: number;
    skipExisting?: boolean;
    logger: any;
    verify?: boolean;
}): Promise<{
    creds: {
        copied: boolean;
    };
    counts: {};
    verified: boolean;
    warnings: any[];
}>;
/**
 * Full AuthenticationState migration helper.
 *
 * Adapted from the MIT-licensed WhiskeySockets/Baileys migration utility.
 * Vanzxy version is intentionally JS/runtime-focused and only relies on the
 * optional list/listIds methods added to SignalKeyStore.
 */
export const ALL_TYPES: string[];
