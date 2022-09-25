import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {
    ArticleCommentAction,
    commentType,
    ReplyArticleCommentBody,
    useAxiosGetArticleComment,
    useAxiosPostActionArticleComment,
    useAxiosPostReplyArticleComment,
    useFetchGetArticleContent,
    useFetchGetArticleField
} from '~/composables/Api/article'
import {useRoute} from '#imports'


export const useArticleCommentStore = defineStore('ArticleCommentStore', {
    state: () => {
        return {
            // commentList: ref<CommentContent[]>(),
            commentList: [],
            loadingComment: true,
            aid: null,
            replyCommentText: '',
            field: null
        }
    },
    getters: {},
    actions: {
        async init(field) {
            this.field = field
            console.log('init')
            console.log(this.commentList)
            console.log('init')
            this.aid = useRoute().params.aid
            await this.loadComment()
        },
        async loadComment(properties?: string, order?, page?: number) {
            console.log('loadComment:', this.aid)
            this.loadingComment = true
            let params = {
                properties: properties,
                order: order,
                page: page
            }
            let {data: commentData} = await useAxiosGetArticleComment(this.aid, params)
            this.commentList = commentData.data.content
            for (let commentContent of this.commentList) {
                commentContent.replyCommentText = ref('')
                commentContent.childComments.forEach(childComment => {
                    childComment.replyCommentText = ref('')
                })
            }
            console.log(this.commentList)
            this.loadingComment = false
        },
        async ReplyComment(parentUserId?: number, parentCommentId?: number, pIndexId?: number, cIndexId?: number) {
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
            if (parentUserId === undefined) {
                parentUserId = this.field.user.id
            }
            if (text === '' || text === undefined) {
                alert('评论内容不能为空')
                return
            }
            if (parentCommentId === undefined) {
                parentCommentId = 0
            }
            let body: ReplyArticleCommentBody = {
                'articleFieldId': this.field.id,
                'parentCommentId': parentCommentId,
                'parentUserId': parentUserId,
                'text': text
            }
            let {data: ReplyCommentRetData} = await useAxiosPostReplyArticleComment(body)
            if (ReplyCommentRetData.code === 0) {
                alert('评论成功')
                if (pIndexId !== undefined) {
                    if (cIndexId !== undefined) {
                        this.commentList[pIndexId].childComments[cIndexId].replyCommentText = ''
                    } else {
                        this.commentList[pIndexId].replyCommentText = ''
                    }
                } else {
                    this.replyCommentText = ''
                }
                let {data: commentData} = await useAxiosGetArticleComment(this.aid)
                this.commentList = commentData.data.content
                console.log('articleCommentStore.commentList', this.commentList)
                //前端填充2或重新加载后端数据
                // let newComment: CommentContent = {
                //   id: 1,
                //   deleted: false,
                //   createTime: 1661527565280,
                //   lastModifiedTime: 1661527565280,
                //   user: {
                //     id: 3,
                //     nickname: 'Dwsy',
                //     userInfo: {
                //       id: 3,
                //       avatar: 'https://gravatar.loli.net/avatar//a0b7b30cbef507e1fad31e75c6a134ee?s=65&r=X&d=',
                //       sign: 'sign',
                //       gender: 'FMAIL',
                //       birth: null
                //     },
                //     level: 5
                //   },
                //   userAction: 0,
                //   text:text,
                //   upNum: 2,
                //   downNum: 6,
                //   parentUserId: 0,
                //   parentCommentId: 0,
                //   parentUser: null,
                //   childComments: [],
                //   ua: 'user-agent',
                //   showCommentBox: false,
                //   replyCommentText: ref('')
                // }
                // this.commentList.unshift(newComment)

            }
        },
        getCommentActionIcon(action: commentType, pIndexId: number, cIndexId?: number) {
            if (cIndexId === undefined) {
                if (this.commentList[pIndexId].userAction === action) {
                    if (action === commentType.up) {
                        return 'mdi-thumb-up'
                    } else {
                        return 'mdi-thumb-down'
                    }
                } else {
                    if (action === commentType.up) {
                        return 'mdi-thumb-up-outline'
                    } else {
                        return 'mdi-thumb-down-outline'
                    }
                }
            } else {
                if (this.commentList[pIndexId].childComments[cIndexId].userAction === action) {
                    if (action === commentType.up) {
                        return 'mdi-thumb-up'
                    } else {
                        return 'mdi-thumb-down'
                    }
                } else {
                    if (action === commentType.up) {
                        return 'mdi-thumb-up-outline'
                    } else {
                        return 'mdi-thumb-down-outline'
                    }
                }
            }

        },
        getCommentActionColor(action: commentType, pIndexId: number, cIndexId?: number) {
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
        async ActionComment(CommentType: commentType, cid: number, pIndexId: number, cIndexId?: number) {
            let body: ArticleCommentAction = {
                actionCommentId: cid,
                articleFieldId: this.field.id,
                commentType: CommentType,
            }
            console.log(body)

            let {data: actionData} = await useAxiosPostActionArticleComment(body)
            if (actionData.code !== 0) {
                alert(actionData.msg)
                return
            }
            let retType: commentType = actionData.data
            // switch (commentType) {
            //   case commentType.comment:
            //     break
            //   case commentType.comment_comment:
            //     break
            //   case commentType.up:
            //     break
            //   case commentType.down:
            //     break
            //   case commentType.cancel:
            //     break
            //   case commentType.upToDown:
            //     break
            //   case commentType.downToUp:
            //     break
            // }
            //todo 枚举判断替换成 switch 是不是好一点
            let pComment = this.commentList[pIndexId]
            if (cIndexId === undefined) {
                if (retType === commentType.upToDown) {
                    pComment.upNum--
                    pComment.downNum++
                    pComment.userAction = commentType.down
                    pComment.upNum = Math.max(pComment.upNum, 0)
                    pComment.downNum = Math.max(pComment.downNum, 0)
                    return
                }
                if (retType === commentType.downToUp) {
                    pComment.upNum++
                    pComment.downNum--
                    pComment.userAction = commentType.up
                    pComment.upNum = Math.max(pComment.upNum, 0)
                    pComment.downNum = Math.max(pComment.downNum, 0)
                    return
                }

                if (CommentType === commentType.up) {
                    if (retType === commentType.up) {
                        pComment.upNum++
                        pComment.userAction = commentType.up
                    }
                    if (retType === commentType.cancel) {
                        pComment.upNum--
                        pComment.userAction = commentType.cancel
                    }
                    pComment.upNum = Math.max(pComment.upNum, 0)
                    pComment.downNum = Math.max(pComment.downNum, 0)
                    return
                }

                if (CommentType === commentType.down) {
                    if (retType === commentType.down) {
                        pComment.downNum++
                        pComment.userAction = commentType.down
                    }
                    if (retType === commentType.cancel) {
                        pComment.downNum--
                        pComment.userAction = commentType.cancel
                    }
                    pComment.upNum = Math.max(pComment.upNum, 0)
                    pComment.downNum = Math.max(pComment.downNum, 0)
                    return
                }

            } else {
                let cComment = pComment.childComments[cIndexId]
                if (retType === commentType.upToDown) {
                    cComment.upNum--
                    cComment.downNum++
                    cComment.userAction = commentType.down
                    cComment.upNum = Math.max(cComment.upNum, 0)
                    cComment.downNum = Math.max(cComment.downNum, 0)
                    return
                }
                if (retType === commentType.downToUp) {
                    cComment.upNum++
                    cComment.downNum--
                    cComment.userAction = commentType.up
                    cComment.upNum = Math.max(cComment.upNum, 0)
                    cComment.downNum = Math.max(cComment.downNum, 0)
                    return
                }

                if (CommentType === commentType.up) {
                    if (retType === commentType.up) {
                        cComment.upNum++
                        cComment.userAction = commentType.up
                    }
                    if (retType === commentType.cancel) {
                        cComment.upNum--
                        cComment.userAction = commentType.cancel
                    }
                    cComment.upNum = Math.max(cComment.upNum, 0)
                    cComment.downNum = Math.max(cComment.downNum, 0)
                    return
                }
                if (CommentType === commentType.down) {
                    if (retType === commentType.down) {
                        cComment.downNum++
                        cComment.userAction = commentType.down
                    }
                    if (retType === commentType.cancel) {
                        cComment.downNum--
                        cComment.userAction = commentType.cancel
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
                        value.childComments.forEach(value1 => {
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
                this.commentList[pIndexId].childComments[cIndexId].showCommentBox = !this.commentList[pIndexId].childComments[cIndexId].showCommentBox
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
        }
    },

})


// interface Iarticle{
//     articleField:Ref<ArticleField>;
//     contentHtml:Ref<string>;
//     // commentList:Ref<CommentContent[]>;
// }

interface UserInfo {
    id: number;
    avatar: string;
    sign: string;
    gender: string;
    birth: any;
}

interface User {
    id: number;
    nickname: string;
    userInfo: UserInfo;
    level: number;
}

interface ArticleTags {
    id: number;
    name: string;
    articleNum: number;
    tagInfo: string;
}

interface ArticleGroup {
    id: number;
    name: string;
    info: string;
    articleNum: number;
}

interface ArticleField {
    id: number;
    createTime: number;
    lastModifiedTime: number;
    user: User;
    title: string;
    summary: string;
    articleState: string;
    allowComment: boolean;
    viewNum: number;
    collectNum: number;
    upNum: number;
    downNum: number;
    banner: string;
    articleTags: ArticleTags;
    articleGroup: ArticleGroup;
}

//--
interface UserInfo {
    id: number;
    avatar: string;
    sign: string;
    gender: string;
    birth: any;
}


export interface CommentContent {
    id: number;
    deleted: boolean;
    createTime: number;
    lastModifiedTime: number;
    user: User;
    text: string;
    upNum: number;
    downNum: number;
    parentUserId: number;
    parentCommentId: number;
    parentUser: any;
    childComments: CommentContent[];
    ua: string;
    showCommentBox: boolean;
    userAction: commentType;
    replyCommentText: any
    // fixme ref 2层不需要value然后极会报错 ？ 先用any了
}