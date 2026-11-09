export { Dugong } from "./dugong.js";
export default makeWASocket;
declare function makeWASocket(config: any): {
    checkUsername: (username: any, includeSuggestions?: boolean) => Promise<{
        available: boolean;
        username: any;
        suggestions?: undefined;
        rejectionReasons?: undefined;
        suggestionsEligible?: undefined;
    } | {
        available: boolean;
        username: any;
        suggestions: any;
        rejectionReasons: any;
        suggestionsEligible: any;
    }>;
    checkUsernameMulti: (usernames: any) => Promise<any>;
    setUsername: (username: any, options?: {}) => Promise<any>;
    deleteUsername: () => Promise<any>;
    getMyUsername: () => Promise<any>;
    setUsernamePin: (pin: any) => Promise<any>;
    findUserByUsername: (username: any, pin: any) => Promise<{
        jid: any;
        contact: boolean;
    }>;
    fetchContactUsernames: (...jids: any[]) => Promise<any>;
    getUsernameRecommendations: (source?: any) => Promise<any>;
    getUsername: () => Promise<any>;
    removeUsername: () => Promise<any>;
    checkUsernameAvailability: (username: any, includeSuggestions?: boolean) => Promise<{
        available: boolean;
        username: any;
        suggestions?: undefined;
        rejectionReasons?: undefined;
        suggestionsEligible?: undefined;
    } | {
        available: boolean;
        username: any;
        suggestions: any;
        rejectionReasons: any;
        suggestionsEligible: any;
    }>;
    USERNAME_QUERY_IDS: {
        CHECK: string;
        CHECK_MULTI: string;
        SET: string;
        GET: string;
        GET_RECOMMENDATIONS: string;
        PIN_SET: string;
    };
    USERNAME_CHECK_RESULT: {
        SUCCESS: string;
        INVALID: string;
    };
    USERNAME_SOURCE: {
        FB: string;
        IG: string;
        USER_INPUT: string;
        SUGGESTION: string;
    };
    communityQuery: (jid: any, type: any, content: any) => Promise<any>;
    communityMetadata: (jid: any) => Promise<{
        id: any;
        subject: any;
        subjectOwner: any;
        subjectTime: number;
        size: any;
        creation: number;
        owner: string;
        ownerPn: string;
        ownerUsername: any;
        owner_country_code: any;
        desc: any;
        descId: any;
        descOwner: string;
        descOwnerPn: string;
        descOwnerUsername: any;
        descTime: number;
        linkedParent: any;
        restrict: boolean;
        announce: boolean;
        isCommunity: boolean;
        isCommunityAnnounce: boolean;
        joinApprovalMode: boolean;
        memberAddMode: boolean;
        participants: any;
        ephemeralDuration: number;
        addressingMode: any;
    }>;
    communityCreate: (subject: any, body: any) => Promise<any>;
    communityCreateGroup: (subject: any, participants: any, parentCommunityJid: any) => Promise<any>;
    communityLeave: (id: any) => Promise<void>;
    communityUpdateSubject: (jid: any, subject: any) => Promise<void>;
    communityLinkGroup: (groupJid: any, parentCommunityJid: any) => Promise<void>;
    communityUnlinkGroup: (groupJid: any, parentCommunityJid: any) => Promise<void>;
    communityFetchLinkedGroups: (jid: any) => Promise<{
        communityJid: any;
        isCommunity: boolean;
        linkedGroups: {
            id: string;
            subject: any;
            creation: number;
            owner: string;
            size: number;
        }[];
    }>;
    communityRequestParticipantsList: (jid: any) => Promise<any>;
    communityRequestParticipantsUpdate: (jid: any, participants: any, action: any) => Promise<any>;
    communityParticipantsUpdate: (jid: any, participants: any, action: any) => Promise<any>;
    communityUpdateDescription: (jid: any, description: any) => Promise<void>;
    communityInviteCode: (jid: any) => Promise<any>;
    communityRevokeInvite: (jid: any) => Promise<any>;
    communityAcceptInvite: (code: any) => Promise<any>;
    communityRevokeInviteV4: (communityJid: any, invitedJid: any) => Promise<boolean>;
    communityAcceptInviteV4: (...args: any[]) => Promise<any>;
    communityGetInviteInfo: (code: any) => Promise<{
        id: any;
        subject: any;
        subjectOwner: any;
        subjectTime: number;
        size: any;
        creation: number;
        owner: string;
        ownerPn: string;
        ownerUsername: any;
        owner_country_code: any;
        desc: any;
        descId: any;
        descOwner: string;
        descOwnerPn: string;
        descOwnerUsername: any;
        descTime: number;
        linkedParent: any;
        restrict: boolean;
        announce: boolean;
        isCommunity: boolean;
        isCommunityAnnounce: boolean;
        joinApprovalMode: boolean;
        memberAddMode: boolean;
        participants: any;
        ephemeralDuration: number;
        addressingMode: any;
    }>;
    communityToggleEphemeral: (jid: any, ephemeralExpiration: any) => Promise<void>;
    communitySettingUpdate: (jid: any, setting: any) => Promise<void>;
    communityMemberAddMode: (jid: any, mode: any) => Promise<void>;
    communityJoinApprovalMode: (jid: any, mode: any) => Promise<void>;
    communityFetchAllParticipating: () => Promise<{}>;
    logger: any;
    getOrderDetails: (orderId: any, tokenBase64: any) => Promise<{
        price: {
            total: number;
            currency: any;
        };
        products: any;
    }>;
    getCatalog: (options: {
        [key: string]: any;
        jid: any;
        limit: any;
        cursor: any;
    }) => Promise<{
        products: any;
        nextPageCursor: any;
    }>;
    getCollections: (jid: any, limit?: number) => Promise<{
        collections: any;
    }>;
    productCreate: (create: any) => Promise<{
        id: any;
        imageUrls: {
            requested: any;
            original: any;
        };
        reviewStatus: {
            whatsapp: any;
        };
        availability: string;
        name: any;
        retailerId: any;
        url: any;
        description: any;
        price: number;
        currency: any;
        isHidden: boolean;
    }>;
    productDelete: (productIds: any) => Promise<{
        deleted: number;
    }>;
    productUpdate: (productId: any, update: any) => Promise<{
        id: any;
        imageUrls: {
            requested: any;
            original: any;
        };
        reviewStatus: {
            whatsapp: any;
        };
        availability: string;
        name: any;
        retailerId: any;
        url: any;
        description: any;
        price: number;
        currency: any;
        isHidden: boolean;
    }>;
    updateBussinesProfile: (args: any) => Promise<any>;
    updateBusinessProfile: (args: any) => Promise<any>;
    updateCoverPhoto: (photo: any) => Promise<any>;
    removeCoverPhoto: (id: any) => Promise<any>;
    sendMessageAck: (node: any, errorCode: any) => Promise<void>;
    sendRetryRequest: (node: any, forceIncludeKeys?: boolean) => Promise<void>;
    rejectCall: (callId: any, callFrom: any) => Promise<void>;
    fetchMessageHistory: (count: any, oldestMsgKey: any, oldestMsgTimestamp: any) => Promise<any>;
    requestPlaceholderResend: (messageKey: any, msgData: any) => Promise<any>;
    messageRetryManager: import("../Utils/message-retry-manager.js").MessageRetryManager;
    userDevicesCache: any;
    devicesMutex: {
        mutex(code: any): any;
    };
    issuePrivacyTokens: (jids: any, timestamp: any) => Promise<any>;
    assertSessions: (jids: any, force: any) => Promise<boolean>;
    relayMessage: (jid: any, message: any, options: {
        [key: string]: any;
        messageId: any;
        participant: any;
        additionalAttributes: any;
        additionalNodes: any;
        useUserDevicesCache: any;
        useCachedGroupMetadata: any;
        addBizAttributes: any;
        statusJidList: any;
        recipientOverrides: any;
        restrictKeyTo: any;
    }) => Promise<any>;
    sendReceipt: (jid: any, participant: any, messageIds: any, type: any) => Promise<void>;
    sendReceipts: (keys: any, type: any) => Promise<void>;
    readMessages: (keys: any) => Promise<void>;
    refreshMediaConn: (forceGet?: boolean) => Promise<any>;
    getMediaHost: () => string;
    waUploadToServer: (filePath: any, options: {
        [key: string]: any;
        mediaType: any;
        fileEncSha256B64: any;
        timeoutMs: any;
        newsletter: any;
    }) => Promise<{
        mediaUrl: any;
        directPath: any;
        meta_hmac: any;
        fbid: any;
        ts: any;
        thumbnailDirectPath: any;
        thumbnailSha256: any;
    }>;
    fetchPrivacySettings: (force?: boolean) => Promise<any>;
    sendPeerDataOperationMessage: (pdoMessage: any) => Promise<any>;
    createParticipantNodes: (recipientJids: any, message: any, extraAttrs: any, dsmMessage: any) => Promise<{
        nodes: any[];
        shouldIncludeDeviceIdentity: boolean;
    }>;
    getUSyncDevices: (jids: any, useCache: any, ignoreZeroDevices: any) => Promise<any[]>;
    updateMemberLabel: (jid: any, memberLabel: any) => Promise<any>;
    updateMediaMessage: (message: any) => Promise<any>;
    sendTable: (jid: any, title: any, headers: any, rows: any, quoted: any, options?: {}) => Promise<{
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
    sendTableV2: (jid: any, table: any, quoted: any, options?: {}) => Promise<{
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
    }>;
    sendList: (jid: any, title: any, items: any, quoted: any, options?: {}) => Promise<{
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
    sendCodeBlock: (jid: any, code: any, quoted: any, options?: {}) => Promise<{
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
    sendCodeBlockV2: (jid: any, code: any, quoted: any, options?: {}) => Promise<{
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
    }>;
    sendLink: (jid: any, text: any, links: any, quoted: any, options?: {}) => Promise<{
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
    }>;
    sendLinkV2: (jid: any, text: any, links: any, quoted: any, options?: {}) => Promise<{
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
    }>;
    sendLatex: (jid: any, quoted: any, options: any) => Promise<{
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
    sendLatexImage: (jid: any, quoted: any, options: any, uploadFn: any, renderLatexToPng: any) => Promise<{
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
    sendLatexInlineImage: (jid: any, quoted: any, options: any, uploadFn: any, renderLatexToPng: any) => Promise<{
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
    captureUnifiedResponse: (msg: any) => {
        unifiedResponse: {
            data: any;
        };
        submessages: any;
        contextInfo: any;
    };
    sendUnifiedResponse: (jid: any, quoted: any, captured: any) => Promise<{
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
    sendRichMessage: (jid: any, submessages: any, quoted: any, options?: {}) => Promise<{
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
    sendMessage: (jid: any, content: any, options?: {}) => Promise<any>;
    sendAlbumMessage: (jid: any, medias: any, options?: {}) => Promise<any>;
    sendReaction: (jid: any, reaction: any, key: any) => Promise<any>;
    sendPin: (jid: any, key: any, pinOptions?: {
        [key: string]: any;
        durationSec?: number;
    }, options?: {}) => Promise<any>;
    sendUnpin: (jid: any, key: any, options?: {}) => Promise<any>;
    sendKeep: (jid: any, key: any, options?: {}) => Promise<any>;
    sendUnkeep: (jid: any, key: any, options?: {}) => Promise<any>;
    sendEvent: (jid: any, event: any, options?: {}) => Promise<any>;
    sendPoll: (jid: any, poll: any, options?: {}) => Promise<any>;
    sendQuiz: (jid: any, quiz: any, options?: {}) => Promise<any>;
    editPoll: (jid: any, key: any, poll: any, options?: {}) => Promise<any>;
    sendMentionAll: (jid: any, text: any, options?: {}) => Promise<any>;
    sendStatusMention: (content: any, mentions: any, options?: {}) => Promise<any>;
    sendLocation: (jid: any, location: any, options?: {}) => Promise<any>;
    sendContact: (jid: any, contact: any, options?: {}) => Promise<any>;
    sendGroupInvite: (jid: any, invite: any, options?: {}) => Promise<any>;
    downloadMedia: (message: any, type?: string, options?: {}) => Promise<any>;
    copyNForward: (jid: any, message: any, forceForward?: boolean, options?: {}) => Promise<any>;
    newsletterCreate: (name: any, description: any) => Promise<{
        id: any;
        owner: any;
        name: any;
        creation_time: number;
        description: any;
        invite: any;
        subscribers: number;
        verification: any;
        picture: {
            id: any;
            directPath: any;
        };
        mute_state: any;
    }>;
    newsletterUpdate: (jid: any, updates: any) => Promise<any>;
    newsletterSubscribers: (jid: any) => Promise<any>;
    newsletterSubscribed: () => Promise<any>;
    newsletterMetadata: (type: any, key: any) => Promise<any>;
    newsletterFollow: (jid: any) => any;
    newsletterUnfollow: (jid: any) => any;
    newsletterMute: (jid: any) => any;
    newsletterUnmute: (jid: any) => any;
    newsletterUpdateName: (jid: any, name: any) => Promise<any>;
    newsletterUpdateDescription: (jid: any, description: any) => Promise<any>;
    newsletterUpdatePicture: (jid: any, content: any) => Promise<any>;
    newsletterRemovePicture: (jid: any) => Promise<any>;
    newsletterReactMessage: (jid: any, serverId: any, reaction: any) => Promise<void>;
    newsletterFetchMessages: (jid: any, count: any, since: any, after: any) => Promise<any[]>;
    subscribeNewsletterUpdates: (jid: any) => Promise<{
        duration: any;
    }>;
    newsletterAdminCount: (jid: any) => Promise<any>;
    newsletterChangeOwner: (jid: any, newOwnerJid: any) => Promise<void>;
    newsletterDemote: (jid: any, userJid: any) => Promise<void>;
    newsletterDelete: (jid: any) => Promise<void>;
    executeWMexQuery: Function;
    newsletterProbeQueryIds: Function;
    groupQuery: (jid: any, type: any, content: any) => Promise<any>;
    groupMetadata: (jid: any) => Promise<{
        id: any;
        notify: any;
        addressingMode: any;
        subject: any;
        subjectOwner: any;
        subjectOwnerPn: any;
        subjectOwnerUsername: any;
        subjectTime: number;
        size: any;
        creation: number;
        owner: string;
        ownerPn: string;
        ownerUsername: any;
        owner_country_code: any;
        desc: any;
        descId: any;
        descOwner: string;
        descOwnerPn: string;
        descOwnerUsername: any;
        descTime: number;
        linkedParent: any;
        restrict: boolean;
        announce: boolean;
        isCommunity: boolean;
        isCommunityAnnounce: boolean;
        joinApprovalMode: boolean;
        memberAddMode: boolean;
        participants: any;
        ephemeralDuration: number;
    }>;
    groupCreate: (subject: any, participants: any) => Promise<{
        id: any;
        notify: any;
        addressingMode: any;
        subject: any;
        subjectOwner: any;
        subjectOwnerPn: any;
        subjectOwnerUsername: any;
        subjectTime: number;
        size: any;
        creation: number;
        owner: string;
        ownerPn: string;
        ownerUsername: any;
        owner_country_code: any;
        desc: any;
        descId: any;
        descOwner: string;
        descOwnerPn: string;
        descOwnerUsername: any;
        descTime: number;
        linkedParent: any;
        restrict: boolean;
        announce: boolean;
        isCommunity: boolean;
        isCommunityAnnounce: boolean;
        joinApprovalMode: boolean;
        memberAddMode: boolean;
        participants: any;
        ephemeralDuration: number;
    }>;
    groupLeave: (id: any) => Promise<void>;
    groupUpdateSubject: (jid: any, subject: any) => Promise<void>;
    groupRequestParticipantsList: (jid: any) => Promise<any>;
    groupRequestParticipantsUpdate: (jid: any, participants: any, action: any) => Promise<any>;
    groupParticipantsUpdate: (jid: any, participants: any, action: any) => Promise<any[]>;
    groupUpdateDescription: (jid: any, description: any) => Promise<void>;
    groupInviteCode: (jid: any) => Promise<any>;
    groupRevokeInvite: (jid: any) => Promise<any>;
    groupAcceptInvite: (code: any) => Promise<any>;
    groupRevokeInviteV4: (groupJid: any, invitedJid: any) => Promise<boolean>;
    groupAcceptInviteV4: (...args: any[]) => Promise<any>;
    groupGetInviteInfo: (code: any) => Promise<{
        id: any;
        notify: any;
        addressingMode: any;
        subject: any;
        subjectOwner: any;
        subjectOwnerPn: any;
        subjectOwnerUsername: any;
        subjectTime: number;
        size: any;
        creation: number;
        owner: string;
        ownerPn: string;
        ownerUsername: any;
        owner_country_code: any;
        desc: any;
        descId: any;
        descOwner: string;
        descOwnerPn: string;
        descOwnerUsername: any;
        descTime: number;
        linkedParent: any;
        restrict: boolean;
        announce: boolean;
        isCommunity: boolean;
        isCommunityAnnounce: boolean;
        joinApprovalMode: boolean;
        memberAddMode: boolean;
        participants: any;
        ephemeralDuration: number;
    }>;
    groupToggleEphemeral: (jid: any, ephemeralExpiration: any) => Promise<void>;
    groupSettingUpdate: (jid: any, setting: any) => Promise<void>;
    groupMemberAddMode: (jid: any, mode: any) => Promise<void>;
    groupJoinApprovalMode: (jid: any, mode: any) => Promise<void>;
    groupFetchAllParticipating: () => Promise<{}>;
    findUserId: (pnLid: any) => Promise<{
        lid: any;
        phoneNumber: any;
    }>;
    serverProps: {
        privacyTokenOn1to1: boolean;
        profilePicPrivacyToken: boolean;
        lidTrustedTokenIssueToLid: boolean;
    };
    createCallLink: (type: any, event: any, timeoutMs: any) => Promise<any>;
    getBotListV2: () => Promise<{
        jid: any;
        personaId: any;
    }[]>;
    messageMutex: {
        mutex(code: any): any;
    };
    receiptMutex: {
        mutex(code: any): any;
    };
    appStatePatchMutex: {
        mutex(code: any): any;
    };
    notificationMutex: {
        mutex(code: any): any;
    };
    upsertMessage: (...args: any[]) => Promise<any>;
    appPatch: (patchCreate: any) => Promise<void>;
    sendPresenceUpdate: (type: any, toJid: any) => Promise<void>;
    presenceSubscribe: (toJid: any) => Promise<void>;
    profilePictureUrl: (jid: any, type?: string, timeoutMs?: number, shouldIncludeTcToken?: boolean) => Promise<any>;
    fetchBlocklist: () => Promise<any>;
    fetchStatus: (...jids: any[]) => Promise<any>;
    fetchDisappearingDuration: (...jids: any[]) => Promise<any>;
    updateProfilePicture: (jid: any, content: any, dimensions: any) => Promise<void>;
    removeProfilePicture: (jid: any) => Promise<void>;
    updateProfileStatus: (status: any) => Promise<void>;
    updateProfileName: (name: any) => Promise<void>;
    updateBlockStatus: (jid: any, action: any) => Promise<void>;
    updateDisableLinkPreviewsPrivacy: (isPreviewsDisabled: any) => Promise<void>;
    updateCallPrivacy: (value: any) => Promise<void>;
    updateMessagesPrivacy: (value: any) => Promise<void>;
    updateLastSeenPrivacy: (value: any) => Promise<void>;
    updateOnlinePrivacy: (value: any) => Promise<void>;
    updateProfilePicturePrivacy: (value: any) => Promise<void>;
    updateStatusPrivacy: (value: any) => Promise<void>;
    updateReadReceiptsPrivacy: (value: any) => Promise<void>;
    updateGroupsAddPrivacy: (value: any) => Promise<void>;
    updateDefaultDisappearingMode: (duration: any) => Promise<void>;
    getBusinessProfile: (jid: any) => Promise<{
        wid: any;
        address: any;
        description: any;
        website: any[];
        email: any;
        category: any;
        business_hours: {
            timezone: any;
            business_config: any;
        };
    }>;
    resyncAppState: (...args: any[]) => Promise<any>;
    chatModify: (mod: any, jid: any) => Promise<void>;
    cleanDirtyBits: (type: any, fromTimestamp: any) => Promise<void>;
    addOrEditContact: (jid: any, contact: any) => Promise<void>;
    removeContact: (jid: any) => Promise<void>;
    placeholderResendCache: any;
    addLabel: (jid: any, labels: any) => Promise<void>;
    addChatLabel: (jid: any, labelId: any) => Promise<void>;
    removeChatLabel: (jid: any, labelId: any) => Promise<void>;
    addMessageLabel: (jid: any, messageId: any, labelId: any) => Promise<void>;
    removeMessageLabel: (jid: any, messageId: any, labelId: any) => Promise<void>;
    star: (jid: any, messages: any, star: any) => Promise<void>;
    addOrEditQuickReply: (quickReply: any) => Promise<void>;
    removeQuickReply: (timestamp: any) => Promise<void>;
    type: string;
    ws: import("./Client/websocket.js").WebSocketClient;
    ev: {
        process(handler: any): () => void;
        emit(event: any, evData: any): any;
        isBuffering(): boolean;
        buffer: () => void;
        flush: () => boolean;
        createBufferedFunction(work: any): (...args: any[]) => Promise<any>;
        on: (...args: any[]) => any;
        off: (...args: any[]) => any;
        removeAllListeners: (...args: any[]) => any;
        destroy(): void;
    };
    authState: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<any>;
            set: (data: any) => Promise<void>;
            isInTransaction: () => boolean;
            transaction: (work: any, key: any) => Promise<any>;
        };
    };
    signalRepository: any;
    user: any;
    generateMessageTag: () => string;
    query: (node: any, timeoutMs: any) => Promise<any>;
    waitForMessage: (msgId: any, timeoutMs?: any) => Promise<any>;
    waitForSocketOpen: () => Promise<void>;
    sendRawMessage: (data: any) => Promise<void>;
    sendNode: (frame: any) => Promise<void>;
    logout: (msg: any) => Promise<void>;
    end: (error: any) => Promise<void>;
    registerSocketEndHandler: (handler: any) => void;
    onUnexpectedError: (err: any, msg: any) => void;
    uploadPreKeys: (count?: number) => Promise<void>;
    uploadPreKeysToServerIfRequired: () => Promise<void>;
    digestKeyBundle: () => Promise<void>;
    rotateSignedPreKey: () => Promise<void>;
    requestPairingCode: (phoneNumber: any, customPairingCode: any) => Promise<any>;
    updateServerTimeOffset: (options: {
        [key: string]: any;
        attrs: any;
    }) => void;
    sendUnifiedSession: () => Promise<void>;
    wamBuffer: import("../index.js").BinaryInfo;
    waitForConnectionUpdate: (check: any, timeoutMs: any) => Promise<void>;
    sendWAMBuffer: (wamBuffer: any) => Promise<any>;
    executeUSyncQuery: (usyncQuery: any) => Promise<any>;
    onWhatsApp: (...phoneNumber: any[]) => Promise<any>;
    fetchAccountReachoutTimelock: () => Promise<{
        isActive: boolean;
        timeEnforcementEnds: Date;
        enforcementType: any;
    }>;
    fetchNewChatMessageCap: () => Promise<any>;
};
