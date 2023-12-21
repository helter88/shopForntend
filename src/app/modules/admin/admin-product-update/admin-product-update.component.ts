import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdate } from './admin-product-update.model';
import { AdminProductUpdateService } from './admin-product-update.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent {

  product!: AdminProductUpdate

  productForm!: FormGroup;
  imageGroup!: FormGroup;

  reqiredFileTypes= "image/jpeg, image/png";

  image: string | null = null;
  

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getProducts();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      category: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0.1), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      currency: ['PLN', Validators.required],
      slug: ['', [Validators.required, Validators.minLength(2)]],
    })

    this.imageGroup = this.formBuilder.group({
      file: ''
    })
  }

  getProducts(){
    const id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id)
      .subscribe(prod => this.mapProductForm(prod));
  }

  onFormSubmit(formValue: any) {
    const id = Number(this.router.snapshot.params['id']);
    const formWithImage = {...formValue, image: this.image}
    this.adminProductUpdateService.updateProduct(id, formWithImage)
      .subscribe(prod => {
        this.mapProductForm(prod);
        this.snackBar.open("Product updated",'', {duration: 2600});
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

  private mapProductForm(prod: AdminProductUpdate): void {
    this.productForm.setValue({
      name: prod?.name,
      description: prod?.description,
      category: prod?.category,
      price: prod?.price,
      currency: prod?.currency,
      slug: prod?.slug
    });
    this.image = prod.image;
  }
}
