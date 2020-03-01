import { Component, Inject, OnInit, Renderer, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TdLoadingService } from '@covalent/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../shared/bl-packages/settings';
import { BLA_SERVICE_TOKEN, ITokenService } from '../../../shared/bl-packages/auth';
import { _HttpClient } from '../../../shared/bl-packages/http';
import { BlMessageService } from '../../../shared/bl-components/message';
import { environment } from "../../../../environments/environment";
import { CacheService } from "../../../shared/bl-packages/cache";
import { ACLService } from '../../../shared/bl-packages/acl';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {

  isLoading: boolean = false;
  loginForm: FormGroup;
  formSubmitAttempt: boolean = false;
  error: any = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private _loadingService: TdLoadingService,
    private translate: TranslateService,
    fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    @Inject(BLA_SERVICE_TOKEN) private tokenService: ITokenService,
    public http: _HttpClient,
    public msg: BlMessageService,
    public cache: CacheService,
    public acl: ACLService,
    public authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  onSubmit(): void {
    this._loadingService.register('isLoading');
    // Generally speaking, the login request does not need to be verified, so you can add: `/login?_allow_anonymous=true`
    // to the request URL to not trigger the user Token check.
    this.http
      .post(environment.app_url + environment.api_prefix + 'auth/login?_allow_anonymous=true', this.loginForm.value)
      .subscribe((res: any) => {
        // Set user token information
        this.tokenService.set({
          token: res.response.token,
          name: res.response.name,
          email: res.response.email,
          id: res.response.id,
          time: res.response.time,
        });
        this.cache.set(environment.app_prefix + 'user', res.response.user);
        // Re-acquiring the content of the StartupService, we always think that the application information will
        // generally be affected by the scope of authorization of the current user.
        /*this.startupSrv.load().then(() => {
          let url = this.tokenService.referrer.url || '/';
          if (url.includes('/passport')) url = '/';
          this.router.navigateByUrl(url);
        });*/

        this.acl.attachRole(JSON.parse(res.response.user).role);
        this.acl.attachAbility(JSON.parse(res.response.user).ability);
        this.authService.isLogged.next(true);
        this._loadingService.resolve('isLoading');
        this.router.navigateByUrl('/');
      }, (err: any) => {
        console.error(err);
        this._loadingService.resolve('isLoading');
      });
    /* this.api.post('auth/login', this.loginForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this._loadingService.resolve('isLoading');
      }, (err: any) => {
        console.error(err);
        this._loadingService.resolve('isLoading');
      }); */
    this.formSubmitAttempt = true;
  }

  getErrorMessage(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      // @ts-ignore
      return this.translate.instant('forms.field.error.required');
    }
    if (formControl.hasError('email')) {
      // @ts-ignore
      return this.translate.instant('forms.field.error.email');
    }
    return '';
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      if (control.controls) { // control is a FormGroup
        this.markFormGroupTouched(control);
      } else { // control is a FormControl
        control.markAsTouched();
      }
    });
  }
}
