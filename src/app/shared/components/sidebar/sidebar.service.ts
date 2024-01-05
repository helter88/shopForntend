import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarCategory } from './sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<SidebarCategory[]> {
    return this.http.get<SidebarCategory[]>("api/categories");
  }
}
