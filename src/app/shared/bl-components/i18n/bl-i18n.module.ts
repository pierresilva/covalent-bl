import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoggerModule } from '../core/util/logger/logger.module';

import zh_CN from './languages/zh_CN';
import { BlI18nPipe } from './bl-i18n.pipe';
import { BL_I18N_SERVICE_PROVIDER } from './bl-i18n.service';
import { BL_I18N } from './bl-i18n.token';

@NgModule({
  imports     : [ LoggerModule ],
  declarations: [ BlI18nPipe ],
  exports     : [ BlI18nPipe ],
  providers   : [
    { provide: BL_I18N, useValue: zh_CN },
    DatePipe,
    BL_I18N_SERVICE_PROVIDER
  ]
})
export class BlI18nModule {
}
