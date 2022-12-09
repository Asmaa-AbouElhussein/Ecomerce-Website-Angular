export interface SearchModel
{
  pageNo: number;
  pageSize: number;
  dateFrom: Date ;
  dateTo: Date ;
}   
  
export class CommonSearchModel
{
  public searchText: string = "";
} 
