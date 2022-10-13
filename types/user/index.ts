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