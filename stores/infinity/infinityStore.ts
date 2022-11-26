import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosGetUserInfo, useAxiosPostCheck } from '~/composables/Api/user'
import {
  GetInfinityPageListParams,
  useAxiosGetInfinityPageList,
  useAxiosPostActionUpInfinity,
  useAxiosPostSendInfinity,
} from '~/composables/Api/infinity'
import { InfinityI, InfinityTopic } from '~/types/infinity'
import { defaultMsg, successMsg, warningMsg } from '~/composables/utils/toastification'
import { useUserStore } from '~/stores/user'
import { useFetchGetArticleList } from '~/composables/Api/article'

interface InfinityStore {
  InfinityDataList: Ref<InfinityI[]>
  commentDataList: Ref<InfinityI[]>
  getPageParams: GetInfinityPageListParams
  infinityTopicList: Ref<InfinityTopic[]>
  totalPages: number
  end: boolean
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
      infinityTopicList: ref<InfinityTopic[]>([]),
      totalPages: 0,
      end: false,
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
    async upActionTweet(id: string, up: boolean) {
      const { data: axiosResponse } = await useAxiosPostActionUpInfinity(id, up)
      if (axiosResponse.code === 0) {
        if (axiosResponse.data === '点赞成功') {
          const index = this.InfinityDataList.findIndex((item) => item.id === id)
          this.InfinityDataList[index].upNum += 1
          this.InfinityDataList[index].up = up
          successMsg(axiosResponse.data)
        } else if (axiosResponse.data === '取消点赞成功') {
          const index = this.InfinityDataList.findIndex((item) => item.id === id)
          this.InfinityDataList[index].upNum -= 1
          this.InfinityDataList[index].up = up
          successMsg(axiosResponse.data)
        } else {
          defaultMsg(axiosResponse.data)
        }
      } else {
        warningMsg(axiosResponse.data)
      }
    },
    async sendInfinity(data: any) {
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
