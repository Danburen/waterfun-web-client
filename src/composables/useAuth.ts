import { useUserStore } from "~/stores/userStore";
import { useAuthStore } from "~/stores/authStore";
import type {LoginResponseDataType} from "~/api/types/LoginResponseType";
import {accountApi} from "~/api/accountApi";
import {authApi} from "~/api/authApi";
import type {LoginRequest, RegisterRequest} from "~/types/LoginRequest";
import {ElMessage} from "element-plus";
export const useAuth = () => {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const router = useRouter();

    const handleAuthSuccess = async  (loginRes: LoginResponseDataType) => {
        authStore.setToken(loginRes.data.accessToken,
            Date.now() + loginRes.data.exp * 1000)

        const userInfoRes = await accountApi.getUserInfo();
        userStore.updateUserData({
            userId: userInfoRes.data.userId,
            username: userInfoRes.data.username,
            nickname: userInfoRes.data.nickname,
            avatar: userInfoRes.data.avatar,
        })
    }

    const tryLogin = async (loginRequest:LoginRequest) => {
        const loginRes = await authApi.login(loginRequest);
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
        return authApi.logout().then(() => {
            userStore.clearUserData()
            authStore.cleanToken()
        })
    }

    const isLoggedIn = computed(()=>{
        const expireIn = Number(authStore.accessData.expire);
        return userStore.userData.userId && Date.now() < expireIn;
    })

    return { tryLogin, tryRegister, logout, isLoggedIn }
}