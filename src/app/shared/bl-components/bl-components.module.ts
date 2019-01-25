import { ModuleWithProviders, NgModule } from '@angular/core';
import { BlMessageModule } from './message/bl-message.module';
import { BlNotificationModule } from './notification/bl-notification.module';
import { BlTimelineModule } from './timeline/bl-timeline.module';

export * from './message';
export * from './notification';
export * from './timeline';

@NgModule({
  exports: [
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
