import http from '~~/utils/fetch'
import {useGet} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'




export const useAxiosGetSearchArticle = (query,params?: { size?: number, page?: number,order?:string,properties?:string }) => {
    return useGet<ResponseData<any>>('search/article/' + query, params)
}

export const useFetchGetSearchSuggestion = (query: string) => http.GET('search/article/suggestion/' + query, null)
// export const useAxiosGetSearchSuggestion = (query:string) => http.GET('search/article/suggestion/'+query,null)