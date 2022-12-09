import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboartComponent } from './dashboart/dashboart.component';
import { MyprofileComponent } from './My Profile/myprofile/myprofile.component';
import { ProductComponent } from './dashboart/product/product.component';
import { OrderComponent } from './dashboart/order/order.component';
import { UserComponent } from './dashboart/user/user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoryComponent } from './dashboart/category/category.component';
import { LoginComponent } from './My Profile/login/login.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    DashboartComponent,
    MyprofileComponent,
    ProductComponent,
    OrderComponent,
    UserComponent,
    CategoryComponent,
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class AdminModule { }
