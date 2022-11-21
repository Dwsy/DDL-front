<template>
  <v-list>
    <v-toolbar-title class="dwsy pt-4 ml-0 pl-4">
      <h1 style="font-size: 30px">DDL</h1>
    </v-toolbar-title>

    <v-col cols="10">
    </v-col>

    <!--    <template v-for="item in items">-->

    <!--      <v-list-item :to="item.link" variant="flat" rounded="xl"-->
    <!--                   :prepend-icon="item.icon">-->
    <!--        <v-list-item-title>-->
    <!--          {{ item.text }}-->
    <!--          <v-divider></v-divider>-->
    <!--        </v-list-item-title>-->
    <!--      </v-list-item>-->
    <!--    </template>-->

    <nav aria-label="Main Nav" class="flex flex-col space-y-1">
      <template v-for="item in items">
        <nuxt-link :to="item.link"
                   class="flex items-center rounded-lg  px-4 py-2 text-gray-500 active:bg-violet-50 hover:bg-gray-100 dark:hover:bg-amber-600 hover:text-gray-700">
          <v-icon>
            {{ item.icon }}
          </v-icon>
          <span class="ml-3 text-sm font-medium"> {{ item.text }} </span>
        </nuxt-link>
      </template>
    </nav>

  </v-list>
</template>

<script setup lang="ts">

import {reactive} from 'vue'
import {useTheme} from 'vuetify'

const theme = useTheme()
let items = reactive([
  {
    icon: 'mdi-home-outline',
    text: '文章',
    link: '/article'
  },
  {
    icon: 'mdi-comment-question-outline',
    text: '问答',
    link: '/question',
  },
  {
    icon: 'mdi-infinity',
    text: '圈子',
    link: '/infinity',
  },
  {
    icon: 'mdi-music-accidental-sharp',
    text: '探索',
    link: '/explore',
  },
  // {
  //   icon: 'mdi-timeline-clock-outline ',
  //   text: '时光机',
  //   link: '',
  // },
  // {icon: 'mdi-image', text: '相册', link: ''},
  // {icon: 'mdi-tag-multiple-outline', text: 'Tag', link: ''},
  // {
  //   icon: 'mdi-chevron-up',
  //   'icon-alt': 'mdi-chevron-down',
  //   text: '文章分类',
  //   model: false,
  //   children: [],
  // },
  // {
  //   icon: 'mdi-account-multiple-outline',
  //   text: '友情链接',
  //   link: '',
  // },
  // {
  //   icon: 'mdi-infinity',
  //   text: 'infinitynewtab',
  //   link: '',
  // },
  // {
  //   icon: 'mdi-information-variant',
  //   text: '关于',
  //   link: '',
  // },
])
</script>

<style scoped>

</style>
<style>
.v-navigation-drawer {
  /*background-color: v-bind('theme.global.name.value === "dark" ? "#0C0C0DCE" : "--v-theme-surface"');*/
  background-color: v-bind('theme.global.name.value === "dark" ? "#0C0C0DCF" : "#FFFFFF"') !important;
  backdrop-filter: saturate(150%) blur(10px) !important;
}

</style>