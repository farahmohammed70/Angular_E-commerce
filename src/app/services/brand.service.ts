import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
/*-----------------------------------------------------------------*/
@Injectable({
  providedIn: 'root',
})
/*-----------------------------------------------------------------*/
export class BrandService {
  baseUrl = 'http://localhost:8000/api/v1/brands';
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _HttpClient: HttpClient) {}
  /*-----------------------------------------------------------------*/
  // Get list of Brands
  getAllBrands(): Observable<Brand[]> {
    return this._HttpClient.get<Brand[]>(this.baseUrl);
  }
  /*-----------------------------------------------------------------*/
  // Get specific Brand by id
  getBrandById(brandId: string): Observable<Brand> {
    return this._HttpClient.get<Brand>(`${this.baseUrl}/${brandId}`);
  }
  /*-----------------------------------------------------------------*/
  // Create Brand
  createBrand(brand: FormData): Observable<Brand> {
    return this._HttpClient.post<Brand>(this.baseUrl, brand);
  }
  /*-----------------------------------------------------------------*/
  // Update specific Brand
  updateBrand(brandId: string, brand: FormData): Observable<Brand> {
    return this._HttpClient.patch<Brand>(`${this.baseUrl}/${brandId}`, brand);
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Brand
  deleteBrand(brandId: string): Observable<Object> {
    return this._HttpClient.delete<Object>(`${this.baseUrl}/${brandId}`);
  }
}
