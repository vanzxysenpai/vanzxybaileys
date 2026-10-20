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
<img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License: MIT"/>
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

- [🆕 What's New](#-whats-new)
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

</details>

</div>

---

<div align="center">
<img src="https://files.catbox.moe/o2zpaq.png" width="100%" alt="Vanzxy banner art"/>
</div>

---

## 🆕 What's New

### v2.0.5
**Packaging & types**
- TypeScript declarations are now shipped for the whole package: `lib/index.d.ts`, a `.d.ts` next to every `lib/**/*.js`, and `WAProto/index.d.ts` (also exposed through the `./WAProto` export). They are generated from the sources, so many signatures are loose (`any`), and `proto` message types accept arbitrary keys.
- Removed the `preinstall` hook and `engine-requirements.js`; Node.js >= 20 is enforced through the `engines` field instead.
- Removed the unused `resolutions` block and the dangling `sourceMappingURL` comments (no `.map` files are shipped).
- `qrcode-terminal`, `ffmpeg-static` and `@ffmpeg-installer/ffmpeg` are declared as optional peer dependencies.
- Added `publishConfig.access = "public"` and a `prepublishOnly` syntax check.

**Behaviour**
- `AIRich` no longer attaches the placeholder `botMetadata.verificationMetadata` by default (it is random bytes, not a real Meta signature). Opt in with `setVerificationMetadata(true)`. The same applies to `wrapToBotForwardedMessage(msg, { verification: true })`.
- Removed the `lib/Utils/MessageBuilder.js` compatibility shim. Import builders from `@vanzxy/baileys` (they live in `lib/Builders/`); deep imports of `@vanzxy/baileys/lib/Utils/MessageBuilder.js` no longer work.
- The AI bot JID used by `AIRich` and the rich-message helpers is now a single constant, `DEFAULT_AI_BOT_JID` (override with the `VANZXY_AI_BOT_JID` environment variable, or per message with `setForwardBotJid()`).

**Docs**
- Added `bugs.url` and trimmed the npm keyword list.
- `NOTICE.md` attribution entries finalized and pointed at `lib/Builders/`.

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

> Requires **Node.js 20+** — enforced through the `engines` field in `package.json`.

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
| `AIRich.js` | `AIRich` (+ aliases `ORich`, `AIVanzxy`, `LeafRich`, `VanzxyAI`, `VanzxyRich`, `RichVanzxy`) | The rich AI-assistant-style response builder described above — headings, formatted text, tables, media/product/post cards, task/progress cards, tip banners, quick-reply suggestions. |
| `A2UI.js` | `A2UI`, `sendA2UIWidget` | Lower-level A2UI/Bloks widget builder. Builds the flat `components` tree (Column/Row → `children`, Card/Button → `child`, Modal → `trigger`/`content`) that Bloks widgets expect and sends it through the same `getBizBinaryNode()` path as `Button`/`ButtonV2`, so the wire-level node always matches the button names actually sent. |
| `VanzxyBaileys.js` | `VanzxyBaileys` | A unified builder **hub** — one object that wraps all the builders above behind short method names (`.button()`, `.buttonV2()`, `.buttonV3()`, `.carousel()`, `.poll()`, `.airich()`, `.a2ui()`), plus PascalCase aliases (`.Button()`, `.Carousel()`, `.Poll()`, `.AIRich()`, `.A2UI()`) for developers who prefer that naming style. Nothing new is implemented here — it's purely a single entry point over the individual classes. |
| `index.js` | everything above, plus `MESSAGE_BUILDER_VERSION` | The barrel file — re-exports every builder and its aliases so `import { Button, Poll, AIRich, VanzxyBaileys } from '@vanzxy/baileys'` works without reaching into individual files. `MESSAGE_BUILDER_VERSION` tracks the builder API surface's own version, independent of the package version. |

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

**Also available** (ported from nexustech): `USyncBusinessProtocol`, `USyncPictureProtocol`, `USyncTextStatusProtocol`, `USyncSidelistProtocol`, `USyncFeatureProtocol`, each with a chainable helper on `USyncQuery`:

```js
const query = new USyncQuery()
    .withContext('interactive')
    .withMode('query')
    .withUser(new USyncUser().withId('628123456789@s.whatsapp.net'))
    .withBusinessProtocol()      // -> { verifiedName, verifiedLevel, profileTag, pnJid }
    .withPictureProtocol()       // -> { id, directPath, hash }
    .withTextStatusProtocol()    // -> { text, emoji, setAt, expiresAt }

const result = await sock.executeUSyncQuery(query)
```

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
| `reconnect-backoff` | `computeReconnectDelay()` / `createReconnectBackoff()` — full-jitter exponential backoff (2s base, 15 min cap) |
| `bad-mac-handler` | Detect/count "Bad MAC" (out-of-sync Signal session), safe-wrap async fns, optional `session-*` / `sender-key-*` cleanup |
| `connection-watchdog` | `setupConnectionWatchdog()` / opt-in `makeWASocket({ connectionWatchdog: true })` liveness probe |
| `auto-reconnect` | `autoReconnect(factory, opts)` — drop-in reconnect manager (never reconnects after `loggedOut`) |
| `auth-secure` | Encrypted auth state at rest (AES-256-GCM), backup/restore, integrity checks, pairing/QR guards, secret redaction |
| `humanizer` | `sendHumanized()` — typing presence + length-based delay + per-chat send queue |
| `mock-socket` | `createMockSocket()` — offline stand-in for `sock`, to test bot logic without a WhatsApp account |
| `meta-ai` | `askMetaAI()` — send a prompt to Meta AI and await the reply (experimental) |
| `meta-ai-msmsg` | Experimental, unwired `msmsg` decrypt helpers (see the note in `NOTICE.md` / changelog) |
| `qr-terminal` | `printQRIfNecessaryListener(ev, logger)` — opt-in terminal QR printer (lazy `qrcode-terminal`, returns an unsubscribe fn) |
| `disconnect-reason` | `mapDisconnectReason()`, `isFatalDisconnect()`, `shouldClearAuth()`, `shouldReconnect()`, `getDisconnectInfo()` — stable names for disconnect codes |
| `phone-utils` | `validateE164()`, `jidToPhone()`, `phoneToJid()` |
| `text-tools` | `parseMentions()`, `extractGroupInviteCode()`, `joinGroupViaLink()` |
| `pairing-utils` | `normalizePairingCode()`, `formatPairingCode()`, `pairingErrorCode()`, `isRateLimitError()`, `isCustomPairingError()` |
| `group-metadata-cache` | `isUsableGroupMetadata()` — relay uses it to refetch cached groups that lack a valid `addressingMode` |
| `username` | `validateUsername()`, `isUsernamePin()`, `displayUsername()` — client-side username validation |
| `jid-tools` | `getPhoneNumber()`, `resolveSenderPn()`, `getLidForPhone()` — LID <-> phone number via the persistent LID mapping |
| `tag` | `tagAll()`, `hideTag()`, `buildTagContent()` — mention every group member |
| `ffmpeg-path` | `setFfmpegPath()`, `resolveFfmpegPath()`, `requireFfmpegPath()` — one resolver for the ffmpeg binary (`FFMPEG_PATH`, ffmpeg-static, system PATH) |
| `voice-note` | `sendVoiceNote()`, `buildVoiceNoteContent()` — converts to mono 16 kHz Opus/OGG and sends as PTT |
| `text-format` | `splitText()`, `whatsappify()`, `sendLongText()` — chunk long text / convert markdown to WhatsApp formatting |
| `lock-manager` | `makeLockManager()` — deterministic keyed lock manager |
| `migrate-auth-state` | `migrateAuthState({ from, to })` — copy creds + keys between auth stores (needs `keys.list`) |
| `passkey` | `getPasskeyRequestState(node)` — passkey companion-linking request parsing |

Every module above ships a matching `.d.ts`, so your editor will show full hover-docs regardless of which ones you import.

### Stability & security quick start

```js
import makeWASocket, { autoReconnect, useEncryptedFileAuthState, sendHumanized } from '@vanzxy/baileys'

// creds + keys encrypted on disk (legacy plaintext folders are read and migrated on next save)
const { state, saveCreds } = await useEncryptedFileAuthState('./auth', { password: process.env.AUTH_PASSWORD })

const manager = autoReconnect(() => makeWASocket({ auth: state }), {
    onSocket: (sock) => {
        sock.ev.on('creds.update', saveCreds)
        sock.ev.on('messages.upsert', async ({ messages }) => {
            await sendHumanized(sock, messages[0].key.remoteJid, { text: 'pong' })
        })
    },
    onLoggedOut: () => console.log('session logged out — wipe ./auth and re-pair'),
})
await manager.start()
```

Test bot logic offline with `createMockSocket()`:

```js
import { createMockSocket } from '@vanzxy/baileys'

const mock = createMockSocket()
myBotSetup(mock.sock)                              // your real bot code, unchanged
await mock.receiveText('628000000001@s.whatsapp.net', '!ping')
const out = await mock.waitForReply()
```

---

## 🛠 Recommended Environment

| Requirement | Version |
|---|---|
| Node.js | 20+ |
| Module system | ESM |
| WhatsApp | Latest Multi Device |

---

## 📘 TypeScript Support

Every file in `lib/` ships a matching `.d.ts`, including all `Types/*` definitions (Auth, Chat, Contact, Events, GroupMetadata, Message, Product, Signal, USync, and more). No `@types/` package needed — plain `import { ... } from '@vanzxy/baileys'` gets full autocomplete in TS or JS-with-checkJS projects.

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
- **JAPofc** (`@japofc/baileys`) — auto-reconnect manager, encrypted auth state / security pack, humanized sender, offline mock socket, Meta AI helper
- **nexustechpro2** (`@nexustechpro/baileys`) — extra USync protocols (Business, Picture, TextStatus, Sidelist, Feature)
- **lpzeravk / systemzero** — reconnect backoff, Bad MAC handler, connection watchdog
- **WhiskeySockets/Baileys** & **@itsliaaa/baileys** — upstream base

Full details and license terms per component: see [`NOTICE.md`](./NOTICE.md).

---

<p align="center">
<img src="https://raw.githubusercontent.com/vanzxysenpai/vanzxysenpai/output/github-contribution-grid-snake.svg" width="100%" alt="Contribution snake animation"/>
</p>

---

## ⚠️ Disclaimer

This project is an independent fork.
Use responsibly and follow WhatsApp Terms of Service.

---

## 📦 Package Contents

The published package is intentionally limited to the runtime library, generated WhatsApp protocol bindings, installation/runtime helpers, legal files, and documentation. The `files` field in `package.json` controls what is included in the published package.

```text
@vanzxy/baileys/
├── lib/                     # Main runtime implementation and TypeScript declarations
│   ├── Builders/            # Message and interactive builders
│   ├── Defaults/            # Default configuration and constants
│   ├── Signal/              # Authentication and Signal-related implementation
│   ├── Socket/              # WhatsApp Web socket/runtime layer
│   ├── Store/               # Store implementations and helpers
│   ├── Types/               # Public and internal type definitions
│   ├── Utils/               # Runtime utilities
│   ├── WABinary/            # Binary node encoding/decoding helpers
│   ├── WAM/                 # WhatsApp Web protocol helpers
│   ├── WAUSync/             # USync/query functionality
│   ├── index.js             # Main package entrypoint
│   └── index.d.ts           # Main TypeScript entrypoint
├── WAProto/                 # Generated WhatsApp protobuf runtime + declarations
├── VanzxyBanner.js          # Package/startup banner helper
├── NOTICE.md                # Third-party attribution and notices
├── LICENSE                  # MIT license
└── README.md                # Project documentation
```

The package entry points are defined by `package.json`:

```json
{
  "type": "module",
  "main": "./lib/index.js",
  "module": "./lib/index.js",
  "types": "./lib/index.d.ts"
}
```

The package also exposes the generated `WAProto` surface and selected `lib/*` paths through the `exports` map. Consumers should prefer the documented public exports rather than depending on undocumented internal file paths.

### Published files

The current `files` allowlist is:

```text
lib/**/*
WAProto/**/*
VanzxyBanner.js
NOTICE.md
LICENSE
README.md
```

This means documentation changes do not modify the runtime implementation. Editing `README.md` alone does not alter `lib/`, `WAProto/`, authentication behavior, socket behavior, or builders.

---

## 🏗️ Architecture Overview

`@vanzxy/baileys` is organized in layers. Keeping these layers separate makes it easier to extend a builder or protocol surface without unnecessarily changing the transport layer.

### Runtime flow

```text
Application / Bot
       │
       ▼
Public exports (`lib/index.js`)
       │
       ├── Builders ───────────────► Message construction
       │                              AIRich / A2UI / Button / Carousel / Toolkit
       │
       ├── Socket ─────────────────► Connection + send/receive lifecycle
       │                              auth state / reconnect / message send
       │
       ├── Signal ─────────────────► Session + cryptographic state
       │
       ├── Store ──────────────────► Message / auth / metadata persistence
       │
       ├── WABinary / WAM ─────────► WhatsApp node and protocol helpers
       │
       └── WAUSync ────────────────► User/business/query synchronization
       │
       ▼
WAProto
       │
       ▼
WhatsApp Web protocol messages
```

### `lib/Builders/`

This layer contains the higher-level message construction APIs. It is where the fork's interactive and rich-message work is concentrated. Builders are designed to turn JavaScript objects and fluent method calls into WhatsApp message structures before the socket layer transmits them.

Important builder families documented by this package include `AIRich`, `A2UI`, button builders, carousel support, and the shared toolkit/helpers used by those builders.

### `lib/Socket/`

The socket layer is responsible for the connection-facing side of the library: establishing and maintaining the WhatsApp Web session, receiving nodes/events, sending messages, and coordinating runtime state.

Application code should normally interact with this layer through the public socket factory and exported helpers instead of reaching into socket implementation files directly.

### `lib/Signal/`

Signal-related modules handle the cryptographic/session state required for multi-device communication. Changes here should be treated as high-impact changes: a seemingly small alteration can affect authentication, session establishment, message decryption, or group sender-key behavior.

### `lib/Store/`

Store modules provide persistence abstractions and helpers used by the runtime. The exact backend can vary depending on the application and the optional dependencies installed alongside the package.

### `lib/WABinary/`, `lib/WAM/`, and `lib/WAUSync/`

These lower-level modules provide protocol-facing utilities. They are useful when implementing advanced functionality, but application code should use higher-level public helpers where possible.

### `WAProto/`

`WAProto` contains the generated protocol definitions used to construct and parse WhatsApp message structures. It is part of the published package and is exposed separately through the package exports.

---

## 🧭 Public Entry Points & Module Map

The main declaration entry point re-exports the principal package surfaces so TypeScript consumers can resolve the same API family as JavaScript consumers.

```text
lib/index.d.ts
├── WAProto
├── Utils
├── Builders
├── Types
├── Store
├── Defaults
├── WABinary
├── WAM
├── WAUSync
├── Dugong
├── makeWASocket
└── exports-extra
```

The package also defines these export paths in `package.json`:

| Export | Purpose |
|---|---|
| `@vanzxy/baileys` | Main public API and socket factory |
| `@vanzxy/baileys/WAProto` | Generated protocol API |
| `@vanzxy/baileys/WAProto/*` | Individual generated protocol modules |
| `@vanzxy/baileys/lib/*` | Published library modules with declarations |
| `@vanzxy/baileys/package.json` | Package metadata |

For normal application development, the root import is the safest starting point:

```js
import makeWASocket, { AIRich, DisconnectReason } from '@vanzxy/baileys'
```

If a specialized module is required, use an export path explicitly documented by the package rather than importing a source file that is not part of the export map.

---

## 🧩 Feature Surface Matrix

The following matrix describes the documented surface of this fork without treating every feature as equally stable or equally supported by every WhatsApp client version.

| Area | Surface | Notes |
|---|---|---|
| Connection | Multi-device socket | Main runtime surface |
| Authentication | Auth state / Signal | Session state is security-sensitive |
| Messages | Standard message generation | Core Baileys-style flow |
| Media | Image/audio/video/document helpers | Optional codecs/tools may be required |
| Interactive | Buttons / native-flow related builders | Client rendering can vary |
| Rich messages | `AIRich` | Extended builder surface |
| UI | `A2UI` | Advanced interactive/UI structures |
| Carousel | Carousel builder/support | Client capability dependent |
| Polls | Poll construction | Rendering/support depends on message type and client |
| USync | User/business/query helpers | Protocol-facing API |
| LID | LID-aware participant handling | Important for modern WhatsApp addressing |
| TypeScript | `.d.ts` declarations | Included in the package |
| Protocol | `WAProto` | Generated protobuf surface |
| Stores | Store helpers/backends | Some backends use optional dependencies |
| Calls | Voice/video call helpers | Runtime/client capability dependent |

**Compatibility note:** a function being present in the JavaScript or TypeScript API does not guarantee that every WhatsApp client version will render or accept every advanced message structure. For experimental/native structures, verify behavior against the client versions you actually target.

---

## 🔄 Migration Notes

When moving an application to `@vanzxy/baileys`, check the following areas first:

1. **Runtime:** use Node.js `>=20.0.0`.
2. **Module system:** the package is ESM-only (`"type": "module"`). Use `import`/`export` rather than CommonJS `require()` for package modules.
3. **Entry point:** the package resolves the main runtime through `./lib/index.js` and TypeScript declarations through `./lib/index.d.ts`.
4. **Protocol imports:** `WAProto` is available through the package export map; avoid assuming an unrelated generated-proto path from another Baileys fork.
5. **Builders:** advanced builder APIs such as `AIRich` and `A2UI` should be tested against the actual WhatsApp client/device combination used by the application.
6. **LID-aware code:** applications that manually construct quoted messages, participants, or group/status payloads should verify that their code does not blindly assume PN-only addressing.
7. **Optional dependencies:** media, database, WebRTC, preview, and other optional capabilities may require their corresponding peer dependency to be installed.
8. **Lifecycle scripts:** `prestart` invokes the Vanzxy banner when using the package's `npm start` lifecycle. These lifecycle hooks are not substitutes for a process manager's startup command.

### Common ESM migration mistakes

```js
// ❌ CommonJS in an ESM-only application
const baileys = require('@vanzxy/baileys')

// ✅ ESM
import makeWASocket from '@vanzxy/baileys'
```

For dynamic loading, use `import()`:

```js
const module = await import('@vanzxy/baileys')
```

---

## 🧪 Verification & Test Strategy

Advanced changes should be tested at the layer they modify rather than relying on one end-to-end send test to prove everything works.

### Recommended verification order

```text
1. Static/import check
        ↓
2. Type/declaration check
        ↓
3. Builder construction test
        ↓
4. Serialization/protobuf test
        ↓
5. Relay/send test
        ↓
6. Real-client rendering test
```

For example, an `AIRich` change should first prove that the builder produces the expected structure before diagnosing a client-rendering issue as a builder bug. Likewise, a protocol change should be checked at the protobuf/node level before adding retries or transport workarounds.

### What a useful bug report contains

```text
Package version: @vanzxy/baileys x.y.z
Node.js version: v20+ / exact version
Environment: Linux / Pterodactyl / Termux / VPS / other
Feature: AIRich / A2UI / media / socket / auth / etc.
Expected: ...
Actual: ...
Reproduction: minimal code or command
Stack trace: ...
WhatsApp client/device: ...
```

For authentication or connection failures, include the relevant disconnect reason and a sanitized log. Never publish credentials, session files, private keys, or authentication state in an issue.

---

## 🛠️ Troubleshooting Guide

### `require() cannot be used on an ESM graph`

The package is ESM-only. Replace CommonJS `require()` usage with static `import` or dynamic `import()` as appropriate.

### `ERR_MODULE_NOT_FOUND`

Check all of the following:

- The dependency is installed in the same runtime where the bot is running.
- The import path includes the correct extension when importing local ESM files where required.
- The package version installed is the version your application expects.
- The file is actually included by the package `files` allowlist when testing a packed/published tarball.

### `Cannot find module` for an optional capability

Some functionality is represented by optional peer dependencies. Install only the dependency required by the feature you use, then restart the application so Node resolves the newly installed module.

### The message is sent but the client displays it differently

Advanced WhatsApp message structures are client-capability dependent. Compare the serialized structure produced by the builder with the structure expected by the target client before changing transport code.

### LID/PN-related participant problems

Do not assume that every chat can use the same participant JID representation. Modern WhatsApp conversations can be LID-addressed. If your application manually builds message content or quote context, use the package's LID-aware helpers and pass the correct identity information rather than deriving everything from a PN-only JID.

### Banner does not appear

The package currently uses `prestart` for the npm lifecycle banner. Running a process manager directly with a command such as `node index.js` does not execute npm lifecycle hooks. If your Pterodactyl/VPS startup command bypasses `npm start`, call the banner explicitly from your application entrypoint if that is the desired behavior.

### Installation stops at engine validation

The package declares Node.js `>=20.0.0`. Check the runtime version first:

```bash
node --version
```

If the runtime is below the declared engine requirement, upgrade Node before debugging package-level errors.

---

## 🔐 Security & Operational Checklist

Before deploying a bot based on this package:

- Keep authentication state outside Git repositories and public uploads.
- Never paste private credentials or session keys into issue reports.
- Restrict filesystem permissions for auth/session directories.
- Use a process manager or container restart policy appropriate for your deployment.
- Keep Node.js and dependencies updated within versions compatible with the package.
- Treat protocol/builder changes as potentially breaking until verified against a real client.
- Sanitize logs before sharing them publicly.
- Review third-party notices in `NOTICE.md` when redistributing the package.

The package's MIT license does not remove the need to comply with WhatsApp's own terms, applicable laws, or the licenses/notices of bundled or derived components.

---

## 🧰 Optional Dependencies at a Glance

The package declares several optional peer dependencies because not every application needs every capability. The exact dependency set should be checked against `package.json` for the installed version.

| Dependency family | Typical purpose |
|---|---|
| `sharp`, `@napi-rs/image` | Image processing |
| `fluent-ffmpeg` | Media/FFmpeg workflows |
| `audio-decode` | Audio decoding |
| `node-webpmux` | WebP-related processing |
| `@roamhq/wrtc` | WebRTC support |
| `better-sqlite3` | SQLite-backed application storage |
| `mongodb` | MongoDB-backed storage |
| `mysql2` | MySQL-backed storage |
| `pg` | PostgreSQL-backed storage |
| `ioredis` | Redis-backed storage |
| `link-preview-js` | Link preview functionality |
| `axios` | HTTP/client integrations |

Optional does not mean universally unnecessary: if an application calls a feature that depends on one of these packages, install the corresponding dependency and verify the feature independently.

---

## 🧭 Developer Guide

Task-oriented recipes that sit on top of the reference sections above. Every API used here is documented elsewhere in this README or in the [Complete API Reference](#complete-api-reference); nothing below relies on features that are not in the shipped source. Remember the project-status note: wire formats for the more exotic message types are **not** confirmed against a live WhatsApp client — test on a throw-away account first.

### Which API do I use? (quick lookup)

| I want to… | Use | Section |
|---|---|---|
| Send plain text / media / reaction / edit / delete | `sock.sendMessage(jid, content, options)` | [Messaging](#-messaging) |
| Send a message built by hand | `generateWAMessageFromContent()` + `sock.relayMessage()` | [Generating vs. relaying](#generating-vs-relaying) |
| Quick-reply / URL / call buttons | `Button` (or `ButtonV2` for reply-only) | [Builders Reference](#-builders-reference) |
| Edit an existing template message | `ButtonV3.loadFrom(msg)` | [Builders Reference](#-builders-reference) |
| Swipeable cards | `Button(...).toCard()` → `Carousel` | [Carousel](#carousel) |
| Poll or quiz | `Poll` (`setQuiz()` for quiz mode) | [Poll](#poll) |
| Album of 2–10 images/videos | `Album` or `sock.sendAlbumMessage()` | [Media](#-media) |
| AI-assistant-style rich card | `AIRich` | [AIRich Reference](#-airich-reference) |
| Auto-delete a message after N seconds | `Expiring` | [Builders Reference](#-builders-reference) |
| Persist auth between restarts | `useMultiFileAuthState` / `useSqliteAuthState` / `useEncryptedFileAuthState` | [Authentication](#-authentication) |
| Survive disconnects | `autoReconnect()` or the `Bot` framework | [Utility Modules](#-utility-modules) |
| Persist chats/messages | `makePersistentStore()` + a store adapter | [Store Backends](#-store-backends) |
| Map LID ↔ phone number | `sock.signalRepository.lidMapping`, `resolveSenderPn()` | [LID / PN Addressing](#-lid--pn-addressing) |
| Check whether a number is on WhatsApp | `sock.onWhatsApp(...numbers)` | [User Sync Queries](#-user-sync-queries) |
| Mention everyone in a group | `sock.sendMentionAll()` / `tagAll()` / `hideTag()` | recipe below |
| Test bot logic without WhatsApp | `createMockSocket()` | recipe below |

### Recipe 1 — A production-minded bot skeleton

This combines the pieces the defaults table calls out as important: a fresh WA Web `version`, a `getMessage` that can resend, a `cachedGroupMetadata` lookup, `creds.update` persistence, and a reconnect policy that never reconnects after a logout.

```js
import makeWASocket, {
    autoReconnect,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    Browsers
} from '@vanzxy/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')
const { version } = await fetchLatestBaileysVersion()

// Your own caches. Any Map-like store works; this is the minimum.
const sentMessages = new Map()      // key.id -> proto.IMessage
const groupCache   = new Map()      // jid    -> GroupMetadata

const manager = autoReconnect(() => makeWASocket({
    auth: state,
    version,
    browser: Browsers.ubuntu('Chrome'),
    getMessage: async (key) => sentMessages.get(key.id),
    cachedGroupMetadata: async (jid) => groupCache.get(jid)
}), {
    onSocket: (sock) => {
        sock.ev.on('creds.update', saveCreds)

        sock.ev.on('groups.update', async ([u]) => {
            if (!u?.id) return
            const fresh = await sock.groupMetadata(u.id)
            groupCache.set(u.id, fresh)
        })

        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify') return
            for (const m of messages) {
                if (!m.message || m.key.fromMe || m.isSystemNotification) continue
                // ... your handler
            }
        })
    },
    onOpen:      () => console.log('🍃 connected'),
    onLoggedOut: () => console.log('logged out — delete auth_info and pair again'),
    onFatal:     (err, code) => console.error('fatal disconnect', code, err?.message)
})

await manager.start()
```

Notes:

- `autoReconnect()` returns `{ start(), stop(), socket, attempts }`. Options: `onSocket`, `onOpen`, `onLoggedOut`, `onFatal`, `maxAttempts`, `baseDelayMs`, `maxDelayMs`, `jitter`, `logger`.
- It will not reconnect after `loggedOut` (401), and calls `onFatal` instead of reconnecting for `forbidden` (403) / `multideviceMismatch` (411).
- Register `sock.ev.on('creds.update', saveCreds)` inside `onSocket` so every new socket instance is wired.
- `getMessage` must return the **proto message content** (`key → message`), not the whole `WAMessage` wrapper. If you use `makeInMemoryStore()` or `makePersistentStore()`, back it with that store instead of the `Map` above.

### Recipe 2 — Reading incoming messages safely

```js
import { normalizeMessageContent, getContentType, jidNormalizedUser, isLidUser, resolveSenderPn } from '@vanzxy/baileys'

function extractText(content) {
    return content?.conversation
        ?? content?.extendedTextMessage?.text
        ?? content?.imageMessage?.caption
        ?? content?.videoMessage?.caption
        ?? content?.documentMessage?.caption
        ?? ''
}

sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return
    for (const m of messages) {
        if (!m.message || m.key.fromMe || m.isSystemNotification) continue

        const content = normalizeMessageContent(m.message)   // unwraps ephemeral / view-once / edited wrappers
        const kind    = getContentType(content)              // 'conversation', 'imageMessage', ...
        const text    = extractText(content).trim()
        const chat    = m.key.remoteJid
        const sender  = m.key.participant ?? m.key.remoteJid
        const number  = isLidUser(sender) ? await resolveSenderPn(sock, m) : jidNormalizedUser(sender)

        await sock.readMessages([m.key])
        // route on `text` / `kind` …
    }
})
```

Why the `normalizeMessageContent()` step matters: a message that is ephemeral, view-once or an edit arrives wrapped, and the text lives one or two levels down. Reading `m.message.conversation` directly silently misses all of those.

### Recipe 3 — A tiny command router

```js
const commands = new Map()
const command = (name, fn) => commands.set(name, fn)

command('ping', async ({ sock, m }) => {
    await sock.sendMessage(m.key.remoteJid, { text: 'pong' }, { quoted: m })
})

command('sticker', async ({ sock, m }) => {
    await sock.sendMessage(m.key.remoteJid, { text: 'Reply to an image first.' }, { quoted: m })
})

async function dispatch(ctx, text) {
    const prefix = '.'
    if (!text.startsWith(prefix)) return
    const [name, ...args] = text.slice(prefix.length).split(/\s+/)
    const fn = commands.get(name.toLowerCase())
    if (fn) await fn({ ...ctx, args })
}
```

If you would rather not hand-roll this, the optional [Bot Framework](#-bot-framework) already provides `bot.command('!ping', handler)` (exact match **or** prefix + whitespace, so `!sticker` does not match `!stickerset`), `bot.use(middleware)`, `bot.onText(handler)`, per-chat sessions, stats and an offline message queue.

### Recipe 4 — Interactive messages: send, then handle the reply

```js
import { Button } from '@vanzxy/baileys'

await new Button(sock)
    .setTitle('Konfirmasi')
    .setBody('Lanjutkan pesanan?')
    .setFooter('@vanzxy/baileys')
    .addReply('Ya', 'order_yes')
    .addReply('Tidak', 'order_no')
    .send(jid)
```

- `addReply(display_text, id)` requires **both** a label and a unique `id` — the builder throws a `TypeError` otherwise, because WhatsApp drops quick replies that have no id.
- A lone `single_select` (list) is sent as a legacy `listMessage`, because WhatsApp does not render it alone.
- When the user taps a button, the reply arrives as a normal `messages.upsert` event whose content is one of the standard protobuf response messages (for example `buttonsResponseMessage`, `listResponseMessage` or `interactiveResponseMessage`). Read the content type first with `getContentType(normalizeMessageContent(m.message))`, then pull the id out of the matching field. Because exact response shapes differ between client versions, log one real reply from your own account before relying on a field path.
- `build()` on `Button` throws if there is neither a button nor a Bloks widget; `ButtonV3` throws on a fourth button; `Carousel` throws above 10 cards or when a card has no media header.

### Recipe 5 — Groups

```js
const meta = await sock.groupMetadata(groupJid)
console.log(meta.subject, meta.participants.length, meta.addressingMode)

// create a group
const created = await sock.groupCreate('Tim Bot', ['628111111111@s.whatsapp.net'])

// add / remove / promote / demote — `action` is passed through as the protocol tag name
await sock.groupParticipantsUpdate(groupJid, ['628111111111@s.whatsapp.net'], 'add')
await sock.groupParticipantsUpdate(groupJid, ['628111111111@s.whatsapp.net'], 'promote')

// rename and lock down
await sock.groupUpdateSubject(groupJid, 'Tim Bot v2')
await sock.groupSettingUpdate(groupJid, 'announcement')       // only admins can send
await sock.groupSettingUpdate(groupJid, 'not_announcement')   // everyone can send

// mention everybody
await sock.sendMentionAll(groupJid, 'Rapat jam 9 ya')
```

Signatures from the shipped declarations: `groupCreate(subject, participants)`, `groupMetadata(jid)`, `groupParticipantsUpdate(jid, participants, action)`, `groupUpdateSubject(jid, subject)`, `groupSettingUpdate(jid, setting)`, `sendMentionAll(jid, text, options?)`. `groupSettingUpdate` and `groupParticipantsUpdate` forward their string argument as the XML tag of the query, so use the standard WhatsApp values (`add`, `remove`, `promote`, `demote`, `announcement`, `not_announcement`, `locked`, `unlocked`).

Other group helpers on the socket: `groupLeave`, `groupUpdateDescription`, `groupInviteCode`, `groupRevokeInvite`, `groupAcceptInvite`, `groupGetInviteInfo`, `groupToggleEphemeral`, `groupMemberAddMode`, `groupJoinApprovalMode`, `groupRequestParticipantsList`, `groupRequestParticipantsUpdate`, `groupFetchAllParticipating`.

In LID-addressed groups, `participants[].id` may be a LID. Use `GroupMetadata.addressingMode` to know which form the group uses, and the [LID / PN helpers](#-lid--pn-addressing) when you need a phone number.

`tagAll(sock, jid, text?, options?)` and `hideTag(sock, jid, text?, options?)` (module `tag`) build the mention list from the participants for you; `buildTagContent(participants, text?, { hide? })` returns `{ text, mentions }` if you want to send it yourself.

### Recipe 6 — Status, presence and profile

```js
// status broadcast: pass an ARRAY of recipient JIDs instead of a single jid
await sock.sendMessage([jidA, jidB], { text: 'Halo status 🍃' })

// presence
await sock.sendPresenceUpdate('composing', jid)   // typing…
await sock.sendPresenceUpdate('paused', jid)

// is this number on WhatsApp?
const result = await sock.onWhatsApp('628123456789')

// profile picture url
const url = await sock.profilePictureUrl(jid, 'image')
```

Use **either** the array-of-JIDs path **or** `Dugong.sendStatusWhatsApp(content, jids)` for a given status flow — not both. `sock.sendStatusMention(content, mentions, options?)` posts a status that mentions the given JIDs. The delay between status recipients is controlled by `statusBroadcastDelayMs` (default `1500`).

### Recipe 7 — Long texts, human-like sending, voice notes

```js
import { sendLongText, sendHumanized, splitText, whatsappify } from '@vanzxy/baileys'

// chunk long replies and optionally convert markdown to WhatsApp formatting
const res = await sendLongText(sock, jid, longString, { quoted: m, format: true, delayMs: 400 })
// res -> { ok, ids, error? }

// typing presence + length-based delay + per-chat send queue
await sendHumanized(sock, jid, { text: 'Sebentar ya…' })

splitText(longString, 3000)   // string[]
whatsappify('**bold** and *italic*')
```

`sendHumanized(sock, jid, content, humanOpts?, sendOptions?)` is signature-compatible with `sendMessage` for the first three arguments, so you can swap it in for noisy chats. `sendVoiceNote()` / `buildVoiceNoteContent()` convert to mono 16 kHz Opus/OGG and send as PTT; they need `fluent-ffmpeg` and an ffmpeg binary (see the hosting notes).

### Recipe 8 — Download, inspect and re-upload media

```js
import { downloadMediaMessage, getContentType, normalizeMessageContent } from '@vanzxy/baileys'

const content = normalizeMessageContent(m.message)
const kind = getContentType(content)       // 'imageMessage' | 'videoMessage' | 'audioMessage' | 'documentMessage' | 'stickerMessage' | …

if (['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'].includes(kind)) {
    const buffer = await downloadMediaMessage(m, 'buffer', {}, {
        logger: sock.logger,
        reuploadRequest: sock.updateMediaMessage
    })
    // buffer is decrypted media; write it to disk or re-send it
    await sock.sendMessage(m.key.remoteJid, { document: buffer, fileName: 'file.bin', mimetype: 'application/octet-stream' })
}
```

- Pass `reuploadRequest: sock.updateMediaMessage` so an expired media URL triggers a re-upload request to the sender instead of failing.
- For huge files prefer the stream form: `downloadContentFromMessage(content.videoMessage, 'video')` and pipe the async iterable to disk.
- Remote URLs passed to `sendMessage` as `{ url }` are capped at `DEFAULT_MAX_REMOTE_MEDIA_BYTES` (2 GiB); pass `maxContentLength: 0` in the media options to lift the cap.
- Thumbnails need one of `sharp`, `@napi-rs/image` or `jimp`; video thumbnails and audio conversion need `fluent-ffmpeg`. Without them, pass `jpegThumbnail` yourself.

### Recipe 9 — Anti-delete, search and auto-reply helpers

The utility modules `anti-delete`, `message-search` and `auto-reply` are shipped with full declarations — see the verbatim `.d.ts` in the [Utils type declarations](#7-type-declarations-verbatim). Typical wiring:

1. Create a `MessageStore` (`anti-delete`) with `maxMessagesPerChat`, `ttl` and `cleanupInterval`.
2. Feed it every `messages.upsert` message with `store.storeMessage(msg)`.
3. When a `messages.upsert` / `messages.update` event reports a revoke, look the original up with `store.getMessage(key)` (returns a `StoredMessage` with `isDeleted`, `deletedAt`, `deletedBy`).
4. Call `store.stopCleanup()` on shutdown so the interval timer does not keep the process alive.

`message-search` exposes text and regex search over cached messages with `SearchOptions` (`jid`, `fromDate`, `toDate`, `fromSender`, `fromMe`, `messageTypes`, `limit`, `caseSensitive`).

### Recipe 10 — Offline tests with the mock socket

```js
import { createMockSocket } from '@vanzxy/baileys'

const mock = createMockSocket()
myBotSetup(mock.sock)                              // your real bot code, unchanged
await mock.receiveText('628000000001@s.whatsapp.net', '!ping')
const out = await mock.waitForReply()
```

This keeps CI independent of a WhatsApp account. The mock does not exercise Signal encryption, media upload or any wire format — it only validates your routing and reply logic.

### Recipe 11 — Fetching external URLs with a timeout

```js
import { fetchWithTimeout, DEFAULT_FETCH_TIMEOUT_MS } from '@vanzxy/baileys'

const res = await fetchWithTimeout('https://example.com/api', { method: 'GET' }, 8000)
```

`fetchWithTimeout(url, init?, timeoutMs = 15000)` honours a caller-supplied `AbortSignal` too, and rejects with a `TimeoutError` on a stalled server. `DEFAULT_FETCH_TIMEOUT_MS` is `15000`.

### Disconnect codes cheat-sheet

`DisconnectReason` is exported from the package root. Several names share a numeric code (JavaScript enum aliasing), so branch on the number or on the helper functions rather than on a name alone.

| Code | Name(s) | Recommended action |
|---:|---|---|
| 401 | `loggedOut` | Session is invalid. Do **not** auto-reconnect; wipe auth and pair again. |
| 403 | `forbidden` | Treated as fatal by `autoReconnect` / `Bot` (`onFatal`). Investigate the account state. |
| 408 | `connectionLost`, `timedOut` | Reconnect with backoff. |
| 411 | `multideviceMismatch` | Treated as fatal by `autoReconnect` / `Bot` (`onFatal`). |
| 428 | `connectionClosed` | Reconnect with backoff. |
| 440 | `connectionReplaced` | Another session took over this account. Make sure only one process uses the auth store. |
| 500 | `badSession` | Auth state is probably corrupt. Restore a backup or re-pair. |
| 503 | `unavailableService` | Server-side. Retry later with backoff. |
| 515 | `restartRequired` | Normal after pairing — create a new socket. |

Helper functions (module `disconnect-reason`): `mapDisconnectReason()`, `isFatalDisconnect()`, `shouldClearAuth()`, `shouldReconnect()`, `getDisconnectInfo()`. Backoff helpers: `computeReconnectDelay()` and `createReconnectBackoff()` (full-jitter exponential backoff, 2 s base, 15 min cap).

### Hosting notes (VPS, containers and game-panel hosts)

- **One process per auth store.** Two processes writing the same folder or database is the usual cause of `Bad MAC`. When a panel restarts your server, make sure the old process has actually exited before the new one starts.
- **Node.js ≥ 20, ESM only.** Older versions are rejected via the `engines` field. In a CommonJS project use `await import('@vanzxy/baileys')`.
- **Persistent storage.** Keep `auth_info/` (or your SQLite file) on a volume that survives redeploys; losing it forces a re-pair. Keep it out of git and out of public backups.
- **ffmpeg.** Set `FFMPEG_PATH`, install `ffmpeg-static`, or put `ffmpeg` on `PATH`; the resolver in module `ffmpeg-path` (`setFfmpegPath()`, `resolveFfmpegPath()`, `requireFfmpegPath()`) checks those in that spirit. Panels frequently ship without ffmpeg.
- **Optional native modules.** `sharp`, `better-sqlite3` and `@roamhq/wrtc` ship native bindings; on locked-down hosts prefer the pure-JS fallbacks (`jimp`) and the file-based auth state unless you can install build tools.
- **Memory.** `makeInMemoryStore()` grows without bound on busy accounts — use `makePersistentStore()` with a SQLite/Redis adapter, raise `eventBufferTimeoutMs` only if you need to, and prune stale sender-key files with `pruneStaleAuthFiles()`.
- **History sync.** `syncFullHistory` defaults to `false`; normal history sync still runs. Opt in per socket if your bot genuinely needs the full archive.
- **Logging.** Wrap your logger with `secureLogger(base, opts)` and use `redactSecrets(value)` when logging objects that could contain keys or credentials.

### Security checklist

1. Encrypt auth at rest with `useEncryptedFileAuthState(folder, { password })` when the host is shared; supply the password through an environment variable, never in source.
2. Rate-limit pairing endpoints with `withPairingGuard(sock, { maxPerHour, globalMaxPerHour, minIntervalMs })` and QR display with `createQRGuard()`.
3. Run `verifyAuthIntegrity(folder, { secret })` on boot and keep dated `backupAuthState()` archives.
4. Use `secureLogout(sock, { authFolder, authFile, passes })` when you intentionally log out, so local key material is wiped.
5. Validate user-supplied JIDs and phone numbers with `validateE164()`, `phoneToJid()`, `jidNormalizedUser()` before using them.
6. Treat everything received from WhatsApp as untrusted input — including button ids, list ids and message text.
7. Respect WhatsApp's Terms of Service and the [Disclaimer](#-disclaimer): bulk or unsolicited messaging risks account restrictions.

### Experimental / unverified surface

These parts are shipped, but the changelogs state that they were verified statically (syntax checks and dependency-free tests) and **not** against a live WhatsApp client. Use them on throw-away accounts first.

| Area | Status |
|---|---|
| Voice calls (`VoipClient`, `ActiveCall`) | Experimental; needs `@roamhq/wrtc` and the bundled WASM engine. |
| `A2UI` / Bloks widgets, `Button.setBloksWidget()` | Client-side rendering unverified. |
| `AIRich` edits (`sendEdit`, `sendEditNative`), inline images, `addHTML` / `addBloks` | Behaviour depends on WhatsApp client version. |
| `meta-ai` (`askMetaAI`), `meta-ai-msmsg` | Experimental; the `msmsg` helpers are intentionally **unwired** (the socket still NACKs `msmsg`). |
| Username management | Relies on query ids captured from WA Web; a rotation shows up as `unexpected response structure`. |
| Special native-flow buttons (commerce/payment flows, `address_message`, `review_and_pay`, …) | Wire shapes follow observed traffic; rendering depends on account type and client. |
| `Album.setCaption()` | Client rendering unverified. |

### Glossary

| Term | Meaning |
|---|---|
| **JID** | WhatsApp identifier such as `628…@s.whatsapp.net`, `…@g.us`, `…@lid`, `…@newsletter`. |
| **PN** | Phone-number JID (`@s.whatsapp.net`). |
| **LID** | Opaque account id (`@lid`) used instead of a phone number in LID-addressed chats. |
| **Signal** | End-to-end encryption protocol; sessions and sender keys live in the auth state `keys` store. |
| **Sender key** | Group-chat encryption key distributed to each member (`lib/Signal/Group/`). |
| **Native flow** | Interactive-message mechanism behind modern WhatsApp buttons (`nativeFlowMessage`). |
| **Bloks** | Meta's server-driven UI format used by A2UI widgets. |
| **USync** | Query protocol for contacts, devices, status, usernames, LIDs and more. |
| **MEX** | GraphQL-style query transport used by newsletters and usernames. |
| **Dugong** | This fork's message-type router (`lib/Socket/dugong.js`). |
| **WAProto** | Generated protobuf definitions for WhatsApp's wire messages. |

### Where to report problems

Open an issue at [`github.com/vanzxysenpai/vanzxybaileys/issues`](https://github.com/vanzxysenpai/vanzxybaileys/issues) with your Node.js version, a minimal reproduction, and the `lastDisconnect.error` log when the problem is connection-related. For release-to-release differences, read the `CHANGELOG-*.md` files shipped inside the package and the version history on [npm](https://www.npmjs.com/package/@vanzxy/baileys).

---

<a id="complete-api-reference"></a>

## 📚 Complete API Reference

> **How this section was produced.** Everything below in this chapter was derived from the files shipped in the package itself (`lib/**/*.d.ts`, the JavaScript sources under `lib/`, and `package.json`) — not from any other fork's README. Signatures are copied from the shipped type declarations; method tables are read from the class bodies. Where the shipped declaration says `any`, the real runtime shape is whatever the JavaScript accepts — check the matching `.js` file. Features that the changelogs mark as unverified against a live WhatsApp client (VoIP, A2UI/Bloks, AIRich edge cases, `msmsg`) stay marked experimental here.

**Chapter map**

1. Package metadata (scripts, dependencies, export map)
2. Source tree map
3. Public symbol index (every exported name → module)
4. Socket method reference (per layer)
5. Builders method reference
6. Bot Framework method reference
7. Type declarations (verbatim `.d.ts`)

### 1. Package metadata

#### npm scripts

| Script | Command |
|---|---|
| `prestart` | `node ./VanzxyBanner.js` |
| `test` | `node tests/builders.test.mjs && node tests/defaults.test.mjs && node tests/jid-helpers.test.mjs && node tests/qr-terminal.test.mjs && node tests/additional-nodes.test.mjs && node tests/browser-alias.t…` |
| `gen-waproto-dts` | `node scripts/gen-waproto-dts.mjs` |
| `check` | `node scripts/check-syntax.mjs` |
| `smoke` | `node scripts/smoke.mjs` |
| `typecheck` | `tsc -p tests/types/tsconfig.json` |
| `prepublishOnly` | `node scripts/check-notice.mjs && npm run check && npm test` |
| `test:deps` | `node --test tests/airich-media-regression.test.js tests/event-buffer-pass-through.test.mjs tests/auth-utils.transaction-queue.test.js` |

#### Runtime dependencies

| Package | Range |
|---|---|
| `@adiwajshing/keyed-db` | `^0.2.4` |
| `@cacheable/node-cache` | `^1.4.0` |
| `@hapi/boom` | `^9.1.3` |
| `async-mutex` | `^0.5.0` |
| `fflate` | `^0.8.2` |
| `jimp` | `^1.6.1` |
| `libsignal` | `^6.0.0` |
| `long` | `^5.2.3` |
| `lru-cache` | `^11.2.6` |
| `music-metadata` | `^11.12.3` |
| `p-queue` | `^9.1.0` |
| `pino` | `^9.6.0` |
| `protobufjs` | `^7.5.6` |
| `ws` | `^8.19.0` |

#### Optional runtime dependency

| Package | Range |
|---|---|
| `whatsapp-rust-bridge` | `0.5.5` |

#### Peer dependencies (all optional)

| Package | Range | Optional |
|---|---|---|
| `@napi-rs/image` | `~1.12.0` | yes |
| `@roamhq/wrtc` | `*` | yes |
| `audio-decode` | `^2.2.3` | yes |
| `better-sqlite3` | `^11.0.0` | yes |
| `fluent-ffmpeg` | `^2.1.3` | yes |
| `ioredis` | `^5.4.1` | yes |
| `link-preview-js` | `^3.0.0` | yes |
| `mongodb` | `^6.10.0` | yes |
| `mysql2` | `^3.11.0` | yes |
| `node-webpmux` | `^3.2.0` | yes |
| `pg` | `^8.13.0` | yes |
| `sharp` | `*` | yes |
| `axios` | `^1.7.0` | yes |

#### `exports` map

| Subpath | Resolves to |
|---|---|
| `.` | `./lib/index.js` |
| `./lib/*` | `./lib/*` |
| `./WAProto` | `./WAProto/index.js` |
| `./WAProto/*` | `./WAProto/*` |
| `./package.json` | `./package.json` |

#### Published files

- `lib/**/*`
- `WAProto/**/*`
- `NOTICE.md`
- `LICENSE`
- `CHANGELOG-*.md`

### 2. Source tree map

Line counts are for the `.js` implementation files in each folder (type declaration files excluded).

| Folder | JS files | Lines | Notable files |
|---|---:|---:|---|
| `lib/` | 2 | 77 | `exports-extra.js` (50), `index.js` (27) |
| `lib/Builders/` | 14 | 5710 | `AIRich.js` (2495), `Button.js` (984), `shared.js` (816), `A2UI.js` (328) |
| `lib/Defaults/` | 2 | 197 | `index.js` (190), `version.js` (7) |
| `lib/Framework/` | 6 | 663 | `Bot.js` (241), `MediaManager.js` (163), `StatsManager.js` (121), `Context.js` (91) |
| `lib/Framework/Store/` | 1 | 75 | `SQLiteStore.js` (75) |
| `lib/Signal/` | 2 | 716 | `libsignal.js` (433), `lid-mapping.js` (283) |
| `lib/Signal/Group/` | 12 | 508 | `sender-key-state.js` (84), `group_cipher.js` (82), `sender-key-message.js` (66), `sender-key-distribution-message.js` (63) |
| `lib/Socket/` | 14 | 8800 | `messages-recv.js` (1852), `messages-send.js` (1572), `chats.js` (1332), `socket.js` (1036) |
| `lib/Socket/Client/` | 3 | 68 | `websocket.js` (54), `types.js` (11), `index.js` (3) |
| `lib/Store/` | 4 | 539 | `make-in-memory-store.js` (432), `make-ordered-dictionary.js` (79), `object-repository.js` (24), `index.js` (4) |
| `lib/Types/` | 18 | 224 | `State.js` (56), `Mex.js` (39), `index.js` (28), `Label.js` (25) |
| `lib/Utils/` | 93 | 20841 | `messages.js` (2313), `rich-messages.js` (1145), `process-message.js` (888), `chat-utils.js` (886) |
| `lib/VoIP/` | 7 | 3872 | `wasm-engine.js` (1215), `worker-bootstrap.js` (1043), `signaling.js` (625), `relay-transport.js` (560) |
| `lib/WABinary/` | 7 | 2421 | `constants.js` (1467), `generic-utils.js` (361), `decode.js` (262), `encode.js` (220) |
| `lib/WAM/` | 4 | 23017 | `constants.js` (22853), `encode.js` (150), `BinaryInfo.js` (10), `index.js` (4) |
| `lib/WAUSync/` | 3 | 195 | `USyncQuery.js` (143), `USyncUser.js` (48), `index.js` (4) |
| `lib/WAUSync/Protocols/` | 13 | 450 | `USyncDeviceProtocol.js` (63), `UsyncBotProfileProtocol.js` (63), `USyncContactProtocol.js` (52), `USyncStatusProtocol.js` (38) |
| `lib/assets/wasm/` | 2 | 278 | `worker-modules.js` (273), `loader.js` (5) |

Per-file index of `lib/Utils/`:

| File | Lines | Has `.d.ts` |
|---|---:|:---:|
| `MessageBuilder.js` | 3 | — |
| `PersistentStore.js` | 593 | — |
| `anti-delete.js` | 223 | ✅ |
| `auth-secure.js` | 792 | ✅ |
| `auth-utils.js` | 346 | ✅ |
| `auto-reconnect.js` | 207 | ✅ |
| `auto-reply.js` | 159 | ✅ |
| `bad-mac-handler.js` | 120 | ✅ |
| `baileys-event-stream.js` | 63 | ✅ |
| `browser-utils.js` | 30 | ✅ |
| `business.js` | 240 | ✅ |
| `button-helper-utils.js` | 281 | — |
| `button-sender.js` | 854 | — |
| `chat-control.js` | 232 | ✅ |
| `chat-history-helpers.js` | 72 | ✅ |
| `chat-utils.js` | 886 | ✅ |
| `companion-reg-client-utils.js` | 40 | ✅ |
| `connection-watchdog.js` | 75 | ✅ |
| `crypto.js` | 148 | ✅ |
| `decode-wa-message.js` | 317 | ✅ |
| `disconnect-reason.js` | 37 | ✅ |
| `event-buffer.js` | 644 | ✅ |
| `fetch-timeout.js` | 17 | ✅ |
| `ffmpeg-path.js` | 131 | ✅ |
| `generics.js` | 441 | ✅ |
| `group-metadata-cache.js` | 26 | ✅ |
| `group-status-detection.js` | 115 | — |
| `history.js` | 147 | ✅ |
| `html-app.js` | 98 | — |
| `html-multiplayer.js` | 91 | — |
| `humanizer.js` | 75 | ✅ |
| `identity-change-handler.js` | 50 | ✅ |
| `index.js` | 89 | ✅ |
| `jid-tools.js` | 79 | ✅ |
| `link-preview.js` | 85 | ✅ |
| `lock-manager.js` | 51 | ✅ |
| `logger.js` | 3 | ✅ |
| `lt-hash.js` | 27 | ✅ |
| `make-mutex.js` | 33 | ✅ |
| `media-messages.js` | 72 | ✅ |
| `media-set.js` | 183 | ✅ |
| `message-kind.js` | 140 | — |
| `message-retry-manager.js` | 265 | ✅ |
| `message-search.js` | 190 | ✅ |
| `messages-media.js` | 874 | ✅ |
| `messages.js` | 2313 | ✅ |
| `meta-ai-msmsg.js` | 132 | ✅ |
| `meta-ai.js` | 76 | ✅ |
| `migrate-auth-state.js` | 127 | ✅ |
| `mini-app.js` | 216 | — |
| `mock-socket.js` | 255 | ✅ |
| `modern-messages.js` | 498 | — |
| `native-flow.js` | 113 | — |
| `newsletter-status.js` | 653 | — |
| `noise-handler.js` | 201 | ✅ |
| `offline-node-processor.js` | 40 | ✅ |
| `pairing-utils.js` | 30 | ✅ |
| `passkey.js` | 12 | ✅ |
| `past-participants.js` | 41 | ✅ |
| `payment-detection.js` | 214 | — |
| `payment-guard.js` | 144 | — |
| `payment-messages.js` | 162 | — |
| `payment-utils.js` | 155 | — |
| `phone-utils.js` | 30 | ✅ |
| `pre-key-manager.js` | 106 | ✅ |
| `process-message.js` | 888 | ✅ |
| `qr-terminal.js` | 20 | ✅ |
| `reconnect-backoff.js` | 48 | ✅ |
| `reporting-utils.js` | 258 | ✅ |
| `rich-message-utils.js` | 445 | ✅ |
| `rich-messages.js` | 1145 | — |
| `scheduled-message.js` | 102 | — |
| `scheduling.js` | 141 | ✅ |
| `signal.js` | 201 | ✅ |
| `stanza-ack.js` | 38 | ✅ |
| `status-stickers.js` | 262 | — |
| `status.js` | 143 | ✅ |
| `sticker-pack-maker.js` | 113 | — |
| `stickerpack.js` | 324 | ✅ |
| `sync-action-utils.js` | 49 | ✅ |
| `tag.js` | 46 | ✅ |
| `tc-token-utils.js` | 163 | ✅ |
| `templates.js` | 152 | ✅ |
| `text-format.js` | 82 | ✅ |
| `text-tools.js` | 39 | ✅ |
| `use-cache-manager-auth-state.js` | 95 | ✅ |
| `use-multi-file-auth-state.js` | 210 | ✅ |
| `use-single-file-auth-state.js` | 118 | ✅ |
| `use-sqlite-auth-state.js` | 184 | ✅ |
| `username.js` | 60 | ✅ |
| `validate-connection.js` | 199 | ✅ |
| `vcard.js` | 106 | ✅ |
| `voice-note.js` | 48 | ✅ |

Per-file index of `lib/Socket/`:

| File | Lines | Has `.d.ts` |
|---|---:|:---:|
| `business.js` | 380 | ✅ |
| `chats.js` | 1332 | ✅ |
| `communities.js` | 460 | ✅ |
| `dugong.js` | 813 | ✅ |
| `groups.js` | 388 | ✅ |
| `index.js` | 40 | ✅ |
| `messages-recv.js` | 1852 | ✅ |
| `messages-send.js` | 1572 | ✅ |
| `mex-fallback.js` | 111 | ✅ |
| `mex.js` | 42 | ✅ |
| `newsletter-ext.js` | 271 | ✅ |
| `newsletter.js` | 335 | ✅ |
| `socket.js` | 1036 | ✅ |
| `username.js` | 168 | — |

### 3. Public symbol index

Every `export` found in the shipped declaration files (846 entries). Import any of them from the package root unless noted; modules under `lib/` can also be deep-imported through the `./lib/*` export-map entry. If a symbol is listed here but missing from your editor autocomplete, check that the module is re-exported from `lib/index.js` / `lib/exports-extra.js`.

<details>
<summary><code>Builders/index.d.ts</code> — 49 symbols</summary>

| Symbol | Kind |
|---|---|
| `A2UI` | class |
| `AIRich` | class |
| `AIRichError` | class |
| `AddInlineImageOptions` | interface |
| `AddTextOptions` | interface |
| `Album` | class |
| `AnyBloksNode` | interface |
| `AudioPlayerNode` | interface |
| `BaseBuilder` | abstract class |
| `BlockOptions` | interface |
| `BloksButtonNode` | interface |
| `BloksNode` | type |
| `BloksNodeBase` | interface |
| `BloksRef` | interface |
| `BottomSheetParams` | interface |
| `Button` | class |
| `ButtonV2` | class |
| `ButtonV3` | class |
| `CardBuilder` | class |
| `CardNode` | interface |
| `Carousel` | class |
| `CheckBoxNode` | interface |
| `ChoicePickerNode` | interface |
| `ColumnRowNode` | interface |
| `ContentValidationError` | class |
| `DateTimeInputNode` | interface |
| `DividerNode` | interface |
| `DuplicateIdError` | class |
| `Event` | class |
| `Expiring` | class |
| `IconNode` | interface |
| `ImageNode` | interface |
| `InvalidTargetError` | class |
| `ItemNotFoundError` | class |
| `LimitedTimeOfferParams` | interface |
| `ListNode` | interface |
| `MESSAGE_BUILDER_VERSION` | const |
| `ModalNode` | interface |
| `ORich` | class |
| `Poll` | class |
| `RowBuilder` | class |
| `SliderNode` | interface |
| `TabsNode` | interface |
| `TapTargetConfigurationParams` | interface |
| `TextFieldNode` | interface |
| `TextNode` | interface |
| `Toolkit` | class |
| `VideoNode` | interface |
| `tokenizeCodeForRich` | function |

</details>

<details>
<summary><code>Defaults/index.d.ts</code> — 39 symbols</summary>

| Symbol | Kind |
|---|---|
| `BIZ_BOT_SUPPORT_PAYLOAD` | const |
| `CALL_AUDIO_PREFIX` | const |
| `CALL_VIDEO_PREFIX` | const |
| `COMPANION_DEVICE_VERSION` | const |
| `DEFAULT_CACHE_TTLS` | namespace |
| `DEFAULT_CONNECTION_CONFIG` | namespace |
| `DEFAULT_MAX_REMOTE_MEDIA_BYTES` | const |
| `DEFAULT_ORIGIN` | const |
| `DEF_CALLBACK_PREFIX` | const |
| `DEF_TAG_PREFIX` | const |
| `DICT_VERSION` | const |
| `DONATE_URL` | const |
| `HISTORY_SYNC_PAUSED_TIMEOUT_MS` | const |
| `INITIAL_PREKEY_COUNT` | const |
| `KEY_BUNDLE_TYPE` | const |
| `LEXER_REGEX` | const |
| `LIBRARY_NAME` | const |
| `MEDIA_HKDF_KEY_MAPPING` | const |
| `MEDIA_KEYS` | const |
| `MEDIA_PATH_MAP` | const |
| `MIN_PREKEY_COUNT` | const |
| `MediaType` | type |
| `NEWSLETTER_MEDIA_PATH_MAP` | const |
| `NOISE_MODE` | const |
| `NOISE_WA_HEADER` | const |
| `PHONE_CONNECTION_CB` | const |
| `PLACEHOLDER_MAX_AGE_SECONDS` | const |
| `PROCESSABLE_HISTORY_TYPES` | const |
| `STATUS_EXPIRY_SECONDS` | const |
| `TimeMs` | namespace |
| `UNAUTHORIZED_CODES` | const |
| `UPLOAD_TIMEOUT` | const |
| `URL_REGEX` | const |
| `WA_ADV_ACCOUNT_SIG_PREFIX` | const |
| `WA_ADV_DEVICE_SIG_PREFIX` | const |
| `WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX` | const |
| `WA_ADV_HOSTED_DEVICE_SIG_PREFIX` | const |
| `WA_CERT_DETAILS` | namespace |
| `WA_DEFAULT_EPHEMERAL` | const |

</details>

<details>
<summary><code>Defaults/version.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `DEFAULT_WA_VERSION` | const |

</details>

<details>
<summary><code>Signal/Group/ciphertext-message.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `CiphertextMessage` | class |

</details>

<details>
<summary><code>Signal/Group/group-session-builder.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `GroupSessionBuilder` | class |

</details>

<details>
<summary><code>Signal/Group/group_cipher.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `GroupCipher` | class |

</details>

<details>
<summary><code>Signal/Group/keyhelper.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `generateSenderKey` | function |
| `generateSenderKeyId` | function |
| `generateSenderSigningKey` | function |

</details>

<details>
<summary><code>Signal/Group/sender-chain-key.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `SenderChainKey` | class |

</details>

<details>
<summary><code>Signal/Group/sender-key-distribution-message.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `SenderKeyDistributionMessage` | class |

</details>

<details>
<summary><code>Signal/Group/sender-key-message.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `SenderKeyMessage` | class |

</details>

<details>
<summary><code>Signal/Group/sender-key-name.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `SenderKeyName` | class |

</details>

<details>
<summary><code>Signal/Group/sender-key-record.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `SenderKeyRecord` | class |

</details>

<details>
<summary><code>Signal/Group/sender-key-state.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `SenderKeyState` | class |

</details>

<details>
<summary><code>Signal/Group/sender-message-key.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `SenderMessageKey` | class |

</details>

<details>
<summary><code>Signal/libsignal.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeLibSignalRepository` | function |

</details>

<details>
<summary><code>Signal/lid-mapping.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `LIDMappingStore` | class |

</details>

<details>
<summary><code>Socket/Client/types.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `AbstractSocketClient` | class |

</details>

<details>
<summary><code>Socket/Client/websocket.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `WebSocketClient` | class |

</details>

<details>
<summary><code>Socket/business.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeBusinessSocket` | function |

</details>

<details>
<summary><code>Socket/chats.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeChatsSocket` | function |

</details>

<details>
<summary><code>Socket/communities.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `extractCommunityMetadata` | function |
| `makeCommunitiesSocket` | function |

</details>

<details>
<summary><code>Socket/dugong.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `Dugong` | class |

</details>

<details>
<summary><code>Socket/groups.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `extractGroupMetadata` | function |
| `makeGroupsSocket` | function |
| `persistLidPnMappings` | function |

</details>

<details>
<summary><code>Socket/messages-recv.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeMessagesRecvSocket` | function |

</details>

<details>
<summary><code>Socket/messages-send.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeMessagesSocket` | function |

</details>

<details>
<summary><code>Socket/mex-fallback.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `NEWSLETTER_ID_ALTERNATES` | const |
| `isStaleQueryError` | function |
| `makeMexWithFallback` | function |

</details>

<details>
<summary><code>Socket/mex.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `executeWMexQuery` | function |

</details>

<details>
<summary><code>Socket/newsletter-ext.d.ts</code> — 7 symbols</summary>

| Symbol | Kind |
|---|---|
| `EXT_QUERY_IDS` | const |
| `NEWSLETTER_SERVER_ID_MAX` | const |
| `NEWSLETTER_SERVER_ID_MIN` | const |
| `extractNewsletterMessageMeta` | function |
| `makeNewsletterExtMethods` | function |
| `toNewsletterServerId` | function |
| `toNewsletterServerIds` | function |

</details>

<details>
<summary><code>Socket/newsletter.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeNewsletterSocket` | function |
| `triggerAutoFollow` | function |

</details>

<details>
<summary><code>Socket/socket.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeSocket` | function |

</details>

<details>
<summary><code>Store/make-in-memory-store.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeInMemoryStore` | function |
| `waChatKey` | function |
| `waLabelAssociationKey` | namespace |
| `waMessageID` | function |

</details>

<details>
<summary><code>Store/make-ordered-dictionary.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeOrderedDictionary` | function |

</details>

<details>
<summary><code>Store/object-repository.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `ObjectRepository` | class |

</details>

<details>
<summary><code>Types/Auth.d.ts</code> — 16 symbols</summary>

| Symbol | Kind |
|---|---|
| `AccountSettings` | type |
| `AuthenticationCreds` | type |
| `AuthenticationState` | type |
| `KeyPair` | type |
| `LIDMapping` | type |
| `LTHashState` | type |
| `ProtocolAddress` | type |
| `SignalAuthState` | type |
| `SignalCreds` | type |
| `SignalDataSet` | type |
| `SignalDataTypeMap` | type |
| `SignalIdentity` | type |
| `SignalKeyStore` | type |
| `SignalKeyStoreWithTransaction` | type |
| `SignedKeyPair` | type |
| `TransactionCapabilityOptions` | type |

</details>

<details>
<summary><code>Types/Bussines.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `DayOfWeekBussines` | type |
| `HoursDay` | type |
| `QuickReplyAction` | type |
| `UpdateBussinesProfileProps` | type |

</details>

<details>
<summary><code>Types/Call.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `WACallEvent` | type |
| `WACallUpdateType` | type |

</details>

<details>
<summary><code>Types/Chat.d.ts</code> — 19 symbols</summary>

| Symbol | Kind |
|---|---|
| `ALL_WA_PATCH_NAMES` | const |
| `BotListInfo` | type |
| `Chat` | type |
| `ChatModification` | type |
| `ChatMutation` | type |
| `ChatUpdate` | type |
| `InitialAppStateSyncOptions` | type |
| `InitialReceivedChatsState` | type |
| `LastMessageList` | type |
| `PresenceData` | interface |
| `WAPatchCreate` | type |
| `WAPatchName` | type |
| `WAPresence` | type |
| `WAPrivacyCallValue` | type |
| `WAPrivacyGroupAddValue` | type |
| `WAPrivacyMessagesValue` | type |
| `WAPrivacyOnlineValue` | type |
| `WAPrivacyValue` | type |
| `WAReadReceiptsValue` | type |

</details>

<details>
<summary><code>Types/Contact.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `Contact` | interface |

</details>

<details>
<summary><code>Types/Events.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `BaileysEvent` | type |
| `BaileysEventEmitter` | interface |
| `BaileysEventMap` | type |
| `BufferedEventData` | type |

</details>

<details>
<summary><code>Types/GroupMetadata.d.ts</code> — 7 symbols</summary>

| Symbol | Kind |
|---|---|
| `GroupMetadata` | interface |
| `GroupModificationResponse` | interface |
| `GroupParticipant` | type |
| `ParticipantAction` | type |
| `RequestJoinAction` | type |
| `RequestJoinMethod` | type |
| `WAGroupCreateResponse` | interface |

</details>

<details>
<summary><code>Types/Label.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `Label` | interface |
| `LabelActionBody` | interface |
| `LabelColor` | enum |

</details>

<details>
<summary><code>Types/LabelAssociation.d.ts</code> — 6 symbols</summary>

| Symbol | Kind |
|---|---|
| `ChatLabelAssociation` | interface |
| `ChatLabelAssociationActionBody` | interface |
| `LabelAssociation` | type |
| `LabelAssociationType` | enum |
| `MessageLabelAssociation` | interface |
| `MessageLabelAssociationActionBody` | interface |

</details>

<details>
<summary><code>Types/Message.d.ts</code> — 34 symbols</summary>

| Symbol | Kind |
|---|---|
| `AnyMediaMessageContent` | type |
| `AnyMessageContent` | type |
| `AnyRegularMessageContent` | type |
| `Contextable` | type |
| `Editable` | type |
| `Forwardable` | type |
| `MediaConnInfo` | type |
| `Mediaable` | type |
| `Mentionable` | type |
| `MessageGenerationOptionsFromContent` | type |
| `MessageUpsertType` | type |
| `MessageUserReceipt` | type |
| `MessageUserReceiptUpdate` | type |
| `MinimalMessage` | type |
| `MiscMessageGenerationOptions` | type |
| `ViewOnceable` | type |
| `WAContactMessage` | type |
| `WAContactsArrayMessage` | type |
| `WAContextInfo` | type |
| `WAGenericMediaMessage` | type |
| `WALocationMessage` | type |
| `WAMediaPayloadStream` | type |
| `WAMediaPayloadURL` | type |
| `WAMediaUpload` | type |
| `WAMediaUploadFunction` | type |
| `WAMediaUploadFunctionOpts` | type |
| `WAMediaUploadResult` | type |
| `WAMessage` | type |
| `WAMessageAddressingMode` | enum |
| `WAMessageContent` | type |
| `WAMessageKey` | type |
| `WAMessageUpdate` | type |
| `WATextMessage` | type |
| `WAUrlInfo` | type |

</details>

<details>
<summary><code>Types/Mex.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `QueryIds` | enum |
| `XWAPaths` | enum |

</details>

<details>
<summary><code>Types/Product.d.ts</code> — 14 symbols</summary>

| Symbol | Kind |
|---|---|
| `CatalogCollection` | type |
| `CatalogCursor` | type |
| `CatalogResult` | type |
| `CatalogStatus` | type |
| `GetCatalogOptions` | type |
| `OrderDetails` | type |
| `OrderPrice` | type |
| `OrderProduct` | type |
| `Product` | type |
| `ProductAvailability` | type |
| `ProductBase` | type |
| `ProductCreate` | type |
| `ProductCreateResult` | type |
| `ProductUpdate` | type |

</details>

<details>
<summary><code>Types/RichType.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `CodeHighlightType` | const |
| `RichSubMessageType` | const |

</details>

<details>
<summary><code>Types/Signal.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `SignalRepository` | type |
| `SignalRepositoryWithLIDStore` | interface |

</details>

<details>
<summary><code>Types/Socket.d.ts</code> — 6 symbols</summary>

| Symbol | Kind |
|---|---|
| `CacheStore` | type |
| `PatchedMessageWithRecipientJID` | type |
| `PossiblyExtendedCacheStore` | type |
| `SocketConfig` | type |
| `WABrowserDescription` | type |
| `WAVersion` | type |

</details>

<details>
<summary><code>Types/State.d.ts</code> — 8 symbols</summary>

| Symbol | Kind |
|---|---|
| `ConnectionState` | type |
| `NewChatMessageCapInfo` | type |
| `NewChatMessageCappingMVStatusType` | enum |
| `NewChatMessageCappingOTEStatusType` | enum |
| `NewChatMessageCappingStatusType` | enum |
| `ReachoutTimelockEnforcementType` | enum |
| `SyncState` | enum |
| `WAConnectionState` | type |

</details>

<details>
<summary><code>Types/USync.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncQueryProtocol` | interface |

</details>

<details>
<summary><code>Types/index.d.ts</code> — 7 symbols</summary>

| Symbol | Kind |
|---|---|
| `BrowsersMap` | type |
| `CurveKeyPair` | type |
| `DisconnectReason` | enum |
| `UserFacingSocketConfig` | type |
| `WABusinessHoursConfig` | type |
| `WABusinessProfile` | type |
| `WAInitResponse` | type |

</details>

<details>
<summary><code>Utils/anti-delete.d.ts</code> — 9 symbols</summary>

| Symbol | Kind |
|---|---|
| `DeletedMessageInfo` | interface |
| `MessageStore` | class |
| `MessageStoreOptions` | interface |
| `StoredMessage` | interface |
| `createAntiDeleteHandler` | const |
| `createAntiDeleteUpsertHandler` | const |
| `createMessageStoreHandler` | const |
| `getDeletedMessageKey` | const |
| `isDeleteMessage` | const |

</details>

<details>
<summary><code>Utils/auth-secure.d.ts</code> — 19 symbols</summary>

| Symbol | Kind |
|---|---|
| `BACKUP_MAGIC` | const |
| `ENC_MAGIC` | const |
| `backupAuthState` | function |
| `createQRGuard` | function |
| `createRateLimiter` | function |
| `decryptJSON` | function |
| `deriveKey` | function |
| `encryptJSON` | function |
| `isEncryptedPayload` | function |
| `redactSecrets` | function |
| `repairAuthState` | function |
| `restoreAuthState` | function |
| `secureLogger` | function |
| `secureLogout` | function |
| `useEncryptedFileAuthState` | function |
| `useEncryptedSingleFileAuthState` | function |
| `verifyAuthIntegrity` | function |
| `withPairingGuard` | function |
| `writeAuthIntegrity` | function |

</details>

<details>
<summary><code>Utils/auth-utils.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `addTransactionCapability` | function |
| `assertMeId` | function |
| `initAuthCreds` | function |
| `makeCacheableSignalKeyStore` | function |

</details>

<details>
<summary><code>Utils/auto-reconnect.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `AutoReconnectManager` | interface |
| `AutoReconnectOptions` | interface |
| `autoReconnect` | const |

</details>

<details>
<summary><code>Utils/auto-reply.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `AutoReplyHandler` | class |
| `AutoReplyOptions` | interface |
| `AutoReplyRule` | interface |
| `createAutoReply` | const |

</details>

<details>
<summary><code>Utils/bad-mac-handler.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `BadMacHandler` | class |
| `BadMacHandlerOptions` | interface |
| `isBadMacError` | const |
| `isSessionError` | const |

</details>

<details>
<summary><code>Utils/baileys-event-stream.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `captureEventStream` | const |
| `readAndEmitEventStream` | const |

</details>

<details>
<summary><code>Utils/browser-utils.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `Browsers` | namespace |
| `getPlatformId` | function |
| `isAndroidBrowser` | function |

</details>

<details>
<summary><code>Utils/business.d.ts</code> — 7 symbols</summary>

| Symbol | Kind |
|---|---|
| `parseCatalogNode` | function |
| `parseCollectionsNode` | function |
| `parseOrderDetailsNode` | function |
| `parseProductNode` | function |
| `toProductNode` | function |
| `uploadingNecessaryImages` | function |
| `uploadingNecessaryImagesOfProduct` | function |

</details>

<details>
<summary><code>Utils/chat-control.d.ts</code> — 10 symbols</summary>

| Symbol | Kind |
|---|---|
| `DISAPPEARING_DURATIONS` | const |
| `DisappearingDuration` | type |
| `PinnedMessage` | type |
| `PinnedMessagesManager` | class |
| `ReadReceiptConfig` | type |
| `ReadReceiptController` | type |
| `TypingIndicator` | class |
| `createPinnedMessagesManager` | const |
| `createReadReceiptController` | const |
| `createTypingIndicator` | const |

</details>

<details>
<summary><code>Utils/chat-history-helpers.d.ts</code> — 5 symbols</summary>

| Symbol | Kind |
|---|---|
| `InMemoryStoreLike` | interface |
| `copyNForward` | const |
| `getLastMessageInChat` | const |
| `getOldestMessageInChat` | const |
| `uploadMediaToWhatsApp` | const |

</details>

<details>
<summary><code>Utils/chat-utils.d.ts</code> — 16 symbols</summary>

| Symbol | Kind |
|---|---|
| `MAX_SYNC_ATTEMPTS` | const |
| `chatModificationToAppPatch` | function |
| `decodePatches` | function |
| `decodeSyncdMutations` | function |
| `decodeSyncdPatch` | function |
| `decodeSyncdSnapshot` | function |
| `downloadExternalBlob` | function |
| `downloadExternalPatch` | function |
| `encodeSyncdPatch` | function |
| `ensureLTHashStateVersion` | function |
| `extractSyncdPatches` | function |
| `isAppStateSyncIrrecoverable` | function |
| `isMissingKeyError` | function |
| `makeLtHashGenerator` | function |
| `newLTHashState` | function |
| `processSyncAction` | function |

</details>

<details>
<summary><code>Utils/companion-reg-client-utils.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `CompanionWebClientType` | const |
| `buildPairingQRData` | function |
| `getCompanionPlatformId` | function |
| `getCompanionWebClientType` | function |

</details>

<details>
<summary><code>Utils/connection-watchdog.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `ConnectionWatchdogOptions` | interface |
| `setupConnectionWatchdog` | function |

</details>

<details>
<summary><code>Utils/crypto.d.ts</code> — 16 symbols</summary>

| Symbol | Kind |
|---|---|
| `Curve` | namespace |
| `aesDecrypt` | function |
| `aesDecryptCTR` | function |
| `aesDecryptGCM` | function |
| `aesDecryptWithIV` | function |
| `aesEncrypWithIV` | function |
| `aesEncrypt` | function |
| `aesEncryptCTR` | function |
| `aesEncryptGCM` | function |
| `derivePairingCodeKey` | function |
| `generateSignalPubKey` | function |
| `hkdf` | let |
| `hmacSign` | function |
| `md5` | let |
| `sha256` | function |
| `signedKeyPair` | function |

</details>

<details>
<summary><code>Utils/decode-wa-message.d.ts</code> — 10 symbols</summary>

| Symbol | Kind |
|---|---|
| `ACCOUNT_RESTRICTED_TEXT` | const |
| `DECRYPTION_RETRY_CONFIG` | namespace |
| `MISSING_KEYS_ERROR_TEXT` | const |
| `NACK_REASONS` | namespace |
| `NO_MESSAGE_FOUND_ERROR_TEXT` | const |
| `SERVER_ERROR_CODES` | namespace |
| `decodeMessageNode` | function |
| `decryptMessageNode` | function |
| `extractAddressingContext` | function |
| `getDecryptionJid` | function |

</details>

<details>
<summary><code>Utils/disconnect-reason.d.ts</code> — 7 symbols</summary>

| Symbol | Kind |
|---|---|
| `DisconnectReasonName` | type |
| `getDisconnectInfo` | const |
| `isFatalDisconnect` | const |
| `isRateLimited` | const |
| `mapDisconnectReason` | const |
| `shouldClearAuth` | const |
| `shouldReconnect` | const |

</details>

<details>
<summary><code>Utils/event-buffer.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeEventBuffer` | function |

</details>

<details>
<summary><code>Utils/fetch-timeout.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `DEFAULT_FETCH_TIMEOUT_MS` | const |
| `fetchWithTimeout` | function |

</details>

<details>
<summary><code>Utils/ffmpeg-path.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `ffmpegInstallHint` | const |
| `requireFfmpegPath` | const |
| `resolveFfmpegPath` | const |
| `setFfmpegPath` | const |

</details>

<details>
<summary><code>Utils/generics.d.ts</code> — 32 symbols</summary>

| Symbol | Kind |
|---|---|
| `BufferJSON` | namespace |
| `DEFAULT_VERSION_SOURCE_URL` | const |
| `bindWaitForConnectionUpdate` | function |
| `bindWaitForEvent` | function |
| `bytesToCrockford` | function |
| `debouncedTimeout` | function |
| `delay` | function |
| `delayCancellable` | function |
| `encodeBigEndian` | function |
| `encodeNewsletterMessage` | function |
| `encodeWAMessage` | function |
| `fetchBestWaVersion` | function |
| `fetchLatestBaileysVersion` | function |
| `fetchLatestWaWebVersion` | function |
| `generateMdTagPrefix` | function |
| `generateMessageID` | function |
| `generateMessageIDV2` | function |
| `generateParticipantHashV2` | function |
| `generateRegistrationId` | function |
| `getCallStatusFromNode` | function |
| `getCodeFromWSError` | function |
| `getErrorCodeFromStreamError` | function |
| `getKeyAuthor` | function |
| `getStatusFromReceiptType` | function |
| `isStringNullOrEmpty` | function |
| `isWABusinessPlatform` | function |
| `promiseTimeout` | function |
| `toNumber` | function |
| `trimUndefined` | function |
| `unixTimestampSeconds` | function |
| `unpadRandomMax16` | function |
| `writeRandomPadMax16` | function |

</details>

<details>
<summary><code>Utils/group-metadata-cache.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `GROUP_ADDRESSING_MODES` | const |
| `describeUnusableGroupMetadata` | const |
| `isUsableGroupMetadata` | const |

</details>

<details>
<summary><code>Utils/history.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `downloadAndProcessHistorySyncNotification` | function |
| `downloadHistory` | function |
| `getHistoryMsg` | function |
| `processHistoryMessage` | function |

</details>

<details>
<summary><code>Utils/humanizer.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `HumanizeOptions` | interface |
| `sendHumanized` | const |

</details>

<details>
<summary><code>Utils/identity-change-handler.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `handleIdentityChange` | function |

</details>

<details>
<summary><code>Utils/jid-tools.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `getLidForPhone` | const |
| `getPhoneNumber` | const |
| `resolveSenderPn` | const |

</details>

<details>
<summary><code>Utils/link-preview.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `getUrlInfo` | function |

</details>

<details>
<summary><code>Utils/lock-manager.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `LockManager` | type |
| `LockRef` | type |
| `makeLockManager` | const |

</details>

<details>
<summary><code>Utils/logger.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `ILogger` | interface |

</details>

<details>
<summary><code>Utils/lt-hash.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `LT_HASH_ANTI_TAMPERING` | let |

</details>

<details>
<summary><code>Utils/make-mutex.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeKeyedMutex` | function |
| `makeMutex` | function |

</details>

<details>
<summary><code>Utils/media-messages.d.ts</code> — 5 symbols</summary>

| Symbol | Kind |
|---|---|
| `changeprofileFull` | const |
| `generatePP` | const |
| `generateProfilePictureFP` | const |
| `generateProfilePictureFull` | const |
| `generateProfilePicturee` | const |

</details>

<details>
<summary><code>Utils/media-set.d.ts</code> — 6 symbols</summary>

| Symbol | Kind |
|---|---|
| `groupLabel` | const |
| `groupSetMemberLabel` | const |
| `groupStatus` | const |
| `groupStatusV2` | const |
| `updateProfilePictureFull` | const |
| `updateProfilePictureFull2` | const |

</details>

<details>
<summary><code>Utils/message-retry-manager.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `MessageRetryManager` | class |
| `RetryReason` | const |

</details>

<details>
<summary><code>Utils/message-search.d.ts</code> — 10 symbols</summary>

| Symbol | Kind |
|---|---|
| `MessageSearchManager` | class |
| `RegexSearchOptions` | interface |
| `SearchMessageType` | type |
| `SearchOptions` | interface |
| `SearchResult` | interface |
| `calculateRelevance` | const |
| `createMessageSearch` | const |
| `extractMessageText` | const |
| `searchMessages` | const |
| `searchMessagesRegex` | const |

</details>

<details>
<summary><code>Utils/messages-media.d.ts</code> — 28 symbols</summary>

| Symbol | Kind |
|---|---|
| `DEF_MEDIA_HOST` | const |
| `decodeMediaRetryNode` | function |
| `decryptMediaRetryData` | function |
| `downloadContentFromMessage` | function |
| `downloadEncryptedContent` | function |
| `encodeBase64EncodedStringForUpload` | function |
| `encryptMediaRetryRequest` | function |
| `encryptedStream` | function |
| `extensionForMediaMessage` | function |
| `extractImageThumb` | function |
| `extractVideoThumb` | function |
| `generateProfilePicture` | function |
| `generateThumbnail` | function |
| `getAudioDuration` | function |
| `getAudioWaveform` | function |
| `getHttpStream` | function |
| `getImageProcessingLibrary` | function |
| `getMediaKeys` | function |
| `getRawMediaUploadData` | function |
| `getStatusCodeForMediaRetry` | function |
| `getStream` | function |
| `getUrlFromDirectPath` | function |
| `getWAUploadToServer` | function |
| `hkdfInfoKey` | function |
| `mediaMessageSHA256B64` | function |
| `toBuffer` | function |
| `toReadable` | function |
| `uploadWithNodeHttp` | function |

</details>

<details>
<summary><code>Utils/messages.d.ts</code> — 27 symbols</summary>

| Symbol | Kind |
|---|---|
| `aggregateMessageKeysNotFromMe` | function |
| `assertMediaContent` | function |
| `downloadMediaMessage` | function |
| `extractMessageContent` | function |
| `extractUrlFromText` | function |
| `generateForwardMessageContent` | function |
| `generateLinkPreviewIfRequired` | function |
| `generateWAMessage` | function |
| `generateWAMessageContent` | function |
| `generateWAMessageFromContent` | function |
| `getAggregateResponsesInEventMessage` | function |
| `getAggregateVotesInPollMessage` | function |
| `getContentType` | function |
| `getDevice` | function |
| `hasNonNullishProperty` | function |
| `hasOptionalProperty` | function |
| `hasValidAlbumMedia` | function |
| `hasValidCarouselHeader` | function |
| `hasValidInteractiveHeader` | function |
| `normalizeMessageContent` | function |
| `prepareDisappearingMessageSettingContent` | function |
| `prepareWAMessageMedia` | function |
| `shouldIncludeBizBinaryNode` | function |
| `updateMessageWithEventResponse` | function |
| `updateMessageWithPollUpdate` | function |
| `updateMessageWithReaction` | function |
| `updateMessageWithReceipt` | function |

</details>

<details>
<summary><code>Utils/meta-ai-msmsg.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `MsmsgKey` | interface |
| `decodeDecryptedMsmsgMessage` | const |
| `decryptMsmsgBotMessage` | const |

</details>

<details>
<summary><code>Utils/meta-ai.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `AskMetaAIOptions` | interface |
| `AskMetaAIResult` | interface |
| `askMetaAI` | const |

</details>

<details>
<summary><code>Utils/migrate-auth-state.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `ALL_TYPES` | const |
| `MigrateAuthStateOptions` | type |
| `MigrateAuthStateResult` | type |
| `migrateAuthState` | function |

</details>

<details>
<summary><code>Utils/mock-socket.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `MockSocket` | interface |
| `MockSocketOptions` | interface |
| `createMockSocket` | const |

</details>

<details>
<summary><code>Utils/noise-handler.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeNoiseHandler` | function |

</details>

<details>
<summary><code>Utils/offline-node-processor.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `makeOfflineNodeProcessor` | function |

</details>

<details>
<summary><code>Utils/pairing-utils.d.ts</code> — 5 symbols</summary>

| Symbol | Kind |
|---|---|
| `formatPairingCode` | const |
| `isCustomPairingError` | const |
| `isRateLimitError` | const |
| `normalizePairingCode` | const |
| `pairingErrorCode` | const |

</details>

<details>
<summary><code>Utils/passkey.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `PasskeyNotificationType` | type |
| `PasskeyRequestState` | type |
| `getPasskeyRequestState` | const |

</details>

<details>
<summary><code>Utils/past-participants.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `ProcessedPastParticipant` | interface |
| `ProcessedPastParticipants` | interface |
| `hasPastParticipants` | const |
| `processPastParticipants` | const |

</details>

<details>
<summary><code>Utils/phone-utils.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `jidToPhone` | const |
| `phoneToJid` | const |
| `validateE164` | const |

</details>

<details>
<summary><code>Utils/pre-key-manager.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `PreKeyManager` | class |

</details>

<details>
<summary><code>Utils/process-message.d.ts</code> — 7 symbols</summary>

| Symbol | Kind |
|---|---|
| `cleanMessage` | function |
| `decryptEventResponse` | function |
| `decryptMessageEdit` | function |
| `decryptPollVote` | function |
| `getChatId` | function |
| `isRealMessage` | function |
| `shouldIncrementChatUnread` | function |

</details>

<details>
<summary><code>Utils/qr-terminal.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `printQRIfNecessaryListener` | const |

</details>

<details>
<summary><code>Utils/reconnect-backoff.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `ReconnectBackoffOptions` | interface |
| `computeReconnectDelay` | function |
| `createReconnectBackoff` | function |

</details>

<details>
<summary><code>Utils/reporting-utils.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `getMessageReportingToken` | function |
| `shouldIncludeReportingToken` | function |

</details>

<details>
<summary><code>Utils/rich-message-utils.d.ts</code> — 6 symbols</summary>

| Symbol | Kind |
|---|---|
| `botMetadataCertificate` | function |
| `botMetadataSignature` | function |
| `prepareRichResponseMessage` | function |
| `toUnified` | function |
| `tokenizeCode` | function |
| `wrapToBotForwardedMessage` | function |

</details>

<details>
<summary><code>Utils/scheduling.d.ts</code> — 6 symbols</summary>

| Symbol | Kind |
|---|---|
| `MessageScheduler` | class |
| `RepeatOptions` | interface |
| `ScheduledMessage` | interface |
| `ScheduledMessageStatus` | type |
| `SchedulerOptions` | interface |
| `createMessageScheduler` | const |

</details>

<details>
<summary><code>Utils/signal.d.ts</code> — 10 symbols</summary>

| Symbol | Kind |
|---|---|
| `createSignalIdentity` | function |
| `extractDeviceJids` | function |
| `extractE2ESessionFromRetryReceipt` | function |
| `generateOrGetPreKeys` | function |
| `getNextPreKeys` | function |
| `getNextPreKeysNode` | function |
| `getPreKeys` | function |
| `parseAndInjectE2ESessions` | function |
| `xmppPreKey` | function |
| `xmppSignedPreKey` | function |

</details>

<details>
<summary><code>Utils/stanza-ack.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `buildAckStanza` | function |

</details>

<details>
<summary><code>Utils/status.d.ts</code> — 15 symbols</summary>

| Symbol | Kind |
|---|---|
| `MediaStatusOptions` | type |
| `STATUS_BACKGROUNDS` | const |
| `STATUS_BROADCAST_JID` | const |
| `STATUS_FONTS` | const |
| `StatusFont` | type |
| `StatusHelper` | const |
| `StatusMusicInfo` | interface |
| `TextStatusOptions` | type |
| `createAudioStatus` | const |
| `createImageStatus` | const |
| `createTextStatus` | const |
| `createVideoStatus` | const |
| `generateStatusMessageId` | const |
| `getStatusJid` | const |
| `withMusicAttribution` | const |

</details>

<details>
<summary><code>Utils/stickerpack.d.ts</code> — 11 symbols</summary>

| Symbol | Kind |
|---|---|
| `ItsliaaaStickerInput` | type |
| `ItsliaaaStickerPackInput` | type |
| `ItsliaaaStickerPackOptions` | type |
| `STICKER_PACK_MESSAGE_TYPE` | const |
| `buildStickerPackProto` | const |
| `convertToWebP` | const |
| `generateStickerPackId` | const |
| `isAnimatedWebP` | const |
| `isLottieBuffer` | const |
| `isWebPBuffer` | const |
| `prepareStickerPackMessageItsliaaa` | const |

</details>

<details>
<summary><code>Utils/sync-action-utils.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `emitSyncActionResults` | function |
| `processContactAction` | function |

</details>

<details>
<summary><code>Utils/tag.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `TagBuildOptions` | interface |
| `buildTagContent` | const |
| `hideTag` | const |
| `tagAll` | const |

</details>

<details>
<summary><code>Utils/tc-token-utils.d.ts</code> — 9 symbols</summary>

| Symbol | Kind |
|---|---|
| `TC_TOKEN_INDEX_KEY` | const |
| `buildMergedTcTokenIndexWrite` | function |
| `buildTcTokenFromJid` | function |
| `isTcTokenExpired` | function |
| `readTcTokenIndex` | function |
| `resolveIssuanceJid` | function |
| `resolveTcTokenJid` | function |
| `shouldSendNewTcToken` | function |
| `storeTcTokensFromIqResult` | function |

</details>

<details>
<summary><code>Utils/templates.d.ts</code> — 7 symbols</summary>

| Symbol | Kind |
|---|---|
| `MessageTemplate` | interface |
| `PRESET_TEMPLATES` | const |
| `TemplateData` | type |
| `TemplateManager` | class |
| `TemplateVariable` | interface |
| `createTemplateManager` | const |
| `renderTemplate` | const |

</details>

<details>
<summary><code>Utils/text-format.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `DEFAULT_TEXT_PART_LENGTH` | const |
| `sendLongText` | const |
| `splitText` | const |
| `whatsappify` | const |

</details>

<details>
<summary><code>Utils/text-tools.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `extractGroupInviteCode` | const |
| `joinGroupViaLink` | const |
| `parseMentions` | const |

</details>

<details>
<summary><code>Utils/use-cache-manager-auth-state.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `CacheManagerStore` | type |
| `makeCacheManagerAuthState` | const |
| `useCacheManagerAuthState` | const |

</details>

<details>
<summary><code>Utils/use-multi-file-auth-state.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `useMultiFileAuthState` | function |

</details>

<details>
<summary><code>Utils/use-single-file-auth-state.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `useSingleFileAuthState` | function |

</details>

<details>
<summary><code>Utils/use-sqlite-auth-state.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `useSqliteAuthState` | function |

</details>

<details>
<summary><code>Utils/username.d.ts</code> — 9 symbols</summary>

| Symbol | Kind |
|---|---|
| `USERNAME_MAX_LENGTH` | const |
| `USERNAME_MIN_LENGTH` | const |
| `USERNAME_PIN_LENGTH` | const |
| `UsernameValidationError` | const |
| `UsernameValidationErrorType` | type |
| `displayUsername` | const |
| `isUsernamePin` | const |
| `stripUsernamePrefix` | const |
| `validateUsername` | const |

</details>

<details>
<summary><code>Utils/validate-connection.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `configureSuccessfulPairing` | function |
| `encodeSignedDeviceIdentity` | function |
| `generateLoginNode` | function |
| `generateRegistrationNode` | function |

</details>

<details>
<summary><code>Utils/vcard.d.ts</code> — 13 symbols</summary>

| Symbol | Kind |
|---|---|
| `ContactAddress` | interface |
| `ContactData` | interface |
| `ContactEmail` | interface |
| `ContactPhone` | interface |
| `ContactUrl` | interface |
| `createContactCard` | const |
| `createContactCards` | const |
| `escapeVCard` | const |
| `formatPhone` | const |
| `generateVCard` | const |
| `generateVCards` | const |
| `parseVCard` | const |
| `quickContact` | const |

</details>

<details>
<summary><code>Utils/voice-note.d.ts</code> — 5 symbols</summary>

| Symbol | Kind |
|---|---|
| `MAX_VOICE_NOTE_BYTES` | const |
| `VoiceNoteOptions` | interface |
| `buildVoiceNoteContent` | const |
| `isOggBuffer` | const |
| `sendVoiceNote` | const |

</details>

<details>
<summary><code>VoIP/audio-feeder.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `AudioFeeder` | class |

</details>

<details>
<summary><code>VoIP/relay-transport.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `RelayListUpdatePayload` | type |
| `RelayRtcTransport` | class |
| `RelayTransportConfig` | type |
| `RelayTransportStats` | type |

</details>

<details>
<summary><code>VoIP/types.d.ts</code> — 6 symbols</summary>

| Symbol | Kind |
|---|---|
| `AudioConfig` | type |
| `CallEvents` | type |
| `CallOptions` | type |
| `CallState` | const |
| `RelayListUpdate` | type |
| `VoipSdkConfig` | type |

</details>

<details>
<summary><code>VoIP/wasm-engine.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `WasmAudioConfig` | type |
| `WasmEngine` | class |
| `WasmEngineCallbacks` | type |
| `WasmEngineConfig` | type |

</details>

<details>
<summary><code>WABinary/constants.d.ts</code> — 17 symbols</summary>

| Symbol | Kind |
|---|---|
| `BASH_KEYWORDS` | const |
| `CMD_KEYWORDS` | const |
| `CPP_KEYWORDS` | const |
| `CSHARP_KEYWORDS` | const |
| `CSS_KEYWORDS` | const |
| `C_KEYWORDS` | const |
| `DOUBLE_BYTE_TOKENS` | const |
| `GO_KEYWORDS` | const |
| `HTML_KEYWORDS` | const |
| `JS_KEYWORDS` | const |
| `LANGUAGE_KEYWORDS` | const |
| `POWERSHELL_KEYWORDS` | const |
| `PYTHON_KEYWORDS` | const |
| `RUST_KEYWORDS` | const |
| `SINGLE_BYTE_TOKENS` | const |
| `TAGS` | namespace |
| `TOKEN_MAP` | const |

</details>

<details>
<summary><code>WABinary/decode.d.ts</code> — 3 symbols</summary>

| Symbol | Kind |
|---|---|
| `decodeBinaryNode` | function |
| `decodeDecompressedBinaryNode` | function |
| `decompressingIfRequired` | function |

</details>

<details>
<summary><code>WABinary/encode.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `encodeBinaryNode` | function |

</details>

<details>
<summary><code>WABinary/generic-utils.d.ts</code> — 13 symbols</summary>

| Symbol | Kind |
|---|---|
| `assertNodeErrorFree` | function |
| `binaryNodeToString` | function |
| `getAllBinaryNodeChildren` | function |
| `getBinaryFilteredButtons` | function |
| `getBinaryNodeChild` | function |
| `getBinaryNodeChildBuffer` | function |
| `getBinaryNodeChildString` | function |
| `getBinaryNodeChildUInt` | function |
| `getBinaryNodeChildren` | function |
| `getBinaryNodeFilter` | function |
| `getBinaryNodeMessages` | function |
| `getBizBinaryNode` | function |
| `reduceBinaryNodeToDictionary` | function |

</details>

<details>
<summary><code>WABinary/jid-utils.d.ts</code> — 27 symbols</summary>

| Symbol | Kind |
|---|---|
| `LOCATION_BROADCAST_JID` | const |
| `META_AI_JID` | const |
| `OFFICIAL_BIZ_JID` | const |
| `PSA_WID` | const |
| `SERVER_JID` | const |
| `STORIES_JID` | const |
| `S_WHATSAPP_NET` | const |
| `WAJIDDomains` | const |
| `areJidsSameUser` | function |
| `getServerFromDomainType` | function |
| `isHostedLidUser` | function |
| `isHostedPnUser` | function |
| `isJidBot` | function |
| `isJidBroadcast` | function |
| `isJidGroup` | function |
| `isJidLocationBroadcast` | function |
| `isJidMetaAI` | function |
| `isJidMetaAi` | function |
| `isJidNewsletter` | function |
| `isJidStatusBroadcast` | function |
| `isJidUser` | function |
| `isLidUser` | function |
| `isPnUser` | function |
| `jidDecode` | function |
| `jidEncode` | function |
| `jidNormalizedUser` | function |
| `transferDevice` | function |

</details>

<details>
<summary><code>WABinary/types.d.ts</code> — 4 symbols</summary>

| Symbol | Kind |
|---|---|
| `BinaryNode` | type |
| `BinaryNodeAttributes` | type |
| `BinaryNodeCodingOptions` | type |
| `BinaryNodeData` | type |

</details>

<details>
<summary><code>WAM/BinaryInfo.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `BinaryInfo` | class |

</details>

<details>
<summary><code>WAM/encode.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `encodeWAM` | function |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncBusinessProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncBusinessProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncContactProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncContactProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncDeviceProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncDeviceProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncDisappearingModeProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncDisappearingModeProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncFeatureProtocol.d.ts</code> — 2 symbols</summary>

| Symbol | Kind |
|---|---|
| `USYNC_FEATURES` | const |
| `USyncFeatureProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncPictureProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncPictureProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncSidelistProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncSidelistProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncStatusProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncStatusProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncTextStatusProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncTextStatusProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/USyncUsernameProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncUsernameProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/UsyncBotProfileProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncBotProfileProtocol` | class |

</details>

<details>
<summary><code>WAUSync/Protocols/UsyncLIDProtocol.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncLIDProtocol` | class |

</details>

<details>
<summary><code>WAUSync/USyncQuery.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncQuery` | class |

</details>

<details>
<summary><code>WAUSync/USyncUser.d.ts</code> — 1 symbols</summary>

| Symbol | Kind |
|---|---|
| `USyncUser` | class |

</details>

### 4. Socket method reference

`makeWASocket()` composes the layers below (`socket` → `chats` → `messages-recv` → `messages-send` → `groups` → `newsletter` → `business` → `communities` → `username`). Every method of an inner layer is available on the final `sock` object. The tables list only the members each layer introduces (members already shown for an inner layer are not repeated) and their parameter lists, read from the shipped declarations. Parameter types are mostly `any` in the declarations; consult the linked `.js` for exact accepted shapes.


#### `lib/Socket/socket.js` — 22 members introduced by this layer

| Member | Parameters |
|---|---|
| `generateMessageTag` | `` |
| `query` | `node: any, timeoutMs: any` |
| `waitForMessage` | `msgId: any, timeoutMs?: any` |
| `waitForSocketOpen` | `` |
| `sendRawMessage` | `data: any` |
| `sendNode` | `frame: any` |
| `logout` | `msg: any` |
| `end` | `error: any` |
| `registerSocketEndHandler` | `handler: any` |
| `onUnexpectedError` | `err: any, msg: any` |
| `uploadPreKeys` | `count?: number` |
| `uploadPreKeysToServerIfRequired` | `` |
| `digestKeyBundle` | `` |
| `rotateSignedPreKey` | `` |
| `requestPairingCode` | `phoneNumber: any, customPairingCode: any` |
| `sendUnifiedSession` | `` |
| `waitForConnectionUpdate` | `check: any, timeoutMs: any` |
| `sendWAMBuffer` | `wamBuffer: any` |
| `executeUSyncQuery` | `usyncQuery: any` |
| `onWhatsApp` | `...phoneNumber: any[]` |
| `fetchAccountReachoutTimelock` | `` |
| `fetchNewChatMessageCap` | `` |

#### `lib/Socket/chats.js` — 41 members introduced by this layer

| Member | Parameters |
|---|---|
| `findUserId` | `pnLid: any` |
| `createCallLink` | `type: any, event: any, timeoutMs: any` |
| `getBotListV2` | `` |
| `fetchPrivacySettings` | `force?: boolean` |
| `upsertMessage` | `...args: any[]` |
| `appPatch` | `patchCreate: any` |
| `sendPresenceUpdate` | `type: any, toJid: any` |
| `presenceSubscribe` | `toJid: any` |
| `profilePictureUrl` | `jid: any, type?: string, timeoutMs?: number, shouldIncludeTcToken?: boolean` |
| `fetchBlocklist` | `` |
| `fetchStatus` | `...jids: any[]` |
| `fetchDisappearingDuration` | `...jids: any[]` |
| `updateProfilePicture` | `jid: any, content: any, dimensions: any` |
| `removeProfilePicture` | `jid: any` |
| `updateProfileStatus` | `status: any` |
| `updateProfileName` | `name: any` |
| `updateBlockStatus` | `jid: any, action: any` |
| `updateDisableLinkPreviewsPrivacy` | `isPreviewsDisabled: any` |
| `updateCallPrivacy` | `value: any` |
| `updateMessagesPrivacy` | `value: any` |
| `updateLastSeenPrivacy` | `value: any` |
| `updateOnlinePrivacy` | `value: any` |
| `updateProfilePicturePrivacy` | `value: any` |
| `updateStatusPrivacy` | `value: any` |
| `updateReadReceiptsPrivacy` | `value: any` |
| `updateGroupsAddPrivacy` | `value: any` |
| `updateDefaultDisappearingMode` | `duration: any` |
| `getBusinessProfile` | `jid: any` |
| `resyncAppState` | `...args: any[]` |
| `chatModify` | `mod: any, jid: any` |
| `cleanDirtyBits` | `type: any, fromTimestamp: any` |
| `addOrEditContact` | `jid: any, contact: any` |
| `removeContact` | `jid: any` |
| `addLabel` | `jid: any, labels: any` |
| `addChatLabel` | `jid: any, labelId: any` |
| `removeChatLabel` | `jid: any, labelId: any` |
| `addMessageLabel` | `jid: any, messageId: any, labelId: any` |
| `removeMessageLabel` | `jid: any, messageId: any, labelId: any` |
| `star` | `jid: any, messages: any, star: any` |
| `addOrEditQuickReply` | `quickReply: any` |
| `removeQuickReply` | `timestamp: any` |

#### `lib/Socket/messages-recv.js` — 62 members introduced by this layer

| Member | Parameters |
|---|---|
| `sendMessageAck` | `node: any, errorCode: any` |
| `sendRetryRequest` | `node: any, forceIncludeKeys?: boolean` |
| `rejectCall` | `callId: any, callFrom: any` |
| `fetchMessageHistory` | `count: any, oldestMsgKey: any, oldestMsgTimestamp: any` |
| `requestPlaceholderResend` | `messageKey: any, msgData: any` |
| `issuePrivacyTokens` | `jids: any, timestamp: any` |
| `assertSessions` | `jids: any, force: any` |
| `sendReceipt` | `jid: any, participant: any, messageIds: any, type: any` |
| `sendReceipts` | `keys: any, type: any` |
| `readMessages` | `keys: any` |
| `refreshMediaConn` | `forceGet?: boolean` |
| `getMediaHost` | `` |
| `sendPeerDataOperationMessage` | `pdoMessage: any` |
| `createParticipantNodes` | `recipientJids: any, message: any, extraAttrs: any, dsmMessage: any` |
| `getUSyncDevices` | `jids: any, useCache: any, ignoreZeroDevices: any` |
| `updateMemberLabel` | `jid: any, memberLabel: any` |
| `updateMediaMessage` | `message: any` |
| `sendMessage` | `jid: any, content: any, options?: {}` |
| `sendReaction` | `jid: any, reaction: any, key: any` |
| `downloadMedia` | `message: any, type?: string, options?: {}` |
| `copyNForward` | `jid: any, message: any, forceForward?: boolean, options?: {}` |
| `executeWMexQuery` | `variables: any, queryId: any, dataPath: any` |
| `newsletterCreate` | `name: any, description: any` |
| `newsletterUpdate` | `jid: any, updates: any` |
| `newsletterSubscribers` | `jid: any` |
| `newsletterSubscribed` | `` |
| `newsletterMetadata` | `type: any, key: any` |
| `newsletterFollow` | `jid: any` |
| `newsletterUnfollow` | `jid: any` |
| `newsletterMute` | `jid: any` |
| `newsletterUnmute` | `jid: any` |
| `newsletterUpdateName` | `jid: any, name: any` |
| `newsletterUpdateDescription` | `jid: any, description: any` |
| `newsletterUpdatePicture` | `jid: any, content: any` |
| `newsletterRemovePicture` | `jid: any` |
| `newsletterReactMessage` | `jid: any, serverId: any, reaction: any` |
| `newsletterFetchMessages` | `type: any, key: any, count: any, after: any, before: any` |
| `subscribeNewsletterUpdates` | `jid: any` |
| `newsletterAdminCount` | `jid: any` |
| `newsletterChangeOwner` | `jid: any, newOwnerJid: any` |
| `newsletterDemote` | `jid: any, userJid: any` |
| `newsletterDelete` | `jid: any` |
| `groupQuery` | `jid: any, type: any, content: any` |
| `groupMetadata` | `jid: any` |
| `groupCreate` | `subject: any, participants: any` |
| `groupLeave` | `id: any` |
| `groupUpdateSubject` | `jid: any, subject: any` |
| `groupRequestParticipantsList` | `jid: any` |
| `groupRequestParticipantsUpdate` | `jid: any, participants: any, action: any` |
| `groupParticipantsUpdate` | `jid: any, participants: any, action: any` |
| `groupUpdateDescription` | `jid: any, description: any` |
| `groupInviteCode` | `jid: any` |
| `groupRevokeInvite` | `jid: any` |
| `groupAcceptInvite` | `code: any` |
| `groupRevokeInviteV4` | `groupJid: any, invitedJid: any` |
| `groupAcceptInviteV4` | `...args: any[]` |
| `groupGetInviteInfo` | `code: any` |
| `groupToggleEphemeral` | `jid: any, ephemeralExpiration: any` |
| `groupSettingUpdate` | `jid: any, setting: any` |
| `groupMemberAddMode` | `jid: any, mode: any` |
| `groupJoinApprovalMode` | `jid: any, mode: any` |
| `groupFetchAllParticipating` | `` |

#### `lib/Socket/messages-send.js` — 14 members introduced by this layer

| Member | Parameters |
|---|---|
| `sendAlbumMessage` | `jid: string, medias: Array<{ image?: any; video?: any; caption?: string; [k: string]: any }>, options?: { caption?: string; delayMs?: number; quoted?: any; cont` |
| `sendPin` | `jid: any, key: any, opts?: { durationSec?: number }, options?: {}` |
| `sendUnpin` | `jid: any, key: any, options?: {}` |
| `sendKeep` | `jid: any, key: any, options?: {}` |
| `sendUnkeep` | `jid: any, key: any, options?: {}` |
| `sendEvent` | `jid: any, event: any, options?: {}` |
| `sendPoll` | `jid: any, poll: any, options?: {}` |
| `sendQuiz` | `jid: any, quiz: any, options?: {}` |
| `editPoll` | `jid: any, key: any, poll: any, options?: {}` |
| `sendMentionAll` | `jid: any, text: string, options?: {}` |
| `sendStatusMention` | `content: any, mentions: string \| string[], options?: {}` |
| `sendLocation` | `jid: any, location: any, options?: {}` |
| `sendContact` | `jid: any, contact: any, options?: {}` |
| `sendGroupInvite` | `jid: any, invite: any, options?: {}` |

#### `lib/Socket/business.js` — 9 members introduced by this layer

| Member | Parameters |
|---|---|
| `getOrderDetails` | `orderId: any, tokenBase64: any` |
| `getCollections` | `jid: any, limit?: number` |
| `productCreate` | `create: any` |
| `productDelete` | `productIds: any` |
| `productUpdate` | `productId: any, update: any` |
| `updateBussinesProfile` | `args: any` |
| `updateBusinessProfile` | `args: any` |
| `updateCoverPhoto` | `photo: any` |
| `removeCoverPhoto` | `id: any` |

#### `lib/Socket/communities.js` — 24 members introduced by this layer

| Member | Parameters |
|---|---|
| `communityQuery` | `jid: any, type: any, content: any` |
| `communityMetadata` | `jid: any` |
| `communityCreate` | `subject: any, body: any` |
| `communityCreateGroup` | `subject: any, participants: any, parentCommunityJid: any` |
| `communityLeave` | `id: any` |
| `communityUpdateSubject` | `jid: any, subject: any` |
| `communityLinkGroup` | `groupJid: any, parentCommunityJid: any` |
| `communityUnlinkGroup` | `groupJid: any, parentCommunityJid: any` |
| `communityFetchLinkedGroups` | `jid: any` |
| `communityRequestParticipantsList` | `jid: any` |
| `communityRequestParticipantsUpdate` | `jid: any, participants: any, action: any` |
| `communityParticipantsUpdate` | `jid: any, participants: any, action: any` |
| `communityUpdateDescription` | `jid: any, description: any` |
| `communityInviteCode` | `jid: any` |
| `communityRevokeInvite` | `jid: any` |
| `communityAcceptInvite` | `code: any` |
| `communityRevokeInviteV4` | `communityJid: any, invitedJid: any` |
| `communityAcceptInviteV4` | `...args: any[]` |
| `communityGetInviteInfo` | `code: any` |
| `communityToggleEphemeral` | `jid: any, ephemeralExpiration: any` |
| `communitySettingUpdate` | `jid: any, setting: any` |
| `communityMemberAddMode` | `jid: any, mode: any` |
| `communityJoinApprovalMode` | `jid: any, mode: any` |
| `communityFetchAllParticipating` | `` |

#### `Dugong` (`lib/Socket/dugong.js`)

`Dugong` is the message-type router used for payment / product / group-invite / interactive / album / event / poll-result / group-status payloads. Constructor: `new Dugong(waUploadToServer, relayMessageFn, config, sock)`.
```ts
export class Dugong {
```

| Method | Parameters | Notes (from source comments) |
|---|---|---|
| `detectType()` | `content` |  |
| `async handlePayment()` | `content, quoted` |  |
| `async handleProduct()` | `content, _jid, _quoted` |  |
| `async handleInteractive()` | `content, _jid, _quoted` |  |
| `async handleInteractiveButtons()` | `content, _jid, _quoted` |  |
| `async handleCarousel()` | `content, _jid, _quoted` |  |
| `async handleAlbum()` | `content, jid, quoted` |  |
| `async handleEvent()` | `content, jid, quoted` |  |
| `async handlePollResult()` | `content, jid, quoted` |  |
| `async handleGroupInvite()` | `content, jid, quoted` |  |
| `async handleGroupStory()` | `content, jid, _quoted, options = {}` |  |
| `async sendStatusWhatsApp()` | `content, jids = []` |  |

### 5. Builders method reference

Read directly from the class bodies in `lib/Builders/`. Methods starting with `#` are private fields/methods and are listed only for orientation.


#### `shared.js` — 816 lines

Classes: `Toolkit`, `BaseBuilder`, `RowBuilder`

| Method | Parameters | Notes (from source comments) |
|---|---|---|
| `static extractIE()` | `text, { extract = true, hyperlink = true, citation = true, latex = true, deeplink = true } = {}` | Parse `[label](url)` hyperlinks, `[]()` citations, and `[expr]<img-url>` latex tags out of `text`. |
| `static async resize()` | `buffer, x, y, fit = 'cover'` | Resize an image buffer to `x`×`y` via sharp (lazy-loaded; throws with an install hint if sharp isn't present). |
| `static stringifyEscaped()` | `obj` | JSON.stringify that escapes every non-ASCII char as \\uXXXX (safe for transports that mangle UTF-8). |
| `static async waitAllPromises()` | `input` |  |
| `static async fetchBuffer()` | `url, options = {}, { silent = true, timeout = 15000 } = {}` | Fetch `url` into a Buffer. @param {boolean} [silent] Return an empty Buffer instead of throwing on failure. @param {number} [timeout] Abort after this many ms (default 15s) instead of hanging indefinitely on a dead/slow host. |
| `static async toUrl()` | `_client, path, mediaType = 'document'` | Upload media to WhatsApp's media server and return its `url`/`directPath` descriptor. |
| `static async resolveMedia()` | `_client, media, mediaType = 'image', { resolveUrl = false, resolveWAUrl = false, result = 'url', resize = false, width = 300, height = 300 } = {}` | Normalize a url/buffer/array of either into the requested `result` shape ('url' \| 'buffer' \| 'base64'), optionally resizing and/or uploading to WA's media server first. |
| `static getMp4Duration()` | `buffer, { silent = true } = {}` | Read an mp4 buffer's duration (seconds) straight from its moov atom, no ffprobe needed. |
| `static getMp4Preview()` | `videoBuffer, { time, result = 'buffer', resize = true, width = 300, height = 300, silent = true } = {}` | Extract a single frame from an mp4 buffer as a thumbnail (ffmpeg lazy-loaded; throws with an install hint if missing). |
| `static getImageSize()` | `buffer` | Read a raster image buffer's pixel width/height straight from its header (PNG/JPEG/GIF/WEBP), no image-processing lib needed (same "parse the header bytes" approach as `getMp4Duration()` above). Returns `null` if the… |
| `static async resolveLatexDimensions()` | `url, fontHeight = 45` | Fetch a rendered LaTeX/formula image and resolve the `{ url, width, height }` shape `addLatexPro()`'s per-expression `latex_image` needs, scaling proportionally to `fontHeight` (default 45, matching the client's own… |
| `setTitle()` | `title` | @param {string} title |
| `setSubtitle()` | `subtitle` | @param {string} subtitle |
| `setBody()` | `body` | @param {string} body Main message text. |
| `setBotGroupParticipants()` | `...fbids` | mark Meta AI participant fbid(s) in `messageContextInfo.botMetadata.botGroupMetadata` (+ `threadId: []`), as the official client does in groups that contain Meta AI. Optional; merges into any messageContextInfo… |
| `setFooter()` | `footer` | @param {string} footer |
| `setContextInfo()` | `obj` | @param {Record<string, any>} obj Raw `contextInfo` (quotedMessage, mentionedJid, etc.), merged verbatim. |
| `addPayload()` | `obj` | Escape hatch: shallow-merge arbitrary keys into the generated message content, alongside whatever this builder produces. |
| `button()` | `displayText, buttonId` |  |

#### `Button.js` — 984 lines

Classes: `Button` (extends `BaseBuilder`), `CardBuilder`

| Method | Parameters | Notes (from source comments) |
|---|---|---|
| `loadFrom()` | `msg` | Reconstruct this builder's state from an already-built/sent interactiveMessage. @param {object} msg A raw message object containing `interactiveMessage` (e.g. `oldMsg.message`). |
| `setVideo()` | `path, options = {}` | Attach a video as the interactive header. @param {string\|Buffer} path Url or buffer. |
| `setImage()` | `path, options = {}` | Attach an image as the interactive header. @param {string\|Buffer} path Url or buffer. |
| `setDocument()` | `path, options = {}` | Attach a document as the interactive header. @param {string\|Buffer} path Url or buffer. |
| `setMedia()` | `obj` | Set a raw pre-built header media object (bypasses setVideo/setImage/setDocument shorthands). |
| `clearButtons()` | `` | Remove every button added so far (keeps title/body/footer/media). |
| `setParams()` | `obj` | Overwrite the message-level `nativeFlowMessage.messageParamsJson` payload wholesale. |
| `addButton()` | `name, params` | Low-level escape hatch: push a raw native-flow button by name. Prefer the dedicated `add*()` helpers below when one exists — they validate the required keys for that button type. @param {string} name Native-flow button name, e.g.… |
| `makeRow()` | `header = '', title = '', description = '', id = ''` | Append a row to the section currently open on the last `addSelection()` (call `makeSection()` first). |
| `makeSection()` | `title = '', highlight_label = ''` | Open a new section on the `single_select` button added by the last `addSelection()` call. |
| `addSelection()` | `title, options = {}` | Start a `single_select` (in-button picker list) button. Follow with `makeSection()` + `makeRow()`. |
| `addReply()` | `display_text = '', id = '', options = {}` | Add a `quick_reply` button — sends `id` back as the interactive-response id when tapped. @param {string} display_text Button label. @param {string} id Unique id returned on tap; required, WA silently drops replies without one. |
| `addCall()` | `display_text = '', phone_number = '', options = {}` | second arg used to be written into buttonParamsJson.id, but the cta_call schema keys on `phone_number` (confirmed against @chatunity/baileys, @neoxr/wb, and a WhiskeySockets/Baileys#2626 working example) — `id`… |
| `addReminder()` | `display_text = '', id = '', options = {}` | Add a `cta_reminder` button (schedules an in-chat reminder chip). |
| `addCancelReminder()` | `display_text = '', id = '', options = {}` | Add a `cta_cancel_reminder` button, pairs with `addReminder()`. |
| `addAddress()` | `display_text = '', id = '', options = {}` | Add an `address_message` button (prompts the user's saved-address picker). |
| `addLocation()` | `options = {}` | Add a `send_location` button (requests the user's live location). |
| `addUrl()` | `display_text = '', url = '', webview_interaction = false, options = {}` | `merchant_url` is present (and equal to `url`) on every cta_url button seen in captured client traffic, alongside `url`. Defaulted here rather than left for the caller to remember; still overridable via options… |
| `addCopy()` | `display_text = '', copy_code = '', options = {}` | Add a `cta_copy` button (copies `copy_code` to the user's clipboard on tap). |
| `addOpenWebview()` | `title = '', url = '', options = {}` | Add an `open_webview` button — opens a titled in-app webview (distinct from `cta_url`'s `webview_interaction` flag: this is its own native-flow name). @param {string} title Webview title shown in the header bar. @param {string} url Url… |
| `addCatalog()` | `display_text = '', options = {}` | Add a `cta_catalog` button (opens the sender's WhatsApp Business catalog). WA only shows the catalog action for accounts that actually have a catalog attached; on regular accounts the button may render inert.… |
| `addViewCatalog()` | `options = {}` | Add an `automated_greeting_message_view_catalog` button — the "View catalog" action WhatsApp Business shows on the automated greeting message. Business-account only; see Button.#SPECIAL_FLOW. |
| `addCallPermission()` | `display_text = '', options = {}` | Add a `call_permission_request` button — asks the user to grant call permission before a voice/video call can be placed. See Button.#SPECIAL_FLOW. |
| `addRequestContactInfo()` | `display_text = ''` | `request_contact_info` native-flow button (asks the recipient to share their contact info). Captured from official-client traffic: the button carries NO params (no buttonParamsJson at all) and the message has… |
| `addPaymentInfo()` | `payload = {}` | Add a `payment_info` button carrying a structured payment-settings payload (e.g. a PIX static-code block). Payload shape is dictated by WhatsApp's payment flows and is passed through as given — validate it yourself. … |
| `addReviewAndPay()` | `payload = {}` | Add a `review_and_pay` button (order/payment summary flow). Server-validated by WhatsApp; malformed or unauthorized payloads are typically ignored rather than erroring locally. @param {Record<string, any>} payload… |
| `addTransactionDetails()` | `payload = {}` | Add a `wa_payment_transaction_details` button referencing a prior transaction. See Button.#SPECIAL_FLOW. |
| `addMultiProduct()` | `payload = {}` | Add an `mpm` (multi-product message) button referencing a set of catalog items. Business-catalog accounts only; see Button.#SPECIAL_FLOW. |
| `addPaymentKeyInfo()` | `payload = {}` | Native-flow `payment_key_info` shortcut. Payload is passed through unchanged. |
| `addBookingConfirmation()` | `payload = {}` | Native-flow `booking_confirmation` shortcut. Payload is passed through unchanged. |
| `addCardMessage()` | `payload = {}` | Native-flow `card_message` shortcut, matching this fork's prepareNativeFlowButtons(). |
| `addOrderDetails()` | `payload = {}` | Native-flow `order_details` shortcut. |
| `addOrderStatus()` | `payload = {}` | Native-flow `order_status` shortcut. |
| `addPaymentStatus()` | `payload = {}` | Native-flow `payment_status` shortcut. |
| `addPaymentMethod()` | `payload = {}` | Native-flow `payment_method` shortcut. |
| `addTrackOrder()` | `id, display_text = '🚚 Track order'` | Native-flow `track_order` shortcut. |
| `addReorder()` | `id, display_text = '🔁 Reorder'` | Native-flow `reorder` shortcut. |
| `addCancelOrder()` | `id, display_text = '❌ Cancel order'` | Native-flow `cancel_order` shortcut. |
| `addClearChat()` | `` | Native-flow `clear_chat` shortcut. |
| `addNavigateToScreen()` | `screen, data = {}` | Native-flow `navigateToScreen` shortcut. |
| `addFlow()` | `flow = {}, display_text = ''` | WhatsApp Flows shortcut. Requires a real registered Flow. |
| `addVoiceCall()` | `id, display_text = '📞 Voice call'` | Native-flow `voice_call` shortcut. |
| `addVideoCall()` | `id, display_text = '🎥 Video

---

<a id="typescript-declaration-inventory"></a>

## 🧾 TypeScript Declaration Inventory

This inventory is generated from the `.d.ts` files shipped in the package. It is a navigation aid for the declared API surface; the detailed signatures and usage guidance remain in the **Complete API Reference** above. It currently indexes **939 declared exported symbols** found directly in the shipped declaration files.

> The declaration inventory is intentionally generated from the package itself rather than copied from another fork, so names can be traced back to the exact file that declares them.

### `lib/Builders/index.d.ts`

| Declared export |
|---|
| `A2UI` |
| `AddInlineImageOptions` |
| `AddTextOptions` |
| `AIRich` |
| `AIRichError` |
| `AIVanzxy` |
| `Album` |
| `AnyBloksNode` |
| `AudioPlayerNode` |
| `BaseBuilder` |
| `BlockOptions` |
| `BloksButtonNode` |
| `BloksNode` |
| `BloksNodeBase` |
| `BloksRef` |
| `BottomSheetParams` |
| `Button` |
| `ButtonV2` |
| `ButtonV3` |
| `CardBuilder` |
| `CardNode` |
| `Carousel` |
| `CheckBoxNode` |
| `ChoicePickerNode` |
| `ColumnRowNode` |
| `ContentValidationError` |
| `DateTimeInputNode` |
| `DividerNode` |
| `DuplicateIdError` |
| `Event` |
| `Expiring` |
| `ExpiringButton` |
| `IconNode` |
| `ImageNode` |
| `InvalidTargetError` |
| `ItemNotFoundError` |
| `LeafRich` |
| `LimitedTimeOfferParams` |
| `ListNode` |
| `MESSAGE_BUILDER_VERSION` |
| `ModalNode` |
| `ORich` |
| `Poll` |
| `RowBuilder` |
| `SliderNode` |
| `TabsNode` |
| `TapTargetConfigurationParams` |
| `TextFieldNode` |
| `TextNode` |
| `tokenizeCodeForRich` |
| `Toolkit` |
| `VanzxyAI` |
| `VanzxyRich` |
| `VideoNode` |

### `lib/Defaults/index.d.ts`

| Declared export |
|---|
| `albumDelayMs` |
| `auth` |
| `BIZ_BOT_SUPPORT_PAYLOAD` |
| `browser` |
| `cachedGroupMetadata` |
| `CALL_AUDIO_PREFIX` |
| `CALL_VIDEO_PREFIX` |
| `COMPANION_DEVICE_VERSION` |
| `connectTimeoutMs` |
| `countryCode` |
| `customUploadHosts` |
| `DEF_CALLBACK_PREFIX` |
| `DEF_TAG_PREFIX` |
| `DEFAULT_MAX_REMOTE_MEDIA_BYTES` |
| `DEFAULT_ORIGIN` |
| `DEFAULT_WA_VERSION` |
| `defaultQueryTimeoutMs` |
| `DICT_VERSION` |
| `DONATE_URL` |
| `emitOwnEvents` |
| `enableAutoSessionRecreation` |
| `enableRecentMessageCache` |
| `eventBufferTimeoutMs` |
| `fireInitQueries` |
| `generateHighQualityLinkPreview` |
| `getMessage` |
| `HISTORY_SYNC_PAUSED_TIMEOUT_MS` |
| `INITIAL_PREKEY_COUNT` |
| `keepAliveIntervalMs` |
| `KEY_BUNDLE_TYPE` |
| `LEXER_REGEX` |
| `LIBRARY_NAME` |
| `linkPreviewImageThumbnailWidth` |
| `logger` |
| `makeSignalRepository` |
| `markOnlineOnConnect` |
| `maxMsgRetryCount` |
| `MEDIA_HKDF_KEY_MAPPING` |
| `MEDIA_KEYS` |
| `MEDIA_PATH_MAP` |
| `MediaType` |
| `MIN_PREKEY_COUNT` |
| `NEWSLETTER_MEDIA_PATH_MAP` |
| `NOISE_MODE` |
| `NOISE_WA_HEADER` |
| `options` |
| `patchMessageBeforeSending` |
| `phashRetryEnabled` |
| `PHONE_CONNECTION_CB` |
| `PLACEHOLDER_MAX_AGE_SECONDS` |
| `PROCESSABLE_HISTORY_TYPES` |
| `retryRequestDelayMs` |
| `shouldIgnoreJid` |
| `shouldSyncHistoryMessage` |
| `STATUS_EXPIRY_SECONDS` |
| `statusBroadcastDelayMs` |
| `syncFullHistory` |
| `UNAUTHORIZED_CODES` |
| `UPLOAD_TIMEOUT` |
| `URL_REGEX` |
| `version` |
| `WA_ADV_ACCOUNT_SIG_PREFIX` |
| `WA_ADV_DEVICE_SIG_PREFIX` |
| `WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX` |
| `WA_ADV_HOSTED_DEVICE_SIG_PREFIX` |
| `WA_DEFAULT_EPHEMERAL` |
| `waWebSocketUrl` |

### `lib/Defaults/version.d.ts`

| Declared export |
|---|
| `DEFAULT_WA_VERSION` |

### `lib/Signal/Group/ciphertext-message.d.ts`

| Declared export |
|---|
| `CiphertextMessage` |

### `lib/Signal/Group/group-session-builder.d.ts`

| Declared export |
|---|
| `GroupSessionBuilder` |

### `lib/Signal/Group/group_cipher.d.ts`

| Declared export |
|---|
| `GroupCipher` |

### `lib/Signal/Group/index.d.ts`

| Declared export |
|---|
| `CiphertextMessage` |
| `GroupCipher` |
| `GroupSessionBuilder` |
| `SenderChainKey` |
| `SenderKeyDistributionMessage` |
| `SenderKeyMessage` |
| `SenderKeyName` |
| `SenderKeyRecord` |
| `SenderKeyState` |
| `SenderMessageKey` |

### `lib/Signal/Group/keyhelper.d.ts`

| Declared export |
|---|
| `generateSenderKey` |
| `generateSenderKeyId` |
| `generateSenderSigningKey` |

### `lib/Signal/Group/sender-chain-key.d.ts`

| Declared export |
|---|
| `SenderChainKey` |

### `lib/Signal/Group/sender-key-distribution-message.d.ts`

| Declared export |
|---|
| `SenderKeyDistributionMessage` |

### `lib/Signal/Group/sender-key-message.d.ts`

| Declared export |
|---|
| `SenderKeyMessage` |

### `lib/Signal/Group/sender-key-name.d.ts`

| Declared export |
|---|
| `SenderKeyName` |

### `lib/Signal/Group/sender-key-record.d.ts`

| Declared export |
|---|
| `SenderKeyRecord` |

### `lib/Signal/Group/sender-key-state.d.ts`

| Declared export |
|---|
| `SenderKeyState` |

### `lib/Signal/Group/sender-message-key.d.ts`

| Declared export |
|---|
| `SenderMessageKey` |

### `lib/Signal/libsignal.d.ts`

| Declared export |
|---|
| `makeLibSignalRepository` |

### `lib/Signal/lid-mapping.d.ts`

| Declared export |
|---|
| `LIDMappingStore` |

### `lib/Socket/Client/types.d.ts`

| Declared export |
|---|
| `AbstractSocketClient` |

### `lib/Socket/Client/websocket.d.ts`

| Declared export |
|---|
| `WebSocketClient` |

### `lib/Socket/business.d.ts`

| Declared export |
|---|
| `makeBusinessSocket` |

### `lib/Socket/chats.d.ts`

| Declared export |
|---|
| `makeChatsSocket` |

### `lib/Socket/communities.d.ts`

| Declared export |
|---|
| `extractCommunityMetadata` |
| `makeCommunitiesSocket` |

### `lib/Socket/dugong.d.ts`

| Declared export |
|---|
| `Dugong` |

### `lib/Socket/groups.d.ts`

| Declared export |
|---|
| `extractGroupMetadata` |
| `makeGroupsSocket` |
| `persistLidPnMappings` |

### `lib/Socket/index.d.ts`

| Declared export |
|---|
| `Dugong` |

### `lib/Socket/messages-recv.d.ts`

| Declared export |
|---|
| `makeMessagesRecvSocket` |

### `lib/Socket/messages-send.d.ts`

| Declared export |
|---|
| `makeMessagesSocket` |

### `lib/Socket/mex-fallback.d.ts`

| Declared export |
|---|
| `isStaleQueryError` |
| `makeMexWithFallback` |
| `NEWSLETTER_ID_ALTERNATES` |

### `lib/Socket/mex.d.ts`

| Declared export |
|---|
| `executeWMexQuery` |

### `lib/Socket/newsletter-ext.d.ts`

| Declared export |
|---|
| `EXT_QUERY_IDS` |
| `extractNewsletterMessageMeta` |
| `makeNewsletterExtMethods` |
| `NEWSLETTER_SERVER_ID_MAX` |
| `NEWSLETTER_SERVER_ID_MIN` |
| `toNewsletterServerId` |
| `toNewsletterServerIds` |

### `lib/Socket/newsletter.d.ts`

| Declared export |
|---|
| `makeNewsletterSocket` |
| `triggerAutoFollow` |

### `lib/Socket/socket.d.ts`

| Declared export |
|---|
| `makeSocket` |

### `lib/Store/make-in-memory-store.d.ts`

| Declared export |
|---|
| `makeInMemoryStore` |
| `waChatKey` |
| `waMessageID` |

### `lib/Store/make-ordered-dictionary.d.ts`

| Declared export |
|---|
| `makeOrderedDictionary` |

### `lib/Store/object-repository.d.ts`

| Declared export |
|---|
| `ObjectRepository` |

### `lib/Types/Auth.d.ts`

| Declared export |
|---|
| `AccountSettings` |
| `AuthenticationCreds` |
| `AuthenticationState` |
| `KeyPair` |
| `LIDMapping` |
| `LTHashState` |
| `ProtocolAddress` |
| `SignalAuthState` |
| `SignalCreds` |
| `SignalDataSet` |
| `SignalDataTypeMap` |
| `SignalIdentity` |
| `SignalKeyStore` |
| `SignalKeyStoreWithTransaction` |
| `SignedKeyPair` |
| `TransactionCapabilityOptions` |

### `lib/Types/Bussines.d.ts`

| Declared export |
|---|
| `DayOfWeekBussines` |
| `HoursDay` |
| `QuickReplyAction` |
| `UpdateBussinesProfileProps` |

### `lib/Types/Call.d.ts`

| Declared export |
|---|
| `WACallEvent` |
| `WACallUpdateType` |

### `lib/Types/Chat.d.ts`

| Declared export |
|---|
| `ALL_WA_PATCH_NAMES` |
| `BotListInfo` |
| `Chat` |
| `ChatModification` |
| `ChatMutation` |
| `ChatUpdate` |
| `InitialAppStateSyncOptions` |
| `InitialReceivedChatsState` |
| `LastMessageList` |
| `PresenceData` |
| `WAPatchCreate` |
| `WAPatchName` |
| `WAPresence` |
| `WAPrivacyCallValue` |
| `WAPrivacyGroupAddValue` |
| `WAPrivacyMessagesValue` |
| `WAPrivacyOnlineValue` |
| `WAPrivacyValue` |
| `WAReadReceiptsValue` |

### `lib/Types/Contact.d.ts`

| Declared export |
|---|
| `Contact` |

### `lib/Types/Events.d.ts`

| Declared export |
|---|
| `BaileysEvent` |
| `BaileysEventEmitter` |
| `BaileysEventMap` |
| `BufferedEventData` |

### `lib/Types/GroupMetadata.d.ts`

| Declared export |
|---|
| `GroupMetadata` |
| `GroupModificationResponse` |
| `GroupParticipant` |
| `ParticipantAction` |
| `RequestJoinAction` |
| `RequestJoinMethod` |
| `WAGroupCreateResponse` |

### `lib/Types/Label.d.ts`

| Declared export |
|---|
| `Label` |
| `LabelActionBody` |
| `LabelColor` |

### `lib/Types/LabelAssociation.d.ts`

| Declared export |
|---|
| `ChatLabelAssociation` |
| `ChatLabelAssociationActionBody` |
| `LabelAssociation` |
| `LabelAssociationType` |
| `MessageLabelAssociation` |
| `MessageLabelAssociationActionBody` |

### `lib/Types/Message.d.ts`

| Declared export |
|---|
| `AnyMediaMessageContent` |
| `AnyMessageContent` |
| `AnyRegularMessageContent` |
| `Contextable` |
| `Editable` |
| `Forwardable` |
| `Mediaable` |
| `MediaConnInfo` |
| `Mentionable` |
| `MessageGenerationOptionsFromContent` |
| `MessageUpsertType` |
| `MessageUserReceipt` |
| `MessageUserReceiptUpdate` |
| `MinimalMessage` |
| `MiscMessageGenerationOptions` |
| `ViewOnceable` |
| `WAContactMessage` |
| `WAContactsArrayMessage` |
| `WAContextInfo` |
| `WAGenericMediaMessage` |
| `WALocationMessage` |
| `WAMediaPayloadStream` |
| `WAMediaPayloadURL` |
| `WAMediaUpload` |
| `WAMediaUploadFunction` |
| `WAMediaUploadFunctionOpts` |
| `WAMediaUploadResult` |
| `WAMessage` |
| `WAMessageAddressingMode` |
| `WAMessageContent` |
| `WAMessageKey` |
| `WAMessageUpdate` |
| `WAProto` |
| `WATextMessage` |
| `WAUrlInfo` |

### `lib/Types/Mex.d.ts`

| Declared export |
|---|
| `QueryIds` |
| `XWAPaths` |

### `lib/Types/Product.d.ts`

| Declared export |
|---|
| `CatalogCollection` |
| `CatalogCursor` |
| `CatalogResult` |
| `CatalogStatus` |
| `GetCatalogOptions` |
| `OrderDetails` |
| `OrderPrice` |
| `OrderProduct` |
| `Product` |
| `ProductAvailability` |
| `ProductBase` |
| `ProductCreate` |
| `ProductCreateResult` |
| `ProductUpdate` |

### `lib/Types/RichType.d.ts`

| Declared export |
|---|
| `CodeHighlightType` |
| `RichSubMessageType` |

### `lib/Types/Signal.d.ts`

| Declared export |
|---|
| `SignalRepository` |
| `SignalRepositoryWithLIDStore` |

### `lib/Types/Socket.d.ts`

| Declared export |
|---|
| `CacheStore` |
| `PatchedMessageWithRecipientJID` |
| `PossiblyExtendedCacheStore` |
| `SocketConfig` |
| `WABrowserDescription` |
| `WAVersion` |

### `lib/Types/State.d.ts`

| Declared export |
|---|
| `ConnectionState` |
| `NewChatMessageCapInfo` |
| `NewChatMessageCappingMVStatusType` |
| `NewChatMessageCappingOTEStatusType` |
| `NewChatMessageCappingStatusType` |
| `ReachoutTimelockEnforcementType` |
| `SyncState` |
| `WAConnectionState` |

### `lib/Types/USync.d.ts`

| Declared export |
|---|
| `USyncQueryProtocol` |

### `lib/Types/index.d.ts`

| Declared export |
|---|
| `BrowsersMap` |
| `CurveKeyPair` |
| `DisconnectReason` |
| `UserFacingSocketConfig` |
| `WABusinessHoursConfig` |
| `WABusinessProfile` |
| `WAInitResponse` |

### `lib/Utils/anti-delete.d.ts`

| Declared export |
|---|
| `createAntiDeleteHandler` |
| `createAntiDeleteUpsertHandler` |
| `createMessageStoreHandler` |
| `DeletedMessageInfo` |
| `getDeletedMessageKey` |
| `isDeleteMessage` |
| `MessageStore` |
| `MessageStoreOptions` |
| `StoredMessage` |

### `lib/Utils/auth-secure.d.ts`

| Declared export |
|---|
| `BACKUP_MAGIC` |
| `backupAuthState` |
| `createQRGuard` |
| `createRateLimiter` |
| `decryptJSON` |
| `deriveKey` |
| `ENC_MAGIC` |
| `encryptJSON` |
| `isEncryptedPayload` |
| `redactSecrets` |
| `repairAuthState` |
| `restoreAuthState` |
| `secureLogger` |
| `secureLogout` |
| `useEncryptedFileAuthState` |
| `useEncryptedSingleFileAuthState` |
| `verifyAuthIntegrity` |
| `withPairingGuard` |
| `writeAuthIntegrity` |

### `lib/Utils/auth-utils.d.ts`

| Declared export |
|---|
| `addTransactionCapability` |
| `assertMeId` |
| `initAuthCreds` |
| `makeCacheableSignalKeyStore` |

### `lib/Utils/auto-reconnect.d.ts`

| Declared export |
|---|
| `autoReconnect` |
| `AutoReconnectManager` |
| `AutoReconnectOptions` |

### `lib/Utils/auto-reply.d.ts`

| Declared export |
|---|
| `AutoReplyHandler` |
| `AutoReplyOptions` |
| `AutoReplyRule` |
| `createAutoReply` |

### `lib/Utils/bad-mac-handler.d.ts`

| Declared export |
|---|
| `BadMacHandler` |
| `BadMacHandlerOptions` |
| `isBadMacError` |
| `isSessionError` |

### `lib/Utils/baileys-event-stream.d.ts`

| Declared export |
|---|
| `captureEventStream` |
| `readAndEmitEventStream` |

### `lib/Utils/browser-utils.d.ts`

| Declared export |
|---|
| `getPlatformId` |
| `isAndroidBrowser` |

### `lib/Utils/business.d.ts`

| Declared export |
|---|
| `parseCatalogNode` |
| `parseCollectionsNode` |
| `parseOrderDetailsNode` |
| `parseProductNode` |
| `toProductNode` |
| `uploadingNecessaryImages` |
| `uploadingNecessaryImagesOfProduct` |

### `lib/Utils/chat-control.d.ts`

| Declared export |
|---|
| `createPinnedMessagesManager` |
| `createReadReceiptController` |
| `createTypingIndicator` |
| `DISAPPEARING_DURATIONS` |
| `DisappearingDuration` |
| `PinnedMessage` |
| `PinnedMessagesManager` |
| `ReadReceiptConfig` |
| `ReadReceiptController` |
| `TypingIndicator` |

### `lib/Utils/chat-history-helpers.d.ts`

| Declared export |
|---|
| `copyNForward` |
| `getLastMessageInChat` |
| `getOldestMessageInChat` |
| `InMemoryStoreLike` |
| `uploadMediaToWhatsApp` |

### `lib/Utils/chat-utils.d.ts`

| Declared export |
|---|
| `chatModificationToAppPatch` |
| `decodePatches` |
| `decodeSyncdMutations` |
| `decodeSyncdPatch` |
| `decodeSyncdSnapshot` |
| `downloadExternalBlob` |
| `downloadExternalPatch` |
| `encodeSyncdPatch` |
| `ensureLTHashStateVersion` |
| `extractSyncdPatches` |
| `isAppStateSyncIrrecoverable` |
| `isMissingKeyError` |
| `makeLtHashGenerator` |
| `MAX_SYNC_ATTEMPTS` |
| `newLTHashState` |
| `processSyncAction` |

### `lib/Utils/companion-reg-client-utils.d.ts`

| Declared export |
|---|
| `buildPairingQRData` |
| `CompanionWebClientType` |
| `getCompanionPlatformId` |
| `getCompanionWebClientType` |

### `lib/Utils/connection-watchdog.d.ts`

| Declared export |
|---|
| `ConnectionWatchdogOptions` |
| `setupConnectionWatchdog` |

### `lib/Utils/crypto.d.ts`

| Declared export |
|---|
| `aesDecrypt` |
| `aesDecryptCTR` |
| `aesDecryptGCM` |
| `aesDecryptWithIV` |
| `aesEncrypt` |
| `aesEncryptCTR` |
| `aesEncryptGCM` |
| `aesEncrypWithIV` |
| `derivePairingCodeKey` |
| `generateSignalPubKey` |
| `hkdf` |
| `hmacSign` |
| `md5` |
| `sha256` |
| `signedKeyPair` |

### `lib/Utils/decode-wa-message.d.ts`

| Declared export |
|---|
| `ACCOUNT_RESTRICTED_TEXT` |
| `decodeMessageNode` |
| `decryptMessageNode` |
| `extractAddressingContext` |
| `getDecryptionJid` |
| `MISSING_KEYS_ERROR_TEXT` |
| `NO_MESSAGE_FOUND_ERROR_TEXT` |

### `lib/Utils/disconnect-reason.d.ts`

| Declared export |
|---|
| `DisconnectReasonName` |
| `getDisconnectInfo` |
| `isFatalDisconnect` |
| `isRateLimited` |
| `mapDisconnectReason` |
| `shouldClearAuth` |
| `shouldReconnect` |

### `lib/Utils/event-buffer.d.ts`

| Declared export |
|---|
| `makeEventBuffer` |

### `lib/Utils/fetch-timeout.d.ts`

| Declared export |
|---|
| `DEFAULT_FETCH_TIMEOUT_MS` |
| `fetchWithTimeout` |

### `lib/Utils/ffmpeg-path.d.ts`

| Declared export |
|---|
| `ffmpegInstallHint` |
| `requireFfmpegPath` |
| `resolveFfmpegPath` |
| `setFfmpegPath` |

### `lib/Utils/generics.d.ts`

| Declared export |
|---|
| `bindWaitForConnectionUpdate` |
| `bindWaitForEvent` |
| `bytesToCrockford` |
| `debouncedTimeout` |
| `DEFAULT_VERSION_SOURCE_URL` |
| `delay` |
| `delayCancellable` |
| `encodeBigEndian` |
| `encodeNewsletterMessage` |
| `encodeWAMessage` |
| `fetchBestWaVersion` |
| `fetchLatestBaileysVersion` |
| `fetchLatestWaWebVersion` |
| `generateMdTagPrefix` |
| `generateMessageID` |
| `generateMessageIDV2` |
| `generateParticipantHashV2` |
| `generateRegistrationId` |
| `getCallStatusFromNode` |
| `getCodeFromWSError` |
| `getErrorCodeFromStreamError` |
| `getKeyAuthor` |
| `getStatusFromReceiptType` |
| `isStringNullOrEmpty` |
| `isWABusinessPlatform` |
| `promiseTimeout` |
| `toNumber` |
| `trimUndefined` |
| `unixTimestampSeconds` |
| `unpadRandomMax16` |
| `writeRandomPadMax16` |

### `lib/Utils/group-metadata-cache.d.ts`

| Declared export |
|---|
| `describeUnusableGroupMetadata` |
| `GROUP_ADDRESSING_MODES` |
| `isUsableGroupMetadata` |

### `lib/Utils/history.d.ts`

| Declared export |
|---|
| `downloadAndProcessHistorySyncNotification` |
| `downloadHistory` |
| `getHistoryMsg` |
| `processHistoryMessage` |

### `lib/Utils/humanizer.d.ts`

| Declared export |
|---|
| `HumanizeOptions` |
| `sendHumanized` |

### `lib/Utils/identity-change-handler.d.ts`

| Declared export |
|---|
| `handleIdentityChange` |

### `lib/Utils/jid-tools.d.ts`

| Declared export |
|---|
| `getLidForPhone` |
| `getPhoneNumber` |
| `resolveSenderPn` |

### `lib/Utils/link-preview.d.ts`

| Declared export |
|---|
| `getUrlInfo` |

### `lib/Utils/lock-manager.d.ts`

| Declared export |
|---|
| `LockManager` |
| `LockRef` |
| `makeLockManager` |

### `lib/Utils/logger.d.ts`

| Declared export |
|---|
| `ILogger` |

### `lib/Utils/lt-hash.d.ts`

| Declared export |
|---|
| `LT_HASH_ANTI_TAMPERING` |

### `lib/Utils/make-mutex.d.ts`

| Declared export |
|---|
| `makeKeyedMutex` |
| `makeMutex` |

### `lib/Utils/media-messages.d.ts`

| Declared export |
|---|
| `changeprofileFull` |
| `generatePP` |
| `generateProfilePicturee` |
| `generateProfilePictureFP` |
| `generateProfilePictureFull` |

### `lib/Utils/media-set.d.ts`

| Declared export |
|---|
| `groupLabel` |
| `groupSetMemberLabel` |
| `groupStatus` |
| `groupStatusV2` |
| `updateProfilePictureFull` |
| `updateProfilePictureFull2` |

### `lib/Utils/message-retry-manager.d.ts`

| Declared export |
|---|
| `MessageRetryManager` |
| `RetryReason` |

### `lib/Utils/message-search.d.ts`

| Declared export |
|---|
| `calculateRelevance` |
| `createMessageSearch` |
| `extractMessageText` |
| `MessageSearchManager` |
| `RegexSearchOptions` |
| `searchMessages` |
| `searchMessagesRegex` |
| `SearchMessageType` |
| `SearchOptions` |
| `SearchResult` |

### `lib/Utils/messages-media.d.ts`

| Declared export |
|---|
| `decodeMediaRetryNode` |
| `decryptMediaRetryData` |
| `DEF_MEDIA_HOST` |
| `downloadContentFromMessage` |
| `downloadEncryptedContent` |
| `encodeBase64EncodedStringForUpload` |
| `encryptedStream` |
| `encryptMediaRetryRequest` |
| `extensionForMediaMessage` |
| `extractImageThumb` |
| `extractVideoThumb` |
| `generateProfilePicture` |
| `generateThumbnail` |
| `getAudioDuration` |
| `getAudioWaveform` |
| `getHttpStream` |
| `getImageProcessingLibrary` |
| `getMediaKeys` |
| `getRawMediaUploadData` |
| `getStatusCodeForMediaRetry` |
| `getStream` |
| `getUrlFromDirectPath` |
| `getWAUploadToServer` |
| `hkdfInfoKey` |
| `mediaMessageSHA256B64` |
| `toBuffer` |
| `toReadable` |
| `uploadWithNodeHttp` |

### `lib/Utils/messages.d.ts`

| Declared export |
|---|
| `aggregateMessageKeysNotFromMe` |
| `assertMediaContent` |
| `downloadMediaMessage` |
| `extractMessageContent` |
| `extractUrlFromText` |
| `generateForwardMessageContent` |
| `generateLinkPreviewIfRequired` |
| `generateWAMessage` |
| `generateWAMessageContent` |
| `generateWAMessageFromContent` |
| `getAggregateResponsesInEventMessage` |
| `getAggregateVotesInPollMessage` |
| `getContentType` |
| `getDevice` |
| `hasNonNullishProperty` |
| `hasOptionalProperty` |
| `hasValidAlbumMedia` |
| `hasValidCarouselHeader` |
| `hasValidInteractiveHeader` |
| `normalizeMessageContent` |
| `prepareDisappearingMessageSettingContent` |
| `prepareWAMessageMedia` |
| `shouldIncludeBizBinaryNode` |
| `updateMessageWithEventResponse` |
| `updateMessageWithPollUpdate` |
| `updateMessageWithReaction` |
| `updateMessageWithReceipt` |

### `lib/Utils/meta-ai-msmsg.d.ts`

| Declared export |
|---|
| `decodeDecryptedMsmsgMessage` |
| `decryptMsmsgBotMessage` |
| `MsmsgKey` |

### `lib/Utils/meta-ai.d.ts`

| Declared export |
|---|
| `askMetaAI` |
| `AskMetaAIOptions` |
| `AskMetaAIResult` |

### `lib/Utils/migrate-auth-state.d.ts`

| Declared export |
|---|
| `ALL_TYPES` |
| `migrateAuthState` |
| `MigrateAuthStateOptions` |
| `MigrateAuthStateResult` |

### `lib/Utils/mock-socket.d.ts`

| Declared export |
|---|
| `createMockSocket` |
| `MockSocket` |
| `MockSocketOptions` |

### `lib/Utils/noise-handler.d.ts`

| Declared export |
|---|
| `makeNoiseHandler` |

### `lib/Utils/offline-node-processor.d.ts`

| Declared export |
|---|
| `makeOfflineNodeProcessor` |

### `lib/Utils/pairing-utils.d.ts`

| Declared export |
|---|
| `formatPairingCode` |
| `isCustomPairingError` |
| `isRateLimitError` |
| `normalizePairingCode` |
| `pairingErrorCode` |

### `lib/Utils/passkey.d.ts`

| Declared export |
|---|
| `getPasskeyRequestState` |
| `PasskeyNotificationType` |
| `PasskeyRequestState` |

### `lib/Utils/past-participants.d.ts`

| Declared export |
|---|
| `hasPastParticipants` |
| `ProcessedPastParticipant` |
| `ProcessedPastParticipants` |
| `processPastParticipants` |

### `lib/Utils/phone-utils.d.ts`

| Declared export |
|---|
| `jidToPhone` |
| `phoneToJid` |
| `validateE164` |

### `lib/Utils/pre-key-manager.d.ts`

| Declared export |
|---|
| `PreKeyManager` |

### `lib/Utils/process-message.d.ts`

| Declared export |
|---|
| `cleanMessage` |
| `decryptEventResponse` |
| `decryptMessageEdit` |
| `decryptPollVote` |
| `getChatId` |
| `isRealMessage` |
| `shouldIncrementChatUnread` |

### `lib/Utils/qr-terminal.d.ts`

| Declared export |
|---|
| `printQRIfNecessaryListener` |

### `lib/Utils/reconnect-backoff.d.ts`

| Declared export |
|---|
| `computeReconnectDelay` |
| `createReconnectBackoff` |
| `ReconnectBackoffOptions` |

### `lib/Utils/reporting-utils.d.ts`

| Declared export |
|---|
| `getMessageReportingToken` |
| `shouldIncludeReportingToken` |

### `lib/Utils/rich-message-utils.d.ts`

| Declared export |
|---|
| `botMetadataCertificate` |
| `botMetadataSignature` |
| `prepareRichResponseMessage` |
| `tokenizeCode` |
| `toUnified` |
| `wrapToBotForwardedMessage` |

### `lib/Utils/scheduling.d.ts`

| Declared export |
|---|
| `createMessageScheduler` |
| `MessageScheduler` |
| `RepeatOptions` |
| `ScheduledMessage` |
| `ScheduledMessageStatus` |
| `SchedulerOptions` |

### `lib/Utils/signal.d.ts`

| Declared export |
|---|
| `createSignalIdentity` |
| `extractDeviceJids` |
| `extractE2ESessionFromRetryReceipt` |
| `generateOrGetPreKeys` |
| `getNextPreKeys` |
| `getNextPreKeysNode` |
| `getPreKeys` |
| `parseAndInjectE2ESessions` |
| `xmppPreKey` |
| `xmppSignedPreKey` |

### `lib/Utils/stanza-ack.d.ts`

| Declared export |
|---|
| `buildAckStanza` |

### `lib/Utils/status.d.ts`

| Declared export |
|---|
| `createAudioStatus` |
| `createImageStatus` |
| `createTextStatus` |
| `createVideoStatus` |
| `generateStatusMessageId` |
| `getStatusJid` |
| `MediaStatusOptions` |
| `STATUS_BACKGROUNDS` |
| `STATUS_BROADCAST_JID` |
| `STATUS_FONTS` |
| `StatusFont` |
| `StatusHelper` |
| `StatusMusicInfo` |
| `TextStatusOptions` |
| `withMusicAttribution` |

### `lib/Utils/stickerpack.d.ts`

| Declared export |
|---|
| `buildStickerPackProto` |
| `convertToWebP` |
| `generateStickerPackId` |
| `isAnimatedWebP` |
| `isLottieBuffer` |
| `isWebPBuffer` |
| `ItsliaaaStickerInput` |
| `ItsliaaaStickerPackInput` |
| `ItsliaaaStickerPackOptions` |
| `prepareStickerPackMessageItsliaaa` |
| `STICKER_PACK_MESSAGE_TYPE` |

### `lib/Utils/sync-action-utils.d.ts`

| Declared export |
|---|
| `emitSyncActionResults` |
| `processContactAction` |

### `lib/Utils/tag.d.ts`

| Declared export |
|---|
| `buildTagContent` |
| `hideTag` |
| `tagAll` |
| `TagBuildOptions` |

### `lib/Utils/tc-token-utils.d.ts`

| Declared export |
|---|
| `buildMergedTcTokenIndexWrite` |
| `buildTcTokenFromJid` |
| `isTcTokenExpired` |
| `readTcTokenIndex` |
| `resolveIssuanceJid` |
| `resolveTcTokenJid` |
| `shouldSendNewTcToken` |
| `storeTcTokensFromIqResult` |
| `TC_TOKEN_INDEX_KEY` |

### `lib/Utils/templates.d.ts`

| Declared export |
|---|
| `createTemplateManager` |
| `MessageTemplate` |
| `PRESET_TEMPLATES` |
| `renderTemplate` |
| `TemplateData` |
| `TemplateManager` |
| `TemplateVariable` |

### `lib/Utils/text-format.d.ts`

| Declared export |
|---|
| `DEFAULT_TEXT_PART_LENGTH` |
| `sendLongText` |
| `splitText` |
| `whatsappify` |

### `lib/Utils/text-tools.d.ts`

| Declared export |
|---|
| `extractGroupInviteCode` |
| `joinGroupViaLink` |
| `parseMentions` |

### `lib/Utils/use-cache-manager-auth-state.d.ts`

| Declared export |
|---|
| `CacheManagerStore` |
| `makeCacheManagerAuthState` |
| `useCacheManagerAuthState` |

### `lib/Utils/use-multi-file-auth-state.d.ts`

| Declared export |
|---|
| `useMultiFileAuthState` |

### `lib/Utils/use-single-file-auth-state.d.ts`

| Declared export |
|---|
| `useSingleFileAuthState` |

### `lib/Utils/use-sqlite-auth-state.d.ts`

| Declared export |
|---|
| `useSqliteAuthState` |

### `lib/Utils/username.d.ts`

| Declared export |
|---|
| `displayUsername` |
| `isUsernamePin` |
| `stripUsernamePrefix` |
| `USERNAME_MAX_LENGTH` |
| `USERNAME_MIN_LENGTH` |
| `USERNAME_PIN_LENGTH` |
| `UsernameValidationError` |
| `UsernameValidationErrorType` |
| `validateUsername` |

### `lib/Utils/validate-connection.d.ts`

| Declared export |
|---|
| `configureSuccessfulPairing` |
| `encodeSignedDeviceIdentity` |
| `generateLoginNode` |
| `generateRegistrationNode` |

### `lib/Utils/vcard.d.ts`

| Declared export |
|---|
| `ContactAddress` |
| `ContactData` |
| `ContactEmail` |
| `ContactPhone` |
| `ContactUrl` |
| `createContactCard` |
| `createContactCards` |
| `escapeVCard` |
| `formatPhone` |
| `generateVCard` |
| `generateVCards` |
| `parseVCard` |
| `quickContact` |

### `lib/Utils/voice-note.d.ts`

| Declared export |
|---|
| `buildVoiceNoteContent` |
| `isOggBuffer` |
| `MAX_VOICE_NOTE_BYTES` |
| `sendVoiceNote` |
| `VoiceNoteOptions` |

### `lib/VoIP/audio-feeder.d.ts`

| Declared export |
|---|
| `AudioFeeder` |

### `lib/VoIP/relay-transport.d.ts`

| Declared export |
|---|
| `RelayListUpdatePayload` |
| `RelayRtcTransport` |
| `RelayTransportConfig` |
| `RelayTransportStats` |

### `lib/VoIP/types.d.ts`

| Declared export |
|---|
| `AudioConfig` |
| `CallEvents` |
| `CallOptions` |
| `CallState` |
| `RelayListUpdate` |
| `VoipSdkConfig` |

### `lib/VoIP/wasm-engine.d.ts`

| Declared export |
|---|
| `WasmAudioConfig` |
| `WasmEngine` |
| `WasmEngineCallbacks` |
| `WasmEngineConfig` |

### `lib/WABinary/constants.d.ts`

| Declared export |
|---|
| `BASH_KEYWORDS` |
| `C_KEYWORDS` |
| `CMD_KEYWORDS` |
| `CPP_KEYWORDS` |
| `CSHARP_KEYWORDS` |
| `CSS_KEYWORDS` |
| `DOUBLE_BYTE_TOKENS` |
| `GO_KEYWORDS` |
| `HTML_KEYWORDS` |
| `JS_KEYWORDS` |
| `LANGUAGE_KEYWORDS` |
| `POWERSHELL_KEYWORDS` |
| `PYTHON_KEYWORDS` |
| `RUST_KEYWORDS` |
| `SINGLE_BYTE_TOKENS` |
| `TOKEN_MAP` |

### `lib/WABinary/decode.d.ts`

| Declared export |
|---|
| `decodeBinaryNode` |
| `decodeDecompressedBinaryNode` |
| `decompressingIfRequired` |

### `lib/WABinary/encode.d.ts`

| Declared export |
|---|
| `encodeBinaryNode` |

### `lib/WABinary/generic-utils.d.ts`

| Declared export |
|---|
| `assertNodeErrorFree` |
| `binaryNodeToString` |
| `getAllBinaryNodeChildren` |
| `getBinaryFilteredButtons` |
| `getBinaryNodeChild` |
| `getBinaryNodeChildBuffer` |
| `getBinaryNodeChildren` |
| `getBinaryNodeChildString` |
| `getBinaryNodeChildUInt` |
| `getBinaryNodeFilter` |
| `getBinaryNodeMessages` |
| `getBizBinaryNode` |
| `reduceBinaryNodeToDictionary` |

### `lib/WABinary/jid-utils.d.ts`

| Declared export |
|---|
| `areJidsSameUser` |
| `getServerFromDomainType` |
| `isHostedLidUser` |
| `isHostedPnUser` |
| `isJidBot` |
| `isJidBroadcast` |
| `isJidGroup` |
| `isJidLocationBroadcast` |
| `isJidMetaAI` |
| `isJidMetaAi` |
| `isJidNewsletter` |
| `isJidStatusBroadcast` |
| `isJidUser` |
| `isLidUser` |
| `isPnUser` |
| `jidDecode` |
| `jidEncode` |
| `jidNormalizedUser` |
| `LOCATION_BROADCAST_JID` |
| `META_AI_JID` |
| `OFFICIAL_BIZ_JID` |
| `PSA_WID` |
| `S_WHATSAPP_NET` |
| `SERVER_JID` |
| `STORIES_JID` |
| `transferDevice` |
| `WAJIDDomains` |

### `lib/WABinary/types.d.ts`

| Declared export |
|---|
| `BinaryNode` |
| `BinaryNodeAttributes` |
| `BinaryNodeCodingOptions` |
| `BinaryNodeData` |

### `lib/WAM/BinaryInfo.d.ts`

| Declared export |
|---|
| `BinaryInfo` |

### `lib/WAM/constants.d.ts`

| Declared export |
|---|
| `FLAG_BYTE` |
| `FLAG_EVENT` |
| `FLAG_EXTENDED` |
| `FLAG_FIELD` |
| `FLAG_GLOBAL` |
| `WEB_EVENTS` |
| `WEB_GLOBALS` |

### `lib/WAM/encode.d.ts`

| Declared export |
|---|
| `encodeWAM` |

### `lib/WAUSync/Protocols/USyncBusinessProtocol.d.ts`

| Declared export |
|---|
| `USyncBusinessProtocol` |

### `lib/WAUSync/Protocols/USyncContactProtocol.d.ts`

| Declared export |
|---|
| `USyncContactProtocol` |

### `lib/WAUSync/Protocols/USyncDeviceProtocol.d.ts`

| Declared export |
|---|
| `USyncDeviceProtocol` |

### `lib/WAUSync/Protocols/USyncDisappearingModeProtocol.d.ts`

| Declared export |
|---|
| `USyncDisappearingModeProtocol` |

### `lib/WAUSync/Protocols/USyncFeatureProtocol.d.ts`

| Declared export |
|---|
| `USYNC_FEATURES` |
| `USyncFeatureProtocol` |

### `lib/WAUSync/Protocols/USyncPictureProtocol.d.ts`

| Declared export |
|---|
| `USyncPictureProtocol` |

### `lib/WAUSync/Protocols/USyncSidelistProtocol.d.ts`

| Declared export |
|---|
| `USyncSidelistProtocol` |

### `lib/WAUSync/Protocols/USyncStatusProtocol.d.ts`

| Declared export |
|---|
| `USyncStatusProtocol` |

### `lib/WAUSync/Protocols/USyncTextStatusProtocol.d.ts`

| Declared export |
|---|
| `USyncTextStatusProtocol` |

### `lib/WAUSync/Protocols/USyncUsernameProtocol.d.ts`

| Declared export |
|---|
| `USyncUsernameProtocol` |

### `lib/WAUSync/Protocols/UsyncBotProfileProtocol.d.ts`

| Declared export |
|---|
| `USyncBotProfileProtocol` |

### `lib/WAUSync/Protocols/UsyncLIDProtocol.d.ts`

| Declared export |
|---|
| `USyncLIDProtocol` |

### `lib/WAUSync/USyncQuery.d.ts`

| Declared export |
|---|
| `USyncQuery` |

### `lib/WAUSync/USyncUser.d.ts`

| Declared export |
|---|
| `USyncUser` |

### `lib/exports-extra.d.ts`

| Declared export |
|---|
| `AbstractSocketClient` |
| `AudioFeeder` |
| `BASH_KEYWORDS` |
| `buildMergedTcTokenIndexWrite` |
| `buildTcTokenFromJid` |
| `C_KEYWORDS` |
| `CiphertextMessage` |
| `CMD_KEYWORDS` |
| `CodeHighlightType` |
| `CPP_KEYWORDS` |
| `CSHARP_KEYWORDS` |
| `CSS_KEYWORDS` |
| `DOUBLE_BYTE_TOKENS` |
| `emitSyncActionResults` |
| `executeWMexQuery` |
| `EXT_QUERY_IDS` |
| `extractCommunityMetadata` |
| `extractGroupMetadata` |
| `extractIE` |
| `extractNewsletterMessageMeta` |
| `generateSenderKey` |
| `generateSenderKeyId` |
| `generateSenderSigningKey` |
| `getFfmpeg` |
| `getMessageReportingToken` |
| `getSharp` |
| `GO_KEYWORDS` |
| `GroupCipher` |
| `GroupSessionBuilder` |
| `HTML_KEYWORDS` |
| `isStaleQueryError` |
| `isTcTokenExpired` |
| `JS_KEYWORDS` |
| `LabelAssociationType` |
| `LabelColor` |
| `LANGUAGE_KEYWORDS` |
| `LIDMappingStore` |
| `logger` |
| `makeBusinessSocket` |
| `makeChatsSocket` |
| `makeCommunitiesSocket` |
| `makeGroupsSocket` |
| `makeKeyedMutex` |
| `makeLibSignalRepository` |
| `makeMessagesRecvSocket` |
| `makeMessagesSocket` |
| `makeMexWithFallback` |
| `makeMutex` |
| `makeNewsletterExtMethods` |
| `makeNewsletterSocket` |
| `makeOfflineNodeProcessor` |
| `makeSocket` |
| `makeUsernameSocket` |
| `NEWSLETTER_ID_ALTERNATES` |
| `NEWSLETTER_SERVER_ID_MAX` |
| `NEWSLETTER_SERVER_ID_MIN` |
| `parseCatalogNode` |
| `parseCollectionsNode` |
| `parseOrderDetailsNode` |
| `parseProductNode` |
| `persistLidPnMappings` |
| `POWERSHELL_KEYWORDS` |
| `PreKeyManager` |
| `processContactAction` |
| `processMessage` |
| `PYTHON_KEYWORDS` |
| `readTcTokenIndex` |
| `RelayRtcTransport` |
| `resolveIssuanceJid` |
| `resolveTcTokenJid` |
| `RichSubMessageType` |
| `RUST_KEYWORDS` |
| `SenderChainKey` |
| `SenderKeyDistributionMessage` |
| `SenderKeyMessage` |
| `SenderKeyName` |
| `SenderKeyRecord` |
| `SenderKeyState` |
| `SenderMessageKey` |
| `shouldIncludeReportingToken` |
| `shouldSendNewTcToken` |
| `SignalingBridge` |
| `SINGLE_BYTE_TOKENS` |
| `storeTcTokensFromIqResult` |
| `TAGS` |
| `TC_TOKEN_INDEX_KEY` |
| `TOKEN_MAP` |
| `tokenizeCodeForRich` |
| `toNewsletterServerId` |
| `toNewsletterServerIds` |
| `toProductNode` |
| `triggerAutoFollow` |
| `uploadingNecessaryImages` |
| `uploadingNecessaryImagesOfProduct` |
| `USERNAME_CHECK_RESULT` |
| `USERNAME_QUERY_IDS` |
| `USERNAME_SOURCE` |
| `waitAllPromises` |
| `WasmEngine` |
| `WebSocketClient` |

### `lib/index.d.ts`

| Declared export |
|---|
| `Dugong` |
| `makeWASocket` |



---

# 🧰 Advanced Developer Cookbook

This section collects practical patterns for working with the public surfaces documented in this README. Examples are intentionally kept close to the package's ESM API style.

## 1. Minimal ESM Socket

```js
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@vanzxy/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth')

const sock = makeWASocket({
  auth: state
})

sock.ev.on('creds.update', saveCreds)

sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
  if (connection === 'open') {
    console.log('Connected')
  }

  if (connection === 'close') {
    console.log('Connection closed', lastDisconnect?.error)
  }
})
```

Keep the authentication state persistent and always attach the credential update listener when using a persistent auth backend.

## 2. Sending a Basic Message

```js
await sock.sendMessage(jid, {
  text: 'Hello from @vanzxy/baileys'
})
```

The socket remains the main transport boundary. Builders and helper utilities can prepare richer message payloads before they reach the socket.

## 3. Rich Message Builder Pattern

For builder-based features, keep the construction chain separate from the final send operation:

```js
const rich = new AIRich(sock)
  .setTitle('Vanzxy AI')
  .setFooter('Powered by @vanzxy/baileys')

await rich.send(jid)
```

When adding optional primitives, keep each primitive in the same builder chain. This makes the final payload easier to audit and makes it possible to isolate a failing primitive during testing.

## 4. Media Construction

Media helpers should be treated as an asynchronous boundary. Resolve remote media, upload or prepare it, then construct the message:

```js
const media = await prepareWAMessageMedia(
  {
    image: {
      url: imageUrl
    }
  },
  options
)
```

Do not assume that a URL-valued field is already a resolved media object. In particular, custom builder code should preserve `await` boundaries when calling asynchronous media utilities.

## 5. Quoted Messages

Quoted-message construction depends on the message key and message content available to the caller. Keep the original key intact when a reply relationship matters:

```js
const quoted = {
  key: originalMessage.key,
  message: originalMessage.message
}
```

Pass the quoted structure through the appropriate message-generation or builder option rather than reconstructing only the visible text.

## 6. LID and PN Awareness

This fork contains explicit LID/PN handling in message-generation paths. Applications should avoid hard-coding a PN JID when a target chat is LID-addressed.

A useful rule is:

```text
Target chat
   │
   ├── LID-addressed ──> use the available LID identity
   │
   └── PN-addressed  ──> use the PN identity
```

If you write a custom message generator or relay layer, follow the identity form already selected by the package instead of deriving a participant solely from `creds.me.id`.

## 7. Protobuf Objects

`WAProto` is exported by the package and can be used for typed protobuf construction. When a protobuf message exposes `fromObject`, prefer it over manually constructing internal protobuf representations:

```js
const value = proto.SomeMessage.fromObject({
  // fields supported by the generated schema
})
```

The exact field names must come from the generated schema shipped with this package. Do not copy fields from an unrelated Baileys version without checking the local `WAProto` definitions.

## 8. Inspecting Available Exports

The package exposes its main API through the package entrypoint. For debugging a particular release, inspect the local declaration files as the authoritative TypeScript surface:

```bash
find node_modules/@vanzxy/baileys -name '*.d.ts' | sort
```

For a specific declaration:

```bash
sed -n '1,220p' node_modules/@vanzxy/baileys/lib/Builders/index.d.ts
```

This is preferable to relying on an older README or an upstream package whose export surface may differ.

---

# 📨 Message Pipeline

A useful mental model for custom message work is:

```text
Application
    │
    ▼
Builder / helper
    │
    ├── content normalization
    ├── media preparation
    ├── quoted/context metadata
    ├── protobuf/message generation
    ▼
WAMessage
    │
    ▼
Socket send / relay
    │
    ▼
WhatsApp transport
    │
    ▼
Client rendering
```

A successful JavaScript call does not necessarily mean that the WhatsApp client will render a feature interactively. Native UI behavior can depend on the exact wire payload and the current client implementation.

For that reason, feature testing should distinguish:

- **Construction** — the JavaScript/protobuf object was generated.
- **Relay** — the socket accepted and transmitted the message.
- **Delivery** — the recipient received the message.
- **Rendering** — the client displayed it.
- **Interaction** — buttons, lists, cards, or other controls actually worked.

This distinction is particularly important for experimental native-flow, rich-response, commerce, and client-specific message surfaces.

---

# 🧱 Builder Design Principles

Custom builders in this fork should follow a few practical rules.

### Preserve chaining

Methods that configure a builder should return the builder instance when chaining is part of the API:

```js
const message = new AIRich(sock)
  .setTitle('Title')
  .setFooter('Footer')
  .setMentions(mentions)
```

### Keep asynchronous work explicit

If a builder method accepts a URL but internally resolves metadata or downloads content, the implementation must await the asynchronous operation before assigning its result to a field that expects a concrete value.

### Separate global helpers from feature-specific fixes

A narrowly scoped builder fix should preferably remain in the builder when the behavior is specific to that builder. Avoid changing a shared resolver globally just to compensate for one consumer unless the shared behavior itself is demonstrably incorrect.

### Preserve the wire contract

When adding a new primitive, inspect the corresponding protobuf/type definitions and existing serialization helpers before inventing a new object shape.

---

# 🧪 Feature Verification Matrix

Use the following layers when validating a feature:

| Layer | What to verify |
|---|---|
| Type surface | `.d.ts` declarations and exported names |
| Construction | Builder/helper returns the expected object |
| Serialization | Protobuf/node/message fields contain concrete values |
| Relay | Socket accepts the generated message |
| Delivery | Target chat receives it |
| Rendering | WhatsApp displays the intended UI |
| Interaction | User can operate the UI |
| Regression | Existing send/edit/reply paths remain functional |

For media features, add a separate check for:

```text
source URL
   ↓
media resolution
   ↓
upload / media preparation
   ↓
message generation
   ↓
relay
   ↓
client rendering
```

For interactive features, add:

```text
builder
   ↓
native-flow / rich-response payload
   ↓
relay
   ↓
client parser
   ↓
visible control
   ↓
interaction callback / response
```

---

# 🐛 Debugging Checklist

When a feature fails, capture the smallest useful reproduction.

### JavaScript error

Record:

```text
Node.js version
package version
exact method call
error message
stack trace
```

### Message sends but looks wrong

Inspect the generated payload before relay. Compare the expected protobuf field names and value types against the local `WAProto` declaration.

### Message says unavailable

Do not immediately assume the JavaScript builder is broken. Check separately:

1. whether the payload was constructed;
2. whether it was relayed;
3. whether the recipient received it;
4. whether the client understands that payload;
5. whether the feature requires a server/client capability not present in the current account or client.

### URL/media field contains an unexpected Promise

Trace every asynchronous resolver involved in the builder. A field intended to contain a string or concrete media descriptor must not receive an unresolved Promise.

### LID-related failure

Inspect the target JID form and the participant identity selected by the message-generation path. Avoid converting a LID target back to a PN merely because `creds.me.id` is available.

---

# 🔄 Upgrade Discipline

When upgrading `@vanzxy/baileys`, use this order:

```text
1. Back up auth state
        ↓
2. Record current package version
        ↓
3. Install the new version
        ↓
4. Check exports and .d.ts
        ↓
5. Run automated tests
        ↓
6. Test authentication
        ↓
7. Test ordinary text send
        ↓
8. Test media
        ↓
9. Test quoted/reply paths
        ↓
10. Test custom builders
        ↓
11. Test experimental features
```

Do not treat a successful installation as proof of runtime compatibility. A release can install correctly while a specific native message surface has changed behavior on the WhatsApp client side.

---

# 📋 Release Checklist

Before publishing a new package version:

- [ ] `package.json` version is correct.
- [ ] Node engine requirement is documented.
- [ ] ESM entrypoint remains valid.
- [ ] `files` allowlist contains every required published file.
- [ ] `README.md` describes the current release.
- [ ] `NOTICE.md` and `LICENSE` are present.
- [ ] `VanzxyBanner.js` is included when required by the package.
- [ ] `WAProto` is included.
- [ ] `lib` and declaration files are included.
- [ ] Tests pass.
- [ ] No accidental development files are included.
- [ ] Changelog/release notes describe breaking changes.
- [ ] Experimental features are clearly marked.
- [ ] Package contents are inspected before publishing.

A final package inspection can be performed with:

```bash
npm pack --dry-run
```

This lets you inspect what npm intends to include without publishing the package.

---

# 🧭 Documentation Navigation

When looking for information in this README:

| Need | Start here |
|---|---|
| Installation | Installation |
| First socket | Quick Start |
| Authentication | Authentication |
| Store | Store Backends |
| Buttons/native flow | Usage Examples |
| AIRich | AIRich documentation |
| A2UI | A2UI documentation |
| Media | Media helpers / Media Pipeline |
| LID/PN | LID/PN Compatibility |
| Protobuf | Protobuf Guide |
| Export name | API Reference / TypeScript Inventory |
| Runtime failure | Troubleshooting |
| Upgrade | Migration Guide |
| Package contents | Package Contents |
| Contribution | Contributing |
| License/attribution | Credits / NOTICE |

---

---

# 🧠 Maintainer-Level Reference

This section is intentionally practical: it maps documentation concerns to the package surfaces that maintainers are expected to inspect before changing behavior.

## 🔎 API Search Index

Use this index as a starting point rather than scanning the complete declaration inventory manually.

| Task | Primary surface | Related surface |
|---|---|---|
| Create a socket | `makeWASocket` | `lib/Socket/` |
| Work with WA protobuf | `WAProto` | `lib/WABinary/` |
| Build rich responses | `AIRich` | `lib/Builders/` |
| Build A2UI payloads | `A2UI` | `lib/Builders/` |
| Prepare media | `prepareWAMessageMedia` | media utilities |
| Generate a message | `generateWAMessage*` | message helpers |
| Relay a message | socket relay APIs | socket/message send layer |
| Work with auth | auth-state helpers | `lib/Utils/` / auth modules |
| Work with Signal | Signal helpers | `lib/Signal/` |
| Work with stores | store exports | `lib/Store/` |
| Work with defaults | defaults/config | `lib/Defaults/` |
| Work with USync | USync exports | `lib/WAUSync/` |
| Inspect extra exports | `exports-extra.js` | package root exports |

### Finding a Symbol

For an exported symbol, search the generated TypeScript declarations first. The declaration inventory is useful for locating the public type contract; the corresponding implementation should then be inspected before changing runtime behavior.

Recommended order:

1. Locate the symbol in `*.d.ts`.
2. Identify the implementation module.
3. Inspect the callers of the implementation.
4. Inspect any protobuf types it constructs or consumes.
5. Add or update a focused test.
6. Update the relevant README/API section only after behavior is verified.

---

## 🗺️ Source Navigation Guide

| If you are changing... | Inspect first | Then inspect |
|---|---|---|
| Socket connection behavior | `lib/Socket/` | defaults, auth, disconnect handling |
| Message generation | message builder/generator modules | `WAProto`, JID helpers |
| Media preparation | media utility modules | upload/download helpers |
| AIRich behavior | `lib/Builders/AIRich.js` | related primitive/builders and types |
| A2UI behavior | `lib/Builders/A2UI.js` | protobuf/message generation |
| Button/native-flow behavior | Button builders | socket send path |
| Carousel behavior | Carousel builder | media + native-flow layers |
| LID behavior | JID/LID helpers | message generation and receive paths |
| Signal behavior | `lib/Signal/` | auth state and session callers |
| USync behavior | `lib/WAUSync/` | socket/user-resolution callers |
| Package exports | `lib/index.js`, `lib/exports-extra.js` | `lib/*/index.js` |
| Type surface | `*.d.ts` | runtime implementation |
| Package publishing | `package.json` | npm lifecycle files |
| Startup banner | `VanzxyBanner.js` | package scripts / entrypoint |

**Rule:** do not edit an implementation solely because a declaration or README suggests a behavior. Confirm the runtime path first.

---

## 🧯 Failure & Recovery Matrix

| Symptom | First checks | Recovery direction |
|---|---|---|
| Module import failure | Node version, ESM mode, package entry | verify runtime and import path |
| Missing export | root exports and declaration file | verify the symbol is actually exported |
| Authentication failure | auth-state persistence and credentials | restore/renew the affected auth state |
| Connection closes | disconnect error and reconnect policy | classify the close before retrying |
| Message rejected | generated protobuf shape and target JID | inspect the generated message before relay |
| Media fails | URL/upload path, MIME, size, preparation | isolate preparation from relay |
| Rich response renders incorrectly | builder output and primitive type | inspect generated unified-response payload |
| LID-specific failure | target addressing mode and participant fields | trace LID/PN selection through generation |
| TypeScript mismatch | shipped `.d.ts` vs runtime export | update declaration only after runtime contract is confirmed |
| Test passes but client fails | client-side support/feature gate | classify as runtime/client compatibility issue |

### Recovery Principle

Do not repeatedly retry an unknown failure. Capture the first meaningful error, isolate the smallest failing layer, and verify whether the failure occurs during construction, serialization, transport, or client rendering.

---

## 📦 Publishing Guide

The package's `files` allowlist controls which repository files are included in the published package. The documented allowlist is:

```text
lib/**/*
WAProto/**/*
VanzxyBanner.js
NOTICE.md
LICENSE
README.md
```

This is packaging metadata, not a list of JavaScript imports. A file appearing here does **not** mean it must be imported by `README.md` or by the package entrypoint.

Before publishing, verify:

- `package.json` points to the intended package entrypoints.
- `lib/**/*` is present in the package artifact.
- `WAProto/**/*` is present.
- `VanzxyBanner.js` is present when the runtime expects it.
- `LICENSE` and `NOTICE.md` are present.
- `README.md` is present.
- Generated declarations intended for consumers are present inside the selected package paths.
- No accidental development-only files are being published.

### Lifecycle Note

`preinstall` and `prestart` are npm lifecycle/script names. They should not be renamed if their automatic npm lifecycle behavior is required.

---

## 📐 API Stability Policy

The documentation distinguishes three practical surfaces:

### Stable/Public

Exports and behaviors intentionally documented for consumers and represented by the package's public declaration/export surface.

### Experimental

Features whose behavior may depend on WhatsApp client support, evolving protobuf structures, or incomplete interoperability verification. Consumers should isolate these paths so they can be changed without rewriting the whole application.

### Internal

Implementation details under `lib/` that are not intended to become application-level contracts merely because they are importable from a source path.

**Important:** source visibility is not equivalent to API stability.

---

## 🧪 End-to-End Verification Recipe

For a change that touches message construction, use a layered verification sequence:

```text
Type/declaration check
        ↓
Builder construction
        ↓
Proto/object inspection
        ↓
Message generation
        ↓
Serialization/normalization
        ↓
Relay/send path
        ↓
Real-client rendering
```

A successful earlier layer does not prove the later layer is correct. For example, a protobuf object can be structurally valid while the WhatsApp client still ignores a feature.

### Focused Test Rule

When debugging a builder, prefer a small test for one method or one message family. Large chained tests can hide which mutation introduced the failure.

---

## 🧬 Protobuf Change Discipline

`WAProto` is a central compatibility surface. When changing a message builder:

1. Identify the exact protobuf message type.
2. Confirm field names and nested message structure.
3. Use the project's supported conversion/serialization path.
4. Avoid inventing fields merely because a similarly named field exists elsewhere.
5. Inspect the serialized/generated object before transport.
6. Test both the builder output and the real relay path when possible.

### `fromObject()` Is Not a Rendering Guarantee

Successfully constructing a protobuf object demonstrates that the object can be represented by the generated schema. It does not prove that the current WhatsApp client will render the resulting message interactively.

---

## 🆔 LID / PN Debugging Checklist

When an operation works for phone-number JIDs but fails for LID-addressed chats, inspect:

- target JID format;
- `creds.me` identifiers;
- whether both PN and LID identity values are available;
- participant derivation;
- quoted-message participant fields;
- generated message target;
- relay destination;
- receive-side normalization.

Do not solve a LID problem by blindly replacing every JID with a PN JID. The addressing mode is part of the message context.

---

## 🖼️ Media Debugging Checklist

Separate these questions:

1. Can the URL/file be fetched?
2. Is the media type known correctly?
3. Does media preparation succeed?
4. Does upload/preparation return usable metadata?
5. Is the generated protobuf valid?
6. Does relay succeed?
7. Does the client render the message as intended?

This separation is especially important for builders that accept both URLs and already-prepared media objects.

---

## 🤖 Rich Response Debugging Checklist

For AIRich/A2UI-style features, inspect the pipeline in this order:

```text
Builder state
  ↓
Primitive/section construction
  ↓
Unified response data
  ↓
Message content
  ↓
Generated WAMessage
  ↓
Relay
  ↓
Client renderer
```

If the payload exists but the client displays an empty or unsupported message, treat client rendering as a separate compatibility layer rather than immediately rewriting the builder.

---

## 🧹 Maintainer Pre-Merge Checklist

### Runtime

- [ ] Node requirement remains satisfied.
- [ ] ESM imports remain valid.
- [ ] No accidental CommonJS-only code was introduced.
- [ ] Public exports still resolve.

### Types

- [ ] Relevant `.d.ts` files match the runtime API.
- [ ] New public methods have declarations.
- [ ] Optional parameters and return types are accurate.

### Messages

- [ ] Generated protobuf shape was inspected.
- [ ] JID/LID behavior was considered.
- [ ] Quoted/participant context was checked where relevant.
- [ ] Media preparation was tested separately where relevant.

### Tests

- [ ] Focused test passes.
- [ ] Regression test exists for a bug fix.
- [ ] Real-client behavior was checked when the feature depends on client rendering.

### Documentation

- [ ] README reflects verified behavior.
- [ ] Experimental behavior is labeled as such.
- [ ] Changelog entry describes the actual change.
- [ ] No original README assets were accidentally removed.

### Package

- [ ] `package.json.files` still contains required runtime/documentation files.
- [ ] LICENSE/NOTICE remain included.
- [ ] Published artifact was inspected before release.

---

## 🚀 Release Checklist

```text
[ ] Source changes complete
[ ] Focused tests pass
[ ] Full relevant test suite passes
[ ] Type declarations checked
[ ] Exports checked
[ ] README updated
[ ] Changelog updated
[ ] LICENSE / NOTICE checked
[ ] package.json version checked
[ ] files allowlist checked
[ ] npm artifact inspected
[ ] Installation tested from a clean environment
[ ] Runtime smoke test completed
```

A release should be reproducible from the published artifact, not only from the repository working tree.

---

## 🧑‍💻 Maintainer Development Workflow

A disciplined workflow for substantial changes:

### 1. Identify the contract

Determine whether the requested behavior is a public API, an internal implementation detail, a protobuf change, or a client-rendering experiment.

### 2. Locate the narrowest implementation

Use the source navigation guide and declarations to avoid editing unrelated modules.

### 3. Build the smallest reproduction

Prefer one message, one builder method, one target JID, and one expected output.

### 4. Inspect intermediate output

Do not rely exclusively on the final WhatsApp UI. Log or inspect the generated object at the layer where the behavior first diverges.

### 5. Fix the narrowest layer

Avoid changing global helpers to fix a local builder bug when the builder can correctly normalize its own input.

### 6. Add a regression test

The test should fail on the old behavior and pass on the new behavior.

### 7. Update declarations and documentation

Only document behavior that was actually verified.

### 8. Verify packaging

Check the final npm artifact rather than assuming the repository contents equal the published package.

---

## 📚 Documentation Reading Order

For a new consumer:

```text
README overview
   ↓
Installation
   ↓
Quick Start
   ↓
Authentication
   ↓
Basic message sending
   ↓
Usage Examples
   ↓
Feature-specific Builder docs
```

For a maintainer:

```text
Package structure
   ↓
Export catalog
   ↓
Source navigation
   ↓
WAProto / declarations
   ↓
Focused tests
   ↓
Failure & recovery matrix
   ↓
Publishing / release checklist
```

---

## 🧾 Documentation Integrity Rules

This README intentionally separates three kinds of information:

- **Verified package behavior** — behavior observed in the package/source or tests.
- **Client-dependent behavior** — behavior that additionally depends on WhatsApp's current client/server implementation.
- **Operational guidance** — recommended debugging or maintenance workflow.

These should not be treated as interchangeable. A builder being exported does not prove every client supports every message shape it can construct.

Likewise, a README example is documentation—not an assertion that every future WhatsApp client version will render the feature identically.

---

## 🏁 Final Maintainer Principle

The goal of this fork is not simply to expose more APIs. A maintainable WhatsApp library needs a clear boundary between:

```text
Public API
   +
Correct protobuf construction
   +
Predictable runtime behavior
   +
Focused regression tests
   +
Client compatibility awareness
   +
Accurate documentation
   +
Reproducible packaging
```

When those layers remain aligned, new features can be added without turning the package into an untraceable collection of patches.

---

---

<div align="center">

<img src="https://files.catbox.moe/tfqh0f.gif" width="60%" alt="Thanks for visiting"/>

Thanks for visiting, bye 👋

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2ecc71,100:1d6a23&height=100&section=footer" width="100%"/>

Made with 🍃 by **Vanzxy**

Thanks for stopping by! ✌️

<a href="#top">⬆️ Back to top</a>

</div>
---
