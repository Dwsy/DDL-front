<template>
  <v-container>
    <div>
      userInfo: {{ userInfo }}
      <v-divider></v-divider>
      {{ user }}
    </div>
    <v-row>
      <v-col offset="1" cols="8">
        <v-card>
          <v-row>
            <v-col cols="1">
              <v-avatar size="100" class="mr-16">
                <v-img :src="userInfo?.avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="6">
              <div class="ml-6">
                <span class="text-h5">{{ user?.nickname }}</span>
                <p>Lv：{{ userInfo?.level }}</p>
                <span>签名：{{ userInfo?.sign }}</span>
              </div>
            </v-col>
            <v-col>
              <div class="mx-6 mt-6  text-end">
                <v-btn to="/user/settings">
                  <div>编辑个人资料</div>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-row>
          <v-row>
            <v-col offset="1" cols="8" class="pa-8">
              <span class="text-h6">关注了：1|</span>
              <span class="text-h6">关注者：2</span>
            </v-col>
            <v-divider></v-divider>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">
import {useRoute} from '#imports'
import {useUserStore} from '~/stores/user'
import {onMounted, ref} from 'vue'

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
</script>

<style scoped>

</style>