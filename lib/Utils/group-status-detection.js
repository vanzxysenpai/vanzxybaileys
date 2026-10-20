// Vanz@Port --- ported from @lpzeravk/baileys 1.0.0 (group-status-detection.js). Creator credits untouched. See NOTICE.md.
/**
 * Detecção robusta de mensagens de status-em-grupo (marcação de status no grupo).
 *
 * Cobre:
 *  - groupStatusMentionMessage / groupStatusMessage / groupStatusMessageV2
 *  - isGroupStatus: true | 1 em qualquer nível
 *  - statusAttributions com type GROUP_STATUS / type 5 / groupStatus: true
 *  - mensagens aninhadas em wrappers (ephemeral, viewOnce, etc)
 *
 * Integrado na @lpzeravk/baileys.
 */

const MAX_MESSAGE_UNWRAP_DEPTH = 5;
const MAX_FLAG_SCAN_DEPTH = 8;

const STRONG_GROUP_STATUS_MESSAGE_KEYS = new Set([
    'groupStatusMentionMessage',
    'groupStatusMessage',
    'groupStatusMessageV2',
]);

const WRAPPED_MESSAGE_KEYS = [
    'ephemeralMessage',
    'viewOnceMessage',
    'viewOnceMessageV2',
    'viewOnceMessageV2Extension',
    'documentWithCaptionMessage',
    'statusMentionMessage',
    'groupStatusMentionMessage',
    'groupStatusMessage',
    'groupStatusMessageV2',
];

export function isGroupStatusValue(value) {
    return value === true || value === 1;
}

function canScanObject(value) {
    return value && typeof value === 'object' && !(value instanceof ArrayBuffer) && !ArrayBuffer.isView(value);
}

function hasGroupStatusAttribution(statusAttributions) {
    if (!Array.isArray(statusAttributions)) return false;

    return statusAttributions.some(
        (sa) =>
            canScanObject(sa) &&
            (Boolean(sa.groupStatus) || sa.attributionData === 'groupStatus' || sa.type === 'GROUP_STATUS' || sa.type === 5)
    );
}

function hasGroupStatusContextInfo(contextInfo) {
    return (
        canScanObject(contextInfo) &&
        (isGroupStatusValue(contextInfo.isGroupStatus) || hasGroupStatusAttribution(contextInfo.statusAttributions))
    );
}

export function hasGroupStatusFlag(value, depth = 0, seenObjects = new WeakSet()) {
    if (!canScanObject(value) || depth > MAX_FLAG_SCAN_DEPTH || seenObjects.has(value)) {
        return false;
    }

    seenObjects.add(value);

    for (const [key, childValue] of Object.entries(value)) {
        if (key === 'quotedMessage') continue;

        if (STRONG_GROUP_STATUS_MESSAGE_KEYS.has(key) && canScanObject(childValue)) {
            return true;
        }

        if (key === 'isGroupStatus' && isGroupStatusValue(childValue)) {
            return true;
        }

        if (key === 'statusAttributions' && hasGroupStatusAttribution(childValue)) {
            return true;
        }

        if (key === 'contextInfo' && hasGroupStatusContextInfo(childValue)) {
            return true;
        }

        if (hasGroupStatusFlag(childValue, depth + 1, seenObjects)) {
            return true;
        }
    }

    return false;
}

export function getCurrentMessageContentVariants(message, depth = 0, seenObjects = new WeakSet()) {
    if (!canScanObject(message) || depth > MAX_MESSAGE_UNWRAP_DEPTH || seenObjects.has(message)) {
        return [];
    }

    seenObjects.add(message);

    const variants = [message];

    for (const key of WRAPPED_MESSAGE_KEYS) {
        const wrappedMessage = message[key]?.message;
        variants.push(...getCurrentMessageContentVariants(wrappedMessage, depth + 1, seenObjects));
    }

    return variants;
}

/** Verifica se a webMessage é uma marcação de status em grupo, inclusive em wrappers ou níveis profundos. */
export function hasGroupStatusMessage(webMessage) {
    return getCurrentMessageContentVariants(webMessage?.message).some((message) => hasGroupStatusFlag(message));
}
