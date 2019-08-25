import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { LayoutLandingComponent } from './layout-landing/layout-landing.component';
import { LayoutFullscreenComponent } from './layout-fullscreen/layout-fullscreen.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutAdminMainMenuComponent } from './layout-admin/components/layout-admin-main-menu/layout-admin-main-menu.component';
import { LayoutCustomComponent } from './layout-custom/layout-custom.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LayoutDefaultComponent,
    LayoutLandingComponent,
    LayoutFullscreenComponent,
    LayoutAdminComponent,
    LayoutAdminMainMenuComponent,
    LayoutCustomComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class LayoutsModule {
}
