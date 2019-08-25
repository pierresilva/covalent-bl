import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: AuthLoginComponent,
        data: {
          title: 'Ingresar al sistema',
        },
      },
      {
        path: 'register',
        component: AuthRegisterComponent,
        data: {
          title: 'Registro como usuario',
        },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: 'Salir',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
