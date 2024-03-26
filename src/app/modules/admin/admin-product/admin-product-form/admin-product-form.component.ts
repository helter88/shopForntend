import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AdminCategory } from '../../admin.model';
import { AdminProduct, FileHandler, ImageDto } from './admin-forduct-form.model';
import { base64ToBlob, processSelectedFileList } from './admin-product-form-util';
import { AdminProductFormService } from './admin-product-form.service';
import { FormCategoryService } from './form-category.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent {

  productForm!: FormGroup

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFiles: FileHandler[] = [];

  categories: AdminCategory[] = [];
  productId!: number | null;

  loading = false;

  constructor(
    private catService: FormCategoryService,
    private formBuilder: FormBuilder,
    private sanitazier: DomSanitizer,
    private adminProductFormService: AdminProductFormService,
    private router: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit() {
    this.catService.getCategories().subscribe(cat => this.categories = cat);
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      categoryId: [null,[Validators.required]],
      price: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      discountPrice: [null, [Validators.min(0.1), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      currency: ['PLN', Validators.required],
      slug: ['', [Validators.required, Validators.minLength(2)]],
    })
    this.productId = Number(this.router.snapshot.params['id']);
    if(this.productId){
      this.getProducts(this.productId);
    }
  }

  getProducts(productId: number){
    this.adminProductFormService.getProduct(productId)
      .subscribe(prod => this.mapProductForm(prod));
  }

  submit(){
    if (this.productForm.valid) {
        this.loading = true;
        const formData = this.createFormData();
        const request = this.productId ? 
          this.updateProduct(this.productId, formData) : 
          this.addProduct(formData);
        request.subscribe({
            next: () => {
            this.loading = false;
            this.location.back();
            }, 
            error: err => {
            this.loading = false;
            this.snackBar.open(`Data not saved: ${err.error}`,'', {duration: 2600, panelClass: "fail"})
            }
          });
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const fileList = input.files;
    if(fileList){
      this.selectedFiles = processSelectedFileList(fileList, this.selectedFiles, this.sanitazier);
    }
  }

  onUploadButtonClick() {
    this.fileInput.nativeElement.click();
  }
  
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onDropped(event: FileList) {
    this.selectedFiles = processSelectedFileList(event, this.selectedFiles, this.sanitazier);
  }

  private createFileFromImage(image: ImageDto): File {
    const blob = base64ToBlob(image.base64, image.filetype);
    return new File([blob], image.filename, { type: image.filetype });
  }

  private mapProductForm(prod: AdminProduct): void {
    this.productForm.setValue({
      name: prod?.name,
      description: prod?.description,
      categoryId: prod?.categoryId,
      price: prod?.price,
      discountPrice: prod?.discountPrice,
      currency: prod?.currency,
      slug: prod?.slug
    });
    prod?.images?.forEach(img => {
      const file = this.createFileFromImage(img);
      this.selectedFiles.push({
        file,
        url: this.sanitazier.bypassSecurityTrustUrl(URL.createObjectURL(file))
      })
     })
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('productData', JSON.stringify(this.productForm.value));
    if(this.selectedFiles.length){
      this.selectedFiles.forEach((fileHandler) => {
        formData.append(`images`, fileHandler.file);
      });
    }
    return formData
  }

  private addProduct(formData: FormData) {
    return this.adminProductFormService.saveProduct(formData);
  }

  private updateProduct(id: number, formData: FormData) {
    return this.adminProductFormService.updateProduct(id, formData)
  }
  
}
