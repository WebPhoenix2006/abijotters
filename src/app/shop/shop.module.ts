import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopMainComponent } from './pages/shop-main/shop-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';

import { ViewProductComponent } from './pages/view-product/view-product.component';
import { ShopRoutingModule } from './shop-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopMainComponent,
    NavigationComponent,
    ViewProductComponent,
    CartComponent,
  ],
  exports: [ShopMainComponent, CartComponent],
  imports: [CommonModule, FontAwesomeModule, ShopRoutingModule, SharedModule, FormsModule],
})
export class ShopModule {}
