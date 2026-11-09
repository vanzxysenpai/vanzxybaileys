export const LUA_KEYWORDS: Set<string>;
export function buildRichContextInfo(quoted: any): {
    forwardingScore: number;
    isForwarded: boolean;
    forwardedAiBotMessageInfo: {
        botJid: string;
    };
    forwardOrigin: number;
};
export function buildBotForwardedMessage(submessages: any, contextInfo: any, unifiedResponse: any): {
    botForwardedMessage: {
        message: {
            richResponseMessage: {
                messageType: number;
                submessages: any;
                contextInfo: any;
            };
        };
    };
};
export function generateTableContent(title: any, headers: any, rows: any, quoted: any, options?: {}): {
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
};
export function generateListContent(title: any, items: any, quoted: any, options?: {}): {
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
};
export function generateCodeBlockContent(code: any, quoted: any, options?: {}): {
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
};
export function generateLatexContent(quoted: any, options: any): {
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
};
export function generateLatexImageContent(quoted: any, options: any, uploadFn: any, renderLatexToPng: any): Promise<{
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
}>;
export function generateLatexInlineImageContent(quoted: any, options: any, uploadFn: any, renderLatexToPng: any): Promise<{
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
}>;
export function captureUnifiedResponse(msg: any): {
    unifiedResponse: {
        data: any;
    };
    submessages: any;
    contextInfo: any;
};
export function generateUnifiedResponseContent(quoted: any, captured: any): {
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
};
export function generateRichMessageContent(submessages: any, quoted: any): {
    message: {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: any;
                    contextInfo: any;
                };
            };
        };
    };
    messageId: string;
};
export function tokenizeCodeV2(code: any, language?: string): {
    codeBlock: any[];
    unified_codeBlock: {
        content: any;
        type: any;
    }[];
};
export function toTableMetadataV2(arr: any): {
    title: any;
    rows: {
        isHeading?: boolean;
        items: any[];
    }[];
    unified_rows: {
        is_header: boolean;
        cells: any[];
    }[];
};
export function generateTableContentV2(table: any, quoted: any, options?: {}): {
    message: {
        messageContextInfo: {
            threadId: any[];
            deviceListMetadata: {
                senderKeyIndexes: any[];
                recipientKeyIndexes: any[];
                recipientKeyHash: string;
                recipientTimestamp: number;
            };
            deviceListMetadataVersion: number;
            messageSecret: any;
        };
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    submessages: any[];
                    messageType: number;
                    unifiedResponse: {
                        data: any;
                    };
                    contextInfo: {
                        forwardingScore: number;
                        isForwarded: boolean;
                        forwardedAiBotMessageInfo: {
                            botJid: string;
                        };
                        forwardOrigin: number;
                        botMessageSharingInfo: {
                            botEntryPointOrigin: number;
                            forwardScore: number;
                        };
                    };
                };
            };
        };
    };
    messageId: string;
};
export function generateCodeBlockContentV2(code: any, quoted: any, options?: {}): {
    message: {
        messageContextInfo: {
            threadId: any[];
            deviceListMetadata: {
                senderKeyIndexes: any[];
                recipientKeyIndexes: any[];
                recipientKeyHash: string;
                recipientTimestamp: number;
            };
            deviceListMetadataVersion: number;
            messageSecret: any;
        };
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    submessages: any[];
                    messageType: number;
                    unifiedResponse: {
                        data: any;
                    };
                    contextInfo: {
                        mentionedJid: any[];
                        groupMentions: any[];
                        statusAttributions: any[];
                        forwardingScore: number;
                        isForwarded: boolean;
                        forwardedAiBotMessageInfo: {
                            botJid: string;
                        };
                        forwardOrigin: number;
                        botMessageSharingInfo: {
                            botEntryPointOrigin: number;
                            forwardScore: number;
                        };
                    };
                };
            };
        };
    };
    messageId: string;
};
export function generateLinkContent(text: any, links: any, quoted: any, options?: {}): {
    message: {
        messageContextInfo: {
            messageSecret: any;
        };
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: {
                        messageType: number;
                        messageText: any;
                    }[];
                    unifiedResponse: {
                        data: any;
                    };
                    contextInfo: {
                        forwardingScore: any;
                        isForwarded: boolean;
                        forwardedAiBotMessageInfo: {
                            botJid: any;
                        };
                        forwardOrigin: number;
                        botMessageSharingInfo: {
                            forwardScore: any;
                        };
                    };
                };
            };
        };
    };
    messageId: string;
};
export function generateLinkContentV2(text: any, links: any, quoted: any, options?: {}): {
    message: {
        messageContextInfo: {
            threadId: any[];
            messageSecret: any;
        };
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: number;
                    submessages: {
                        messageType: number;
                        messageText: any;
                    }[];
                    unifiedResponse: {
                        data: any;
                    };
                    contextInfo: {
                        isForwarded: boolean;
                        forwardOrigin: number;
                    };
                };
            };
        };
    };
    messageId: string;
};
