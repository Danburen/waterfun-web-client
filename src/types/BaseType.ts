export type SendCodeType = {
    phoneNumber?: string;
    email?: string;
    purpose: 'login' | 'register' | 'resetPassword'
}
