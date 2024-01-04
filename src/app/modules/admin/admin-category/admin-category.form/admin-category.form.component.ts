import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category.form.component.html',
  styleUrls: ['./admin-category.form.component.scss']
})
export class AdminCategoryFormComponent {
  @Input() parentForm!: FormGroup
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  submit(){
    this.formSubmit.emit(this.parentForm.value);
  }
}
