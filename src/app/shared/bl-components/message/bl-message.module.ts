import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BL_MESSAGE_DEFAULT_CONFIG_PROVIDER } from './bl-message-config';
import { BlMessageContainerComponent } from './bl-message-container.component';
import { BlMessageComponent } from './bl-message.component';
import { BlMessageService } from './bl-message.service';

@NgModule({
  imports        : [ CommonModule, OverlayModule, MatIconModule ],
  declarations   : [ BlMessageContainerComponent, BlMessageComponent ],
  providers      : [ BL_MESSAGE_DEFAULT_CONFIG_PROVIDER, BlMessageService ],
  entryComponents: [ BlMessageContainerComponent ]
})
export class BlMessageModule {
}
