import type { CloudResourceUrlResp } from '@waterfun/web-core/src/types/api/response';

export interface UserInfoResponse {
    uid: string;
    username: string;
    nickname: string;
    avatar: CloudResourceUrlResp;
    accountStatus: string;
    createdAt: string;
    passwordHash: boolean;
}

export interface UserProfileDto{
    avatar: CloudResourceUrlResp;
    bio: string;
    gender: string;
    birthday: string; // ISO 8601 格式日期字符串
    residence: string;
}
