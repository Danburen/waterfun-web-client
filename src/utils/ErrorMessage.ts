import type {ErrorMessageKey} from '@/types/ErrorCode';
import {ERROR_CODE_MESSAGE_KEY_MAP, ErrorCode} from '@/types/ErrorCode';
import {translate} from "~/utils/utils";

/**
 * Return the translated error message reference to error code
 * @param code error code
 * @returns message
 */
export function getErrorMessage(code: ErrorCode): string {
    const messageKey = ERROR_CODE_MESSAGE_KEY_MAP[code] || 'unknownError' as ErrorMessageKey;
    if(messageKey === 'unknownError'){
        return translate('message.error.unknownError') + `(${code})`;
    }else{
        return translate(`message.error.badRequest.${messageKey}`);
    }
}