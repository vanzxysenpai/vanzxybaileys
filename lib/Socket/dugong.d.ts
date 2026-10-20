export class Dugong {
    constructor(waUploadToServer: any, relayMessageFn: any, config: any, sock: any);
    relayMessage: any;
    waUploadToServer: any;
    config: any;
    sock: any;
    detectType(content: any): "PAYMENT" | "PRODUCT" | "GROUP_INVITE" | "INTERACTIVE_BUTTONS" | "CAROUSEL" | "INTERACTIVE" | "ALBUM" | "EVENT" | "POLL_RESULT" | "GROUP_STORY";
    handlePayment(content: any, quoted: any): Promise<{
        requestPaymentMessage: proto.Message.RequestPaymentMessage;
    }>;
    handleProduct(content: any, _jid: any, _quoted: any): Promise<{
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: any;
                    };
                    footer: {
                        text: any;
                    };
                    header: {
                        title: any;
                        hasMediaAttachment: boolean;
                        productMessage: {
                            product: {
                                productImage: any;
                                productId: any;
                                title: any;
                                description: any;
                                currencyCode: any;
                                priceAmount1000: any;
                                retailerId: any;
                                url: any;
                                productImageCount: number;
                            };
                            businessOwnerJid: string;
                        };
                    };
                    nativeFlowMessage: {
                        buttons: any;
                    };
                };
            };
        };
    }>;
    handleInteractive(content: any, _jid: any, _quoted: any): Promise<{
        interactiveMessage: {
            body: {
                text: any;
            };
            footer: {
                text: any;
            };
        };
    }>;
    handleInteractiveButtons(content: any, _jid: any, _quoted: any): Promise<{
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {};
                    deviceListMetadataVersion: number;
                    messageSecret: any;
                };
                interactiveMessage: {
                    body: {
                        text: any;
                    };
                    footer: {
                        text: any;
                    };
                    header: {
                        title: any;
                        subtitle: any;
                        hasMediaAttachment: boolean;
                    };
                    nativeFlowMessage: {
                        buttons: any;
                    };
                };
            };
        };
    }>;
    handleCarousel(content: any, _jid: any, _quoted: any): Promise<{
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {};
                    deviceListMetadataVersion: number;
                    messageSecret: any;
                };
                interactiveMessage: {
                    body: any;
                    footer: any;
                    header: any;
                    carouselMessage: {
                        cards: {
                            body: any;
                            footer: any;
                            header: {
                                title: any;
                                hasMediaAttachment: boolean;
                            };
                        }[];
                        messageVersion: any;
                        carouselCardType: any;
                    };
                };
            };
        };
    }>;
    handleAlbum(content: any, jid: any, quoted: any): Promise<proto.WebMessageInfo>;
    handleEvent(content: any, jid: any, quoted: any): Promise<proto.WebMessageInfo>;
    handlePollResult(content: any, jid: any, quoted: any): Promise<proto.WebMessageInfo>;
    handleGroupInvite(content: any, jid: any, quoted: any): Promise<proto.WebMessageInfo>;
    handleGroupStory(content: any, jid: any, _quoted: any, options?: {}): Promise<any>;
    sendStatusWhatsApp(content: any, jids?: any[]): Promise<proto.WebMessageInfo>;
}
import { proto } from "../../WAProto/index.js";
