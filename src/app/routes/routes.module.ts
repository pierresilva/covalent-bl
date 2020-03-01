import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectivePreloadingStrategyService } from '../layouts/layout-components/services';

@NgModule({
  declarations: [],
  providers: [
    SelectivePreloadingStrategyService,
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SharedModule,
  ],
})
export class RoutesModule { }
