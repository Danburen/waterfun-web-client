import request from "~/utils/requests/axiosRequest"

import type {LanguageTypes} from "~/types/BaseType";
import type { FileResDataType } from "~/types/ResponseDataType";
export const resourceApi = {
    getEula(lang:LanguageTypes):Promise<FileResDataType>{
        return request.get(`/resource/legal/licence/${lang}/eula.txt`);
    }
}