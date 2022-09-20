<template>

  <v-app>
    <v-app-bar density="compact" elevation="1">
      <slot name="appbar"></slot>
    </v-app-bar>

    <v-navigation-drawer v-model="layout.drawer">
      <slot name="drawer"></slot>

    </v-navigation-drawer>

    <v-row>
      <v-col xl="1" lg="1" md="0" sm="0" xs="0"></v-col>

      <v-col xl="10" lg="10" md="10" sm="12" xs="12">
        <v-main>
          <v-container>
            <slot />
            <slot name="footer"></slot>
          </v-container>

          <v-footer>
          </v-footer>
        </v-main>
      </v-col>

      <v-col xl="1" lg="1" md="1" sm="0" xs="0"></v-col>
    </v-row>


  </v-app>


</template>
<script setup lang="ts">
import { useLayout } from '~~/stores/layout';
let layout = useLayout()
</script>