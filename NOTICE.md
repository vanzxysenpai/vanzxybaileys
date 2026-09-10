# NOTICE

`@vanzxy/baileys` is MIT-licensed (see the root `LICENSE`/`license` field in
`package.json`). It's a fork built on top of, and incorporating ported code
from, several other MIT-licensed WhatsApp libraries. This file lists each
third-party component, its original author/source, and where it lives in
this package — so credit stays attached to the actual code, not just a
generic "thanks" in the README.

MIT only requires the original copyright notice to travel with the code; it
does not require original authors to endorse this fork. Every component
below was MIT-licensed at its source at the time it was ported.

---

## Upstream base

- **WhiskeySockets/Baileys** — original library this entire tree descends from.
- **@itsliaaa/baileys** — intermediate fork this package was branched from.

## Ported components

### MessageBuilder / AIRich / Button / Carousel / Toolkit — base implementation
- **Source:** Nixel, "NIXCODE — Advanced WhatsApp Interactive Message Builder", with contributions from Ahmad tumbuh kembang.
- **Location in this package:** `lib/Utils/MessageBuilder.js` and the `AIRich`/`AIVanzxy`/`LeafRich` exports.
- **⚠ Needs your confirmation:** the in-file header as of 1.7.0 now says this
  was "ported into @vanzxy/baileys 1.0.0 from the `@blurose/baileys` 1.1.13
  fork (base, feature-complete), with perf defaults and message-authenticity
  fields backported from `arslan-baileys` 1.1.0." That doesn't name Nixel/
  NIXCODE or Ahmad tumbuh kembang at all. I didn't overwrite the existing
  line since I can't tell from the code alone whether blurose/arslan are
  themselves downstream of NIXCODE (in which case both chains should be
  listed) or whether this is a separate lineage that should replace the old
  entry. Let me know which and I'll finalize it.

### MessageBuilder v4.7 additions (setResponseId/setBotResponseId/hasId/getIds/peek/delete)
- **Source:** Nixel — same author/watermark as the main MessageBuilder/AIRich base above ("temen's MessageBuilderV4.7" in the in-code credit refers to Nixel, confirmed by the person who introduced this codebase).
- **Location in this package:** `lib/Utils/MessageBuilder.js` (`~line 2120, 2885, 2916`).

### Button/list addon-kind resolution logic
- **Source:** vinikjkkj, [zapo](https://github.com/vinikjkkj/zapo) (MIT).
- **Location in this package:** `lib/Utils/message-kind.js` (`resolveButtonAddonKind`, ported from `zapo-js` `src/message/encode/content.ts`).
- *(Corrected from the previous NOTICE, which pointed this entry at
  `button-helper-utils.js`/`button-sender.js` — those two files are actually
  sourced from `@queenanya/baileys`, see below. The zapo attribution belongs
  here instead.)*
- Also referenced "in spirit" (not a direct port) for migration-tracking
  design in `lib/Utils/use-sqlite-auth-state.js`.

### Button helper / button-sender runtime layer
- **Source:** QueenAnya, [`@queenanya/baileys`](https://github.com/QueenAnya/Bail) (MIT) `src/addons/message-utils.ts` and `src/addons/button-sender.ts` — both of which that fork's own header credits onward to **`@ryuu-reinzz/button-helper` v2.2.5** as the original implementation.
- **Location in this package:** `lib/Utils/button-helper-utils.js`, `lib/Utils/button-sender.js`.

### Interactive/native-flow button send layer
- **Source:** QueenAnya, [`@queenanya/baileys`](https://github.com/QueenAnya/Bail) (MIT, Copyright (c) 2025 Rajeh Taher/WhiskeySockets).
- **Location in this package:** `lib/Utils/button-sender.js` (send-layer portions).

### Username management (check/set/pin/recommend/find)
- **Source:** QueenAnya, [`@queenanya/baileys`](https://github.com/QueenAnya/Bail) `lib/Socket/username.js` (MIT), itself ported from `@innovatorssoft/baileys`.
- **Location in this package:** `lib/Socket/username.js`.

### Chat Control utilities (TypingIndicator + related presence helpers)
- **Source:** `@innovatorssoft/baileys` `chat-control.js` (direct, per this file's own header — not routed through @queenanya/baileys).
- **Location in this package:** `lib/Utils/chat-control.js` (and its `.d.ts`).

### Bail-master Utils addons batch
- **Source:** QueenAnya's `Bail` repository, master branch ("Bail-master"), `src/addons/*.ts` — same upstream as the `@queenanya/baileys` package above.
- **Location in this package** (TS → ESM JS conversions, type-only annotations dropped, behavior unchanged unless noted):
  - `lib/Utils/vcard.js` ← `addons/vcard.ts`
  - `lib/Utils/scheduling.js` ← `addons/scheduling.ts` + `addons/message-scheduler.ts` (merged into one class-based scheduler)
  - `lib/Utils/message-search.js` ← `addons/message-search.ts`
  - `lib/Utils/auto-reply.js` ← `addons/auto-reply.ts`
  - `lib/Utils/stickerpack.js` ← `addons/stickerpack.ts`
  - `lib/Utils/anti-delete.js` ← `addons/anti-delete.ts`
  - `lib/Utils/chat-history-helpers.js` ← `addons/chat-history-helpers.ts` (adapted to this fork's own `makeInMemoryStore`)
  - `lib/Utils/media-messages.js` ← `addons/media-messages.ts`
  - `lib/Utils/media-set.js` ← `addons/media-set.ts`
  - `lib/Utils/status.js` ← `addons/status-helpers.ts`
  - `lib/Utils/templates.js` ← `addons/templates.ts`
  - `lib/Utils/baileys-event-stream.js` ← `addons/baileys-event-stream.ts`
  - `lib/Utils/past-participants.js` ← `addons/past-participants.ts`
  - `lib/Utils/use-cache-manager-auth-state.js` ← `addons/use-cache-manager-auth-state.ts` (that file itself credits `@innovatorssoft/baileys` `make-cache-manager-store.js`)

### Bot Framework (Bot / Context / SessionManager / StatsManager / MediaManager / SQLiteStore)
- **Source:** Originally submitted as WhiskeySockets/Baileys PR #2710 by **LuferOS**; the P0–P3 bugfix pass and TypeScript rewrite referenced in this package's code comments were done by QueenAnya in `@queenanya/baileys` `lib/Framework/` (MIT). Adapted further for this fork (async `better-sqlite3`/`fluent-ffmpeg` lazy-loading, no `ffmpeg-static` dependency) — see the `Vanz@Port`/`Vanz@Fix` comments at the top of each file for exactly what changed.
- **Location in this package:** `lib/Framework/`.

### ourin-baileys ports
- **Source:** ourin-baileys (version 9.0.11 for the VoIP stack, per this package's `lib/index.js`).
- **Location in this package:**
  - `lib/VoIP/`, `lib/assets/wasm/` — audio call WASM stack + WebRTC relay.
  - `lib/Socket/newsletter.js` — AutoFollow feature.
  - `lib/Utils/MessageBuilder.js` — the `ORich` no-op subclass of `AIRich`, kept only for drop-in compatibility with code originally written against ourin-baileys.

---

## Referenced for verification only (no code incorporated)

A few bug-fix comments in `lib/Utils/MessageBuilder.js` cite other
implementations to confirm expected wire behavior, without copying code from
them: `zqdevelopers/zq_baileys_helper`, `@chatunity/baileys`, `@neoxr/wb`,
and `WhiskeySockets/Baileys` issue/PR `#2626`. Listed here for transparency
only — not attribution-bearing ports, so no third-party notice entry is
needed for them.

---

If a source or attribution above is inaccurate or a component was missed,
please open an issue at the repository linked in `package.json` so it can be
corrected — misattribution here is a mistake to fix, not a dispute to argue.
