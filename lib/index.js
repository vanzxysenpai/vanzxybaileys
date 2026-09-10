import makeWASocket from './Socket/index.js';
export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Store/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export { Dugong } from './Socket/dugong.js';
// Vanz@Port --- Enterprise Bot Framework (Bot/Context/SessionManager/
// StatsManager/MediaManager/SQLiteStore). See lib/Framework/index.js.
export { Bot, Context, MediaManager, SessionManager, StatsManager, SQLiteStore } from './Framework/index.js';
// Vanz@Add --- ported from ourin-baileys 9.0.11. Audio-only WhatsApp voice-call
// handling (WASM call stack + WebRTC relay via optional `@roamhq/wrtc`). See
// lib/VoIP/index.js for usage — instantiate VoipClient(sock) after connection.open.
export { VoipClient, ActiveCall, CallState } from './VoIP/index.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map

// Vanzxy Builders
export * from './Builders/index.js';
