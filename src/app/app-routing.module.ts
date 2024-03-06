import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PayOrderComponent } from './pay-order/pay-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { WhishListComponent } from './whish-list/whish-list.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", canActivate: [authGuard], component: HomeComponent, title: "Home" },
  { path: "brands", canActivate: [authGuard], component: BrandsComponent, title: "Brands" },
  { path: "cart", canActivate: [authGuard], component: CartComponent, title: "Cart" },
  { path: "categories", canActivate: [authGuard], component: CategoriesComponent, title: "categories" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "register", component: RegisterComponent, title: "Register" },
  { path: "products", canActivate: [authGuard], component: ProductsComponent, title: "Products" },
  { path: "allorders", canActivate: [authGuard], component: AllOrdersComponent, title: "Your orders" },
  { path: "whishlist", canActivate: [authGuard], component: WhishListComponent, title: "Your whish-list" },
  { path: "productDetails/:id", canActivate: [authGuard], component: ProductDetailsComponent, title: "Products details" },
  { path: "pay/:id", canActivate: [authGuard], component: PayOrderComponent, title: "Payment details" },
  { path: "setting", canActivate: [authGuard], loadChildren: () => import('./setting/setting.module').then((m) => m.SettingModule) },
  { path: "**", canActivate: [authGuard], component: NotfoundComponent, title: "NotFound" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
