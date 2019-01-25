import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, flush, flushMicrotasks, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';

import { BL_NOTIFICATION_CONFIG } from './bl-notification-config';
import { BlNotificationModule } from './bl-notification.module';
import { BlNotificationService } from './bl-notification.service';

describe('BlNotification', () => {
  let messageService: BlNotificationService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let demoAppFixture: ComponentFixture<DemoAppComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ BlNotificationModule, NoopAnimationsModule ],
      declarations: [ DemoAppComponent ],
      providers   : [ { provide: BL_NOTIFICATION_CONFIG, useValue: { blMaxStack: 2 } } ] // Override default config
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([ BlNotificationService, OverlayContainer ], (m: BlNotificationService, oc: OverlayContainer) => {
    messageService = m;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    demoAppFixture = TestBed.createComponent(DemoAppComponent);
  });

  it('should open a message box with success', (() => {
    messageService.success('test-title', 'SUCCESS');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.bl-notification-notice-icon-success')).not.toBeNull();
  }));

  it('should open a message box with error', (() => {
    messageService.error('test-title', 'ERROR');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.bl-notification-notice-icon-error')).not.toBeNull();
  }));

  it('should open a message box with warning', (() => {
    messageService.warning('test-title', 'WARNING');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.bl-notification-notice-icon-warning')).not.toBeNull();
  }));

  it('should open a message box with info', (() => {
    messageService.info('test-title', 'INFO');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.bl-notification-notice-icon-info')).not.toBeNull();
  }));

  it('should open a message box with blank', (() => {
    messageService.blank('test-title', 'BLANK');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('BLANK');
    expect(overlayContainerElement.querySelector('.bl-notification-notice-icon')).toBeNull();
  }));

  it('should auto closed by 1s', fakeAsync(() => {
    messageService.create(null, null, 'EXISTS', { blDuration: 1000 });
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    messageService.create(null, null, 'EXISTS', { blDuration: 3000 });
    demoAppFixture.detectChanges();

    const messageElement = overlayContainerElement.querySelector('.bl-notification-notice');
    dispatchMouseEvent(messageElement, 'mouseenter');
    tick(50000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    tick(5000);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroyed automatically but manually', fakeAsync(() => {
    const filledMessage = messageService.success('title', 'SUCCESS', { blDuration: 0 });
    demoAppFixture.detectChanges();

    tick(50000);
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    messageService.remove(filledMessage.messageId);
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  }));

  it('should keep the balance of messages length and then remove all', fakeAsync(() => {
    [ 1, 2, 3 ].forEach(id => {
      const content = `SUCCESS-${id}`;
      messageService.success(null, content);
      demoAppFixture.detectChanges();
      tick();
      demoAppFixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((messageService as any)._container.messages.length).toBe(2); // tslint:disable-line:no-any
      }
    });

    messageService.remove();
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((messageService as any)._container.messages.length).toBe(0); // tslint:disable-line:no-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    messageService.error(null, 'EXISTS', { blDuration: 1000, blAnimate: false });
    demoAppFixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should reset default config dynamically', fakeAsync(() => {
    messageService.config({ blDuration: 0 });
    messageService.create(null, 'loading', 'EXISTS');
    demoAppFixture.detectChanges();
    tick(50000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should show with placement of topLeft', () => {
    messageService.config({ blPlacement: 'topLeft' });
    messageService.create(null, null, 'EXISTS');
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.bl-notification-topLeft')).not.toBeNull();
  });

  it('should open a message box with template ref', () => {
    messageService.template(demoAppFixture.componentInstance.demoTemplateRef);
    demoAppFixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('test template content');
  });

  it('should update an existing notification when keys are matched', () => {
    messageService.create(null, null, 'EXISTS', { blKey: 'exists' });
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    messageService.create('success', 'Title', 'SHOULD NOT CHANGE', { blKey: 'exists' });
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
    expect(overlayContainerElement.textContent).toContain('Title');
    expect(overlayContainerElement.textContent).toContain('SHOULD NOT CHANGE');
    expect(overlayContainerElement.querySelector('.bl-notification-notice-icon-success')).not.toBeNull();
  });
});

@Component({
  selector: 'bl-demo-app-component',
  template: `
    <ng-template>{{ 'test template content' }}</ng-template>
  `
})
export class DemoAppComponent {
  @ViewChild(TemplateRef) demoTemplateRef: TemplateRef<{}>;
}
