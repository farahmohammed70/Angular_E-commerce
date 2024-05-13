import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandService, private _ProductsService: ProductService) {}

  brandsItems: Brand[] = [];
  loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this._BrandsService.getAllBrands().subscribe({
      next: (response: any) => {
        this.brandsItems = response.data;
        this._ProductsService.footer.emit();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
