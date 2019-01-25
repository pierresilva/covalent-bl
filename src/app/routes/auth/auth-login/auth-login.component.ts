import { Component, OnInit, Renderer, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TdLoadingService } from '@covalent/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {

  isLoading: boolean = false;
  loginForm: FormGroup;
  formSubmitAttempt: boolean = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private _loadingService: TdLoadingService,
    private translate: TranslateService,
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
    this.api.post('auth/login', this.loginForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this._loadingService.resolve('isLoading');
      }, (err: any) => {
        this._loadingService.resolve('isLoading');
      });
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
