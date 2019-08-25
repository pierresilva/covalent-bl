import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BL_NOTIFICATION_DEFAULT_CONFIG_PROVIDER } from './bl-notification-config';
import { BlNotificationContainerComponent } from "./bl-notification-container.component";
import { BlNotificationComponent } from './bl-notification.component';
import { BlNotificationService } from './bl-notification.service';

@NgModule({
  imports: [CommonModule, OverlayModule, MatIconModule],
  declarations: [BlNotificationComponent, BlNotificationContainerComponent],
  providers: [BL_NOTIFICATION_DEFAULT_CONFIG_PROVIDER, BlNotificationService],
  entryComponents: [BlNotificationContainerComponent],
})
export class BlNotificationModule {
}
