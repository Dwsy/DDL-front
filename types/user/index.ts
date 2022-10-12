interface userData {
    id: number;
    nickname: string;
    userInfo: {
        id: number;
        avatar: string;
        sign: string;
        gender: string;
        birth: number;
        level: number;
    };
    level: number;
    following: boolean;
}