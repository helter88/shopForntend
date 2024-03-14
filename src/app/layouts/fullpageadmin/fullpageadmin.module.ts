import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminCategoryAddComponent } from 'src/app/modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from 'src/app/modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryComponent } from 'src/app/modules/admin/admin-category/admin-category.component';
import { AdminCategoryFormComponent } from 'src/app/modules/admin/admin-category/admin-category.form/admin-category.form.component';
import { AdminConfirmationDialogComponent } from 'src/app/modules/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { AdminMessageComponent } from 'src/app/modules/admin/admin-message/admin-message.component';
import { AdminOrderExportComponent } from 'src/app/modules/admin/admin-order/admin-order-export/admin-order-export.component';
import { AdminOrderListComponent } from 'src/app/modules/admin/admin-order/admin-order-list/admin-order-list.component';
import { AdminOrderStatisticsComponent } from 'src/app/modules/admin/admin-order/admin-order-statistics/admin-order-statistics.component';
import { AdminOrderUpdateComponent } from 'src/app/modules/admin/admin-order/admin-order-update/admin-order-update.component';
import { AdminProductFormComponent } from 'src/app/modules/admin/admin-product/admin-product-form/admin-product-form.component';
import { DragProductImageDirective } from 'src/app/modules/admin/admin-product/admin-product-form/drag-product-image.directive';
import { AdminProductComponent } from 'src/app/modules/admin/admin-product/admin-product.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FullpageadminComponent } from './fullpageadmin.component';

@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminProductComponent,
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
    DragProductImageDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminModule { }
