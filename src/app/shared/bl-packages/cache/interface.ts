// tslint:disable
export interface ICache {
  v: any;
  /** Expiration timestamp, `0` means not expired */
  e: number;
}

export interface ICacheStore {
  get(key: string): ICache;

  set(key: string, value: ICache): boolean;

  remove(key: string);
}

export type CacheNotifyType = 'set' | 'remove' | 'expire';

export interface CacheNotifyResult {
  type: CacheNotifyType;
  value?: any;
}
