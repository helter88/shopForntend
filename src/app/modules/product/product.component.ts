import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public products: Product[] = [];
  
  constructor(
    private productService: ProductService
  ){}
  
  ngOnInit(){
    this.products = this.productService.getProducts();
  }
}
