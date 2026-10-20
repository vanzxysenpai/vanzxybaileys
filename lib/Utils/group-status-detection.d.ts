export function isGroupStatusValue(value: any): boolean;
export function hasGroupStatusFlag(value: any, depth?: number, seenObjects?: WeakSet<object>): boolean;
export function getCurrentMessageContentVariants(message: any, depth?: number, seenObjects?: WeakSet<object>): any[];
/** Verifica se a webMessage é uma marcação de status em grupo, inclusive em wrappers ou níveis profundos. */
export function hasGroupStatusMessage(webMessage: any): boolean;
