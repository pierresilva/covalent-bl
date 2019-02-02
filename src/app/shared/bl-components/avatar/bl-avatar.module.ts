import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { BlAvatarComponent } from './bl-avatar.component';

@NgModule({
  declarations: [ BlAvatarComponent ],
  exports     : [ BlAvatarComponent ],
  imports     : [ CommonModule, MatIconModule ],
})
export class BlAvatarModule {
}
