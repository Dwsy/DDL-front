<template>
  <div
    :class="wrapperClasses"
    class="dark:hover:bg-dim-300 cursor-pointer border-b p-3 hover:bg-gray-100"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { computed } from 'vue'
import useTailwindConfig from '~/composables/useTailwindConfig'

const { defaultTransition, twitterBorderColor } = useTailwindConfig()

const wrapperClasses = computed(() => `${defaultTransition} ${twitterBorderColor}`)
</script>
