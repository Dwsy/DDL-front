import { useGet } from "~/composables/useAxios";
import { ResponseData } from "~/types/utils/axios";
import { PageData } from "~/types/common";
import { NotifyMsg } from "~/types/message";

export enum QaSupportType {
  all,
  question,
  answer,
}

export const UseAxiosGetQaSupportNotify = (
  page: number,
  type: QaSupportType
) => {
  return useGet<ResponseData<PageData<NotifyMsg>>>(
    "message/notify/qa/support",
    { page, type }
  );
};
