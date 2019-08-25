import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { BlMessageComponent } from '../message/bl-message.component';

import { BlNotificationContainerComponent } from "./bl-notification-container.component";
import { BlNotificationDataFilled } from './bl-notification.definitions';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bl-notification',
  preserveWhitespaces: false,
  animations: [
    trigger('enterLeave', [
      state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enterRight', [
        style({ opacity: 0, transform: 'translateX(5%)' }),
        animate('100ms linear')
      ]),
      state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enterLeft', [
        style({ opacity: 0, transform: 'translateX(-5%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({
        opacity: 0,
        transform: 'scaleY(0.8)',
        transformOrigin: '0% 0%'
      })),
      transition('* => leave', [
        style({
          opacity: 1,
          transform: 'scaleY(1)',
          transformOrigin: '0% 0%'
        }),
        animate('100ms linear')
      ])
    ])
  ],
  templateUrl: './bl-notification.component.html'
})
export class BlNotificationComponent extends BlMessageComponent {
  @Input() blMessage: BlNotificationDataFilled;

  constructor(private container: BlNotificationContainerComponent, protected cdr: ChangeDetectorRef) {
    super(container, cdr);
  }

  close(): void {
    this._destroy();
  }

  get state(): string {
    if (this.blMessage.state === 'enter') {
      if ((this.container.config.blPlacement === 'topLeft') || (this.container.config.blPlacement === 'bottomLeft')) {
        return 'enterLeft';
      } else {
        return 'enterRight';
      }
    } else {
      return this.blMessage.state;
    }
  }
}
