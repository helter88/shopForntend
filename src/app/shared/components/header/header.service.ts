import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getCountProducts(cartId: number): Observable<number>{
    return this.http.get<number>("api/cartItems/count/" + cartId)
  }

  searchProducts(query: string): Observable<string[]> {
    return this.http.get<string[]>(`api/products/prompt?query=${query}`);
  }
}
