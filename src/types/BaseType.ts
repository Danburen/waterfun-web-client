import type {LoginRequest} from "~/types/LoginRequest";

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