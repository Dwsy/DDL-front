import { User } from '~/types/user/index'

export enum UserActiveTypeEn {
  Check_In = 'Check_In', //签到

  Visit_Site = 'Visit_Site',

  Browse_Article = 'Browse_Article', //浏览文章

  Browse_QA = 'Browse_QA', //浏览问题
  //-------------

  Comment_Article = 'Comment_Article', //评论文章

  Comment_Article_Comment = 'Comment_Article_Comment', //评论文章评论

  UP_Article = 'UP_Article', //点赞文章

  UP_Article_Comment = 'UP_Article_Comment', //点赞文章评论

  Answer_Question = 'Answer_Question', //回答问题 or 问题回答

  UP_Question = 'UP_Question', //点赞问题

  UP_Question_Answer = 'UP_Question_Answer', //点赞问题回答
  Accepted_Question_Answer = 'Accepted_Question_Answer', //采纳问题回答

  Comment_Tweet = 'Comment_Tweet', //回复推文

  Reply_Comment_Tweet = 'Reply_Comment_Tweet', //回复推文回复

  Reply_Reply_Comment_Tweet = 'Reply_Reply_Comment_Tweet', //回复推文二级回复

  Thumb_Tweet = 'Thumb_Tweet', //点赞tweet
  Browse_Infinity = 'Browse_Infinity',
}

export enum UserActiveTypeZh {
  Check_In = '签到', //签到

  Visit_Site = '访问网站',

  Browse_Article = '浏览文章', //浏览文章

  Browse_QA = '浏览问题', //浏览问题
  //-------------

  Comment_Article = '评论文章', //评论文章

  Comment_Article_Comment = '评论文章评论', //评论文章评论

  UP_Article = '点赞文章', //点赞文章

  UP_Article_Comment = '点赞文章评论', //点赞文章评论

  Answer_Question = '回答问题', //回答问题 or 问题回答

  UP_Question = '点赞问题', //点赞问题

  UP_Question_Answer = '点赞问题回答', //点赞问题回答
  Accepted_Question_Answer = '采纳问题回答', //采纳问题回答

  Comment_Tweet = '回复推文', //回复推文

  Reply_Comment_Tweet = '回复推文回复', //回复推文回复

  Reply_Reply_Comment_Tweet = '回复推文二级回复', //回复推文二级回复

  Thumb_Tweet = '点赞tweet', //点赞tweet
  Browse_Infinity = '浏览动态', //
}

export interface UserThumbActiveI {
  id: string
  createTime: number
  user: User
  title: string
  summary: string
  banner: string
  userActiveType: UserActiveTypeEn
}
