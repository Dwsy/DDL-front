export interface CreateArticleBody {
    allowComment: boolean;
    articleGroupId: string;
    articleId?: string;
    articleState: ArticleState;
    articleTagIds: string[];
    banner: string;
    content: string;
    summary: string;
    title: string;
    articleSource: ArticleSource;
    articleSourceUrl?: string;
}

export enum ArticleState {
    draft = ('draft'),
    open = ('open'),
    hide = ('hide'),
}

export enum ArticleSource {
    original = ('original'),
    reprint = ('reprint'),
    translation = ('translation'),
}

