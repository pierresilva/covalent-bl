// tslint:disable
import { InjectionToken } from '@angular/core';
import { ICache, ICacheStore } from './interface';

export const BLC_STORE_STORAGE_TOKEN = new InjectionToken<ICacheStore>(
  'BLC_STORE_STORAGE_TOKEN',
  {
    providedIn: 'root',
    factory: BLC_STORE_STORAGE_TOKEN_FACTORY,
  },
);

export function BLC_STORE_STORAGE_TOKEN_FACTORY() {
  return new LocalStorageCacheService();
}

export class LocalStorageCacheService implements ICacheStore {
  get(key: string): ICache {
    return JSON.parse(localStorage.getItem(key) || 'null') || null;
  }

  set(key: string, value: ICache): boolean {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
