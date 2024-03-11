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

  updateProduct(id:number, data: FormData){
    return this.http.put("api/admin/products/" + id, data);
  }

  saveProduct(data: FormData){
    return this.http.post("api/admin/products", data);
  }
}
