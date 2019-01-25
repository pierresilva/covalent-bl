import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BlTimelineItemComponent } from './bl-timeline-item.component';
import { BlTimelineComponent } from './bl-timeline.component';
import { BlTimelineModule } from './bl-timeline.module';

describe('timeline', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ BlTimelineModule ],
      declarations: [ BlTestTimelineBasicComponent, BlTestTimelinePendingComponent, BlTestTimelineCustomColorComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic timeline', () => {
    let fixture;
    let testComponent;
    let timeline;
    let items;
    beforeEach(() => {
      fixture = TestBed.createComponent(BlTestTimelineBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      timeline = fixture.debugElement.query(By.directive(BlTimelineComponent));
      items = fixture.debugElement.queryAll(By.directive(BlTimelineItemComponent));
    });
    it('should init className correct', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild.classList).toContain('bl-timeline');
      expect(items.every(item => item.nativeElement.firstElementChild.classList.contains('bl-timeline-item'))).toBe(true);
      expect(items[ 0 ].nativeElement.firstElementChild.classList).not.toContain('bl-timeline-item-last');
      expect(items[ 3 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-last');
    });
    it('should color work', () => {
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.bl-timeline-item-head').classList).toContain('bl-timeline-item-head-blue');
      testComponent.color = 'red';
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.bl-timeline-item-head').classList).toContain('bl-timeline-item-head-red');
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.bl-timeline-item-head').classList).toContain('bl-timeline-item-head-green');
    });
    it('should dot work', () => {
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.bl-timeline-item-head').innerText).toBe('dot');
      expect(items[ 1 ].nativeElement.querySelector('.bl-timeline-item-head').innerText).toBe('template');
    });
    it('should last work', () => {
      fixture.detectChanges();
      expect(items.length).toBe(4);
      testComponent.last = true;
      fixture.detectChanges();
      items = fixture.debugElement.queryAll(By.directive(BlTimelineItemComponent));
      expect(items.length).toBe(5);
      expect(items[ 4 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-last');
    });
    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.bl-timeline-item-pending')).toBeNull();
      testComponent.pending = true;
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.bl-timeline-item-pending').innerText).toBe('');
      testComponent.pending = 'pending';
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.bl-timeline-item-pending').innerText).toBe('pending');
    });
    it('should reverse work', () => {
      fixture.detectChanges();
      testComponent.pending = true;
      testComponent.reverse = true;
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild.firstElementChild.classList).toContain('bl-timeline-item-pending');
      expect(items[ 0 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-last');
      expect(items[ 3 ].nativeElement.firstElementChild.classList).not.toContain('bl-timeline-item-last');
    });
    it('should alternate position work', () => {
      fixture.detectChanges();
      testComponent.mode = 'alternate';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild.classList).toContain('bl-timeline-alternate');
      expect(items[ 0 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-left');
      expect(items[ 1 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-right');
      expect(items[ 2 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-left');
    });
    it('should alternate right position work', () => {
      fixture.detectChanges();
      testComponent.mode = 'right';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild.classList).toContain('bl-timeline-right');
      expect(items[ 0 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-right');
      expect(items[ 1 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-right');
      expect(items[ 2 ].nativeElement.firstElementChild.classList).toContain('bl-timeline-item-right');
    });
  });
  describe('custom color timeline', () => {
    let fixture;
    let testComponent;
    let timeline;
    let items;
    beforeEach(() => {
      fixture = TestBed.createComponent(BlTestTimelineCustomColorComponent);
      testComponent = fixture.debugElement.componentInstance;
      timeline = fixture.debugElement.query(By.directive(BlTimelineComponent));
      items = fixture.debugElement.queryAll(By.directive(BlTimelineItemComponent));
    });
    it('should support custom color', () => {
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.bl-timeline-item-head').style.borderColor).toBe('grey');
      expect(items[ 1 ].nativeElement.querySelector('.bl-timeline-item-head').style.borderColor).toBe('rgb(200, 0, 0)');
      expect(items[ 2 ].nativeElement.querySelector('.bl-timeline-item-head').style.borderColor).toBe('rgb(120, 18, 65)'); // hex would be converted to rgb()
      expect(items[ 3 ].nativeElement.querySelector('.bl-timeline-item-head').style.borderColor).toBe('');
    });
  });
  describe('pending timeline', () => {
    let fixture;
    let testComponent;
    let timeline;
    let items;
    beforeEach(() => {
      fixture = TestBed.createComponent(BlTestTimelinePendingComponent);
      testComponent = fixture.debugElement.componentInstance;
      timeline = fixture.debugElement.query(By.directive(BlTimelineComponent));
      items = fixture.debugElement.queryAll(By.directive(BlTimelineItemComponent));
    });
    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.bl-timeline-item-pending').innerText).toBe('template');
    });
  });
});

@Component({
  selector: 'bl-test-timeline-basic',
  template: `
    <ng-template #dotTemplate>template</ng-template>
    <bl-timeline [blPending]="pending" [blReverse]="reverse" [blMode]="mode">
      <bl-timeline-item [blColor]="color" [blDot]="dot">Create a services site 2015-09-01</bl-timeline-item>
      <bl-timeline-item [blDot]="dotTemplate">Solve initial network problems 2015-09-01</bl-timeline-item>
      <bl-timeline-item>Technical testing 2015-09-01</bl-timeline-item>
      <bl-timeline-item>Network problems being solved 2015-09-01</bl-timeline-item>
      <bl-timeline-item *ngIf="last">Network problems being solved 2015-09-01</bl-timeline-item>
    </bl-timeline>`
})
export class BlTestTimelineBasicComponent {
  color = 'blue';
  dot = 'dot';
  pending = false;
  last = false;
  reverse = false;
  mode = 'left';
}

@Component({
  selector: 'bl-test-timeline-custom-color',
  template: `
    <bl-timeline>
      <bl-timeline-item [blColor]="'grey'">Create a services site 2015-09-01</bl-timeline-item>
      <bl-timeline-item [blColor]="'rgb(200, 0, 0)'">Solve initial network problems 2015-09-01</bl-timeline-item>
      <bl-timeline-item [blColor]="'#781241'">Technical testing 2015-09-01</bl-timeline-item>
      <bl-timeline-item [blColor]="'red'">Network problems being solved 2015-09-01</bl-timeline-item>
    </bl-timeline>`
})
export class BlTestTimelineCustomColorComponent {
}

@Component({
  selector: 'bl-test-timeline-pending',
  template: `
    <ng-template #pendingTemplate>template</ng-template>
    <bl-timeline [blPending]="pendingTemplate">
      <bl-timeline-item>Technical testing 2015-09-01</bl-timeline-item>
      <bl-timeline-item>Network problems being solved 2015-09-01</bl-timeline-item>
    </bl-timeline>`
})
export class BlTestTimelinePendingComponent {
}
