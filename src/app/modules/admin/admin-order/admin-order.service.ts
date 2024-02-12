import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { AdminOrder } from './admin-order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  
  constructor(private http: HttpClient) { }
  
  getOrders(pageIndex: number, pageSize: number): Observable<Page<AdminOrder>> {
    return this.http.get<Page<AdminOrder>>(`api/admin/orders?page=${pageIndex}&size=${pageSize}`);
  }
  
  getOrder(id: number): Observable<AdminOrder> {
    return this.http.get<AdminOrder>("api/admin/orders/" + id);
  }
  
  saveStatus(id: number, value: any): Observable<void> {
    return this.http.patch<void>("api/admin/orders/" + id, value);
  }
  
  getStatuses(): Observable<string[]> {
    return this.http.get<string[]>("api/admin/orders/statuses");
  }

  exportOrders(from: string, to: string, orderStatus: string): Observable<any> {
    const params = new HttpParams()
    .set('from', from)
    .set('to', to)
    .set('orderStatus', orderStatus);
    return this.http.get("api/admin/orders/export", {
      params,
      responseType: 'blob',
      observe: 'response'
    });
  }

  getSalesStatistics(): Observable<any>{
    return this.http.get<any>("api/admin/orders/statistics");
  }
}
