import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthConfig } from '../../auth.config';
import { BaseInterceptor } from '../base.interceptor';
import { CheckSimple } from '../helper';
import { BLA_SERVICE_TOKEN } from '../interface';
import { SimpleTokenModel } from './simple.model';

@Injectable()
export class SimpleInterceptor extends BaseInterceptor {
  isAuth(options: AuthConfig): boolean {
    this.model = this.injector.get(BLA_SERVICE_TOKEN).get() as SimpleTokenModel;
    return CheckSimple(this.model as SimpleTokenModel);
  }

  // tslint:disable-next-line:no-any
  setReq(req: HttpRequest<any>, options: AuthConfig): HttpRequest<any> {
    const token = options.token_send_template.replace(
      /\$\{([\w]+)\}/g,
      (_: string, g) => this.model[g],
    );
    switch (options.token_send_place) {
      case 'header':
        const obj = {};
        obj[options.token_send_key] = token;
        req = req.clone({
          setHeaders: obj,
        });
        break;
      case 'body':
        const body = req.body || {};
        body[options.token_send_key] = token;
        req = req.clone({
          body,
        });
        break;
      case 'url':
        req = req.clone({
          params: req.params.append(options.token_send_key, token),
        });
        break;
    }
    return req;
  }
}
