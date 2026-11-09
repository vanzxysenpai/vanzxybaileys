/**
 * VanzxyBaileys — unified builder hub.
 *
 * Semua builder tetap berada di class/file masing-masing.
 * Class ini hanya menyediakan satu pintu masuk.
 */
export class VanzxyBaileys {
    constructor(client: any);
    client: any;
    /** Canonical factory — prefer this in new code. @param {{unsupportedTypeAlert?: boolean}} [options] */
    airich(options?: {
        unsupportedTypeAlert?: boolean;
    }): AIRich;
    vanzxyAI(): AIRich;
    aiVanzxy(): AIRich;
    leafRich(): AIRich;
    vanzxyRich(): AIRich;
    richVanzxy(): AIRich;
    button(): Button;
    buttonV2(): ButtonV2;
    buttonV3(): ButtonV3;
    carousel(): Carousel;
    poll(): Poll;
    a2ui(): A2UI;
    /**
     * Alias PascalCase untuk developer yang suka naming class.
     */
    AIRich(): AIRich;
    Button(): Button;
    ButtonV2(): ButtonV2;
    ButtonV3(): ButtonV3;
    Carousel(): Carousel;
    Poll(): Poll;
    A2UI(): A2UI;
}
import { AIRich } from './AIRich.js';
import { Button } from './Button.js';
import { ButtonV2 } from './ButtonV2.js';
import { ButtonV3 } from './ButtonV3.js';
import { Carousel } from './Carousel.js';
import { Poll } from './Poll.js';
import { A2UI } from './A2UI.js';
