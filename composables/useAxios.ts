import axios, { AxiosInstance, AxiosRequestConfig,AxiosResponse } from "axios";
import { useUser } from "~~/stores/User";

// import message from "../components/utils/message";
export const BASE_URL = process.env.BASE_URL
const Axios = axios.create({
    baseURL: BASE_URL||"http://api.local.com/"
});

Axios.interceptors.request.use(
    (conflg: AxiosRequestConfig) => {
        const User = useUser();
        const token = User.token;
        console.log("++++interceptors++++");
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

export const usePost = async (url: string, data?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.post(url, data)
    } catch (error) {
        r = error
    }
    return r;
};

export { get, post };

