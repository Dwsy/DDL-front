<template>

  <NuxtLayout>
    <template #appbar>
      <LayoutsAppbar/>
    </template>
    <template #drawer>
      <LayoutsDrawer/>
    </template>
    <template #footer>
      <LayoutsFooter/>
    </template>
    <NuxtPage :key="$route.fullPath"/>
  </NuxtLayout>


</template>
<script setup lang="ts">
import {useUser} from '~~/stores/user'
import {onMounted} from 'vue'

let user = useUser()
onMounted(async () => {
  let localToken = window.localStorage.getItem('token')
  if (localToken !== null && localToken !== '') {
    user.setToken(localToken)
    user.setUser(JSON.parse(window.localStorage.getItem('user')))
    user.setIsLogin(true)
    await user.getUserAvatar()
    // 后端接口判断
  }
})
if (typeof window === 'undefined') {
  console.log('NODE')
} else {

}
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>
<style lang="sass">

</style>