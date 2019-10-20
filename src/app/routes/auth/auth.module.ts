import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  declarations: [
    AuthRegisterComponent,
    AuthLoginComponent,
    AuthComponent,
    LogoutComponent,
    ConfirmationComponent,
    ActivateComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {
}
