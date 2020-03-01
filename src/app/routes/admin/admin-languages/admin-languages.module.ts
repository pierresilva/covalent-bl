import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLanguagesRoutingModule } from './admin-languages-routing.module';
import { SharedModule } from '../../../shared/shared.module';

// start region: import components
import { AdminLanguagesComponent } from './admin-languages.component';
import { AdminLanguagesFormComponent } from './components/admin-languages-form/admin-languages-form.component';
import { AdminLanguagesListComponent } from './components/admin-languages-list/admin-languages-list.component';
import { AdminLanguagesViewComponent } from './components/admin-languages-view/admin-languages-view.component';
// ends region: import components

// start region: import services
import { AdminLanguagesService } from './services/admin-languages.service';
// ends region: import services

@NgModule({
  providers: [
    // start region: providers services
    AdminLanguagesService,
    // ends region: providers services
  ],
  declarations: [
    // start region: declarations components
    AdminLanguagesComponent,
    AdminLanguagesFormComponent,
    AdminLanguagesListComponent,
    AdminLanguagesViewComponent,
    // start region: declarations components
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminLanguagesRoutingModule,
  ],
})
export class AdminLanguagesModule { }
