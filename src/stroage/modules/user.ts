import {defineStore} from "pinia";
import type {User} from "~/types/User";
import {useCookie} from "nuxt/app";

export const useUserStore = defineStore('userStore',{
    state: () =>{
        return {
            user: null as User | null, // initialize as un login state
            token: null as string | null,
        }
    },
    getters: {
        isLoggedIn: (state) => state.user?.is_authenticated ?? false,
        currentUser: (state) => state.user
    },
    actions: {
        login(userData: User,token:string):void {
            this.user = { ...userData, is_authenticated: true };
            this.token = token;
            const tokenCookie = useCookie('auth-token',{
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'lax',
            });
            tokenCookie.value = token;
        },
        logout():void {
            this.user = null;
            useCookie('auth_token').value = null;
        },
        updateUser(partialData: Partial<User>):void {
            if (this.user) {
                this.user = { ...this.user, ...partialData };
            }
        },
    },
    // csr only
    // persist:{
    //     enabled: true,
    //     strategies:[{
    //         key: 'user_auth',
    //         storage: localStorage,
    //         paths: ['user'], // only persist user column
    //     }]
    // } as PersistenceOptions
});