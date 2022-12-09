import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, IBasket } from '../../../Models/basket';
import { Icategory } from '../../../../../Shared/shared/Models/icategory';
import { Iproduct } from '../../../../../Shared/shared/Models/iproduct';
import { productModel } from '../../../../../Shared/shared/Models/productModel';
import { BasketService } from '../../../Services/basket.service';
import { CategoryService } from '../../../../../Shared/shared/Services/category.service';
import { ProductService } from '../../../../../Shared/shared/Services/product.service';
import { ShopParams } from 'src/app/Component/Shared/shared/Models/shop-params';
// import { ShopService } from '../../../../../Shared/shared/Services/shop.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  categoryList: Icategory[] = [];
  categoryName!: string;
  isexist!: any;
  ProductList!: Iproduct[];
  sortProductPrice: any;
  basketItems!: IBasket;
  quantity = 1;
  index: any;
  basketList!: Basket;
  ProductObj: any
  // public cartItemList = new BehaviorSubject<any>([]);
  countCart!: IBasket
  cartItem: number = 0;
  shopParams: ShopParams | undefined;

  constructor(private categoryservice: CategoryService,
    //  private shopService: ShopService,
    private productservice: ProductService,
    private basketService: BasketService
  ) { }



  ngOnInit(): void {
    this.getAllCategory()


  }
  getAllCategory() {
    this.categoryservice.GetAllCategories().subscribe(cat => {
      this.categoryList = cat;
    });
  }

  onCategorySelected(name: string) {
    this.categoryName = name;

  }
  sortProductByPrice(option: any) {
  }
  countItemsInCart() {

    if ('cart' in localStorage) {

      this.countCart = JSON.parse(localStorage.getItem('cart')!)
      this.cartItem = this.countCart.items.length;
      this.basketService.cartSubject.next(this.cartItem);
    }
  }

  addtocart(event: any) {

    this.basketList = this.basketService.mapPRoductItemToBasketItems(event, 1)

    if ('cart' in localStorage) {
      debugger
      this.basketItems = JSON.parse(localStorage.getItem('cart')!)
      this.isexist = this.basketItems.items.find(item => item.productId == this.basketList.productId)

      if (this.isexist) {
        this.index = this.basketItems.items.findIndex(item => item.productId === this.isexist.productId);
        if (this.basketItems.items[this.index].quantity + 1 <= event.quantity) {
          this.basketItems.items[this.index].quantity += 1;
          localStorage.setItem('cart', JSON.stringify(this.basketItems))
          alert("Product added in your basket");
        }
        else {
          alert("Quantity request greater than in stock");
        }
      }
      else {
        event.quantity = 1;
        this.basketItems.items.push(this.basketList)
        localStorage.setItem('cart', JSON.stringify(this.basketItems))
        alert("Product added in your basket");
      }

    }
    else {
      event.quantity = 1;
      this.basketItems = this.basketService.createBasket()
      this.basketItems.items.push(this.basketList)
      localStorage.setItem('cart', JSON.stringify(this.basketItems))
      alert("Product added in your basket");

    }

    this.countItemsInCart()
  }
}



