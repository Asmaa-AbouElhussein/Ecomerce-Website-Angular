import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './Component/Shared/shared/shared.module';
import { AdminModule } from './Component/Admin/component/admin/admin.module';
import { AdminRoutingModule } from './Component/Admin/component/admin/admin-routing.module';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService } from './Component/User/user/Services/account.service';
import { TokenInterceptor } from './Component/Shared/shared/Interseptor/token.interceptor';
import { LoadingInterceptor } from './Component/Shared/shared/Interseptor/loading.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserModule } from './Component/User/user/user.module';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    UserModule,
    AdminRoutingModule,
    FormsModule,
   CommonModule,
   ReactiveFormsModule,
   Ng2SearchPipeModule,
   NgxPaginationModule,
   ToastrModule
  ],
  providers: [
    AccountService , 
    { provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},

  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
