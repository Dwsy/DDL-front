<template>
  <button
    :class="classes"
    :disabled="props.disabled"
    class="font-sm flex justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
    @click="handleClick"
  >
    <span :class="textFontSize">
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { computed } from 'vue'

const emits = defineEmits(['onClick'])

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    deafault: 'md',
  },
  liquid: {
    type: Boolean,
    deafult: false,
  },
})

const paddingClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'py-2 px-3'
    case 'lg':
      return 'px-4 py-3'
    default:
      return 'px-3 py-3'
  }
})

const textFontSize = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'text-md'
    default:
      return 'text-sm'
  }
})

const defaultWidth = computed(() => {
  switch (props.size) {
    default:
      return 'w-min'
  }
})

const classes = computed(
  () => `${paddingClasses.value} ${props.liquid ? 'w-full' : defaultWidth.value}`
)

function handleClick(event) {
  emits('onClick', event)
}
</script>
