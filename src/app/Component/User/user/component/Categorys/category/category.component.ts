import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Icategory } from '../../../../../Shared/shared/Models/icategory';
import { CategoryService } from '../../../../../Shared/shared/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  images: any;
  responsiveOptions: any;
  category: Icategory[] = [];
  categoryid: any;
  constructor(private service: CategoryService, private router: Router) {
  }

  ngOnChange() { }
  ngOnInit(): void {

    this.service.GetAllCategories().subscribe(cat => {
      this.category = cat;

    });
  }

  getCategoryByID(id: number) {
    this.service.GetCategoryByID(id).subscribe(cat => {
      this.categoryid = cat;

    });

  }


}
