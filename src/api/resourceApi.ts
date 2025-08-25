import request from "~/utils/requests/axiosRequest"

import type {DataApiResponse, LanguageTypes} from "~/types/BaseType";
import type { FileResDataType } from "~/types/ResponseDataType";
import type {UserInfoResponse} from "~/api/types/UserResponseType";
export const resourceApi = {
    getEula(lang:LanguageTypes):Promise<FileResDataType>{
        return request.get(`/resource/legal/licence/${lang}/eula.txt`);
    }
}