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
    CAPTCHA_EMPTY = 40012,
    SMS_CODE_EMPTY = 40013,
    EMAIL_CODE_EMPTY = 40014,
    UNKNOWN_ERROR = 50000,
}

export type ErrorMessageKey =
    | 'usernameEmpty' | 'passwordEmpty' | 'usernameOrPasswordIncorrect'
    | 'captchaExpired' | 'captchaIncorrect'
    | 'verifyCodeExpired' | 'verifyCodeIncorrect'
    | 'smsCodeExpired' | 'smsCodeIncorrect'
    | 'emailCodeExpired' | 'emailIncorrect'
    | 'captchaEmpty' | 'smsCodeEmpty' | 'emailCodeEmpty'
    | 'unknownError'

export const ERROR_CODE_MESSAGE_KEY_MAP:Record<string, ErrorMessageKey> = {
    [ErrorCode.USERNAME_EMPTY]: 'usernameEmpty',
    [ErrorCode.PASSWORD_EMPTY]: 'passwordEmpty',
    [ErrorCode.USERNAME_OR_PASSWORD_INCORRECT]: 'usernameOrPasswordIncorrect',
    [ErrorCode.CAPTCHA_EXPIRED]: 'captchaExpired',
    [ErrorCode.CAPTCHA_INCORRECT]: 'captchaIncorrect',
    [ErrorCode.VERIFY_CODE_EXPIRED]: 'verifyCodeExpired',
    [ErrorCode.VERIFY_CODE_INCORRECT]: 'verifyCodeIncorrect',
    [ErrorCode.SMS_CODE_EXPIRED]: 'smsCodeExpired',
    [ErrorCode.SMS_CODE_INCORRECT]: 'smsCodeIncorrect',
    [ErrorCode.EMAIL_CODE_EXPIRED]: 'emailCodeExpired',
    [ErrorCode.EMAIL_CODE_INCORRECT]: 'emailIncorrect',
    [ErrorCode.CAPTCHA_EMPTY]: 'captchaEmpty',
    [ErrorCode.SMS_CODE_EMPTY]: 'smsCodeEmpty',
    [ErrorCode.EMAIL_CODE_EMPTY]: 'emailCodeEmpty',
}