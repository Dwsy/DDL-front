import {useDel, useGet, usePost, usePut} from '~/composables/useAxios'
import {CreateArticleBody, GetUserArticleListParams, TagSuggestion} from '~/types/article/manageArticle'
import http from '~/utils/fetch'
import {AxiosRequestConfig, AxiosResponse} from 'axios'
import {ResponseData} from '~/types/utils/axios'

export const useAxiosPostCreateArticle = (body: CreateArticleBody) => {
    return usePost<ResponseData<any>>('article/article', body)
}

export const useAxiosPutUpdateArticle = (body: CreateArticleBody) => {
    return usePut('article/article', body)
}

export const useAxiosGetArticleField = (id) => {
    return useGet<ResponseData<any>>('article/article/field/' + id, null)
}

export enum ContentType {
    html,
    pure,
    markdown
}

export const useAxiosGetArticleContent = (id, params?: { type?: ContentType }) => {
    return useGet<ResponseData<any>>('article/article/content/' + id, params)
}

export const useAxiosPostUploadImg = (file) => {
    let config: AxiosRequestConfig = {}
    config.headers = {
        'Content-Type': 'multipart/form-data'
    }
    return usePost<ResponseData<any>>('file/upload', {file}, config)
}
// http://localhost:7080/article/tag/suggestion/re
//todo 对象解构泛型丢失
export const useAxiosGetTagSuggestion = (query): Promise<AxiosResponse<ResponseData<TagSuggestion[]>, any>> => {
    return useGet<ResponseData<any>>('search/article/tag/suggestion/' + query)
}

export const useAxiosGetUserArticleList = (params?: GetUserArticleListParams) => {
    return useGet<ResponseData<any>>('article/article/manage/field/list', params)
}

export const useAxiosGetArticleCountByState = () => {
    return useGet<ResponseData<any>>('article/article/manage/field/num')
}