export type ApiResponse<T = any> = {
    code: string
    message: string
    data: T
}
// Only have data
export type DataApiResponse<T> = Required<Pick<ApiResponse<T>, 'data'>> & ApiResponse<T>;
// only have message
import type { UserDataResponse } from './userResponse';
export type MessageApiResponse = Required<Pick<ApiResponse, 'message'>> & ApiResponse;

export interface FileResDataType {
    fileName: string;
    fileSize: number;
    lastModified: string; // ISO 8601 格式日期字符串
    content: string;
    fileType: string;
    contentType: string;
}



export type LoginResponseDataType = DataApiResponse<UserDataResponse>;

export interface UploadPolicyResponse {
    key: string;
    url: string;
    method: string;
}

export interface CloudResourceUrlResp {
    url: string;
    expireAt: number;
}