import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BlTimelineMode } from './bl-timeline.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector           : 'bl-timeline-item, [bl-timeline-item]',
  templateUrl        : './bl-timeline-item.component.html'
})
export class BlTimelineItemComponent implements OnInit, OnChanges {
  @ViewChild('liTemplate') liTemplate: ElementRef;
  @Input() blColor: string = 'blue';
  @Input() blDot: string | TemplateRef<void>;

  isLast = false;
  position: BlTimelineMode | undefined;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tryUpdateCustomColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blColor) {
      this.tryUpdateCustomColor();
    }
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  private tryUpdateCustomColor(): void {
    const defaultColors = [ 'blue', 'red', 'green' ];
    const circle = this.liTemplate.nativeElement.querySelector('.bl-timeline-item-head');
    if (defaultColors.indexOf(this.blColor) === -1) {
      this.renderer.setStyle(circle, 'border-color', this.blColor);
    } else {
      this.renderer.removeStyle(circle, 'border-color');
    }
  }
}
