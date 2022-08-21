import { useNuxtApp } from '#app'

let { $axios } = useNuxtApp()
const axios = $axios()
console.log(axios);

const getlist = async ()=>axios.get("https://nestapi.dwsy.link/api/classification/article/6039284a2684e22ec8291c64")
export const getById = async (_id)=>await axios.get("https://nestapi.dwsy.link/api/contents/all/"+_id)
