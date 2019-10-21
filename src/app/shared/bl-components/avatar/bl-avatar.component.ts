import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BlUpdateHostClassService } from '../core/services/update-host-class.service';
import { BlSizeLDSType } from '../core/types/size';

export type BlAvatarShape = 'square' | 'circle';
export type BlAvatarSize = BlSizeLDSType | number;

@Component({
  selector           : 'bl-avatar',
  templateUrl        : './bl-avatar.component.html',
  providers          : [ BlUpdateHostClassService ],
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,

})
export class BlAvatarComponent implements OnChanges {

  @Input() blShape: BlAvatarShape = 'circle';
  @Input() blSize: BlAvatarSize = 'default';
  @Input() blText: string;
  @Input() blSrc: string;
  @Input() blIcon: string;

  oldAPIIcon = true; // Make the user defined icon compatible to old API. Should be removed in 2.0.
  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  textStyles: {};

  @ViewChild('textEl', {read: true, static: false}) textEl: ElementRef;

  private el: HTMLElement = this.elementRef.nativeElement;
  private prefixCls = 'bl-avatar';
  private sizeMap = { large: 'lg', small: 'sm' };

  constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private updateHostClassService: BlUpdateHostClassService,
    private renderer: Renderer2) {
  }

  setClass(): this {
    const classMap = {
      [ this.prefixCls ]                                    : true,
      [ `${this.prefixCls}-${this.sizeMap[ this.blSize ]}` ]: this.sizeMap[ this.blSize ],
      [ `${this.prefixCls}-${this.blShape}` ]               : this.blShape,
      [ `${this.prefixCls}-icon` ]                          : this.blIcon,
      [ `${this.prefixCls}-image` ]                         : this.hasSrc // downgrade after image error
    };
    this.updateHostClassService.updateHostClass(this.el, classMap);
    this.cd.detectChanges();
    return this;
  }

  imgError(): void {
    this.hasSrc = false;
    this.hasIcon = false;
    this.hasText = false;
    if (this.blIcon) {
      this.hasIcon = true;
    } else if (this.blText) {
      this.hasText = true;
    }
    this.setClass().notifyCalc();
    this.setSizeStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('blIcon') && changes.blIcon.currentValue) {
      this.oldAPIIcon = changes.blIcon.currentValue.indexOf('blicon') > -1;
    }
    this.hasText = !this.blSrc && !!this.blText;
    this.hasIcon = !this.blSrc && !!this.blIcon;
    this.hasSrc = !!this.blSrc;

    this.setClass().notifyCalc();
    this.setSizeStyle();
  }

  private calcStringSize(): void {
    if (!this.hasText) {
      return;
    }

    const childrenWidth = this.textEl.nativeElement.offsetWidth;
    const avatarWidth = this.el.getBoundingClientRect().width;
    const scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
    this.textStyles = {
      transform: `scale(${scale}) translateX(-50%)`
    };
    if (typeof this.blSize === 'number') {
      Object.assign(this.textStyles, {
        lineHeight: `${this.blSize}px`
      });
    }
    this.cd.detectChanges();
  }

  private notifyCalc(): this {
    // If use ngAfterViewChecked, always demands more computations, so......
    setTimeout(() => {
      this.calcStringSize();
    });
    return this;
  }

  private setSizeStyle(): void {
    if (typeof this.blSize === 'string') {
      return;
    }
    this.renderer.setStyle(this.el, 'width', `${this.blSize}px`);
    this.renderer.setStyle(this.el, 'height', `${this.blSize}px`);
    this.renderer.setStyle(this.el, 'line-height', `${this.blSize}px`);
    if (this.hasIcon) {
      this.renderer.setStyle(this.el, 'font-size', `${this.blSize / 2}px`);
    }
  }
}
