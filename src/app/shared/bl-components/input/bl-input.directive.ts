import {
  Directive,
  Input,
  Optional,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BlSizeLDSType } from '../core/types/size';
import { toBoolean } from '../core/util/convert';

@Directive({
  selector: '[bl-input]',
  host    : {
    '[class.bl-input]'         : 'true',
    '[class.bl-input-disabled]': 'disabled',
    '[class.bl-input-lg]'      : `blSize === 'large'`,
    '[class.bl-input-sm]'      : `blSize === 'small'`
  }
})
export class BlInputDirective {
  private _disabled = false;
  @Input() blSize: BlSizeLDSType = 'default';

  @Input()
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
  }
}
