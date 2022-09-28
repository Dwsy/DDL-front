import {useToast} from 'vue-toastification'
import {ToastOptions} from 'vue-toastification/src/types'
import {TYPE} from 'vue-toastification/src/ts/constants'
// import { useToast } from '~~/plugins/toastification'
let toast = useToast()


export const defaultMsg = (msg: string) => {
    const options: ToastOptions = {
        type: TYPE.DEFAULT
    }

    toast(msg, options)
}

export const successMsg = (msg: string) => {
    const options: ToastOptions = {
        type: TYPE.SUCCESS
    }
    toast(msg, options)
}

export const infoMsg = (msg: string) => {
    const options: ToastOptions = {
        type: TYPE.INFO
    }
    toast(msg, options)
}

export const errorMsg = (msg: string) => {
    const options: ToastOptions = {
        type: TYPE.ERROR,
        timeout: 10000,
        closeOnClick: false,
        showCloseButtonOnHover: true
    }
    toast(msg, options)
}

export const warningMsg = (msg: string) => {
    const options: ToastOptions = {
        type: TYPE.WARNING,
        timeout: 10000
    }
    toast(msg, options)
}
