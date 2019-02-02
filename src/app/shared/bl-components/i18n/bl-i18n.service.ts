import { DatePipe } from '@angular/common';
import { Inject, Injectable, Optional, Provider, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoggerService } from '../core/util/logger/logger.service';

// import parse from 'date-fns/parse';

let parse = require('date-fns/parse')

import es_ES from './languages/es_ES';
import { BlI18nInterface } from './bl-i18n.interface';
import { BL_I18N } from './bl-i18n.token';

@Injectable()
export class BlI18nService {
  private _locale: BlI18nInterface;
  private _change = new BehaviorSubject<BlI18nInterface>(this._locale);

  constructor(@Inject(BL_I18N) locale: BlI18nInterface, private _logger: LoggerService, private datePipe: DatePipe) {
    this.setLocale(locale || es_ES);
  }

  get localeChange(): Observable<BlI18nInterface> {
    return this._change.asObservable();
  }

  // [NOTE] Performance issue: this method may called by every change detections
  // TODO: cache more deeply paths for performance
  /* tslint:disable-next-line:no-any */
  translate(path: string, data?: any): string {
    // this._logger.debug(`[BlI18nService] Translating(${this._locale.locale}): ${path}`);
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach((key) => content = content.replace(new RegExp(`%${key}%`, 'g'), data[ key ]));
      }
      return content;
    }
    return path;
  }

  /**
   * Set/Change current locale globally throughout the WHOLE application
   * [NOTE] If called at runtime, rendered interface may not change along with the locale change (because this do not trigger another render schedule)
   * @param locale The translating letters
   */
  setLocale(locale: BlI18nInterface): void {
    if (this._locale && this._locale.locale === locale.locale) {
      return;
    }
    this._locale = locale;
    this._change.next(locale);
  }

  getLocale(): BlI18nInterface {
    return this._locale;
  }

  getLocaleId(): string {
    return this._locale ? this._locale.locale : '';
  }

  /**
   * Get locale data
   * @param path dot paths for finding exist value from locale data, eg. "a.b.c"
   * @param defaultValue default value if the result is not "truthy"
   */
  getLocaleData(path?: string, defaultValue?: any): any { // tslint:disable-line:no-any
    const result = path ? this._getObjectPath(this._locale, path) : this._locale;
    return result || defaultValue;
  }

  formatDate(date: Date, format?: string, locale?: string): string {
    return date ? this.datePipe.transform(date, format, null, locale || this.getLocale().locale) : '';
  }

  /**
   * Format date with compatible for the format of moment and others
   * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
   */
  formatDateCompatible(date: Date, format?: string, locale?: string): string {
    return this.formatDate(date, this.compatDateFormat(format), locale);
  }

  parseDate(text: string): Date {
    if (!text) {
      return;
    }
    return parse(text);
  }

  parseTime(text: string): Date {
    if (!text) {
      return;
    }
    return parse(`1970-01-01 ${text}`);
  }

  private _getObjectPath(obj: object, path: string): string | object | any { // tslint:disable-line:no-any
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[ paths[ index++ ] ];
    }
    return index === depth ? res : null;
  }

  /**
   * Compatible translate the moment-like format pattern to angular's pattern
   * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
   *
   * TODO: compare and complete all format patterns
   * Each format docs as below:
   * @link https://momentjs.com/docs/#/displaying/format/
   * @link https://angular.io/api/common/DatePipe#description
   * @param format input format pattern
   */
  private compatDateFormat(format: string): string {
    return format && format
    .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
    .replace(/D/g, 'd'); // d, dd represent of D, DD for momentjs, others are not support
  }
}

export function BL_LOCALE_SERVICE_PROVIDER_FACTORY(exist: BlI18nService, locale: BlI18nInterface, logger: LoggerService, datePipe: DatePipe): BlI18nService {
  return exist || new BlI18nService(locale, logger, datePipe);
}

export const BL_I18N_SERVICE_PROVIDER: Provider = {
  provide   : BlI18nService,
  useFactory: BL_LOCALE_SERVICE_PROVIDER_FACTORY,
  deps      : [ [ new Optional(), new SkipSelf(), BlI18nService ], BL_I18N, LoggerService, DatePipe ]
};
