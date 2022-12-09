import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../../../../../Shared/shared/Models/iproduct';
import { productModel } from '../../../../../Shared/shared/Models/productModel';
import { ProductService } from '../../../../../Shared/shared/Services/product.service';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit {
  ProductList!:Iproduct[];
image = environment.imagesUrl + "Images/Products/";

  constructor(private productservice:ProductService){ }

  ngOnInit(): void {

      this.getLatestProduct();
  }
  getLatestProduct()
  { 
    this.productservice.GetLatestProducts().subscribe(res=>{
    this.ProductList = res;
   
  });
}
}