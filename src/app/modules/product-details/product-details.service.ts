import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from '../product/product.model';
import { Observable } from 'rxjs';
import { Review } from './product-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(
    private http: HttpClient
  ) { }

  getProductDetails(slug: String): Observable<ProductDetails>{
    return this.http.get<ProductDetails>("api/products/" + slug);
  }

  postProductReview(review: Review): Observable<Review>{
    return this.http.post<Review>("api/reviews", review);
  }
}
