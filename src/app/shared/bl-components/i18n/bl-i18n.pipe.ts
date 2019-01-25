import { Pipe, PipeTransform } from '@angular/core';

import { BlI18nService } from './bl-i18n.service';

@Pipe({
  name: 'blI18n'
})
export class BlI18nPipe implements PipeTransform {
  constructor(private _locale: BlI18nService) {
  }

  transform(path: string, keyValue?: object): string {
    return this._locale.translate(path, keyValue);
  }
}
