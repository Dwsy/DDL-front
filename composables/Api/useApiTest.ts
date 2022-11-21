import {ResponseData} from '~/types/utils/axios'

export const tokeTest = async () =>
    await useGet<ResponseData<any>>(
        'https://nestapi.dwsy.link/api/fields/draftList?query=%7B%22limit%22:777,%22sort%22:%22-_id%22,%22populate%22:%22tag+classification%22%7D'
    )
export const baseUrlTest = async () =>
    await useGet<ResponseData<any>>('article/tag/list')
