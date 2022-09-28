import axios, { AxiosInstance, AxiosRequestConfig,AxiosResponse } from "axios";
import { useUser } from "~~/stores/user";
import {useNuxtApp} from '#app'

// import message from "../components/utils/message";
// const { $config  } = useNuxtApp()
// console.log($config)
const Axios = axios.create({
    baseURL: "http://localhost/"
});

Axios.interceptors.request.use(
    (conflg: AxiosRequestConfig) => {
        const User = useUser();
        const token = User.token;
        // console.log("++++interceptors++++");
        // let token = window.localStorage.getItem("token")
        const flag: any = conflg || {};
        // flag.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiJ9.NjA0NzhmNGFhNjk5MGQwYmQwMGUyNTJj.LHSChktNbIzMo8BtdGr7olGIDNbFE3e8A4V9ZhB6GSE"
        if (Boolean(token)) {
            flag.headers["Authorization"] = "Bearer " + token;
            // if (!useUser.IsLogin) {
            //   console.log("ads");
            //   useUser.setIsLogn(true);
            // } else {
            //   console.log("ads");
            //   useUser.setIsLogn(false);
            // }
            // conflg.headers["Authorization"] = "Bearer" + token;
        }

        return conflg;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        // console.log("response");
        // console.log(response);

        // console.log("response");

        if (response.status == 200 || response.status == 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        if (error.response.status == 401) {
            console.log("no token");

            //   message({ type: "error", message: String(error.response.data.message) });
        }
        // console.log(error.response.data);

        return Promise.reject(error.response);
    }
);




export const useGet = async (url: string, params?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.get(url, { params: params })
    } catch (error) {
        r = error
    }
    return r;
};

export const usePost = async (url: string, body?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.post(url, body)
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
        r = await Axios.delete(url, body)
    } catch (error) {
        r = error
    }
    return r
}

// export { get, post };

