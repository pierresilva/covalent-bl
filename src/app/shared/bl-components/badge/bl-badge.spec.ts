import { Component } from '@angular/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BlBadgeComponent } from './bl-badge.component';
import { BlBadgeModule } from './bl-badge.module';

describe('badge', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ BlBadgeModule, NoopAnimationsModule ],
      declarations: [ BlTestBadgeBasicComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic badge', () => {
    let fixture;
    let testComponent;
    let badgeElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(BlTestBadgeBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      badgeElement = fixture.debugElement.query(By.directive(BlBadgeComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).toContain('bl-badge');
    });
    it('should count work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('bl-scroll-number');
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('bl-badge-count');
      expect(badgeElement.nativeElement.querySelector('sup').classList).not.toContain('bl-badge-multiple-words');
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('5');
      testComponent.count = 10;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('bl-badge-multiple-words');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[ 0 ].innerText).toBe('1');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[ 1 ].innerText).toBe('0');
    });
    it('should overflow work', () => {
      testComponent.overflow = 4;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').innerText).toBe('4+');
      testComponent.overflow = 99;
      testComponent.count = 100;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').innerText).toBe('99+');
      testComponent.overflow = 99;
      testComponent.count = 99;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').innerText).not.toBe('99+');
    });
    it('should showZero work', fakeAsync(() => {
      testComponent.count = 0;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));
    it('should negative number not display', fakeAsync(() => {
      testComponent.count = -10;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));
    it('should dot work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).not.toContain('bl-badge-dot');
      testComponent.dot = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('bl-badge-dot');
    });
    it('should no wrapper work', fakeAsync(() => {
      testComponent.inner = false;
      testComponent.style = { backgroundColor: '#52c41a' };
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      badgeElement = fixture.debugElement.query(By.directive(BlBadgeComponent));
//      TODO: fix next line error
//      expect(badgeElement.nativeElement.classList).toContain('bl-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('sup').style.backgroundColor).toBe('rgb(82, 196, 26)');
    }));
    it('should status work', () => {
      testComponent.inner = false;
      const statusList = [ 'success', 'processing', 'default', 'error', 'warning' ];
      statusList.forEach(status => {
        testComponent.status = status;
        fixture.detectChanges();
        expect(badgeElement.nativeElement.querySelector('.bl-badge-status-dot').classList).toContain(`bl-badge-status-${status}`);
      });
      testComponent.text = 'test';
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.bl-badge-status-text').innerText).toBe('test');
    });
  });
});

@Component({
  selector: 'bl-test-badge-basic',
  template: `
    <bl-badge
      [blCount]="count"
      [blStatus]="status"
      [blText]="text"
      [blShowZero]="showZero"
      [blOverflowCount]="overflow"
      [blStyle]="style"
      [blDot]="dot">
      <a *ngIf="inner"></a>
    </bl-badge>
  `
})
export class BlTestBadgeBasicComponent {
  style;
  count = 5;
  overflow = 20;
  showZero = false;
  inner = true;
  status;
  text;
  dot = false;
}
