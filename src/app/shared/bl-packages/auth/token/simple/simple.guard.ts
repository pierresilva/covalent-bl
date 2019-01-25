import { Inject, Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthConfig } from '../../auth.config';
import { CheckSimple, ToLogin } from '../helper';
import { BLA_SERVICE_TOKEN, ITokenService } from '../interface';

@Injectable({ providedIn: 'root' })
export class SimpleGuard implements CanActivate, CanActivateChild, CanLoad {
  private cog: AuthConfig;
  private url: string;

  constructor(
    @Inject(BLA_SERVICE_TOKEN) private srv: ITokenService,
    private injector: Injector,
    cog: AuthConfig,
  ) {
    this.cog = { ...new AuthConfig(), ...cog };
  }

  private process(): boolean {
    const res = CheckSimple(this.srv.get());
    if (!res) {
      ToLogin(this.cog, this.injector, this.url);
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
