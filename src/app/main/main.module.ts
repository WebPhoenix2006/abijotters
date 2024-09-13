import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './components/slider/slider.component';
import { RouterModule } from '@angular/router';
import { ShopModule } from '../shop/shop.module';
import { MainRoutingModule } from './main-routing.module';
import { BigSlideComponent } from './components/big-slide/big-slide.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    SliderComponent,
    BigSlideComponent,
  
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ShopModule
  ]
})
export class MainModule { }
