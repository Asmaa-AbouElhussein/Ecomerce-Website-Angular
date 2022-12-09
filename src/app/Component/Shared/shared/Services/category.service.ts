import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Icategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.apiUrl + 'category/';

  constructor(private httpClient:HttpClient) { }

  
GetAllCategories():Observable<Icategory[]>
{
  return this.httpClient.get<Icategory[]>(`${environment.baseUrl}category/getAllCategories`);
}

GetCategoryByID(id:number):Observable<Icategory>
{
  return this.httpClient.get<Icategory>(`${environment.baseUrl}Category/getCategor/${id}`);
  
}



addCategory(category: any) {
  return this.httpClient.post(this.url + 'addCategory' , category);
}

updateCategory(category: any) {
  debugger
  return this.httpClient.post(this.url + 'updateCategory' , category);
}
deleteCategory(id: any): any {
  debugger
  return this.httpClient.delete(this.url + 'deleteCategor/' + id);
}
}
