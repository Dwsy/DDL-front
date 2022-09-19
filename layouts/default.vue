<template>
  <div>
    <!-- App.vue -->

    <v-app>
      <v-navigation-drawer app v-model="layout.drawer">
        <slot name="drawer"></slot>
        <v-app-bar app>
        <slot name="appbar"></slot>
        <!-- -->
      </v-app-bar>
      </v-navigation-drawer>



      <!-- Sizes your content based upon application components -->
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container fluid>

          <!-- If using 123 vue-router -->
          <slot/>
          <slot name="footer"></slot>
        </v-container>

        <v-footer app>

        <!-- -->
      </v-footer>
      </v-main>


    </v-app>

  </div>
</template>
<script setup lang="ts">
import {useLayout} from '~~/stores/layout';
let layout = useLayout()
</script>