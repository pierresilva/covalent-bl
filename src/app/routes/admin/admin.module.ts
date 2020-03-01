import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminMenusComponent } from './admin-menus/admin-menus.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    AdminHomeComponent,
    AdminMenusComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
})
export class AdminModule { }
