// Vanz@Port (2.0.3) --- from kangwifi72/baileys 1.4.9 (validateE164, jidToPhone, phoneToJid), with fixes.
// NOT ported: donor normalizePhoneNumber (strips a leading 0 whenever length > 10 -- wrong for most locales, e.g. 08xx -> 62xx needs a country code).
/** Validate an E.164 number (optionally with '+'), returning it as '+<digits>'. Throws on invalid input. */
export const validateE164 = (raw) => {
    if (typeof raw !== 'string') {
        throw new TypeError(`Invalid E.164 number: ${String(raw)}`);
    }
    let num = raw.trim();
    if (num.startsWith('+')) {
        num = num.slice(1);
    }
    if (!/^[1-9][0-9]{6,14}$/.test(num)) {
        throw new Error(`Invalid E.164 number: ${raw}`);
    }
    return `+${num}`;
};
/** '628123@s.whatsapp.net' -> '628123'; '' for anything that is not a plain phone-number JID (LID, group, bot...). */
export const jidToPhone = (jid) => {
    const match = typeof jid === 'string' ? jid.match(/^(\d+)(?::\d+)?@(?:s\.whatsapp\.net|c\.us)$/) : null;
    return match ? match[1] : '';
};
/** Digits of `phone` -> '<digits>@s.whatsapp.net' (or '@g.us' when isGroup). Throws when no digits are present. */
export const phoneToJid = (phone, isGroup = false) => {
    const digits = String(phone ?? '').replace(/[^0-9]/g, '');
    if (!digits) {
        throw new Error(`Cannot build a JID from "${phone}"`);
    }
    return `${digits}@${isGroup ? 'g.us' : 's.whatsapp.net'}`;
};
