import request from "../utils/axiosRequest";
import type {DataApiResponse, PromiseApiRes, UploadPolicyResponse, CloudResourceUrlResp} from "@waterfun/web-core/src/types/api/response.d.ts";
import type {UserProfileDto, UserInfoResponse} from "~/types/api/userResponse.d.ts";

export const userApi = {
    getUserInfo():PromiseApiRes<UserInfoResponse>{
        return request.get(`/user/userInfo`, {})
    },
    getUserProfile():PromiseApiRes<UserProfileDto>{
        return request.get(`/user/profile`, {})
    },
    updateUserProfile(data: Partial<UserProfileDto>):PromiseApiRes<UserProfileDto>{
        return request.put(`/user/updateProfile`, data)
    },

    getAvatarUploadPolicy(suffix: string):PromiseApiRes<UploadPolicyResponse>{
        return request.get(`/user/avatar/upload?suffix=${suffix}`)
    },
    
    uploadFileToCos(url: string, method: string, file: File):Promise<Response>{
        const uppercaseMethod = method.toUpperCase();
        const fetchOptions: RequestInit = {
            method: uppercaseMethod,
            body: file,
            headers: {}
        };
        
        return fetch(url, fetchOptions)
    },
    
    getAvatar():PromiseApiRes<CloudResourceUrlResp>{
        return request.get(`/user/avatar`);
    }
}