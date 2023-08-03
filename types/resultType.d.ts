export interface BasicResult<T> {
  code: number;
  msg: string;
  status: string;
  total?: number;
  data: T;
}
