import { useGet } from "~/composables/useAxios";
import { ResponseData } from "~/types/utils/axios";
import { NotifyMsg } from "~/types/message";
import { PageData } from "~/types/common";

export enum QaCommentType {
  all,
  question,
  answer,
}

export const UseAxiosGetQaCommentNotify = (
  page: number,
  type: QaCommentType
) => {
  return useGet<ResponseData<PageData<NotifyMsg>>>(
    "message/notify/qa/comment",
    { page, type }
  );
};
