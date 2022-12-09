import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../Models/iproduct';
import {map} from 'rxjs/operators';
import { productModel } from '../Models/productModel';
import { IPagination } from '../Models/pagination';
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl;
  private url = environment.apiUrl + 'product/';
filterByProductName = new Subject<any>();

  constructor( private httpclient:HttpClient) { }

  GetProduct():Observable<productModel>
  {
   return this.httpclient.get<productModel>(`${environment.baseUrl}Product/getProducts`);
  
  }

  GetProductByCatID(catID:number):Observable<productModel>
  {
    return this.httpclient.get<productModel>(`${environment.baseUrl}Product?getCategor=${catID}`);
  }

  GetProductID(id:number):Observable<productModel>
  {
      
    return this.httpclient.get<productModel>(`${environment.baseUrl}Product/getProduct/${id}`);
    
  }

 
  GetLatestProducts():Observable<Iproduct[]>
  {
   return this.httpclient.get<Iproduct[]>(`${environment.baseUrl}Product/getLatestProducts`);
  
  }
getproductpagination(pageNumber: number, pageSize: number,searchText:string){
  return this.httpclient.get<IPagination>(this.baseUrl + `product/getProducts?pageNo=${pageNumber}
  &pageSize=${pageSize}&searchText=${searchText}`)
 
}

deleteProduct(id: any): any {
  debugger
  return this.httpclient.delete(this.url + 'deleteProduct/' + id);
}
addProduct(category: any) {
  return this.httpclient.post(this.url + 'addProduct' , category);
}



updateProduct(category: any) {
  return this.httpclient.post(this.url + 'updateProduct' , category);
}
}
