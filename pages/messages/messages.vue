<template>
  <div class="v-container">

    <v-row>

      <v-divider></v-divider>
      <v-col cols="2" style="padding-bottom: 30%;max-width: 200px" class="ml-n5 mr-2">

        <v-list>
          <v-list-subheader>消息中心</v-list-subheader>
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              :to="item.to"
              active-color="primary"
              rounded="xl"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>

      </v-col>

      <v-divider vertical></v-divider>
      <v-col xl="9" lg="9" md="10" sm="9" xs="12">
        <nuxt-link>

        </nuxt-link>
      </v-col>
      <v-col cols="1">
        3
      </v-col>
    </v-row>
  </div>


</template>

<script setup lang="ts">


let items = [
  {text: '回复我的', icon: 'mdi-reply', to: '/messages/reply'},
  {text: ' @ 我的', icon: 'mdi-at', to: '/messages/at'},
  {text: '受到的赞', icon: 'mdi-thumb-up-outline', to: '/messages/thumb'},
  {text: '系统通知', icon: 'mdi-message-cog-outline', to: '/messages/notifications'},
  {text: '私信列表', icon: 'mdi-message-badge-outline', to: '/messages/chats'},
]


</script>