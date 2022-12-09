import { Component, OnInit } from '@angular/core';
import { SearchModel } from 'src/app/Component/Admin/Models/search';
import { OrderService } from 'src/app/Component/Admin/Services/order.service';
import { Iorder } from 'src/app/Component/User/user/Models/iorder';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  searchModel!: SearchModel;
  orderDetails!: Iorder
  ModalTitle!: string;
  order: any;
  ActivateAddandEdit: boolean = false;
  imageUrl = environment.imagesUrl + "Images/Products/";

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrderItems(id: any) {
    debugger
    this.orderService.getOrderItems(id).subscribe((res: Iorder) => {
      this.orderDetails = res

    })


    this.ActivateAddandEdit = true;
    this.ModalTitle = "details";
  }

  getOrders() {

    debugger
    this.orderService.getOrders()
      .subscribe((response: any) => {
        this.order = response;

      });

  }
  closeClick() {
    this.ActivateAddandEdit = false;

  }
}