import { useNuxtApp } from '#app'
import {get, post} from "~~/utils/req"
// let { $axios } = useNuxtApp()
// const axios = $axios()
// console.log(axios);
// const getlist = async ()=>axios.get("https://nestapi.dwsy.link/api/classification/article/6039284a2684e22ec8291c64")
// export const getById = async (_id)=>await axios.get("https://nestapi.dwsy.link/api/contents/all/"+_id)
export const tokeTest =async ()=>await get("https://nestapi.dwsy.link/api/fields/draftList?query=%7B%22limit%22:777,%22sort%22:%22-_id%22,%22populate%22:%22tag+classification%22%7D")