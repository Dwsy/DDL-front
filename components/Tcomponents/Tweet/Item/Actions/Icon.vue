<template>
  <div class="group flex cursor-pointer items-center mr-10 text-gray-400 w-14">
    <!--    @click.stop.prevent="emits('onClick')"-->
    <div
      :class="`rounded-full p-2 group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`"
      class="group-hover:bg-blue-100 group-hover:text-blue-400"
    >
      <slot :classes="`w-${props.size} h-${props.size}`" name="icon" />
    </div>

    <span :class="`ml-1 group-hover:text-${props.color}-400`">
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import useTailwindConfig from '~/composables/useTailwindConfig'

const { defaultTransition } = useTailwindConfig()
const emits = defineEmits(['onClick'])

const props = defineProps({
  color: {
    type: String,
    required: true,
    default: 'sky',
  },
  size: {
    type: Number,
    default: 5,
  },
})
</script>