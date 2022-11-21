<template>
  <div
    class="group flex cursor-pointer items-center text-gray-400"
    @click.stop.prevent="emits('onClick')"
  >
    <div
      :class="`rounded-full p-2 group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`"
    >
      <slot :classes="`w-${props.size} h-${props.size}`" name="icon" />
    </div>

    <span :class="`ml-1 group-hover:text-${props.color}-400`">
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from "~/composables/useTailwindConfig";

const { defaultTransition } = useTailwindConfig();
const emits = defineEmits(["onClick"]);

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 5,
  },
});
</script>
