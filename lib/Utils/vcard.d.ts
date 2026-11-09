export function escapeVCard(s: any): any;
export function unescapeVCard(s: any): any;
export function formatPhone(p: any): any;
export function generateVCard(c: any): string;
export function generateVCards(contacts: any): any;
export function parseVCard(vcard: any): {
    fullName: any;
    organization: any;
    title: any;
    phones: any;
    emails: any;
    birthday: any;
    note: any;
};
export function createContactCard(contact: any): {
    contacts: {
        displayName: any;
        contacts: {
            vcard: string;
        }[];
    };
};
export function createContactCards(contacts: any): {
    contacts: {
        displayName: any;
        contacts: any;
    };
};
export function quickContact(name: any, phone: any, options: any): {
    fullName: any;
    phones: {
        number: any;
        type: string;
    }[];
    organization: any;
    emails: {
        email: any;
        type: string;
    }[];
};
