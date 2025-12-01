export type ApiResponse<T = any> = {
    code: number
    message: string
    data: T
}
// Only have data
export type DataApiResponse<T> = Required<Pick<ApiResponse<T>, 'data'>> & ApiResponse<T>;
// only have message
export type MessageApiResponse = Required<Pick<ApiResponse, 'message'>> & ApiResponse;

export interface FileResDataType {
    fileName: string;
    fileSize: number;
    lastModified: string; // ISO 8601 格式日期字符串
    content: string;
    fileType: string;
    contentType: string;
}

export interface UserInfoResponse {
    uid: string;
    username: string;
    accountStatus: string;
    createdAt: string;
}

export interface UserProfileResponse{
    nickname: string;
    avatar: string;
    bio: string;
    gender: string;
}

export interface UserDataResponse {
    accessToken: string;
    exp: number
}

export type LoginResponseDataType = DataApiResponse<UserDataResponse>;

// 头像上传策略响应类型
export interface AvatarUploadPolicyResponse {
    key: string;
    url: string;
    method: string;
}

// 云资源预览响应类型
export interface CloudResourceViewResp {
    previewUrl: string;
}