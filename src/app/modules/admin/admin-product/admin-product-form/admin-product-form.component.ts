import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminCategory } from './admin-forduct-form.model';
import { FormCategoryService } from './form-category.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent {

  @Input() parentForm!: FormGroup
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  categories: AdminCategory[] = [];

  constructor(
    private catService: FormCategoryService
  ){}

  ngOnInit() {
    this.catService.getCategories().subscribe(cat => this.categories = cat);
  }

  submit(){
    this.formSubmit.emit(this.parentForm.value);
  }
}
