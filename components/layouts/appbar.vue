<template>
  <v-app-bar-nav-icon
      @click.stop="layout.switchDrawer()"
  ></v-app-bar-nav-icon>
  <v-btn
      elevation="0"
      @click="switchTheme()"
      text
      transition="fade-transition"
  >
    <v-icon v-if="$vuetify.theme.dark"
    >mdi-white-balance-sunny
    </v-icon
    >
    <v-icon v-if="!$vuetify.theme.dark">mdi-weather-night</v-icon>
  </v-btn>
  <v-btn icon>
    <v-icon>mdi-bell-circle</v-icon>
  </v-btn>
  <v-btn v-show="toc&&!pc" class="tocbtn"
         @click="showToc" icon>
    <v-icon>mdi-table-of-contents</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import {useLayout} from '~~/stores/layout';
import {useTheme} from "vuetify";
let theme = useTheme()
let layout = useLayout()
const switchTheme=() => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
</script>

<style scoped>

</style>