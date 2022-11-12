<template>
  <div class="loading" v-show="!show">
    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>

  <v-app v-show="show">

    <slot name="appbar"></slot>

    <v-navigation-drawer v-model="layout.drawer">
      <slot name="drawer"></slot>

    </v-navigation-drawer>

    <v-main>
      <!--      id="main-container"-->
      <v-container fluid id="main-container" class="box">
        <slot/>
        <slot name="footer"></slot>
      </v-container>

    </v-main>


  </v-app>

</template>
<script setup lang="ts">
import {useLayout} from '~~/stores/layout'
import {nextTick, onBeforeUpdate, onMounted, ref} from 'vue'

let layout = useLayout()
const show = ref(false)
onMounted(async () => {
  // await nextTick()
  setTimeout(() => {
    show.value = true
  }, 100)
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
  animation: dash $duration ease-in-out infinite,
  colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #4285F4;
  }
  25% {
    stroke: #DE3E35;
  }
  50% {
    stroke: #F7C223;
  }
  75% {
    stroke: #1B9A59;
  }
  100% {
    stroke: #4285F4;
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