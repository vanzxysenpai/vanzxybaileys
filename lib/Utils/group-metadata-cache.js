// Vanz@Port (2.0.3) --- from rexxhayanasi/elaina-baileys 1.3.10 (group-metadata-cache.js). Creator credits untouched. See NOTICE.md.
export const GROUP_ADDRESSING_MODES = Object.freeze(['pn', 'lid']);
/** A cached group metadata object is usable for fan-out only if it has a participant list AND a known addressing mode. */
export const isUsableGroupMetadata = (metadata) => {
    if (!metadata || typeof metadata !== 'object') {
        return false;
    }
    if (!Array.isArray(metadata.participants)) {
        return false;
    }
    return GROUP_ADDRESSING_MODES.includes(metadata.addressingMode);
};
/** Human-readable reason a cached group metadata object was rejected (for logs). */
export const describeUnusableGroupMetadata = (metadata) => {
    if (!metadata || typeof metadata !== 'object') {
        return 'nothing cached';
    }
    if (!Array.isArray(metadata.participants)) {
        return 'no participants';
    }
    if (metadata.addressingMode === undefined || metadata.addressingMode === null) {
        return 'no addressingMode';
    }
    return `addressingMode ${JSON.stringify(metadata.addressingMode)} is not pn or lid`;
};
