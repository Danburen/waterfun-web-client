import request from "~/utils/requests/axiosRequest";
import type {DataApiResponse, UserInfoResponse} from "~/types/api/response";

export const accountApi = {
    getUserInfo():Promise<DataApiResponse<UserInfoResponse>>{
        return request.post(`/account/get-user-info`, {})
    }
}