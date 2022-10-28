<template>

  <NuxtLayout v-show="show">
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
    <NuxtPage/>


  </NuxtLayout>


</template>

<script setup lang="ts">
import {definePageMeta, useCookie} from '#imports'

import {useUserStore} from '~~/stores/user'
import {onMounted, ref, watch, watchEffect} from 'vue'
import {useLayout} from '~/stores/layout'
import {useTheme} from 'vuetify'
import '~~/assets/css/main.css'

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
// onMounted(()=>{
//   layout.switchDarkTheme(theme)
// })
onMounted(async () => {
  if (cookieThemeState.value !== undefined) {
    console.log('cookieThemeState', cookieThemeState.value)
    if (cookieThemeState.value === 'dark') {
      layout.switchDarkTheme(theme)
    } else {
      layout.switchLightTheme(theme)
    }
  } else {
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
      tocLinkColor.value = theme.global.current.value.colors.background

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
.d-header header {
  backdrop-filter: saturate(100%) blur(20px) !important;

}

html {
  scroll-padding-top: 55px;
}

/*html {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/
/*html {*/
/*  scroll-behavior: inherit!important;*/
/*}*/
.d-gotoHome {
  color: #00a0d8;
}

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


::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-style: dashed;
  border-color: transparent;
  border-width: 2px;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: #8f8f8f !important;
}

::-webkit-scrollbar-thumb {
  background-color: #8f8f8f !important;
  /*background-color: rgba(157, 165, 183, 0.4);*/
  /*background-color: v-bind('theme.global.name.value === "dark" ? "#9da5b7" : "#8f8f8f"') !important;*/
  /*background-image: -webkit-linear-gradient(45deg, hsla(0, 0%, 100%, .4) 100%, transparent 0, transparent 0, hsla(0, 0%, 100%, .4) 0, hsla(0, 0%, 100%, .4) 75%, transparent 0, transparent);*/
  border-radius: 2em !important;
}

::-webkit-scrollbar-track {
  background-color: transparent !important;
  border-radius: 2em !important;
}

</style>
<style lang="sass">

</style>