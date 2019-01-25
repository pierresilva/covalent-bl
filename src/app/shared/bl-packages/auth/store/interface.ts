import { InjectionToken } from '@angular/core';
import { ITokenModel } from '../token/interface';
import { BLA_STORE_TOKEN_LOCAL_FACTORY } from './local-storage.service';

export const BLA_STORE_TOKEN = new InjectionToken<IStore>(
  'AUTH_STORE_TOKEN',
  {
    providedIn: 'root',
    factory: BLA_STORE_TOKEN_LOCAL_FACTORY,
  },
);

export interface IStore {
  get(key: string): ITokenModel;

  set(key: string, value: ITokenModel): boolean;

  remove(key: string);
}
