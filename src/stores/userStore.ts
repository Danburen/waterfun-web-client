import { defineStore } from "pinia";
import type {LoginRequest, RegisterRequest} from "~/types/LoginRequest";
import { authApi } from "~/api/authApi";
import type {LoginResponseDataType} from "~/api/types/LoginResponseType";
import {accountApi} from "~/api/accountApi";
import {useSessionStorage} from "@vueuse/core";

interface UserData{
    userId: number | null,
    username: string,
    nickname: string,
    avatar: string,
}

export const useUserStore = defineStore('userStore',()=>{
    const userData = ref<UserData>({
        userId: null,
        username: '',
        nickname: '',
        avatar: '',
    })

    const updateUserData = (data: Partial<UserData>) => {
        userData.value = {...userData.value, ...data}
    }
    const clearUserData = () => {
        userData.value = { userId: null, username: '', nickname: '', avatar: '' };
    };

    return { userData, updateUserData, clearUserData };
},{
    persist: true
});