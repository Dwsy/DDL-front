export interface ResponseData<D> {
  code: number;
  msg: string;
  data: D;
}
