<div align="center" id="top">

<img src="https://files.catbox.moe/l72xji.svg" width="100%" alt="Sakura night banner"/>

<p>
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1200&color=2ECC71&center=true&vCenter=true&width=650&lines=Extended+interactive+messages+%26+native+flow;Status+tools+%2B+quality-of-life+fixes;Built+on+top+of+WhiskeySockets%2FBaileys" alt="Typing SVG" />
</p>

<p>
<a href="https://www.npmjs.com/package/@vanzxy/baileys" target="_blank"><img src="https://img.shields.io/npm/v/@vanzxy/baileys?color=2ecc71&label=npm&style=for-the-badge" alt="npm version"/></a>
<a href="https://www.npmjs.com/package/@vanzxy/baileys" target="_blank"><img src="https://img.shields.io/npm/dt/@vanzxy/baileys?color=3498db&style=for-the-badge" alt="npm downloads"/></a>
<a href="https://github.com/vanzxysenpai/vanzxybaileys/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/vanzxysenpai/vanzxybaileys?color=f1c40f&style=for-the-badge" alt="GitHub stars"/></a>
<a href="https://github.com/vanzxysenpai/vanzxybaileys/issues" target="_blank"><img src="https://img.shields.io/github/issues/vanzxysenpai/vanzxybaileys?color=e74c3c&style=for-the-badge" alt="GitHub issues"/></a>
</p>
<p>
<img src="https://img.shields.io/github/last-commit/vanzxysenpai/vanzxybaileys?color=9b59b6&style=flat-square" alt="Last commit"/>
<img src="https://img.shields.io/github/commit-activity/m/vanzxysenpai/vanzxybaileys?color=1abc9c&style=flat-square" alt="Commit activity"/>
<img src="https://img.shields.io/github/languages/code-size/vanzxysenpai/vanzxybaileys?color=e67e22&style=flat-square" alt="Code size"/>
<img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square" alt="Node >=20"/>
<img src="https://img.shields.io/badge/module-ESM-blue?style=flat-square" alt="ESM"/>
<img src="https://img.shields.io/badge/types-included-blue?style=flat-square" alt="TypeScript types included"/>
<img src="https://img.shields.io/badge/license-see%20NOTICE-lightgrey?style=flat-square" alt="License"/>
</p>

<p>
<img src="https://komarev.com/ghpvc/?username=vanzxysenpai&repo=vanzxybaileys&color=2ecc71&style=for-the-badge&label=Repo+Views" alt="Visitor count"/>
</p>

<p>
<a href="#-why-vanzxybaileys">About</a> &#xa0;|&#xa0;
<a href="#-comparison">Comparison</a> &#xa0;|&#xa0;
<a href="#-features">Features</a> &#xa0;|&#xa0;
<a href="#-installation">Installation</a> &#xa0;|&#xa0;
<a href="#-quick-start">Quick Start</a> &#xa0;|&#xa0;
<a href="#-usage-examples">Examples</a> &#xa0;|&#xa0;
<a href="#-faq--troubleshooting">FAQ</a> &#xa0;|&#xa0;
<a href="#-contributing">Contributing</a> &#xa0;|&#xa0;
<a href="#-credits">Credits</a> &#xa0;|&#xa0;
<a href="#-maintainer">Maintainer</a>
</p>

<details>
<summary>📖 Full table of contents</summary>
<br/>

- [🍃 Why @vanzxy/baileys](#-why-vanzxybaileys)
- [🆚 Comparison](#-comparison)
- [🧰 Built With](#-built-with)
- [🔥 Features](#-features)
- [✨ Exclusive Vanzxy Enhancements](#-exclusive-vanzxy-enhancements)
- [📦 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [🔐 Authentication](#-authentication)
- [🗄️ Store Backends](#-store-backends)
- [💡 Usage Examples](#-usage-examples)
  - [Buttons & Native Flow](#buttons--native-flow)
  - [Poll](#poll)
  - [Carousel](#carousel)
  - [AIRich — rich response cards](#airich--rich-response-cards)
  - [📁 Builders Folder Map](#-builders-folder-map-libbuilders)
- [📞 Voice & Video Calls](#-voice--video-calls)
- [🔎 User Sync Queries](#-user-sync-queries)
- [👤 Username Management](#-username-management)
- [🤖 Bot Framework](#-bot-framework)
- [🧩 Utility Modules](#-utility-modules)
- [🛎️ System Notification Filter](#-system-notification-filter)
- [🛠 Recommended Environment](#-recommended-environment)
- [📘 TypeScript Support](#-typescript-support)
- [📚 Fork Lineage](#-fork-lineage)
- [❓ FAQ & Troubleshooting](#-faq--troubleshooting)
- [🤝 Contributing](#-contributing)
- [🙏 Credits](#-credits)
- [📈 Repo Activity](#-repo-activity)
- [💖 Support](#-support)
- [👑 Maintainer](#-maintainer)
- [⚠️ Disclaimer](#-disclaimer)
- [📝 Patch Notes](#-v8-patch-notes)

</details>

</div>

---

<div align="center">
<img src="https://files.catbox.moe/o2zpaq.png" width="100%" alt="Vanzxy banner art"/>
</div>

---

## 🍃 Why @vanzxy/baileys?

This fork focuses on:

| | |
|---|---|
| 🚀 | Better developer experience |
| 🎯 | Extended native flow support |
| 📢 | Advanced status & broadcast features |
| 🧩 | More interactive message types |
| ⚡ | Cleaner implementation for bot developers |
| 🔧 | Extra utilities not available in standard Baileys forks |
| 🗄️ | Multiple auth & store backends out of the box (file, SQLite, MongoDB, MySQL, PostgreSQL, Redis) |
| 📞 | Experimental voice-call (VoIP) support |

---

## 🆚 Comparison

How `@vanzxy/baileys` stacks up against its own lineage and the wider Baileys fork ecosystem:

| Capability | `@vanzxy/baileys` | `@itsliaaa/baileys` | `WhiskeySockets/Baileys` |
|---|:---:|:---:|:---:|
| Native Flow buttons (V1/V2/V3) | ✅ | ✅ | ⚠️ basic only |
| Carousel messages | ✅ | ❌ | ❌ |
| Rich response cards (AIRich) | ✅ | ❌ | ❌ |
| Commerce flow (catalog/order/payment) | ✅ | ⚠️ partial | ❌ |
| Voice calling (VoIP) | ✅ experimental | ❌ | ❌ |
| Multi-backend store (SQL/Mongo/Redis) | ✅ | ⚠️ file/SQLite only | ⚠️ in-memory only |
| Full `.d.ts` TypeScript definitions | ✅ | ⚠️ partial | ⚠️ partial |
| User sync queries (WAUSync) | ✅ | ✅ | ✅ |
| Username management (check/set/pin/recommend) | ✅ | ❌ | ❌ |
| Bot framework (middleware, session, stats) | ✅ | ❌ | ❌ |

> Tabel ini menggambarkan fitur di level package, bukan benchmark performa. PR untuk memperbarui/mengoreksi tabel ini dipersilakan lewat [Contributing](#-contributing).

---

## 🧰 Built With

<p>
<img src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"/>
<img src="https://img.shields.io/badge/esm-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="ESM"/>
<img src="https://img.shields.io/badge/websocket-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=white" alt="WebSocket"/>
<img src="https://img.shields.io/badge/signal%20protocol-%233A76F0.svg?style=for-the-badge&logo=signal&logoColor=white" alt="Signal Protocol"/>
<img src="https://img.shields.io/badge/protobuf-%23345?style=for-the-badge&logo=google&logoColor=white" alt="Protobuf"/>
<img src="https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm"/>
</p>

<p>
<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=nodejs,js,ts,npm,docker,redis,mongodb,mysql,postgresql,sqlite" alt="Tech stack icons"/>
</a>
</p>

---

## 🔥 Features

<table>
<tr>
<th align="center">💬 Interactive Messages</th>
<th align="center">🛒 Commerce & Business</th>
<th align="center">🧩 Utility Features</th>
</tr>
<tr>
<td valign="top">

- Native Flow
- Buttons (V1 / V2 / V3)
- Lists
- Carousel Messages
- Poll & Quiz Messages
- Rich Response Messages (AIRich)
- CTA / Reply / URL Buttons
- Call Buttons
- OTP Buttons
- Authentication Buttons

</td>
<td valign="top">

- Catalog Message
- Order Details
- Order Status
- Review & Pay
- Payment Status
- Payment Method
- Track Order
- Reorder
- Cancel Order

</td>
<td valign="top">

- Group Status Support
- Mention All
- Lottie Sticker Support
- Newsletter Support
- ExternalAdReply Helper
- View Once Support
- Rich Formatting
- Code Highlighting

</td>
</tr>
</table>

<table>
<tr>
<th align="center">🔐 Auth & Storage</th>
<th align="center">📞 Realtime</th>
<th align="center">🛠 Developer Tooling</th>
</tr>
<tr>
<td valign="top">

- Multi-file auth state
- Single-file auth state
- SQLite auth state
- Cache-manager auth state
- In-memory store
- SQLite / MongoDB / MySQL /
  PostgreSQL / Redis store adapters

</td>
<td valign="top">

- Voice calling (VoIP, WASM engine)
- User sync queries (WAUSync)
- Presence / status / device lookup
- Event buffer for high-volume bots

</td>
<td valign="top">

- Full TypeScript definitions (`.d.ts`)
- Anti-delete detection
- Message search helpers
- Auto-reply engine
- Scheduling helpers
- Message retry manager

</td>
</tr>
</table>

---

## ✨ Exclusive Vanzxy Enhancements

### Audio Group Status Fix
Audio status uses a more compatible implementation to avoid unsupported-version errors on older WhatsApp clients.

### AIRich — the rich-response message builder
A chainable builder (`AIRich`, also exported as `AIVanzxy` / `LeafRich` / `VanzxyAI` / `VanzxyRich`) with 40+ `add*()`/`set*()` methods covering headings, formatted text (hyperlinks/citations/LaTeX), code blocks, tables, image/video/product/post cards, task & progress cards, tip banners, and quick-reply suggestions — the kind of rich card layout you'd normally only see from an official AI/assistant-style bot. See [Usage Examples](#airich--rich-response-cards) below.

> **Experimental (V8):** `build()` now also populates the proto's `originalRecipientMetadata` field (previously left unset) with the same section payload as `unifiedResponse`. This is a fix for AI-response bubbles collapsing into WhatsApp's "Baca selengkapnya"/"Read more" fold earlier than expected while being built up live via `sendEdit()`. Pending live-traffic confirmation — report back if you still see early truncation.

### Native Flow Expansion

<table>
<tr>
<td valign="top" width="33%">

**Buttons & Actions**
- cta_reminder
- cta_cancel_reminder
- otp_button
- authentication_button
- call_button
- url_button
- reply_button
- voice_call
- video_call_button

</td>
<td valign="top" width="33%">

**Commerce Flow**
- catalog_message
- mpm
- card_message
- order_details
- order_status
- review_and_pay
- payment_status
- payment_method

</td>
<td valign="top" width="33%">

**Navigation & Misc**
- address_message
- send_location
- track_order
- reorder
- cancel_order
- clear_chat
- navigateToScreen
- flow_action

</td>
</tr>
</table>

### System Notification Filter

Messages include:

```js
message.isSystemNotification
```

Useful for filtering:

- E2E notices
- Meta service notices
- Other system-generated messages

---

## 📦 Installation

```bash
npm install @vanzxy/baileys
```

Directly from GitHub:

```bash
npm install github:vanzxysenpai/vanzxybaileys
```

> Requires **Node.js 20+** — install will refuse to run below that (checked by `engine-requirements.js` on `preinstall`).

### Optional peer dependencies

Everything below is **optional** — the socket works without any of them. Install only what the features you use need; missing ones fail with a clear install hint instead of a silent crash.

| Package | Unlocks |
|---|---|
| `sharp` | Fast image resizing/processing (used by the message builders' `Toolkit.resize`) |
| `@napi-rs/image` | Lighter native alternative to `sharp` for image ops |
| `jimp` | Pure-JS image fallback when neither of the above is installed |
| `fluent-ffmpeg` | Audio/video conversion for media messages |
| `audio-decode` | Audio waveform/duration extraction (voice notes, VoIP capture) |
| `link-preview-js` | Rich link previews for URLs in outgoing text messages |
| `better-sqlite3` | SQLite auth state, SQLite store adapter, **and** the [Bot Framework](#-bot-framework)'s `SQLiteStore`/`StatsManager` |
| `node-webpmux` | Packname/author EXIF metadata on stickers made via `MediaManager.convertToSticker()` — not needed for plain sticker conversion |
| `mongodb` | MongoDB store adapter |
| `mysql2` | MySQL store adapter |
| `pg` | PostgreSQL store adapter |
| `ioredis` | Redis store adapter |
| `@roamhq/wrtc` | Native WebRTC bindings for [voice calling](#-voice--video-calls) |

---

## 🚀 Quick Start

```js
import { makeWASocket, useMultiFileAuthState } from '@vanzxy/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')

const sock = makeWASocket({
    auth: state
})

// persist credentials whenever Baileys updates them
sock.ev.on('creds.update', saveCreds)

sock.ev.on('connection.update', (update) => {
    const { connection, qr } = update

    // `printQRInTerminal` is deprecated upstream — render the QR yourself,
    // e.g. with the `qrcode-terminal` package:
    //   import qrcode from 'qrcode-terminal'
    //   if (qr) qrcode.generate(qr, { small: true })
    if (qr) console.log('Scan this QR:', qr)

    if (connection === 'open') console.log('🍃 Connected!')
})

sock.ev.on('messages.upsert', ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return
    console.log('New message from', msg.key.remoteJid)
})
```

---

## 🔐 Authentication

Four auth-state backends ship out of the box. All return the same `{ state, saveCreds }` shape expected by `makeWASocket({ auth })`, so they're drop-in interchangeable.

| Function | Storage | Best for |
|---|---|---|
| `useMultiFileAuthState(folder)` | One JSON file per key, on disk | Default choice — simple, debuggable, works everywhere |
| `useSingleFileAuthState(fileName)` | One JSON file, on disk | Small bots where a single file is easier to manage/back up |
| `useSqliteAuthState(opts)` | SQLite (`better-sqlite3`) | Bots that already use SQLite, or want auth in one embedded DB file |
| `useCacheManagerAuthState(store, sessionKey)` | Any [`cacheable`](https://www.npmjs.com/package/@cacheable/node-cache)-compatible store | Multi-session hosting panels, Redis-backed setups |

```js
import { makeWASocket, useMultiFileAuthState } from '@vanzxy/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

```js
// SQLite variant
import { makeWASocket, useSqliteAuthState } from '@vanzxy/baileys'

const { state, saveCreds } = await useSqliteAuthState({ database: './auth.db' })
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

`useMultiFileAuthState` also exports `pruneStaleAuthFiles(folder, options)` to clean up old sender-key files on a schedule — useful for long-running bots that accumulate thousands of stale key files.

---

## 🗄️ Store Backends

`makeInMemoryStore()` from `lib/Store` gives you the classic in-memory chat/contact/message cache. For anything that needs to survive a restart, `makePersistentStore()` (from `PersistentStore.js`) wraps one of five backends behind the same interface:

| Backend | Function |
|---|---|
| SQLite | `createSqliteStoreAdapter(opts)` |
| MongoDB | `createMongoStoreAdapter(opts)` |
| MySQL | `createMysqlStoreAdapter(opts)` |
| PostgreSQL | `createPostgresStoreAdapter(opts)` |
| Redis | `createRedisStoreAdapter(opts)` |

```js
import { makeWASocket, makeInMemoryStore } from '@vanzxy/baileys'

const store = makeInMemoryStore({})
store.readFromFile('./baileys_store.json')
setInterval(() => store.writeToFile('./baileys_store.json'), 10_000)

const sock = makeWASocket({ /* ...auth etc */ })
store.bind(sock.ev)
```

---

## 💡 Usage Examples

### Buttons & Native Flow

```js
import { Button } from '@vanzxy/baileys'

await new Button(sock)
    .setTitle('Promo Spesial')
    .setBody('Diskon 20% cuma hari ini')
    .setFooter('@vanzxy/baileys')
    .addReply('Klaim Sekarang', 'claim_promo')
    .addUrl('Lihat Katalog', 'https://example.com/catalog')
    .addCall('Hubungi Kami', '628123456789')
    .send(jid)
```

### Poll

```js
import { Poll } from '@vanzxy/baileys'

await new Poll(sock)
    .setName('Mau makan apa hari ini?')
    .addOptions(['Nasi Goreng', 'Mie Ayam', 'Bakso'])
    .setSelectable(1)
    .send(jid)
```

### Carousel

> Each card must be built with `Button(...).toCard()` first — a carousel card is really just a button card with an image/video header.

```js
import { Button, Carousel } from '@vanzxy/baileys'

const cardA = await new Button(sock)
    .setImage('https://example.com/a.jpg')
    .setTitle('Produk A')
    .addUrl('Lihat', 'https://example.com/a')
    .toCard()

const cardB = await new Button(sock)
    .setImage('https://example.com/b.jpg')
    .setTitle('Produk B')
    .addUrl('Lihat', 'https://example.com/b')
    .toCard()

await new Carousel(sock)
    .setBody('Pilih salah satu produk di bawah ini')
    .addCard([cardA, cardB])
    .send(jid)
```

### AIRich — rich response cards

```js
import { AIRich } from '@vanzxy/baileys'

await new AIRich(sock)
    .addHeading('Ringkasan Order')
    .addText('Pesananmu sedang diproses.')
    .addTable([
        ['Item', 'Qty'],
        ['Kopi Susu', '2']
    ])
    .addTip('Pesanan biasanya siap dalam 15 menit')
    .addSuggest('Lacak Order')
    .send(jid)
```

`AIRich` supports `{ id, insertAt }` on every `add*()`/`set*()` call, so you can insert a block relative to one you added earlier instead of always appending to the end — handy for streaming/edit-in-place style responses combined with `sendEdit(jid, id)`.

Other builders worth knowing about: **`ButtonV2`** (simpler quick-reply-only buttons), **`ButtonV3`** (`loadFrom(msg)` to edit an existing template message in place), and **`Toolkit`** (static helpers: `Toolkit.resize()`, `Toolkit.fetchBuffer()`, `Toolkit.waitAllPromises()`, `Toolkit.extractIE()` for parsing `[label](url)` links/citations/LaTeX out of plain text).

### 📁 Builders Folder Map (`lib/Builders/`)

Every message builder lives in its own file under `lib/Builders/`, so you can trace exactly where a class comes from instead of digging through one giant `MessageBuilder.js`. `index.js` is just the barrel file that re-exports everything below (plus their aliases) for the top-level `import { ... } from '@vanzxy/baileys'` syntax.

| File | Exports | What it's for |
|---|---|---|
| `shared.js` | `Toolkit`, `BaseBuilder`, `RowBuilder` | The shared foundation every other builder is built on. `BaseBuilder` holds the common chainable `send()`/context-info plumbing, `RowBuilder` is the shared row/section helper, and `Toolkit` is the static-helper grab bag (`resize`, `fetchBuffer`, `waitAllPromises`, `extractIE`, media-duration/preview helpers). Nothing here is meant to be instantiated directly in bot code — it exists so `Button`, `Poll`, `Carousel`, etc. don't each reimplement the same plumbing. |
| `Button.js` | `Button`, `CardBuilder` | The main interactive/native-flow button builder — headers (image/video/document), CTA helpers (`addUrl`, `addCall`, `addReply`, and the wider native-flow set), and `.toCard()` to turn a button message into a `Carousel` card. |
| `ButtonV2.js` | `ButtonV2` | A lighter-weight variant limited to simple quick-reply buttons — reach for this when you don't need the full native-flow surface of `Button`. |
| `ButtonV3.js` | `ButtonV3` | Built around `loadFrom(msg)` — loads an existing `templateMessage` (e.g. one you fetched or that was quoted) so you can edit it in place instead of building one from scratch. |
| `Carousel.js` | `Carousel` | Chains `Button(...).toCard()` results into a swipeable card carousel. Capped at `Carousel.MAX_CARDS` (10) since WhatsApp silently truncates anything beyond that. |
| `Poll.js` | `Poll` | Poll/vote message builder — question, options, single/multi-select, hidden-voter mode, correct-answer marking, expiry. |
| `NativeFlow.js` | `NativeFlow` | Modern `interactiveMessage`/`nativeFlowMessage` builder — `cta_url`, `cta_copy`, `cta_call`, `quick_reply`, `single_select`, offer banners, and the "..." options bottom-sheet. The recommended replacement for `ButtonV3`'s legacy hydrated-template buttons. |
| `Location.js` | `Location` | Static location pins via the existing `location` shorthand, plus live/moving locations (built directly against `WAProto.Message.LiveLocationMessage` since there's no shorthand for that yet — call `send()` again with a higher `setSequence()` to push updates). |
| `Contact.js` | `Contact` | vCard contact-card builder — one contact sends as `contactMessage`, two or more as `contactsArrayMessage`. `addContact()` generates a minimal VCARD 3.0 block from plain fields; `addRawVcard()` accepts a pre-built vCard string. |
| `Album.js` | `Album` | Media-group/album builder — bundles 2+ images/videos. Thin wrapper: the actual cover + delayed-follow-up sending is already handled by the `content.album` shorthand in `Socket/messages-send.js`. |
| `AIRich.js` | `AIRich` (+ aliases `ORich`, `AIVanzxy`, `LeafRich`, `VanzxyAI`, `VanzxyRich`, `RichVanzxy`) | The rich AI-assistant-style response builder described above — headings, formatted text, tables, media/product/post cards, task/progress cards, tip banners, quick-reply suggestions. |
| `A2UI.js` | `A2UI`, `sendA2UIWidget` | Lower-level A2UI/Bloks widget builder. Builds the flat `components` tree (Column/Row → `children`, Card/Button → `child`, Modal → `trigger`/`content`) that Bloks widgets expect and sends it through the same `getBizBinaryNode()` path as `Button`/`ButtonV2`, so the wire-level node always matches the button names actually sent. |
| `LinkPreview.js` | `bindLinkPreview` | Not a builder class — a function that binds a `sendLinkPreview(jid, text, link, title, description, thumbnail, options)` method directly onto a Baileys socket instance. Builds the `linkPreview` context (matched text, title, description, optional thumbnail via `prepareWAMessageMedia`) and sends it through the socket's own `sendMessage`. Called automatically when you construct `VanzxyBaileys(sock)`; call it yourself (`bindLinkPreview(sock)`) if you're not using the hub. |
| `VanzxyBaileys.js` | `VanzxyBaileys` | A unified builder **hub** — one object that wraps all the builders above behind short method names (`.button()`, `.buttonV2()`, `.buttonV3()`, `.carousel()`, `.poll()`, `.nativeFlow()`, `.location()`, `.contact()`, `.album()`, `.airich()`, `.a2ui()`), plus PascalCase aliases (`.Button()`, `.Carousel()`, `.Poll()`, `.NativeFlow()`, `.Location()`, `.Contact()`, `.Album()`, `.AIRich()`, `.A2UI()`) for developers who prefer that naming style. The constructor also runs `bindLinkPreview()` on the socket you pass in, so `vx.client.sendLinkPreview(...)` is available immediately. Nothing new is implemented here — it's purely a single entry point over the individual classes. |
| `index.js` | everything above, plus `MESSAGE_BUILDER_VERSION` | The barrel file — re-exports every builder and its aliases so `import { Button, Poll, AIRich, VanzxyBaileys, bindLinkPreview } from '@vanzxy/baileys'` works without reaching into individual files. `MESSAGE_BUILDER_VERSION` tracks the builder API surface's own version, independent of the package version (currently `5.0`). |

**Link preview example** — works on any socket, with or without the `VanzxyBaileys` hub:

```js
import { bindLinkPreview } from '@vanzxy/baileys'

const sock = bindLinkPreview(makeWASocket({ /* ... */ }))

await sock.sendLinkPreview(
    jid,
    'Cek repo ini deh',
    'https://github.com/vanzxysenpai/vanzxybaileys',
    'vanzxybaileys',
    'Extended interactive messages & native flow, built on WhiskeySockets/Baileys.',
    { url: 'https://files.catbox.moe/l72xji.svg' } // optional thumbnail
)
```

**Unified hub example** — useful if you'd rather carry one object around than import each builder individually:

```js
import { VanzxyBaileys } from '@vanzxy/baileys'

const vx = new VanzxyBaileys(sock)

await vx.button()
    .setTitle('Promo Spesial')
    .addReply('Klaim Sekarang', 'claim_promo')
    .send(jid)

await vx.poll()
    .setName('Mau makan apa hari ini?')
    .addOptions(['Nasi Goreng', 'Mie Ayam'])
    .send(jid)
```

---

## 📞 Voice & Video Calls

Experimental audio-call support (ported from ourin-baileys) via a WASM call stack + WebRTC relay. Requires the optional `@roamhq/wrtc` peer dependency.

```js
import { VoipClient } from '@vanzxy/baileys'

const voip = new VoipClient({ resourcesPath: './voip-resources' })
await voip.connectWithSocket(sock)

const call = await voip.call('628123456789')

call.on('ringing', () => console.log('Ringing...'))
call.on('connected', () => console.log('Call connected'))
call.on('ended', (reason) => console.log('Call ended:', reason))
```

`ActiveCall` (returned by `.call()`) and `CallState` are also exported directly if you need finer-grained control over call state.

---

## 🔎 User Sync Queries

`WAUSync` (`USyncQuery` / `USyncUser` + protocols) lets you check things like WhatsApp registration, device lists, status, and username info for a JID before you message it — the same mechanism behind `sock.onWhatsApp()`.

```js
import { USyncQuery, USyncUser, USyncContactProtocol } from '@vanzxy/baileys'

const query = new USyncQuery()
    .withContext('interactive')
    .withMode('query')
    .withUser(new USyncUser().withPhone('628123456789'))

query.protocols.push(new USyncContactProtocol())

const result = await sock.executeUSyncQuery(query)
```

Available protocols: `USyncContactProtocol`, `USyncDeviceProtocol`, `USyncStatusProtocol`, `USyncUsernameProtocol`, `USyncDisappearingModeProtocol`, `UsyncBotProfileProtocol`, `UsyncLIDProtocol`.

---

## 👤 Username Management

High-level wrappers around WhatsApp's username feature (the `@username` handle you can set instead of exposing your phone number), sitting on top of `USyncUsernameProtocol`. Query IDs are captured from live WA Web sessions — if a call starts throwing `unexpected response structure`, WA has rotated them and they need re-capturing.

```js
// Check availability + get suggestions if taken
const check = await sock.checkUsername('vanzxy')
// { available: true, username: 'vanzxy' }
// or: { available: false, suggestions: [...], rejectionReasons: [...] }

// Claim a username
await sock.setUsername('vanzxy', { source: sock.USERNAME_SOURCE.USER_INPUT })

// Lock it behind a PIN so it can't be changed without one
await sock.setUsernamePin('123456')

// Read your own username / drop it
const mine = await sock.getMyUsername()
await sock.deleteUsername()

// Resolve a username to a JID (USync-based, like onWhatsApp() but by username)
const user = await sock.findUserByUsername('someone')
// { jid: '628...@s.whatsapp.net', contact: false }

// Batch-resolve usernames for a list of known contacts
const usernames = await sock.fetchContactUsernames(jid1, jid2, jid3)

// Get WA's own suggestions (e.g. for onboarding flows)
const recs = await sock.getUsernameRecommendations()
```

> Requires a Community/Contact-tier account in good standing — accounts under WA's usual restrictions for new/unverified numbers may see `INVALID` or empty suggestions regardless of the username's actual availability.

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=soft&color=0:2ecc71,100:1d6a23&height=70&section=header" width="100%"/>
</div>

## 🤖 Bot Framework

An optional, higher-level layer on top of the raw socket: middleware routing, a `!command` dispatcher, a message queue that survives disconnects, exponential-backoff auto-reconnect, per-JID session storage, group activity stats, and media (sticker/voice-note) conversion helpers — so a new bot project doesn't have to hand-roll session/context management every time.

Needs the `better-sqlite3` peer dependency (session + stats storage) and `fluent-ffmpeg` (sticker/voice-note conversion, already listed above) — both fail with an install hint rather than crashing if you use a Framework feature that needs them without installing them first.

```js
import { Bot } from '@vanzxy/baileys'

const bot = new Bot({
    socketConfig: { printQRInTerminal: true },
    dbPath: './bot.db',   // sessions + stats, defaults to 'baileys_store.db'
    enableStats: true     // group message/sticker leaderboards + ghost detection
})

bot.command('!ping', async (ctx) => {
    await ctx.reply({ text: 'pong' })
})

bot.command('!sticker', async (ctx) => {
    if (!ctx.quoted?.imageMessage) return ctx.reply({ text: 'Reply to an image with !sticker' })
    // ctx.replySticker() handles the WebP conversion for you
    await ctx.replySticker(imageBuffer, { packname: 'Vanzxy Pack', author: 'you' })
})

bot.onText(async (ctx) => {
    // ctx.session() / ctx.setSession() / ctx.updateSession() / ctx.clearSession()
    // persist small per-chat state (e.g. multi-step flows) to SQLite automatically
    const state = ctx.session()
    if (state?.awaitingReply) {
        ctx.updateSession((s) => ({ ...s, awaitingReply: false }))
    }
})

await bot.start()
```

`Context`, `SessionManager`, `StatsManager`, `MediaManager`, and `SQLiteStore` are also exported individually if you only need one piece rather than the full `Bot` class.

> These files ship as plain `.js` for now — hand-written `.d.ts` declarations for the Framework module haven't been added yet, unlike the rest of this fork's fully-typed surface.

---

## 🧩 Utility Modules

A sample of the utilities exported from `lib/Utils` beyond the message builders above:

| Module | What it does |
|---|---|
| `anti-delete` | Detect and recover messages the sender deleted for everyone |
| `auto-reply` | Simple keyword/pattern-based auto-responder engine |
| `message-search` | Search cached/stored messages, peeling off ephemeral/view-once wrappers first |
| `message-retry-manager` | Handles WhatsApp's retry-receipt protocol for undecryptable messages |
| `scheduling` | Schedule messages/actions for later delivery |
| `business` | Business-profile & catalog helpers |
| `chat-control` | Pin, mute, archive, and mark-read/unread helpers |
| `chat-history-helpers` | Work with synced chat history payloads |
| `link-preview` | Generate link preview metadata for outgoing messages |
| `stickerpack` | Build and send sticker packs (including animated/Lottie) |
| `templates` | Legacy WhatsApp Business template message helpers |
| `vcard` | Build vCard (contact card) payloads |
| `status` | Post and manage WhatsApp Status updates |
| `event-buffer` | Buffers/coalesces high-volume socket events for heavier bots |

Every module above ships a matching `.d.ts`, so your editor will show full hover-docs regardless of which ones you import.

---

## 🛠 Recommended Environment

| Requirement | Version |
|---|---|
| Node.js | 20+ |
| Module system | ESM |
| WhatsApp | Latest Multi Device |

---

## 📘 TypeScript Support

Every file in `lib/` ships a matching `.d.ts`, including the message builders (`MessageBuilder_d.ts`) and all `Types/*` definitions (Auth, Chat, Contact, Events, GroupMetadata, Message, Product, Signal, USync, and more). No `@types/` package needed — plain `import { ... } from '@vanzxy/baileys'` gets full autocomplete in TS or JS-with-checkJS projects.

---

## 📚 Fork Lineage

```
@vanzxy/baileys
└── @itsliaaa/baileys
    └── WhiskeySockets/Baileys
```

Respect to all original maintainers and contributors.

---

## ❓ FAQ & Troubleshooting

<details>
<summary><b>Koneksi terus putus / reconnect loop</b></summary>
<br/>

Cek `connection.update` untuk field `lastDisconnect.error`. Kalau status code-nya `401` (loggedOut), sesi memang sudah invalid dan perlu scan ulang QR — jangan auto-reconnect di kondisi ini. Untuk status lain (`428`, `440`, dsb.), reconnect dengan backoff biasanya cukup.

</details>

<details>
<summary><b>QR tidak muncul / tidak ke-scan</b></summary>
<br/>

`printQRInTerminal` sudah deprecated di upstream Baileys — pastikan kamu render QR sendiri dari event `qr` (lihat contoh di [Quick Start](#-quick-start)). Kalau QR muncul tapi gagal linking, biasanya karena versi WA Web (`version` di `makeWASocket`) sudah kedaluwarsa; fetch versi terbaru lewat `fetchLatestBaileysVersion()`.

</details>

<details>
<summary><b>Error "Bad MAC" / pesan gagal didekripsi</b></summary>
<br/>

Umumnya terjadi kalau folder auth state korup atau sesi dipakai di lebih dari satu proses secara bersamaan. Pastikan hanya satu instance yang menulis ke folder auth state yang sama, dan pertimbangkan `pruneStaleAuthFiles()` untuk membersihkan sender-key lama secara berkala.

</details>

<details>
<summary><b>Memory terus naik di bot yang jalan lama</b></summary>
<br/>

Kalau pakai `makeInMemoryStore()`, cache chat/message/contact akan terus tumbuh tanpa batas. Untuk bot yang jalan lama, pertimbangkan pindah ke salah satu backend `makePersistentStore()` (SQLite/Redis/dst) dan pakai `event-buffer` untuk meredam lonjakan event di trafik tinggi.

</details>

<details>
<summary><b>Voice call gagal connect</b></summary>
<br/>

Fitur ini masih experimental dan butuh peer dependency `@roamhq/wrtc` — pastikan sudah terinstall dan platform kamu didukung native binding-nya. Cek event `call.on('ended', reason => ...)` untuk detail penyebab gagalnya.

</details>

---

## 🤝 Contributing

Kontribusi dipersilakan, terutama untuk perbaikan bug, dokumentasi, dan enhancement pada `MessageBuilder` / `AIRich`.

1. Fork repo ini, buat branch dari `main` (`feat/nama-fitur` atau `fix/nama-bug`)
2. Pastikan perubahan tetap ESM-only dan menyertakan/menyesuaikan `.d.ts` terkait
3. Uji perubahan pada minimal satu jalur auth state + satu store backend sebelum PR
4. Buka Pull Request dengan deskripsi singkat: apa yang berubah dan kenapa

Untuk laporan bug, sertakan versi Node.js, cara reproduksi, dan potongan log `lastDisconnect.error` bila relevan.

---

## 🙏 Credits

- **Nixel** (with contributions from **Ahmad tumbuh kembang**) — base implementation of the `MessageBuilder` (AIRich / Button / Carousel / Toolkit), originally "NIXCODE — Advanced WhatsApp Interactive Message Builder"
- **vinikjkkj** ([zapo](https://github.com/vinikjkkj/zapo)) — button/list addon-kind resolution logic
- **QueenAnya** (`@queenanya/baileys`) — interactive/native-flow button send layer
- **WhiskeySockets/Baileys** & **@itsliaaa/baileys** — upstream base

Full details and license terms per component: see [`NOTICE.md`](./NOTICE.md).

---

## 👑 Maintainer

<table>
<tr>
<td width="180">
<img src="https://files.catbox.moe/reqhur.png" width="160" alt="Vanzxy portrait"/>
</td>
<td>

**Vanzxy**

- GitHub: [github.com/vanzxysenpai](https://github.com/vanzxysenpai)
- Package: [`@vanzxy/baileys`](https://www.npmjs.com/package/@vanzxy/baileys)
- ✦ Maintains this fork solo — issues & PRs are welcome and reviewed personally.

</td>
</tr>
</table>

<p align="center">
<img src="https://raw.githubusercontent.com/vanzxysenpai/vanzxysenpai/output/github-contribution-grid-snake.svg" width="100%" alt="Contribution snake animation"/>
</p>

---

## ⚠️ Disclaimer

This project is an independent fork.
Use responsibly and follow WhatsApp Terms of Service.

---

## 📝 V8 Patch Notes

- Added `LinkPreview.js` to `lib/Builders/`: `bindLinkPreview(sock)` attaches a `sendLinkPreview(jid, text, link, title, description, thumbnail, options)` method directly to a socket instance (matched-text/title/description + optional thumbnail via `prepareWAMessageMedia`). Wired into `index.js`'s exports and auto-applied inside the `VanzxyBaileys` constructor, so `new VanzxyBaileys(sock)` gives you `sendLinkPreview` for free. See the [Builders Folder Map](#-builders-folder-map-libbuilders) for the usage example.
- **Experimental AIRich fix:** `AIRich.build()` now populates the previously-unset `richResponseMessage.originalRecipientMetadata` proto field with the same section payload as `unifiedResponse`. Working hypothesis is that WhatsApp's client uses this field to decide full/expanded rendering for an AI-response bubble's original recipient, and its absence was causing live-built AIRich bubbles to collapse into "Baca selengkapnya" earlier than they should while still mid-`sendEdit()` build. Not yet confirmed against live traffic — flag it if the early collapse persists or if this introduces a regression.
- Corrected `package.json`'s `version` field from `2.0.6` back to `2.0.3`. `2.0.6` was never reached through this fork's own release process — it got bumped out of sequence, so the version number is reset to the correct next step.

---

## 📝 V7 Patch Notes

- Added four new builders to `lib/Builders/` (see the [📁 Builders Folder Map](#-builders-folder-map-libbuilders) for details), wired into both `index.js` and the `VanzxyBaileys` hub:
  - `NativeFlow.js` — modern `interactiveMessage`/`nativeFlowMessage` builder (`cta_url`, `cta_copy`, `cta_call`, `quick_reply`, `single_select`), the recommended replacement for `ButtonV3`'s legacy hydrated-template buttons.
  - `Location.js` — static + live location builder.
  - `Contact.js` — single/multi vCard contact-card builder.
  - `Album.js` — media-group/album builder (thin wrapper over the existing `content.album` shorthand).
- Fixed a version mismatch: `AIRich.js`'s internal `VERSION` constant was still `4.7` while `index.js`'s `MESSAGE_BUILDER_VERSION` had already moved to `4.8`. Both now read `5.0`.

---

## 📝 V6 Patch Notes

- Fixed a `package.json` typo: the version field was mistakenly left at `1.0.1` instead of `2.0.1` after the V5 release — corrected to `2.0.1` so the published package version matches the intended release.
- Expanded README documentation, especially around `lib/Builders/`:
  - Added the new [📁 Builders Folder Map](#-builders-folder-map-libbuilders) section — a per-file breakdown of everything under `lib/Builders/` (`shared.js`, `Button.js`, `ButtonV2.js`, `ButtonV3.js`, `Carousel.js`, `Poll.js`, `AIRich.js`, `A2UI.js`, `VanzxyBaileys.js`, `index.js`), what each file exports, and what it's for — previously `A2UI` and `VanzxyBaileys` in particular had no usage documentation at all.
  - Added a usage example for the `VanzxyBaileys` unified builder hub.
- Redesigned `postinstall-banner.js`: cleaner box layout with a divider separating the title block from a small info section (Node version + docs link), a 256-color palette instead of basic ANSI colors, and a plain-text fallback when stdout isn't a TTY or `NO_COLOR` is set (CI logs, piped output) instead of forcing a box that may render misaligned.

---

## 📝 V5 Patch Notes

- Added [Username Management](#-username-management): `checkUsername`, `checkUsernameMulti`, `setUsername`, `deleteUsername`, `getMyUsername`, `setUsernamePin`, `findUserByUsername`, `fetchContactUsernames`, `getUsernameRecommendations` — ported from `@queenanya/baileys`, layered onto this fork's existing `USyncUsernameProtocol` support.
- Added the [Bot Framework](#-bot-framework) (`Bot`, `Context`, `SessionManager`, `StatsManager`, `MediaManager`, `SQLiteStore`) — ported from `@queenanya/baileys` (originally WhiskeySockets PR #2710 by LuferOS). Adapted on the way in:
  - `SQLiteStore`/`StatsManager` construction moved behind an async `.create()` factory so `better-sqlite3` stays a lazily-loaded optional peer dep instead of a hard top-level import that would crash the Framework module for anyone without it installed.
  - `MediaManager`'s sticker/voice-note conversion now reuses this fork's existing lazy `fluent-ffmpeg` loader (see `Utils/MessageBuilder.js`) instead of adding `ffmpeg-static` + a second ffmpeg dependency; `node-webpmux` (sticker EXIF metadata) is lazy-loaded the same way and only when packname/author is actually requested.
  - `Bot`'s default logger now falls back to this fork's own pino instance instead of a silent no-op stub.
- No `.d.ts` files were written for the new Framework module yet — see the note in that section.
- Bumped to `1.0.1`.

---

## 📝 V4 Patch Notes

- Kept the existing Vanzxy custom MessageBuilder classes and AIRich implementation intact.
- Added `whatsapp-rust-bridge@0.5.5` as a runtime dependency. The library already dynamically imports this module for LT Hash/app-state and crypto helpers; declaring it prevents accidental missing-module fallbacks in normal installations.
- Existing guarded fallbacks for platforms where the native bridge cannot load remain in place.
- ESM-only package metadata is preserved; no CommonJS build is included.

Reference audit: the supplied Ourin, Elaina, ItsLiaaa, and Noxleyss packages were compared before this patch. Their broader core changes were not copied wholesale because the current Vanzxy tree already contains additional LID, retry, media, interactive, and AIRich fixes that would risk regressions if replaced.

---

<div align="center">

<img src="https://files.catbox.moe/tfqh0f.gif" width="60%" alt="Thanks for visiting"/>

Thanks for visiting, bye 👋

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2ecc71,100:1d6a23&height=100&section=footer" width="100%"/>

Made with 🍃 by **Vanzxy**

Thanks for stopping by! ✌️

<a href="#top">⬆️ Back to top</a>

</div>