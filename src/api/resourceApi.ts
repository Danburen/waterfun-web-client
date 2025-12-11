import request from "../utils/axiosRequest"

import type { DataApiResponse, FileResDataType } from "~/types/api/response";
import type { UserInfoResponse } from "~/types/api/userResponse";
import type {LanguageTypes} from "~/types/sys/lang";
export const resourceApi = {
    getEula(lang:LanguageTypes):Promise<FileResDataType>{
        return request.get(`/resource/legal/licence/${lang}/eula.txt`);
    }
}