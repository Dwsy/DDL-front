<template>
  <div class="flex h-screen flex-col">
    <div
      :class="defaultTransition"
      class="my-2 w-full rounded-full p-2 hover:bg-blue-50 dark:hover:bg-white/20"
    >
      <nuxt-link to="/">
        <div class="h-8 w-8">
          <LogoTwitter />
        </div>
      </nuxt-link>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <ChatBubbleOvalLeftIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg" @on-click="emits('onTweet')">
          <span class="font-bold"> Tweet </span>
        </UIButton>
      </div>

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
} from '@heroicons/vue/24/solid/index'
import { HomeIcon } from '@heroicons/vue/24/solid/index'

const { defaultTransition } = useTailwindConfig()
import LogoTwitter from '~~/components/Tcomponents/Logo/Twitter.vue'
import UIButton from '~~/components/Tcomponents/UI/Button.vue'
import SidebarLeftTab from '~~/components/Tcomponents/Sidebar/Left/Tab.vue'
import useTailwindConfig from '~/composables/useTailwindConfig'

const emits = defineEmits(['onTweet', 'onLogout'])

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>
