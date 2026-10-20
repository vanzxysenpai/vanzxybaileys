import { AIRich } from './AIRich.js'
import { Button } from './Button.js'
import { ButtonV2 } from './ButtonV2.js'
import { ButtonV3 } from './ButtonV3.js'
import { Carousel } from './Carousel.js'
import { Poll } from './Poll.js'
import { A2UI } from './A2UI.js'

/**
 * VanzxyBaileys — unified builder hub.
 *
 * Semua builder tetap berada di class/file masing-masing.
 * Class ini hanya menyediakan satu pintu masuk.
 */
class VanzxyBaileys {
  constructor(client) {
    if (!client) {
      throw new Error(
        'VanzxyBaileys(client) requires an active Baileys socket/client'
      )
    }

    this.client = client
  }

  // ===== AIRICH =====

  /** Canonical factory — prefer this in new code. @param {{unsupportedTypeAlert?: boolean}} [options] */
  airich(options) {
    return new AIRich(this.client, options)
  }

  // --- deprecated aliases, all identical to airich(). Kept for backward
  // compat with code written before v2.0.4; will be removed in a future
  // major. Don't add new names here — use airich() / AIRich() instead.
  vanzxyAI() { return this.airich() }
  aiVanzxy() { return this.airich() }
  leafRich() { return this.airich() }
  vanzxyRich() { return this.airich() }
  richVanzxy() { return this.airich() }

  // ===== BUTTON =====

  button() {
    return new Button(this.client)
  }

  buttonV2() {
    return new ButtonV2(this.client)
  }

  buttonV3() {
    return new ButtonV3(this.client)
  }

  // ===== CAROUSEL =====

  carousel() {
    return new Carousel(this.client)
  }

  // ===== POLL =====

  poll() {
    return new Poll(this.client)
  }

  // ===== A2UI / BLOKS =====

  a2ui() {
    // Vanz@Fix (bug 85): A2UI's constructor doesn't take a client (by design —
    // it's a pure spec builder), but its send(client, jid, opts) takes the
    // client as its *first* argument, unlike every other builder off this hub
    // (Button/ButtonV2/ButtonV3/Carousel/Poll all pre-bind #client at
    // construction and expose send(jid, opts)). Calling hub.a2ui().send(jid,
    // opts) the same way you'd call any sibling builder's send() silently
    // passes `jid` as `client` and `opts` as `jid` -- exactly the inconsistency
    // this hub exists to prevent. Wrap send() here so it matches the hub's own
    // calling convention; the standalone `new A2UI()` + `sendA2UIWidget(client,
    // jid, {...})` path (used without this hub) is untouched.
    const instance = new A2UI()
    const client = this.client
    const originalSend = instance.send.bind(instance)
    instance.send = (jid, opts) => originalSend(client, jid, opts)
    return instance
  }

  /**
   * Alias PascalCase untuk developer yang suka naming class.
   */
  AIRich() {
    return this.airich()
  }

  Button() {
    return this.button()
  }

  ButtonV2() {
    return this.buttonV2()
  }

  ButtonV3() {
    return this.buttonV3()
  }

  Carousel() {
    return this.carousel()
  }

  Poll() {
    return this.poll()
  }

  A2UI() {
    return this.a2ui()
  }
}

export { VanzxyBaileys }
