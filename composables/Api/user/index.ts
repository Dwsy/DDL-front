import http from '~~/utils/fetch'
import {useGet, usePost} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const useAxiosGetUserInfo = () => {
    return useGet<ResponseData<any>>('user/info')
}
export const useAxiosGetUserInfoByUid = (uid: string) => {
    return useGet<ResponseData<any>>('user/info/' + uid)
}

export const useAxiosPostCheck = () => {
    return usePost<ResponseData<any>>('user/active/check')
}

export const useAxiosGetArticleListByUserId = (userId, params?:
    { size?: number, page?: number, tagId?: string, order?: string, properties?: string }) => {
    return useGet<ResponseData<any>>('article/article/field/list/' + userId, params)
}

export const userAxiosGetUserThumbActiveListByUserId = (userId, params?:
    { size?: number, page?: number, tagId?: string, order?: string, properties?: string, type: UserActiveType }) => {
    return useGet<ResponseData<any>>('user/active/thumb/' + userId, params)
}

export enum UserActiveType {
    Check_In,//签到

    Browse_Article,//浏览文章

    Browse_QA,//浏览问题
    //-------------

    Comment_Article,//评论文章

    Comment_Article_Comment,//评论文章评论

    UP_Article,//点赞文章

    UP_Article_Comment,//点赞文章评论


    Answer_Question,//回答问题 or 问题回答

    UP_Question,//点赞问题

    UP_Question_Answer,//点赞问题回答
}