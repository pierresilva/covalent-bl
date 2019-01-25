import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlClassListAddDirective } from './classlist_add';
import { BlStringTemplateOutletDirective } from './string_template_outlet';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ BlStringTemplateOutletDirective, BlClassListAddDirective ],
  declarations: [ BlStringTemplateOutletDirective, BlClassListAddDirective ]
})
export class BlAddOnModule {
}
