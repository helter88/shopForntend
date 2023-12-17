import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdateService } from '../../admin-product-update/admin-product-update.service';
import { AdminProductUpdate } from '../../admin-product-update/admin-product-update.model';
import { Location } from '@angular/common';
import { AdminMessageService } from '../../admin-message.service';

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
    private location: Location,
    private adminMessageService: AdminMessageService
  ){}

  ngOnInit(){
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      category: ['',[Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      currency: ['PLN', Validators.required],
    })
  }

  onFormSubmit(formValue: any) {
    this.adminProductUpdateService.saveProduct(formValue)
      .subscribe({
        next: () => {
        this.snackBar.open("Product saved",'', {duration: 2600});
        this.location.back();
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
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
