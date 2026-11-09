export class TemplateManager {
    templates: Map<any, any>;
    generateId(): string;
    extractVariables(content: any): {
        name: string;
        defaultValue: string;
        required: boolean;
    }[];
    create(options: any): {
        id: any;
        name: any;
        content: any;
        description: any;
        category: any;
        variables: {
            name: string;
            defaultValue: string;
            required: boolean;
        }[];
        createdAt: Date;
        updatedAt: Date;
    };
    get(id: any): any;
    getByName(name: any): any;
    getAll(): any[];
    getByCategory(category: any): any[];
    update(id: any, updates: any): any;
    delete(id: any): boolean;
    renderContent(content: any, data?: {}): any;
    render(id: any, data?: {}): any;
    validate(id: any, data: any): {
        valid: boolean;
        missing: any;
    };
    export(): string;
    import(json: any, overwrite?: boolean): number;
}
export namespace PRESET_TEMPLATES {
    namespace ORDER_CONFIRMATION {
        let name: string;
        let category: string;
        let content: string;
    }
    namespace WELCOME {
        let name_1: string;
        export { name_1 as name };
        let category_1: string;
        export { category_1 as category };
        let content_1: string;
        export { content_1 as content };
    }
    namespace REMINDER {
        let name_2: string;
        export { name_2 as name };
        let category_2: string;
        export { category_2 as category };
        let content_2: string;
        export { content_2 as content };
    }
    namespace SUPPORT_TICKET {
        let name_3: string;
        export { name_3 as name };
        let category_3: string;
        export { category_3 as category };
        let content_3: string;
        export { content_3 as content };
    }
    namespace BIRTHDAY {
        let name_4: string;
        export { name_4 as name };
        let category_4: string;
        export { category_4 as category };
        let content_4: string;
        export { content_4 as content };
    }
    namespace INVOICE {
        let name_5: string;
        export { name_5 as name };
        let category_5: string;
        export { category_5 as category };
        let content_5: string;
        export { content_5 as content };
    }
}
export function createTemplateManager(includePresets?: boolean): TemplateManager;
export function renderTemplate(content: any, data?: {}): any;
