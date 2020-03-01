import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading, PreloadAllModules } from '@angular/router';
import { environment } from '../../environments/environment';
import { JWTGuard } from '../shared/bl-packages/auth';

import { LayoutComponent } from '../layouts/layout/layout.component';
import { LayoutDefaultComponent } from '../layouts/layout-default/layout-default.component';
import { LayoutFullscreenComponent } from '../layouts/layout-fullscreen/layout-fullscreen.component';
import { LayoutAdminComponent } from '../layouts/layout-admin/layout-admin.component';
import { LayoutCustomComponent } from '../layouts/layout-custom/layout-custom.component';
import { LayoutComponentsComponent } from '../layouts/layout-components/layout-components.component';
import { SelectivePreloadingStrategyService } from '../layouts/layout-components/services';
import { path } from '@angular-devkit/core';
import { LayoutFocusedComponent } from '../layouts/layout-focused/layout-focused.component';
import { LayoutMainComponent } from '../layouts/layout-main/layout-main.component';

const routes: Routes = [
  /*{
    path: '',
    component: LayoutCustomComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule',
      },
    ],
  },*/
  {
    path: '',
    component: LayoutMainComponent,
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
    component: LayoutMainComponent,
    canActivateChild: [JWTGuard],
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule',
      },
    ],
  },
  {
    path: 'developer',
    component: LayoutCustomComponent,
    canActivateChild: [JWTGuard],
    children: [
      {
        path: '',
        loadChildren: './developer/developer.module#DeveloperModule',
      },
    ],
  },
  {
    path: 'focused',
    component: LayoutFocusedComponent,

  },
  /*{
    path: 'covalent',
    component: LayoutComponentsComponent,
  },*/
  {
    // preload: true loads the module immediately
    path: 'covalent/docs',
    component: LayoutFullscreenComponent,
    children: [
      {
        path: '',
        loadChildren: '../layouts/layout-components/components/docs/docs.module#DocsModule',
      },
    ],
  }, // {
  // preload: true loads the module immediately
  // path: '', data: {preload: false,}, loadChildren: '../layouts/layout-components/components/style-guide/style-guide.module#StyleGuideModule',
  // }, {
  {
    // preload: true loads the module immediately
    path: 'covalent/design',
    component: LayoutComponentsComponent,
    data: {
      preload: false,
    },
    children: [
      {
        path: '',
        loadChildren: '../layouts/layout-components/components/design-patterns/design-patterns.module#DesignPatternsModule',
      },
    ],
  },
  {
    // preload: true loads the module immediately
    path: 'covalent/layouts',
    component: LayoutFullscreenComponent,
    children: [
      {
        path: '',
        loadChildren: '../layouts/layout-components/components/layouts/layouts.module#LayoutsModule',
      },
    ],
  }, {
    // preload: true loads the module immediately
    path: 'covalent/components',
    component: LayoutFullscreenComponent,
    loadChildren: '../layouts/layout-components/components/components/components.module#ComponentsModule',
  },
  // redirect to home when route does not exists (must be last route)
  {
    path: '**',
    redirectTo: '',
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
        preloadingStrategy: environment.production ? PreloadAllModules : NoPreloading,
      },
    ),
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutesRoutingModule {
}
