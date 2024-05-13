import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-brands-dashboard',
  templateUrl: './admin-brands-dashboard.component.html',
  styleUrls: ['./admin-brands-dashboard.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminBrandsDashboardComponent implements OnInit {
  brands: Brand[] = [];
  specificBrand: Brand = {};
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _BrandService: BrandService, private _Router: Router, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    // Get list of Brands
    this._getAllBrands();
  }
  /*-----------------------------------------------------------------*/
  // Get specific Brand by id
  _getBrandById(brandId: string): void {
    this._BrandService.getBrandById(brandId).subscribe(
      (response: any) => {
        this.specificBrand = response.data;
      },
      (error: any) => {
        console.error('Error fetching brand by ID:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Update specific Category
  _updateBrand(brand: any): void {
    this._BrandService.updateBrand(brand._id, brand).subscribe(
      () => {
        console.log('Brand updated successfully');
      },
      (error: any) => {
        console.error('Error updating Brand:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Brand
  _deleteBrand(brandId: any): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this brand?',
        proceed: () => {
          this._BrandService.deleteBrand(brandId).subscribe({
            next: () => {
              // this.categories = this.categories.filter((category: Category) => category._id !== categoryId);
              this._getAllBrands();
            },
            error: (error) => {
              console.error('Error deleting brand:', error);
            },
          });
        },
      },
    });
  }
  /*-----------------------------------------------------------------*/
  // Get list of Brands
  private _getAllBrands() {
    this._BrandService.getAllBrands().subscribe(
      (response: any) => {
        this.brands = response.data;
      },
      (error: any) => {
        console.error('Error fetching brands:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Edit Brand
  _editbrand(brandId: any) {
    this._Router.navigate([`/adminPanel/editBrand/${brandId}`]);
  }
}
/*-----------------------------------------------------------------*/
// Delete specific brand
//   _deleteBrand_(brandId: string): void {
//     this._BrandService.deleteBrand(brandId).subscribe(
//       () => {
//         this.brands = this.brands.filter((brand: Brand) => brand._id !== brandId);
//       },
//       (error: any) => {
//         console.error('Error deleting brand:', error);
//       }
//     );
//   }
// }
/*-----------------------------------------------------------------*/
