import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-products-dashboard',
  templateUrl: './admin-products-dashboard.component.html',
  styleUrls: ['./admin-products-dashboard.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminProductsDashboardComponent implements OnInit {
  products: Product[] = [];
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _ProductService: ProductService, private _Router: Router, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this._getAllProducts();
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Product
  _deleteProduct(priductId: any): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this Product?',
        proceed: () => {
          this._ProductService.deleteProduct(priductId).subscribe({
            next: () => {
              this._getAllProducts();
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
  // Get list of Products
  private _getAllProducts() {
    this._ProductService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Edit Brand
  _editProduct(priductId: any) {
    this._Router.navigate([`/adminPanel/editProduct/${priductId}`]);
  }
}
/*-----------------------------------------------------------------*/
// Delete specific Product
//   deleteProduct(idProduct: any) {
//     this.productService.deleteProduct(idProduct).subscribe((response) => {
//       console.log(response);
//       console.log(this.products);

//       this.products = this.products.filter((product: any) => product._id != idProduct);
//       console.log(this.products);
//     });
// }
/*-----------------------------------------------------------------*/
