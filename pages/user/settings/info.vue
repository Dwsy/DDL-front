<template>
  <div v-if="userInfo||user">
    <!--    {{ userInfo }}-->
    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
        <v-text-field label="用户昵称" v-model="user.nickname"></v-text-field>
        <div>

        </div>
        <v-text-field label="头像URL" v-model="userInfo.avatarNew">
          <template v-slot:prepend>
            <v-avatar slot="prepend"
            >
              <v-img :src="userInfo.avatar"></v-img>
            </v-avatar>
          </template>
          <!--          <template v-slot:append>-->

          <!--            <v-file-input-->
          <!--                slot="append"-->
          <!--                label="File input"-->
          <!--                filled-->
          <!--                hide-input-->
          <!--                prepend-icon="mdi-camera"-->
          <!--            ></v-file-input>-->
          <!--          </template>-->


        </v-text-field>
        <v-row>
          <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              v-model="avatarFile"
              label="上传新头像"
          ></v-file-input>
          <v-btn @click="submitFile()" :disabled="disableUploadBtn" class="mt-2" elevation="1">上传</v-btn>
        </v-row>

        <!--        prepend-icon="mdi-camera"-->
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
        <v-text-field label="个人介绍" v-model="userInfo.sign"></v-text-field>
        <v-text-field label="生日" v-model="userInfo.birth"></v-text-field>
        <div class="text-end">
          <v-btn @click="save()">
            保存
          </v-btn>
        </div>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {
  defaultMsg,
  definePageMeta,
  useAxiosPostUploadAvatar,
  useAxiosPutUpdateUserInfo,
  useRoute,
  warningMsg
} from '#imports'
import {user, UserInfo, useUserStore} from '~/stores/user'
import {onMounted, ref, watch} from 'vue'

definePageMeta({
  keepalive: true,
})
const userStore = useUserStore()
let userInfo = ref<UserInfo>()
let user = ref()
const route = useRoute()
const uid = route.params.id
const disableUploadBtn = ref(true)
const rules = [
  value => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
  }
]
let avatarFile = ref()
onMounted(async () => {
  setTimeout(async () => {
    await userStore.getUserInfo()
    user.value = userStore.user
    userInfo.value = JSON.parse(JSON.stringify(userStore.userInfo))
    userInfo.value.avatarNew = userInfo.value.avatar
  }, 200)

  watch(avatarFile, () => {
    disableUploadBtn.value = avatarFile.value.length <= 0
  })

})
const submitFile = async () => {
  if (avatarFile.value === null) {
    defaultMsg('请选择文件')
  }
  const {data: response} = await useAxiosPostUploadAvatar(avatarFile.value[0])
  if (response.code === 0) {
    const reader = new FileReader()
    reader.readAsDataURL(avatarFile.value[0])
    reader.onload = () => {
      userInfo.value.avatarNew = 'https://' + response.data + '?imageMogr2/thumbnail/200x200'
      userInfo.value.avatar = reader.result
      userStore.userInfo.avatar = userInfo.value.avatarNew
    }
    defaultMsg('上传成功')

  } else {
    warningMsg('上传失败')
  }
}

const save = async () => {
// private String avatar;
//
// private String sign;
//
// private String nickname;
// //    private String email;
// //
// //    private String phone;
//
// private Date birth;
//
// private Gender gender;
  let body = {
    avatar: userInfo.value.avatarNew,
    sign: userInfo.value.sign,
    nickname: user.value.nickname,
    birth: userInfo.value.birth,
    gender: userInfo.value.gender
  }
  const {data: axiosResponse} = await useAxiosPutUpdateUserInfo(body)
  if (axiosResponse.code == 0) {
    defaultMsg('保存成功')
  } else {
    warningMsg('保存失败')
  }
  console.log(userInfo.value)
}
</script>

<style scoped>

</style>