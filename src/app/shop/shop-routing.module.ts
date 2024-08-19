import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShopMainComponent } from "./pages/shop-main/shop-main.component";
import { ViewProductComponent } from "./pages/view-product/view-product.component";

const routes: Routes = [
	{path: '', component: ShopMainComponent, children: [
		// {path: '', redirectTo: 'all', pathMatch: 'full'},
		// {path: 'view-product', component: ViewProductComponent},
	]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }