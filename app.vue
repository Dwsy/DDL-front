<template>

  <NuxtLayout v-show="show">
    <!--  <NuxtLayout >-->
    <template #appbar>
      <LayoutsAppbar class="d-header"/>
    </template>
    <template #drawer>
      <LayoutsDrawer/>
    </template>
    <template #footer v-if="layout.showFooter">
      <LayoutsFooter/>
    </template>
    <!--    <v-footer v-show="layout.showFooter">-->
    <!--    </v-footer>-->
    <NuxtLoadingIndicator color="#9d5b8b"/>
    <NuxtPage/>


  </NuxtLayout>


</template>

<script setup lang="ts">
import {definePageMeta, useCookie} from '#imports'
import '~~/assets/css/main.css'
import {useUserStore} from '~~/stores/user'
import {onMounted, ref, watch, watchEffect} from 'vue'
import {useLayout} from '~/stores/layout'
import {useTheme} from 'vuetify'

// import { initDomToCode } from 'dom-to-code'
//
// // 初始化 dom-to-code
// // initDomToCode()
//
// // 推荐：只在非生产环境初始化


definePageMeta({
  key: route => route.fullPath,
  pageTransition: {
    name: 'slide-x-reverse-transition',
    mode: 'out-in',
  }
})
let user = useUserStore()
let theme = useTheme()
const cookieThemeState = useCookie('theme')
const layout = useLayout()
let tocLinkColor = ref()
let show = ref(false)
if (cookieThemeState.value !== undefined) {
  if (cookieThemeState.value === 'dark') {
    layout.switchDarkTheme(theme)
  } else {
    layout.switchLightTheme(theme)
  }
}
// onMounted(()=>{
//   layout.switchDarkTheme(theme)
// })
onMounted(async () => {
  // process.env.NODE_ENV !== 'production' && initDomToCode()
  if (cookieThemeState.value === undefined) {
    document.cookie = `theme=${theme.global.name.value};path=/`
  }
  show.value = true
  let localToken = window.localStorage.getItem('token')
  if (localToken !== null && localToken !== '') {
    user.setToken(localToken)
    user.setUser(JSON.parse(window.localStorage.getItem('user')))
    // console.log('user::', user.user)
    await user.getUserInfo()
    // console.log('info::', user.userInfo)
    user.setIsLogin(true)

    // 后端接口判断
  }
  watchEffect(async () => {
    if (theme.global.name.value === 'dark') {
      // console.log('Dark')
      tocLinkColor.value = '#2e2e2e'

    } else {
      // console.log('light')
      tocLinkColor.value = '#eee'
    }
  })


})
if (typeof window === 'undefined') {
  console.log('NODE')
} else {

}
</script>


<style scoped>
:deep(.v-app-bar.v-toolbar) {
  /*background-color: rgb(12, 12, 13);*/
  background-color: v-bind('theme.global.name.value === "dark" ? "#0C0C0DCC" : "#ffffffaa"');
  /*color: #000;*/
}

:deep(.v-navigation-drawer) {
  /*background-color: v-bind('theme.global.name.value === "dark" ? "#0C0C0DCE" : "--v-theme-surface"');*/
  background-color: v-bind('theme.global.name.value === "dark" ? "#0C0C0DCF" : "#FFFFFF"') !important;
  backdrop-filter: saturate(150%) blur(10px) !important;
}

</style>

<style>
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
