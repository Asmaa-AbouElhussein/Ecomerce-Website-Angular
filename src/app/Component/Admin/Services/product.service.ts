import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private url = environment.baseUrl + 'product/';

  constructor(private http: HttpClient) { }

  deleteProduct(id: any): any {
    return this.http.delete(this.url + 'deleteProduct/' + id);
  }
  

  addProduct(category: any) {
    return this.http.post(this.url + 'addProduct' , category);
  }

  updateProduct(category: any) {
    return this.http.post(this.url + 'updateProduct' , category);
  }
}
