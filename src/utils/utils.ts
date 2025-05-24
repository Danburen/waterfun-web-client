import {useNuxtApp} from "nuxt/app";
import type {Composer} from "vue-i18n";

export function translate(key: string): string {
    const nuxtApp = useNuxtApp();
    const i18n = nuxtApp.$i18n as Composer
    return i18n.t(key);
}