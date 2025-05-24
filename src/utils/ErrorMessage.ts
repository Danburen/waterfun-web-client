// import type {Composer} from "vue-i18n";
//
// export const createErrorMessage = (i18n:Composer) =>{
//     const t = (key: string) => i18n.t('auth.validate.' + key);
// }
import { ErrorCode, ERROR_CODE_MESSAGE_KEY_MAP } from '@/types/ErrorCode';
import {translate} from "~/utils/utils";

/**
 * Return the translated error message reference to error code
 * @param code error code
 * @returns message
 */
export function getErrorMessage(code: ErrorCode): string {
    const messageKey = ERROR_CODE_MESSAGE_KEY_MAP[code] || 'Unknown error';
    return translate(`message.error.bad-request.${messageKey}`);
}