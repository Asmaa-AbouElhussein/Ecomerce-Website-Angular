import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboartComponent } from './dashboart/dashboart.component';
import { MyprofileComponent } from './My Profile/myprofile/myprofile.component';
import { ProductComponent } from './dashboart/product/product.component';
import { OrderComponent } from './dashboart/order/order.component';
import { UserComponent } from './dashboart/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Component/Shared/Gaurds/auth.guard';
import { LoginComponent } from './My Profile/login/login.component';
import { CategoryComponent } from './dashboart/category/category.component';

const routes: Routes = [

    { path:'Dashboart' ,component: DashboartComponent,
         canActivate: [AuthGuard],
         runGuardsAndResolvers: 'always',    
        children:
        [ 
            {path: 'category', component:CategoryComponent},
            {path: 'order', component: OrderComponent},
            {path: 'userview', component:UserComponent },
            {path: 'addproduct', component:ProductComponent },
            {path: 'myprofileadmin', component:MyprofileComponent },
        ]
    },     
        {path: '', component:CategoryComponent},
        {path: '**', component:CategoryComponent},
        // {path: '', component:CategoryComponent},
  ];



@NgModule({
  declarations: [

  ],
  imports: [
  
    RouterModule.forChild(routes)
  ],
  exports: [
    
    RouterModule
  ]
})
export class AdminRoutingModule { }
