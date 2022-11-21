import { useDel, useGet, usePost, usePut } from "~/composables/useAxios";
import {
  CreateArticleBody,
  GetUserArticleListParams,
  TagSuggestion,
} from "~/types/article/manageArticle";
import http from "~/utils/fetch";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseData } from "~/types/utils/axios";

export const useAxiosPostCreateArticle = (body: CreateArticleBody) => {
  return usePost<ResponseData<any>>("article/article", body);
};

export const useAxiosPutUpdateArticle = (body: CreateArticleBody) => {
  return usePut<ResponseData<any>>("article/article", body);
};

export enum ContentType {
  html,
  pure,
  markdown,
}

export const useAxiosPostUploadImg = (file) => {
  let config: AxiosRequestConfig = {};
  config.headers = {
    "Content-Type": "multipart/form-data",
  };
  return usePost<ResponseData<any>>("file/upload", { file }, config);
};
// http://localhost:7080/article/tag/suggestion/re

export const useAxiosGetTagSuggestion = (
  query
): Promise<AxiosResponse<ResponseData<TagSuggestion[]>, any>> => {
  return useGet<ResponseData<any>>("search/article/tag/suggestion/" + query);
};

export const useAxiosGetUserArticleList = (
  params?: GetUserArticleListParams
) => {
  return useGet<ResponseData<any>>("article/article/manage/field/list", params);
};

export const useAxiosGetArticleCountByState = () => {
  return useGet<ResponseData<any>>("article/article/manage/field/num");
};

export const useAxiosGetArticleField = (id: string, version: number) => {
  return useGet<ResponseData<any>>("article/article/manage/field/" + id, {
    version,
  });
};
export const useAxiosGetArticleContent = (
  id,
  params?: { type?: ContentType; version }
) => {
  return useGet<ResponseData<any>>(
    "article/article/manage/content/" + id,
    params
  );
};

export const useAxiosGetHistoryVersionTitleList = (
  id,
  params?: { type?: ContentType; version }
) => {
  return useGet<ResponseData<any>>(
    "article/article/manage/content/" + id,
    params
  );
};
