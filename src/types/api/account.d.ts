import type { VerifyCodeDto, SecurityVerifyCodeDto } from './auth';
export interface AccountInfo {
    phoneMasked: string;
    emailMasked: string;
    phoneVerified: boolean;
    emailVerified: boolean;
}

export interface ResetPasswordRequest {
    oldPwd: string;
    newPwd: string;
    confirmPwd: string;
    verify: SecurityVerifyCodeDto;
}


export interface SetPasswordRequest {
    newPwd: string;
    confirmPwd: string;
    verify: SecurityVerifyCodeDto;
}

export interface BindEmailRequest {
    email: string;
    verify: SecurityVerifyCodeDto;
}

export interface ActivateEmailRequest {
    email: string;
    verify: SecurityVerifyCodeDto;
}

export interface ChangeEmailRequest {
    email: string;
    verify: SecurityVerifyCodeDto;
}

export interface UnbindEmailRequest {
    email: string;
    verify: SecurityVerifyCodeDto;
}

export interface BindPhoneRequest {
    phone: string;
    verify: SecurityVerifyCodeDto;
}

export interface ActivatePhoneRequest {
    phone: string;
    verify: SecurityVerifyCodeDto;
}

export interface ChangePhoneRequest {
    phone: string;
    verify: SecurityVerifyCodeDto;
}
