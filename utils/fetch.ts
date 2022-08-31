import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
const fetch = (url: string, options?: any): Promise<any> => {
    const { $config } = useNuxtApp()

    const reqUrl = $config.public.app.baseURL + url // 你的接口地址

    // rc.5开始默认缓存请求，需要设置initialCache为false，如果为true则需要设置一个唯一的key
    // 如果需要统一加参数可以options.params.token = 'xxx'
    return new Promise((resolve, reject) => {
        useFetch(reqUrl,
            {
                ...options,
                initialCache: true,
                key: reqUrl,
                mode: 'cors'
            })
            .then(({ data, error }: _AsyncData<any, any>) => {
                if (error.value) {
                    reject(error.value)
                    return
                }
                const value = data.value

                resolve(value)
                // if (!value) {
                //     // 这里处理错你自定义的错误，例如code !== 1
                //     throw createError({
                //         statusCode: 500,
                //         statusMessage: reqUrl,
                //         message: '自己后端接口的报错信息',
                //     })
                // } else {
                //     resolve(value)
                // }
            }).catch((err: any) => {
                console.log(err)
                reject(err)
            })
    })
}

export default new class Http {

    GET(url: string, params?: any): Promise<any> {
        console.info("GET:" + url);

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