import { MarkdownTheme, mwebDark } from '~/types/other/markdownTheme'
import { HighlightStyleName } from '~/constant/highlightStyleList'

export interface CreateArticleBody {
  allowComment: boolean
  articleGroupId: string
  articleId?: string
  articleState: ArticleState
  articleTagIds: string[]
  banner: string
  content: string
  summary: string
  title: string
  articleSource: ArticleSource
  articleSourceUrl?: string
  codeHighlightStyle?: HighlightStyleName | string
  codeHighlightStyleDark?: string
  markDownTheme?: MarkdownTheme | string
  markDownThemeDark?: mwebDark | string
}

export enum ArticleState {
  draft = 'draft',
  published = 'published',
  hide = 'hide',
  auditing = 'auditing',
  rejected = 'rejected',
  all = 'all',
}

export enum ArticleStateZh {
  draft = '草稿',
  published = '已发布',
  hide = '隐藏',
  auditing = '审核中',
  rejected = '拒绝',
  //
  all = '全部',
}

export enum ArticleStateColor {
  draft = '#bc763c',
  published = '#47885e',
  hide = '#9d5b8b',
  auditing = '#ffea00',
  rejected = '#ba2636',
  //
  all = '全部',
}

export enum ArticleSource {
  original = 'original',
  reprint = 'reprint',
  translation = 'translation',
}

export enum ArticleSourceZh {
  original = '原创',
  reprint = '转载',
  translation = '翻译',
}

export interface TagSuggestion {
  id: string
  name: string
  articleNum: number
  groupName: string
  indexPageDisplay: boolean
}

export interface GetUserArticleListParams {
  order?: string
  properties?: string
  page?: number
  size?: number
  state: ArticleState
  tagId?: string
}
