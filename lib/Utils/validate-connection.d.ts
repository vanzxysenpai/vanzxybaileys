export function generateLoginNode(userJid: any, config: any): proto.ClientPayload;
export function generateRegistrationNode(opts2: { [key: string]: any; 
    registrationId: any;
    signedPreKey: any;
    signedIdentityKey: any;
}, config: any): proto.ClientPayload;
export function configureSuccessfulPairing(stanza: any, opts1: { [key: string]: any; 
    advSecretKey: any;
    signedIdentityKey: any;
    signalIdentities: any;
}): {
    creds: {
        account: proto.ADVSignedDeviceIdentity;
        me: {
            id: any;
            name: any;
            lid: any;
        };
        signalIdentities: any[];
        platform: any;
    };
    reply: {
        tag: string;
        attrs: {
            to: "@s.whatsapp.net";
            type: string;
            id: any;
        };
        content: {
            tag: string;
            attrs: {};
            content: {
                tag: string;
                attrs: {
                    'key-index': any;
                };
                content: any;
            }[];
        }[];
    };
};
export function encodeSignedDeviceIdentity(account: any, includeSignatureKey: any): any;
import { proto } from '../../WAProto/index.js';
