interface userData {
    id: string;
    nickname: string;
    userInfo: {
        id: string;
        avatar: string;
        sign: string;
        gender: string;
        birth: number;
        level: number;
    };
    level: number;
    following: boolean;
}

export interface UserInfo {
    avatarNew?: string
    id: string;
    avatar: string;
    sign: string;
    gender: string;
    birth?: any;
}

export interface User {
    id: string;
    nickname: string;
    userInfo: UserInfo;
    level: number;
}