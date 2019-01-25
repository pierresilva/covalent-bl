import { TemplateRef } from '@angular/core';

import { BlMessageData, BlMessageDataOptions } from '../message/bl-message.definitions';

export interface BlNotificationData extends BlMessageData {
  template?: TemplateRef<{}>;

  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;
  title?: string;
}

export interface BlNotificationDataOptions extends BlMessageDataOptions {
  blKey?: string;
  /* tslint:disable-next-line:no-any */
  blStyle?: any;
  /* tslint:disable-next-line:no-any */
  blClass?: any;
}

// Filled version of BlMessageData (includes more private properties)
export interface BlNotificationDataFilled extends BlNotificationData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: BlNotificationDataOptions;
  createdAt: Date; // Auto created
}
