import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';
import { DeveloperMenuComponent } from './components/developer-menu/developer-menu.component';
import { SharedModule } from '../../shared/shared.module';
import { DeveloperHomeComponent } from './developer-home/developer-home.component';


@NgModule({
  declarations: [DeveloperComponent, DeveloperMenuComponent, DeveloperHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeveloperRoutingModule,
  ],
})
export class DeveloperModule { }
