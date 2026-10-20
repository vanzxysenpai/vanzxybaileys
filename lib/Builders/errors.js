// Vanz@Add (v2.1.0) --- typed errors for the builders, ported from @yudzxml/baileys 7.6.6 /
// @rexxhayanasi/elaina-baileys (AIRichError family). Messages stay compatible with the old plain
// Error texts, so `catch (e) { e.message }` callers keep working; new code can branch on `e.code`.
export class AIRichError extends Error {
	constructor(message, code = 'AIRICH_ERROR', meta = {}) {
		super(message);
		this.name = 'AIRichError';
		this.code = code;
		Object.assign(this, meta);
	}
	// Vanz@Add (v2.1.14) --- Go AIRichError helpers. `code` = Go `Code()`, `message`/`toString()` = Go `Error()`.
	/** Go `Unwrap()`: the underlying error (`meta.cause` / `Error.cause`), or `null`. */
	unwrap() {
		return this.cause ?? null;
	}
	/** Go `MarshalJSON`-style: plain object for `JSON.stringify(error)`. */
	toJSON() {
		const { name, code, message, stack, cause, ...meta } = this;
		return { name: this.name, code: this.code, message: this.message, ...(cause ? { cause: cause instanceof Error ? { name: cause.name, message: cause.message } : cause } : {}), ...meta };
	}
}
export class ItemNotFoundError extends AIRichError {
	constructor(message, meta = {}) { super(message, 'ITEM_NOT_FOUND', meta); this.name = 'ItemNotFoundError'; }
}
export class DuplicateIdError extends AIRichError {
	constructor(message, meta = {}) { super(message, 'DUPLICATE_ID', meta); this.name = 'DuplicateIdError'; }
}
export class InvalidTargetError extends AIRichError {
	constructor(message, meta = {}) { super(message, 'INVALID_TARGET', meta); this.name = 'InvalidTargetError'; }
}
export class ContentValidationError extends AIRichError {
	constructor(message, meta = {}) { super(message, 'CONTENT_VALIDATION', meta); this.name = 'ContentValidationError'; }
}
