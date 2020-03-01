import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeHomeComponent } from './components/home-home/home-home.component';
import { CustomDynamicFieldComponent } from './components/home-home/custom-dynamic-field.component';

@NgModule({
  declarations: [
    HomeHomeComponent,
    CustomDynamicFieldComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    CustomDynamicFieldComponent,
  ],
})
export class HomeModule {
}
