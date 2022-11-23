<template>
  <div
    :class="twitterBorderColor"
    class="dark:bg-dim-700 m-2 overflow-hidden rounded-2xl border bg-gray-50"
  >
    <h1
      :class="twitterBorderColor"
      class="border-b p-3 text-xl font-extrabold text-gray-900 dark:text-white"
    >
      {{ props.title }}
    </h1>

    <slot></slot>

    <div
      :class="defaultTransition"
      class="dark:hover:bg-dim-300 cursor-pointer p-3 text-sm text-blue-400 hover:bg-gray-100"
    >
      Show more
    </div>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'

const { twitterBorderColor, defaultTransition } = useTailwindConfig()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
