import http from '../utils/fetch'


export const useApiFetch = (url, options = {}) => {

    return $fetch("http://localhost/" + url, options)
    // return apiFetch(url,options)
}



export const useFetchGet = (params?: { size?: number, page?: number }) => {
    return http.GET('/app/v1/tags', params)
}

export const useFetchGetArticleGroupList = (params?: { size?: number, page?: number }) => {
    return http.GET('article/group/list', params)
}

export const useFetchGetArticleList = (params?: { size?: number, page?: number }) => {
    return http.GET('article/article/field/list', params)
}