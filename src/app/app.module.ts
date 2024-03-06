import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { PayOrderComponent } from './pay-order/pay-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { WhishListComponent } from './whish-list/whish-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    CategoriesComponent,
    CartComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NotfoundComponent,
    NavbarComponent,
    ProductDetailsComponent,
    SearchPipe,
    PayOrderComponent,
    AllOrdersComponent,
    WhishListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule ,HttpClientModule,RouterModule,BrowserAnimationsModule, CarouselModule, FormsModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
        DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
        ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
        ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
        NgxSpinnerModule,
        
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AddHeaderInterceptor,
    multi:true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:LoadingInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
