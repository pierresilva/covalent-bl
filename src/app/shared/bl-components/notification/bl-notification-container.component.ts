import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';

import { BlMessageContainerComponent } from '../message/bl-message-container.component';
import { BlNotificationConfig, BL_NOTIFICATION_CONFIG, BL_NOTIFICATION_DEFAULT_CONFIG } from './bl-notification-config';
import { BlNotificationDataFilled } from './bl-notification.definitions';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'bl-notification-container',
  preserveWhitespaces: false,
  templateUrl        : './bl-notification-container.component.html',
})

export class BlNotificationContainerComponent extends BlMessageContainerComponent {
  constructor(
    cdr: ChangeDetectorRef,
    @Optional() @Inject(BL_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: BlNotificationConfig,
    @Optional() @Inject(BL_NOTIFICATION_CONFIG) config: BlNotificationConfig
  ) {
    super(cdr, defaultConfig, config);
  }

  /**
   * A list of notifications displayed on the screen.
   * @override
   */
  // tslint:disable-next-line:member-ordering
  messages: BlNotificationDataFilled[] = [];

  /**
   * Create a new notification.
   * If there's a notification whose `blKey` is same with `blKey` in `BlNotificationDataFilled`, replace its content instead of create a new one.
   * @override
   * @param notification
   */
  createMessage(notification: BlNotificationDataFilled): void {
    notification.options = this._mergeMessageOptions(notification.options);
    const key = notification.options.blKey;
    const notificationWithSameKey = this.messages.find(msg => msg.options.blKey === notification.options.blKey);
    if (key && notificationWithSameKey) {
      this.replaceNotification(notificationWithSameKey, notification);
    } else {
      if (this.messages.length >= this.config.blMaxStack) {
        this.messages.splice(0, 1);
      }
      this.messages.push(notification);
    }
    this.cdr.detectChanges();
  }

  private replaceNotification(old: BlNotificationDataFilled, _new: BlNotificationDataFilled): void {
    old.title = _new.title;
    old.content = _new.content;
    old.template = _new.template;
    old.type = _new.type;
  }
}
