import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import {
  GetInfinityPageListParams,
  InfinityTopicRankI,
  ReplyInfinityRB,
  SendInfinityRB,
  useAxiosGetInfinityPageList,
  useAxiosGetToDayHotTopicList,
  useAxiosPostActionUpInfinity,
  useAxiosPostReplyInfinity,
  useAxiosPostSendInfinity,
} from '~/composables/Api/infinity'
import { InfinityI, InfinityTopic, TwShowStatus } from '~/types/infinity'
import { defaultMsg, successMsg, warningMsg } from '~/composables/utils/toastification'
import { useUserStore } from '~/stores/user'
import { useInfinityStatusStore } from '~/stores/infinity/infinityStatusStore'
import item from '~/components/Tcomponents/Sidebar/Right/PreviewCard/Item.vue'

//todo 分离 comment 和 tweet store
interface InfinityStore {
  InfinityDataList: Ref<InfinityI[]>
  commentDataList: Ref<InfinityI[]>
  commentReplyDataMap: Ref<Map<string, InfinityI[]>>
  getPageParams: GetInfinityPageListParams
  infinityTopicList: Ref<InfinityTopic[]>
  totalPages: number
  end: boolean
  isHome: Ref<boolean>
  replyInfinityData: InfinityI

  hotTopicList: InfinityTopicRankI[] | InfinityTopic[]
}

export const useInfinityStore = defineStore('InfinityStore', {
  state: (): InfinityStore => {
    return {
      getPageParams: {
        properties: [],
        order: null,
        page: 1,
        size: 8,
      },
      InfinityDataList: ref<InfinityI[]>([]),
      commentDataList: ref<InfinityI[]>([]),
      commentReplyDataMap: ref<Map<string, InfinityI[]>>(new Map<string, InfinityI[]>()),
      infinityTopicList: ref<InfinityTopic[]>([]),
      totalPages: 0,
      end: false,
      isHome: ref(true),
      replyInfinityData: null,
      hotTopicList: [],
    }
  },
  actions: {
    async loadInfinityData() {
      const { data: axiosResponse } = await useAxiosGetInfinityPageList(this.getPageParams)
      if (axiosResponse.code === 0) {
        if (this.getPageParams.page === 1) {
          this.InfinityDataList = axiosResponse.data.content
          this.totalPages = axiosResponse.data.totalPages
        } else {
          this.InfinityDataList = this.InfinityDataList.concat(axiosResponse.data.content)
        }
      } else {
        warningMsg(axiosResponse.msg)
      }
    },
    async loadHotTopic(showMore?: boolean) {
      // if (showMore) {
      //   const { data: axiosResponse } = await useAxiosGetToDayHotTopicList()
      //   if (axiosResponse.code === 0) {
      //     this.hotTopicList = axiosResponse.data
      //   } else {
      //     warningMsg(axiosResponse.msg)
      //   }
      //   return
      // }
      if (this.hotTopicList.length === 0) {
        const { data: axiosResponse } = await useAxiosGetToDayHotTopicList()
        if (axiosResponse.code === 0) {
          this.hotTopicList = axiosResponse.data
        } else {
          warningMsg(axiosResponse.msg)
        }
      }
    },
    async upActionTweet(id: string, up: boolean, showStatus: TwShowStatus, replyId?: string) {
      const { data: axiosResponse } = await useAxiosPostActionUpInfinity(id, up)
      let dataList = this.InfinityDataList
      if (axiosResponse.code === 0) {
        if (axiosResponse.data === '点赞成功') {
          if (showStatus == TwShowStatus.index) {
            const index = dataList.findIndex((item) => item.id === id)
            dataList[index].upNum += 1
            dataList[index].up = true
          } else {
            const infinityStatusStore = useInfinityStatusStore()
            if (showStatus == TwShowStatus.status) {
              infinityStatusStore.tweet.upNum += 1
              infinityStatusStore.tweet.up = this
            } else if (showStatus == TwShowStatus.comment) {
              let commentDataList = infinityStatusStore.commentDataList
              const index = commentDataList.findIndex((item) => item.id === id)
              commentDataList[index].upNum += 1
              commentDataList[index].up = this
            } else if (showStatus == TwShowStatus.reply) {
              let replyDataList = infinityStatusStore.commentReplyDataMap.get(replyId)
              const index = replyDataList.findIndex((item) => item.id === id)
              replyDataList[index].upNum += 1
              replyDataList[index].up = this
            }
          }
          successMsg(axiosResponse.data)
        } else if (axiosResponse.data === '取消点赞成功') {
          if (showStatus == TwShowStatus.index) {
            const index = dataList.findIndex((item) => item.id === id)
            dataList[index].upNum -= 1
            dataList[index].up = false
          } else {
            const infinityStatusStore = useInfinityStatusStore()
            if (showStatus == TwShowStatus.status) {
              infinityStatusStore.tweet.upNum -= 1
              infinityStatusStore.tweet.up = false
            } else if (showStatus == TwShowStatus.comment) {
              let commentDataList = infinityStatusStore.commentDataList
              const index = commentDataList.findIndex((item) => item.id === id)
              commentDataList[index].upNum -= 1
              commentDataList[index].up = false
            } else if (showStatus == TwShowStatus.reply) {
              let replyDataList = infinityStatusStore.commentReplyDataMap.get(replyId)
              const index = replyDataList.findIndex((item) => item.id === id)
              replyDataList[index].upNum -= 1
              replyDataList[index].up = false
            }
          }
          successMsg(axiosResponse.data)
        } else {
          defaultMsg(axiosResponse.data)
        }
      } else {
        warningMsg(axiosResponse.data)
      }
    },
    async sendInfinity(data: SendInfinityRB) {
      // this.InfinityDataList = []
      const { data: axiosResponse } = await useAxiosPostSendInfinity(data)
      if (axiosResponse.code === 0) {
        successMsg('发送成功')
        let infinity = axiosResponse.data
        //jpa userinfo null
        const userStore = useUserStore()
        infinity.user.userInfo = userStore.userInfo
        infinity.user.nickname = userStore.user.nickname
        this.InfinityDataList = [infinity, ...this.InfinityDataList]
      } else {
        warningMsg(axiosResponse.msg)
        return null
      }
    },
    async replyInfinity(data: ReplyInfinityRB) {
      // this.InfinityDataList = []
      const { data: axiosResponse } = await useAxiosPostReplyInfinity(data)
      if (axiosResponse.code === 0) {
        successMsg('回复成功')
        let infinity = axiosResponse.data
        //jpa userinfo null
        const userStore = useUserStore()
        infinity.user.userInfo = userStore.userInfo
        infinity.user.nickname = userStore.user.nickname
        this.commentDataList = [infinity, ...this.commentDataList]
      } else {
        warningMsg(axiosResponse.msg)
        return null
      }
    },
    async loadingMore() {
      if (this.getPageParams.page >= Number(this.totalPages)) {
        if (this.InfinityDataList.length > this.getPageParams.size) {
          this.end = true
          document.body.onscroll = null
        }
        return
      }
      this.getPageParams.page += 1
      await this.loadInfinityData()
      // const { data: listDataNew } = await useFetchGetArticleList(params.value)
      // listContent.value.push(...listDataNew.content)
    },
  },
})
