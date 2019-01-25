import { InjectionToken } from '@angular/core';

import { BlMessageConfig } from '../message/bl-message-config';

// tslint:disable-next-line:interface-name
export interface BlNotificationConfig extends BlMessageConfig {
  blTop?: string;
  blBottom?: string;
  blPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | string;
}

// tslint:disable-next-line:typedef
export const BL_NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<BlNotificationConfig>('BL_NOTIFICATION_DEFAULT_CONFIG');

// tslint:disable-next-line:typedef
export const BL_NOTIFICATION_CONFIG = new InjectionToken<BlNotificationConfig>('BL_NOTIFICATION_CONFIG');

// tslint:disable-next-line:typedef
export const BL_NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
  provide : BL_NOTIFICATION_DEFAULT_CONFIG,
  useValue: {
    blTop         : '12px',
    blBottom      : '12px',
    blPlacement   : 'topRight',
    blDuration    : 4500,
    blMaxStack    : 7,
    blPauseOnHover: true,
    blAnimate     : true,
  },
};
