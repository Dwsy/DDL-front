<template>
  <div>
    <label
      v-if="props.label"
      class="ml-px block pl-3 text-sm font-medium text-gray-700"
      for=""
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        :placeholder="props.placeholder"
        :type="props.type"
        :value="props.modelValue"
        class="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        @input="(event) => emits('update:modelValue', event.target.value)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import input from "/components/Tcomponents/Logo/Twitter";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: null,
  },
});
</script>
