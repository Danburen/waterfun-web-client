import type {LoginRequest, RegisterRequest} from "~/types/LoginRequest";
import request from "~/utils/requests/axiosRequest"
import type {SendCodeType} from "~/types/BaseType";
import {verify} from "node:crypto";
import type {LoginResponseDataType} from "~/api/types/LoginResponseType";

export const authApi = {
    login(loginRequest: LoginRequest):Promise<LoginResponseDataType> {
        const baseUrl = '/auth/login';
        switch (loginRequest.loginType) {
            case "email": return request.post(`${baseUrl}/email`, loginRequest);
            case "sms": return request.post(`${baseUrl}/sms`, loginRequest);
            case "password": return request.post(`${baseUrl}/password`, loginRequest);
            default:
                throw new Error("Invalid login type");
        }
    },

    register(registerRequest: RegisterRequest):Promise<LoginResponseDataType> {
        return request.post('/auth/register', registerRequest);
    },

    getCaptcha() {
        return request.get('/auth/captcha', {
            responseType: 'arraybuffer',
            meta: { needsCSRF: false }
        });
    },

    sendSmsCode(sendCodeData: SendCodeType) {
        return request.post('/auth/sendSmsCode', sendCodeData);
    },

    sendEmailCode(sendCodeData: SendCodeType) {
        return request.post('/auth/sendEmailCode', sendCodeData);
    },

    sendCode(sendCodeData: SendCodeType, verifyCodeType: 'sms' | 'email') {
        return verifyCodeType === 'sms'
            ? this.sendSmsCode(sendCodeData)
            : this.sendEmailCode(sendCodeData);
    },

    logout() {
        return request.post('/auth/logout');
    }
};