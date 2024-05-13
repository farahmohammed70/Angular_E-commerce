import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private orderService: OrderService, private cartService: CartService) {}

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm(): void {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  processPayment(event: Event): void {
    event.preventDefault();
  
    if (this.paymentForm.valid) {
      // Payment is successful
      alert('Payment processed successfully!');
  
      const userId = localStorage.getItem('currentid') || '';
      const cartData = JSON.parse(localStorage.getItem('cartsData') || '{}');
      this.orderService.createOrderFromLocalStorage(userId).subscribe({
        next: (response) => {
          console.log("Order created successfully:", response);
          if (Array.isArray(cartData.carts)) {
            cartData.carts.forEach((cart: any) => {
              const cartId = cart._id;
              this.cartService.deleteUserCart(cartId).subscribe({
                next: (response) => {
                  console.log(`Cart with ID ${cartId} deleted successfully.`);
                },
                error: (err) => {
                  console.error(`Error deleting cart with ID ${cartId}:`, err);
                },
              });
            });
          }
            // localStorage.removeItem('cartsData');
            this.router.navigate(['/Orders']);
        },
        error: (err) => {
          console.error("Error creating order:", err);
          alert("There was an error creating the order.");
        },
      });
  
    } else {
      alert('Please check the entered payment details.');
    }
  }
  
  
}