import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminProductUpdate } from './admin-product-update.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductUpdateService {

  constructor(
    private http: HttpClient
  ) { }

  getProduct(id: number): Observable<AdminProductUpdate>{
    return this.http.get<AdminProductUpdate>("api/admin/products/" + id);
  }

  saveProduct(id:number, product:AdminProductUpdate){
    return this.http.put<AdminProductUpdate>("api/admin/products/" + id, product);
  }
}
