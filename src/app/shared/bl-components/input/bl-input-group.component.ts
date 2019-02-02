import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NgClassType } from '../core/types/ng-class';
import { BlSizeLDSType } from '../core/types/size';
import { InputBoolean } from '../core/util/convert';

import { BlInputDirective } from './bl-input.directive';

@Component({
  selector           : 'bl-input-group',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './bl-input-group.component.html',
  host               : {
    '[class.bl-input-group-compact]'      : 'blCompact',
    '[class.bl-input-search-enter-button]': 'blSearch',
    '[class.bl-input-search]'             : 'blSearch',
    '[class.bl-input-search-sm]'          : 'isSmallSearch',
    '[class.bl-input-affix-wrapper]'      : 'isAffixWrapper',
    '[class.bl-input-group-wrapper]'      : 'isAddOn',
    '[class.bl-input-group]'              : 'isGroup',
    '[class.bl-input-group-lg]'           : 'isLargeGroup',
    '[class.bl-input-group-wrapper-lg]'   : 'isLargeGroupWrapper',
    '[class.bl-input-affix-wrapper-lg]'   : 'isLargeAffix',
    '[class.bl-input-search-lg]'          : 'isLargeSearch',
    '[class.bl-input-group-sm]'           : 'isSmallGroup',
    '[class.bl-input-affix-wrapper-sm]'   : 'isSmallAffix',
    '[class.bl-input-group-wrapper-sm]'   : 'isSmallGroupWrapper'
  }
})

export class BlInputGroupComponent implements AfterContentInit {
  @ContentChildren(BlInputDirective) listOfBlInputDirective: QueryList<BlInputDirective>;
  private _size: BlSizeLDSType = 'default';
  @Input() blAddOnBeforeIcon: NgClassType;
  @Input() blAddOnAfterIcon: NgClassType;
  @Input() blPrefixIcon: NgClassType;
  @Input() blSuffixIcon: NgClassType;
  @Input() blAddOnBefore: string | TemplateRef<void>;
  @Input() blAddOnAfter: string | TemplateRef<void>;
  @Input() blPrefix: string | TemplateRef<void>;
  @Input() blSuffix: string | TemplateRef<void>;
  @Input() @InputBoolean() blSearch = false;
  @Input() @InputBoolean() blCompact = false;

  @Input() set blSize(value: BlSizeLDSType) {
    this._size = value;
    this.updateChildrenInputSize();
  }

  get blSize(): BlSizeLDSType {
    return this._size;
  }

  get isLarge(): boolean {
    return this.blSize === 'large';
  }

  get isSmall(): boolean {
    return this.blSize === 'small';
  }

  get isAffix(): boolean {
    return (!!(this.blSuffix || this.blPrefix || this.blPrefixIcon || this.blSuffixIcon));
  }

  get isAddOn(): boolean {
    return !!(this.blAddOnAfter || this.blAddOnBefore || this.blAddOnAfterIcon || this.blAddOnBeforeIcon);
  }

  get isAffixWrapper(): boolean {
    return this.isAffix && !this.isAddOn;
  }

  get isGroup(): boolean {
    return (!this.isAffix) && (!this.isAddOn);
  }

  get isLargeGroup(): boolean {
    return this.isGroup && this.isLarge;
  }

  get isLargeGroupWrapper(): boolean {
    return this.isAddOn && this.isLarge;
  }

  get isLargeAffix(): boolean {
    return this.isAffixWrapper && this.isLarge;
  }

  get isLargeSearch(): boolean {
    return this.blSearch && this.isLarge;
  }

  get isSmallGroup(): boolean {
    return this.isGroup && this.isSmall;
  }

  get isSmallAffix(): boolean {
    return this.isAffixWrapper && this.isSmall;
  }

  get isSmallGroupWrapper(): boolean {
    return this.isAddOn && this.isSmall;
  }

  get isSmallSearch(): boolean {
    return this.blSearch && this.isSmall;
  }

  updateChildrenInputSize(): void {
    if (this.listOfBlInputDirective) {
      this.listOfBlInputDirective.forEach(item => item.blSize = this.blSize);
    }
  }

  constructor() {
  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
  }
}
