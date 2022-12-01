import { AnswerData } from '~/types/question/answer'
import { User } from '~/types/user'

export interface QaGroup {
  id: string
  name: string
  info: string
}

export interface QuestionTag {
  id: string
  name: string
  questionNum: number
  weight: any
  indexPageDisplay: boolean
  tagInfo: string
  qaGroup: QaGroup
}

export interface Group {
  id: string
  name: string
  info: string
}

export interface QuestionData {
  id: string
  createTime: number
  user: User
  title: string
  questionState: string
  allowAnswer: boolean
  answerNum: number
  viewNum: number
  collectNum: number
  upNum: number
  downNum: number
  summary: string
  questionTags: QuestionTag
  codeHighlightStyle: string
  markDownTheme: string
  codeHighlightStyleDark: string
  markDownThemeDark: string
  group: Group
}

export interface QuestionField {
  id: string
  createTime: number
  lastModifiedTime: number
  user: User
  title: string
  questionState: QuestionState
  allowAnswer: boolean
  answerNum: number
  viewNum: number
  collectNum: number
  upNum: number
  downNum: number
  summary: string
  questionTags: QuestionTag[]
  codeHighlightStyle: string
  markDownTheme: string
  codeHighlightStyleDark: string
  markDownThemeDark: string
  group: Group
  questionCommentList: AnswerData[]
  questionCommentNum: number
  questionCommentTotalPages: number
}

export enum QuestionState {
  ASK = 'ask',
  DRAFT = 'draft',
  HAVE_ANSWER = 'have_answer',
  RESOLVED = 'resolved',
  UNRESOLVED = 'unresolved',
  HIDE = 'hide',
  AUDITING = 'auditing',
  REJECTED = 'rejected',
  ALL = 'all',
}

export enum QuestionStateZh {
  ASK = '发起问题',
  DRAFT = '草稿',
  HAVE_ANSWER = '已有答案',
  RESOLVED = '以解决',
  UNRESOLVED = '未解决',
  HIDE = '隐藏',
  AUDITING = '审核中',
  REJECTED = '未通过',
}

export enum QuestionStateColor {
  ASK = '#e18a3b',
  DRAFT = '#ffd900',
  HAVE_ANSWER = '#00a3af',
  RESOLVED = '#37b24d',
  UNRESOLVED = '#f03e3e',
  HIDE = '#f03e3e',
  AUDITING = '#868e96',
  REJECTED = '#c92a2a',
}
