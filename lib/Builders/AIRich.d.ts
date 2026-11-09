export function tokenizeCodeForRich(code: any, lang?: string): {
    codeBlock: any[];
    unified_codeBlock: {
        content: any;
        type: any;
    }[];
};
/**
 * "Rich AI-response" style message builder: text with hyperlink/citation/latex
 * inline entities, code blocks, tables, sources, image/video attachments,
 * inline product/post cards, tip banners and quick-reply suggestions —
 * everything ChatGPT/Gemini-in-WhatsApp-style bots typically render.
 *
 * Rewritten from MessageBuilder v4.7's `AIRich` reference implementation:
 * same public API and message-building logic as v4.7, wired into this fork's
 * `BaseBuilder` (title/footer/contextInfo/extraPayload) and the `withBlockTracking()` proxy
 * defined at the top of this file (the `{ id, insertAt, replace }` mechanism on every add*()/set*() call) in
 * place of v4.7's own `_nodes`/`_idIndex` bookkeeping.
 */
export class AIRich extends BaseBuilder {
    /** @private Drop undefined/null/'' recursively so we never send explicit nulls (they can crash the WA renderer). */
    private static _omitEmpty;
    static toTableMetadata(arr: any, opts1?: { [key: string]: any; 
        hyperlink?: boolean;
        citation?: boolean;
        latex?: boolean;
    }): {
        title: string;
        rows: {
            isHeading?: boolean;
            items: any[];
        }[];
        unified_rows: {
            markdown_cells?: {
                inline_entities?: any[] | ({
                    key: any;
                    metadata: {
                        display_name: any;
                        is_trusted: any;
                        url: any;
                        __typename: string;
                        deeplink_url?: undefined;
                        text?: undefined;
                        reference_id?: undefined;
                        reference_url?: undefined;
                        reference_title?: undefined;
                        reference_display_name?: undefined;
                        sources?: undefined;
                        latex_expression?: undefined;
                        latex_image?: undefined;
                        font_height?: undefined;
                        padding?: undefined;
                    };
                } | {
                    key: any;
                    metadata: {
                        deeplink_url: any;
                        text: any;
                        __typename: string;
                        display_name?: undefined;
                        is_trusted?: undefined;
                        url?: undefined;
                        reference_id?: undefined;
                        reference_url?: undefined;
                        reference_title?: undefined;
                        reference_display_name?: undefined;
                        sources?: undefined;
                        latex_expression?: undefined;
                        latex_image?: undefined;
                        font_height?: undefined;
                        padding?: undefined;
                    };
                } | {
                    key: any;
                    metadata: {
                        reference_id: any;
                        reference_url: any;
                        reference_title: any;
                        reference_display_name: any;
                        sources: any[];
                        __typename: string;
                        display_name?: undefined;
                        is_trusted?: undefined;
                        url?: undefined;
                        deeplink_url?: undefined;
                        text?: undefined;
                        latex_expression?: undefined;
                        latex_image?: undefined;
                        font_height?: undefined;
                        padding?: undefined;
                    };
                } | {
                    key: any;
                    metadata: {
                        latex_expression: any;
                        latex_image: {
                            url: any;
                            width: number;
                            height: number;
                        };
                        font_height: number;
                        padding: number;
                        __typename: string;
                        display_name?: undefined;
                        is_trusted?: undefined;
                        url?: undefined;
                        deeplink_url?: undefined;
                        text?: undefined;
                        reference_id?: undefined;
                        reference_url?: undefined;
                        reference_title?: undefined;
                        reference_display_name?: undefined;
                        sources?: undefined;
                    };
                })[];
                text: any;
            }[];
            is_header: boolean;
            cells: any[];
        }[];
    };
    /** Build a raw submessage layout block by name — escape hatch for layouts not covered by the add*() helpers. */
    static newLayout(name: any, data: any, extra?: {}): {
        view_model: {
            [x: string]: any;
            __typename: string;
        };
    };
    /** Inline CSS+JS that pins an HTML app's body height and makes it internally scrollable — used by `addHTML()`'s `height` option. Ported alongside `addHTML()` (see that method's header comment for the source). */
    static lockHeight(height: any): string;
    /**
     * Send an image and video as one paired-media unit (image sent first, video linked to it via
     * `messageAssociation`). Distinct from a plain album — the client treats them as a single group.
     * @param {import('../../WAProto/index.js').WASocket} client
     * @param {string} jid
     * @param {{ image: string|Buffer, video: string|Buffer }} media
     */
    static sendPairedMedia(client: any, jid: string, opts2?: { [key: string]: any; 
        image: string | Buffer;
        video: string | Buffer;
    }): Promise<any>;
    /**
     * Send a support-ticket marker message (`messageContextInfo.supportPayload`) — a plain
     * conversation message tagged as an AI/support-bot ticket, distinct from richResponseMessage.
     * @param {import('../../WAProto/index.js').WASocket} client
     * @param {string} jid
     * @param {string} text
     * @param {{ ticketId?: string, isAiMessage?: boolean, shouldShowSystemMessage?: boolean, version?: number }} [options]
     */
    static sendSupportPayload(client: any, jid: string, text: string, opts3?: { [key: string]: any; 
        ticketId?: string;
        isAiMessage?: boolean;
        shouldShowSystemMessage?: boolean;
        version?: number;
    }): Promise<any>;
    /**
     * @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket.
     * @param {object} [options]
     * @param {boolean} [options.dynamic=true] When true, `build()` mints a fresh `response_id`/
     *   `botResponseId` on every call instead of reusing the pinned ones.
     * @param {boolean} [options.unsupportedTypeAlert=true] Gates `createAlert()` — see that method.
     */
    constructor(client: any, opts4?: { [key: string]: any; 
        dynamic?: boolean;
        unsupportedTypeAlert?: boolean;
    });
    _sections: any[];
    _submessages: any[];
    _unsupportedTypeAlert: boolean;
    _dynamic: boolean;
    _responseId: any;
    _botResponseId: any;
    _lastMessageKey: any;
    _inlineImages: any[];
    _botMetadataExtra: {};
    _forwardBotJid: string;
    _embeddedScreens: any[];
    _verification: boolean;
    _notification: boolean;
    _notificationText: string;
    _mentions: any[];
    _quoted: any;
    _quotedParticipant: string;
    _noContextInfo: boolean;
    _unifiedResponseData: any;
    _messageSecret: boolean;
    _bypassDownload: boolean;
    _forwarded: boolean;
    _includesUnifiedResponse: boolean;
    _includesSubmessages: boolean;
    _rawEnvelope: boolean;
    _deferred: any[];
    /**
     * Reconstruct this builder's state from an already-built/sent AIRich message (e.g. one fetched
     * back from your own message store), so it can be edited and re-sent via `sendEdit()`.
     * @param {object} msg A raw WA message object — either `{ key, message }` (as stored/fetched) or
     *   just the `message` object itself. Must contain a `richResponseMessage` (nested under
     *   `botForwardedMessage.message`, `botForwardedMessage`, or at the top level).
     */
    loadFrom(msg: object): this;
    _blocks: Map<any, any>;
    _lastBlock: any;
    /** Pin `unifiedResponse.response_id` to a specific value instead of a fresh random one each build() — needed to re-send an edited version of an already-sent message in place. */
    setResponseId(id: any): this;
    /** Force a fresh random `response_id` on the next build(), discarding any pinned value. */
    refreshResponseId(): this;
    /** Pin `botMetadata.botResponseId` to a specific value (see setResponseId()). */
    setBotResponseId(id: any): this;
    /** Force a fresh random `botResponseId` on the next build(), discarding any pinned value. */
    refreshBotResponseId(): this;
    /** Set `botMetadata.messageDisclaimerText` — shown as the small title line above the response. */
    setTitle(title: any): this;
    /**
     * Merge extra fields into `messageContextInfo.botMetadata` at build time (e.g.
     * `{ unifiedResponseMutation: { mediaDetailsMetadataList: [...] } }`, needed for a file/media
     * artifact whose preview comes from an uploaded media entry rather than a plain URL).
     * @param {object} extra
     */
    setBotMetadata(extra: object): this;
    /**
     * Override the `forwardedAiBotMessageInfo.botJid` stamped on forwarded builds (default: the
     * Meta AI bot jid). Only used when `forwarded` is true (the default in send()/build()).
     * @param {string} jid A `...@bot` jid.
     */
    setForwardBotJid(jid: string): this;
    /** Alias of `setForwardBotJid()` (README casing). */
    setForwardBotJID(jid: any): this;
    /**
     * Toggle the `botMetadata.verificationMetadata` block that `build()` attaches. Default `false`. NOTE: the proof is
     * random bytes, not a real Meta signature, so it is opt-in (the Go reference `MessageBuilderv2` also ships OFF).
     * Call `setVerificationMetadata(true)` only if you explicitly want the placeholder proof attached.
     * @param {boolean} [enabled=true]
     */
    setVerificationMetadata(enabled?: boolean): this;
    /**
     * Default for `build({ notification })` / `send({ notification })`: attach `sessionTransparencyMetadata`.
     * @param {boolean} [enabled=true]
     * @param {string} [text] Disclaimer text shown to the recipient. Defaults to the `setTitle()` text; omitted if neither is set.
     */
    setNotification(enabled?: boolean, text?: string): this;
    /**
     * Tag JIDs on the card (`contextInfo.mentionedJid`). Keep the `@<lid>` tokens in your text as-is —
     * WhatsApp renders them as the contact's name. Use LID jids so they match the token.
     * @param {...(string|string[])} jids
     */
    setMentions(...jids: (string | string[])[]): this;
    /**
     * Default quoted message for `build()`/`send()` (same shapes `build({ quoted })` accepts).
     * @param {object} quoted A WAMessage (`{ key, message }`) or `{ id, participant }`.
     * @param {string} [participant]
     */
    setQuoted(quoted: object, participant?: string): this;
    /** Drop `contextInfo` from the rich response entirely (bare rich, as in captured native edits). */
    setNoContextInfo(enabled?: boolean): this;
    /** Mint a fresh `response_id`/`botResponseId` on every `build()` (same as the constructor's `dynamic` option). */
    setDynamicIDs(enabled?: boolean): this;
    /**
     * Force `unifiedResponse.data` from a raw payload instead of the sections model.
     * @param {object|string|Buffer|null} data Plain object (JSON-stringified), JSON string, or Buffer. `null` clears the override.
     */
    setUnifiedResponseData(data: object | string | Buffer | null): this;
    /** Stamp a random 32-byte `messageContextInfo.messageSecret` on every `build()`. */
    setMessageSecret(enabled?: boolean): this;
    /** Runtime toggle for the constructor's `unsupportedTypeAlert` option (gates `createAlert()`). */
    setUnsupportedTypeAlert(enabled?: boolean): this;
    /** Default for `send({ bypassDownload })` — auto `sendEdit()` after `send()`. Default `true`. */
    setByPassDownload(enabled?: boolean): this;
    /**
     * Shortcut for `botMetadata.capabilityMetadata.capabilities`. Accepts `BotCapabilityType` enum
     * names or numbers, e.g. `setCapabilities(['RICH_RESPONSE_UR_BLOKS_ENABLED'])`.
     * @param {Array<string|number>} capabilities
     */
    setCapabilities(capabilities: Array<string | number>): this;
    /**
     * Shortcut for `botMetadata.botRenderingConfigMetadata`.
     * @param {string} bloksVersioningId
     * @param {number} [pixelDensity=1]
     */
    setBotRenderingConfig(bloksVersioningId: string, pixelDensity?: number): this;
    /** Shortcut for `botMetadata.botThreadInfo.clientInfo.type` (`AIThreadType`: UNKNOWN / DEFAULT / INCOGNITO / SIDE_CHAT). */
    setThreadType(type: any): this;
    /** Shortcut for `botMetadata.imagineMetadata.imagineType`. */
    setImagineType(type: any): this;
    /** Shortcut for `botMetadata.subscriptionUpsellMetadata.requestType` (`AISubscriptionRequestType`: UNSPECIFIED / THINK_HARD / IMAGE_GEN / VIDEO_GEN). */
    setSubscriptionUpsell(requestType: any): this;
    /**
     * Add a full-screen/bottom-sheet "embedded screen" — a tabbed view opened by tapping into the
     * response, as opposed to a section rendered inline. Confirmed shape (`embedded_screens` array
     * inside `unifiedResponse.data`, alongside `sections`) from yudzxml 7.6.6 / elaina 1.3.10's core
     * `index.js`. Used by `addHTMLCard()` below; pass a raw screen object directly for anything
     * beyond that.
     * @param {{id?: string, title?: string, content?: object[], tabs?: object[]}} screen
     */
    addEmbeddedScreen(screen: {
        id?: string;
        title?: string;
        content?: object[];
        tabs?: object[];
    }): this;
    /**
     * Build a generic `[ UNSUPPORTED_TYPE - <type> ]` submessage fallback, or `undefined` if
     * `unsupportedTypeAlert` was set to `false` in the constructor.
     * @param {string} type The primitive's `__typename` (or any label), shown in the banner text.
     */
    createAlert(type: string): {
        messageType: number;
        messageText: string;
    };
    /** Check whether a block id was registered by an earlier `add*()`/`set*()` call passing `{id}`. */
    hasId(id: any): boolean;
    /** List every block id registered so far, in no particular order. */
    getIds(): any[];
    /** Inspect a registered block without modifying it. Returns `null` if `id` isn't registered. */
    peek(id: any): {
        id: any;
        sections: any[];
        submessages: any[];
    };
    /** Remove a previously-added block (by the `id` passed to its `add*()`/`set*()` call) from the message. Throws if `id` isn't registered. */
    delete(id: any): this;
    /**
     * Retroactively assign an id to the block most recently added by an add*()/set*() call that
     * didn't pass its own `{id}`.
     * @param {string} id
     */
    assignId(id: string): this;
    /** Push validated section(s)/submessage(s) onto the tracked arrays. `{ id, insertAt, replace }` bookkeeping is handled by the constructor's withBlockTracking() proxy — this only needs to append. */
    _addContent(section: any, submessage: any): this;
    /** Push a raw pre-built section wrapper (escape hatch for shapes not covered by the add*() helpers). */
    addSection(section: any, options?: {}): this;
    /** Push a raw pre-built submessage block (escape hatch for shapes not covered by the add*() helpers). */
    addSubmessage(submessage: any, options?: {}): this;
    addText(text: any, opts5?: { [key: string]: any; 
        hyperlink?: boolean;
        citation?: boolean;
        latex?: boolean;
    }): this;
    addFOAText(text: any, opts6?: { [key: string]: any; }): this;
    addCode(language: any, code: any, opts7?: { [key: string]: any; }): this;
    addTable(table: any, opts8?: { [key: string]: any; 
        hyperlink?: boolean;
        citation?: boolean;
        latex?: boolean;
    }): this;
    addSource(sources?: any[], opts9?: { [key: string]: any; }): this;
    addReels(reelsItems?: any[], opts10?: { [key: string]: any; }): this;
    addImage(imageUrl: any, opts11?: { [key: string]: any; 
        status?: string;
        resolveUrl?: boolean;
    }): this;
    addVideo(videoUrl: any, opts12?: { [key: string]: any; 
        autoFill?: boolean;
        status?: string;
    }): this;
    addProduct(data?: {}, opts13?: { [key: string]: any; }): this;
    addPost(data?: {}, opts14?: { [key: string]: any; }): this;
    addMetadata(text: any, opts15?: { [key: string]: any; }): this;
    addTip(text: any, opts16?: { [key: string]: any; }): this;
    addWidget(data: any, opts17?: { [key: string]: any; }): this;
    addFooterAction(data: any, opts18?: { [key: string]: any; }): this;
    addSuggest(suggestion: any, opts19?: { [key: string]: any; 
        scroll?: boolean;
    }): this;
    /**
     * Image card with independent preview and full-resolution urls (`gridImageMetadata` + `GenAIImaginePrimitive`,
     * the same layout `addImage()` uses). Reinstated in 2.1.13 — it was documented in the README but missing from source.
     * @param {string|Buffer} previewUrl Thumbnail shown in the card.
     * @param {string|Buffer} [fullUrl] Full-resolution image (defaults to `previewUrl`).
     */
    addImageCard(previewUrl: string | Buffer, fullUrl?: string | Buffer, opts20?: { [key: string]: any; 
        status?: string;
        resolveUrl?: boolean;
    }): this;
    /**
     * Single comment line. Text-only rendering (markdown), same as the Go reference.
     * @param {{actorName?: string, actor_name?: string, commentText?: string, comment_text?: string, subtitle?: string}} comment
     */
    addComment(comment?: {
        actorName?: string;
        actor_name?: string;
        commentText?: string;
        comment_text?: string;
        subtitle?: string;
    }, opts21?: { [key: string]: any; }): this;
    /**
     * List of actions/links. Text-only rendering (`▸ title — subtitle` lines), same as the Go reference — the
     * native `GenAIActionListPrimitive` wire shape has never been captured for this fork.
     * @param {{title: string, subtitle?: string}[]} rows
     */
    addActionList(rows: {
        title: string;
        subtitle?: string;
    }[], opts22?: { [key: string]: any; }): this;
    /** One reasoning step (bold title + body), text-only rendering like the Go reference. */
    addChainOfThoughtStep(title: any, body: any, opts23?: { [key: string]: any; }): this;
    /**
     * "Thinking" banner using the `GenAIBotProgressStatusPrimitive` shape (icon `THINKING`) — the same primitive
     * `addProgressStatus()` uses (confirmed rendering), unlike `addThinkingStatus()`'s own typename which stock
     * WA clients render blank. Matches the Go reference's `AddThinking`.
     */
    addThinking(title?: string, opts24?: { [key: string]: any; 
        icon?: string;
        is_in_progress?: boolean;
    }): this;
    /**
     * Generic escape hatch: push any `GenAI*` primitive as a `Single` layout (empty/null fields are dropped so
     * they can't crash the client). Use for captured shapes that don't have a dedicated method yet, e.g.
     * `addPrimitive('GenAISearchPlannerStepsPrimitive', {...})`.
     * @param {string} typeName The primitive's `__typename`.
     * @param {object} payload
     */
    addPrimitive(typeName: string, payload: object, opts25?: { [key: string]: any; }): this;
    /** Public door to `_addContent()` — insert a raw section (or sections) plus optional submessage(s), as-is. */
    addContentRaw(section: any, submessage: any, opts26?: { [key: string]: any; }): this;
    /** @private Push one `GenAI*` primitive as a `Single` layout, with the usual unsupported-type alert submessage. */
    private _addSinglePrimitive;
    /**
     * Follow-up suggestion card with a title/image (richer sibling of `addSuggest()`), `GenAIChainingSuggestionPrimitive`.
     * @param {{promptText: string, title?: string, imageUri?: string, externalConversationId?: string, topic?: string, cardId?: string}} options
     */
    addChainingSuggestionV2(opts55?: { [key: string]: any; 
        promptText: string;
        title?: string;
        imageUri?: string;
        externalConversationId?: string;
        topic?: string;
        cardId?: string;
    }): this;
    /**
     * Place card (`GenAIPlaceEntityItem`).
     * @param {{placeId?: string, name: string, imageUrl?: string, motivation?: string, key?: string, latitude?: number|string, longitude?: number|string, itemType?: string, address?: {streetAddress?: string, region?: string, country?: string, postalCode?: string, locality?: string, street?: string}, category?: {displayName?: string, categoryId?: string}, rating?: number|string}} place
     */
    addPlaceEntity(opts56?: { [key: string]: any; 
        placeId?: string;
        name: string;
        imageUrl?: string;
        motivation?: string;
        key?: string;
        latitude?: number | string;
        longitude?: number | string;
        itemType?: string;
        address?: {
            streetAddress?: string;
            region?: string;
            country?: string;
            postalCode?: string;
            locality?: string;
            street?: string;
        };
        category?: {
            displayName?: string;
            categoryId?: string;
        };
        rating?: number | string;
    }): this;
    /**
     * Social-search result card (`GenAISearchResultV2Primitive`).
     * @param {{searchQuery?: string, metadata?: string, postId?: string, reelsUrl?: string, reelsDeeplink?: string, reelsTitle?: string, thumbnailUrl?: string, avatarUrl?: string, creator?: string, isVerified?: boolean, sourceApp?: string, timestamp?: string, originalWidth?: number, originalHeight?: number, primitives?: object[]}} result
     */
    addSearchResultV2(opts57?: { [key: string]: any; 
        searchQuery?: string;
        metadata?: string;
        postId?: string;
        reelsUrl?: string;
        reelsDeeplink?: string;
        reelsTitle?: string;
        thumbnailUrl?: string;
        avatarUrl?: string;
        creator?: string;
        isVerified?: boolean;
        sourceApp?: string;
        timestamp?: string;
        originalWidth?: number;
        originalHeight?: number;
        primitives?: object[];
    }): this;
    /**
     * Compact "sources" chip row (`GenAIContextualSourcesViewModel`).
     * @param {Array<{faviconUri?: string, displayName: string, uri: string}>} sources
     * @param {string|object} [contextualSources] Optional primary-source payload (objects are JSON-stringified).
     */
    addContextualSources(sources: Array<{
        faviconUri?: string;
        displayName: string;
        uri: string;
    }>, contextualSources?: string | object, opts27?: { [key: string]: any; }): this;
    /**
     * Raw media item (`GenAIMediaItem`) — for media you already uploaded/host, addressed by url and/or `media_id`.
     * @param {{url?: string, mimeType?: string, urlFallback?: string, mediaId?: string, fileLength?: number, width?: number, height?: number, durationMs?: number, expirationTimestampMs?: number, thumbnail?: string, encryption?: {mediaKey: string, directPath: string, fileSha256: string, fileEncSha256: string, scansSidecar?: string, scanLengths?: number[], mediaKeyTimestamp?: number, fileLength?: number}}} media
     */
    addMediaItem(opts58?: { [key: string]: any; 
        url?: string;
        mimeType?: string;
        urlFallback?: string;
        mediaId?: string;
        fileLength?: number;
        width?: number;
        height?: number;
        durationMs?: number;
        expirationTimestampMs?: number;
        thumbnail?: string;
        encryption?: {
            mediaKey: string;
            directPath: string;
            fileSha256: string;
            fileEncSha256: string;
            scansSidecar?: string;
            scanLengths?: number[];
            mediaKeyTimestamp?: number;
            fileLength?: number;
        };
    }): this;
    /**
     * Build (but don't send) the full AI-rich message content, wrapped and ready for `relayMessage()`.
     * @param {string} jid Destination chat/group jid.
     */
    build(jid: string, opts28?: { [key: string]: any; 
        forwarded?: boolean;
        notification?: boolean;
        verificationMetadata?: boolean;
        includesUnifiedResponse?: boolean;
        includesSubmessages?: boolean;
        quoted?: any;
        quotedParticipant?: string;
        noContextInfo?: boolean;
    }): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
    /**
     * Build a `protocolMessage` (type EDIT) that patches an already-sent AIRich message in place.
     * @param {string} targetJid Chat the original message lives in.
     * @param {string} targetId `key.id` of the original message.
     * @param {object} [opts] Pass `{ msg }` to reuse an already-built message content instead of rebuilding via build().
     */
    buildEdit(targetJid: string, targetId: string, opts29?: object): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
    /**
     * Rebuild this AIRich message's current content and patch it into an already-sent message in
     * place (WA edits the bubble instead of showing a new one). With no args, edits the message from
     * the last send()/sendEdit() call.
     * @param {string} [jid] Defaults to the jid from the last send()/sendEdit().
     * @param {string} [id] Defaults to the message id from the last send()/sendEdit().
     */
    sendEdit(jid?: string, id?: string, opts30?: { [key: string]: any; 
        additionalNodes?: any[];
    }): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
    /**
     * Build a *native-format* edit: a top-level `protocolMessage` (type EDIT) instead of the
     * `botForwardedMessage`-wrapped edit that `buildEdit()` produces, with the bot-metadata
     * (`botResponseId`, CLIPPY infrastructure backend) and non-E2EE account attestation a real Meta-AI
     * edit carries. Use it when an edit made with `sendEdit()` doesn't re-render the bubble.
     * @param {string} targetJid Chat the original message lives in.
     * @param {string} targetId `key.id` of the original message.
     * @param {object} [opts] Pass `{ msg }` to reuse an already-built message content instead of rebuilding via build().
     */
    buildEditNative(targetJid: string, targetId: string, opts31?: object): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
    /** Same as `sendEdit()` but sends the native-format edit from `buildEditNative()`. Defaults to the last send()'s jid/id. */
    sendEditNative(jid: any, id: any, opts32?: { [key: string]: any; 
        additionalNodes?: any[];
    }): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
    /** Build and send this AI-rich message. @param {string} jid Destination chat/group jid. */
    send(jid: string, opts33?: { [key: string]: any; 
        bypassDownload?: boolean;
        forwarded?: boolean;
        notification?: boolean;
        includesUnifiedResponse?: boolean;
        includesSubmessages?: boolean;
        additionalNodes?: any[];
        skipImageFallback?: boolean;
        nativeEdit?: boolean;
    }): Promise<import("../../WAProto/index.js").proto.WebMessageInfo>;
    /** Flatten every primitive pushed into `_sections` so far into one array — lets you build a
     * card set in one AIRich instance and re-embed it into another via addSection(AIRich.newLayout(...)). */
    get items(): any[];
    /** The `{ remoteJid, fromMe, id }` of the last message this instance sent/edited, or `null`. */
    get lastMessageKey(): any;
    /**
     * Add a raw Bloks payload (`FOABloksPrimitive`) — Meta's internal UI-description format.
     * Escape hatch: field meaning beyond what's passed through is undocumented, so this is the
     * most experimental primitive in this block; pass whatever your captured traffic shows.
     * @param {{type: string, data: string, uuid?: string, initial_response?: any, versioning_id?: string}} data
     */
    addBloks(data?: {
        type: string;
        data: string;
        uuid?: string;
        initial_response?: any;
        versioning_id?: string;
    }): this;
    /**
     * Add an HTML mini-app card (`GenAIaeacdsnwHtmlPrimitive`, Android-only — see
     * `AI_RICH_PRIMITIVES_ANDROID_ONLY` below). Confirmed independently in two forks'
     * `MessageBuilder/extras.js` (yudzxml 7.6.6's `htmlSection()` and elaina 1.3.10's, both
     * crediting the same original source) as the "proven wire shape": a `GenAIUnifiedResponseSection`
     * wrapper around the html primitive. `options.url` sets the WebView's base origin (needed for
     * WebSocket/fetch calls from inside the page to be allowed) — pass a real `https://` origin, not
     * a data URI. `options.height` pins the page to a fixed height via `AIRich.lockHeight()`.
     * @param {string} html
     * @param {{trustedSources?: string[], height?: number, url?: string, textFallback?: boolean}} [options]
     */
    addHTML(html: string, opts34?: { [key: string]: any; 
        trustedSources?: string[];
        height?: number;
        url?: string;
        textFallback?: boolean;
    }): this;
    /**
     * Add an HTML app inside a tappable bottom-sheet "card" (a title/teaser line in the main
     * response that opens a tabbed embedded screen containing the HTML), instead of `addHTML()`'s
     * inline-in-the-response form. Reproduces `sendHtmlApp()`'s `embedded: true` branch (yudzxml
     * 7.6.6 / elaina 1.3.10's `MessageBuilder/extras.js`) using this class's own `setTitle()` /
     * `addEmbeddedScreen()` / `addText()` instead of that helper's standalone-function form. Calling
     * this sets the instance's title via `setTitle()` if `options.title` is given — don't call
     * `setTitle()` again after this if you want a different top title than the sheet's.
     * @param {string} html
     * @param {{title?: string, label?: string, trustedSources?: string[], height?: number, url?: string, screenTitle?: string, tabHeader?: string, textFallback?: boolean}} [options]
     */
    addHTMLCard(html: string, opts35?: { [key: string]: any; 
        title?: string;
        label?: string;
        trustedSources?: string[];
        height?: number;
        url?: string;
        screenTitle?: string;
        tabHeader?: string;
        textFallback?: boolean;
    }): this;
    /**
     * Add a downloadable-file card (`GenAIFilePrimitive`). Confirmed in the same two forks'
     * `fileSection()`/`fileArtifact()` helpers. Takes a plain URL directly (no media upload) — for a
     * file you're uploading through WhatsApp's own media servers first, use `sock.sendMessage(jid,
     * { document: buffer, ... })` and attach the result separately; this primitive only points at an
     * already-hosted URL.
     * @param {string} url
     * @param {{title?: string, fileExtension?: string, fileLength?: number, pageCount?: number, previewImage?: object, textFallback?: boolean}} [options]
     */
    addFile(url: string, opts36?: { [key: string]: any; 
        title?: string;
        fileExtension?: string;
        fileLength?: number;
        pageCount?: number;
        previewImage?: object;
        textFallback?: boolean;
    }): this;
    /**
     * Upload local content through WhatsApp's own media servers and add it as a file card — the
     * `prepareFileArtifact()`/`sendHtmlArtifact()` path from yudzxml 7.6.6 / elaina 1.3.10, folded
     * into this class via `setBotMetadata()` instead of that helper's standalone-function form. Use
     * this instead of `addFile()` when there's no hosted URL yet — e.g. an HTML app you built
     * in-process and want to ship as a downloadable file rather than inline via `addHTML()`.
     * @param {string|Buffer|Uint8Array} content File content (a string is encoded as UTF-8).
     * @param {{mimetype?: string, fileName?: string, title?: string, id?: string, textFallback?: boolean}} [options]
     * @returns {Promise<this>}
     */
    addUploadedFile(content: string | Buffer | Uint8Array, opts37?: { [key: string]: any; 
        mimetype?: string;
        fileName?: string;
        title?: string;
        id?: string;
        textFallback?: boolean;
    }): Promise<this>;
    /**
     * Wrap one or more already-built primitives (e.g. items from another `AIRich` instance's
     * `.items` getter, or hand-built `{ ..., __typename }` objects) in an `AddonAction` layout —
     * a row of action buttons/pills attached to the primitives rather than a primitive itself.
     * Confirmed in elaina 1.3.10's `metaai.js` (`addonActionSection()` — its own layout name,
     * `'AddonAction'`, is also listed in `AI_RICH_LAYOUTS` in both forks' `extras.js`).
     * @param {object[]} primitives Typed primitive objects (each must carry its own `__typename`).
     * @param {{actionType?: string, alignment?: 'START'|'END'}} [options]
     */
    addAddonAction(primitives?: object[], opts38?: { [key: string]: any; 
        actionType?: string;
        alignment?: "START" | "END";
    }): this;
    /** Add a raw rich-response content-items carousel, matching Baileys' `items` field. */
    addContentItems(items?: any[]): this;
    /** Add a plain horizontal divider line (`GenAIDividerPrimitive`, no content). */
    addDivider(): this;
    /**
     * Add an "AI is generating..." placeholder card (`GenAIImaginePrimitive` with status
     * GENERATING) — distinct from addImage()/addVideo() which always send status READY.
     * Use this to show a pending-generation state before the real media is ready.
     * @param {{ imagine_type?: 'IMAGE'|'ANIMATE', estimated_completion_time?: number }} [options]
     */
    addGenerating(opts59?: { [key: string]: any; 
        imagine_type?: "IMAGE" | "ANIMATE";
        estimated_completion_time?: number;
    }): this;
    /** Add a large heading-style text block (`FOATextPrimitive`) — visually distinct from `addText()`'s regular paragraph text. */
    addHeading(text: any): this;
    /** Add an image inline with the surrounding text flow (falls back to a plain imageMessage on send() if the client can't render inline images — see skipImageFallback). */
    addInlineImage(imageUrl: any, opts39?: { [key: string]: any; 
        text?: string;
        alignment?: string;
        tapLinkUrl?: string;
        resolveUrl?: boolean;
    }): this;
    /** Add Baileys-compatible inline-video marker. WhatsApp's current rich-response helper carries this as a text marker. */
    addInlineVideo(): this;
    /**
     * Add a rendered LaTeX expression (`GenAILatexUXPrimitive`), with a real `AI_RICH_RESPONSE_LATEX`
     * submessage (unlike most primitives in this block, this one has a proper proto type).
     * @param {string} expression LaTeX source, e.g. `'$$E = mc^2$$'`.
     */
    addLatex(expression: string): this;
    /**
     * Add a pre-rendered LaTeX expression: `addLatex()` ships the raw expression string for the
     * client to typeset itself; this ships an already-rendered image of it instead (real proto
     * fields — `proto.AIRichResponseLatexMetadata.AIRichResponseLatexExpression`: url/width/height/
     * fontHeight/padding — verified against WAProto/index.js, not guessed), for a caller that
     * rendered the LaTeX server-side (e.g. via a LaTeX-to-PNG pipeline) and just wants the image shown.
     * @param {string} expression Raw LaTeX source, still sent alongside the image as a fallback/caption.
     * @param {{url: string, width?: number, height?: number, fontHeight?: number, topPadding?: number, leadingPadding?: number, bottomPadding?: number, trailingPadding?: number}} image
     */
    addLatexPro(expression: string, image?: {
        url: string;
        width?: number;
        height?: number;
        fontHeight?: number;
        topPadding?: number;
        leadingPadding?: number;
        bottomPadding?: number;
        trailingPadding?: number;
    }): this;
    /**
     * Add map annotations (real proto — `proto.AIRichResponseMapMetadata`: centerLatitude/
     * centerLongitude/latitudeDelta/longitudeDelta/annotations[]/showInfoList — verified against
     * WAProto/index.js, not guessed).
     * @param {{number: number, latitude: number, longitude: number, title?: string, body?: string}[]} annotations
     * @param {{centerLatitude?: number, centerLongitude?: number, latitudeDelta?: number, longitudeDelta?: number, showInfoList?: boolean}} [options]
     */
    addMap(annotations?: {
        number: number;
        latitude: number;
        longitude: number;
        title?: string;
        body?: string;
    }[], options?: {
        centerLatitude?: number;
        centerLongitude?: number;
        latitudeDelta?: number;
        longitudeDelta?: number;
        showInfoList?: boolean;
    }): this;
    /**
     * Add an animated GIF (real proto — `proto.AIRichResponseDynamicMetadata`, `type` = the GIF
     * value of `AIRichResponseDynamicMetadataType` — verified against WAProto/index.js, not
     * guessed; `AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF` = 2).
     * @param {string} url
     * @param {{loopCount?: number, version?: number|string}} [options]
     */
    addGif(url: string, opts40?: { [key: string]: any; 
        loopCount?: number;
        version?: number | string;
    }): this;
    /** Build rich-response citation/link submessages using the same shape as Baileys' `links` content shortcut. */
    addLinks(links?: any[]): this;
    /**
     * Add a "searching/working" progress banner (`GenAIBotProgressStatusPrimitive`) — a one-shot
     * status chip (unlike `addSuggest`, this isn't tappable). Distinct from `addThinkingStatus()`'s
     * icon/typename.
     * @param {string} title
     * @param {{icon?: string, is_in_progress?: boolean}} [options]
     */
    addProgressStatus(title: string, opts41?: { [key: string]: any; 
        icon?: string;
        is_in_progress?: boolean;
    }): this;
    /**
     * Add a subscription-quota-limit upsell card (`GenAIMetaSubsQuotaUpsellPrimitive`).
     * @param {{title: string, body?: string, body_line1?: string, body_line2?: string, buttons?: {label: string, action?: string, deeplink?: string}[]}} data
     */
    addQuotaUpsell(data?: {
        title: string;
        body?: string;
        body_line1?: string;
        body_line2?: string;
        buttons?: {
            label: string;
            action?: string;
            deeplink?: string;
        }[];
    }): this;
    /**
     * Add several subscription-quota-limit upsell cards as one carousel-style block (each card is
     * the same `GenAIMetaSubsQuotaUpsellPrimitive` shape `addQuotaUpsell()` uses — this just
     * pushes them as one `primitives` array on a single layout instead of one `primitive` each, and
     * applies the same OPEN_URL/`url` vs OPEN_DEEPLINK/`deeplink` fix per card).
     * @param {{title: string, body?: string, body_line1?: string, body_line2?: string, buttons?: {label: string, action?: string, deeplink?: string, url?: string}[]}[]} cards
     */
    addQuotaUpsellCards(cards?: {
        title: string;
        body?: string;
        body_line1?: string;
        body_line2?: string;
        buttons?: {
            label: string;
            action?: string;
            deeplink?: string;
            url?: string;
        }[];
    }[]): this;
    /** Builder-level default for `forwarded` (the "Forwarded" label + `forwardedAiBotMessageInfo`). `send({ forwarded })` still overrides per call. */
    setForwarded(enabled?: boolean): this;
    /** Builder-level default for `includesUnifiedResponse` (the `unifiedResponse` payload + the follow-up edit that gets the card past "download"). */
    setIncludesUnifiedResponse(enabled?: boolean): this;
    /** Builder-level default for `includesSubmessages` (the legacy `submessages[]` array). */
    setIncludesSubmessages(enabled?: boolean): this;
    /** Markdown text WITHOUT hyperlink/citation/LaTeX entity parsing -- for sending `_italic_` / `**bold**` / `code` exactly as typed. */
    addTextRaw(text: any, opts42?: { [key: string]: any; }): this;
    /** "In progress" status card (`GenAIBotProgressStatusPrimitive`); same as `addProgressStatus()` with the Go reference's defaults. */
    addProgress(title?: string, icon?: string, options?: {}): this;
    /** Quota-upsell card with text only (no button). */
    addQuotaUpsellPlain(title: any, line1?: string, line2?: string): this;
    /**
     * Quota-upsell card with one custom button. Unlike the Go reference there is no default target link -- pass `deeplink` or `url`.
     * @param {{action?: 'OPEN_DEEPLINK'|'OPEN_URL', deeplink?: string, url?: string}} [target]
     */
    addQuotaUpsellCustom(title: any, line1: any, line2: any, label: any, opts43?: { [key: string]: any; }): this;
    /** Quota-upsell card that is ONLY a button (no title/body). Requires `deeplink` or `url`. */
    addQuotaUpsellBtnOnly(label?: string, opts44?: { [key: string]: any; }): this;
    /**
     * "Strict" quota-upsell card: only the fields you pass are sent. `body` is the field the client renders as the card's
     * content (confirmed in the Go reference's strict mode); title and button are optional.
     */
    addQuotaUpsellStrict(opts60?: { [key: string]: any; }): this;
    /** Sponsored-story card (`GenAISearchAdPrimitive`). */
    addSearchAd(opts61?: { [key: string]: any; }, options?: {}): this;
    /** Recursive unified-response container (`GenAINestedUnifiedResponse`). Each field is an array of raw section / screen objects. */
    addNestedUnified(opts62?: { [key: string]: any; }, options?: {}): this;
    /** Third-party account-linking upsell (`GenAI3PAccountLinkingUpsellPrimitive`). */
    add3PAccountLinking(opts63?: { [key: string]: any; }, options?: {}): this;
    /** Search-planner steps card (`GenAISearchPlannerStepsPrimitive`); `data` is the raw primitive body (step shapes vary). */
    addSearchPlannerSteps(data?: {}, options?: {}): this;
    /** One search-planner step snippet (`GenAISearchPlannerStepSnippetPrimitive`). @param {string} status @param {string} [header] @param {object[]} [instructions] */
    addSearchPlannerStepSnippet(status: string, header?: string, instructions?: object[], options?: {}): this;
    /** Orchestrator search-engine primitive (`GenAIOrchestratorSearchEngine`); raw body. */
    addOrchestratorSearchEngine(data?: {}, options?: {}): this;
    /** Professional-consent primitive (`GenAIProfessionalConsentPrimitive`); raw body (many label/url fields). */
    addProfessionalConsent(data?: {}, options?: {}): this;
    /** Embedded contextual screen (`GenAIEmbeddedContextualScreenContent`, the "bloks_attachment" payload). */
    addEmbeddedContextualScreen(type: any, data?: {}, opts45?: { [key: string]: any; }, options?: {}): this;
    /**
     * Experimental real layout container: push several already-built `GenAI*` primitives as ONE layout section
     * (`GenAI<name>LayoutViewModel`, `primitives[]`). `addMultipleResponse` / `addFlexibleGrid` / `addVStack` are named
     * shortcuts. (The Go reference only flattens these to text; this sends the real layout -- eval-test before relying on it.)
     * @param {string} name Layout name, e.g. 'HScroll', 'Grid', 'MultipleResponse', 'FlexibleCountGrid', 'VStack'.
     * @param {object[]} primitives Primitive objects, each with its own `__typename`.
     */
    addLayout(name: string, primitives: object[], opts46?: { [key: string]: any; }): this;
    /** `GenAIMultipleResponseLayoutViewModel`. */
    addMultipleResponse(primitives: any, options?: {}): this;
    /** `GenAIFlexibleCountGridLayoutViewModel`. */
    addFlexibleGrid(primitives: any, options?: {}): this;
    /** `GenAIVStackLayoutViewModel` (experimental). */
    addVStack(primitives: any, options?: {}): this;
    /**
     * Pending options for the NEXT `add*()` / `set*()` call (Go `Opts`). Accepts `{ id, insertAt, replace }` or the positional
     * `(id, insertAt, replace)` form. Inline options on that call take priority; the pending options are consumed either way.
     */
    opts(idOrOpts: any, insertAt: any, replace: any): this;
    _pendingOpts: {
        [k: string]: any;
    };
    /** Like `opts()` with an insert offset (Go `OptsAt`): `offset` 0 = after the `insertAtId` block, negative = before it (-1 = directly before). */
    optsAt(id: any, insertAtId: any, offset: number, replace: any): this;
    /** JSON snapshot for `JSON.stringify(rich)` (Go `MarshalJSON`): response id, title/footer, sections, submessages, embedded screens. */
    toJSON(): {
        response_id: any;
        bot_response_id: any;
        title: string;
        footer: string;
        sections: any[];
        submessages: any[];
        embedded_screens: any[];
    };
    /** Minimal botMetadata envelope: drops the notification fields so only disclaimer / response id / verification / extras remain (Go `SetRawEnvelope`). */
    setRawEnvelope(enabled?: boolean): this;
    /** Register async work (fetch, resolve, ...) that runs concurrently at the start of `build()` (Go `Defer`). @param {() => any} fn */
    defer(fn: () => any): this;
    /** Remove a block by id; unlike `delete(id)` this is a silent no-op when the id is unknown (Go `DeleteSection`). */
    deleteSection(id: any): this;
    /** Current unified-response id. */
    get responseId(): any;
    /** Current bot response id. */
    get botResponseId(): any;
    /** Option-object form of `addImage()` (Go `AddImageOpts`). @param {{urls: string|Buffer|Array<string|Buffer>, width?: number, height?: number, status?: string, updateText?: string}} o */
    addImageOpts(opts64?: { [key: string]: any; 
        urls: string | Buffer | Array<string | Buffer>;
        width?: number;
        height?: number;
        status?: string;
        updateText?: string;
    }): this;
    /** Option-object form of `addVideo()` (Go `AddVideoOpts`). @param {string|Buffer|{url: string, file_length?: number, duration?: number, thumbnail?: any, mime_type?: string, status?: string, estimatedTime?: number}} v */
    addVideoOpts(v: string | Buffer | {
        url: string;
        file_length?: number;
        duration?: number;
        thumbnail?: any;
        mime_type?: string;
        status?: string;
        estimatedTime?: number;
    }, extra?: {}): this;
    /** Several videos in ONE block with a single alert (Go `AddVideos`). Same as passing an array to `addVideo()`. */
    addVideos(videos: any, options?: {}): this;
    /** Follow-up pills with an explicit layout (Go `AddSuggestLayout`). Same as `addSuggest(list, { scroll, layout })`. */
    addSuggestLayout(suggestions: any, scroll: boolean, layout: any): this;
    /** Single follow-up pill (Go `AddChainingSuggestion`; the Go prompt-id argument is unused there too). */
    addChainingSuggestion(prompt: any, options?: {}): this;
    /** Raw progress/thinking primitive: any extra fields pass through; `__typename` is forced to `GenAIBotProgressStatusPrimitive` (Go `AddThinkingFull`). */
    addThinkingFull(primitive?: {}, opts47?: { [key: string]: any; }): this;
    /** AI "thinking" status line (Go `AddBotThinking`). `status` THINKING/GENERATING render as in-progress, anything else as done. */
    addBotThinking(status?: string, updateText?: string, opts48?: { [key: string]: any; }): this;
    /** Source list with per-source subtitle (Go `AddSourceFull`). @param {{title: string, subtitle?: string, url: string, icon?: string|Buffer}[]} sources */
    addSourceFull(sources?: {
        title: string;
        subtitle?: string;
        url: string;
        icon?: string | Buffer;
    }[], opts49?: { [key: string]: any; }): this;
    /**
     * Compact entity card (`GenAICompactEntityPrimitive`: title / subtitle / secondary_subtitle / image / entity id+url+type / action type).
     * Pass `{ asText: true }` for the Go reference's markdown fallback card instead (renders everywhere).
     */
    addCompactEntity(opts65?: { [key: string]: any; }, opts50?: { [key: string]: any; 
        asText?: boolean;
    }): this;
    /** "Generating..." image placeholder (`GenAIImaginePrimitive`, imagine_type IMAGINE, status GENERATING; Go `AddGenerate`). Also sets `botMetadata.imagineMetadata`. */
    addGenerate(updateText?: string, opts51?: { [key: string]: any; }): this;
    /**
     * Video via `GenAIVideoPrimitive` (media + optional music clip + delivery urls + lip-sync flag) -- distinct from `addVideo()`,
     * which uses `GenAIImaginePrimitive`/ANIMATE (Go `AddVideoPrimitive`). Experimental.
     * @param {{url?: string|Buffer, mimeType?: string, fileLength?: number, durationMs?: number, width?: number, height?: number, thumbnail?: string|Buffer,
     *   isLipSync?: boolean, musicClip?: {hasMusic?: boolean, songTitle?: string, artistName?: string, audioAssetId?: string, progressiveUri?: string, coverImageUri?: string},
     *   delivery?: {progressiveUrls?: string[], dashManifests?: string[], manifestXml?: string}}} v
     */
    addVideoPrimitive(opts66?: { [key: string]: any; 
        url?: string | Buffer;
        mimeType?: string;
        fileLength?: number;
        durationMs?: number;
        width?: number;
        height?: number;
        thumbnail?: string | Buffer;
        isLipSync?: boolean;
        musicClip?: {
            hasMusic?: boolean;
            songTitle?: string;
            artistName?: string;
            audioAssetId?: string;
            progressiveUri?: string;
            coverImageUri?: string;
        };
        delivery?: {
            progressiveUrls?: string[];
            dashManifests?: string[];
            manifestXml?: string;
        };
    }, options?: {}): this;
    /**
     * Pure-primitive LaTeX run (`GenAILatexUXPrimitive`: media + latex_expression + font_height + padding; Go `AddLatexUX`). Experimental --
     * needs a pre-rendered equation image `url`; for the inline-entity mechanism that is known to render, use `addLatex()`.
     */
    addLatexUX(opts67?: { [key: string]: any; 
        mimeType?: string;
    }, options?: {}): this;
    /** Sports match card as formatted text (Go `AddSportsWidget`). */
    addSportsWidget(opts68?: { [key: string]: any; }, options?: {}): this;
    /** Follow-up prompt card as text (Go `AddClippyFollowUp`). */
    addClippyFollowUp(opts69?: { [key: string]: any; }, options?: {}): this;
    /** Pinned header/subtitle card as text (Go `AddClippyWidget`). */
    addClippyWidget(header: any, subtitle?: string, options?: {}): this;
    /** Privacy/transparency note as text (Go `AddP13N`). */
    addP13N(text?: string, options?: {}): this;
    /** Location-permission prompt line as text (Go `AddLocationPermission`). */
    addLocationPermission(placeholder?: string, options?: {}): this;
    /** Timestamp placeholder line as text (Go `AddTimestampPlaceholder`). */
    addTimestampPlaceholder(placeholder?: string, options?: {}): this;
    /** Deep-link line as a markdown link (Go `AddDeeplinkItem`); falls back to the Android deeplink when `deepLinkUrl` is empty. */
    addDeeplinkItem(deepLinkUrl: any, androidDeeplinkUrl: any, opts52?: { [key: string]: any; 
        label?: string;
    }): this;
    /** Go-name alias of `loadFrom()`. */
    loadFromMessage(msg: any): this;
    /** Add blank vertical spacing (`GenAISpacerPrimitive`). @param {number} [spacing=1] Spacing unit, per observed traffic. */
    addSpacer(spacing?: number): this;
    /**
     * Add a task/checklist card (`GenAITaskPrimitive`).
     * @param {{task_id?: string, title: string, subtitle?: string, status?: string}} data
     */
    addTask(data?: {
        task_id?: string;
        title: string;
        subtitle?: string;
        status?: string;
    }): this;
    /**
     * Batch version of `addTask()` — one or more task/checklist cards (`GenAITaskPrimitive`) pushed
     * as a single `primitives` array on one layout, instead of one `addTask()` call (and one
     * `_sections` entry) per task.
     * @param {{task_id?: string, title: string, subtitle?: string, status?: string}[]} tasks
     * @param {{textFallback?: boolean}} [options]
     */
    addTasks(tasks?: {
        task_id?: string;
        title: string;
        subtitle?: string;
        status?: string;
    }[], opts53?: { [key: string]: any; 
        textFallback?: boolean;
    }): this;
    /** Add a "thinking" status banner (`GenAIBotThinkingStatusPrimitive`). See `addProgressStatus()`. */
    addThinkingStatus(title: any, opts54?: { [key: string]: any; 
        icon?: string;
        is_in_progress?: boolean;
        textFallback?: boolean;
    }): this;
    #private;
}
/** Thin no-op subclass of `AIRich` — kept for drop-in compatibility with code ported from ourin-baileys that references `ORich` by name. */
export class ORich extends AIRich {
}
import { BaseBuilder } from './shared.js';
