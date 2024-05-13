import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private orderService: OrderService,
    private authService: AuthenticationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.fetchOrdersByUser();
  }

  // fetchOrdersByUser() {
  //   // Retrieve user ID and role from local storage
  //   var userId = localStorage.getItem('currentid') || "";
  //   var userRole = localStorage.getItem('role') || "";
  
  //   console.log(userId);
  //   console.log(userRole);
  
  //   // if (userRole === 'admin') {
  //   //   // If user is admin, fetch all orders
  //   //   this.orderService.getAllOrders().subscribe({
  //   //     next: (response) => {
  //   //       this.orders = response;
  //   //       this.loading = false;
  //   //     },
  //   //     error: (err) => {
  //   //       console.error("Error fetching all orders:", err);
  //   //       this.loading = false;
  //   //     }
  //   //   });
  //   // } else {
  //   //   // If user is not admin, fetch orders specific to the user

  //     this.orderService.getOrdersByUser(userId).subscribe({
  //       next: (response) => {
  //         this.orders = response;
  //         this.loading = false;
  //         console.log(this.fetchOrdersByUser());
  //       },
  //       error: (err) => {
  //         console.error("Error fetching orders by user:", err);
  //         this.loading = false;
  //       }
  //     });
  //   // }
  // }
  
  fetchOrdersByUser() {
    const userId = localStorage.getItem('currentid') || "";
    // const userRole = localStorage.getItem('role') || "";
  
    if (userId) {
      this.orderService.getOrdersByUser(userId).subscribe({
        next: (response) => {
          this.orders = response;
          this.loading = false;
          console.log("Orders fetched successfully:", this.orders);
        },
        error: (err) => {
          console.error("Error fetching orders by user:", err);
          this.loading = false;
        }
      });
    } else {
      console.error("User ID not found");
      this.loading = false;
    }
  }
  

  cancelOrder(orderId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this order?',
        proceed: () => {
          this.orderService.deleteOrder(orderId).subscribe({
            next: () => {
              this.orders = this.orders.filter((order) => order.id !== orderId);
              this.loading = false;
              this.fetchOrdersByUser();
            },
            error: (err) => {
              this.loading = false;
              console.error(err);
            }
          });
        }
      }
    });
  }

  calculateOrderAge(orderDate: Date): number {
    const currentDate = new Date();
    const diffInMs = Math.abs(currentDate.getTime() - orderDate.getTime());
    // Convert milliseconds to days and round down to whole days
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  createOrder() {
    const orderData = {
      userId: this.authService.getUserId(),
      cartItems: this.cartItems,
      totalPrice: this.totalPrice,
    };
    const userId = this.authService.getUserId();
    this.orderService.createOrderFromLocalStorage(userId)
      .subscribe({
        next: (response) => {
          console.log("Order created successfully:", response);
          localStorage.removeItem('cartsData');
        },
        error: (err) => {
          console.error("Error creating order:", err);
        }
      });
  }
}
