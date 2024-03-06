import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from 'src/app/modules/category/category.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FullpageComponent } from './fullpage.component';

@NgModule({
  declarations: [
    FullpageComponent,
    LoginComponent,
    CategoryComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullpageModule { }
