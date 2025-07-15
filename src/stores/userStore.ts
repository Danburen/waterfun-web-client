import { defineStore } from "pinia";
import type {LoginRequest, RegisterRequest} from "~/types/LoginRequest";
import { authApi } from "~/api/authApi";
import {ElMessage} from "element-plus";
import type {LoginResponseDataType} from "~/api/types/LoginResponseType";

interface UserData{
    userId: number | null,
    username: string,
    expireIn: number,
    lastLoginTime: number,
}

const useUserStore = defineStore('userStore',()=>{
    const userData = ref<UserData>({
        userId: null,
        username: '',
        expireIn: 0,
        lastLoginTime: 0,
    })

    const isLoginIn = computed(()=>{
        return userData.value.userId && Date.now() < (userData.value.lastLoginTime + userData.value.expireIn * 1000)
    })

    const login = (loginRequest: LoginRequest) =>
        authApi.login(loginRequest).then(response => {
            userData.value = {
                userId: response.data.userId,
                username: response.data.username,
                expireIn: response.data.expireIn,
                lastLoginTime: Date.now(),
            }
            return response
        })

    const register = (registerRequest: RegisterRequest) =>
        authApi.register(registerRequest).then(response => {
            userData.value = {
                userId: response.data.userId,
                username: response.data.username,
                expireIn: response.data.expireIn,
                lastLoginTime: Date.now(),
            }
            return response
        })

    const logout = () => {
        return authApi.logout().then(() => {
            userData.value.userId = null
            userData.value.username = ''
            userData.value.expireIn = 0
            userData.value.lastLoginTime = 0
        })
    }

    return{
        userData,
        isLoginIn,
        logout,
        login,
        register,
    }
},{
    persist: true
});

export default useUserStore;