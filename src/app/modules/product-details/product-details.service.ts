import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from '../product/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(
    private http: HttpClient
  ) { }

  getProductDetails(slug: String): Observable<ProductDetails>{
    return this.http.get<ProductDetails>("api/products/" + slug)
  }
}
