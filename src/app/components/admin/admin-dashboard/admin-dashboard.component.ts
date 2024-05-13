import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  users: User[] = [];
  productsNumber: number = 0;
  categoriesNumber: number = 0;
  brandsNumber: number = 0;
  usersNumber: number = 0;
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _UserService: UserService
  ) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this._getAllProducts();
    this._getcategories();
    this._getAllBrands();
    this._getAllusers();
  }

  /*-----------------------------------------------------------------*/
  // Get list of Products
  private _getAllProducts() {
    this._ProductService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.data;
        this.productsNumber = this.products.length;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Get list of Categories
  private _getcategories() {
    this._CategoryService.getAllcategories().subscribe(
      (response: any) => {
        this.categories = response.data;
        this.categoriesNumber = this.categories.length;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Get list of Brands
  private _getAllBrands() {
    this._BrandService.getAllBrands().subscribe(
      (response: any) => {
        this.brands = response.data;
        this.brandsNumber = this.brands.length;
      },
      (error: any) => {
        console.error('Error fetching brands:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Get list of Users
  private _getAllusers() {
    this._UserService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.data;
        this.users = this.users.filter((user: any) => user.role != 'admin');
        this.usersNumber = this.users.length;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
