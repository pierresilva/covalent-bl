import { Inject, Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthConfig } from '../../auth.config';
import { CheckJwt, ToLogin } from '../helper';
import { BLA_SERVICE_TOKEN, ITokenService } from '../interface';
import { JWTTokenModel } from './jwt.model';
import { BlNotificationService } from '../../../../bl-components/notification';
import { BlMessageService } from '../../../../bl-components/message';

@Injectable({ providedIn: 'root' })
export class JWTGuard implements CanActivate, CanActivateChild, CanLoad {
  private cog: AuthConfig;
  private url: string;

  constructor(
    @Inject(BLA_SERVICE_TOKEN) private srv: ITokenService,
    private injector: Injector,
    cog: AuthConfig,
  ) {
    this.cog = { ...new AuthConfig(), ...cog };
  }

  get msg(): BlMessageService {
    return this.injector.get(BlMessageService);
  }

  private process(): boolean {
    const res = CheckJwt(
      this.srv.get<JWTTokenModel>(JWTTokenModel),
      this.cog.token_exp_offset,
    );
    if (!res) {
      this.injector.get(BlNotificationService).warning(
        'No esta autenticado!',
        '',
      );
      // ToLogin(this.cog, this.injector, this.url);
    }
    return res;
  }

  // lazy loading
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    this.url = route.path;
    return this.process();
  }
  // all children route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url;
    return this.process();
  }
  // route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url;
    return this.process();
  }
}
