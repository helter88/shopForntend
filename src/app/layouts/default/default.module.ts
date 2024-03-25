import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from 'src/app/modules/product-details/product-details.component';
import { CartComponent } from 'src/app/modules/cart/cart.component';
import { OrderComponent } from 'src/app/modules/order/order.component';
import { ReplacePipe } from 'src/app/shared/pipes/replacePipe';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ProductSearchComponent } from 'src/app/modules/product-search/product-search.component';
import { OrdersComponent } from 'src/app/modules/profile/orders/orders.component';
import { UserDataComponent } from 'src/app/modules/profile/user-data/user-data.component';

register();
@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductSearchComponent,
    CartComponent,
    OrderComponent,
    ReplacePipe,
    ProfileComponent,
    OrdersComponent,
    UserDataComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DefaultModule { }
