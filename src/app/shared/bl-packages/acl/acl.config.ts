import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ACLConfig {
  /**
   * Url to redirect
   */
  // tslint:disable
  guard_url ?= '/403';
}
