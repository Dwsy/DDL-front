import {AxiosRequestConfig, AxiosResponse} from 'axios'
import {useUserStore} from '~~/stores/user'

import {CreateAxios} from '~/utils/axios'

export const useGet = async <T>(url: string, params?: object, needToken?: boolean) => {
    const token = useUserStore().token
    if (needToken) {
        if (token == null) {
            return null
        }
    }
    let r: AxiosResponse<T>
    try {
        // Axios(url,{
        //     method: 'GET',
        // })

        r = await CreateAxios(url, 'get', {params})
        // r = await Axios(url, {params: params})
    } catch (error) {
        console.log('EEE', error)
        r = error
    }
    return r
}

export const useGetT = async <T>(url: string, params?: object) => {
    let r: AxiosResponse<T>
    try {
        r = await CreateAxios(url, 'get', {params})
    } catch (error) {
        r = error
    }
    return r
}

export const usePost = async <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    let r: AxiosResponse<T>
    try {
        // r = await Axios.post(url, data, config)
        r = await CreateAxios(url, 'post', {data, ...config})
    } catch (error) {
        r = error
    }
    return r
}

export const usePut = async <T>(url: string, data?: object) => {
    let r: AxiosResponse<T>
    try {
        // r = await Axios.put(url, data)
        r = await CreateAxios(url, 'put', {data})
    } catch (error) {
        r = error
    }
    return r
}

export const useDel = async <T>(url: string, data?: object) => {
    let r: AxiosResponse<T>
    try {
        // r = await Axios.delete(url, {
        //     data: data,
        // })
        r = await CreateAxios(url, 'put', {data})
    } catch (error) {
        r = error
    }
    return r
}

// export { get, post };

