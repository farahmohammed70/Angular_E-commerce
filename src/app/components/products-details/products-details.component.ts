import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  constructor(private productsService: ProductService, private activatedRoute: ActivatedRoute, private _CartService: CartService) {}

  productId: any;
  product: any;
  isSpin: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isSpin = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.productId = params.get('id');
    });
    this.productsService.getProductById(this.productId).subscribe({
      next: (reponse) => {
        console.log(reponse.data);
        this.product = reponse.data;
        this.productsService.footer.emit();
        this.isSpin = false;
      },
    });
  }
  /*-----------------------------------------------------------------*/
  getUserRole(): string | null {
    // Retrieve user role from local storage
    return localStorage.getItem('role');
  }
  /*-----------------------------------------------------------------*/
  addToCart(productId: string) {
    // this.isLoading = true;
    // this._CartService.addToCart(productId).subscribe({
    //   next: (response) => {
    //     this.isLoading = false;
    //     console.log(response)
    //     this._CartService.numberOFCartItems.next(response.numOfCartItems)
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.log(err)
    //   }
    // })
  }
}
