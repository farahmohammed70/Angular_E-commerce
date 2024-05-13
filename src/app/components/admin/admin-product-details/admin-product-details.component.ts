import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminProductDetailsComponent {
  productId: any;
  product: any;
  isLoading: boolean = false;
  /*-----------------------------------------------------------------*/
  constructor(private productsService: ProductService, private activatedRoute: ActivatedRoute) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });

    this.productsService.getProductById(this.productId).subscribe({
      next: (reponse) => {
        this.product = reponse.data;
        this.isLoading = false;
      },
    });
  }
}
