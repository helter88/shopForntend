import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryService } from '../admin-category.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../../admin-message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.scss']
})
export class AdminCategoryUpdateComponent {

  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private location: Location,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.categoryForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: [""],
      slug: ["", [Validators.required, Validators.minLength(2)]],
    })
    this.adminCategoryService.getCategory(Number(this.route.snapshot.params['id']))
      .subscribe(cat => this.categoryForm.setValue({
        name: cat.name,
        description: cat.description,
        slug: cat.slug
      }))
  }

  onFormSubmit(formValue: any){
    this.adminCategoryService.updateCategory(Number(this.route.snapshot.params['id']), this.categoryForm.value)
      .subscribe({
        next: () => {
          this.snackBar.open("Category saved",'', {duration: 2600});
          this.location.back();
        },
        error: err => {
          this.adminMessageService.addSpringErrors(err.error);
        }
      });
  }

}
