import request from "~/utils/requests/axiosRequest";
import type {UserInfoResponse} from "~/api/types";
import type {DataApiResponse} from "~/types/api/response";

export const accountApi = {
    getUserInfo():Promise<DataApiResponse<UserInfoResponse>>{
        return request.post(`/account/get-user-info`, {})
    }
}