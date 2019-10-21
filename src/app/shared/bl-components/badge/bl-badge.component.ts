import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { AnimationCurves } from '../core/animation/animation';
import { isEmpty } from '../core/util/check';
import { InputBoolean } from '../core/util/convert';

// tslint:disable-next-line:typedef
const ANIMATION_TRANSITION_IN = `0.3s ${AnimationCurves.EASE_IN_BACK}`;
// tslint:disable-next-line:typedef
const ANIMATION_TRANSITION_OUT = `0.3s ${AnimationCurves.EASE_IN_BACK}`;

export type BlBadgeStatusType = 'success' | 'processing' | 'default' | 'error' | 'warning';

@Component({
  selector: 'bl-badge',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('zoomAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0) translateX(50%)'}),
        animate(ANIMATION_TRANSITION_IN, style({
          opacity: 1,
          transform: 'scale(1) translateX(50%)',
        })),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'scale(1) translateX(50%)'}),
        animate(ANIMATION_TRANSITION_OUT, style({
          opacity: 0,
          transform: 'scale(0) translateX(50%)',
        })),
      ]),
    ]),
  ],
  templateUrl: './bl-badge.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.bl-badge]': 'true',
    '[class.bl-badge-status]': 'blStatus',
  },
})
export class BlBadgeComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line:typedef
  maxNumberArray = [];
  // tslint:disable-next-line:typedef
  countArray = [];
  // tslint:disable-next-line:typedef
  countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  @ViewChild('contentElement', {read: true, static: false}) contentElement: ElementRef;
  // tslint:disable-next-line:typedef
  @Input() @InputBoolean() blShowZero = false;
  // tslint:disable-next-line:typedef
  @Input() @InputBoolean() blShowDot = true;
  // tslint:disable-next-line:typedef
  @Input() @InputBoolean() blDot = false;
  // tslint:disable-next-line:typedef
  @Input() blOverflowCount = 99;
  // tslint:disable-next-line:typedef
  @Input() blText: string;
  // tslint:disable-next-line:typedef
  @Input() blStyle: { [key: string]: string };
  // tslint:disable-next-line:typedef
  @Input() blStatus: BlBadgeStatusType;

  @Input()
  set blCount(value: number) {
    if (value < 0) {
      this._count = 0;
    } else {
      this._count = value;
    }
    this.countArray = this._count.toString().split('');
  }

  get blCount(): number {
    return this._count;
  }

  get showSup(): boolean {
    return (this.blShowDot && this.blDot) || this.blCount > 0 || ((this.blCount === 0) && this.blShowZero);
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }

  // tslint:disable-next-line:member-ordering
  private _count: number;

  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'bl-badge-not-a-wrapper');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'bl-badge-not-a-wrapper');
    }
  }

  ngOnInit(): void {
    this.maxNumberArray = this.blOverflowCount.toString().split('');
  }

  ngAfterViewInit(): void {
    this.checkContent();
  }
}
