import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { FullpageadminemptyComponent } from './layouts/fullpageadminempty/fullpageadminempty.component';
import { AdminCategoryAddComponent } from './modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryComponent } from './modules/admin/admin-category/admin-category.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { AdminOrderExportComponent } from './modules/admin/admin-order/admin-order-export/admin-order-export.component';
import { AdminOrderListComponent } from './modules/admin/admin-order/admin-order-list/admin-order-list.component';
import { AdminOrderStatisticsComponent } from './modules/admin/admin-order/admin-order-statistics/admin-order-statistics.component';
import { AdminOrderUpdateComponent } from './modules/admin/admin-order/admin-order-update/admin-order-update.component';
import { AdminProductFormComponent } from './modules/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductComponent } from './modules/admin/admin-product/admin-product.component';
import { CartComponent } from './modules/cart/cart.component';
import { CategoryComponent } from './modules/category/category.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { OrderComponent } from './modules/order/order.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { ProductSearchComponent } from './modules/product-search/product-search.component';
import { ProductComponent } from './modules/product/product.component';
import { OrdersComponent } from './modules/profile/orders/orders.component';
import { UserDataComponent } from './modules/profile/user-data/user-data.component';
import { RegisterComponent } from './modules/register/register.component';
import { adminAuthorizedGuard } from './shared/guard/adminAuthorizeGuard';

const routes: Routes = [
{
  path: '', component: DefaultComponent, children: [{
    path: '', component: HomeComponent
  }, {
    path: 'products', component: ProductComponent
  }, {
    path: 'products/search', component: ProductSearchComponent
  }, {
    path: 'products/:slug', component: ProductDetailsComponent
  }, {
    path: 'categories/:catSlug', component: CategoryComponent
  }, {
    path: 'categories/:catSlug/:slug', component: ProductDetailsComponent
  }, {
    path: 'cart', component: CartComponent
  }, {
    path: 'order', component: OrderComponent 
  }, {
    path: 'profile', redirectTo: 'profile/orders'
  }, {
    path: 'profile/orders', component: OrdersComponent 
  }, {
    path: 'profile/userData', component: UserDataComponent 
  }]
}, {
  path: '', component: FullpageComponent, children: [{
    path: 'login', component: LoginComponent
  },{
    path: 'register', component: RegisterComponent
  }]
}, {
  path: '', component: FullpageadminComponent, canActivateChild: [adminAuthorizedGuard],
  children: [{
    path: 'admin', redirectTo: 'admin/products'
  }, {
    path: 'admin/products', component: AdminProductComponent,
  }, {
    path: 'admin/products/update/:id', component: AdminProductFormComponent,
  }, {
    path: 'admin/products/add', component: AdminProductFormComponent,
  }, {
    path: 'admin/categories', component: AdminCategoryComponent,
  }, {
    path: 'admin/categories/update/:id', component: AdminCategoryUpdateComponent,
  }, {
    path: 'admin/categories/add', component: AdminCategoryAddComponent,
  }, {
    path: 'admin/orders', component: AdminOrderListComponent,
  }, {
    path: 'admin/orders/update/:id', component: AdminOrderUpdateComponent,
  }, {
    path: 'admin/orders/export', component: AdminOrderExportComponent,
  }, {
    path: 'admin/statistics', component: AdminOrderStatisticsComponent,
  }]
}, {
  path: '', component: FullpageadminemptyComponent, children: [{
    path: 'admin/login', component: AdminLoginComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
