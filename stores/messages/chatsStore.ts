import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {
    GetHistoryMessageParam,
    UseAxiosGetHistoryMessage,
    UseAxiosGetPrivateMessageList,
} from '~/composables/Api/messages/chats'
import {warningMsg} from '#imports'
import {useUser} from '~/stores/user'
import {SymbolKind} from 'vscode-languageserver-types'

export const useChatsStore = defineStore('chats', {
    state: (): ChatsStore => {
        return {
            chatsList: ref<ChatsListData[]>(),
            chatRecord: ref<Array<ChatRecord>>()
        }
    },
    getters: {},
    actions: {
        async loadChatsList() {
            let {data: response} = await UseAxiosGetPrivateMessageList()
            if (response.code === 0) {
                this.chatsList = response.data.content
            } else {
                warningMsg(response.msg)
                return
            }
            // this.chatsList.forEach((item) => {
            //     if (item.toUserId == item.chatUserId) {
            //         item.content= '我: ' + item.content
            //     }
            // })
            // this.chatsList = response.data.content.filter((item) => item.formUserId==useUser().userInfo.id)
        },
        async pullHistoryMessage(toUserId, params?: GetHistoryMessageParam) {
            let {data: response} = await UseAxiosGetHistoryMessage(toUserId, params)
            console.log(response)
            if (response.code === 0) {
                this.chatRecord = response.data.content
                console.log(this.chatRecord)
            } else {
                warningMsg(response.msg)
                return
            }
        },


    }
})

interface Response {
    code: number
    msg: string
    data: any
}

interface ChatsStore {
    chatsList: Ref<ChatsListData[]>
    chatRecord: Ref<Array<ChatRecord>>
}

interface ChatRecord {
    id: number;
    deleted: boolean;
    createTime: number;
    lastModifiedTime: number;
    formUserId: number;
    toUserId: number;
    chatUserNickname: any;
    chatUserId: number;
    chatUserAvatar: any;
    content: string;
    status: string;
}


interface ChatsListData {
    id: number
    deleted: boolean
    createTime: number
    lastModifiedTime: number
    formUserId: number
    toUserId: number
    chatUserNickname: string
    chatUserId: number
    chatUserAvatar: string
    content: string
    status: string
}
