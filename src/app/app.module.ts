import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, LOCALE_ID, NgModule, ModuleWithProviders } from '@angular/core';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
// register 'es' locale
registerLocaleData(localeEs);

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { LayoutsModule } from './layouts/layouts.module';
import { TitleService } from './shared/services/title.service';
import { ApiService } from './shared/services/api.service';
import { JwtService } from './shared/services/jwt.service';
import { AuthService } from './shared/services/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { environment } from '../environments/environment';

import { ACLModule } from './shared/bl-packages/bl-packages.module';
import { AuthModule, AuthConfig, SimpleInterceptor } from './shared/bl-packages/auth';
export function blAuthConfig(): AuthConfig {
  return Object.assign(new AuthConfig(), {
    login_url: '/auth',
    store_key: '_token',
    token_invalid_redirect: true,
    token_exp_offset: 10,
    token_send_key: 'Authorization',
    token_send_template: 'Bearer ${token}',
    token_send_place: 'header',
    allow_anonymous_key: '_allow_anonymous',
    executeOtherInterceptors: true,
  });
}

import { DefaultInterceptor } from './core/default.interceptor';

import { StartupService } from './core/startup.service';

export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}
const APPINIT_PROVIDES: any = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RoutesModule,
    LayoutsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ACLModule.forRoot(),
  ],
  providers: [
    TitleService,
    ApiService,
    JwtService,
    AuthService,
    LoadingService,
    {
      provide: LOCALE_ID,
      useValue: localStorage.getItem(environment.app_prefix + 'lang'),
    },

    { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },

    ...APPINIT_PROVIDES,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useFactory: blAuthConfig },
      ],
    };
  }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
