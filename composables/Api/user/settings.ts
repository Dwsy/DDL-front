import {useGet, usePost, usePut} from '~/composables/useAxios'
import {AxiosRequestConfig} from 'axios'

export const useAxiosPostUploadAvatar = (file) => {
    let config: AxiosRequestConfig = {}
    config.headers = {
        'Content-Type': 'multipart/form-data'
    }
    return usePost('file/upload', {file}, config)
}

export const useAxiosPutUpdateUserInfo = (body) => {
    return usePut('user/info', body)
}