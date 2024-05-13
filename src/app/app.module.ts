import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderService } from './services/order.service';
import { StripeService } from './services/payment.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SliderComponent } from './components/slider/slider.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
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
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { UserEditProfileComponent } from './components/user-edit-profile/user-edit-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    BrandsComponent,
    CategoriesComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    OrderComponent,
    PaymentComponent,
    SliderComponent,
    UserProfileComponent,
    ConfirmationDialogComponent,
    AdminSidebarComponent,
    AdminPanelComponent,
    AdminDashboardComponent,
    AdminProductsDashboardComponent,
    AdminCategoriesDashboardComponent,
    AdminBrandsDashboardComponent,
    AdminUsersDashboardComponent,
    AdminOrdersDashboardComponent,
    AdminAddProductComponent,
    AdminAddCategoryComponent,
    ConfirmationDialogComponent,
    AdminAddBrandComponent,
    AdminProductDetailsComponent,
    AlertDialogComponent,
    UserEditProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    OrderService,
    StripeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
