// Vanz@Add --- ported from Bail-master addons/auto-reply.ts (type-only
// annotations dropped; behavior unchanged).
export class AutoReplyHandler {
    rules = new Map();
    cooldowns = new Map();
    globalCooldown = new Map();
    sendMessage;
    sendPresence;
    options;
    constructor(sendMessage, sendPresence, options = {}) {
        this.sendMessage = sendMessage;
        this.sendPresence = sendPresence;
        this.options = {
            globalCooldown: options.globalCooldown ?? 1000,
            simulateTyping: options.simulateTyping ?? false,
            typingDuration: options.typingDuration ?? 1000,
            multiMatch: options.multiMatch ?? false,
            onReply: options.onReply ?? (() => { }),
            onError: options.onError ?? (() => { })
        };
    }
    generateId() {
        return `ar_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    /** Add a rule keyed by keywords, a regex pattern, or an exact-match string. */
    addRule(rule) {
        const fullRule = {
            ...rule,
            id: rule.id ?? this.generateId(),
            active: rule.active ?? true,
            priority: rule.priority ?? 0
        };
        if (!fullRule.keywords && !fullRule.pattern && !fullRule.exactMatch)
            throw new Error('Rule must have keywords, pattern, or exactMatch');
        this.rules.set(fullRule.id, fullRule);
        return fullRule;
    }
    removeRule(id) {
        return this.rules.delete(id);
    }
    getRules() {
        return Array.from(this.rules.values());
    }
    getRule(id) {
        return this.rules.get(id);
    }
    setRuleActive(id, active) {
        const r = this.rules.get(id);
        if (r) {
            r.active = active;
            return true;
        }
        return false;
    }
    clearRules() {
        this.rules.clear();
    }
    checkCooldown(ruleId, jid) {
        return Date.now() - (this.cooldowns.get(`${ruleId}:${jid}`) ?? 0) > 0;
    }
    checkGlobalCooldown(jid) {
        return Date.now() - (this.globalCooldown.get(jid) ?? 0) > this.options.globalCooldown;
    }
    setCooldown(ruleId, jid, cooldown) {
        this.cooldowns.set(`${ruleId}:${jid}`, Date.now() + cooldown);
    }
    matchRule(text, rule) {
        if (!rule.active)
            return null;
        if (text.toLowerCase() === rule.exactMatch?.toLowerCase())
            return [text];
        if (rule.keywords?.length) {
            const lower = text.toLowerCase();
            for (const kw of rule.keywords)
                if (lower.includes(kw.toLowerCase()))
                    return [kw];
        }
        if (rule.pattern)
            return text.match(rule.pattern);
        return null;
    }
    isJidAllowed(jid, rule) {
        const isGroup = jid.endsWith('@g.us');
        if (jid.endsWith('@newsletter'))
            return false;
        if (rule.groupsOnly && !isGroup)
            return false;
        if (rule.privateOnly && isGroup)
            return false;
        if (rule.allowedJids?.length && !rule.allowedJids.includes(jid))
            return false;
        if (rule.blockedJids?.includes(jid))
            return false;
        return true;
    }
    /**
     * Feed each incoming message through here (e.g. from `messages.upsert`).
     * Returns true if a rule matched and a reply was sent.
     */
    async processMessage(message) {
        const content = message.message;
        if (!content)
            return false;
        const text = content.conversation ||
            content.extendedTextMessage?.text ||
            content.imageMessage?.caption ||
            content.videoMessage?.caption ||
            content.documentMessage?.caption ||
            '';
        if (!text)
            return false;
        const jid = message.key.remoteJid;
        if (!jid || !this.checkGlobalCooldown(jid))
            return false;
        const sortedRules = Array.from(this.rules.values())
            .filter((r) => r.active)
            .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
        let matched = false;
        for (const rule of sortedRules) {
            if (!this.isJidAllowed(jid, rule))
                continue;
            if (rule.cooldown && !this.checkCooldown(rule.id, jid))
                continue;
            const match = this.matchRule(text, rule);
            if (!match)
                continue;
            try {
                let response;
                if (typeof rule.response === 'function')
                    response = await rule.response(message, match);
                else
                    response = rule.response;
                if (this.options.simulateTyping && this.sendPresence) {
                    await this.sendPresence(jid, 'composing');
                    await new Promise((r) => setTimeout(r, this.options.typingDuration));
                    await this.sendPresence(jid, 'paused');
                }
                await this.sendMessage(jid, response, rule.quoted ? { quoted: message } : undefined);
                // Vanz@Fix (bug 60): global cooldown used to only get stamped inside
                // setCooldown(), which only ran when the matched rule had its own
                // cooldown — so rules without one never fed the global anti-spam gate.
                this.globalCooldown.set(jid, Date.now());
                if (rule.cooldown)
                    this.setCooldown(rule.id, jid, rule.cooldown);
                this.options.onReply(rule, message, response);
                matched = true;
                if (!this.options.multiMatch)
                    break;
            }
            catch (error) {
                this.options.onError(error, rule, message);
            }
        }
        return matched;
    }
}
export const createAutoReply = (sendMessage, sendPresence, options) => new AutoReplyHandler(sendMessage, sendPresence, options);
//# sourceMappingURL=auto-reply.js.map
