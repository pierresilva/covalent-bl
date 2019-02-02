import { NgModule } from '@angular/core';

import esES from './languages/es-ES';

import { BL_LOCALE_SERVICE_PROVIDER } from './locale.service';
import { BL_LOCALE } from './locale.tokens';

@NgModule({
  providers: [
    { provide: BL_LOCALE, useValue: esES },
    BL_LOCALE_SERVICE_PROVIDER,
  ],
})
export class BlLocaleModule { }
