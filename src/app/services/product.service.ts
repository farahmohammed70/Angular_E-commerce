import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
/*-----------------------------------------------------------------*/
@Injectable({
  providedIn: 'root',
})
/*-----------------------------------------------------------------*/
export class ProductService {
  @Output() footer = new EventEmitter<any>();
  baseUrl = 'http://localhost:8000/api/v1/products';
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _HttpClient: HttpClient) {}
  /*-----------------------------------------------------------------*/
  // Get list of Products
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }
  /*-----------------------------------------------------------------*/
  // Get specific Product by id
  getProductById(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/${productId}`);
  }
  /*-----------------------------------------------------------------*/
  // Create Product
  createProduct(product: FormData): Observable<any> {
    return this._HttpClient.post(this.baseUrl, product);
  }
  /*-----------------------------------------------------------------*/
  // Update specific Product
  updateProduct(productId: string, product: FormData): Observable<any> {
    return this._HttpClient.patch(`${this.baseUrl}/${productId}`, product);
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Product
  deleteProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${productId}`);
  }
}
