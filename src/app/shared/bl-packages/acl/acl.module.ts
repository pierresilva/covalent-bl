import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { UtilModule } from '../utils/util.module';

import { ACLIfDirective } from './acl-if.directive';
import { ACLDirective } from './acl.directive';
import { ACLService } from './acl.service';

const COMPONENTS = [ACLDirective, ACLIfDirective];

@NgModule({
  imports: [CommonModule, UtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ACLModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ACLModule,
      providers: [ACLService],
    };
  }
}
