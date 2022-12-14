<template>
  <div
    :class="twitterBorderColor"
    class="dark:bg-dim-700 m-2 overflow-hidden rounded-2xl border bg-gray-50"
  >
    <h1
      :class="twitterBorderColor"
      class="border-b p-3 text-xl font-extrabold text-gray-900 dark:text-white"
    >
      趋势
    </h1>

    <SidebarRightPreviewCardItem v-for="topic in infinityStore.hotTopicList.slice(0, showNum)">
      <div>
        <h2 class="text-md font-bold text-gray-800 dark:text-white">
          {{ topic.name }}
        </h2>

        <p class="text-xs text-gray-400">{{ topic.viewNum }} 浏览 · {{ topic.infinityNum }} 讨论</p>
      </div>
    </SidebarRightPreviewCardItem>

    <div
      :class="defaultTransition"
      class="dark:hover:bg-dim-300 cursor-pointer p-3 text-sm text-blue-400 hover:bg-gray-100 ml-1"
      @click="showMore"
    >
      更多
    </div>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import SidebarRightPreviewCardItem from '~/components/Tcomponents/Sidebar/Right/PreviewCard/Item.vue'
import useTailwindConfig from '~/composables/useTailwindConfig'
// import { defineEmits, defineProps } from 'vue'
import { useInfinityStore } from '~/stores/infinity/infinityStore'

const { twitterBorderColor, defaultTransition } = useTailwindConfig()
const infinityStore = useInfinityStore()
onBeforeMount(() => {
  infinityStore.loadHotTopic()
})
const props = defineProps<{ title: string }>()
const showMore = () => {}
</script>
