import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartSummary } from './cart-summary.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(
    private http: HttpClient
    ) { }
  
    addToCart(id: number, cartItem: any): Observable<CartSummary> {
      return this.http.put<CartSummary>("api/carts/" + id, cartItem);
    }
    
    updateCart(id: number, items: any[]): Observable<CartSummary> {
      return this.http.put<CartSummary>("api/carts/" + id + "/update", items);
    }

    deleteCartItem(id: number): Observable<void> {
      return this.http.delete<void>("api/cartItems/" + id);
    }
  }
