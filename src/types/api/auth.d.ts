interface BaseLoginRequest {
    deviceFp: string,
}

interface BasicRegisterRequest {
    phone: string,
    smsCode: string,
    verify: VerifyCodeDto
}

interface FullRegisterRequest extends BasicRegisterRequest {
    email?: string,
    password?: string,
}

interface PasswordLoginRequest extends BaseLoginRequest {
    username: string;
    password: string;
    captcha: string;
}

interface CodeLoginRequest extends BaseLoginRequest, VerifyCodeDto {
    scene: 'login'
}

interface VerifyCodeDto {
    target: string,
    code: string,
    channel: 'sms' | 'email',
    scene: VerifyScene,
    deviceFp?: string,
}

export type LoginRequest = PasswordLoginRequest | CodeLoginRequest;
export type RegisterRequest = BasicRegisterRequest | FullRegisterRequest;

export type VerifyScene = 'login' | 'register' | 'reset-password' | 'set-password' |
    'change-email' | 'change-phone' | 'verify' ;

export type SendCodeType = {
    target: string,
    channel: 'sms' | 'email',
    scene: VerifyScene,
    deviceFp?: string,
}