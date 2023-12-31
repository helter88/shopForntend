import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminProductUpdate, UploadResponse } from './admin-product-update.model';
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

  updateProduct(id:number, product:AdminProductUpdate): Observable<AdminProductUpdate>{
    return this.http.put<AdminProductUpdate>("api/admin/products/" + id, product);
  }

  saveProduct(product:AdminProductUpdate): Observable<AdminProductUpdate>{
    return this.http.post<AdminProductUpdate>("api/admin/products", product);
  }

  uploadImage(formData: FormData): Observable<UploadResponse>{
    return this.http.post<UploadResponse>("api/admin/products/uploadimage", formData);
  }
}
