import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from 'src/app/shared/model/page';
import { Product } from '../product/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(
    private http: HttpClient
  ) { }

  searchProducts(query: string, page: number, size: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`/api/products/search?page=${page}&size=${size}&query=${query}`)
  }
}
