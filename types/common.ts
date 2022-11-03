export interface PageParam {
    properties?: string,
    order?: string,
    size?: number,
    page?: number
}


export interface PageData<C> {
    first: boolean;
    last: boolean;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    pageNumber: number;
    empty: boolean;
    content: C;
}



