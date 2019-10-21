import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BLA_SERVICE_TOKEN, ITokenService } from '../../../shared/bl-packages/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '../../../shared/bl-packages/http';
import { BlMessageService } from '../../../shared/bl-components/message';
import { CacheService } from '../../../shared/bl-packages/cache';
import { ACLService } from '../../../shared/bl-packages/acl';
import { TdLoadingService } from '@covalent/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'bl-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

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
  }

  onSubmit(): void {
    this.http.post(environment.app_url + environment.api_prefix + 'auth/password/create?_allow_anonymous=true', this.resetPasswordForm.value)
      .subscribe(
        (res: any) => {
          this.router.navigateByUrl('/auth');
        },
        (err: any) => {
          console.log(err);
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
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
    });
  }
}
