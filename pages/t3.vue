<template>


  <div>
    <v-btn @click="defaultMsg('defaultMsg')">defaultMsg</v-btn>
    <v-btn @click="successMsg('successMsg')">successMsg</v-btn>
    <v-btn @click="infoMsg('infoMsg')">infoMsg</v-btn>
    <v-btn @click="errorMsg('errorMsg')">errorMsg</v-btn>
    <v-btn @click="warningMsg('warningMsg')">warningMsg</v-btn>
  </div>
</template>

<script setup lang="ts">
import {defaultMsg, successMsg, infoMsg, errorMsg, warningMsg} from '#imports'
</script>