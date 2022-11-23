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
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const User = useUserStore()
      const token = User.token
      // console.log("++++interceptors++++");
      // let token = window.localStorage.getItem("token")
      // console.log(appConfig)
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
    async (response) => {
      // console.log("response");
      // console.log(response);

      // console.log("response");
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
      console.log('error', error)
      console.log('response.status', error.response.status)
      if (error.response.status == 502) {
        warningMsg('服务器内部错误')
      }
      if (error.response.status == 401) {
        console.log('no token')
        //   message({ type: "error", message: String(error.response.data.message) });
      }
      // console.log(error.response.data);

      return Promise.reject(error.response)
    }
  )
  return Axios(url, {
    method,
    ...config,
  })
}
