import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { User } from '~/types/user'
import { useAxiosGetUserInfo, useAxiosPostCheck } from '~/composables/Api/user'
import {
  GetInfinityPageListParams,
  ReplyInfinityRB,
  SendInfinityRB,
  useAxiosGetInfinityById,
  useAxiosGetInfinityCommentById,
  useAxiosGetInfinityPageList,
  useAxiosPostActionUpInfinity,
  useAxiosPostReplyInfinity,
  useAxiosPostSendInfinity
} from '~/composables/Api/infinity'
import { InfinityI, InfinityTopic } from '~/types/infinity'
import { defaultMsg, errorMsg, successMsg, warningMsg } from '~/composables/utils/toastification'
import { useUserStore } from '~/stores/user'
import { useFetchGetArticleList } from '~/composables/Api/article'

//todo 分离 comment 和 tweet store
interface InfinityStore {
  id: Ref<string>
  commentDataList: Ref<InfinityI[]>
  commentReplyDataMap: Ref<Map<string, InfinityI[]>>
  getPageParams: GetInfinityPageListParams
  totalPages: number
  page: number
  end: boolean
  replyInfinityData: InfinityI
  loading: Ref<boolean>
  tweet: Ref<InfinityI>
  replyDialog: Ref<boolean>
}

export const useInfinityStatusStore = defineStore('InfinityStatusStore', {
  state: (): InfinityStore => {
    return {
      id: ref(''),
      getPageParams: {
        properties: [],
        order: null,
        page: 2,
        size: 8
      },
      commentDataList: ref<InfinityI[]>([]),
      commentReplyDataMap: ref<Map<string, InfinityI[]>>(new Map<string, InfinityI[]>()),
      totalPages: 0,
      page: 1,
      end: false,
      replyInfinityData: null,
      loading: ref(true),
      tweet: ref(null),
      replyDialog: ref(false)
    }
  },
  actions: {
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
        if (data.replyUserTweetId){
          let replyDataList = this.commentReplyDataMap.get(data.replyUserTweetId)
          infinity.replyUserName = this.replyInfinityData.user.nickname
          if (this.replyInfinityData.replyUserTweetId) {
            console.log(replyDataList)
            let index = replyDataList.findIndex((item) => item.id === this.replyInfinityData.id)
            console.log("index",index)
            replyDataList.splice(index+1, 0, infinity)
          } else {
            replyDataList.unshift(infinity)
          }


        //   // this?.replyInfinityData?.replyUserTweetId != undefined
        //   console.log(data.replyUserTweetId)
          //   infinity.replyUserName=this.replyInfinityData.user.nickname
        //   console.log(this.replyInfinityData)
        //   console.log("Object.values(this.commentReplyDataMap)",Object.values(this.commentReplyDataMap))
        //   console.log(
        //     'Object.values(this.commentReplyDataMap).indexOf(data.replyUserTweetId)',
        //     Object.values(this.commentReplyDataMap).indexOf(data.replyUserTweetId)
        //   )
        //   if (Object.values(this.commentReplyDataMap).indexOf(data.replyUserTweetId)!=-1) {
        //     this.commentReplyDataMap.get(data.replyUserTweetId).unshift(infinity)
        //   }else {
        //     let replyDataList = this.commentReplyDataMap.get(this.replyInfinityData)
        //     console.log('replyDataList',replyDataList)
        //     let index = replyDataList.findIndex((item) => item.id === data.replyUserTweetId)
        //     replyDataList.splice(index + 1, 0, infinity)
        //   }
        //
        // } else {
        //   console.log("          this.commentDataList = [infinity, ...this.commentDataList]")
        //   console.log(infinity)
        //   this.commentDataList = [infinity, ...this.commentDataList]
        }
        else {
            console.log("          this.commentDataList = [infinity, ...this.commentDataList]")
            console.log(infinity)
          this.commentReplyDataMap.set(infinity.id,[])
            this.commentDataList = [infinity, ...this.commentDataList]
        }
        return true
      } else {
        warningMsg(axiosResponse.msg)
        return false
      }
    },
    async getTweet() {
      if (this.id === '') {
        return
      }
      this.loading = true
      const { data: response } = await useAxiosGetInfinityById(this.id)
      if (response.code === 0) {
        this.commentDataList = response.data.childComments
        this.totalPages = response.data.childCommentTotalPages
        this.loading = false
        this.tweet = response.data
        let commentReplyMap: Object = response.data.childCommentReplyMap
        Object.keys(commentReplyMap).forEach((key) => {
          this.commentReplyDataMap.set(key, commentReplyMap[key])
        })
        this.commentDataList.forEach((c)=>{
          if (!this.commentReplyDataMap.has(c.id)){
            this.commentReplyDataMap.set(c.id, [])
          }
        })

      } else {
        errorMsg(response.msg)
      }
    },
    async getCommentsPage() {
      const { data: axiosResponse } = await useAxiosGetInfinityCommentById(this.id, {
        page: this.page
      })
      if (axiosResponse.code === 0) {
        this.commentDataList.push(...axiosResponse.data.childComments.content)
        Object.keys(axiosResponse.data.commentReplyMap).forEach((key) => {
          this.commentReplyDataMap.set(key, axiosResponse.data.commentReplyMap[key])
        })
        this.commentDataList.forEach((c)=>{
          if (!this.commentReplyDataMap.has(c.id)){
            this.commentReplyDataMap.set(c.id, [])
          }
        })
        this.totalPages = axiosResponse.data.childComments.totalPages
      } else {
        errorMsg(axiosResponse.msg)
      }
    },
    async loadingMore() {
      if (this.page >= this.totalPages) {
        if (this.commentDataList.length > 8) {
          this.end = true
          document.body.onscroll = null
        }
        return
      }
      this.page += 1
      await this.getCommentsPage()
    }
  }
})
