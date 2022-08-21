import { AxiosResponse } from "axios";
import Axios from "./axios";

const get = async (url: string, params?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.get(url, { params: params })
    } catch (error) {
        r = error
    }
    return r;
};

const post = async (url: string, data?: object) => {
    let r: AxiosResponse = undefined
    try {
        r = await Axios.post(url, data)
    } catch (error) {
        r = error
    }
    return r;
};

export { get, post };
