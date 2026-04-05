import request from "../utils/axiosRequest"
import type { AccountInfo, ResetPasswordRequest, SetPasswordRequest, BindEmailRequest, ActivateEmailRequest, ChangeEmailRequest, 
    BindPhoneRequest, ActivatePhoneRequest, ChangePhoneRequest, UnbindEmailRequest} from "~/types/api/account";
import type { PromiseApiRes} from "~/types";
import type { SendCodeType} from "~/types/api/auth";


export const accountApi = {
    getAccountInfo():PromiseApiRes<AccountInfo> {
        return request.get('/auth/account');
    },

    resetPassword(resetPasswordData: ResetPasswordRequest):PromiseApiRes<string> {
        return request.post('/auth/account/password/reset', resetPasswordData);
    },

    setPassword(setPasswordData: SetPasswordRequest):PromiseApiRes<string> {
        return request.post('/auth/account/password/set', setPasswordData);
    },

    sendVerifyCode(sendCodeData: SendCodeType):PromiseApiRes<string> {
        return request.post('/auth/account/send-verify-code', sendCodeData);
    },

    // 邮箱相关接口
    bindEmail(bindEmailData: BindEmailRequest):PromiseApiRes<string> {
        return request.post('/auth/account/email/bind', bindEmailData);
    },

    activateEmail(activateEmailData: ActivateEmailRequest):PromiseApiRes<string> {
        return request.post('/auth/account/email/activate', activateEmailData);
    },

    changeEmail(changeEmailData: ChangeEmailRequest):PromiseApiRes<string> {
        return request.post('/auth/account/email/change', changeEmailData);
    },
    
    // 手机相关接口
    bindPhone(bindPhoneData: BindPhoneRequest):PromiseApiRes<string> {
        return request.post('/auth/account/phone/bind', bindPhoneData);
    },
    
    activatePhone(activatePhoneData: ActivatePhoneRequest):PromiseApiRes<string> {
        return request.post('/auth/account/phone/activate', activatePhoneData);
    },
    
    changePhone(changePhoneData: ChangePhoneRequest):PromiseApiRes<string> {
        return request.post('/auth/account/phone/change', changePhoneData);
    },

    unbindEmail(unbindEmailData: UnbindEmailRequest):PromiseApiRes<string> {
        return request.post('/auth/account/email/unbind', unbindEmailData);
    },
}