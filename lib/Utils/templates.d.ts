export interface TemplateVariable {
    name: string;
    defaultValue?: string;
    required: boolean;
}
export interface MessageTemplate {
    id: string;
    name: string;
    content: string;
    description?: string;
    category?: string;
    variables: TemplateVariable[];
    createdAt: Date;
    updatedAt: Date;
}
export type TemplateData = Record<string, string | number | undefined | null>;
export declare class TemplateManager {
    private templates;
    private generateId;
    private extractVariables;
    create(options: {
        id?: string;
        name: string;
        content: string;
        description?: string;
        category?: string;
    }): MessageTemplate;
    get(id: string): MessageTemplate | undefined;
    getByName(name: string): MessageTemplate | undefined;
    getAll(): MessageTemplate[];
    getByCategory(category: string): MessageTemplate[];
    update(id: string, updates: Partial<MessageTemplate>): MessageTemplate | undefined;
    delete(id: string): boolean;
    renderContent(content: string, data?: TemplateData): string;
    render(id: string, data?: TemplateData): string;
    validate(id: string, data: TemplateData): {
        valid: boolean;
        missing: string[];
    };
    export(): string;
    import(json: string, overwrite?: boolean): number;
}
export declare const PRESET_TEMPLATES: {
    ORDER_CONFIRMATION: {
        name: string;
        category: string;
        content: string;
    };
    WELCOME: {
        name: string;
        category: string;
        content: string;
    };
    REMINDER: {
        name: string;
        category: string;
        content: string;
    };
    SUPPORT_TICKET: {
        name: string;
        category: string;
        content: string;
    };
    BIRTHDAY: {
        name: string;
        category: string;
        content: string;
    };
    INVOICE: {
        name: string;
        category: string;
        content: string;
    };
};
export declare const createTemplateManager: (includePresets?: boolean) => TemplateManager;
export declare const renderTemplate: (content: string, data?: TemplateData) => string;
