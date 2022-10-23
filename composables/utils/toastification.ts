import {useToast} from 'vue-toastification'
import {ToastOptions} from 'vue-toastification/src/types'
import {TYPE} from 'vue-toastification/src/ts/constants'
import {VNode} from '@vue/runtime-core'
import {eventHandler} from 'h3'
// import { useToast } from '~~/plugins/toastification'
let toast = useToast()


export const defaultMsg = (msg: string) => {
    const options: ToastOptions = {
        type: TYPE.DEFAULT
    }

    toast(msg, options)
}

export const tsxToastMsg = (msg, type: TYPE, tsx: JSX.Element) => {
    toast(tsx, {
        type
    })
}

export const ComponentToastMsg = (msg, type: TYPE, component, time, timeout, url?: string) => {
    toast({
        component,
        props: {
            msg,
            time,
            url
        },
        listeners: {
            cancel: () => {
                clearTimeout(timeout)
            },
        }
    }, {
        type
    })
}


export const successMsg = (msg: string, Options?: ToastOptions) => {
    const options: ToastOptions = {
        ...Options,
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
