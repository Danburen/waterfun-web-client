import type {FormRules} from "element-plus";
import type { LoginType } from "~/types/LoginRequest";
import {REGEX} from "~/utils/Regex";
import type {Composer} from "vue-i18n";
import {translate} from "~/utils/utils";

const keyPrefix = 'auth.validate.'

export const validateAuthname = (loginType: LoginType) =>{
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

export const validateUsername = (allowEmpty?:boolean) =>{
    return(rule:any,value:any,callback:any)=>{
        if(!value && !allowEmpty){
            callback(new Error(translate(keyPrefix + 'username-empty')));
            return;
        }
        if(allowEmpty){
            callback();
            return;
        }
        if(value.length < 4 || value.length > 20){
            callback(new Error(translate(keyPrefix + 'username-out-of-length')));
        }
        if(! REGEX.username.test(value)){
            callback(new Error(translate(keyPrefix + 'invalid-username')));
        }
    }
}

export const validateEmail = (allowEmpty?:boolean) =>{
    return createFieldValidator({
        regex: REGEX.email,
        emptyErrorKey: 'email-empty',
        invalidErrorKey: 'invalid-email',
        allowEmpty: allowEmpty,
    })
}

export const validatePhoneNumber = (allowEmpty?:boolean) =>{
    return createFieldValidator({
        regex: REGEX.phone,
        emptyErrorKey: 'phone-empty',
        invalidErrorKey: 'invalid-phone',
        allowEmpty: allowEmpty,
    })
}

export const createFieldEmptyValidator = (fieldName:string,allowEmpty:boolean) => {
    return(rule:any,value:any,callback:any)=>{
        if(!value && !allowEmpty){
            callback(new Error(translate(`${keyPrefix}${fieldName}-empty`)));
        }else{
            callback();
        }
    }
}

export const createFieldValidator = (
    options: {
        regex?: RegExp,
        emptyErrorKey: string,
        invalidErrorKey?: string,
        allowEmpty?: boolean,
        preCheck?: (value: string) => boolean
    }
) => {
    return (_: any, value: any, callback: any) => {
        if (!value && !options.allowEmpty) {
            callback(new Error(translate(keyPrefix + options.emptyErrorKey)));
            return;
        }

        if (options.allowEmpty && !value) {
            callback();
            return;
        }

        if (options.preCheck && !options.preCheck(value)) {
            callback(new Error(translate('custom-precheck-error')));
            return;
        }

        if (options.regex && options.invalidErrorKey &&!options.regex.test(value)) {
            callback(new Error(translate(keyPrefix + options.invalidErrorKey)));
            return;
        }

        callback();
    };
};

export const validateVerifyCode = (allowEmpty:boolean)=> createFieldEmptyValidator('verify-code',allowEmpty);

export const validatePassword =(allowEmpty:boolean)=> createFieldEmptyValidator('password',allowEmpty);