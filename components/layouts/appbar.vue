<template>
  <div>


    <v-progress-linear
        :indeterminate="layout.loading"
        :active="layout.loading"
        absolute
        bottom
        color="deep-purple"
        class="d-progress-linear"
    ></v-progress-linear>
    <v-app-bar density="compact" elevation="1">

      <v-app-bar-nav-icon @click.stop="layout.switchDrawer()"></v-app-bar-nav-icon>

      <v-row>
        <v-col sm="1" md="4" cols="4" offset="3">

          <Search/>

        </v-col>


        <v-col class="pt-4" offset="3">

          <v-btn icon target="_blank" href="/article/creator">
            <v-icon>mdi-fountain-pen-tip</v-icon>
          </v-btn>

          <nuxt-link to="/messages">
            <v-badge :model-value="layout.unReadNotifyCount>0" offset-y="10" offset-x="5"
                     :content="layout.unReadNotifyCount" color="red">
              <v-btn>
                <v-icon>mdi-message-text-outline</v-icon>
              </v-btn>
            </v-badge>
          </nuxt-link>

          <v-btn @click="layout.switchTheme(theme)" text transition="fade-transition">
            <v-icon v-if="theme.global.current.value.dark">mdi-white-balance-sunny</v-icon>
            <v-icon v-if="!theme.global.current.value.dark">mdi-weather-night</v-icon>
          </v-btn>

          <router-link v-if="userStore.userInfo" :to="`/user/${userStore.user.id}`">
            <v-avatar size="small">
              <v-img :src="userStore.userInfo?.avatar"></v-img>
            </v-avatar>
          </router-link>
          <nuxt-link to="/user/login">
            <v-btn icon>
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>
          </nuxt-link>
          <!--        <a href="#comments">-->
          <!--          #comments-->
          <!--        </a>-->
        </v-col>


      </v-row>
    </v-app-bar>
  </div>


</template>

<script setup lang="ts">
import {useLayout} from '~~/stores/layout'
import {useTheme} from 'vuetify'
import Search from './search.vue'
import {useUserStore} from '~/stores/user'
import {onMounted, provide, ref} from 'vue'
import {CountType, useAxiosGetUnreadMessageCount} from '~/composables/Api/messages'
import {warningMsg} from '~/composables/utils/toastification'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'

let theme = useTheme()
let layout = useLayout()
let userStore = useUserStore()


onMounted(async () => {
  if (document.documentElement.clientWidth > 1280)
    layout.drawer = true
  await layout.getUnreadCount()
})


</script>

<style scoped>
.d-progress-linear {
  position: absolute;
  z-index: 9999
}
</style>