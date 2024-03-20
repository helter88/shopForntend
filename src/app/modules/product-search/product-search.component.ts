import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSearchService } from './product-search.service';
import { Subscription, switchMap } from 'rxjs';
import { Product } from '../product/product.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {

  private querySubscription!: Subscription;
  public products: Product[] = [];
  public totalElements: number = 0;
  private query = ""

  constructor(
    private route: ActivatedRoute,
    private productSearchService: ProductSearchService
  ){}

  ngOnInit() {
    this.querySubscription = this.route.queryParams
      .pipe(
        switchMap(params => {
          this.query = params['query'];
          return this.productSearchService.searchProducts(this.query,0,10)
        })
      )
      .subscribe(prod => {
        this.products = prod.content;
        this.totalElements = prod.totalElements;
      });
  }

  onPageChange(event: PageEvent){
    this.productSearchService.searchProducts(this.query,event.pageIndex, event.pageSize)
      .subscribe(prod => {
        this.products = prod.content;
        this.totalElements = prod.totalElements;
      });
    
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  } 
}
