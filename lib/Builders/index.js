export { Toolkit, BaseBuilder, RowBuilder } from './shared.js';
export { Button, CardBuilder } from './Button.js';
export { ButtonV2 } from './ButtonV2.js';
export { ButtonV3 } from './ButtonV3.js';
export { Carousel } from './Carousel.js';
export { Poll } from './Poll.js';
export { Album } from './Album.js';
export { Event } from './Event.js';
export { Expiring, ExpiringButton } from './Expiring.js';
export { AIRichError, ItemNotFoundError, DuplicateIdError, InvalidTargetError, ContentValidationError } from './errors.js';
export { AIRich, ORich } from './AIRich.js';
export { tokenizeCodeForRich } from './AIRich.js';
export { A2UI, sendA2UIWidget } from './A2UI.js';

/**
 * @deprecated Legacy aliases for `AIRich`, kept only for backward compat with
 * code written before v2.0.4. All five are the exact same class — pick one
 * canonical name (`AIRich`) in new code. Will be removed in a future major.
 */
export { AIRich as AIVanzxy, AIRich as LeafRich, AIRich as VanzxyAI, AIRich as VanzxyRich, AIRich as RichVanzxy } from './AIRich.js';
// Vanz@Fix (v2.1.12) --- was hardcoded '4.9.7' (unrelated to the package version); now follows package.json.
import { createRequire } from 'module';
export const MESSAGE_BUILDER_VERSION = createRequire(import.meta.url)('../../package.json').version;
export { VanzxyBaileys } from './VanzxyBaileys.js';
