import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { JWTGuard } from '../shared/bl-packages/auth';

import { LayoutComponent } from '../layouts/layout/layout.component';
import { LayoutDefaultComponent } from '../layouts/layout-default/layout-default.component';
import { LayoutFullscreenComponent } from '../layouts/layout-fullscreen/layout-fullscreen.component';
import { LayoutAdminComponent } from '../layouts/layout-admin/layout-admin.component';
import { LayoutCustomComponent } from '../layouts/layout-custom/layout-custom.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutCustomComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule',
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutFullscreenComponent,
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule',
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutCustomComponent,
    canActivateChild: [JWTGuard],
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: environment.useHash,
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      },
    ),
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutesRoutingModule { }
