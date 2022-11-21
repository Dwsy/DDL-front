<template>
  <v-list>
    <v-toolbar-title class="dwsy ml-0 pt-4 pl-4">
      <h1 style="font-size: 30px">DDL</h1>
    </v-toolbar-title>

    <br />

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
        <nuxt-link
          :class="{ active: item.active }"
          :to="item.link"
          class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-900"
        >
          <v-icon
            v-if="item.link !== '/messages'"
            class="mr-2 dark:text-slate-200"
          >
            {{ item.icon }}
          </v-icon>
          <BellIcon
            v-else
            class="mr-2 dark:text-slate-200"
            style="width: 27px"
          />
          <span class="ml-3 text-lg font-medium dark:text-slate-200">
            {{ item.text }}
          </span>
        </nuxt-link>
      </template>
    </nav>
  </v-list>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, watchEffect } from "vue";
import { useTheme } from "vuetify";
import { BellIcon } from "@heroicons/vue/24/outline/esm/index.js";
import { useRoute } from "#app";

const route = useRoute();
const theme = useTheme();
let items = reactive([
  {
    icon: "mdi-home-outline",
    text: "文章",
    link: "/article",
    active: false,
  },
  {
    icon: "mdi-comment-question-outline",
    text: "问答",
    link: "/question",
    active: false,
  },
  {
    icon: "mdi-infinity",
    text: "圈子",
    link: "/infinity",
    active: false,
  },
  {
    icon: "mdi-music-accidental-sharp",
    text: "探索",
    link: "/explore",
    active: false,
  },
  {
    icon: "mdi-chart-line-variant",
    text: "排行",
    link: "/explore",
    active: false,
  },
  {
    icon: "",
    text: "通知",
    link: "/messages",
    active: false,
  },
  {
    text: "私信",
    icon: "mdi-message-badge-outline",
    link: "/messages/chats",
    active: false,
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
]);

watchEffect(() => {
  items.forEach((item) => {
    item.active = item.link === route.path;
  });
});
onBeforeMount(() => {});
</script>

<style lang="css" scoped>
.active {
  @apply bg-gray-200 dark:bg-slate-800;
}
</style>
<style>
.v-navigation-drawer {
  /*background-color: v-bind('theme.global.name.value === "dark" ? "#0C0C0DCE" : "--v-theme-surface"');*/
  background-color: v-bind(
    'theme.global.name.value === "dark" ? "#0C0C0DCF" : "#FFFFFF"'
  ) !important;
  backdrop-filter: saturate(150%) blur(10px) !important;
}
</style>
