<template>
  <div class="mt-4">
    <v-row>
      <v-col class="ml-6" cols="2">
        <v-card>
          <!--          {{ userStore.userInfo }}-->
          <div class="ml-4 mt-4">
            <v-avatar size=80>
              <v-img :src="userStore?.userInfo?.avatar"></v-img>
            </v-avatar>
            <span class="text-h6 pl-4">{{ userStore.user.nickname }}</span>
          </div>
          <v-divider class="mt-1"></v-divider>

          <div class="text-center">
            <v-btn class="w-75 mt-2 mb-2 text-white text-subtitle-2"
                   color="#1d9bf0" target="_blank" href="/article/editor/draft?new=true">
              写文章
            </v-btn>
          </div>
          <v-divider></v-divider>

          <v-list v-model:opened="open">
            <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

            <v-list-group value="Users">
              <template v-slot:activator="{ props }">
                <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-account-circle"
                    title="Users"
                ></v-list-item>
              </template>

              <v-list-group value="Admin">
                <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      title="Admin"
                  ></v-list-item>
                </template>

                <v-list-item
                    v-for="([title, icon], i) in admins"
                    :key="i"
                    :title="title"
                    :prepend-icon="icon"
                    :value="title"
                ></v-list-item>
              </v-list-group>

              <v-list-group value="Actions">
                <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      title="Actions"
                  ></v-list-item>
                </template>

                <v-list-item
                    v-for="([title, icon], i) in cruds"
                    :key="i"
                    :value="title"
                    :title="title"
                    :prepend-icon="icon"
                ></v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="8">
        <nuxt-page :key="$route.fullPath"></nuxt-page>
      </v-col>

      <v-col>
        3
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from '~/stores/user'
import {ref} from 'vue'

const userStore = useUserStore()

</script>
<script lang="ts">
export default {
  data: () => ({
    open: ['Users'],
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline'],
    ],
    cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],
  }),
}
</script>

<style scoped>

</style>