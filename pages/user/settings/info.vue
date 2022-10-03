<template>
  <div v-if="userInfo||user">
    {{ userInfo }}
    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
        <v-text-field label="用户昵称" v-model="user.nickname"></v-text-field>
        <div>

        </div>

        <v-text-field label="头像URL" v-model="userInfo.avatar">
          <template v-slot:prepend>
            <v-avatar slot="prepend"
            >
              <v-img :src="userInfo.avatar"></v-img>
            </v-avatar>
          </template>
          <template v-slot:append>

            <v-file-input
                slot="append"
                label="File input"
                filled
                hide-input
                prepend-icon="mdi-camera"
            ></v-file-input>
          </template>


        </v-text-field>
        <v-file-input
            slot="append"
            label="File input"
            filled
            hide-input
            prepend-icon="mdi-camera"
        ></v-file-input>
        <v-radio-group
            inline
            v-model="userInfo.gender"
        >
          <span class="mt-2">
            性别：
          </span>
          <v-radio
              label="男"
              value="MALE"
          ></v-radio>
          <v-radio
              label="女"
              value="FEMALE"
          ></v-radio>
        </v-radio-group>
        <v-text-field label="个人主页" v-model="user.nickname"></v-text-field>
        <v-text-field label="个人介绍" v-model="user.nickname"></v-text-field>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta, useRoute} from '#imports'
import {user, UserInfo, useUserStore} from '~/stores/user'
import {onMounted, ref} from 'vue'

definePageMeta({
  keepalive: true,
})
const userStore = useUserStore()
let userInfo = ref<UserInfo>()
let user = ref()
const route = useRoute()
const uid = route.params.id
onMounted(async () => {
  setTimeout(async () => {
    await userStore.getUserInfo()
    user.value = userStore.user
    userInfo.value = userStore.userInfo
  }, 200)
})
</script>

<style scoped>

</style>