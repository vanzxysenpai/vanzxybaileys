// Vanz@Add (2.0.3) --- opt-in QR printer, ported from Bail-master `printQRIfNecessaryListener`.
// Dependency-free: `qrcode-terminal` is loaded lazily and only if the caller installed it.
// Returns an unsubscribe function (the donor version leaked its listener).
export const printQRIfNecessaryListener = (ev, logger) => {
    const listener = async ({ qr }) => {
        if (!qr)
            return;
        try {
            const mod = await import('qrcode-terminal');
            const QR = mod.default || mod;
            QR.generate(qr, { small: true });
        }
        catch (error) {
            logger?.error?.({ error: error?.message }, 'qrcode-terminal is not installed - run: npm install qrcode-terminal');
        }
    };
    ev.on('connection.update', listener);
    return () => ev.off('connection.update', listener);
};
