// Passkey companion-linking notification helper.
// Adapted from the MIT-licensed WhiskeySockets/Baileys passkey helper (PR #2696).
const SUPPORTED_PASSKEY_TYPES = new Set(['passkey_prologue_request', 'crsc_continuation']);

export const getPasskeyRequestState = (node) => {
    const type = node?.attrs?.type;
    if (!SUPPORTED_PASSKEY_TYPES.has(type)) return undefined;
    const content = Array.isArray(node?.content) ? node.content : [];
    const hasOptions = content.some((item) => item && typeof item === 'object' && 'tag' in item);
    return { type, hasOptions };
};
