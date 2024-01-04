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

  imageGroup!: FormGroup;

  reqiredFileTypes= "image/jpeg, image/png";

  image: string | null = null;

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
      categoryId: [null,[Validators.required]],
      price: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      currency: ['PLN', Validators.required],
      slug: ['', [Validators.required, Validators.minLength(2)]],
    })

    this.imageGroup = this.formBuilder.group({
      file: ''
    })
  }

  onFormSubmit(formValue: any) {
    const formWithImage = {...formValue, image: this.image}
    this.adminProductUpdateService.saveProduct(formWithImage)
      .subscribe({
        next: () => {
        this.snackBar.open("Product saved",'', {duration: 2600});
        this.location.back();
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }

  uploadFile(){
    const formData = new FormData();
    formData.append('file', this.imageGroup.get("file")?.value);
    this.adminProductUpdateService.uploadImage(formData)
      .subscribe(res => this.image = res.fileName);
  }

  onFileChange(event: any){
    if (event.target.value.length >0){
      this.imageGroup.patchValue({
        file: event.target.files[0]
      })
    }
  }
}
