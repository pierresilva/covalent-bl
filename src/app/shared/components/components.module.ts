import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovalentModule } from '../covalent/covalent.module';
import { MaterialModule } from '../material/material.module';
import { NavUserNotificationsComponent } from './nav-user-notifications/nav-user-notifications.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { NavUserMenuComponent } from './nav-user-menu/nav-user-menu.component';
import { NavLangSelectorComponent } from './nav-lang-selector/nav-lang-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { BlAvatarModule } from '../bl-components/avatar';
import { BlBadgeModule } from '../bl-components/badge';

@NgModule({
  declarations: [
    NavUserNotificationsComponent,
    NavSearchComponent,
    ThemeSelectorComponent,
    NavUserMenuComponent,
    NavLangSelectorComponent,
    SidenavMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    CovalentModule,
    MaterialModule,
    BlAvatarModule,
    BlBadgeModule,
  ],
  exports: [
    NavUserNotificationsComponent,
    NavSearchComponent,
    ThemeSelectorComponent,
    NavUserMenuComponent,
    NavLangSelectorComponent,
    SidenavMenuComponent,
  ],
  entryComponents: [
    NavUserNotificationsComponent,
    NavSearchComponent,
    ThemeSelectorComponent,
    NavUserMenuComponent,
    NavLangSelectorComponent,
    SidenavMenuComponent,
  ],
})
export class ComponentsModule { }
