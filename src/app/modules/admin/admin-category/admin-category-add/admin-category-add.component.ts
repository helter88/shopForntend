import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryService } from '../admin-category.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../../admin-message.service';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.scss']
})
export class AdminCategoryAddComponent {
  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private location: Location,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ){}

  ngOnInit(){
    this.categoryForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: [""],
      slug: ["", [Validators.required, Validators.minLength(2)]],
    })
  }

  onFormSubmit(formValue: any){
    this.adminCategoryService.saveCategory(this.categoryForm.value)
      .subscribe({
        next: cat => {
          this.snackBar.open("Category saved",'', {duration: 2600});
          this.location.back();
        },
        error: err => {
          this.adminMessageService.addSpringErrors(err.error);
        }
      });
  }
}
