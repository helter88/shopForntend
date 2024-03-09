import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminProduct } from './admin-forduct-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductFormService {

  constructor(
    private http: HttpClient
  ) { }

  getProduct(id: number): Observable<AdminProduct>{
    return this.http.get<AdminProduct>("api/admin/products/" + id);
  }

  updateProduct(id:number, product:AdminProduct): Observable<AdminProduct>{
    return this.http.put<AdminProduct>("api/admin/products/" + id, product);
  }

  saveProduct(product:AdminProduct): Observable<AdminProduct>{
    return this.http.post<AdminProduct>("api/admin/products", product);
  }
}
