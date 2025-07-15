export type SendCodeType = {
    phoneNumber?: string;
    email?: string;
    purpose: 'login' | 'register' | 'resetPassword'
}

export type ApiResponse<T = any> = {
    code: number
    message: string
    data: T
}

// Only have data
export type DataApiResponse<T> = Required<Pick<ApiResponse<T>, 'data'>> & ApiResponse<T>;
// only have message
export type MessageApiResponse = Required<Pick<ApiResponse, 'message'>> & ApiResponse;

//lang
export type LanguageTypes = 'en_US' | 'zh_CN'
export const LangMap: Record<string, LanguageTypes> = {
    'en': 'en_US',
    'zh': 'zh_CN',
}