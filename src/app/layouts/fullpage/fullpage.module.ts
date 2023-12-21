import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageComponent } from './fullpage.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ProductDetailsComponent } from 'src/app/modules/product-details/product-details.component';

@NgModule({
  declarations: [
    FullpageComponent,
    LoginComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class FullpageModule { }
