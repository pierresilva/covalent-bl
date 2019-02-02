import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from '../layouts/layout-default/layout-default.component';
import { environment } from '../../environments/environment';
import { LayoutFullscreenComponent } from '../layouts/layout-fullscreen/layout-fullscreen.component';
import { LayoutAdminComponent } from '../layouts/layout-admin/layout-admin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        loadChildren: './landing/landing.module#LandingModule',
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
    component: LayoutAdminComponent,
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
