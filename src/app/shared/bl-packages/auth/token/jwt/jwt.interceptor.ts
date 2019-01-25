// tslint:disable:no-any
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthConfig } from '../../auth.config';
import { BaseInterceptor } from '../base.interceptor';
import { CheckJwt } from '../helper';
import { BLA_SERVICE_TOKEN } from '../interface';
import { JWTTokenModel } from './jwt.model';

@Injectable()
export class JWTInterceptor extends BaseInterceptor {
  isAuth(options: AuthConfig): boolean {
    this.model = this.injector
      .get(BLA_SERVICE_TOKEN)
      .get<JWTTokenModel>(JWTTokenModel);
    return CheckJwt(this.model as JWTTokenModel, options.token_exp_offset);
  }

  setReq(req: HttpRequest<any>, options: AuthConfig): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.model.token}`,
      },
    });
  }
}
