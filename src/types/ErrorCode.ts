export enum ErrorCode {
    USERNAME_EMPTY = 40001,
    PASSWORD_EMPTY = 40002,
    USERNAME_OR_PASSWORD_INCORRECT = 40003,
    CAPTCHA_EXPIRED = 40004,
    CAPTCHA_INCORRECT = 40005,
    VERIFY_CODE_EXPIRED = 40006,
    VERIFY_CODE_INCORRECT = 40007,
    SMS_CODE_EXPIRED = 40008,
    SMS_CODE_INCORRECT = 40009,
    EMAIL_CODE_EXPIRED = 40010,
    EMAIL_CODE_INCORRECT = 40011,
}

export type ErrorMessageKey =
    | 'username-empty' | 'password-empty' | 'username-or-password-incorrect'
    | 'captcha-expired' | 'captcha-incorrect'
    | 'verify-code-expired' | 'verify-code-incorrect'
    | 'sms-code-expired' | 'sms-code-incorrect'
    | 'email-code-expired' | 'email-incorrect'

export const ERROR_CODE_MESSAGE_KEY_MAP:Record<string, ErrorMessageKey> = {
    [ErrorCode.USERNAME_EMPTY]: 'username-empty',
    [ErrorCode.PASSWORD_EMPTY]: 'password-empty',
    [ErrorCode.USERNAME_OR_PASSWORD_INCORRECT]: 'username-or-password-incorrect',
    [ErrorCode.CAPTCHA_EXPIRED]: 'captcha-expired',
    [ErrorCode.CAPTCHA_INCORRECT]: 'captcha-incorrect',
    [ErrorCode.VERIFY_CODE_EXPIRED]: 'verify-code-expired',
    [ErrorCode.VERIFY_CODE_INCORRECT]: 'verify-code-incorrect',
    [ErrorCode.SMS_CODE_EXPIRED]: 'sms-code-expired',
    [ErrorCode.SMS_CODE_INCORRECT]: 'sms-code-incorrect',
    [ErrorCode.EMAIL_CODE_EXPIRED]: 'email-code-expired',
    [ErrorCode.EMAIL_CODE_INCORRECT]: 'email-incorrect',
}