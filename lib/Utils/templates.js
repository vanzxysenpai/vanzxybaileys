// Vanz@Add --- ported from Bail-master addons/templates.ts (type-only
// annotations dropped; behavior unchanged).
export class TemplateManager {
    templates = new Map();
    generateId() {
        return `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    extractVariables(content) {
        const regex = /\{\{(\w+)(?::([^}]*))?\}\}/g;
        const variables = [];
        const seen = new Set();
        let match;
        while ((match = regex.exec(content)) !== null) {
            const name = match[1];
            if (!name || seen.has(name))
                continue;
            seen.add(name);
            variables.push({ name, defaultValue: match[2], required: !match[2] });
        }
        return variables;
    }
    create(options) {
        const template = {
            id: options.id ?? this.generateId(),
            name: options.name,
            content: options.content,
            description: options.description,
            category: options.category,
            variables: this.extractVariables(options.content),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.templates.set(template.id, template);
        return template;
    }
    get(id) {
        return this.templates.get(id);
    }
    getByName(name) {
        return Array.from(this.templates.values()).find((t) => t.name === name);
    }
    getAll() {
        return Array.from(this.templates.values());
    }
    getByCategory(category) {
        return Array.from(this.templates.values()).filter((t) => t.category === category);
    }
    update(id, updates) {
        const template = this.templates.get(id);
        if (!template)
            return undefined;
        if (updates.content)
            updates.variables = this.extractVariables(updates.content);
        const updated = { ...template, ...updates, updatedAt: new Date() };
        this.templates.set(id, updated);
        return updated;
    }
    delete(id) {
        return this.templates.delete(id);
    }
    renderContent(content, data = {}) {
        return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (match, name, defaultValue) => {
            const value = data[name];
            if (value !== undefined && value !== null)
                return String(value);
            if (defaultValue !== undefined)
                return defaultValue;
            return match;
        });
    }
    render(id, data = {}) {
        const template = this.templates.get(id);
        if (!template)
            throw new Error(`Template not found: ${id}`);
        return this.renderContent(template.content, data);
    }
    validate(id, data) {
        const template = this.templates.get(id);
        if (!template)
            throw new Error(`Template not found: ${id}`);
        const missing = template.variables.filter((v) => v.required && !(v.name in data)).map((v) => v.name);
        return { valid: missing.length === 0, missing };
    }
    export() {
        return JSON.stringify(Array.from(this.templates.values()), null, 2);
    }
    import(json, overwrite = false) {
        const templates = JSON.parse(json);
        let imported = 0;
        for (const t of templates) {
            if (!overwrite && this.templates.has(t.id))
                continue;
            this.templates.set(t.id, { ...t, createdAt: new Date(t.createdAt), updatedAt: new Date(t.updatedAt) });
            imported++;
        }
        return imported;
    }
}
/** Ready-made templates covering common bot scenarios (order, welcome, reminder, etc). */
export const PRESET_TEMPLATES = {
    ORDER_CONFIRMATION: {
        name: 'Order Confirmation',
        category: 'order',
        content: `✅ *Order Confirmed!*\n\nOrder ID: #{{orderId}}\nCustomer: {{customerName}}\nDate: {{orderDate}}\n\n📦 *Items:*\n{{items}}\n\n💰 *Total: {{total}}*\n\nThank you! 🙏`
    },
    WELCOME: {
        name: 'Welcome Message',
        category: 'greeting',
        content: `👋 *Welcome, {{name}}!*\n\nThank you for joining {{companyName:us}}!\nNeed help? Reply to this message!`
    },
    REMINDER: {
        name: 'Reminder',
        category: 'notification',
        content: `⏰ *Reminder*\n\nHi {{name}},\n\n📋 {{subject}}\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location:TBD}}`
    },
    SUPPORT_TICKET: {
        name: 'Support Ticket',
        category: 'support',
        content: `🎫 *Support Ticket Created*\n\nTicket #: {{ticketId}}\nSubject: {{subject}}\n\nHi {{name}},\n\nWe received your request! Response time: {{responseTime:24 hours}} 🙏`
    },
    BIRTHDAY: {
        name: 'Birthday Wishes',
        category: 'greeting',
        content: `🎂 *Happy Birthday, {{name}}!* 🎉\n\nWishing you a wonderful day!\n\n🎁 Use code: {{code}} for {{discount:10}}% off! 🥳`
    },
    INVOICE: {
        name: 'Invoice',
        category: 'invoice',
        content: `🧾 *Invoice {{invoiceNumber}}*\n\nBilled to: {{customerName}}\nInvoice date: {{invoiceDate}}\nDue date: {{dueDate:on receipt}}\n\n📋 *Items:*\n{{items}}\n\nSubtotal: {{subtotal}}\n💰 *Total: {{total}}*\n\nThank you for your business! 🙏`
    }
};
export const createTemplateManager = (includePresets = true) => {
    const manager = new TemplateManager();
    if (includePresets) {
        for (const [key, template] of Object.entries(PRESET_TEMPLATES)) {
            manager.create({ ...template, id: key.toLowerCase() });
        }
    }
    return manager;
};
export const renderTemplate = (content, data = {}) => {
    return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (match, name, defaultValue) => {
        const value = data[name];
        if (value !== undefined && value !== null)
            return String(value);
        if (defaultValue !== undefined)
            return defaultValue;
        return match;
    });
};
//# sourceMappingURL=templates.js.map
