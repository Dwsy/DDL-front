<template>
  <div class="flex flex-col">
    <!--  <div class="flex h-screen flex-col">-->
    <!--    <div-->
    <!--      :class="defaultTransition"-->
    <!--      class="my-2 w-full rounded-full p-2 hover:bg-blue-50 dark:hover:bg-white/20"-->
    <!--    >-->
    <!--      &lt;!&ndash;      <nuxt-link to="/">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <div class="h-8 w-8">&ndash;&gt;-->
    <!--      &lt;!&ndash;          <LogoTwitter />&ndash;&gt;-->
    <!--      &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </nuxt-link>&ndash;&gt;-->
    <!--    </div>-->

    <div class="mt-2 space-y-3">
      <SidebarLeftTab to="/infinity/home" @click="clickHomeBtn">
        <template v-slot:icon="{ active }">
          <HomeIconSolid v-if="active" />
          <HomeIcon v-else />
        </template>
        <template v-slot:name> 主页</template>
      </SidebarLeftTab>

      <SidebarLeftTab to="/infinity/trends">
        <template v-slot:icon>
          <ChartBarIcon />
        </template>
        <template v-slot:name> 热门</template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> 通知</template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> 私信</template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> 书签</template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> 列表</template>
      </SidebarLeftTab>

      <!--      <SidebarLeftTab>-->
      <!--        <template v-slot:icon>-->
      <!--          <UserIcon />-->
      <!--        </template>-->
      <!--        <template v-slot:name> Profile </template>-->
      <!--      </SidebarLeftTab>-->

      <!--      <SidebarLeftTab>-->
      <!--        <template v-slot:icon>-->
      <!--          <ChatBubbleOvalLeftIcon />-->
      <!--        </template>-->
      <!--        <template v-slot:name> More </template>-->
      <!--      </SidebarLeftTab>-->

      <!--      <div class="hidden xl:block">-->
      <!--        <UIButton liquid size="lg" @on-click="emits('onTweet')">-->
      <!--          <span class="font-bold"> Tweet </span>-->
      <!--        </UIButton>-->
      <!--      </div>-->

      <div class="block xl:hidden">
        <UIButton @on-click="emits('onTweet')">
          <div class="h-6 w-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>

    <!--    <div-->
    <!--      :class="defaultTransition"-->
    <!--      class="dark:hover:bg-dim-800 mx-auto mt-auto mb-5 flex w-14 cursor-pointer flex-row items-center justify-center rounded-full px-2 py-2 hover:bg-gray-100 xl:w-full"-->
    <!--      @click="emits('onLogout')"-->
    <!--    >-->
    <!--      <div class="flex flex-row">-->
    <!--        <img :src="props.user.profileImage" alt="" class="h-10 w-10 rounded-full" />-->
    <!--        <div class="ml-2 hidden flex-col xl:block">-->
    <!--          <h1 class="text-sm font-bold text-gray-800 dark:text-white">-->
    <!--            {{ user.name }}-->
    <!--          </h1>-->
    <!--          <p class="text-sm text-gray-400">-->
    <!--            {{ user.handle }}-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--            {{ user.handle }}-->
    <!--            {{ user.handle }}-->

    <!--      &lt;!&ndash; ICON &ndash;&gt;-->
    <!--      <div class="ml-auto hidden xl:block">-->
    <!--        <div class="h-6 w-6">-->
    <!--          <ChevronDownIcon />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  ChatBubbleOvalLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  HomeIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline/esm/index.js'
import {
  HashtagIcon as HashtagIconSolid,
  BellIcon as BellIconSolid,
  InboxIcon as InboxIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  UserIcon as UserIconSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid,
  PencilIcon as PencilIconSolid,
  ChevronDownIcon as ChevronDownIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  HomeIcon as HomeIconSolid,
} from '@heroicons/vue/24/solid/esm/index.js'
// import {AcademicCapIconSolid,HomeIconSolid} from '~~/types/other/HeroiconsSolidIndex'

const { defaultTransition } = useTailwindConfig()
import LogoTwitter from '~~/components/Tcomponents/Logo/Twitter.vue'
import UIButton from '~~/components/Tcomponents/UI/Button.vue'
import SidebarLeftTab from '~~/components/Tcomponents/Sidebar/Left/Tab.vue'
import useTailwindConfig from '~/composables/useTailwindConfig'
import { useRoute } from '#app'
import { useInfinityStore } from '~/stores/infinity/infinityStore'

const emits = defineEmits(['onTweet', 'onLogout'])

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
const path = useRoute().path

const clickHomeBtn = () => {
  if (path === '/infinity/home') {
    window.scrollTo(0, 0)
    const infinityStore = useInfinityStore()
    let testData = infinityStore.InfinityDataList[0]
    testData.id = new Date().getDate().toString()
    infinityStore.InfinityDataList.unshift(testData)
    // infinityStore.loadInfinityData()
    // infinityStore.getPageParams.page = 1
    //todo load last tw from db
  } else {
  }
}
</script>
