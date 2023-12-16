import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent {

  @Input() parentForm!: FormGroup
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
  ){}

  submit(){
    this.formSubmit.emit(this.parentForm.value);
  }
}
