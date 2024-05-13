import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private _AuthenticationService: AuthenticationService,private cartService:CartService,private auth:AuthenticationService, private router: Router) {}
  products:any=[];
  carts:any=[];
  userId="";
  ngOnInit(): void {
   this.getUserCart();
   this.userId=this.auth.getUserId();
  }
//========================================================================
plus(id:string,quantity:number){
  quantity=quantity+1;
  this.update(id,quantity);
}
//========================================================================
minus(id:string,quantity:number){
  quantity=quantity-1;
  this.update(id,quantity);
}
//========================================================================
token=localStorage.getItem("userToken");
update(_id:string,_newQuanty:number){
  console.log(_id);
  _newQuanty=_newQuanty;
  console.log(_newQuanty);
  const body={
    quantity:_newQuanty

  }
  this.cartService.updateCart(_id,this.token!,body).subscribe({
    next:()=>{
      console.log(Response);
      this.getUserCart();
    },
  })
}
//========================================================================
delete(_id:string){
  console.log(_id);
  this.cartService.deleteCart(_id,this.token!).subscribe({
    next:()=>{
      console.log(Response);
      this.getUserCart();
      this.cartService.getUserCart();
    },
  })
}
//========================================================================
getUserCart(){
  this.cartService.getUserCartRequest().subscribe({
    next:(data:any)=>{
      this.carts=data.data;
      this.cartService.getProductRequest().subscribe({
        next:(data:any)=>{
          this.products=data.data;
        },
        error:(error)=>console.log(error),
        complete:()=>{
          this.carts=this.carts.map((cart:any)=>{
            this.products.forEach((element:any) => {
              if (element._id===cart.product) {
                cart.product=element;
              }
            });
            return cart;
          })
          console.log(this.carts);
          this.carts=this.carts.filter((cart:any)=>this.userId===cart.user);
        }
      });
    },
    error:(error)=>console.log(error),
    complete:()=>console.log(this.carts)
  });
}
//========================================================================
deleteUserCart(){
  this.cartService.deleteUserCart(this.userId).subscribe({
    next:()=>{
      console.log(Response);
      this.getUserCart();
      this.cartService.getUserCart();
    },
  })
}
//========================================================================
navigateToPaymentPage(): void {
  // Navigate to the payment page route

  let prices = this.carts.map((cart:any) => {
    return cart.product.price * cart.quantity;
});

let totalPrice = prices.reduce((pre:any, acc:any) => {
  return pre + acc;
})

let data = {
  carts: this.carts,
  totalPrice
}

localStorage.setItem('cartsData', JSON.stringify(data));

console.log(JSON.parse(localStorage.getItem('cartsData')!))
// console.log(prices);
// console.log(totalPrice);
this.router.navigate(['/payment']);
}
}

