import { Component } from '@angular/core';
import { ProductDetails } from '../product/product.model';
import { ProductDetailsService } from './product-details.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  product!: ProductDetails;
  reviewForm!: FormGroup;

  constructor(
    private productDetailsService: ProductDetailsService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(){
    this.getProductDetails();
    this.reviewForm = this.formBuilder.group({
      authorName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      content: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(700)]]
    })
  }

  getProductDetails(){
    const slug = this.router.snapshot.params['slug'];
    this.productDetailsService.getProductDetails(slug)
      .subscribe(prod => this.product = prod);
  }

  submit(){
    if(this.reviewForm.valid){
      this.productDetailsService.postProductReview({
        ...this.reviewForm.value,
        productId: this.product.id
      }).subscribe(() => {
        this.reviewForm.reset()
        this.snackBar.open("Your opinion is added",'', {duration: 2600});
      });
    }
  }

  get authorName(){
    return this.reviewForm.get('authorName');
  }

  get content(){
    return this.reviewForm.get('content');
  }

}
