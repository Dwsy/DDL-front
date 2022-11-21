<template>
  <v-row justify="center" no-gutters v-show="layout.showFooter">
    <v-btn v-for="(link, i) in links" :key="i" text rounded class="my-2">
      <a :href="link.url" style="text-decoration: none" target="_blank">
        {{ link.name }}
      </a>
    </v-btn>
    <v-col class="lighten-2 py-4 text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {useLayout} from '~/stores/layout'

const layout = useLayout()
let links = [
  {
    name: 'Home',
    url: 'https://nestblog.dwsy.link',
  },
  {
    name: 'About Us',
    url: '1',
  },
  {
    name: "Admin",
    url: "https://nestadmin.dwsy.link/",
  },
  {
    name: "Github",
    url: 'https://github.com/Dwsy',
  },
  {
    name: 'Blog',
    url: 'https://www.dwsy.link',
  },
  {
    name: 'Contact Us',
    url: '1',
  },
];
</script>

<style scoped></style>
