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
import {useUser} from '~~/stores/user';
let user = useUser()
onMounted(()=>{
  let localToken = window.localStorage.getItem("token")
  if (localToken !== null && localToken !== '') {
    user.setToken(localToken)
    user.setUser(window.localStorage.getItem("user"))
    user.setIsLogn(true)
    // 后端接口判断
  }
})
if (typeof window === 'undefined') {
  console.log("NODE");
} else {

}
</script>

<style>
a{
  text-decoration: none;
  color: inherit;
}
</style>