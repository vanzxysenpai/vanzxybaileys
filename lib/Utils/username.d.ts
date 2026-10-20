export const USERNAME_MIN_LENGTH: 3;
export const USERNAME_MAX_LENGTH: 35;
export const USERNAME_PIN_LENGTH: 4;
export namespace UsernameValidationError {
    let INVALID_CHARACTER: string;
    let INVALID_LENGTH: string;
    let INVALID_NO_LETTERS: string;
    let INVALID_PERIODS: string;
    let INVALID_DOMAIN_SUFFIX: string;
    let INVALID_WWW_PREFIX: string;
    let INVALID_WORD: string;
}
export function stripUsernamePrefix(username: any): any;
export function displayUsername(username: any): string;
export function validateUsername(username: any): {
    isValid: boolean;
    errorType: string;
} | {
    isValid: boolean;
    errorType?: undefined;
};
export function isUsernamePin(pin: any): boolean;
