export interface ResponseData<D> {
  code: number
  msg: string
  data: D
}

export interface ResponsePageData<D> {
  code: number
  msg: string
  data: PageData<D>
}

export interface PageData<D>{
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  empty: boolean;
  content: D[];
}