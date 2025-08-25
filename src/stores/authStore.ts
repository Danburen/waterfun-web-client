interface access {
    token: string;
    expire: number;
}

export const useAuthStore = defineStore('accessStore', ()=>{
    const accessData = ref<access>({
        token: '',
        expire: 0,
    })

    const setToken = (token:string,expire:number) => {
        accessData.value = {
            token: token,
            expire: expire
        }
    }

    const clearToken = () => {
        accessData.value = {
            token: '',
            expire: 0,
        }
    }

    const isValid = computed(() => {
        return accessData.value.token && Date.now() < accessData.value.expire;
    });

    return {
        setToken,
        cleanToken: clearToken,
        accessData,
        isValid,
    }
},{
    persist: process.client ? {
        storage: sessionStorage
    } : false
})

