import { useGet, usePost, usePut } from '~/composables/useAxios'
import { AxiosRequestConfig } from 'axios'
import { ResponseData } from '~/types/utils/axios'
import { FileType } from '~/types/other/file'

export const useAxiosPostUploadPicture = (file, type: FileType) => {
  let config: AxiosRequestConfig = {}
  config.headers = {
    'Content-Type': 'multipart/form-data',
  }
  return usePost<ResponseData<any>>('file/upload', { file, type }, config)
}

export const useAxiosPutUpdateUserInfo = (body) => {
  return usePut('user/info', body)
}

export const useAxiosGetUserSetting = () => {
  return useGet<ResponseData<any>>('/user/user/setting')
}

export const useAxiosPostModifyEmail = (captcha: boolean, email: string, code?) => {
  return usePost<ResponseData<any>>('/user/user/modify/email', {
    captcha,
    email,
    code,
  })
}
