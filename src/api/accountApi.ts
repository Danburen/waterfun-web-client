import type {DataApiResponse} from "~/types/BaseType";
import type {UserInfoResponse} from "~/api/types/UserResponseType";
import request from "~/utils/requests/axiosRequest";

export const accountApi = {
    getUserInfo():Promise<DataApiResponse<UserInfoResponse>>{
        return request.post(`/account/get-user-info`, {})
    }
}