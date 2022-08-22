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
    <NuxtPage :key="$route.fullPath"></NuxtPage>
  </NuxtLayout>

</template>
<script setup lang="ts">
import {useUser} from '~~/stores/User';
let user = useUser()
if (typeof window !== 'undefined') {
  let localToken = window.localStorage.getItem("token")
  if (localToken !== null && localToken !== '') {
    user.setToken(localToken)
    user.setUser(window.localStorage.getItem("user"))
    user.setIsLogn(true)
    // 后端接口判断
  }
  console.log("browser");

} else {
  console.log("NODE");
}
</script>