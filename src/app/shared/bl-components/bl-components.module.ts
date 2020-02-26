import { ModuleWithProviders, NgModule } from '@angular/core';

import { BlAvatarModule } from './avatar';
import { BlBadgeModule } from './badge';
import { BlMessageModule } from './message';
import { BlNotificationModule } from './notification';
import { BlTimelineModule } from './timeline';

export * from './avatar';
export * from './badge';
export * from './message';
export * from './notification';
export * from './timeline';

@NgModule({
  exports: [
    BlAvatarModule,
    BlBadgeModule,
    BlMessageModule,
    BlNotificationModule,
    BlTimelineModule,
  ],
})

export class BlComponentsModule {
  /**
   * @deprecated Use `BlComponentsModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BlComponentsModule,
    };
  }
}
