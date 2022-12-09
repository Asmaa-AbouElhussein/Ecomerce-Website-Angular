import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/Component/Admin/Services/file-upload.service';
import { Icategory } from 'src/app/Component/Shared/shared/Models/icategory';
// import { ProductService } from 'src/app/Component/Admin/Services/product.service';
import { Iproduct, Product } from 'src/app/Component/Shared/shared/Models/iproduct';
import { productModel } from 'src/app/Component/Shared/shared/Models/productModel';
import { CategoryService } from 'src/app/Component/Shared/shared/Services/category.service';
import { ProductService } from 'src/app/Component/Shared/shared/Services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  defImage: string = "DefualtImage.png";

  @Input() ProductName: any
  products: any
  id: number = 0;
  ModalTitle: string = "";
  imageUrl = environment.imagesUrl + 'Images/Products/';
  productForm!: FormGroup;
  proId: number = 0;
  ActivateAddandEdit: boolean = false;
  modalTitle!: string;
  buttonTitle!: string;
  categoryForm!: FormGroup;
  productDetails: any
  product!: any;
  imageName: string = "";
  imageAddEdit!: string;
  category: any;
  categoryList: any;
  imgToUpload!: File;
  imgToUploadFile!: File | null;
  fileRequired!: boolean;
  productObject: any;
  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private productservice: ProductService,
    private categoryservice: CategoryService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {

    this.getProducts()
    this.getAllCategorys()
    this.creatwProductForm()

  }

  getProducts() {
    this.productService.GetProduct().subscribe(res => {
      this.products = res.data
    });
  }

  getAllCategorys() {
    this.categoryservice.GetAllCategories().subscribe(res => {
      this.categoryList = res

    })

  }

  getProductDetails(id: number) {
    this.productService.GetProductID(id).subscribe((res) => {
      this.productDetails = res
    });
    this.ActivateAddandEdit = true;
    this.ModalTitle = "details";
  }

  uploadProductImage(file: any) {

    this.fileUploadService.postFile(file.target.files[0], "Images")
      .subscribe((imageResult) => {

        this.imageName = imageResult;
        this.showImage();
        this.fileRequired = false;
      });
    () => {
      alert("Error in upload image");
    }
  }

  showImage() {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageAddEdit = event.target.result;
    }
    reader.readAsDataURL(this.imgToUpload);
  }

  getProductForEdit(id: any) {

    this.buttonTitle = "Update";
    this.modalTitle = "Update product"

    this.productObject = this.products.find((p: any) => p.id == id);

    Object.entries(this.productObject).filter(([_, v]) => Array.isArray(v))
      .map((kv) => this.createFormArrays(kv, this.productForm));
    this.productForm.patchValue(this.productObject);

    if (this.productObject.pictureUrl != "") {
      this.imageName = this.productObject.pictureUrl;
    }

    this.product = new Product();


  }

  createFormArrays = ([k, v]: any, form: FormGroup) => {
    if (form.contains(k)) {
      form.controls[k] =
        new FormArray(this.createFormArray(v as []));
    }
  }

  createFormArray = (data: any[]) =>
    data.map(c => (
      new FormGroup(Object.entries(c)
        .reduce((acc: any, [key, value]) => {
          acc[key] = new FormControl(value)
          return acc;
        }, {}))
    ))

  onSubmit(product: any) {

    console.log(product)
    if (product.id == 0 || product.id == null) {
      if (this.imageName == "DefualtImage.png" || this.imageName == "") {
        this.imageName = "";
        return;
      }

      this.product = new Product();
      this.product.id = 0;
      this.product.name = product.name;
      this.product.categoryId = product.categoryId;
      this.product.quantity = product.quantity;
      this.product.value = product.value;
      this.product.price = product.price;
      this.product.description = product.description;
      this.product.pictureUrl = this.imageName;

      this.productService.addProduct(this.product)
        .subscribe(() => {

          alert("Added successfully");
          this.closeClick();
          this.product = new Product();
          this.imageName = "";
          this.imageAddEdit = "../../../assets/users/NoImage.jpg";

        });
    }
    else {
      if (this.imageName == "DefualtImage.png" || this.imageName == "") {
        this.imageName = "DefualtImage.png";
      }

      this.product.id = product.id;
      this.product.name = product.name;
      this.product.categoryId = product.categoryId;
      this.product.quantity = product.quantity;
      this.product.price = product.price;
      this.product.value = product.value;
      this.product.description = product.description;
      this.product.pictureUrl = this.imageName;
      this.productService.updateProduct(this.product)
        .subscribe(() => {
          alert("Updated successfully");
          this.closeClick();
          this.product = new Product();
          this.imageAddEdit = "../../../assets/users/NoImage.jpg";
        });

    }
  }

  creatwProductForm() {
    this.productForm = this.fb.group({
      id: [0],
      name: [, [Validators.required]],
      categoryId: [, [Validators.required, Validators.min(1)]],
      price: [, [Validators.required]],
      quantity: [, [Validators.required]],
      description: [""],
      value: [""],

    });

  }

  closeClick() {
    this.ActivateAddandEdit = false;
    this.refreshdata();
  }

  addproduct() {
    debugger
    this.category = {
      id: 0,
      name: "",
      products: []
    }
    this.ModalTitle = "Add product";
    this.ActivateAddandEdit = true;
  }

  refreshdata() {
    this.productService.GetProduct().subscribe(res => {
      this.products = res.data
      //  console.log(this.products)
    })
    this.creatwProductForm();
  }

  deleteProduct(id: any) {
    debugger

    this.productservice.deleteProduct(id)
      .subscribe((response: any) => {

        if (response == true) {
          alert("Deleted successfully");
          this.refreshdata();
        }
        else {
          alert("Error in deletion");

        }


      });
  }


}
