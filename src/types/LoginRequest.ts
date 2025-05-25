
interface BaseLoginRequest{
    username: string,
    loginType: LoginType,
}

interface PasswordLoginRequest extends BaseLoginRequest{
    loginType: 'password';
    password: string;
    captcha: string;
    smsCode?: never;
    emailCode?: never;
}

interface SmsLoginRequest  extends BaseLoginRequest{
    loginType: 'sms'
    smsCode: string;
    password?: string;
    captcha?: never;
    emailCode?: never;
}

interface EmailLoginRequest  extends BaseLoginRequest{
    loginType: 'email';
    emailCode: string;
    password?: never;
    captcha?: never;
    smsCode?: never;
}

export type LoginType = 'password'|'email'|'sms'
export type LoginRequest = PasswordLoginRequest | EmailLoginRequest | SmsLoginRequest;