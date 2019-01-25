import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ACLDirective } from './acl.directive';

// tslint:disable
const COMPONENTS = [ACLDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ACLModule { }
