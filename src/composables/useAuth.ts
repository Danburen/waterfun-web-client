import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "~/stores/userInfoStore";
import { useUserProfileStore } from "~/stores/userProfileStore";
import { useAuthStore } from "~/stores/authStore";
import {userApi} from "~/api/userApi";
import {authApi} from "~/api/authApi";
import {ElMessage} from "element-plus";
import { translate } from "~/utils/translator";
import type {LoginRequest, RegisterRequest} from "~/types/api/auth";
import type {LoginResponseDataType} from "~/types";
import { generateFingerprint } from "@waterfun/web-core/src/fingerprint";
export const useAuth = () => {
    const authStore = useAuthStore();
    const userInfoStore = useUserInfoStore();
    const userProfileStore = useUserProfileStore();
    const router = useRouter();

    const handleAuthSuccess = async  (loginRes: LoginResponseDataType) => {
        authStore.setToken(loginRes.data.accessToken,
            Date.now() + loginRes.data.exp * 1000)

        const userInfoRes = await userApi.getUserInfo();
        const userProfileRes = await userApi.getUserProfile();  
        
        
        userInfoStore.updateUserInfo({
            username: userInfoRes.data.username,
            uid: userInfoRes.data.uid,
            accountStatus: userInfoRes.data.accountStatus,
            createAt: userInfoRes.data.createdAt,
            passwordHash: userInfoRes.data.passwordHash,
        });
        
        userProfileStore.updateUserProfile({
            ...userProfileRes.data,
            birthday: userProfileRes.data.birthday ? new Date(userProfileRes.data.birthday) : undefined,
        });

        userProfileStore.updateAvatar(userProfileRes.data.avatar
            .url, userProfileRes.data.avatar.expireAt);
    }

    const tryLogin = async (loginRequest:LoginRequest, type: string) => {
        const loginRes = await authApi.login(loginRequest, type);
        return handleAuthSuccess(loginRes).then(()=>{
            ElMessage({
                message: translate("message.success.loginSuccess"),
                type: "success",
            })
        }).catch(err=>{
            return Promise.reject(err);
        });
    }

    const tryRegister =  async (registerRequest: RegisterRequest) => {
        const loginRes = await authApi.register(registerRequest)
        return handleAuthSuccess(loginRes).then(()=>{
            ElMessage({
                message: translate('message.success.registerSuccess'),
                type: "success",
            });
            router.push("/");
        }).catch(err=>{
            return Promise.reject(err);
        })
    }

    const logout = async () => {
        const dfp = await generateFingerprint()
        return authApi.logout(dfp).then(() => {
            userInfoStore.clearUserInfo();
            userProfileStore.clearUserProfile();
            authStore.removeToken();
        })
    }

    const isLoggedIn = computed(()=>{
        const expireIn = Number(authStore.accessData.expire);
        console.log(userInfoStore.userInfo.uid, expireIn)
        return userInfoStore.userInfo.uid !== null && (Date.now() < expireIn);
    })

    return { tryLogin, tryRegister, logout, isLoggedIn }
}