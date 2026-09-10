export function downloadHistory(msg: any, options: any): Promise<any>;
export function processHistoryMessage(item: any, logger: any): {
    messages: any[];
    contacts: any[];
    chats: any[];
    lidPnMappings: any[];
    pastParticipants?: undefined;
    syncType?: undefined;
    progress?: undefined;
} | {
    chats: any[];
    contacts: ({
        id: any;
        name: any;
        username: any;
        lid: any;
        phoneNumber: any;
        verifiedName?: undefined;
        notify?: undefined;
    } | {
        id: any;
        verifiedName: any;
        name?: undefined;
        username?: undefined;
        lid?: undefined;
        phoneNumber?: undefined;
        notify?: undefined;
    } | {
        id: any;
        notify: any;
        name?: undefined;
        username?: undefined;
        lid?: undefined;
        phoneNumber?: undefined;
        verifiedName?: undefined;
    })[];
    messages: any[];
    lidPnMappings: {
        lid: any;
        pn: any;
    }[];
    pastParticipants: any;
    syncType: any;
    progress: any;
};
export function downloadAndProcessHistorySyncNotification(msg: any, options: any, logger: any): Promise<{
    messages: any[];
    contacts: any[];
    chats: any[];
    lidPnMappings: any[];
    pastParticipants?: undefined;
    syncType?: undefined;
    progress?: undefined;
} | {
    chats: any[];
    contacts: ({
        id: any;
        name: any;
        username: any;
        lid: any;
        phoneNumber: any;
        verifiedName?: undefined;
        notify?: undefined;
    } | {
        id: any;
        verifiedName: any;
        name?: undefined;
        username?: undefined;
        lid?: undefined;
        phoneNumber?: undefined;
        notify?: undefined;
    } | {
        id: any;
        notify: any;
        name?: undefined;
        username?: undefined;
        lid?: undefined;
        phoneNumber?: undefined;
        verifiedName?: undefined;
    })[];
    messages: any[];
    lidPnMappings: {
        lid: any;
        pn: any;
    }[];
    pastParticipants: any;
    syncType: any;
    progress: any;
}>;
export function getHistoryMsg(message: any): any;
