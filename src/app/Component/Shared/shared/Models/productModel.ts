import { Iproduct } from "./iproduct";

export interface productModel {
  count:number;
  data:Iproduct[];
  pageIndex:number;
  pageSize:number;
}