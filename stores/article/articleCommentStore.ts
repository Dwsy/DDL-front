import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import {
  ArticleCommentAction,
  CommentType,
  ReplyArticleCommentBody,
  useAxiosDeleteCommentById,
  useAxiosGetArticleChildComment,
  useAxiosGetArticleComment,
  useAxiosPostActionArticleComment,
  useAxiosPostReplyArticleComment,
} from '~/composables/Api/article'
import { useRoute } from '#imports'
import { errorMsg, successMsg, warningMsg } from '~/composables/utils/toastification'

import { useUserStore } from '~/stores/user'
import { User } from '~/types/user'

interface ArticleCommentStore {
  commentList: CommentContent[]
  loadingComment: boolean
  aid: any
  replyCommentText: string
  field: any
  selectCommentMenu: number
  CommentMenuList: string[]
  showCommentMenu: boolean
  properties: any
  order: any
  page: number
  totalPages: number
}

export const useArticleCommentStore = defineStore('ArticleCommentStore', {
  state: (): ArticleCommentStore => {
    return {
      commentList: [],
      loadingComment: true,
      aid: null,
      replyCommentText: '',
      field: null,
      selectCommentMenu: 1,
      CommentMenuList: ['按热读 ↓', '按时间 ↑', '按时间 ↓'],
      showCommentMenu: false,
      properties: null,
      order: null,
      page: 1,
      totalPages: 0,
    }
  },
  getters: {},
  actions: {
    async init(field) {
      this.field = field
      this.aid = useRoute().params.aid
      await this.loadComment()
    },
    async loadComment(page?: number, properties?: string, order?) {
      this.loadingComment = true
      if (properties != undefined) {
        this.properties = properties
      }
      if (order != undefined) {
        this.order = order
      }
      let params = {
        properties: this.properties,
        order: this.order,
        page: page,
      }
      let { data: commentData } = await useAxiosGetArticleComment(this.aid, params)
      this.commentList = commentData.data.content
      for (let commentContent of this.commentList) {
        commentContent.replyCommentText = ref('')
        commentContent.childComments.forEach((childComment) => {
          childComment.replyCommentText = ref('')
        })
        commentContent.childCommentPage = 1
      }
      // clog(this.commentList)
      this.loadingComment = false
      this.totalPages = commentData.data.totalPages
    },
    async loadChildComment(pComment, page: number) {
      const pid = pComment.id
      clog('pid', pid)
      clog('aid', this.aid)
      clog('page', page)
      let { data: commentData } = await useAxiosGetArticleChildComment(this.aid, pid, {
        page,
      })
      if (commentData.code === 0) {
        pComment.childComments = commentData.data.content
        pComment.childComments.forEach((childComment) => {
          childComment.replyCommentText = ref('')
        })
        const el = document.querySelector(`#comment-${pid}`)

        el.scrollIntoView({ behavior: 'auto' })
      }
    },

    async ReplyComment(
      replyUserId?: string,
      parentCommentId?: string,
      pIndexId?: number,
      cIndexId?: number,
      replyUserCommentId?: string,
      replyUserCommentName?: string
    ) {
      let text = null
      if (pIndexId !== undefined) {
        if (cIndexId !== undefined) {
          text = this.commentList[pIndexId].childComments[cIndexId].replyCommentText
        } else {
          text = this.commentList[pIndexId].replyCommentText
        }
      } else {
        text = this.replyCommentText
      }
      if (replyUserId === undefined) {
        replyUserId = this.field.user.id
      }
      if (text === '' || text === undefined) {
        warningMsg('评论内容不能为空')
        return
      }
      if (parentCommentId === undefined) {
        parentCommentId = '0'
      }
      let body: ReplyArticleCommentBody = {
        articleFieldId: this.field.id,
        parentCommentId,
        replyUserId,
        text,
        replyUserCommentId,
      }
      let { data: ReplyCommentRetData } = await useAxiosPostReplyArticleComment(body)
      if (ReplyCommentRetData.code === 0) {
        successMsg('评论成功')
        const userStore = useUserStore()
        ReplyCommentRetData.data.user.userInfo = userStore.userInfo
        ReplyCommentRetData.data.user.nickname = userStore.user.nickname
        ReplyCommentRetData.data.childComments = []
        if (pIndexId !== undefined) {
          if (cIndexId !== undefined) {
            this.commentList[pIndexId].childComments[cIndexId].replyCommentText = ''
            this.commentList[pIndexId].childComments.push(ReplyCommentRetData.data)
          } else {
            this.commentList[pIndexId].replyCommentText = ''
            this.commentList[pIndexId].childComments.unshift(ReplyCommentRetData.data)
          }
        } else {
          this.replyCommentText = ''
          this.commentList.unshift(ReplyCommentRetData.data)
        }

        //
        // if (pIndexId !== undefined) {
        //   if (cIndexId !== undefined) {
        //     // const time = new Date().getTime()
        //     // const userStore = useUserStore()
        //     // const t = `回复@${replyUserCommentName}：` + text
        //     // // clog(t)
        //     // let commentSerialNumber = 1
        //     // //todo 使用后端返回数据
        //     // const childComments = this.commentList[pIndexId].childComments
        //     // if (childComments.length > 0) {
        //     //   commentSerialNumber = childComments[childComments.length - 1].commentSerialNumber + 1
        //     // }
        //     // let newComment: CommentContent = {
        //     //   childCommentNum: 0,
        //     //   childCommentPage: 0,
        //     //   childCommentTotalPages: 0,
        //     //   childComments: undefined,
        //     //   createTime: time,
        //     //   deleted: false,
        //     //   downNum: 0,
        //     //   id: ReplyCommentRetData.data,
        //     //   lastModifiedTime: time,
        //     //   parentCommentId: parentCommentId,
        //     //   parentUser: replyUserId,
        //     //   parentUserId: replyUserId,
        //     //   replyCommentText: '',
        //     //   replyUserCommentId: replyUserCommentId,
        //     //   showCommentBox: false,
        //     //   text: t,
        //     //   ua: navigator.userAgent,
        //     //   upNum: 0,
        //     //   user: {
        //     //     following: false,
        //     //     id: userStore.user.id,
        //     //     nickname: userStore.user.nickname,
        //     //     level: userStore.userInfo.level,
        //     //   },
        //     //   commentSerialNumber,
        //     //   // replyCommentId: 1,
        //     //   userAction: undefined,
        //     // }
        //     this.commentList[pIndexId].childComments.push(ReplyCommentRetData.data)
        //   } else {
        //     this.commentList[pIndexId].childComments.unshift(ReplyCommentRetData.data)
        //   }
        // } else {
        //   this.commentList[pIndexId].unshift(ReplyCommentRetData.data)
        // }
      }
    },
    getCommentActionIcon(action: CommentType, pIndexId: number, cIndexId?: number) {
      if (cIndexId === undefined) {
        if (this.commentList[pIndexId].userAction === action) {
          if (action === CommentType.up) {
            return 'mdi-thumb-up'
          } else {
            return 'mdi-thumb-down'
          }
        } else {
          if (action === CommentType.up) {
            return 'mdi-thumb-up-outline'
          } else {
            return 'mdi-thumb-down-outline'
          }
        }
      } else {
        if (this.commentList[pIndexId].childComments[cIndexId].userAction === action) {
          if (action === CommentType.up) {
            return 'mdi-thumb-up'
          } else {
            return 'mdi-thumb-down'
          }
        } else {
          if (action === CommentType.up) {
            return 'mdi-thumb-up-outline'
          } else {
            return 'mdi-thumb-down-outline'
          }
        }
      }
    },
    getCommentActionColor(action: CommentType, pIndexId: number, cIndexId?: number) {
      if (cIndexId === undefined) {
        if (this.commentList[pIndexId].userAction === action) {
          return 'pink lighten-2'
        } else {
          return ''
        }
      } else {
        if (this.commentList[pIndexId].childComments[cIndexId].userAction === action) {
          return 'pink lighten-2'
        } else {
          return ''
        }
      }
    },
    async ActionComment(
      commentType: CommentType,
      cid: string,
      pIndexId: number,
      cIndexId?: number
    ) {
      let body: ArticleCommentAction = {
        actionCommentId: cid,
        articleFieldId: this.field.id,
        commentType: commentType,
      }
      clog(body)

      let { data: actionData } = await useAxiosPostActionArticleComment(body)
      if (actionData.code !== 0) {
        alert(actionData.msg)
        return
      }
      let retType: CommentType = actionData.data
      let pComment = this.commentList[pIndexId]
      if (cIndexId === undefined) {
        if (retType === CommentType.upToDown) {
          pComment.upNum--
          pComment.downNum++
          pComment.userAction = CommentType.down
          pComment.upNum = Math.max(pComment.upNum, 0)
          pComment.downNum = Math.max(pComment.downNum, 0)
          return
        }
        if (retType === CommentType.downToUp) {
          pComment.upNum++
          pComment.downNum--
          pComment.userAction = CommentType.up
          pComment.upNum = Math.max(pComment.upNum, 0)
          pComment.downNum = Math.max(pComment.downNum, 0)
          return
        }

        if (commentType === CommentType.up) {
          if (retType === CommentType.up) {
            pComment.upNum++
            pComment.userAction = CommentType.up
          }
          if (retType === CommentType.cancel) {
            pComment.upNum--
            pComment.userAction = CommentType.cancel
          }
          pComment.upNum = Math.max(pComment.upNum, 0)
          pComment.downNum = Math.max(pComment.downNum, 0)
          return
        }

        if (commentType === CommentType.down) {
          if (retType === CommentType.down) {
            pComment.downNum++
            pComment.userAction = CommentType.down
          }
          if (retType === CommentType.cancel) {
            pComment.downNum--
            pComment.userAction = CommentType.cancel
          }
          pComment.upNum = Math.max(pComment.upNum, 0)
          pComment.downNum = Math.max(pComment.downNum, 0)
          return
        }
      } else {
        let cComment = pComment.childComments[cIndexId]
        if (retType === CommentType.upToDown) {
          cComment.upNum--
          cComment.downNum++
          cComment.userAction = CommentType.down
          cComment.upNum = Math.max(cComment.upNum, 0)
          cComment.downNum = Math.max(cComment.downNum, 0)
          return
        }
        if (retType === CommentType.downToUp) {
          cComment.upNum++
          cComment.downNum--
          cComment.userAction = CommentType.up
          cComment.upNum = Math.max(cComment.upNum, 0)
          cComment.downNum = Math.max(cComment.downNum, 0)
          return
        }

        if (commentType === CommentType.up) {
          if (retType === CommentType.up) {
            cComment.upNum++
            cComment.userAction = CommentType.up
          }
          if (retType === CommentType.cancel) {
            cComment.upNum--
            cComment.userAction = CommentType.cancel
          }
          cComment.upNum = Math.max(cComment.upNum, 0)
          cComment.downNum = Math.max(cComment.downNum, 0)
          return
        }
        if (commentType === CommentType.down) {
          if (retType === CommentType.down) {
            cComment.downNum++
            cComment.userAction = CommentType.down
          }
          if (retType === CommentType.cancel) {
            cComment.downNum--
            cComment.userAction = CommentType.cancel
          }
          cComment.upNum = Math.max(cComment.upNum, 0)
          cComment.downNum = Math.max(cComment.downNum, 0)
          return
        }
      }
    },
    showCommentBox(pIndexId: number, cIndexId?: number) {
      if (cIndexId == undefined) {
        this.commentList[pIndexId].showCommentBox = !this.commentList[pIndexId].showCommentBox
        this.commentList.forEach((value, index) => {
          if (index !== pIndexId) {
            value.showCommentBox = false
            value.childComments.forEach((value1) => {
              value1.showCommentBox = false
            })
          }
          if (index === pIndexId) {
            value.childComments.forEach((value1, index1) => {
              if (index1 !== cIndexId) {
                value1.showCommentBox = false
              }
            })
          }
        })
      } else {
        this.commentList[pIndexId].childComments[cIndexId].showCommentBox =
          !this.commentList[pIndexId].childComments[cIndexId].showCommentBox
        this.commentList.forEach((value, index) => {
          if (index !== pIndexId) {
            value.showCommentBox = false
          }
          if (index === pIndexId) {
            value.showCommentBox = false
            value.childComments.forEach((value1, index1) => {
              if (index1 !== cIndexId) {
                value1.showCommentBox = false
              }
            })
          }
        })
      }
    },
    clickSelectCommentMenu(index: number) {
      this.selectCommentMenu = index
      switch (index) {
        case 0:
          this.loadComment(this.page, 'upNum', 'desc')
          break
        case 1:
          this.loadComment(this.page, 'createTime', 'asc')
          break
        case 2:
          this.loadComment(this.page, 'createTime', 'desc')
          break
      }
    },
    async deleteComment(articleId: string, commentId: string) {
      const { data: axiosResponse } = await useAxiosDeleteCommentById(articleId, commentId)
      if (axiosResponse.code === 0) {
        if (axiosResponse.data) {
          successMsg('删除成功')
        }
      } else {
        errorMsg(axiosResponse.msg)
      }
      // await
    },
  },
})

//--
interface UserInfo {
  id: string
  avatar: string
  sign: string
  gender: string
  birth: any
}

export interface CommentContent {
  id: string
  deleted: boolean
  createTime: number
  lastModifiedTime: number
  user: User
  text: string
  upNum: number
  downNum: number
  parentUserId: string
  parentCommentId: string
  replyUserCommentId: string
  parentUser: any
  childComments: CommentContent[]
  childCommentNum: number
  childCommentTotalPages: number
  childCommentPage: number
  ua: string
  showCommentBox: boolean
  userAction: CommentType
  replyCommentText: any
  loadMore?: boolean
  replyCommentId?: number
  commentSerialNumber?: number
  // fixme ref 2层不需要value然后极会报错 ？ 先用any了
}
