<template>
  <div v-if="userSetting">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
        <div class="mb-4">
          <v-row>
            <v-text-field
                label="用户邮箱"
                :disabled="!modifyEmail"
                v-model="userSetting.email"
                class="mx-4"
            ></v-text-field>
            <v-text-field
                label="验证码"
                v-if="modifyEmail"
                v-model="modifyEmailCode"
            ></v-text-field>
          </v-row>
          <div class="text-end my-2">
            <v-btn
                @click="sendEmailCode()"
                v-if="modifyEmail"
                :disabled="disableSendModifyEmailCode"
            >
              发送验证码{{
                disableSendModifyEmailCode
                    ? `:(${disableSendModifyEmailCodeTimeFreeze})`
                    : ''
              }}
            </v-btn>
            <v-btn @click="saveEmail()">
              {{ modifyEmail ? '保存' : '修改' }}
            </v-btn>
          </div>
        </div>
        <v-text-field
            label="用户手机"
            :disabled="modifyPhone"
            v-model="userSetting.phone"
        ></v-text-field>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {
  defaultMsg,
  definePageMeta,
  useAxiosGetUserSetting,
  useAxiosPostModifyEmail,
  warningMsg,
} from '#imports'
import {useUserStore} from '~/stores/user'
import {onMounted, ref} from 'vue'

definePageMeta({
  keepalive: true,
})

interface IUserSetting {
  email: string;
  phone: string;
}

const userSetting = ref<IUserSetting>()
const modifyPwd = ref(false)

const modifyEmail = ref(false)
const modifyEmailCode = ref()
const disableSendModifyEmailCode = ref(false)
const disableSendModifyEmailCodeTimeFreeze = ref(0)

const modifyPhone = ref(false)
onMounted(async () => {
  const {data: response} = await useAxiosGetUserSetting()
  if (response.code === 0) {
    userSetting.value = response.data
  }
})
const savePwd = () => {
}
const sendEmailCode = async () => {
  console.log('sendEmailCode', modifyEmailCode.value)
  if (modifyEmailCode.value === undefined) {
    const {data: ret} = await useAxiosPostModifyEmail(
        true,
        userSetting.value.email
    )
    if (ret.code === 0) {
      defaultMsg('验证码已发送')
      disableSendModifyEmailCode.value = true
      disableSendModifyEmailCodeTimeFreeze.value = 60
      let interval = setInterval(() => {
        disableSendModifyEmailCodeTimeFreeze.value--
      }, 1000)
      let timeout = setTimeout(() => {
        disableSendModifyEmailCode.value = false
        clearInterval(interval)
      }, 1000 * 60)
    } else {
      warningMsg(ret.msg)
    }
    return
  }
}
const saveEmail = async () => {
  if (modifyEmail.value === false) {
    modifyEmail.value = true
  } else {
    //get code
    // modifyEmail.value = false

    const {data: ret} = await useAxiosPostModifyEmail(
        false,
        userSetting.value.email,
        modifyEmailCode.value
    )
    if (ret.code === 0) {
      if (ret.data === 2) {
        defaultMsg('修改成功')
        modifyEmail.value = false
      }
    }
    if (ret.code === 100004) {
      warningMsg('验证码错误')
    }
    if (ret.data === 100005) {
      warningMsg('邮箱未更改')
    }
  }
}
const savePhone = () => {
}
</script>

<style scoped></style>
