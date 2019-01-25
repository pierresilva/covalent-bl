import { InjectionToken } from '@angular/core';

export interface BlMessageConfig {
  // For all messages as default config (can override when dynamically created)
  blDuration?: number;
  blPauseOnHover?: boolean;
  blAnimate?: boolean;
  // For message container only
  blMaxStack?: number;
  /* tslint:disable-next-line:no-any */
  [index: string]: any;
}

export const BL_MESSAGE_DEFAULT_CONFIG = new InjectionToken<BlMessageConfig>('BL_MESSAGE_DEFAULT_CONFIG');

export const BL_MESSAGE_CONFIG = new InjectionToken<BlMessageConfig>('BL_MESSAGE_CONFIG');

export const BL_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
  provide : BL_MESSAGE_DEFAULT_CONFIG,
  useValue: {
    blDuration    : 3000,
    blAnimate     : true,
    blPauseOnHover: true,
    blMaxStack    : 7
  }
};
