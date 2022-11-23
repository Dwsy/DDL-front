<template>
  <div>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="6">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="username" label="username" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="password"
                  label="password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="secondary" @click="login">login</v-btn>
            <v-btn v-if="User.token" color="red" @click="logout">logout</v-btn>
          </v-container>
        </v-form>
        <v-col cols="3"></v-col>
      </v-col>
    </v-row>
    <div>
      <v-btn @click="check()">签到</v-btn>
      <div class="my-5">payload::{{ payload }}</div>
      <div>
        {{ User.token }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/stores/user'
// import tool from "~~/utils/tool"
import CryptoJS from 'crypto-js'
import { rsaEncrypt } from '~/composables/useTools'
import { onMounted, ref } from 'vue'
import { successMsg, useGet, usePost, useRouter } from '#imports'
import { ResponseData } from '~/types/utils/axios'

// definePageMeta({ keepalive: {}, })
const valid = ref(null)
const username = ref('Dwsy')
const password = ref()
const payload = ref(null)
const publicKey = ref()
const t = ref<string>()
const User = useUserStore()
onMounted(() => {})
const check = async () => {
  let { data } = await User.CheckIn()
  console.log(data)
}
const login = async () => {
  publicKey.value = (await useGet<ResponseData<any>>('au/authority/rsa-pks')).data['data']
  // console.log('publicKey', publicKey.value)
  // console.log('rsa decode', rsaEncrypt(publicKey.value, password.value))
  let uap = {
    username: username.value,
    password: rsaEncrypt(publicKey.value, password.value),
  }
  const r = await usePost<ResponseData<any>>('au/authority/token', uap)
  t.value = r.data['token']
  let token = t.value
  payload.value = CryptoJS.enc.Base64.parse(token.split('.')[1]).toString(CryptoJS.enc.Utf8)
  // console.log(token.split('.')[1])
  // console.log(payload)
  User.setToken(token)
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.parse(payload.value)['ddl-user'])
  User.setUser(JSON.parse(JSON.parse(payload.value)['ddl-user']))
  console.log('login', User.user)
  // console.log("payload.value['ddl-user']\n",JSON.parse(payload.value))
  User.setIsLogin(true)
  await User.getUserInfo()
  // Router.push('/')
}

const logout = () => {
  usePost<ResponseData<boolean>>('au/authority/logout').then((r) => {
    const data = r.data
    if (data.code === 0) {
      if (data.data) {
        User.$reset()
        localStorage.clear()
        successMsg('退出成功')
      } else {
        successMsg(data.msg)
      }
    }
  })
}
</script>
