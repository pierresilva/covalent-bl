
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { fakeAsync, flush, flushMicrotasks, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';

import { BL_MESSAGE_CONFIG } from './bl-message-config';
import { BlMessageModule } from './bl-message.module';
import { BlMessageService } from './bl-message.service';

describe('BlMessage', () => {
  let messageService: BlMessageService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let demoAppFixture: ComponentFixture<DemoAppComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BlMessageModule, NoopAnimationsModule ],
      declarations: [ DemoAppComponent ],
      providers: [ { provide: BL_MESSAGE_CONFIG, useValue: { blMaxStack: 2 } } ] // Override default config
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([ BlMessageService, OverlayContainer ], (m: BlMessageService, oc: OverlayContainer) => {
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
    messageService.success('SUCCESS');
    demoAppFixture.detectChanges();

    expect((overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement).style.zIndex).toBe('1010');
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.anticon-check-circle')).not.toBeNull();
  }));

  it('should open a message box with error', (() => {
    messageService.error('ERROR');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.anticon-close-circle')).not.toBeNull();
  }));

  it('should open a message box with warning', (() => {
    messageService.warning('WARNING');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.anticon-exclamation-circle')).not.toBeNull();
  }));

  it('should open a message box with info', (() => {
    messageService.info('INFO');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.anticon-info-circle')).not.toBeNull();
  }));

  it('should open a message box with loading', (() => {
    messageService.loading('LOADING');
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('LOADING');
    expect(overlayContainerElement.querySelector('.anticon-loading')).not.toBeNull();
  }));

  it('should auto closed by 1s', fakeAsync(() => {
    messageService.create(null, 'EXISTS', { blDuration: 1000 });
    demoAppFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    messageService.create(null, 'EXISTS', { blDuration: 3000 });
    demoAppFixture.detectChanges();

    const messageElement = overlayContainerElement.querySelector('.bl-message-notice');
    dispatchMouseEvent(messageElement, 'mouseenter');
    tick(1000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    tick(5000);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroyed automatically but manually', fakeAsync(() => {
    const filledMessage = messageService.success('SUCCESS', { blDuration: 0 });
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
      messageService.success(content);
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
    messageService.error('EXISTS', { blDuration: 1000, blAnimate: false });
    demoAppFixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should reset default config dynamically', fakeAsync(() => {
    messageService.config({ blDuration: 0 });
    messageService.create('loading', 'EXISTS');
    demoAppFixture.detectChanges();
    tick(1000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));
});

@Component({
  selector: 'bl-demo-app-component',
  template: ``
})
export class DemoAppComponent {}
