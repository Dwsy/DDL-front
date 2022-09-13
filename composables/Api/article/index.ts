import http from '~~/utils/fetch'
export const fieldList="article/article/field/list"



export const useFetchGetArticleGroupList = (params?: { size?: number, page?: number }) => {
    return http.GET('article/group/list', params)
}

export const useFetchGetArticleList = (params?: { size?: number, page?: number }) => {
    return http.GET('article/article/field/list', params)
}

export const useFetchGetArticleField = (id) => {
    return http.GET('article/article/field/'+id,null)
}

export const useFetchGetArticleContent = (id,params?: { type?:number}) => {
    return http.GET('article/article/content/'+id, params)
}

export const useFetchGetArticleComment = (id,params?: { size?: number, page?: number }) => {
    return http.GET('article/comment/'+id, params)
}

export const useFetchGetArticleTagListByGroupId = (id?,params?: { order?: string, properties?: string }) => {
    return http.GET('article/tag/group/list/'+id, params)
}
