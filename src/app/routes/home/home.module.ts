import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';


import { HomeRoutingModule } from './home-routing.module';
import { HomeHomeComponent } from './components/home-home/home-home.component';


@NgModule({
  declarations: [
    HomeHomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
