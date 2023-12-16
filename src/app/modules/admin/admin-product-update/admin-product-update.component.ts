import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdate } from './admin-product-update.model';
import { AdminProductUpdateService } from './admin-product-update.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent {

  product!: AdminProductUpdate

  productForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getProducts();
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN'],
    })
  }

  getProducts(){
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id)
      .subscribe(prod => this.mapProductForm(prod));
  }

  onFormSubmit(formValue: any) {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.updateProduct(id, formValue)
      .subscribe(prod => {
        this.mapProductForm(prod);
        this.snackBar.open("Product updated",'', {duration: 2600});
      });
  }

  private mapProductForm(prod: AdminProductUpdate): void {
    return this.productForm.setValue({
      name: prod?.name,
      description: prod?.description,
      category: prod?.category,
      price: prod?.price,
      currency: prod?.currency,
    });
  }
}
