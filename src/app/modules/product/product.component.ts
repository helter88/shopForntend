import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public products: Product[] = [];
  public totalElements: number = 0;
  
  constructor(
    private productService: ProductService
  ){}
  
  ngOnInit(){
    this.getProductPage(0,10);
  }

  onPageChange(event: PageEvent){
    this.getProductPage(event.pageIndex, event.pageSize);
  }

  private getProductPage(page: number, size: number) {
    this.productService.getProducts(page, size).subscribe(prod => {
      this.products = prod.content;
      this.totalElements = prod.totalElements;
    });
  }
}
