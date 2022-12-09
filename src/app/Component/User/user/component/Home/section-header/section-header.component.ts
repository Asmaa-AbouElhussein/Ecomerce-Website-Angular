import { Component, OnInit,OnChanges } from '@angular/core';
import { Iproduct } from '../../../../../Shared/shared/Models/iproduct';
import { BasketService } from '../../../Services/basket.service';
import { Observable, Subject } from 'rxjs';
import { CategoryService } from '../../../../../Shared/shared/Services/category.service';
import { ProductService } from '../../../../../Shared/shared/Services/product.service';
import { AccountService } from '../../../Services/account.service';
import { IBasket } from '../../../Models/basket';
import { Login } from '../../../Models/login';
import { IUser } from 'src/app/Component/User/user/Models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
   countCart:any;   
   cartItem:number=0;
   productList:Iproduct[]=[]
   isUserLogged:boolean=false;
  currentUser!:IUser;
  ProductName:any
  constructor(private basketService:BasketService, 
    private productservice:ProductService,
    private accountservice:AccountService,
    private router: Router) { 
    debugger
    this.basketService.cartSubject.subscribe((data)=>{
      this.cartItem=data;
   })
  
  }
 
  ngOnInit(): void {
    debugger
  

   this.accountservice.getCurrentUser().subscribe((res:any)=>{
    this.currentUser=res
   
    })

     this.cartItem= this.basketService.cartItemNumber() ;
    this.accountservice.getloggedStatus().subscribe(status =>{
    this.isUserLogged=status;
    })
   
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }


  filterProductName(){
    this.productservice.filterByProductName.next(this.ProductName);
 
  }
}
