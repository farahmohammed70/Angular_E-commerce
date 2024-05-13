import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthGuardService } from './guards/auth-guard.guard';
import { AdminGuardService } from './guards/admin-guard.guard';
import { CanDeactivatePage } from './guards/can-deactivate.guard';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsDashboardComponent } from './components/admin/admin-products-dashboard/admin-products-dashboard.component';
import { AdminCategoriesDashboardComponent } from './components/admin/admin-categories-dashboard/admin-categories-dashboard.component';
import { AdminBrandsDashboardComponent } from './components/admin/admin-brands-dashboard/admin-brands-dashboard.component';
import { AdminUsersDashboardComponent } from './components/admin/admin-users-dashboard/admin-users-dashboard.component';
import { AdminOrdersDashboardComponent } from './components/admin/admin-orders-dashboard/admin-orders-dashboard.component';
import { AdminAddProductComponent } from './components/admin/admin-add-product/admin-add-product.component';
import { AdminAddCategoryComponent } from './components/admin/admin-add-category/admin-add-category.component';
import { AdminAddBrandComponent } from './components/admin/admin-add-brand/admin-add-brand.component';
import { AdminProductDetailsComponent } from './components/admin/admin-product-details/admin-product-details.component';
import { UserEditProfileComponent } from './components/user-edit-profile/user-edit-profile.component';
/*---------------------------------------------------------------------------------------------------------*/
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    canActivate: [AuthGuardService, AdminGuardService],
    children: [
      { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
      { path: 'productsDashboard', component: AdminProductsDashboardComponent },
      { path: 'addProduct', component: AdminAddProductComponent, canDeactivate: [CanDeactivatePage] },
      { path: 'editProduct/:id', component: AdminAddProductComponent },
      { path: 'productDetails/:id', component: AdminProductDetailsComponent },
      { path: 'categoriesDashboard', component: AdminCategoriesDashboardComponent },
      { path: 'addCategory', component: AdminAddCategoryComponent },
      { path: 'editCategory/:id', component: AdminAddCategoryComponent },
      { path: 'brandsDashboard', component: AdminBrandsDashboardComponent },
      { path: 'addBrand', component: AdminAddBrandComponent },
      { path: 'editBrand/:id', component: AdminAddBrandComponent },
      { path: 'usersDashboard', component: AdminUsersDashboardComponent },
      { path: 'ordersDashboard', component: AdminOrdersDashboardComponent },
    ],
  },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'userprofile/:id', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'usereditprofile/:id', component: UserEditProfileComponent, canActivate: [AuthGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegisterComponent, canDeactivate: [CanDeactivatePage] },
  { path: 'productsDetails/:id', component: ProductsDetailsComponent, canActivate: [AuthGuardService] },

  //Order
  { path: 'Orders', component: OrderComponent, canActivate: [AuthGuardService] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuardService] },
  // { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
/*---------------------------------------------------------------------------------------------------------*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
/*---------------------------------------------------------------------------------------------------------*/
