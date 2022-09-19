import {_AsyncData} from 'nuxt/dist/app/composables/asyncData'
import { hash } from 'ohash'

const fetch = (url: string, options?: any): Promise<any> => {
  const { $config  } = useNuxtApp()
  const reqUrl = $config.public.app.baseURL + url // 你的接口地址
  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const t = Math.trunc(new Date().getTime()/12000)+''
   const key = hash(JSON.stringify(options) + url+t)
  //  const key = hash(JSON.stringify(options) + '_' + url+ new Date().getTime()) 
  //  console.log("h",hash(JSON.stringify(options) + url+t));
  //  console.log(key);
   
  // 如果需要统一加参数可以options.params.token = 'xxx'
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, key }).then(({ data, error }: _AsyncData<any,any>) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      if (!value) {
        // 这里处理错你自定义的错误，例如code !== 1
        throw createError({
          statusCode: 500,
          statusMessage: reqUrl,
          message: '自己后端接口的报错信息',
        })
      } else {
        resolve(value)
      }
    }).catch((err: any) => {
      console.log(err)
      reject(err)
    })
  })
}

export default new class Http {

  GET(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'get', params })
  }

  POST(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'post', body })
  }

  PUT(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body })
  }

  DELETE(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'delete', body })
  }
}