import { Inject, Injectable, Optional, Provider, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import esES from './languages/es-ES';
import { BL_LOCALE } from './locale.tokens';
import { LocaleData } from './locale.types';

@Injectable()
export class BlLocaleService {
  private _locale: LocaleData;
  private change$ = new BehaviorSubject<LocaleData>(this._locale);

  constructor(@Inject(BL_LOCALE) locale: LocaleData) {
    this.setLocale(locale || esES);
  }

  get change(): Observable<LocaleData> {
    return this.change$.asObservable();
  }

  setLocale(locale: LocaleData): void {
    if (this._locale && this._locale.abbr === locale.abbr) {
      return;
    }
    this._locale = locale;
    this.change$.next(locale);
  }

  get locale(): LocaleData {
    return this._locale;
  }

  getData(path: string) {
    return this._locale[path] || {};
  }
}

export function BL_LOCALE_SERVICE_PROVIDER_FACTORY(
  exist: BlLocaleService,
  locale: LocaleData,
): BlLocaleService {
  return exist || new BlLocaleService(locale);
}

export const BL_LOCALE_SERVICE_PROVIDER: Provider = {
  provide: BlLocaleService,
  useFactory: BL_LOCALE_SERVICE_PROVIDER_FACTORY,
  deps: [[new Optional(), new SkipSelf(), BlLocaleService], BL_LOCALE],
};
