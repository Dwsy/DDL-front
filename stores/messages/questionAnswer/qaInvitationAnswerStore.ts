import { defineStore } from "pinia";
import { UseAxiosGetReplyMeNotify } from "~/composables/Api/messages/reply";
import { errorMsg } from "~/composables/utils/toastification";
import { NotifyMsg, NotifyType } from "~/types/message";
import {
  UseAxiosGetQaAnswerNotify,
  useAxiosGetQaInvitationAnswerNotify,
} from "~/composables/Api/messages/qa/answer";

interface State {
  qaInvitationAnswerNotifyList: NotifyMsg[];
  page: number;
  totalPages: number;
}

export const useQaInvitationAnswerStore = defineStore(
  "AaInvitationAnswerStore",
  {
    state: (): State => {
      return {
        qaInvitationAnswerNotifyList: [],
        page: 1,
        totalPages: 0,
      };
    },
    getters: {},
    actions: {
      async loadQaInvitationAnswerNotifyList(scroll?: boolean) {
        let { data: response } = await useAxiosGetQaInvitationAnswerNotify(
          this.page
        );
        if (response.code == 0) {
          if (scroll) {
            this.qaInvitationAnswerNotifyList =
              this.qaInvitationAnswerNotifyList.concat(response.data.content);
          } else {
            this.qaInvitationAnswerNotifyList = response.data.content;
            this.totalPages = response.data.totalPages;
          }
        } else {
          errorMsg(response.msg);
        }
      },
      getGoToLink(notify: NotifyMsg) {
        if (notify.notifyType == NotifyType["邀请回答问题"]) {
          return `/question/${notify.questionId}`;
        }
      },
    },
  }
);
