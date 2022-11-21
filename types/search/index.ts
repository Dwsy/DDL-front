interface TagList {
  id: string;
  name: string;
}

export interface QuestionSearchData {
  id: string;
  userId: string;
  userNickName: string;
  title: string;
  content: any;
  summary: string;
  createTime: string;
  group: string;
  tagList: TagList[];
  viewNum: number;
  answerNum: number;
  collectNum: number;
  upNum: number;
  downNum: number;
  suggestion: any;
}

export interface ArticleSearchData {
  id: string;
  userId: string;
  userNickName: string;
  title: string;
  content: string;
  summary: string;
  banner: string;
  group: string;
  tagList: TagList[];
  viewNum: number;
  collectNum: number;
  upNum: number;
  downNum: number;
  suggestion?: any;
  createTime?: string;
}
