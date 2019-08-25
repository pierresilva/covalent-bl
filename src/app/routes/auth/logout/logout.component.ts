import { Component, OnInit, Inject } from '@angular/core';
import { BLA_SERVICE_TOKEN, ITokenService } from '../../../shared/bl-packages/auth';
import { _HttpClient } from '../../../shared/bl-packages/http';
import { BlMessageService } from '../../../shared/bl-components/message';
import { CacheService } from '../../../shared/bl-packages/cache';
import { ACLService } from '../../../shared/bl-packages/acl';
import { environment } from '../../../../environments/environment';
import { TdLoadingService } from '@covalent/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    @Inject(BLA_SERVICE_TOKEN) private tokenService: ITokenService,
    public http: _HttpClient,
    public msg: BlMessageService,
    public cache: CacheService,
    public acl: ACLService,
    private _loadingService: TdLoadingService,
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {

    this.http.get(environment.app_url + environment.api_prefix + 'auth/logout')
      .subscribe(
        (res: any) => {
          this._loadingService.resolve('isLoading');
          this.router.navigateByUrl('/');
          this.frontEndLogout();
        },
        (err: any) => {
          this._loadingService.resolve('isLoading');
          this.router.navigateByUrl('/');
          this.frontEndLogout();
        }
      );
  }

  frontEndLogout() {
    this._loadingService.register('isLoading');
    this.cache.remove(environment.app_prefix + 'user');
    this.tokenService.clear();
    this.acl.setRole(null);
    this.acl.setAbility(null);
    this.authService.isLogged.next(false);
  }

}
