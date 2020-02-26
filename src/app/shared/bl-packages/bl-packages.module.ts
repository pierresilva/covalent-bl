import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACLModule } from './acl';
import { AuthModule } from './auth';
import { CacheModule } from './cache';
import { BlLocaleModule } from './locale';
import { CNCurrencyPipe, COCurrencyPipe, DatePipe, KeysPipe, HTMLPipe, URLPipe } from './pipes';
import { I18nPipe } from './i18n/i18n.pipe';

export * from './acl';
export * from './auth';
export * from './cache';
export * from './http';
export * from './i18n';
export * from './locale';
export * from './menu';
export * from './pipes';
export * from './settings';
export * from './title';
export * from './bl.packages.config';

@NgModule({
  declarations: [
    CNCurrencyPipe,
    COCurrencyPipe,
    DatePipe,
    KeysPipe,
    HTMLPipe,
    URLPipe,
    I18nPipe,
  ],
  imports: [
    CommonModule,
    ACLModule,
    AuthModule,
    CacheModule,
    BlLocaleModule,
  ],
  exports: [
    COCurrencyPipe,
    DatePipe,
    KeysPipe,
    HTMLPipe,
    URLPipe,
    I18nPipe,
  ],
})
export class BlPackagesModule {
  /**
   * @deprecated Use `BlPackagesModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BlPackagesModule,
    };
  }
}
