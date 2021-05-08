import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CategoryComponent } from './components/category/category.component';
import { TradeComponent } from './components/trade/trade.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    CustomerComponent,
    SupplierComponent,
    WalletComponent,
    CategoryComponent,
    TradeComponent,
    ProductAddComponent,
    LoginComponent,
    

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:10000,
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
