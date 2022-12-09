// export interface Pagination {
    import { Iproduct } from "./iproduct";

    export interface IPagination {
        pageIndex: number;
        pageSize:  number;
        count:     number;
        data:      Iproduct[];
    }
    
    export class Pagination implements IPagination {
        pageIndex: number=0;
        pageSize: number=0;
        count: number =0;
        data: Iproduct[] = [];
    }
// }
