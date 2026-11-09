export class A2UI {
    constructor(opts25?: { [key: string]: any; 
        catalogId?: string;
        version?: string;
    });
    _version: string;
    _catalogId: string;
    _components: Map<any, any>;
    _counter: number;
    _rootChildren: any[];
    /** Vanz@Add (v2.1.14, from the Go reference): set the A2UI spec version string. */
    setVersion(version: any): this;
    /** Vanz@Add (v2.1.14, from the Go reference): set the component catalog url. */
    setCatalogId(catalogId: any): this;
    text(text: any, opts1?: { [key: string]: any; 
        variant?: string;
    }): any;
    image(url: any, opts2?: { [key: string]: any; 
        fit?: string;
    }): any;
    /** Merge extra props into an already-registered component (Go `a2uiComponent.Extra`). Returns the id. */
    extend(id: any, extra?: {}): any;
    /** Component tree as plain JSON (Go `MarshalJSON`): `{ version, catalogId, components }`, with the implicit root first when `root()` was called. */
    toJSON(): {
        version: string;
        catalogId: string;
        components: any[];
    };
    /** Image with an explicit fit (`cover` | `none`). Same as `image(url, { fit })`. */
    imageFit(url: any, fit: any, opts3?: { [key: string]: any; }): any;
    /** Header-variant image for card headers (`variant: "header"`, `fit: "none"`). */
    imageHeader(url: any, opts4?: { [key: string]: any; }): any;
    /** `text()` with the variant as a positional argument (Go `TextVariant`). */
    textVariant(text: any, variant: any, opts5?: { [key: string]: any; }): any;
    /** `textField()` with the variant as a positional argument (Go `TextFieldVariant`). */
    textFieldVariant(label: any, variant: any, opts6?: { [key: string]: any; }): any;
    /** `choicePicker()` with `filterable: true` (Go `ChoicePickerFilterable`). */
    choicePickerFilterable(label: any, options: any, o?: {}): any;
    video(url: any, opts7?: { [key: string]: any; }): any;
    checkbox(label: any, opts8?: { [key: string]: any; 
        value?: boolean;
    }): any;
    textField(label: any, opts9?: { [key: string]: any; 
        variant?: string;
    }): any;
    button(childId: any, opts10?: { [key: string]: any; 
        variant?: string;
    }): any;
    card(childId: any, opts11?: { [key: string]: any; }): any;
    modal(triggerId: any, contentId: any, opts12?: { [key: string]: any; }): any;
    raw(component: any, props?: {}, opts13?: { [key: string]: any; }): any;
    column(children?: any[], opts14?: { [key: string]: any; }): any;
    row(children?: any[], opts15?: { [key: string]: any; }): any;
    divider(opts26?: { [key: string]: any; }): any;
    slider(opts27?: { [key: string]: any; 
        value?: number;
        min?: number;
        max?: number;
        step?: number;
    }): any;
    dateTimeInput(label: any, opts16?: { [key: string]: any; 
        value?: string;
        enableDate?: boolean;
        enableTime?: boolean;
    }): any;
    switch(label: any, opts17?: { [key: string]: any; 
        value?: boolean;
    }): any;
    list(children?: any[], opts18?: { [key: string]: any; }): any;
    progressBar(value: any, opts19?: { [key: string]: any; 
        min?: number;
        max?: number;
        variant?: string;
    }): any;
    avatar(url: any, opts20?: { [key: string]: any; 
        variant?: string;
        size?: number;
    }): any;
    badge(childId: any, opts21?: { [key: string]: any; }): any;
    spacer(opts28?: { [key: string]: any; 
        height?: number;
    }): any;
    tabs(items?: any[], opts22?: { [key: string]: any; 
        activeTab?: number;
    }): any;
    choicePicker(label: any, options: any, opts23?: { [key: string]: any; 
        variant?: string;
        displayStyle?: string;
        filterable?: boolean;
    }): any;
    root(children: any): this;
    listCard(opts29?: { [key: string]: any; 
        uuid?: any;
    }): this;
    _listCardPayload: {
        uuid: any;
        data: string;
        type: string;
        fallback: any;
    };
    send(client: any, jid: any, opts?: {}): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
    build(opts30?: { [key: string]: any; 
        uuid?: any;
        type?: string;
        wrapped?: boolean;
    }): {
        uuid: any;
        data: string;
        type: string;
        fallback: any;
    } | {
        uuid: any;
        data: string;
        type: string;
    };
    #private;
}
/**
 * Build + send an A2UI/Bloks widget as an interactiveMessage.
 * @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket.
 * @param {string} jid Destination chat/group jid.
 */
export function sendA2UIWidget(client: any, jid: string, opts24?: { [key: string]: any; 
    bodyText?: string;
    footer?: string;
    buttons?: any[];
    contextInfo?: {};
    type?: string;
    wrapped?: boolean;
    singleScreen?: boolean;
}): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
