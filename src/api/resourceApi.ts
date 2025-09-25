import request from "~/utils/requests/axiosRequest"

import type {UserInfoResponse} from "~/api/types";
import type {DataApiResponse, FileResDataType} from "~/types/api/response";
import type {LanguageTypes} from "~/types/sys/lang";
export const resourceApi = {
    getEula(lang:LanguageTypes):Promise<FileResDataType>{
        return request.get(`/resource/legal/licence/${lang}/eula.txt`);
    }
}