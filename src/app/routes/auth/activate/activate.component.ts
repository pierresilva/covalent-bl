import { Component, OnInit, Inject } from '@angular/core';
import { BLA_SERVICE_TOKEN, ITokenService } from '../../../shared/bl-packages/auth';
import { _HttpClient } from '../../../shared/bl-packages/http';
import { BlMessageService } from '../../../shared/bl-components/message';
import { CacheService } from '../../../shared/bl-packages/cache';
import { ACLService } from '../../../shared/bl-packages/acl';
import { TdLoadingService } from '@covalent/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted: any = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'bl-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
})
export class ActivateComponent implements OnInit {

  activationForm: FormGroup;
  activationError: boolean = false;

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher: any = new MyErrorStateMatcher();

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
  ) {
  }

  ngOnInit(): void {
    this.http.get(environment.app_url + environment.api_prefix + 'auth/signup/activate/' + this.route.snapshot.paramMap.get('code') + '?_allow_anonymous=true')
      .subscribe(
        (res: any) => {
          this._loadingService.resolve('isLoading');
          this.router.navigateByUrl('/');
          console.log('Se activo la cuenta con exito!');
        },
        (err: any) => {
          this._loadingService.resolve('isLoading');
          console.log('Ocurrio un error activando la cuenta!');
          this.activationError = true;
          this.buildForm();
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
    this.activationForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
    });
  }

  onSubmit(): void {
    console.log(this.activationForm.value);
    this.http.post(environment.app_url + environment.api_prefix + 'auth/signup/activate/resend?_allow_anonymous=true', this.activationForm.value)
      .subscribe(
        (res: any) => {
          this.router.navigateByUrl('/auth');
        },
        (err: any) => {
          console.log(err);
        },
      );
  }

}
