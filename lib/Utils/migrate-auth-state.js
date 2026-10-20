/**
 * Full AuthenticationState migration helper.
 *
 * Adapted from the MIT-licensed WhiskeySockets/Baileys migration utility.
 * Vanzxy version is intentionally JS/runtime-focused and only relies on the
 * optional list/listIds methods added to SignalKeyStore.
 */
const ALL_TYPES = [
    'pre-key',
    'session',
    'sender-key',
    'sender-key-memory',
    'app-state-sync-key',
    'app-state-sync-version',
    'lid-mapping',
    'device-list',
    'tctoken',
    'identity-key'
];

export async function migrateAuthState({ from, to, batchSize = 100, skipExisting = true, logger, verify = true }) {
    if (!from?.keys?.list && !from?.keys?.listIds) {
        throw new Error('migrateAuthState: source store does not implement list(type) or listIds(type)');
    }
    if (!to?.keys?.set) {
        throw new Error('migrateAuthState: destination store does not implement set(data)');
    }
    if (!Number.isInteger(batchSize) || batchSize < 1) {
        throw new TypeError('migrateAuthState: batchSize must be a positive integer');
    }
    const result = { creds: { copied: false }, counts: {}, verified: false, warnings: [] };
    Object.assign(to.creds, from.creds);
    result.creds.copied = true;
    logger?.info?.('migrateAuthState: creds copied');

    for (const type of ALL_TYPES) {
        let existingIds = null;
        if (skipExisting && to.keys.listIds) {
            existingIds = new Set();
            try {
                for await (const id of to.keys.listIds(type)) existingIds.add(id);
            }
            catch (error) {
                result.warnings.push(`failed to enumerate existing destination ids for ${type}: ${String(error)}`);
                existingIds = null;
            }
        }
        const batch = {};
        let total = 0;
        const flush = async () => {
            const ids = Object.keys(batch);
            if (!ids.length) return;
            await to.keys.set({ [type]: { ...batch } });
            for (const id of ids) delete batch[id];
            total += ids.length;
        };
        try {
            if (from.keys.list) {
                for await (const [id, value] of from.keys.list(type)) {
                    if (existingIds?.has(id)) continue;
                    batch[id] = value;
                    if (Object.keys(batch).length >= batchSize) await flush();
                }
            }
            else {
                for await (const id of from.keys.listIds(type)) {
                    if (existingIds?.has(id)) continue;
                    const data = await from.keys.get(type, [id]);
                    if (data[id] !== undefined) batch[id] = data[id];
                    if (Object.keys(batch).length >= batchSize) await flush();
                }
            }
        }
        catch (error) {
            result.warnings.push(`failed to enumerate source records for ${type}: ${String(error)}`);
        }
        await flush();
        result.counts[type] = total;
        logger?.info?.({ type, count: total }, 'migrateAuthState: copied type');
    }
    if (verify) result.verified = await verifyMigration(from, to, result.warnings, logger);
    logger?.info?.({ counts: result.counts, verified: result.verified, warnings: result.warnings.length }, 'migrateAuthState: done');
    return result;
}

async function collectIds(state, type) {
    try {
        const out = new Set();
        if (state.keys.listIds) {
            for await (const id of state.keys.listIds(type)) out.add(id);
        }
        else if (state.keys.list) {
            for await (const [id] of state.keys.list(type)) out.add(id);
        }
        else return null;
        return out;
    }
    catch {
        return null;
    }
}

async function verifyMigration(from, to, warnings, logger) {
    let ok = true;
    for (const type of ALL_TYPES) {
        const fromIds = await collectIds(from, type);
        const toIds = await collectIds(to, type);
        if (!fromIds || !toIds) {
            warnings.push(`verification skipped for ${type}: unable to enumerate one side`);
            ok = false;
            continue;
        }
        for (const id of fromIds) if (!toIds.has(id)) {
            warnings.push(`destination missing ${type}:${id}`);
            ok = false;
        }
        for (const id of toIds) if (!fromIds.has(id)) {
            warnings.push(`destination has unexpected ${type}:${id}`);
            ok = false;
        }
    }
    logger?.info?.({ ok }, 'migrateAuthState: verification complete');
    return ok;
}

export { ALL_TYPES };
