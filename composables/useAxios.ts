import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {useUserStore} from '~~/stores/user'
import {useNuxtApp} from '#app'
import {ResponseData} from '~/types/utils/axios'

// import message from "../components/utils/message";
// const { $config  } = useNuxtApp()
// console.log($config)
// const Axios = axios.create({
//     baseURL: "http://localhost/"
// });
// export const BASE_URL = process.env.BASE_URL
// console.log("axios:"+BASE_URL)
// ip env读不了？
// let url = 'http://192.168.5.11/'
let url = 'http://localhost'
// let url = 'http://192.168.5.6/'
export const Axios = axios.create({
    baseURL: url
})
Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const User = useUserStore()
        const token = User.token
        // console.log("++++interceptors++++");
        // let token = window.localStorage.getItem("token")
        const flag: any = config || {}
        // flag.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiJ9.NjA0NzhmNGFhNjk5MGQwYmQwMGUyNTJj.LHSChktNbIzMo8BtdGr7olGIDNbFE3e8A4V9ZhB6GSE"

        if (Boolean(token) && !config.url.includes('qiniu.dwsy.link')) {
            flag.headers['Authorization'] = 'Bearer ' + token
            // if (!useUser.IsLogin) {
            //   console.log("ads");
            //   useUser.setIsLogn(true);
            // } else {
            //   console.log("ads");
            //   useUser.setIsLogn(false);
            // }
            // conflg.headers["Authorization"] = "Bearer" + token;
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    (response) => {
        // console.log("response");
        // console.log(response);

        // console.log("response");

        if (response.status == 200 || response.status == 201) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    (error) => {
        if (error.response.status == 401) {
            console.log('no token')

            //   message({ type: "error", message: String(error.response.data.message) });
        }
        // console.log(error.response.data);

        return Promise.reject(error.response)
    }
)


export const useGet = async <T>(url: string, params?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.get(url, {params: params})
    } catch (error) {
        r = error
    }
    return r
}

export const useGetT = async <T>(url: string, params?: object) => {
    let r: AxiosResponse<T> = undefined
    try {
        r = await Axios.get(url, {params: params})
    } catch (error) {
        r = error
    }
    return r
}

export const usePost = async <T>(url: string, body?: object, config?: AxiosRequestConfig) => {
    let r: AxiosResponse<T> = undefined
    try {
        r = await Axios.post(url, body, config)
    } catch (error) {
        r = error
    }
    return r
}

export const usePut = async (url: string, body?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.put(url, body)
    } catch (error) {
        r = error
    }
    return r
}

export const useDel = async (url: string, body?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.delete(url, {
            data: body,
        })
    } catch (error) {
        r = error
    }
    return r
}

// export { get, post };

