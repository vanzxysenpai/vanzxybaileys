export function makeNoiseHandler({ keyPair: { private: privateKey, public: publicKey }, NOISE_HEADER, logger, routingInfo }: {
    keyPair: {
        private: any;
        public: any;
    };
    NOISE_HEADER: any;
    logger: any;
    routingInfo: any;
}): {
    encrypt: (plaintext: any) => any;
    decrypt: (ciphertext: any) => any;
    authenticate: (data: any) => void;
    mixIntoKey: (data: any) => void;
    finishInit: () => Promise<void>;
    processHandshake: (opts1: { [key: string]: any; 
        serverHello: any;
    }, noiseKey: any) => any;
    encodeFrame: (data: any) => any;
    decodeFrame: (newData: any, onFrame: any) => Promise<void>;
};
