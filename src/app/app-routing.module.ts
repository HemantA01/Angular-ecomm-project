import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { AuthGuard } from './auth.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartSummaryPageComponent } from './cart-summary-page/cart-summary-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


const routes: Routes = [
  {path:'', pathMatch:'full', component: HomeComponent},
  {path:'seller-auth', component: SellerAuthComponent},
  {path:'seller-home', component: SellerHomeComponent, 
    canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(next, state)]
  },
  {path:'seller-add-product', component: SellerAddProductComponent,
  canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(next, state)]
  },
  {path:'seller-update-product/:id', component: SellerUpdateProductComponent,
  canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(next, state)]
  },
  {path:'search-prod/:query', component:SearchProductComponent},
  {path:'details/:productId', component:ProductDetailsComponent},
  {path:'user-auth', component: UserAuthComponent},
  {path:'cart-summary', component: CartSummaryPageComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'my-orders', component: MyOrdersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
