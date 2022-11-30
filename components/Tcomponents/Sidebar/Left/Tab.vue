<template>
  <nuxt-link
    :to="to"
    class="dark:hover:bg-dim-200 flex  items-center rounded-full p-3 text-black hover:bg-gray-200 dark:text-white"
    :class="defaultTransition"
  >

  <div class="text-dark h-6 w-6 dark:text-white">
  <slot name="icon" :active="active"></slot>
  </div>

    <div class="ml-4 hidden text-xl xl:block dark:text-white" :class="textClasses">
      <slot name="name"></slot>
    </div>
  </nuxt-link>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import useTailwindConfig from '~/composables/useTailwindConfig'
import { computed, ref } from 'vue'
import { useRoute } from '#app'

const { defaultTransition } = useTailwindConfig()

const props = defineProps({
  to: {
    type: String,
    default: '#',
  },
})
const route = useRoute()
const active = computed(()=>route.path.startsWith(props.to))
const textClasses = computed(() => (active ? 'font-semibold' : 'font-normal'))
</script>
