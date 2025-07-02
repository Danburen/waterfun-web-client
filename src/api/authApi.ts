import type {LoginRequest, RegisterRequest} from "~/types/LoginRequest";
import request from "~/utils/requests/axiosRequest"
import type {SendCodeType} from "~/types/BaseType";
import {verify} from "node:crypto";

const authBase = '/auth';

export function login(loginRequest:LoginRequest){
    const baseUrl = authBase + '/login/'
    switch (loginRequest.loginType){
        case "email": return request.post(baseUrl + "/email",loginRequest);
        case "sms" : return request.post(baseUrl + "/sms",loginRequest);
        case "password": request.post(baseUrl + "/password",loginRequest);
    }
}

export function register(registerRequest:RegisterRequest){
    return request.post(authBase + '/register',registerRequest);
}

export function getCaptcha(){
    return request.get(authBase + '/captcha',{responseType: 'arraybuffer',meta:{ needsCSRF: false }});
}

export function sendSmsCode(sendCodeData:SendCodeType){
    return request.post(authBase + '/sendSmsCode',sendCodeData)
}

export function sendEmailCode(sendCodeData:SendCodeType){
    return request.post(authBase + '/sendEmailCode',sendCodeData)
}

export function sendCode(sendCodeData:SendCodeType,verifyCodeType: 'sms'|'email'){
    return verifyCodeType === 'sms'? sendSmsCode(sendCodeData) : sendEmailCode(sendCodeData);
}