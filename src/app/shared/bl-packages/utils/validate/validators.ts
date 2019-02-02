import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isDecimal, isIdCard, isInt, isMobile, isNum, isUrl } from './validate';

/** a set of daily validators */
// tslint:disable-next-line:class-name
export class _Validators {
  /** Whether it is a number */
  static num(control: AbstractControl): ValidationErrors | null {
    return isNum(control.value) ? undefined : { num: true };
  }

  /** Whether it is an integer */
  static int(control: AbstractControl): ValidationErrors | null {
    return isInt(control.value) ? undefined : { int: true };
  }

  /** Whether it is a decimal */
  static decimal(control: AbstractControl): ValidationErrors | null {
    return isDecimal(control.value) ? undefined : { decimal: true };
  }

  /** Is it an ID card? */
  static idCard(control: AbstractControl): ValidationErrors | null {
    return isIdCard(control.value) ? undefined : { idCard: true };
  }

  /** Whether it is a mobile phone number */
  static mobile(control: AbstractControl): ValidationErrors | null {
    return isMobile(control.value) ? undefined : { mobile: true };
  }

  /** Whether the URL address */
  static url(control: AbstractControl): ValidationErrors | null {
    return isUrl(control.value) ? undefined : { url: true };
  }
}
