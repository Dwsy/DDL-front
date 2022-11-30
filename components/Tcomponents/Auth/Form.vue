<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="h-10 w-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="space-y-6 pt-5">
      <UIInput v-model="data.username" label="Username" placeholder="@username" />

      <UIInput v-model="data.password" label="Password" placeholder="********" type="password" />

      <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled"> Login </UIButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import LogoTwitter from '~/components/Tcomponents/Logo/Twitter.vue'
import UIInput from '~/components/Tcomponents/UI/Input.vue'
import UIButton from '~/components/Tcomponents/UI/Button.vue'
import { reactive } from '@vue/runtime-core'
import { computed } from 'vue'

const data = reactive({
  username: '',
  password: '',
  loading: false,
})

async function handleLogin() {
  // const { login } = useAuth()
  //
  // data.loading = true
  // try {
  //     await login({
  //         username: data.username,
  //         password: data.password
  //     })
  // } catch (error) {
  //     clog(error)
  // } finally {
  //     data.loading = false
  // }
}

const isButtonDisabled = computed(() => {
  return !data.username || !data.password || data.loading
})
</script>
