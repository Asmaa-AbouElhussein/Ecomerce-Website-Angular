import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchModel } from '../Models/search';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiUrl + 'order/';

  constructor(private http: HttpClient) { }

  getOrders(): any {
    debugger
    return this.http.get(this.url + 'getOrders');
  }

  getOrderItems(orderId: number): any {
    debugger
    return this.http.get(this.url + 'getOrderItems/'+orderId);
  }
}
