import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TdLoadingService } from '@covalent/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../shared/bl-packages/settings';
import { ITokenService, BLA_SERVICE_TOKEN } from '../../../shared/bl-packages/auth';
import { _HttpClient } from '../../../shared/bl-packages/http';
import { BlMessageService } from '../../../shared/bl-components/message';
import { CacheService } from '../../../shared/bl-packages/cache';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {

  isLoading: boolean = false;
  registerForm: FormGroup;
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
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['', Validators.compose([
        Validators.required,
      ])],
      password_confirmation: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  onSubmit(): void {
    this._loadingService.register('isLoading');
    // Generally speaking, the login request does not need to be verified, so you can add: `/login?_allow_anonymous=true`
    // to the request URL to not trigger the user Token check.
    this.http
      .post(environment.app_url + environment.api_prefix + 'auth/signup?_allow_anonymous=true', this.registerForm.value)
      .subscribe((res: any) => {
        console.info(res.message, res);
        // Set user token information
        // this.tokenService.set(res.response.token);
        // this.cache.set(' /data/user', res.response.user);
        // Re-acquiring the content of the StartupService, we always think that the application information will
        // generally be affected by the scope of authorization of the current user.
        /*this.startupSrv.load().then(() => {
          let url = this.tokenService.referrer.url || '/';
          if (url.includes('/passport')) url = '/';
          this.router.navigateByUrl(url);
        });*/
        this._loadingService.resolve('isLoading');
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

}
