<template>
  <v-list>
    <v-toolbar-title class="dwsy ml-0 pl-4">
      <h1 style="font-size: 30px" >DDL</h1>
    </v-toolbar-title>

    <v-col cols="10">
      <v-avatar size="50px" class="img-full">
        <img
            alt="Avatar"
            src="https://q.qlogo.cn/g?b=qq&nk=1521986032&s=100"
        />
      </v-avatar>
<!--      <sub>{{ greetings }}</sub>-->
<!--      <div @click="upyy">-->
<!--        <sub>{{ yy.hitokoto }}</sub-->
<!--        ><br />-->
<!--        <sub style="left: 120px">&#45;&#45;{{ yy.from }}</sub>-->
<!--      </div>-->
    </v-col>

    <template v-for="item in items">
      <v-list-group
          :to="item.link"
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="
                            item.model ? item.icon : item['icon-alt']
                        "
          append-icon=""
      >
        <template v-slot:activator>

            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>

        </template>

        <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            nuxt
            :to="'/classification/' + child._id"
        >

            <v-list-item-title>
              {{ child.name }}
              <v-divider></v-divider>
            </v-list-item-title>


          <v-list-item-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>

      <v-list-item v-else :key="item.text" :to="item.link" link>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>


          <v-list-item-title>
            {{ item.text }}
            <v-divider></v-divider>
          </v-list-item-title>

      </v-list-item>
    </template>
  </v-list>
</template>

<script setup lang="ts">

let items= reactive([
  { icon: "mdi-home-outline", text: "博客首页", link: "/" },
  {
    icon: "mdi-flag-variant-outline",
    text: "文章归档",
    link: "",
  },
  {
    icon: "mdi-timeline-clock-outline ",
    text: "时光机",
    link: "",
  },
  { icon: "mdi-image", text: "相册", link: "" },
  { icon: "mdi-tag-multiple-outline", text: "Tag", link: "" },
  {
    icon: "mdi-chevron-up",
    "icon-alt": "mdi-chevron-down",
    text: "文章分类",
    model: false,
    children: [],
  },
  {
    icon: "mdi-account-multiple-outline",
    text: "友情链接",
    link: "",
  },
  {
    icon: "mdi-infinity",
    text: "infinitynewtab",
    link: "",
  },
  {
    icon: "mdi-information-variant",
    text: "关于",
    link: "",
  },
])
</script>

<style scoped>

</style>