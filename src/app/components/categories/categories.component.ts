import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
/*-----------------------------------------------------------------*/
export class CategoriesComponent implements OnInit {
  categoriesItem: Category[] = [];
  loading: boolean = false;
  /*-----------------------------------------------------------------*/
  constructor(private categoryService: CategoryService, private productService: ProductService) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this.loading = true;
    this.categoryService.getAllcategories().subscribe({
      next: (response: any) => {
        this.categoriesItem = response.data;
        this.productService.footer.emit();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
/*-----------------------------------------------------------------*/
