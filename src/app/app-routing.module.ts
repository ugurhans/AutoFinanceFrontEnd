import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWalletComponent } from './components/add-wallet/add-wallet.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TradeComponent } from './components/trade/trade.component';
import { UserAuthorizationComponent } from './components/user-authorization/user-authorization.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'products/add',
    component: ProductAddComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/auth', component: UserAuthorizationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wallet-verify', component: WalletComponent },
  { path: 'product-verify', component: ProductComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'trades', component: TradeComponent },
  { path: 'add-wallet', component: AddWalletComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
