import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import {
  GetMessageParam,
  UseAxiosGetHistoryMessage,
  UseAxiosGetMessageByLatestId,
  UseAxiosGetPrivateMessageList,
  UseAxiosPostReadMessageById,
  UseAxiosSendMessage,
} from '~/composables/Api/messages/chats'
import { nextTick, successMsg } from '#imports'
import { defaultMsg, errorMsg, warningMsg } from '~~/composables/utils/toastification'
import { useUserStore } from '~/stores/user'
import { chatTextConvert, getChatType } from '~/composables/useTools'
import { subString } from '~/utils/BigInt'

interface ChatsStore {
  chatsList: Ref<ChatsListData[]>
  chatRecord: Ref<Array<ChatRecord>>
  chatRecordPage: number
  chatsToUserId: string
  chatUserNickname: string
  totalPages: number
  msg: string
  chatUserAvatar: number
  chatWsMap: Map<string, WebSocket>
  chatMsgUnreadNum: Map<string, number>
  auth: boolean
  load: boolean
  enableMdMode: boolean
}

export const useChatsStore = defineStore('chats', {
  state: (): ChatsStore => {
    return {
      chatsList: ref<ChatsListData[]>(),
      chatRecord: ref<Array<ChatRecord>>(),
      chatRecordPage: 0,
      chatsToUserId: '0',
      chatUserNickname: '',
      chatUserAvatar: 0,
      totalPages: 0,
      msg: '',
      chatWsMap: new Map<string, WebSocket>(),
      chatMsgUnreadNum: new Map<string, number>(),
      auth: false,
      load: true,
      enableMdMode: false,
    }
  },
  getters: {},
  actions: {
    async loadChatsList(refresh = false) {
      if (!refresh) {
        if (this.chatsList != undefined) {
          return
        }
      }

      let { data: response } = await UseAxiosGetPrivateMessageList()
      if (response.code === 0) {
        this.chatsList = response.data.content
      } else {
        warningMsg(response.msg)
        return
      }
      this.chatsList.forEach((item) => {
        const chatType = getChatType(item.content)
        if (chatType === ChatType.img) {
          item.content = '[图片]'
        }
        if (chatType === ChatType.markdown) {
          item.content = '[Markdwon消息]'
        }

        if (item.toUserId == item.chatUserId) {
          item.content = '我: ' + item.content
        }
        this.connectWsChannel(item.chatUserId)
        this.chatMsgUnreadNum.set(item.chatUserId, item.unreadMsgCount)
      })

      // this.chatsList.forEach(item => {
      //     this.connectWsChannel(Number(item.chatUserId))
      //     this.chatMsgUnreadNum.set(item.chatUserId, 0)
      // })
      // }
    },
    async pullLastMessage(init: boolean, toUserId?: string, latest?: number) {
      clog('拉取消息', init, toUserId, latest)
      if (init) {
        this.msg = ''
        this.chatMsgUnreadNum.set(toUserId, 0)
        let { data: response } = await UseAxiosGetMessageByLatestId(toUserId)
        if (response.code === 0) {
          let ra: Array<ChatRecord> = []
          ra = response.data.content
          ra.forEach((item, index) => {
            const chatType: ChatType = getChatType(item.content)
            item.chatType = chatType
            item.content = decodeURI(chatTextConvert(item.content, chatType))
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
          let params: GetMessageParam = {
            latest: latest,
            page: (this.chatRecordPage += 1),
          }
          // clog('this.chatsToUserId', this.chatsToUserId)
          let { data: response } = await UseAxiosGetHistoryMessage(this.chatsToUserId, params)
          if (response.code === 0) {
            let ra: Array<ChatRecord> = []
            ra = response.data.content
            ra.forEach((item) => {
              const chatType: ChatType = getChatType(item.content)
              item.chatType = chatType
              item.content = decodeURI(chatTextConvert(item.content, chatType))
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
        clog('您的浏览器不支持WebSocket')
        return
      }
      let conversationId
      let user = useUserStore()
      if (toUserId == undefined) {
        toUserId = this.chatsToUserId
      }
      // if (Number(user.user.id) < Number(toUserId)) {
      if (Number(subString(user.user.id, toUserId)) < 0) {
        conversationId = user.user.id + '_' + toUserId
      } else {
        conversationId = toUserId + '_' + user.user.id
      }
      clog(conversationId)
      let auth = false
      let wsPath = 'ws://localhost:7050/private/message/'
      // let wsPath = 'ws://192.168.5.11:7050/private/message/'
      if (this.chatWsMap.has(toUserId)) {
        // clog('已经存在连接')
        return
      }
      let ws = new WebSocket(wsPath + conversationId)
      let count = 0
      let authMsg: wsMessage = {
        type: 0,
        content: user.token,
      }
      ws.onopen = function () {
        clog('连接成功')
      }
      ws.onmessage = (event) => {
        // clog('收到消息', event.data)
        let data = event.data
        if (data === 'success') {
          ws.send(JSON.stringify(authMsg))
          return
        }
        if (data === '鉴权成功') {
          this.chatWsMap.set(toUserId, ws)
          clog('ok!')
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
        }
      }
      ws.onclose = function () {
        clog('连接关闭')
      }
      ws.onerror = function () {
        clog('连接错误')
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
    //             item.content = decodeURI(chatTextConvert(item.content))
    //         })
    //         if (this.chatRecord == undefined) {
    //             this.chatRecord = ra.reverse()
    //             this.chatUserNickname = this.chatRecord[0].chatUserNickname
    //             this.toUserId = toUserId
    //         } else {
    //             clog('page')
    //         }
    //     } else {
    //         warningMsg(response.msg)
    //         return
    //     }
    // },
    async scrollBottom() {
      await nextTick()
      // document.querySelector('div.lite-chatbox > div:last-child > div > div > div > div > span.d-time').scrollIntoView()
      let chatbox = document.querySelector('.lite-chatbox')
      chatbox.scrollTop = chatbox.scrollHeight //当前div的滚轮始终保持最下面
      // let element = document.getElementsByClassName('lite-chatbox')[0]
      // element.scrollTo(0, element.scrollHeight)
    },
    async sendMessage() {
      let content: string
      if (this.enableMdMode) {
        content = 'md||' + this.msg
      } else {
        content = this.msg
      }

      let { data: response } = await UseAxiosSendMessage(content, this.chatsToUserId)
      if (response.code === 0) {
        await this.scrollBottom()
      } else {
        warningMsg(response.msg)
        return
      }
      this.msg = ''
    },
    async sendImg(url: string) {
      let content = `img||${url}`
      let { data: response } = await UseAxiosSendMessage(content, this.chatsToUserId)
      if (response.code === 0) {
        successMsg('发送成功')
        return true
      } else {
        warningMsg(response.msg)
        return false
      }
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
      Message.chatType = getChatType(Message.content)
      Message.content = decodeURI(chatTextConvert(Message.content, Message.chatType))
      Message.chatUserNickname = this.chatUserNickname
      Message.chatUserAvatar = this.chatUserAvatar
      // clog('this.chatsToUserId', this.chatsToUserId)
      // clog('Message.formUserId', Message.formUserId)

      // let msg: ChatRecord = {
      //     chatUserAvatar: undefined,
      //     chatUserId: 0,
      //     chatUserNickname: undefined,
      //     content: decodeURI(chatTextConvert(content)),
      //     createTime: new Date().getTime(),
      //     deleted: false,
      //     formUserId: 0,
      //     id: 0,
      //     lastModifiedTime: 0,
      //     status: '0',
      //     toUserId: this.toUserId
      // }
      // this.chatRecord.push(msg)

      if (this.chatsToUserId === Message.formUserId || this.chatsToUserId === Message.toUserId) {
        this.chatRecord.push(Message)
        await this.scrollBottom()
        return
      }
      for (let i = 0; i < this.chatsList.length; i++) {
        if (
          this.chatsList[i].formUserId === Message.formUserId ||
          this.chatsList[i].toUserId === Message.formUserId
        ) {
          let temp = this.chatsList[i]
          this.chatsList = this.chatsList.filter((item) => item.id !== temp.id)
          temp.createTime = Message.createTime
          temp.content = Message.content
          this.chatsList.unshift(temp)
          const unreadNum = this.chatMsgUnreadNum
          unreadNum.set(Message.formUserId, unreadNum.get(Message.formUserId) + 1)
          // clog('unreadNum.get(this.chatsToUserId)', unreadNum.get(this.chatsToUserId))
          break
        }
      }
    },
    async readMsg(id: string) {
      if (!(await UseAxiosPostReadMessageById(id))) {
        errorMsg('标记已读失败')
        return
      }
      clog('已读：', id)
    },
    async wsReadMsg(msg: string) {
      let id = Number(msg)
      //js 这个find 居然可以直接修改值
      let temp = this.chatRecord.find((item) => item.id === id)
      if (temp != undefined) {
        temp.status = ChatRecordStatus.READ
      }
    },
  },
})

interface Response {
  code: number
  msg: string
  data: any
}

interface ChatRecord {
  id: string
  deleted: boolean
  createTime: number
  lastModifiedTime: number
  formUserId: string
  toUserId: string
  chatUserNickname: any
  chatUserId: string
  chatUserAvatar: any
  content: string
  status: ChatRecordStatus
  chatType: ChatType
}

export enum ChatType {
  text,
  img,
  markdown,
}

export enum ChatRecordStatus {
  UNREAD,
  READ,
  WITHDRAW,
}

interface ChatsListData {
  id: string
  deleted: boolean
  createTime: number
  lastModifiedTime: number
  formUserId: string
  toUserId: string
  chatUserNickname: string
  chatUserId: string
  unreadMsgCount: number
  chatUserAvatar: string
  content: string
  status: string
}

interface wsMessage {
  type: 0 | 1
  content: string
}
