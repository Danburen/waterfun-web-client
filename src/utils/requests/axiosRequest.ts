import axios from 'axios'
import { ElMessage } from "element-plus";
import { translate } from "~/utils/common";
import {getErrorMessage} from "~/utils/errorMessage";

declare module 'axios' {
    interface AxiosRequestConfig {
        meta?: {
            needsCSRF?: boolean;
            showError?: boolean;
        };
    }
}
const CSRF_SKIP_LIST: string[] = import.meta.env.VITE_CSRF_SKIP_LIST?.split(',') || [];
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 5000,
    withCredentials: true //allow credentials and cookies
})

// request interceptors
service.interceptors.request.use(
    async config => {
        // const token = getToken();
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        const isSkip = CSRF_SKIP_LIST.some((path: string) => config.url?.includes(path));
        const needsCSRF = config.meta?.needsCSRF !== false && !isSkip;
        if (config.method !== 'GET' && needsCSRF) {
            let CSRFToken = getCsrfToken()
            if (!CSRFToken) {
                console.log('First request,now try get csrf token');
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE}/auth/csrf-token`, {
                        credentials: 'include'
                    });
                    if (!response.ok) throw new Error('Failed to fetch CSRF Token');
                    CSRFToken = getCsrfToken();
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            config.headers['X-XSRF-TOKEN'] = CSRFToken;
        }

        if (config.method == 'GET') {
            config.params = {
                _t: Date.now(),
                _n: Math.random().toString(36).slice(2),
                ...config.params
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptors
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            console.error(response);
            return Promise.reject(new Error(response.data.message || 'Error'))
        } else {
            return response.data
        }
    },
    error => {
        const showError = error.config.meta?.showError !== false;
        let errMessage
        if(error.response) {
            const status = error.response.status
            errMessage = getErrorMessage(error.response.data.code || error.response.status)
            switch (status) {
                case 401:
                    window.location.href = '/login'
                    return Promise.reject(new Error('Unauthorized'))
            }
            if(showError) {
                ElMessage({
                    message: errMessage,
                    type: 'error',
                    duration: 3000
                })
            }
            return Promise.reject(new Error(error.response ? 'Network Error' : 'Send Request Error'))
        }else if(error.request) {
            // no response
            errMessage = translate("message.error.networkError")
        }else{
            errMessage = translate("message.error.sendRequestError");
        }
        if(showError) {
            ElMessage({
                message: errMessage,
                type: 'error',
            })
        }
        return Promise.reject(new Error(errMessage));
    }
)

// get CSRF Token From cookie
function getCsrfToken() {
    return document.cookie.split(';')
        .map(cookie=> cookie.trim())
        .find(row => row.startsWith("XSRF-TOKEN="))?.split("=")[1];
}

export default service