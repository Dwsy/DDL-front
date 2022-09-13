<template>
  <v-app-bar-nav-icon @click.stop="layout.switchDrawer()"></v-app-bar-nav-icon>

  <!-- style="height: 50px;" -->
  <v-row align="end" no-gutters>
    <v-spacer></v-spacer>

    <v-col cols="4">
      <Search />
    </v-col>

    <v-spacer></v-spacer>
    <v-col cols="4">

      <div >

        <v-btn icon>
          <v-icon>
            mdi-account
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell-circle</v-icon>
        </v-btn>

        <v-btn @click="switchTheme()" text transition="fade-transition">
          <v-icon v-if="theme.global.current.value.dark">mdi-white-balance-sunny
          </v-icon>
          <v-icon v-if="!theme.global.current.value.dark">mdi-weather-night</v-icon>
        </v-btn>
      </div>

    </v-col>
  </v-row>


</template>

<script setup lang="ts">
import { useLayout } from '~~/stores/layout';
import { useTheme } from "vuetify";
import Search from './search.vue';
let theme = useTheme()
let layout = useLayout()
const switchTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
</script>

<style scoped>
</style>