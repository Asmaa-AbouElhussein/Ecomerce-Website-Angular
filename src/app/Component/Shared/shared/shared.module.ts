import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FooterComponent } from '../../User/user/component/Home/footer/footer.component';
// import { NavBarComponent } from '../../User/user/component/Home/nav-bar/nav-bar.component';
// import { NotFoundComponent } from '../../User/user/component/Shared/not-found/not-found.component';
// import { SectionHeaderComponent } from '../../User/user/component/Home/section-header/section-header.component';

// import { SliderComponent } from '../../User/user/component/Home/slider/slider.component';
// import { FeaturedProductComponent } from '../../User/user/component/Products/featured-product/featured-product.component';
// import { HomeComponent } from '../../User/user/component/Home/home/home.component';
// import { CategoryComponent } from '../../User/user/component/Categorys/category/category.component';
// import { ProductComponent } from '../../User/user/component/Products/product/product.component';
import { RouterModule, Routes } from '@angular/router';
// import { ShopComponent } from '../../User/user/component/Shop/shop/shop.component';
// import { PagerComponent } from '../../User/user/component/Home/pager/pager.component';
// import { SpinnerComponent } from '../../User/user/component/Shared/spinner/spinner.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../User/user/Services/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Interseptor/token.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


// import { HttpClientModule } from '@angular/common/http';
// const routes: Routes = [
  
//   {path: 'product', component:ProductComponent },
//   {path: 'shop', component:ShopComponent },
  
   


// ];
//shared/product
@NgModule({
  declarations: [
   
    // FooterComponent,
    // NavBarComponent,
    // NotFoundComponent,
    // SectionHeaderComponent,
    // SliderComponent,
    // FeaturedProductComponent,
    // HomeComponent,
    // CategoryComponent,
    // ProductComponent,
    // ShopComponent,
    // PagerComponent,
    // SpinnerComponent,
  
   
  
 
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule

  //  HttpClientModule
   
  ],
  exports:[
    // NavBarComponent,
    // SectionHeaderComponent,
    // FooterComponent,
    // HomeComponent,
    // ShopComponent
   
  ],
 

})
export class SharedModule { }
