import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Iproduct } from '../../../../../Shared/shared/Models/iproduct';
import { productModel } from '../../../../../Shared/shared/Models/productModel';
import { Size } from '../../../Models/size';
import { ProductService } from '../../../../../Shared/shared/Services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {
  ProductName: any
  ProductList!: Iproduct[];
  productListOfCat: Iproduct[] = [];
  ProductID: any;
  @Input() resevedcategory!: string;
  @Input() resevedSortProductByPrice: any;
  @Output() sendproduct: EventEmitter<any> = new EventEmitter();
  defaultSize: Size[] = [];
  image = environment.imagesUrl + "Images/Products/";
  defImage = "../../../../../assets/img/No_Image_Available.jpg";
  constructor(private service: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.resevedcategory === '') {
      this.productListOfCat = this.ProductList;
    }
    else {
      this.productListOfCat = this.ProductList.filter(res => res.category === this.resevedcategory);
    }

    this.productListOfCat = this.resevedSortProductByPrice;
  }


  ngOnInit(): void {

    this.getProducts();
    this.service.filterByProductName.subscribe((res) => {
      this.ProductName = res

    })
  }


  sortPrice() {
    this.productListOfCat = this.resevedSortProductByPrice;
  }

  getProducts() {
    this.service.GetProduct().subscribe(response => {
      this.ProductList = response.data;
      this.productListOfCat = response.data;
    });
  }

  getPrdByID(id: number) {
    this.service.GetProductID(id).subscribe(response => {
      this.ProductID = response.data;

    });

  }
  addItemToBasket(obj: any) {
    this.sendproduct.emit(obj);
  }

}
