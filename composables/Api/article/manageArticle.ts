import {useDel, useGet, usePost} from '~/composables/useAxios'
import {CreateArticleBody} from '~/types/article/manageArticle'
import http from '~/utils/fetch'
import {AxiosRequestConfig} from 'axios'

export const useAxiosCreateArticle = (body: CreateArticleBody) => {
    return usePost('article/article', body)
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