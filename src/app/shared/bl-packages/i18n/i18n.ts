import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface BlI18NService {
  // tslint:disable-next-line:no-any
  [key: string]: any;

  /**
   * Change language
   * @param lang language code
   * @param emit Whether to trigger `change`, default: true
   */
  use(lang: string, emit?: boolean): void;

  /**
   * Return to current language list
   */
  // tslint:disable-next-line:no-any
  getLangs(): any[];

  /**
   * translation
   * - `params` The parameter object required by the template
   * - `isSafe` Whether to return a security character, automatically call `bypassSecurityTrustHtml`
   */
  fanyi(key: string, params?: {}, isSafe?: boolean): string;

  /**
   * Call `use` to trigger a change notification
   */
  readonly change: Observable<string>;
}

export const BL_I18N_TOKEN = new InjectionToken<BlI18NService>(
  'BlTranslatorToken',
  {
    providedIn: 'root',
    factory: BL_I18N_TOKEN_FACTORY,
  },
);

export function BL_I18N_TOKEN_FACTORY() {
  return new BlI18NServiceFake();
}

@Injectable({ providedIn: 'root' })
export class BlI18NServiceFake implements BlI18NService {
  private change$ = new BehaviorSubject<string>(null);

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter(w => w != null));
  }

  use(lang: string): void {
    this.change$.next(lang);
  }

  // tslint:disable-next-line:no-any
  getLangs(): any[] {
    return [];
  }

  fanyi(key: string) {
    return key;
  }
}
