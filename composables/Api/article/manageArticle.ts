import {useDel, useGet, usePost, usePut} from '~/composables/useAxios'
import {CreateArticleBody, GetUserArticleListParams, TagSuggestion} from '~/types/article/manageArticle'
import http from '~/utils/fetch'
import {AxiosRequestConfig, AxiosResponse} from 'axios'
import {ResponseData} from '~/types/utils/axios'

export const useAxiosPostCreateArticle = (body: CreateArticleBody) => {
    return usePost('article/article', body)
}

export const useAxiosPutUpdateArticle = (body: CreateArticleBody) => {
    return usePut('article/article', body)
}

export const useAxiosGetArticleField = (id) => {
    return useGet('article/article/field/' + id, null)
}

export const useAxiosGetArticleContent = (id, params?: { type?: number }) => {
    return useGet('article/article/content/' + id, params)
}

export const useAxiosPostUploadImg = (file) => {
    let config: AxiosRequestConfig = {}
    config.headers = {
        'Content-Type': 'multipart/form-data'
    }
    return usePost('file/upload', {file}, config)
}
// http://localhost:7080/article/tag/suggestion/re
//todo 对象解构泛型丢失
export const useAxiosGetTagSuggestion = (query): Promise<AxiosResponse<ResponseData<TagSuggestion[]>, any>> => {
    return useGet('search/article/tag/suggestion/' + query)
}

export const useAxiosGetUserArticleList = (params?: GetUserArticleListParams) => {
    return useGet('article/article/manage/field/list', params)
}

export const useAxiosGetArticleCountByState = () => {
    return useGet('article/article/manage/field/num')
}