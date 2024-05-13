import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-orders-dashboard',
  templateUrl: './admin-orders-dashboard.component.html',
  styleUrls: ['./admin-orders-dashboard.component.css']
})
export class AdminOrdersDashboardComponent {
  orders: any = [];
  selectedOrder: any;
  showModal = false;
  users: any[] = [];

  constructor(private orderService: OrderService, private authService: AuthenticationService, private userService: UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  viewOrderDetails(order: any) {
    this.selectedOrder = order; // Set the selected order
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (err) => {
        console.log("Error fetching orders: ", err);
      }
    })
  }

  deleteOrder(orderId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this order?',
        proceed: () => {
          this.orderService.deleteOrder(orderId).subscribe({
            next: () => {
              this.orders = this.orders.filter((order: { _id: string; }) => order._id !== orderId);
              this.fetchOrders();
            },
            error: (err) => {
              console.error(err);
            }
          });
        }
      }
    });
  }

  changeOrderStatus(event: any, orderId: string) {
    const newStatus = event?.target?.value;
    if (newStatus) {
      const orderToUpdate = this.orders.find((order: { _id: string; }) => order._id === orderId);
      if (orderToUpdate) {
        orderToUpdate.status = newStatus;
      }
    }
  }
}
