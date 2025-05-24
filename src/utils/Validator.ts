import type {FormRules} from "element-plus";
import type { LoginType } from "~/types/LoginRequest";
import {REGEX} from "~/utils/Regex";
import type {Composer} from "vue-i18n";
import {translate} from "~/utils/utils";

const keyPrefix = 'auth.validate.'

export const validateUsername = (loginType: LoginType) =>{
    return(rule:any,value:any,callback:any)=>{
        if(value === ''){
            callback(new Error(translate(keyPrefix + 'username-empty')));
            return;
        }
        switch(loginType){
            case 'email':
                if(! REGEX.email.test(value)){
                    callback(new Error(translate(keyPrefix + 'invalid-email')));
                }break;
            case 'sms':
                if(! REGEX.phone.test(value)){
                    callback(new Error(translate(keyPrefix + 'invalid-phone')));
                }break;
            case 'password':
                if(value.length < 4 || value.length > 20){
                    callback(new Error(translate(keyPrefix + 'username-out-of-length')));
                }else if(! REGEX.username.test(value)){
                    callback(new Error(translate(keyPrefix + 'invalid-username')));
                }break;
            default: callback();
        }
        callback();
    }
}

export const createFieldEmptyValidator = (fieldName:string) => {
    return(rule:any,value:any,callback:any)=>{
        if(!value){
            callback(new Error(translate(`${keyPrefix}${fieldName}-empty`)));
        }else{
            callback();
        }
    }
}

export const validateVerifyCode =  createFieldEmptyValidator('verify-code')

export const validatePassword = createFieldEmptyValidator('password')