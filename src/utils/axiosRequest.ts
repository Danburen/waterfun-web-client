import axios from 'axios'

const service = axios.create({
    baseURL: "http://localhost:8080/api",
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

        if(config.method !== 'GET') {
            const  CSRFToken = getCsrfToken()
            if(CSRFToken) {
                config.headers['X-XSRF-TOKEN'] = CSRFToken;
                console.log(config);
            }else {
                console.warn('CSRF Token not found in cookies!');
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
            return response
        }
    },
    error => {
        if(error.response) {
            const status = error.response.status
            const data  = error.response.data;
            switch (status) {
                case 400:
                    return Promise.reject({
                        data: data,
                        status: status,
                        message: `Bad Request ${status}`
                    });
                case 401: window.location.href = '/login';break;
                case 403:
                    return Promise.reject({
                        data: data,
                        status: status,
                        message: `Forbidden ${status}`
                    });
                case 500:
                    return Promise.reject(data.message || 'Server Error');
                default:
                    return Promise.reject({
                        data: data,
                        status: status,
                        message: `Http Error ${status}`,
                    });

            }
        }else if(error.request) {
            // no response
            return Promise.reject(new Error('Network Error'));
        }else{
            return Promise.reject(new Error(error.message));
        }
    }
)

function generateRequestParams(){
    return {
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substr(2, 10)
    }
}

// get CSRF Token From cookie
function getCsrfToken() {
    return document.cookie.split(';')
        .map(cookie=> cookie.trim())
        .find(row => row.startsWith("XSRF-TOKEN="))?.split("=")[1];
}

export default service