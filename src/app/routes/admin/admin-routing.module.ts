import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { JWTGuard } from '../../shared/bl-packages/auth';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [JWTGuard],
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        data: {
          title: 'app.administration.title',
        },
      },
      {
        path: 'languages',
        data: {
          title: 'app.admin.languages.title',
        },
        loadChildren: './admin-languages/admin-languages.module#AdminLanguagesModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
