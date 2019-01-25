import { Injectable } from '@angular/core';
// tslint:disable
@Injectable({ providedIn: 'root' })
export class AuthConfig {

  /**
   * Store KEY value
   */
  store_key ?= '_token';

  /**
   * Jump to login page when invalid, including:
   * - invalid token value
   * - token has expired (JWT only)
   */
  token_invalid_redirect ?= true;

  /**
   * Token expiration time offset value, default: `10` seconds (unit: second)
   */
  token_exp_offset ?= 10;

  /**
   * Send token parameter name, default: token
   */
  token_send_key ?= 'token';

  /**
   * Send the token template (default: `${token}`), use `${token}` to represent the token placeholder, for example:
   *
   * - `Bearer ${token}`
   */
    // tslint:disable-next-line:no-invalid-template-strings
  token_send_template ?= '${token}';

  /**
   * Send the token parameter location, default: header
   */
  token_send_place?: 'header' | 'body' | 'url' = 'header';

  /**
   * Login page routing address
   */
  login_url ?= `/login`;

  /**
   * Ignore the TOKEN URL address list. The default value is: [ /\/login/, /assets\//, /passport\// ]
   */
  ignores?: RegExp[] = [/\/login/, /assets\//, /passport\//];

  /**
   * Allow anonymous login KEY, if the KEY is included in the request parameter, ignore TOKEN
   */
  allow_anonymous_key ?= `_allow_anonymous`;

  /**
   * Whether to check the invalidation hit and continue to call the `intercept`
   * method of the subsequent interceptor, default: `true`
   */
  executeOtherInterceptors ?= true;
}
