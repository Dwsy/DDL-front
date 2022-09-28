import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {
    GetMessageParam,
    UseAxiosGetHistoryMessage, UseAxiosGetMessageByLatestId,
    UseAxiosGetPrivateMessageList, UseAxiosSendMessage,
} from '~/composables/Api/messages/chats'
import {defaultMsg, nextTick, warningMsg} from '#imports'
import {useUser} from '~/stores/user'
import {SymbolKind} from 'vscode-languageserver-types'
import {urlToLink} from '~/composables/useTools'

interface ChatsStore {
    chatsList: Ref<ChatsListData[]>
    chatRecord: Ref<Array<ChatRecord>>
    chatRecordPage: number
    chatsToUserId: number
    chatUserNickname: string
    totalPages: number
}

export const useChatsStore = defineStore('chats', {
    state: (): ChatsStore => {
        return {
            chatsList: ref<ChatsListData[]>(),
            chatRecord: ref<Array<ChatRecord>>(),
            chatRecordPage: 0,
            chatsToUserId: 0,
            chatUserNickname: '',
            totalPages: 0
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
            this.chatsList.forEach((item) => {
                if (item.toUserId == item.chatUserId) {
                    item.content = '我: ' + item.content
                }
            })

        },
        async pullLastMessage(toUserId?, latest?: number) {
            if (this.chatRecord == undefined) {
                let {data: response} = await UseAxiosGetMessageByLatestId(toUserId)
                if (response.code === 0) {
                    let ra: Array<ChatRecord> = []
                    ra = response.data.content
                    ra.forEach((item) => {
                        item.content = decodeURI(urlToLink(item.content))
                    })
                    this.chatRecord = ra.reverse()
                    this.chatUserNickname = this.chatRecord[0].chatUserNickname
                    this.chatsToUserId = toUserId
                    this.chatRecordPage = 1
                    this.totalPages = response.data.totalPages
                } else {
                    warningMsg(response.msg)
                    return
                }
            } else {
                console.log('this.chatRecordPage', this.chatRecordPage)
                console.log('this.totalPages', this.totalPages)
                if (this.chatRecordPage != this.totalPages) {
                    let params: GetMessageParam = {latest: latest, page: this.chatRecordPage += 1,}
                    console.log('this.chatsToUserId', this.chatsToUserId)
                    let {data: response} = await UseAxiosGetHistoryMessage(this.chatsToUserId, params)
                    if (response.code === 0) {
                        let ra: Array<ChatRecord> = []
                        ra = response.data.content
                        ra.forEach((item) => {
                            item.content = decodeURI(urlToLink(item.content))
                        })
                        this.chatRecord.unshift(...ra.reverse())
                    } else {
                        warningMsg(response.msg)
                        return
                    }
                } else {
                    defaultMsg('没有更多消息了')
                    return
                }
            }
        },

        // async pullHistoryMessage(toUserId, latest?: number) {
        //     let params: GetMessageParam
        //     if (latest != null) {
        //         body = {
        //             latest, page: this.chatRecordPage + 1,
        //         }
        //     }
        //     let {data: response} = await UseAxiosGetHistoryMessage(toUserId, body)
        //     if (response.code === 0) {
        //         let ra: Array<ChatRecord> = []
        //         ra = response.data.content
        //         ra.forEach((item) => {
        //             item.content = decodeURI(urlToLink(item.content))
        //         })
        //         if (this.chatRecord == undefined) {
        //             this.chatRecord = ra.reverse()
        //             this.chatUserNickname = this.chatRecord[0].chatUserNickname
        //             this.toUserId = toUserId
        //         } else {
        //             console.log('page')
        //         }
        //     } else {
        //         warningMsg(response.msg)
        //         return
        //     }
        // },
        async scrollBottom() {
            await nextTick()
            let div = document.getElementsByClassName('lite-chatbox')[0]
            div.scrollTop = div.scrollHeight //当前div的滚轮始终保持最下面
            // let element = document.getElementsByClassName('lite-chatbox')[0]
            // element.scrollTo(0, element.scrollHeight)
        },
        async sendMessage(content: string) {
            let {data: response} = await UseAxiosSendMessage(content, this.toUserId)
            if (response.code === 0) {
                let chat: ChatRecord = {
                    chatUserAvatar: undefined,
                    chatUserId: 0,
                    chatUserNickname: undefined,
                    content: decodeURI(urlToLink(content)),
                    createTime: new Date().getTime(),
                    deleted: false,
                    formUserId: 0,
                    id: 0,
                    lastModifiedTime: 0,
                    status: '0',
                    toUserId: this.toUserId
                }
                this.chatRecord.push(chat)
                await this.scrollBottom()
            } else {
                warningMsg(response.msg)
                return
            }
        }
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
    chatRecordPage: number
    chatsToUserId: number
    chatUserNickname: string
    totalPages: number
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
