import request from "../utils/axiosRequest"

import type {LoginRequest, RegisterRequest, SendCodeType} from "~/types/api/auth";
import type {LoginResponseDataType} from "~/types";

export const authApi = {
    login(loginRequest: LoginRequest, type: string):Promise<LoginResponseDataType> {
        if(type == 'password'){
            return request.post("/auth/login-by-password", loginRequest);
        }else{
            return request.post("/auth/login-by-code", loginRequest);
        }
    },

    register(registerRequest: RegisterRequest):Promise<LoginResponseDataType> {
        return request.post('/auth/register', registerRequest);
    },

    getCaptcha():Promise<ArrayBuffer> {
        return request.get('/auth/captcha', {
            responseType: 'arraybuffer',
            meta: { needCSRF: false }
        });
    },

    sendCode(sendCodeData: SendCodeType):Promise<{code: number, message: string}> {
        return request.post('/auth/send-code', sendCodeData);
    },

    logout(deviceFp: string) {
        return request.post('/auth/logout', deviceFp);
    },

    getCsrfToken() {
        return request.get('/auth/csrf-token');
    }
};