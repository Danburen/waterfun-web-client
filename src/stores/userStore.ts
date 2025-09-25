import { defineStore } from "pinia";
import { authApi } from "~/api/authApi";
import {accountApi} from "~/api/accountApi";
import {useSessionStorage} from "@vueuse/core";
import type {LoginResponseDataType} from "~/api/types";
import type {LoginRequest, RegisterRequest} from "~/types/api/auth";

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