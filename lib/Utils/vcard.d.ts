export interface ContactPhone {
    number: string;
    type?: string;
    label?: string;
}
export interface ContactEmail {
    email: string;
    type?: string;
}
export interface ContactUrl {
    url: string;
    type?: string;
}
export interface ContactAddress {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    type?: string;
}
export interface ContactData {
    fullName: string;
    displayName?: string;
    organization?: string;
    title?: string;
    phones?: ContactPhone[];
    emails?: ContactEmail[];
    urls?: ContactUrl[];
    addresses?: ContactAddress[];
    birthday?: string;
    note?: string;
}
export declare const escapeVCard: (s: string) => string;
export declare const formatPhone: (p: string) => string;
export declare const generateVCard: (c: ContactData) => string;
export declare const generateVCards: (contacts: ContactData[]) => string;
export declare const parseVCard: (vcard: string) => Partial<ContactData>;
export declare const createContactCard: (contact: ContactData) => {
    contacts: {
        displayName: string;
        contacts: {
            vcard: string;
        }[];
    };
};
export declare const createContactCards: (contacts: ContactData[]) => {
    contacts: {
        displayName: string;
        contacts: {
            vcard: string;
        }[];
    };
};
export declare const quickContact: (name: string, phone: string, options?: {
    organization?: string;
    email?: string;
}) => ContactData;
