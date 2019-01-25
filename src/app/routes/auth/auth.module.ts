import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthRegisterComponent,
    AuthLoginComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {
}
