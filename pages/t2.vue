<template>
  <div>
    T2
    <test-components></test-components>
    <v-btn
      @click="
        () => {
          this.location = 'provide'
        }
      "
      >provide</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation,
})
</script>

<style></style>
