import { NgModule } from '@angular/core';

import { LOGGER_SERVICE_PROVIDER, BL_LOGGER_STATE } from './logger.service';

@NgModule({
  providers: [
    { provide: BL_LOGGER_STATE, useValue: false },
    LOGGER_SERVICE_PROVIDER
  ]
})
export class LoggerModule { }
