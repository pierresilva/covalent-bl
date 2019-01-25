import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { reverseChildNodes } from '../core/dom/reverse';
import { BlTimelineItemComponent } from './bl-timeline-item.component';

export type BlTimelineMode = 'left' | 'alternate' | 'right';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector           : 'bl-timeline',
  templateUrl        : './bl-timeline.component.html'
})
export class BlTimelineComponent implements AfterContentInit, OnChanges, OnDestroy {
  @ViewChild('timeline') timeline: ElementRef<HTMLElement>;
  @ContentChildren(BlTimelineItemComponent) listOfTimeLine: QueryList<BlTimelineItemComponent>;
  @ContentChild('pending') _pendingContent: TemplateRef<void>;

  @Input() blMode: BlTimelineMode;
  @Input() blPending: string | boolean | TemplateRef<void>;
  @Input() blPendingDot: string | TemplateRef<void>;
  @Input() blReverse: boolean = false;

  isPendingBoolean: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const modeChanges = changes.blMode;
    const reverseChanges = changes.blReverse;
    const pendingChanges = changes.blPending;

    if (modeChanges && (modeChanges.previousValue !== modeChanges.currentValue || modeChanges.isFirstChange())) {
      this.updateChildren();
    }
    if (reverseChanges && reverseChanges.previousValue !== reverseChanges.currentValue && !reverseChanges.isFirstChange()) {
      this.reverseChildTimelineDots();
    }
    if (pendingChanges) {
      this.isPendingBoolean = pendingChanges.currentValue === true;
    }
  }

  ngAfterContentInit(): void {
    this.updateChildren();
    if (this.listOfTimeLine) {
      this.listOfTimeLine.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.updateChildren();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChildren(): void {
    if (this.listOfTimeLine && this.listOfTimeLine.length) {
      const length = this.listOfTimeLine.length;
      this.listOfTimeLine.toArray().forEach((item, index) => {
        item.isLast = !this.blReverse ? index === length - 1 : index === 0;
        item.position = this.blMode === 'left' || !this.blMode
          ? undefined
          : this.blMode === 'right'
            ? 'right'
            : this.blMode === 'alternate' && index % 2 === 0 ? 'left' : 'right';
        item.detectChanges();
      });
      this.cdr.markForCheck();
    }
  }

  private reverseChildTimelineDots(): void {
    reverseChildNodes(this.timeline.nativeElement as HTMLElement);
    this.updateChildren();
  }
}
