import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserAuthorizationComponent } from './components/user-authorization/user-authorization.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "products", component: ProductComponent },
  { path: "homepage", component: ProductComponent },
  { path: "products/add", component: ProductAddComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "customer-add", component: CustomerAddComponent },
  { path: "user/auth", component: UserAuthorizationComponent },
  { path: "profile", component: ProfileComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
