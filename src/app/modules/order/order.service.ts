import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InitData, Order, OrderSummary } from './order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(order: Order): Observable<OrderSummary>{
    return this.http.post<OrderSummary>("api/orders", order);
  }

  getInitData(): Observable<InitData> {
    return this.http.get<InitData>("/api/orders/initData");
  }
}
