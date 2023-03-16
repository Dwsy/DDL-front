import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { hash } from 'ohash'
import { useFetch, useNuxtApp, useRuntimeConfig } from '#app'
import { createError } from 'h3'
import { ResponseData } from '~/types/utils/axios'

const fetch = (url: string, options?: any): Promise<any> => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL
  const reqUrl = baseURL + url // 你的接口地址
  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const t = Math.trunc(new Date().getTime() / 10000) + ''
  // const t = Math.trunc(new Date().getTime() / 12000) + ''
  const key = hash(JSON.stringify(options) + url + t)
  //  const key = hash(JSON.stringify(options) + '_' + url+ new Date().getTime())
  //  clog("h",hash(JSON.stringify(options) + url+t));
  //  clog(key);
  console.info(url)
  // 如果需要统一加参数可以options.params.token = 'xxx'
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, key })
      .then(({ data, error }: _AsyncData<any, any>) => {
        if (error.value) {
          reject(error.value)
          return
        }
        const value = data.value
        // clog("data",data)
        // clog("value",value)
        if (!value) {
          console.log('value is null', data)
          // 这里处理错你自定义的错误，例如code !== 1

          throw createError({
            statusCode: 500,
            statusMessage: reqUrl,
            message: '自己后端接口的报错信息',
          })
        } else {
          if (!url.endsWith('.min.css.map')) {
            let R = value
            if (baseURL.startsWith('https://mock.apifox.cn')) {
              R = {
                code: 0,
                msg: '',
                data: value,
              }
            }
            resolve(R)
          }
        }
      })
      .catch((err: any) => {
        clog(err)
        reject(err)
      })
  })
}

export default new (class Http {
  GET<T>(url: string, params?: any): Promise<T> {
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
})()
