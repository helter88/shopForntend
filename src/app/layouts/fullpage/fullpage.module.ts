import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageComponent } from './fullpage.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ProductDetailsComponent } from 'src/app/modules/product-details/product-details.component';
import { CategoryComponent } from 'src/app/modules/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FullpageComponent,
    LoginComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullpageModule { }
