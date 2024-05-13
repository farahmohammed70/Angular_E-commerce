import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/v1/orders';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllOrders(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    return this.http.get(`${this.apiUrl}`, { headers }).pipe(
      catchError(this.handleError)
    );
}


  getOrdersByUser(userId: string): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
  }

  createOrderFromLocalStorage(userId: string): Observable<any> {
    const cartData = JSON.parse(localStorage.getItem('cartsData') || '{}');

    const modelOrderData = {
      user: userId,
      products: cartData.carts.map((cart: any) => ({
        product: cart.product._id,
        quantity: cart.quantity,
      })),
      totalPrice: cartData.totalPrice,
      status: 'placed',
    };

    return this.http.post(this.apiUrl, modelOrderData).pipe(
      catchError((error) => {
        console.error("Error creating order:", error);
        return throwError(error);
      })
    );
  }

  // private handleError(error: any) {
  //   console.error('An error occurred:', error);
  //   throw error; // You can handle the error as per your application's requirements
  // }

  deleteOrder(orderId: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

