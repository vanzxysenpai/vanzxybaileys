// Generated from WAProto/index.js (loose structural typings: every message accepts arbitrary keys).
export declare namespace proto {
    export interface IADVDeviceIdentity { [key: string]: any }
    export class ADVDeviceIdentity implements IADVDeviceIdentity {
        constructor(properties?: IADVDeviceIdentity);
        [key: string]: any;
        static create(properties?: IADVDeviceIdentity): ADVDeviceIdentity;
        static encode(message: IADVDeviceIdentity, writer?: any): any;
        static encodeDelimited(message: IADVDeviceIdentity, writer?: any): any;
        static decode(reader: any, length?: number): ADVDeviceIdentity;
        static decodeDelimited(reader: any): ADVDeviceIdentity;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ADVDeviceIdentity;
        static toObject(message: ADVDeviceIdentity, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum ADVEncryptionType {
        E2EE = 0,
        HOSTED = 1,
        NON_E2EE = 2,
    }
    export interface IADVKeyIndexList { [key: string]: any }
    export class ADVKeyIndexList implements IADVKeyIndexList {
        constructor(properties?: IADVKeyIndexList);
        [key: string]: any;
        static create(properties?: IADVKeyIndexList): ADVKeyIndexList;
        static encode(message: IADVKeyIndexList, writer?: any): any;
        static encodeDelimited(message: IADVKeyIndexList, writer?: any): any;
        static decode(reader: any, length?: number): ADVKeyIndexList;
        static decodeDelimited(reader: any): ADVKeyIndexList;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ADVKeyIndexList;
        static toObject(message: ADVKeyIndexList, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IADVSignedDeviceIdentity { [key: string]: any }
    export class ADVSignedDeviceIdentity implements IADVSignedDeviceIdentity {
        constructor(properties?: IADVSignedDeviceIdentity);
        [key: string]: any;
        static create(properties?: IADVSignedDeviceIdentity): ADVSignedDeviceIdentity;
        static encode(message: IADVSignedDeviceIdentity, writer?: any): any;
        static encodeDelimited(message: IADVSignedDeviceIdentity, writer?: any): any;
        static decode(reader: any, length?: number): ADVSignedDeviceIdentity;
        static decodeDelimited(reader: any): ADVSignedDeviceIdentity;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ADVSignedDeviceIdentity;
        static toObject(message: ADVSignedDeviceIdentity, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IADVSignedDeviceIdentityHMAC { [key: string]: any }
    export class ADVSignedDeviceIdentityHMAC implements IADVSignedDeviceIdentityHMAC {
        constructor(properties?: IADVSignedDeviceIdentityHMAC);
        [key: string]: any;
        static create(properties?: IADVSignedDeviceIdentityHMAC): ADVSignedDeviceIdentityHMAC;
        static encode(message: IADVSignedDeviceIdentityHMAC, writer?: any): any;
        static encodeDelimited(message: IADVSignedDeviceIdentityHMAC, writer?: any): any;
        static decode(reader: any, length?: number): ADVSignedDeviceIdentityHMAC;
        static decodeDelimited(reader: any): ADVSignedDeviceIdentityHMAC;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ADVSignedDeviceIdentityHMAC;
        static toObject(message: ADVSignedDeviceIdentityHMAC, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IADVSignedKeyIndexList { [key: string]: any }
    export class ADVSignedKeyIndexList implements IADVSignedKeyIndexList {
        constructor(properties?: IADVSignedKeyIndexList);
        [key: string]: any;
        static create(properties?: IADVSignedKeyIndexList): ADVSignedKeyIndexList;
        static encode(message: IADVSignedKeyIndexList, writer?: any): any;
        static encodeDelimited(message: IADVSignedKeyIndexList, writer?: any): any;
        static decode(reader: any, length?: number): ADVSignedKeyIndexList;
        static decodeDelimited(reader: any): ADVSignedKeyIndexList;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ADVSignedKeyIndexList;
        static toObject(message: ADVSignedKeyIndexList, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIHomeState { [key: string]: any }
    export class AIHomeState implements IAIHomeState {
        constructor(properties?: IAIHomeState);
        [key: string]: any;
        static create(properties?: IAIHomeState): AIHomeState;
        static encode(message: IAIHomeState, writer?: any): any;
        static encodeDelimited(message: IAIHomeState, writer?: any): any;
        static decode(reader: any, length?: number): AIHomeState;
        static decodeDelimited(reader: any): AIHomeState;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIHomeState;
        static toObject(message: AIHomeState, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIHomeState {
        export interface IAIHomeOption { [key: string]: any }
        export class AIHomeOption implements IAIHomeOption {
            constructor(properties?: IAIHomeOption);
            [key: string]: any;
            static create(properties?: IAIHomeOption): AIHomeOption;
            static encode(message: IAIHomeOption, writer?: any): any;
            static encodeDelimited(message: IAIHomeOption, writer?: any): any;
            static decode(reader: any, length?: number): AIHomeOption;
            static decodeDelimited(reader: any): AIHomeOption;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIHomeOption;
            static toObject(message: AIHomeOption, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace AIHomeOption {
            export enum AIHomeActionType {
                PROMPT = 0,
                CREATE_IMAGE = 1,
                ANIMATE_PHOTO = 2,
                ANALYZE_FILE = 3,
                COLLABORATE = 4,
                OPEN_GREETING_CARD = 5,
            }
        }
    }
    export interface IAIMediaCollectionMessage { [key: string]: any }
    export class AIMediaCollectionMessage implements IAIMediaCollectionMessage {
        constructor(properties?: IAIMediaCollectionMessage);
        [key: string]: any;
        static create(properties?: IAIMediaCollectionMessage): AIMediaCollectionMessage;
        static encode(message: IAIMediaCollectionMessage, writer?: any): any;
        static encodeDelimited(message: IAIMediaCollectionMessage, writer?: any): any;
        static decode(reader: any, length?: number): AIMediaCollectionMessage;
        static decodeDelimited(reader: any): AIMediaCollectionMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIMediaCollectionMessage;
        static toObject(message: AIMediaCollectionMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIMediaCollectionMetadata { [key: string]: any }
    export class AIMediaCollectionMetadata implements IAIMediaCollectionMetadata {
        constructor(properties?: IAIMediaCollectionMetadata);
        [key: string]: any;
        static create(properties?: IAIMediaCollectionMetadata): AIMediaCollectionMetadata;
        static encode(message: IAIMediaCollectionMetadata, writer?: any): any;
        static encodeDelimited(message: IAIMediaCollectionMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIMediaCollectionMetadata;
        static decodeDelimited(reader: any): AIMediaCollectionMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIMediaCollectionMetadata;
        static toObject(message: AIMediaCollectionMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIMetadataOperation { [key: string]: any }
    export class AIMetadataOperation implements IAIMetadataOperation {
        constructor(properties?: IAIMetadataOperation);
        [key: string]: any;
        static create(properties?: IAIMetadataOperation): AIMetadataOperation;
        static encode(message: IAIMetadataOperation, writer?: any): any;
        static encodeDelimited(message: IAIMetadataOperation, writer?: any): any;
        static decode(reader: any, length?: number): AIMetadataOperation;
        static decodeDelimited(reader: any): AIMetadataOperation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIMetadataOperation;
        static toObject(message: AIMetadataOperation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIProvenance { [key: string]: any }
    export class AIProvenance implements IAIProvenance {
        constructor(properties?: IAIProvenance);
        [key: string]: any;
        static create(properties?: IAIProvenance): AIProvenance;
        static encode(message: IAIProvenance, writer?: any): any;
        static encodeDelimited(message: IAIProvenance, writer?: any): any;
        static decode(reader: any, length?: number): AIProvenance;
        static decodeDelimited(reader: any): AIProvenance;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIProvenance;
        static toObject(message: AIProvenance, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIProvenance {
        export interface IMetadata { [key: string]: any }
        export class Metadata implements IMetadata {
            constructor(properties?: IMetadata);
            [key: string]: any;
            static create(properties?: IMetadata): Metadata;
            static encode(message: IMetadata, writer?: any): any;
            static encodeDelimited(message: IMetadata, writer?: any): any;
            static decode(reader: any, length?: number): Metadata;
            static decodeDelimited(reader: any): Metadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Metadata;
            static toObject(message: Metadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IAIQueryFanout { [key: string]: any }
    export class AIQueryFanout implements IAIQueryFanout {
        constructor(properties?: IAIQueryFanout);
        [key: string]: any;
        static create(properties?: IAIQueryFanout): AIQueryFanout;
        static encode(message: IAIQueryFanout, writer?: any): any;
        static encodeDelimited(message: IAIQueryFanout, writer?: any): any;
        static decode(reader: any, length?: number): AIQueryFanout;
        static decodeDelimited(reader: any): AIQueryFanout;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIQueryFanout;
        static toObject(message: AIQueryFanout, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIRegenerateMetadata { [key: string]: any }
    export class AIRegenerateMetadata implements IAIRegenerateMetadata {
        constructor(properties?: IAIRegenerateMetadata);
        [key: string]: any;
        static create(properties?: IAIRegenerateMetadata): AIRegenerateMetadata;
        static encode(message: IAIRegenerateMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRegenerateMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRegenerateMetadata;
        static decodeDelimited(reader: any): AIRegenerateMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRegenerateMetadata;
        static toObject(message: AIRegenerateMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIRichResponseCodeMetadata { [key: string]: any }
    export class AIRichResponseCodeMetadata implements IAIRichResponseCodeMetadata {
        constructor(properties?: IAIRichResponseCodeMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseCodeMetadata): AIRichResponseCodeMetadata;
        static encode(message: IAIRichResponseCodeMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseCodeMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseCodeMetadata;
        static decodeDelimited(reader: any): AIRichResponseCodeMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseCodeMetadata;
        static toObject(message: AIRichResponseCodeMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIRichResponseCodeMetadata {
        export interface IAIRichResponseCodeBlock { [key: string]: any }
        export class AIRichResponseCodeBlock implements IAIRichResponseCodeBlock {
            constructor(properties?: IAIRichResponseCodeBlock);
            [key: string]: any;
            static create(properties?: IAIRichResponseCodeBlock): AIRichResponseCodeBlock;
            static encode(message: IAIRichResponseCodeBlock, writer?: any): any;
            static encodeDelimited(message: IAIRichResponseCodeBlock, writer?: any): any;
            static decode(reader: any, length?: number): AIRichResponseCodeBlock;
            static decodeDelimited(reader: any): AIRichResponseCodeBlock;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIRichResponseCodeBlock;
            static toObject(message: AIRichResponseCodeBlock, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum AIRichResponseCodeHighlightType {
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT = 0,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD = 1,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD = 2,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING = 3,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER = 4,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT = 5,
        }
    }
    export interface IAIRichResponseContentItemsMetadata { [key: string]: any }
    export class AIRichResponseContentItemsMetadata implements IAIRichResponseContentItemsMetadata {
        constructor(properties?: IAIRichResponseContentItemsMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseContentItemsMetadata): AIRichResponseContentItemsMetadata;
        static encode(message: IAIRichResponseContentItemsMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseContentItemsMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseContentItemsMetadata;
        static decodeDelimited(reader: any): AIRichResponseContentItemsMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseContentItemsMetadata;
        static toObject(message: AIRichResponseContentItemsMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIRichResponseContentItemsMetadata {
        export interface IAIRichResponseContentItemMetadata { [key: string]: any }
        export class AIRichResponseContentItemMetadata implements IAIRichResponseContentItemMetadata {
            constructor(properties?: IAIRichResponseContentItemMetadata);
            [key: string]: any;
            static create(properties?: IAIRichResponseContentItemMetadata): AIRichResponseContentItemMetadata;
            static encode(message: IAIRichResponseContentItemMetadata, writer?: any): any;
            static encodeDelimited(message: IAIRichResponseContentItemMetadata, writer?: any): any;
            static decode(reader: any, length?: number): AIRichResponseContentItemMetadata;
            static decodeDelimited(reader: any): AIRichResponseContentItemMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIRichResponseContentItemMetadata;
            static toObject(message: AIRichResponseContentItemMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAIRichResponseReelItem { [key: string]: any }
        export class AIRichResponseReelItem implements IAIRichResponseReelItem {
            constructor(properties?: IAIRichResponseReelItem);
            [key: string]: any;
            static create(properties?: IAIRichResponseReelItem): AIRichResponseReelItem;
            static encode(message: IAIRichResponseReelItem, writer?: any): any;
            static encodeDelimited(message: IAIRichResponseReelItem, writer?: any): any;
            static decode(reader: any, length?: number): AIRichResponseReelItem;
            static decodeDelimited(reader: any): AIRichResponseReelItem;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIRichResponseReelItem;
            static toObject(message: AIRichResponseReelItem, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum ContentType {
            DEFAULT = 0,
            CAROUSEL = 1,
        }
    }
    export interface IAIRichResponseDynamicMetadata { [key: string]: any }
    export class AIRichResponseDynamicMetadata implements IAIRichResponseDynamicMetadata {
        constructor(properties?: IAIRichResponseDynamicMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseDynamicMetadata): AIRichResponseDynamicMetadata;
        static encode(message: IAIRichResponseDynamicMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseDynamicMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseDynamicMetadata;
        static decodeDelimited(reader: any): AIRichResponseDynamicMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseDynamicMetadata;
        static toObject(message: AIRichResponseDynamicMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIRichResponseDynamicMetadata {
        export enum AIRichResponseDynamicMetadataType {
            AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_UNKNOWN = 0,
            AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_IMAGE = 1,
            AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF = 2,
        }
    }
    export interface IAIRichResponseGridImageMetadata { [key: string]: any }
    export class AIRichResponseGridImageMetadata implements IAIRichResponseGridImageMetadata {
        constructor(properties?: IAIRichResponseGridImageMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseGridImageMetadata): AIRichResponseGridImageMetadata;
        static encode(message: IAIRichResponseGridImageMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseGridImageMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseGridImageMetadata;
        static decodeDelimited(reader: any): AIRichResponseGridImageMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseGridImageMetadata;
        static toObject(message: AIRichResponseGridImageMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIRichResponseImageURL { [key: string]: any }
    export class AIRichResponseImageURL implements IAIRichResponseImageURL {
        constructor(properties?: IAIRichResponseImageURL);
        [key: string]: any;
        static create(properties?: IAIRichResponseImageURL): AIRichResponseImageURL;
        static encode(message: IAIRichResponseImageURL, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseImageURL, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseImageURL;
        static decodeDelimited(reader: any): AIRichResponseImageURL;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseImageURL;
        static toObject(message: AIRichResponseImageURL, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIRichResponseInlineImageMetadata { [key: string]: any }
    export class AIRichResponseInlineImageMetadata implements IAIRichResponseInlineImageMetadata {
        constructor(properties?: IAIRichResponseInlineImageMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseInlineImageMetadata): AIRichResponseInlineImageMetadata;
        static encode(message: IAIRichResponseInlineImageMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseInlineImageMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseInlineImageMetadata;
        static decodeDelimited(reader: any): AIRichResponseInlineImageMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseInlineImageMetadata;
        static toObject(message: AIRichResponseInlineImageMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIRichResponseInlineImageMetadata {
        export enum AIRichResponseImageAlignment {
            AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED = 0,
            AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED = 1,
            AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED = 2,
        }
    }
    export interface IAIRichResponseLatexMetadata { [key: string]: any }
    export class AIRichResponseLatexMetadata implements IAIRichResponseLatexMetadata {
        constructor(properties?: IAIRichResponseLatexMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseLatexMetadata): AIRichResponseLatexMetadata;
        static encode(message: IAIRichResponseLatexMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseLatexMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseLatexMetadata;
        static decodeDelimited(reader: any): AIRichResponseLatexMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseLatexMetadata;
        static toObject(message: AIRichResponseLatexMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIRichResponseLatexMetadata {
        export interface IAIRichResponseLatexExpression { [key: string]: any }
        export class AIRichResponseLatexExpression implements IAIRichResponseLatexExpression {
            constructor(properties?: IAIRichResponseLatexExpression);
            [key: string]: any;
            static create(properties?: IAIRichResponseLatexExpression): AIRichResponseLatexExpression;
            static encode(message: IAIRichResponseLatexExpression, writer?: any): any;
            static encodeDelimited(message: IAIRichResponseLatexExpression, writer?: any): any;
            static decode(reader: any, length?: number): AIRichResponseLatexExpression;
            static decodeDelimited(reader: any): AIRichResponseLatexExpression;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIRichResponseLatexExpression;
            static toObject(message: AIRichResponseLatexExpression, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IAIRichResponseMapMetadata { [key: string]: any }
    export class AIRichResponseMapMetadata implements IAIRichResponseMapMetadata {
        constructor(properties?: IAIRichResponseMapMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseMapMetadata): AIRichResponseMapMetadata;
        static encode(message: IAIRichResponseMapMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseMapMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseMapMetadata;
        static decodeDelimited(reader: any): AIRichResponseMapMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseMapMetadata;
        static toObject(message: AIRichResponseMapMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIRichResponseMapMetadata {
        export interface IAIRichResponseMapAnnotation { [key: string]: any }
        export class AIRichResponseMapAnnotation implements IAIRichResponseMapAnnotation {
            constructor(properties?: IAIRichResponseMapAnnotation);
            [key: string]: any;
            static create(properties?: IAIRichResponseMapAnnotation): AIRichResponseMapAnnotation;
            static encode(message: IAIRichResponseMapAnnotation, writer?: any): any;
            static encodeDelimited(message: IAIRichResponseMapAnnotation, writer?: any): any;
            static decode(reader: any, length?: number): AIRichResponseMapAnnotation;
            static decodeDelimited(reader: any): AIRichResponseMapAnnotation;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIRichResponseMapAnnotation;
            static toObject(message: AIRichResponseMapAnnotation, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IAIRichResponseMessage { [key: string]: any }
    export class AIRichResponseMessage implements IAIRichResponseMessage {
        constructor(properties?: IAIRichResponseMessage);
        [key: string]: any;
        static create(properties?: IAIRichResponseMessage): AIRichResponseMessage;
        static encode(message: IAIRichResponseMessage, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseMessage, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseMessage;
        static decodeDelimited(reader: any): AIRichResponseMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseMessage;
        static toObject(message: AIRichResponseMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum AIRichResponseMessageType {
        AI_RICH_RESPONSE_TYPE_UNKNOWN = 0,
        AI_RICH_RESPONSE_TYPE_STANDARD = 1,
    }
    export interface IAIRichResponseSubMessage { [key: string]: any }
    export class AIRichResponseSubMessage implements IAIRichResponseSubMessage {
        constructor(properties?: IAIRichResponseSubMessage);
        [key: string]: any;
        static create(properties?: IAIRichResponseSubMessage): AIRichResponseSubMessage;
        static encode(message: IAIRichResponseSubMessage, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseSubMessage, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseSubMessage;
        static decodeDelimited(reader: any): AIRichResponseSubMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseSubMessage;
        static toObject(message: AIRichResponseSubMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum AIRichResponseSubMessageType {
        AI_RICH_RESPONSE_UNKNOWN = 0,
        AI_RICH_RESPONSE_GRID_IMAGE = 1,
        AI_RICH_RESPONSE_TEXT = 2,
        AI_RICH_RESPONSE_INLINE_IMAGE = 3,
        AI_RICH_RESPONSE_TABLE = 4,
        AI_RICH_RESPONSE_CODE = 5,
        AI_RICH_RESPONSE_DYNAMIC = 6,
        AI_RICH_RESPONSE_MAP = 7,
        AI_RICH_RESPONSE_LATEX = 8,
        AI_RICH_RESPONSE_CONTENT_ITEMS = 9,
    }
    export interface IAIRichResponseTableMetadata { [key: string]: any }
    export class AIRichResponseTableMetadata implements IAIRichResponseTableMetadata {
        constructor(properties?: IAIRichResponseTableMetadata);
        [key: string]: any;
        static create(properties?: IAIRichResponseTableMetadata): AIRichResponseTableMetadata;
        static encode(message: IAIRichResponseTableMetadata, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseTableMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseTableMetadata;
        static decodeDelimited(reader: any): AIRichResponseTableMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseTableMetadata;
        static toObject(message: AIRichResponseTableMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIRichResponseTableMetadata {
        export interface IAIRichResponseTableRow { [key: string]: any }
        export class AIRichResponseTableRow implements IAIRichResponseTableRow {
            constructor(properties?: IAIRichResponseTableRow);
            [key: string]: any;
            static create(properties?: IAIRichResponseTableRow): AIRichResponseTableRow;
            static encode(message: IAIRichResponseTableRow, writer?: any): any;
            static encodeDelimited(message: IAIRichResponseTableRow, writer?: any): any;
            static decode(reader: any, length?: number): AIRichResponseTableRow;
            static decodeDelimited(reader: any): AIRichResponseTableRow;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIRichResponseTableRow;
            static toObject(message: AIRichResponseTableRow, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IAIRichResponseUnifiedResponse { [key: string]: any }
    export class AIRichResponseUnifiedResponse implements IAIRichResponseUnifiedResponse {
        constructor(properties?: IAIRichResponseUnifiedResponse);
        [key: string]: any;
        static create(properties?: IAIRichResponseUnifiedResponse): AIRichResponseUnifiedResponse;
        static encode(message: IAIRichResponseUnifiedResponse, writer?: any): any;
        static encodeDelimited(message: IAIRichResponseUnifiedResponse, writer?: any): any;
        static decode(reader: any, length?: number): AIRichResponseUnifiedResponse;
        static decodeDelimited(reader: any): AIRichResponseUnifiedResponse;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIRichResponseUnifiedResponse;
        static toObject(message: AIRichResponseUnifiedResponse, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum AISubscriptionRequestType {
        UNSPECIFIED = 0,
        THINK_HARD = 1,
        IMAGE_GEN = 2,
        VIDEO_GEN = 3,
    }
    export interface IAISubscriptionUpsellMetadata { [key: string]: any }
    export class AISubscriptionUpsellMetadata implements IAISubscriptionUpsellMetadata {
        constructor(properties?: IAISubscriptionUpsellMetadata);
        [key: string]: any;
        static create(properties?: IAISubscriptionUpsellMetadata): AISubscriptionUpsellMetadata;
        static encode(message: IAISubscriptionUpsellMetadata, writer?: any): any;
        static encodeDelimited(message: IAISubscriptionUpsellMetadata, writer?: any): any;
        static decode(reader: any, length?: number): AISubscriptionUpsellMetadata;
        static decodeDelimited(reader: any): AISubscriptionUpsellMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AISubscriptionUpsellMetadata;
        static toObject(message: AISubscriptionUpsellMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAIThreadInfo { [key: string]: any }
    export class AIThreadInfo implements IAIThreadInfo {
        constructor(properties?: IAIThreadInfo);
        [key: string]: any;
        static create(properties?: IAIThreadInfo): AIThreadInfo;
        static encode(message: IAIThreadInfo, writer?: any): any;
        static encodeDelimited(message: IAIThreadInfo, writer?: any): any;
        static decode(reader: any, length?: number): AIThreadInfo;
        static decodeDelimited(reader: any): AIThreadInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AIThreadInfo;
        static toObject(message: AIThreadInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace AIThreadInfo {
        export interface IAIThreadClientInfo { [key: string]: any }
        export class AIThreadClientInfo implements IAIThreadClientInfo {
            constructor(properties?: IAIThreadClientInfo);
            [key: string]: any;
            static create(properties?: IAIThreadClientInfo): AIThreadClientInfo;
            static encode(message: IAIThreadClientInfo, writer?: any): any;
            static encodeDelimited(message: IAIThreadClientInfo, writer?: any): any;
            static decode(reader: any, length?: number): AIThreadClientInfo;
            static decodeDelimited(reader: any): AIThreadClientInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIThreadClientInfo;
            static toObject(message: AIThreadClientInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace AIThreadClientInfo {
            export enum AIThreadType {
                UNKNOWN = 0,
                DEFAULT = 1,
                INCOGNITO = 2,
                SIDE_CHAT = 3,
            }
        }
        export interface IAIThreadServerInfo { [key: string]: any }
        export class AIThreadServerInfo implements IAIThreadServerInfo {
            constructor(properties?: IAIThreadServerInfo);
            [key: string]: any;
            static create(properties?: IAIThreadServerInfo): AIThreadServerInfo;
            static encode(message: IAIThreadServerInfo, writer?: any): any;
            static encodeDelimited(message: IAIThreadServerInfo, writer?: any): any;
            static decode(reader: any, length?: number): AIThreadServerInfo;
            static decodeDelimited(reader: any): AIThreadServerInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AIThreadServerInfo;
            static toObject(message: AIThreadServerInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IAccount { [key: string]: any }
    export class Account implements IAccount {
        constructor(properties?: IAccount);
        [key: string]: any;
        static create(properties?: IAccount): Account;
        static encode(message: IAccount, writer?: any): any;
        static encodeDelimited(message: IAccount, writer?: any): any;
        static decode(reader: any, length?: number): Account;
        static decodeDelimited(reader: any): Account;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Account;
        static toObject(message: Account, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAccountLinkingOpaqueData { [key: string]: any }
    export class AccountLinkingOpaqueData implements IAccountLinkingOpaqueData {
        constructor(properties?: IAccountLinkingOpaqueData);
        [key: string]: any;
        static create(properties?: IAccountLinkingOpaqueData): AccountLinkingOpaqueData;
        static encode(message: IAccountLinkingOpaqueData, writer?: any): any;
        static encodeDelimited(message: IAccountLinkingOpaqueData, writer?: any): any;
        static decode(reader: any, length?: number): AccountLinkingOpaqueData;
        static decodeDelimited(reader: any): AccountLinkingOpaqueData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AccountLinkingOpaqueData;
        static toObject(message: AccountLinkingOpaqueData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IActionLink { [key: string]: any }
    export class ActionLink implements IActionLink {
        constructor(properties?: IActionLink);
        [key: string]: any;
        static create(properties?: IActionLink): ActionLink;
        static encode(message: IActionLink, writer?: any): any;
        static encodeDelimited(message: IActionLink, writer?: any): any;
        static decode(reader: any, length?: number): ActionLink;
        static decodeDelimited(reader: any): ActionLink;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ActionLink;
        static toObject(message: ActionLink, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAutoDownloadSettings { [key: string]: any }
    export class AutoDownloadSettings implements IAutoDownloadSettings {
        constructor(properties?: IAutoDownloadSettings);
        [key: string]: any;
        static create(properties?: IAutoDownloadSettings): AutoDownloadSettings;
        static encode(message: IAutoDownloadSettings, writer?: any): any;
        static encodeDelimited(message: IAutoDownloadSettings, writer?: any): any;
        static decode(reader: any, length?: number): AutoDownloadSettings;
        static decodeDelimited(reader: any): AutoDownloadSettings;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AutoDownloadSettings;
        static toObject(message: AutoDownloadSettings, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IAvatarUserSettings { [key: string]: any }
    export class AvatarUserSettings implements IAvatarUserSettings {
        constructor(properties?: IAvatarUserSettings);
        [key: string]: any;
        static create(properties?: IAvatarUserSettings): AvatarUserSettings;
        static encode(message: IAvatarUserSettings, writer?: any): any;
        static encodeDelimited(message: IAvatarUserSettings, writer?: any): any;
        static decode(reader: any, length?: number): AvatarUserSettings;
        static decodeDelimited(reader: any): AvatarUserSettings;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): AvatarUserSettings;
        static toObject(message: AvatarUserSettings, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBackwardEdge { [key: string]: any }
    export class BackwardEdge implements IBackwardEdge {
        constructor(properties?: IBackwardEdge);
        [key: string]: any;
        static create(properties?: IBackwardEdge): BackwardEdge;
        static encode(message: IBackwardEdge, writer?: any): any;
        static encodeDelimited(message: IBackwardEdge, writer?: any): any;
        static decode(reader: any, length?: number): BackwardEdge;
        static decodeDelimited(reader: any): BackwardEdge;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BackwardEdge;
        static toObject(message: BackwardEdge, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBizAccountLinkInfo { [key: string]: any }
    export class BizAccountLinkInfo implements IBizAccountLinkInfo {
        constructor(properties?: IBizAccountLinkInfo);
        [key: string]: any;
        static create(properties?: IBizAccountLinkInfo): BizAccountLinkInfo;
        static encode(message: IBizAccountLinkInfo, writer?: any): any;
        static encodeDelimited(message: IBizAccountLinkInfo, writer?: any): any;
        static decode(reader: any, length?: number): BizAccountLinkInfo;
        static decodeDelimited(reader: any): BizAccountLinkInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BizAccountLinkInfo;
        static toObject(message: BizAccountLinkInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BizAccountLinkInfo {
        export enum AccountType {
            ENTERPRISE = 0,
        }
        export enum HostStorageType {
            ON_PREMISE = 0,
            FACEBOOK = 1,
        }
    }
    export interface IBizAccountPayload { [key: string]: any }
    export class BizAccountPayload implements IBizAccountPayload {
        constructor(properties?: IBizAccountPayload);
        [key: string]: any;
        static create(properties?: IBizAccountPayload): BizAccountPayload;
        static encode(message: IBizAccountPayload, writer?: any): any;
        static encodeDelimited(message: IBizAccountPayload, writer?: any): any;
        static decode(reader: any, length?: number): BizAccountPayload;
        static decodeDelimited(reader: any): BizAccountPayload;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BizAccountPayload;
        static toObject(message: BizAccountPayload, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBizIdentityInfo { [key: string]: any }
    export class BizIdentityInfo implements IBizIdentityInfo {
        constructor(properties?: IBizIdentityInfo);
        [key: string]: any;
        static create(properties?: IBizIdentityInfo): BizIdentityInfo;
        static encode(message: IBizIdentityInfo, writer?: any): any;
        static encodeDelimited(message: IBizIdentityInfo, writer?: any): any;
        static decode(reader: any, length?: number): BizIdentityInfo;
        static decodeDelimited(reader: any): BizIdentityInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BizIdentityInfo;
        static toObject(message: BizIdentityInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BizIdentityInfo {
        export enum ActualActorsType {
            SELF = 0,
            BSP = 1,
        }
        export enum HostStorageType {
            ON_PREMISE = 0,
            FACEBOOK = 1,
        }
        export enum VerifiedLevelValue {
            UNKNOWN = 0,
            LOW = 1,
            HIGH = 2,
        }
    }
    export interface IBotAgeCollectionMetadata { [key: string]: any }
    export class BotAgeCollectionMetadata implements IBotAgeCollectionMetadata {
        constructor(properties?: IBotAgeCollectionMetadata);
        [key: string]: any;
        static create(properties?: IBotAgeCollectionMetadata): BotAgeCollectionMetadata;
        static encode(message: IBotAgeCollectionMetadata, writer?: any): any;
        static encodeDelimited(message: IBotAgeCollectionMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotAgeCollectionMetadata;
        static decodeDelimited(reader: any): BotAgeCollectionMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotAgeCollectionMetadata;
        static toObject(message: BotAgeCollectionMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotAgeCollectionMetadata {
        export enum AgeCollectionType {
            O18_BINARY = 0,
            WAFFLE = 1,
        }
    }
    export interface IBotAgentDeepLinkMetadata { [key: string]: any }
    export class BotAgentDeepLinkMetadata implements IBotAgentDeepLinkMetadata {
        constructor(properties?: IBotAgentDeepLinkMetadata);
        [key: string]: any;
        static create(properties?: IBotAgentDeepLinkMetadata): BotAgentDeepLinkMetadata;
        static encode(message: IBotAgentDeepLinkMetadata, writer?: any): any;
        static encodeDelimited(message: IBotAgentDeepLinkMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotAgentDeepLinkMetadata;
        static decodeDelimited(reader: any): BotAgentDeepLinkMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotAgentDeepLinkMetadata;
        static toObject(message: BotAgentDeepLinkMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotAgentMetadata { [key: string]: any }
    export class BotAgentMetadata implements IBotAgentMetadata {
        constructor(properties?: IBotAgentMetadata);
        [key: string]: any;
        static create(properties?: IBotAgentMetadata): BotAgentMetadata;
        static encode(message: IBotAgentMetadata, writer?: any): any;
        static encodeDelimited(message: IBotAgentMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotAgentMetadata;
        static decodeDelimited(reader: any): BotAgentMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotAgentMetadata;
        static toObject(message: BotAgentMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotCapabilityMetadata { [key: string]: any }
    export class BotCapabilityMetadata implements IBotCapabilityMetadata {
        constructor(properties?: IBotCapabilityMetadata);
        [key: string]: any;
        static create(properties?: IBotCapabilityMetadata): BotCapabilityMetadata;
        static encode(message: IBotCapabilityMetadata, writer?: any): any;
        static encodeDelimited(message: IBotCapabilityMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotCapabilityMetadata;
        static decodeDelimited(reader: any): BotCapabilityMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotCapabilityMetadata;
        static toObject(message: BotCapabilityMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotCapabilityMetadata {
        export enum BotCapabilityType {
            UNKNOWN = 0,
            PROGRESS_INDICATOR = 1,
            RICH_RESPONSE_HEADING = 2,
            RICH_RESPONSE_NESTED_LIST = 3,
            AI_MEMORY = 4,
            RICH_RESPONSE_THREAD_SURFING = 5,
            RICH_RESPONSE_TABLE = 6,
            RICH_RESPONSE_CODE = 7,
            RICH_RESPONSE_STRUCTURED_RESPONSE = 8,
            RICH_RESPONSE_INLINE_IMAGE = 9,
            WA_IG_1P_PLUGIN_RANKING_CONTROL = 10,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_1 = 11,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_2 = 12,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_3 = 13,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_4 = 14,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_5 = 15,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_6 = 16,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_7 = 17,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_8 = 18,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_9 = 19,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_10 = 20,
            RICH_RESPONSE_SUB_HEADING = 21,
            RICH_RESPONSE_GRID_IMAGE = 22,
            AI_STUDIO_UGC_MEMORY = 23,
            RICH_RESPONSE_LATEX = 24,
            RICH_RESPONSE_MAPS = 25,
            RICH_RESPONSE_INLINE_REELS = 26,
            AGENTIC_PLANNING = 27,
            ACCOUNT_LINKING = 28,
            STREAMING_DISAGGREGATION = 29,
            RICH_RESPONSE_GRID_IMAGE_3P = 30,
            RICH_RESPONSE_LATEX_INLINE = 31,
            QUERY_PLAN = 32,
            PROACTIVE_MESSAGE = 33,
            RICH_RESPONSE_UNIFIED_RESPONSE = 34,
            PROMOTION_MESSAGE = 35,
            SIMPLIFIED_PROFILE_PAGE = 36,
            RICH_RESPONSE_SOURCES_IN_MESSAGE = 37,
            RICH_RESPONSE_SIDE_BY_SIDE_SURVEY = 38,
            RICH_RESPONSE_UNIFIED_TEXT_COMPONENT = 39,
            AI_SHARED_MEMORY = 40,
            RICH_RESPONSE_UNIFIED_SOURCES = 41,
            RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS = 42,
            RICH_RESPONSE_UR_INLINE_REELS_ENABLED = 43,
            RICH_RESPONSE_UR_MEDIA_GRID_ENABLED = 44,
            RICH_RESPONSE_UR_TIMESTAMP_PLACEHOLDER = 45,
            RICH_RESPONSE_IN_APP_SURVEY = 46,
            AI_RESPONSE_MODEL_BRANDING = 47,
            SESSION_TRANSPARENCY_SYSTEM_MESSAGE = 48,
            RICH_RESPONSE_UR_REASONING = 49,
            RICH_RESPONSE_UR_ZEITGEIST_CITATIONS = 50,
            RICH_RESPONSE_UR_ZEITGEIST_CAROUSEL = 51,
            AI_IMAGINE_LOADING_INDICATOR = 52,
            RICH_RESPONSE_UR_IMAGINE = 53,
            AI_IMAGINE_UR_TO_NATIVE_LOADING_INDICATOR = 54,
            RICH_RESPONSE_UR_BLOKS_ENABLED = 55,
            RICH_RESPONSE_INLINE_LINKS_ENABLED = 56,
            RICH_RESPONSE_UR_IMAGINE_VIDEO = 57,
            JSON_PATCH_STREAMING = 58,
            AI_TAB_FORCE_CLIPPY = 59,
            UNIFIED_RESPONSE_EMBEDDED_SCREENS = 60,
            AI_SUBSCRIPTION_ENABLED = 61,
            UNIFIED_RESPONSE_AI_CONTENT_SEARCH_ENABLED = 62,
            UNIFIED_RESPONSE_MARKDOWN_LINKS_ENABLED = 63,
            AI_RICH_RESPONSE_MAPS_V2_ENABLED = 64,
            AI_SUBSCRIPTION_METERING_ENABLED = 65,
            RICH_RESPONSE_SPORTS_WIDGET_ENABLED = 66,
            AI_RICH_RESPONSE_ARTIFACTS_ENABLED = 67,
            AI_RICH_RESPONSE_EMAIL_CALENDAR_ENABLED = 68,
            AI_RICH_RESPONSE_REMINDERS_ENABLED = 69,
        }
    }
    export interface IBotCommandMetadata { [key: string]: any }
    export class BotCommandMetadata implements IBotCommandMetadata {
        constructor(properties?: IBotCommandMetadata);
        [key: string]: any;
        static create(properties?: IBotCommandMetadata): BotCommandMetadata;
        static encode(message: IBotCommandMetadata, writer?: any): any;
        static encodeDelimited(message: IBotCommandMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotCommandMetadata;
        static decodeDelimited(reader: any): BotCommandMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotCommandMetadata;
        static toObject(message: BotCommandMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotDocumentMessageMetadata { [key: string]: any }
    export class BotDocumentMessageMetadata implements IBotDocumentMessageMetadata {
        constructor(properties?: IBotDocumentMessageMetadata);
        [key: string]: any;
        static create(properties?: IBotDocumentMessageMetadata): BotDocumentMessageMetadata;
        static encode(message: IBotDocumentMessageMetadata, writer?: any): any;
        static encodeDelimited(message: IBotDocumentMessageMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotDocumentMessageMetadata;
        static decodeDelimited(reader: any): BotDocumentMessageMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotDocumentMessageMetadata;
        static toObject(message: BotDocumentMessageMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotDocumentMessageMetadata {
        export enum DocumentPluginType {
            TEXT_EXTRACTION = 0,
            OCR_AND_IMAGES = 1,
        }
    }
    export interface IBotFeedbackMessage { [key: string]: any }
    export class BotFeedbackMessage implements IBotFeedbackMessage {
        constructor(properties?: IBotFeedbackMessage);
        [key: string]: any;
        static create(properties?: IBotFeedbackMessage): BotFeedbackMessage;
        static encode(message: IBotFeedbackMessage, writer?: any): any;
        static encodeDelimited(message: IBotFeedbackMessage, writer?: any): any;
        static decode(reader: any, length?: number): BotFeedbackMessage;
        static decodeDelimited(reader: any): BotFeedbackMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotFeedbackMessage;
        static toObject(message: BotFeedbackMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotFeedbackMessage {
        export enum BotFeedbackKind {
            BOT_FEEDBACK_POSITIVE = 0,
            BOT_FEEDBACK_NEGATIVE_GENERIC = 1,
            BOT_FEEDBACK_NEGATIVE_HELPFUL = 2,
            BOT_FEEDBACK_NEGATIVE_INTERESTING = 3,
            BOT_FEEDBACK_NEGATIVE_ACCURATE = 4,
            BOT_FEEDBACK_NEGATIVE_SAFE = 5,
            BOT_FEEDBACK_NEGATIVE_OTHER = 6,
            BOT_FEEDBACK_NEGATIVE_REFUSED = 7,
            BOT_FEEDBACK_NEGATIVE_NOT_VISUALLY_APPEALING = 8,
            BOT_FEEDBACK_NEGATIVE_NOT_RELEVANT_TO_TEXT = 9,
            BOT_FEEDBACK_NEGATIVE_PERSONALIZED = 10,
            BOT_FEEDBACK_NEGATIVE_CLARITY = 11,
            BOT_FEEDBACK_NEGATIVE_DOESNT_LOOK_LIKE_THE_PERSON = 12,
            BOT_FEEDBACK_NEGATIVE_HALLUCINATION_INTERNAL_ONLY = 13,
            BOT_FEEDBACK_NEGATIVE = 14,
        }
        export enum BotFeedbackKindMultipleNegative {
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_GENERIC = 1,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_HELPFUL = 2,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_INTERESTING = 4,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_ACCURATE = 8,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_SAFE = 16,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_OTHER = 32,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_REFUSED = 64,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_VISUALLY_APPEALING = 128,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_RELEVANT_TO_TEXT = 256,
        }
        export enum BotFeedbackKindMultiplePositive {
            BOT_FEEDBACK_MULTIPLE_POSITIVE_GENERIC = 1,
        }
        export enum ReportKind {
            NONE = 0,
            GENERIC = 1,
        }
        export interface ISideBySideSurveyMetadata { [key: string]: any }
        export class SideBySideSurveyMetadata implements ISideBySideSurveyMetadata {
            constructor(properties?: ISideBySideSurveyMetadata);
            [key: string]: any;
            static create(properties?: ISideBySideSurveyMetadata): SideBySideSurveyMetadata;
            static encode(message: ISideBySideSurveyMetadata, writer?: any): any;
            static encodeDelimited(message: ISideBySideSurveyMetadata, writer?: any): any;
            static decode(reader: any, length?: number): SideBySideSurveyMetadata;
            static decodeDelimited(reader: any): SideBySideSurveyMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SideBySideSurveyMetadata;
            static toObject(message: SideBySideSurveyMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace SideBySideSurveyMetadata {
            export interface ISideBySideSurveyAnalyticsData { [key: string]: any }
            export class SideBySideSurveyAnalyticsData implements ISideBySideSurveyAnalyticsData {
                constructor(properties?: ISideBySideSurveyAnalyticsData);
                [key: string]: any;
                static create(properties?: ISideBySideSurveyAnalyticsData): SideBySideSurveyAnalyticsData;
                static encode(message: ISideBySideSurveyAnalyticsData, writer?: any): any;
                static encodeDelimited(message: ISideBySideSurveyAnalyticsData, writer?: any): any;
                static decode(reader: any, length?: number): SideBySideSurveyAnalyticsData;
                static decodeDelimited(reader: any): SideBySideSurveyAnalyticsData;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): SideBySideSurveyAnalyticsData;
                static toObject(message: SideBySideSurveyAnalyticsData, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface ISidebySideSurveyMetaAiAnalyticsData { [key: string]: any }
            export class SidebySideSurveyMetaAiAnalyticsData implements ISidebySideSurveyMetaAiAnalyticsData {
                constructor(properties?: ISidebySideSurveyMetaAiAnalyticsData);
                [key: string]: any;
                static create(properties?: ISidebySideSurveyMetaAiAnalyticsData): SidebySideSurveyMetaAiAnalyticsData;
                static encode(message: ISidebySideSurveyMetaAiAnalyticsData, writer?: any): any;
                static encodeDelimited(message: ISidebySideSurveyMetaAiAnalyticsData, writer?: any): any;
                static decode(reader: any, length?: number): SidebySideSurveyMetaAiAnalyticsData;
                static decodeDelimited(reader: any): SidebySideSurveyMetaAiAnalyticsData;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): SidebySideSurveyMetaAiAnalyticsData;
                static toObject(message: SidebySideSurveyMetaAiAnalyticsData, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace SidebySideSurveyMetaAiAnalyticsData {
                export interface ISideBySideSurveyAbandonEventData { [key: string]: any }
                export class SideBySideSurveyAbandonEventData implements ISideBySideSurveyAbandonEventData {
                    constructor(properties?: ISideBySideSurveyAbandonEventData);
                    [key: string]: any;
                    static create(properties?: ISideBySideSurveyAbandonEventData): SideBySideSurveyAbandonEventData;
                    static encode(message: ISideBySideSurveyAbandonEventData, writer?: any): any;
                    static encodeDelimited(message: ISideBySideSurveyAbandonEventData, writer?: any): any;
                    static decode(reader: any, length?: number): SideBySideSurveyAbandonEventData;
                    static decodeDelimited(reader: any): SideBySideSurveyAbandonEventData;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): SideBySideSurveyAbandonEventData;
                    static toObject(message: SideBySideSurveyAbandonEventData, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface ISideBySideSurveyCTAClickEventData { [key: string]: any }
                export class SideBySideSurveyCTAClickEventData implements ISideBySideSurveyCTAClickEventData {
                    constructor(properties?: ISideBySideSurveyCTAClickEventData);
                    [key: string]: any;
                    static create(properties?: ISideBySideSurveyCTAClickEventData): SideBySideSurveyCTAClickEventData;
                    static encode(message: ISideBySideSurveyCTAClickEventData, writer?: any): any;
                    static encodeDelimited(message: ISideBySideSurveyCTAClickEventData, writer?: any): any;
                    static decode(reader: any, length?: number): SideBySideSurveyCTAClickEventData;
                    static decodeDelimited(reader: any): SideBySideSurveyCTAClickEventData;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): SideBySideSurveyCTAClickEventData;
                    static toObject(message: SideBySideSurveyCTAClickEventData, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface ISideBySideSurveyCTAImpressionEventData { [key: string]: any }
                export class SideBySideSurveyCTAImpressionEventData implements ISideBySideSurveyCTAImpressionEventData {
                    constructor(properties?: ISideBySideSurveyCTAImpressionEventData);
                    [key: string]: any;
                    static create(properties?: ISideBySideSurveyCTAImpressionEventData): SideBySideSurveyCTAImpressionEventData;
                    static encode(message: ISideBySideSurveyCTAImpressionEventData, writer?: any): any;
                    static encodeDelimited(message: ISideBySideSurveyCTAImpressionEventData, writer?: any): any;
                    static decode(reader: any, length?: number): SideBySideSurveyCTAImpressionEventData;
                    static decodeDelimited(reader: any): SideBySideSurveyCTAImpressionEventData;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): SideBySideSurveyCTAImpressionEventData;
                    static toObject(message: SideBySideSurveyCTAImpressionEventData, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface ISideBySideSurveyCardImpressionEventData { [key: string]: any }
                export class SideBySideSurveyCardImpressionEventData implements ISideBySideSurveyCardImpressionEventData {
                    constructor(properties?: ISideBySideSurveyCardImpressionEventData);
                    [key: string]: any;
                    static create(properties?: ISideBySideSurveyCardImpressionEventData): SideBySideSurveyCardImpressionEventData;
                    static encode(message: ISideBySideSurveyCardImpressionEventData, writer?: any): any;
                    static encodeDelimited(message: ISideBySideSurveyCardImpressionEventData, writer?: any): any;
                    static decode(reader: any, length?: number): SideBySideSurveyCardImpressionEventData;
                    static decodeDelimited(reader: any): SideBySideSurveyCardImpressionEventData;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): SideBySideSurveyCardImpressionEventData;
                    static toObject(message: SideBySideSurveyCardImpressionEventData, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface ISideBySideSurveyResponseEventData { [key: string]: any }
                export class SideBySideSurveyResponseEventData implements ISideBySideSurveyResponseEventData {
                    constructor(properties?: ISideBySideSurveyResponseEventData);
                    [key: string]: any;
                    static create(properties?: ISideBySideSurveyResponseEventData): SideBySideSurveyResponseEventData;
                    static encode(message: ISideBySideSurveyResponseEventData, writer?: any): any;
                    static encodeDelimited(message: ISideBySideSurveyResponseEventData, writer?: any): any;
                    static decode(reader: any, length?: number): SideBySideSurveyResponseEventData;
                    static decodeDelimited(reader: any): SideBySideSurveyResponseEventData;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): SideBySideSurveyResponseEventData;
                    static toObject(message: SideBySideSurveyResponseEventData, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
            }
        }
    }
    export interface IBotGroupMetadata { [key: string]: any }
    export class BotGroupMetadata implements IBotGroupMetadata {
        constructor(properties?: IBotGroupMetadata);
        [key: string]: any;
        static create(properties?: IBotGroupMetadata): BotGroupMetadata;
        static encode(message: IBotGroupMetadata, writer?: any): any;
        static encodeDelimited(message: IBotGroupMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotGroupMetadata;
        static decodeDelimited(reader: any): BotGroupMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotGroupMetadata;
        static toObject(message: BotGroupMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotGroupParticipantMetadata { [key: string]: any }
    export class BotGroupParticipantMetadata implements IBotGroupParticipantMetadata {
        constructor(properties?: IBotGroupParticipantMetadata);
        [key: string]: any;
        static create(properties?: IBotGroupParticipantMetadata): BotGroupParticipantMetadata;
        static encode(message: IBotGroupParticipantMetadata, writer?: any): any;
        static encodeDelimited(message: IBotGroupParticipantMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotGroupParticipantMetadata;
        static decodeDelimited(reader: any): BotGroupParticipantMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotGroupParticipantMetadata;
        static toObject(message: BotGroupParticipantMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotHistoryShareMetadata { [key: string]: any }
    export class BotHistoryShareMetadata implements IBotHistoryShareMetadata {
        constructor(properties?: IBotHistoryShareMetadata);
        [key: string]: any;
        static create(properties?: IBotHistoryShareMetadata): BotHistoryShareMetadata;
        static encode(message: IBotHistoryShareMetadata, writer?: any): any;
        static encodeDelimited(message: IBotHistoryShareMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotHistoryShareMetadata;
        static decodeDelimited(reader: any): BotHistoryShareMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotHistoryShareMetadata;
        static toObject(message: BotHistoryShareMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotImagineMetadata { [key: string]: any }
    export class BotImagineMetadata implements IBotImagineMetadata {
        constructor(properties?: IBotImagineMetadata);
        [key: string]: any;
        static create(properties?: IBotImagineMetadata): BotImagineMetadata;
        static encode(message: IBotImagineMetadata, writer?: any): any;
        static encodeDelimited(message: IBotImagineMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotImagineMetadata;
        static decodeDelimited(reader: any): BotImagineMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotImagineMetadata;
        static toObject(message: BotImagineMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotImagineMetadata {
        export enum ImagineType {
            UNKNOWN = 0,
            IMAGINE = 1,
            MEMU = 2,
            FLASH = 3,
            EDIT = 4,
        }
    }
    export interface IBotInfrastructureDiagnostics { [key: string]: any }
    export class BotInfrastructureDiagnostics implements IBotInfrastructureDiagnostics {
        constructor(properties?: IBotInfrastructureDiagnostics);
        [key: string]: any;
        static create(properties?: IBotInfrastructureDiagnostics): BotInfrastructureDiagnostics;
        static encode(message: IBotInfrastructureDiagnostics, writer?: any): any;
        static encodeDelimited(message: IBotInfrastructureDiagnostics, writer?: any): any;
        static decode(reader: any, length?: number): BotInfrastructureDiagnostics;
        static decodeDelimited(reader: any): BotInfrastructureDiagnostics;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotInfrastructureDiagnostics;
        static toObject(message: BotInfrastructureDiagnostics, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotInfrastructureDiagnostics {
        export enum BotBackend {
            AAPI = 0,
            CLIPPY = 1,
        }
    }
    export interface IBotLinkedAccount { [key: string]: any }
    export class BotLinkedAccount implements IBotLinkedAccount {
        constructor(properties?: IBotLinkedAccount);
        [key: string]: any;
        static create(properties?: IBotLinkedAccount): BotLinkedAccount;
        static encode(message: IBotLinkedAccount, writer?: any): any;
        static encodeDelimited(message: IBotLinkedAccount, writer?: any): any;
        static decode(reader: any, length?: number): BotLinkedAccount;
        static decodeDelimited(reader: any): BotLinkedAccount;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotLinkedAccount;
        static toObject(message: BotLinkedAccount, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotLinkedAccount {
        export enum BotLinkedAccountType {
            BOT_LINKED_ACCOUNT_TYPE_1P = 0,
        }
    }
    export interface IBotLinkedAccountsMetadata { [key: string]: any }
    export class BotLinkedAccountsMetadata implements IBotLinkedAccountsMetadata {
        constructor(properties?: IBotLinkedAccountsMetadata);
        [key: string]: any;
        static create(properties?: IBotLinkedAccountsMetadata): BotLinkedAccountsMetadata;
        static encode(message: IBotLinkedAccountsMetadata, writer?: any): any;
        static encodeDelimited(message: IBotLinkedAccountsMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotLinkedAccountsMetadata;
        static decodeDelimited(reader: any): BotLinkedAccountsMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotLinkedAccountsMetadata;
        static toObject(message: BotLinkedAccountsMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotMediaMetadata { [key: string]: any }
    export class BotMediaMetadata implements IBotMediaMetadata {
        constructor(properties?: IBotMediaMetadata);
        [key: string]: any;
        static create(properties?: IBotMediaMetadata): BotMediaMetadata;
        static encode(message: IBotMediaMetadata, writer?: any): any;
        static encodeDelimited(message: IBotMediaMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotMediaMetadata;
        static decodeDelimited(reader: any): BotMediaMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMediaMetadata;
        static toObject(message: BotMediaMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotMediaMetadata {
        export enum OrientationType {
            CENTER = 1,
            LEFT = 2,
            RIGHT = 3,
        }
    }
    export interface IBotMemoryFact { [key: string]: any }
    export class BotMemoryFact implements IBotMemoryFact {
        constructor(properties?: IBotMemoryFact);
        [key: string]: any;
        static create(properties?: IBotMemoryFact): BotMemoryFact;
        static encode(message: IBotMemoryFact, writer?: any): any;
        static encodeDelimited(message: IBotMemoryFact, writer?: any): any;
        static decode(reader: any, length?: number): BotMemoryFact;
        static decodeDelimited(reader: any): BotMemoryFact;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMemoryFact;
        static toObject(message: BotMemoryFact, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotMemoryMetadata { [key: string]: any }
    export class BotMemoryMetadata implements IBotMemoryMetadata {
        constructor(properties?: IBotMemoryMetadata);
        [key: string]: any;
        static create(properties?: IBotMemoryMetadata): BotMemoryMetadata;
        static encode(message: IBotMemoryMetadata, writer?: any): any;
        static encodeDelimited(message: IBotMemoryMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotMemoryMetadata;
        static decodeDelimited(reader: any): BotMemoryMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMemoryMetadata;
        static toObject(message: BotMemoryMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotMemuMetadata { [key: string]: any }
    export class BotMemuMetadata implements IBotMemuMetadata {
        constructor(properties?: IBotMemuMetadata);
        [key: string]: any;
        static create(properties?: IBotMemuMetadata): BotMemuMetadata;
        static encode(message: IBotMemuMetadata, writer?: any): any;
        static encodeDelimited(message: IBotMemuMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotMemuMetadata;
        static decodeDelimited(reader: any): BotMemuMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMemuMetadata;
        static toObject(message: BotMemuMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotMessageOrigin { [key: string]: any }
    export class BotMessageOrigin implements IBotMessageOrigin {
        constructor(properties?: IBotMessageOrigin);
        [key: string]: any;
        static create(properties?: IBotMessageOrigin): BotMessageOrigin;
        static encode(message: IBotMessageOrigin, writer?: any): any;
        static encodeDelimited(message: IBotMessageOrigin, writer?: any): any;
        static decode(reader: any, length?: number): BotMessageOrigin;
        static decodeDelimited(reader: any): BotMessageOrigin;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMessageOrigin;
        static toObject(message: BotMessageOrigin, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotMessageOrigin {
        export enum BotMessageOriginType {
            BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED = 0,
        }
    }
    export interface IBotMessageOriginMetadata { [key: string]: any }
    export class BotMessageOriginMetadata implements IBotMessageOriginMetadata {
        constructor(properties?: IBotMessageOriginMetadata);
        [key: string]: any;
        static create(properties?: IBotMessageOriginMetadata): BotMessageOriginMetadata;
        static encode(message: IBotMessageOriginMetadata, writer?: any): any;
        static encodeDelimited(message: IBotMessageOriginMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotMessageOriginMetadata;
        static decodeDelimited(reader: any): BotMessageOriginMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMessageOriginMetadata;
        static toObject(message: BotMessageOriginMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotMessageSharingInfo { [key: string]: any }
    export class BotMessageSharingInfo implements IBotMessageSharingInfo {
        constructor(properties?: IBotMessageSharingInfo);
        [key: string]: any;
        static create(properties?: IBotMessageSharingInfo): BotMessageSharingInfo;
        static encode(message: IBotMessageSharingInfo, writer?: any): any;
        static encodeDelimited(message: IBotMessageSharingInfo, writer?: any): any;
        static decode(reader: any, length?: number): BotMessageSharingInfo;
        static decodeDelimited(reader: any): BotMessageSharingInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMessageSharingInfo;
        static toObject(message: BotMessageSharingInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotMetadata { [key: string]: any }
    export class BotMetadata implements IBotMetadata {
        constructor(properties?: IBotMetadata);
        [key: string]: any;
        static create(properties?: IBotMetadata): BotMetadata;
        static encode(message: IBotMetadata, writer?: any): any;
        static encodeDelimited(message: IBotMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotMetadata;
        static decodeDelimited(reader: any): BotMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMetadata;
        static toObject(message: BotMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum BotMetricsEntryPoint {
        UNDEFINED_ENTRY_POINT = 0,
        FAVICON = 1,
        CHATLIST = 2,
        AISEARCH_NULL_STATE_PAPER_PLANE = 3,
        AISEARCH_NULL_STATE_SUGGESTION = 4,
        AISEARCH_TYPE_AHEAD_SUGGESTION = 5,
        AISEARCH_TYPE_AHEAD_PAPER_PLANE = 6,
        AISEARCH_TYPE_AHEAD_RESULT_CHATLIST = 7,
        AISEARCH_TYPE_AHEAD_RESULT_MESSAGES = 8,
        AIVOICE_SEARCH_BAR = 9,
        AIVOICE_FAVICON = 10,
        AISTUDIO = 11,
        DEEPLINK = 12,
        NOTIFICATION = 13,
        PROFILE_MESSAGE_BUTTON = 14,
        FORWARD = 15,
        APP_SHORTCUT = 16,
        FF_FAMILY = 17,
        AI_TAB = 18,
        AI_HOME = 19,
        AI_DEEPLINK_IMMERSIVE = 20,
        AI_DEEPLINK = 21,
        META_AI_CHAT_SHORTCUT_AI_STUDIO = 22,
        UGC_CHAT_SHORTCUT_AI_STUDIO = 23,
        NEW_CHAT_AI_STUDIO = 24,
        AIVOICE_FAVICON_CALL_HISTORY = 25,
        ASK_META_AI_CONTEXT_MENU = 26,
        ASK_META_AI_CONTEXT_MENU_1ON1 = 27,
        ASK_META_AI_CONTEXT_MENU_GROUP = 28,
        INVOKE_META_AI_1ON1 = 29,
        INVOKE_META_AI_GROUP = 30,
        META_AI_FORWARD = 31,
        NEW_CHAT_AI_CONTACT = 32,
        MESSAGE_QUICK_ACTION_1_ON_1_CHAT = 33,
        MESSAGE_QUICK_ACTION_GROUP_CHAT = 34,
        ATTACHMENT_TRAY_1_ON_1_CHAT = 35,
        ATTACHMENT_TRAY_GROUP_CHAT = 36,
        ASK_META_AI_MEDIA_VIEWER_1ON1 = 37,
        ASK_META_AI_MEDIA_VIEWER_GROUP = 38,
        MEDIA_PICKER_1_ON_1_CHAT = 39,
        MEDIA_PICKER_GROUP_CHAT = 40,
        ASK_META_AI_NO_SEARCH_RESULTS = 41,
        META_AI_SETTINGS = 45,
        WEB_INTRO_PANEL = 46,
        WEB_NAVIGATION_BAR = 47,
        GROUP_MEMBER = 54,
        CHATLIST_SEARCH = 55,
        NEW_CHAT_LIST = 56,
        CONTACTS_TAB = 57,
    }
    export interface IBotMetricsMetadata { [key: string]: any }
    export class BotMetricsMetadata implements IBotMetricsMetadata {
        constructor(properties?: IBotMetricsMetadata);
        [key: string]: any;
        static create(properties?: IBotMetricsMetadata): BotMetricsMetadata;
        static encode(message: IBotMetricsMetadata, writer?: any): any;
        static encodeDelimited(message: IBotMetricsMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotMetricsMetadata;
        static decodeDelimited(reader: any): BotMetricsMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotMetricsMetadata;
        static toObject(message: BotMetricsMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum BotMetricsThreadEntryPoint {
        AI_TAB_THREAD = 1,
        AI_HOME_THREAD = 2,
        AI_DEEPLINK_IMMERSIVE_THREAD = 3,
        AI_DEEPLINK_THREAD = 4,
        ASK_META_AI_CONTEXT_MENU_THREAD = 5,
    }
    export interface IBotModeSelectionMetadata { [key: string]: any }
    export class BotModeSelectionMetadata implements IBotModeSelectionMetadata {
        constructor(properties?: IBotModeSelectionMetadata);
        [key: string]: any;
        static create(properties?: IBotModeSelectionMetadata): BotModeSelectionMetadata;
        static encode(message: IBotModeSelectionMetadata, writer?: any): any;
        static encodeDelimited(message: IBotModeSelectionMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotModeSelectionMetadata;
        static decodeDelimited(reader: any): BotModeSelectionMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotModeSelectionMetadata;
        static toObject(message: BotModeSelectionMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotModeSelectionMetadata {
        export enum BotUserSelectionMode {
            DEFAULT_MODE = 0,
            THINK_HARD_MODE = 1,
        }
    }
    export interface IBotModelMetadata { [key: string]: any }
    export class BotModelMetadata implements IBotModelMetadata {
        constructor(properties?: IBotModelMetadata);
        [key: string]: any;
        static create(properties?: IBotModelMetadata): BotModelMetadata;
        static encode(message: IBotModelMetadata, writer?: any): any;
        static encodeDelimited(message: IBotModelMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotModelMetadata;
        static decodeDelimited(reader: any): BotModelMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotModelMetadata;
        static toObject(message: BotModelMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotModelMetadata {
        export enum ModelType {
            UNKNOWN_TYPE = 0,
            LLAMA_PROD = 1,
            LLAMA_PROD_PREMIUM = 2,
        }
        export enum PremiumModelStatus {
            UNKNOWN_STATUS = 0,
            AVAILABLE = 1,
            QUOTA_EXCEED_LIMIT = 2,
        }
    }
    export interface IBotPluginMetadata { [key: string]: any }
    export class BotPluginMetadata implements IBotPluginMetadata {
        constructor(properties?: IBotPluginMetadata);
        [key: string]: any;
        static create(properties?: IBotPluginMetadata): BotPluginMetadata;
        static encode(message: IBotPluginMetadata, writer?: any): any;
        static encodeDelimited(message: IBotPluginMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotPluginMetadata;
        static decodeDelimited(reader: any): BotPluginMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotPluginMetadata;
        static toObject(message: BotPluginMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotPluginMetadata {
        export enum PluginType {
            UNKNOWN_PLUGIN = 0,
            REELS = 1,
            SEARCH = 2,
        }
        export enum SearchProvider {
            UNKNOWN = 0,
            BING = 1,
            GOOGLE = 2,
            SUPPORT = 3,
        }
    }
    export interface IBotProgressIndicatorMetadata { [key: string]: any }
    export class BotProgressIndicatorMetadata implements IBotProgressIndicatorMetadata {
        constructor(properties?: IBotProgressIndicatorMetadata);
        [key: string]: any;
        static create(properties?: IBotProgressIndicatorMetadata): BotProgressIndicatorMetadata;
        static encode(message: IBotProgressIndicatorMetadata, writer?: any): any;
        static encodeDelimited(message: IBotProgressIndicatorMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotProgressIndicatorMetadata;
        static decodeDelimited(reader: any): BotProgressIndicatorMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotProgressIndicatorMetadata;
        static toObject(message: BotProgressIndicatorMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotProgressIndicatorMetadata {
        export interface IBotPlanningStepMetadata { [key: string]: any }
        export class BotPlanningStepMetadata implements IBotPlanningStepMetadata {
            constructor(properties?: IBotPlanningStepMetadata);
            [key: string]: any;
            static create(properties?: IBotPlanningStepMetadata): BotPlanningStepMetadata;
            static encode(message: IBotPlanningStepMetadata, writer?: any): any;
            static encodeDelimited(message: IBotPlanningStepMetadata, writer?: any): any;
            static decode(reader: any, length?: number): BotPlanningStepMetadata;
            static decodeDelimited(reader: any): BotPlanningStepMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BotPlanningStepMetadata;
            static toObject(message: BotPlanningStepMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace BotPlanningStepMetadata {
            export interface IBotPlanningSearchSourceMetadata { [key: string]: any }
            export class BotPlanningSearchSourceMetadata implements IBotPlanningSearchSourceMetadata {
                constructor(properties?: IBotPlanningSearchSourceMetadata);
                [key: string]: any;
                static create(properties?: IBotPlanningSearchSourceMetadata): BotPlanningSearchSourceMetadata;
                static encode(message: IBotPlanningSearchSourceMetadata, writer?: any): any;
                static encodeDelimited(message: IBotPlanningSearchSourceMetadata, writer?: any): any;
                static decode(reader: any, length?: number): BotPlanningSearchSourceMetadata;
                static decodeDelimited(reader: any): BotPlanningSearchSourceMetadata;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): BotPlanningSearchSourceMetadata;
                static toObject(message: BotPlanningSearchSourceMetadata, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IBotPlanningSearchSourcesMetadata { [key: string]: any }
            export class BotPlanningSearchSourcesMetadata implements IBotPlanningSearchSourcesMetadata {
                constructor(properties?: IBotPlanningSearchSourcesMetadata);
                [key: string]: any;
                static create(properties?: IBotPlanningSearchSourcesMetadata): BotPlanningSearchSourcesMetadata;
                static encode(message: IBotPlanningSearchSourcesMetadata, writer?: any): any;
                static encodeDelimited(message: IBotPlanningSearchSourcesMetadata, writer?: any): any;
                static decode(reader: any, length?: number): BotPlanningSearchSourcesMetadata;
                static decodeDelimited(reader: any): BotPlanningSearchSourcesMetadata;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): BotPlanningSearchSourcesMetadata;
                static toObject(message: BotPlanningSearchSourcesMetadata, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace BotPlanningSearchSourcesMetadata {
                export enum BotPlanningSearchSourceProvider {
                    UNKNOWN = 0,
                    OTHER = 1,
                    GOOGLE = 2,
                    BING = 3,
                }
            }
            export interface IBotPlanningStepSectionMetadata { [key: string]: any }
            export class BotPlanningStepSectionMetadata implements IBotPlanningStepSectionMetadata {
                constructor(properties?: IBotPlanningStepSectionMetadata);
                [key: string]: any;
                static create(properties?: IBotPlanningStepSectionMetadata): BotPlanningStepSectionMetadata;
                static encode(message: IBotPlanningStepSectionMetadata, writer?: any): any;
                static encodeDelimited(message: IBotPlanningStepSectionMetadata, writer?: any): any;
                static decode(reader: any, length?: number): BotPlanningStepSectionMetadata;
                static decodeDelimited(reader: any): BotPlanningStepSectionMetadata;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): BotPlanningStepSectionMetadata;
                static toObject(message: BotPlanningStepSectionMetadata, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export enum BotSearchSourceProvider {
                UNKNOWN_PROVIDER = 0,
                OTHER = 1,
                GOOGLE = 2,
                BING = 3,
            }
            export enum PlanningStepStatus {
                UNKNOWN = 0,
                PLANNED = 1,
                EXECUTING = 2,
                FINISHED = 3,
            }
        }
    }
    export interface IBotPromotionMessageMetadata { [key: string]: any }
    export class BotPromotionMessageMetadata implements IBotPromotionMessageMetadata {
        constructor(properties?: IBotPromotionMessageMetadata);
        [key: string]: any;
        static create(properties?: IBotPromotionMessageMetadata): BotPromotionMessageMetadata;
        static encode(message: IBotPromotionMessageMetadata, writer?: any): any;
        static encodeDelimited(message: IBotPromotionMessageMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotPromotionMessageMetadata;
        static decodeDelimited(reader: any): BotPromotionMessageMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotPromotionMessageMetadata;
        static toObject(message: BotPromotionMessageMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotPromotionMessageMetadata {
        export enum BotPromotionType {
            UNKNOWN_TYPE = 0,
            C50 = 1,
            SURVEY_PLATFORM = 2,
        }
    }
    export interface IBotPromptSuggestion { [key: string]: any }
    export class BotPromptSuggestion implements IBotPromptSuggestion {
        constructor(properties?: IBotPromptSuggestion);
        [key: string]: any;
        static create(properties?: IBotPromptSuggestion): BotPromptSuggestion;
        static encode(message: IBotPromptSuggestion, writer?: any): any;
        static encodeDelimited(message: IBotPromptSuggestion, writer?: any): any;
        static decode(reader: any, length?: number): BotPromptSuggestion;
        static decodeDelimited(reader: any): BotPromptSuggestion;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotPromptSuggestion;
        static toObject(message: BotPromptSuggestion, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotPromptSuggestions { [key: string]: any }
    export class BotPromptSuggestions implements IBotPromptSuggestions {
        constructor(properties?: IBotPromptSuggestions);
        [key: string]: any;
        static create(properties?: IBotPromptSuggestions): BotPromptSuggestions;
        static encode(message: IBotPromptSuggestions, writer?: any): any;
        static encodeDelimited(message: IBotPromptSuggestions, writer?: any): any;
        static decode(reader: any, length?: number): BotPromptSuggestions;
        static decodeDelimited(reader: any): BotPromptSuggestions;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotPromptSuggestions;
        static toObject(message: BotPromptSuggestions, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotPttPromptMetadata { [key: string]: any }
    export class BotPttPromptMetadata implements IBotPttPromptMetadata {
        constructor(properties?: IBotPttPromptMetadata);
        [key: string]: any;
        static create(properties?: IBotPttPromptMetadata): BotPttPromptMetadata;
        static encode(message: IBotPttPromptMetadata, writer?: any): any;
        static encodeDelimited(message: IBotPttPromptMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotPttPromptMetadata;
        static decodeDelimited(reader: any): BotPttPromptMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotPttPromptMetadata;
        static toObject(message: BotPttPromptMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotQuotaMetadata { [key: string]: any }
    export class BotQuotaMetadata implements IBotQuotaMetadata {
        constructor(properties?: IBotQuotaMetadata);
        [key: string]: any;
        static create(properties?: IBotQuotaMetadata): BotQuotaMetadata;
        static encode(message: IBotQuotaMetadata, writer?: any): any;
        static encodeDelimited(message: IBotQuotaMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotQuotaMetadata;
        static decodeDelimited(reader: any): BotQuotaMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotQuotaMetadata;
        static toObject(message: BotQuotaMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotQuotaMetadata {
        export interface IBotFeatureQuotaMetadata { [key: string]: any }
        export class BotFeatureQuotaMetadata implements IBotFeatureQuotaMetadata {
            constructor(properties?: IBotFeatureQuotaMetadata);
            [key: string]: any;
            static create(properties?: IBotFeatureQuotaMetadata): BotFeatureQuotaMetadata;
            static encode(message: IBotFeatureQuotaMetadata, writer?: any): any;
            static encodeDelimited(message: IBotFeatureQuotaMetadata, writer?: any): any;
            static decode(reader: any, length?: number): BotFeatureQuotaMetadata;
            static decodeDelimited(reader: any): BotFeatureQuotaMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BotFeatureQuotaMetadata;
            static toObject(message: BotFeatureQuotaMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace BotFeatureQuotaMetadata {
            export enum BotFeatureType {
                UNKNOWN_FEATURE = 0,
                REASONING_FEATURE = 1,
            }
        }
    }
    export interface IBotReminderMetadata { [key: string]: any }
    export class BotReminderMetadata implements IBotReminderMetadata {
        constructor(properties?: IBotReminderMetadata);
        [key: string]: any;
        static create(properties?: IBotReminderMetadata): BotReminderMetadata;
        static encode(message: IBotReminderMetadata, writer?: any): any;
        static encodeDelimited(message: IBotReminderMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotReminderMetadata;
        static decodeDelimited(reader: any): BotReminderMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotReminderMetadata;
        static toObject(message: BotReminderMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotReminderMetadata {
        export enum ReminderAction {
            NOTIFY = 1,
            CREATE = 2,
            DELETE = 3,
            UPDATE = 4,
        }
        export enum ReminderFrequency {
            ONCE = 1,
            DAILY = 2,
            WEEKLY = 3,
            BIWEEKLY = 4,
            MONTHLY = 5,
        }
    }
    export interface IBotRenderingConfigMetadata { [key: string]: any }
    export class BotRenderingConfigMetadata implements IBotRenderingConfigMetadata {
        constructor(properties?: IBotRenderingConfigMetadata);
        [key: string]: any;
        static create(properties?: IBotRenderingConfigMetadata): BotRenderingConfigMetadata;
        static encode(message: IBotRenderingConfigMetadata, writer?: any): any;
        static encodeDelimited(message: IBotRenderingConfigMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotRenderingConfigMetadata;
        static decodeDelimited(reader: any): BotRenderingConfigMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotRenderingConfigMetadata;
        static toObject(message: BotRenderingConfigMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotRenderingMetadata { [key: string]: any }
    export class BotRenderingMetadata implements IBotRenderingMetadata {
        constructor(properties?: IBotRenderingMetadata);
        [key: string]: any;
        static create(properties?: IBotRenderingMetadata): BotRenderingMetadata;
        static encode(message: IBotRenderingMetadata, writer?: any): any;
        static encodeDelimited(message: IBotRenderingMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotRenderingMetadata;
        static decodeDelimited(reader: any): BotRenderingMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotRenderingMetadata;
        static toObject(message: BotRenderingMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotRenderingMetadata {
        export interface IKeyword { [key: string]: any }
        export class Keyword implements IKeyword {
            constructor(properties?: IKeyword);
            [key: string]: any;
            static create(properties?: IKeyword): Keyword;
            static encode(message: IKeyword, writer?: any): any;
            static encodeDelimited(message: IKeyword, writer?: any): any;
            static decode(reader: any, length?: number): Keyword;
            static decodeDelimited(reader: any): Keyword;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Keyword;
            static toObject(message: Keyword, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IBotResolvedToolCallMetadata { [key: string]: any }
    export class BotResolvedToolCallMetadata implements IBotResolvedToolCallMetadata {
        constructor(properties?: IBotResolvedToolCallMetadata);
        [key: string]: any;
        static create(properties?: IBotResolvedToolCallMetadata): BotResolvedToolCallMetadata;
        static encode(message: IBotResolvedToolCallMetadata, writer?: any): any;
        static encodeDelimited(message: IBotResolvedToolCallMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotResolvedToolCallMetadata;
        static decodeDelimited(reader: any): BotResolvedToolCallMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotResolvedToolCallMetadata;
        static toObject(message: BotResolvedToolCallMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotSessionMetadata { [key: string]: any }
    export class BotSessionMetadata implements IBotSessionMetadata {
        constructor(properties?: IBotSessionMetadata);
        [key: string]: any;
        static create(properties?: IBotSessionMetadata): BotSessionMetadata;
        static encode(message: IBotSessionMetadata, writer?: any): any;
        static encodeDelimited(message: IBotSessionMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotSessionMetadata;
        static decodeDelimited(reader: any): BotSessionMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotSessionMetadata;
        static toObject(message: BotSessionMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum BotSessionSource {
        NONE = 0,
        NULL_STATE = 1,
        TYPEAHEAD = 2,
        USER_INPUT = 3,
        EMU_FLASH = 4,
        EMU_FLASH_FOLLOWUP = 5,
        VOICE = 6,
        AI_HOME_SESSION = 7,
    }
    export interface IBotSignatureVerificationMetadata { [key: string]: any }
    export class BotSignatureVerificationMetadata implements IBotSignatureVerificationMetadata {
        constructor(properties?: IBotSignatureVerificationMetadata);
        [key: string]: any;
        static create(properties?: IBotSignatureVerificationMetadata): BotSignatureVerificationMetadata;
        static encode(message: IBotSignatureVerificationMetadata, writer?: any): any;
        static encodeDelimited(message: IBotSignatureVerificationMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotSignatureVerificationMetadata;
        static decodeDelimited(reader: any): BotSignatureVerificationMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotSignatureVerificationMetadata;
        static toObject(message: BotSignatureVerificationMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotSignatureVerificationUseCaseProof { [key: string]: any }
    export class BotSignatureVerificationUseCaseProof implements IBotSignatureVerificationUseCaseProof {
        constructor(properties?: IBotSignatureVerificationUseCaseProof);
        [key: string]: any;
        static create(properties?: IBotSignatureVerificationUseCaseProof): BotSignatureVerificationUseCaseProof;
        static encode(message: IBotSignatureVerificationUseCaseProof, writer?: any): any;
        static encodeDelimited(message: IBotSignatureVerificationUseCaseProof, writer?: any): any;
        static decode(reader: any, length?: number): BotSignatureVerificationUseCaseProof;
        static decodeDelimited(reader: any): BotSignatureVerificationUseCaseProof;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotSignatureVerificationUseCaseProof;
        static toObject(message: BotSignatureVerificationUseCaseProof, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotSignatureVerificationUseCaseProof {
        export enum BotSignatureUseCase {
            UNSPECIFIED = 0,
            WA_BOT_MSG = 1,
            WA_TEE_BOT_MSG = 2,
            P2P_PILLS = 3,
            WA_WAFFLE = 4,
            WA_FEATURE_PKI = 5,
        }
        export interface ICertificateSKI { [key: string]: any }
        export class CertificateSKI implements ICertificateSKI {
            constructor(properties?: ICertificateSKI);
            [key: string]: any;
            static create(properties?: ICertificateSKI): CertificateSKI;
            static encode(message: ICertificateSKI, writer?: any): any;
            static encodeDelimited(message: ICertificateSKI, writer?: any): any;
            static decode(reader: any, length?: number): CertificateSKI;
            static decodeDelimited(reader: any): CertificateSKI;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CertificateSKI;
            static toObject(message: CertificateSKI, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IBotSourcesMetadata { [key: string]: any }
    export class BotSourcesMetadata implements IBotSourcesMetadata {
        constructor(properties?: IBotSourcesMetadata);
        [key: string]: any;
        static create(properties?: IBotSourcesMetadata): BotSourcesMetadata;
        static encode(message: IBotSourcesMetadata, writer?: any): any;
        static encodeDelimited(message: IBotSourcesMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotSourcesMetadata;
        static decodeDelimited(reader: any): BotSourcesMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotSourcesMetadata;
        static toObject(message: BotSourcesMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotSourcesMetadata {
        export interface IBotSourceItem { [key: string]: any }
        export class BotSourceItem implements IBotSourceItem {
            constructor(properties?: IBotSourceItem);
            [key: string]: any;
            static create(properties?: IBotSourceItem): BotSourceItem;
            static encode(message: IBotSourceItem, writer?: any): any;
            static encodeDelimited(message: IBotSourceItem, writer?: any): any;
            static decode(reader: any, length?: number): BotSourceItem;
            static decodeDelimited(reader: any): BotSourceItem;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BotSourceItem;
            static toObject(message: BotSourceItem, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace BotSourceItem {
            export enum SourceProvider {
                UNKNOWN = 0,
                BING = 1,
                GOOGLE = 2,
                SUPPORT = 3,
                OTHER = 4,
            }
        }
    }
    export interface IBizAIMetadataSync { [key: string]: any }
    export class BizAIMetadataSync implements IBizAIMetadataSync {
        constructor(properties?: IBizAIMetadataSync);
        [key: string]: any;
        static create(properties?: IBizAIMetadataSync): BizAIMetadataSync;
        static encode(message: IBizAIMetadataSync, writer?: any): any;
        static encodeDelimited(message: IBizAIMetadataSync, writer?: any): any;
        static decode(reader: any, length?: number): BizAIMetadataSync;
        static decodeDelimited(reader: any): BizAIMetadataSync;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BizAIMetadataSync;
        static toObject(message: BizAIMetadataSync, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BizAIMetadataSync {
        export interface IServerEvent { [key: string]: any }
        export class ServerEvent implements IServerEvent {
            constructor(properties?: IServerEvent);
            [key: string]: any;
            static create(properties?: IServerEvent): ServerEvent;
            static encode(message: IServerEvent, writer?: any): any;
            static encodeDelimited(message: IServerEvent, writer?: any): any;
            static decode(reader: any, length?: number): ServerEvent;
            static decodeDelimited(reader: any): ServerEvent;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ServerEvent;
            static toObject(message: ServerEvent, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ServerEvent {
            export interface IAgentOnboardingStarted { [key: string]: any }
            export class AgentOnboardingStarted implements IAgentOnboardingStarted {
                constructor(properties?: IAgentOnboardingStarted);
                [key: string]: any;
                static create(properties?: IAgentOnboardingStarted): AgentOnboardingStarted;
                static encode(message: IAgentOnboardingStarted, writer?: any): any;
                static encodeDelimited(message: IAgentOnboardingStarted, writer?: any): any;
                static decode(reader: any, length?: number): AgentOnboardingStarted;
                static decodeDelimited(reader: any): AgentOnboardingStarted;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): AgentOnboardingStarted;
                static toObject(message: AgentOnboardingStarted, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
    }
    export interface IACP2Setting { [key: string]: any }
    export class ACP2Setting implements IACP2Setting {
        constructor(properties?: IACP2Setting);
        [key: string]: any;
        static create(properties?: IACP2Setting): ACP2Setting;
        static encode(message: IACP2Setting, writer?: any): any;
        static encodeDelimited(message: IACP2Setting, writer?: any): any;
        static decode(reader: any, length?: number): ACP2Setting;
        static decodeDelimited(reader: any): ACP2Setting;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ACP2Setting;
        static toObject(message: ACP2Setting, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotSuggestedPromptMetadata { [key: string]: any }
    export class BotSuggestedPromptMetadata implements IBotSuggestedPromptMetadata {
        constructor(properties?: IBotSuggestedPromptMetadata);
        [key: string]: any;
        static create(properties?: IBotSuggestedPromptMetadata): BotSuggestedPromptMetadata;
        static encode(message: IBotSuggestedPromptMetadata, writer?: any): any;
        static encodeDelimited(message: IBotSuggestedPromptMetadata, writer?: any): any;
        static decode(reader: any, length?: number): BotSuggestedPromptMetadata;
        static decodeDelimited(reader: any): BotSuggestedPromptMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotSuggestedPromptMetadata;
        static toObject(message: BotSuggestedPromptMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IBotUnifiedResponseMutation { [key: string]: any }
    export class BotUnifiedResponseMutation implements IBotUnifiedResponseMutation {
        constructor(properties?: IBotUnifiedResponseMutation);
        [key: string]: any;
        static create(properties?: IBotUnifiedResponseMutation): BotUnifiedResponseMutation;
        static encode(message: IBotUnifiedResponseMutation, writer?: any): any;
        static encodeDelimited(message: IBotUnifiedResponseMutation, writer?: any): any;
        static decode(reader: any, length?: number): BotUnifiedResponseMutation;
        static decodeDelimited(reader: any): BotUnifiedResponseMutation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): BotUnifiedResponseMutation;
        static toObject(message: BotUnifiedResponseMutation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace BotUnifiedResponseMutation {
        export interface IMediaDetailsMetadata { [key: string]: any }
        export class MediaDetailsMetadata implements IMediaDetailsMetadata {
            constructor(properties?: IMediaDetailsMetadata);
            [key: string]: any;
            static create(properties?: IMediaDetailsMetadata): MediaDetailsMetadata;
            static encode(message: IMediaDetailsMetadata, writer?: any): any;
            static encodeDelimited(message: IMediaDetailsMetadata, writer?: any): any;
            static decode(reader: any, length?: number): MediaDetailsMetadata;
            static decodeDelimited(reader: any): MediaDetailsMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MediaDetailsMetadata;
            static toObject(message: MediaDetailsMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISideBySideMetadata { [key: string]: any }
        export class SideBySideMetadata implements ISideBySideMetadata {
            constructor(properties?: ISideBySideMetadata);
            [key: string]: any;
            static create(properties?: ISideBySideMetadata): SideBySideMetadata;
            static encode(message: ISideBySideMetadata, writer?: any): any;
            static encodeDelimited(message: ISideBySideMetadata, writer?: any): any;
            static decode(reader: any, length?: number): SideBySideMetadata;
            static decodeDelimited(reader: any): SideBySideMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SideBySideMetadata;
            static toObject(message: SideBySideMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export enum COMMAND_COMMAND_TYPE {
        EVERYONE = 1,
        SILENT = 2,
        AI = 3,
        AI_IMAGINE = 4,
    }
    export enum CONSUMER_APPLICATION_EXTENDED_TEXT_MESSAGE_PREVIEW_TYPE {
        NONE = 0,
        VIDEO = 1,
    }
    export enum CONSUMER_APPLICATION_METADATA_SPECIAL_TEXT_SIZE {
        SMALL = 1,
        MEDIUM = 2,
        LARGE = 3,
    }
    export enum CONSUMER_APPLICATION_STATUS_TEXT_MESAGE_FONT_TYPE {
        SANS_SERIF = 0,
        SERIF = 1,
        NORICAN_REGULAR = 2,
        BRYNDAN_WRITE = 3,
        BEBASNEUE_REGULAR = 4,
        OSWALD_HEAVY = 5,
    }
    export interface ICallLogRecord { [key: string]: any }
    export class CallLogRecord implements ICallLogRecord {
        constructor(properties?: ICallLogRecord);
        [key: string]: any;
        static create(properties?: ICallLogRecord): CallLogRecord;
        static encode(message: ICallLogRecord, writer?: any): any;
        static encodeDelimited(message: ICallLogRecord, writer?: any): any;
        static decode(reader: any, length?: number): CallLogRecord;
        static decodeDelimited(reader: any): CallLogRecord;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CallLogRecord;
        static toObject(message: CallLogRecord, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace CallLogRecord {
        export enum CallResult {
            CONNECTED = 0,
            REJECTED = 1,
            CANCELLED = 2,
            ACCEPTEDELSEWHERE = 3,
            MISSED = 4,
            INVALID = 5,
            UNAVAILABLE = 6,
            UPCOMING = 7,
            FAILED = 8,
            ABANDONED = 9,
            ONGOING = 10,
        }
        export enum CallType {
            REGULAR = 0,
            SCHEDULED_CALL = 1,
            VOICE_CHAT = 2,
        }
        export interface IParticipantInfo { [key: string]: any }
        export class ParticipantInfo implements IParticipantInfo {
            constructor(properties?: IParticipantInfo);
            [key: string]: any;
            static create(properties?: IParticipantInfo): ParticipantInfo;
            static encode(message: IParticipantInfo, writer?: any): any;
            static encodeDelimited(message: IParticipantInfo, writer?: any): any;
            static decode(reader: any, length?: number): ParticipantInfo;
            static decodeDelimited(reader: any): ParticipantInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ParticipantInfo;
            static toObject(message: ParticipantInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum SilenceReason {
            NONE = 0,
            SCHEDULED = 1,
            PRIVACY = 2,
            LIGHTWEIGHT = 3,
        }
    }
    export interface ICertChain { [key: string]: any }
    export class CertChain implements ICertChain {
        constructor(properties?: ICertChain);
        [key: string]: any;
        static create(properties?: ICertChain): CertChain;
        static encode(message: ICertChain, writer?: any): any;
        static encodeDelimited(message: ICertChain, writer?: any): any;
        static decode(reader: any, length?: number): CertChain;
        static decodeDelimited(reader: any): CertChain;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CertChain;
        static toObject(message: CertChain, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace CertChain {
        export interface INoiseCertificate { [key: string]: any }
        export class NoiseCertificate implements INoiseCertificate {
            constructor(properties?: INoiseCertificate);
            [key: string]: any;
            static create(properties?: INoiseCertificate): NoiseCertificate;
            static encode(message: INoiseCertificate, writer?: any): any;
            static encodeDelimited(message: INoiseCertificate, writer?: any): any;
            static decode(reader: any, length?: number): NoiseCertificate;
            static decodeDelimited(reader: any): NoiseCertificate;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NoiseCertificate;
            static toObject(message: NoiseCertificate, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace NoiseCertificate {
            export interface IDetails { [key: string]: any }
            export class Details implements IDetails {
                constructor(properties?: IDetails);
                [key: string]: any;
                static create(properties?: IDetails): Details;
                static encode(message: IDetails, writer?: any): any;
                static encodeDelimited(message: IDetails, writer?: any): any;
                static decode(reader: any, length?: number): Details;
                static decodeDelimited(reader: any): Details;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Details;
                static toObject(message: Details, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
    }
    export interface IChatLockSettings { [key: string]: any }
    export class ChatLockSettings implements IChatLockSettings {
        constructor(properties?: IChatLockSettings);
        [key: string]: any;
        static create(properties?: IChatLockSettings): ChatLockSettings;
        static encode(message: IChatLockSettings, writer?: any): any;
        static encodeDelimited(message: IChatLockSettings, writer?: any): any;
        static decode(reader: any, length?: number): ChatLockSettings;
        static decodeDelimited(reader: any): ChatLockSettings;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ChatLockSettings;
        static toObject(message: ChatLockSettings, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IChatRowOpaqueData { [key: string]: any }
    export class ChatRowOpaqueData implements IChatRowOpaqueData {
        constructor(properties?: IChatRowOpaqueData);
        [key: string]: any;
        static create(properties?: IChatRowOpaqueData): ChatRowOpaqueData;
        static encode(message: IChatRowOpaqueData, writer?: any): any;
        static encodeDelimited(message: IChatRowOpaqueData, writer?: any): any;
        static decode(reader: any, length?: number): ChatRowOpaqueData;
        static decodeDelimited(reader: any): ChatRowOpaqueData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ChatRowOpaqueData;
        static toObject(message: ChatRowOpaqueData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace ChatRowOpaqueData {
        export interface IDraftMessage { [key: string]: any }
        export class DraftMessage implements IDraftMessage {
            constructor(properties?: IDraftMessage);
            [key: string]: any;
            static create(properties?: IDraftMessage): DraftMessage;
            static encode(message: IDraftMessage, writer?: any): any;
            static encodeDelimited(message: IDraftMessage, writer?: any): any;
            static decode(reader: any, length?: number): DraftMessage;
            static decodeDelimited(reader: any): DraftMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DraftMessage;
            static toObject(message: DraftMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace DraftMessage {
            export interface ICtwaContextData { [key: string]: any }
            export class CtwaContextData implements ICtwaContextData {
                constructor(properties?: ICtwaContextData);
                [key: string]: any;
                static create(properties?: ICtwaContextData): CtwaContextData;
                static encode(message: ICtwaContextData, writer?: any): any;
                static encodeDelimited(message: ICtwaContextData, writer?: any): any;
                static decode(reader: any, length?: number): CtwaContextData;
                static decodeDelimited(reader: any): CtwaContextData;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CtwaContextData;
                static toObject(message: CtwaContextData, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace CtwaContextData {
                export enum ContextInfoExternalAdReplyInfoMediaType {
                    NONE = 0,
                    IMAGE = 1,
                    VIDEO = 2,
                }
            }
            export interface ICtwaContextLinkData { [key: string]: any }
            export class CtwaContextLinkData implements ICtwaContextLinkData {
                constructor(properties?: ICtwaContextLinkData);
                [key: string]: any;
                static create(properties?: ICtwaContextLinkData): CtwaContextLinkData;
                static encode(message: ICtwaContextLinkData, writer?: any): any;
                static encodeDelimited(message: ICtwaContextLinkData, writer?: any): any;
                static decode(reader: any, length?: number): CtwaContextLinkData;
                static decodeDelimited(reader: any): CtwaContextLinkData;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CtwaContextLinkData;
                static toObject(message: CtwaContextLinkData, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
    }
    export interface ICitation { [key: string]: any }
    export class Citation implements ICitation {
        constructor(properties?: ICitation);
        [key: string]: any;
        static create(properties?: ICitation): Citation;
        static encode(message: ICitation, writer?: any): any;
        static encodeDelimited(message: ICitation, writer?: any): any;
        static decode(reader: any, length?: number): Citation;
        static decodeDelimited(reader: any): Citation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Citation;
        static toObject(message: Citation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IClientPairingProps { [key: string]: any }
    export class ClientPairingProps implements IClientPairingProps {
        constructor(properties?: IClientPairingProps);
        [key: string]: any;
        static create(properties?: IClientPairingProps): ClientPairingProps;
        static encode(message: IClientPairingProps, writer?: any): any;
        static encodeDelimited(message: IClientPairingProps, writer?: any): any;
        static decode(reader: any, length?: number): ClientPairingProps;
        static decodeDelimited(reader: any): ClientPairingProps;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ClientPairingProps;
        static toObject(message: ClientPairingProps, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IClientPayload { [key: string]: any }
    export class ClientPayload implements IClientPayload {
        constructor(properties?: IClientPayload);
        [key: string]: any;
        static create(properties?: IClientPayload): ClientPayload;
        static encode(message: IClientPayload, writer?: any): any;
        static encodeDelimited(message: IClientPayload, writer?: any): any;
        static decode(reader: any, length?: number): ClientPayload;
        static decodeDelimited(reader: any): ClientPayload;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ClientPayload;
        static toObject(message: ClientPayload, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace ClientPayload {
        export enum AccountType {
            DEFAULT = 0,
            GUEST = 1,
        }
        export enum ConnectReason {
            PUSH = 0,
            USER_ACTIVATED = 1,
            SCHEDULED = 2,
            ERROR_RECONNECT = 3,
            NETWORK_SWITCH = 4,
            PING_RECONNECT = 5,
            UNKNOWN = 6,
        }
        export enum ConnectType {
            CELLULAR_UNKNOWN = 0,
            WIFI_UNKNOWN = 1,
            CELLULAR_EDGE = 100,
            CELLULAR_IDEN = 101,
            CELLULAR_UMTS = 102,
            CELLULAR_EVDO = 103,
            CELLULAR_GPRS = 104,
            CELLULAR_HSDPA = 105,
            CELLULAR_HSUPA = 106,
            CELLULAR_HSPA = 107,
            CELLULAR_CDMA = 108,
            CELLULAR_1XRTT = 109,
            CELLULAR_EHRPD = 110,
            CELLULAR_LTE = 111,
            CELLULAR_HSPAP = 112,
        }
        export interface IDNSSource { [key: string]: any }
        export class DNSSource implements IDNSSource {
            constructor(properties?: IDNSSource);
            [key: string]: any;
            static create(properties?: IDNSSource): DNSSource;
            static encode(message: IDNSSource, writer?: any): any;
            static encodeDelimited(message: IDNSSource, writer?: any): any;
            static decode(reader: any, length?: number): DNSSource;
            static decodeDelimited(reader: any): DNSSource;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DNSSource;
            static toObject(message: DNSSource, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace DNSSource {
            export enum DNSResolutionMethod {
                SYSTEM = 0,
                GOOGLE = 1,
                HARDCODED = 2,
                OVERRIDE = 3,
                FALLBACK = 4,
                MNS = 5,
                MNS_SECONDARY = 6,
                SOCKS_PROXY = 7,
            }
        }
        export interface IDevicePairingRegistrationData { [key: string]: any }
        export class DevicePairingRegistrationData implements IDevicePairingRegistrationData {
            constructor(properties?: IDevicePairingRegistrationData);
            [key: string]: any;
            static create(properties?: IDevicePairingRegistrationData): DevicePairingRegistrationData;
            static encode(message: IDevicePairingRegistrationData, writer?: any): any;
            static encodeDelimited(message: IDevicePairingRegistrationData, writer?: any): any;
            static decode(reader: any, length?: number): DevicePairingRegistrationData;
            static decodeDelimited(reader: any): DevicePairingRegistrationData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DevicePairingRegistrationData;
            static toObject(message: DevicePairingRegistrationData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum IOSAppExtension {
            SHARE_EXTENSION = 0,
            SERVICE_EXTENSION = 1,
            INTENTS_EXTENSION = 2,
        }
        export interface IInteropData { [key: string]: any }
        export class InteropData implements IInteropData {
            constructor(properties?: IInteropData);
            [key: string]: any;
            static create(properties?: IInteropData): InteropData;
            static encode(message: IInteropData, writer?: any): any;
            static encodeDelimited(message: IInteropData, writer?: any): any;
            static decode(reader: any, length?: number): InteropData;
            static decodeDelimited(reader: any): InteropData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InteropData;
            static toObject(message: InteropData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum Product {
            WHATSAPP = 0,
            MESSENGER = 1,
            INTEROP = 2,
            INTEROP_MSGR = 3,
            WHATSAPP_LID = 4,
        }
        export enum TrafficAnonymization {
            OFF = 0,
            STANDARD = 1,
        }
        export interface IUserAgent { [key: string]: any }
        export class UserAgent implements IUserAgent {
            constructor(properties?: IUserAgent);
            [key: string]: any;
            static create(properties?: IUserAgent): UserAgent;
            static encode(message: IUserAgent, writer?: any): any;
            static encodeDelimited(message: IUserAgent, writer?: any): any;
            static decode(reader: any, length?: number): UserAgent;
            static decodeDelimited(reader: any): UserAgent;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UserAgent;
            static toObject(message: UserAgent, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace UserAgent {
            export interface IAppVersion { [key: string]: any }
            export class AppVersion implements IAppVersion {
                constructor(properties?: IAppVersion);
                [key: string]: any;
                static create(properties?: IAppVersion): AppVersion;
                static encode(message: IAppVersion, writer?: any): any;
                static encodeDelimited(message: IAppVersion, writer?: any): any;
                static decode(reader: any, length?: number): AppVersion;
                static decodeDelimited(reader: any): AppVersion;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): AppVersion;
                static toObject(message: AppVersion, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export enum DeviceType {
                PHONE = 0,
                TABLET = 1,
                DESKTOP = 2,
                WEARABLE = 3,
                VR = 4,
            }
            export enum DistributionChannel {
                APPSTORE = 0,
                WEBSITE = 1,
                TESTFLIGHT = 2,
                INTERNAL = 3,
            }
            export enum Platform {
                ANDROID = 0,
                IOS = 1,
                WINDOWS_PHONE = 2,
                BLACKBERRY = 3,
                BLACKBERRYX = 4,
                S40 = 5,
                S60 = 6,
                PYTHON_CLIENT = 7,
                TIZEN = 8,
                ENTERPRISE = 9,
                SMB_ANDROID = 10,
                KAIOS = 11,
                SMB_IOS = 12,
                WINDOWS = 13,
                WEB = 14,
                PORTAL = 15,
                GREEN_ANDROID = 16,
                GREEN_IPHONE = 17,
                BLUE_ANDROID = 18,
                BLUE_IPHONE = 19,
                FBLITE_ANDROID = 20,
                MLITE_ANDROID = 21,
                IGLITE_ANDROID = 22,
                PAGE = 23,
                MACOS = 24,
                OCULUS_MSG = 25,
                OCULUS_CALL = 26,
                MILAN = 27,
                CAPI = 28,
                WEAROS = 29,
                ARDEVICE = 30,
                VRDEVICE = 31,
                BLUE_WEB = 32,
                IPAD = 33,
                TEST = 34,
                SMART_GLASSES = 35,
                BLUE_VR = 36,
                AR_WRIST = 37,
                WAIL = 38,
            }
            export enum ReleaseChannel {
                RELEASE = 0,
                BETA = 1,
                ALPHA = 2,
                DEBUG = 3,
            }
        }
        export interface IWebInfo { [key: string]: any }
        export class WebInfo implements IWebInfo {
            constructor(properties?: IWebInfo);
            [key: string]: any;
            static create(properties?: IWebInfo): WebInfo;
            static encode(message: IWebInfo, writer?: any): any;
            static encodeDelimited(message: IWebInfo, writer?: any): any;
            static decode(reader: any, length?: number): WebInfo;
            static decodeDelimited(reader: any): WebInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): WebInfo;
            static toObject(message: WebInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace WebInfo {
            export enum WebSubPlatform {
                WEB_BROWSER = 0,
                APP_STORE = 1,
                WIN_STORE = 2,
                DARWIN = 3,
                WIN32 = 4,
                WIN_HYBRID = 5,
            }
            export interface IWebdPayload { [key: string]: any }
            export class WebdPayload implements IWebdPayload {
                constructor(properties?: IWebdPayload);
                [key: string]: any;
                static create(properties?: IWebdPayload): WebdPayload;
                static encode(message: IWebdPayload, writer?: any): any;
                static encodeDelimited(message: IWebdPayload, writer?: any): any;
                static decode(reader: any, length?: number): WebdPayload;
                static decodeDelimited(reader: any): WebdPayload;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): WebdPayload;
                static toObject(message: WebdPayload, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
    }
    export interface ICoexStateSync { [key: string]: any }
    export class CoexStateSync implements ICoexStateSync {
        constructor(properties?: ICoexStateSync);
        [key: string]: any;
        static create(properties?: ICoexStateSync): CoexStateSync;
        static encode(message: ICoexStateSync, writer?: any): any;
        static encodeDelimited(message: ICoexStateSync, writer?: any): any;
        static decode(reader: any, length?: number): CoexStateSync;
        static decodeDelimited(reader: any): CoexStateSync;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CoexStateSync;
        static toObject(message: CoexStateSync, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace CoexStateSync {
        export interface ICollectionMutations { [key: string]: any }
        export class CollectionMutations implements ICollectionMutations {
            constructor(properties?: ICollectionMutations);
            [key: string]: any;
            static create(properties?: ICollectionMutations): CollectionMutations;
            static encode(message: ICollectionMutations, writer?: any): any;
            static encodeDelimited(message: ICollectionMutations, writer?: any): any;
            static decode(reader: any, length?: number): CollectionMutations;
            static decodeDelimited(reader: any): CollectionMutations;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CollectionMutations;
            static toObject(message: CollectionMutations, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMutation { [key: string]: any }
        export class Mutation implements IMutation {
            constructor(properties?: IMutation);
            [key: string]: any;
            static create(properties?: IMutation): Mutation;
            static encode(message: IMutation, writer?: any): any;
            static encodeDelimited(message: IMutation, writer?: any): any;
            static decode(reader: any, length?: number): Mutation;
            static decodeDelimited(reader: any): Mutation;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Mutation;
            static toObject(message: Mutation, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export enum CollectionName {
        COLLECTION_NAME_UNKNOWN = 0,
        REGULAR = 1,
        REGULAR_LOW = 2,
        REGULAR_HIGH = 3,
        CRITICAL_BLOCK = 4,
        CRITICAL_UNBLOCK_LOW = 5,
    }
    export interface ICombinedFingerprint { [key: string]: any }
    export class CombinedFingerprint implements ICombinedFingerprint {
        constructor(properties?: ICombinedFingerprint);
        [key: string]: any;
        static create(properties?: ICombinedFingerprint): CombinedFingerprint;
        static encode(message: ICombinedFingerprint, writer?: any): any;
        static encodeDelimited(message: ICombinedFingerprint, writer?: any): any;
        static decode(reader: any, length?: number): CombinedFingerprint;
        static decodeDelimited(reader: any): CombinedFingerprint;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CombinedFingerprint;
        static toObject(message: CombinedFingerprint, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ICommand { [key: string]: any }
    export class Command implements ICommand {
        constructor(properties?: ICommand);
        [key: string]: any;
        static create(properties?: ICommand): Command;
        static encode(message: ICommand, writer?: any): any;
        static encodeDelimited(message: ICommand, writer?: any): any;
        static decode(reader: any, length?: number): Command;
        static decodeDelimited(reader: any): Command;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Command;
        static toObject(message: Command, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ICommentMetadata { [key: string]: any }
    export class CommentMetadata implements ICommentMetadata {
        constructor(properties?: ICommentMetadata);
        [key: string]: any;
        static create(properties?: ICommentMetadata): CommentMetadata;
        static encode(message: ICommentMetadata, writer?: any): any;
        static encodeDelimited(message: ICommentMetadata, writer?: any): any;
        static decode(reader: any, length?: number): CommentMetadata;
        static decodeDelimited(reader: any): CommentMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CommentMetadata;
        static toObject(message: CommentMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ICompanionCommitment { [key: string]: any }
    export class CompanionCommitment implements ICompanionCommitment {
        constructor(properties?: ICompanionCommitment);
        [key: string]: any;
        static create(properties?: ICompanionCommitment): CompanionCommitment;
        static encode(message: ICompanionCommitment, writer?: any): any;
        static encodeDelimited(message: ICompanionCommitment, writer?: any): any;
        static decode(reader: any, length?: number): CompanionCommitment;
        static decodeDelimited(reader: any): CompanionCommitment;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CompanionCommitment;
        static toObject(message: CompanionCommitment, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ICompanionEphemeralIdentity { [key: string]: any }
    export class CompanionEphemeralIdentity implements ICompanionEphemeralIdentity {
        constructor(properties?: ICompanionEphemeralIdentity);
        [key: string]: any;
        static create(properties?: ICompanionEphemeralIdentity): CompanionEphemeralIdentity;
        static encode(message: ICompanionEphemeralIdentity, writer?: any): any;
        static encodeDelimited(message: ICompanionEphemeralIdentity, writer?: any): any;
        static decode(reader: any, length?: number): CompanionEphemeralIdentity;
        static decodeDelimited(reader: any): CompanionEphemeralIdentity;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CompanionEphemeralIdentity;
        static toObject(message: CompanionEphemeralIdentity, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IConfig { [key: string]: any }
    export class Config implements IConfig {
        constructor(properties?: IConfig);
        [key: string]: any;
        static create(properties?: IConfig): Config;
        static encode(message: IConfig, writer?: any): any;
        static encodeDelimited(message: IConfig, writer?: any): any;
        static decode(reader: any, length?: number): Config;
        static decodeDelimited(reader: any): Config;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Config;
        static toObject(message: Config, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IConsumerApplication { [key: string]: any }
    export class ConsumerApplication implements IConsumerApplication {
        constructor(properties?: IConsumerApplication);
        [key: string]: any;
        static create(properties?: IConsumerApplication): ConsumerApplication;
        static encode(message: IConsumerApplication, writer?: any): any;
        static encodeDelimited(message: IConsumerApplication, writer?: any): any;
        static decode(reader: any, length?: number): ConsumerApplication;
        static decodeDelimited(reader: any): ConsumerApplication;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ConsumerApplication;
        static toObject(message: ConsumerApplication, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace ConsumerApplication {
        export interface IApplicationData { [key: string]: any }
        export class ApplicationData implements IApplicationData {
            constructor(properties?: IApplicationData);
            [key: string]: any;
            static create(properties?: IApplicationData): ApplicationData;
            static encode(message: IApplicationData, writer?: any): any;
            static encodeDelimited(message: IApplicationData, writer?: any): any;
            static decode(reader: any, length?: number): ApplicationData;
            static decodeDelimited(reader: any): ApplicationData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ApplicationData;
            static toObject(message: ApplicationData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAudioMessage { [key: string]: any }
        export class AudioMessage implements IAudioMessage {
            constructor(properties?: IAudioMessage);
            [key: string]: any;
            static create(properties?: IAudioMessage): AudioMessage;
            static encode(message: IAudioMessage, writer?: any): any;
            static encodeDelimited(message: IAudioMessage, writer?: any): any;
            static decode(reader: any, length?: number): AudioMessage;
            static decodeDelimited(reader: any): AudioMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AudioMessage;
            static toObject(message: AudioMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IContactMessage { [key: string]: any }
        export class ContactMessage implements IContactMessage {
            constructor(properties?: IContactMessage);
            [key: string]: any;
            static create(properties?: IContactMessage): ContactMessage;
            static encode(message: IContactMessage, writer?: any): any;
            static encodeDelimited(message: IContactMessage, writer?: any): any;
            static decode(reader: any, length?: number): ContactMessage;
            static decodeDelimited(reader: any): ContactMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ContactMessage;
            static toObject(message: ContactMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IContactsArrayMessage { [key: string]: any }
        export class ContactsArrayMessage implements IContactsArrayMessage {
            constructor(properties?: IContactsArrayMessage);
            [key: string]: any;
            static create(properties?: IContactsArrayMessage): ContactsArrayMessage;
            static encode(message: IContactsArrayMessage, writer?: any): any;
            static encodeDelimited(message: IContactsArrayMessage, writer?: any): any;
            static decode(reader: any, length?: number): ContactsArrayMessage;
            static decodeDelimited(reader: any): ContactsArrayMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ContactsArrayMessage;
            static toObject(message: ContactsArrayMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IContent { [key: string]: any }
        export class Content implements IContent {
            constructor(properties?: IContent);
            [key: string]: any;
            static create(properties?: IContent): Content;
            static encode(message: IContent, writer?: any): any;
            static encodeDelimited(message: IContent, writer?: any): any;
            static decode(reader: any, length?: number): Content;
            static decodeDelimited(reader: any): Content;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Content;
            static toObject(message: Content, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDocumentMessage { [key: string]: any }
        export class DocumentMessage implements IDocumentMessage {
            constructor(properties?: IDocumentMessage);
            [key: string]: any;
            static create(properties?: IDocumentMessage): DocumentMessage;
            static encode(message: IDocumentMessage, writer?: any): any;
            static encodeDelimited(message: IDocumentMessage, writer?: any): any;
            static decode(reader: any, length?: number): DocumentMessage;
            static decodeDelimited(reader: any): DocumentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DocumentMessage;
            static toObject(message: DocumentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEditMessage { [key: string]: any }
        export class EditMessage implements IEditMessage {
            constructor(properties?: IEditMessage);
            [key: string]: any;
            static create(properties?: IEditMessage): EditMessage;
            static encode(message: IEditMessage, writer?: any): any;
            static encodeDelimited(message: IEditMessage, writer?: any): any;
            static decode(reader: any, length?: number): EditMessage;
            static decodeDelimited(reader: any): EditMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EditMessage;
            static toObject(message: EditMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IExtendedTextMessage { [key: string]: any }
        export class ExtendedTextMessage implements IExtendedTextMessage {
            constructor(properties?: IExtendedTextMessage);
            [key: string]: any;
            static create(properties?: IExtendedTextMessage): ExtendedTextMessage;
            static encode(message: IExtendedTextMessage, writer?: any): any;
            static encodeDelimited(message: IExtendedTextMessage, writer?: any): any;
            static decode(reader: any, length?: number): ExtendedTextMessage;
            static decodeDelimited(reader: any): ExtendedTextMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ExtendedTextMessage;
            static toObject(message: ExtendedTextMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IGroupInviteMessage { [key: string]: any }
        export class GroupInviteMessage implements IGroupInviteMessage {
            constructor(properties?: IGroupInviteMessage);
            [key: string]: any;
            static create(properties?: IGroupInviteMessage): GroupInviteMessage;
            static encode(message: IGroupInviteMessage, writer?: any): any;
            static encodeDelimited(message: IGroupInviteMessage, writer?: any): any;
            static decode(reader: any, length?: number): GroupInviteMessage;
            static decodeDelimited(reader: any): GroupInviteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): GroupInviteMessage;
            static toObject(message: GroupInviteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IImageMessage { [key: string]: any }
        export class ImageMessage implements IImageMessage {
            constructor(properties?: IImageMessage);
            [key: string]: any;
            static create(properties?: IImageMessage): ImageMessage;
            static encode(message: IImageMessage, writer?: any): any;
            static encodeDelimited(message: IImageMessage, writer?: any): any;
            static decode(reader: any, length?: number): ImageMessage;
            static decodeDelimited(reader: any): ImageMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ImageMessage;
            static toObject(message: ImageMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IInteractiveAnnotation { [key: string]: any }
        export class InteractiveAnnotation implements IInteractiveAnnotation {
            constructor(properties?: IInteractiveAnnotation);
            [key: string]: any;
            static create(properties?: IInteractiveAnnotation): InteractiveAnnotation;
            static encode(message: IInteractiveAnnotation, writer?: any): any;
            static encodeDelimited(message: IInteractiveAnnotation, writer?: any): any;
            static decode(reader: any, length?: number): InteractiveAnnotation;
            static decodeDelimited(reader: any): InteractiveAnnotation;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InteractiveAnnotation;
            static toObject(message: InteractiveAnnotation, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILiveLocationMessage { [key: string]: any }
        export class LiveLocationMessage implements ILiveLocationMessage {
            constructor(properties?: ILiveLocationMessage);
            [key: string]: any;
            static create(properties?: ILiveLocationMessage): LiveLocationMessage;
            static encode(message: ILiveLocationMessage, writer?: any): any;
            static encodeDelimited(message: ILiveLocationMessage, writer?: any): any;
            static decode(reader: any, length?: number): LiveLocationMessage;
            static decodeDelimited(reader: any): LiveLocationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LiveLocationMessage;
            static toObject(message: LiveLocationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILocation { [key: string]: any }
        export class Location implements ILocation {
            constructor(properties?: ILocation);
            [key: string]: any;
            static create(properties?: ILocation): Location;
            static encode(message: ILocation, writer?: any): any;
            static encodeDelimited(message: ILocation, writer?: any): any;
            static decode(reader: any, length?: number): Location;
            static decodeDelimited(reader: any): Location;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Location;
            static toObject(message: Location, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILocationMessage { [key: string]: any }
        export class LocationMessage implements ILocationMessage {
            constructor(properties?: ILocationMessage);
            [key: string]: any;
            static create(properties?: ILocationMessage): LocationMessage;
            static encode(message: ILocationMessage, writer?: any): any;
            static encodeDelimited(message: ILocationMessage, writer?: any): any;
            static decode(reader: any, length?: number): LocationMessage;
            static decodeDelimited(reader: any): LocationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LocationMessage;
            static toObject(message: LocationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMediaPayload { [key: string]: any }
        export class MediaPayload implements IMediaPayload {
            constructor(properties?: IMediaPayload);
            [key: string]: any;
            static create(properties?: IMediaPayload): MediaPayload;
            static encode(message: IMediaPayload, writer?: any): any;
            static encodeDelimited(message: IMediaPayload, writer?: any): any;
            static decode(reader: any, length?: number): MediaPayload;
            static decodeDelimited(reader: any): MediaPayload;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MediaPayload;
            static toObject(message: MediaPayload, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMetadata { [key: string]: any }
        export class Metadata implements IMetadata {
            constructor(properties?: IMetadata);
            [key: string]: any;
            static create(properties?: IMetadata): Metadata;
            static encode(message: IMetadata, writer?: any): any;
            static encodeDelimited(message: IMetadata, writer?: any): any;
            static decode(reader: any, length?: number): Metadata;
            static decodeDelimited(reader: any): Metadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Metadata;
            static toObject(message: Metadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IOption { [key: string]: any }
        export class Option implements IOption {
            constructor(properties?: IOption);
            [key: string]: any;
            static create(properties?: IOption): Option;
            static encode(message: IOption, writer?: any): any;
            static encodeDelimited(message: IOption, writer?: any): any;
            static decode(reader: any, length?: number): Option;
            static decodeDelimited(reader: any): Option;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Option;
            static toObject(message: Option, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPayload { [key: string]: any }
        export class Payload implements IPayload {
            constructor(properties?: IPayload);
            [key: string]: any;
            static create(properties?: IPayload): Payload;
            static encode(message: IPayload, writer?: any): any;
            static encodeDelimited(message: IPayload, writer?: any): any;
            static decode(reader: any, length?: number): Payload;
            static decodeDelimited(reader: any): Payload;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Payload;
            static toObject(message: Payload, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPoint { [key: string]: any }
        export class Point implements IPoint {
            constructor(properties?: IPoint);
            [key: string]: any;
            static create(properties?: IPoint): Point;
            static encode(message: IPoint, writer?: any): any;
            static encodeDelimited(message: IPoint, writer?: any): any;
            static decode(reader: any, length?: number): Point;
            static decodeDelimited(reader: any): Point;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Point;
            static toObject(message: Point, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollAddOptionMessage { [key: string]: any }
        export class PollAddOptionMessage implements IPollAddOptionMessage {
            constructor(properties?: IPollAddOptionMessage);
            [key: string]: any;
            static create(properties?: IPollAddOptionMessage): PollAddOptionMessage;
            static encode(message: IPollAddOptionMessage, writer?: any): any;
            static encodeDelimited(message: IPollAddOptionMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollAddOptionMessage;
            static decodeDelimited(reader: any): PollAddOptionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollAddOptionMessage;
            static toObject(message: PollAddOptionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollCreationMessage { [key: string]: any }
        export class PollCreationMessage implements IPollCreationMessage {
            constructor(properties?: IPollCreationMessage);
            [key: string]: any;
            static create(properties?: IPollCreationMessage): PollCreationMessage;
            static encode(message: IPollCreationMessage, writer?: any): any;
            static encodeDelimited(message: IPollCreationMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollCreationMessage;
            static decodeDelimited(reader: any): PollCreationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollCreationMessage;
            static toObject(message: PollCreationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollEncValue { [key: string]: any }
        export class PollEncValue implements IPollEncValue {
            constructor(properties?: IPollEncValue);
            [key: string]: any;
            static create(properties?: IPollEncValue): PollEncValue;
            static encode(message: IPollEncValue, writer?: any): any;
            static encodeDelimited(message: IPollEncValue, writer?: any): any;
            static decode(reader: any, length?: number): PollEncValue;
            static decodeDelimited(reader: any): PollEncValue;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollEncValue;
            static toObject(message: PollEncValue, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollUpdateMessage { [key: string]: any }
        export class PollUpdateMessage implements IPollUpdateMessage {
            constructor(properties?: IPollUpdateMessage);
            [key: string]: any;
            static create(properties?: IPollUpdateMessage): PollUpdateMessage;
            static encode(message: IPollUpdateMessage, writer?: any): any;
            static encodeDelimited(message: IPollUpdateMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollUpdateMessage;
            static decodeDelimited(reader: any): PollUpdateMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollUpdateMessage;
            static toObject(message: PollUpdateMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollVoteMessage { [key: string]: any }
        export class PollVoteMessage implements IPollVoteMessage {
            constructor(properties?: IPollVoteMessage);
            [key: string]: any;
            static create(properties?: IPollVoteMessage): PollVoteMessage;
            static encode(message: IPollVoteMessage, writer?: any): any;
            static encodeDelimited(message: IPollVoteMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollVoteMessage;
            static decodeDelimited(reader: any): PollVoteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollVoteMessage;
            static toObject(message: PollVoteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IReactionMessage { [key: string]: any }
        export class ReactionMessage implements IReactionMessage {
            constructor(properties?: IReactionMessage);
            [key: string]: any;
            static create(properties?: IReactionMessage): ReactionMessage;
            static encode(message: IReactionMessage, writer?: any): any;
            static encodeDelimited(message: IReactionMessage, writer?: any): any;
            static decode(reader: any, length?: number): ReactionMessage;
            static decodeDelimited(reader: any): ReactionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ReactionMessage;
            static toObject(message: ReactionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IRevokeMessage { [key: string]: any }
        export class RevokeMessage implements IRevokeMessage {
            constructor(properties?: IRevokeMessage);
            [key: string]: any;
            static create(properties?: IRevokeMessage): RevokeMessage;
            static encode(message: IRevokeMessage, writer?: any): any;
            static encodeDelimited(message: IRevokeMessage, writer?: any): any;
            static decode(reader: any, length?: number): RevokeMessage;
            static decodeDelimited(reader: any): RevokeMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RevokeMessage;
            static toObject(message: RevokeMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISignal { [key: string]: any }
        export class Signal implements ISignal {
            constructor(properties?: ISignal);
            [key: string]: any;
            static create(properties?: ISignal): Signal;
            static encode(message: ISignal, writer?: any): any;
            static encodeDelimited(message: ISignal, writer?: any): any;
            static decode(reader: any, length?: number): Signal;
            static decodeDelimited(reader: any): Signal;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Signal;
            static toObject(message: Signal, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IStatusTextMesage { [key: string]: any }
        export class StatusTextMesage implements IStatusTextMesage {
            constructor(properties?: IStatusTextMesage);
            [key: string]: any;
            static create(properties?: IStatusTextMesage): StatusTextMesage;
            static encode(message: IStatusTextMesage, writer?: any): any;
            static encodeDelimited(message: IStatusTextMesage, writer?: any): any;
            static decode(reader: any, length?: number): StatusTextMesage;
            static decodeDelimited(reader: any): StatusTextMesage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusTextMesage;
            static toObject(message: StatusTextMesage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IStickerMessage { [key: string]: any }
        export class StickerMessage implements IStickerMessage {
            constructor(properties?: IStickerMessage);
            [key: string]: any;
            static create(properties?: IStickerMessage): StickerMessage;
            static encode(message: IStickerMessage, writer?: any): any;
            static encodeDelimited(message: IStickerMessage, writer?: any): any;
            static decode(reader: any, length?: number): StickerMessage;
            static decodeDelimited(reader: any): StickerMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StickerMessage;
            static toObject(message: StickerMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISubProtocolPayload { [key: string]: any }
        export class SubProtocolPayload implements ISubProtocolPayload {
            constructor(properties?: ISubProtocolPayload);
            [key: string]: any;
            static create(properties?: ISubProtocolPayload): SubProtocolPayload;
            static encode(message: ISubProtocolPayload, writer?: any): any;
            static encodeDelimited(message: ISubProtocolPayload, writer?: any): any;
            static decode(reader: any, length?: number): SubProtocolPayload;
            static decodeDelimited(reader: any): SubProtocolPayload;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SubProtocolPayload;
            static toObject(message: SubProtocolPayload, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IVideoMessage { [key: string]: any }
        export class VideoMessage implements IVideoMessage {
            constructor(properties?: IVideoMessage);
            [key: string]: any;
            static create(properties?: IVideoMessage): VideoMessage;
            static encode(message: IVideoMessage, writer?: any): any;
            static encodeDelimited(message: IVideoMessage, writer?: any): any;
            static decode(reader: any, length?: number): VideoMessage;
            static decodeDelimited(reader: any): VideoMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): VideoMessage;
            static toObject(message: VideoMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IViewOnceMessage { [key: string]: any }
        export class ViewOnceMessage implements IViewOnceMessage {
            constructor(properties?: IViewOnceMessage);
            [key: string]: any;
            static create(properties?: IViewOnceMessage): ViewOnceMessage;
            static encode(message: IViewOnceMessage, writer?: any): any;
            static encodeDelimited(message: IViewOnceMessage, writer?: any): any;
            static decode(reader: any, length?: number): ViewOnceMessage;
            static decodeDelimited(reader: any): ViewOnceMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ViewOnceMessage;
            static toObject(message: ViewOnceMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IContextInfo { [key: string]: any }
    export class ContextInfo implements IContextInfo {
        constructor(properties?: IContextInfo);
        [key: string]: any;
        static create(properties?: IContextInfo): ContextInfo;
        static encode(message: IContextInfo, writer?: any): any;
        static encodeDelimited(message: IContextInfo, writer?: any): any;
        static decode(reader: any, length?: number): ContextInfo;
        static decodeDelimited(reader: any): ContextInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ContextInfo;
        static toObject(message: ContextInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace ContextInfo {
        export interface IAdReplyInfo { [key: string]: any }
        export class AdReplyInfo implements IAdReplyInfo {
            constructor(properties?: IAdReplyInfo);
            [key: string]: any;
            static create(properties?: IAdReplyInfo): AdReplyInfo;
            static encode(message: IAdReplyInfo, writer?: any): any;
            static encodeDelimited(message: IAdReplyInfo, writer?: any): any;
            static decode(reader: any, length?: number): AdReplyInfo;
            static decodeDelimited(reader: any): AdReplyInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AdReplyInfo;
            static toObject(message: AdReplyInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace AdReplyInfo {
            export enum MediaType {
                NONE = 0,
                IMAGE = 1,
                VIDEO = 2,
            }
        }
        export interface IBusinessInteractionPills { [key: string]: any }
        export class BusinessInteractionPills implements IBusinessInteractionPills {
            constructor(properties?: IBusinessInteractionPills);
            [key: string]: any;
            static create(properties?: IBusinessInteractionPills): BusinessInteractionPills;
            static encode(message: IBusinessInteractionPills, writer?: any): any;
            static encodeDelimited(message: IBusinessInteractionPills, writer?: any): any;
            static decode(reader: any, length?: number): BusinessInteractionPills;
            static decodeDelimited(reader: any): BusinessInteractionPills;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessInteractionPills;
            static toObject(message: BusinessInteractionPills, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace BusinessInteractionPills {
            export enum EntryPoint {
                ENTRY_POINT_UNKNOWN = 0,
                P2P_LINK_SHARE = 1,
                CONTACT_CARD_SHARING = 2,
                PHONE_NUMBER = 3,
                STATUS = 4,
                IN_THREAD_CONTEXT_CARD = 5,
            }
            export interface IPill { [key: string]: any }
            export class Pill implements IPill {
                constructor(properties?: IPill);
                [key: string]: any;
                static create(properties?: IPill): Pill;
                static encode(message: IPill, writer?: any): any;
                static encodeDelimited(message: IPill, writer?: any): any;
                static decode(reader: any, length?: number): Pill;
                static decodeDelimited(reader: any): Pill;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Pill;
                static toObject(message: Pill, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export enum PillType {
                UNKNOWN = 0,
                VIEW_BUSINESS = 1,
                CHAT = 2,
                CALL = 3,
                CATALOG = 4,
                CHANNEL = 5,
                BOOK_APPOINTMENT = 6,
                OFFERS = 7,
                BESTSELLERS = 8,
                MENU = 9,
                ABOUT = 10,
                SHOP = 11,
                ORDER = 12,
            }
            export interface ISignedPayload { [key: string]: any }
            export class SignedPayload implements ISignedPayload {
                constructor(properties?: ISignedPayload);
                [key: string]: any;
                static create(properties?: ISignedPayload): SignedPayload;
                static encode(message: ISignedPayload, writer?: any): any;
                static encodeDelimited(message: ISignedPayload, writer?: any): any;
                static decode(reader: any, length?: number): SignedPayload;
                static decodeDelimited(reader: any): SignedPayload;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): SignedPayload;
                static toObject(message: SignedPayload, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IUnauthenticatedBusinessMetadata { [key: string]: any }
            export class UnauthenticatedBusinessMetadata implements IUnauthenticatedBusinessMetadata {
                constructor(properties?: IUnauthenticatedBusinessMetadata);
                [key: string]: any;
                static create(properties?: IUnauthenticatedBusinessMetadata): UnauthenticatedBusinessMetadata;
                static encode(message: IUnauthenticatedBusinessMetadata, writer?: any): any;
                static encodeDelimited(message: IUnauthenticatedBusinessMetadata, writer?: any): any;
                static decode(reader: any, length?: number): UnauthenticatedBusinessMetadata;
                static decodeDelimited(reader: any): UnauthenticatedBusinessMetadata;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): UnauthenticatedBusinessMetadata;
                static toObject(message: UnauthenticatedBusinessMetadata, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IBusinessMessageForwardInfo { [key: string]: any }
        export class BusinessMessageForwardInfo implements IBusinessMessageForwardInfo {
            constructor(properties?: IBusinessMessageForwardInfo);
            [key: string]: any;
            static create(properties?: IBusinessMessageForwardInfo): BusinessMessageForwardInfo;
            static encode(message: IBusinessMessageForwardInfo, writer?: any): any;
            static encodeDelimited(message: IBusinessMessageForwardInfo, writer?: any): any;
            static decode(reader: any, length?: number): BusinessMessageForwardInfo;
            static decodeDelimited(reader: any): BusinessMessageForwardInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessMessageForwardInfo;
            static toObject(message: BusinessMessageForwardInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum CrossAppSource {
            CROSS_APP_SOURCE_UNKNOWN = 0,
            CROSS_APP_SOURCE_INSTAGRAM = 1,
            CROSS_APP_SOURCE_FACEBOOK = 2,
        }
        export interface IDataSharingContext { [key: string]: any }
        export class DataSharingContext implements IDataSharingContext {
            constructor(properties?: IDataSharingContext);
            [key: string]: any;
            static create(properties?: IDataSharingContext): DataSharingContext;
            static encode(message: IDataSharingContext, writer?: any): any;
            static encodeDelimited(message: IDataSharingContext, writer?: any): any;
            static decode(reader: any, length?: number): DataSharingContext;
            static decodeDelimited(reader: any): DataSharingContext;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DataSharingContext;
            static toObject(message: DataSharingContext, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace DataSharingContext {
            export enum DataSharingFlags {
                SHOW_MM_DISCLOSURE_ON_CLICK = 1,
                SHOW_MM_DISCLOSURE_ON_READ = 2,
            }
            export interface IParameters { [key: string]: any }
            export class Parameters implements IParameters {
                constructor(properties?: IParameters);
                [key: string]: any;
                static create(properties?: IParameters): Parameters;
                static encode(message: IParameters, writer?: any): any;
                static encodeDelimited(message: IParameters, writer?: any): any;
                static decode(reader: any, length?: number): Parameters;
                static decodeDelimited(reader: any): Parameters;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Parameters;
                static toObject(message: Parameters, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IExternalAdReplyInfo { [key: string]: any }
        export class ExternalAdReplyInfo implements IExternalAdReplyInfo {
            constructor(properties?: IExternalAdReplyInfo);
            [key: string]: any;
            static create(properties?: IExternalAdReplyInfo): ExternalAdReplyInfo;
            static encode(message: IExternalAdReplyInfo, writer?: any): any;
            static encodeDelimited(message: IExternalAdReplyInfo, writer?: any): any;
            static decode(reader: any, length?: number): ExternalAdReplyInfo;
            static decodeDelimited(reader: any): ExternalAdReplyInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ExternalAdReplyInfo;
            static toObject(message: ExternalAdReplyInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ExternalAdReplyInfo {
            export enum AdType {
                CTWA = 0,
                CAWC = 1,
            }
            export enum MediaType {
                NONE = 0,
                IMAGE = 1,
                VIDEO = 2,
            }
        }
        export interface IFeatureEligibilities { [key: string]: any }
        export class FeatureEligibilities implements IFeatureEligibilities {
            constructor(properties?: IFeatureEligibilities);
            [key: string]: any;
            static create(properties?: IFeatureEligibilities): FeatureEligibilities;
            static encode(message: IFeatureEligibilities, writer?: any): any;
            static encodeDelimited(message: IFeatureEligibilities, writer?: any): any;
            static decode(reader: any, length?: number): FeatureEligibilities;
            static decodeDelimited(reader: any): FeatureEligibilities;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): FeatureEligibilities;
            static toObject(message: FeatureEligibilities, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum ForwardOrigin {
            UNKNOWN = 0,
            CHAT = 1,
            STATUS = 2,
            CHANNELS = 3,
            META_AI = 4,
            UGC = 5,
        }
        export interface IForwardedNewsletterMessageInfo { [key: string]: any }
        export class ForwardedNewsletterMessageInfo implements IForwardedNewsletterMessageInfo {
            constructor(properties?: IForwardedNewsletterMessageInfo);
            [key: string]: any;
            static create(properties?: IForwardedNewsletterMessageInfo): ForwardedNewsletterMessageInfo;
            static encode(message: IForwardedNewsletterMessageInfo, writer?: any): any;
            static encodeDelimited(message: IForwardedNewsletterMessageInfo, writer?: any): any;
            static decode(reader: any, length?: number): ForwardedNewsletterMessageInfo;
            static decodeDelimited(reader: any): ForwardedNewsletterMessageInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ForwardedNewsletterMessageInfo;
            static toObject(message: ForwardedNewsletterMessageInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ForwardedNewsletterMessageInfo {
            export enum ContentType {
                UPDATE = 1,
                UPDATE_CARD = 2,
                LINK_CARD = 3,
            }
        }
        export interface IInstagramThreadLink { [key: string]: any }
        export class InstagramThreadLink implements IInstagramThreadLink {
            constructor(properties?: IInstagramThreadLink);
            [key: string]: any;
            static create(properties?: IInstagramThreadLink): InstagramThreadLink;
            static encode(message: IInstagramThreadLink, writer?: any): any;
            static encodeDelimited(message: IInstagramThreadLink, writer?: any): any;
            static decode(reader: any, length?: number): InstagramThreadLink;
            static decodeDelimited(reader: any): InstagramThreadLink;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InstagramThreadLink;
            static toObject(message: InstagramThreadLink, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum PairedMediaType {
            NOT_PAIRED_MEDIA = 0,
            SD_VIDEO_PARENT = 1,
            HD_VIDEO_CHILD = 2,
            SD_IMAGE_PARENT = 3,
            HD_IMAGE_CHILD = 4,
            MOTION_PHOTO_PARENT = 5,
            MOTION_PHOTO_CHILD = 6,
            HEVC_VIDEO_PARENT = 7,
            HEVC_VIDEO_CHILD = 8,
        }
        export interface IPartiallySelectedContent { [key: string]: any }
        export class PartiallySelectedContent implements IPartiallySelectedContent {
            constructor(properties?: IPartiallySelectedContent);
            [key: string]: any;
            static create(properties?: IPartiallySelectedContent): PartiallySelectedContent;
            static encode(message: IPartiallySelectedContent, writer?: any): any;
            static encodeDelimited(message: IPartiallySelectedContent, writer?: any): any;
            static decode(reader: any, length?: number): PartiallySelectedContent;
            static decodeDelimited(reader: any): PartiallySelectedContent;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PartiallySelectedContent;
            static toObject(message: PartiallySelectedContent, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IQuestionReplyQuotedMessage { [key: string]: any }
        export class QuestionReplyQuotedMessage implements IQuestionReplyQuotedMessage {
            constructor(properties?: IQuestionReplyQuotedMessage);
            [key: string]: any;
            static create(properties?: IQuestionReplyQuotedMessage): QuestionReplyQuotedMessage;
            static encode(message: IQuestionReplyQuotedMessage, writer?: any): any;
            static encodeDelimited(message: IQuestionReplyQuotedMessage, writer?: any): any;
            static decode(reader: any, length?: number): QuestionReplyQuotedMessage;
            static decodeDelimited(reader: any): QuestionReplyQuotedMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): QuestionReplyQuotedMessage;
            static toObject(message: QuestionReplyQuotedMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum QuotedType {
            EXPLICIT = 0,
            AUTO = 1,
        }
        export enum StatusAttributionType {
            NONE = 0,
            RESHARED_FROM_MENTION = 1,
            RESHARED_FROM_POST = 2,
            RESHARED_FROM_POST_MANY_TIMES = 3,
            FORWARDED_FROM_STATUS = 4,
        }
        export interface IStatusAudienceMetadata { [key: string]: any }
        export class StatusAudienceMetadata implements IStatusAudienceMetadata {
            constructor(properties?: IStatusAudienceMetadata);
            [key: string]: any;
            static create(properties?: IStatusAudienceMetadata): StatusAudienceMetadata;
            static encode(message: IStatusAudienceMetadata, writer?: any): any;
            static encodeDelimited(message: IStatusAudienceMetadata, writer?: any): any;
            static decode(reader: any, length?: number): StatusAudienceMetadata;
            static decodeDelimited(reader: any): StatusAudienceMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusAudienceMetadata;
            static toObject(message: StatusAudienceMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StatusAudienceMetadata {
            export enum AudienceType {
                UNKNOWN = 0,
                CLOSE_FRIENDS = 1,
            }
        }
        export enum StatusSourceType {
            IMAGE = 0,
            VIDEO = 1,
            GIF = 2,
            AUDIO = 3,
            TEXT = 4,
            MUSIC_STANDALONE = 5,
        }
        export interface IUTMInfo { [key: string]: any }
        export class UTMInfo implements IUTMInfo {
            constructor(properties?: IUTMInfo);
            [key: string]: any;
            static create(properties?: IUTMInfo): UTMInfo;
            static encode(message: IUTMInfo, writer?: any): any;
            static encodeDelimited(message: IUTMInfo, writer?: any): any;
            static decode(reader: any, length?: number): UTMInfo;
            static decodeDelimited(reader: any): UTMInfo;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UTMInfo;
            static toObject(message: UTMInfo, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IConversation { [key: string]: any }
    export class Conversation implements IConversation {
        constructor(properties?: IConversation);
        [key: string]: any;
        static create(properties?: IConversation): Conversation;
        static encode(message: IConversation, writer?: any): any;
        static encodeDelimited(message: IConversation, writer?: any): any;
        static decode(reader: any, length?: number): Conversation;
        static decodeDelimited(reader: any): Conversation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Conversation;
        static toObject(message: Conversation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace Conversation {
        export enum EndOfHistoryTransferType {
            COMPLETE_BUT_MORE_MESSAGES_REMAIN_ON_PRIMARY = 0,
            COMPLETE_AND_NO_MORE_MESSAGE_REMAIN_ON_PRIMARY = 1,
            COMPLETE_ON_DEMAND_SYNC_BUT_MORE_MSG_REMAIN_ON_PRIMARY = 2,
            COMPLETE_ON_DEMAND_SYNC_WITH_MORE_MSG_ON_PRIMARY_BUT_NO_ACCESS = 3,
        }
        export enum GroupAppealStatus {
            NO_APPEAL = 0,
            APPEAL_IN_REVIEW = 1,
            APPEAL_APPROVED = 2,
            APPEAL_REJECTED = 3,
        }
    }
    export interface ICreateBackupInput { [key: string]: any }
    export class CreateBackupInput implements ICreateBackupInput {
        constructor(properties?: ICreateBackupInput);
        [key: string]: any;
        static create(properties?: ICreateBackupInput): CreateBackupInput;
        static encode(message: ICreateBackupInput, writer?: any): any;
        static encodeDelimited(message: ICreateBackupInput, writer?: any): any;
        static decode(reader: any, length?: number): CreateBackupInput;
        static decodeDelimited(reader: any): CreateBackupInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CreateBackupInput;
        static toObject(message: CreateBackupInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ICreateBackupOutput { [key: string]: any }
    export class CreateBackupOutput implements ICreateBackupOutput {
        constructor(properties?: ICreateBackupOutput);
        [key: string]: any;
        static create(properties?: ICreateBackupOutput): CreateBackupOutput;
        static encode(message: ICreateBackupOutput, writer?: any): any;
        static encodeDelimited(message: ICreateBackupOutput, writer?: any): any;
        static decode(reader: any, length?: number): CreateBackupOutput;
        static decodeDelimited(reader: any): CreateBackupOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): CreateBackupOutput;
        static toObject(message: CreateBackupOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptMekForDistributionFromTransportSenderInput { [key: string]: any }
    export class DecryptMekForDistributionFromTransportSenderInput implements IDecryptMekForDistributionFromTransportSenderInput {
        constructor(properties?: IDecryptMekForDistributionFromTransportSenderInput);
        [key: string]: any;
        static create(properties?: IDecryptMekForDistributionFromTransportSenderInput): DecryptMekForDistributionFromTransportSenderInput;
        static encode(message: IDecryptMekForDistributionFromTransportSenderInput, writer?: any): any;
        static encodeDelimited(message: IDecryptMekForDistributionFromTransportSenderInput, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMekForDistributionFromTransportSenderInput;
        static decodeDelimited(reader: any): DecryptMekForDistributionFromTransportSenderInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMekForDistributionFromTransportSenderInput;
        static toObject(message: DecryptMekForDistributionFromTransportSenderInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace DecryptMekForDistributionFromTransportSenderInput {
        export interface ITransportSenderMEKDistributionSingleRecipient { [key: string]: any }
        export class TransportSenderMEKDistributionSingleRecipient implements ITransportSenderMEKDistributionSingleRecipient {
            constructor(properties?: ITransportSenderMEKDistributionSingleRecipient);
            [key: string]: any;
            static create(properties?: ITransportSenderMEKDistributionSingleRecipient): TransportSenderMEKDistributionSingleRecipient;
            static encode(message: ITransportSenderMEKDistributionSingleRecipient, writer?: any): any;
            static encodeDelimited(message: ITransportSenderMEKDistributionSingleRecipient, writer?: any): any;
            static decode(reader: any, length?: number): TransportSenderMEKDistributionSingleRecipient;
            static decodeDelimited(reader: any): TransportSenderMEKDistributionSingleRecipient;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): TransportSenderMEKDistributionSingleRecipient;
            static toObject(message: TransportSenderMEKDistributionSingleRecipient, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IDecryptMekForDistributionFromTransportSenderResult { [key: string]: any }
    export class DecryptMekForDistributionFromTransportSenderResult implements IDecryptMekForDistributionFromTransportSenderResult {
        constructor(properties?: IDecryptMekForDistributionFromTransportSenderResult);
        [key: string]: any;
        static create(properties?: IDecryptMekForDistributionFromTransportSenderResult): DecryptMekForDistributionFromTransportSenderResult;
        static encode(message: IDecryptMekForDistributionFromTransportSenderResult, writer?: any): any;
        static encodeDelimited(message: IDecryptMekForDistributionFromTransportSenderResult, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMekForDistributionFromTransportSenderResult;
        static decodeDelimited(reader: any): DecryptMekForDistributionFromTransportSenderResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMekForDistributionFromTransportSenderResult;
        static toObject(message: DecryptMekForDistributionFromTransportSenderResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptMekForDistributionFromTransportSenderSuccess { [key: string]: any }
    export class DecryptMekForDistributionFromTransportSenderSuccess implements IDecryptMekForDistributionFromTransportSenderSuccess {
        constructor(properties?: IDecryptMekForDistributionFromTransportSenderSuccess);
        [key: string]: any;
        static create(properties?: IDecryptMekForDistributionFromTransportSenderSuccess): DecryptMekForDistributionFromTransportSenderSuccess;
        static encode(message: IDecryptMekForDistributionFromTransportSenderSuccess, writer?: any): any;
        static encodeDelimited(message: IDecryptMekForDistributionFromTransportSenderSuccess, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMekForDistributionFromTransportSenderSuccess;
        static decodeDelimited(reader: any): DecryptMekForDistributionFromTransportSenderSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMekForDistributionFromTransportSenderSuccess;
        static toObject(message: DecryptMekForDistributionFromTransportSenderSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptMekForDistributionInput { [key: string]: any }
    export class DecryptMekForDistributionInput implements IDecryptMekForDistributionInput {
        constructor(properties?: IDecryptMekForDistributionInput);
        [key: string]: any;
        static create(properties?: IDecryptMekForDistributionInput): DecryptMekForDistributionInput;
        static encode(message: IDecryptMekForDistributionInput, writer?: any): any;
        static encodeDelimited(message: IDecryptMekForDistributionInput, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMekForDistributionInput;
        static decodeDelimited(reader: any): DecryptMekForDistributionInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMekForDistributionInput;
        static toObject(message: DecryptMekForDistributionInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptMekForDistributionResult { [key: string]: any }
    export class DecryptMekForDistributionResult implements IDecryptMekForDistributionResult {
        constructor(properties?: IDecryptMekForDistributionResult);
        [key: string]: any;
        static create(properties?: IDecryptMekForDistributionResult): DecryptMekForDistributionResult;
        static encode(message: IDecryptMekForDistributionResult, writer?: any): any;
        static encodeDelimited(message: IDecryptMekForDistributionResult, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMekForDistributionResult;
        static decodeDelimited(reader: any): DecryptMekForDistributionResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMekForDistributionResult;
        static toObject(message: DecryptMekForDistributionResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptMekForDistributionSuccess { [key: string]: any }
    export class DecryptMekForDistributionSuccess implements IDecryptMekForDistributionSuccess {
        constructor(properties?: IDecryptMekForDistributionSuccess);
        [key: string]: any;
        static create(properties?: IDecryptMekForDistributionSuccess): DecryptMekForDistributionSuccess;
        static encode(message: IDecryptMekForDistributionSuccess, writer?: any): any;
        static encodeDelimited(message: IDecryptMekForDistributionSuccess, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMekForDistributionSuccess;
        static decodeDelimited(reader: any): DecryptMekForDistributionSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMekForDistributionSuccess;
        static toObject(message: DecryptMekForDistributionSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptMessageInput { [key: string]: any }
    export class DecryptMessageInput implements IDecryptMessageInput {
        constructor(properties?: IDecryptMessageInput);
        [key: string]: any;
        static create(properties?: IDecryptMessageInput): DecryptMessageInput;
        static encode(message: IDecryptMessageInput, writer?: any): any;
        static encodeDelimited(message: IDecryptMessageInput, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMessageInput;
        static decodeDelimited(reader: any): DecryptMessageInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMessageInput;
        static toObject(message: DecryptMessageInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptMessageOutput { [key: string]: any }
    export class DecryptMessageOutput implements IDecryptMessageOutput {
        constructor(properties?: IDecryptMessageOutput);
        [key: string]: any;
        static create(properties?: IDecryptMessageOutput): DecryptMessageOutput;
        static encode(message: IDecryptMessageOutput, writer?: any): any;
        static encodeDelimited(message: IDecryptMessageOutput, writer?: any): any;
        static decode(reader: any, length?: number): DecryptMessageOutput;
        static decodeDelimited(reader: any): DecryptMessageOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptMessageOutput;
        static toObject(message: DecryptMessageOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptSelfMmkDistributionInput { [key: string]: any }
    export class DecryptSelfMmkDistributionInput implements IDecryptSelfMmkDistributionInput {
        constructor(properties?: IDecryptSelfMmkDistributionInput);
        [key: string]: any;
        static create(properties?: IDecryptSelfMmkDistributionInput): DecryptSelfMmkDistributionInput;
        static encode(message: IDecryptSelfMmkDistributionInput, writer?: any): any;
        static encodeDelimited(message: IDecryptSelfMmkDistributionInput, writer?: any): any;
        static decode(reader: any, length?: number): DecryptSelfMmkDistributionInput;
        static decodeDelimited(reader: any): DecryptSelfMmkDistributionInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptSelfMmkDistributionInput;
        static toObject(message: DecryptSelfMmkDistributionInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptSelfMmkDistributionResult { [key: string]: any }
    export class DecryptSelfMmkDistributionResult implements IDecryptSelfMmkDistributionResult {
        constructor(properties?: IDecryptSelfMmkDistributionResult);
        [key: string]: any;
        static create(properties?: IDecryptSelfMmkDistributionResult): DecryptSelfMmkDistributionResult;
        static encode(message: IDecryptSelfMmkDistributionResult, writer?: any): any;
        static encodeDelimited(message: IDecryptSelfMmkDistributionResult, writer?: any): any;
        static decode(reader: any, length?: number): DecryptSelfMmkDistributionResult;
        static decodeDelimited(reader: any): DecryptSelfMmkDistributionResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptSelfMmkDistributionResult;
        static toObject(message: DecryptSelfMmkDistributionResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDecryptSelfMmkDistributionSuccess { [key: string]: any }
    export class DecryptSelfMmkDistributionSuccess implements IDecryptSelfMmkDistributionSuccess {
        constructor(properties?: IDecryptSelfMmkDistributionSuccess);
        [key: string]: any;
        static create(properties?: IDecryptSelfMmkDistributionSuccess): DecryptSelfMmkDistributionSuccess;
        static encode(message: IDecryptSelfMmkDistributionSuccess, writer?: any): any;
        static encodeDelimited(message: IDecryptSelfMmkDistributionSuccess, writer?: any): any;
        static decode(reader: any, length?: number): DecryptSelfMmkDistributionSuccess;
        static decodeDelimited(reader: any): DecryptSelfMmkDistributionSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DecryptSelfMmkDistributionSuccess;
        static toObject(message: DecryptSelfMmkDistributionSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveAttachmentAccessTokenSecretInput { [key: string]: any }
    export class DeriveAttachmentAccessTokenSecretInput implements IDeriveAttachmentAccessTokenSecretInput {
        constructor(properties?: IDeriveAttachmentAccessTokenSecretInput);
        [key: string]: any;
        static create(properties?: IDeriveAttachmentAccessTokenSecretInput): DeriveAttachmentAccessTokenSecretInput;
        static encode(message: IDeriveAttachmentAccessTokenSecretInput, writer?: any): any;
        static encodeDelimited(message: IDeriveAttachmentAccessTokenSecretInput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveAttachmentAccessTokenSecretInput;
        static decodeDelimited(reader: any): DeriveAttachmentAccessTokenSecretInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveAttachmentAccessTokenSecretInput;
        static toObject(message: DeriveAttachmentAccessTokenSecretInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveAttachmentAccessTokenSecretResult { [key: string]: any }
    export class DeriveAttachmentAccessTokenSecretResult implements IDeriveAttachmentAccessTokenSecretResult {
        constructor(properties?: IDeriveAttachmentAccessTokenSecretResult);
        [key: string]: any;
        static create(properties?: IDeriveAttachmentAccessTokenSecretResult): DeriveAttachmentAccessTokenSecretResult;
        static encode(message: IDeriveAttachmentAccessTokenSecretResult, writer?: any): any;
        static encodeDelimited(message: IDeriveAttachmentAccessTokenSecretResult, writer?: any): any;
        static decode(reader: any, length?: number): DeriveAttachmentAccessTokenSecretResult;
        static decodeDelimited(reader: any): DeriveAttachmentAccessTokenSecretResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveAttachmentAccessTokenSecretResult;
        static toObject(message: DeriveAttachmentAccessTokenSecretResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveAttachmentPrimaryKeySecretInput { [key: string]: any }
    export class DeriveAttachmentPrimaryKeySecretInput implements IDeriveAttachmentPrimaryKeySecretInput {
        constructor(properties?: IDeriveAttachmentPrimaryKeySecretInput);
        [key: string]: any;
        static create(properties?: IDeriveAttachmentPrimaryKeySecretInput): DeriveAttachmentPrimaryKeySecretInput;
        static encode(message: IDeriveAttachmentPrimaryKeySecretInput, writer?: any): any;
        static encodeDelimited(message: IDeriveAttachmentPrimaryKeySecretInput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveAttachmentPrimaryKeySecretInput;
        static decodeDelimited(reader: any): DeriveAttachmentPrimaryKeySecretInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveAttachmentPrimaryKeySecretInput;
        static toObject(message: DeriveAttachmentPrimaryKeySecretInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveAttachmentPrimaryKeySecretResult { [key: string]: any }
    export class DeriveAttachmentPrimaryKeySecretResult implements IDeriveAttachmentPrimaryKeySecretResult {
        constructor(properties?: IDeriveAttachmentPrimaryKeySecretResult);
        [key: string]: any;
        static create(properties?: IDeriveAttachmentPrimaryKeySecretResult): DeriveAttachmentPrimaryKeySecretResult;
        static encode(message: IDeriveAttachmentPrimaryKeySecretResult, writer?: any): any;
        static encodeDelimited(message: IDeriveAttachmentPrimaryKeySecretResult, writer?: any): any;
        static decode(reader: any, length?: number): DeriveAttachmentPrimaryKeySecretResult;
        static decodeDelimited(reader: any): DeriveAttachmentPrimaryKeySecretResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveAttachmentPrimaryKeySecretResult;
        static toObject(message: DeriveAttachmentPrimaryKeySecretResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMailboxAuthKeypairInput { [key: string]: any }
    export class DeriveMailboxAuthKeypairInput implements IDeriveMailboxAuthKeypairInput {
        constructor(properties?: IDeriveMailboxAuthKeypairInput);
        [key: string]: any;
        static create(properties?: IDeriveMailboxAuthKeypairInput): DeriveMailboxAuthKeypairInput;
        static encode(message: IDeriveMailboxAuthKeypairInput, writer?: any): any;
        static encodeDelimited(message: IDeriveMailboxAuthKeypairInput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMailboxAuthKeypairInput;
        static decodeDelimited(reader: any): DeriveMailboxAuthKeypairInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMailboxAuthKeypairInput;
        static toObject(message: DeriveMailboxAuthKeypairInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMailboxAuthKeypairResult { [key: string]: any }
    export class DeriveMailboxAuthKeypairResult implements IDeriveMailboxAuthKeypairResult {
        constructor(properties?: IDeriveMailboxAuthKeypairResult);
        [key: string]: any;
        static create(properties?: IDeriveMailboxAuthKeypairResult): DeriveMailboxAuthKeypairResult;
        static encode(message: IDeriveMailboxAuthKeypairResult, writer?: any): any;
        static encodeDelimited(message: IDeriveMailboxAuthKeypairResult, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMailboxAuthKeypairResult;
        static decodeDelimited(reader: any): DeriveMailboxAuthKeypairResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMailboxAuthKeypairResult;
        static toObject(message: DeriveMailboxAuthKeypairResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMailboxEncryptionKeypairInput { [key: string]: any }
    export class DeriveMailboxEncryptionKeypairInput implements IDeriveMailboxEncryptionKeypairInput {
        constructor(properties?: IDeriveMailboxEncryptionKeypairInput);
        [key: string]: any;
        static create(properties?: IDeriveMailboxEncryptionKeypairInput): DeriveMailboxEncryptionKeypairInput;
        static encode(message: IDeriveMailboxEncryptionKeypairInput, writer?: any): any;
        static encodeDelimited(message: IDeriveMailboxEncryptionKeypairInput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMailboxEncryptionKeypairInput;
        static decodeDelimited(reader: any): DeriveMailboxEncryptionKeypairInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMailboxEncryptionKeypairInput;
        static toObject(message: DeriveMailboxEncryptionKeypairInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMailboxEncryptionKeypairResult { [key: string]: any }
    export class DeriveMailboxEncryptionKeypairResult implements IDeriveMailboxEncryptionKeypairResult {
        constructor(properties?: IDeriveMailboxEncryptionKeypairResult);
        [key: string]: any;
        static create(properties?: IDeriveMailboxEncryptionKeypairResult): DeriveMailboxEncryptionKeypairResult;
        static encode(message: IDeriveMailboxEncryptionKeypairResult, writer?: any): any;
        static encodeDelimited(message: IDeriveMailboxEncryptionKeypairResult, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMailboxEncryptionKeypairResult;
        static decodeDelimited(reader: any): DeriveMailboxEncryptionKeypairResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMailboxEncryptionKeypairResult;
        static toObject(message: DeriveMailboxEncryptionKeypairResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMailboxSigningKeypairInput { [key: string]: any }
    export class DeriveMailboxSigningKeypairInput implements IDeriveMailboxSigningKeypairInput {
        constructor(properties?: IDeriveMailboxSigningKeypairInput);
        [key: string]: any;
        static create(properties?: IDeriveMailboxSigningKeypairInput): DeriveMailboxSigningKeypairInput;
        static encode(message: IDeriveMailboxSigningKeypairInput, writer?: any): any;
        static encodeDelimited(message: IDeriveMailboxSigningKeypairInput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMailboxSigningKeypairInput;
        static decodeDelimited(reader: any): DeriveMailboxSigningKeypairInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMailboxSigningKeypairInput;
        static toObject(message: DeriveMailboxSigningKeypairInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMailboxSigningKeypairResult { [key: string]: any }
    export class DeriveMailboxSigningKeypairResult implements IDeriveMailboxSigningKeypairResult {
        constructor(properties?: IDeriveMailboxSigningKeypairResult);
        [key: string]: any;
        static create(properties?: IDeriveMailboxSigningKeypairResult): DeriveMailboxSigningKeypairResult;
        static encode(message: IDeriveMailboxSigningKeypairResult, writer?: any): any;
        static encodeDelimited(message: IDeriveMailboxSigningKeypairResult, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMailboxSigningKeypairResult;
        static decodeDelimited(reader: any): DeriveMailboxSigningKeypairResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMailboxSigningKeypairResult;
        static toObject(message: DeriveMailboxSigningKeypairResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMailboxSigningKeypairSuccess { [key: string]: any }
    export class DeriveMailboxSigningKeypairSuccess implements IDeriveMailboxSigningKeypairSuccess {
        constructor(properties?: IDeriveMailboxSigningKeypairSuccess);
        [key: string]: any;
        static create(properties?: IDeriveMailboxSigningKeypairSuccess): DeriveMailboxSigningKeypairSuccess;
        static encode(message: IDeriveMailboxSigningKeypairSuccess, writer?: any): any;
        static encodeDelimited(message: IDeriveMailboxSigningKeypairSuccess, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMailboxSigningKeypairSuccess;
        static decodeDelimited(reader: any): DeriveMailboxSigningKeypairSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMailboxSigningKeypairSuccess;
        static toObject(message: DeriveMailboxSigningKeypairSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMessageKeyInput { [key: string]: any }
    export class DeriveMessageKeyInput implements IDeriveMessageKeyInput {
        constructor(properties?: IDeriveMessageKeyInput);
        [key: string]: any;
        static create(properties?: IDeriveMessageKeyInput): DeriveMessageKeyInput;
        static encode(message: IDeriveMessageKeyInput, writer?: any): any;
        static encodeDelimited(message: IDeriveMessageKeyInput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMessageKeyInput;
        static decodeDelimited(reader: any): DeriveMessageKeyInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMessageKeyInput;
        static toObject(message: DeriveMessageKeyInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMessageKeyOutput { [key: string]: any }
    export class DeriveMessageKeyOutput implements IDeriveMessageKeyOutput {
        constructor(properties?: IDeriveMessageKeyOutput);
        [key: string]: any;
        static create(properties?: IDeriveMessageKeyOutput): DeriveMessageKeyOutput;
        static encode(message: IDeriveMessageKeyOutput, writer?: any): any;
        static encodeDelimited(message: IDeriveMessageKeyOutput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMessageKeyOutput;
        static decodeDelimited(reader: any): DeriveMessageKeyOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMessageKeyOutput;
        static toObject(message: DeriveMessageKeyOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMessagingMailboxKeypairsInput { [key: string]: any }
    export class DeriveMessagingMailboxKeypairsInput implements IDeriveMessagingMailboxKeypairsInput {
        constructor(properties?: IDeriveMessagingMailboxKeypairsInput);
        [key: string]: any;
        static create(properties?: IDeriveMessagingMailboxKeypairsInput): DeriveMessagingMailboxKeypairsInput;
        static encode(message: IDeriveMessagingMailboxKeypairsInput, writer?: any): any;
        static encodeDelimited(message: IDeriveMessagingMailboxKeypairsInput, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMessagingMailboxKeypairsInput;
        static decodeDelimited(reader: any): DeriveMessagingMailboxKeypairsInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMessagingMailboxKeypairsInput;
        static toObject(message: DeriveMessagingMailboxKeypairsInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMessagingMailboxKeypairsResult { [key: string]: any }
    export class DeriveMessagingMailboxKeypairsResult implements IDeriveMessagingMailboxKeypairsResult {
        constructor(properties?: IDeriveMessagingMailboxKeypairsResult);
        [key: string]: any;
        static create(properties?: IDeriveMessagingMailboxKeypairsResult): DeriveMessagingMailboxKeypairsResult;
        static encode(message: IDeriveMessagingMailboxKeypairsResult, writer?: any): any;
        static encodeDelimited(message: IDeriveMessagingMailboxKeypairsResult, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMessagingMailboxKeypairsResult;
        static decodeDelimited(reader: any): DeriveMessagingMailboxKeypairsResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMessagingMailboxKeypairsResult;
        static toObject(message: DeriveMessagingMailboxKeypairsResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeriveMessagingMailboxKeypairsSuccess { [key: string]: any }
    export class DeriveMessagingMailboxKeypairsSuccess implements IDeriveMessagingMailboxKeypairsSuccess {
        constructor(properties?: IDeriveMessagingMailboxKeypairsSuccess);
        [key: string]: any;
        static create(properties?: IDeriveMessagingMailboxKeypairsSuccess): DeriveMessagingMailboxKeypairsSuccess;
        static encode(message: IDeriveMessagingMailboxKeypairsSuccess, writer?: any): any;
        static encodeDelimited(message: IDeriveMessagingMailboxKeypairsSuccess, writer?: any): any;
        static decode(reader: any, length?: number): DeriveMessagingMailboxKeypairsSuccess;
        static decodeDelimited(reader: any): DeriveMessagingMailboxKeypairsSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeriveMessagingMailboxKeypairsSuccess;
        static toObject(message: DeriveMessagingMailboxKeypairsSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDetachedDevicePublicData { [key: string]: any }
    export class DetachedDevicePublicData implements IDetachedDevicePublicData {
        constructor(properties?: IDetachedDevicePublicData);
        [key: string]: any;
        static create(properties?: IDetachedDevicePublicData): DetachedDevicePublicData;
        static encode(message: IDetachedDevicePublicData, writer?: any): any;
        static encodeDelimited(message: IDetachedDevicePublicData, writer?: any): any;
        static decode(reader: any, length?: number): DetachedDevicePublicData;
        static decodeDelimited(reader: any): DetachedDevicePublicData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DetachedDevicePublicData;
        static toObject(message: DetachedDevicePublicData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeviceCapabilities { [key: string]: any }
    export class DeviceCapabilities implements IDeviceCapabilities {
        constructor(properties?: IDeviceCapabilities);
        [key: string]: any;
        static create(properties?: IDeviceCapabilities): DeviceCapabilities;
        static encode(message: IDeviceCapabilities, writer?: any): any;
        static encodeDelimited(message: IDeviceCapabilities, writer?: any): any;
        static decode(reader: any, length?: number): DeviceCapabilities;
        static decodeDelimited(reader: any): DeviceCapabilities;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeviceCapabilities;
        static toObject(message: DeviceCapabilities, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace DeviceCapabilities {
        export interface IAiFbidMigration { [key: string]: any }
        export class AiFbidMigration implements IAiFbidMigration {
            constructor(properties?: IAiFbidMigration);
            [key: string]: any;
            static create(properties?: IAiFbidMigration): AiFbidMigration;
            static encode(message: IAiFbidMigration, writer?: any): any;
            static encodeDelimited(message: IAiFbidMigration, writer?: any): any;
            static decode(reader: any, length?: number): AiFbidMigration;
            static decodeDelimited(reader: any): AiFbidMigration;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AiFbidMigration;
            static toObject(message: AiFbidMigration, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAiThread { [key: string]: any }
        export class AiThread implements IAiThread {
            constructor(properties?: IAiThread);
            [key: string]: any;
            static create(properties?: IAiThread): AiThread;
            static encode(message: IAiThread, writer?: any): any;
            static encodeDelimited(message: IAiThread, writer?: any): any;
            static decode(reader: any, length?: number): AiThread;
            static decodeDelimited(reader: any): AiThread;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AiThread;
            static toObject(message: AiThread, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace AiThread {
            export enum SupportLevel {
                NONE = 0,
                INFRA = 1,
                FULL = 2,
            }
        }
        export interface IBizAiSettingsSync { [key: string]: any }
        export class BizAiSettingsSync implements IBizAiSettingsSync {
            constructor(properties?: IBizAiSettingsSync);
            [key: string]: any;
            static create(properties?: IBizAiSettingsSync): BizAiSettingsSync;
            static encode(message: IBizAiSettingsSync, writer?: any): any;
            static encodeDelimited(message: IBizAiSettingsSync, writer?: any): any;
            static decode(reader: any, length?: number): BizAiSettingsSync;
            static decodeDelimited(reader: any): BizAiSettingsSync;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BizAiSettingsSync;
            static toObject(message: BizAiSettingsSync, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBusinessBroadcast { [key: string]: any }
        export class BusinessBroadcast implements IBusinessBroadcast {
            constructor(properties?: IBusinessBroadcast);
            [key: string]: any;
            static create(properties?: IBusinessBroadcast): BusinessBroadcast;
            static encode(message: IBusinessBroadcast, writer?: any): any;
            static encodeDelimited(message: IBusinessBroadcast, writer?: any): any;
            static decode(reader: any, length?: number): BusinessBroadcast;
            static decodeDelimited(reader: any): BusinessBroadcast;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessBroadcast;
            static toObject(message: BusinessBroadcast, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum ChatLockSupportLevel {
            NONE = 0,
            MINIMAL = 1,
            FULL = 2,
        }
        export interface IContactRefresh { [key: string]: any }
        export class ContactRefresh implements IContactRefresh {
            constructor(properties?: IContactRefresh);
            [key: string]: any;
            static create(properties?: IContactRefresh): ContactRefresh;
            static encode(message: IContactRefresh, writer?: any): any;
            static encodeDelimited(message: IContactRefresh, writer?: any): any;
            static decode(reader: any, length?: number): ContactRefresh;
            static decodeDelimited(reader: any): ContactRefresh;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ContactRefresh;
            static toObject(message: ContactRefresh, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILIDMigration { [key: string]: any }
        export class LIDMigration implements ILIDMigration {
            constructor(properties?: ILIDMigration);
            [key: string]: any;
            static create(properties?: ILIDMigration): LIDMigration;
            static encode(message: ILIDMigration, writer?: any): any;
            static encodeDelimited(message: ILIDMigration, writer?: any): any;
            static decode(reader: any, length?: number): LIDMigration;
            static decodeDelimited(reader: any): LIDMigration;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LIDMigration;
            static toObject(message: LIDMigration, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum MemberNameTagPrimarySupport {
            DISABLED = 0,
            RECEIVER_ENABLED = 1,
            SENDER_ENABLED = 2,
        }
        export interface IUserHasAvatar { [key: string]: any }
        export class UserHasAvatar implements IUserHasAvatar {
            constructor(properties?: IUserHasAvatar);
            [key: string]: any;
            static create(properties?: IUserHasAvatar): UserHasAvatar;
            static encode(message: IUserHasAvatar, writer?: any): any;
            static encodeDelimited(message: IUserHasAvatar, writer?: any): any;
            static decode(reader: any, length?: number): UserHasAvatar;
            static decodeDelimited(reader: any): UserHasAvatar;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UserHasAvatar;
            static toObject(message: UserHasAvatar, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IDeviceConsistencyCodeMessage { [key: string]: any }
    export class DeviceConsistencyCodeMessage implements IDeviceConsistencyCodeMessage {
        constructor(properties?: IDeviceConsistencyCodeMessage);
        [key: string]: any;
        static create(properties?: IDeviceConsistencyCodeMessage): DeviceConsistencyCodeMessage;
        static encode(message: IDeviceConsistencyCodeMessage, writer?: any): any;
        static encodeDelimited(message: IDeviceConsistencyCodeMessage, writer?: any): any;
        static decode(reader: any, length?: number): DeviceConsistencyCodeMessage;
        static decodeDelimited(reader: any): DeviceConsistencyCodeMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeviceConsistencyCodeMessage;
        static toObject(message: DeviceConsistencyCodeMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeviceListMetadata { [key: string]: any }
    export class DeviceListMetadata implements IDeviceListMetadata {
        constructor(properties?: IDeviceListMetadata);
        [key: string]: any;
        static create(properties?: IDeviceListMetadata): DeviceListMetadata;
        static encode(message: IDeviceListMetadata, writer?: any): any;
        static encodeDelimited(message: IDeviceListMetadata, writer?: any): any;
        static decode(reader: any, length?: number): DeviceListMetadata;
        static decodeDelimited(reader: any): DeviceListMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeviceListMetadata;
        static toObject(message: DeviceListMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeviceOutput { [key: string]: any }
    export class DeviceOutput implements IDeviceOutput {
        constructor(properties?: IDeviceOutput);
        [key: string]: any;
        static create(properties?: IDeviceOutput): DeviceOutput;
        static encode(message: IDeviceOutput, writer?: any): any;
        static encodeDelimited(message: IDeviceOutput, writer?: any): any;
        static decode(reader: any, length?: number): DeviceOutput;
        static decodeDelimited(reader: any): DeviceOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeviceOutput;
        static toObject(message: DeviceOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IDeviceProps { [key: string]: any }
    export class DeviceProps implements IDeviceProps {
        constructor(properties?: IDeviceProps);
        [key: string]: any;
        static create(properties?: IDeviceProps): DeviceProps;
        static encode(message: IDeviceProps, writer?: any): any;
        static encodeDelimited(message: IDeviceProps, writer?: any): any;
        static decode(reader: any, length?: number): DeviceProps;
        static decodeDelimited(reader: any): DeviceProps;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DeviceProps;
        static toObject(message: DeviceProps, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace DeviceProps {
        export interface IAppVersion { [key: string]: any }
        export class AppVersion implements IAppVersion {
            constructor(properties?: IAppVersion);
            [key: string]: any;
            static create(properties?: IAppVersion): AppVersion;
            static encode(message: IAppVersion, writer?: any): any;
            static encodeDelimited(message: IAppVersion, writer?: any): any;
            static decode(reader: any, length?: number): AppVersion;
            static decodeDelimited(reader: any): AppVersion;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppVersion;
            static toObject(message: AppVersion, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IHistorySyncConfig { [key: string]: any }
        export class HistorySyncConfig implements IHistorySyncConfig {
            constructor(properties?: IHistorySyncConfig);
            [key: string]: any;
            static create(properties?: IHistorySyncConfig): HistorySyncConfig;
            static encode(message: IHistorySyncConfig, writer?: any): any;
            static encodeDelimited(message: IHistorySyncConfig, writer?: any): any;
            static decode(reader: any, length?: number): HistorySyncConfig;
            static decodeDelimited(reader: any): HistorySyncConfig;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HistorySyncConfig;
            static toObject(message: HistorySyncConfig, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum PlatformType {
            UNKNOWN = 0,
            CHROME = 1,
            FIREFOX = 2,
            IE = 3,
            OPERA = 4,
            SAFARI = 5,
            EDGE = 6,
            DESKTOP = 7,
            IPAD = 8,
            ANDROID_TABLET = 9,
            OHANA = 10,
            ALOHA = 11,
            CATALINA = 12,
            TCL_TV = 13,
            IOS_PHONE = 14,
            IOS_CATALYST = 15,
            ANDROID_PHONE = 16,
            ANDROID_AMBIGUOUS = 17,
            WEAR_OS = 18,
            AR_WRIST = 19,
            AR_DEVICE = 20,
            UWP = 21,
            VR = 22,
            CLOUD_API = 23,
            SMARTGLASSES = 24,
            WAIL = 25,
        }
    }
    export interface IDisappearingMode { [key: string]: any }
    export class DisappearingMode implements IDisappearingMode {
        constructor(properties?: IDisappearingMode);
        [key: string]: any;
        static create(properties?: IDisappearingMode): DisappearingMode;
        static encode(message: IDisappearingMode, writer?: any): any;
        static encodeDelimited(message: IDisappearingMode, writer?: any): any;
        static decode(reader: any, length?: number): DisappearingMode;
        static decodeDelimited(reader: any): DisappearingMode;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): DisappearingMode;
        static toObject(message: DisappearingMode, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace DisappearingMode {
        export enum Initiator {
            CHANGED_IN_CHAT = 0,
            INITIATED_BY_ME = 1,
            INITIATED_BY_OTHER = 2,
            BIZ_UPGRADE_FB_HOSTING = 3,
        }
        export enum Trigger {
            UNKNOWN = 0,
            CHAT_SETTING = 1,
            ACCOUNT_SETTING = 2,
            BULK_CHANGE = 3,
            BIZ_SUPPORTS_FB_HOSTING = 4,
            UNKNOWN_GROUPS = 5,
        }
    }
    export enum EXTENDED_CONTENT_MESSAGE_CTA_BUTTON_TYPE {
        OPEN_NATIVE = 11,
    }
    export enum EXTENDED_CONTENT_MESSAGE_EXTENDED_CONTENT_TYPE {
        UNSUPPORTED = -1,
        IG_STORY_PHOTO_MENTION = 4,
        IG_SINGLE_IMAGE_POST_SHARE = 9,
        IG_MULTIPOST_SHARE = 10,
        IG_SINGLE_VIDEO_POST_SHARE = 11,
        IG_STORY_PHOTO_SHARE = 12,
        IG_STORY_VIDEO_SHARE = 13,
        IG_CLIPS_SHARE = 14,
        IG_IGTV_SHARE = 15,
        IG_SHOP_SHARE = 16,
        IG_PROFILE_SHARE = 19,
        IG_STORY_PHOTO_HIGHLIGHT_SHARE = 20,
        IG_STORY_VIDEO_HIGHLIGHT_SHARE = 21,
        IG_STORY_REPLY = 22,
        IG_STORY_REACTION = 23,
        IG_STORY_VIDEO_MENTION = 24,
        IG_STORY_HIGHLIGHT_REPLY = 25,
        IG_STORY_HIGHLIGHT_REACTION = 26,
        IG_EXTERNAL_LINK = 27,
        IG_RECEIVER_FETCH = 28,
        FB_FEED_SHARE = 1000,
        FB_STORY_REPLY = 1001,
        FB_STORY_SHARE = 1002,
        FB_STORY_MENTION = 1003,
        FB_FEED_VIDEO_SHARE = 1004,
        FB_GAMING_CUSTOM_UPDATE = 1005,
        FB_PRODUCER_STORY_REPLY = 1006,
        FB_EVENT = 1007,
        FB_FEED_POST_PRIVATE_REPLY = 1008,
        FB_SHORT = 1009,
        FB_COMMENT_MENTION_SHARE = 1010,
        FB_POST_MENTION = 1011,
        FB_PROFILE_DIRECTORY_ITEM = 1013,
        FB_FEED_POST_REACTION_REPLY = 1014,
        FB_QUICKSNAP_REPLY = 1015,
        MSG_EXTERNAL_LINK_SHARE = 2000,
        MSG_P2P_PAYMENT = 2001,
        MSG_LOCATION_SHARING = 2002,
        MSG_LOCATION_SHARING_V2 = 2003,
        MSG_HIGHLIGHTS_TAB_FRIEND_UPDATES_REPLY = 2004,
        MSG_HIGHLIGHTS_TAB_LOCAL_EVENT_REPLY = 2005,
        MSG_RECEIVER_FETCH = 2006,
        MSG_IG_MEDIA_SHARE = 2007,
        MSG_GEN_AI_SEARCH_PLUGIN_RESPONSE = 2008,
        MSG_REELS_LIST = 2009,
        MSG_CONTACT = 2010,
        MSG_THREADS_POST_SHARE = 2011,
        MSG_FILE = 2012,
        MSG_AVATAR_DETAILS = 2013,
        MSG_AI_CONTACT = 2014,
        MSG_MEMORIES_SHARE = 2015,
        MSG_SHARED_ALBUM_REPLY = 2016,
        MSG_SHARED_ALBUM = 2017,
        MSG_OCCAMADILLO_XMA = 2018,
        MSG_GEN_AI_SUBSCRIPTION = 2021,
        MSG_GEN_AI_REMINDER = 2022,
        MSG_GEN_AI_MEMU_ONBOARDING_RESPONSE = 2023,
        MSG_NOTE_REPLY = 2024,
        MSG_NOTE_MENTION = 2025,
        GEN_AI_ENTITY = 2026,
        MSG_OPG_P2P_PAYMENT = 2027,
        GEN_AI_RICH_RESPONSE = 2028,
        MSG_MUSIC_STICKER = 2029,
        MSG_PHONE_NUMBER = 2030,
        AI_ACTIVITY_SHARE = 2031,
        MSG_PRIVATE_XMA = 2032,
        MSG_SOCIAL_CUE_MEMORIES = 2033,
        MSG_MANUS_GROWTH_REFERRAL = 2060,
        MSG_MOMENT_LINK = 2061,
        MSG_HORIZON_WEEL = 2062,
        MSG_MOMENT_ADDED = 2063,
        RTC_AUDIO_CALL = 3000,
        RTC_VIDEO_CALL = 3001,
        RTC_MISSED_AUDIO_CALL = 3002,
        RTC_MISSED_VIDEO_CALL = 3003,
        RTC_GROUP_AUDIO_CALL = 3004,
        RTC_GROUP_VIDEO_CALL = 3005,
        RTC_MISSED_GROUP_AUDIO_CALL = 3006,
        RTC_MISSED_GROUP_VIDEO_CALL = 3007,
        RTC_ONGOING_AUDIO_CALL = 3008,
        RTC_ONGOING_VIDEO_CALL = 3009,
        MSG_RECEIVER_FETCH_FALLBACK = 3025,
        DATACLASS_SENDER_COPY = 4000,
    }
    export enum EXTENDED_CONTENT_MESSAGE_OVERLAY_ICON_GLYPH {
        INFO = 0,
        EYE_OFF = 1,
        NEWS_OFF = 2,
        WARNING = 3,
        PRIVATE = 4,
        NONE = 5,
        MEDIA_LABEL = 6,
        POST_COVER = 7,
        POST_LABEL = 8,
        WARNING_SCREENS = 9,
    }
    export enum EXTENDED_CONTENT_MESSAGE_XMA_DATACLASS_TYPE {
        SENDER_COPY = 0,
        SERVER = 1,
        SIGNED_CLIENT = 2,
    }
    export enum EXTENDED_CONTENT_MESSAGE_XMA_LAYOUT_TYPE {
        SINGLE = 0,
        HSCROLL = 1,
        PORTRAIT = 3,
        STANDARD_DXMA = 12,
        LIST_DXMA = 15,
        GRID = 16,
    }
    export interface IEmbeddedContent { [key: string]: any }
    export class EmbeddedContent implements IEmbeddedContent {
        constructor(properties?: IEmbeddedContent);
        [key: string]: any;
        static create(properties?: IEmbeddedContent): EmbeddedContent;
        static encode(message: IEmbeddedContent, writer?: any): any;
        static encodeDelimited(message: IEmbeddedContent, writer?: any): any;
        static decode(reader: any, length?: number): EmbeddedContent;
        static decodeDelimited(reader: any): EmbeddedContent;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EmbeddedContent;
        static toObject(message: EmbeddedContent, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEmbeddedMessage { [key: string]: any }
    export class EmbeddedMessage implements IEmbeddedMessage {
        constructor(properties?: IEmbeddedMessage);
        [key: string]: any;
        static create(properties?: IEmbeddedMessage): EmbeddedMessage;
        static encode(message: IEmbeddedMessage, writer?: any): any;
        static encodeDelimited(message: IEmbeddedMessage, writer?: any): any;
        static decode(reader: any, length?: number): EmbeddedMessage;
        static decodeDelimited(reader: any): EmbeddedMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EmbeddedMessage;
        static toObject(message: EmbeddedMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEmbeddedMusic { [key: string]: any }
    export class EmbeddedMusic implements IEmbeddedMusic {
        constructor(properties?: IEmbeddedMusic);
        [key: string]: any;
        static create(properties?: IEmbeddedMusic): EmbeddedMusic;
        static encode(message: IEmbeddedMusic, writer?: any): any;
        static encodeDelimited(message: IEmbeddedMusic, writer?: any): any;
        static decode(reader: any, length?: number): EmbeddedMusic;
        static decodeDelimited(reader: any): EmbeddedMusic;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EmbeddedMusic;
        static toObject(message: EmbeddedMusic, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEncryptMekForDistributionInput { [key: string]: any }
    export class EncryptMekForDistributionInput implements IEncryptMekForDistributionInput {
        constructor(properties?: IEncryptMekForDistributionInput);
        [key: string]: any;
        static create(properties?: IEncryptMekForDistributionInput): EncryptMekForDistributionInput;
        static encode(message: IEncryptMekForDistributionInput, writer?: any): any;
        static encodeDelimited(message: IEncryptMekForDistributionInput, writer?: any): any;
        static decode(reader: any, length?: number): EncryptMekForDistributionInput;
        static decodeDelimited(reader: any): EncryptMekForDistributionInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptMekForDistributionInput;
        static toObject(message: EncryptMekForDistributionInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace EncryptMekForDistributionInput {
        export interface IMailboxAuthKP { [key: string]: any }
        export class MailboxAuthKP implements IMailboxAuthKP {
            constructor(properties?: IMailboxAuthKP);
            [key: string]: any;
            static create(properties?: IMailboxAuthKP): MailboxAuthKP;
            static encode(message: IMailboxAuthKP, writer?: any): any;
            static encodeDelimited(message: IMailboxAuthKP, writer?: any): any;
            static decode(reader: any, length?: number): MailboxAuthKP;
            static decodeDelimited(reader: any): MailboxAuthKP;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MailboxAuthKP;
            static toObject(message: MailboxAuthKP, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IEncryptMekForDistributionResult { [key: string]: any }
    export class EncryptMekForDistributionResult implements IEncryptMekForDistributionResult {
        constructor(properties?: IEncryptMekForDistributionResult);
        [key: string]: any;
        static create(properties?: IEncryptMekForDistributionResult): EncryptMekForDistributionResult;
        static encode(message: IEncryptMekForDistributionResult, writer?: any): any;
        static encodeDelimited(message: IEncryptMekForDistributionResult, writer?: any): any;
        static decode(reader: any, length?: number): EncryptMekForDistributionResult;
        static decodeDelimited(reader: any): EncryptMekForDistributionResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptMekForDistributionResult;
        static toObject(message: EncryptMekForDistributionResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEncryptMeksForDistributionFromTransportSenderInput { [key: string]: any }
    export class EncryptMeksForDistributionFromTransportSenderInput implements IEncryptMeksForDistributionFromTransportSenderInput {
        constructor(properties?: IEncryptMeksForDistributionFromTransportSenderInput);
        [key: string]: any;
        static create(properties?: IEncryptMeksForDistributionFromTransportSenderInput): EncryptMeksForDistributionFromTransportSenderInput;
        static encode(message: IEncryptMeksForDistributionFromTransportSenderInput, writer?: any): any;
        static encodeDelimited(message: IEncryptMeksForDistributionFromTransportSenderInput, writer?: any): any;
        static decode(reader: any, length?: number): EncryptMeksForDistributionFromTransportSenderInput;
        static decodeDelimited(reader: any): EncryptMeksForDistributionFromTransportSenderInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptMeksForDistributionFromTransportSenderInput;
        static toObject(message: EncryptMeksForDistributionFromTransportSenderInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace EncryptMeksForDistributionFromTransportSenderInput {
        export interface ITransportSigningKP { [key: string]: any }
        export class TransportSigningKP implements ITransportSigningKP {
            constructor(properties?: ITransportSigningKP);
            [key: string]: any;
            static create(properties?: ITransportSigningKP): TransportSigningKP;
            static encode(message: ITransportSigningKP, writer?: any): any;
            static encodeDelimited(message: ITransportSigningKP, writer?: any): any;
            static decode(reader: any, length?: number): TransportSigningKP;
            static decodeDelimited(reader: any): TransportSigningKP;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): TransportSigningKP;
            static toObject(message: TransportSigningKP, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IEncryptMeksForDistributionFromTransportSenderResult { [key: string]: any }
    export class EncryptMeksForDistributionFromTransportSenderResult implements IEncryptMeksForDistributionFromTransportSenderResult {
        constructor(properties?: IEncryptMeksForDistributionFromTransportSenderResult);
        [key: string]: any;
        static create(properties?: IEncryptMeksForDistributionFromTransportSenderResult): EncryptMeksForDistributionFromTransportSenderResult;
        static encode(message: IEncryptMeksForDistributionFromTransportSenderResult, writer?: any): any;
        static encodeDelimited(message: IEncryptMeksForDistributionFromTransportSenderResult, writer?: any): any;
        static decode(reader: any, length?: number): EncryptMeksForDistributionFromTransportSenderResult;
        static decodeDelimited(reader: any): EncryptMeksForDistributionFromTransportSenderResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptMeksForDistributionFromTransportSenderResult;
        static toObject(message: EncryptMeksForDistributionFromTransportSenderResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEncryptMessageInput { [key: string]: any }
    export class EncryptMessageInput implements IEncryptMessageInput {
        constructor(properties?: IEncryptMessageInput);
        [key: string]: any;
        static create(properties?: IEncryptMessageInput): EncryptMessageInput;
        static encode(message: IEncryptMessageInput, writer?: any): any;
        static encodeDelimited(message: IEncryptMessageInput, writer?: any): any;
        static decode(reader: any, length?: number): EncryptMessageInput;
        static decodeDelimited(reader: any): EncryptMessageInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptMessageInput;
        static toObject(message: EncryptMessageInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEncryptMessageOutput { [key: string]: any }
    export class EncryptMessageOutput implements IEncryptMessageOutput {
        constructor(properties?: IEncryptMessageOutput);
        [key: string]: any;
        static create(properties?: IEncryptMessageOutput): EncryptMessageOutput;
        static encode(message: IEncryptMessageOutput, writer?: any): any;
        static encodeDelimited(message: IEncryptMessageOutput, writer?: any): any;
        static decode(reader: any, length?: number): EncryptMessageOutput;
        static decodeDelimited(reader: any): EncryptMessageOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptMessageOutput;
        static toObject(message: EncryptMessageOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEncryptedPairingRequest { [key: string]: any }
    export class EncryptedPairingRequest implements IEncryptedPairingRequest {
        constructor(properties?: IEncryptedPairingRequest);
        [key: string]: any;
        static create(properties?: IEncryptedPairingRequest): EncryptedPairingRequest;
        static encode(message: IEncryptedPairingRequest, writer?: any): any;
        static encodeDelimited(message: IEncryptedPairingRequest, writer?: any): any;
        static decode(reader: any, length?: number): EncryptedPairingRequest;
        static decodeDelimited(reader: any): EncryptedPairingRequest;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptedPairingRequest;
        static toObject(message: EncryptedPairingRequest, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEncryptedSecretValuesOutput { [key: string]: any }
    export class EncryptedSecretValuesOutput implements IEncryptedSecretValuesOutput {
        constructor(properties?: IEncryptedSecretValuesOutput);
        [key: string]: any;
        static create(properties?: IEncryptedSecretValuesOutput): EncryptedSecretValuesOutput;
        static encode(message: IEncryptedSecretValuesOutput, writer?: any): any;
        static encodeDelimited(message: IEncryptedSecretValuesOutput, writer?: any): any;
        static decode(reader: any, length?: number): EncryptedSecretValuesOutput;
        static decodeDelimited(reader: any): EncryptedSecretValuesOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EncryptedSecretValuesOutput;
        static toObject(message: EncryptedSecretValuesOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEphemeralSetting { [key: string]: any }
    export class EphemeralSetting implements IEphemeralSetting {
        constructor(properties?: IEphemeralSetting);
        [key: string]: any;
        static create(properties?: IEphemeralSetting): EphemeralSetting;
        static encode(message: IEphemeralSetting, writer?: any): any;
        static encodeDelimited(message: IEphemeralSetting, writer?: any): any;
        static decode(reader: any, length?: number): EphemeralSetting;
        static decodeDelimited(reader: any): EphemeralSetting;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EphemeralSetting;
        static toObject(message: EphemeralSetting, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEpoch0Output { [key: string]: any }
    export class Epoch0Output implements IEpoch0Output {
        constructor(properties?: IEpoch0Output);
        [key: string]: any;
        static create(properties?: IEpoch0Output): Epoch0Output;
        static encode(message: IEpoch0Output, writer?: any): any;
        static encodeDelimited(message: IEpoch0Output, writer?: any): any;
        static decode(reader: any, length?: number): Epoch0Output;
        static decodeDelimited(reader: any): Epoch0Output;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Epoch0Output;
        static toObject(message: Epoch0Output, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEpochPublicData { [key: string]: any }
    export class EpochPublicData implements IEpochPublicData {
        constructor(properties?: IEpochPublicData);
        [key: string]: any;
        static create(properties?: IEpochPublicData): EpochPublicData;
        static encode(message: IEpochPublicData, writer?: any): any;
        static encodeDelimited(message: IEpochPublicData, writer?: any): any;
        static decode(reader: any, length?: number): EpochPublicData;
        static decodeDelimited(reader: any): EpochPublicData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EpochPublicData;
        static toObject(message: EpochPublicData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEpochSignatures { [key: string]: any }
    export class EpochSignatures implements IEpochSignatures {
        constructor(properties?: IEpochSignatures);
        [key: string]: any;
        static create(properties?: IEpochSignatures): EpochSignatures;
        static encode(message: IEpochSignatures, writer?: any): any;
        static encodeDelimited(message: IEpochSignatures, writer?: any): any;
        static decode(reader: any, length?: number): EpochSignatures;
        static decodeDelimited(reader: any): EpochSignatures;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EpochSignatures;
        static toObject(message: EpochSignatures, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEventAdditionalMetadata { [key: string]: any }
    export class EventAdditionalMetadata implements IEventAdditionalMetadata {
        constructor(properties?: IEventAdditionalMetadata);
        [key: string]: any;
        static create(properties?: IEventAdditionalMetadata): EventAdditionalMetadata;
        static encode(message: IEventAdditionalMetadata, writer?: any): any;
        static encodeDelimited(message: IEventAdditionalMetadata, writer?: any): any;
        static decode(reader: any, length?: number): EventAdditionalMetadata;
        static decodeDelimited(reader: any): EventAdditionalMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EventAdditionalMetadata;
        static toObject(message: EventAdditionalMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IEventResponse { [key: string]: any }
    export class EventResponse implements IEventResponse {
        constructor(properties?: IEventResponse);
        [key: string]: any;
        static create(properties?: IEventResponse): EventResponse;
        static encode(message: IEventResponse, writer?: any): any;
        static encodeDelimited(message: IEventResponse, writer?: any): any;
        static decode(reader: any, length?: number): EventResponse;
        static decodeDelimited(reader: any): EventResponse;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): EventResponse;
        static toObject(message: EventResponse, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IExitCode { [key: string]: any }
    export class ExitCode implements IExitCode {
        constructor(properties?: IExitCode);
        [key: string]: any;
        static create(properties?: IExitCode): ExitCode;
        static encode(message: IExitCode, writer?: any): any;
        static encodeDelimited(message: IExitCode, writer?: any): any;
        static decode(reader: any, length?: number): ExitCode;
        static decodeDelimited(reader: any): ExitCode;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ExitCode;
        static toObject(message: ExitCode, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IExtendedContentMessage { [key: string]: any }
    export class ExtendedContentMessage implements IExtendedContentMessage {
        constructor(properties?: IExtendedContentMessage);
        [key: string]: any;
        static create(properties?: IExtendedContentMessage): ExtendedContentMessage;
        static encode(message: IExtendedContentMessage, writer?: any): any;
        static encodeDelimited(message: IExtendedContentMessage, writer?: any): any;
        static decode(reader: any, length?: number): ExtendedContentMessage;
        static decodeDelimited(reader: any): ExtendedContentMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ExtendedContentMessage;
        static toObject(message: ExtendedContentMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace ExtendedContentMessage {
        export interface ICTA { [key: string]: any }
        export class CTA implements ICTA {
            constructor(properties?: ICTA);
            [key: string]: any;
            static create(properties?: ICTA): CTA;
            static encode(message: ICTA, writer?: any): any;
            static encodeDelimited(message: ICTA, writer?: any): any;
            static decode(reader: any, length?: number): CTA;
            static decodeDelimited(reader: any): CTA;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CTA;
            static toObject(message: CTA, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IExternalBlobReference { [key: string]: any }
    export class ExternalBlobReference implements IExternalBlobReference {
        constructor(properties?: IExternalBlobReference);
        [key: string]: any;
        static create(properties?: IExternalBlobReference): ExternalBlobReference;
        static encode(message: IExternalBlobReference, writer?: any): any;
        static encodeDelimited(message: IExternalBlobReference, writer?: any): any;
        static decode(reader: any, length?: number): ExternalBlobReference;
        static decodeDelimited(reader: any): ExternalBlobReference;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ExternalBlobReference;
        static toObject(message: ExternalBlobReference, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum FUTURE_PROOF_BEHAVIOR {
        PLACEHOLDER = 0,
        NO_PLACEHOLDER = 1,
        IGNORE = 2,
    }
    export interface IField { [key: string]: any }
    export class Field implements IField {
        constructor(properties?: IField);
        [key: string]: any;
        static create(properties?: IField): Field;
        static encode(message: IField, writer?: any): any;
        static encodeDelimited(message: IField, writer?: any): any;
        static decode(reader: any, length?: number): Field;
        static decodeDelimited(reader: any): Field;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Field;
        static toObject(message: Field, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IFingerprintData { [key: string]: any }
    export class FingerprintData implements IFingerprintData {
        constructor(properties?: IFingerprintData);
        [key: string]: any;
        static create(properties?: IFingerprintData): FingerprintData;
        static encode(message: IFingerprintData, writer?: any): any;
        static encodeDelimited(message: IFingerprintData, writer?: any): any;
        static decode(reader: any, length?: number): FingerprintData;
        static decodeDelimited(reader: any): FingerprintData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): FingerprintData;
        static toObject(message: FingerprintData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IForwardedAIBotMessageInfo { [key: string]: any }
    export class ForwardedAIBotMessageInfo implements IForwardedAIBotMessageInfo {
        constructor(properties?: IForwardedAIBotMessageInfo);
        [key: string]: any;
        static create(properties?: IForwardedAIBotMessageInfo): ForwardedAIBotMessageInfo;
        static encode(message: IForwardedAIBotMessageInfo, writer?: any): any;
        static encodeDelimited(message: IForwardedAIBotMessageInfo, writer?: any): any;
        static decode(reader: any, length?: number): ForwardedAIBotMessageInfo;
        static decodeDelimited(reader: any): ForwardedAIBotMessageInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ForwardedAIBotMessageInfo;
        static toObject(message: ForwardedAIBotMessageInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGenerateMekInput { [key: string]: any }
    export class GenerateMekInput implements IGenerateMekInput {
        constructor(properties?: IGenerateMekInput);
        [key: string]: any;
        static create(properties?: IGenerateMekInput): GenerateMekInput;
        static encode(message: IGenerateMekInput, writer?: any): any;
        static encodeDelimited(message: IGenerateMekInput, writer?: any): any;
        static decode(reader: any, length?: number): GenerateMekInput;
        static decodeDelimited(reader: any): GenerateMekInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GenerateMekInput;
        static toObject(message: GenerateMekInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGenerateMekResult { [key: string]: any }
    export class GenerateMekResult implements IGenerateMekResult {
        constructor(properties?: IGenerateMekResult);
        [key: string]: any;
        static create(properties?: IGenerateMekResult): GenerateMekResult;
        static encode(message: IGenerateMekResult, writer?: any): any;
        static encodeDelimited(message: IGenerateMekResult, writer?: any): any;
        static decode(reader: any, length?: number): GenerateMekResult;
        static decodeDelimited(reader: any): GenerateMekResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GenerateMekResult;
        static toObject(message: GenerateMekResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGenerateMekRosterHashInput { [key: string]: any }
    export class GenerateMekRosterHashInput implements IGenerateMekRosterHashInput {
        constructor(properties?: IGenerateMekRosterHashInput);
        [key: string]: any;
        static create(properties?: IGenerateMekRosterHashInput): GenerateMekRosterHashInput;
        static encode(message: IGenerateMekRosterHashInput, writer?: any): any;
        static encodeDelimited(message: IGenerateMekRosterHashInput, writer?: any): any;
        static decode(reader: any, length?: number): GenerateMekRosterHashInput;
        static decodeDelimited(reader: any): GenerateMekRosterHashInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GenerateMekRosterHashInput;
        static toObject(message: GenerateMekRosterHashInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGenerateMekRosterHashResult { [key: string]: any }
    export class GenerateMekRosterHashResult implements IGenerateMekRosterHashResult {
        constructor(properties?: IGenerateMekRosterHashResult);
        [key: string]: any;
        static create(properties?: IGenerateMekRosterHashResult): GenerateMekRosterHashResult;
        static encode(message: IGenerateMekRosterHashResult, writer?: any): any;
        static encodeDelimited(message: IGenerateMekRosterHashResult, writer?: any): any;
        static decode(reader: any, length?: number): GenerateMekRosterHashResult;
        static decodeDelimited(reader: any): GenerateMekRosterHashResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GenerateMekRosterHashResult;
        static toObject(message: GenerateMekRosterHashResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGlobalSettings { [key: string]: any }
    export class GlobalSettings implements IGlobalSettings {
        constructor(properties?: IGlobalSettings);
        [key: string]: any;
        static create(properties?: IGlobalSettings): GlobalSettings;
        static encode(message: IGlobalSettings, writer?: any): any;
        static encodeDelimited(message: IGlobalSettings, writer?: any): any;
        static decode(reader: any, length?: number): GlobalSettings;
        static decodeDelimited(reader: any): GlobalSettings;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GlobalSettings;
        static toObject(message: GlobalSettings, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGroupHistory { [key: string]: any }
    export class GroupHistory implements IGroupHistory {
        constructor(properties?: IGroupHistory);
        [key: string]: any;
        static create(properties?: IGroupHistory): GroupHistory;
        static encode(message: IGroupHistory, writer?: any): any;
        static encodeDelimited(message: IGroupHistory, writer?: any): any;
        static decode(reader: any, length?: number): GroupHistory;
        static decodeDelimited(reader: any): GroupHistory;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupHistory;
        static toObject(message: GroupHistory, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGroupHistoryBundleInfo { [key: string]: any }
    export class GroupHistoryBundleInfo implements IGroupHistoryBundleInfo {
        constructor(properties?: IGroupHistoryBundleInfo);
        [key: string]: any;
        static create(properties?: IGroupHistoryBundleInfo): GroupHistoryBundleInfo;
        static encode(message: IGroupHistoryBundleInfo, writer?: any): any;
        static encodeDelimited(message: IGroupHistoryBundleInfo, writer?: any): any;
        static decode(reader: any, length?: number): GroupHistoryBundleInfo;
        static decodeDelimited(reader: any): GroupHistoryBundleInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupHistoryBundleInfo;
        static toObject(message: GroupHistoryBundleInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace GroupHistoryBundleInfo {
        export enum ProcessState {
            NOT_INJECTED = 0,
            INJECTED = 1,
            INJECTED_PARTIAL = 2,
            INJECTION_FAILED = 3,
            INJECTION_FAILED_NO_RETRY = 4,
            DEDUPED = 5,
        }
    }
    export interface IGroupHistoryIndividualMessageInfo { [key: string]: any }
    export class GroupHistoryIndividualMessageInfo implements IGroupHistoryIndividualMessageInfo {
        constructor(properties?: IGroupHistoryIndividualMessageInfo);
        [key: string]: any;
        static create(properties?: IGroupHistoryIndividualMessageInfo): GroupHistoryIndividualMessageInfo;
        static encode(message: IGroupHistoryIndividualMessageInfo, writer?: any): any;
        static encodeDelimited(message: IGroupHistoryIndividualMessageInfo, writer?: any): any;
        static decode(reader: any, length?: number): GroupHistoryIndividualMessageInfo;
        static decodeDelimited(reader: any): GroupHistoryIndividualMessageInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupHistoryIndividualMessageInfo;
        static toObject(message: GroupHistoryIndividualMessageInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGroupHistoryWithMessageBytes { [key: string]: any }
    export class GroupHistoryWithMessageBytes implements IGroupHistoryWithMessageBytes {
        constructor(properties?: IGroupHistoryWithMessageBytes);
        [key: string]: any;
        static create(properties?: IGroupHistoryWithMessageBytes): GroupHistoryWithMessageBytes;
        static encode(message: IGroupHistoryWithMessageBytes, writer?: any): any;
        static encodeDelimited(message: IGroupHistoryWithMessageBytes, writer?: any): any;
        static decode(reader: any, length?: number): GroupHistoryWithMessageBytes;
        static decodeDelimited(reader: any): GroupHistoryWithMessageBytes;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupHistoryWithMessageBytes;
        static toObject(message: GroupHistoryWithMessageBytes, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGroupMention { [key: string]: any }
    export class GroupMention implements IGroupMention {
        constructor(properties?: IGroupMention);
        [key: string]: any;
        static create(properties?: IGroupMention): GroupMention;
        static encode(message: IGroupMention, writer?: any): any;
        static encodeDelimited(message: IGroupMention, writer?: any): any;
        static decode(reader: any, length?: number): GroupMention;
        static decodeDelimited(reader: any): GroupMention;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupMention;
        static toObject(message: GroupMention, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGroupParticipant { [key: string]: any }
    export class GroupParticipant implements IGroupParticipant {
        constructor(properties?: IGroupParticipant);
        [key: string]: any;
        static create(properties?: IGroupParticipant): GroupParticipant;
        static encode(message: IGroupParticipant, writer?: any): any;
        static encodeDelimited(message: IGroupParticipant, writer?: any): any;
        static decode(reader: any, length?: number): GroupParticipant;
        static decodeDelimited(reader: any): GroupParticipant;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupParticipant;
        static toObject(message: GroupParticipant, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace GroupParticipant {
        export enum Rank {
            REGULAR = 0,
            ADMIN = 1,
            SUPERADMIN = 2,
        }
    }
    export interface IGroupRootKeyShare { [key: string]: any }
    export class GroupRootKeyShare implements IGroupRootKeyShare {
        constructor(properties?: IGroupRootKeyShare);
        [key: string]: any;
        static create(properties?: IGroupRootKeyShare): GroupRootKeyShare;
        static encode(message: IGroupRootKeyShare, writer?: any): any;
        static encodeDelimited(message: IGroupRootKeyShare, writer?: any): any;
        static decode(reader: any, length?: number): GroupRootKeyShare;
        static decodeDelimited(reader: any): GroupRootKeyShare;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupRootKeyShare;
        static toObject(message: GroupRootKeyShare, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IGroupRootKeyShareEntry { [key: string]: any }
    export class GroupRootKeyShareEntry implements IGroupRootKeyShareEntry {
        constructor(properties?: IGroupRootKeyShareEntry);
        [key: string]: any;
        static create(properties?: IGroupRootKeyShareEntry): GroupRootKeyShareEntry;
        static encode(message: IGroupRootKeyShareEntry, writer?: any): any;
        static encodeDelimited(message: IGroupRootKeyShareEntry, writer?: any): any;
        static decode(reader: any, length?: number): GroupRootKeyShareEntry;
        static decodeDelimited(reader: any): GroupRootKeyShareEntry;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): GroupRootKeyShareEntry;
        static toObject(message: GroupRootKeyShareEntry, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IHandshakeMessage { [key: string]: any }
    export class HandshakeMessage implements IHandshakeMessage {
        constructor(properties?: IHandshakeMessage);
        [key: string]: any;
        static create(properties?: IHandshakeMessage): HandshakeMessage;
        static encode(message: IHandshakeMessage, writer?: any): any;
        static encodeDelimited(message: IHandshakeMessage, writer?: any): any;
        static decode(reader: any, length?: number): HandshakeMessage;
        static decodeDelimited(reader: any): HandshakeMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): HandshakeMessage;
        static toObject(message: HandshakeMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace HandshakeMessage {
        export interface IClientFinish { [key: string]: any }
        export class ClientFinish implements IClientFinish {
            constructor(properties?: IClientFinish);
            [key: string]: any;
            static create(properties?: IClientFinish): ClientFinish;
            static encode(message: IClientFinish, writer?: any): any;
            static encodeDelimited(message: IClientFinish, writer?: any): any;
            static decode(reader: any, length?: number): ClientFinish;
            static decodeDelimited(reader: any): ClientFinish;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ClientFinish;
            static toObject(message: ClientFinish, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IClientHello { [key: string]: any }
        export class ClientHello implements IClientHello {
            constructor(properties?: IClientHello);
            [key: string]: any;
            static create(properties?: IClientHello): ClientHello;
            static encode(message: IClientHello, writer?: any): any;
            static encodeDelimited(message: IClientHello, writer?: any): any;
            static decode(reader: any, length?: number): ClientHello;
            static decodeDelimited(reader: any): ClientHello;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ClientHello;
            static toObject(message: ClientHello, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum HandshakePqMode {
            HANDSHAKE_PQ_MODE_UNKNOWN = 0,
            XXKEM = 1,
            XXKEM_FS = 2,
            XXKEM_EPH = 9,
            WA_CLASSICAL = 3,
            WA_PQ = 4,
            IKKEM = 5,
            IKKEM_FS = 6,
            XXKEM_2 = 7,
            IKKEM_2 = 8,
        }
        export interface IServerHello { [key: string]: any }
        export class ServerHello implements IServerHello {
            constructor(properties?: IServerHello);
            [key: string]: any;
            static create(properties?: IServerHello): ServerHello;
            static encode(message: IServerHello, writer?: any): any;
            static encodeDelimited(message: IServerHello, writer?: any): any;
            static decode(reader: any, length?: number): ServerHello;
            static decodeDelimited(reader: any): ServerHello;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ServerHello;
            static toObject(message: ServerHello, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IHatchMetadataSync { [key: string]: any }
    export class HatchMetadataSync implements IHatchMetadataSync {
        constructor(properties?: IHatchMetadataSync);
        [key: string]: any;
        static create(properties?: IHatchMetadataSync): HatchMetadataSync;
        static encode(message: IHatchMetadataSync, writer?: any): any;
        static encodeDelimited(message: IHatchMetadataSync, writer?: any): any;
        static decode(reader: any, length?: number): HatchMetadataSync;
        static decodeDelimited(reader: any): HatchMetadataSync;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): HatchMetadataSync;
        static toObject(message: HatchMetadataSync, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IHistorySync { [key: string]: any }
    export class HistorySync implements IHistorySync {
        constructor(properties?: IHistorySync);
        [key: string]: any;
        static create(properties?: IHistorySync): HistorySync;
        static encode(message: IHistorySync, writer?: any): any;
        static encodeDelimited(message: IHistorySync, writer?: any): any;
        static decode(reader: any, length?: number): HistorySync;
        static decodeDelimited(reader: any): HistorySync;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): HistorySync;
        static toObject(message: HistorySync, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace HistorySync {
        export enum BotAIWaitListState {
            IN_WAITLIST = 0,
            AI_AVAILABLE = 1,
        }
        export enum HistorySyncType {
            INITIAL_BOOTSTRAP = 0,
            INITIAL_STATUS_V3 = 1,
            FULL = 2,
            RECENT = 3,
            PUSH_NAME = 4,
            NON_BLOCKING_DATA = 5,
            ON_DEMAND = 6,
        }
    }
    export interface IHistorySyncMsg { [key: string]: any }
    export class HistorySyncMsg implements IHistorySyncMsg {
        constructor(properties?: IHistorySyncMsg);
        [key: string]: any;
        static create(properties?: IHistorySyncMsg): HistorySyncMsg;
        static encode(message: IHistorySyncMsg, writer?: any): any;
        static encodeDelimited(message: IHistorySyncMsg, writer?: any): any;
        static decode(reader: any, length?: number): HistorySyncMsg;
        static decodeDelimited(reader: any): HistorySyncMsg;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): HistorySyncMsg;
        static toObject(message: HistorySyncMsg, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum HostedState {
        E2EE = 0,
        HOSTED = 1,
    }
    export interface IHydratedTemplateButton { [key: string]: any }
    export class HydratedTemplateButton implements IHydratedTemplateButton {
        constructor(properties?: IHydratedTemplateButton);
        [key: string]: any;
        static create(properties?: IHydratedTemplateButton): HydratedTemplateButton;
        static encode(message: IHydratedTemplateButton, writer?: any): any;
        static encodeDelimited(message: IHydratedTemplateButton, writer?: any): any;
        static decode(reader: any, length?: number): HydratedTemplateButton;
        static decodeDelimited(reader: any): HydratedTemplateButton;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): HydratedTemplateButton;
        static toObject(message: HydratedTemplateButton, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace HydratedTemplateButton {
        export interface IHydratedCallButton { [key: string]: any }
        export class HydratedCallButton implements IHydratedCallButton {
            constructor(properties?: IHydratedCallButton);
            [key: string]: any;
            static create(properties?: IHydratedCallButton): HydratedCallButton;
            static encode(message: IHydratedCallButton, writer?: any): any;
            static encodeDelimited(message: IHydratedCallButton, writer?: any): any;
            static decode(reader: any, length?: number): HydratedCallButton;
            static decodeDelimited(reader: any): HydratedCallButton;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HydratedCallButton;
            static toObject(message: HydratedCallButton, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IHydratedQuickReplyButton { [key: string]: any }
        export class HydratedQuickReplyButton implements IHydratedQuickReplyButton {
            constructor(properties?: IHydratedQuickReplyButton);
            [key: string]: any;
            static create(properties?: IHydratedQuickReplyButton): HydratedQuickReplyButton;
            static encode(message: IHydratedQuickReplyButton, writer?: any): any;
            static encodeDelimited(message: IHydratedQuickReplyButton, writer?: any): any;
            static decode(reader: any, length?: number): HydratedQuickReplyButton;
            static decodeDelimited(reader: any): HydratedQuickReplyButton;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HydratedQuickReplyButton;
            static toObject(message: HydratedQuickReplyButton, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IHydratedURLButton { [key: string]: any }
        export class HydratedURLButton implements IHydratedURLButton {
            constructor(properties?: IHydratedURLButton);
            [key: string]: any;
            static create(properties?: IHydratedURLButton): HydratedURLButton;
            static encode(message: IHydratedURLButton, writer?: any): any;
            static encodeDelimited(message: IHydratedURLButton, writer?: any): any;
            static decode(reader: any, length?: number): HydratedURLButton;
            static decodeDelimited(reader: any): HydratedURLButton;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HydratedURLButton;
            static toObject(message: HydratedURLButton, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace HydratedURLButton {
            export enum WebviewPresentationType {
                FULL = 1,
                TALL = 2,
                COMPACT = 3,
            }
        }
    }
    export interface IIdentityKeyPairStructure { [key: string]: any }
    export class IdentityKeyPairStructure implements IIdentityKeyPairStructure {
        constructor(properties?: IIdentityKeyPairStructure);
        [key: string]: any;
        static create(properties?: IIdentityKeyPairStructure): IdentityKeyPairStructure;
        static encode(message: IIdentityKeyPairStructure, writer?: any): any;
        static encodeDelimited(message: IIdentityKeyPairStructure, writer?: any): any;
        static decode(reader: any, length?: number): IdentityKeyPairStructure;
        static decodeDelimited(reader: any): IdentityKeyPairStructure;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): IdentityKeyPairStructure;
        static toObject(message: IdentityKeyPairStructure, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IIdentityVerificationState { [key: string]: any }
    export class IdentityVerificationState implements IIdentityVerificationState {
        constructor(properties?: IIdentityVerificationState);
        [key: string]: any;
        static create(properties?: IIdentityVerificationState): IdentityVerificationState;
        static encode(message: IIdentityVerificationState, writer?: any): any;
        static encodeDelimited(message: IIdentityVerificationState, writer?: any): any;
        static decode(reader: any, length?: number): IdentityVerificationState;
        static decodeDelimited(reader: any): IdentityVerificationState;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): IdentityVerificationState;
        static toObject(message: IdentityVerificationState, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IInThreadSurveyMetadata { [key: string]: any }
    export class InThreadSurveyMetadata implements IInThreadSurveyMetadata {
        constructor(properties?: IInThreadSurveyMetadata);
        [key: string]: any;
        static create(properties?: IInThreadSurveyMetadata): InThreadSurveyMetadata;
        static encode(message: IInThreadSurveyMetadata, writer?: any): any;
        static encodeDelimited(message: IInThreadSurveyMetadata, writer?: any): any;
        static decode(reader: any, length?: number): InThreadSurveyMetadata;
        static decodeDelimited(reader: any): InThreadSurveyMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): InThreadSurveyMetadata;
        static toObject(message: InThreadSurveyMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace InThreadSurveyMetadata {
        export interface IInThreadSurveyOption { [key: string]: any }
        export class InThreadSurveyOption implements IInThreadSurveyOption {
            constructor(properties?: IInThreadSurveyOption);
            [key: string]: any;
            static create(properties?: IInThreadSurveyOption): InThreadSurveyOption;
            static encode(message: IInThreadSurveyOption, writer?: any): any;
            static encodeDelimited(message: IInThreadSurveyOption, writer?: any): any;
            static decode(reader: any, length?: number): InThreadSurveyOption;
            static decodeDelimited(reader: any): InThreadSurveyOption;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InThreadSurveyOption;
            static toObject(message: InThreadSurveyOption, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IInThreadSurveyPrivacyStatementPart { [key: string]: any }
        export class InThreadSurveyPrivacyStatementPart implements IInThreadSurveyPrivacyStatementPart {
            constructor(properties?: IInThreadSurveyPrivacyStatementPart);
            [key: string]: any;
            static create(properties?: IInThreadSurveyPrivacyStatementPart): InThreadSurveyPrivacyStatementPart;
            static encode(message: IInThreadSurveyPrivacyStatementPart, writer?: any): any;
            static encodeDelimited(message: IInThreadSurveyPrivacyStatementPart, writer?: any): any;
            static decode(reader: any, length?: number): InThreadSurveyPrivacyStatementPart;
            static decodeDelimited(reader: any): InThreadSurveyPrivacyStatementPart;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InThreadSurveyPrivacyStatementPart;
            static toObject(message: InThreadSurveyPrivacyStatementPart, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IInThreadSurveyQuestion { [key: string]: any }
        export class InThreadSurveyQuestion implements IInThreadSurveyQuestion {
            constructor(properties?: IInThreadSurveyQuestion);
            [key: string]: any;
            static create(properties?: IInThreadSurveyQuestion): InThreadSurveyQuestion;
            static encode(message: IInThreadSurveyQuestion, writer?: any): any;
            static encodeDelimited(message: IInThreadSurveyQuestion, writer?: any): any;
            static decode(reader: any, length?: number): InThreadSurveyQuestion;
            static decodeDelimited(reader: any): InThreadSurveyQuestion;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InThreadSurveyQuestion;
            static toObject(message: InThreadSurveyQuestion, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IInlineContact { [key: string]: any }
    export class InlineContact implements IInlineContact {
        constructor(properties?: IInlineContact);
        [key: string]: any;
        static create(properties?: IInlineContact): InlineContact;
        static encode(message: IInlineContact, writer?: any): any;
        static encodeDelimited(message: IInlineContact, writer?: any): any;
        static decode(reader: any, length?: number): InlineContact;
        static decodeDelimited(reader: any): InlineContact;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): InlineContact;
        static toObject(message: InlineContact, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IInteractiveAnnotation { [key: string]: any }
    export class InteractiveAnnotation implements IInteractiveAnnotation {
        constructor(properties?: IInteractiveAnnotation);
        [key: string]: any;
        static create(properties?: IInteractiveAnnotation): InteractiveAnnotation;
        static encode(message: IInteractiveAnnotation, writer?: any): any;
        static encodeDelimited(message: IInteractiveAnnotation, writer?: any): any;
        static decode(reader: any, length?: number): InteractiveAnnotation;
        static decodeDelimited(reader: any): InteractiveAnnotation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): InteractiveAnnotation;
        static toObject(message: InteractiveAnnotation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace InteractiveAnnotation {
        export enum StatusLinkType {
            RASTERIZED_LINK_PREVIEW = 1,
            RASTERIZED_LINK_TRUNCATED = 2,
            RASTERIZED_LINK_FULL_URL = 3,
        }
    }
    export interface IInteractiveMessageAdditionalMetadata { [key: string]: any }
    export class InteractiveMessageAdditionalMetadata implements IInteractiveMessageAdditionalMetadata {
        constructor(properties?: IInteractiveMessageAdditionalMetadata);
        [key: string]: any;
        static create(properties?: IInteractiveMessageAdditionalMetadata): InteractiveMessageAdditionalMetadata;
        static encode(message: IInteractiveMessageAdditionalMetadata, writer?: any): any;
        static encodeDelimited(message: IInteractiveMessageAdditionalMetadata, writer?: any): any;
        static decode(reader: any, length?: number): InteractiveMessageAdditionalMetadata;
        static decodeDelimited(reader: any): InteractiveMessageAdditionalMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): InteractiveMessageAdditionalMetadata;
        static toObject(message: InteractiveMessageAdditionalMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IKeepInChat { [key: string]: any }
    export class KeepInChat implements IKeepInChat {
        constructor(properties?: IKeepInChat);
        [key: string]: any;
        static create(properties?: IKeepInChat): KeepInChat;
        static encode(message: IKeepInChat, writer?: any): any;
        static encodeDelimited(message: IKeepInChat, writer?: any): any;
        static decode(reader: any, length?: number): KeepInChat;
        static decodeDelimited(reader: any): KeepInChat;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): KeepInChat;
        static toObject(message: KeepInChat, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum KeepType {
        UNKNOWN = 0,
        KEEP_FOR_ALL = 1,
        UNDO_KEEP_FOR_ALL = 2,
    }
    export interface IKeyExchangeMessage { [key: string]: any }
    export class KeyExchangeMessage implements IKeyExchangeMessage {
        constructor(properties?: IKeyExchangeMessage);
        [key: string]: any;
        static create(properties?: IKeyExchangeMessage): KeyExchangeMessage;
        static encode(message: IKeyExchangeMessage, writer?: any): any;
        static encodeDelimited(message: IKeyExchangeMessage, writer?: any): any;
        static decode(reader: any, length?: number): KeyExchangeMessage;
        static decodeDelimited(reader: any): KeyExchangeMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): KeyExchangeMessage;
        static toObject(message: KeyExchangeMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IKeyId { [key: string]: any }
    export class KeyId implements IKeyId {
        constructor(properties?: IKeyId);
        [key: string]: any;
        static create(properties?: IKeyId): KeyId;
        static encode(message: IKeyId, writer?: any): any;
        static encodeDelimited(message: IKeyId, writer?: any): any;
        static decode(reader: any, length?: number): KeyId;
        static decodeDelimited(reader: any): KeyId;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): KeyId;
        static toObject(message: KeyId, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ILIDMigrationMappingSyncMessage { [key: string]: any }
    export class LIDMigrationMappingSyncMessage implements ILIDMigrationMappingSyncMessage {
        constructor(properties?: ILIDMigrationMappingSyncMessage);
        [key: string]: any;
        static create(properties?: ILIDMigrationMappingSyncMessage): LIDMigrationMappingSyncMessage;
        static encode(message: ILIDMigrationMappingSyncMessage, writer?: any): any;
        static encodeDelimited(message: ILIDMigrationMappingSyncMessage, writer?: any): any;
        static decode(reader: any, length?: number): LIDMigrationMappingSyncMessage;
        static decodeDelimited(reader: any): LIDMigrationMappingSyncMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): LIDMigrationMappingSyncMessage;
        static toObject(message: LIDMigrationMappingSyncMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ILIDMigrationMapping { [key: string]: any }
    export class LIDMigrationMapping implements ILIDMigrationMapping {
        constructor(properties?: ILIDMigrationMapping);
        [key: string]: any;
        static create(properties?: ILIDMigrationMapping): LIDMigrationMapping;
        static encode(message: ILIDMigrationMapping, writer?: any): any;
        static encodeDelimited(message: ILIDMigrationMapping, writer?: any): any;
        static decode(reader: any, length?: number): LIDMigrationMapping;
        static decodeDelimited(reader: any): LIDMigrationMapping;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): LIDMigrationMapping;
        static toObject(message: LIDMigrationMapping, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ILIDMigrationMappingSyncPayload { [key: string]: any }
    export class LIDMigrationMappingSyncPayload implements ILIDMigrationMappingSyncPayload {
        constructor(properties?: ILIDMigrationMappingSyncPayload);
        [key: string]: any;
        static create(properties?: ILIDMigrationMappingSyncPayload): LIDMigrationMappingSyncPayload;
        static encode(message: ILIDMigrationMappingSyncPayload, writer?: any): any;
        static encodeDelimited(message: ILIDMigrationMappingSyncPayload, writer?: any): any;
        static decode(reader: any, length?: number): LIDMigrationMappingSyncPayload;
        static decodeDelimited(reader: any): LIDMigrationMappingSyncPayload;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): LIDMigrationMappingSyncPayload;
        static toObject(message: LIDMigrationMappingSyncPayload, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ILabyrinthWaCommand { [key: string]: any }
    export class LabyrinthWaCommand implements ILabyrinthWaCommand {
        constructor(properties?: ILabyrinthWaCommand);
        [key: string]: any;
        static create(properties?: ILabyrinthWaCommand): LabyrinthWaCommand;
        static encode(message: ILabyrinthWaCommand, writer?: any): any;
        static encodeDelimited(message: ILabyrinthWaCommand, writer?: any): any;
        static decode(reader: any, length?: number): LabyrinthWaCommand;
        static decodeDelimited(reader: any): LabyrinthWaCommand;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): LabyrinthWaCommand;
        static toObject(message: LabyrinthWaCommand, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ILegacyMessage { [key: string]: any }
    export class LegacyMessage implements ILegacyMessage {
        constructor(properties?: ILegacyMessage);
        [key: string]: any;
        static create(properties?: ILegacyMessage): LegacyMessage;
        static encode(message: ILegacyMessage, writer?: any): any;
        static encodeDelimited(message: ILegacyMessage, writer?: any): any;
        static decode(reader: any, length?: number): LegacyMessage;
        static decodeDelimited(reader: any): LegacyMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): LegacyMessage;
        static toObject(message: LegacyMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ILimitSharing { [key: string]: any }
    export class LimitSharing implements ILimitSharing {
        constructor(properties?: ILimitSharing);
        [key: string]: any;
        static create(properties?: ILimitSharing): LimitSharing;
        static encode(message: ILimitSharing, writer?: any): any;
        static encodeDelimited(message: ILimitSharing, writer?: any): any;
        static decode(reader: any, length?: number): LimitSharing;
        static decodeDelimited(reader: any): LimitSharing;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): LimitSharing;
        static toObject(message: LimitSharing, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace LimitSharing {
        export enum TriggerType {
            UNKNOWN = 0,
            CHAT_SETTING = 1,
            BIZ_SUPPORTS_FB_HOSTING = 2,
            UNKNOWN_GROUP = 3,
        }
    }
    export interface ILocalizedName { [key: string]: any }
    export class LocalizedName implements ILocalizedName {
        constructor(properties?: ILocalizedName);
        [key: string]: any;
        static create(properties?: ILocalizedName): LocalizedName;
        static encode(message: ILocalizedName, writer?: any): any;
        static encodeDelimited(message: ILocalizedName, writer?: any): any;
        static decode(reader: any, length?: number): LocalizedName;
        static decodeDelimited(reader: any): LocalizedName;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): LocalizedName;
        static toObject(message: LocalizedName, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ILocation { [key: string]: any }
    export class Location implements ILocation {
        constructor(properties?: ILocation);
        [key: string]: any;
        static create(properties?: ILocation): Location;
        static encode(message: ILocation, writer?: any): any;
        static encodeDelimited(message: ILocation, writer?: any): any;
        static decode(reader: any, length?: number): Location;
        static decodeDelimited(reader: any): Location;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Location;
        static toObject(message: Location, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum MENTION_MENTION_TYPE {
        PROFILE = 0,
    }
    export interface IMandrakeDecryptMekInput { [key: string]: any }
    export class MandrakeDecryptMekInput implements IMandrakeDecryptMekInput {
        constructor(properties?: IMandrakeDecryptMekInput);
        [key: string]: any;
        static create(properties?: IMandrakeDecryptMekInput): MandrakeDecryptMekInput;
        static encode(message: IMandrakeDecryptMekInput, writer?: any): any;
        static encodeDelimited(message: IMandrakeDecryptMekInput, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeDecryptMekInput;
        static decodeDelimited(reader: any): MandrakeDecryptMekInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeDecryptMekInput;
        static toObject(message: MandrakeDecryptMekInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MandrakeDecryptMekInput {
        export interface IEpochSenderPublicData { [key: string]: any }
        export class EpochSenderPublicData implements IEpochSenderPublicData {
            constructor(properties?: IEpochSenderPublicData);
            [key: string]: any;
            static create(properties?: IEpochSenderPublicData): EpochSenderPublicData;
            static encode(message: IEpochSenderPublicData, writer?: any): any;
            static encodeDelimited(message: IEpochSenderPublicData, writer?: any): any;
            static decode(reader: any, length?: number): EpochSenderPublicData;
            static decodeDelimited(reader: any): EpochSenderPublicData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EpochSenderPublicData;
            static toObject(message: EpochSenderPublicData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMmkSenderPublicData { [key: string]: any }
        export class MmkSenderPublicData implements IMmkSenderPublicData {
            constructor(properties?: IMmkSenderPublicData);
            [key: string]: any;
            static create(properties?: IMmkSenderPublicData): MmkSenderPublicData;
            static encode(message: IMmkSenderPublicData, writer?: any): any;
            static encodeDelimited(message: IMmkSenderPublicData, writer?: any): any;
            static decode(reader: any, length?: number): MmkSenderPublicData;
            static decodeDelimited(reader: any): MmkSenderPublicData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MmkSenderPublicData;
            static toObject(message: MmkSenderPublicData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPrecomputedEpochSenderPublicData { [key: string]: any }
        export class PrecomputedEpochSenderPublicData implements IPrecomputedEpochSenderPublicData {
            constructor(properties?: IPrecomputedEpochSenderPublicData);
            [key: string]: any;
            static create(properties?: IPrecomputedEpochSenderPublicData): PrecomputedEpochSenderPublicData;
            static encode(message: IPrecomputedEpochSenderPublicData, writer?: any): any;
            static encodeDelimited(message: IPrecomputedEpochSenderPublicData, writer?: any): any;
            static decode(reader: any, length?: number): PrecomputedEpochSenderPublicData;
            static decodeDelimited(reader: any): PrecomputedEpochSenderPublicData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PrecomputedEpochSenderPublicData;
            static toObject(message: PrecomputedEpochSenderPublicData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IMandrakeDecryptMekResult { [key: string]: any }
    export class MandrakeDecryptMekResult implements IMandrakeDecryptMekResult {
        constructor(properties?: IMandrakeDecryptMekResult);
        [key: string]: any;
        static create(properties?: IMandrakeDecryptMekResult): MandrakeDecryptMekResult;
        static encode(message: IMandrakeDecryptMekResult, writer?: any): any;
        static encodeDelimited(message: IMandrakeDecryptMekResult, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeDecryptMekResult;
        static decodeDelimited(reader: any): MandrakeDecryptMekResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeDecryptMekResult;
        static toObject(message: MandrakeDecryptMekResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeDecryptMekSuccess { [key: string]: any }
    export class MandrakeDecryptMekSuccess implements IMandrakeDecryptMekSuccess {
        constructor(properties?: IMandrakeDecryptMekSuccess);
        [key: string]: any;
        static create(properties?: IMandrakeDecryptMekSuccess): MandrakeDecryptMekSuccess;
        static encode(message: IMandrakeDecryptMekSuccess, writer?: any): any;
        static encodeDelimited(message: IMandrakeDecryptMekSuccess, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeDecryptMekSuccess;
        static decodeDelimited(reader: any): MandrakeDecryptMekSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeDecryptMekSuccess;
        static toObject(message: MandrakeDecryptMekSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeEncryptMekInput { [key: string]: any }
    export class MandrakeEncryptMekInput implements IMandrakeEncryptMekInput {
        constructor(properties?: IMandrakeEncryptMekInput);
        [key: string]: any;
        static create(properties?: IMandrakeEncryptMekInput): MandrakeEncryptMekInput;
        static encode(message: IMandrakeEncryptMekInput, writer?: any): any;
        static encodeDelimited(message: IMandrakeEncryptMekInput, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeEncryptMekInput;
        static decodeDelimited(reader: any): MandrakeEncryptMekInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeEncryptMekInput;
        static toObject(message: MandrakeEncryptMekInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MandrakeEncryptMekInput {
        export interface IDetachedDeviceSender { [key: string]: any }
        export class DetachedDeviceSender implements IDetachedDeviceSender {
            constructor(properties?: IDetachedDeviceSender);
            [key: string]: any;
            static create(properties?: IDetachedDeviceSender): DetachedDeviceSender;
            static encode(message: IDetachedDeviceSender, writer?: any): any;
            static encodeDelimited(message: IDetachedDeviceSender, writer?: any): any;
            static decode(reader: any, length?: number): DetachedDeviceSender;
            static decodeDelimited(reader: any): DetachedDeviceSender;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DetachedDeviceSender;
            static toObject(message: DetachedDeviceSender, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEpochSender { [key: string]: any }
        export class EpochSender implements IEpochSender {
            constructor(properties?: IEpochSender);
            [key: string]: any;
            static create(properties?: IEpochSender): EpochSender;
            static encode(message: IEpochSender, writer?: any): any;
            static encodeDelimited(message: IEpochSender, writer?: any): any;
            static decode(reader: any, length?: number): EpochSender;
            static decodeDelimited(reader: any): EpochSender;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EpochSender;
            static toObject(message: EpochSender, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMmkSender { [key: string]: any }
        export class MmkSender implements IMmkSender {
            constructor(properties?: IMmkSender);
            [key: string]: any;
            static create(properties?: IMmkSender): MmkSender;
            static encode(message: IMmkSender, writer?: any): any;
            static encodeDelimited(message: IMmkSender, writer?: any): any;
            static decode(reader: any, length?: number): MmkSender;
            static decodeDelimited(reader: any): MmkSender;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MmkSender;
            static toObject(message: MmkSender, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IMandrakeEncryptMekResult { [key: string]: any }
    export class MandrakeEncryptMekResult implements IMandrakeEncryptMekResult {
        constructor(properties?: IMandrakeEncryptMekResult);
        [key: string]: any;
        static create(properties?: IMandrakeEncryptMekResult): MandrakeEncryptMekResult;
        static encode(message: IMandrakeEncryptMekResult, writer?: any): any;
        static encodeDelimited(message: IMandrakeEncryptMekResult, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeEncryptMekResult;
        static decodeDelimited(reader: any): MandrakeEncryptMekResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeEncryptMekResult;
        static toObject(message: MandrakeEncryptMekResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeEncryptMekSuccess { [key: string]: any }
    export class MandrakeEncryptMekSuccess implements IMandrakeEncryptMekSuccess {
        constructor(properties?: IMandrakeEncryptMekSuccess);
        [key: string]: any;
        static create(properties?: IMandrakeEncryptMekSuccess): MandrakeEncryptMekSuccess;
        static encode(message: IMandrakeEncryptMekSuccess, writer?: any): any;
        static encodeDelimited(message: IMandrakeEncryptMekSuccess, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeEncryptMekSuccess;
        static decodeDelimited(reader: any): MandrakeEncryptMekSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeEncryptMekSuccess;
        static toObject(message: MandrakeEncryptMekSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MandrakeEncryptMekSuccess {
        export interface IMekDistributionSingleRecipient { [key: string]: any }
        export class MekDistributionSingleRecipient implements IMekDistributionSingleRecipient {
            constructor(properties?: IMekDistributionSingleRecipient);
            [key: string]: any;
            static create(properties?: IMekDistributionSingleRecipient): MekDistributionSingleRecipient;
            static encode(message: IMekDistributionSingleRecipient, writer?: any): any;
            static encodeDelimited(message: IMekDistributionSingleRecipient, writer?: any): any;
            static decode(reader: any, length?: number): MekDistributionSingleRecipient;
            static decodeDelimited(reader: any): MekDistributionSingleRecipient;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MekDistributionSingleRecipient;
            static toObject(message: MekDistributionSingleRecipient, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IMandrakeMekBundle { [key: string]: any }
    export class MandrakeMekBundle implements IMandrakeMekBundle {
        constructor(properties?: IMandrakeMekBundle);
        [key: string]: any;
        static create(properties?: IMandrakeMekBundle): MandrakeMekBundle;
        static encode(message: IMandrakeMekBundle, writer?: any): any;
        static encodeDelimited(message: IMandrakeMekBundle, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeMekBundle;
        static decodeDelimited(reader: any): MandrakeMekBundle;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeMekBundle;
        static toObject(message: MandrakeMekBundle, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeOpenEpochInput { [key: string]: any }
    export class MandrakeOpenEpochInput implements IMandrakeOpenEpochInput {
        constructor(properties?: IMandrakeOpenEpochInput);
        [key: string]: any;
        static create(properties?: IMandrakeOpenEpochInput): MandrakeOpenEpochInput;
        static encode(message: IMandrakeOpenEpochInput, writer?: any): any;
        static encodeDelimited(message: IMandrakeOpenEpochInput, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeOpenEpochInput;
        static decodeDelimited(reader: any): MandrakeOpenEpochInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeOpenEpochInput;
        static toObject(message: MandrakeOpenEpochInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeOpenEpochResult { [key: string]: any }
    export class MandrakeOpenEpochResult implements IMandrakeOpenEpochResult {
        constructor(properties?: IMandrakeOpenEpochResult);
        [key: string]: any;
        static create(properties?: IMandrakeOpenEpochResult): MandrakeOpenEpochResult;
        static encode(message: IMandrakeOpenEpochResult, writer?: any): any;
        static encodeDelimited(message: IMandrakeOpenEpochResult, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeOpenEpochResult;
        static decodeDelimited(reader: any): MandrakeOpenEpochResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeOpenEpochResult;
        static toObject(message: MandrakeOpenEpochResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeOpenEpochSuccess { [key: string]: any }
    export class MandrakeOpenEpochSuccess implements IMandrakeOpenEpochSuccess {
        constructor(properties?: IMandrakeOpenEpochSuccess);
        [key: string]: any;
        static create(properties?: IMandrakeOpenEpochSuccess): MandrakeOpenEpochSuccess;
        static encode(message: IMandrakeOpenEpochSuccess, writer?: any): any;
        static encodeDelimited(message: IMandrakeOpenEpochSuccess, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeOpenEpochSuccess;
        static decodeDelimited(reader: any): MandrakeOpenEpochSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeOpenEpochSuccess;
        static toObject(message: MandrakeOpenEpochSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeOpenInitialEpochInput { [key: string]: any }
    export class MandrakeOpenInitialEpochInput implements IMandrakeOpenInitialEpochInput {
        constructor(properties?: IMandrakeOpenInitialEpochInput);
        [key: string]: any;
        static create(properties?: IMandrakeOpenInitialEpochInput): MandrakeOpenInitialEpochInput;
        static encode(message: IMandrakeOpenInitialEpochInput, writer?: any): any;
        static encodeDelimited(message: IMandrakeOpenInitialEpochInput, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeOpenInitialEpochInput;
        static decodeDelimited(reader: any): MandrakeOpenInitialEpochInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeOpenInitialEpochInput;
        static toObject(message: MandrakeOpenInitialEpochInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeOpenInitialEpochResult { [key: string]: any }
    export class MandrakeOpenInitialEpochResult implements IMandrakeOpenInitialEpochResult {
        constructor(properties?: IMandrakeOpenInitialEpochResult);
        [key: string]: any;
        static create(properties?: IMandrakeOpenInitialEpochResult): MandrakeOpenInitialEpochResult;
        static encode(message: IMandrakeOpenInitialEpochResult, writer?: any): any;
        static encodeDelimited(message: IMandrakeOpenInitialEpochResult, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeOpenInitialEpochResult;
        static decodeDelimited(reader: any): MandrakeOpenInitialEpochResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeOpenInitialEpochResult;
        static toObject(message: MandrakeOpenInitialEpochResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeValidateNewMmkFromDetachedDeviceInput { [key: string]: any }
    export class MandrakeValidateNewMmkFromDetachedDeviceInput implements IMandrakeValidateNewMmkFromDetachedDeviceInput {
        constructor(properties?: IMandrakeValidateNewMmkFromDetachedDeviceInput);
        [key: string]: any;
        static create(properties?: IMandrakeValidateNewMmkFromDetachedDeviceInput): MandrakeValidateNewMmkFromDetachedDeviceInput;
        static encode(message: IMandrakeValidateNewMmkFromDetachedDeviceInput, writer?: any): any;
        static encodeDelimited(message: IMandrakeValidateNewMmkFromDetachedDeviceInput, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeValidateNewMmkFromDetachedDeviceInput;
        static decodeDelimited(reader: any): MandrakeValidateNewMmkFromDetachedDeviceInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeValidateNewMmkFromDetachedDeviceInput;
        static toObject(message: MandrakeValidateNewMmkFromDetachedDeviceInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeValidateNewMmkFromMailboxInput { [key: string]: any }
    export class MandrakeValidateNewMmkFromMailboxInput implements IMandrakeValidateNewMmkFromMailboxInput {
        constructor(properties?: IMandrakeValidateNewMmkFromMailboxInput);
        [key: string]: any;
        static create(properties?: IMandrakeValidateNewMmkFromMailboxInput): MandrakeValidateNewMmkFromMailboxInput;
        static encode(message: IMandrakeValidateNewMmkFromMailboxInput, writer?: any): any;
        static encodeDelimited(message: IMandrakeValidateNewMmkFromMailboxInput, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeValidateNewMmkFromMailboxInput;
        static decodeDelimited(reader: any): MandrakeValidateNewMmkFromMailboxInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeValidateNewMmkFromMailboxInput;
        static toObject(message: MandrakeValidateNewMmkFromMailboxInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMandrakeValidateNewMmkResult { [key: string]: any }
    export class MandrakeValidateNewMmkResult implements IMandrakeValidateNewMmkResult {
        constructor(properties?: IMandrakeValidateNewMmkResult);
        [key: string]: any;
        static create(properties?: IMandrakeValidateNewMmkResult): MandrakeValidateNewMmkResult;
        static encode(message: IMandrakeValidateNewMmkResult, writer?: any): any;
        static encodeDelimited(message: IMandrakeValidateNewMmkResult, writer?: any): any;
        static decode(reader: any, length?: number): MandrakeValidateNewMmkResult;
        static decodeDelimited(reader: any): MandrakeValidateNewMmkResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MandrakeValidateNewMmkResult;
        static toObject(message: MandrakeValidateNewMmkResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMediaData { [key: string]: any }
    export class MediaData implements IMediaData {
        constructor(properties?: IMediaData);
        [key: string]: any;
        static create(properties?: IMediaData): MediaData;
        static encode(message: IMediaData, writer?: any): any;
        static encodeDelimited(message: IMediaData, writer?: any): any;
        static decode(reader: any, length?: number): MediaData;
        static decodeDelimited(reader: any): MediaData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MediaData;
        static toObject(message: MediaData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMediaDomainInfo { [key: string]: any }
    export class MediaDomainInfo implements IMediaDomainInfo {
        constructor(properties?: IMediaDomainInfo);
        [key: string]: any;
        static create(properties?: IMediaDomainInfo): MediaDomainInfo;
        static encode(message: IMediaDomainInfo, writer?: any): any;
        static encodeDelimited(message: IMediaDomainInfo, writer?: any): any;
        static decode(reader: any, length?: number): MediaDomainInfo;
        static decodeDelimited(reader: any): MediaDomainInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MediaDomainInfo;
        static toObject(message: MediaDomainInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMediaEntry { [key: string]: any }
    export class MediaEntry implements IMediaEntry {
        constructor(properties?: IMediaEntry);
        [key: string]: any;
        static create(properties?: IMediaEntry): MediaEntry;
        static encode(message: IMediaEntry, writer?: any): any;
        static encodeDelimited(message: IMediaEntry, writer?: any): any;
        static decode(reader: any, length?: number): MediaEntry;
        static decodeDelimited(reader: any): MediaEntry;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MediaEntry;
        static toObject(message: MediaEntry, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MediaEntry {
        export interface IDownloadableThumbnail { [key: string]: any }
        export class DownloadableThumbnail implements IDownloadableThumbnail {
            constructor(properties?: IDownloadableThumbnail);
            [key: string]: any;
            static create(properties?: IDownloadableThumbnail): DownloadableThumbnail;
            static encode(message: IDownloadableThumbnail, writer?: any): any;
            static encodeDelimited(message: IDownloadableThumbnail, writer?: any): any;
            static decode(reader: any, length?: number): DownloadableThumbnail;
            static decodeDelimited(reader: any): DownloadableThumbnail;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DownloadableThumbnail;
            static toObject(message: DownloadableThumbnail, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IProgressiveJpegDetails { [key: string]: any }
        export class ProgressiveJpegDetails implements IProgressiveJpegDetails {
            constructor(properties?: IProgressiveJpegDetails);
            [key: string]: any;
            static create(properties?: IProgressiveJpegDetails): ProgressiveJpegDetails;
            static encode(message: IProgressiveJpegDetails, writer?: any): any;
            static encodeDelimited(message: IProgressiveJpegDetails, writer?: any): any;
            static decode(reader: any, length?: number): ProgressiveJpegDetails;
            static decodeDelimited(reader: any): ProgressiveJpegDetails;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ProgressiveJpegDetails;
            static toObject(message: ProgressiveJpegDetails, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export enum MediaKeyDomain {
        MEDIA_KEY_DOMAIN_UNKNOWN = 0,
        MEDIA_KEY_DOMAIN_E2EE = 1,
        MEDIA_KEY_DOMAIN_NON_E2EE = 2,
    }
    export interface IMediaNotifyMessage { [key: string]: any }
    export class MediaNotifyMessage implements IMediaNotifyMessage {
        constructor(properties?: IMediaNotifyMessage);
        [key: string]: any;
        static create(properties?: IMediaNotifyMessage): MediaNotifyMessage;
        static encode(message: IMediaNotifyMessage, writer?: any): any;
        static encodeDelimited(message: IMediaNotifyMessage, writer?: any): any;
        static decode(reader: any, length?: number): MediaNotifyMessage;
        static decodeDelimited(reader: any): MediaNotifyMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MediaNotifyMessage;
        static toObject(message: MediaNotifyMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMediaRetryNotification { [key: string]: any }
    export class MediaRetryNotification implements IMediaRetryNotification {
        constructor(properties?: IMediaRetryNotification);
        [key: string]: any;
        static create(properties?: IMediaRetryNotification): MediaRetryNotification;
        static encode(message: IMediaRetryNotification, writer?: any): any;
        static encodeDelimited(message: IMediaRetryNotification, writer?: any): any;
        static decode(reader: any, length?: number): MediaRetryNotification;
        static decodeDelimited(reader: any): MediaRetryNotification;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MediaRetryNotification;
        static toObject(message: MediaRetryNotification, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MediaRetryNotification {
        export enum ResultType {
            GENERAL_ERROR = 0,
            SUCCESS = 1,
            NOT_FOUND = 2,
            DECRYPTION_ERROR = 3,
        }
    }
    export enum MediaVisibility {
        DEFAULT = 0,
        OFF = 1,
        ON = 2,
    }
    export interface IMekBundle { [key: string]: any }
    export class MekBundle implements IMekBundle {
        constructor(properties?: IMekBundle);
        [key: string]: any;
        static create(properties?: IMekBundle): MekBundle;
        static encode(message: IMekBundle, writer?: any): any;
        static encodeDelimited(message: IMekBundle, writer?: any): any;
        static decode(reader: any, length?: number): MekBundle;
        static decodeDelimited(reader: any): MekBundle;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MekBundle;
        static toObject(message: MekBundle, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMemberLabel { [key: string]: any }
    export class MemberLabel implements IMemberLabel {
        constructor(properties?: IMemberLabel);
        [key: string]: any;
        static create(properties?: IMemberLabel): MemberLabel;
        static encode(message: IMemberLabel, writer?: any): any;
        static encodeDelimited(message: IMemberLabel, writer?: any): any;
        static decode(reader: any, length?: number): MemberLabel;
        static decodeDelimited(reader: any): MemberLabel;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MemberLabel;
        static toObject(message: MemberLabel, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMention { [key: string]: any }
    export class Mention implements IMention {
        constructor(properties?: IMention);
        [key: string]: any;
        static create(properties?: IMention): Mention;
        static encode(message: IMention, writer?: any): any;
        static encodeDelimited(message: IMention, writer?: any): any;
        static decode(reader: any, length?: number): Mention;
        static decodeDelimited(reader: any): Mention;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Mention;
        static toObject(message: Mention, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMerkleMembershipProof { [key: string]: any }
    export class MerkleMembershipProof implements IMerkleMembershipProof {
        constructor(properties?: IMerkleMembershipProof);
        [key: string]: any;
        static create(properties?: IMerkleMembershipProof): MerkleMembershipProof;
        static encode(message: IMerkleMembershipProof, writer?: any): any;
        static encodeDelimited(message: IMerkleMembershipProof, writer?: any): any;
        static decode(reader: any, length?: number): MerkleMembershipProof;
        static decodeDelimited(reader: any): MerkleMembershipProof;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MerkleMembershipProof;
        static toObject(message: MerkleMembershipProof, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMessage { [key: string]: any }
    export class Message implements IMessage {
        constructor(properties?: IMessage);
        [key: string]: any;
        static create(properties?: IMessage): Message;
        static encode(message: IMessage, writer?: any): any;
        static encodeDelimited(message: IMessage, writer?: any): any;
        static decode(reader: any, length?: number): Message;
        static decodeDelimited(reader: any): Message;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Message;
        static toObject(message: Message, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace Message {
        export interface IAlbumMessage { [key: string]: any }
        export class AlbumMessage implements IAlbumMessage {
            constructor(properties?: IAlbumMessage);
            [key: string]: any;
            static create(properties?: IAlbumMessage): AlbumMessage;
            static encode(message: IAlbumMessage, writer?: any): any;
            static encodeDelimited(message: IAlbumMessage, writer?: any): any;
            static decode(reader: any, length?: number): AlbumMessage;
            static decodeDelimited(reader: any): AlbumMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AlbumMessage;
            static toObject(message: AlbumMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAppStateFatalExceptionNotification { [key: string]: any }
        export class AppStateFatalExceptionNotification implements IAppStateFatalExceptionNotification {
            constructor(properties?: IAppStateFatalExceptionNotification);
            [key: string]: any;
            static create(properties?: IAppStateFatalExceptionNotification): AppStateFatalExceptionNotification;
            static encode(message: IAppStateFatalExceptionNotification, writer?: any): any;
            static encodeDelimited(message: IAppStateFatalExceptionNotification, writer?: any): any;
            static decode(reader: any, length?: number): AppStateFatalExceptionNotification;
            static decodeDelimited(reader: any): AppStateFatalExceptionNotification;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppStateFatalExceptionNotification;
            static toObject(message: AppStateFatalExceptionNotification, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAppStateSyncKey { [key: string]: any }
        export class AppStateSyncKey implements IAppStateSyncKey {
            constructor(properties?: IAppStateSyncKey);
            [key: string]: any;
            static create(properties?: IAppStateSyncKey): AppStateSyncKey;
            static encode(message: IAppStateSyncKey, writer?: any): any;
            static encodeDelimited(message: IAppStateSyncKey, writer?: any): any;
            static decode(reader: any, length?: number): AppStateSyncKey;
            static decodeDelimited(reader: any): AppStateSyncKey;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppStateSyncKey;
            static toObject(message: AppStateSyncKey, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAppStateSyncKeyData { [key: string]: any }
        export class AppStateSyncKeyData implements IAppStateSyncKeyData {
            constructor(properties?: IAppStateSyncKeyData);
            [key: string]: any;
            static create(properties?: IAppStateSyncKeyData): AppStateSyncKeyData;
            static encode(message: IAppStateSyncKeyData, writer?: any): any;
            static encodeDelimited(message: IAppStateSyncKeyData, writer?: any): any;
            static decode(reader: any, length?: number): AppStateSyncKeyData;
            static decodeDelimited(reader: any): AppStateSyncKeyData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppStateSyncKeyData;
            static toObject(message: AppStateSyncKeyData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAppStateSyncKeyFingerprint { [key: string]: any }
        export class AppStateSyncKeyFingerprint implements IAppStateSyncKeyFingerprint {
            constructor(properties?: IAppStateSyncKeyFingerprint);
            [key: string]: any;
            static create(properties?: IAppStateSyncKeyFingerprint): AppStateSyncKeyFingerprint;
            static encode(message: IAppStateSyncKeyFingerprint, writer?: any): any;
            static encodeDelimited(message: IAppStateSyncKeyFingerprint, writer?: any): any;
            static decode(reader: any, length?: number): AppStateSyncKeyFingerprint;
            static decodeDelimited(reader: any): AppStateSyncKeyFingerprint;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppStateSyncKeyFingerprint;
            static toObject(message: AppStateSyncKeyFingerprint, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAppStateSyncKeyId { [key: string]: any }
        export class AppStateSyncKeyId implements IAppStateSyncKeyId {
            constructor(properties?: IAppStateSyncKeyId);
            [key: string]: any;
            static create(properties?: IAppStateSyncKeyId): AppStateSyncKeyId;
            static encode(message: IAppStateSyncKeyId, writer?: any): any;
            static encodeDelimited(message: IAppStateSyncKeyId, writer?: any): any;
            static decode(reader: any, length?: number): AppStateSyncKeyId;
            static decodeDelimited(reader: any): AppStateSyncKeyId;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppStateSyncKeyId;
            static toObject(message: AppStateSyncKeyId, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAppStateSyncKeyRequest { [key: string]: any }
        export class AppStateSyncKeyRequest implements IAppStateSyncKeyRequest {
            constructor(properties?: IAppStateSyncKeyRequest);
            [key: string]: any;
            static create(properties?: IAppStateSyncKeyRequest): AppStateSyncKeyRequest;
            static encode(message: IAppStateSyncKeyRequest, writer?: any): any;
            static encodeDelimited(message: IAppStateSyncKeyRequest, writer?: any): any;
            static decode(reader: any, length?: number): AppStateSyncKeyRequest;
            static decodeDelimited(reader: any): AppStateSyncKeyRequest;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppStateSyncKeyRequest;
            static toObject(message: AppStateSyncKeyRequest, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAppStateSyncKeyShare { [key: string]: any }
        export class AppStateSyncKeyShare implements IAppStateSyncKeyShare {
            constructor(properties?: IAppStateSyncKeyShare);
            [key: string]: any;
            static create(properties?: IAppStateSyncKeyShare): AppStateSyncKeyShare;
            static encode(message: IAppStateSyncKeyShare, writer?: any): any;
            static encodeDelimited(message: IAppStateSyncKeyShare, writer?: any): any;
            static decode(reader: any, length?: number): AppStateSyncKeyShare;
            static decodeDelimited(reader: any): AppStateSyncKeyShare;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AppStateSyncKeyShare;
            static toObject(message: AppStateSyncKeyShare, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAudioMessage { [key: string]: any }
        export class AudioMessage implements IAudioMessage {
            constructor(properties?: IAudioMessage);
            [key: string]: any;
            static create(properties?: IAudioMessage): AudioMessage;
            static encode(message: IAudioMessage, writer?: any): any;
            static encodeDelimited(message: IAudioMessage, writer?: any): any;
            static decode(reader: any, length?: number): AudioMessage;
            static decodeDelimited(reader: any): AudioMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AudioMessage;
            static toObject(message: AudioMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBCallMessage { [key: string]: any }
        export class BCallMessage implements IBCallMessage {
            constructor(properties?: IBCallMessage);
            [key: string]: any;
            static create(properties?: IBCallMessage): BCallMessage;
            static encode(message: IBCallMessage, writer?: any): any;
            static encodeDelimited(message: IBCallMessage, writer?: any): any;
            static decode(reader: any, length?: number): BCallMessage;
            static decodeDelimited(reader: any): BCallMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BCallMessage;
            static toObject(message: BCallMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace BCallMessage {
            export enum MediaType {
                UNKNOWN = 0,
                AUDIO = 1,
                VIDEO = 2,
            }
        }
        export interface IBotHistoryShareSyncMetadata { [key: string]: any }
        export class BotHistoryShareSyncMetadata implements IBotHistoryShareSyncMetadata {
            constructor(properties?: IBotHistoryShareSyncMetadata);
            [key: string]: any;
            static create(properties?: IBotHistoryShareSyncMetadata): BotHistoryShareSyncMetadata;
            static encode(message: IBotHistoryShareSyncMetadata, writer?: any): any;
            static encodeDelimited(message: IBotHistoryShareSyncMetadata, writer?: any): any;
            static decode(reader: any, length?: number): BotHistoryShareSyncMetadata;
            static decodeDelimited(reader: any): BotHistoryShareSyncMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BotHistoryShareSyncMetadata;
            static toObject(message: BotHistoryShareSyncMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IButtonsMessage { [key: string]: any }
        export class ButtonsMessage implements IButtonsMessage {
            constructor(properties?: IButtonsMessage);
            [key: string]: any;
            static create(properties?: IButtonsMessage): ButtonsMessage;
            static encode(message: IButtonsMessage, writer?: any): any;
            static encodeDelimited(message: IButtonsMessage, writer?: any): any;
            static decode(reader: any, length?: number): ButtonsMessage;
            static decodeDelimited(reader: any): ButtonsMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ButtonsMessage;
            static toObject(message: ButtonsMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ButtonsMessage {
            export interface IButton { [key: string]: any }
            export class Button implements IButton {
                constructor(properties?: IButton);
                [key: string]: any;
                static create(properties?: IButton): Button;
                static encode(message: IButton, writer?: any): any;
                static encodeDelimited(message: IButton, writer?: any): any;
                static decode(reader: any, length?: number): Button;
                static decodeDelimited(reader: any): Button;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Button;
                static toObject(message: Button, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace Button {
                export interface IButtonText { [key: string]: any }
                export class ButtonText implements IButtonText {
                    constructor(properties?: IButtonText);
                    [key: string]: any;
                    static create(properties?: IButtonText): ButtonText;
                    static encode(message: IButtonText, writer?: any): any;
                    static encodeDelimited(message: IButtonText, writer?: any): any;
                    static decode(reader: any, length?: number): ButtonText;
                    static decodeDelimited(reader: any): ButtonText;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): ButtonText;
                    static toObject(message: ButtonText, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface INativeFlowInfo { [key: string]: any }
                export class NativeFlowInfo implements INativeFlowInfo {
                    constructor(properties?: INativeFlowInfo);
                    [key: string]: any;
                    static create(properties?: INativeFlowInfo): NativeFlowInfo;
                    static encode(message: INativeFlowInfo, writer?: any): any;
                    static encodeDelimited(message: INativeFlowInfo, writer?: any): any;
                    static decode(reader: any, length?: number): NativeFlowInfo;
                    static decodeDelimited(reader: any): NativeFlowInfo;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): NativeFlowInfo;
                    static toObject(message: NativeFlowInfo, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export enum Type {
                    UNKNOWN = 0,
                    RESPONSE = 1,
                    NATIVE_FLOW = 2,
                }
            }
            export enum HeaderType {
                UNKNOWN = 0,
                EMPTY = 1,
                TEXT = 2,
                DOCUMENT = 3,
                IMAGE = 4,
                VIDEO = 5,
                LOCATION = 6,
            }
        }
        export interface IButtonsResponseMessage { [key: string]: any }
        export class ButtonsResponseMessage implements IButtonsResponseMessage {
            constructor(properties?: IButtonsResponseMessage);
            [key: string]: any;
            static create(properties?: IButtonsResponseMessage): ButtonsResponseMessage;
            static encode(message: IButtonsResponseMessage, writer?: any): any;
            static encodeDelimited(message: IButtonsResponseMessage, writer?: any): any;
            static decode(reader: any, length?: number): ButtonsResponseMessage;
            static decodeDelimited(reader: any): ButtonsResponseMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ButtonsResponseMessage;
            static toObject(message: ButtonsResponseMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ButtonsResponseMessage {
            export enum Type {
                UNKNOWN = 0,
                DISPLAY_TEXT = 1,
            }
        }
        export interface ICall { [key: string]: any }
        export class Call implements ICall {
            constructor(properties?: ICall);
            [key: string]: any;
            static create(properties?: ICall): Call;
            static encode(message: ICall, writer?: any): any;
            static encodeDelimited(message: ICall, writer?: any): any;
            static decode(reader: any, length?: number): Call;
            static decodeDelimited(reader: any): Call;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Call;
            static toObject(message: Call, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICallLogMessage { [key: string]: any }
        export class CallLogMessage implements ICallLogMessage {
            constructor(properties?: ICallLogMessage);
            [key: string]: any;
            static create(properties?: ICallLogMessage): CallLogMessage;
            static encode(message: ICallLogMessage, writer?: any): any;
            static encodeDelimited(message: ICallLogMessage, writer?: any): any;
            static decode(reader: any, length?: number): CallLogMessage;
            static decodeDelimited(reader: any): CallLogMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CallLogMessage;
            static toObject(message: CallLogMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace CallLogMessage {
            export enum CallOutcome {
                CONNECTED = 0,
                MISSED = 1,
                FAILED = 2,
                REJECTED = 3,
                ACCEPTED_ELSEWHERE = 4,
                ONGOING = 5,
                SILENCED_BY_DND = 6,
                SILENCED_UNKNOWN_CALLER = 7,
            }
            export interface ICallParticipant { [key: string]: any }
            export class CallParticipant implements ICallParticipant {
                constructor(properties?: ICallParticipant);
                [key: string]: any;
                static create(properties?: ICallParticipant): CallParticipant;
                static encode(message: ICallParticipant, writer?: any): any;
                static encodeDelimited(message: ICallParticipant, writer?: any): any;
                static decode(reader: any, length?: number): CallParticipant;
                static decodeDelimited(reader: any): CallParticipant;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CallParticipant;
                static toObject(message: CallParticipant, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export enum CallType {
                REGULAR = 0,
                SCHEDULED_CALL = 1,
                VOICE_CHAT = 2,
            }
        }
        export interface ICancelPaymentRequestMessage { [key: string]: any }
        export class CancelPaymentRequestMessage implements ICancelPaymentRequestMessage {
            constructor(properties?: ICancelPaymentRequestMessage);
            [key: string]: any;
            static create(properties?: ICancelPaymentRequestMessage): CancelPaymentRequestMessage;
            static encode(message: ICancelPaymentRequestMessage, writer?: any): any;
            static encodeDelimited(message: ICancelPaymentRequestMessage, writer?: any): any;
            static decode(reader: any, length?: number): CancelPaymentRequestMessage;
            static decodeDelimited(reader: any): CancelPaymentRequestMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CancelPaymentRequestMessage;
            static toObject(message: CancelPaymentRequestMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChat { [key: string]: any }
        export class Chat implements IChat {
            constructor(properties?: IChat);
            [key: string]: any;
            static create(properties?: IChat): Chat;
            static encode(message: IChat, writer?: any): any;
            static encodeDelimited(message: IChat, writer?: any): any;
            static decode(reader: any, length?: number): Chat;
            static decodeDelimited(reader: any): Chat;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Chat;
            static toObject(message: Chat, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChatCustomImageWallpaper { [key: string]: any }
        export class ChatCustomImageWallpaper implements IChatCustomImageWallpaper {
            constructor(properties?: IChatCustomImageWallpaper);
            [key: string]: any;
            static create(properties?: IChatCustomImageWallpaper): ChatCustomImageWallpaper;
            static encode(message: IChatCustomImageWallpaper, writer?: any): any;
            static encodeDelimited(message: IChatCustomImageWallpaper, writer?: any): any;
            static decode(reader: any, length?: number): ChatCustomImageWallpaper;
            static decodeDelimited(reader: any): ChatCustomImageWallpaper;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatCustomImageWallpaper;
            static toObject(message: ChatCustomImageWallpaper, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChatDefaultWallpaper { [key: string]: any }
        export class ChatDefaultWallpaper implements IChatDefaultWallpaper {
            constructor(properties?: IChatDefaultWallpaper);
            [key: string]: any;
            static create(properties?: IChatDefaultWallpaper): ChatDefaultWallpaper;
            static encode(message: IChatDefaultWallpaper, writer?: any): any;
            static encodeDelimited(message: IChatDefaultWallpaper, writer?: any): any;
            static decode(reader: any, length?: number): ChatDefaultWallpaper;
            static decodeDelimited(reader: any): ChatDefaultWallpaper;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatDefaultWallpaper;
            static toObject(message: ChatDefaultWallpaper, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChatSolidColorWallpaper { [key: string]: any }
        export class ChatSolidColorWallpaper implements IChatSolidColorWallpaper {
            constructor(properties?: IChatSolidColorWallpaper);
            [key: string]: any;
            static create(properties?: IChatSolidColorWallpaper): ChatSolidColorWallpaper;
            static encode(message: IChatSolidColorWallpaper, writer?: any): any;
            static encodeDelimited(message: IChatSolidColorWallpaper, writer?: any): any;
            static decode(reader: any, length?: number): ChatSolidColorWallpaper;
            static decodeDelimited(reader: any): ChatSolidColorWallpaper;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatSolidColorWallpaper;
            static toObject(message: ChatSolidColorWallpaper, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChatStockImageWallpaper { [key: string]: any }
        export class ChatStockImageWallpaper implements IChatStockImageWallpaper {
            constructor(properties?: IChatStockImageWallpaper);
            [key: string]: any;
            static create(properties?: IChatStockImageWallpaper): ChatStockImageWallpaper;
            static encode(message: IChatStockImageWallpaper, writer?: any): any;
            static encodeDelimited(message: IChatStockImageWallpaper, writer?: any): any;
            static decode(reader: any, length?: number): ChatStockImageWallpaper;
            static decodeDelimited(reader: any): ChatStockImageWallpaper;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatStockImageWallpaper;
            static toObject(message: ChatStockImageWallpaper, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChatThemeSetting { [key: string]: any }
        export class ChatThemeSetting implements IChatThemeSetting {
            constructor(properties?: IChatThemeSetting);
            [key: string]: any;
            static create(properties?: IChatThemeSetting): ChatThemeSetting;
            static encode(message: IChatThemeSetting, writer?: any): any;
            static encodeDelimited(message: IChatThemeSetting, writer?: any): any;
            static decode(reader: any, length?: number): ChatThemeSetting;
            static decodeDelimited(reader: any): ChatThemeSetting;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatThemeSetting;
            static toObject(message: ChatThemeSetting, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICloudAPIThreadControlNotification { [key: string]: any }
        export class CloudAPIThreadControlNotification implements ICloudAPIThreadControlNotification {
            constructor(properties?: ICloudAPIThreadControlNotification);
            [key: string]: any;
            static create(properties?: ICloudAPIThreadControlNotification): CloudAPIThreadControlNotification;
            static encode(message: ICloudAPIThreadControlNotification, writer?: any): any;
            static encodeDelimited(message: ICloudAPIThreadControlNotification, writer?: any): any;
            static decode(reader: any, length?: number): CloudAPIThreadControlNotification;
            static decodeDelimited(reader: any): CloudAPIThreadControlNotification;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CloudAPIThreadControlNotification;
            static toObject(message: CloudAPIThreadControlNotification, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace CloudAPIThreadControlNotification {
            export enum CloudAPIThreadControl {
                UNKNOWN = 0,
                CONTROL_PASSED = 1,
                CONTROL_TAKEN = 2,
                INFO = 3,
            }
            export interface ICloudAPIThreadControlNotificationContent { [key: string]: any }
            export class CloudAPIThreadControlNotificationContent implements ICloudAPIThreadControlNotificationContent {
                constructor(properties?: ICloudAPIThreadControlNotificationContent);
                [key: string]: any;
                static create(properties?: ICloudAPIThreadControlNotificationContent): CloudAPIThreadControlNotificationContent;
                static encode(message: ICloudAPIThreadControlNotificationContent, writer?: any): any;
                static encodeDelimited(message: ICloudAPIThreadControlNotificationContent, writer?: any): any;
                static decode(reader: any, length?: number): CloudAPIThreadControlNotificationContent;
                static decodeDelimited(reader: any): CloudAPIThreadControlNotificationContent;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CloudAPIThreadControlNotificationContent;
                static toObject(message: CloudAPIThreadControlNotificationContent, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface ICommentMessage { [key: string]: any }
        export class CommentMessage implements ICommentMessage {
            constructor(properties?: ICommentMessage);
            [key: string]: any;
            static create(properties?: ICommentMessage): CommentMessage;
            static encode(message: ICommentMessage, writer?: any): any;
            static encodeDelimited(message: ICommentMessage, writer?: any): any;
            static decode(reader: any, length?: number): CommentMessage;
            static decodeDelimited(reader: any): CommentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CommentMessage;
            static toObject(message: CommentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IConditionalRevealMessage { [key: string]: any }
        export class ConditionalRevealMessage implements IConditionalRevealMessage {
            constructor(properties?: IConditionalRevealMessage);
            [key: string]: any;
            static create(properties?: IConditionalRevealMessage): ConditionalRevealMessage;
            static encode(message: IConditionalRevealMessage, writer?: any): any;
            static encodeDelimited(message: IConditionalRevealMessage, writer?: any): any;
            static decode(reader: any, length?: number): ConditionalRevealMessage;
            static decodeDelimited(reader: any): ConditionalRevealMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ConditionalRevealMessage;
            static toObject(message: ConditionalRevealMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ConditionalRevealMessage {
            export enum ConditionalRevealMessageType {
                UNKNOWN = 0,
                SCHEDULED_MESSAGE = 1,
            }
        }
        export interface IContactMessage { [key: string]: any }
        export class ContactMessage implements IContactMessage {
            constructor(properties?: IContactMessage);
            [key: string]: any;
            static create(properties?: IContactMessage): ContactMessage;
            static encode(message: IContactMessage, writer?: any): any;
            static encodeDelimited(message: IContactMessage, writer?: any): any;
            static decode(reader: any, length?: number): ContactMessage;
            static decodeDelimited(reader: any): ContactMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ContactMessage;
            static toObject(message: ContactMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IContactsArrayMessage { [key: string]: any }
        export class ContactsArrayMessage implements IContactsArrayMessage {
            constructor(properties?: IContactsArrayMessage);
            [key: string]: any;
            static create(properties?: IContactsArrayMessage): ContactsArrayMessage;
            static encode(message: IContactsArrayMessage, writer?: any): any;
            static encodeDelimited(message: IContactsArrayMessage, writer?: any): any;
            static decode(reader: any, length?: number): ContactsArrayMessage;
            static decodeDelimited(reader: any): ContactsArrayMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ContactsArrayMessage;
            static toObject(message: ContactsArrayMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDeclinePaymentRequestMessage { [key: string]: any }
        export class DeclinePaymentRequestMessage implements IDeclinePaymentRequestMessage {
            constructor(properties?: IDeclinePaymentRequestMessage);
            [key: string]: any;
            static create(properties?: IDeclinePaymentRequestMessage): DeclinePaymentRequestMessage;
            static encode(message: IDeclinePaymentRequestMessage, writer?: any): any;
            static encodeDelimited(message: IDeclinePaymentRequestMessage, writer?: any): any;
            static decode(reader: any, length?: number): DeclinePaymentRequestMessage;
            static decodeDelimited(reader: any): DeclinePaymentRequestMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DeclinePaymentRequestMessage;
            static toObject(message: DeclinePaymentRequestMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDeviceSentMessage { [key: string]: any }
        export class DeviceSentMessage implements IDeviceSentMessage {
            constructor(properties?: IDeviceSentMessage);
            [key: string]: any;
            static create(properties?: IDeviceSentMessage): DeviceSentMessage;
            static encode(message: IDeviceSentMessage, writer?: any): any;
            static encodeDelimited(message: IDeviceSentMessage, writer?: any): any;
            static decode(reader: any, length?: number): DeviceSentMessage;
            static decodeDelimited(reader: any): DeviceSentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DeviceSentMessage;
            static toObject(message: DeviceSentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDocumentMessage { [key: string]: any }
        export class DocumentMessage implements IDocumentMessage {
            constructor(properties?: IDocumentMessage);
            [key: string]: any;
            static create(properties?: IDocumentMessage): DocumentMessage;
            static encode(message: IDocumentMessage, writer?: any): any;
            static encodeDelimited(message: IDocumentMessage, writer?: any): any;
            static decode(reader: any, length?: number): DocumentMessage;
            static decodeDelimited(reader: any): DocumentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DocumentMessage;
            static toObject(message: DocumentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEncCommentMessage { [key: string]: any }
        export class EncCommentMessage implements IEncCommentMessage {
            constructor(properties?: IEncCommentMessage);
            [key: string]: any;
            static create(properties?: IEncCommentMessage): EncCommentMessage;
            static encode(message: IEncCommentMessage, writer?: any): any;
            static encodeDelimited(message: IEncCommentMessage, writer?: any): any;
            static decode(reader: any, length?: number): EncCommentMessage;
            static decodeDelimited(reader: any): EncCommentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EncCommentMessage;
            static toObject(message: EncCommentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEncEventResponseMessage { [key: string]: any }
        export class EncEventResponseMessage implements IEncEventResponseMessage {
            constructor(properties?: IEncEventResponseMessage);
            [key: string]: any;
            static create(properties?: IEncEventResponseMessage): EncEventResponseMessage;
            static encode(message: IEncEventResponseMessage, writer?: any): any;
            static encodeDelimited(message: IEncEventResponseMessage, writer?: any): any;
            static decode(reader: any, length?: number): EncEventResponseMessage;
            static decodeDelimited(reader: any): EncEventResponseMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EncEventResponseMessage;
            static toObject(message: EncEventResponseMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEncReactionMessage { [key: string]: any }
        export class EncReactionMessage implements IEncReactionMessage {
            constructor(properties?: IEncReactionMessage);
            [key: string]: any;
            static create(properties?: IEncReactionMessage): EncReactionMessage;
            static encode(message: IEncReactionMessage, writer?: any): any;
            static encodeDelimited(message: IEncReactionMessage, writer?: any): any;
            static decode(reader: any, length?: number): EncReactionMessage;
            static decodeDelimited(reader: any): EncReactionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EncReactionMessage;
            static toObject(message: EncReactionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEventInviteMessage { [key: string]: any }
        export class EventInviteMessage implements IEventInviteMessage {
            constructor(properties?: IEventInviteMessage);
            [key: string]: any;
            static create(properties?: IEventInviteMessage): EventInviteMessage;
            static encode(message: IEventInviteMessage, writer?: any): any;
            static encodeDelimited(message: IEventInviteMessage, writer?: any): any;
            static decode(reader: any, length?: number): EventInviteMessage;
            static decodeDelimited(reader: any): EventInviteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EventInviteMessage;
            static toObject(message: EventInviteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEventMessage { [key: string]: any }
        export class EventMessage implements IEventMessage {
            constructor(properties?: IEventMessage);
            [key: string]: any;
            static create(properties?: IEventMessage): EventMessage;
            static encode(message: IEventMessage, writer?: any): any;
            static encodeDelimited(message: IEventMessage, writer?: any): any;
            static decode(reader: any, length?: number): EventMessage;
            static decodeDelimited(reader: any): EventMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EventMessage;
            static toObject(message: EventMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IEventResponseMessage { [key: string]: any }
        export class EventResponseMessage implements IEventResponseMessage {
            constructor(properties?: IEventResponseMessage);
            [key: string]: any;
            static create(properties?: IEventResponseMessage): EventResponseMessage;
            static encode(message: IEventResponseMessage, writer?: any): any;
            static encodeDelimited(message: IEventResponseMessage, writer?: any): any;
            static decode(reader: any, length?: number): EventResponseMessage;
            static decodeDelimited(reader: any): EventResponseMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EventResponseMessage;
            static toObject(message: EventResponseMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace EventResponseMessage {
            export enum EventResponseType {
                UNKNOWN = 0,
                GOING = 1,
                NOT_GOING = 2,
                MAYBE = 3,
            }
        }
        export interface IExtendedTextMessage { [key: string]: any }
        export class ExtendedTextMessage implements IExtendedTextMessage {
            constructor(properties?: IExtendedTextMessage);
            [key: string]: any;
            static create(properties?: IExtendedTextMessage): ExtendedTextMessage;
            static encode(message: IExtendedTextMessage, writer?: any): any;
            static encodeDelimited(message: IExtendedTextMessage, writer?: any): any;
            static decode(reader: any, length?: number): ExtendedTextMessage;
            static decodeDelimited(reader: any): ExtendedTextMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ExtendedTextMessage;
            static toObject(message: ExtendedTextMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ExtendedTextMessage {
            export enum FontType {
                SYSTEM = 0,
                SYSTEM_TEXT = 1,
                FB_SCRIPT = 2,
                SYSTEM_BOLD = 6,
                MORNINGBREEZE_REGULAR = 7,
                CALISTOGA_REGULAR = 8,
                EXO2_EXTRABOLD = 9,
                COURIERPRIME_BOLD = 10,
            }
            export enum InviteLinkGroupType {
                DEFAULT = 0,
                PARENT = 1,
                SUB = 2,
                DEFAULT_SUB = 3,
            }
            export enum PreviewType {
                NONE = 0,
                VIDEO = 1,
                PLACEHOLDER = 4,
                IMAGE = 5,
                PAYMENT_LINKS = 6,
                PROFILE = 7,
            }
        }
        export interface IFullHistorySyncOnDemandConfig { [key: string]: any }
        export class FullHistorySyncOnDemandConfig implements IFullHistorySyncOnDemandConfig {
            constructor(properties?: IFullHistorySyncOnDemandConfig);
            [key: string]: any;
            static create(properties?: IFullHistorySyncOnDemandConfig): FullHistorySyncOnDemandConfig;
            static encode(message: IFullHistorySyncOnDemandConfig, writer?: any): any;
            static encodeDelimited(message: IFullHistorySyncOnDemandConfig, writer?: any): any;
            static decode(reader: any, length?: number): FullHistorySyncOnDemandConfig;
            static decodeDelimited(reader: any): FullHistorySyncOnDemandConfig;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): FullHistorySyncOnDemandConfig;
            static toObject(message: FullHistorySyncOnDemandConfig, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IFullHistorySyncOnDemandRequestMetadata { [key: string]: any }
        export class FullHistorySyncOnDemandRequestMetadata implements IFullHistorySyncOnDemandRequestMetadata {
            constructor(properties?: IFullHistorySyncOnDemandRequestMetadata);
            [key: string]: any;
            static create(properties?: IFullHistorySyncOnDemandRequestMetadata): FullHistorySyncOnDemandRequestMetadata;
            static encode(message: IFullHistorySyncOnDemandRequestMetadata, writer?: any): any;
            static encodeDelimited(message: IFullHistorySyncOnDemandRequestMetadata, writer?: any): any;
            static decode(reader: any, length?: number): FullHistorySyncOnDemandRequestMetadata;
            static decodeDelimited(reader: any): FullHistorySyncOnDemandRequestMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): FullHistorySyncOnDemandRequestMetadata;
            static toObject(message: FullHistorySyncOnDemandRequestMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IFutureProofMessage { [key: string]: any }
        export class FutureProofMessage implements IFutureProofMessage {
            constructor(properties?: IFutureProofMessage);
            [key: string]: any;
            static create(properties?: IFutureProofMessage): FutureProofMessage;
            static encode(message: IFutureProofMessage, writer?: any): any;
            static encodeDelimited(message: IFutureProofMessage, writer?: any): any;
            static decode(reader: any, length?: number): FutureProofMessage;
            static decodeDelimited(reader: any): FutureProofMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): FutureProofMessage;
            static toObject(message: FutureProofMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IGroupInviteMessage { [key: string]: any }
        export class GroupInviteMessage implements IGroupInviteMessage {
            constructor(properties?: IGroupInviteMessage);
            [key: string]: any;
            static create(properties?: IGroupInviteMessage): GroupInviteMessage;
            static encode(message: IGroupInviteMessage, writer?: any): any;
            static encodeDelimited(message: IGroupInviteMessage, writer?: any): any;
            static decode(reader: any, length?: number): GroupInviteMessage;
            static decodeDelimited(reader: any): GroupInviteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): GroupInviteMessage;
            static toObject(message: GroupInviteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace GroupInviteMessage {
            export enum GroupType {
                DEFAULT = 0,
                PARENT = 1,
            }
        }
        export interface IHighlyStructuredMessage { [key: string]: any }
        export class HighlyStructuredMessage implements IHighlyStructuredMessage {
            constructor(properties?: IHighlyStructuredMessage);
            [key: string]: any;
            static create(properties?: IHighlyStructuredMessage): HighlyStructuredMessage;
            static encode(message: IHighlyStructuredMessage, writer?: any): any;
            static encodeDelimited(message: IHighlyStructuredMessage, writer?: any): any;
            static decode(reader: any, length?: number): HighlyStructuredMessage;
            static decodeDelimited(reader: any): HighlyStructuredMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HighlyStructuredMessage;
            static toObject(message: HighlyStructuredMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace HighlyStructuredMessage {
            export interface IHSMLocalizableParameter { [key: string]: any }
            export class HSMLocalizableParameter implements IHSMLocalizableParameter {
                constructor(properties?: IHSMLocalizableParameter);
                [key: string]: any;
                static create(properties?: IHSMLocalizableParameter): HSMLocalizableParameter;
                static encode(message: IHSMLocalizableParameter, writer?: any): any;
                static encodeDelimited(message: IHSMLocalizableParameter, writer?: any): any;
                static decode(reader: any, length?: number): HSMLocalizableParameter;
                static decodeDelimited(reader: any): HSMLocalizableParameter;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): HSMLocalizableParameter;
                static toObject(message: HSMLocalizableParameter, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace HSMLocalizableParameter {
                export interface IHSMCurrency { [key: string]: any }
                export class HSMCurrency implements IHSMCurrency {
                    constructor(properties?: IHSMCurrency);
                    [key: string]: any;
                    static create(properties?: IHSMCurrency): HSMCurrency;
                    static encode(message: IHSMCurrency, writer?: any): any;
                    static encodeDelimited(message: IHSMCurrency, writer?: any): any;
                    static decode(reader: any, length?: number): HSMCurrency;
                    static decodeDelimited(reader: any): HSMCurrency;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): HSMCurrency;
                    static toObject(message: HSMCurrency, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface IHSMDateTime { [key: string]: any }
                export class HSMDateTime implements IHSMDateTime {
                    constructor(properties?: IHSMDateTime);
                    [key: string]: any;
                    static create(properties?: IHSMDateTime): HSMDateTime;
                    static encode(message: IHSMDateTime, writer?: any): any;
                    static encodeDelimited(message: IHSMDateTime, writer?: any): any;
                    static decode(reader: any, length?: number): HSMDateTime;
                    static decodeDelimited(reader: any): HSMDateTime;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): HSMDateTime;
                    static toObject(message: HSMDateTime, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export namespace HSMDateTime {
                    export interface IHSMDateTimeComponent { [key: string]: any }
                    export class HSMDateTimeComponent implements IHSMDateTimeComponent {
                        constructor(properties?: IHSMDateTimeComponent);
                        [key: string]: any;
                        static create(properties?: IHSMDateTimeComponent): HSMDateTimeComponent;
                        static encode(message: IHSMDateTimeComponent, writer?: any): any;
                        static encodeDelimited(message: IHSMDateTimeComponent, writer?: any): any;
                        static decode(reader: any, length?: number): HSMDateTimeComponent;
                        static decodeDelimited(reader: any): HSMDateTimeComponent;
                        static verify(message: { [k: string]: any }): string | null;
                        static fromObject(object: { [k: string]: any }): HSMDateTimeComponent;
                        static toObject(message: HSMDateTimeComponent, options?: any): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                    }
                    export namespace HSMDateTimeComponent {
                        export enum CalendarType {
                            GREGORIAN = 1,
                            SOLAR_HIJRI = 2,
                        }
                        export enum DayOfWeekType {
                            MONDAY = 1,
                            TUESDAY = 2,
                            WEDNESDAY = 3,
                            THURSDAY = 4,
                            FRIDAY = 5,
                            SATURDAY = 6,
                            SUNDAY = 7,
                        }
                    }
                    export interface IHSMDateTimeUnixEpoch { [key: string]: any }
                    export class HSMDateTimeUnixEpoch implements IHSMDateTimeUnixEpoch {
                        constructor(properties?: IHSMDateTimeUnixEpoch);
                        [key: string]: any;
                        static create(properties?: IHSMDateTimeUnixEpoch): HSMDateTimeUnixEpoch;
                        static encode(message: IHSMDateTimeUnixEpoch, writer?: any): any;
                        static encodeDelimited(message: IHSMDateTimeUnixEpoch, writer?: any): any;
                        static decode(reader: any, length?: number): HSMDateTimeUnixEpoch;
                        static decodeDelimited(reader: any): HSMDateTimeUnixEpoch;
                        static verify(message: { [k: string]: any }): string | null;
                        static fromObject(object: { [k: string]: any }): HSMDateTimeUnixEpoch;
                        static toObject(message: HSMDateTimeUnixEpoch, options?: any): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                    }
                }
            }
        }
        export interface IHistoryShareMessageEntry { [key: string]: any }
        export class HistoryShareMessageEntry implements IHistoryShareMessageEntry {
            constructor(properties?: IHistoryShareMessageEntry);
            [key: string]: any;
            static create(properties?: IHistoryShareMessageEntry): HistoryShareMessageEntry;
            static encode(message: IHistoryShareMessageEntry, writer?: any): any;
            static encodeDelimited(message: IHistoryShareMessageEntry, writer?: any): any;
            static decode(reader: any, length?: number): HistoryShareMessageEntry;
            static decodeDelimited(reader: any): HistoryShareMessageEntry;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HistoryShareMessageEntry;
            static toObject(message: HistoryShareMessageEntry, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IHistorySyncMessageAccessStatus { [key: string]: any }
        export class HistorySyncMessageAccessStatus implements IHistorySyncMessageAccessStatus {
            constructor(properties?: IHistorySyncMessageAccessStatus);
            [key: string]: any;
            static create(properties?: IHistorySyncMessageAccessStatus): HistorySyncMessageAccessStatus;
            static encode(message: IHistorySyncMessageAccessStatus, writer?: any): any;
            static encodeDelimited(message: IHistorySyncMessageAccessStatus, writer?: any): any;
            static decode(reader: any, length?: number): HistorySyncMessageAccessStatus;
            static decodeDelimited(reader: any): HistorySyncMessageAccessStatus;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HistorySyncMessageAccessStatus;
            static toObject(message: HistorySyncMessageAccessStatus, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IHistorySyncNotification { [key: string]: any }
        export class HistorySyncNotification implements IHistorySyncNotification {
            constructor(properties?: IHistorySyncNotification);
            [key: string]: any;
            static create(properties?: IHistorySyncNotification): HistorySyncNotification;
            static encode(message: IHistorySyncNotification, writer?: any): any;
            static encodeDelimited(message: IHistorySyncNotification, writer?: any): any;
            static decode(reader: any, length?: number): HistorySyncNotification;
            static decodeDelimited(reader: any): HistorySyncNotification;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): HistorySyncNotification;
            static toObject(message: HistorySyncNotification, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum HistorySyncType {
            INITIAL_BOOTSTRAP = 0,
            INITIAL_STATUS_V3 = 1,
            FULL = 2,
            RECENT = 3,
            PUSH_NAME = 4,
            NON_BLOCKING_DATA = 5,
            ON_DEMAND = 6,
            NO_HISTORY = 7,
            MESSAGE_ACCESS_STATUS = 8,
        }
        export interface IImageMessage { [key: string]: any }
        export class ImageMessage implements IImageMessage {
            constructor(properties?: IImageMessage);
            [key: string]: any;
            static create(properties?: IImageMessage): ImageMessage;
            static encode(message: IImageMessage, writer?: any): any;
            static encodeDelimited(message: IImageMessage, writer?: any): any;
            static decode(reader: any, length?: number): ImageMessage;
            static decodeDelimited(reader: any): ImageMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ImageMessage;
            static toObject(message: ImageMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ImageMessage {
            export enum ImageSourceType {
                USER_IMAGE = 0,
                AI_GENERATED = 1,
                AI_MODIFIED = 2,
                RASTERIZED_TEXT_STATUS = 3,
            }
        }
        export interface IInitialSecurityNotificationSettingSync { [key: string]: any }
        export class InitialSecurityNotificationSettingSync implements IInitialSecurityNotificationSettingSync {
            constructor(properties?: IInitialSecurityNotificationSettingSync);
            [key: string]: any;
            static create(properties?: IInitialSecurityNotificationSettingSync): InitialSecurityNotificationSettingSync;
            static encode(message: IInitialSecurityNotificationSettingSync, writer?: any): any;
            static encodeDelimited(message: IInitialSecurityNotificationSettingSync, writer?: any): any;
            static decode(reader: any, length?: number): InitialSecurityNotificationSettingSync;
            static decodeDelimited(reader: any): InitialSecurityNotificationSettingSync;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InitialSecurityNotificationSettingSync;
            static toObject(message: InitialSecurityNotificationSettingSync, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum InsightDeliveryState {
            SENT = 0,
            DELIVERED = 1,
            READ = 2,
            REPLIED = 3,
            QUICK_REPLIED = 4,
        }
        export interface IInteractiveMessage { [key: string]: any }
        export class InteractiveMessage implements IInteractiveMessage {
            constructor(properties?: IInteractiveMessage);
            [key: string]: any;
            static create(properties?: IInteractiveMessage): InteractiveMessage;
            static encode(message: IInteractiveMessage, writer?: any): any;
            static encodeDelimited(message: IInteractiveMessage, writer?: any): any;
            static decode(reader: any, length?: number): InteractiveMessage;
            static decodeDelimited(reader: any): InteractiveMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InteractiveMessage;
            static toObject(message: InteractiveMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace InteractiveMessage {
            export interface IBloksWidget { [key: string]: any }
            export class BloksWidget implements IBloksWidget {
                constructor(properties?: IBloksWidget);
                [key: string]: any;
                static create(properties?: IBloksWidget): BloksWidget;
                static encode(message: IBloksWidget, writer?: any): any;
                static encodeDelimited(message: IBloksWidget, writer?: any): any;
                static decode(reader: any, length?: number): BloksWidget;
                static decodeDelimited(reader: any): BloksWidget;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): BloksWidget;
                static toObject(message: BloksWidget, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IBody { [key: string]: any }
            export class Body implements IBody {
                constructor(properties?: IBody);
                [key: string]: any;
                static create(properties?: IBody): Body;
                static encode(message: IBody, writer?: any): any;
                static encodeDelimited(message: IBody, writer?: any): any;
                static decode(reader: any, length?: number): Body;
                static decodeDelimited(reader: any): Body;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Body;
                static toObject(message: Body, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface ICarouselMessage { [key: string]: any }
            export class CarouselMessage implements ICarouselMessage {
                constructor(properties?: ICarouselMessage);
                [key: string]: any;
                static create(properties?: ICarouselMessage): CarouselMessage;
                static encode(message: ICarouselMessage, writer?: any): any;
                static encodeDelimited(message: ICarouselMessage, writer?: any): any;
                static decode(reader: any, length?: number): CarouselMessage;
                static decodeDelimited(reader: any): CarouselMessage;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CarouselMessage;
                static toObject(message: CarouselMessage, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace CarouselMessage {
                export enum CarouselCardType {
                    UNKNOWN = 0,
                    HSCROLL_CARDS = 1,
                    ALBUM_IMAGE = 2,
                }
            }
            export interface ICollectionMessage { [key: string]: any }
            export class CollectionMessage implements ICollectionMessage {
                constructor(properties?: ICollectionMessage);
                [key: string]: any;
                static create(properties?: ICollectionMessage): CollectionMessage;
                static encode(message: ICollectionMessage, writer?: any): any;
                static encodeDelimited(message: ICollectionMessage, writer?: any): any;
                static decode(reader: any, length?: number): CollectionMessage;
                static decodeDelimited(reader: any): CollectionMessage;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CollectionMessage;
                static toObject(message: CollectionMessage, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IFooter { [key: string]: any }
            export class Footer implements IFooter {
                constructor(properties?: IFooter);
                [key: string]: any;
                static create(properties?: IFooter): Footer;
                static encode(message: IFooter, writer?: any): any;
                static encodeDelimited(message: IFooter, writer?: any): any;
                static decode(reader: any, length?: number): Footer;
                static decodeDelimited(reader: any): Footer;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Footer;
                static toObject(message: Footer, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IHeader { [key: string]: any }
            export class Header implements IHeader {
                constructor(properties?: IHeader);
                [key: string]: any;
                static create(properties?: IHeader): Header;
                static encode(message: IHeader, writer?: any): any;
                static encodeDelimited(message: IHeader, writer?: any): any;
                static decode(reader: any, length?: number): Header;
                static decodeDelimited(reader: any): Header;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Header;
                static toObject(message: Header, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface INativeFlowMessage { [key: string]: any }
            export class NativeFlowMessage implements INativeFlowMessage {
                constructor(properties?: INativeFlowMessage);
                [key: string]: any;
                static create(properties?: INativeFlowMessage): NativeFlowMessage;
                static encode(message: INativeFlowMessage, writer?: any): any;
                static encodeDelimited(message: INativeFlowMessage, writer?: any): any;
                static decode(reader: any, length?: number): NativeFlowMessage;
                static decodeDelimited(reader: any): NativeFlowMessage;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): NativeFlowMessage;
                static toObject(message: NativeFlowMessage, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace NativeFlowMessage {
                export interface INativeFlowButton { [key: string]: any }
                export class NativeFlowButton implements INativeFlowButton {
                    constructor(properties?: INativeFlowButton);
                    [key: string]: any;
                    static create(properties?: INativeFlowButton): NativeFlowButton;
                    static encode(message: INativeFlowButton, writer?: any): any;
                    static encodeDelimited(message: INativeFlowButton, writer?: any): any;
                    static decode(reader: any, length?: number): NativeFlowButton;
                    static decodeDelimited(reader: any): NativeFlowButton;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): NativeFlowButton;
                    static toObject(message: NativeFlowButton, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
            }
            export interface IShopMessage { [key: string]: any }
            export class ShopMessage implements IShopMessage {
                constructor(properties?: IShopMessage);
                [key: string]: any;
                static create(properties?: IShopMessage): ShopMessage;
                static encode(message: IShopMessage, writer?: any): any;
                static encodeDelimited(message: IShopMessage, writer?: any): any;
                static decode(reader: any, length?: number): ShopMessage;
                static decodeDelimited(reader: any): ShopMessage;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): ShopMessage;
                static toObject(message: ShopMessage, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace ShopMessage {
                export enum Surface {
                    UNKNOWN_SURFACE = 0,
                    FB = 1,
                    IG = 2,
                    WA = 3,
                }
            }
        }
        export interface IInteractiveResponseMessage { [key: string]: any }
        export class InteractiveResponseMessage implements IInteractiveResponseMessage {
            constructor(properties?: IInteractiveResponseMessage);
            [key: string]: any;
            static create(properties?: IInteractiveResponseMessage): InteractiveResponseMessage;
            static encode(message: IInteractiveResponseMessage, writer?: any): any;
            static encodeDelimited(message: IInteractiveResponseMessage, writer?: any): any;
            static decode(reader: any, length?: number): InteractiveResponseMessage;
            static decodeDelimited(reader: any): InteractiveResponseMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InteractiveResponseMessage;
            static toObject(message: InteractiveResponseMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace InteractiveResponseMessage {
            export interface IBody { [key: string]: any }
            export class Body implements IBody {
                constructor(properties?: IBody);
                [key: string]: any;
                static create(properties?: IBody): Body;
                static encode(message: IBody, writer?: any): any;
                static encodeDelimited(message: IBody, writer?: any): any;
                static decode(reader: any, length?: number): Body;
                static decodeDelimited(reader: any): Body;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Body;
                static toObject(message: Body, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace Body {
                export enum Format {
                    DEFAULT = 0,
                    EXTENSIONS_1 = 1,
                }
            }
            export interface INativeFlowResponseMessage { [key: string]: any }
            export class NativeFlowResponseMessage implements INativeFlowResponseMessage {
                constructor(properties?: INativeFlowResponseMessage);
                [key: string]: any;
                static create(properties?: INativeFlowResponseMessage): NativeFlowResponseMessage;
                static encode(message: INativeFlowResponseMessage, writer?: any): any;
                static encodeDelimited(message: INativeFlowResponseMessage, writer?: any): any;
                static decode(reader: any, length?: number): NativeFlowResponseMessage;
                static decodeDelimited(reader: any): NativeFlowResponseMessage;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): NativeFlowResponseMessage;
                static toObject(message: NativeFlowResponseMessage, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IInvoiceMessage { [key: string]: any }
        export class InvoiceMessage implements IInvoiceMessage {
            constructor(properties?: IInvoiceMessage);
            [key: string]: any;
            static create(properties?: IInvoiceMessage): InvoiceMessage;
            static encode(message: IInvoiceMessage, writer?: any): any;
            static encodeDelimited(message: IInvoiceMessage, writer?: any): any;
            static decode(reader: any, length?: number): InvoiceMessage;
            static decodeDelimited(reader: any): InvoiceMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InvoiceMessage;
            static toObject(message: InvoiceMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace InvoiceMessage {
            export enum AttachmentType {
                IMAGE = 0,
                PDF = 1,
            }
        }
        export interface IKeepInChatMessage { [key: string]: any }
        export class KeepInChatMessage implements IKeepInChatMessage {
            constructor(properties?: IKeepInChatMessage);
            [key: string]: any;
            static create(properties?: IKeepInChatMessage): KeepInChatMessage;
            static encode(message: IKeepInChatMessage, writer?: any): any;
            static encodeDelimited(message: IKeepInChatMessage, writer?: any): any;
            static decode(reader: any, length?: number): KeepInChatMessage;
            static decodeDelimited(reader: any): KeepInChatMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): KeepInChatMessage;
            static toObject(message: KeepInChatMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILinkPreviewMetadata { [key: string]: any }
        export class LinkPreviewMetadata implements ILinkPreviewMetadata {
            constructor(properties?: ILinkPreviewMetadata);
            [key: string]: any;
            static create(properties?: ILinkPreviewMetadata): LinkPreviewMetadata;
            static encode(message: ILinkPreviewMetadata, writer?: any): any;
            static encodeDelimited(message: ILinkPreviewMetadata, writer?: any): any;
            static decode(reader: any, length?: number): LinkPreviewMetadata;
            static decodeDelimited(reader: any): LinkPreviewMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LinkPreviewMetadata;
            static toObject(message: LinkPreviewMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace LinkPreviewMetadata {
            export enum SocialMediaPostType {
                NONE = 0,
                REEL = 1,
                LIVE_VIDEO = 2,
                LONG_VIDEO = 3,
                SINGLE_IMAGE = 4,
                CAROUSEL = 5,
            }
        }
        export interface IListMessage { [key: string]: any }
        export class ListMessage implements IListMessage {
            constructor(properties?: IListMessage);
            [key: string]: any;
            static create(properties?: IListMessage): ListMessage;
            static encode(message: IListMessage, writer?: any): any;
            static encodeDelimited(message: IListMessage, writer?: any): any;
            static decode(reader: any, length?: number): ListMessage;
            static decodeDelimited(reader: any): ListMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ListMessage;
            static toObject(message: ListMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ListMessage {
            export enum ListType {
                UNKNOWN = 0,
                SINGLE_SELECT = 1,
                PRODUCT_LIST = 2,
            }
            export interface IProduct { [key: string]: any }
            export class Product implements IProduct {
                constructor(properties?: IProduct);
                [key: string]: any;
                static create(properties?: IProduct): Product;
                static encode(message: IProduct, writer?: any): any;
                static encodeDelimited(message: IProduct, writer?: any): any;
                static decode(reader: any, length?: number): Product;
                static decodeDelimited(reader: any): Product;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Product;
                static toObject(message: Product, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IProductListHeaderImage { [key: string]: any }
            export class ProductListHeaderImage implements IProductListHeaderImage {
                constructor(properties?: IProductListHeaderImage);
                [key: string]: any;
                static create(properties?: IProductListHeaderImage): ProductListHeaderImage;
                static encode(message: IProductListHeaderImage, writer?: any): any;
                static encodeDelimited(message: IProductListHeaderImage, writer?: any): any;
                static decode(reader: any, length?: number): ProductListHeaderImage;
                static decodeDelimited(reader: any): ProductListHeaderImage;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): ProductListHeaderImage;
                static toObject(message: ProductListHeaderImage, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IProductListInfo { [key: string]: any }
            export class ProductListInfo implements IProductListInfo {
                constructor(properties?: IProductListInfo);
                [key: string]: any;
                static create(properties?: IProductListInfo): ProductListInfo;
                static encode(message: IProductListInfo, writer?: any): any;
                static encodeDelimited(message: IProductListInfo, writer?: any): any;
                static decode(reader: any, length?: number): ProductListInfo;
                static decodeDelimited(reader: any): ProductListInfo;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): ProductListInfo;
                static toObject(message: ProductListInfo, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IProductSection { [key: string]: any }
            export class ProductSection implements IProductSection {
                constructor(properties?: IProductSection);
                [key: string]: any;
                static create(properties?: IProductSection): ProductSection;
                static encode(message: IProductSection, writer?: any): any;
                static encodeDelimited(message: IProductSection, writer?: any): any;
                static decode(reader: any, length?: number): ProductSection;
                static decodeDelimited(reader: any): ProductSection;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): ProductSection;
                static toObject(message: ProductSection, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IRow { [key: string]: any }
            export class Row implements IRow {
                constructor(properties?: IRow);
                [key: string]: any;
                static create(properties?: IRow): Row;
                static encode(message: IRow, writer?: any): any;
                static encodeDelimited(message: IRow, writer?: any): any;
                static decode(reader: any, length?: number): Row;
                static decodeDelimited(reader: any): Row;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Row;
                static toObject(message: Row, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface ISection { [key: string]: any }
            export class Section implements ISection {
                constructor(properties?: ISection);
                [key: string]: any;
                static create(properties?: ISection): Section;
                static encode(message: ISection, writer?: any): any;
                static encodeDelimited(message: ISection, writer?: any): any;
                static decode(reader: any, length?: number): Section;
                static decodeDelimited(reader: any): Section;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Section;
                static toObject(message: Section, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IListResponseMessage { [key: string]: any }
        export class ListResponseMessage implements IListResponseMessage {
            constructor(properties?: IListResponseMessage);
            [key: string]: any;
            static create(properties?: IListResponseMessage): ListResponseMessage;
            static encode(message: IListResponseMessage, writer?: any): any;
            static encodeDelimited(message: IListResponseMessage, writer?: any): any;
            static decode(reader: any, length?: number): ListResponseMessage;
            static decodeDelimited(reader: any): ListResponseMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ListResponseMessage;
            static toObject(message: ListResponseMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ListResponseMessage {
            export enum ListType {
                UNKNOWN = 0,
                SINGLE_SELECT = 1,
            }
            export interface ISingleSelectReply { [key: string]: any }
            export class SingleSelectReply implements ISingleSelectReply {
                constructor(properties?: ISingleSelectReply);
                [key: string]: any;
                static create(properties?: ISingleSelectReply): SingleSelectReply;
                static encode(message: ISingleSelectReply, writer?: any): any;
                static encodeDelimited(message: ISingleSelectReply, writer?: any): any;
                static decode(reader: any, length?: number): SingleSelectReply;
                static decodeDelimited(reader: any): SingleSelectReply;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): SingleSelectReply;
                static toObject(message: SingleSelectReply, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface ILiveLocationMessage { [key: string]: any }
        export class LiveLocationMessage implements ILiveLocationMessage {
            constructor(properties?: ILiveLocationMessage);
            [key: string]: any;
            static create(properties?: ILiveLocationMessage): LiveLocationMessage;
            static encode(message: ILiveLocationMessage, writer?: any): any;
            static encodeDelimited(message: ILiveLocationMessage, writer?: any): any;
            static decode(reader: any, length?: number): LiveLocationMessage;
            static decodeDelimited(reader: any): LiveLocationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LiveLocationMessage;
            static toObject(message: LiveLocationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILocationMessage { [key: string]: any }
        export class LocationMessage implements ILocationMessage {
            constructor(properties?: ILocationMessage);
            [key: string]: any;
            static create(properties?: ILocationMessage): LocationMessage;
            static encode(message: ILocationMessage, writer?: any): any;
            static encodeDelimited(message: ILocationMessage, writer?: any): any;
            static decode(reader: any, length?: number): LocationMessage;
            static decodeDelimited(reader: any): LocationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LocationMessage;
            static toObject(message: LocationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMMSThumbnailMetadata { [key: string]: any }
        export class MMSThumbnailMetadata implements IMMSThumbnailMetadata {
            constructor(properties?: IMMSThumbnailMetadata);
            [key: string]: any;
            static create(properties?: IMMSThumbnailMetadata): MMSThumbnailMetadata;
            static encode(message: IMMSThumbnailMetadata, writer?: any): any;
            static encodeDelimited(message: IMMSThumbnailMetadata, writer?: any): any;
            static decode(reader: any, length?: number): MMSThumbnailMetadata;
            static decodeDelimited(reader: any): MMSThumbnailMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MMSThumbnailMetadata;
            static toObject(message: MMSThumbnailMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMarkAsVerifiedAction { [key: string]: any }
        export class MarkAsVerifiedAction implements IMarkAsVerifiedAction {
            constructor(properties?: IMarkAsVerifiedAction);
            [key: string]: any;
            static create(properties?: IMarkAsVerifiedAction): MarkAsVerifiedAction;
            static encode(message: IMarkAsVerifiedAction, writer?: any): any;
            static encodeDelimited(message: IMarkAsVerifiedAction, writer?: any): any;
            static decode(reader: any, length?: number): MarkAsVerifiedAction;
            static decodeDelimited(reader: any): MarkAsVerifiedAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MarkAsVerifiedAction;
            static toObject(message: MarkAsVerifiedAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum MediaKeyDomain {
            UNSET = 0,
            E2EE_CHAT = 1,
            STATUS = 2,
            CAPI = 3,
            BOT = 4,
        }
        export interface IChatAnimatedWallpaper { [key: string]: any }
        export class ChatAnimatedWallpaper implements IChatAnimatedWallpaper {
            constructor(properties?: IChatAnimatedWallpaper);
            [key: string]: any;
            static create(properties?: IChatAnimatedWallpaper): ChatAnimatedWallpaper;
            static encode(message: IChatAnimatedWallpaper, writer?: any): any;
            static encodeDelimited(message: IChatAnimatedWallpaper, writer?: any): any;
            static decode(reader: any, length?: number): ChatAnimatedWallpaper;
            static decodeDelimited(reader: any): ChatAnimatedWallpaper;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatAnimatedWallpaper;
            static toObject(message: ChatAnimatedWallpaper, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISharedDeviceContactHashKey { [key: string]: any }
        export class SharedDeviceContactHashKey implements ISharedDeviceContactHashKey {
            constructor(properties?: ISharedDeviceContactHashKey);
            [key: string]: any;
            static create(properties?: ISharedDeviceContactHashKey): SharedDeviceContactHashKey;
            static encode(message: ISharedDeviceContactHashKey, writer?: any): any;
            static encodeDelimited(message: ISharedDeviceContactHashKey, writer?: any): any;
            static decode(reader: any, length?: number): SharedDeviceContactHashKey;
            static decodeDelimited(reader: any): SharedDeviceContactHashKey;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SharedDeviceContactHashKey;
            static toObject(message: SharedDeviceContactHashKey, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISharedDeviceContactHashKeyShare { [key: string]: any }
        export class SharedDeviceContactHashKeyShare implements ISharedDeviceContactHashKeyShare {
            constructor(properties?: ISharedDeviceContactHashKeyShare);
            [key: string]: any;
            static create(properties?: ISharedDeviceContactHashKeyShare): SharedDeviceContactHashKeyShare;
            static encode(message: ISharedDeviceContactHashKeyShare, writer?: any): any;
            static encodeDelimited(message: ISharedDeviceContactHashKeyShare, writer?: any): any;
            static decode(reader: any, length?: number): SharedDeviceContactHashKeyShare;
            static decodeDelimited(reader: any): SharedDeviceContactHashKeyShare;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SharedDeviceContactHashKeyShare;
            static toObject(message: SharedDeviceContactHashKeyShare, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISharedDeviceContactHashKeyRequest { [key: string]: any }
        export class SharedDeviceContactHashKeyRequest implements ISharedDeviceContactHashKeyRequest {
            constructor(properties?: ISharedDeviceContactHashKeyRequest);
            [key: string]: any;
            static create(properties?: ISharedDeviceContactHashKeyRequest): SharedDeviceContactHashKeyRequest;
            static encode(message: ISharedDeviceContactHashKeyRequest, writer?: any): any;
            static encodeDelimited(message: ISharedDeviceContactHashKeyRequest, writer?: any): any;
            static decode(reader: any, length?: number): SharedDeviceContactHashKeyRequest;
            static decodeDelimited(reader: any): SharedDeviceContactHashKeyRequest;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SharedDeviceContactHashKeyRequest;
            static toObject(message: SharedDeviceContactHashKeyRequest, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMessageHistoryBundle { [key: string]: any }
        export class MessageHistoryBundle implements IMessageHistoryBundle {
            constructor(properties?: IMessageHistoryBundle);
            [key: string]: any;
            static create(properties?: IMessageHistoryBundle): MessageHistoryBundle;
            static encode(message: IMessageHistoryBundle, writer?: any): any;
            static encodeDelimited(message: IMessageHistoryBundle, writer?: any): any;
            static decode(reader: any, length?: number): MessageHistoryBundle;
            static decodeDelimited(reader: any): MessageHistoryBundle;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MessageHistoryBundle;
            static toObject(message: MessageHistoryBundle, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMessageHistoryMetadata { [key: string]: any }
        export class MessageHistoryMetadata implements IMessageHistoryMetadata {
            constructor(properties?: IMessageHistoryMetadata);
            [key: string]: any;
            static create(properties?: IMessageHistoryMetadata): MessageHistoryMetadata;
            static encode(message: IMessageHistoryMetadata, writer?: any): any;
            static encodeDelimited(message: IMessageHistoryMetadata, writer?: any): any;
            static decode(reader: any, length?: number): MessageHistoryMetadata;
            static decodeDelimited(reader: any): MessageHistoryMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MessageHistoryMetadata;
            static toObject(message: MessageHistoryMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMessageHistoryNotice { [key: string]: any }
        export class MessageHistoryNotice implements IMessageHistoryNotice {
            constructor(properties?: IMessageHistoryNotice);
            [key: string]: any;
            static create(properties?: IMessageHistoryNotice): MessageHistoryNotice;
            static encode(message: IMessageHistoryNotice, writer?: any): any;
            static encodeDelimited(message: IMessageHistoryNotice, writer?: any): any;
            static decode(reader: any, length?: number): MessageHistoryNotice;
            static decodeDelimited(reader: any): MessageHistoryNotice;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MessageHistoryNotice;
            static toObject(message: MessageHistoryNotice, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMusicMessage { [key: string]: any }
        export class MusicMessage implements IMusicMessage {
            constructor(properties?: IMusicMessage);
            [key: string]: any;
            static create(properties?: IMusicMessage): MusicMessage;
            static encode(message: IMusicMessage, writer?: any): any;
            static encodeDelimited(message: IMusicMessage, writer?: any): any;
            static decode(reader: any, length?: number): MusicMessage;
            static decodeDelimited(reader: any): MusicMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MusicMessage;
            static toObject(message: MusicMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace MusicMessage {
            export enum MusicMessageStyle {
                UNKNOWN = 0,
                VINYL = 1,
            }
        }
        export interface INewsletterAdminInviteMessage { [key: string]: any }
        export class NewsletterAdminInviteMessage implements INewsletterAdminInviteMessage {
            constructor(properties?: INewsletterAdminInviteMessage);
            [key: string]: any;
            static create(properties?: INewsletterAdminInviteMessage): NewsletterAdminInviteMessage;
            static encode(message: INewsletterAdminInviteMessage, writer?: any): any;
            static encodeDelimited(message: INewsletterAdminInviteMessage, writer?: any): any;
            static decode(reader: any, length?: number): NewsletterAdminInviteMessage;
            static decodeDelimited(reader: any): NewsletterAdminInviteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NewsletterAdminInviteMessage;
            static toObject(message: NewsletterAdminInviteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface INewsletterFollowerInviteMessage { [key: string]: any }
        export class NewsletterFollowerInviteMessage implements INewsletterFollowerInviteMessage {
            constructor(properties?: INewsletterFollowerInviteMessage);
            [key: string]: any;
            static create(properties?: INewsletterFollowerInviteMessage): NewsletterFollowerInviteMessage;
            static encode(message: INewsletterFollowerInviteMessage, writer?: any): any;
            static encodeDelimited(message: INewsletterFollowerInviteMessage, writer?: any): any;
            static decode(reader: any, length?: number): NewsletterFollowerInviteMessage;
            static decodeDelimited(reader: any): NewsletterFollowerInviteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NewsletterFollowerInviteMessage;
            static toObject(message: NewsletterFollowerInviteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IOrderMessage { [key: string]: any }
        export class OrderMessage implements IOrderMessage {
            constructor(properties?: IOrderMessage);
            [key: string]: any;
            static create(properties?: IOrderMessage): OrderMessage;
            static encode(message: IOrderMessage, writer?: any): any;
            static encodeDelimited(message: IOrderMessage, writer?: any): any;
            static decode(reader: any, length?: number): OrderMessage;
            static decodeDelimited(reader: any): OrderMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): OrderMessage;
            static toObject(message: OrderMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace OrderMessage {
            export enum OrderStatus {
                INQUIRY = 1,
                ACCEPTED = 2,
                DECLINED = 3,
            }
            export enum OrderSurface {
                CATALOG = 1,
            }
        }
        export interface IPaymentExtendedMetadata { [key: string]: any }
        export class PaymentExtendedMetadata implements IPaymentExtendedMetadata {
            constructor(properties?: IPaymentExtendedMetadata);
            [key: string]: any;
            static create(properties?: IPaymentExtendedMetadata): PaymentExtendedMetadata;
            static encode(message: IPaymentExtendedMetadata, writer?: any): any;
            static encodeDelimited(message: IPaymentExtendedMetadata, writer?: any): any;
            static decode(reader: any, length?: number): PaymentExtendedMetadata;
            static decodeDelimited(reader: any): PaymentExtendedMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PaymentExtendedMetadata;
            static toObject(message: PaymentExtendedMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPaymentInviteMessage { [key: string]: any }
        export class PaymentInviteMessage implements IPaymentInviteMessage {
            constructor(properties?: IPaymentInviteMessage);
            [key: string]: any;
            static create(properties?: IPaymentInviteMessage): PaymentInviteMessage;
            static encode(message: IPaymentInviteMessage, writer?: any): any;
            static encodeDelimited(message: IPaymentInviteMessage, writer?: any): any;
            static decode(reader: any, length?: number): PaymentInviteMessage;
            static decodeDelimited(reader: any): PaymentInviteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PaymentInviteMessage;
            static toObject(message: PaymentInviteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PaymentInviteMessage {
            export enum InviteType {
                DEFAULT = 0,
                MAPPER = 1,
            }
            export enum ServiceType {
                UNKNOWN = 0,
                FBPAY = 1,
                NOVI = 2,
                UPI = 3,
                PIX = 4,
            }
        }
        export interface IPaymentLinkMetadata { [key: string]: any }
        export class PaymentLinkMetadata implements IPaymentLinkMetadata {
            constructor(properties?: IPaymentLinkMetadata);
            [key: string]: any;
            static create(properties?: IPaymentLinkMetadata): PaymentLinkMetadata;
            static encode(message: IPaymentLinkMetadata, writer?: any): any;
            static encodeDelimited(message: IPaymentLinkMetadata, writer?: any): any;
            static decode(reader: any, length?: number): PaymentLinkMetadata;
            static decodeDelimited(reader: any): PaymentLinkMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PaymentLinkMetadata;
            static toObject(message: PaymentLinkMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PaymentLinkMetadata {
            export interface IPaymentLinkButton { [key: string]: any }
            export class PaymentLinkButton implements IPaymentLinkButton {
                constructor(properties?: IPaymentLinkButton);
                [key: string]: any;
                static create(properties?: IPaymentLinkButton): PaymentLinkButton;
                static encode(message: IPaymentLinkButton, writer?: any): any;
                static encodeDelimited(message: IPaymentLinkButton, writer?: any): any;
                static decode(reader: any, length?: number): PaymentLinkButton;
                static decodeDelimited(reader: any): PaymentLinkButton;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): PaymentLinkButton;
                static toObject(message: PaymentLinkButton, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IPaymentLinkHeader { [key: string]: any }
            export class PaymentLinkHeader implements IPaymentLinkHeader {
                constructor(properties?: IPaymentLinkHeader);
                [key: string]: any;
                static create(properties?: IPaymentLinkHeader): PaymentLinkHeader;
                static encode(message: IPaymentLinkHeader, writer?: any): any;
                static encodeDelimited(message: IPaymentLinkHeader, writer?: any): any;
                static decode(reader: any, length?: number): PaymentLinkHeader;
                static decodeDelimited(reader: any): PaymentLinkHeader;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): PaymentLinkHeader;
                static toObject(message: PaymentLinkHeader, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace PaymentLinkHeader {
                export enum PaymentLinkHeaderType {
                    LINK_PREVIEW = 0,
                    ORDER = 1,
                }
            }
            export interface IPaymentLinkProvider { [key: string]: any }
            export class PaymentLinkProvider implements IPaymentLinkProvider {
                constructor(properties?: IPaymentLinkProvider);
                [key: string]: any;
                static create(properties?: IPaymentLinkProvider): PaymentLinkProvider;
                static encode(message: IPaymentLinkProvider, writer?: any): any;
                static encodeDelimited(message: IPaymentLinkProvider, writer?: any): any;
                static decode(reader: any, length?: number): PaymentLinkProvider;
                static decodeDelimited(reader: any): PaymentLinkProvider;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): PaymentLinkProvider;
                static toObject(message: PaymentLinkProvider, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IPaymentReminderMessage { [key: string]: any }
        export class PaymentReminderMessage implements IPaymentReminderMessage {
            constructor(properties?: IPaymentReminderMessage);
            [key: string]: any;
            static create(properties?: IPaymentReminderMessage): PaymentReminderMessage;
            static encode(message: IPaymentReminderMessage, writer?: any): any;
            static encodeDelimited(message: IPaymentReminderMessage, writer?: any): any;
            static decode(reader: any, length?: number): PaymentReminderMessage;
            static decodeDelimited(reader: any): PaymentReminderMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PaymentReminderMessage;
            static toObject(message: PaymentReminderMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PaymentReminderMessage {
            export enum ReminderFrequency {
                REMINDER_FREQUENCY_UNKNOWN = 0,
                WEEKLY = 1,
                BI_WEEKLY = 2,
                MONTHLY = 3,
                QUARTERLY = 4,
            }
            export enum ReminderStatus {
                REMINDER_STATUS_UNKNOWN = 0,
                ACTIVE = 1,
                CANCELLED_BY_CREATOR = 2,
                STOPPED_BY_RECEIVER = 3,
                EXPIRED = 4,
                PAID = 5,
            }
        }
        export interface IPeerDataOperationRequestMessage { [key: string]: any }
        export class PeerDataOperationRequestMessage implements IPeerDataOperationRequestMessage {
            constructor(properties?: IPeerDataOperationRequestMessage);
            [key: string]: any;
            static create(properties?: IPeerDataOperationRequestMessage): PeerDataOperationRequestMessage;
            static encode(message: IPeerDataOperationRequestMessage, writer?: any): any;
            static encodeDelimited(message: IPeerDataOperationRequestMessage, writer?: any): any;
            static decode(reader: any, length?: number): PeerDataOperationRequestMessage;
            static decodeDelimited(reader: any): PeerDataOperationRequestMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PeerDataOperationRequestMessage;
            static toObject(message: PeerDataOperationRequestMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PeerDataOperationRequestMessage {
            export interface IBizBroadcastInsightsContactListRequest { [key: string]: any }
            export class BizBroadcastInsightsContactListRequest implements IBizBroadcastInsightsContactListRequest {
                constructor(properties?: IBizBroadcastInsightsContactListRequest);
                [key: string]: any;
                static create(properties?: IBizBroadcastInsightsContactListRequest): BizBroadcastInsightsContactListRequest;
                static encode(message: IBizBroadcastInsightsContactListRequest, writer?: any): any;
                static encodeDelimited(message: IBizBroadcastInsightsContactListRequest, writer?: any): any;
                static decode(reader: any, length?: number): BizBroadcastInsightsContactListRequest;
                static decodeDelimited(reader: any): BizBroadcastInsightsContactListRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): BizBroadcastInsightsContactListRequest;
                static toObject(message: BizBroadcastInsightsContactListRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IBizBroadcastInsightsRefreshRequest { [key: string]: any }
            export class BizBroadcastInsightsRefreshRequest implements IBizBroadcastInsightsRefreshRequest {
                constructor(properties?: IBizBroadcastInsightsRefreshRequest);
                [key: string]: any;
                static create(properties?: IBizBroadcastInsightsRefreshRequest): BizBroadcastInsightsRefreshRequest;
                static encode(message: IBizBroadcastInsightsRefreshRequest, writer?: any): any;
                static encodeDelimited(message: IBizBroadcastInsightsRefreshRequest, writer?: any): any;
                static decode(reader: any, length?: number): BizBroadcastInsightsRefreshRequest;
                static decodeDelimited(reader: any): BizBroadcastInsightsRefreshRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): BizBroadcastInsightsRefreshRequest;
                static toObject(message: BizBroadcastInsightsRefreshRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface ICompanionCanonicalUserNonceFetchRequest { [key: string]: any }
            export class CompanionCanonicalUserNonceFetchRequest implements ICompanionCanonicalUserNonceFetchRequest {
                constructor(properties?: ICompanionCanonicalUserNonceFetchRequest);
                [key: string]: any;
                static create(properties?: ICompanionCanonicalUserNonceFetchRequest): CompanionCanonicalUserNonceFetchRequest;
                static encode(message: ICompanionCanonicalUserNonceFetchRequest, writer?: any): any;
                static encodeDelimited(message: ICompanionCanonicalUserNonceFetchRequest, writer?: any): any;
                static decode(reader: any, length?: number): CompanionCanonicalUserNonceFetchRequest;
                static decodeDelimited(reader: any): CompanionCanonicalUserNonceFetchRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CompanionCanonicalUserNonceFetchRequest;
                static toObject(message: CompanionCanonicalUserNonceFetchRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IFullHistorySyncOnDemandRequest { [key: string]: any }
            export class FullHistorySyncOnDemandRequest implements IFullHistorySyncOnDemandRequest {
                constructor(properties?: IFullHistorySyncOnDemandRequest);
                [key: string]: any;
                static create(properties?: IFullHistorySyncOnDemandRequest): FullHistorySyncOnDemandRequest;
                static encode(message: IFullHistorySyncOnDemandRequest, writer?: any): any;
                static encodeDelimited(message: IFullHistorySyncOnDemandRequest, writer?: any): any;
                static decode(reader: any, length?: number): FullHistorySyncOnDemandRequest;
                static decodeDelimited(reader: any): FullHistorySyncOnDemandRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): FullHistorySyncOnDemandRequest;
                static toObject(message: FullHistorySyncOnDemandRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IGalaxyFlowAction { [key: string]: any }
            export class GalaxyFlowAction implements IGalaxyFlowAction {
                constructor(properties?: IGalaxyFlowAction);
                [key: string]: any;
                static create(properties?: IGalaxyFlowAction): GalaxyFlowAction;
                static encode(message: IGalaxyFlowAction, writer?: any): any;
                static encodeDelimited(message: IGalaxyFlowAction, writer?: any): any;
                static decode(reader: any, length?: number): GalaxyFlowAction;
                static decodeDelimited(reader: any): GalaxyFlowAction;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): GalaxyFlowAction;
                static toObject(message: GalaxyFlowAction, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace GalaxyFlowAction {
                export enum GalaxyFlowActionType {
                    NOTIFY_LAUNCH = 1,
                    DOWNLOAD_RESPONSES = 2,
                }
            }
            export interface IHistorySyncChunkRetryRequest { [key: string]: any }
            export class HistorySyncChunkRetryRequest implements IHistorySyncChunkRetryRequest {
                constructor(properties?: IHistorySyncChunkRetryRequest);
                [key: string]: any;
                static create(properties?: IHistorySyncChunkRetryRequest): HistorySyncChunkRetryRequest;
                static encode(message: IHistorySyncChunkRetryRequest, writer?: any): any;
                static encodeDelimited(message: IHistorySyncChunkRetryRequest, writer?: any): any;
                static decode(reader: any, length?: number): HistorySyncChunkRetryRequest;
                static decodeDelimited(reader: any): HistorySyncChunkRetryRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): HistorySyncChunkRetryRequest;
                static toObject(message: HistorySyncChunkRetryRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IHistorySyncOnDemandRequest { [key: string]: any }
            export class HistorySyncOnDemandRequest implements IHistorySyncOnDemandRequest {
                constructor(properties?: IHistorySyncOnDemandRequest);
                [key: string]: any;
                static create(properties?: IHistorySyncOnDemandRequest): HistorySyncOnDemandRequest;
                static encode(message: IHistorySyncOnDemandRequest, writer?: any): any;
                static encodeDelimited(message: IHistorySyncOnDemandRequest, writer?: any): any;
                static decode(reader: any, length?: number): HistorySyncOnDemandRequest;
                static decodeDelimited(reader: any): HistorySyncOnDemandRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): HistorySyncOnDemandRequest;
                static toObject(message: HistorySyncOnDemandRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IPlaceholderMessageResendRequest { [key: string]: any }
            export class PlaceholderMessageResendRequest implements IPlaceholderMessageResendRequest {
                constructor(properties?: IPlaceholderMessageResendRequest);
                [key: string]: any;
                static create(properties?: IPlaceholderMessageResendRequest): PlaceholderMessageResendRequest;
                static encode(message: IPlaceholderMessageResendRequest, writer?: any): any;
                static encodeDelimited(message: IPlaceholderMessageResendRequest, writer?: any): any;
                static decode(reader: any, length?: number): PlaceholderMessageResendRequest;
                static decodeDelimited(reader: any): PlaceholderMessageResendRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): PlaceholderMessageResendRequest;
                static toObject(message: PlaceholderMessageResendRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IRequestStickerReupload { [key: string]: any }
            export class RequestStickerReupload implements IRequestStickerReupload {
                constructor(properties?: IRequestStickerReupload);
                [key: string]: any;
                static create(properties?: IRequestStickerReupload): RequestStickerReupload;
                static encode(message: IRequestStickerReupload, writer?: any): any;
                static encodeDelimited(message: IRequestStickerReupload, writer?: any): any;
                static decode(reader: any, length?: number): RequestStickerReupload;
                static decodeDelimited(reader: any): RequestStickerReupload;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): RequestStickerReupload;
                static toObject(message: RequestStickerReupload, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IRequestUrlPreview { [key: string]: any }
            export class RequestUrlPreview implements IRequestUrlPreview {
                constructor(properties?: IRequestUrlPreview);
                [key: string]: any;
                static create(properties?: IRequestUrlPreview): RequestUrlPreview;
                static encode(message: IRequestUrlPreview, writer?: any): any;
                static encodeDelimited(message: IRequestUrlPreview, writer?: any): any;
                static decode(reader: any, length?: number): RequestUrlPreview;
                static decodeDelimited(reader: any): RequestUrlPreview;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): RequestUrlPreview;
                static toObject(message: RequestUrlPreview, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface ISyncDCollectionFatalRecoveryRequest { [key: string]: any }
            export class SyncDCollectionFatalRecoveryRequest implements ISyncDCollectionFatalRecoveryRequest {
                constructor(properties?: ISyncDCollectionFatalRecoveryRequest);
                [key: string]: any;
                static create(properties?: ISyncDCollectionFatalRecoveryRequest): SyncDCollectionFatalRecoveryRequest;
                static encode(message: ISyncDCollectionFatalRecoveryRequest, writer?: any): any;
                static encodeDelimited(message: ISyncDCollectionFatalRecoveryRequest, writer?: any): any;
                static decode(reader: any, length?: number): SyncDCollectionFatalRecoveryRequest;
                static decodeDelimited(reader: any): SyncDCollectionFatalRecoveryRequest;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): SyncDCollectionFatalRecoveryRequest;
                static toObject(message: SyncDCollectionFatalRecoveryRequest, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IPeerDataOperationRequestResponseMessage { [key: string]: any }
        export class PeerDataOperationRequestResponseMessage implements IPeerDataOperationRequestResponseMessage {
            constructor(properties?: IPeerDataOperationRequestResponseMessage);
            [key: string]: any;
            static create(properties?: IPeerDataOperationRequestResponseMessage): PeerDataOperationRequestResponseMessage;
            static encode(message: IPeerDataOperationRequestResponseMessage, writer?: any): any;
            static encodeDelimited(message: IPeerDataOperationRequestResponseMessage, writer?: any): any;
            static decode(reader: any, length?: number): PeerDataOperationRequestResponseMessage;
            static decodeDelimited(reader: any): PeerDataOperationRequestResponseMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PeerDataOperationRequestResponseMessage;
            static toObject(message: PeerDataOperationRequestResponseMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PeerDataOperationRequestResponseMessage {
            export interface IPeerDataOperationResult { [key: string]: any }
            export class PeerDataOperationResult implements IPeerDataOperationResult {
                constructor(properties?: IPeerDataOperationResult);
                [key: string]: any;
                static create(properties?: IPeerDataOperationResult): PeerDataOperationResult;
                static encode(message: IPeerDataOperationResult, writer?: any): any;
                static encodeDelimited(message: IPeerDataOperationResult, writer?: any): any;
                static decode(reader: any, length?: number): PeerDataOperationResult;
                static decodeDelimited(reader: any): PeerDataOperationResult;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): PeerDataOperationResult;
                static toObject(message: PeerDataOperationResult, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace PeerDataOperationResult {
                export interface IBizBroadcastInsightsContactListResponse { [key: string]: any }
                export class BizBroadcastInsightsContactListResponse implements IBizBroadcastInsightsContactListResponse {
                    constructor(properties?: IBizBroadcastInsightsContactListResponse);
                    [key: string]: any;
                    static create(properties?: IBizBroadcastInsightsContactListResponse): BizBroadcastInsightsContactListResponse;
                    static encode(message: IBizBroadcastInsightsContactListResponse, writer?: any): any;
                    static encodeDelimited(message: IBizBroadcastInsightsContactListResponse, writer?: any): any;
                    static decode(reader: any, length?: number): BizBroadcastInsightsContactListResponse;
                    static decodeDelimited(reader: any): BizBroadcastInsightsContactListResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): BizBroadcastInsightsContactListResponse;
                    static toObject(message: BizBroadcastInsightsContactListResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface IBizBroadcastInsightsContactState { [key: string]: any }
                export class BizBroadcastInsightsContactState implements IBizBroadcastInsightsContactState {
                    constructor(properties?: IBizBroadcastInsightsContactState);
                    [key: string]: any;
                    static create(properties?: IBizBroadcastInsightsContactState): BizBroadcastInsightsContactState;
                    static encode(message: IBizBroadcastInsightsContactState, writer?: any): any;
                    static encodeDelimited(message: IBizBroadcastInsightsContactState, writer?: any): any;
                    static decode(reader: any, length?: number): BizBroadcastInsightsContactState;
                    static decodeDelimited(reader: any): BizBroadcastInsightsContactState;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): BizBroadcastInsightsContactState;
                    static toObject(message: BizBroadcastInsightsContactState, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface ICompanionCanonicalUserNonceFetchResponse { [key: string]: any }
                export class CompanionCanonicalUserNonceFetchResponse implements ICompanionCanonicalUserNonceFetchResponse {
                    constructor(properties?: ICompanionCanonicalUserNonceFetchResponse);
                    [key: string]: any;
                    static create(properties?: ICompanionCanonicalUserNonceFetchResponse): CompanionCanonicalUserNonceFetchResponse;
                    static encode(message: ICompanionCanonicalUserNonceFetchResponse, writer?: any): any;
                    static encodeDelimited(message: ICompanionCanonicalUserNonceFetchResponse, writer?: any): any;
                    static decode(reader: any, length?: number): CompanionCanonicalUserNonceFetchResponse;
                    static decodeDelimited(reader: any): CompanionCanonicalUserNonceFetchResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): CompanionCanonicalUserNonceFetchResponse;
                    static toObject(message: CompanionCanonicalUserNonceFetchResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface ICompanionMetaNonceFetchResponse { [key: string]: any }
                export class CompanionMetaNonceFetchResponse implements ICompanionMetaNonceFetchResponse {
                    constructor(properties?: ICompanionMetaNonceFetchResponse);
                    [key: string]: any;
                    static create(properties?: ICompanionMetaNonceFetchResponse): CompanionMetaNonceFetchResponse;
                    static encode(message: ICompanionMetaNonceFetchResponse, writer?: any): any;
                    static encodeDelimited(message: ICompanionMetaNonceFetchResponse, writer?: any): any;
                    static decode(reader: any, length?: number): CompanionMetaNonceFetchResponse;
                    static decodeDelimited(reader: any): CompanionMetaNonceFetchResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): CompanionMetaNonceFetchResponse;
                    static toObject(message: CompanionMetaNonceFetchResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface IContactRefreshResponse { [key: string]: any }
                export class ContactRefreshResponse implements IContactRefreshResponse {
                    constructor(properties?: IContactRefreshResponse);
                    [key: string]: any;
                    static create(properties?: IContactRefreshResponse): ContactRefreshResponse;
                    static encode(message: IContactRefreshResponse, writer?: any): any;
                    static encodeDelimited(message: IContactRefreshResponse, writer?: any): any;
                    static decode(reader: any, length?: number): ContactRefreshResponse;
                    static decodeDelimited(reader: any): ContactRefreshResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): ContactRefreshResponse;
                    static toObject(message: ContactRefreshResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface IFlowResponsesCsvBundle { [key: string]: any }
                export class FlowResponsesCsvBundle implements IFlowResponsesCsvBundle {
                    constructor(properties?: IFlowResponsesCsvBundle);
                    [key: string]: any;
                    static create(properties?: IFlowResponsesCsvBundle): FlowResponsesCsvBundle;
                    static encode(message: IFlowResponsesCsvBundle, writer?: any): any;
                    static encodeDelimited(message: IFlowResponsesCsvBundle, writer?: any): any;
                    static decode(reader: any, length?: number): FlowResponsesCsvBundle;
                    static decodeDelimited(reader: any): FlowResponsesCsvBundle;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): FlowResponsesCsvBundle;
                    static toObject(message: FlowResponsesCsvBundle, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface IFullHistorySyncOnDemandRequestResponse { [key: string]: any }
                export class FullHistorySyncOnDemandRequestResponse implements IFullHistorySyncOnDemandRequestResponse {
                    constructor(properties?: IFullHistorySyncOnDemandRequestResponse);
                    [key: string]: any;
                    static create(properties?: IFullHistorySyncOnDemandRequestResponse): FullHistorySyncOnDemandRequestResponse;
                    static encode(message: IFullHistorySyncOnDemandRequestResponse, writer?: any): any;
                    static encodeDelimited(message: IFullHistorySyncOnDemandRequestResponse, writer?: any): any;
                    static decode(reader: any, length?: number): FullHistorySyncOnDemandRequestResponse;
                    static decodeDelimited(reader: any): FullHistorySyncOnDemandRequestResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): FullHistorySyncOnDemandRequestResponse;
                    static toObject(message: FullHistorySyncOnDemandRequestResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export enum FullHistorySyncOnDemandResponseCode {
                    REQUEST_SUCCESS = 0,
                    REQUEST_TIME_EXPIRED = 1,
                    DECLINED_SHARING_HISTORY = 2,
                    GENERIC_ERROR = 3,
                    ERROR_REQUEST_ON_NON_SMB_PRIMARY = 4,
                    ERROR_HOSTED_DEVICE_NOT_CONNECTED = 5,
                    ERROR_HOSTED_DEVICE_LOGIN_TIME_NOT_SET = 6,
                    ERROR_MULTI_PROVIDER_NOT_CONFIGURED = 7,
                }
                export interface IHistorySyncChunkRetryResponse { [key: string]: any }
                export class HistorySyncChunkRetryResponse implements IHistorySyncChunkRetryResponse {
                    constructor(properties?: IHistorySyncChunkRetryResponse);
                    [key: string]: any;
                    static create(properties?: IHistorySyncChunkRetryResponse): HistorySyncChunkRetryResponse;
                    static encode(message: IHistorySyncChunkRetryResponse, writer?: any): any;
                    static encodeDelimited(message: IHistorySyncChunkRetryResponse, writer?: any): any;
                    static decode(reader: any, length?: number): HistorySyncChunkRetryResponse;
                    static decodeDelimited(reader: any): HistorySyncChunkRetryResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): HistorySyncChunkRetryResponse;
                    static toObject(message: HistorySyncChunkRetryResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export enum HistorySyncChunkRetryResponseCode {
                    GENERATION_ERROR = 1,
                    CHUNK_CONSUMED = 2,
                    TIMEOUT = 3,
                    SESSION_EXHAUSTED = 4,
                    CHUNK_EXHAUSTED = 5,
                    DUPLICATED_REQUEST = 6,
                }
                export interface ILinkPreviewResponse { [key: string]: any }
                export class LinkPreviewResponse implements ILinkPreviewResponse {
                    constructor(properties?: ILinkPreviewResponse);
                    [key: string]: any;
                    static create(properties?: ILinkPreviewResponse): LinkPreviewResponse;
                    static encode(message: ILinkPreviewResponse, writer?: any): any;
                    static encodeDelimited(message: ILinkPreviewResponse, writer?: any): any;
                    static decode(reader: any, length?: number): LinkPreviewResponse;
                    static decodeDelimited(reader: any): LinkPreviewResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): LinkPreviewResponse;
                    static toObject(message: LinkPreviewResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export namespace LinkPreviewResponse {
                    export interface ILinkPreviewHighQualityThumbnail { [key: string]: any }
                    export class LinkPreviewHighQualityThumbnail implements ILinkPreviewHighQualityThumbnail {
                        constructor(properties?: ILinkPreviewHighQualityThumbnail);
                        [key: string]: any;
                        static create(properties?: ILinkPreviewHighQualityThumbnail): LinkPreviewHighQualityThumbnail;
                        static encode(message: ILinkPreviewHighQualityThumbnail, writer?: any): any;
                        static encodeDelimited(message: ILinkPreviewHighQualityThumbnail, writer?: any): any;
                        static decode(reader: any, length?: number): LinkPreviewHighQualityThumbnail;
                        static decodeDelimited(reader: any): LinkPreviewHighQualityThumbnail;
                        static verify(message: { [k: string]: any }): string | null;
                        static fromObject(object: { [k: string]: any }): LinkPreviewHighQualityThumbnail;
                        static toObject(message: LinkPreviewHighQualityThumbnail, options?: any): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                    }
                    export interface IPaymentLinkPreviewMetadata { [key: string]: any }
                    export class PaymentLinkPreviewMetadata implements IPaymentLinkPreviewMetadata {
                        constructor(properties?: IPaymentLinkPreviewMetadata);
                        [key: string]: any;
                        static create(properties?: IPaymentLinkPreviewMetadata): PaymentLinkPreviewMetadata;
                        static encode(message: IPaymentLinkPreviewMetadata, writer?: any): any;
                        static encodeDelimited(message: IPaymentLinkPreviewMetadata, writer?: any): any;
                        static decode(reader: any, length?: number): PaymentLinkPreviewMetadata;
                        static decodeDelimited(reader: any): PaymentLinkPreviewMetadata;
                        static verify(message: { [k: string]: any }): string | null;
                        static fromObject(object: { [k: string]: any }): PaymentLinkPreviewMetadata;
                        static toObject(message: PaymentLinkPreviewMetadata, options?: any): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                    }
                }
                export interface IPlaceholderMessageResendResponse { [key: string]: any }
                export class PlaceholderMessageResendResponse implements IPlaceholderMessageResendResponse {
                    constructor(properties?: IPlaceholderMessageResendResponse);
                    [key: string]: any;
                    static create(properties?: IPlaceholderMessageResendResponse): PlaceholderMessageResendResponse;
                    static encode(message: IPlaceholderMessageResendResponse, writer?: any): any;
                    static encodeDelimited(message: IPlaceholderMessageResendResponse, writer?: any): any;
                    static decode(reader: any, length?: number): PlaceholderMessageResendResponse;
                    static decodeDelimited(reader: any): PlaceholderMessageResendResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): PlaceholderMessageResendResponse;
                    static toObject(message: PlaceholderMessageResendResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface ISyncDSnapshotFatalRecoveryResponse { [key: string]: any }
                export class SyncDSnapshotFatalRecoveryResponse implements ISyncDSnapshotFatalRecoveryResponse {
                    constructor(properties?: ISyncDSnapshotFatalRecoveryResponse);
                    [key: string]: any;
                    static create(properties?: ISyncDSnapshotFatalRecoveryResponse): SyncDSnapshotFatalRecoveryResponse;
                    static encode(message: ISyncDSnapshotFatalRecoveryResponse, writer?: any): any;
                    static encodeDelimited(message: ISyncDSnapshotFatalRecoveryResponse, writer?: any): any;
                    static decode(reader: any, length?: number): SyncDSnapshotFatalRecoveryResponse;
                    static decodeDelimited(reader: any): SyncDSnapshotFatalRecoveryResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): SyncDSnapshotFatalRecoveryResponse;
                    static toObject(message: SyncDSnapshotFatalRecoveryResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
                export interface IWaffleNonceFetchResponse { [key: string]: any }
                export class WaffleNonceFetchResponse implements IWaffleNonceFetchResponse {
                    constructor(properties?: IWaffleNonceFetchResponse);
                    [key: string]: any;
                    static create(properties?: IWaffleNonceFetchResponse): WaffleNonceFetchResponse;
                    static encode(message: IWaffleNonceFetchResponse, writer?: any): any;
                    static encodeDelimited(message: IWaffleNonceFetchResponse, writer?: any): any;
                    static decode(reader: any, length?: number): WaffleNonceFetchResponse;
                    static decodeDelimited(reader: any): WaffleNonceFetchResponse;
                    static verify(message: { [k: string]: any }): string | null;
                    static fromObject(object: { [k: string]: any }): WaffleNonceFetchResponse;
                    static toObject(message: WaffleNonceFetchResponse, options?: any): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
            }
        }
        export enum PeerDataOperationRequestType {
            UPLOAD_STICKER = 0,
            SEND_RECENT_STICKER_BOOTSTRAP = 1,
            GENERATE_LINK_PREVIEW = 2,
            HISTORY_SYNC_ON_DEMAND = 3,
            PLACEHOLDER_MESSAGE_RESEND = 4,
            WAFFLE_LINKING_NONCE_FETCH = 5,
            FULL_HISTORY_SYNC_ON_DEMAND = 6,
            COMPANION_META_NONCE_FETCH = 7,
            COMPANION_SYNCD_SNAPSHOT_FATAL_RECOVERY = 8,
            COMPANION_CANONICAL_USER_NONCE_FETCH = 9,
            HISTORY_SYNC_CHUNK_RETRY = 10,
            GALAXY_FLOW_ACTION = 11,
            BUSINESS_BROADCAST_INSIGHTS_DELIVERED_TO = 12,
            BUSINESS_BROADCAST_INSIGHTS_REFRESH = 13,
            CONTACT_REFRESH_REQUEST = 14,
        }
        export interface IPinInChatMessage { [key: string]: any }
        export class PinInChatMessage implements IPinInChatMessage {
            constructor(properties?: IPinInChatMessage);
            [key: string]: any;
            static create(properties?: IPinInChatMessage): PinInChatMessage;
            static encode(message: IPinInChatMessage, writer?: any): any;
            static encodeDelimited(message: IPinInChatMessage, writer?: any): any;
            static decode(reader: any, length?: number): PinInChatMessage;
            static decodeDelimited(reader: any): PinInChatMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PinInChatMessage;
            static toObject(message: PinInChatMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PinInChatMessage {
            export enum Type {
                UNKNOWN_TYPE = 0,
                PIN_FOR_ALL = 1,
                UNPIN_FOR_ALL = 2,
            }
        }
        export interface IPlaceholderMessage { [key: string]: any }
        export class PlaceholderMessage implements IPlaceholderMessage {
            constructor(properties?: IPlaceholderMessage);
            [key: string]: any;
            static create(properties?: IPlaceholderMessage): PlaceholderMessage;
            static encode(message: IPlaceholderMessage, writer?: any): any;
            static encodeDelimited(message: IPlaceholderMessage, writer?: any): any;
            static decode(reader: any, length?: number): PlaceholderMessage;
            static decodeDelimited(reader: any): PlaceholderMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PlaceholderMessage;
            static toObject(message: PlaceholderMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PlaceholderMessage {
            export enum PlaceholderType {
                MASK_LINKED_DEVICES = 0,
            }
        }
        export interface IPollAddOptionMessage { [key: string]: any }
        export class PollAddOptionMessage implements IPollAddOptionMessage {
            constructor(properties?: IPollAddOptionMessage);
            [key: string]: any;
            static create(properties?: IPollAddOptionMessage): PollAddOptionMessage;
            static encode(message: IPollAddOptionMessage, writer?: any): any;
            static encodeDelimited(message: IPollAddOptionMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollAddOptionMessage;
            static decodeDelimited(reader: any): PollAddOptionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollAddOptionMessage;
            static toObject(message: PollAddOptionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum PollContentType {
            UNKNOWN = 0,
            TEXT = 1,
            IMAGE = 2,
        }
        export interface IPollCreationMessage { [key: string]: any }
        export class PollCreationMessage implements IPollCreationMessage {
            constructor(properties?: IPollCreationMessage);
            [key: string]: any;
            static create(properties?: IPollCreationMessage): PollCreationMessage;
            static encode(message: IPollCreationMessage, writer?: any): any;
            static encodeDelimited(message: IPollCreationMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollCreationMessage;
            static decodeDelimited(reader: any): PollCreationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollCreationMessage;
            static toObject(message: PollCreationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PollCreationMessage {
            export interface IOption { [key: string]: any }
            export class Option implements IOption {
                constructor(properties?: IOption);
                [key: string]: any;
                static create(properties?: IOption): Option;
                static encode(message: IOption, writer?: any): any;
                static encodeDelimited(message: IOption, writer?: any): any;
                static decode(reader: any, length?: number): Option;
                static decodeDelimited(reader: any): Option;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Option;
                static toObject(message: Option, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IPollEncValue { [key: string]: any }
        export class PollEncValue implements IPollEncValue {
            constructor(properties?: IPollEncValue);
            [key: string]: any;
            static create(properties?: IPollEncValue): PollEncValue;
            static encode(message: IPollEncValue, writer?: any): any;
            static encodeDelimited(message: IPollEncValue, writer?: any): any;
            static decode(reader: any, length?: number): PollEncValue;
            static decodeDelimited(reader: any): PollEncValue;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollEncValue;
            static toObject(message: PollEncValue, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollResultSnapshotMessage { [key: string]: any }
        export class PollResultSnapshotMessage implements IPollResultSnapshotMessage {
            constructor(properties?: IPollResultSnapshotMessage);
            [key: string]: any;
            static create(properties?: IPollResultSnapshotMessage): PollResultSnapshotMessage;
            static encode(message: IPollResultSnapshotMessage, writer?: any): any;
            static encodeDelimited(message: IPollResultSnapshotMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollResultSnapshotMessage;
            static decodeDelimited(reader: any): PollResultSnapshotMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollResultSnapshotMessage;
            static toObject(message: PollResultSnapshotMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PollResultSnapshotMessage {
            export interface IPollVote { [key: string]: any }
            export class PollVote implements IPollVote {
                constructor(properties?: IPollVote);
                [key: string]: any;
                static create(properties?: IPollVote): PollVote;
                static encode(message: IPollVote, writer?: any): any;
                static encodeDelimited(message: IPollVote, writer?: any): any;
                static decode(reader: any, length?: number): PollVote;
                static decodeDelimited(reader: any): PollVote;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): PollVote;
                static toObject(message: PollVote, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export enum PollType {
            POLL = 0,
            QUIZ = 1,
        }
        export interface IPollUpdateMessage { [key: string]: any }
        export class PollUpdateMessage implements IPollUpdateMessage {
            constructor(properties?: IPollUpdateMessage);
            [key: string]: any;
            static create(properties?: IPollUpdateMessage): PollUpdateMessage;
            static encode(message: IPollUpdateMessage, writer?: any): any;
            static encodeDelimited(message: IPollUpdateMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollUpdateMessage;
            static decodeDelimited(reader: any): PollUpdateMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollUpdateMessage;
            static toObject(message: PollUpdateMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollUpdateMessageMetadata { [key: string]: any }
        export class PollUpdateMessageMetadata implements IPollUpdateMessageMetadata {
            constructor(properties?: IPollUpdateMessageMetadata);
            [key: string]: any;
            static create(properties?: IPollUpdateMessageMetadata): PollUpdateMessageMetadata;
            static encode(message: IPollUpdateMessageMetadata, writer?: any): any;
            static encodeDelimited(message: IPollUpdateMessageMetadata, writer?: any): any;
            static decode(reader: any, length?: number): PollUpdateMessageMetadata;
            static decodeDelimited(reader: any): PollUpdateMessageMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollUpdateMessageMetadata;
            static toObject(message: PollUpdateMessageMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollVoteMessage { [key: string]: any }
        export class PollVoteMessage implements IPollVoteMessage {
            constructor(properties?: IPollVoteMessage);
            [key: string]: any;
            static create(properties?: IPollVoteMessage): PollVoteMessage;
            static encode(message: IPollVoteMessage, writer?: any): any;
            static encodeDelimited(message: IPollVoteMessage, writer?: any): any;
            static decode(reader: any, length?: number): PollVoteMessage;
            static decodeDelimited(reader: any): PollVoteMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollVoteMessage;
            static toObject(message: PollVoteMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IProductMessage { [key: string]: any }
        export class ProductMessage implements IProductMessage {
            constructor(properties?: IProductMessage);
            [key: string]: any;
            static create(properties?: IProductMessage): ProductMessage;
            static encode(message: IProductMessage, writer?: any): any;
            static encodeDelimited(message: IProductMessage, writer?: any): any;
            static decode(reader: any, length?: number): ProductMessage;
            static decodeDelimited(reader: any): ProductMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ProductMessage;
            static toObject(message: ProductMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ProductMessage {
            export interface ICatalogSnapshot { [key: string]: any }
            export class CatalogSnapshot implements ICatalogSnapshot {
                constructor(properties?: ICatalogSnapshot);
                [key: string]: any;
                static create(properties?: ICatalogSnapshot): CatalogSnapshot;
                static encode(message: ICatalogSnapshot, writer?: any): any;
                static encodeDelimited(message: ICatalogSnapshot, writer?: any): any;
                static decode(reader: any, length?: number): CatalogSnapshot;
                static decodeDelimited(reader: any): CatalogSnapshot;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CatalogSnapshot;
                static toObject(message: CatalogSnapshot, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IProductSnapshot { [key: string]: any }
            export class ProductSnapshot implements IProductSnapshot {
                constructor(properties?: IProductSnapshot);
                [key: string]: any;
                static create(properties?: IProductSnapshot): ProductSnapshot;
                static encode(message: IProductSnapshot, writer?: any): any;
                static encodeDelimited(message: IProductSnapshot, writer?: any): any;
                static decode(reader: any, length?: number): ProductSnapshot;
                static decodeDelimited(reader: any): ProductSnapshot;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): ProductSnapshot;
                static toObject(message: ProductSnapshot, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IProtocolMessage { [key: string]: any }
        export class ProtocolMessage implements IProtocolMessage {
            constructor(properties?: IProtocolMessage);
            [key: string]: any;
            static create(properties?: IProtocolMessage): ProtocolMessage;
            static encode(message: IProtocolMessage, writer?: any): any;
            static encodeDelimited(message: IProtocolMessage, writer?: any): any;
            static decode(reader: any, length?: number): ProtocolMessage;
            static decodeDelimited(reader: any): ProtocolMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ProtocolMessage;
            static toObject(message: ProtocolMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ProtocolMessage {
            export enum Type {
                REVOKE = 0,
                EPHEMERAL_SETTING = 3,
                EPHEMERAL_SYNC_RESPONSE = 4,
                HISTORY_SYNC_NOTIFICATION = 5,
                APP_STATE_SYNC_KEY_SHARE = 6,
                APP_STATE_SYNC_KEY_REQUEST = 7,
                MSG_FANOUT_BACKFILL_REQUEST = 8,
                INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC = 9,
                APP_STATE_FATAL_EXCEPTION_NOTIFICATION = 10,
                SHARE_PHONE_NUMBER = 11,
                MESSAGE_EDIT = 14,
                PEER_DATA_OPERATION_REQUEST_MESSAGE = 16,
                PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE = 17,
                REQUEST_WELCOME_MESSAGE = 18,
                BOT_FEEDBACK_MESSAGE = 19,
                MEDIA_NOTIFY_MESSAGE = 20,
                CLOUD_API_THREAD_CONTROL_NOTIFICATION = 21,
                LID_MIGRATION_MAPPING_SYNC = 22,
                REMINDER_MESSAGE = 23,
                BOT_MEMU_ONBOARDING_MESSAGE = 24,
                STATUS_MENTION_MESSAGE = 25,
                STOP_GENERATION_MESSAGE = 26,
                LIMIT_SHARING = 27,
                AI_PSI_METADATA = 28,
                AI_QUERY_FANOUT = 29,
                GROUP_MEMBER_LABEL_CHANGE = 30,
                AI_MEDIA_COLLECTION_MESSAGE = 31,
                MESSAGE_UNSCHEDULE = 32,
                CHAT_THEME_SETTING = 34,
                AI_METADATA_OPERATION = 35,
                MARK_AS_VERIFIED_ACTION = 36,
                COEX_STATE_SYNC = 37,
            }
        }
        export interface IQuestionResponseMessage { [key: string]: any }
        export class QuestionResponseMessage implements IQuestionResponseMessage {
            constructor(properties?: IQuestionResponseMessage);
            [key: string]: any;
            static create(properties?: IQuestionResponseMessage): QuestionResponseMessage;
            static encode(message: IQuestionResponseMessage, writer?: any): any;
            static encodeDelimited(message: IQuestionResponseMessage, writer?: any): any;
            static decode(reader: any, length?: number): QuestionResponseMessage;
            static decodeDelimited(reader: any): QuestionResponseMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): QuestionResponseMessage;
            static toObject(message: QuestionResponseMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IReactionMessage { [key: string]: any }
        export class ReactionMessage implements IReactionMessage {
            constructor(properties?: IReactionMessage);
            [key: string]: any;
            static create(properties?: IReactionMessage): ReactionMessage;
            static encode(message: IReactionMessage, writer?: any): any;
            static encodeDelimited(message: IReactionMessage, writer?: any): any;
            static decode(reader: any, length?: number): ReactionMessage;
            static decodeDelimited(reader: any): ReactionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ReactionMessage;
            static toObject(message: ReactionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IRequestPaymentMessage { [key: string]: any }
        export class RequestPaymentMessage implements IRequestPaymentMessage {
            constructor(properties?: IRequestPaymentMessage);
            [key: string]: any;
            static create(properties?: IRequestPaymentMessage): RequestPaymentMessage;
            static encode(message: IRequestPaymentMessage, writer?: any): any;
            static encodeDelimited(message: IRequestPaymentMessage, writer?: any): any;
            static decode(reader: any, length?: number): RequestPaymentMessage;
            static decodeDelimited(reader: any): RequestPaymentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RequestPaymentMessage;
            static toObject(message: RequestPaymentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IRequestPhoneNumberMessage { [key: string]: any }
        export class RequestPhoneNumberMessage implements IRequestPhoneNumberMessage {
            constructor(properties?: IRequestPhoneNumberMessage);
            [key: string]: any;
            static create(properties?: IRequestPhoneNumberMessage): RequestPhoneNumberMessage;
            static encode(message: IRequestPhoneNumberMessage, writer?: any): any;
            static encodeDelimited(message: IRequestPhoneNumberMessage, writer?: any): any;
            static decode(reader: any, length?: number): RequestPhoneNumberMessage;
            static decodeDelimited(reader: any): RequestPhoneNumberMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RequestPhoneNumberMessage;
            static toObject(message: RequestPhoneNumberMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IRequestWelcomeMessageMetadata { [key: string]: any }
        export class RequestWelcomeMessageMetadata implements IRequestWelcomeMessageMetadata {
            constructor(properties?: IRequestWelcomeMessageMetadata);
            [key: string]: any;
            static create(properties?: IRequestWelcomeMessageMetadata): RequestWelcomeMessageMetadata;
            static encode(message: IRequestWelcomeMessageMetadata, writer?: any): any;
            static encodeDelimited(message: IRequestWelcomeMessageMetadata, writer?: any): any;
            static decode(reader: any, length?: number): RequestWelcomeMessageMetadata;
            static decodeDelimited(reader: any): RequestWelcomeMessageMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RequestWelcomeMessageMetadata;
            static toObject(message: RequestWelcomeMessageMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace RequestWelcomeMessageMetadata {
            export enum LocalChatState {
                EMPTY = 0,
                NON_EMPTY = 1,
            }
            export enum WelcomeTrigger {
                CHAT_OPEN = 0,
                COMPANION_PAIRING = 1,
            }
        }
        export interface IRootSecretDistributeMessage { [key: string]: any }
        export class RootSecretDistributeMessage implements IRootSecretDistributeMessage {
            constructor(properties?: IRootSecretDistributeMessage);
            [key: string]: any;
            static create(properties?: IRootSecretDistributeMessage): RootSecretDistributeMessage;
            static encode(message: IRootSecretDistributeMessage, writer?: any): any;
            static encodeDelimited(message: IRootSecretDistributeMessage, writer?: any): any;
            static decode(reader: any, length?: number): RootSecretDistributeMessage;
            static decodeDelimited(reader: any): RootSecretDistributeMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RootSecretDistributeMessage;
            static toObject(message: RootSecretDistributeMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IScheduledCallCreationMessage { [key: string]: any }
        export class ScheduledCallCreationMessage implements IScheduledCallCreationMessage {
            constructor(properties?: IScheduledCallCreationMessage);
            [key: string]: any;
            static create(properties?: IScheduledCallCreationMessage): ScheduledCallCreationMessage;
            static encode(message: IScheduledCallCreationMessage, writer?: any): any;
            static encodeDelimited(message: IScheduledCallCreationMessage, writer?: any): any;
            static decode(reader: any, length?: number): ScheduledCallCreationMessage;
            static decodeDelimited(reader: any): ScheduledCallCreationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ScheduledCallCreationMessage;
            static toObject(message: ScheduledCallCreationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ScheduledCallCreationMessage {
            export enum CallType {
                UNKNOWN = 0,
                VOICE = 1,
                VIDEO = 2,
            }
        }
        export interface IScheduledCallEditMessage { [key: string]: any }
        export class ScheduledCallEditMessage implements IScheduledCallEditMessage {
            constructor(properties?: IScheduledCallEditMessage);
            [key: string]: any;
            static create(properties?: IScheduledCallEditMessage): ScheduledCallEditMessage;
            static encode(message: IScheduledCallEditMessage, writer?: any): any;
            static encodeDelimited(message: IScheduledCallEditMessage, writer?: any): any;
            static decode(reader: any, length?: number): ScheduledCallEditMessage;
            static decodeDelimited(reader: any): ScheduledCallEditMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ScheduledCallEditMessage;
            static toObject(message: ScheduledCallEditMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ScheduledCallEditMessage {
            export enum EditType {
                UNKNOWN = 0,
                CANCEL = 1,
            }
        }
        export interface ISecretEncryptedMessage { [key: string]: any }
        export class SecretEncryptedMessage implements ISecretEncryptedMessage {
            constructor(properties?: ISecretEncryptedMessage);
            [key: string]: any;
            static create(properties?: ISecretEncryptedMessage): SecretEncryptedMessage;
            static encode(message: ISecretEncryptedMessage, writer?: any): any;
            static encodeDelimited(message: ISecretEncryptedMessage, writer?: any): any;
            static decode(reader: any, length?: number): SecretEncryptedMessage;
            static decodeDelimited(reader: any): SecretEncryptedMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SecretEncryptedMessage;
            static toObject(message: SecretEncryptedMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace SecretEncryptedMessage {
            export enum SecretEncType {
                UNKNOWN = 0,
                EVENT_EDIT = 1,
                MESSAGE_EDIT = 2,
                MESSAGE_SCHEDULE = 3,
                POLL_EDIT = 4,
                POLL_ADD_OPTION = 5,
            }
        }
        export interface ISendPaymentMessage { [key: string]: any }
        export class SendPaymentMessage implements ISendPaymentMessage {
            constructor(properties?: ISendPaymentMessage);
            [key: string]: any;
            static create(properties?: ISendPaymentMessage): SendPaymentMessage;
            static encode(message: ISendPaymentMessage, writer?: any): any;
            static encodeDelimited(message: ISendPaymentMessage, writer?: any): any;
            static decode(reader: any, length?: number): SendPaymentMessage;
            static decodeDelimited(reader: any): SendPaymentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SendPaymentMessage;
            static toObject(message: SendPaymentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISenderKeyDistributionMessage { [key: string]: any }
        export class SenderKeyDistributionMessage implements ISenderKeyDistributionMessage {
            constructor(properties?: ISenderKeyDistributionMessage);
            [key: string]: any;
            static create(properties?: ISenderKeyDistributionMessage): SenderKeyDistributionMessage;
            static encode(message: ISenderKeyDistributionMessage, writer?: any): any;
            static encodeDelimited(message: ISenderKeyDistributionMessage, writer?: any): any;
            static decode(reader: any, length?: number): SenderKeyDistributionMessage;
            static decodeDelimited(reader: any): SenderKeyDistributionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SenderKeyDistributionMessage;
            static toObject(message: SenderKeyDistributionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISplitPaymentMessage { [key: string]: any }
        export class SplitPaymentMessage implements ISplitPaymentMessage {
            constructor(properties?: ISplitPaymentMessage);
            [key: string]: any;
            static create(properties?: ISplitPaymentMessage): SplitPaymentMessage;
            static encode(message: ISplitPaymentMessage, writer?: any): any;
            static encodeDelimited(message: ISplitPaymentMessage, writer?: any): any;
            static decode(reader: any, length?: number): SplitPaymentMessage;
            static decodeDelimited(reader: any): SplitPaymentMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SplitPaymentMessage;
            static toObject(message: SplitPaymentMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISplitPaymentParticipant { [key: string]: any }
        export class SplitPaymentParticipant implements ISplitPaymentParticipant {
            constructor(properties?: ISplitPaymentParticipant);
            [key: string]: any;
            static create(properties?: ISplitPaymentParticipant): SplitPaymentParticipant;
            static encode(message: ISplitPaymentParticipant, writer?: any): any;
            static encodeDelimited(message: ISplitPaymentParticipant, writer?: any): any;
            static decode(reader: any, length?: number): SplitPaymentParticipant;
            static decodeDelimited(reader: any): SplitPaymentParticipant;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SplitPaymentParticipant;
            static toObject(message: SplitPaymentParticipant, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace SplitPaymentParticipant {
            export enum SplitPaymentStatus {
                PENDING = 0,
                PAID = 1,
            }
        }
        export interface ISplitPaymentUpdateMessage { [key: string]: any }
        export class SplitPaymentUpdateMessage implements ISplitPaymentUpdateMessage {
            constructor(properties?: ISplitPaymentUpdateMessage);
            [key: string]: any;
            static create(properties?: ISplitPaymentUpdateMessage): SplitPaymentUpdateMessage;
            static encode(message: ISplitPaymentUpdateMessage, writer?: any): any;
            static encodeDelimited(message: ISplitPaymentUpdateMessage, writer?: any): any;
            static decode(reader: any, length?: number): SplitPaymentUpdateMessage;
            static decodeDelimited(reader: any): SplitPaymentUpdateMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SplitPaymentUpdateMessage;
            static toObject(message: SplitPaymentUpdateMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IStatusLinkPreviewMetadata { [key: string]: any }
        export class StatusLinkPreviewMetadata implements IStatusLinkPreviewMetadata {
            constructor(properties?: IStatusLinkPreviewMetadata);
            [key: string]: any;
            static create(properties?: IStatusLinkPreviewMetadata): StatusLinkPreviewMetadata;
            static encode(message: IStatusLinkPreviewMetadata, writer?: any): any;
            static encodeDelimited(message: IStatusLinkPreviewMetadata, writer?: any): any;
            static decode(reader: any, length?: number): StatusLinkPreviewMetadata;
            static decodeDelimited(reader: any): StatusLinkPreviewMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusLinkPreviewMetadata;
            static toObject(message: StatusLinkPreviewMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StatusLinkPreviewMetadata {
            export enum Style {
                AUTO = 0,
                COMPACT = 1,
                FULL = 2,
                IMMERSIVE = 3,
            }
        }
        export interface IStatusNotificationMessage { [key: string]: any }
        export class StatusNotificationMessage implements IStatusNotificationMessage {
            constructor(properties?: IStatusNotificationMessage);
            [key: string]: any;
            static create(properties?: IStatusNotificationMessage): StatusNotificationMessage;
            static encode(message: IStatusNotificationMessage, writer?: any): any;
            static encodeDelimited(message: IStatusNotificationMessage, writer?: any): any;
            static decode(reader: any, length?: number): StatusNotificationMessage;
            static decodeDelimited(reader: any): StatusNotificationMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusNotificationMessage;
            static toObject(message: StatusNotificationMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StatusNotificationMessage {
            export enum StatusNotificationType {
                UNKNOWN = 0,
                STATUS_ADD_YOURS = 1,
                STATUS_RESHARE = 2,
                STATUS_QUESTION_ANSWER_RESHARE = 3,
                STATUS_GROUP_STATUS_REPLY = 4,
            }
        }
        export interface IStatusQuestionAnswerMessage { [key: string]: any }
        export class StatusQuestionAnswerMessage implements IStatusQuestionAnswerMessage {
            constructor(properties?: IStatusQuestionAnswerMessage);
            [key: string]: any;
            static create(properties?: IStatusQuestionAnswerMessage): StatusQuestionAnswerMessage;
            static encode(message: IStatusQuestionAnswerMessage, writer?: any): any;
            static encodeDelimited(message: IStatusQuestionAnswerMessage, writer?: any): any;
            static decode(reader: any, length?: number): StatusQuestionAnswerMessage;
            static decodeDelimited(reader: any): StatusQuestionAnswerMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusQuestionAnswerMessage;
            static toObject(message: StatusQuestionAnswerMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IStatusQuotedMessage { [key: string]: any }
        export class StatusQuotedMessage implements IStatusQuotedMessage {
            constructor(properties?: IStatusQuotedMessage);
            [key: string]: any;
            static create(properties?: IStatusQuotedMessage): StatusQuotedMessage;
            static encode(message: IStatusQuotedMessage, writer?: any): any;
            static encodeDelimited(message: IStatusQuotedMessage, writer?: any): any;
            static decode(reader: any, length?: number): StatusQuotedMessage;
            static decodeDelimited(reader: any): StatusQuotedMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusQuotedMessage;
            static toObject(message: StatusQuotedMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StatusQuotedMessage {
            export enum StatusQuotedMessageType {
                QUESTION_ANSWER = 1,
            }
        }
        export interface IStatusStickerInteractionMessage { [key: string]: any }
        export class StatusStickerInteractionMessage implements IStatusStickerInteractionMessage {
            constructor(properties?: IStatusStickerInteractionMessage);
            [key: string]: any;
            static create(properties?: IStatusStickerInteractionMessage): StatusStickerInteractionMessage;
            static encode(message: IStatusStickerInteractionMessage, writer?: any): any;
            static encodeDelimited(message: IStatusStickerInteractionMessage, writer?: any): any;
            static decode(reader: any, length?: number): StatusStickerInteractionMessage;
            static decodeDelimited(reader: any): StatusStickerInteractionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusStickerInteractionMessage;
            static toObject(message: StatusStickerInteractionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StatusStickerInteractionMessage {
            export enum StatusStickerType {
                UNKNOWN = 0,
                REACTION = 1,
            }
        }
        export interface IStickerMessage { [key: string]: any }
        export class StickerMessage implements IStickerMessage {
            constructor(properties?: IStickerMessage);
            [key: string]: any;
            static create(properties?: IStickerMessage): StickerMessage;
            static encode(message: IStickerMessage, writer?: any): any;
            static encodeDelimited(message: IStickerMessage, writer?: any): any;
            static decode(reader: any, length?: number): StickerMessage;
            static decodeDelimited(reader: any): StickerMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StickerMessage;
            static toObject(message: StickerMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IStickerPackMessage { [key: string]: any }
        export class StickerPackMessage implements IStickerPackMessage {
            constructor(properties?: IStickerPackMessage);
            [key: string]: any;
            static create(properties?: IStickerPackMessage): StickerPackMessage;
            static encode(message: IStickerPackMessage, writer?: any): any;
            static encodeDelimited(message: IStickerPackMessage, writer?: any): any;
            static decode(reader: any, length?: number): StickerPackMessage;
            static decodeDelimited(reader: any): StickerPackMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StickerPackMessage;
            static toObject(message: StickerPackMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StickerPackMessage {
            export interface ISticker { [key: string]: any }
            export class Sticker implements ISticker {
                constructor(properties?: ISticker);
                [key: string]: any;
                static create(properties?: ISticker): Sticker;
                static encode(message: ISticker, writer?: any): any;
                static encodeDelimited(message: ISticker, writer?: any): any;
                static decode(reader: any, length?: number): Sticker;
                static decodeDelimited(reader: any): Sticker;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Sticker;
                static toObject(message: Sticker, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export enum StickerPackOrigin {
                FIRST_PARTY = 0,
                THIRD_PARTY = 1,
                USER_CREATED = 2,
            }
        }
        export interface IStickerSyncRMRMessage { [key: string]: any }
        export class StickerSyncRMRMessage implements IStickerSyncRMRMessage {
            constructor(properties?: IStickerSyncRMRMessage);
            [key: string]: any;
            static create(properties?: IStickerSyncRMRMessage): StickerSyncRMRMessage;
            static encode(message: IStickerSyncRMRMessage, writer?: any): any;
            static encodeDelimited(message: IStickerSyncRMRMessage, writer?: any): any;
            static decode(reader: any, length?: number): StickerSyncRMRMessage;
            static decodeDelimited(reader: any): StickerSyncRMRMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StickerSyncRMRMessage;
            static toObject(message: StickerSyncRMRMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ITemplateButtonReplyMessage { [key: string]: any }
        export class TemplateButtonReplyMessage implements ITemplateButtonReplyMessage {
            constructor(properties?: ITemplateButtonReplyMessage);
            [key: string]: any;
            static create(properties?: ITemplateButtonReplyMessage): TemplateButtonReplyMessage;
            static encode(message: ITemplateButtonReplyMessage, writer?: any): any;
            static encodeDelimited(message: ITemplateButtonReplyMessage, writer?: any): any;
            static decode(reader: any, length?: number): TemplateButtonReplyMessage;
            static decodeDelimited(reader: any): TemplateButtonReplyMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): TemplateButtonReplyMessage;
            static toObject(message: TemplateButtonReplyMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ITemplateMessage { [key: string]: any }
        export class TemplateMessage implements ITemplateMessage {
            constructor(properties?: ITemplateMessage);
            [key: string]: any;
            static create(properties?: ITemplateMessage): TemplateMessage;
            static encode(message: ITemplateMessage, writer?: any): any;
            static encodeDelimited(message: ITemplateMessage, writer?: any): any;
            static decode(reader: any, length?: number): TemplateMessage;
            static decodeDelimited(reader: any): TemplateMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): TemplateMessage;
            static toObject(message: TemplateMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace TemplateMessage {
            export interface IFourRowTemplate { [key: string]: any }
            export class FourRowTemplate implements IFourRowTemplate {
                constructor(properties?: IFourRowTemplate);
                [key: string]: any;
                static create(properties?: IFourRowTemplate): FourRowTemplate;
                static encode(message: IFourRowTemplate, writer?: any): any;
                static encodeDelimited(message: IFourRowTemplate, writer?: any): any;
                static decode(reader: any, length?: number): FourRowTemplate;
                static decodeDelimited(reader: any): FourRowTemplate;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): FourRowTemplate;
                static toObject(message: FourRowTemplate, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IHydratedFourRowTemplate { [key: string]: any }
            export class HydratedFourRowTemplate implements IHydratedFourRowTemplate {
                constructor(properties?: IHydratedFourRowTemplate);
                [key: string]: any;
                static create(properties?: IHydratedFourRowTemplate): HydratedFourRowTemplate;
                static encode(message: IHydratedFourRowTemplate, writer?: any): any;
                static encodeDelimited(message: IHydratedFourRowTemplate, writer?: any): any;
                static decode(reader: any, length?: number): HydratedFourRowTemplate;
                static decodeDelimited(reader: any): HydratedFourRowTemplate;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): HydratedFourRowTemplate;
                static toObject(message: HydratedFourRowTemplate, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IURLMetadata { [key: string]: any }
        export class URLMetadata implements IURLMetadata {
            constructor(properties?: IURLMetadata);
            [key: string]: any;
            static create(properties?: IURLMetadata): URLMetadata;
            static encode(message: IURLMetadata, writer?: any): any;
            static encodeDelimited(message: IURLMetadata, writer?: any): any;
            static decode(reader: any, length?: number): URLMetadata;
            static decodeDelimited(reader: any): URLMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): URLMetadata;
            static toObject(message: URLMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IVideoEndCard { [key: string]: any }
        export class VideoEndCard implements IVideoEndCard {
            constructor(properties?: IVideoEndCard);
            [key: string]: any;
            static create(properties?: IVideoEndCard): VideoEndCard;
            static encode(message: IVideoEndCard, writer?: any): any;
            static encodeDelimited(message: IVideoEndCard, writer?: any): any;
            static decode(reader: any, length?: number): VideoEndCard;
            static decodeDelimited(reader: any): VideoEndCard;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): VideoEndCard;
            static toObject(message: VideoEndCard, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IVideoMessage { [key: string]: any }
        export class VideoMessage implements IVideoMessage {
            constructor(properties?: IVideoMessage);
            [key: string]: any;
            static create(properties?: IVideoMessage): VideoMessage;
            static encode(message: IVideoMessage, writer?: any): any;
            static encodeDelimited(message: IVideoMessage, writer?: any): any;
            static decode(reader: any, length?: number): VideoMessage;
            static decodeDelimited(reader: any): VideoMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): VideoMessage;
            static toObject(message: VideoMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace VideoMessage {
            export enum Attribution {
                NONE = 0,
                GIPHY = 1,
                TENOR = 2,
                KLIPY = 3,
            }
            export enum VideoSourceType {
                USER_VIDEO = 0,
                AI_GENERATED = 1,
            }
        }
    }
    export interface IMessageAddOn { [key: string]: any }
    export class MessageAddOn implements IMessageAddOn {
        constructor(properties?: IMessageAddOn);
        [key: string]: any;
        static create(properties?: IMessageAddOn): MessageAddOn;
        static encode(message: IMessageAddOn, writer?: any): any;
        static encodeDelimited(message: IMessageAddOn, writer?: any): any;
        static decode(reader: any, length?: number): MessageAddOn;
        static decodeDelimited(reader: any): MessageAddOn;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessageAddOn;
        static toObject(message: MessageAddOn, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MessageAddOn {
        export enum MessageAddOnType {
            UNDEFINED = 0,
            REACTION = 1,
            EVENT_RESPONSE = 2,
            POLL_UPDATE = 3,
            PIN_IN_CHAT = 4,
        }
    }
    export interface IMessageAddOnContextInfo { [key: string]: any }
    export class MessageAddOnContextInfo implements IMessageAddOnContextInfo {
        constructor(properties?: IMessageAddOnContextInfo);
        [key: string]: any;
        static create(properties?: IMessageAddOnContextInfo): MessageAddOnContextInfo;
        static encode(message: IMessageAddOnContextInfo, writer?: any): any;
        static encodeDelimited(message: IMessageAddOnContextInfo, writer?: any): any;
        static decode(reader: any, length?: number): MessageAddOnContextInfo;
        static decodeDelimited(reader: any): MessageAddOnContextInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessageAddOnContextInfo;
        static toObject(message: MessageAddOnContextInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMessageAssociation { [key: string]: any }
    export class MessageAssociation implements IMessageAssociation {
        constructor(properties?: IMessageAssociation);
        [key: string]: any;
        static create(properties?: IMessageAssociation): MessageAssociation;
        static encode(message: IMessageAssociation, writer?: any): any;
        static encodeDelimited(message: IMessageAssociation, writer?: any): any;
        static decode(reader: any, length?: number): MessageAssociation;
        static decodeDelimited(reader: any): MessageAssociation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessageAssociation;
        static toObject(message: MessageAssociation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MessageAssociation {
        export enum AssociationType {
            UNKNOWN = 0,
            MEDIA_ALBUM = 1,
            BOT_PLUGIN = 2,
            EVENT_COVER_IMAGE = 3,
            STATUS_POLL = 4,
            HD_VIDEO_DUAL_UPLOAD = 5,
            STATUS_EXTERNAL_RESHARE = 6,
            MEDIA_POLL = 7,
            STATUS_ADD_YOURS = 8,
            STATUS_NOTIFICATION = 9,
            HD_IMAGE_DUAL_UPLOAD = 10,
            STICKER_ANNOTATION = 11,
            MOTION_PHOTO = 12,
            STATUS_LINK_ACTION = 13,
            VIEW_ALL_REPLIES = 14,
            STATUS_ADD_YOURS_AI_IMAGINE = 15,
            STATUS_QUESTION = 16,
            STATUS_ADD_YOURS_DIWALI = 17,
            STATUS_REACTION = 18,
            HEVC_VIDEO_DUAL_UPLOAD = 19,
            POLL_ADD_OPTION = 20,
        }
    }
    export interface IMessageContextInfo { [key: string]: any }
    export class MessageContextInfo implements IMessageContextInfo {
        constructor(properties?: IMessageContextInfo);
        [key: string]: any;
        static create(properties?: IMessageContextInfo): MessageContextInfo;
        static encode(message: IMessageContextInfo, writer?: any): any;
        static encodeDelimited(message: IMessageContextInfo, writer?: any): any;
        static decode(reader: any, length?: number): MessageContextInfo;
        static decodeDelimited(reader: any): MessageContextInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessageContextInfo;
        static toObject(message: MessageContextInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MessageContextInfo {
        export enum MessageAddonExpiryType {
            STATIC = 1,
            DEPENDENT_ON_PARENT = 2,
        }
    }
    export interface IMessageKey { [key: string]: any }
    export class MessageKey implements IMessageKey {
        constructor(properties?: IMessageKey);
        [key: string]: any;
        static create(properties?: IMessageKey): MessageKey;
        static encode(message: IMessageKey, writer?: any): any;
        static encodeDelimited(message: IMessageKey, writer?: any): any;
        static decode(reader: any, length?: number): MessageKey;
        static decodeDelimited(reader: any): MessageKey;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessageKey;
        static toObject(message: MessageKey, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMessageSecretMessage { [key: string]: any }
    export class MessageSecretMessage implements IMessageSecretMessage {
        constructor(properties?: IMessageSecretMessage);
        [key: string]: any;
        static create(properties?: IMessageSecretMessage): MessageSecretMessage;
        static encode(message: IMessageSecretMessage, writer?: any): any;
        static encodeDelimited(message: IMessageSecretMessage, writer?: any): any;
        static decode(reader: any, length?: number): MessageSecretMessage;
        static decodeDelimited(reader: any): MessageSecretMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessageSecretMessage;
        static toObject(message: MessageSecretMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMessageText { [key: string]: any }
    export class MessageText implements IMessageText {
        constructor(properties?: IMessageText);
        [key: string]: any;
        static create(properties?: IMessageText): MessageText;
        static encode(message: IMessageText, writer?: any): any;
        static encodeDelimited(message: IMessageText, writer?: any): any;
        static decode(reader: any, length?: number): MessageText;
        static decodeDelimited(reader: any): MessageText;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessageText;
        static toObject(message: MessageText, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMessagingMailboxPublicData { [key: string]: any }
    export class MessagingMailboxPublicData implements IMessagingMailboxPublicData {
        constructor(properties?: IMessagingMailboxPublicData);
        [key: string]: any;
        static create(properties?: IMessagingMailboxPublicData): MessagingMailboxPublicData;
        static encode(message: IMessagingMailboxPublicData, writer?: any): any;
        static encodeDelimited(message: IMessagingMailboxPublicData, writer?: any): any;
        static decode(reader: any, length?: number): MessagingMailboxPublicData;
        static decodeDelimited(reader: any): MessagingMailboxPublicData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MessagingMailboxPublicData;
        static toObject(message: MessagingMailboxPublicData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosClientConfig { [key: string]: any }
    export class MinosClientConfig implements IMinosClientConfig {
        constructor(properties?: IMinosClientConfig);
        [key: string]: any;
        static create(properties?: IMinosClientConfig): MinosClientConfig;
        static encode(message: IMinosClientConfig, writer?: any): any;
        static encodeDelimited(message: IMinosClientConfig, writer?: any): any;
        static decode(reader: any, length?: number): MinosClientConfig;
        static decodeDelimited(reader: any): MinosClientConfig;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosClientConfig;
        static toObject(message: MinosClientConfig, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosCommand { [key: string]: any }
    export class MinosCommand implements IMinosCommand {
        constructor(properties?: IMinosCommand);
        [key: string]: any;
        static create(properties?: IMinosCommand): MinosCommand;
        static encode(message: IMinosCommand, writer?: any): any;
        static encodeDelimited(message: IMinosCommand, writer?: any): any;
        static decode(reader: any, length?: number): MinosCommand;
        static decodeDelimited(reader: any): MinosCommand;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosCommand;
        static toObject(message: MinosCommand, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosDecryptAndVerifyMessageInput { [key: string]: any }
    export class MinosDecryptAndVerifyMessageInput implements IMinosDecryptAndVerifyMessageInput {
        constructor(properties?: IMinosDecryptAndVerifyMessageInput);
        [key: string]: any;
        static create(properties?: IMinosDecryptAndVerifyMessageInput): MinosDecryptAndVerifyMessageInput;
        static encode(message: IMinosDecryptAndVerifyMessageInput, writer?: any): any;
        static encodeDelimited(message: IMinosDecryptAndVerifyMessageInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosDecryptAndVerifyMessageInput;
        static decodeDelimited(reader: any): MinosDecryptAndVerifyMessageInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosDecryptAndVerifyMessageInput;
        static toObject(message: MinosDecryptAndVerifyMessageInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosDecryptAndVerifyMessageResult { [key: string]: any }
    export class MinosDecryptAndVerifyMessageResult implements IMinosDecryptAndVerifyMessageResult {
        constructor(properties?: IMinosDecryptAndVerifyMessageResult);
        [key: string]: any;
        static create(properties?: IMinosDecryptAndVerifyMessageResult): MinosDecryptAndVerifyMessageResult;
        static encode(message: IMinosDecryptAndVerifyMessageResult, writer?: any): any;
        static encodeDelimited(message: IMinosDecryptAndVerifyMessageResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosDecryptAndVerifyMessageResult;
        static decodeDelimited(reader: any): MinosDecryptAndVerifyMessageResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosDecryptAndVerifyMessageResult;
        static toObject(message: MinosDecryptAndVerifyMessageResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosDecryptAndVerifyMessageSuccess { [key: string]: any }
    export class MinosDecryptAndVerifyMessageSuccess implements IMinosDecryptAndVerifyMessageSuccess {
        constructor(properties?: IMinosDecryptAndVerifyMessageSuccess);
        [key: string]: any;
        static create(properties?: IMinosDecryptAndVerifyMessageSuccess): MinosDecryptAndVerifyMessageSuccess;
        static encode(message: IMinosDecryptAndVerifyMessageSuccess, writer?: any): any;
        static encodeDelimited(message: IMinosDecryptAndVerifyMessageSuccess, writer?: any): any;
        static decode(reader: any, length?: number): MinosDecryptAndVerifyMessageSuccess;
        static decodeDelimited(reader: any): MinosDecryptAndVerifyMessageSuccess;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosDecryptAndVerifyMessageSuccess;
        static toObject(message: MinosDecryptAndVerifyMessageSuccess, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosEncryptAndSignMessageInput { [key: string]: any }
    export class MinosEncryptAndSignMessageInput implements IMinosEncryptAndSignMessageInput {
        constructor(properties?: IMinosEncryptAndSignMessageInput);
        [key: string]: any;
        static create(properties?: IMinosEncryptAndSignMessageInput): MinosEncryptAndSignMessageInput;
        static encode(message: IMinosEncryptAndSignMessageInput, writer?: any): any;
        static encodeDelimited(message: IMinosEncryptAndSignMessageInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosEncryptAndSignMessageInput;
        static decodeDelimited(reader: any): MinosEncryptAndSignMessageInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosEncryptAndSignMessageInput;
        static toObject(message: MinosEncryptAndSignMessageInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosEncryptAndSignMessageResult { [key: string]: any }
    export class MinosEncryptAndSignMessageResult implements IMinosEncryptAndSignMessageResult {
        constructor(properties?: IMinosEncryptAndSignMessageResult);
        [key: string]: any;
        static create(properties?: IMinosEncryptAndSignMessageResult): MinosEncryptAndSignMessageResult;
        static encode(message: IMinosEncryptAndSignMessageResult, writer?: any): any;
        static encodeDelimited(message: IMinosEncryptAndSignMessageResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosEncryptAndSignMessageResult;
        static decodeDelimited(reader: any): MinosEncryptAndSignMessageResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosEncryptAndSignMessageResult;
        static toObject(message: MinosEncryptAndSignMessageResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosMessageMetadata { [key: string]: any }
    export class MinosMessageMetadata implements IMinosMessageMetadata {
        constructor(properties?: IMinosMessageMetadata);
        [key: string]: any;
        static create(properties?: IMinosMessageMetadata): MinosMessageMetadata;
        static encode(message: IMinosMessageMetadata, writer?: any): any;
        static encodeDelimited(message: IMinosMessageMetadata, writer?: any): any;
        static decode(reader: any, length?: number): MinosMessageMetadata;
        static decodeDelimited(reader: any): MinosMessageMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosMessageMetadata;
        static toObject(message: MinosMessageMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosOpenEpochInput { [key: string]: any }
    export class MinosOpenEpochInput implements IMinosOpenEpochInput {
        constructor(properties?: IMinosOpenEpochInput);
        [key: string]: any;
        static create(properties?: IMinosOpenEpochInput): MinosOpenEpochInput;
        static encode(message: IMinosOpenEpochInput, writer?: any): any;
        static encodeDelimited(message: IMinosOpenEpochInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosOpenEpochInput;
        static decodeDelimited(reader: any): MinosOpenEpochInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosOpenEpochInput;
        static toObject(message: MinosOpenEpochInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosOpenEpochResult { [key: string]: any }
    export class MinosOpenEpochResult implements IMinosOpenEpochResult {
        constructor(properties?: IMinosOpenEpochResult);
        [key: string]: any;
        static create(properties?: IMinosOpenEpochResult): MinosOpenEpochResult;
        static encode(message: IMinosOpenEpochResult, writer?: any): any;
        static encodeDelimited(message: IMinosOpenEpochResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosOpenEpochResult;
        static decodeDelimited(reader: any): MinosOpenEpochResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosOpenEpochResult;
        static toObject(message: MinosOpenEpochResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosOpenInitialEpochInput { [key: string]: any }
    export class MinosOpenInitialEpochInput implements IMinosOpenInitialEpochInput {
        constructor(properties?: IMinosOpenInitialEpochInput);
        [key: string]: any;
        static create(properties?: IMinosOpenInitialEpochInput): MinosOpenInitialEpochInput;
        static encode(message: IMinosOpenInitialEpochInput, writer?: any): any;
        static encodeDelimited(message: IMinosOpenInitialEpochInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosOpenInitialEpochInput;
        static decodeDelimited(reader: any): MinosOpenInitialEpochInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosOpenInitialEpochInput;
        static toObject(message: MinosOpenInitialEpochInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosOpenInitialEpochResult { [key: string]: any }
    export class MinosOpenInitialEpochResult implements IMinosOpenInitialEpochResult {
        constructor(properties?: IMinosOpenInitialEpochResult);
        [key: string]: any;
        static create(properties?: IMinosOpenInitialEpochResult): MinosOpenInitialEpochResult;
        static encode(message: IMinosOpenInitialEpochResult, writer?: any): any;
        static encodeDelimited(message: IMinosOpenInitialEpochResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosOpenInitialEpochResult;
        static decodeDelimited(reader: any): MinosOpenInitialEpochResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosOpenInitialEpochResult;
        static toObject(message: MinosOpenInitialEpochResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosSignedEpoch { [key: string]: any }
    export class MinosSignedEpoch implements IMinosSignedEpoch {
        constructor(properties?: IMinosSignedEpoch);
        [key: string]: any;
        static create(properties?: IMinosSignedEpoch): MinosSignedEpoch;
        static encode(message: IMinosSignedEpoch, writer?: any): any;
        static encodeDelimited(message: IMinosSignedEpoch, writer?: any): any;
        static decode(reader: any, length?: number): MinosSignedEpoch;
        static decodeDelimited(reader: any): MinosSignedEpoch;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosSignedEpoch;
        static toObject(message: MinosSignedEpoch, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosThreadIdFromActThreadIdInput { [key: string]: any }
    export class MinosThreadIdFromActThreadIdInput implements IMinosThreadIdFromActThreadIdInput {
        constructor(properties?: IMinosThreadIdFromActThreadIdInput);
        [key: string]: any;
        static create(properties?: IMinosThreadIdFromActThreadIdInput): MinosThreadIdFromActThreadIdInput;
        static encode(message: IMinosThreadIdFromActThreadIdInput, writer?: any): any;
        static encodeDelimited(message: IMinosThreadIdFromActThreadIdInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosThreadIdFromActThreadIdInput;
        static decodeDelimited(reader: any): MinosThreadIdFromActThreadIdInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosThreadIdFromActThreadIdInput;
        static toObject(message: MinosThreadIdFromActThreadIdInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosThreadIdFromActThreadIdResult { [key: string]: any }
    export class MinosThreadIdFromActThreadIdResult implements IMinosThreadIdFromActThreadIdResult {
        constructor(properties?: IMinosThreadIdFromActThreadIdResult);
        [key: string]: any;
        static create(properties?: IMinosThreadIdFromActThreadIdResult): MinosThreadIdFromActThreadIdResult;
        static encode(message: IMinosThreadIdFromActThreadIdResult, writer?: any): any;
        static encodeDelimited(message: IMinosThreadIdFromActThreadIdResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosThreadIdFromActThreadIdResult;
        static decodeDelimited(reader: any): MinosThreadIdFromActThreadIdResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosThreadIdFromActThreadIdResult;
        static toObject(message: MinosThreadIdFromActThreadIdResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosThreadIdFromOneToOneThreadInput { [key: string]: any }
    export class MinosThreadIdFromOneToOneThreadInput implements IMinosThreadIdFromOneToOneThreadInput {
        constructor(properties?: IMinosThreadIdFromOneToOneThreadInput);
        [key: string]: any;
        static create(properties?: IMinosThreadIdFromOneToOneThreadInput): MinosThreadIdFromOneToOneThreadInput;
        static encode(message: IMinosThreadIdFromOneToOneThreadInput, writer?: any): any;
        static encodeDelimited(message: IMinosThreadIdFromOneToOneThreadInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosThreadIdFromOneToOneThreadInput;
        static decodeDelimited(reader: any): MinosThreadIdFromOneToOneThreadInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosThreadIdFromOneToOneThreadInput;
        static toObject(message: MinosThreadIdFromOneToOneThreadInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosThreadIdFromOneToOneThreadResult { [key: string]: any }
    export class MinosThreadIdFromOneToOneThreadResult implements IMinosThreadIdFromOneToOneThreadResult {
        constructor(properties?: IMinosThreadIdFromOneToOneThreadResult);
        [key: string]: any;
        static create(properties?: IMinosThreadIdFromOneToOneThreadResult): MinosThreadIdFromOneToOneThreadResult;
        static encode(message: IMinosThreadIdFromOneToOneThreadResult, writer?: any): any;
        static encodeDelimited(message: IMinosThreadIdFromOneToOneThreadResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosThreadIdFromOneToOneThreadResult;
        static decodeDelimited(reader: any): MinosThreadIdFromOneToOneThreadResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosThreadIdFromOneToOneThreadResult;
        static toObject(message: MinosThreadIdFromOneToOneThreadResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosValidateEpochInput { [key: string]: any }
    export class MinosValidateEpochInput implements IMinosValidateEpochInput {
        constructor(properties?: IMinosValidateEpochInput);
        [key: string]: any;
        static create(properties?: IMinosValidateEpochInput): MinosValidateEpochInput;
        static encode(message: IMinosValidateEpochInput, writer?: any): any;
        static encodeDelimited(message: IMinosValidateEpochInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosValidateEpochInput;
        static decodeDelimited(reader: any): MinosValidateEpochInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosValidateEpochInput;
        static toObject(message: MinosValidateEpochInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosValidateEpochResult { [key: string]: any }
    export class MinosValidateEpochResult implements IMinosValidateEpochResult {
        constructor(properties?: IMinosValidateEpochResult);
        [key: string]: any;
        static create(properties?: IMinosValidateEpochResult): MinosValidateEpochResult;
        static encode(message: IMinosValidateEpochResult, writer?: any): any;
        static encodeDelimited(message: IMinosValidateEpochResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosValidateEpochResult;
        static decodeDelimited(reader: any): MinosValidateEpochResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosValidateEpochResult;
        static toObject(message: MinosValidateEpochResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosVerifySingleEpochInput { [key: string]: any }
    export class MinosVerifySingleEpochInput implements IMinosVerifySingleEpochInput {
        constructor(properties?: IMinosVerifySingleEpochInput);
        [key: string]: any;
        static create(properties?: IMinosVerifySingleEpochInput): MinosVerifySingleEpochInput;
        static encode(message: IMinosVerifySingleEpochInput, writer?: any): any;
        static encodeDelimited(message: IMinosVerifySingleEpochInput, writer?: any): any;
        static decode(reader: any, length?: number): MinosVerifySingleEpochInput;
        static decodeDelimited(reader: any): MinosVerifySingleEpochInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosVerifySingleEpochInput;
        static toObject(message: MinosVerifySingleEpochInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMinosVerifySingleEpochResult { [key: string]: any }
    export class MinosVerifySingleEpochResult implements IMinosVerifySingleEpochResult {
        constructor(properties?: IMinosVerifySingleEpochResult);
        [key: string]: any;
        static create(properties?: IMinosVerifySingleEpochResult): MinosVerifySingleEpochResult;
        static encode(message: IMinosVerifySingleEpochResult, writer?: any): any;
        static encodeDelimited(message: IMinosVerifySingleEpochResult, writer?: any): any;
        static decode(reader: any, length?: number): MinosVerifySingleEpochResult;
        static decodeDelimited(reader: any): MinosVerifySingleEpochResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MinosVerifySingleEpochResult;
        static toObject(message: MinosVerifySingleEpochResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMmkDistribution { [key: string]: any }
    export class MmkDistribution implements IMmkDistribution {
        constructor(properties?: IMmkDistribution);
        [key: string]: any;
        static create(properties?: IMmkDistribution): MmkDistribution;
        static encode(message: IMmkDistribution, writer?: any): any;
        static encodeDelimited(message: IMmkDistribution, writer?: any): any;
        static decode(reader: any, length?: number): MmkDistribution;
        static decodeDelimited(reader: any): MmkDistribution;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MmkDistribution;
        static toObject(message: MmkDistribution, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMmkDistributionToDetachedDevice { [key: string]: any }
    export class MmkDistributionToDetachedDevice implements IMmkDistributionToDetachedDevice {
        constructor(properties?: IMmkDistributionToDetachedDevice);
        [key: string]: any;
        static create(properties?: IMmkDistributionToDetachedDevice): MmkDistributionToDetachedDevice;
        static encode(message: IMmkDistributionToDetachedDevice, writer?: any): any;
        static encodeDelimited(message: IMmkDistributionToDetachedDevice, writer?: any): any;
        static decode(reader: any, length?: number): MmkDistributionToDetachedDevice;
        static decodeDelimited(reader: any): MmkDistributionToDetachedDevice;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MmkDistributionToDetachedDevice;
        static toObject(message: MmkDistributionToDetachedDevice, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMmkDistributionToMailbox { [key: string]: any }
    export class MmkDistributionToMailbox implements IMmkDistributionToMailbox {
        constructor(properties?: IMmkDistributionToMailbox);
        [key: string]: any;
        static create(properties?: IMmkDistributionToMailbox): MmkDistributionToMailbox;
        static encode(message: IMmkDistributionToMailbox, writer?: any): any;
        static encodeDelimited(message: IMmkDistributionToMailbox, writer?: any): any;
        static decode(reader: any, length?: number): MmkDistributionToMailbox;
        static decodeDelimited(reader: any): MmkDistributionToMailbox;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MmkDistributionToMailbox;
        static toObject(message: MmkDistributionToMailbox, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMmkFromDetachedDevice { [key: string]: any }
    export class MmkFromDetachedDevice implements IMmkFromDetachedDevice {
        constructor(properties?: IMmkFromDetachedDevice);
        [key: string]: any;
        static create(properties?: IMmkFromDetachedDevice): MmkFromDetachedDevice;
        static encode(message: IMmkFromDetachedDevice, writer?: any): any;
        static encodeDelimited(message: IMmkFromDetachedDevice, writer?: any): any;
        static decode(reader: any, length?: number): MmkFromDetachedDevice;
        static decodeDelimited(reader: any): MmkFromDetachedDevice;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MmkFromDetachedDevice;
        static toObject(message: MmkFromDetachedDevice, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMoney { [key: string]: any }
    export class Money implements IMoney {
        constructor(properties?: IMoney);
        [key: string]: any;
        static create(properties?: IMoney): Money;
        static encode(message: IMoney, writer?: any): any;
        static encodeDelimited(message: IMoney, writer?: any): any;
        static decode(reader: any, length?: number): Money;
        static decodeDelimited(reader: any): Money;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Money;
        static toObject(message: Money, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IMsgOpaqueData { [key: string]: any }
    export class MsgOpaqueData implements IMsgOpaqueData {
        constructor(properties?: IMsgOpaqueData);
        [key: string]: any;
        static create(properties?: IMsgOpaqueData): MsgOpaqueData;
        static encode(message: IMsgOpaqueData, writer?: any): any;
        static encodeDelimited(message: IMsgOpaqueData, writer?: any): any;
        static decode(reader: any, length?: number): MsgOpaqueData;
        static decodeDelimited(reader: any): MsgOpaqueData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MsgOpaqueData;
        static toObject(message: MsgOpaqueData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace MsgOpaqueData {
        export interface IEventLocation { [key: string]: any }
        export class EventLocation implements IEventLocation {
            constructor(properties?: IEventLocation);
            [key: string]: any;
            static create(properties?: IEventLocation): EventLocation;
            static encode(message: IEventLocation, writer?: any): any;
            static encodeDelimited(message: IEventLocation, writer?: any): any;
            static decode(reader: any, length?: number): EventLocation;
            static decodeDelimited(reader: any): EventLocation;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): EventLocation;
            static toObject(message: EventLocation, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum PollContentType {
            UNKNOWN = 0,
            TEXT = 1,
            IMAGE = 2,
        }
        export interface IPollOption { [key: string]: any }
        export class PollOption implements IPollOption {
            constructor(properties?: IPollOption);
            [key: string]: any;
            static create(properties?: IPollOption): PollOption;
            static encode(message: IPollOption, writer?: any): any;
            static encodeDelimited(message: IPollOption, writer?: any): any;
            static decode(reader: any, length?: number): PollOption;
            static decodeDelimited(reader: any): PollOption;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollOption;
            static toObject(message: PollOption, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum PollType {
            POLL = 0,
            QUIZ = 1,
        }
        export interface IPollVoteSnapshot { [key: string]: any }
        export class PollVoteSnapshot implements IPollVoteSnapshot {
            constructor(properties?: IPollVoteSnapshot);
            [key: string]: any;
            static create(properties?: IPollVoteSnapshot): PollVoteSnapshot;
            static encode(message: IPollVoteSnapshot, writer?: any): any;
            static encodeDelimited(message: IPollVoteSnapshot, writer?: any): any;
            static decode(reader: any, length?: number): PollVoteSnapshot;
            static decodeDelimited(reader: any): PollVoteSnapshot;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollVoteSnapshot;
            static toObject(message: PollVoteSnapshot, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPollVotesSnapshot { [key: string]: any }
        export class PollVotesSnapshot implements IPollVotesSnapshot {
            constructor(properties?: IPollVotesSnapshot);
            [key: string]: any;
            static create(properties?: IPollVotesSnapshot): PollVotesSnapshot;
            static encode(message: IPollVotesSnapshot, writer?: any): any;
            static encodeDelimited(message: IPollVotesSnapshot, writer?: any): any;
            static decode(reader: any, length?: number): PollVotesSnapshot;
            static decodeDelimited(reader: any): PollVotesSnapshot;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollVotesSnapshot;
            static toObject(message: PollVotesSnapshot, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IMsgRowOpaqueData { [key: string]: any }
    export class MsgRowOpaqueData implements IMsgRowOpaqueData {
        constructor(properties?: IMsgRowOpaqueData);
        [key: string]: any;
        static create(properties?: IMsgRowOpaqueData): MsgRowOpaqueData;
        static encode(message: IMsgRowOpaqueData, writer?: any): any;
        static encodeDelimited(message: IMsgRowOpaqueData, writer?: any): any;
        static decode(reader: any, length?: number): MsgRowOpaqueData;
        static decodeDelimited(reader: any): MsgRowOpaqueData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): MsgRowOpaqueData;
        static toObject(message: MsgRowOpaqueData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum MutationProps {
        STAR_ACTION = 2,
        CONTACT_ACTION = 3,
        MUTE_ACTION = 4,
        PIN_ACTION = 5,
        SECURITY_NOTIFICATION_SETTING = 6,
        PUSH_NAME_SETTING = 7,
        QUICK_REPLY_ACTION = 8,
        RECENT_EMOJI_WEIGHTS_ACTION = 11,
        LABEL_MESSAGE_ACTION = 13,
        LABEL_EDIT_ACTION = 14,
        LABEL_ASSOCIATION_ACTION = 15,
        LOCALE_SETTING = 16,
        ARCHIVE_CHAT_ACTION = 17,
        DELETE_MESSAGE_FOR_ME_ACTION = 18,
        KEY_EXPIRATION = 19,
        MARK_CHAT_AS_READ_ACTION = 20,
        CLEAR_CHAT_ACTION = 21,
        DELETE_CHAT_ACTION = 22,
        UNARCHIVE_CHATS_SETTING = 23,
        PRIMARY_FEATURE = 24,
        ANDROID_UNSUPPORTED_ACTIONS = 26,
        AGENT_ACTION = 27,
        SUBSCRIPTION_ACTION = 28,
        USER_STATUS_MUTE_ACTION = 29,
        TIME_FORMAT_ACTION = 30,
        NUX_ACTION = 31,
        PRIMARY_VERSION_ACTION = 32,
        STICKER_ACTION = 33,
        REMOVE_RECENT_STICKER_ACTION = 34,
        CHAT_ASSIGNMENT = 35,
        CHAT_ASSIGNMENT_OPENED_STATUS = 36,
        PN_FOR_LID_CHAT_ACTION = 37,
        MARKETING_MESSAGE_ACTION = 38,
        MARKETING_MESSAGE_BROADCAST_ACTION = 39,
        EXTERNAL_WEB_BETA_ACTION = 40,
        PRIVACY_SETTING_RELAY_ALL_CALLS = 41,
        CALL_LOG_ACTION = 42,
        UGC_BOT = 43,
        STATUS_PRIVACY = 44,
        BOT_WELCOME_REQUEST_ACTION = 45,
        DELETE_INDIVIDUAL_CALL_LOG = 46,
        LABEL_REORDERING_ACTION = 47,
        PAYMENT_INFO_ACTION = 48,
        CUSTOM_PAYMENT_METHODS_ACTION = 49,
        LOCK_CHAT_ACTION = 50,
        CHAT_LOCK_SETTINGS = 51,
        WAMO_USER_IDENTIFIER_ACTION = 52,
        PRIVACY_SETTING_DISABLE_LINK_PREVIEWS_ACTION = 53,
        DEVICE_CAPABILITIES = 54,
        NOTE_EDIT_ACTION = 55,
        FAVORITES_ACTION = 56,
        MERCHANT_PAYMENT_PARTNER_ACTION = 57,
        WAFFLE_ACCOUNT_LINK_STATE_ACTION = 58,
        USERNAME_CHAT_START_MODE = 59,
        NOTIFICATION_ACTIVITY_SETTING_ACTION = 60,
        LID_CONTACT_ACTION = 61,
        CTWA_PER_CUSTOMER_DATA_SHARING_ACTION = 62,
        PAYMENT_TOS_ACTION = 63,
        PRIVACY_SETTING_CHANNELS_PERSONALISED_RECOMMENDATION_ACTION = 64,
        BUSINESS_BROADCAST_ASSOCIATION_ACTION = 65,
        DETECTED_OUTCOMES_STATUS_ACTION = 66,
        MAIBA_AI_FEATURES_CONTROL_ACTION = 68,
        BUSINESS_BROADCAST_LIST_ACTION = 69,
        MUSIC_USER_ID_ACTION = 70,
        STATUS_POST_OPT_IN_NOTIFICATION_PREFERENCES_ACTION = 71,
        AVATAR_UPDATED_ACTION = 72,
        GALAXY_FLOW_ACTION = 73,
        PRIVATE_PROCESSING_SETTING_ACTION = 74,
        NEWSLETTER_SAVED_INTERESTS_ACTION = 75,
        AI_THREAD_RENAME_ACTION = 76,
        INTERACTIVE_MESSAGE_ACTION = 77,
        SETTINGS_SYNC_ACTION = 78,
        OUT_CONTACT_ACTION = 79,
        NCT_SALT_SYNC_ACTION = 80,
        BUSINESS_BROADCAST_CAMPAIGN_ACTION = 81,
        BUSINESS_BROADCAST_INSIGHTS_ACTION = 82,
        CUSTOMER_DATA_ACTION = 83,
        SUBSCRIPTIONS_SYNC_V2_ACTION = 84,
        THREAD_PIN_ACTION = 85,
        AUTO_ORGANIZE_BUSINESS_CHAT_SETTING = 86,
        BIZ_AI_SETTINGS_NUDGE_ACTION = 87,
        COEX_V2_VERSION_ACTION = 88,
        WASA_ROOT_SECRET_ACTION = 89,
        BUBBLE_LOCK_MESSAGE_ACTION = 90,
        LABEL_SUBLIST_ACTION = 91,
        DEVICE_CAPABILITIES_V2 = 92,
        CTWA_MESSAGE_RECEIVED_ACTION = 93,
        SHARE_OWN_PN = 10001,
        BUSINESS_BROADCAST_ACTION = 10002,
        AI_THREAD_DELETE_ACTION = 10003,
    }
    export interface INoiseCertificate { [key: string]: any }
    export class NoiseCertificate implements INoiseCertificate {
        constructor(properties?: INoiseCertificate);
        [key: string]: any;
        static create(properties?: INoiseCertificate): NoiseCertificate;
        static encode(message: INoiseCertificate, writer?: any): any;
        static encodeDelimited(message: INoiseCertificate, writer?: any): any;
        static decode(reader: any, length?: number): NoiseCertificate;
        static decodeDelimited(reader: any): NoiseCertificate;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): NoiseCertificate;
        static toObject(message: NoiseCertificate, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace NoiseCertificate {
        export interface IDetails { [key: string]: any }
        export class Details implements IDetails {
            constructor(properties?: IDetails);
            [key: string]: any;
            static create(properties?: IDetails): Details;
            static encode(message: IDetails, writer?: any): any;
            static encodeDelimited(message: IDetails, writer?: any): any;
            static decode(reader: any, length?: number): Details;
            static decodeDelimited(reader: any): Details;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Details;
            static toObject(message: Details, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface INonE2EEAttestation { [key: string]: any }
    export class NonE2EEAttestation implements INonE2EEAttestation {
        constructor(properties?: INonE2EEAttestation);
        [key: string]: any;
        static create(properties?: INonE2EEAttestation): NonE2EEAttestation;
        static encode(message: INonE2EEAttestation, writer?: any): any;
        static encodeDelimited(message: INonE2EEAttestation, writer?: any): any;
        static decode(reader: any, length?: number): NonE2EEAttestation;
        static decodeDelimited(reader: any): NonE2EEAttestation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): NonE2EEAttestation;
        static toObject(message: NonE2EEAttestation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace NonE2EEAttestation {
        export enum AccountType {
            E2EE = 0,
            HYBRID_E2EE = 1,
            NON_E2EE = 2,
        }
    }
    export interface INotificationMessageInfo { [key: string]: any }
    export class NotificationMessageInfo implements INotificationMessageInfo {
        constructor(properties?: INotificationMessageInfo);
        [key: string]: any;
        static create(properties?: INotificationMessageInfo): NotificationMessageInfo;
        static encode(message: INotificationMessageInfo, writer?: any): any;
        static encodeDelimited(message: INotificationMessageInfo, writer?: any): any;
        static decode(reader: any, length?: number): NotificationMessageInfo;
        static decodeDelimited(reader: any): NotificationMessageInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): NotificationMessageInfo;
        static toObject(message: NotificationMessageInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface INotificationSettings { [key: string]: any }
    export class NotificationSettings implements INotificationSettings {
        constructor(properties?: INotificationSettings);
        [key: string]: any;
        static create(properties?: INotificationSettings): NotificationSettings;
        static encode(message: INotificationSettings, writer?: any): any;
        static encodeDelimited(message: INotificationSettings, writer?: any): any;
        static decode(reader: any, length?: number): NotificationSettings;
        static decodeDelimited(reader: any): NotificationSettings;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): NotificationSettings;
        static toObject(message: NotificationSettings, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IOrfThreadIdInput { [key: string]: any }
    export class OrfThreadIdInput implements IOrfThreadIdInput {
        constructor(properties?: IOrfThreadIdInput);
        [key: string]: any;
        static create(properties?: IOrfThreadIdInput): OrfThreadIdInput;
        static encode(message: IOrfThreadIdInput, writer?: any): any;
        static encodeDelimited(message: IOrfThreadIdInput, writer?: any): any;
        static decode(reader: any, length?: number): OrfThreadIdInput;
        static decodeDelimited(reader: any): OrfThreadIdInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): OrfThreadIdInput;
        static toObject(message: OrfThreadIdInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IOrfThreadIdOutput { [key: string]: any }
    export class OrfThreadIdOutput implements IOrfThreadIdOutput {
        constructor(properties?: IOrfThreadIdOutput);
        [key: string]: any;
        static create(properties?: IOrfThreadIdOutput): OrfThreadIdOutput;
        static encode(message: IOrfThreadIdOutput, writer?: any): any;
        static encodeDelimited(message: IOrfThreadIdOutput, writer?: any): any;
        static decode(reader: any, length?: number): OrfThreadIdOutput;
        static decodeDelimited(reader: any): OrfThreadIdOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): OrfThreadIdOutput;
        static toObject(message: OrfThreadIdOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPairingRequest { [key: string]: any }
    export class PairingRequest implements IPairingRequest {
        constructor(properties?: IPairingRequest);
        [key: string]: any;
        static create(properties?: IPairingRequest): PairingRequest;
        static encode(message: IPairingRequest, writer?: any): any;
        static encodeDelimited(message: IPairingRequest, writer?: any): any;
        static decode(reader: any, length?: number): PairingRequest;
        static decodeDelimited(reader: any): PairingRequest;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PairingRequest;
        static toObject(message: PairingRequest, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPastParticipant { [key: string]: any }
    export class PastParticipant implements IPastParticipant {
        constructor(properties?: IPastParticipant);
        [key: string]: any;
        static create(properties?: IPastParticipant): PastParticipant;
        static encode(message: IPastParticipant, writer?: any): any;
        static encodeDelimited(message: IPastParticipant, writer?: any): any;
        static decode(reader: any, length?: number): PastParticipant;
        static decodeDelimited(reader: any): PastParticipant;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PastParticipant;
        static toObject(message: PastParticipant, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace PastParticipant {
        export enum LeaveReason {
            LEFT = 0,
            REMOVED = 1,
        }
    }
    export interface IPastParticipants { [key: string]: any }
    export class PastParticipants implements IPastParticipants {
        constructor(properties?: IPastParticipants);
        [key: string]: any;
        static create(properties?: IPastParticipants): PastParticipants;
        static encode(message: IPastParticipants, writer?: any): any;
        static encodeDelimited(message: IPastParticipants, writer?: any): any;
        static decode(reader: any, length?: number): PastParticipants;
        static decodeDelimited(reader: any): PastParticipants;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PastParticipants;
        static toObject(message: PastParticipants, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPatchDebugData { [key: string]: any }
    export class PatchDebugData implements IPatchDebugData {
        constructor(properties?: IPatchDebugData);
        [key: string]: any;
        static create(properties?: IPatchDebugData): PatchDebugData;
        static encode(message: IPatchDebugData, writer?: any): any;
        static encodeDelimited(message: IPatchDebugData, writer?: any): any;
        static decode(reader: any, length?: number): PatchDebugData;
        static decodeDelimited(reader: any): PatchDebugData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PatchDebugData;
        static toObject(message: PatchDebugData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace PatchDebugData {
        export enum Platform {
            ANDROID = 0,
            SMBA = 1,
            IPHONE = 2,
            SMBI = 3,
            WEB = 4,
            UWP = 5,
            DARWIN = 6,
            IPAD = 7,
            WEAROS = 8,
            WASG = 9,
            WEARM = 10,
            CAPI = 11,
        }
    }
    export interface IPaymentBackground { [key: string]: any }
    export class PaymentBackground implements IPaymentBackground {
        constructor(properties?: IPaymentBackground);
        [key: string]: any;
        static create(properties?: IPaymentBackground): PaymentBackground;
        static encode(message: IPaymentBackground, writer?: any): any;
        static encodeDelimited(message: IPaymentBackground, writer?: any): any;
        static decode(reader: any, length?: number): PaymentBackground;
        static decodeDelimited(reader: any): PaymentBackground;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PaymentBackground;
        static toObject(message: PaymentBackground, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace PaymentBackground {
        export interface IMediaData { [key: string]: any }
        export class MediaData implements IMediaData {
            constructor(properties?: IMediaData);
            [key: string]: any;
            static create(properties?: IMediaData): MediaData;
            static encode(message: IMediaData, writer?: any): any;
            static encodeDelimited(message: IMediaData, writer?: any): any;
            static decode(reader: any, length?: number): MediaData;
            static decodeDelimited(reader: any): MediaData;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MediaData;
            static toObject(message: MediaData, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum Type {
            UNKNOWN = 0,
            DEFAULT = 1,
        }
    }
    export interface IPaymentInfo { [key: string]: any }
    export class PaymentInfo implements IPaymentInfo {
        constructor(properties?: IPaymentInfo);
        [key: string]: any;
        static create(properties?: IPaymentInfo): PaymentInfo;
        static encode(message: IPaymentInfo, writer?: any): any;
        static encodeDelimited(message: IPaymentInfo, writer?: any): any;
        static decode(reader: any, length?: number): PaymentInfo;
        static decodeDelimited(reader: any): PaymentInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PaymentInfo;
        static toObject(message: PaymentInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace PaymentInfo {
        export enum Currency {
            UNKNOWN_CURRENCY = 0,
            INR = 1,
        }
        export enum Status {
            UNKNOWN_STATUS = 0,
            PROCESSING = 1,
            SENT = 2,
            NEED_TO_ACCEPT = 3,
            COMPLETE = 4,
            COULD_NOT_COMPLETE = 5,
            REFUNDED = 6,
            EXPIRED = 7,
            REJECTED = 8,
            CANCELLED = 9,
            WAITING_FOR_PAYER = 10,
            WAITING = 11,
        }
        export enum TxnStatus {
            UNKNOWN = 0,
            PENDING_SETUP = 1,
            PENDING_RECEIVER_SETUP = 2,
            INIT = 3,
            SUCCESS = 4,
            COMPLETED = 5,
            FAILED = 6,
            FAILED_RISK = 7,
            FAILED_PROCESSING = 8,
            FAILED_RECEIVER_PROCESSING = 9,
            FAILED_DA = 10,
            FAILED_DA_FINAL = 11,
            REFUNDED_TXN = 12,
            REFUND_FAILED = 13,
            REFUND_FAILED_PROCESSING = 14,
            REFUND_FAILED_DA = 15,
            EXPIRED_TXN = 16,
            AUTH_CANCELED = 17,
            AUTH_CANCEL_FAILED_PROCESSING = 18,
            AUTH_CANCEL_FAILED = 19,
            COLLECT_INIT = 20,
            COLLECT_SUCCESS = 21,
            COLLECT_FAILED = 22,
            COLLECT_FAILED_RISK = 23,
            COLLECT_REJECTED = 24,
            COLLECT_EXPIRED = 25,
            COLLECT_CANCELED = 26,
            COLLECT_CANCELLING = 27,
            IN_REVIEW = 28,
            REVERSAL_SUCCESS = 29,
            REVERSAL_PENDING = 30,
            REFUND_PENDING = 31,
        }
    }
    export interface IPhoneNumberToLIDMapping { [key: string]: any }
    export class PhoneNumberToLIDMapping implements IPhoneNumberToLIDMapping {
        constructor(properties?: IPhoneNumberToLIDMapping);
        [key: string]: any;
        static create(properties?: IPhoneNumberToLIDMapping): PhoneNumberToLIDMapping;
        static encode(message: IPhoneNumberToLIDMapping, writer?: any): any;
        static encodeDelimited(message: IPhoneNumberToLIDMapping, writer?: any): any;
        static decode(reader: any, length?: number): PhoneNumberToLIDMapping;
        static decodeDelimited(reader: any): PhoneNumberToLIDMapping;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PhoneNumberToLIDMapping;
        static toObject(message: PhoneNumberToLIDMapping, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPhotoChange { [key: string]: any }
    export class PhotoChange implements IPhotoChange {
        constructor(properties?: IPhotoChange);
        [key: string]: any;
        static create(properties?: IPhotoChange): PhotoChange;
        static encode(message: IPhotoChange, writer?: any): any;
        static encodeDelimited(message: IPhotoChange, writer?: any): any;
        static decode(reader: any, length?: number): PhotoChange;
        static decodeDelimited(reader: any): PhotoChange;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PhotoChange;
        static toObject(message: PhotoChange, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPinInChat { [key: string]: any }
    export class PinInChat implements IPinInChat {
        constructor(properties?: IPinInChat);
        [key: string]: any;
        static create(properties?: IPinInChat): PinInChat;
        static encode(message: IPinInChat, writer?: any): any;
        static encodeDelimited(message: IPinInChat, writer?: any): any;
        static decode(reader: any, length?: number): PinInChat;
        static decodeDelimited(reader: any): PinInChat;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PinInChat;
        static toObject(message: PinInChat, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace PinInChat {
        export enum Type {
            UNKNOWN_TYPE = 0,
            PIN_FOR_ALL = 1,
            UNPIN_FOR_ALL = 2,
        }
    }
    export interface IPoint { [key: string]: any }
    export class Point implements IPoint {
        constructor(properties?: IPoint);
        [key: string]: any;
        static create(properties?: IPoint): Point;
        static encode(message: IPoint, writer?: any): any;
        static encodeDelimited(message: IPoint, writer?: any): any;
        static decode(reader: any, length?: number): Point;
        static decodeDelimited(reader: any): Point;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Point;
        static toObject(message: Point, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPollAdditionalMetadata { [key: string]: any }
    export class PollAdditionalMetadata implements IPollAdditionalMetadata {
        constructor(properties?: IPollAdditionalMetadata);
        [key: string]: any;
        static create(properties?: IPollAdditionalMetadata): PollAdditionalMetadata;
        static encode(message: IPollAdditionalMetadata, writer?: any): any;
        static encodeDelimited(message: IPollAdditionalMetadata, writer?: any): any;
        static decode(reader: any, length?: number): PollAdditionalMetadata;
        static decodeDelimited(reader: any): PollAdditionalMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PollAdditionalMetadata;
        static toObject(message: PollAdditionalMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace PollAdditionalMetadata {
        export interface IPollNameHashHistoryEntry { [key: string]: any }
        export class PollNameHashHistoryEntry implements IPollNameHashHistoryEntry {
            constructor(properties?: IPollNameHashHistoryEntry);
            [key: string]: any;
            static create(properties?: IPollNameHashHistoryEntry): PollNameHashHistoryEntry;
            static encode(message: IPollNameHashHistoryEntry, writer?: any): any;
            static encodeDelimited(message: IPollNameHashHistoryEntry, writer?: any): any;
            static decode(reader: any, length?: number): PollNameHashHistoryEntry;
            static decodeDelimited(reader: any): PollNameHashHistoryEntry;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PollNameHashHistoryEntry;
            static toObject(message: PollNameHashHistoryEntry, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IPollEncValue { [key: string]: any }
    export class PollEncValue implements IPollEncValue {
        constructor(properties?: IPollEncValue);
        [key: string]: any;
        static create(properties?: IPollEncValue): PollEncValue;
        static encode(message: IPollEncValue, writer?: any): any;
        static encodeDelimited(message: IPollEncValue, writer?: any): any;
        static decode(reader: any, length?: number): PollEncValue;
        static decodeDelimited(reader: any): PollEncValue;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PollEncValue;
        static toObject(message: PollEncValue, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPollUpdate { [key: string]: any }
    export class PollUpdate implements IPollUpdate {
        constructor(properties?: IPollUpdate);
        [key: string]: any;
        static create(properties?: IPollUpdate): PollUpdate;
        static encode(message: IPollUpdate, writer?: any): any;
        static encodeDelimited(message: IPollUpdate, writer?: any): any;
        static decode(reader: any, length?: number): PollUpdate;
        static decodeDelimited(reader: any): PollUpdate;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PollUpdate;
        static toObject(message: PollUpdate, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPreKeyRecordStructure { [key: string]: any }
    export class PreKeyRecordStructure implements IPreKeyRecordStructure {
        constructor(properties?: IPreKeyRecordStructure);
        [key: string]: any;
        static create(properties?: IPreKeyRecordStructure): PreKeyRecordStructure;
        static encode(message: IPreKeyRecordStructure, writer?: any): any;
        static encodeDelimited(message: IPreKeyRecordStructure, writer?: any): any;
        static decode(reader: any, length?: number): PreKeyRecordStructure;
        static decodeDelimited(reader: any): PreKeyRecordStructure;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PreKeyRecordStructure;
        static toObject(message: PreKeyRecordStructure, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPreKeySignalMessage { [key: string]: any }
    export class PreKeySignalMessage implements IPreKeySignalMessage {
        constructor(properties?: IPreKeySignalMessage);
        [key: string]: any;
        static create(properties?: IPreKeySignalMessage): PreKeySignalMessage;
        static encode(message: IPreKeySignalMessage, writer?: any): any;
        static encodeDelimited(message: IPreKeySignalMessage, writer?: any): any;
        static decode(reader: any, length?: number): PreKeySignalMessage;
        static decodeDelimited(reader: any): PreKeySignalMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PreKeySignalMessage;
        static toObject(message: PreKeySignalMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPremiumMessageInfo { [key: string]: any }
    export class PremiumMessageInfo implements IPremiumMessageInfo {
        constructor(properties?: IPremiumMessageInfo);
        [key: string]: any;
        static create(properties?: IPremiumMessageInfo): PremiumMessageInfo;
        static encode(message: IPremiumMessageInfo, writer?: any): any;
        static encodeDelimited(message: IPremiumMessageInfo, writer?: any): any;
        static decode(reader: any, length?: number): PremiumMessageInfo;
        static decodeDelimited(reader: any): PremiumMessageInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PremiumMessageInfo;
        static toObject(message: PremiumMessageInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPrimaryEphemeralIdentity { [key: string]: any }
    export class PrimaryEphemeralIdentity implements IPrimaryEphemeralIdentity {
        constructor(properties?: IPrimaryEphemeralIdentity);
        [key: string]: any;
        static create(properties?: IPrimaryEphemeralIdentity): PrimaryEphemeralIdentity;
        static encode(message: IPrimaryEphemeralIdentity, writer?: any): any;
        static encodeDelimited(message: IPrimaryEphemeralIdentity, writer?: any): any;
        static decode(reader: any, length?: number): PrimaryEphemeralIdentity;
        static decodeDelimited(reader: any): PrimaryEphemeralIdentity;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): PrimaryEphemeralIdentity;
        static toObject(message: PrimaryEphemeralIdentity, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum PrivacySystemMessage {
        E2EE_MSG = 1,
        NE2EE_SELF = 2,
        NE2EE_OTHER = 3,
    }
    export interface IProcessedVideo { [key: string]: any }
    export class ProcessedVideo implements IProcessedVideo {
        constructor(properties?: IProcessedVideo);
        [key: string]: any;
        static create(properties?: IProcessedVideo): ProcessedVideo;
        static encode(message: IProcessedVideo, writer?: any): any;
        static encodeDelimited(message: IProcessedVideo, writer?: any): any;
        static decode(reader: any, length?: number): ProcessedVideo;
        static decodeDelimited(reader: any): ProcessedVideo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ProcessedVideo;
        static toObject(message: ProcessedVideo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace ProcessedVideo {
        export enum VideoQuality {
            UNDEFINED = 0,
            LOW = 1,
            MID = 2,
            HIGH = 3,
        }
    }
    export interface IProloguePayload { [key: string]: any }
    export class ProloguePayload implements IProloguePayload {
        constructor(properties?: IProloguePayload);
        [key: string]: any;
        static create(properties?: IProloguePayload): ProloguePayload;
        static encode(message: IProloguePayload, writer?: any): any;
        static encodeDelimited(message: IProloguePayload, writer?: any): any;
        static decode(reader: any, length?: number): ProloguePayload;
        static decodeDelimited(reader: any): ProloguePayload;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ProloguePayload;
        static toObject(message: ProloguePayload, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IPushname { [key: string]: any }
    export class Pushname implements IPushname {
        constructor(properties?: IPushname);
        [key: string]: any;
        static create(properties?: IPushname): Pushname;
        static encode(message: IPushname, writer?: any): any;
        static encodeDelimited(message: IPushname, writer?: any): any;
        static decode(reader: any, length?: number): Pushname;
        static decodeDelimited(reader: any): Pushname;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Pushname;
        static toObject(message: Pushname, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IQP { [key: string]: any }
    export class QP implements IQP {
        constructor(properties?: IQP);
        [key: string]: any;
        static create(properties?: IQP): QP;
        static encode(message: IQP, writer?: any): any;
        static encodeDelimited(message: IQP, writer?: any): any;
        static decode(reader: any, length?: number): QP;
        static decodeDelimited(reader: any): QP;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): QP;
        static toObject(message: QP, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace QP {
        export enum ClauseType {
            AND = 1,
            OR = 2,
            NOR = 3,
        }
        export interface IFilter { [key: string]: any }
        export class Filter implements IFilter {
            constructor(properties?: IFilter);
            [key: string]: any;
            static create(properties?: IFilter): Filter;
            static encode(message: IFilter, writer?: any): any;
            static encodeDelimited(message: IFilter, writer?: any): any;
            static decode(reader: any, length?: number): Filter;
            static decodeDelimited(reader: any): Filter;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Filter;
            static toObject(message: Filter, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IFilterClause { [key: string]: any }
        export class FilterClause implements IFilterClause {
            constructor(properties?: IFilterClause);
            [key: string]: any;
            static create(properties?: IFilterClause): FilterClause;
            static encode(message: IFilterClause, writer?: any): any;
            static encodeDelimited(message: IFilterClause, writer?: any): any;
            static decode(reader: any, length?: number): FilterClause;
            static decodeDelimited(reader: any): FilterClause;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): FilterClause;
            static toObject(message: FilterClause, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum FilterClientNotSupportedConfig {
            PASS_BY_DEFAULT = 1,
            FAIL_BY_DEFAULT = 2,
        }
        export interface IFilterParameters { [key: string]: any }
        export class FilterParameters implements IFilterParameters {
            constructor(properties?: IFilterParameters);
            [key: string]: any;
            static create(properties?: IFilterParameters): FilterParameters;
            static encode(message: IFilterParameters, writer?: any): any;
            static encodeDelimited(message: IFilterParameters, writer?: any): any;
            static decode(reader: any, length?: number): FilterParameters;
            static decodeDelimited(reader: any): FilterParameters;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): FilterParameters;
            static toObject(message: FilterParameters, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum FilterResult {
            TRUE = 1,
            FALSE = 2,
            UNKNOWN = 3,
        }
    }
    export interface IQuarantinedMessage { [key: string]: any }
    export class QuarantinedMessage implements IQuarantinedMessage {
        constructor(properties?: IQuarantinedMessage);
        [key: string]: any;
        static create(properties?: IQuarantinedMessage): QuarantinedMessage;
        static encode(message: IQuarantinedMessage, writer?: any): any;
        static encodeDelimited(message: IQuarantinedMessage, writer?: any): any;
        static decode(reader: any, length?: number): QuarantinedMessage;
        static decodeDelimited(reader: any): QuarantinedMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): QuarantinedMessage;
        static toObject(message: QuarantinedMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IReaction { [key: string]: any }
    export class Reaction implements IReaction {
        constructor(properties?: IReaction);
        [key: string]: any;
        static create(properties?: IReaction): Reaction;
        static encode(message: IReaction, writer?: any): any;
        static encodeDelimited(message: IReaction, writer?: any): any;
        static decode(reader: any, length?: number): Reaction;
        static decodeDelimited(reader: any): Reaction;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Reaction;
        static toObject(message: Reaction, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IRecentEmojiWeight { [key: string]: any }
    export class RecentEmojiWeight implements IRecentEmojiWeight {
        constructor(properties?: IRecentEmojiWeight);
        [key: string]: any;
        static create(properties?: IRecentEmojiWeight): RecentEmojiWeight;
        static encode(message: IRecentEmojiWeight, writer?: any): any;
        static encodeDelimited(message: IRecentEmojiWeight, writer?: any): any;
        static decode(reader: any, length?: number): RecentEmojiWeight;
        static decodeDelimited(reader: any): RecentEmojiWeight;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): RecentEmojiWeight;
        static toObject(message: RecentEmojiWeight, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IRecordStructure { [key: string]: any }
    export class RecordStructure implements IRecordStructure {
        constructor(properties?: IRecordStructure);
        [key: string]: any;
        static create(properties?: IRecordStructure): RecordStructure;
        static encode(message: IRecordStructure, writer?: any): any;
        static encodeDelimited(message: IRecordStructure, writer?: any): any;
        static decode(reader: any, length?: number): RecordStructure;
        static decodeDelimited(reader: any): RecordStructure;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): RecordStructure;
        static toObject(message: RecordStructure, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IReportable { [key: string]: any }
    export class Reportable implements IReportable {
        constructor(properties?: IReportable);
        [key: string]: any;
        static create(properties?: IReportable): Reportable;
        static encode(message: IReportable, writer?: any): any;
        static encodeDelimited(message: IReportable, writer?: any): any;
        static decode(reader: any, length?: number): Reportable;
        static decodeDelimited(reader: any): Reportable;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): Reportable;
        static toObject(message: Reportable, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IReportingTokenInfo { [key: string]: any }
    export class ReportingTokenInfo implements IReportingTokenInfo {
        constructor(properties?: IReportingTokenInfo);
        [key: string]: any;
        static create(properties?: IReportingTokenInfo): ReportingTokenInfo;
        static encode(message: IReportingTokenInfo, writer?: any): any;
        static encodeDelimited(message: IReportingTokenInfo, writer?: any): any;
        static decode(reader: any, length?: number): ReportingTokenInfo;
        static decodeDelimited(reader: any): ReportingTokenInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ReportingTokenInfo;
        static toObject(message: ReportingTokenInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IRotateEpochInput { [key: string]: any }
    export class RotateEpochInput implements IRotateEpochInput {
        constructor(properties?: IRotateEpochInput);
        [key: string]: any;
        static create(properties?: IRotateEpochInput): RotateEpochInput;
        static encode(message: IRotateEpochInput, writer?: any): any;
        static encodeDelimited(message: IRotateEpochInput, writer?: any): any;
        static decode(reader: any, length?: number): RotateEpochInput;
        static decodeDelimited(reader: any): RotateEpochInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): RotateEpochInput;
        static toObject(message: RotateEpochInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IRotateEpochMemberEdge { [key: string]: any }
    export class RotateEpochMemberEdge implements IRotateEpochMemberEdge {
        constructor(properties?: IRotateEpochMemberEdge);
        [key: string]: any;
        static create(properties?: IRotateEpochMemberEdge): RotateEpochMemberEdge;
        static encode(message: IRotateEpochMemberEdge, writer?: any): any;
        static encodeDelimited(message: IRotateEpochMemberEdge, writer?: any): any;
        static decode(reader: any, length?: number): RotateEpochMemberEdge;
        static decodeDelimited(reader: any): RotateEpochMemberEdge;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): RotateEpochMemberEdge;
        static toObject(message: RotateEpochMemberEdge, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IRotateEpochMemberInput { [key: string]: any }
    export class RotateEpochMemberInput implements IRotateEpochMemberInput {
        constructor(properties?: IRotateEpochMemberInput);
        [key: string]: any;
        static create(properties?: IRotateEpochMemberInput): RotateEpochMemberInput;
        static encode(message: IRotateEpochMemberInput, writer?: any): any;
        static encodeDelimited(message: IRotateEpochMemberInput, writer?: any): any;
        static decode(reader: any, length?: number): RotateEpochMemberInput;
        static decodeDelimited(reader: any): RotateEpochMemberInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): RotateEpochMemberInput;
        static toObject(message: RotateEpochMemberInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IRotateEpochOutput { [key: string]: any }
    export class RotateEpochOutput implements IRotateEpochOutput {
        constructor(properties?: IRotateEpochOutput);
        [key: string]: any;
        static create(properties?: IRotateEpochOutput): RotateEpochOutput;
        static encode(message: IRotateEpochOutput, writer?: any): any;
        static encodeDelimited(message: IRotateEpochOutput, writer?: any): any;
        static decode(reader: any, length?: number): RotateEpochOutput;
        static decodeDelimited(reader: any): RotateEpochOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): RotateEpochOutput;
        static toObject(message: RotateEpochOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IRoutingInfo { [key: string]: any }
    export class RoutingInfo implements IRoutingInfo {
        constructor(properties?: IRoutingInfo);
        [key: string]: any;
        static create(properties?: IRoutingInfo): RoutingInfo;
        static encode(message: IRoutingInfo, writer?: any): any;
        static encodeDelimited(message: IRoutingInfo, writer?: any): any;
        static decode(reader: any, length?: number): RoutingInfo;
        static decodeDelimited(reader: any): RoutingInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): RoutingInfo;
        static toObject(message: RoutingInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IScheduledMessageMetadata { [key: string]: any }
    export class ScheduledMessageMetadata implements IScheduledMessageMetadata {
        constructor(properties?: IScheduledMessageMetadata);
        [key: string]: any;
        static create(properties?: IScheduledMessageMetadata): ScheduledMessageMetadata;
        static encode(message: IScheduledMessageMetadata, writer?: any): any;
        static encodeDelimited(message: IScheduledMessageMetadata, writer?: any): any;
        static decode(reader: any, length?: number): ScheduledMessageMetadata;
        static decodeDelimited(reader: any): ScheduledMessageMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ScheduledMessageMetadata;
        static toObject(message: ScheduledMessageMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISenderKeyDistributionMessage { [key: string]: any }
    export class SenderKeyDistributionMessage implements ISenderKeyDistributionMessage {
        constructor(properties?: ISenderKeyDistributionMessage);
        [key: string]: any;
        static create(properties?: ISenderKeyDistributionMessage): SenderKeyDistributionMessage;
        static encode(message: ISenderKeyDistributionMessage, writer?: any): any;
        static encodeDelimited(message: ISenderKeyDistributionMessage, writer?: any): any;
        static decode(reader: any, length?: number): SenderKeyDistributionMessage;
        static decodeDelimited(reader: any): SenderKeyDistributionMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SenderKeyDistributionMessage;
        static toObject(message: SenderKeyDistributionMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISenderKeyMessage { [key: string]: any }
    export class SenderKeyMessage implements ISenderKeyMessage {
        constructor(properties?: ISenderKeyMessage);
        [key: string]: any;
        static create(properties?: ISenderKeyMessage): SenderKeyMessage;
        static encode(message: ISenderKeyMessage, writer?: any): any;
        static encodeDelimited(message: ISenderKeyMessage, writer?: any): any;
        static decode(reader: any, length?: number): SenderKeyMessage;
        static decodeDelimited(reader: any): SenderKeyMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SenderKeyMessage;
        static toObject(message: SenderKeyMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISenderKeyRecordStructure { [key: string]: any }
    export class SenderKeyRecordStructure implements ISenderKeyRecordStructure {
        constructor(properties?: ISenderKeyRecordStructure);
        [key: string]: any;
        static create(properties?: ISenderKeyRecordStructure): SenderKeyRecordStructure;
        static encode(message: ISenderKeyRecordStructure, writer?: any): any;
        static encodeDelimited(message: ISenderKeyRecordStructure, writer?: any): any;
        static decode(reader: any, length?: number): SenderKeyRecordStructure;
        static decodeDelimited(reader: any): SenderKeyRecordStructure;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SenderKeyRecordStructure;
        static toObject(message: SenderKeyRecordStructure, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISenderKeyStateStructure { [key: string]: any }
    export class SenderKeyStateStructure implements ISenderKeyStateStructure {
        constructor(properties?: ISenderKeyStateStructure);
        [key: string]: any;
        static create(properties?: ISenderKeyStateStructure): SenderKeyStateStructure;
        static encode(message: ISenderKeyStateStructure, writer?: any): any;
        static encodeDelimited(message: ISenderKeyStateStructure, writer?: any): any;
        static decode(reader: any, length?: number): SenderKeyStateStructure;
        static decodeDelimited(reader: any): SenderKeyStateStructure;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SenderKeyStateStructure;
        static toObject(message: SenderKeyStateStructure, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace SenderKeyStateStructure {
        export interface ISenderChainKey { [key: string]: any }
        export class SenderChainKey implements ISenderChainKey {
            constructor(properties?: ISenderChainKey);
            [key: string]: any;
            static create(properties?: ISenderChainKey): SenderChainKey;
            static encode(message: ISenderChainKey, writer?: any): any;
            static encodeDelimited(message: ISenderChainKey, writer?: any): any;
            static decode(reader: any, length?: number): SenderChainKey;
            static decodeDelimited(reader: any): SenderChainKey;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SenderChainKey;
            static toObject(message: SenderChainKey, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISenderMessageKey { [key: string]: any }
        export class SenderMessageKey implements ISenderMessageKey {
            constructor(properties?: ISenderMessageKey);
            [key: string]: any;
            static create(properties?: ISenderMessageKey): SenderMessageKey;
            static encode(message: ISenderMessageKey, writer?: any): any;
            static encodeDelimited(message: ISenderMessageKey, writer?: any): any;
            static decode(reader: any, length?: number): SenderMessageKey;
            static decodeDelimited(reader: any): SenderMessageKey;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SenderMessageKey;
            static toObject(message: SenderMessageKey, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISenderSigningKey { [key: string]: any }
        export class SenderSigningKey implements ISenderSigningKey {
            constructor(properties?: ISenderSigningKey);
            [key: string]: any;
            static create(properties?: ISenderSigningKey): SenderSigningKey;
            static encode(message: ISenderSigningKey, writer?: any): any;
            static encodeDelimited(message: ISenderSigningKey, writer?: any): any;
            static decode(reader: any, length?: number): SenderSigningKey;
            static decodeDelimited(reader: any): SenderSigningKey;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SenderSigningKey;
            static toObject(message: SenderSigningKey, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IServerErrorReceipt { [key: string]: any }
    export class ServerErrorReceipt implements IServerErrorReceipt {
        constructor(properties?: IServerErrorReceipt);
        [key: string]: any;
        static create(properties?: IServerErrorReceipt): ServerErrorReceipt;
        static encode(message: IServerErrorReceipt, writer?: any): any;
        static encodeDelimited(message: IServerErrorReceipt, writer?: any): any;
        static decode(reader: any, length?: number): ServerErrorReceipt;
        static decodeDelimited(reader: any): ServerErrorReceipt;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ServerErrorReceipt;
        static toObject(message: ServerErrorReceipt, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISessionStructure { [key: string]: any }
    export class SessionStructure implements ISessionStructure {
        constructor(properties?: ISessionStructure);
        [key: string]: any;
        static create(properties?: ISessionStructure): SessionStructure;
        static encode(message: ISessionStructure, writer?: any): any;
        static encodeDelimited(message: ISessionStructure, writer?: any): any;
        static decode(reader: any, length?: number): SessionStructure;
        static decodeDelimited(reader: any): SessionStructure;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SessionStructure;
        static toObject(message: SessionStructure, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace SessionStructure {
        export interface IChain { [key: string]: any }
        export class Chain implements IChain {
            constructor(properties?: IChain);
            [key: string]: any;
            static create(properties?: IChain): Chain;
            static encode(message: IChain, writer?: any): any;
            static encodeDelimited(message: IChain, writer?: any): any;
            static decode(reader: any, length?: number): Chain;
            static decodeDelimited(reader: any): Chain;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Chain;
            static toObject(message: Chain, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace Chain {
            export interface IChainKey { [key: string]: any }
            export class ChainKey implements IChainKey {
                constructor(properties?: IChainKey);
                [key: string]: any;
                static create(properties?: IChainKey): ChainKey;
                static encode(message: IChainKey, writer?: any): any;
                static encodeDelimited(message: IChainKey, writer?: any): any;
                static decode(reader: any, length?: number): ChainKey;
                static decodeDelimited(reader: any): ChainKey;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): ChainKey;
                static toObject(message: ChainKey, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface IMessageKey { [key: string]: any }
            export class MessageKey implements IMessageKey {
                constructor(properties?: IMessageKey);
                [key: string]: any;
                static create(properties?: IMessageKey): MessageKey;
                static encode(message: IMessageKey, writer?: any): any;
                static encodeDelimited(message: IMessageKey, writer?: any): any;
                static decode(reader: any, length?: number): MessageKey;
                static decodeDelimited(reader: any): MessageKey;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): MessageKey;
                static toObject(message: MessageKey, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IPendingKeyExchange { [key: string]: any }
        export class PendingKeyExchange implements IPendingKeyExchange {
            constructor(properties?: IPendingKeyExchange);
            [key: string]: any;
            static create(properties?: IPendingKeyExchange): PendingKeyExchange;
            static encode(message: IPendingKeyExchange, writer?: any): any;
            static encodeDelimited(message: IPendingKeyExchange, writer?: any): any;
            static decode(reader: any, length?: number): PendingKeyExchange;
            static decodeDelimited(reader: any): PendingKeyExchange;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PendingKeyExchange;
            static toObject(message: PendingKeyExchange, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPendingPreKey { [key: string]: any }
        export class PendingPreKey implements IPendingPreKey {
            constructor(properties?: IPendingPreKey);
            [key: string]: any;
            static create(properties?: IPendingPreKey): PendingPreKey;
            static encode(message: IPendingPreKey, writer?: any): any;
            static encodeDelimited(message: IPendingPreKey, writer?: any): any;
            static decode(reader: any, length?: number): PendingPreKey;
            static decodeDelimited(reader: any): PendingPreKey;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PendingPreKey;
            static toObject(message: PendingPreKey, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface ISessionTransparencyMetadata { [key: string]: any }
    export class SessionTransparencyMetadata implements ISessionTransparencyMetadata {
        constructor(properties?: ISessionTransparencyMetadata);
        [key: string]: any;
        static create(properties?: ISessionTransparencyMetadata): SessionTransparencyMetadata;
        static encode(message: ISessionTransparencyMetadata, writer?: any): any;
        static encodeDelimited(message: ISessionTransparencyMetadata, writer?: any): any;
        static decode(reader: any, length?: number): SessionTransparencyMetadata;
        static decodeDelimited(reader: any): SessionTransparencyMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SessionTransparencyMetadata;
        static toObject(message: SessionTransparencyMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export enum SessionTransparencyType {
        UNKNOWN_TYPE = 0,
        NY_AI_SAFETY_DISCLAIMER = 1,
    }
    export interface ISignalMessage { [key: string]: any }
    export class SignalMessage implements ISignalMessage {
        constructor(properties?: ISignalMessage);
        [key: string]: any;
        static create(properties?: ISignalMessage): SignalMessage;
        static encode(message: ISignalMessage, writer?: any): any;
        static encodeDelimited(message: ISignalMessage, writer?: any): any;
        static decode(reader: any, length?: number): SignalMessage;
        static decodeDelimited(reader: any): SignalMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SignalMessage;
        static toObject(message: SignalMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISignedMmkDistributionFromMailbox { [key: string]: any }
    export class SignedMmkDistributionFromMailbox implements ISignedMmkDistributionFromMailbox {
        constructor(properties?: ISignedMmkDistributionFromMailbox);
        [key: string]: any;
        static create(properties?: ISignedMmkDistributionFromMailbox): SignedMmkDistributionFromMailbox;
        static encode(message: ISignedMmkDistributionFromMailbox, writer?: any): any;
        static encodeDelimited(message: ISignedMmkDistributionFromMailbox, writer?: any): any;
        static decode(reader: any, length?: number): SignedMmkDistributionFromMailbox;
        static decodeDelimited(reader: any): SignedMmkDistributionFromMailbox;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SignedMmkDistributionFromMailbox;
        static toObject(message: SignedMmkDistributionFromMailbox, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISignedPreKeyRecordStructure { [key: string]: any }
    export class SignedPreKeyRecordStructure implements ISignedPreKeyRecordStructure {
        constructor(properties?: ISignedPreKeyRecordStructure);
        [key: string]: any;
        static create(properties?: ISignedPreKeyRecordStructure): SignedPreKeyRecordStructure;
        static encode(message: ISignedPreKeyRecordStructure, writer?: any): any;
        static encodeDelimited(message: ISignedPreKeyRecordStructure, writer?: any): any;
        static decode(reader: any, length?: number): SignedPreKeyRecordStructure;
        static decodeDelimited(reader: any): SignedPreKeyRecordStructure;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SignedPreKeyRecordStructure;
        static toObject(message: SignedPreKeyRecordStructure, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IStatusAttribution { [key: string]: any }
    export class StatusAttribution implements IStatusAttribution {
        constructor(properties?: IStatusAttribution);
        [key: string]: any;
        static create(properties?: IStatusAttribution): StatusAttribution;
        static encode(message: IStatusAttribution, writer?: any): any;
        static encodeDelimited(message: IStatusAttribution, writer?: any): any;
        static decode(reader: any, length?: number): StatusAttribution;
        static decodeDelimited(reader: any): StatusAttribution;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): StatusAttribution;
        static toObject(message: StatusAttribution, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace StatusAttribution {
        export interface IAiCreatedAttribution { [key: string]: any }
        export class AiCreatedAttribution implements IAiCreatedAttribution {
            constructor(properties?: IAiCreatedAttribution);
            [key: string]: any;
            static create(properties?: IAiCreatedAttribution): AiCreatedAttribution;
            static encode(message: IAiCreatedAttribution, writer?: any): any;
            static encodeDelimited(message: IAiCreatedAttribution, writer?: any): any;
            static decode(reader: any, length?: number): AiCreatedAttribution;
            static decodeDelimited(reader: any): AiCreatedAttribution;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AiCreatedAttribution;
            static toObject(message: AiCreatedAttribution, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace AiCreatedAttribution {
            export enum Source {
                UNKNOWN = 0,
                STATUS_MIMICRY = 1,
            }
        }
        export interface IExternalShare { [key: string]: any }
        export class ExternalShare implements IExternalShare {
            constructor(properties?: IExternalShare);
            [key: string]: any;
            static create(properties?: IExternalShare): ExternalShare;
            static encode(message: IExternalShare, writer?: any): any;
            static encodeDelimited(message: IExternalShare, writer?: any): any;
            static decode(reader: any, length?: number): ExternalShare;
            static decodeDelimited(reader: any): ExternalShare;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ExternalShare;
            static toObject(message: ExternalShare, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace ExternalShare {
            export enum Source {
                UNKNOWN = 0,
                INSTAGRAM = 1,
                FACEBOOK = 2,
                MESSENGER = 3,
                SPOTIFY = 4,
                YOUTUBE = 5,
                PINTEREST = 6,
                THREADS = 7,
                APPLE_MUSIC = 8,
                SHARECHAT = 9,
                GOOGLE_PHOTOS = 10,
                SOUNDCLOUD = 11,
                SHAZAM = 12,
                PICSART = 13,
            }
        }
        export interface IGroupStatus { [key: string]: any }
        export class GroupStatus implements IGroupStatus {
            constructor(properties?: IGroupStatus);
            [key: string]: any;
            static create(properties?: IGroupStatus): GroupStatus;
            static encode(message: IGroupStatus, writer?: any): any;
            static encodeDelimited(message: IGroupStatus, writer?: any): any;
            static decode(reader: any, length?: number): GroupStatus;
            static decodeDelimited(reader: any): GroupStatus;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): GroupStatus;
            static toObject(message: GroupStatus, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMusic { [key: string]: any }
        export class Music implements IMusic {
            constructor(properties?: IMusic);
            [key: string]: any;
            static create(properties?: IMusic): Music;
            static encode(message: IMusic, writer?: any): any;
            static encodeDelimited(message: IMusic, writer?: any): any;
            static decode(reader: any, length?: number): Music;
            static decodeDelimited(reader: any): Music;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Music;
            static toObject(message: Music, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IRLAttribution { [key: string]: any }
        export class RLAttribution implements IRLAttribution {
            constructor(properties?: IRLAttribution);
            [key: string]: any;
            static create(properties?: IRLAttribution): RLAttribution;
            static encode(message: IRLAttribution, writer?: any): any;
            static encodeDelimited(message: IRLAttribution, writer?: any): any;
            static decode(reader: any, length?: number): RLAttribution;
            static decodeDelimited(reader: any): RLAttribution;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RLAttribution;
            static toObject(message: RLAttribution, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace RLAttribution {
            export enum Source {
                UNKNOWN = 0,
                RAY_BAN_META_GLASSES = 1,
                OAKLEY_META_GLASSES = 2,
                HYPERNOVA_GLASSES = 3,
            }
        }
        export interface IStatusReshare { [key: string]: any }
        export class StatusReshare implements IStatusReshare {
            constructor(properties?: IStatusReshare);
            [key: string]: any;
            static create(properties?: IStatusReshare): StatusReshare;
            static encode(message: IStatusReshare, writer?: any): any;
            static encodeDelimited(message: IStatusReshare, writer?: any): any;
            static decode(reader: any, length?: number): StatusReshare;
            static decodeDelimited(reader: any): StatusReshare;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusReshare;
            static toObject(message: StatusReshare, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StatusReshare {
            export interface IMetadata { [key: string]: any }
            export class Metadata implements IMetadata {
                constructor(properties?: IMetadata);
                [key: string]: any;
                static create(properties?: IMetadata): Metadata;
                static encode(message: IMetadata, writer?: any): any;
                static encodeDelimited(message: IMetadata, writer?: any): any;
                static decode(reader: any, length?: number): Metadata;
                static decodeDelimited(reader: any): Metadata;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Metadata;
                static toObject(message: Metadata, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export enum Source {
                UNKNOWN = 0,
                INTERNAL_RESHARE = 1,
                MENTION_RESHARE = 2,
                CHANNEL_RESHARE = 3,
                FORWARD = 4,
            }
        }
        export enum Type {
            UNKNOWN = 0,
            RESHARE = 1,
            EXTERNAL_SHARE = 2,
            MUSIC = 3,
            STATUS_MENTION = 4,
            GROUP_STATUS = 5,
            RL_ATTRIBUTION = 6,
            AI_CREATED = 7,
            LAYOUTS = 8,
            NEWSLETTER_STATUS = 9,
            STATUS_CLOSE_SHARING = 10,
            PAID_PARTNERSHIP = 11,
            USERNAME_STATUS = 12,
        }
    }
    export interface IStatusMentionMessage { [key: string]: any }
    export class StatusMentionMessage implements IStatusMentionMessage {
        constructor(properties?: IStatusMentionMessage);
        [key: string]: any;
        static create(properties?: IStatusMentionMessage): StatusMentionMessage;
        static encode(message: IStatusMentionMessage, writer?: any): any;
        static encodeDelimited(message: IStatusMentionMessage, writer?: any): any;
        static decode(reader: any, length?: number): StatusMentionMessage;
        static decodeDelimited(reader: any): StatusMentionMessage;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): StatusMentionMessage;
        static toObject(message: StatusMentionMessage, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IStatusPSA { [key: string]: any }
    export class StatusPSA implements IStatusPSA {
        constructor(properties?: IStatusPSA);
        [key: string]: any;
        static create(properties?: IStatusPSA): StatusPSA;
        static encode(message: IStatusPSA, writer?: any): any;
        static encodeDelimited(message: IStatusPSA, writer?: any): any;
        static decode(reader: any, length?: number): StatusPSA;
        static decodeDelimited(reader: any): StatusPSA;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): StatusPSA;
        static toObject(message: StatusPSA, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IStickerMetadata { [key: string]: any }
    export class StickerMetadata implements IStickerMetadata {
        constructor(properties?: IStickerMetadata);
        [key: string]: any;
        static create(properties?: IStickerMetadata): StickerMetadata;
        static encode(message: IStickerMetadata, writer?: any): any;
        static encodeDelimited(message: IStickerMetadata, writer?: any): any;
        static decode(reader: any, length?: number): StickerMetadata;
        static decodeDelimited(reader: any): StickerMetadata;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): StickerMetadata;
        static toObject(message: StickerMetadata, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISubProtocol { [key: string]: any }
    export class SubProtocol implements ISubProtocol {
        constructor(properties?: ISubProtocol);
        [key: string]: any;
        static create(properties?: ISubProtocol): SubProtocol;
        static encode(message: ISubProtocol, writer?: any): any;
        static encodeDelimited(message: ISubProtocol, writer?: any): any;
        static decode(reader: any, length?: number): SubProtocol;
        static decodeDelimited(reader: any): SubProtocol;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SubProtocol;
        static toObject(message: SubProtocol, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncActionData { [key: string]: any }
    export class SyncActionData implements ISyncActionData {
        constructor(properties?: ISyncActionData);
        [key: string]: any;
        static create(properties?: ISyncActionData): SyncActionData;
        static encode(message: ISyncActionData, writer?: any): any;
        static encodeDelimited(message: ISyncActionData, writer?: any): any;
        static decode(reader: any, length?: number): SyncActionData;
        static decodeDelimited(reader: any): SyncActionData;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncActionData;
        static toObject(message: SyncActionData, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncActionValue { [key: string]: any }
    export class SyncActionValue implements ISyncActionValue {
        constructor(properties?: ISyncActionValue);
        [key: string]: any;
        static create(properties?: ISyncActionValue): SyncActionValue;
        static encode(message: ISyncActionValue, writer?: any): any;
        static encodeDelimited(message: ISyncActionValue, writer?: any): any;
        static decode(reader: any, length?: number): SyncActionValue;
        static decodeDelimited(reader: any): SyncActionValue;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncActionValue;
        static toObject(message: SyncActionValue, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace SyncActionValue {
        export interface IAgentAction { [key: string]: any }
        export class AgentAction implements IAgentAction {
            constructor(properties?: IAgentAction);
            [key: string]: any;
            static create(properties?: IAgentAction): AgentAction;
            static encode(message: IAgentAction, writer?: any): any;
            static encodeDelimited(message: IAgentAction, writer?: any): any;
            static decode(reader: any, length?: number): AgentAction;
            static decodeDelimited(reader: any): AgentAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AgentAction;
            static toObject(message: AgentAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAiThreadRenameAction { [key: string]: any }
        export class AiThreadRenameAction implements IAiThreadRenameAction {
            constructor(properties?: IAiThreadRenameAction);
            [key: string]: any;
            static create(properties?: IAiThreadRenameAction): AiThreadRenameAction;
            static encode(message: IAiThreadRenameAction, writer?: any): any;
            static encodeDelimited(message: IAiThreadRenameAction, writer?: any): any;
            static decode(reader: any, length?: number): AiThreadRenameAction;
            static decodeDelimited(reader: any): AiThreadRenameAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AiThreadRenameAction;
            static toObject(message: AiThreadRenameAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAndroidUnsupportedActions { [key: string]: any }
        export class AndroidUnsupportedActions implements IAndroidUnsupportedActions {
            constructor(properties?: IAndroidUnsupportedActions);
            [key: string]: any;
            static create(properties?: IAndroidUnsupportedActions): AndroidUnsupportedActions;
            static encode(message: IAndroidUnsupportedActions, writer?: any): any;
            static encodeDelimited(message: IAndroidUnsupportedActions, writer?: any): any;
            static decode(reader: any, length?: number): AndroidUnsupportedActions;
            static decodeDelimited(reader: any): AndroidUnsupportedActions;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AndroidUnsupportedActions;
            static toObject(message: AndroidUnsupportedActions, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IArchiveChatAction { [key: string]: any }
        export class ArchiveChatAction implements IArchiveChatAction {
            constructor(properties?: IArchiveChatAction);
            [key: string]: any;
            static create(properties?: IArchiveChatAction): ArchiveChatAction;
            static encode(message: IArchiveChatAction, writer?: any): any;
            static encodeDelimited(message: IArchiveChatAction, writer?: any): any;
            static decode(reader: any, length?: number): ArchiveChatAction;
            static decodeDelimited(reader: any): ArchiveChatAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ArchiveChatAction;
            static toObject(message: ArchiveChatAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAutoOrganizeBusinessChatSetting { [key: string]: any }
        export class AutoOrganizeBusinessChatSetting implements IAutoOrganizeBusinessChatSetting {
            constructor(properties?: IAutoOrganizeBusinessChatSetting);
            [key: string]: any;
            static create(properties?: IAutoOrganizeBusinessChatSetting): AutoOrganizeBusinessChatSetting;
            static encode(message: IAutoOrganizeBusinessChatSetting, writer?: any): any;
            static encodeDelimited(message: IAutoOrganizeBusinessChatSetting, writer?: any): any;
            static decode(reader: any, length?: number): AutoOrganizeBusinessChatSetting;
            static decodeDelimited(reader: any): AutoOrganizeBusinessChatSetting;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AutoOrganizeBusinessChatSetting;
            static toObject(message: AutoOrganizeBusinessChatSetting, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IAvatarUpdatedAction { [key: string]: any }
        export class AvatarUpdatedAction implements IAvatarUpdatedAction {
            constructor(properties?: IAvatarUpdatedAction);
            [key: string]: any;
            static create(properties?: IAvatarUpdatedAction): AvatarUpdatedAction;
            static encode(message: IAvatarUpdatedAction, writer?: any): any;
            static encodeDelimited(message: IAvatarUpdatedAction, writer?: any): any;
            static decode(reader: any, length?: number): AvatarUpdatedAction;
            static decodeDelimited(reader: any): AvatarUpdatedAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): AvatarUpdatedAction;
            static toObject(message: AvatarUpdatedAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace AvatarUpdatedAction {
            export enum AvatarEventType {
                UPDATED = 0,
                CREATED = 1,
                DELETED = 2,
            }
        }
        export interface IBizAISettingsNudgeAction { [key: string]: any }
        export class BizAISettingsNudgeAction implements IBizAISettingsNudgeAction {
            constructor(properties?: IBizAISettingsNudgeAction);
            [key: string]: any;
            static create(properties?: IBizAISettingsNudgeAction): BizAISettingsNudgeAction;
            static encode(message: IBizAISettingsNudgeAction, writer?: any): any;
            static encodeDelimited(message: IBizAISettingsNudgeAction, writer?: any): any;
            static decode(reader: any, length?: number): BizAISettingsNudgeAction;
            static decodeDelimited(reader: any): BizAISettingsNudgeAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BizAISettingsNudgeAction;
            static toObject(message: BizAISettingsNudgeAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace BizAISettingsNudgeAction {
            export enum BizAISettingsCategory {
                UNKNOWN = 0,
                INSTRUCTIONS = 1,
                RESPONSE_SETTINGS = 2,
                EXAMPLE_RESPONSES = 3,
                KNOWLEDGE = 4,
                LEAD_GEN = 5,
                HANDOFF_REMOVAL_TIMING = 6,
            }
        }
        export interface IBotWelcomeRequestAction { [key: string]: any }
        export class BotWelcomeRequestAction implements IBotWelcomeRequestAction {
            constructor(properties?: IBotWelcomeRequestAction);
            [key: string]: any;
            static create(properties?: IBotWelcomeRequestAction): BotWelcomeRequestAction;
            static encode(message: IBotWelcomeRequestAction, writer?: any): any;
            static encodeDelimited(message: IBotWelcomeRequestAction, writer?: any): any;
            static decode(reader: any, length?: number): BotWelcomeRequestAction;
            static decodeDelimited(reader: any): BotWelcomeRequestAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BotWelcomeRequestAction;
            static toObject(message: BotWelcomeRequestAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBroadcastListParticipant { [key: string]: any }
        export class BroadcastListParticipant implements IBroadcastListParticipant {
            constructor(properties?: IBroadcastListParticipant);
            [key: string]: any;
            static create(properties?: IBroadcastListParticipant): BroadcastListParticipant;
            static encode(message: IBroadcastListParticipant, writer?: any): any;
            static encodeDelimited(message: IBroadcastListParticipant, writer?: any): any;
            static decode(reader: any, length?: number): BroadcastListParticipant;
            static decodeDelimited(reader: any): BroadcastListParticipant;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BroadcastListParticipant;
            static toObject(message: BroadcastListParticipant, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBubbleLockMessageAction { [key: string]: any }
        export class BubbleLockMessageAction implements IBubbleLockMessageAction {
            constructor(properties?: IBubbleLockMessageAction);
            [key: string]: any;
            static create(properties?: IBubbleLockMessageAction): BubbleLockMessageAction;
            static encode(message: IBubbleLockMessageAction, writer?: any): any;
            static encodeDelimited(message: IBubbleLockMessageAction, writer?: any): any;
            static decode(reader: any, length?: number): BubbleLockMessageAction;
            static decodeDelimited(reader: any): BubbleLockMessageAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BubbleLockMessageAction;
            static toObject(message: BubbleLockMessageAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBusinessBroadcastAssociationAction { [key: string]: any }
        export class BusinessBroadcastAssociationAction implements IBusinessBroadcastAssociationAction {
            constructor(properties?: IBusinessBroadcastAssociationAction);
            [key: string]: any;
            static create(properties?: IBusinessBroadcastAssociationAction): BusinessBroadcastAssociationAction;
            static encode(message: IBusinessBroadcastAssociationAction, writer?: any): any;
            static encodeDelimited(message: IBusinessBroadcastAssociationAction, writer?: any): any;
            static decode(reader: any, length?: number): BusinessBroadcastAssociationAction;
            static decodeDelimited(reader: any): BusinessBroadcastAssociationAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessBroadcastAssociationAction;
            static toObject(message: BusinessBroadcastAssociationAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBusinessBroadcastCampaignAction { [key: string]: any }
        export class BusinessBroadcastCampaignAction implements IBusinessBroadcastCampaignAction {
            constructor(properties?: IBusinessBroadcastCampaignAction);
            [key: string]: any;
            static create(properties?: IBusinessBroadcastCampaignAction): BusinessBroadcastCampaignAction;
            static encode(message: IBusinessBroadcastCampaignAction, writer?: any): any;
            static encodeDelimited(message: IBusinessBroadcastCampaignAction, writer?: any): any;
            static decode(reader: any, length?: number): BusinessBroadcastCampaignAction;
            static decodeDelimited(reader: any): BusinessBroadcastCampaignAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessBroadcastCampaignAction;
            static toObject(message: BusinessBroadcastCampaignAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export enum BusinessBroadcastCampaignStatus {
            DRAFT = 1,
            SCHEDULED = 2,
            PROCESSING = 3,
            FAILED = 4,
            SENT = 5,
        }
        export interface IBusinessBroadcastInsightsAction { [key: string]: any }
        export class BusinessBroadcastInsightsAction implements IBusinessBroadcastInsightsAction {
            constructor(properties?: IBusinessBroadcastInsightsAction);
            [key: string]: any;
            static create(properties?: IBusinessBroadcastInsightsAction): BusinessBroadcastInsightsAction;
            static encode(message: IBusinessBroadcastInsightsAction, writer?: any): any;
            static encodeDelimited(message: IBusinessBroadcastInsightsAction, writer?: any): any;
            static decode(reader: any, length?: number): BusinessBroadcastInsightsAction;
            static decodeDelimited(reader: any): BusinessBroadcastInsightsAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessBroadcastInsightsAction;
            static toObject(message: BusinessBroadcastInsightsAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBusinessBroadcastListAction { [key: string]: any }
        export class BusinessBroadcastListAction implements IBusinessBroadcastListAction {
            constructor(properties?: IBusinessBroadcastListAction);
            [key: string]: any;
            static create(properties?: IBusinessBroadcastListAction): BusinessBroadcastListAction;
            static encode(message: IBusinessBroadcastListAction, writer?: any): any;
            static encodeDelimited(message: IBusinessBroadcastListAction, writer?: any): any;
            static decode(reader: any, length?: number): BusinessBroadcastListAction;
            static decodeDelimited(reader: any): BusinessBroadcastListAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessBroadcastListAction;
            static toObject(message: BusinessBroadcastListAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICallLogAction { [key: string]: any }
        export class CallLogAction implements ICallLogAction {
            constructor(properties?: ICallLogAction);
            [key: string]: any;
            static create(properties?: ICallLogAction): CallLogAction;
            static encode(message: ICallLogAction, writer?: any): any;
            static encodeDelimited(message: ICallLogAction, writer?: any): any;
            static decode(reader: any, length?: number): CallLogAction;
            static decodeDelimited(reader: any): CallLogAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CallLogAction;
            static toObject(message: CallLogAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChatAssignmentAction { [key: string]: any }
        export class ChatAssignmentAction implements IChatAssignmentAction {
            constructor(properties?: IChatAssignmentAction);
            [key: string]: any;
            static create(properties?: IChatAssignmentAction): ChatAssignmentAction;
            static encode(message: IChatAssignmentAction, writer?: any): any;
            static encodeDelimited(message: IChatAssignmentAction, writer?: any): any;
            static decode(reader: any, length?: number): ChatAssignmentAction;
            static decodeDelimited(reader: any): ChatAssignmentAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatAssignmentAction;
            static toObject(message: ChatAssignmentAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IChatAssignmentOpenedStatusAction { [key: string]: any }
        export class ChatAssignmentOpenedStatusAction implements IChatAssignmentOpenedStatusAction {
            constructor(properties?: IChatAssignmentOpenedStatusAction);
            [key: string]: any;
            static create(properties?: IChatAssignmentOpenedStatusAction): ChatAssignmentOpenedStatusAction;
            static encode(message: IChatAssignmentOpenedStatusAction, writer?: any): any;
            static encodeDelimited(message: IChatAssignmentOpenedStatusAction, writer?: any): any;
            static decode(reader: any, length?: number): ChatAssignmentOpenedStatusAction;
            static decodeDelimited(reader: any): ChatAssignmentOpenedStatusAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ChatAssignmentOpenedStatusAction;
            static toObject(message: ChatAssignmentOpenedStatusAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IClearChatAction { [key: string]: any }
        export class ClearChatAction implements IClearChatAction {
            constructor(properties?: IClearChatAction);
            [key: string]: any;
            static create(properties?: IClearChatAction): ClearChatAction;
            static encode(message: IClearChatAction, writer?: any): any;
            static encodeDelimited(message: IClearChatAction, writer?: any): any;
            static decode(reader: any, length?: number): ClearChatAction;
            static decodeDelimited(reader: any): ClearChatAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ClearChatAction;
            static toObject(message: ClearChatAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICoexV2VersionAction { [key: string]: any }
        export class CoexV2VersionAction implements ICoexV2VersionAction {
            constructor(properties?: ICoexV2VersionAction);
            [key: string]: any;
            static create(properties?: ICoexV2VersionAction): CoexV2VersionAction;
            static encode(message: ICoexV2VersionAction, writer?: any): any;
            static encodeDelimited(message: ICoexV2VersionAction, writer?: any): any;
            static decode(reader: any, length?: number): CoexV2VersionAction;
            static decodeDelimited(reader: any): CoexV2VersionAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CoexV2VersionAction;
            static toObject(message: CoexV2VersionAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IContactAction { [key: string]: any }
        export class ContactAction implements IContactAction {
            constructor(properties?: IContactAction);
            [key: string]: any;
            static create(properties?: IContactAction): ContactAction;
            static encode(message: IContactAction, writer?: any): any;
            static encodeDelimited(message: IContactAction, writer?: any): any;
            static decode(reader: any, length?: number): ContactAction;
            static decodeDelimited(reader: any): ContactAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ContactAction;
            static toObject(message: ContactAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICtwaMessageReceivedAction { [key: string]: any }
        export class CtwaMessageReceivedAction implements ICtwaMessageReceivedAction {
            constructor(properties?: ICtwaMessageReceivedAction);
            [key: string]: any;
            static create(properties?: ICtwaMessageReceivedAction): CtwaMessageReceivedAction;
            static encode(message: ICtwaMessageReceivedAction, writer?: any): any;
            static encodeDelimited(message: ICtwaMessageReceivedAction, writer?: any): any;
            static decode(reader: any, length?: number): CtwaMessageReceivedAction;
            static decodeDelimited(reader: any): CtwaMessageReceivedAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CtwaMessageReceivedAction;
            static toObject(message: CtwaMessageReceivedAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IBusinessFolderActivationAction { [key: string]: any }
        export class BusinessFolderActivationAction implements IBusinessFolderActivationAction {
            constructor(properties?: IBusinessFolderActivationAction);
            [key: string]: any;
            static create(properties?: IBusinessFolderActivationAction): BusinessFolderActivationAction;
            static encode(message: IBusinessFolderActivationAction, writer?: any): any;
            static encodeDelimited(message: IBusinessFolderActivationAction, writer?: any): any;
            static decode(reader: any, length?: number): BusinessFolderActivationAction;
            static decodeDelimited(reader: any): BusinessFolderActivationAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): BusinessFolderActivationAction;
            static toObject(message: BusinessFolderActivationAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IContactManagerMetadataAction { [key: string]: any }
        export class ContactManagerMetadataAction implements IContactManagerMetadataAction {
            constructor(properties?: IContactManagerMetadataAction);
            [key: string]: any;
            static create(properties?: IContactManagerMetadataAction): ContactManagerMetadataAction;
            static encode(message: IContactManagerMetadataAction, writer?: any): any;
            static encodeDelimited(message: IContactManagerMetadataAction, writer?: any): any;
            static decode(reader: any, length?: number): ContactManagerMetadataAction;
            static decodeDelimited(reader: any): ContactManagerMetadataAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ContactManagerMetadataAction;
            static toObject(message: ContactManagerMetadataAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISharedDeviceAllowlistAction { [key: string]: any }
        export class SharedDeviceAllowlistAction implements ISharedDeviceAllowlistAction {
            constructor(properties?: ISharedDeviceAllowlistAction);
            [key: string]: any;
            static create(properties?: ISharedDeviceAllowlistAction): SharedDeviceAllowlistAction;
            static encode(message: ISharedDeviceAllowlistAction, writer?: any): any;
            static encodeDelimited(message: ISharedDeviceAllowlistAction, writer?: any): any;
            static decode(reader: any, length?: number): SharedDeviceAllowlistAction;
            static decodeDelimited(reader: any): SharedDeviceAllowlistAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SharedDeviceAllowlistAction;
            static toObject(message: SharedDeviceAllowlistAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICtwaPerCustomerDataSharingAction { [key: string]: any }
        export class CtwaPerCustomerDataSharingAction implements ICtwaPerCustomerDataSharingAction {
            constructor(properties?: ICtwaPerCustomerDataSharingAction);
            [key: string]: any;
            static create(properties?: ICtwaPerCustomerDataSharingAction): CtwaPerCustomerDataSharingAction;
            static encode(message: ICtwaPerCustomerDataSharingAction, writer?: any): any;
            static encodeDelimited(message: ICtwaPerCustomerDataSharingAction, writer?: any): any;
            static decode(reader: any, length?: number): CtwaPerCustomerDataSharingAction;
            static decodeDelimited(reader: any): CtwaPerCustomerDataSharingAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CtwaPerCustomerDataSharingAction;
            static toObject(message: CtwaPerCustomerDataSharingAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICustomPaymentMethod { [key: string]: any }
        export class CustomPaymentMethod implements ICustomPaymentMethod {
            constructor(properties?: ICustomPaymentMethod);
            [key: string]: any;
            static create(properties?: ICustomPaymentMethod): CustomPaymentMethod;
            static encode(message: ICustomPaymentMethod, writer?: any): any;
            static encodeDelimited(message: ICustomPaymentMethod, writer?: any): any;
            static decode(reader: any, length?: number): CustomPaymentMethod;
            static decodeDelimited(reader: any): CustomPaymentMethod;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CustomPaymentMethod;
            static toObject(message: CustomPaymentMethod, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICustomPaymentMethodMetadata { [key: string]: any }
        export class CustomPaymentMethodMetadata implements ICustomPaymentMethodMetadata {
            constructor(properties?: ICustomPaymentMethodMetadata);
            [key: string]: any;
            static create(properties?: ICustomPaymentMethodMetadata): CustomPaymentMethodMetadata;
            static encode(message: ICustomPaymentMethodMetadata, writer?: any): any;
            static encodeDelimited(message: ICustomPaymentMethodMetadata, writer?: any): any;
            static decode(reader: any, length?: number): CustomPaymentMethodMetadata;
            static decodeDelimited(reader: any): CustomPaymentMethodMetadata;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CustomPaymentMethodMetadata;
            static toObject(message: CustomPaymentMethodMetadata, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICustomPaymentMethodsAction { [key: string]: any }
        export class CustomPaymentMethodsAction implements ICustomPaymentMethodsAction {
            constructor(properties?: ICustomPaymentMethodsAction);
            [key: string]: any;
            static create(properties?: ICustomPaymentMethodsAction): CustomPaymentMethodsAction;
            static encode(message: ICustomPaymentMethodsAction, writer?: any): any;
            static encodeDelimited(message: ICustomPaymentMethodsAction, writer?: any): any;
            static decode(reader: any, length?: number): CustomPaymentMethodsAction;
            static decodeDelimited(reader: any): CustomPaymentMethodsAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CustomPaymentMethodsAction;
            static toObject(message: CustomPaymentMethodsAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ICustomerDataAction { [key: string]: any }
        export class CustomerDataAction implements ICustomerDataAction {
            constructor(properties?: ICustomerDataAction);
            [key: string]: any;
            static create(properties?: ICustomerDataAction): CustomerDataAction;
            static encode(message: ICustomerDataAction, writer?: any): any;
            static encodeDelimited(message: ICustomerDataAction, writer?: any): any;
            static decode(reader: any, length?: number): CustomerDataAction;
            static decodeDelimited(reader: any): CustomerDataAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CustomerDataAction;
            static toObject(message: CustomerDataAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDeleteChatAction { [key: string]: any }
        export class DeleteChatAction implements IDeleteChatAction {
            constructor(properties?: IDeleteChatAction);
            [key: string]: any;
            static create(properties?: IDeleteChatAction): DeleteChatAction;
            static encode(message: IDeleteChatAction, writer?: any): any;
            static encodeDelimited(message: IDeleteChatAction, writer?: any): any;
            static decode(reader: any, length?: number): DeleteChatAction;
            static decodeDelimited(reader: any): DeleteChatAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DeleteChatAction;
            static toObject(message: DeleteChatAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDeleteIndividualCallLogAction { [key: string]: any }
        export class DeleteIndividualCallLogAction implements IDeleteIndividualCallLogAction {
            constructor(properties?: IDeleteIndividualCallLogAction);
            [key: string]: any;
            static create(properties?: IDeleteIndividualCallLogAction): DeleteIndividualCallLogAction;
            static encode(message: IDeleteIndividualCallLogAction, writer?: any): any;
            static encodeDelimited(message: IDeleteIndividualCallLogAction, writer?: any): any;
            static decode(reader: any, length?: number): DeleteIndividualCallLogAction;
            static decodeDelimited(reader: any): DeleteIndividualCallLogAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DeleteIndividualCallLogAction;
            static toObject(message: DeleteIndividualCallLogAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDeleteMessageForMeAction { [key: string]: any }
        export class DeleteMessageForMeAction implements IDeleteMessageForMeAction {
            constructor(properties?: IDeleteMessageForMeAction);
            [key: string]: any;
            static create(properties?: IDeleteMessageForMeAction): DeleteMessageForMeAction;
            static encode(message: IDeleteMessageForMeAction, writer?: any): any;
            static encodeDelimited(message: IDeleteMessageForMeAction, writer?: any): any;
            static decode(reader: any, length?: number): DeleteMessageForMeAction;
            static decodeDelimited(reader: any): DeleteMessageForMeAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DeleteMessageForMeAction;
            static toObject(message: DeleteMessageForMeAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IDetectedOutcomesStatusAction { [key: string]: any }
        export class DetectedOutcomesStatusAction implements IDetectedOutcomesStatusAction {
            constructor(properties?: IDetectedOutcomesStatusAction);
            [key: string]: any;
            static create(properties?: IDetectedOutcomesStatusAction): DetectedOutcomesStatusAction;
            static encode(message: IDetectedOutcomesStatusAction, writer?: any): any;
            static encodeDelimited(message: IDetectedOutcomesStatusAction, writer?: any): any;
            static decode(reader: any, length?: number): DetectedOutcomesStatusAction;
            static decodeDelimited(reader: any): DetectedOutcomesStatusAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): DetectedOutcomesStatusAction;
            static toObject(message: DetectedOutcomesStatusAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IExternalWebBetaAction { [key: string]: any }
        export class ExternalWebBetaAction implements IExternalWebBetaAction {
            constructor(properties?: IExternalWebBetaAction);
            [key: string]: any;
            static create(properties?: IExternalWebBetaAction): ExternalWebBetaAction;
            static encode(message: IExternalWebBetaAction, writer?: any): any;
            static encodeDelimited(message: IExternalWebBetaAction, writer?: any): any;
            static decode(reader: any, length?: number): ExternalWebBetaAction;
            static decodeDelimited(reader: any): ExternalWebBetaAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ExternalWebBetaAction;
            static toObject(message: ExternalWebBetaAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IFavoritesAction { [key: string]: any }
        export class FavoritesAction implements IFavoritesAction {
            constructor(properties?: IFavoritesAction);
            [key: string]: any;
            static create(properties?: IFavoritesAction): FavoritesAction;
            static encode(message: IFavoritesAction, writer?: any): any;
            static encodeDelimited(message: IFavoritesAction, writer?: any): any;
            static decode(reader: any, length?: number): FavoritesAction;
            static decodeDelimited(reader: any): FavoritesAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): FavoritesAction;
            static toObject(message: FavoritesAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace FavoritesAction {
            export interface IFavorite { [key: string]: any }
            export class Favorite implements IFavorite {
                constructor(properties?: IFavorite);
                [key: string]: any;
                static create(properties?: IFavorite): Favorite;
                static encode(message: IFavorite, writer?: any): any;
                static encodeDelimited(message: IFavorite, writer?: any): any;
                static decode(reader: any, length?: number): Favorite;
                static decodeDelimited(reader: any): Favorite;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Favorite;
                static toObject(message: Favorite, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface IInteractiveMessageAction { [key: string]: any }
        export class InteractiveMessageAction implements IInteractiveMessageAction {
            constructor(properties?: IInteractiveMessageAction);
            [key: string]: any;
            static create(properties?: IInteractiveMessageAction): InteractiveMessageAction;
            static encode(message: IInteractiveMessageAction, writer?: any): any;
            static encodeDelimited(message: IInteractiveMessageAction, writer?: any): any;
            static decode(reader: any, length?: number): InteractiveMessageAction;
            static decodeDelimited(reader: any): InteractiveMessageAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): InteractiveMessageAction;
            static toObject(message: InteractiveMessageAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace InteractiveMessageAction {
            export enum InteractiveMessageActionMode {
                DISABLE_CTA = 1,
            }
        }
        export interface IKeyExpiration { [key: string]: any }
        export class KeyExpiration implements IKeyExpiration {
            constructor(properties?: IKeyExpiration);
            [key: string]: any;
            static create(properties?: IKeyExpiration): KeyExpiration;
            static encode(message: IKeyExpiration, writer?: any): any;
            static encodeDelimited(message: IKeyExpiration, writer?: any): any;
            static decode(reader: any, length?: number): KeyExpiration;
            static decodeDelimited(reader: any): KeyExpiration;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): KeyExpiration;
            static toObject(message: KeyExpiration, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILabelAssociationAction { [key: string]: any }
        export class LabelAssociationAction implements ILabelAssociationAction {
            constructor(properties?: ILabelAssociationAction);
            [key: string]: any;
            static create(properties?: ILabelAssociationAction): LabelAssociationAction;
            static encode(message: ILabelAssociationAction, writer?: any): any;
            static encodeDelimited(message: ILabelAssociationAction, writer?: any): any;
            static decode(reader: any, length?: number): LabelAssociationAction;
            static decodeDelimited(reader: any): LabelAssociationAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LabelAssociationAction;
            static toObject(message: LabelAssociationAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILabelEditAction { [key: string]: any }
        export class LabelEditAction implements ILabelEditAction {
            constructor(properties?: ILabelEditAction);
            [key: string]: any;
            static create(properties?: ILabelEditAction): LabelEditAction;
            static encode(message: ILabelEditAction, writer?: any): any;
            static encodeDelimited(message: ILabelEditAction, writer?: any): any;
            static decode(reader: any, length?: number): LabelEditAction;
            static decodeDelimited(reader: any): LabelEditAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LabelEditAction;
            static toObject(message: LabelEditAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace LabelEditAction {
            export enum ListType {
                NONE = 0,
                UNREAD = 1,
                GROUPS = 2,
                FAVORITES = 3,
                PREDEFINED = 4,
                CUSTOM = 5,
                COMMUNITY = 6,
                SERVER_ASSIGNED = 7,
                DRAFTED = 8,
                AI_HANDOFF = 9,
                CHANNELS = 10,
                AI_RESPONDING = 11,
                ARCHIVED = 12,
                LOCKED = 13,
                INVITES = 14,
                THIRD_PARTY = 15,
                LEAD = 16,
                MENTIONS_AND_REPLIES = 17,
            }
        }
        export interface ILabelReorderingAction { [key: string]: any }
        export class LabelReorderingAction implements ILabelReorderingAction {
            constructor(properties?: ILabelReorderingAction);
            [key: string]: any;
            static create(properties?: ILabelReorderingAction): LabelReorderingAction;
            static encode(message: ILabelReorderingAction, writer?: any): any;
            static encodeDelimited(message: ILabelReorderingAction, writer?: any): any;
            static decode(reader: any, length?: number): LabelReorderingAction;
            static decodeDelimited(reader: any): LabelReorderingAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LabelReorderingAction;
            static toObject(message: LabelReorderingAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILabelSublistAction { [key: string]: any }
        export class LabelSublistAction implements ILabelSublistAction {
            constructor(properties?: ILabelSublistAction);
            [key: string]: any;
            static create(properties?: ILabelSublistAction): LabelSublistAction;
            static encode(message: ILabelSublistAction, writer?: any): any;
            static encodeDelimited(message: ILabelSublistAction, writer?: any): any;
            static decode(reader: any, length?: number): LabelSublistAction;
            static decodeDelimited(reader: any): LabelSublistAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LabelSublistAction;
            static toObject(message: LabelSublistAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILidContactAction { [key: string]: any }
        export class LidContactAction implements ILidContactAction {
            constructor(properties?: ILidContactAction);
            [key: string]: any;
            static create(properties?: ILidContactAction): LidContactAction;
            static encode(message: ILidContactAction, writer?: any): any;
            static encodeDelimited(message: ILidContactAction, writer?: any): any;
            static decode(reader: any, length?: number): LidContactAction;
            static decodeDelimited(reader: any): LidContactAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LidContactAction;
            static toObject(message: LidContactAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILocaleSetting { [key: string]: any }
        export class LocaleSetting implements ILocaleSetting {
            constructor(properties?: ILocaleSetting);
            [key: string]: any;
            static create(properties?: ILocaleSetting): LocaleSetting;
            static encode(message: ILocaleSetting, writer?: any): any;
            static encodeDelimited(message: ILocaleSetting, writer?: any): any;
            static decode(reader: any, length?: number): LocaleSetting;
            static decodeDelimited(reader: any): LocaleSetting;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LocaleSetting;
            static toObject(message: LocaleSetting, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ILockChatAction { [key: string]: any }
        export class LockChatAction implements ILockChatAction {
            constructor(properties?: ILockChatAction);
            [key: string]: any;
            static create(properties?: ILockChatAction): LockChatAction;
            static encode(message: ILockChatAction, writer?: any): any;
            static encodeDelimited(message: ILockChatAction, writer?: any): any;
            static decode(reader: any, length?: number): LockChatAction;
            static decodeDelimited(reader: any): LockChatAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): LockChatAction;
            static toObject(message: LockChatAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMaibaAIFeaturesControlAction { [key: string]: any }
        export class MaibaAIFeaturesControlAction implements IMaibaAIFeaturesControlAction {
            constructor(properties?: IMaibaAIFeaturesControlAction);
            [key: string]: any;
            static create(properties?: IMaibaAIFeaturesControlAction): MaibaAIFeaturesControlAction;
            static encode(message: IMaibaAIFeaturesControlAction, writer?: any): any;
            static encodeDelimited(message: IMaibaAIFeaturesControlAction, writer?: any): any;
            static decode(reader: any, length?: number): MaibaAIFeaturesControlAction;
            static decodeDelimited(reader: any): MaibaAIFeaturesControlAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MaibaAIFeaturesControlAction;
            static toObject(message: MaibaAIFeaturesControlAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace MaibaAIFeaturesControlAction {
            export enum MaibaAIFeatureStatus {
                ENABLED = 0,
                ENABLED_HAS_LEARNING = 1,
                DISABLED = 2,
            }
            export enum MaibaAIReplyMode {
                MUTED = 0,
                AI_AGENT = 1,
                SUGGESTIONS = 2,
            }
        }
        export interface IMarkChatAsReadAction { [key: string]: any }
        export class MarkChatAsReadAction implements IMarkChatAsReadAction {
            constructor(properties?: IMarkChatAsReadAction);
            [key: string]: any;
            static create(properties?: IMarkChatAsReadAction): MarkChatAsReadAction;
            static encode(message: IMarkChatAsReadAction, writer?: any): any;
            static encodeDelimited(message: IMarkChatAsReadAction, writer?: any): any;
            static decode(reader: any, length?: number): MarkChatAsReadAction;
            static decodeDelimited(reader: any): MarkChatAsReadAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MarkChatAsReadAction;
            static toObject(message: MarkChatAsReadAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMarketingMessageAction { [key: string]: any }
        export class MarketingMessageAction implements IMarketingMessageAction {
            constructor(properties?: IMarketingMessageAction);
            [key: string]: any;
            static create(properties?: IMarketingMessageAction): MarketingMessageAction;
            static encode(message: IMarketingMessageAction, writer?: any): any;
            static encodeDelimited(message: IMarketingMessageAction, writer?: any): any;
            static decode(reader: any, length?: number): MarketingMessageAction;
            static decodeDelimited(reader: any): MarketingMessageAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MarketingMessageAction;
            static toObject(message: MarketingMessageAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace MarketingMessageAction {
            export enum MarketingMessagePrototypeType {
                PERSONALIZED = 0,
            }
        }
        export interface IMarketingMessageBroadcastAction { [key: string]: any }
        export class MarketingMessageBroadcastAction implements IMarketingMessageBroadcastAction {
            constructor(properties?: IMarketingMessageBroadcastAction);
            [key: string]: any;
            static create(properties?: IMarketingMessageBroadcastAction): MarketingMessageBroadcastAction;
            static encode(message: IMarketingMessageBroadcastAction, writer?: any): any;
            static encodeDelimited(message: IMarketingMessageBroadcastAction, writer?: any): any;
            static decode(reader: any, length?: number): MarketingMessageBroadcastAction;
            static decodeDelimited(reader: any): MarketingMessageBroadcastAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MarketingMessageBroadcastAction;
            static toObject(message: MarketingMessageBroadcastAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMerchantPaymentPartnerAction { [key: string]: any }
        export class MerchantPaymentPartnerAction implements IMerchantPaymentPartnerAction {
            constructor(properties?: IMerchantPaymentPartnerAction);
            [key: string]: any;
            static create(properties?: IMerchantPaymentPartnerAction): MerchantPaymentPartnerAction;
            static encode(message: IMerchantPaymentPartnerAction, writer?: any): any;
            static encodeDelimited(message: IMerchantPaymentPartnerAction, writer?: any): any;
            static decode(reader: any, length?: number): MerchantPaymentPartnerAction;
            static decodeDelimited(reader: any): MerchantPaymentPartnerAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MerchantPaymentPartnerAction;
            static toObject(message: MerchantPaymentPartnerAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace MerchantPaymentPartnerAction {
            export enum Status {
                ACTIVE = 0,
                INACTIVE = 1,
            }
        }
        export interface IMusicUserIdAction { [key: string]: any }
        export class MusicUserIdAction implements IMusicUserIdAction {
            constructor(properties?: IMusicUserIdAction);
            [key: string]: any;
            static create(properties?: IMusicUserIdAction): MusicUserIdAction;
            static encode(message: IMusicUserIdAction, writer?: any): any;
            static encodeDelimited(message: IMusicUserIdAction, writer?: any): any;
            static decode(reader: any, length?: number): MusicUserIdAction;
            static decodeDelimited(reader: any): MusicUserIdAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MusicUserIdAction;
            static toObject(message: MusicUserIdAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IMuteAction { [key: string]: any }
        export class MuteAction implements IMuteAction {
            constructor(properties?: IMuteAction);
            [key: string]: any;
            static create(properties?: IMuteAction): MuteAction;
            static encode(message: IMuteAction, writer?: any): any;
            static encodeDelimited(message: IMuteAction, writer?: any): any;
            static decode(reader: any, length?: number): MuteAction;
            static decodeDelimited(reader: any): MuteAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): MuteAction;
            static toObject(message: MuteAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface INctSaltSyncAction { [key: string]: any }
        export class NctSaltSyncAction implements INctSaltSyncAction {
            constructor(properties?: INctSaltSyncAction);
            [key: string]: any;
            static create(properties?: INctSaltSyncAction): NctSaltSyncAction;
            static encode(message: INctSaltSyncAction, writer?: any): any;
            static encodeDelimited(message: INctSaltSyncAction, writer?: any): any;
            static decode(reader: any, length?: number): NctSaltSyncAction;
            static decodeDelimited(reader: any): NctSaltSyncAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NctSaltSyncAction;
            static toObject(message: NctSaltSyncAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface INewsletterSavedInterestsAction { [key: string]: any }
        export class NewsletterSavedInterestsAction implements INewsletterSavedInterestsAction {
            constructor(properties?: INewsletterSavedInterestsAction);
            [key: string]: any;
            static create(properties?: INewsletterSavedInterestsAction): NewsletterSavedInterestsAction;
            static encode(message: INewsletterSavedInterestsAction, writer?: any): any;
            static encodeDelimited(message: INewsletterSavedInterestsAction, writer?: any): any;
            static decode(reader: any, length?: number): NewsletterSavedInterestsAction;
            static decodeDelimited(reader: any): NewsletterSavedInterestsAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NewsletterSavedInterestsAction;
            static toObject(message: NewsletterSavedInterestsAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface INoteEditAction { [key: string]: any }
        export class NoteEditAction implements INoteEditAction {
            constructor(properties?: INoteEditAction);
            [key: string]: any;
            static create(properties?: INoteEditAction): NoteEditAction;
            static encode(message: INoteEditAction, writer?: any): any;
            static encodeDelimited(message: INoteEditAction, writer?: any): any;
            static decode(reader: any, length?: number): NoteEditAction;
            static decodeDelimited(reader: any): NoteEditAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NoteEditAction;
            static toObject(message: NoteEditAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace NoteEditAction {
            export enum NoteType {
                UNSTRUCTURED = 1,
                STRUCTURED = 2,
            }
        }
        export interface INotificationActivitySettingAction { [key: string]: any }
        export class NotificationActivitySettingAction implements INotificationActivitySettingAction {
            constructor(properties?: INotificationActivitySettingAction);
            [key: string]: any;
            static create(properties?: INotificationActivitySettingAction): NotificationActivitySettingAction;
            static encode(message: INotificationActivitySettingAction, writer?: any): any;
            static encodeDelimited(message: INotificationActivitySettingAction, writer?: any): any;
            static decode(reader: any, length?: number): NotificationActivitySettingAction;
            static decodeDelimited(reader: any): NotificationActivitySettingAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NotificationActivitySettingAction;
            static toObject(message: NotificationActivitySettingAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace NotificationActivitySettingAction {
            export enum NotificationActivitySetting {
                DEFAULT_ALL_MESSAGES = 0,
                ALL_MESSAGES = 1,
                HIGHLIGHTS = 2,
                DEFAULT_HIGHLIGHTS = 3,
            }
        }
        export interface INuxAction { [key: string]: any }
        export class NuxAction implements INuxAction {
            constructor(properties?: INuxAction);
            [key: string]: any;
            static create(properties?: INuxAction): NuxAction;
            static encode(message: INuxAction, writer?: any): any;
            static encodeDelimited(message: INuxAction, writer?: any): any;
            static decode(reader: any, length?: number): NuxAction;
            static decodeDelimited(reader: any): NuxAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): NuxAction;
            static toObject(message: NuxAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IOutContactAction { [key: string]: any }
        export class OutContactAction implements IOutContactAction {
            constructor(properties?: IOutContactAction);
            [key: string]: any;
            static create(properties?: IOutContactAction): OutContactAction;
            static encode(message: IOutContactAction, writer?: any): any;
            static encodeDelimited(message: IOutContactAction, writer?: any): any;
            static decode(reader: any, length?: number): OutContactAction;
            static decodeDelimited(reader: any): OutContactAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): OutContactAction;
            static toObject(message: OutContactAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPaymentInfoAction { [key: string]: any }
        export class PaymentInfoAction implements IPaymentInfoAction {
            constructor(properties?: IPaymentInfoAction);
            [key: string]: any;
            static create(properties?: IPaymentInfoAction): PaymentInfoAction;
            static encode(message: IPaymentInfoAction, writer?: any): any;
            static encodeDelimited(message: IPaymentInfoAction, writer?: any): any;
            static decode(reader: any, length?: number): PaymentInfoAction;
            static decodeDelimited(reader: any): PaymentInfoAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PaymentInfoAction;
            static toObject(message: PaymentInfoAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPaymentTosAction { [key: string]: any }
        export class PaymentTosAction implements IPaymentTosAction {
            constructor(properties?: IPaymentTosAction);
            [key: string]: any;
            static create(properties?: IPaymentTosAction): PaymentTosAction;
            static encode(message: IPaymentTosAction, writer?: any): any;
            static encodeDelimited(message: IPaymentTosAction, writer?: any): any;
            static decode(reader: any, length?: number): PaymentTosAction;
            static decodeDelimited(reader: any): PaymentTosAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PaymentTosAction;
            static toObject(message: PaymentTosAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PaymentTosAction {
            export enum PaymentNotice {
                BR_PAY_PRIVACY_POLICY = 0,
            }
        }
        export interface IPinAction { [key: string]: any }
        export class PinAction implements IPinAction {
            constructor(properties?: IPinAction);
            [key: string]: any;
            static create(properties?: IPinAction): PinAction;
            static encode(message: IPinAction, writer?: any): any;
            static encodeDelimited(message: IPinAction, writer?: any): any;
            static decode(reader: any, length?: number): PinAction;
            static decodeDelimited(reader: any): PinAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PinAction;
            static toObject(message: PinAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPnForLidChatAction { [key: string]: any }
        export class PnForLidChatAction implements IPnForLidChatAction {
            constructor(properties?: IPnForLidChatAction);
            [key: string]: any;
            static create(properties?: IPnForLidChatAction): PnForLidChatAction;
            static encode(message: IPnForLidChatAction, writer?: any): any;
            static encodeDelimited(message: IPnForLidChatAction, writer?: any): any;
            static decode(reader: any, length?: number): PnForLidChatAction;
            static decodeDelimited(reader: any): PnForLidChatAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PnForLidChatAction;
            static toObject(message: PnForLidChatAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPrimaryFeature { [key: string]: any }
        export class PrimaryFeature implements IPrimaryFeature {
            constructor(properties?: IPrimaryFeature);
            [key: string]: any;
            static create(properties?: IPrimaryFeature): PrimaryFeature;
            static encode(message: IPrimaryFeature, writer?: any): any;
            static encodeDelimited(message: IPrimaryFeature, writer?: any): any;
            static decode(reader: any, length?: number): PrimaryFeature;
            static decodeDelimited(reader: any): PrimaryFeature;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PrimaryFeature;
            static toObject(message: PrimaryFeature, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPrimaryVersionAction { [key: string]: any }
        export class PrimaryVersionAction implements IPrimaryVersionAction {
            constructor(properties?: IPrimaryVersionAction);
            [key: string]: any;
            static create(properties?: IPrimaryVersionAction): PrimaryVersionAction;
            static encode(message: IPrimaryVersionAction, writer?: any): any;
            static encodeDelimited(message: IPrimaryVersionAction, writer?: any): any;
            static decode(reader: any, length?: number): PrimaryVersionAction;
            static decodeDelimited(reader: any): PrimaryVersionAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PrimaryVersionAction;
            static toObject(message: PrimaryVersionAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPrivacySettingChannelsPersonalisedRecommendationAction { [key: string]: any }
        export class PrivacySettingChannelsPersonalisedRecommendationAction implements IPrivacySettingChannelsPersonalisedRecommendationAction {
            constructor(properties?: IPrivacySettingChannelsPersonalisedRecommendationAction);
            [key: string]: any;
            static create(properties?: IPrivacySettingChannelsPersonalisedRecommendationAction): PrivacySettingChannelsPersonalisedRecommendationAction;
            static encode(message: IPrivacySettingChannelsPersonalisedRecommendationAction, writer?: any): any;
            static encodeDelimited(message: IPrivacySettingChannelsPersonalisedRecommendationAction, writer?: any): any;
            static decode(reader: any, length?: number): PrivacySettingChannelsPersonalisedRecommendationAction;
            static decodeDelimited(reader: any): PrivacySettingChannelsPersonalisedRecommendationAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PrivacySettingChannelsPersonalisedRecommendationAction;
            static toObject(message: PrivacySettingChannelsPersonalisedRecommendationAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPrivacySettingDisableLinkPreviewsAction { [key: string]: any }
        export class PrivacySettingDisableLinkPreviewsAction implements IPrivacySettingDisableLinkPreviewsAction {
            constructor(properties?: IPrivacySettingDisableLinkPreviewsAction);
            [key: string]: any;
            static create(properties?: IPrivacySettingDisableLinkPreviewsAction): PrivacySettingDisableLinkPreviewsAction;
            static encode(message: IPrivacySettingDisableLinkPreviewsAction, writer?: any): any;
            static encodeDelimited(message: IPrivacySettingDisableLinkPreviewsAction, writer?: any): any;
            static decode(reader: any, length?: number): PrivacySettingDisableLinkPreviewsAction;
            static decodeDelimited(reader: any): PrivacySettingDisableLinkPreviewsAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PrivacySettingDisableLinkPreviewsAction;
            static toObject(message: PrivacySettingDisableLinkPreviewsAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPrivacySettingRelayAllCalls { [key: string]: any }
        export class PrivacySettingRelayAllCalls implements IPrivacySettingRelayAllCalls {
            constructor(properties?: IPrivacySettingRelayAllCalls);
            [key: string]: any;
            static create(properties?: IPrivacySettingRelayAllCalls): PrivacySettingRelayAllCalls;
            static encode(message: IPrivacySettingRelayAllCalls, writer?: any): any;
            static encodeDelimited(message: IPrivacySettingRelayAllCalls, writer?: any): any;
            static decode(reader: any, length?: number): PrivacySettingRelayAllCalls;
            static decodeDelimited(reader: any): PrivacySettingRelayAllCalls;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PrivacySettingRelayAllCalls;
            static toObject(message: PrivacySettingRelayAllCalls, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IPrivateProcessingSettingAction { [key: string]: any }
        export class PrivateProcessingSettingAction implements IPrivateProcessingSettingAction {
            constructor(properties?: IPrivateProcessingSettingAction);
            [key: string]: any;
            static create(properties?: IPrivateProcessingSettingAction): PrivateProcessingSettingAction;
            static encode(message: IPrivateProcessingSettingAction, writer?: any): any;
            static encodeDelimited(message: IPrivateProcessingSettingAction, writer?: any): any;
            static decode(reader: any, length?: number): PrivateProcessingSettingAction;
            static decodeDelimited(reader: any): PrivateProcessingSettingAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PrivateProcessingSettingAction;
            static toObject(message: PrivateProcessingSettingAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace PrivateProcessingSettingAction {
            export enum PrivateProcessingStatus {
                UNDEFINED = 0,
                ENABLED = 1,
                DISABLED = 2,
            }
        }
        export interface IPushNameSetting { [key: string]: any }
        export class PushNameSetting implements IPushNameSetting {
            constructor(properties?: IPushNameSetting);
            [key: string]: any;
            static create(properties?: IPushNameSetting): PushNameSetting;
            static encode(message: IPushNameSetting, writer?: any): any;
            static encodeDelimited(message: IPushNameSetting, writer?: any): any;
            static decode(reader: any, length?: number): PushNameSetting;
            static decodeDelimited(reader: any): PushNameSetting;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): PushNameSetting;
            static toObject(message: PushNameSetting, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IQuickReplyAction { [key: string]: any }
        export class QuickReplyAction implements IQuickReplyAction {
            constructor(properties?: IQuickReplyAction);
            [key: string]: any;
            static create(properties?: IQuickReplyAction): QuickReplyAction;
            static encode(message: IQuickReplyAction, writer?: any): any;
            static encodeDelimited(message: IQuickReplyAction, writer?: any): any;
            static decode(reader: any, length?: number): QuickReplyAction;
            static decodeDelimited(reader: any): QuickReplyAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): QuickReplyAction;
            static toObject(message: QuickReplyAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IRecentEmojiWeightsAction { [key: string]: any }
        export class RecentEmojiWeightsAction implements IRecentEmojiWeightsAction {
            constructor(properties?: IRecentEmojiWeightsAction);
            [key: string]: any;
            static create(properties?: IRecentEmojiWeightsAction): RecentEmojiWeightsAction;
            static encode(message: IRecentEmojiWeightsAction, writer?: any): any;
            static encodeDelimited(message: IRecentEmojiWeightsAction, writer?: any): any;
            static decode(reader: any, length?: number): RecentEmojiWeightsAction;
            static decodeDelimited(reader: any): RecentEmojiWeightsAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RecentEmojiWeightsAction;
            static toObject(message: RecentEmojiWeightsAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IRemoveRecentStickerAction { [key: string]: any }
        export class RemoveRecentStickerAction implements IRemoveRecentStickerAction {
            constructor(properties?: IRemoveRecentStickerAction);
            [key: string]: any;
            static create(properties?: IRemoveRecentStickerAction): RemoveRecentStickerAction;
            static encode(message: IRemoveRecentStickerAction, writer?: any): any;
            static encodeDelimited(message: IRemoveRecentStickerAction, writer?: any): any;
            static decode(reader: any, length?: number): RemoveRecentStickerAction;
            static decodeDelimited(reader: any): RemoveRecentStickerAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): RemoveRecentStickerAction;
            static toObject(message: RemoveRecentStickerAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISettingsSyncAction { [key: string]: any }
        export class SettingsSyncAction implements ISettingsSyncAction {
            constructor(properties?: ISettingsSyncAction);
            [key: string]: any;
            static create(properties?: ISettingsSyncAction): SettingsSyncAction;
            static encode(message: ISettingsSyncAction, writer?: any): any;
            static encodeDelimited(message: ISettingsSyncAction, writer?: any): any;
            static decode(reader: any, length?: number): SettingsSyncAction;
            static decodeDelimited(reader: any): SettingsSyncAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SettingsSyncAction;
            static toObject(message: SettingsSyncAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace SettingsSyncAction {
            export enum DisplayMode {
                DISPLAY_MODE_UNKNOWN = 0,
                ALWAYS = 1,
                NEVER = 2,
                ONLY_WHEN_APP_IS_OPEN = 3,
            }
            export enum MediaQualitySetting {
                MEDIA_QUALITY_UNKNOWN = 0,
                STANDARD = 1,
                HD = 2,
            }
            export enum SettingKey {
                SETTING_KEY_UNKNOWN = 0,
                START_AT_LOGIN = 1,
                MINIMIZE_TO_TRAY = 2,
                LANGUAGE = 3,
                REPLACE_TEXT_WITH_EMOJI = 4,
                BANNER_NOTIFICATION_DISPLAY_MODE = 5,
                UNREAD_COUNTER_BADGE_DISPLAY_MODE = 6,
                IS_MESSAGES_NOTIFICATION_ENABLED = 7,
                IS_CALLS_NOTIFICATION_ENABLED = 8,
                IS_REACTIONS_NOTIFICATION_ENABLED = 9,
                IS_STATUS_REACTIONS_NOTIFICATION_ENABLED = 10,
                IS_TEXT_PREVIEW_FOR_NOTIFICATION_ENABLED = 11,
                DEFAULT_NOTIFICATION_TONE_ID = 12,
                GROUP_DEFAULT_NOTIFICATION_TONE_ID = 13,
                APP_THEME = 14,
                WALLPAPER_ID = 15,
                IS_DOODLE_WALLPAPER_ENABLED = 16,
                FONT_SIZE = 17,
                IS_PHOTOS_AUTODOWNLOAD_ENABLED = 18,
                IS_AUDIOS_AUTODOWNLOAD_ENABLED = 19,
                IS_VIDEOS_AUTODOWNLOAD_ENABLED = 20,
                IS_DOCUMENTS_AUTODOWNLOAD_ENABLED = 21,
                DISABLE_LINK_PREVIEWS = 22,
                NOTIFICATION_TONE_ID = 23,
                MEDIA_UPLOAD_QUALITY = 24,
                IS_SPELL_CHECK_ENABLED = 25,
                IS_ENTER_TO_SEND_ENABLED = 26,
                IS_GROUP_MESSAGE_NOTIFICATION_ENABLED = 27,
                IS_GROUP_REACTIONS_NOTIFICATION_ENABLED = 28,
                IS_STATUS_NOTIFICATION_ENABLED = 29,
                STATUS_NOTIFICATION_TONE_ID = 30,
                SHOULD_PLAY_SOUND_FOR_CALL_NOTIFICATION = 31,
                CHAT_THEME_ID = 32,
                COLOR_SCHEME_ID = 33,
                STOCK_WALLPAPER_IMAGE_ID = 34,
            }
            export enum SettingPlatform {
                PLATFORM_UNKNOWN = 0,
                WEB = 1,
                HYBRID = 2,
                WINDOWS = 3,
                MAC = 4,
            }
        }
        export interface IStarAction { [key: string]: any }
        export class StarAction implements IStarAction {
            constructor(properties?: IStarAction);
            [key: string]: any;
            static create(properties?: IStarAction): StarAction;
            static encode(message: IStarAction, writer?: any): any;
            static encodeDelimited(message: IStarAction, writer?: any): any;
            static decode(reader: any, length?: number): StarAction;
            static decodeDelimited(reader: any): StarAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StarAction;
            static toObject(message: StarAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IStatusPostOptInNotificationPreferencesAction { [key: string]: any }
        export class StatusPostOptInNotificationPreferencesAction implements IStatusPostOptInNotificationPreferencesAction {
            constructor(properties?: IStatusPostOptInNotificationPreferencesAction);
            [key: string]: any;
            static create(properties?: IStatusPostOptInNotificationPreferencesAction): StatusPostOptInNotificationPreferencesAction;
            static encode(message: IStatusPostOptInNotificationPreferencesAction, writer?: any): any;
            static encodeDelimited(message: IStatusPostOptInNotificationPreferencesAction, writer?: any): any;
            static decode(reader: any, length?: number): StatusPostOptInNotificationPreferencesAction;
            static decodeDelimited(reader: any): StatusPostOptInNotificationPreferencesAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusPostOptInNotificationPreferencesAction;
            static toObject(message: StatusPostOptInNotificationPreferencesAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IStatusPrivacyAction { [key: string]: any }
        export class StatusPrivacyAction implements IStatusPrivacyAction {
            constructor(properties?: IStatusPrivacyAction);
            [key: string]: any;
            static create(properties?: IStatusPrivacyAction): StatusPrivacyAction;
            static encode(message: IStatusPrivacyAction, writer?: any): any;
            static encodeDelimited(message: IStatusPrivacyAction, writer?: any): any;
            static decode(reader: any, length?: number): StatusPrivacyAction;
            static decodeDelimited(reader: any): StatusPrivacyAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StatusPrivacyAction;
            static toObject(message: StatusPrivacyAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace StatusPrivacyAction {
            export interface ICustomList { [key: string]: any }
            export class CustomList implements ICustomList {
                constructor(properties?: ICustomList);
                [key: string]: any;
                static create(properties?: ICustomList): CustomList;
                static encode(message: ICustomList, writer?: any): any;
                static encodeDelimited(message: ICustomList, writer?: any): any;
                static decode(reader: any, length?: number): CustomList;
                static decodeDelimited(reader: any): CustomList;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): CustomList;
                static toObject(message: CustomList, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export enum StatusDistributionMode {
                ALLOW_LIST = 0,
                DENY_LIST = 1,
                CONTACTS = 2,
                CLOSE_FRIENDS = 3,
                CUSTOM_LIST = 4,
            }
        }
        export interface IStickerAction { [key: string]: any }
        export class StickerAction implements IStickerAction {
            constructor(properties?: IStickerAction);
            [key: string]: any;
            static create(properties?: IStickerAction): StickerAction;
            static encode(message: IStickerAction, writer?: any): any;
            static encodeDelimited(message: IStickerAction, writer?: any): any;
            static decode(reader: any, length?: number): StickerAction;
            static decodeDelimited(reader: any): StickerAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): StickerAction;
            static toObject(message: StickerAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISubscriptionAction { [key: string]: any }
        export class SubscriptionAction implements ISubscriptionAction {
            constructor(properties?: ISubscriptionAction);
            [key: string]: any;
            static create(properties?: ISubscriptionAction): SubscriptionAction;
            static encode(message: ISubscriptionAction, writer?: any): any;
            static encodeDelimited(message: ISubscriptionAction, writer?: any): any;
            static decode(reader: any, length?: number): SubscriptionAction;
            static decodeDelimited(reader: any): SubscriptionAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SubscriptionAction;
            static toObject(message: SubscriptionAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISubscriptionsSyncV2Action { [key: string]: any }
        export class SubscriptionsSyncV2Action implements ISubscriptionsSyncV2Action {
            constructor(properties?: ISubscriptionsSyncV2Action);
            [key: string]: any;
            static create(properties?: ISubscriptionsSyncV2Action): SubscriptionsSyncV2Action;
            static encode(message: ISubscriptionsSyncV2Action, writer?: any): any;
            static encodeDelimited(message: ISubscriptionsSyncV2Action, writer?: any): any;
            static decode(reader: any, length?: number): SubscriptionsSyncV2Action;
            static decodeDelimited(reader: any): SubscriptionsSyncV2Action;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SubscriptionsSyncV2Action;
            static toObject(message: SubscriptionsSyncV2Action, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace SubscriptionsSyncV2Action {
            export interface IPaidFeature { [key: string]: any }
            export class PaidFeature implements IPaidFeature {
                constructor(properties?: IPaidFeature);
                [key: string]: any;
                static create(properties?: IPaidFeature): PaidFeature;
                static encode(message: IPaidFeature, writer?: any): any;
                static encodeDelimited(message: IPaidFeature, writer?: any): any;
                static decode(reader: any, length?: number): PaidFeature;
                static decodeDelimited(reader: any): PaidFeature;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): PaidFeature;
                static toObject(message: PaidFeature, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export interface ISubscriptionInfo { [key: string]: any }
            export class SubscriptionInfo implements ISubscriptionInfo {
                constructor(properties?: ISubscriptionInfo);
                [key: string]: any;
                static create(properties?: ISubscriptionInfo): SubscriptionInfo;
                static encode(message: ISubscriptionInfo, writer?: any): any;
                static encodeDelimited(message: ISubscriptionInfo, writer?: any): any;
                static decode(reader: any, length?: number): SubscriptionInfo;
                static decodeDelimited(reader: any): SubscriptionInfo;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): SubscriptionInfo;
                static toObject(message: SubscriptionInfo, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
        export interface ISyncActionMessage { [key: string]: any }
        export class SyncActionMessage implements ISyncActionMessage {
            constructor(properties?: ISyncActionMessage);
            [key: string]: any;
            static create(properties?: ISyncActionMessage): SyncActionMessage;
            static encode(message: ISyncActionMessage, writer?: any): any;
            static encodeDelimited(message: ISyncActionMessage, writer?: any): any;
            static decode(reader: any, length?: number): SyncActionMessage;
            static decodeDelimited(reader: any): SyncActionMessage;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SyncActionMessage;
            static toObject(message: SyncActionMessage, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ISyncActionMessageRange { [key: string]: any }
        export class SyncActionMessageRange implements ISyncActionMessageRange {
            constructor(properties?: ISyncActionMessageRange);
            [key: string]: any;
            static create(properties?: ISyncActionMessageRange): SyncActionMessageRange;
            static encode(message: ISyncActionMessageRange, writer?: any): any;
            static encodeDelimited(message: ISyncActionMessageRange, writer?: any): any;
            static decode(reader: any, length?: number): SyncActionMessageRange;
            static decodeDelimited(reader: any): SyncActionMessageRange;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): SyncActionMessageRange;
            static toObject(message: SyncActionMessageRange, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IThreadPinAction { [key: string]: any }
        export class ThreadPinAction implements IThreadPinAction {
            constructor(properties?: IThreadPinAction);
            [key: string]: any;
            static create(properties?: IThreadPinAction): ThreadPinAction;
            static encode(message: IThreadPinAction, writer?: any): any;
            static encodeDelimited(message: IThreadPinAction, writer?: any): any;
            static decode(reader: any, length?: number): ThreadPinAction;
            static decodeDelimited(reader: any): ThreadPinAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): ThreadPinAction;
            static toObject(message: ThreadPinAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface ITimeFormatAction { [key: string]: any }
        export class TimeFormatAction implements ITimeFormatAction {
            constructor(properties?: ITimeFormatAction);
            [key: string]: any;
            static create(properties?: ITimeFormatAction): TimeFormatAction;
            static encode(message: ITimeFormatAction, writer?: any): any;
            static encodeDelimited(message: ITimeFormatAction, writer?: any): any;
            static decode(reader: any, length?: number): TimeFormatAction;
            static decodeDelimited(reader: any): TimeFormatAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): TimeFormatAction;
            static toObject(message: TimeFormatAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IUGCBot { [key: string]: any }
        export class UGCBot implements IUGCBot {
            constructor(properties?: IUGCBot);
            [key: string]: any;
            static create(properties?: IUGCBot): UGCBot;
            static encode(message: IUGCBot, writer?: any): any;
            static encodeDelimited(message: IUGCBot, writer?: any): any;
            static decode(reader: any, length?: number): UGCBot;
            static decodeDelimited(reader: any): UGCBot;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UGCBot;
            static toObject(message: UGCBot, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IUnarchiveChatsSetting { [key: string]: any }
        export class UnarchiveChatsSetting implements IUnarchiveChatsSetting {
            constructor(properties?: IUnarchiveChatsSetting);
            [key: string]: any;
            static create(properties?: IUnarchiveChatsSetting): UnarchiveChatsSetting;
            static encode(message: IUnarchiveChatsSetting, writer?: any): any;
            static encodeDelimited(message: IUnarchiveChatsSetting, writer?: any): any;
            static decode(reader: any, length?: number): UnarchiveChatsSetting;
            static decodeDelimited(reader: any): UnarchiveChatsSetting;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UnarchiveChatsSetting;
            static toObject(message: UnarchiveChatsSetting, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IUserStatusMuteAction { [key: string]: any }
        export class UserStatusMuteAction implements IUserStatusMuteAction {
            constructor(properties?: IUserStatusMuteAction);
            [key: string]: any;
            static create(properties?: IUserStatusMuteAction): UserStatusMuteAction;
            static encode(message: IUserStatusMuteAction, writer?: any): any;
            static encodeDelimited(message: IUserStatusMuteAction, writer?: any): any;
            static decode(reader: any, length?: number): UserStatusMuteAction;
            static decodeDelimited(reader: any): UserStatusMuteAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UserStatusMuteAction;
            static toObject(message: UserStatusMuteAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IUsernameChatStartModeAction { [key: string]: any }
        export class UsernameChatStartModeAction implements IUsernameChatStartModeAction {
            constructor(properties?: IUsernameChatStartModeAction);
            [key: string]: any;
            static create(properties?: IUsernameChatStartModeAction): UsernameChatStartModeAction;
            static encode(message: IUsernameChatStartModeAction, writer?: any): any;
            static encodeDelimited(message: IUsernameChatStartModeAction, writer?: any): any;
            static decode(reader: any, length?: number): UsernameChatStartModeAction;
            static decodeDelimited(reader: any): UsernameChatStartModeAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UsernameChatStartModeAction;
            static toObject(message: UsernameChatStartModeAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace UsernameChatStartModeAction {
            export enum ChatStartMode {
                LID = 1,
                PN = 2,
            }
        }
        export interface IWASARootSecretAction { [key: string]: any }
        export class WASARootSecretAction implements IWASARootSecretAction {
            constructor(properties?: IWASARootSecretAction);
            [key: string]: any;
            static create(properties?: IWASARootSecretAction): WASARootSecretAction;
            static encode(message: IWASARootSecretAction, writer?: any): any;
            static encodeDelimited(message: IWASARootSecretAction, writer?: any): any;
            static decode(reader: any, length?: number): WASARootSecretAction;
            static decodeDelimited(reader: any): WASARootSecretAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): WASARootSecretAction;
            static toObject(message: WASARootSecretAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace WASARootSecretAction {
            export interface IRootSecretEntry { [key: string]: any }
            export class RootSecretEntry implements IRootSecretEntry {
                constructor(properties?: IRootSecretEntry);
                [key: string]: any;
                static create(properties?: IRootSecretEntry): RootSecretEntry;
                static encode(message: IRootSecretEntry, writer?: any): any;
                static encodeDelimited(message: IRootSecretEntry, writer?: any): any;
                static decode(reader: any, length?: number): RootSecretEntry;
                static decodeDelimited(reader: any): RootSecretEntry;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): RootSecretEntry;
                static toObject(message: RootSecretEntry, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
            export namespace RootSecretEntry {
                export enum Status {
                    INACTIVE = 0,
                    ACTIVE = 1,
                }
            }
        }
        export interface IWaffleAccountLinkStateAction { [key: string]: any }
        export class WaffleAccountLinkStateAction implements IWaffleAccountLinkStateAction {
            constructor(properties?: IWaffleAccountLinkStateAction);
            [key: string]: any;
            static create(properties?: IWaffleAccountLinkStateAction): WaffleAccountLinkStateAction;
            static encode(message: IWaffleAccountLinkStateAction, writer?: any): any;
            static encodeDelimited(message: IWaffleAccountLinkStateAction, writer?: any): any;
            static decode(reader: any, length?: number): WaffleAccountLinkStateAction;
            static decodeDelimited(reader: any): WaffleAccountLinkStateAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): WaffleAccountLinkStateAction;
            static toObject(message: WaffleAccountLinkStateAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace WaffleAccountLinkStateAction {
            export enum AccountLinkState {
                ACTIVE = 0,
                PAUSED = 1,
                UNLINKED = 2,
            }
        }
        export interface IWamoUserIdentifierAction { [key: string]: any }
        export class WamoUserIdentifierAction implements IWamoUserIdentifierAction {
            constructor(properties?: IWamoUserIdentifierAction);
            [key: string]: any;
            static create(properties?: IWamoUserIdentifierAction): WamoUserIdentifierAction;
            static encode(message: IWamoUserIdentifierAction, writer?: any): any;
            static encodeDelimited(message: IWamoUserIdentifierAction, writer?: any): any;
            static decode(reader: any, length?: number): WamoUserIdentifierAction;
            static decodeDelimited(reader: any): WamoUserIdentifierAction;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): WamoUserIdentifierAction;
            static toObject(message: WamoUserIdentifierAction, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface ISyncdIndex { [key: string]: any }
    export class SyncdIndex implements ISyncdIndex {
        constructor(properties?: ISyncdIndex);
        [key: string]: any;
        static create(properties?: ISyncdIndex): SyncdIndex;
        static encode(message: ISyncdIndex, writer?: any): any;
        static encodeDelimited(message: ISyncdIndex, writer?: any): any;
        static decode(reader: any, length?: number): SyncdIndex;
        static decodeDelimited(reader: any): SyncdIndex;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdIndex;
        static toObject(message: SyncdIndex, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdMutation { [key: string]: any }
    export class SyncdMutation implements ISyncdMutation {
        constructor(properties?: ISyncdMutation);
        [key: string]: any;
        static create(properties?: ISyncdMutation): SyncdMutation;
        static encode(message: ISyncdMutation, writer?: any): any;
        static encodeDelimited(message: ISyncdMutation, writer?: any): any;
        static decode(reader: any, length?: number): SyncdMutation;
        static decodeDelimited(reader: any): SyncdMutation;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdMutation;
        static toObject(message: SyncdMutation, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace SyncdMutation {
        export enum SyncdOperation {
            SET = 0,
            REMOVE = 1,
        }
    }
    export interface ISyncdMutations { [key: string]: any }
    export class SyncdMutations implements ISyncdMutations {
        constructor(properties?: ISyncdMutations);
        [key: string]: any;
        static create(properties?: ISyncdMutations): SyncdMutations;
        static encode(message: ISyncdMutations, writer?: any): any;
        static encodeDelimited(message: ISyncdMutations, writer?: any): any;
        static decode(reader: any, length?: number): SyncdMutations;
        static decodeDelimited(reader: any): SyncdMutations;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdMutations;
        static toObject(message: SyncdMutations, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdPatch { [key: string]: any }
    export class SyncdPatch implements ISyncdPatch {
        constructor(properties?: ISyncdPatch);
        [key: string]: any;
        static create(properties?: ISyncdPatch): SyncdPatch;
        static encode(message: ISyncdPatch, writer?: any): any;
        static encodeDelimited(message: ISyncdPatch, writer?: any): any;
        static decode(reader: any, length?: number): SyncdPatch;
        static decodeDelimited(reader: any): SyncdPatch;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdPatch;
        static toObject(message: SyncdPatch, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdPlainTextRecord { [key: string]: any }
    export class SyncdPlainTextRecord implements ISyncdPlainTextRecord {
        constructor(properties?: ISyncdPlainTextRecord);
        [key: string]: any;
        static create(properties?: ISyncdPlainTextRecord): SyncdPlainTextRecord;
        static encode(message: ISyncdPlainTextRecord, writer?: any): any;
        static encodeDelimited(message: ISyncdPlainTextRecord, writer?: any): any;
        static decode(reader: any, length?: number): SyncdPlainTextRecord;
        static decodeDelimited(reader: any): SyncdPlainTextRecord;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdPlainTextRecord;
        static toObject(message: SyncdPlainTextRecord, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdRecord { [key: string]: any }
    export class SyncdRecord implements ISyncdRecord {
        constructor(properties?: ISyncdRecord);
        [key: string]: any;
        static create(properties?: ISyncdRecord): SyncdRecord;
        static encode(message: ISyncdRecord, writer?: any): any;
        static encodeDelimited(message: ISyncdRecord, writer?: any): any;
        static decode(reader: any, length?: number): SyncdRecord;
        static decodeDelimited(reader: any): SyncdRecord;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdRecord;
        static toObject(message: SyncdRecord, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdSnapshot { [key: string]: any }
    export class SyncdSnapshot implements ISyncdSnapshot {
        constructor(properties?: ISyncdSnapshot);
        [key: string]: any;
        static create(properties?: ISyncdSnapshot): SyncdSnapshot;
        static encode(message: ISyncdSnapshot, writer?: any): any;
        static encodeDelimited(message: ISyncdSnapshot, writer?: any): any;
        static decode(reader: any, length?: number): SyncdSnapshot;
        static decodeDelimited(reader: any): SyncdSnapshot;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdSnapshot;
        static toObject(message: SyncdSnapshot, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdSnapshotRecovery { [key: string]: any }
    export class SyncdSnapshotRecovery implements ISyncdSnapshotRecovery {
        constructor(properties?: ISyncdSnapshotRecovery);
        [key: string]: any;
        static create(properties?: ISyncdSnapshotRecovery): SyncdSnapshotRecovery;
        static encode(message: ISyncdSnapshotRecovery, writer?: any): any;
        static encodeDelimited(message: ISyncdSnapshotRecovery, writer?: any): any;
        static decode(reader: any, length?: number): SyncdSnapshotRecovery;
        static decodeDelimited(reader: any): SyncdSnapshotRecovery;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdSnapshotRecovery;
        static toObject(message: SyncdSnapshotRecovery, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdValue { [key: string]: any }
    export class SyncdValue implements ISyncdValue {
        constructor(properties?: ISyncdValue);
        [key: string]: any;
        static create(properties?: ISyncdValue): SyncdValue;
        static encode(message: ISyncdValue, writer?: any): any;
        static encodeDelimited(message: ISyncdValue, writer?: any): any;
        static decode(reader: any, length?: number): SyncdValue;
        static decodeDelimited(reader: any): SyncdValue;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdValue;
        static toObject(message: SyncdValue, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ISyncdVersion { [key: string]: any }
    export class SyncdVersion implements ISyncdVersion {
        constructor(properties?: ISyncdVersion);
        [key: string]: any;
        static create(properties?: ISyncdVersion): SyncdVersion;
        static encode(message: ISyncdVersion, writer?: any): any;
        static encodeDelimited(message: ISyncdVersion, writer?: any): any;
        static decode(reader: any, length?: number): SyncdVersion;
        static decodeDelimited(reader: any): SyncdVersion;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): SyncdVersion;
        static toObject(message: SyncdVersion, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ITapLinkAction { [key: string]: any }
    export class TapLinkAction implements ITapLinkAction {
        constructor(properties?: ITapLinkAction);
        [key: string]: any;
        static create(properties?: ITapLinkAction): TapLinkAction;
        static encode(message: ITapLinkAction, writer?: any): any;
        static encodeDelimited(message: ITapLinkAction, writer?: any): any;
        static decode(reader: any, length?: number): TapLinkAction;
        static decodeDelimited(reader: any): TapLinkAction;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): TapLinkAction;
        static toObject(message: TapLinkAction, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface ITemplateButton { [key: string]: any }
    export class TemplateButton implements ITemplateButton {
        constructor(properties?: ITemplateButton);
        [key: string]: any;
        static create(properties?: ITemplateButton): TemplateButton;
        static encode(message: ITemplateButton, writer?: any): any;
        static encodeDelimited(message: ITemplateButton, writer?: any): any;
        static decode(reader: any, length?: number): TemplateButton;
        static decodeDelimited(reader: any): TemplateButton;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): TemplateButton;
        static toObject(message: TemplateButton, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace TemplateButton {
        export interface ICallButton { [key: string]: any }
        export class CallButton implements ICallButton {
            constructor(properties?: ICallButton);
            [key: string]: any;
            static create(properties?: ICallButton): CallButton;
            static encode(message: ICallButton, writer?: any): any;
            static encodeDelimited(message: ICallButton, writer?: any): any;
            static decode(reader: any, length?: number): CallButton;
            static decodeDelimited(reader: any): CallButton;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): CallButton;
            static toObject(message: CallButton, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IQuickReplyButton { [key: string]: any }
        export class QuickReplyButton implements IQuickReplyButton {
            constructor(properties?: IQuickReplyButton);
            [key: string]: any;
            static create(properties?: IQuickReplyButton): QuickReplyButton;
            static encode(message: IQuickReplyButton, writer?: any): any;
            static encodeDelimited(message: IQuickReplyButton, writer?: any): any;
            static decode(reader: any, length?: number): QuickReplyButton;
            static decodeDelimited(reader: any): QuickReplyButton;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): QuickReplyButton;
            static toObject(message: QuickReplyButton, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export interface IURLButton { [key: string]: any }
        export class URLButton implements IURLButton {
            constructor(properties?: IURLButton);
            [key: string]: any;
            static create(properties?: IURLButton): URLButton;
            static encode(message: IURLButton, writer?: any): any;
            static encodeDelimited(message: IURLButton, writer?: any): any;
            static decode(reader: any, length?: number): URLButton;
            static decodeDelimited(reader: any): URLButton;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): URLButton;
            static toObject(message: URLButton, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IThreadID { [key: string]: any }
    export class ThreadID implements IThreadID {
        constructor(properties?: IThreadID);
        [key: string]: any;
        static create(properties?: IThreadID): ThreadID;
        static encode(message: IThreadID, writer?: any): any;
        static encodeDelimited(message: IThreadID, writer?: any): any;
        static decode(reader: any, length?: number): ThreadID;
        static decodeDelimited(reader: any): ThreadID;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): ThreadID;
        static toObject(message: ThreadID, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace ThreadID {
        export enum ThreadType {
            UNKNOWN = 0,
            VIEW_REPLIES = 1,
            AI_THREAD = 2,
        }
    }
    export interface IUnCountedAssociatedMessageList { [key: string]: any }
    export class UnCountedAssociatedMessageList implements IUnCountedAssociatedMessageList {
        constructor(properties?: IUnCountedAssociatedMessageList);
        [key: string]: any;
        static create(properties?: IUnCountedAssociatedMessageList): UnCountedAssociatedMessageList;
        static encode(message: IUnCountedAssociatedMessageList, writer?: any): any;
        static encodeDelimited(message: IUnCountedAssociatedMessageList, writer?: any): any;
        static decode(reader: any, length?: number): UnCountedAssociatedMessageList;
        static decodeDelimited(reader: any): UnCountedAssociatedMessageList;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): UnCountedAssociatedMessageList;
        static toObject(message: UnCountedAssociatedMessageList, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IUnCountedAssociatedMessageListWithMessageBytes { [key: string]: any }
    export class UnCountedAssociatedMessageListWithMessageBytes implements IUnCountedAssociatedMessageListWithMessageBytes {
        constructor(properties?: IUnCountedAssociatedMessageListWithMessageBytes);
        [key: string]: any;
        static create(properties?: IUnCountedAssociatedMessageListWithMessageBytes): UnCountedAssociatedMessageListWithMessageBytes;
        static encode(message: IUnCountedAssociatedMessageListWithMessageBytes, writer?: any): any;
        static encodeDelimited(message: IUnCountedAssociatedMessageListWithMessageBytes, writer?: any): any;
        static decode(reader: any, length?: number): UnCountedAssociatedMessageListWithMessageBytes;
        static decodeDelimited(reader: any): UnCountedAssociatedMessageListWithMessageBytes;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): UnCountedAssociatedMessageListWithMessageBytes;
        static toObject(message: UnCountedAssociatedMessageListWithMessageBytes, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IUrlTrackingMap { [key: string]: any }
    export class UrlTrackingMap implements IUrlTrackingMap {
        constructor(properties?: IUrlTrackingMap);
        [key: string]: any;
        static create(properties?: IUrlTrackingMap): UrlTrackingMap;
        static encode(message: IUrlTrackingMap, writer?: any): any;
        static encodeDelimited(message: IUrlTrackingMap, writer?: any): any;
        static decode(reader: any, length?: number): UrlTrackingMap;
        static decodeDelimited(reader: any): UrlTrackingMap;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): UrlTrackingMap;
        static toObject(message: UrlTrackingMap, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace UrlTrackingMap {
        export interface IUrlTrackingMapElement { [key: string]: any }
        export class UrlTrackingMapElement implements IUrlTrackingMapElement {
            constructor(properties?: IUrlTrackingMapElement);
            [key: string]: any;
            static create(properties?: IUrlTrackingMapElement): UrlTrackingMapElement;
            static encode(message: IUrlTrackingMapElement, writer?: any): any;
            static encodeDelimited(message: IUrlTrackingMapElement, writer?: any): any;
            static decode(reader: any, length?: number): UrlTrackingMapElement;
            static decodeDelimited(reader: any): UrlTrackingMapElement;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): UrlTrackingMapElement;
            static toObject(message: UrlTrackingMapElement, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IUserPassword { [key: string]: any }
    export class UserPassword implements IUserPassword {
        constructor(properties?: IUserPassword);
        [key: string]: any;
        static create(properties?: IUserPassword): UserPassword;
        static encode(message: IUserPassword, writer?: any): any;
        static encodeDelimited(message: IUserPassword, writer?: any): any;
        static decode(reader: any, length?: number): UserPassword;
        static decodeDelimited(reader: any): UserPassword;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): UserPassword;
        static toObject(message: UserPassword, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace UserPassword {
        export enum Encoding {
            UTF8 = 0,
            UTF8_BROKEN = 1,
        }
        export enum Transformer {
            NONE = 0,
            PBKDF2_HMAC_SHA512 = 1,
            PBKDF2_HMAC_SHA384 = 2,
        }
        export interface ITransformerArg { [key: string]: any }
        export class TransformerArg implements ITransformerArg {
            constructor(properties?: ITransformerArg);
            [key: string]: any;
            static create(properties?: ITransformerArg): TransformerArg;
            static encode(message: ITransformerArg, writer?: any): any;
            static encodeDelimited(message: ITransformerArg, writer?: any): any;
            static decode(reader: any, length?: number): TransformerArg;
            static decodeDelimited(reader: any): TransformerArg;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): TransformerArg;
            static toObject(message: TransformerArg, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
        export namespace TransformerArg {
            export interface IValue { [key: string]: any }
            export class Value implements IValue {
                constructor(properties?: IValue);
                [key: string]: any;
                static create(properties?: IValue): Value;
                static encode(message: IValue, writer?: any): any;
                static encodeDelimited(message: IValue, writer?: any): any;
                static decode(reader: any, length?: number): Value;
                static decodeDelimited(reader: any): Value;
                static verify(message: { [k: string]: any }): string | null;
                static fromObject(object: { [k: string]: any }): Value;
                static toObject(message: Value, options?: any): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
    }
    export interface IUserReceipt { [key: string]: any }
    export class UserReceipt implements IUserReceipt {
        constructor(properties?: IUserReceipt);
        [key: string]: any;
        static create(properties?: IUserReceipt): UserReceipt;
        static encode(message: IUserReceipt, writer?: any): any;
        static encodeDelimited(message: IUserReceipt, writer?: any): any;
        static decode(reader: any, length?: number): UserReceipt;
        static decodeDelimited(reader: any): UserReceipt;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): UserReceipt;
        static toObject(message: UserReceipt, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IVerifiedNameCertificate { [key: string]: any }
    export class VerifiedNameCertificate implements IVerifiedNameCertificate {
        constructor(properties?: IVerifiedNameCertificate);
        [key: string]: any;
        static create(properties?: IVerifiedNameCertificate): VerifiedNameCertificate;
        static encode(message: IVerifiedNameCertificate, writer?: any): any;
        static encodeDelimited(message: IVerifiedNameCertificate, writer?: any): any;
        static decode(reader: any, length?: number): VerifiedNameCertificate;
        static decodeDelimited(reader: any): VerifiedNameCertificate;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): VerifiedNameCertificate;
        static toObject(message: VerifiedNameCertificate, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace VerifiedNameCertificate {
        export interface IDetails { [key: string]: any }
        export class Details implements IDetails {
            constructor(properties?: IDetails);
            [key: string]: any;
            static create(properties?: IDetails): Details;
            static encode(message: IDetails, writer?: any): any;
            static encodeDelimited(message: IDetails, writer?: any): any;
            static decode(reader: any, length?: number): Details;
            static decodeDelimited(reader: any): Details;
            static verify(message: { [k: string]: any }): string | null;
            static fromObject(object: { [k: string]: any }): Details;
            static toObject(message: Details, options?: any): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }
    }
    export interface IVirtualDeviceOutput { [key: string]: any }
    export class VirtualDeviceOutput implements IVirtualDeviceOutput {
        constructor(properties?: IVirtualDeviceOutput);
        [key: string]: any;
        static create(properties?: IVirtualDeviceOutput): VirtualDeviceOutput;
        static encode(message: IVirtualDeviceOutput, writer?: any): any;
        static encodeDelimited(message: IVirtualDeviceOutput, writer?: any): any;
        static decode(reader: any, length?: number): VirtualDeviceOutput;
        static decodeDelimited(reader: any): VirtualDeviceOutput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): VirtualDeviceOutput;
        static toObject(message: VirtualDeviceOutput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IWallpaperSettings { [key: string]: any }
    export class WallpaperSettings implements IWallpaperSettings {
        constructor(properties?: IWallpaperSettings);
        [key: string]: any;
        static create(properties?: IWallpaperSettings): WallpaperSettings;
        static encode(message: IWallpaperSettings, writer?: any): any;
        static encodeDelimited(message: IWallpaperSettings, writer?: any): any;
        static decode(reader: any, length?: number): WallpaperSettings;
        static decodeDelimited(reader: any): WallpaperSettings;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WallpaperSettings;
        static toObject(message: WallpaperSettings, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IWebFeatures { [key: string]: any }
    export class WebFeatures implements IWebFeatures {
        constructor(properties?: IWebFeatures);
        [key: string]: any;
        static create(properties?: IWebFeatures): WebFeatures;
        static encode(message: IWebFeatures, writer?: any): any;
        static encodeDelimited(message: IWebFeatures, writer?: any): any;
        static decode(reader: any, length?: number): WebFeatures;
        static decodeDelimited(reader: any): WebFeatures;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WebFeatures;
        static toObject(message: WebFeatures, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace WebFeatures {
        export enum Flag {
            NOT_STARTED = 0,
            FORCE_UPGRADE = 1,
            DEVELOPMENT = 2,
            PRODUCTION = 3,
        }
    }
    export enum WebLinkRenderConfig {
        WEBVIEW = 0,
        SYSTEM = 1,
    }
    export interface IWebMessageInfo { [key: string]: any }
    export class WebMessageInfo implements IWebMessageInfo {
        constructor(properties?: IWebMessageInfo);
        [key: string]: any;
        static create(properties?: IWebMessageInfo): WebMessageInfo;
        static encode(message: IWebMessageInfo, writer?: any): any;
        static encodeDelimited(message: IWebMessageInfo, writer?: any): any;
        static decode(reader: any, length?: number): WebMessageInfo;
        static decodeDelimited(reader: any): WebMessageInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WebMessageInfo;
        static toObject(message: WebMessageInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export namespace WebMessageInfo {
        export enum BizPrivacyStatus {
            E2EE = 0,
            FB = 2,
            BSP = 1,
            BSP_AND_FB = 3,
        }
        export enum Status {
            ERROR = 0,
            PENDING = 1,
            SERVER_ACK = 2,
            DELIVERY_ACK = 3,
            READ = 4,
            PLAYED = 5,
        }
        export enum StubType {
            UNKNOWN = 0,
            REVOKE = 1,
            CIPHERTEXT = 2,
            FUTUREPROOF = 3,
            NON_VERIFIED_TRANSITION = 4,
            UNVERIFIED_TRANSITION = 5,
            VERIFIED_TRANSITION = 6,
            VERIFIED_LOW_UNKNOWN = 7,
            VERIFIED_HIGH = 8,
            VERIFIED_INITIAL_UNKNOWN = 9,
            VERIFIED_INITIAL_LOW = 10,
            VERIFIED_INITIAL_HIGH = 11,
            VERIFIED_TRANSITION_ANY_TO_NONE = 12,
            VERIFIED_TRANSITION_ANY_TO_HIGH = 13,
            VERIFIED_TRANSITION_HIGH_TO_LOW = 14,
            VERIFIED_TRANSITION_HIGH_TO_UNKNOWN = 15,
            VERIFIED_TRANSITION_UNKNOWN_TO_LOW = 16,
            VERIFIED_TRANSITION_LOW_TO_UNKNOWN = 17,
            VERIFIED_TRANSITION_NONE_TO_LOW = 18,
            VERIFIED_TRANSITION_NONE_TO_UNKNOWN = 19,
            GROUP_CREATE = 20,
            GROUP_CHANGE_SUBJECT = 21,
            GROUP_CHANGE_ICON = 22,
            GROUP_CHANGE_INVITE_LINK = 23,
            GROUP_CHANGE_DESCRIPTION = 24,
            GROUP_CHANGE_RESTRICT = 25,
            GROUP_CHANGE_ANNOUNCE = 26,
            GROUP_PARTICIPANT_ADD = 27,
            GROUP_PARTICIPANT_REMOVE = 28,
            GROUP_PARTICIPANT_PROMOTE = 29,
            GROUP_PARTICIPANT_DEMOTE = 30,
            GROUP_PARTICIPANT_INVITE = 31,
            GROUP_PARTICIPANT_LEAVE = 32,
            GROUP_PARTICIPANT_CHANGE_NUMBER = 33,
            BROADCAST_CREATE = 34,
            BROADCAST_ADD = 35,
            BROADCAST_REMOVE = 36,
            GENERIC_NOTIFICATION = 37,
            E2E_IDENTITY_CHANGED = 38,
            E2E_ENCRYPTED = 39,
            CALL_MISSED_VOICE = 40,
            CALL_MISSED_VIDEO = 41,
            INDIVIDUAL_CHANGE_NUMBER = 42,
            GROUP_DELETE = 43,
            GROUP_ANNOUNCE_MODE_MESSAGE_BOUNCE = 44,
            CALL_MISSED_GROUP_VOICE = 45,
            CALL_MISSED_GROUP_VIDEO = 46,
            PAYMENT_CIPHERTEXT = 47,
            PAYMENT_FUTUREPROOF = 48,
            PAYMENT_TRANSACTION_STATUS_UPDATE_FAILED = 49,
            PAYMENT_TRANSACTION_STATUS_UPDATE_REFUNDED = 50,
            PAYMENT_TRANSACTION_STATUS_UPDATE_REFUND_FAILED = 51,
            PAYMENT_TRANSACTION_STATUS_RECEIVER_PENDING_SETUP = 52,
            PAYMENT_TRANSACTION_STATUS_RECEIVER_SUCCESS_AFTER_HICCUP = 53,
            PAYMENT_ACTION_ACCOUNT_SETUP_REMINDER = 54,
            PAYMENT_ACTION_SEND_PAYMENT_REMINDER = 55,
            PAYMENT_ACTION_SEND_PAYMENT_INVITATION = 56,
            PAYMENT_ACTION_REQUEST_DECLINED = 57,
            PAYMENT_ACTION_REQUEST_EXPIRED = 58,
            PAYMENT_ACTION_REQUEST_CANCELLED = 59,
            BIZ_VERIFIED_TRANSITION_TOP_TO_BOTTOM = 60,
            BIZ_VERIFIED_TRANSITION_BOTTOM_TO_TOP = 61,
            BIZ_INTRO_TOP = 62,
            BIZ_INTRO_BOTTOM = 63,
            BIZ_NAME_CHANGE = 64,
            BIZ_MOVE_TO_CONSUMER_APP = 65,
            BIZ_TWO_TIER_MIGRATION_TOP = 66,
            BIZ_TWO_TIER_MIGRATION_BOTTOM = 67,
            OVERSIZED = 68,
            GROUP_CHANGE_NO_FREQUENTLY_FORWARDED = 69,
            GROUP_V4_ADD_INVITE_SENT = 70,
            GROUP_PARTICIPANT_ADD_REQUEST_JOIN = 71,
            CHANGE_EPHEMERAL_SETTING = 72,
            E2E_DEVICE_CHANGED = 73,
            VIEWED_ONCE = 74,
            E2E_ENCRYPTED_NOW = 75,
            BLUE_MSG_BSP_FB_TO_BSP_PREMISE = 76,
            BLUE_MSG_BSP_FB_TO_SELF_FB = 77,
            BLUE_MSG_BSP_FB_TO_SELF_PREMISE = 78,
            BLUE_MSG_BSP_FB_UNVERIFIED = 79,
            BLUE_MSG_BSP_FB_UNVERIFIED_TO_SELF_PREMISE_VERIFIED = 80,
            BLUE_MSG_BSP_FB_VERIFIED = 81,
            BLUE_MSG_BSP_FB_VERIFIED_TO_SELF_PREMISE_UNVERIFIED = 82,
            BLUE_MSG_BSP_PREMISE_TO_SELF_PREMISE = 83,
            BLUE_MSG_BSP_PREMISE_UNVERIFIED = 84,
            BLUE_MSG_BSP_PREMISE_UNVERIFIED_TO_SELF_PREMISE_VERIFIED = 85,
            BLUE_MSG_BSP_PREMISE_VERIFIED = 86,
            BLUE_MSG_BSP_PREMISE_VERIFIED_TO_SELF_PREMISE_UNVERIFIED = 87,
            BLUE_MSG_CONSUMER_TO_BSP_FB_UNVERIFIED = 88,
            BLUE_MSG_CONSUMER_TO_BSP_PREMISE_UNVERIFIED = 89,
            BLUE_MSG_CONSUMER_TO_SELF_FB_UNVERIFIED = 90,
            BLUE_MSG_CONSUMER_TO_SELF_PREMISE_UNVERIFIED = 91,
            BLUE_MSG_SELF_FB_TO_BSP_PREMISE = 92,
            BLUE_MSG_SELF_FB_TO_SELF_PREMISE = 93,
            BLUE_MSG_SELF_FB_UNVERIFIED = 94,
            BLUE_MSG_SELF_FB_UNVERIFIED_TO_SELF_PREMISE_VERIFIED = 95,
            BLUE_MSG_SELF_FB_VERIFIED = 96,
            BLUE_MSG_SELF_FB_VERIFIED_TO_SELF_PREMISE_UNVERIFIED = 97,
            BLUE_MSG_SELF_PREMISE_TO_BSP_PREMISE = 98,
            BLUE_MSG_SELF_PREMISE_UNVERIFIED = 99,
            BLUE_MSG_SELF_PREMISE_VERIFIED = 100,
            BLUE_MSG_TO_BSP_FB = 101,
            BLUE_MSG_TO_CONSUMER = 102,
            BLUE_MSG_TO_SELF_FB = 103,
            BLUE_MSG_UNVERIFIED_TO_BSP_FB_VERIFIED = 104,
            BLUE_MSG_UNVERIFIED_TO_BSP_PREMISE_VERIFIED = 105,
            BLUE_MSG_UNVERIFIED_TO_SELF_FB_VERIFIED = 106,
            BLUE_MSG_UNVERIFIED_TO_VERIFIED = 107,
            BLUE_MSG_VERIFIED_TO_BSP_FB_UNVERIFIED = 108,
            BLUE_MSG_VERIFIED_TO_BSP_PREMISE_UNVERIFIED = 109,
            BLUE_MSG_VERIFIED_TO_SELF_FB_UNVERIFIED = 110,
            BLUE_MSG_VERIFIED_TO_UNVERIFIED = 111,
            BLUE_MSG_BSP_FB_UNVERIFIED_TO_BSP_PREMISE_VERIFIED = 112,
            BLUE_MSG_BSP_FB_UNVERIFIED_TO_SELF_FB_VERIFIED = 113,
            BLUE_MSG_BSP_FB_VERIFIED_TO_BSP_PREMISE_UNVERIFIED = 114,
            BLUE_MSG_BSP_FB_VERIFIED_TO_SELF_FB_UNVERIFIED = 115,
            BLUE_MSG_SELF_FB_UNVERIFIED_TO_BSP_PREMISE_VERIFIED = 116,
            BLUE_MSG_SELF_FB_VERIFIED_TO_BSP_PREMISE_UNVERIFIED = 117,
            E2E_IDENTITY_UNAVAILABLE = 118,
            GROUP_CREATING = 119,
            GROUP_CREATE_FAILED = 120,
            GROUP_BOUNCED = 121,
            BLOCK_CONTACT = 122,
            EPHEMERAL_SETTING_NOT_APPLIED = 123,
            SYNC_FAILED = 124,
            SYNCING = 125,
            BIZ_PRIVACY_MODE_INIT_FB = 126,
            BIZ_PRIVACY_MODE_INIT_BSP = 127,
            BIZ_PRIVACY_MODE_TO_FB = 128,
            BIZ_PRIVACY_MODE_TO_BSP = 129,
            DISAPPEARING_MODE = 130,
            E2E_DEVICE_FETCH_FAILED = 131,
            ADMIN_REVOKE = 132,
            GROUP_INVITE_LINK_GROWTH_LOCKED = 133,
            COMMUNITY_LINK_PARENT_GROUP = 134,
            COMMUNITY_LINK_SIBLING_GROUP = 135,
            COMMUNITY_LINK_SUB_GROUP = 136,
            COMMUNITY_UNLINK_PARENT_GROUP = 137,
            COMMUNITY_UNLINK_SIBLING_GROUP = 138,
            COMMUNITY_UNLINK_SUB_GROUP = 139,
            GROUP_PARTICIPANT_ACCEPT = 140,
            GROUP_PARTICIPANT_LINKED_GROUP_JOIN = 141,
            COMMUNITY_CREATE = 142,
            EPHEMERAL_KEEP_IN_CHAT = 143,
            GROUP_MEMBERSHIP_JOIN_APPROVAL_REQUEST = 144,
            GROUP_MEMBERSHIP_JOIN_APPROVAL_MODE = 145,
            INTEGRITY_UNLINK_PARENT_GROUP = 146,
            COMMUNITY_PARTICIPANT_PROMOTE = 147,
            COMMUNITY_PARTICIPANT_DEMOTE = 148,
            COMMUNITY_PARENT_GROUP_DELETED = 149,
            COMMUNITY_LINK_PARENT_GROUP_MEMBERSHIP_APPROVAL = 150,
            GROUP_PARTICIPANT_JOINED_GROUP_AND_PARENT_GROUP = 151,
            MASKED_THREAD_CREATED = 152,
            MASKED_THREAD_UNMASKED = 153,
            BIZ_CHAT_ASSIGNMENT = 154,
            CHAT_PSA = 155,
            CHAT_POLL_CREATION_MESSAGE = 156,
            CAG_MASKED_THREAD_CREATED = 157,
            COMMUNITY_PARENT_GROUP_SUBJECT_CHANGED = 158,
            CAG_INVITE_AUTO_ADD = 159,
            BIZ_CHAT_ASSIGNMENT_UNASSIGN = 160,
            CAG_INVITE_AUTO_JOINED = 161,
            SCHEDULED_CALL_START_MESSAGE = 162,
            COMMUNITY_INVITE_RICH = 163,
            COMMUNITY_INVITE_AUTO_ADD_RICH = 164,
            SUB_GROUP_INVITE_RICH = 165,
            SUB_GROUP_PARTICIPANT_ADD_RICH = 166,
            COMMUNITY_LINK_PARENT_GROUP_RICH = 167,
            COMMUNITY_PARTICIPANT_ADD_RICH = 168,
            SILENCED_UNKNOWN_CALLER_AUDIO = 169,
            SILENCED_UNKNOWN_CALLER_VIDEO = 170,
            GROUP_MEMBER_ADD_MODE = 171,
            GROUP_MEMBERSHIP_JOIN_APPROVAL_REQUEST_NON_ADMIN_ADD = 172,
            COMMUNITY_CHANGE_DESCRIPTION = 173,
            SENDER_INVITE = 174,
            RECEIVER_INVITE = 175,
            COMMUNITY_ALLOW_MEMBER_ADDED_GROUPS = 176,
            PINNED_MESSAGE_IN_CHAT = 177,
            PAYMENT_INVITE_SETUP_INVITER = 178,
            PAYMENT_INVITE_SETUP_INVITEE_RECEIVE_ONLY = 179,
            PAYMENT_INVITE_SETUP_INVITEE_SEND_AND_RECEIVE = 180,
            LINKED_GROUP_CALL_START = 181,
            REPORT_TO_ADMIN_ENABLED_STATUS = 182,
            EMPTY_SUBGROUP_CREATE = 183,
            SCHEDULED_CALL_CANCEL = 184,
            SUBGROUP_ADMIN_TRIGGERED_AUTO_ADD_RICH = 185,
            GROUP_CHANGE_RECENT_HISTORY_SHARING = 186,
            PAID_MESSAGE_SERVER_CAMPAIGN_ID = 187,
            GENERAL_CHAT_CREATE = 188,
            GENERAL_CHAT_ADD = 189,
            GENERAL_CHAT_AUTO_ADD_DISABLED = 190,
            SUGGESTED_SUBGROUP_ANNOUNCE = 191,
            BIZ_BOT_1P_MESSAGING_ENABLED = 192,
            CHANGE_USERNAME = 193,
            BIZ_COEX_PRIVACY_INIT_SELF = 194,
            BIZ_COEX_PRIVACY_TRANSITION_SELF = 195,
            SUPPORT_AI_EDUCATION = 196,
            BIZ_BOT_3P_MESSAGING_ENABLED = 197,
            REMINDER_SETUP_MESSAGE = 198,
            REMINDER_SENT_MESSAGE = 199,
            REMINDER_CANCEL_MESSAGE = 200,
            BIZ_COEX_PRIVACY_INIT = 201,
            BIZ_COEX_PRIVACY_TRANSITION = 202,
            GROUP_DEACTIVATED = 203,
            COMMUNITY_DEACTIVATE_SIBLING_GROUP = 204,
            EVENT_UPDATED = 205,
            EVENT_CANCELED = 206,
            COMMUNITY_OWNER_UPDATED = 207,
            COMMUNITY_SUB_GROUP_VISIBILITY_HIDDEN = 208,
            CAPI_GROUP_NE2EE_SYSTEM_MESSAGE = 209,
            STATUS_MENTION = 210,
            USER_CONTROLS_SYSTEM_MESSAGE = 211,
            SUPPORT_SYSTEM_MESSAGE = 212,
            CHANGE_LID = 213,
            BIZ_CUSTOMER_3PD_DATA_SHARING_OPT_IN_MESSAGE = 214,
            BIZ_CUSTOMER_3PD_DATA_SHARING_OPT_OUT_MESSAGE = 215,
            CHANGE_LIMIT_SHARING = 216,
            GROUP_MEMBER_LINK_MODE = 217,
            BIZ_AUTOMATICALLY_LABELED_CHAT_SYSTEM_MESSAGE = 218,
            PHONE_NUMBER_HIDING_CHAT_DEPRECATED_MESSAGE = 219,
            QUARANTINED_MESSAGE = 220,
            GROUP_MEMBER_SHARE_GROUP_HISTORY_MODE = 221,
            GROUP_OPEN_BOT_ADDED = 222,
            GROUP_TEE_BOT_ADDED = 223,
            CONTACT_INFO = 224,
            SCHEDULED_MESSAGE_CREATED = 225,
            IDENTITY_TRUST_MARKED = 226,
            IDENTITY_TRUST_UNMARKED = 227,
            IDENTITY_TRUST_REVOKED = 228,
            CTWA_CONSUMER_DISCLOSURE = 230,
        }
    }
    export interface IWebMessageInfoWithMessageBytes { [key: string]: any }
    export class WebMessageInfoWithMessageBytes implements IWebMessageInfoWithMessageBytes {
        constructor(properties?: IWebMessageInfoWithMessageBytes);
        [key: string]: any;
        static create(properties?: IWebMessageInfoWithMessageBytes): WebMessageInfoWithMessageBytes;
        static encode(message: IWebMessageInfoWithMessageBytes, writer?: any): any;
        static encodeDelimited(message: IWebMessageInfoWithMessageBytes, writer?: any): any;
        static decode(reader: any, length?: number): WebMessageInfoWithMessageBytes;
        static decodeDelimited(reader: any): WebMessageInfoWithMessageBytes;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WebMessageInfoWithMessageBytes;
        static toObject(message: WebMessageInfoWithMessageBytes, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IWebNotificationsInfo { [key: string]: any }
    export class WebNotificationsInfo implements IWebNotificationsInfo {
        constructor(properties?: IWebNotificationsInfo);
        [key: string]: any;
        static create(properties?: IWebNotificationsInfo): WebNotificationsInfo;
        static encode(message: IWebNotificationsInfo, writer?: any): any;
        static encodeDelimited(message: IWebNotificationsInfo, writer?: any): any;
        static decode(reader: any, length?: number): WebNotificationsInfo;
        static decodeDelimited(reader: any): WebNotificationsInfo;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WebNotificationsInfo;
        static toObject(message: WebNotificationsInfo, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IWrapTransportSigningPublicKeyInput { [key: string]: any }
    export class WrapTransportSigningPublicKeyInput implements IWrapTransportSigningPublicKeyInput {
        constructor(properties?: IWrapTransportSigningPublicKeyInput);
        [key: string]: any;
        static create(properties?: IWrapTransportSigningPublicKeyInput): WrapTransportSigningPublicKeyInput;
        static encode(message: IWrapTransportSigningPublicKeyInput, writer?: any): any;
        static encodeDelimited(message: IWrapTransportSigningPublicKeyInput, writer?: any): any;
        static decode(reader: any, length?: number): WrapTransportSigningPublicKeyInput;
        static decodeDelimited(reader: any): WrapTransportSigningPublicKeyInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WrapTransportSigningPublicKeyInput;
        static toObject(message: WrapTransportSigningPublicKeyInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IWrapTransportSigningPublicKeyResult { [key: string]: any }
    export class WrapTransportSigningPublicKeyResult implements IWrapTransportSigningPublicKeyResult {
        constructor(properties?: IWrapTransportSigningPublicKeyResult);
        [key: string]: any;
        static create(properties?: IWrapTransportSigningPublicKeyResult): WrapTransportSigningPublicKeyResult;
        static encode(message: IWrapTransportSigningPublicKeyResult, writer?: any): any;
        static encodeDelimited(message: IWrapTransportSigningPublicKeyResult, writer?: any): any;
        static decode(reader: any, length?: number): WrapTransportSigningPublicKeyResult;
        static decodeDelimited(reader: any): WrapTransportSigningPublicKeyResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WrapTransportSigningPublicKeyResult;
        static toObject(message: WrapTransportSigningPublicKeyResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IWrapTransportSigningSecretKeyInput { [key: string]: any }
    export class WrapTransportSigningSecretKeyInput implements IWrapTransportSigningSecretKeyInput {
        constructor(properties?: IWrapTransportSigningSecretKeyInput);
        [key: string]: any;
        static create(properties?: IWrapTransportSigningSecretKeyInput): WrapTransportSigningSecretKeyInput;
        static encode(message: IWrapTransportSigningSecretKeyInput, writer?: any): any;
        static encodeDelimited(message: IWrapTransportSigningSecretKeyInput, writer?: any): any;
        static decode(reader: any, length?: number): WrapTransportSigningSecretKeyInput;
        static decodeDelimited(reader: any): WrapTransportSigningSecretKeyInput;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WrapTransportSigningSecretKeyInput;
        static toObject(message: WrapTransportSigningSecretKeyInput, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
    export interface IWrapTransportSigningSecretKeyResult { [key: string]: any }
    export class WrapTransportSigningSecretKeyResult implements IWrapTransportSigningSecretKeyResult {
        constructor(properties?: IWrapTransportSigningSecretKeyResult);
        [key: string]: any;
        static create(properties?: IWrapTransportSigningSecretKeyResult): WrapTransportSigningSecretKeyResult;
        static encode(message: IWrapTransportSigningSecretKeyResult, writer?: any): any;
        static encodeDelimited(message: IWrapTransportSigningSecretKeyResult, writer?: any): any;
        static decode(reader: any, length?: number): WrapTransportSigningSecretKeyResult;
        static decodeDelimited(reader: any): WrapTransportSigningSecretKeyResult;
        static verify(message: { [k: string]: any }): string | null;
        static fromObject(object: { [k: string]: any }): WrapTransportSigningSecretKeyResult;
        static toObject(message: WrapTransportSigningSecretKeyResult, options?: any): { [k: string]: any };
        toJSON(): { [k: string]: any };
    }
}
declare const $root: any;
export default $root;
