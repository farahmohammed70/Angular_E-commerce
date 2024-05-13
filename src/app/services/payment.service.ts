// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {
//   private apiUrl = 'http://localhost:8000/api/orders/checkout-session';

//   constructor(private http: HttpClient) { }

//   processPayment(paymentData: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, paymentData);
//   }

//   // Add other payment-related methods as needed
// }

// import { Injectable } from '@angular/core';
// import * as Stripe from '@stripe/stripe-js';

// @Injectable({
//   providedIn: 'root'
// })
// export class StripeService {
//   private stripe: Stripe.Stripe | null = null;

//   constructor() { }

//   async initializeStripe(publishableKey: string) {
//     this.stripe = await Stripe.load(publishableKey);
//   }

//   // Methods for creating elements, handling user interactions, and communicating with backend
// }


import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<any>;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51On69tLWkdu5VEuk8rXeJhcOvBMnWMWt49LpW3Idj6eg5SIwSsnUoiX1Gsfz9VIpW5ruJzVF59AR8RwbGy9UzPA400Y1OLnXH9');
  }

  getStripe() {
    return this.stripePromise;
  }
}
