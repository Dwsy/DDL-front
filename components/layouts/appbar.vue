<template>
  <v-app-bar density="compact" elevation="1">
    <v-app-bar-nav-icon @click.stop="layout.switchDrawer()"></v-app-bar-nav-icon>

    <v-row>
      <v-col sm="1" md="4" cols="4" offset="3">

          <Search />

      </v-col>


      <v-col class="pt-4" offset="3">
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
      </v-col>



    </v-row>
  </v-app-bar>


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