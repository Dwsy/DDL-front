import {defineStore} from 'pinia'
import {UseAxiosGetReplyMeNotify} from '~/composables/Api/messages/reply'
import {errorMsg} from '~/composables/utils/toastification'
import {NotifyMsg, NotifyType, NotifyTypeEn} from '~/types/message'
import {
    QaCommentType,
    UseAxiosGetQaCommentNotify,
} from '~/composables/Api/messages/qa/comment'
import {
    QaWatchType,
    UseAxiosGetQaWatchNotify,
} from '~/composables/Api/messages/qa/watch'
import {useGet} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

interface State {
    qaWatchNotifyList: NotifyMsg[];
    page: number;
    totalPages: number;
}

export const useQaWatchStore = defineStore('QaWatchStore', {
    state: (): State => {
        return {
            qaWatchNotifyList: [],
            page: 1,
            totalPages: null,
        }
    },
    getters: {},
    actions: {
        async loadQaWatchNotifyList(type: QaWatchType, scroll?: boolean) {
            let {data: response} = await UseAxiosGetQaWatchNotify(this.page, type)
            if (response.code == 0) {
                if (scroll) {
                    this.qaWatchNotifyList = this.qaWatchNotifyList.concat(
                        response.data.content
                    )
                } else {
                    this.qaWatchNotifyList = response.data.content
                    this.totalPages = response.data.totalPages
                }
            } else {
                errorMsg(response.msg)
            }
        },
        getGoToLink(notify: NotifyMsg) {
            if (notify.notifyType == NotifyType['被采纳 通知']) {
                return '/question/' + notify.questionId
            }
            if (notify.notifyType == NotifyType['被采纳']) {
                return '/question/' + notify.questionId
            }
        },
    },
})
