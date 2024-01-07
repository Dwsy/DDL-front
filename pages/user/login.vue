<template>
  <div>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="6">
        <v-form v-model="valid">
          <v-container>
            <h1 class="text-h5 text-neutral-500 mb-2">
              {{ isRegister ? '注册' : '登陆' }}
            </h1>
            <div v-if="isRegister">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field v-model="username" label="用户名" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="password"
                    label="密码"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="mb-2">
                注册登录即表示同意<span class="text-blue-600">用户协议 、 隐私政策</span>
              </div>
            </div>
            <div v-else>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field v-model="username" label="用户名或邮箱" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="password"
                    label="密码"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <v-btn class="mx-1" @click="login" :color="getBtnColor(true)" variant="tonal"
              >登陆</v-btn
            >
            <v-btn class="mx-1" @click="register" :color="getBtnColor(false)" variant="tonal"
              >注册</v-btn
            >
            <v-btn target="_blank" class="mx-1" @click="github()">
              <v-icon> mdi-github</v-icon>
            </v-btn>
            <v-btn v-if="User.token" color="red" @click="logout">logout</v-btn>
          </v-container>
        </v-form>
        <v-col cols="3"></v-col>
      </v-col>
    </v-row>
    <div>
      <v-btn @click="check()">签到</v-btn>
      <v-btn target="_blank" @click="github()">
        <v-icon> mdi-github</v-icon>
        <span> Github Login </span>
      </v-btn>
      <div class="my-5">payload::{{ payload }}</div>
      <div>
        {{ User.token }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { useUserStore } from '~~/stores/user'
// import tool from "~~/utils/tool"
import CryptoJS from 'crypto-js'
import { rsaEncrypt } from '~/composables/useTools'
import { onMounted, ref } from 'vue'
import { successMsg, useGet, usePost, useRouter } from '#imports'
import { ResponseData } from '~/types/utils/axios'
import { useRoute, useRuntimeConfig } from '#app'
import md5 from '~/utils/md5'
const route = useRoute()
// definePageMeta({ keepalive: {}, })
const isRegister = ref(true)
const valid = ref(null)
const username = ref('Dwsy')
const password = ref()
const payload = ref(null)
const publicKey = ref()
const t = ref<string>()
const User = useUserStore()
onMounted(async () => {
  if (route.query?.token != null) {
    await setToken(String(route.query.token))
    await useRouter().push({
      query: {},
    })
  }
})
const check = async () => {
  let { data } = await User.CheckIn()
  clog(data)
}

async function setToken(token: string) {
  payload.value = CryptoJS.enc.Base64.parse(token.split('.')[1]).toString(CryptoJS.enc.Utf8)
  // clog(token.split('.')[1])
  // clog(payload)
  User.setToken(token)
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.parse(payload.value)['ddl-user'])
  User.setUser(JSON.parse(JSON.parse(payload.value)['ddl-user']))
  clog('login', User.user)
  // clog("payload.value['ddl-user']\n",JSON.parse(payload.value))
  User.setIsLogin(true)
  await User.getUserInfo()
}

const getBtnColor = (login: boolean) => {
  if (login) {
    return !isRegister.value ? '#364fc7' : null
  } else {
    return isRegister.value ? '#364fc7' : null
  }
}
const login = async () => {
  if (isRegister.value) {
    isRegister.value = false
    return
  }
  let uap = {
    username: username.value,
    // password: rsaEncrypt(publicKey.value, password.value),
    password: md5(password.value),
  }
  const r = await usePost<ResponseData<any>>('auth/login', uap)
  const authorization = r.headers.authorization
  if (authorization != null) {
    await setToken(authorization)
    successMsg('登录成功')
    navigateTo('/')
  } else {
    errorMsg('登录失败')
  }
}
const register = async () => {
  if (!isRegister.value) {
    isRegister.value = true
    return
  }
  let uap = {
    username: username.value,
    password: md5(password.value),
  }
  const r = await usePost<ResponseData<any>>('auth/register', uap)
  const authorization = r.headers.authorization
  console.log(authorization)
  if (authorization != null) {
    await setToken(authorization)
    successMsg('注册成功')
    navigateTo('/')
  } else {
    errorMsg('注册失败')
  }
}

const logout = () => {
  usePost<ResponseData<boolean>>('auth/logout').then((r) => {
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

const github = () => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL
  const state = Math.floor(Math.random() * 10000)
  // window.location.href = `https://github.com/login/oauth/authorize?client_id=9b86caa6024f777670f4&redirect_uri=${baseURL}http://localhost:9001/api/auth/github&scope=user:email&state=${state}`
  window.location.href = `https://github.com/login/oauth/authorize?client_id=9b86caa6024f777670f4&redirect_uri=${baseURL}auth/github&scope=user:email&state=${state}`
  successMsg('登录成功')
  navigateTo('/')
}
</script>
