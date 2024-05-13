import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  token=localStorage.getItem("userToken");
  userId="";
  searchProduct:any;

  constructor(private productsService: ProductService, private cartService: CartService,private auth:AuthenticationService) {}

  isSpin: boolean = false;
  products: any[] = [];

  isLoading: boolean = false;

  ngOnInit(): void {
    this.isSpin = true;
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.searchProduct=[...this.products];
        this.productsService.footer.emit();
        this.isSpin = false;
      },
    });
    this.userId=this.auth.getUserId();

  }
  /*-----------------------------------------------------------------*/
  getUserRole(): string | null {
    // Retrieve user role from local storage
    return localStorage.getItem('role');
  }
  /*-----------------------------------------------------------------*/
productsOnCart:any[]=[];
  addToCart(productId: string) {
    const body={
      user:this.userId,
      product: productId,
      quantity: 1,
    };
    this.cartService.AddToCart(this.token!, body).subscribe({
      next: (response) => {
        console.log(response);
        this.productsOnCart.push(productId);
        // this.cartService.numberOFCartItems.next(response.numOfCartItems);

        this.cartService.getUserCart();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  /*-----------------------------------------------------------------*/
  onChange(event:Event){
this.searchProduct=[...this.products];
if ((event.target as HTMLInputElement).value) {
this.searchProduct=this.searchProduct.filter((product:any)=>product.title.toLowerCase().includes((event.target as HTMLInputElement).value.toLowerCase()));
}
else{
  this.searchProduct=[...this.products];
}
  }
}

