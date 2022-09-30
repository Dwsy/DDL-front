import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {
    GetMessageParam,
    UseAxiosGetHistoryMessage, UseAxiosGetMessageByLatestId,
    UseAxiosGetPrivateMessageList, UseAxiosPostReadMessageById, UseAxiosSendMessage,
} from '~/composables/Api/messages/chats'
import {defaultMsg, errorMsg, nextTick, warningMsg} from '#imports'
import {useUser} from '~/stores/user'
import {urlToLink} from '~/composables/useTools'

interface ChatsStore {
    chatsList: ChatsListData[]
    chatRecord: Ref<Array<ChatRecord>>
    chatRecordPage: number
    chatsToUserId: number
    chatUserNickname: string
    totalPages: number
    sendMsg: string
    chatUserAvatar: number
    chatWsMap: Map<number, WebSocket>
    chatWsMsgUnreadNum: Map<number, number>
    auth: boolean
}

export const useChatsStore = defineStore('chats', {
    state: (): ChatsStore => {
        return {
            chatsList: [],
            chatRecord: ref<Array<ChatRecord>>(),
            chatRecordPage: 0,
            chatsToUserId: 0,
            chatUserNickname: '',
            chatUserAvatar: 0,
            totalPages: 0,
            sendMsg: '',
            chatWsMap: new Map<number, WebSocket>(),
            chatWsMsgUnreadNum: new Map<number, number>(),
            auth: false
        }
    },
    getters: {},
    actions: {
        async loadChatsList(refresh = false) {
            // console.log('this.chatsList.length ', this.chatsList.length)
            // if (this.chatsList.length === 0) {
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
            this.chatsList.forEach(item => {
                this.connectWsChannel(Number(item.chatUserId))
                this.chatWsMsgUnreadNum.set(item.chatUserId, 0)
            })
            // }

        },
        async pullLastMessage(init: boolean, toUserId?: number, latest?: number) {
            console.log('拉取消息', init, toUserId, latest)
            if (init) {
                console.log('init')
                this.chatWsMsgUnreadNum.set(Number(toUserId), 0)
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
                    if (response.data.content.length === 1) {
                        await this.loadChatsList()
                    }
                } else {
                    warningMsg(response.msg)
                    return
                }
            } else {
                if (this.totalPages === 1) {
                    return
                }
                if (this.chatRecordPage != this.totalPages) {
                    let params: GetMessageParam = {latest: latest, page: this.chatRecordPage += 1,}
                    // console.log('this.chatsToUserId', this.chatsToUserId)
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
        connectWsChannel(toUserId?: number) {
            if (!('WebSocket' in window)) {
                console.log('您的浏览器不支持WebSocket')
                return
            }
            let conversationId
            let user = useUser()
            if (toUserId == undefined) {
                toUserId = this.chatsToUserId
            }
            if (user.user.id < toUserId) {
                conversationId = user.user.id + '_' + toUserId
            } else {
                conversationId = toUserId + '_' + user.user.id
            }
            console.log(conversationId)
            let auth = false
            // let wsPath = 'ws://localhost:7050/private/message/'
            let wsPath = 'ws://192.168.5.11:7050/private/message/'
            if (this.chatWsMap.has(toUserId)) {
                // console.log('已经存在连接')
                return
            }
            let ws = new WebSocket(wsPath + conversationId)
            let count = 0
            let authMsg: wsMessage = {
                type: 0,
                content: user.token,
            }
            ws.onopen = function () {
                console.log('连接成功')
            }
            ws.onmessage = (event) => {
                // console.log('收到消息', event.data)
                let data = event.data
                if (data === 'success') {
                    ws.send(JSON.stringify(authMsg))
                    return
                }
                if (data === '鉴权成功') {
                    this.chatWsMap.set(toUserId, ws)
                    console.log('ok!')
                    return
                }
                if (data === '鉴权失败' || data === 'error') {
                    ws.close()
                }
                //json
                if (data.startsWith('{')) {
                    this.receiveMessage(event.data)
                }
                //readMsg
                if (data.startsWith('r0')) {
                    let readMsg = data.split('_')
                    let formUserId = readMsg[2]
                    let toUserId = readMsg[3]
                    if (this.chatsToUserId == toUserId) {
                        this.wsReadMsg(readMsg[1])
                    }
                    // todo 不在当前聊天窗口 已读 图标变化
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

                // await this.scrollBottom()
            } else {
                warningMsg(response.msg)
                return
            }
            this.sendMsg = ''

        },
        async receiveMessage(msg: string) {
            let Message: ChatRecord = JSON.parse(msg)
            for (let i = 0; i < this.chatsList.length; i++) {

                let temp
                if (this.chatsList[i].chatUserId == Message.toUserId) {
                    temp = this.chatsList[i]
                    temp.content = '我:' + Message.content
                    this.chatsList = this.chatsList.filter((item) => item.id !== temp.id)
                    temp.createTime = Message.createTime
                    this.chatsList.unshift(temp)
                    break

                } else if (this.chatsList[i].chatUserId == Message.formUserId) {
                    temp = this.chatsList[i]
                    temp.content = Message.content
                    this.chatsList = this.chatsList.filter((item) => item.id !== temp.id)
                    temp.createTime = Message.createTime
                    this.chatsList.unshift(temp)
                    break
                }


            }
            Message.content = decodeURI(urlToLink(Message.content))
            Message.chatUserNickname = this.chatUserNickname
            Message.chatUserAvatar = this.chatUserAvatar
            // console.log('this.chatsToUserId', this.chatsToUserId)
            // console.log('Message.formUserId', Message.formUserId)

            // let sendMsg: ChatRecord = {
            //     chatUserAvatar: undefined,
            //     chatUserId: 0,
            //     chatUserNickname: undefined,
            //     content: decodeURI(urlToLink(content)),
            //     createTime: new Date().getTime(),
            //     deleted: false,
            //     formUserId: 0,
            //     id: 0,
            //     lastModifiedTime: 0,
            //     status: '0',
            //     toUserId: this.toUserId
            // }
            // this.chatRecord.push(sendMsg)


            if (this.chatsToUserId === Message.formUserId ||
                this.chatsToUserId === Message.toUserId) {
                this.chatRecord.push(Message)
                await this.scrollBottom()
                return
            }
            for (let i = 0; i < this.chatsList.length; i++) {
                if (this.chatsList[i].formUserId === Message.formUserId ||
                    this.chatsList[i].toUserId === Message.formUserId) {
                    let temp = this.chatsList[i]
                    this.chatsList = this.chatsList.filter((item) => item.id !== temp.id)
                    temp.createTime = Message.createTime
                    temp.content = Message.content
                    this.chatsList.unshift(temp)
                    const unreadNum = this.chatWsMsgUnreadNum
                    unreadNum.set(Message.formUserId, unreadNum.get(Message.formUserId) + 1)
                    // console.log('unreadNum.get(this.chatsToUserId)', unreadNum.get(this.chatsToUserId))
                    break
                }

            }

        },
        async readMsg(id: number) {
            if (!await UseAxiosPostReadMessageById(id)) {
                errorMsg('标记已读失败')
                return
            }
            console.log('已读：', id)
        },
        async wsReadMsg(msg: string) {
            let id = Number(msg)
            //js 这个find 居然可以直接修改值
            let temp = this.chatRecord.find((item) => item.id === id)
            if (temp != undefined) {
                temp.status = ChatRecordStatus.READ
            }
        }
    }
})

interface Response {
    code: number
    msg: string
    data: any
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
    status: ChatRecordStatus;
}

export enum ChatRecordStatus {
    UNREAD, READ, WITHDRAW
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