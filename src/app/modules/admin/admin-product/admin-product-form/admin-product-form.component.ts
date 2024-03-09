import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormCategoryService } from './form-category.service';
import { AdminCategory } from '../../admin.model';
import { FileHandler, ImageDto } from './admin-forduct-form.model';
import { DomSanitizer } from '@angular/platform-browser';
import { base64ToBlob, processSelectedFileList } from './admin-product-form-util';

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

  constructor(
    private catService: FormCategoryService,
    private formBuilder: FormBuilder,
    private sanitazier: DomSanitizer,
  ){}

  ngOnInit() {
    this.catService.getCategories().subscribe(cat => this.categories = cat);
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      categoryId: [null,[Validators.required]],
      price: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      discountPrice: [0, [Validators.min(0.1), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      currency: ['PLN', Validators.required],
      slug: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  submit(){
    console.log("selected Files", this.selectedFiles);
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
}
