import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminLoginComponent } from 'src/app/modules/admin/admin-login/admin-login.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FullpageadminemptyComponent } from './fullpageadminempty.component';



@NgModule({
  declarations: [
    FullpageadminemptyComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminemptyModule { }
