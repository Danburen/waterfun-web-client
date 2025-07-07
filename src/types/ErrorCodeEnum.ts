// Basic http status
export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

// Service error code
export enum ErrorCode {
    // general error
    UNKNOWN_ERROR = 50000,

    // user info related error
    USERNAME_EMPTY_OR_INVALID = 40001,
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
    PHONE_NUMBER_EMPTY_OR_INVALID = 40015,
    EMAIL_ADDRESS_EMPTY_OR_INVALID = 40016,
    USER_ALREADY_EXISTS = 40017,
    USER_NOT_FOUND = 40018,

    // user role error
    ROLE_NOT_FOUND = 40019,
    ROLE_ALREADY_EXISTS = 40020,
    PERMISSION_NOT_FOUND = 40021,
    PERMISSION_ALREADY_EXISTS = 40022,
    REDUNDANT_OPERATION = 40023,

    // auth error
    ACCESS_TOKEN_EXPIRED = 40101,
    ACCESS_TOKEN_INVALID = 40102,
    ACCESS_TOKEN_MISSING = 40103,
    REFRESH_TOKEN_EXPIRED = 40104,
    REFRESH_TOKEN_INVALID = 40105,
    REFRESH_TOKEN_MISSING = 40106
}

// 错误消息键类型
export type ErrorMessageKey =
    | 'usernameEmptyOrInvalid' | 'passwordEmpty' | 'usernameOrPasswordIncorrect'
    | 'captchaExpired' | 'captchaIncorrect' | 'captchaEmpty'
    | 'verifyCodeExpired' | 'verifyCodeIncorrect'
    | 'smsCodeExpired' | 'smsCodeIncorrect' | 'smsCodeEmpty'
    | 'emailCodeExpired' | 'emailCodeIncorrect' | 'emailCodeEmpty'
    | 'phoneNumberEmptyOrInvalid' | 'emailAddressEmptyOrInvalid'
    | 'userAlreadyExists' | 'userNotFound'
    | 'roleNotFound' | 'roleAlreadyExists'
    | 'permissionNotFound' | 'permissionAlreadyExists'
    | 'redundantOperation'
    | 'accessTokenExpired' | 'accessTokenInvalid' | 'accessTokenMissing'
    | 'refreshTokenExpired' | 'refreshTokenInvalid' | 'refreshTokenMissing'
    | 'unknownError'

// Error message mapper
export const ERROR_CODE_MESSAGE_KEY_MAP: Record<number, ErrorMessageKey> = {
    // general error
    [ErrorCode.UNKNOWN_ERROR]: 'unknownError',

    // user info error
    [ErrorCode.USERNAME_EMPTY_OR_INVALID]: 'usernameEmptyOrInvalid',
    [ErrorCode.PASSWORD_EMPTY]: 'passwordEmpty',
    [ErrorCode.USERNAME_OR_PASSWORD_INCORRECT]: 'usernameOrPasswordIncorrect',
    [ErrorCode.CAPTCHA_EXPIRED]: 'captchaExpired',
    [ErrorCode.CAPTCHA_INCORRECT]: 'captchaIncorrect',
    [ErrorCode.VERIFY_CODE_EXPIRED]: 'verifyCodeExpired',
    [ErrorCode.VERIFY_CODE_INCORRECT]: 'verifyCodeIncorrect',
    [ErrorCode.SMS_CODE_EXPIRED]: 'smsCodeExpired',
    [ErrorCode.SMS_CODE_INCORRECT]: 'smsCodeIncorrect',
    [ErrorCode.EMAIL_CODE_EXPIRED]: 'emailCodeExpired',
    [ErrorCode.EMAIL_CODE_INCORRECT]: 'emailCodeIncorrect',
    [ErrorCode.CAPTCHA_EMPTY]: 'captchaEmpty',
    [ErrorCode.SMS_CODE_EMPTY]: 'smsCodeEmpty',
    [ErrorCode.EMAIL_CODE_EMPTY]: 'emailCodeEmpty',
    [ErrorCode.PHONE_NUMBER_EMPTY_OR_INVALID]: 'phoneNumberEmptyOrInvalid',
    [ErrorCode.EMAIL_ADDRESS_EMPTY_OR_INVALID]: 'emailAddressEmptyOrInvalid',
    [ErrorCode.USER_ALREADY_EXISTS]: 'userAlreadyExists',
    [ErrorCode.USER_NOT_FOUND]: 'userNotFound',

    // user role error
    [ErrorCode.ROLE_NOT_FOUND]: 'roleNotFound',
    [ErrorCode.ROLE_ALREADY_EXISTS]: 'roleAlreadyExists',
    [ErrorCode.PERMISSION_NOT_FOUND]: 'permissionNotFound',
    [ErrorCode.PERMISSION_ALREADY_EXISTS]: 'permissionAlreadyExists',
    [ErrorCode.REDUNDANT_OPERATION]: 'redundantOperation',

    // auth error
    [ErrorCode.ACCESS_TOKEN_EXPIRED]: 'accessTokenExpired',
    [ErrorCode.ACCESS_TOKEN_INVALID]: 'accessTokenInvalid',
    [ErrorCode.ACCESS_TOKEN_MISSING]: 'accessTokenMissing',
    [ErrorCode.REFRESH_TOKEN_EXPIRED]: 'refreshTokenExpired',
    [ErrorCode.REFRESH_TOKEN_INVALID]: 'refreshTokenInvalid',
    [ErrorCode.REFRESH_TOKEN_MISSING]: 'refreshTokenMissing'
}