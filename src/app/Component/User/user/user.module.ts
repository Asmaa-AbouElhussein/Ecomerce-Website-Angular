import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './component/Baskets/basket/basket.component';
import { OrderDetailsComponent } from './component/Orders/order-details/order-details.component';
import { OrderListComponent } from './component/Orders/order-list/order-list.component';
import { ProductDetailsComponent } from './component/Products/product-details/product-details.component';
import { RegisterComponent } from './component/account/register/register.component';
import { UserprofileComponent } from './component/account/userprofile/userprofile.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/account/login/login.component';
import { CartComponent } from './component/Baskets/cart/cart.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CheckSuccesComponent } from './component/check-succes/check-succes.component';
import { AuthGuard } from '../../Shared/Gaurds/auth.guard';
import { NavBarComponent } from './component/Home/nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './component/Home/section-header/section-header.component';
import { FooterComponent } from './component/Home/footer/footer.component';
import { ShopComponent } from './component/Shop/shop/shop.component';
import { HomeComponent } from './component/Home/home/home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagerComponent } from './component/Home/pager/pager.component';
import { SpinnerComponent } from './component/Shared/spinner/spinner.component';
import { ProductComponent } from './component/Products/product/product.component';
import { SliderComponent } from './component/Home/slider/slider.component';
import { FeaturedProductComponent } from './component/Products/featured-product/featured-product.component';
import { CategoryComponent } from './component/Categorys/category/category.component';
import { CheckSuccesComponent } from './component/check-succes/check-succes.component';
import { MainlayoutComponent } from './component/mainlayout/mainlayout.component';
const routes: Routes = [
  
  {path: 'basket', component:BasketComponent},
  {path: 'CheckSuccesComponent', component:CheckSuccesComponent,canActivate:[AuthGuard]},
  {path: 'productdetails/:id', component:ProductDetailsComponent},
  {path:  'cart', component:CartComponent},
  {path:  'contactUs', component:ContactUsComponent},
  {path:  'order-list', component:OrderListComponent},
  {path:  'shop', component:ShopComponent},
  {path:  'loginUser', component:LoginComponent},
  {path:  'register', component:RegisterComponent},
  {path:  'home', component:HomeComponent},
  
];


@NgModule({
  declarations: [
    BasketComponent,
    SectionHeaderComponent,
    ShopComponent,
    OrderDetailsComponent,
    OrderListComponent,
    ProductDetailsComponent,
    RegisterComponent,
    UserprofileComponent,
    LoginComponent,
    CartComponent,
    ContactUsComponent,
    CheckSuccesComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    PagerComponent,
    SpinnerComponent,
    ProductComponent,
    SliderComponent,
    FeaturedProductComponent,
    CategoryComponent,
    MainlayoutComponent
  ],
  imports: [
  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
   RouterModule.forChild(routes)
    
  ],
  exports:[
    NavBarComponent,
    SectionHeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent
   
  ],
 
})
export class UserModule { }
