// Vanz@Fix 2.0.4: single source of truth for the fallback WA Web client version.
// Leaf module (no imports) so both Defaults/index.js and Utils/generics.js can
// import it without creating a circular dependency. Before this, generics.js kept
// its own stale copy ([2, 3000, 1043857760]) and returned it as the fallback of
// fetchLatestBaileysVersion()/fetchLatestWaWebVersion().
export const DEFAULT_WA_VERSION = [2, 3000, 1047740481]; // live client_revision (japofc 2.4.1, 2026-09-17)
