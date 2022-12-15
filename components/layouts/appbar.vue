<template>
  <div>
    <!--    <v-progress-linear-->
    <!--        :indeterminate="layout.loading"-->
    <!--        :active="layout.loading"-->
    <!--        absolute-->
    <!--        bottom-->
    <!--        color="deep-purple"-->
    <!--        class="d-progress-linear"-->
    <!--    ></v-progress-linear>-->
    <v-app-bar
      density="compact"
      elevation="1"
      :style="{ backgroundColor: appBarColor }"
      class="flex"
    >
      <v-app-bar-nav-icon @click.stop="layout.switchDrawer()"></v-app-bar-nav-icon>

      <!--      <v-row>-->
      <!--        <v-col sm="1" md="5" cols="5" offset="3">-->
      <Search class="d-search" />
      <!--        </v-col>-->
      <template v-slot:append>
        <client-only>
          <!--          <v-col class="pt-4" offset="2">-->
          <v-btn
            v-if="isArticlePage"
            href="/article/creator"
            icon
            target="_blank"
            variant="text"
            size="small"
          >
            <v-icon>mdi-fountain-pen-tip</v-icon>
          </v-btn>
          <v-btn icon target="_blank" href="/question/manage" v-else variant="text" size="small">
            <v-icon>mdi-head-question-outline</v-icon>
          </v-btn>

          <nuxt-link to="/messages">
            <v-badge
              :content="layout?.unReadNotifyCount"
              :model-value="layout?.unReadNotifyCount > 0"
              color="red"
              offset-y="12"
            >
              <v-btn icon variant="text" size="small">
                <v-icon>mdi-message-text-outline</v-icon>
              </v-btn>
            </v-badge>
          </nuxt-link>

          <v-btn
            transition="fade-transition"
            @click="layout.switchTheme(theme)"
            icon
            size="small"
            class="mr-1"
          >
            <v-icon v-if="theme.global.current.value.dark">mdi-white-balance-sunny</v-icon>
            <v-icon v-if="!theme.global.current.value.dark">mdi-weather-night</v-icon>
          </v-btn>

          <v-menu v-if="userStore.userInfo">
            <template v-slot:activator="{ props }">
              <v-avatar v-bind="props" class="mr-2">
                <v-img :src="userStore.userInfo?.avatar"></v-img>
              </v-avatar>
            </template>

            <v-card width="300px" style="overflow: hidden" elevation="1">
              <v-row class="pa-2">
                <v-col cols="3">
                  <v-avatar size="x-large" class="mr-2">
                    <v-img :src="userStore.userInfo?.avatar"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="6">
                  <span class="text-lg">
                    {{ userStore.user.nickname }}
                  </span>
                  <div class="text-sm text-neutral-600">@{{ userStore.user.username }}</div>
                </v-col>
              </v-row>
              <v-divider> </v-divider>
              <v-list>
                <v-list-item @click="layout.switchDrawer()" prepend-icon="mdi-account-outline">
                  <nuxt-link v-if="userStore.userInfo" :to="`/user/${userStore.user?.id}`">
                    <v-list-item-title>个人中心</v-list-item-title>
                  </nuxt-link>
                </v-list-item>
                <v-list-item @click="layout.switchDrawer()" prepend-icon="mdi-account-cog-outline">
                  <nuxt-link v-if="userStore.userInfo" to="/user/settings">
                    <v-list-item-title>设置</v-list-item-title>
                  </nuxt-link>
                </v-list-item>
                <v-list-item @click="layout.switchDrawer()" prepend-icon="mdi-logout">
                  <nuxt-link to="/auth/logout">
                    <v-list-item-title>退出</v-list-item-title>
                  </nuxt-link>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <!--          <nuxt-link v-if="userStore.userInfo" :to="`/user/${userStore.user?.id}`">-->
          <!--            <v-avatar size="small">-->
          <!--              <v-img :src="userStore.userInfo?.avatar"></v-img>-->
          <!--            </v-avatar>-->
          <!--          </nuxt-link>-->
          <nuxt-link to="/user/login" v-else class="mr-2 mt-1">
            <v-btn icon size="small">
              <v-icon> mdi-account</v-icon>
            </v-btn>
          </nuxt-link>
          <!--        <a href="#comments">-->
          <!--          #comments-->
          <!--        </a>-->
          <!--          </v-col>-->
        </client-only>
      </template>
      <!--      </v-row>-->
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { useLayout } from '~~/stores/layout'
import { useTheme } from 'vuetify'
import Search from './search.vue'
import { useUserStore } from '~/stores/user'
import { computed, onMounted, provide, ref, watchEffect } from 'vue'
import { CountType, useAxiosGetUnreadMessageCount } from '~/composables/Api/messages'
import { warningMsg } from '~/composables/utils/toastification'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from '#app'
import { PencilSquareIcon } from '@heroicons/vue/24/outline/esm/index.js'

let theme = useTheme()
let layout = useLayout()
let userStore = useUserStore()
const route = useRoute()
const isArticlePage = ref(true)
// if (route.path === '/question/howtoask') {
//   layout.drawer = false
// }

onMounted(async () => {
  clog('onMounted')
  watchEffect(() => {
    // clog('route.path', route.path)
    isArticlePage.value = route.path.startsWith('/article')
  })
  await layout.getUnreadCount()
})
const appBarColor = computed(() => {
  return theme.global.name.value === 'dark' ? '#000000ab' : '#ffffffaa'
  // return theme.global.name.value === 'dark' ? '#2228' : '#ffffffaa'
})
</script>

<style scoped>
.d-progress-linear {
  position: absolute;
  z-index: 9999;
}
</style>

<style scoped>
/*.v-app-bar.v-toolbar {*/
/*  background-color: v-bind('theme.global.name.value === "dark" ? "#000000ab" : "#ffffffaa"') !important;*/
/*  !*color: #000;*!*/
/*}*/
/*.d-search {*/
/*  margin-left: 30%;*/
/*  width: 30%;*/
/*}*/
@media (min-width: 960px) {
  .d-search {
    margin-left: 10% !important;
    width: 60% !important;
  }
}

@media (min-width: 1280px) {
  .d-search {
    margin-left: 20% !important;
    width: 30% !important;
  }
}

@media (min-width: 1920px) {
  .d-search {
    margin-left: 30% !important;
    width: 30% !important;
  }
}

@media (min-width: 2560px) {
  .d-search {
    margin-left: 30% !important;
    width: 30% !important;
  }
}
</style>
