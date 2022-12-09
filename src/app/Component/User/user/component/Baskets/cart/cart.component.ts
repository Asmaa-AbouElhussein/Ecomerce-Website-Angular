import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Basket, IBasket } from 'src/app/Component/User/user/Models/basket';
import { Iproduct } from 'src/app/Component/Shared/shared/Models/iproduct';
import { BasketService } from 'src/app/Component/User/user/Services/basket.service';
import { ProductService } from 'src/app/Component/Shared/shared/Services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  imageUrl = environment.imagesUrl + "Images/Products/";
  recevedTotalPrice: number = 0;
  product!: Iproduct;
  ProductID: any
  basketItems!: IBasket;
  countCart!: IBasket
  cartItem: number = 0;
  @Output() onTotalPriceChange: EventEmitter<number>
  constructor(private basketService: BasketService, private productService: ProductService) {
    this.onTotalPriceChange = new EventEmitter<number>();
  }

  ngOnChanges(changes: SimpleChanges): void { }
  ngOnInit(): void {

    this.getBasketItems()
  }
  countItemsInCart() {

    if ('cart' in localStorage) {

      this.countCart = JSON.parse(localStorage.getItem('cart')!)
      this.cartItem = this.countCart.items.length;
      this.basketService.cartSubject.next(this.cartItem);
    }
  }

  getBasketItems() {
    if ('cart' in localStorage) {
      this.basketItems = JSON.parse(localStorage.getItem('cart')!)
      this.basketTotalPrice();
    }
  }

  basketTotalPrice() {
    this.recevedTotalPrice = 0;
    for (var item in this.basketItems.items) {
      this.recevedTotalPrice += this.basketItems.items[item].price * this.basketItems.items[item].quantity
      this.onTotalPriceChange.emit(this.recevedTotalPrice);
    }
  }

  removeBasketItem(index: number) {

    this.basketItems.items.splice(index, 1);
    this.basketTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.basketItems))
    this.countItemsInCart()
  }

  clearBasket() {
    this.basketItems.items = [];
    localStorage.setItem('cart', JSON.stringify(this.basketItems))
    this.basketTotalPrice();
    this.countItemsInCart()
  }


  decrementQuantity(index: number) {
    if (this.basketItems.items[index].quantity > 1) {
      this.basketItems.items[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.basketItems))
      this.basketTotalPrice();
    }

  }

  incrementQuantity(index: number) {

    this.checkProductQtyAva(index)
  }

  setItemInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.basketItems))
  }

  checkProductQtyAva(index: number) {
    this.productService.GetProductID(this.basketItems.items[index].productId)
      .subscribe(res => {
        this.ProductID = res
        this.ProductID.quantity = this.basketItems.items[index].quantity;

        this.basketService.checkProductQtyAva(this.ProductID, this.basketItems.items[index].quantity + 1)
          .subscribe((response: any) => {

            if (response.message == "Quantity not available in stock" && response.status == false) {
              alert("Quantity not available in stock");
            }
            if (response.message == "Quantity request greater than in stock" && response.status == false) {
              alert("Quantity request greater than in stock");
            }
            if (response.message == "Quantity available" && response.status == true) {

              this.basketItems.items[index].quantity++;
              this.setItemInLocalStorage()
              this.basketTotalPrice();
            }

          });

      });


  }

}
