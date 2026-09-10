/**
 * Lia@Changes 09-04-26 [WIP]
 * Adds support for tables and code blocks with richResponseMessage (wrapped inside botForwardedMessage).
 *
 * If you use or copy this code, please credit my name or project. AND DO NOT CHANGE THIS NOTE
 */
import { getRandomValues, randomUUID } from 'crypto';
import { DONATE_URL, LEXER_REGEX } from '../Defaults/index.js';
import { LANGUAGE_KEYWORDS } from '../WABinary/constants.js';
import { CodeHighlightType, RichSubMessageType } from '../Types/RichType.js';
import { proto } from '../../WAProto/index.js';
import { unixTimestampSeconds } from './generics.js';
const NOOP = new Set([]);
// Vanz@Fix (bug 40 / inline image): AIRichResponseInlineImageMetadata.imageUrl is a nested
// AIRichResponseImageURL message (imagePreviewUrl/imageHighResUrl/sourceUrl), NOT a plain string.
// Passing a raw string made protobufjs silently encode an empty embedded message (no throw),
// so the image URL data was dropped on the wire and the image never rendered.
const toImageUrlObject = (url) => {
    if (!url)
        return undefined;
    if (typeof url === 'object')
        return { imagePreviewUrl: url.imagePreviewUrl || url.url, imageHighResUrl: url.imageHighResUrl || url.url, sourceUrl: url.sourceUrl || url.url };
    return { imagePreviewUrl: url, imageHighResUrl: url, sourceUrl: url };
};
const IMAGE_ALIGNMENT = { leading: 0, trailing: 1, center: 2 };
const toImageAlignment = (alignment) => {
    if (typeof alignment === 'number')
        return alignment;
    return IMAGE_ALIGNMENT[String(alignment || 'center').toLowerCase()] ?? IMAGE_ALIGNMENT.center;
};
export const tokenizeCode = (code, language = 'javascript') => {
    const keywords = LANGUAGE_KEYWORDS[language] || NOOP;
    const blocks = [];
    LEXER_REGEX.lastIndex = 0;
    let match;
    while ((match = LEXER_REGEX.exec(code)) !== null) {
        if (match[1]) {
            blocks.push({ highlightType: CodeHighlightType.COMMENT, codeContent: match[1] });
        }
        else if (match[2]) {
            blocks.push({ highlightType: CodeHighlightType.STRING, codeContent: match[2] });
        }
        else if (match[3]) {
            blocks.push({
                highlightType: keywords.has(match[3]) ? CodeHighlightType.KEYWORD : CodeHighlightType.METHOD,
                codeContent: match[3],
            });
        }
        else if (match[4]) {
            blocks.push({
                highlightType: keywords.has(match[4]) ? CodeHighlightType.KEYWORD : CodeHighlightType.DEFAULT,
                codeContent: match[4],
            });
        }
        else if (match[5]) {
            blocks.push({ highlightType: CodeHighlightType.NUMBER, codeContent: match[5] });
        }
        else {
            blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: match[6] });
        }
    }
    return blocks;
};
// Lia@Changes 09-04-26 --- Inject buffer into unifiedResponse.data to support proper rendering of rich messages (ex: tables and code blocks)
export const toUnified = (submessages, uuid) => ({
    response_id: uuid || randomUUID(),
    sections: submessages.map((submessage, index) => {
        switch (submessage.messageType) {
            case RichSubMessageType.CODE:
                const codeMetadata = submessage.codeMetadata;
                return {
                    view_model: {
                        primitive: {
                            language: codeMetadata.codeLanguage,
                            code_blocks: codeMetadata.codeBlocks.map((block) => ({ content: block.codeContent, type: CodeHighlightType[block.highlightType] })),
                            __typename: 'GenAICodeUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                };
            case RichSubMessageType.CONTENT_ITEMS:
                // Vanz@Fix (bug 40): was returning {} — now renders content items carousel
                const contentItemsMeta = submessage.contentItemsMetadata;
                return {
                    view_model: {
                        primitive: {
                            items: contentItemsMeta?.itemsMetadata || [],
                            content_type: contentItemsMeta?.contentType ?? 1,
                            __typename: 'GenAIContentItemsUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                };
            case RichSubMessageType.INLINE_IMAGE:
                // Vanz@Fix (bug 40, round 2): imageUrl is now a real AIRichResponseImageURL
                // object (imagePreviewUrl/imageHighResUrl/sourceUrl) instead of a bare string
                // that protobufjs silently dropped on encode. alignment is mapped back to its
                // enum name (matches how the compiled proto's toObject() renders other enums).
                const imgMeta = submessage.imageMetadata;
                const ALIGNMENT_NAME = ['AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED', 'AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED', 'AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED'];
                return {
                    view_model: {
                        primitive: {
                            image_url: {
                                image_preview_url: imgMeta?.imageUrl?.imagePreviewUrl || '',
                                image_high_res_url: imgMeta?.imageUrl?.imageHighResUrl || '',
                                source_url: imgMeta?.imageUrl?.sourceUrl || ''
                            },
                            image_text: imgMeta?.imageText || '',
                            alignment: ALIGNMENT_NAME[imgMeta?.alignment ?? 2],
                            tap_link_url: imgMeta?.tapLinkUrl || '',
                            __typename: 'GenAIInlineImageUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                };
            case RichSubMessageType.LATEX:
                // Vanz@Fix (bug 40): was returning {} — now renders LaTeX expressions
                const latexMeta = submessage.latexMetadata;
                return {
                    view_model: {
                        primitive: {
                            text: latexMeta?.text || '',
                            expressions: latexMeta?.expressions || [],
                            __typename: 'GenAILatexUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                };
            case RichSubMessageType.TABLE:
                const tableMetadata = submessage.tableMetadata || {};
                // Accept both the internal row shape ({ items, isHeading }) and
                // the raw string[][] shape used by some rich-response callers.
                const rawRows = Array.isArray(tableMetadata.rows) ? tableMetadata.rows : [];
                const normalizedRows = rawRows.map((row, index) => {
                    if (Array.isArray(row)) {
                        return { is_header: index === 0, cells: row.map(String) };
                    }
                    const cells = Array.isArray(row?.items) ? row.items.map(String) : [];
                    return { is_header: !!row?.isHeading, cells };
                });
                return {
                    view_model: {
                        primitive: {
                            title: tableMetadata.title || '',
                            rows: normalizedRows.map((row) => ({
                                is_header: row.is_header,
                                cells: row.cells,
                                markdown_cells: row.cells.map((item) => ({ text: item }))
                            })),
                            __typename: 'GenATableUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                };
            case RichSubMessageType.TEXT:
                return {
                    view_model: {
                        primitive: {
                            text: submessage.messageText,
                            inline_entities: submessage.inlineEntities || [],
                            __typename: 'GenAIMarkdownTextUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                };
        }
        return submessage;
    })
});
export const prepareRichResponseMessage = (content) => {
    const { alignment, code, contentText, disclaimerText, footerText, headerText, imageText, inlineImage, inlineVideo, items, language, latex, links, noHeading, posts, products, suggested, richResponse, table, tapLinkUrl, title } = content;
    let submessages = [];
    if (Array.isArray(richResponse)) {
        submessages = richResponse.map((submessage) => {
            if (submessage.text) {
                return {
                    messageType: RichSubMessageType.TEXT,
                    messageText: submessage.text,
                    inlineEntities: submessage.inlineEntities
                };
            }
            else if (submessage.code) {
                return {
                    messageType: RichSubMessageType.CODE,
                    codeMetadata: {
                        codeLanguage: submessage.language,
                        codeBlocks: submessage.code
                    }
                };
            }
            else if (submessage.items) {
                return {
                    messageType: RichSubMessageType.CONTENT_ITEMS,
                    contentItemsMetadata: {
                        itemsMetadata: submessage.items,
                        contentType: proto.AIRichResponseContentItemsMetadata.ContentType.CAROUSEL
                    }
                };
            }
            else if (submessage.inlineImage) {
                return {
                    messageType: RichSubMessageType.INLINE_IMAGE,
                    imageMetadata: {
                        imageUrl: toImageUrlObject(submessage.inlineImage),
                        imageText: submessage.imageText,
                        alignment: toImageAlignment(submessage.alignment),
                        tapLinkUrl: submessage.tapLinkUrl
                    }
                };
            }
            else if (submessage.inlineVideo) {
                return {
                    messageType: RichSubMessageType.TEXT,
                    messageText: 'INLINE_VIDEO'
                };
            }
            else if (submessage.latex) {
                return {
                    messageType: RichSubMessageType.LATEX,
                    latexMetadata: {
                        text: submessage.text,
                        expressions: submessage.latex
                    }
                };
            }
            else if (submessage.posts) {
                return {
                    messageType: RichSubMessageType.TEXT,
                    messageText: 'POSTS'
                };
            }
            else if (submessage.products) {
                return {
                    messageType: RichSubMessageType.TEXT,
                    messageText: 'PRODUCTS'
                };
            }
            else if (submessage.suggested) {
                return {
                    messageType: RichSubMessageType.TEXT,
                    messageText: 'SUGGESTED_PROMPT'
                };
            }
            else if (submessage.table) {
                const rows = Array.isArray(submessage.table)
                    ? submessage.table.map((row, index) => Array.isArray(row)
                        ? { isHeading: index === 0, items: row.map(String) }
                        : row)
                    : [];
                return {
                    messageType: RichSubMessageType.TABLE,
                    tableMetadata: {
                        title: submessage.title || '',
                        rows
                    }
                };
            }
            return submessage;
        });
    }
    else {
        if (headerText) {
            submessages.push({
                messageType: RichSubMessageType.TEXT,
                messageText: headerText
            });
        }
        if (contentText) {
            submessages.push({
                messageType: RichSubMessageType.TEXT,
                messageText: contentText
            });
        }
        if (code) {
            language ||= 'javascript';
            submessages.push({
                messageType: RichSubMessageType.CODE,
                codeMetadata: {
                    codeLanguage: language,
                    codeBlocks: tokenizeCode(code, language)
                }
            });
        }
        if (items) {
            submessages.push({
                messageType: RichSubMessageType.CONTENT_ITEMS,
                contentItemsMetadata: {
                    itemsMetadata: items,
                    contentType: proto.AIRichResponseContentItemsMetadata.ContentType.CAROUSEL
                }
            });
        }
        if (inlineImage) {
            submessages.push({
                messageType: RichSubMessageType.INLINE_IMAGE,
                imageMetadata: {
                    imageUrl: toImageUrlObject(inlineImage),
                    imageText,
                    alignment: toImageAlignment(alignment),
                    tapLinkUrl
                }
            });
        }
        if (inlineVideo) {
            submessages.push({
                messageType: RichSubMessageType.TEXT,
                messageText: 'INLINE_VIDEO'
            });
        }
        if (latex) {
            submessages.push({
                messageType: RichSubMessageType.LATEX,
                latexMetadata: {
                    text,
                    expressions: latex
                }
            });
        }
        if (links) {
            links.forEach((linkField, index) => {
                const prefix = 'SS_' + index;
                const url = linkField.url || DONATE_URL;
                const sources = linkField.sources?.map((sourceField) => ({
                    source_type: 'THIRD_PARTY',
                    source_display_name: sourceField.displayName || 'Donate',
                    source_subtitle: sourceField.subtitle || 'Saweria',
                    source_url: sourceField.url || url
                }));
                submessages.push({
                    messageType: RichSubMessageType.TEXT,
                    messageText: linkField.text + ` {{${prefix}}}¹{{/${prefix}}} `,
                    inlineEntities: [{
                            key: prefix,
                            metadata: {
                                reference_id: index + 1,
                                reference_url: url,
                                reference_title: linkField.title || 'For Donation via Saweria',
                                reference_display_name: linkField.displayName || 'Donation',
                                sources: sources || [],
                                __typename: 'GenAISearchCitationItem'
                            }
                        }]
                });
            });
        }
        if (posts) {
            submessages.push({
                messageType: RichSubMessageType.TEXT,
                messageText: 'POSTS'
            });
        }
        if (products) {
            submessages.push({
                messageType: RichSubMessageType.TEXT,
                messageText: 'PRODUCTS'
            });
        }
        if (suggested) {
            submessages.push({
                messageType: RichSubMessageType.TEXT,
                messageText: 'SUGGESTED_PROMPT'
            });
        }
        if (table) {
            submessages.push({
                messageType: RichSubMessageType.TABLE,
                tableMetadata: {
                    title,
                    rows: table.map((items, index) => ({
                        isHeading: !noHeading && index == 0,
                        items
                    }))
                }
            });
        }
        if (footerText) {
            submessages.push({
                messageType: RichSubMessageType.TEXT,
                messageText: footerText
            });
        }
    }
    const uuid = randomUUID();
    const unified = toUnified(submessages, uuid);
    const richResponseMessage = proto.AIRichResponseMessage.create({
        submessages,
        messageType: proto.AIRichResponseMessageType.AI_RICH_RESPONSE_TYPE_STANDARD,
        unifiedResponse: {
            data: Buffer.from(JSON.stringify(unified)) // Lia@Note 25-04-26 --- Expects "ArrayBufferLike"
        },
        contextInfo: {
            isForwarded: true,
            forwardingScore: 1,
            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
            forwardOrigin: 4
        }
    });
    const message = wrapToBotForwardedMessage(richResponseMessage);
    const botMetadata = message.messageContextInfo.botMetadata;
    // Lia@Note 13-05-26 --- Add disclaimer text on richResponseMessage
    if (disclaimerText) {
        botMetadata.messageDisclaimerText = disclaimerText;
    }
    // Lia@Note 15-05-26 --- Add responseId from unified directly to botMetadata
    botMetadata.botResponseId = uuid;
    return message;
};
// Lia@Note 17-04-26 --- signature and certificateChain for proofs[] field
export const botMetadataSignature = () => {
    const signature = new Uint8Array(64);
    getRandomValues(signature);
    return signature;
};
export const botMetadataCertificate = (length = 685) => {
    const certificate = new Uint8Array(length);
    certificate[0] = 48;
    certificate[1] = 130;
    getRandomValues(certificate.subarray(2));
    return certificate;
};
export const wrapToBotForwardedMessage = (richResponseMessage) => ({
    messageContextInfo: {
        botMetadata: {
            // Lia@Note 09-04-26 --- TODO: Fill verificationMetadata field
            verificationMetadata: {
                proofs: [
                    {
                        certificateChain: [
                            botMetadataCertificate(),
                            botMetadataCertificate(892)
                        ],
                        version: 1,
                        useCase: 1,
                        signature: botMetadataSignature()
                    }
                ]
            }
        }
    },
    botForwardedMessage: {
        message: { richResponseMessage }
    }
});
//# sourceMappingURL=rich-message-utils.js.map