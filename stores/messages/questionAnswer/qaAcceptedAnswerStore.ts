import {defineStore} from 'pinia'
import {UseAxiosGetReplyMeNotify} from '~/composables/Api/messages/reply'
import {errorMsg} from '~/composables/utils/toastification'
import {NotifyMsg, NotifyType} from '~/types/message'
import {
    useAxiosGetQaAcceptedAnswerNotify,
    UseAxiosGetQaAnswerNotify,
    useAxiosGetQaInvitationAnswerNotify,
} from '~/composables/Api/messages/qa/answer'

interface State {
    notifyList: NotifyMsg[];
    page: number;
    totalPages: number;
}

export const useQaAcceptedAnswerStore = defineStore('acceptedAnswerStore', {
    state: (): State => {
        return {
            notifyList: [],
            page: 1,
            totalPages: 0,
        }
    },
    getters: {},
    actions: {
        async loadQaAcceptedAnswerStore(scroll?: boolean) {
            let {data: response} = await useAxiosGetQaAcceptedAnswerNotify(
                this.page
            )
            if (response.code == 0) {
                if (scroll) {
                    this.notifyList = this.notifyList.concat(response.data.content)
                } else {
                    this.notifyList = response.data.content
                    this.totalPages = response.data.totalPages
                }
            } else {
                errorMsg(response.msg)
            }
        },
        getGoToLink(notify: NotifyMsg) {
            if (notify.notifyType == NotifyType['被采纳']) {
                return `/question/${notify.questionId}`
            }
        },
    },
})
