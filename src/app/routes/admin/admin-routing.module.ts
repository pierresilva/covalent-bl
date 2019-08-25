import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { JWTGuard } from '../../shared/bl-packages/auth';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [JWTGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
