import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosStatic,
} from 'axios'
import { useUserStore } from '~/stores/user'
import { warningMsg } from '~/composables/utils/toastification'
import { useAppConfig, useFetch, useRouter, useRuntimeConfig } from '#app'

export const CreateAxios = (url, method, config): AxiosPromise => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL
  const Axios = axios.create({
    baseURL,
  })
  const userStore = useUserStore()
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = userStore.token
      const flag: any = config || {}
      if (Boolean(token) && !config.url.includes('qiniu.dwsy.link')) {
        flag.headers['Authorization'] = token
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  Axios.interceptors.response.use(
    async (response) => {
      if (response.data.code == 104) {
        warningMsg('用户信息验证失效，请重新登录')
        await useRouter().push('/user/login')
      }
      if (response.status == 200 || response.status == 201) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    async (error: AxiosError) => {
      clog('error', error)
      clog('response.status', error.response.status)
      if (error.response.status == 502) {
        warningMsg('服务器内部错误')
      }
      if (error.response.status == 401) {
        errorMsg('用户信息验证失效，请重新登录')
        useUserStore().$reset()
        localStorage.clear()
        navigateTo('/user/login')
      }
      // clog(error.response.data);

      return Promise.reject(error.response)
    }
  )
  return Axios(url, {
    method,
    ...config,
  })
}
