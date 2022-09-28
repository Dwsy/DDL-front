import {onUnmounted, ref, Ref} from 'vue'
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
    sendMsg: string
    chatUserAvatar: number
    chatWsMap: Map<number, WebSocket>
}

export const useChatsStore = defineStore('chats', {
    state: (): ChatsStore => {
        return {
            chatsList: ref<ChatsListData[]>(),
            chatRecord: ref<Array<ChatRecord>>(),
            chatRecordPage: 0,
            chatsToUserId: 0,
            chatUserNickname: '',
            chatUserAvatar: 0,
            totalPages: 0,
            sendMsg: '',
            chatWsMap: new Map<number, WebSocket>()
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
        async pullLastMessage(init: boolean, toUserId?, latest?: number) {
            console.log('拉取最新消息')
            if (init) {
                console.log('init')
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
                    this.chatUserAvatar = this.chatRecord[0].chatUserAvatar
                    this.chatRecordPage = 1
                    this.totalPages = response.data.totalPages
                } else {
                    warningMsg(response.msg)
                    return
                }
            } else {
                if (this.totalPages === 1) {
                    return
                }
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
        connectWsChannel() {
            if (!('WebSocket' in window)) {
                console.log('您的浏览器不支持WebSocket')
                return
            }
            let conversationId
            let user = useUser()
            if (user.user.id < this.chatsToUserId) {
                conversationId = user.user.id + '_' + this.chatsToUserId
            } else {
                conversationId = this.chatsToUserId + '_' + user.user.id
            }
            let auth = false
            let wsPath = 'ws://localhost:7050/private/message/'
            if (this.chatWsMap.has(this.chatsToUserId)) {
                console.log('已经存在连接')
                return
            }
            let ws = new WebSocket(wsPath + conversationId)
            this.chatWsMap.set(this.chatsToUserId, ws)
            let count = 0
            let authMsg: wsMessage = {
                type: 0,
                content: user.token,
            }
            ws.onopen = function () {
                console.log('连接成功')
                ws.send(JSON.stringify(authMsg))
            }
            ws.onmessage = (event) => {
                if (!auth) {
                    if (event.data === '鉴权成功') {
                        auth = true
                        console.log('鉴权成功')
                    }
                } else {
                    console.log('收到消息' + count++, event.data)
                    this.receiveMessage(event.data)
                }
            }
            ws.onclose = function () {
                console.log('连接关闭')
            }
            ws.onerror = function () {
                console.log('连接错误')
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
        async sendMessage() {
            let content = this.sendMsg
            let {data: response} = await UseAxiosSendMessage(content, this.chatsToUserId)
            if (response.code === 0) {
                let sendMsg: ChatRecord = {
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
                this.chatRecord.push(sendMsg)
                for (let i = 0; i < this.chatsList.length; i++) {
                    console.log('this.chatsList[i].chatUserId', this.chatsList[i].chatUserId)
                    console.log('this.chatsToUserId', this.chatsToUserId)
                    if (this.chatsList[i].chatUserId == this.chatsToUserId) {
                        console.log('-------')
                        let temp = this.chatsList[i]
                        this.chatsList = this.chatsList.filter((item) => item.id !== temp.id)
                        temp.createTime = sendMsg.createTime
                        temp.content = '我:' + sendMsg.content
                        this.chatsList.unshift(temp)
                        break
                    }
                }
                await this.scrollBottom()
            } else {
                warningMsg(response.msg)
                return
            }
            this.sendMsg = ''

        },
        async receiveMessage(msg: string) {
            console.log('receiveMessage', msg)
            let Message: ChatRecord = JSON.parse(msg)
            Message.content = decodeURI(urlToLink(Message.content))
            Message.chatUserNickname = this.chatUserNickname
            Message.chatUserAvatar = this.chatUserAvatar
            this.chatRecord.push(Message)
            for (let i = 0; i < this.chatsList.length; i++) {
                if (this.chatsList[i].formUserId === Message.formUserId ||
                    this.chatsList[i].toUserId === Message.formUserId) {
                    let temp = this.chatsList[i]
                    this.chatsList = this.chatsList.filter((item) => item.id !== temp.id)
                    temp.createTime = Message.createTime
                    temp.content = Message.content
                    this.chatsList.unshift(temp)
                    break
                }
            }
            await this.scrollBottom()
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

interface wsMessage {
    type: 0 | 1
    content: string
}