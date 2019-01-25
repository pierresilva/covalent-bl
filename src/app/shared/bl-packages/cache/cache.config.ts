// tslint:disable
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheConfig {
  /**
   * Cache mode, default: `promise`
   * - `promise` convention mode, allowing `key` to get data as http
   * - `none` normal mode
   */
  mode?: 'promise' | 'none' = 'promise';

  /**
   * Rename the return parameters, for example:
   * - `null` returns the body as content
   * - `list` return body should be `{ list: [] }`
   * - `result.list` return body should be `{ result: { list: [] } }`
   */
  reName?: string | string[] = '';

  /**
   * Persistent data key prefix
   */
  prefix?: string = '';

  /**
   * Persistent data metadata storage key name
   */
  meta_key?: string = '__cache_meta';
}
