import request from "../utils/axiosRequest"

import type { DataApiResponse, FileResDataType, UserInfoResponse } from "~/types/api/response";
import type {LanguageTypes} from "~/types/sys/lang";
export const resourceApi = {
    getEula(lang:LanguageTypes):Promise<FileResDataType>{
        return request.get(`/resource/legal/licence/${lang}/eula.txt`);
    }
}