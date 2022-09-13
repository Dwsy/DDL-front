<template>
    <div>
        <v-text-field flat clearable hide-details label="搜索....." prepend-inner-icon="mdi-magnify" dense full-width
            v-model="text" class="input-search " autocomplete="off" ref="search"></v-text-field>
    </div>
</template>
<script setup lang="ts">
let search = () => { }
let text = ""

</script>