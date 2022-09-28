<template>

  <v-app>

      <slot name="appbar"></slot>


    <v-navigation-drawer v-model="layout.drawer">
      <slot name="drawer"></slot>

    </v-navigation-drawer>

    <v-main>
      <v-container id="main-container" class="box">
        <slot/>
        <slot name="footer"></slot>
      </v-container>

      <v-footer v-show="layout.showFooter">
      </v-footer>
    </v-main>


  </v-app>


</template>
<script setup lang="ts">
import { useLayout } from '~~/stores/layout';
let layout = useLayout()
</script>