<template>


  <div style="border-style: soli">


    <v-card
        flat
        class="d-flex flex-column fill-height"
    >
      <v-card-title>
        john doe
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <!--        v-for="(msg, i) in messages"-->
        <!--        :class="{ 'd-flex flex-row-reverse': msg.me }"-->
        <template>
          <div

          >
            12333333333333333333
          </div>
        </template>
      </v-card-text>
      <v-card-text class="flex-shrink-1">
        <v-text-field/>
      </v-card-text>
    </v-card>

    <v-card
        flat
        class="d-flex flex-column fill-height"
    >
      <v-card-title>
        john doe
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <!--        v-for="(msg, i) in messages"-->
        <!--        :class="{ 'd-flex flex-row-reverse': msg.me }"-->
        <template>
          <div

          >
            12333333333333333333
          </div>
        </template>
      </v-card-text>
      <v-card-text class="flex-shrink-1">
        <v-text-field/>
      </v-card-text>
    </v-card>
    <v-card
        flat
        class="d-flex flex-column fill-height"
    >
      <v-card-title>
        john doe
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <!--        v-for="(msg, i) in messages"-->
        <!--        :class="{ 'd-flex flex-row-reverse': msg.me }"-->
        <template>
          <div

          >
            12333333333333333333
          </div>
        </template>
      </v-card-text>
      <v-card-text class="flex-shrink-1">
        <v-text-field/>
      </v-card-text>
    </v-card>
    <v-card
        flat
        class="d-flex flex-column fill-height"
    >
      <v-card-title>
        john doe
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <!--        v-for="(msg, i) in messages"-->
        <!--        :class="{ 'd-flex flex-row-reverse': msg.me }"-->
        <template>
          <div

          >
            12333333333333333333
          </div>
        </template>
      </v-card-text>
      <v-card-text class="flex-shrink-1">
        <v-text-field/>
      </v-card-text>
    </v-card>
    <v-card
        flat
        class="d-flex flex-column fill-height"
    >
      <v-card-title>
        john doe
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <!--        v-for="(msg, i) in messages"-->
        <!--        :class="{ 'd-flex flex-row-reverse': msg.me }"-->
        <template>
          <div

          >
            12333333333333333333
          </div>
        </template>
      </v-card-text>
      <v-card-text class="flex-shrink-1">
        <v-text-field/>
      </v-card-text>
    </v-card>
    <v-card
        flat
        class="d-flex flex-column fill-height"
    >
      <v-card-title>
        john doe
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <!--        v-for="(msg, i) in messages"-->
        <!--        :class="{ 'd-flex flex-row-reverse': msg.me }"-->
        <template>
          <div

          >
            12333333333333333333
          </div>
        </template>
      </v-card-text>
      <v-card-text class="flex-shrink-1">
        <v-text-field/>
      </v-card-text>
    </v-card>

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