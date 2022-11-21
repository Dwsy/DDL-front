<template>
  <div>
    12312
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-list>
          <v-list-subheader>消息中心</v-list-subheader>
          <v-list-item
              v-for="(item, i) in settingList"
              :key="i"
              :value="item"
              :to="item.link"
              active-color="primary"
              rounded="xl"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <nuxt-page></nuxt-page>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from '~/stores/user'
import {definePageMeta, useRoute} from '#imports'
import {onMounted, ref} from 'vue'

definePageMeta({
  keepalive: true,
  key: (route) => route.fullPath,
})

interface setting {
  title: string;
  icon: string;
  link: string;
}

const userStore = useUserStore()
let userInfo = ref(userStore.userInfo)
let user = ref()
const route = useRoute()
const uid = route.params.id
onMounted(async () => {
  setTimeout(async () => {
    await userStore.getUserInfo()
    user.value = userStore.user
    userInfo.value = userStore.userInfo
  }, 200)
  console.log(userInfo.value)
})
const settingList: setting[] = [
  {
    title: '个人信息',
    icon: 'mdi-card-account-details-outline',
    link: '/user/settings/info',
  },
  {
    title: '帐号设置',
    icon: 'mdi-account-cog-outline',
    link: '/user/settings/account',
  },
  {
    title: '个人资料',
    icon: 'mdi-account-outline',
    link: '',
  },
  {
    title: '个人资料',
    icon: 'mdi-account-outline',
    link: '',
  },
]
</script>

<style scoped></style>
