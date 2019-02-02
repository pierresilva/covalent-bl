import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { CovalentModule } from './covalent/covalent.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { InterfacesModule } from './interfaces/interfaces.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlDisplayErrorComponent } from './services/display-error/display-error.component';
import { TranslateModule } from '@ngx-translate/core';
import { BlComponentsModule } from './bl-components/bl-components.module';
import { BlPackagesModule } from './bl-packages/bl-packages.module';

@NgModule({
  declarations: [
    BlDisplayErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    InterfacesModule,
    BlComponentsModule,
    BlPackagesModule,
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CovalentModule,
    ComponentsModule,
    DirectivesModule,
    InterfacesModule,
    BlDisplayErrorComponent,
    TranslateModule,
    BlComponentsModule,
    BlPackagesModule,
  ],
  entryComponents: [
    BlDisplayErrorComponent,
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },*/
  ],
})
export class SharedModule {
}
