import type {ApiResponse, DataApiResponse} from "~/types/BaseType";

export interface UserDataResponse {
    accessToken: string;
    exp: number
}


export type LoginResponseDataType = DataApiResponse<UserDataResponse>;