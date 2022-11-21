import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'

// const theme = useTheme()
export const useStest = defineStore('test', {
    state: () => ({
        test: {
            a: 1,
            b: ref(2),
        },
        count: 0,
        text: 'null;;;;',
    }),
    actions: {},
})
