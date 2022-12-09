import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Iproduct } from 'src/app/Component/Shared/shared/Models/iproduct';
import { productModel } from 'src/app/Component/Shared/shared/Models/productModel';
import { BasketService } from 'src/app/Component/User/user/Services/basket.service';
import { ProductService } from 'src/app/Component/Shared/shared/Services/product.service';
import { environment } from 'src/environments/environment';
import { Basket, BasketLis, IBasket } from 'src/app/Component/User/user/Models/basket';
import { Size } from 'src/app/Component/User/user/Models/size';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Iproduct;
  productdetails: any;
  id: any;
  countCart!: IBasket;
  cartItem: number = 0;
  image = environment.imagesUrl + "Images/Products/";
  basketItems!: IBasket;
  quantity = 1;
  index: any;
  ProductObjDetails: any;
  cartItems: number = 0;
  productItem!: Basket;
  constructor(private router: Router, private productService: ProductService,
    private basketService: BasketService,
    private activateRoute: ActivatedRoute,
    private toaster: ToastrService) { }

  ngOnChanges(): void {

  }
  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe({
      next: (pramas: ParamMap) => { this.id = pramas.get("id"); },
      error: (err) => { throw new Error(err) }
    })

    this.getProductDetails()

  }

  getProductDetails() {
    this.productService.GetProductID(this.id).subscribe(res => {
      this.productdetails = res
      this.product = this.productdetails
      this.ProductObjDetails = this.productdetails;
    });
  }


  countItemsInCart() {

    if ('cart' in localStorage) {

      this.countCart = JSON.parse(localStorage.getItem('cart')!)
      this.cartItem = this.countCart.items.length;
      this.basketService.cartSubject.next(this.cartItem);
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }

  }

  incrementQuantity() {
    this.quantity++;
  }


  checkProductQtyAva() {

    this.basketService.checkProductQtyAva(this.product, this.quantity)
      .subscribe((response: any) => {

        if (response.message == "Quantity not available in stock" && response.status == false) {
          alert("Quantity not available in stock");
          
        }
        if (response.message == "Quantity request greater than in stock" && response.status == false) {
          alert("Quantity request greater than in stock");
        }
        if (response.message == "Quantity available" && response.status == true) {
          this.addItemToCart()
          this.countItemsInCart();

        }

      });

  }
  incrementQtyORoutStockInBasket() {
    if (this.basketItems.items[this.index].quantity + this.quantity <= this.ProductObjDetails.quantity) {
      this.basketItems.items[this.index].quantity += this.quantity;
      localStorage.setItem('cart', JSON.stringify(this.basketItems))
      // alert("Product added in your basket");
      this.toaster.success("Product added in your basket");
    }
    else {
      // alert("Quantity request greater than in stock");
      this.toaster.error("Quantity request greater than in stock");
    }
  }

  isItemExestInBasket() {
    let isExist = this.basketItems.items.find(item => item.productId == this.product.id)

    if (isExist) {

      this.index = this.basketItems.items.findIndex(item => item.productId === this.product.id);
      this.incrementQtyORoutStockInBasket()
    }
    else {
      this.product.quantity = this.quantity;
      this.basketItems.items.push(this.productItem)
      localStorage.setItem('cart', JSON.stringify(this.basketItems))
      // alert("Product added in your basket");
      this.toaster.success("Product added in your basket");
    }

  }

  addItemToCart() {

    this.productItem = this.basketService.mapPRoductItemToBasketItems(this.product, this.quantity)
    if ('cart' in localStorage) {
      this.basketItems = JSON.parse(localStorage.getItem('cart')!)
      this.isItemExestInBasket()
    }
    else {
      this.product.quantity = this.quantity;
      this.basketItems = this.basketService.createBasket()
      this.basketItems.items.push(this.productItem)

      localStorage.setItem('cart', JSON.stringify(this.basketItems))
      this.toaster.success("Product added in your basket");
      // alert("Product added in your basket");
      this.basketService.cartSubject.next(this.cartItem);

    }
  }

}

