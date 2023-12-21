import { Component } from '@angular/core';
import { ProductDetails } from '../product/product.model';
import { ProductDetailsService } from './product-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  product!: ProductDetails;

  constructor(
    private productDetailsService: ProductDetailsService,
    private router: ActivatedRoute
  ){}

  ngOnInit(){
    this.getProductDetails();
  }

  getProductDetails(){
    const slug = this.router.snapshot.params['slug'];
    this.productDetailsService.getProductDetails(slug)
      .subscribe(prod => this.product = prod);
  }

}
