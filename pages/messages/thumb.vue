<template>
  <div id="thumb-window">
    <v-row class="ml-5">
      <v-col>
        <!--        <div class="text-end ">-->
        <!--          <v-btn icon="true" elevation="0" @click="thumbStore.loadThumbNotifyList()">-->
        <!--            <v-icon>-->
        <!--              mdi-refresh-->
        <!--            </v-icon>-->
        <!--          </v-btn>-->
        <!--        </div>-->
        <v-list>
          <v-list-item
              v-for="(item, i) in thumbStore.ThumbNotifyList"
              :key="item.id"
              :value="item"
              active-color="pink"
              rounded="xl"
              :href="thumbStore.getGoToLink(item)"
              target="_blank"
          >
            <!--            :to="thumbStore.getGoToLink(item)"-->
            <!--            :href="thumbStore.getGoToLink(item)"-->
            <!--            target="_blank"-->
            <template v-slot:prepend>

              <v-badge color="red" :dot="true" class="mr-3"
                       :model-value="item.notifyState===NotifyState.UNREAD">
                <v-avatar size="x-large">
                  <v-img :src="item.formUserAvatar"></v-img>
                </v-avatar>
              </v-badge>

            </template>

            <v-list-item-title v-text="item.formUserNickname"></v-list-item-title>
            <!--            <v-list-item-subtitle v-text="item.toContent"></v-list-item-subtitle>-->
            <div>
              <span class="text-subtitle-1">
                {{ NotifyType[item.notifyType] }}
              </span>
              {{ item.toContent }}
            </div>
            <span class="text-grey">{{ dateFilter(item.lastModifiedTime) }}</span>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta, dateFilter} from '#imports'
import {onMounted, onUnmounted} from 'vue'
import {useThumbStore, NotifyType} from '~/stores/thumb/thumbStrore'
import {NotifyState} from '~/types/message'

definePageMeta({
  keepalive: false,
})

let thumbStore = useThumbStore()

onMounted(async () => {
  console.log('thumbonMounted')
  document.documentElement.scrollTop = 0
  await thumbStore.loadThumbNotifyList()
  document.body.onscroll = loadingWin
})
onUnmounted(() => {
  thumbStore.page = 1
  thumbStore.totalPages = null
})
const loadingWin = async () => {
  //文档内容实际高度（包括超出视窗的溢出部分）
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  //滚动条滚动距离
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  //窗口可视范围高度
  let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
  if (clientHeight + scrollTop + 100 >= scrollHeight) {
    await loadingMore()
  }
}

const loadingMore = async () => {

  if (thumbStore.page >= thumbStore.totalPages) {
    if (thumbStore.ThumbNotifyList.length > 15) {
      // alert.value = true
      document.body.onscroll = null
    }
    return
  }
  thumbStore.page++
  await thumbStore.loadThumbNotifyList(true)
}
</script>

<style>

</style>