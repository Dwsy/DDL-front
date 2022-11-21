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
    <v-app-bar density="compact" elevation="1">
      <v-app-bar-nav-icon
          @click.stop="layout.switchDrawer()"
      ></v-app-bar-nav-icon>

      <v-row>
        <v-col sm="1" md="5" cols="5" offset="3">
          <Search/>
        </v-col>

        <client-only>
          <v-col class="pt-4" offset="2">
            <v-btn
                icon
                target="_blank"
                href="/article/creator"
                v-if="isArticlePage"
            >
              <v-icon>mdi-fountain-pen-tip</v-icon>
            </v-btn>

            <v-btn icon target="_blank" href="/question/manage" v-else>
              <v-icon>mdi-head-question-outline</v-icon>
            </v-btn>

            <nuxt-link to="/messages">
              <v-badge
                  :model-value="layout?.unReadNotifyCount > 0"
                  offset-y="10"
                  offset-x="5"
                  :content="layout?.unReadNotifyCount"
                  color="red"
              >
                <v-btn>
                  <v-icon>mdi-message-text-outline</v-icon>
                </v-btn>
              </v-badge>
            </nuxt-link>

            <v-btn
                @click="layout.switchTheme(theme)"
                text
                transition="fade-transition"
            >
              <v-icon v-if="theme.global.current.value.dark"
              >mdi-white-balance-sunny
              </v-icon
              >
              <v-icon v-if="!theme.global.current.value.dark"
              >mdi-weather-night
              </v-icon
              >
            </v-btn>

            <router-link
                v-if="userStore.userInfo"
                :to="`/user/${userStore.user?.id}`"
            >
              <v-avatar size="small">
                <v-img :src="userStore.userInfo?.avatar"></v-img>
              </v-avatar>
            </router-link>
            <nuxt-link to="/user/login">
              <v-btn icon>
                <v-icon> mdi-account</v-icon>
              </v-btn>
            </nuxt-link>
            <!--        <a href="#comments">-->
            <!--          #comments-->
            <!--        </a>-->
          </v-col>
        </client-only>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import {useLayout} from '~~/stores/layout'
import {useTheme} from 'vuetify'
import Search from './search.vue'
import {useUserStore} from '~/stores/user'
import {onMounted, provide, ref, watchEffect} from 'vue'
import {
  CountType,
  useAxiosGetUnreadMessageCount,
} from '~/composables/Api/messages'
import {warningMsg} from '~/composables/utils/toastification'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {useRoute} from '#app'

let theme = useTheme()
let layout = useLayout()
let userStore = useUserStore()
const route = useRoute()
const isArticlePage = ref(true)
// if (route.path === '/question/howtoask') {
//   layout.drawer = false
// }

onMounted(async () => {
  console.log('onMounted')
  watchEffect(() => {
    // console.log('route.path', route.path)
    isArticlePage.value = route.path.startsWith('/article')
  })
  await layout.getUnreadCount()
})
</script>

<style scoped>
.d-progress-linear {
  position: absolute;
  z-index: 9999;
}
</style>

<style>
.v-app-bar.v-toolbar {
  background-color: v-bind(
      'theme.global.name.value === "dark" ? "#000000ab" : "#ffffffaa"'
  );
  /*color: #000;*/
}
</style>
