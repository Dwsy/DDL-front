<template>
  <div>
    <!--    <LoadingPage v-if="isAuthLoading" />-->

    <!--      App-->
    <div class="min-h-full">
      <div class="mx-auto grid grid-cols-12 sm:px-6 lg:max-w-1xl lg:gap-5 lg:px-8">
        <!-- Left sidebar -->
        <div class="xs-col-span-1 hidden md:block xl:col-span-2">
          <div class="position-sticky top-20">
            <SidebarLeft
              :user="user"
              @on-tweet="handleOpenTweetModal"
              @on-logout="handleUserLogout"
            />
          </div>
        </div>

        <!--         Main content -->
        <main class="col-span-12 md:col-span-8 xl:col-span-6">
          <!--            <router-view/>-->
          <NuxtPage />
        </main>

        <!-- Right Sidebar -->
        <div class="col-span-12 hidden md:col-span-3 md:block xl:col-span-4">
          <div class="sticky top-10">
            <SidebarRight />
          </div>
        </div>
      </div>
    </div>

    <!--    <AuthPage v-else />-->

    <!--      <UIModal :isOpen="true" @on-close="handleModalClose">-->
    <!--        <TweetForm-->
    <!--          :replyTo="replyTweet"-->
    <!--          showReply-->
    <!--          :user="user"-->
    <!--          @onSuccess="handleFormSuccess"-->
    <!--        />-->
    <!--      </UIModal>-->
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
// import { computed, onBeforeMount, onMounted, ref, watchEffect } from 'vue'
// import LoadingPage from '~/components/Tcomponents/LoadingPage.vue'
import SidebarLeft from '~/components/Tcomponents/Sidebar/Left/index.vue'
import SidebarRight from '~/components/Tcomponents/Sidebar/Right/Index.vue'
// import AuthPage from '~/components/Tcomponents/Auth/Page.vue'
// import UIModal from '~/components/Tcomponents/UI/Modal.vue'
// import TweetForm from '~/components/Tcomponents/Tweet/Form/index.vue'
import { navigateTo, useRoute } from '#app'
import { GetInfinityPageListParams, useAxiosGetInfinityPageList } from '~/composables/Api/infinity'
import { useLayout } from '~/stores/layout'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { definePageMeta } from '#imports'
import { watchEffect } from 'vue'

// definePageMeta({
//   keepalive: true,
// })
const infinityStore = useInfinityStore()
watchEffect(() => {
  // clog('infinityStore.isHome', infinityStore.isHome)
  infinityStore.isHome = !useRoute().path.startsWith('/infinity/status')
  // clog('infinityStore.isHome', infinityStore.isHome)
  //todo
})
useLayout().showFooter = false
const postTweetModal = ref()
const replyTweet = ref({
  replyTo: {
    id: 2,
    name: 'dwsy',
    username: 'ddy',
    profileImage: 'https://picsum.photos/300/300',
  },
})

// const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const isAuthLoading = ref(true)
const getPageListParams = ref<GetInfinityPageListParams>()
onMounted(async () => {
  setTimeout(() => {
    isAuthLoading.value = false
  }, 1000)
})
// const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets()
// const user = useAuthUser()
const homeTweets = [
  {
    mediaFiles: [
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
    ],
    text: 'test',
    postedAtHuman: 'postedAtHuman',
    author: {
      name: 'name',
      handle: 'handle',
      profileImage: 'https://picsum.photos/300/300',
    },
  },
]
const user = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  profileImage: 'https://picsum.photos/300/300',
  replyTo: {
    id: 2,
    name: 'dwsy',
    username: 'ddy',
    profileImage: 'https://picsum.photos/300/300',
  },
  repliesCount: 21,
}
// const postTweetModal = usePostTweetModal()
// const emitter = useEmitter()
// const replyTweet = useReplyTweet()

// emitter.$on('replyTweet', (tweet) => {
//   openPostTweetModal(tweet)
// })
//
// emitter.$on('toggleDarkMode', () => {
//   darkMode.value = !darkMode.value
// })

onBeforeMount(() => {
  // initAuth()
})

function handleFormSuccess(tweet) {
  // closePostTweetModal()

  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

function handleModalClose() {
  // closePostTweetModal()
}

function handleOpenTweetModal() {
  // openPostTweetModal(null)
}

function handleUserLogout() {
  // logout()
}
</script>
