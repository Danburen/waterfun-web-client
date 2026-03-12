import request from "../utils/axiosRequest"

import type {LoginRequest, RegisterRequest, SecuritySendCodeType, SendCodeType} from "~/types/api/auth";
import type { AccessTokenResponse } from "@waterfun/web-core/src/types/api/auth";
import type { PromiseApiRes } from "@waterfun/web-core/src/types/api/response";
import type { AccountInfo, ResetPasswordRequest, SetPasswordRequest, BindEmailRequest, ActivateEmailRequest, ChangeEmailRequest } from "~/types/api/account";

export const authApi = {
    login(loginRequest: LoginRequest, type: string):PromiseApiRes<AccessTokenResponse> {
        if(type == 'password'){
            return request.post("/auth/login-by-password", loginRequest);
        }else{
            return request.post("/auth/login-by-code", loginRequest);
        }
    },

    register(registerRequest: RegisterRequest):PromiseApiRes<AccessTokenResponse> {
        return request.post('/auth/register', registerRequest);
    },

    getCaptcha():PromiseApiRes<ArrayBuffer> {
        return request.get('/auth/captcha', {
            responseType: 'arraybuffer',
            meta: { needCSRF: false }
        });
    },

    sendCode(sendCodeData: SendCodeType):PromiseApiRes {
        return request.post('/auth/send-code', sendCodeData);
    },

    sendAuthenticationCode(sendCodeData: SecuritySendCodeType):PromiseApiRes {
        return request.post('/auth/security/send-verify-code', sendCodeData);
    },

    logout(deviceFp: string):PromiseApiRes {
        return request.post('/auth/logout', deviceFp);
    },

    getCsrfToken():PromiseApiRes {
        return request.get('/auth/csrf-token');
    },
};