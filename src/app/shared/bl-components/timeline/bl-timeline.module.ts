import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlAddOnModule } from '../core/addon/addon.module';
import { MatIconModule } from '@angular/material';

import { BlTimelineItemComponent } from './bl-timeline-item.component';
import { BlTimelineComponent } from './bl-timeline.component';

@NgModule({
  declarations: [ BlTimelineItemComponent, BlTimelineComponent ],
  exports     : [ BlTimelineItemComponent, BlTimelineComponent ],
  imports     : [ CommonModule, MatIconModule, BlAddOnModule ]
})
export class BlTimelineModule {
}
