import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    {
      name: "Prod1",
      category: "Cat1",
      description: "Description 1",
      price: 19.99,
      currency: "PLN"
    }, {
      name: "Prod2",
      category: "Cat2",
      description: "Description 2",
      price: 389.00,
      currency: "PLN"
    }, {
      name: "Prod3",
      category: "Cat3",
      description: "Description 3",
      price: 12.95,
      currency: "PLN"
    }
  ]
  constructor() { }

  getProducts(): Product[]{
    return this.products;
  }
}
