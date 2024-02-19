import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderListDto } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<OrderListDto[]> {
    return this.http.get<OrderListDto[]>("/api/orders");
  }
}
