import { inject, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AuthConfig } from '../auth.config';
import { BLA_STORE_TOKEN, IStore } from '../store/interface';
import { AuthReferrer, ITokenModel, ITokenService } from './interface';

export function BLA_SERVICE_TOKEN_FACTORY(): ITokenService {
  return new TokenService(inject(AuthConfig), inject(BLA_STORE_TOKEN));
}

export class TokenService implements ITokenService {
  private change$: BehaviorSubject<ITokenModel> = new BehaviorSubject<ITokenModel>(null);
  private _referrer: AuthReferrer = {};

  constructor(private options: AuthConfig, @Inject(BLA_STORE_TOKEN) private store: IStore) { }

  get login_url(): string {
    return this.options.login_url;
  }

  get referrer() {
    return this._referrer;
  }

  set referrer(val: AuthReferrer) {
    this._referrer = val;
  }

  set(data: ITokenModel): boolean {
    this.change$.next(data);
    return this.store.set(this.options.store_key, data);
  }

  // tslint:disable-next-line:no-any
  get(type?: any);
  get<T extends ITokenModel>(type?: { new(): T }): T {
    const data = this.store.get(this.options.store_key);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  clear() {
    this.change$.next(null);
    this.store.remove(this.options.store_key);
  }

  change(): Observable<ITokenModel> {
    return this.change$.pipe(share());
  }
}
