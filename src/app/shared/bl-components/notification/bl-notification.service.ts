import { Overlay } from '@angular/cdk/overlay';
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef } from '@angular/core';

import { BlMessageBaseService } from '../message/bl-message.service';

import { BlNotificationConfig } from './bl-notification-config';
import { BlNotificationContainerComponent } from "./bl-notification-container.component";
import { BlNotificationData, BlNotificationDataFilled, BlNotificationDataOptions } from './bl-notification.definitions';

@Injectable({
  providedIn: 'root'
})
export class BlNotificationService extends BlMessageBaseService<BlNotificationContainerComponent, BlNotificationData, BlNotificationConfig> {

  constructor(
    overlay: Overlay,
    injector: Injector,
    cfr: ComponentFactoryResolver,
    appRef: ApplicationRef
  ) {
    super(overlay, BlNotificationContainerComponent, injector, cfr, appRef, 'notification-');
  }

  // Shortcut methods
  success(title: string, content: string, options?: BlNotificationDataOptions): BlNotificationDataFilled {
    return this.createMessage({ type: 'success', title, content }, options) as BlNotificationDataFilled;
  }

  error(title: string, content: string, options?: BlNotificationDataOptions): BlNotificationDataFilled {
    return this.createMessage({ type: 'error', title, content }, options) as BlNotificationDataFilled;
  }

  info(title: string, content: string, options?: BlNotificationDataOptions): BlNotificationDataFilled {
    return this.createMessage({ type: 'info', title, content }, options) as BlNotificationDataFilled;
  }

  warning(title: string, content: string, options?: BlNotificationDataOptions): BlNotificationDataFilled {
    return this.createMessage({ type: 'warning', title, content }, options) as BlNotificationDataFilled;
  }

  blank(title: string, content: string, options?: BlNotificationDataOptions): BlNotificationDataFilled {
    return this.createMessage({ type: 'blank', title, content }, options) as BlNotificationDataFilled;
  }

  create(type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string, title: string, content: string, options?: BlNotificationDataOptions): BlNotificationDataFilled {
    return this.createMessage({ type, title, content }, options) as BlNotificationDataFilled;
  }

  // For content with template
  template(template: TemplateRef<{}>, options?: BlNotificationDataOptions): BlNotificationDataFilled {
    return this.createMessage({ template }, options) as BlNotificationDataFilled;
  }
}
