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
import {onMounted, ref, watch, watchEffect} from 'vue'
import {useLayout} from '~/stores/layout'
import {useTheme} from 'vuetify'


let user = useUser()
let theme = useTheme()
let tocLinkColor = ref()
onMounted(async () => {
  let localToken = window.localStorage.getItem('token')
  if (localToken !== null && localToken !== '') {
    user.setToken(localToken)
    user.setUser(JSON.parse(window.localStorage.getItem('user')))
    user.setIsLogin(true)
    await user.getUserInfo()
    // 后端接口判断
  }
  watchEffect(async () => {
    if (theme.global.name.value === 'dark') {
      console.log('Dark')
      tocLinkColor.value = theme.global.current.value.colors.background

    } else {
      console.log('light')
      tocLinkColor.value = '#eee'
    }
  })


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

.Vue-Toastification__container.top-right {
  margin-top: 40px;
}

.is-active-link::before {
  background-color: #38b48b !important;
}

.toc-link::before {
  background-color: v-bind(tocLinkColor);
  /*content:' ';*/
  /*display:inline-block;*/
  /*height:inherit;*/
  /*left:0;*/
  /*margin-top:-1px;*/
  /*position:absolute;*/
  width: 4px
}
</style>
<style lang="sass">

</style>