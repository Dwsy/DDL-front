<template>
  <div id="reply-window">
    <v-row class="">
      <v-col>
        <!--        <div class="text-start ">-->
        <!--          <v-btn icon elevation="0" @click="replyStore.loadReplyNotifyList()">-->
        <!--            <v-icon>-->
        <!--              mdi-refresh-->
        <!--            </v-icon>-->
        <!--          </v-btn>-->
        <!--        </div>-->
        <v-list>
          <v-list-item
            v-for="(item, i) in replyStore.replyNotifyList"
            :key="item.id"
            :value="item"
            active-color="pink"
            rounded="xl"
            :href="replyStore.getGoToLink(item)"
            target="_blank"
          >
            <!--            :href="replyStore.getGoToLink(item)"-->
            <!--            target="_blank"-->
            <template v-slot:prepend>
              <v-badge
                color="red"
                :dot="true"
                class="mr-3"
                :model-value="item.notifyState === NotifyState.UNREAD"
              >
                <v-avatar size="x-large">
                  <v-img :src="item.formUserAvatar"></v-img>
                </v-avatar>
              </v-badge>
            </template>

            <v-list-item-title
              v-text="item.formUserNickname"
            ></v-list-item-title>
            <!--            <v-list-item-subtitle v-text="item.toContent"></v-list-item-subtitle>-->
            <div>
              <span class="text-grey">
                {{ NotifyType[item.notifyType] }}
              </span>
              {{ item.toContent }}
              <div>
                {{ item.formContent }}
              </div>
            </div>
            <span>{{ dateFilter(item.createTime) }}</span>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, dateFilter } from "#imports";
import { onActivated, onDeactivated, onMounted, onUnmounted } from "vue";
import { useReplyStore } from "~/stores/messages/article/replyStrore";
import { useLoadingWin } from "~/composables/useTools";
import { NotifyState, NotifyType } from "~/types/message";

definePageMeta({
  keepalive: false,
});

let replyStore = useReplyStore();

onMounted(async () => {
  console.log("reply mounted");
  document.documentElement.scrollTop = 0;
  await replyStore.loadReplyNotifyList();
  // document.body.onscroll =  useLoadingWin(loadingMore)
  document.body.onscroll = useLoadingWin(loadingMore);
});
onUnmounted(() => {
  replyStore.page = 1;
  replyStore.totalPages = null;
  console.log("replyNotifyList unmounted");
});
onActivated(() => {
  console.log("replyNotifyList activated");
});
onDeactivated(() => {
  console.log("replyNotifyList deactivated");
});

const loadingWin = async () => {
  //文档内容实际高度（包括超出视窗的溢出部分）
  let scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  //滚动条滚动距离
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  //窗口可视范围高度
  let clientHeight =
    window.innerHeight ||
    Math.min(document.documentElement.clientHeight, document.body.clientHeight);
  if (clientHeight + scrollTop + 100 >= scrollHeight) {
    await loadingMore();
  }
};

const loadingMore = async () => {
  console.log(123);
  if (replyStore.page >= replyStore.totalPages) {
    if (replyStore.replyNotifyList.length > 15) {
      // alert.value = true
      document.body.onscroll = null;
    }
    return;
  }
  replyStore.page++;
  await replyStore.loadReplyNotifyList(true);
};
</script>

<style></style>
