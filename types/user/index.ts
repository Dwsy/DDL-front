export interface userData {
    id: string
    nickname: string
    userInfo: {
        id: string
        avatar: string
        sign: string
        gender: string
        birth: number
        level: number
    }
    level: number
    following: boolean
    createTime: number
}

export interface UserInfo {
    avatarNew?: string
    id: string
    avatar: string
    sign: string
    gender: string
    birth?: any
}


interface QaGroup {
    id: string
    name: string
    info: string
}

interface UserTags {
    id: string
    name: string
    useNum: number
    weight: any
    indexPageDisplay: boolean
    tagInfo: string
    qaGroup: QaGroup
}


export interface User {
    id: string
    nickname: string
    userTags: UserTags[]
    userInfo: UserInfo
    level: number
    following: boolean
}

