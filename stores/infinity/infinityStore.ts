import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosGetUserInfo, useAxiosPostCheck } from '~/composables/Api/user'
import {
  GetInfinityPageListParams,
  useAxiosGetInfinityPageList,
  useAxiosPostActionUpInfinity,
} from '~/composables/Api/infinity'
import { InfinityI } from '~/types/infinity'
import { defaultMsg, successMsg, warningMsg } from "~/composables/utils/toastification";

interface InfinityStore {
  InfinityDataList: InfinityI[]
  getPageParams: GetInfinityPageListParams
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
      InfinityDataList: [],
    }
  },
  actions: {
    async loadInfinityData() {
      const { data: axiosResponse } = await useAxiosGetInfinityPageList(this.getPageParams)
      if (axiosResponse.code === 0) {
        if (this.getPageParams.page === 1) {
          this.InfinityDataList = axiosResponse.data.content
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
  },
})
