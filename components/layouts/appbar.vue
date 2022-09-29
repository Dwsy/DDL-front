<template>
  <v-app-bar density="compact" elevation="1">
    <v-app-bar-nav-icon @click.stop="layout.switchDrawer()"></v-app-bar-nav-icon>

    <v-row>
      <v-col sm="1" md="4" cols="4" offset="3">

        <Search/>

      </v-col>


      <v-col class="pt-4" offset="3">
        <nuxt-link to="/user/login">
          <v-btn icon>
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>
        </nuxt-link>
        <v-btn icon>
          <v-icon>mdi-bell-circle</v-icon>
        </v-btn>
        <nuxt-link to="/messages">
          <v-btn>
            <v-icon>mdi-message-text-outline</v-icon>
          </v-btn>
        </nuxt-link>
        <v-btn @click="layout.switchTheme(theme)" text transition="fade-transition">
          <v-icon v-if="theme.global.current.value.dark">mdi-white-balance-sunny</v-icon>

          <v-icon v-if="!theme.global.current.value.dark">mdi-weather-night</v-icon>
        </v-btn>
        <!--        <a href="#comments">-->
        <!--          #comments-->
        <!--        </a>-->
      </v-col>


    </v-row>
  </v-app-bar>


</template>

<script setup lang="ts">
import {useLayout} from '~~/stores/layout'
import {useTheme} from 'vuetify'
import Search from './search.vue'

let theme = useTheme()
let layout = useLayout()

</script>

<style scoped>

</style>