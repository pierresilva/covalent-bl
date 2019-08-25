import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CovalentCommonModule,
  CovalentLayoutModule,
  CovalentMediaModule,
  CovalentExpansionPanelModule,
  CovalentStepsModule,
  CovalentLoadingModule,
  CovalentDialogsModule,
  CovalentSearchModule,
  CovalentPagingModule,
  CovalentNotificationsModule,
  CovalentMenuModule,
  CovalentDataTableModule,
  CovalentMessageModule,
  CovalentBreadcrumbsModule,

} from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    CovalentHighlightModule,
    CovalentBreadcrumbsModule,
  ],
  exports: [
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    CovalentHighlightModule,
    CovalentBreadcrumbsModule,
  ]
})
export class CovalentModule { }
