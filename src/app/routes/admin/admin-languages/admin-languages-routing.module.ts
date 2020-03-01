import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLanguagesViewComponent } from './components/admin-languages-view/admin-languages-view.component';
import { AdminLanguagesFormComponent } from './components/admin-languages-form/admin-languages-form.component';
import { AdminLanguagesListComponent } from './components/admin-languages-list/admin-languages-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLanguagesListComponent,
  },
  {
    path: 'view/:id',
    component: AdminLanguagesViewComponent,
  },
  {
    path: 'create',
    component: AdminLanguagesFormComponent,
  },
  {
    path: 'edit/:id',
    component: AdminLanguagesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLanguagesRoutingModule { }
