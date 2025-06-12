import { ErrorCode, ERROR_CODE_MESSAGE_KEY_MAP } from '@/types/ErrorCode';
import type {ErrorMessageKey} from '@/types/ErrorCode';
import {translate} from "~/utils/utils";

/**
 * Return the translated error message reference to error code
 * @param code error code
 * @returns message
 */
export function getErrorMessage(code: ErrorCode): string {
    const messageKey = ERROR_CODE_MESSAGE_KEY_MAP[code] || 'unknown-error' as ErrorMessageKey;
    if(messageKey === 'unknown-error'){
        return translate('message.error.unknown-error') + `(${code})`;
    }else{
        return translate(`message.error.bad-request.${messageKey}`);
    }
}