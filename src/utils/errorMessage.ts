import { ErrorCode, ERROR_CODE_MESSAGE_KEY_MAP } from '~/types/ErrorCodeEnum'
import { translate } from '~/utils/common'
import { HttpStatus } from "~/types/ErrorCodeEnum";

/**
 * get the error code translate message
 * @param code error code
 * @param defaultMessage default message
 * @return translated error code message
 */
export function getErrorMessage(
    code: ErrorCode | HttpStatus,
    defaultMessage?: string
): string {
    if (Object.values(HttpStatus).includes(code as HttpStatus)) {
        return translate(`message.error.http.${code}`) ||
            defaultMessage ||
            translate('message.error.unknownError')
    }

    const messageKey = ERROR_CODE_MESSAGE_KEY_MAP[code] || 'unknownError'

    if (messageKey === 'unknownError') {
        return defaultMessage ||
            translate('message.error.unknownError') + ` (${code})`
    }

    if (code >= 40100 && code <= 40199) {
        return translate(`message.error.auth.${messageKey}`)
    }

    return translate(`message.error.badRequest.${messageKey}`)
}

export function isAuthError(code: ErrorCode): boolean {
    return code >= 40100 && code <= 40199
}

export function isClientError(code: ErrorCode | HttpStatus): boolean {
    return (code >= 40000 && code <= 49999) ||
        (code >= 400 && code <= 499)
}

export function isServerError(code: ErrorCode | HttpStatus): boolean {
    return (code >= 50000 && code <= 59999) ||
        (code >= 500 && code <= 599)
}