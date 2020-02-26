import { Component, Inject, OnInit } from '@angular/core';
import { BLA_SERVICE_TOKEN, ITokenService } from '../../../shared/bl-packages/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '../../../shared/bl-packages/http';
import { BlMessageService } from '../../../shared/bl-components/message';
import { CacheService } from '../../../shared/bl-packages/cache';
import { ACLService } from '../../../shared/bl-packages/acl';
import { TdLoadingService } from '@covalent/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'bl-auth-confirm-password',
  templateUrl: './auth-confirm-password.component.html',
  styleUrls: ['./auth-confirm-password.component.scss'],
})
export class AuthConfirmPasswordComponent implements OnInit {

  confirmPasswordForm: FormGroup;
  confirmTokenError: any = false;

  constructor(
    @Inject(BLA_SERVICE_TOKEN) private tokenService: ITokenService,
    public route: ActivatedRoute,
    public http: _HttpClient,
    public msg: BlMessageService,
    public cache: CacheService,
    public acl: ACLService,
    private _loadingService: TdLoadingService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.http.get(environment.api_url + 'auth/password/find/' + this.route.snapshot.paramMap.get('code') + '?_allow_anonymous=true')
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err);
          this.confirmTokenError = true;
        },
      );
  }

  onSubmit(): void {
    this._loadingService.register('isLoading');
    this.http.post(environment.api_url + 'auth/password/reset?_allow_anonymous=true', this.confirmPasswordForm.value)
      .subscribe(
        (res: any) => {
          this._loadingService.resolve('isLoading');
          this.router.navigateByUrl('/auth');
        },
        (err: any) => {
          console.log(err);
          this._loadingService.resolve('isLoading');
        },
      );
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

  buildForm(): void {
    this.confirmPasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
      ])],
      password_confirmation: ['', Validators.compose([
        Validators.required,
      ])],
      token: [this.route.snapshot.paramMap.get('code'), Validators.compose([
        Validators.required,
      ])],
    });
  }

}
