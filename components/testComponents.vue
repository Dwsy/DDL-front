<script setup lang="ts">
import { clog } from '~/utils/clog'
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <v-btn @click="updateLocation">{{ location }}</v-btn>
</template>
