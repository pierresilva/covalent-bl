// tslint:disable
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as addSeconds from 'date-fns/add_seconds';

import { CacheConfig } from './cache.config';
import {
  CacheNotifyResult,
  CacheNotifyType,
  ICache,
  ICacheStore,
} from './interface';
import { BLC_STORE_STORAGE_TOKEN } from './local-storage-cache.service';

@Injectable({ providedIn: 'root' })
export class CacheService implements OnDestroy {
  private readonly memory: Map<string, ICache> = new Map<string, ICache>();
  private readonly notifyBuffer: Map<string, BehaviorSubject<CacheNotifyResult>> = new Map<string, BehaviorSubject<CacheNotifyResult>>();
  private meta: Set<string> = new Set<string>();
  private freqTick: number = 3000;
  private freqTime: any;
  private cog: CacheConfig = {};

  constructor(
    _: CacheConfig,
    @Inject(BLC_STORE_STORAGE_TOKEN) private store: ICacheStore,
    private http: HttpClient,
  ) {
    Object.assign(this.cog, { ...new CacheConfig(), ..._});
    this.loadMeta();
    this.startExpireNotify();
  }

  _deepGet(obj: any, path: string[], defaultValue?: any) {
    if (!obj) return defaultValue;
    if (path.length <= 1) {
      const checkObj = path.length ? obj[path[0]] : obj;
      return typeof checkObj === 'undefined' ? defaultValue : checkObj;
    }
    return path.reduce((o, k) => o[k], obj) || defaultValue;
  }

  // #region meta

  private pushMeta(key: string) {
    if (this.meta.has(key)) return;
    this.meta.add(key);
    this.saveMeta();
  }

  private removeMeta(key: string) {
    if (!this.meta.has(key)) return;
    this.meta.delete(key);
    this.saveMeta();
  }

  private loadMeta() {
    const ret = this.store.get(this.cog.meta_key);
    if (ret && ret.v) {
      (ret.v as string[]).forEach(key => this.meta.add(key));
    }
  }

  private saveMeta() {
    const metaData: string[] = [];
    this.meta.forEach(key => metaData.push(key));
    this.store.set(this.cog.meta_key, { v: metaData, e: 0 });
  }

  getMeta() {
    return this.meta;
  }

  // #endregion

  // #region set

  /**
   * Persist the cache `Observable` object, for example:
   * - `set('data/1', this.http.get('data/1')).subscribe()`
   * - `set('data/1', this.http.get('data/1'), { expire: 10 }).subscribe()`
   */
  set<T>(
    key: string,
    data: Observable<T>,
    options?: { type?: 's'; expire?: number },
  ): Observable<T>;

  /**
   * Persistently cache the `Observable` object, for example:
   * - `set('data/1', this.http.get('data/1')).subscribe()`
   * - `set('data/1', this.http.get('data/1'), { expire: 10 }).subscribe()`
   */
  set(
    key: string,
    data: Observable<any>,
    options?: { type?: 's'; expire?: number },
  ): Observable<any>;

  /**
   * Persistent caching base objects, such as:
   * - `set('data/1', 1)`
   * - `set('data/1', 1, { expire: 10 })`
   */
  set(
    key: string,
    data: {},
    options?: { type?: 's'; expire?: number },
  ): void;

  /**
   * Specify the cache type for caching objects, such as memory caching:
   * - `set('data/1', 1, { type: 'm' })`
   * - `set('data/1', 1, { type: 'm', expire: 10 })`
   */
  set(
    key: string,
    data: {},
    options: { type: 'm' | 's'; expire?: number },
  ): void;

  /**
   * Cache object
   */
  set(
    key: string,
    data: any | Observable<any>,
    options: {
      /** Storage type, 'm' for memory and 's' for persistence */
      type?: 'm' | 's';
      /**
       * Expiration time, unit `seconds`
       */
      expire?: number;
    } = {},
  ): any {
    // expire
    let e = 0;
    if (options.expire) {
      e = addSeconds(new Date(), options.expire).valueOf();
    }
    if (!(data instanceof Observable)) {
      this.save(options.type, key, { v: data, e });
      return;
    }
    return data.pipe(
      tap((v: any) => {
        this.save(options.type, key, { v, e });
      }),
    );
  }

  private save(type: 'm' | 's', key: string, value: ICache) {
    if (type === 'm') {
      this.memory.set(key, value);
    } else {
      this.store.set(this.cog.prefix + key, value);
      this.pushMeta(key);
    }
    this.runNotify(key, 'set');
  }

  // #endregion

  // #region get

  /** Get cached data, if `key` does not exist then `key` is returned as an HTTP request cache */
  get<T>(
    key: string,
    options?: {
      mode: 'promise';
      type?: 'm' | 's';
      expire?: number;
    },
  ): Observable<T>;

  /** Get cached data, if `key` does not exist then `key` is returned as an HTTP request cache */
  get(
    key: string,
    options?: {
      mode: 'promise';
      type?: 'm' | 's';
      expire?: number;
    },
  ): Observable<any>;

  /** Get cached data, or null if `key` does not exist or has expired */
  get(
    key: string,
    options: {
      mode: 'none';
      type?: 'm' | 's';
      expire?: number;
    },
  ): any;

  get(
    key: string,
    options: {
      mode?: 'promise' | 'none';
      type?: 'm' | 's';
      expire?: number;
    } = {},
  ): Observable<any> | any {
    const isPromise = options.mode !== 'none' && this.cog.mode === 'promise';
    const value: ICache = this.memory.has(key) ? this.memory.get(key) : this.store.get(this.cog.prefix + key);
    if (!value || (value.e && value.e > 0 && value.e < new Date().valueOf())) {
      if (isPromise) {
        return this.http
          .get(key)
          .pipe(
            // tslint:disable-next-line:no-any
            map((ret: any) => this._deepGet(ret, this.cog.reName as string[], null)),
            tap(v => this.set(key, v, { type: options.type, expire: options.expire })),
          );
      }
      return null;
    }

    return isPromise ? of(value.v) : value.v;
  }

  /** Get cached data, or null if `key` does not exist or has expired */
  getNone<T>(key: string): T;
  /** Get cached data, or null if `key` does not exist or has expired */
  getNone(key: string): any {
    return this.get(key, { mode: 'none' });
  }

  /**
   * Get the cache, set the persistent cache `Observable` object if it doesn't exist
   */
  tryGet<T>(
    key: string,
    data: Observable<T>,
    options?: { type?: 's'; expire?: number },
  ): Observable<T>;
  /**
   * Get the cache, set the persistent cache `Observable` object if it doesn't exist
   */
  tryGet(
    key: string,
    data: Observable<any>,
    options?: { type?: 's'; expire?: number },
  ): Observable<any>;
  /**
   * Get the cache, set the persistent cache base object if it doesn't exist
   */
  tryGet(
    key: string,
    data: {},
    options?: { type?: 's'; expire?: number },
  ): any;
  /**
   * Get the cache, if not present, set the specified cache type to cache the object
   */
  tryGet(
    key: string,
    data: {},
    options: { type: 'm' | 's'; expire?: number },
  ): any;

  /**
   * Get the cache, set the cache object if it doesn't exist
   */
  tryGet(
    key: string,
    data: any | Observable<any>,
    options: {
      /** Storage type, 'm' for memory and 's' for persistence */
      type?: 'm' | 's';
      /**
       * Expiration time, unit `seconds`
       */
      expire?: number;
    } = {},
  ): any {
    const ret = this.getNone(key);
    if (ret === null) {
      if (!(data instanceof Observable)) {
        this.set(key, data, options as any);
        return data;
      }

      return this.set(key, data as Observable<any>, options as any);
    }
    return of(ret);
  }

  // #endregion

  // #region has

  /** Whether to cache `key` */
  has(key: string): boolean {
    return this.memory.has(key) || this.meta.has(key);
  }

  // #endregion

  // #region remove

  private _remove(key: string, needNotify: boolean) {
    if (needNotify) this.runNotify(key, 'remove');
    if (this.memory.has(key)) {
      this.memory.delete(key);
      return;
    }
    this.store.remove(this.cog.prefix + key);
    this.removeMeta(key);
  }

  /** Remove cache */
  remove(key: string) {
    this._remove(key, true);
  }

  /** Clear all caches */
  clear() {
    this.notifyBuffer.forEach((v, k) => this.runNotify(k, 'remove'));
    this.memory.clear();
    this.meta.forEach(key => this.store.remove(this.cog.prefix + key));
  }

  // #endregion

  // #region notify

  /**
   * Set the listening frequency in milliseconds and the minimum `20ms`. Default: `3000ms`
   */
  set freq(value: number) {
    this.freqTick = Math.max(20, value);
    this.abortExpireNotify();
    this.startExpireNotify();
  }

  private startExpireNotify() {
    this.checkExpireNotify();
    this.runExpireNotify();
  }

  private runExpireNotify() {
    this.freqTime = setTimeout(() => {
      this.checkExpireNotify();
      this.runExpireNotify();
    }, this.freqTick);
  }

  private checkExpireNotify() {
    const removed: string[] = [];
    this.notifyBuffer.forEach((v, key) => {
      if (this.has(key) && this.getNone(key) === null) removed.push(key);
    });
    removed.forEach(key => {
      this.runNotify(key, 'expire');
      this._remove(key, false);
    });
  }

  private abortExpireNotify() {
    clearTimeout(this.freqTime);
  }

  private runNotify(key: string, type: CacheNotifyType) {
    if (!this.notifyBuffer.has(key)) return;
    this.notifyBuffer.get(key).next({ type, value: this.getNone(key) });
  }

  /**
   * `key` listens, when `key` changes, expires, removes notifications, note the following details:
   *
   * - After calling, except calling `cancelNotify` again, never expires
   * - The listener performs an expiration check every `freq` (default: 3 seconds)
   */
  notify(key: string): Observable<CacheNotifyResult> {
    if (!this.notifyBuffer.has(key)) {
      const change$ = new BehaviorSubject<CacheNotifyResult>(this.getNone(key));
      this.notifyBuffer.set(key, change$);
    }
    return this.notifyBuffer.get(key).asObservable();
  }

  /**
   * Cancel `key` listener
   */
  cancelNotify(key: string): void {
    if (!this.notifyBuffer.has(key)) return;
    this.notifyBuffer.get(key).unsubscribe();
    this.notifyBuffer.delete(key);
  }

  /** Whether `key` has been monitored */
  hasNotify(key: string): boolean {
    return this.notifyBuffer.has(key);
  }

  /** Clear all listeners for `key` */
  clearNotify(): void {
    this.notifyBuffer.forEach(v => v.unsubscribe());
    this.notifyBuffer.clear();
  }

  // #endregion

  ngOnDestroy(): void {
    this.memory.clear();
    this.abortExpireNotify();
    this.clearNotify();
  }
}
