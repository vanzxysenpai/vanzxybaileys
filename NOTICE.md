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
- **Sources (lineage as recorded in the in-file headers):**
  - `@blurose/baileys` 1.1.13 (base), with perf defaults and message-authenticity fields backported from `arslan-baileys` 1.1.0.
  - The original builder design is credited upstream to Nixel, "NIXCODE — Advanced WhatsApp Interactive Message Builder", with contributions from Ahmad tumbuh kembang.
- **Location in this package:** `lib/Builders/` (`AIRich.js`, `Button*.js`, `Carousel.js`, `Poll.js`, `shared.js`, ...).
- Builder modules in `lib/Builders/` were subsequently rewritten/extended by the maintainer; the lineage above is kept for credit.

### MessageBuilder v4.7 additions (setResponseId/setBotResponseId/hasId/getIds/peek/delete)
- **Source:** credited in-code as "temen's MessageBuilderV4.7" (original author handle not recorded).
- **Location in this package:** `lib/Builders/` (response-id helpers on the builders).

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

### lpzeravk / systemzero baileys ports (v2.0.3)
- **Source:** `@lpzeravk/baileys` 1.0.0 (MIT); `@systemzero/baileys` 1.1.4 carries the same files.
- **Location in this package:** `lib/Utils/reconnect-backoff.js` (`computeReconnectDelay`; `createReconnectBackoff` is own code),
  `lib/Utils/bad-mac-handler.js` (rewritten: injectable logger, no hardcoded auth path, narrower Bad MAC match, async cleanup),
  `lib/Utils/connection-watchdog.js` (rewritten: ping probe by default, self-stopping unref'd timer).

### nexustech baileys ports (v2.0.3)
- **Source:** `@nexustechpro/baileys` 2.2.7 (MIT, Copyright (c) 2026 nexustechpro2).
- **Location in this package:**
  - `lib/WAUSync/Protocols/USyncBusinessProtocol.js`, `USyncPictureProtocol.js`, `USyncTextStatusProtocol.js`,
    `USyncSidelistProtocol.js`, `USyncFeatureProtocol.js`, plus the matching `with*Protocol()` methods on `USyncQuery`
    and `withPictureId/withVerifiedNameSerial/withBusinessProfileTag/withSidelistDelete` on `USyncUser`.
  - `lib/Utils/meta-ai-msmsg.js` — `decryptMsmsgBotMessage` / `decodeDecryptedMsmsgMessage`, exported as standalone
    experimental helpers only (not wired into the socket; see the header comment in that file).
- Only the readable source files were used. That fork's `lib/Socket/chats.js` ships obfuscated and was **not** ported.

### japofc baileys ports (v2.0.3)
- **Source:** `@japofc/baileys` 2.4.1 (MIT per the `license` field of its `package.json`; the published tarball carries no
  separate `LICENSE` file). Author: JAPofc (J.AP).
- **Location in this package:** `lib/Utils/auto-reconnect.js` (`autoReconnect`), `lib/Utils/auth-secure.js`
  (encrypted auth state, backup/restore, integrity, pairing/QR guards, secret redaction), `lib/Utils/humanizer.js`
  (`sendHumanized`), `lib/Utils/mock-socket.js` (`createMockSocket`), `lib/Utils/meta-ai.js` (`askMetaAI`).

### ourin-baileys ports
- **Source:** ourin-baileys (version 9.0.11 for the VoIP stack, per this package's `lib/index.js`).
- **Location in this package:**
  - `lib/VoIP/`, `lib/assets/wasm/` — audio call WASM stack + WebRTC relay (the bundled `whatsapp.wasm`, ~9.8 MB, comes with this port; its redistribution terms follow the ourin-baileys package it was taken from).
  - `lib/Socket/newsletter.js` — AutoFollow feature.
  - `lib/Builders/AIRich.js` — the `ORich` no-op subclass of `AIRich`, kept only for drop-in compatibility with code originally written against ourin-baileys.

---

## Reviewed but intentionally not ported

- `spam-report` (nexustech) — mass-report tooling.
- identity / device-fingerprint rotation (whatsbibz) — spoofs device identity.

---

## Referenced for verification only (no code incorporated)

A few bug-fix comments in `lib/Builders/` cite other
implementations to confirm expected wire behavior, without copying code from
them: `zqdevelopers/zq_baileys_helper`, `@chatunity/baileys`, `@neoxr/wb`,
and `WhiskeySockets/Baileys` issue/PR `#2626`. Listed here for transparency
only — not attribution-bearing ports, so no third-party notice entry is
needed for them.

---

If a source or attribution above is inaccurate or a component was missed,
please open an issue at the repository linked in `package.json` so it can be
corrected — misattribution here is a mistake to fix, not a dispute to argue.

### Donor-diff pass ports (v2.0.3)
Small, individually attributed MIT ports; each ported file carries a `Vanz@Port` header naming its source.
- **@rexxhayanasi/elaina-baileys 1.3.10** — `lib/Utils/group-metadata-cache.js`, `lib/Utils/username.js`.
- **Bail-master (QueenAnya)** — `isAndroidBrowser`, `isLottieBuffer` + Lottie sticker-pack handling, `printQRIfNecessaryListener` (`lib/Utils/qr-terminal.js`).
- **kangwifi72/baileys 1.4.9** — idea and structure of `lib/Utils/disconnect-reason.js` (re-keyed to this fork's enum) and `lib/Utils/phone-utils.js`.
- **@japofc/baileys 2.4.1** — `lib/Utils/text-tools.js` (`parseMentions` fixed), `formatPairingCode`.
- **xbibzlibrary/whatsbibz 1.4.0** — `lib/Utils/pairing-utils.js` (pairing code + error classification only; identity rotation remains unported).
- **@systemzero/baileys 1.1.4** — idea for the default remote-media size cap (`DEFAULT_MAX_REMOTE_MEDIA_BYTES`).
- **@japofc/baileys 2.4.1 (second pass)** — `lib/Utils/jid-tools.js`, `tag.js`, `ffmpeg-path.js`, `voice-note.js` (voice-note changed to avoid direct `fetch()`).
- **Round23 audit build (2.0.4 line, produced with ChatGPT)** — merged by 3-way diff: event-buffer pass-through fix, `lock-manager.js`, `migrate-auth-state.js`, `passkey.js`, key-store `list()` / `listIds()`, socket convenience wrappers, and their tests. Not a third-party fork; no upstream licence implications beyond the existing notices.
- **xbibzlibrary/whatsbibz 1.4.0 (third pass)** — `lib/Utils/text-format.js` (`splitText`, `whatsappify`; code-span handling and retry removal are this fork's changes).
- **@japofc/baileys 2.4.1 (third pass)** — `withMusicAttribution` (`lib/Utils/status.js`), idea for `resolveSocketVersionConfig` (`lib/Framework/Bot.js`, made opt-in).

### Builder upgrade pass (v2.1.14)
- **betton (own bot-side builder module, CommonJS)** — ported into `lib/Builders/Button.js` / `Carousel.js`: `setVideoGif`, `setLocationHeader`, `addMPM`/`addPayment`/`addAgentTransfer`/`addReviewOrder`, the split-button family (`addSplit*`), `Button.sendAudio`, `Carousel.makeCard`/`clearCards`/`cardCount`, plus `lib/Utils/android-stanza-id.js` (`generateAndroidStanzaId` / `patchAndroidStanzaId`). The betton V1 and in-Button card modes were not ported (`ButtonV2` and `Carousel` already cover them).
- **MessageBuilderv2.js (Nixel's Go port of the AIRich builder; personal/commercial use, no redistribution as a standalone product)** — used as a *structural reference only*; no Go code is copied. Ideas taken: `setForwarded` / `setIncludesUnifiedResponse` / `setIncludesSubmessages`, `addTextRaw`, `addProgress`, quota-upsell variants (written without the Go reference's hardcoded third-party default link), thin wrappers for the real `GenAI*` primitives it pushes (search ad, nested unified, 3P account linking, search planner, orchestrator search engine, professional consent, embedded contextual screen), experimental `addLayout` / `addMultipleResponse` / `addFlexibleGrid` / `addVStack`, and `A2UI.setVersion` / `setCatalogId` / `imageFit` / `imageHeader`. The Go helpers that only emit placeholder markdown text (`addSportsWidget`, `addClippyFollowUp`, `addClippyWidget`, `addP13N`, `addLocationPermission`, `addTimestampPlaceholder`, `addDeeplinkItem`) are ported as the same plain text cards. Go-language plumbing has JS equivalents: `Opts`/`OptsAt` -> `opts()`/`optsAt()`, `MarshalJSON` -> `toJSON()` (AIRich, A2UI, AIRichError), `Error`/`Code`/`Unwrap` -> `message`/`code`/`unwrap()`, `Pay` -> `Button#addPay()` / `Pay()` over the fork's existing `payment-utils.js` (written without the reference's hardcoded payout accounts).

