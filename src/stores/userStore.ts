import { defineStore } from "pinia";
import type {LoginRequest, RegisterRequest} from "~/types/LoginRequest";

const useUserStore = defineStore('userStore',()=>{
    const userId = ref<number|null>(null)
    const username = ref<string>('')
    const expireIn = ref<number>(0)
    const lastLoginTime = ref<number>(0)

    const isLoginIn = computed(()=>{
        return !!userId && Date.now() < (lastLoginTime.value + expireIn.value * 1000)
    })

    const login = async (loginRequest:LoginRequest) => {
        await login(loginRequest)
    }

    const register = async (registerRequest:RegisterRequest) => {
        await register(registerRequest)
    }

    const logout = async () => {

    }

    return{
        userId,username,expireIn,lastLoginTime,isLoginIn,
        login,
        register,
    }
},{
    persist: true
});

export default useUserStore;