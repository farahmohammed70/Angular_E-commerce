import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
/*-----------------------------------------------------------------*/
@Injectable({
  providedIn: 'root',
})
/*-----------------------------------------------------------------*/
export class CategoryService {
  baseUrl = 'http://localhost:8000/api/v1/categories';
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _HttpClient: HttpClient) {}
  /*-----------------------------------------------------------------*/
  // Get list of Categories
  getAllcategories(): Observable<Category[]> {
    return this._HttpClient.get<Category[]>(this.baseUrl);
  }
  /*-----------------------------------------------------------------*/
  // Get specific Category by id
  getCategoryById(categoryId: string): Observable<Category> {
    return this._HttpClient.get<Category>(`${this.baseUrl}/${categoryId}`);
  }
  /*-----------------------------------------------------------------*/
  // Create Category
  createCategory(category: FormData): Observable<Category> {
    return this._HttpClient.post<Category>(this.baseUrl, category);
  }
  /*-----------------------------------------------------------------*/
  // Update specific Category
  updateCategory(categoryId: string, category: FormData): Observable<Category> {
    return this._HttpClient.patch<Category>(`${this.baseUrl}/${categoryId}`, category);
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Category
  deleteCategory(categoryId: string): Observable<Object> {
    return this._HttpClient.delete<Object>(`${this.baseUrl}/${categoryId}`);
  }
}
