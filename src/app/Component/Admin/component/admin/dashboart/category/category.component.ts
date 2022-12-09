import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/Component/Admin/Services/modal.service';
import { Icategoryy } from 'src/app/Component/Shared/shared/Models/icategorys';
import { CategoryService } from 'src/app/Component/Shared/shared/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: any
  modalTitle!: string;
  buttonTitle!: string;
  categoryForm!: FormGroup;
  categories: any[] = [];
  category!: any;
  categoryName!: string



  ActivateAddandEdit: boolean = false;
  ModalTitle: string = "";
  id: number = 0;
  name: string = "";

  constructor(private categoryService: CategoryService,
    private fb: FormBuilder,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe(res => {
      this.categoryList = res
    })
    this.createCategoryForm();
  }
  createCategoryForm() {
    this.categoryForm = this.fb.group({
      id: [0],
      name: [, [Validators.required]]
    });
  }

  addClick() {
    debugger
    this.category = {
      id: 0,
      name: "",
      products: []
    }
    this.ModalTitle = "Add category";
    this.ActivateAddandEdit = true;
  }
  iderror = true;
  validate(value: any) {
    if (value === 0) {
      this.iderror = true;
    }
    else {
      this.iderror = false;
    }
  }

     add() {
    debugger
    var val = {
      name: this.name,

    };
    this.categoryService.addCategory(val).subscribe({
      next: res => {
        alert("add successfully");
      }, error: (err) => { throw new Error(err) }
    });

  }

  refreshdata() {
    this.categoryService.GetAllCategories().subscribe(res => {
      this.categoryList = res
    })
    this.createCategoryForm();
  }
  closeClick() {
    this.ActivateAddandEdit = false;
    this.refreshdata();
  }

  update() {
    debugger



    // this.categoryService.updateCategory(this.category).subscribe({next:res=>{
    //   console.log(res)

    // },error:(err)=>{throw new Error(err)}});
    this.category.name = this.name;
    this.categoryService.updateCategory(this.category)
      .subscribe(() => {
        setTimeout(() => {

          alert("Updated successfully");

        }, 50);
      }, (err) => {
        setTimeout(() => {

          alert("Error in update");
          console.log(err.error);
        }, 50);
      }, () => {

      });

  }

  editClick(item: any) {
    debugger
    this.category = item;
    this.ModalTitle = "Edit";
    this.ActivateAddandEdit = true;

  }

  deleteCategory(id: any) {
    debugger


    // this.loadingDelete = true;
    this.categoryService.deleteCategory(id)
      .subscribe((response: any) => {
        setTimeout(() => {
          if (response == true) {
            alert("Deleted successfully");
            // this.closeModal();
            // this.getCategories(1);
            this.refreshdata();
          }
          else {
            // this.loadingDelete = false; 
            alert("Error in deletion");
          }
        }, 50);
      });

  }

 
}

