import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCategory } from '../admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  
  constructor(
    private http: HttpClient
    ) { }
    
    getCategories(): Observable<AdminCategory[]> {
      return this.http.get<AdminCategory[]>("/api/admin/categories")
    }
    
    saveCategory(value: any): Observable<AdminCategory> {
      return this.http.post<AdminCategory>("/api/admin/categories", value)
    }

    getCategory(id: number): Observable<AdminCategory>  {
      return this.http.get<AdminCategory>("/api/admin/categories/" + id );
    }

    updateCategory(id:number, category:AdminCategory): Observable<AdminCategory>{
      return this.http.put<AdminCategory>("api/admin/categories/" + id, category);
    }
    
    deleteCategory(id: number): Observable<void>{
    return this.http.delete<void>(`/api/admin/categories/${id}`);
    }
}
