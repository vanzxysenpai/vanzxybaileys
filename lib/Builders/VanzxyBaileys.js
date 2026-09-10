import { AIRich } from './AIRich.js'
import { Button } from './Button.js'
import { ButtonV2 } from './ButtonV2.js'
import { ButtonV3 } from './ButtonV3.js'
import { Carousel } from './Carousel.js'
import { Poll } from './Poll.js'
import { A2UI } from './A2UI.js'
import { NativeFlow } from './NativeFlow.js'
import { Location } from './Location.js'
import { Contact } from './Contact.js'
import { Album } from './Album.js'
import { bindLinkPreview } from './LinkPreview.js'

/**
 * VanzxyBaileys — unified builder hub.
 *
 * Semua builder tetap berada di class/file masing-masing.
 * Class ini hanya menyediakan satu pintu masuk.
 */
class VanzxyBaileys {
  constructor(client) {
    if (!client) {
      throw new TypeError(
        'VanzxyBaileys(client) requires an active Baileys socket/client'
      )
    }

    this.client = bindLinkPreview(client)
  }

  // ===== AIRICH =====

  airich() {
    return new AIRich(this.client)
  }

  vanzxyAI() {
    return new AIRich(this.client)
  }

  aiVanzxy() {
    return new AIRich(this.client)
  }

  leafRich() {
    return new AIRich(this.client)
  }

  vanzxyRich() {
    return new AIRich(this.client)
  }

  richVanzxy() {
    return new AIRich(this.client)
  }

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

  // ===== NATIVE FLOW =====

  nativeFlow() {
    return new NativeFlow(this.client)
  }

  location() {
    return new Location(this.client)
  }

  contact() {
    return new Contact(this.client)
  }

  album() {
    return new Album(this.client)
  }

  // ===== A2UI / BLOKS =====

  a2ui() {
    return new A2UI()
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

  Carousel() {
    return this.carousel()
  }

  Poll() {
    return this.poll()
  }

  NativeFlow() {
    return this.nativeFlow()
  }

  Location() {
    return this.location()
  }

  Contact() {
    return this.contact()
  }

  Album() {
    return this.album()
  }

  A2UI() {
    return this.a2ui()
  }
}

export { VanzxyBaileys }
