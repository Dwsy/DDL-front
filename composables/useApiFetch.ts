export const useApiFetch = (url, options = {}) => {
    console.log("fetch:" + process.env.BASE_URL + url);

    return $fetch(process.env.BASE_URL + url, options)
}