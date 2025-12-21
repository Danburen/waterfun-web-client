import request from "../utils/axiosRequest"

import type {LoginRequest, RegisterRequest, SecuritySendCodeType, SendCodeType} from "~/types/api/auth";
import type {LoginResponseDataType, ApiResponse} from "~/types";
import type { AccountInfo, ResetPasswordRequest, SetPasswordRequest, BindEmailRequest, ActivateEmailRequest, ChangeEmailRequest } from "~/types/api/account";

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

    sendCode(sendCodeData: SendCodeType):Promise<ApiResponse> {
        return request.post('/auth/send-code', sendCodeData);
    },

    sendAuthenticationCode(sendCodeData: SecuritySendCodeType):Promise<ApiResponse> {
        return request.post('/auth/security/send-verify-code', sendCodeData);
    },

    logout(deviceFp: string):Promise<ApiResponse> {
        return request.post('/auth/logout', deviceFp);
    },

    getCsrfToken():Promise<ApiResponse> {
        return request.get('/auth/csrf-token');
    },
};