import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Page } from 'src/app/shared/model/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCache = new Map<string, Page<Product>>();
  
  constructor(
    private http: HttpClient
  ) { }

  getProducts(page: number, size: number): Observable<Page<Product>>{
    const cacheKey = `${page}-${size}`;
    const cachedResult = this.productCache.get(cacheKey);

    if (cachedResult !== undefined) {
      return of(cachedResult);
    } else {
      return this.http.get<Page<Product>>(`/api/products?page=${page}&size=${size}`)
              .pipe(
                tap(prod => this.productCache.set(cacheKey, prod))
              )
    }
  }
}
