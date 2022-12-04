<template>
  <div class="border-x" :class="twitterBorderColor">
    <div class="px-2 backdrop-blur-xl" style="position: sticky; top: 48px; z-index: 10" :style="{backgroundColor:appBarColor}">
      <v-btn icon class="" variant="text" :to="props.backTo" v-if="props.backTo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
      </v-btn>
      <span class="text-h6" v-if="props.backTo"> {{ props.title }}</span>
      <div style="font-size: 20px" class="font-bold text-gray-800 dark:text-gray-100 ml-4 py-2" v-else>
        {{ props.title }}
      </div>
    </div>

    <div
      v-if="props.loading"
      class="flex items-center justify-center border-b p-4"
      style="height: 100vh"
      :class="twitterBorderColor"
    >
      <UISpinner />
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import useTailwindConfig from '../../composables/useTailwindConfig'
import UISpinner from '~~/components/Tcomponents/UI/Spinner.vue'
import { computed } from 'vue'
import { useTheme } from 'vuetify'
// import UISpinner from '~~/components/Tcomponents/UI/Spinner.vue'

const { twitterBorderColor } = useTailwindConfig()
const theme = useTheme()
const props = defineProps<{
  title: string
  loading: boolean
  backTo?:string
}>()
const appBarColor = computed(() => {
  return theme.global.name.value === 'dark' ? '#000000ab' : '#ffffffaa'
  // return theme.global.name.value === 'dark' ? '#2228' : '#ffffffaa'
})
</script>
