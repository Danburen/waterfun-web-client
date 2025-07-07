import axios from 'axios'
import { ElMessage } from "element-plus";
import { translate } from "~/utils/common";

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
    config => {
        // const token = getToken();
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        const isSkip = CSRF_SKIP_LIST.some((path: string) => config.url?.includes(path));
        const needsCSRF = config.meta?.needsCSRF !== false && !isSkip;
        if(config.method !== 'GET' && needsCSRF) {
            const  CSRFToken = getCsrfToken()
            if(CSRFToken) {
                config.headers['X-XSRF-TOKEN'] = CSRFToken;
                console.log(config);
            }else {
                console.warn('CSRF Token not found in cookies!');
            }
        }

        if(config.method == 'GET') {
            config.params =  {
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
            return Promise.reject(new Error(response.data.message || 'Error'))
        } else {
            return response.data
        }
    },
    error => {
        const showError = error.config.meta?.showError !== false;
        let errMessage = 'Unknown Error'
        if(error.response) {
            const status = error.response.status
            const data  = error.response.data;
            errMessage = getErrorMessage(error.response.data.code) || `HTTP ERROR ${status}`
            switch (status) {
                case 400:
                    errMessage = data.message || 'Request query incorrect.';break;
                case 401:
                    window.location.href = '/login'
                    return Promise.reject(new Error('Unauthorized'))
                case 403:
                    errMessage = data.message || 'Forbidden';break;
                case 500:
                    errMessage = data.message || 'Internal Server Error';break;
            }
            if(showError) {
                ElMessage({
                    message: translate(errMessage),
                    type: 'error',
                    duration: 3000
                })
            }
            return Promise.reject({
                status: status,
                message: errMessage,
                data: data
            })
        }else if(error.request) {
            // no response
            errMessage = 'Network Error'
        }else{
            errMessage = 'Send Request Error';
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