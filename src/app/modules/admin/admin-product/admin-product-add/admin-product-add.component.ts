import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdateService } from '../../admin-product-update/admin-product-update.service';
import { AdminProductUpdate } from '../../admin-product-update/admin-product-update.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent {

  productForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminProductUpdateService: AdminProductUpdateService,
    private location: Location
  ){}

  ngOnInit(){
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN'],
    })
  }

  onFormSubmit(formValue: any) {
    this.adminProductUpdateService.saveProduct(formValue)
      .subscribe(() => {
        this.snackBar.open("Product saved",'', {duration: 2600});
        this.location.back();
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
