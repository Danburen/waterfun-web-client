import { accountApi } from "@/api/accountApi";
import type { AccountInfo } from "~/types/api/account";

export const useUserAccountStore = defineStore('userAccount', ()=>{
    const userAccount = ref<AccountInfo>({
        phoneMasked: '',
        emailMasked: '',
        emailVerified: false,
        phoneVerified: false,
    });

    const updateUserAccount = (data: Partial<AccountInfo>) => {
        userAccount.value = { ...userAccount.value, ...data };
    };

    const fetchAccountInfoAndUpdate = async () => {
        const res = await accountApi.getAccountInfo();
        updateUserAccount(res.data);
    };

    return {
        userAccount,
        updateUserAccount,
        fetchAccountInfoAndUpdate,
    }
}, {
  persist: process.client ? {
        storage: sessionStorage
  } : false
});
