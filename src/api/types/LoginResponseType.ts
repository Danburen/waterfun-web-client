import type {ApiResponse, DataApiResponse} from "~/types/BaseType";

export interface LoginResponseData{
    username: string,
    userId: number,
    expireIn: number
}

export type LoginResponseDataType = DataApiResponse<LoginResponseData>;