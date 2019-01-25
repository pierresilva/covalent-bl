import { HttpRequest } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BLA_SERVICE_TOKEN_FACTORY } from './token.service';

export const BLA_SERVICE_TOKEN = new InjectionToken<ITokenService>(
  'DA_SERVICE_TOKEN',
  {
    providedIn: 'root',
    factory: BLA_SERVICE_TOKEN_FACTORY,
  },
);

export interface ITokenModel {
  // tslint:disable-next-line:no-any
  [key: string]: any;

  token: string;
}

export interface AuthReferrer {
  url?: string;
}

export interface ITokenService {
  set(data: ITokenModel): boolean;

  /**
   * Get Token, the form includes:
   * * - `get()` Get Simple Token
   * - `get<JWTTokenModel>(JWTTokenModel)` Get JWT Token
   */
  // tslint:disable-next-line:no-any
  get(type?: any): ITokenModel;

  /**
   * Get Token, the form includes:
   * - `get()` Get Simple Token
   * - `get<JWTTokenModel>(JWTTokenModel)` Get JWT Token
   */
  // tslint:disable-next-line:no-any
  get<T extends ITokenModel>(type?: any): T;

  clear(): void;

  change(): Observable<ITokenModel>;

  /** Get login address */
  readonly login_url: string;

  /** Obtain routing information before authorization failure */
  readonly referrer?: AuthReferrer;
}
