import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategory } from './admin-forduct-form.model';

@Injectable({
  providedIn: 'root'
})
export class FormCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<AdminCategory[]> {
    return this.http.get<AdminCategory[]>("/api/admin/categories")
  }
}
