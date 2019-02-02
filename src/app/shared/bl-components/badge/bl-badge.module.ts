import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlBadgeComponent } from './bl-badge.component';

@NgModule({
  declarations: [ BlBadgeComponent ],
  exports     : [ BlBadgeComponent ],
  imports     : [ CommonModule ],
})
export class BlBadgeModule {
}
