<template>
  <div v-show="!show" :class="{ dark: dark }" class="loading">
    <svg
      class="spinner"
      height="65px"
      viewBox="0 0 66 66"
      width="65px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        cx="33"
        cy="33"
        fill="none"
        r="30"
        stroke-linecap="round"
        stroke-width="6"
      ></circle>
    </svg>
  </div>

  <v-app v-show="show" :class="{ dark: dark }">
    <slot name="appbar"></slot>

    <!--    <v-navigation-drawer v-model="layout.drawer" width="calc(100% - 70% - 20px)">-->
    <!--      <slot name="drawer"></slot>-->
    <!--    </v-navigation-drawer>-->
    <v-navigation-drawer
      v-model="layout.drawer"
      style="width: 8%"
      :style="{ width: navigationDrawerWidth }"
    >
      <slot name="drawer"></slot>
    </v-navigation-drawer>

    <v-main :style="{ '--v-layout-left': drawerWidth }" style="'--v-layout-left':8% ">
      <v-container fluid id="main-container" class="box">
        <slot />
        <slot name="footer"></slot>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { useLayout } from '~~/stores/layout'
import { nextTick, onBeforeMount, onBeforeUpdate, onMounted, ref, watch, watchEffect } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const layout = useLayout()
const dark = ref()
const drawerWidth = ref('8%')
const navigationDrawerWidth = ref('8%')
watchEffect(() => {
  dark.value = theme.global.name.value === 'dark'
})

const show = ref(false)
onMounted(async () => {
  watchEffect(() => {
    drawerWidth.value = layout.drawer ? '8%' : '0px'
  })
  let innerWidth = window.innerWidth
  if (innerWidth < 500) {
    setTimeout(() => {
      show.value = true
    }, 100)
  } else {
    await nextTick()
    show.value = true
  }
  const setNavigationDrawerWidth = () => {
    console.log('setNavigationDrawerWidth')
    innerWidth = window.innerWidth
    if (innerWidth < 1890) {
      navigationDrawerWidth.value = '8%'
    }
    if (innerWidth < 1600) {
      navigationDrawerWidth.value = '12%'
    }
    if (innerWidth < 1280) {
      navigationDrawerWidth.value = '25%'
    }
    if (innerWidth < 900) {
      navigationDrawerWidth.value = '30%'
    }
    if (innerWidth < 500) {
      navigationDrawerWidth.value = '50%'
    }
  }
  setNavigationDrawerWidth()

  window.addEventListener('resize', setNavigationDrawerWidth)
})
</script>

<style lang="scss" scoped>
// This is just to center the spinner

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
}

// Here is where the magic happens

$offset: 187;
$duration: 1.4s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite, colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: calc($offset / 4);
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
