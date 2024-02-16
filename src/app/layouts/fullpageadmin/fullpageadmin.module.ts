import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageadminComponent } from './fullpageadmin.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { RouterModule } from '@angular/router';
import { AdminProductComponent } from 'src/app/modules/admin/admin-product/admin-product.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { AdminProductUpdateComponent } from 'src/app/modules/admin/admin-product-update/admin-product-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProductAddComponent } from 'src/app/modules/admin/admin-product/admin-product-add/admin-product-add.component';
import { AdminProductFormComponent } from 'src/app/modules/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminMessageComponent } from 'src/app/modules/admin/admin-message/admin-message.component';
import { AdminConfirmationDialogComponent } from 'src/app/modules/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { AdminCategoryComponent } from 'src/app/modules/admin/admin-category/admin-category.component';
import { AdminCategoryAddComponent } from 'src/app/modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from 'src/app/modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryFormComponent } from 'src/app/modules/admin/admin-category/admin-category.form/admin-category.form.component';
import { AdminOrderUpdateComponent } from 'src/app/modules/admin/admin-order/admin-order-update/admin-order-update.component';
import { AdminOrderListComponent } from 'src/app/modules/admin/admin-order/admin-order-list/admin-order-list.component';
import { AdminOrderExportComponent } from 'src/app/modules/admin/admin-order/admin-order-export/admin-order-export.component';
import { AdminOrderStatisticsComponent } from 'src/app/modules/admin/admin-order/admin-order-statistics/admin-order-statistics.component';

@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminProductComponent,
    AdminProductUpdateComponent,
    AdminProductAddComponent,
    AdminProductFormComponent,
    AdminMessageComponent,
    AdminConfirmationDialogComponent,
    AdminCategoryComponent,
    AdminCategoryAddComponent,
    AdminCategoryUpdateComponent,
    AdminCategoryFormComponent,
    AdminOrderUpdateComponent,
    AdminOrderListComponent,
    AdminOrderExportComponent,
    AdminOrderStatisticsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminModule { }
