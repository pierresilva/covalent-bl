import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AdminLanguagesService } from '../../services/admin-languages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-languages-form',
  templateUrl: './admin-languages-form.component.html',
  styleUrls: ['./admin-languages-form.component.scss'],
})
export class AdminLanguagesFormComponent implements OnInit {

  @ViewChild('form', {static: false}) form: FormGroup;
  @ViewChild('text', {static: false}) text: FormGroup;

  langs: {
    en: null,
    es: null,
  };
  constructor(
    public adminLanguagesService: AdminLanguagesService,
    public translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let formValue = this.form.value;
    formValue.text = this.text.value;
    console.log(this.form.value);

    if (!this.form.valid || !this.text.valid) {
      this.markFormGroupTouched(this.form);
      this.markFormGroupTouched(this.text);
      return;
    }

    if (this.adminLanguagesService.adminLanguagesLanguage.value.id) {
      this.adminLanguagesService.updateAdminLanguagesLanguage(formValue);
    } else {
      this.adminLanguagesService.createAdminLanguagesLanguage(formValue);
    }
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
