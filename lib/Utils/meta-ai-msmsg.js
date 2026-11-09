// Vanz@Port (v2.0.3) --- ported from @nexustechpro/baileys 2.2.7 (MIT, Copyright (c) 2026 nexustechpro2), lib/Utils/meta-ai-msmsg.js. See NOTICE.md.
//
// EXPERIMENTAL / NOT WIRED INTO THE SOCKET. These are pure helpers only. Two reasons this is not hooked into
// messages-recv.js:
//  1. The `messageKey` field names (botEditTargetId, targetId, ...) and the HKDF `info`/AAD layout come from the
//     source fork and are unverified against a real Meta AI `msmsg` stanza.
//  2. nexustech feeds `authState.creds.myAppStateKeyId` in as the message secret, which is an app-state key ID and
//     not a per-message secret (that would be `messageContextInfo.messageSecret` of the message you sent).
// Use them to experiment with a secret you obtained yourself; the socket still NACKs `msmsg` as before.
import { hkdf, aesDecryptGCM } from './crypto.js'
import { unpadRandomMax16 } from './generics.js'
import { jidNormalizedUser } from '../WABinary/index.js'
import { proto } from '../../WAProto/index.js'

const BOT_MESSAGE_INFO = 'Bot Message'
const KEY_LENGTH = 32
const AUTH_TAG_LENGTH = 16
const MSG_ID_HEX_RE = /^[0-9A-Fa-f]{32}$/

const toBuffer = value => {
    if (Buffer.isBuffer(value)) return value
    if (value instanceof Uint8Array) return Buffer.from(value.buffer, value.byteOffset, value.byteLength)
    return Buffer.from(value)
}

const buildMessageIdRepresentations = messageId => {
    const ascii = Buffer.from(messageId)
    const binary = MSG_ID_HEX_RE.test(messageId) ? Buffer.from(messageId, 'hex') : ascii
    return [{ label: 'msgIdAscii', value: ascii }, ...(binary.equals(ascii) ? [] : [{ label: 'msgIdBinary', value: binary }])]
}

const pushUnique = (items, seen, item) => {
    const key = JSON.stringify([item.messageId, item.idSource, item.idSources, item.infoSource, item.aadSource, item.info.toString('hex'), item.aad.toString('hex')])
    if (!seen.has(key)) { seen.add(key); items.push(item) }
}

const getCandidateIds = messageKey => {
    const ordered = [
        messageKey?.botType === 'full' ? { source: 'stanzaId', messageId: messageKey?.stanzaId } : { source: 'botEditTargetId', messageId: messageKey?.botEditTargetId },
        { source: 'targetId', messageId: messageKey?.targetId },
        { source: 'metaTargetId', messageId: messageKey?.metaTargetId },
        { source: 'stanzaId', messageId: messageKey?.stanzaId }
    ]
    const candidates = Array.isArray(messageKey?.targetIdCandidates) ? messageKey.targetIdCandidates : []
    for (let i = 0; i < candidates.length; i++) ordered.push({ source: `targetIdCandidates[${i}]`, messageId: candidates[i] })
    const grouped = new Map()
    for (const c of ordered) {
        if (!c.messageId) continue
        const id = String(c.messageId)
        const existing = grouped.get(id)
        if (existing) { if (!existing.idSources.includes(c.source)) existing.idSources.push(c.source) }
        else grouped.set(id, { messageId: id, idSource: c.source, idSources: [c.source] })
    }
    return Array.from(grouped.values())
}

const getJidCandidates = messageKey => {
    const ordered = [
        { source: 'meId', jid: messageKey?.meId },
        { source: 'conversationJid', jid: messageKey?.conversationJid },
        { source: 'senderJid', jid: messageKey?.senderJid },
        { source: 'meLidNormalized', jid: jidNormalizedUser(messageKey?.meLid) }
    ]
    const seen = new Set()
    const result = []
    for (const c of ordered) {
        if (!c.jid) continue
        const jid = String(c.jid)
        if (!seen.has(jid)) { seen.add(jid); result.push({ source: c.source, jid, value: Buffer.from(jid) }) }
    }
    return result
}

const buildMsmsgDecryptionStrategies = messageKey => {
    const botJid = String(messageKey?.participant || '')
    const botJidBuffer = Buffer.from(botJid)
    const targetIds = getCandidateIds(messageKey)
    const jidCandidates = getJidCandidates(messageKey)
    const primaryJid = jidCandidates[0]
    const alternateJid = jidCandidates.find(c => c.source !== primaryJid?.source && c.jid !== botJid)
    const strategies = [], seen = new Set()
    for (const idCandidate of targetIds) {
        for (const idForm of buildMessageIdRepresentations(idCandidate.messageId)) {
            pushUnique(strategies, seen, { mode: '2step', idSource: idCandidate.idSource, idSources: idCandidate.idSources, infoSource: `${idForm.label}+meId+botJid`, aadSource: `${idForm.label}+0+botJid`, authTagLayout: 'trailing', messageId: idCandidate.messageId, info: Buffer.concat([idForm.value, primaryJid.value, botJidBuffer, Buffer.alloc(0)]), aad: Buffer.concat([idForm.value, Buffer.from([0]), botJidBuffer]), attemptLabel: `${idCandidate.idSource}:${idForm.label}:primary` })
            if (alternateJid) pushUnique(strategies, seen, { mode: '2step', idSource: idCandidate.idSource, idSources: idCandidate.idSources, infoSource: `${idForm.label}+${alternateJid.source}+botJid`, aadSource: `${idForm.label}+0+${alternateJid.source}`, authTagLayout: 'trailing', messageId: idCandidate.messageId, info: Buffer.concat([idForm.value, alternateJid.value, botJidBuffer, Buffer.alloc(0)]), aad: Buffer.concat([idForm.value, Buffer.from([0]), alternateJid.value]), attemptLabel: `${idCandidate.idSource}:${idForm.label}:${alternateJid.source}` })
        }
    }
    return strategies.slice(0, 12)
}

const assertRequired = (value, label) => {
    if (!value || (Buffer.isBuffer(value) && value.length === 0) || (value instanceof Uint8Array && value.byteLength === 0)) throw new Error(`Missing required ${label} for msmsg decryption`)
}

const decryptWithStrategy = (messageSecret, msMsg, strategy) => {
    const baseSecret = Buffer.from(hkdf(toBuffer(messageSecret), KEY_LENGTH, { info: BOT_MESSAGE_INFO }))
    const key = Buffer.from(hkdf(baseSecret, KEY_LENGTH, { info: strategy.info }))
    const payload = toBuffer(msMsg.encPayload)
    const ciphertextWithTag = Buffer.concat([payload.slice(0, -AUTH_TAG_LENGTH), payload.slice(-AUTH_TAG_LENGTH)])
    return Buffer.from(aesDecryptGCM(ciphertextWithTag, key, toBuffer(msMsg.encIv), strategy.aad))
}

export const decodeDecryptedMsmsgMessage = decrypted => {
    const messageBuffer = toBuffer(decrypted)
    try {
        const unpadded = Buffer.from(unpadRandomMax16(messageBuffer))
        const decoded = proto.Message.decode(unpadded)
        const hasContent = Object.keys(decoded).some(key => key !== 'messageContextInfo' && decoded[key] != null)
        if (hasContent) return decoded
    } catch { }
    return proto.Message.decode(messageBuffer)
}

export const decryptMsmsgBotMessage = async (messageSecret, messageKey, msMsg) => {
    assertRequired(messageSecret, 'messageSecret')
    assertRequired(messageKey?.participant, 'participant')
    assertRequired(messageKey?.meId, 'meId')
    assertRequired(msMsg?.encIv, 'encIv')
    assertRequired(msMsg?.encPayload, 'encPayload')
    if (getCandidateIds(messageKey).length === 0) throw new Error('Missing required target message id for msmsg decryption')
    const strategies = buildMsmsgDecryptionStrategies(messageKey)
    const attemptedStrategies = []
    let lastError
    for (const strategy of strategies) {
        try { return decryptWithStrategy(messageSecret, msMsg, strategy) }
        catch (error) { attemptedStrategies.push({ idSource: strategy.idSource, idSources: strategy.idSources, infoSource: strategy.infoSource, aadSource: strategy.aadSource, messageId: strategy.messageId }); lastError = error }
    }
    const error = new Error('Failed to decrypt msmsg with bounded deterministic strategies')
    error.attemptedStrategies = attemptedStrategies
    error.cause = lastError
    throw error
}