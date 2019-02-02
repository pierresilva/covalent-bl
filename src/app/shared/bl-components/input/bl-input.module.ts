import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlAddOnModule } from '../core/addon/addon.module';
import { MatIconModule } from '@angular/material';

import { PlatformModule } from '@angular/cdk/platform';
import { BlAutoResizeDirective } from './bl-autoresize.directive';
import { BlInputGroupComponent } from './bl-input-group.component';
import { BlInputDirective } from './bl-input.directive';

@NgModule({
  declarations: [ BlInputDirective, BlInputGroupComponent, BlAutoResizeDirective ],
  exports     : [ BlInputDirective, BlInputGroupComponent, BlAutoResizeDirective ],
  imports     : [ CommonModule, FormsModule, MatIconModule, PlatformModule, BlAddOnModule ]
})
export class BlInputModule {
}
