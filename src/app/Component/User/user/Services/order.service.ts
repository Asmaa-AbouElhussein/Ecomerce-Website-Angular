import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iorder } from '../Models/iorder';
import { IOrderToCreate } from '../Models/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.baseUrl;
  constructor(private httpclient:HttpClient) { }

  getOrders(){
    return this.httpclient.get<any[]>(this.baseUrl + 'order/getOrdersForCurrentUser');
  }

  getOrderDetails(orderId: number){
    return this.httpclient.get<Iorder>(this.baseUrl + 'order/getOrderDetails/'+ orderId);
  }

 
  createOrder(order: IOrderToCreate)
  {
    debugger
   
    return this.httpclient.post(this.baseUrl + 'order/createOrder', order,);
  }


}
