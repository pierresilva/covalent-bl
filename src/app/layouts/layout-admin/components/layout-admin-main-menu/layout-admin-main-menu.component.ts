import {Component, OnInit} from '@angular/core';
import {TdMediaService} from "@covalent/core";

@Component({
  selector: 'app-layout-admin-main-menu',
  templateUrl: './layout-admin-main-menu.component.html',
  styleUrls: ['./layout-admin-main-menu.component.scss']
})
export class LayoutAdminMainMenuComponent implements OnInit {

  routes: Object[] = [{
    icon: 'dashboard',
    route: '.',
    title: 'Dashboard',
  }, {
    icon: 'library_books',
    route: '.',
    title: 'Documentation',
  }, {
    icon: 'build',
    route: '.',
    title: 'Console',
  },
  ];
  mgmtmenu: Object[] = [{
    icon: 'people',
    route: '.',
    title: 'Users',
    description: 'Item description',
  }, {
    icon: 'dns',
    route: '.',
    title: 'Systems',
    description: 'Item description',
  },
  ];
  monitormenu: Object[] = [{
    icon: 'verified_user',
    route: '.',
    title: 'Audit Logs',
    description: 'Item description',
  }, {
    icon: 'settings_system_daydream',
    route: '.',
    title: 'Monitored Systems',
    description: 'Item description',
  }];
  settingsmenu: Object[] = [{
    icon: 'lock',
    route: '.',
    title: 'Authentication',
    description: 'Item description',
  }, {
    icon: 'email',
    route: '.',
    title: 'SMTP Settings',
    description: 'Item description',
  },
  ];

  constructor(
    public media: TdMediaService,
  ) {
  }

  ngOnInit(): void {
  }

}
