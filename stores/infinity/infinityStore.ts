import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosGetUserInfo, useAxiosPostCheck } from '~/composables/Api/user'
import { GetInfinityPageListParams, useAxiosGetInfinityPageList } from '~/composables/Api/infinity'
import { InfinityI } from '~/types/infinity'
import { warningMsg } from '~/composables/utils/toastification'

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
  },
})
