import request from "../utils/axiosRequest"

import type {LoginRequest, RegisterRequest, SendCodeType} from "~/types/api/auth";
import type {LoginResponseDataType} from "~/types";

export const authApi = {
    login(loginRequest: LoginRequest, type: string):Promise<LoginResponseDataType> {
        const baseUrl = '/auth/login';
        switch (type) {
            case "email": return request.post(`${baseUrl}/email`, loginRequest);
            case "sms": return request.post(`${baseUrl}/sms`, loginRequest);
            case "password": return request.post(`${baseUrl}/password`, loginRequest);
            default:
                throw new Error("Invalid login type: " +  type);
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

    sendSmsCode(sendCodeData: SendCodeType) {
        return request.post('/auth/send-sms-code', sendCodeData);
    },

    sendEmailCode(sendCodeData: SendCodeType) {
        return request.post('/auth/send-email-code', sendCodeData);
    },

    sendCode(sendCodeData: SendCodeType, verifyCodeType: 'sms' | 'email') {
        return verifyCodeType === 'sms'
            ? this.sendSmsCode(sendCodeData)
            : this.sendEmailCode(sendCodeData);
    },

    logout(deviceFp: string) {
        return request.post('/auth/logout', deviceFp);
    },

    getCsrfToken() {
        return request.get('/auth/csrf-token');
    }
};